/* ATP Care client-side PDF creation. Runs locally in the technician's browser. */
(function () {
  "use strict";
  const OFFICE_EMAIL = "atpcaresupport@gmail.com";
  const W = 612, H = 792, M = 44, CW = W - M * 2, MAX_Y = 740;
  const NAVY = [9, 41, 73], BLUE = [21, 85, 142], GOLD = [231, 180, 64], INK = [28, 52, 76];

  function txt(value, fallback) {
    const text = String(value == null ? "" : value).replace(/[\u0000-\u001f\u007f]/g, " ").trim();
    return (text || (fallback == null ? "Not provided" : fallback))
      .replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
      .replace(/[\u2013\u2014]/g, "-");
  }
  function safeFile(value) {
    return txt(value, "customer").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-|-$/g, "").slice(0, 52) || "customer";
  }
  async function imageDataForLogo() {
    try {
      const img = document.querySelector(".logo-lockup img");
      if (!img) return null;
      const response = await fetch(img.src, { cache: "force-cache" });
      if (!response.ok) return null;
      const file = await response.blob();
      return await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    } catch { return null; }
  }
  async function jpegPhoto(src) {
    const img = await new Promise((resolve, reject) => {
      const obj = new Image();
      obj.onload = () => resolve(obj);
      obj.onerror = () => reject(new Error("Image could not be decoded"));
      obj.src = src;
    });
    const ratio = Math.min(1, 1180 / img.naturalWidth, 1180 / img.naturalHeight);
    const width = Math.max(1, Math.round(img.naturalWidth * ratio));
    const height = Math.max(1, Math.round(img.naturalHeight * ratio));
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Cannot process photo");
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    const data = canvas.toDataURL("image/jpeg", 0.75);
    canvas.width = 0; canvas.height = 0;
    return { data, width, height };
  }

  async function generate(visit, appliances) {
    if (!window.jspdf || !window.jspdf.jsPDF)
      throw new Error("PDF engine could not load. Reopen the webpage while online.");
    if (!visit || !appliances || !appliances.length)
      throw new Error("Customer details and at least one appliance are required.");
    const pdf = new window.jspdf.jsPDF({ orientation: "portrait", unit: "pt", format: "letter", compress: true });
    const logo = await imageDataForLogo();
    let y = 0;
    function newHeader() {
      pdf.setFillColor(...NAVY); pdf.rect(0, 0, W, 87, "F");
      pdf.setFillColor(...GOLD); pdf.rect(0, 85, W, 3, "F");
      let x = M;
      if (logo) {
        try { pdf.addImage(logo, "PNG", M, 12, 58, 58); x = 113; } catch { x = M; }
      }
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(10);
      pdf.setTextColor(...GOLD); pdf.text("ATP CARE", x, 35);
      pdf.setFontSize(18); pdf.setTextColor(255, 255, 255);
      pdf.text("Appliance Healthscore Card", x, 58);
      y = 109;
    }
    function newPage() { pdf.addPage(); newHeader(); }
    function room(height) { if (y + height > MAX_Y) newPage(); }
    function heading(title) {
      room(35); pdf.setFont("helvetica", "bold"); pdf.setFontSize(14);
      pdf.setTextColor(...BLUE); pdf.text(txt(title), M, y);
      y += 11; pdf.setDrawColor(211, 226, 238); pdf.line(M, y, W - M, y);
      y += 18;
    }
    function lines(text, size, leading, width, indent) {
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(size); pdf.setTextColor(...INK);
      const arr = pdf.splitTextToSize(txt(text, ""), width || CW);
      for (const line of arr) { room(leading + 2); pdf.text(line, M + (indent || 0), y); y += leading; }
      y += 3;
    }
    function keyValue(label, value) {
      room(25); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10);
      pdf.setTextColor(...BLUE); pdf.text(label + ":", M, y);
      const off = Math.min(153, pdf.getTextWidth(label + ":") + 13);
      pdf.setFont("helvetica", "normal"); pdf.setTextColor(...INK);
      const arr = pdf.splitTextToSize(txt(value), CW - off);
      for (let j = 0; j < arr.length; j++) {
        room(15); pdf.text(arr[j], M + off, y); y += 15;
      }
      y += 4;
    }
    function paragraph(label, value) {
      room(35); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10.5);
      pdf.setTextColor(...BLUE); pdf.text(label, M, y); y += 17;
      lines(value, 10.5, 15);
    }

    newHeader(); heading("Visit Information");
    keyValue("Customer", visit.customerName);
    keyValue("Service address", visit.address);
    keyValue("Customer email", visit.email);
    keyValue("Phone", visit.phone);
    keyValue("Technician", visit.technician);
    keyValue("Inspection date", visit.date);
    y += 8;

    for (const [index, item] of appliances.entries()) {
      room(98); heading(String(index + 1) + ". " + txt(item.type));
      keyValue("Brand", item.brand); keyValue("Model", item.model);
      keyValue("Serial", item.serial); keyValue("Approximate age", item.age);
      keyValue("Observed condition", item.overallCondition);
      keyValue("Health Score", Number(item.confirmedScore).toFixed(1) + " / 10");
      keyValue("Service recommended", item.serviceRecommended);
      paragraph("Customer concern", item.concern || "None reported");
      paragraph("Findings & Recommendations", item.notes || "No findings recorded");
      const answers = Object.entries(item.answers || {});
      if (answers.length) {
        heading("Inspection Questions");
        for (const [question, answer] of answers) {
          lines(txt(question) + "  " + txt(answer), 9.5, 14);
        }
      }
      const groups = [
        ["Appliance Photos", item.appliancePhotos],
        ["Model / Serial Tag Photos", item.tagPhotos],
        ["Issue / Condition Photos", item.issuePhotos]
      ];
      for (const [name, photos] of groups) {
        if (!photos || !photos.length) continue;
        heading(name);
        for (const [photoIndex, photo] of photos.entries()) {
          try {
            const img = await jpegPhoto(photo.src);
            const width = Math.min(CW, 340);
            const height = Math.min(238, width * img.height / img.width);
            const actualWidth = height * img.width / img.height;
            room(height + 38);
            pdf.addImage(img.data, "JPEG", M, y, actualWidth, height, undefined, "FAST");
            y += height + 15;
            lines("Photo " + (photoIndex + 1) + ": " + txt(photo.caption, "No caption"), 9, 13);
          } catch {
            lines("Photo " + (photoIndex + 1) + " could not be embedded.", 9, 13);
          }
        }
      }
      y += 10;
    }
    room(92); heading("Important Information");
    lines("This report records observed appliance conditions at the time of inspection. It is not a warranty, insurance policy or guarantee of future performance. Repairs, parts, built-in removal and specialized testing are quoted separately. An uninspected appliance must not receive a Health Score.", 9, 13);

    const count = pdf.getNumberOfPages();
    for (let i = 1; i <= count; i++) {
      pdf.setPage(i); pdf.setDrawColor(206, 222, 232);
      pdf.line(M, 754, W - M, 754);
      pdf.setTextColor(106, 124, 144); pdf.setFontSize(8); pdf.setFont("helvetica", "normal");
      pdf.text("ATP CARE  |  " + OFFICE_EMAIL, M, 770);
      pdf.text(i + " / " + count, W - M, 770, { align: "right" });
    }
    return {
      fileName: "ATP-Healthscore-" + safeFile(visit.customerName) + "-" + safeFile(visit.date) + ".pdf",
      blob: pdf.output("blob"),
      customerEmail: visit.email,
      officeEmail: OFFICE_EMAIL
    };
  }
  window.ATPReportExport = { generate, OFFICE_EMAIL };
})();
