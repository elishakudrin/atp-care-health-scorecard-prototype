const app = document.querySelector("#app");
const backButton = document.querySelector("#backButton");
const historyButton = document.querySelector("#historyButton");
const toast = document.querySelector("#toast");

const now = new Date();
const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
const emptyVisit = {
  customerName: "", address: "", email: "", phone: "", technician: "", date: today
};

const categories = [
  "Common",
  "Refrigeration",
  "Cooking",
  "Laundry",
  "Dishwashing",
  "Ice / Beverage",
  "Ventilation",
  "Specialty / Other"
];

const taxonomy = [
  item("refrigerator-freezer", "Refrigerator / Freezer", "Common", "Most common full-size cooling appliance", "refrigerator"),
  item("dishwasher", "Dishwasher", "Common", "Standard built-in dishwasher", "dishwasher"),
  item("clothes-washer", "Clothes Washer", "Common", "Front or top load washer", "washer"),
  item("electric-dryer", "Electric Dryer", "Common", "Vented electric dryer", "dryer"),
  item("gas-dryer", "Gas Dryer", "Common", "Vented gas dryer", "dryer"),
  item("electric-range-oven", "Electric Range / Oven", "Common", "Electric cooking appliance", "range"),
  item("gas-range-oven", "Gas Range / Oven", "Common", "Gas cooking appliance", "range"),
  item("cooktop", "Cooktop", "Common", "Gas, electric, or induction cooktop", "cooktop"),
  item("wall-oven", "Wall Oven", "Common", "Built-in oven", "oven"),
  item("ice-maker", "Ice Maker", "Common", "Residential ice maker", "ice"),
  item("wine-beverage", "Wine Cooler / Beverage Center", "Common", "Wine or beverage storage", "wine"),

  item("refrigerator", "Refrigerator", "Refrigeration", "General refrigerator", "refrigerator"),
  item("freezer", "Freezer", "Refrigeration", "Standalone freezer", "refrigerator"),
  item("french-door-refrigerator", "French Door Refrigerator", "Refrigeration", "French door bottom-freezer style", "refrigerator"),
  item("side-by-side-refrigerator", "Side-by-Side Refrigerator", "Refrigeration", "Side-by-side fresh food and freezer", "refrigerator"),
  item("top-freezer-refrigerator", "Top-Freezer Refrigerator", "Refrigeration", "Freezer above fresh-food compartment", "refrigerator"),
  item("bottom-freezer-refrigerator", "Bottom-Freezer Refrigerator", "Refrigeration", "Freezer drawer or door below", "refrigerator"),
  item("built-in-refrigerator", "Built-In Refrigerator", "Refrigeration", "Premium built-in cooling appliance", "refrigerator"),
  item("column-refrigerator", "Column Refrigerator", "Refrigeration", "Dedicated refrigerator column", "refrigerator"),
  item("column-freezer", "Column Freezer", "Refrigeration", "Dedicated freezer column", "refrigerator"),
  item("undercounter-refrigerator", "Undercounter Refrigerator", "Refrigeration", "Built-in undercounter refrigerator", "refrigerator"),
  item("drawer-refrigerator", "Drawer Refrigerator", "Refrigeration", "Refrigerated drawer unit", "refrigerator"),
  item("outdoor-refrigerator", "Outdoor Refrigerator", "Refrigeration", "Outdoor-rated refrigerator", "refrigerator", true),

  item("electric-range", "Electric Range", "Cooking", "Electric range", "range"),
  item("gas-range", "Gas Range", "Cooking", "Gas range", "range"),
  item("dual-fuel-range", "Dual Fuel Range", "Cooking", "Gas cooktop with electric oven", "range"),
  item("induction-range", "Induction Range", "Cooking", "Induction range", "range"),
  item("professional-range", "Professional Range", "Cooking", "Premium/pro-style range", "range", true),
  item("electric-cooktop", "Electric Cooktop", "Cooking", "Electric radiant or coil cooktop", "cooktop"),
  item("gas-cooktop", "Gas Cooktop", "Cooking", "Gas cooktop", "cooktop"),
  item("induction-cooktop", "Induction Cooktop", "Cooking", "Induction cooktop", "cooktop"),
  item("radiant-cooktop", "Radiant Cooktop", "Cooking", "Glass radiant cooktop", "cooktop"),
  item("rangetop", "Rangetop", "Cooking", "Pro-style rangetop", "cooktop", true),
  item("electric-wall-oven", "Electric Wall Oven", "Cooking", "Electric built-in oven", "oven"),
  item("gas-wall-oven", "Gas Wall Oven", "Cooking", "Gas built-in oven", "oven"),
  item("single-wall-oven", "Single Wall Oven", "Cooking", "Single built-in oven", "oven"),
  item("double-wall-oven", "Double Wall Oven", "Cooking", "Double built-in oven", "oven"),
  item("combination-wall-oven", "Combination Wall Oven", "Cooking", "Microwave function requires ATP review", "oven", true),
  item("steam-oven", "Steam Oven", "Cooking", "Specialty appliance", "oven", true),
  item("speed-oven", "Speed Oven", "Cooking", "Microwave function requires ATP review", "oven", true),
  item("warming-drawer", "Warming Drawer", "Cooking", "Specialty warming appliance", "other", true),
  item("vacuum-drawer", "Vacuum Drawer", "Cooking", "Specialty built-in drawer", "other", true),
  item("coffee-system", "Coffee System / Built-In Coffee Machine", "Cooking", "Specialty built-in coffee appliance", "other", true),
  item("outdoor-grill", "Outdoor Grill", "Cooking", "Outdoor cooking appliance", "other", true),
  item("built-in-grill", "Built-In Grill", "Cooking", "Built-in outdoor grill", "other", true),

  item("front-load-washer", "Front Load Washer", "Laundry", "Front load clothes washer", "washer"),
  item("top-load-washer", "Top Load Washer", "Laundry", "Top load clothes washer", "washer"),
  item("washer-dryer-combo", "Washer / Dryer Combo", "Laundry", "Single-unit washer/dryer appliance", "washer"),
  item("laundry-center", "Laundry Center", "Laundry", "Stacked washer/dryer center", "washer"),
  item("heat-pump-dryer", "Heat Pump Dryer", "Laundry", "Ventless heat pump dryer", "dryer", true),
  item("ventless-dryer", "Ventless Dryer", "Laundry", "Condensing or ventless dryer", "dryer", true),

  item("drawer-dishwasher", "Drawer Dishwasher", "Dishwashing", "Single or double drawer dishwasher", "dishwasher", true),

  item("wine-cooler", "Wine Cooler", "Ice / Beverage", "Wine storage appliance", "wine"),
  item("wine-refrigerator", "Wine Refrigerator", "Ice / Beverage", "Wine refrigerator", "wine"),
  item("beverage-center", "Beverage Center", "Ice / Beverage", "Beverage storage appliance", "wine"),
  item("ice-machine", "Ice Machine", "Ice / Beverage", "Residential ice machine", "ice"),
  item("outdoor-ice-maker", "Outdoor Ice Maker", "Ice / Beverage", "Outdoor-rated ice maker", "ice", true),

  item("range-hood", "Range Hood", "Ventilation", "Kitchen ventilation hood", "ventilation", true),
  item("downdraft-ventilation", "Downdraft Ventilation", "Ventilation", "Downdraft cooking ventilation", "ventilation", true),
  item("cooktop-ventilation", "Cooktop Ventilation", "Ventilation", "Integrated or adjacent cooktop ventilation", "ventilation", true),

  item("trash-compactor", "Trash Compactor", "Specialty / Other", "Specialty appliance", "other", true),
  item("garbage-disposal", "Garbage Disposal", "Specialty / Other", "Sink disposal appliance", "other", true),
  item("other-appliance", "Other Appliance", "Specialty / Other", "Controlled fallback", "other", true)
];

const conditionOptions = [
  { label: "Excellent", short: "Excellent", score: 9.6 },
  { label: "Good", short: "Good", score: 8.6 },
  { label: "Monitor", short: "Monitor", score: 7.2 },
  { label: "Service Recommended", short: "Service", score: 5.8 },
  { label: "Immediate Attention", short: "Immediate", score: 3.2 }
];

const questionSets = {
  refrigerator: [
    "Does it keep food cold enough?",
    "Does the ice maker work normally?",
    "Have you noticed water inside or under the refrigerator?"
  ],
  dishwasher: [
    "Are dishes coming out clean?",
    "Does it finish the cycle normally?",
    "Have you noticed leaks?"
  ],
  washer: [
    "Does it complete the cycle?",
    "Does it spin clothes dry?",
    "Any vibration or banging?"
  ],
  dryer: [
    "Are clothes drying in one cycle?",
    "Any burning smell?",
    "Has drying time increased?"
  ],
  range: [
    "Does it heat evenly?",
    "Any burners not lighting or heating?",
    "Any unusual smells during use?"
  ],
  cooktop: [
    "Do all cooking zones work?",
    "Any burner or element issues?",
    "Any unusual smells during use?"
  ],
  oven: [
    "Does it heat evenly?",
    "Does it preheat normally?",
    "Any unusual smells during use?"
  ],
  ice: [
    "Is it making enough ice?",
    "Any water leaks?",
    "Any unusual taste, odor, or noise?"
  ],
  wine: [
    "Is it holding the selected temperature?",
    "Any condensation or moisture?",
    "Any unusual noise or vibration?"
  ],
  ventilation: [
    "Does it move air effectively?",
    "Any unusual noise?",
    "Any lights or controls not working?"
  ],
  other: [
    "Is the appliance working as expected?",
    "Any leaks, odors, or unusual noise?",
    "Any specific concern today?"
  ]
};

const state = {
  screen: "start",
  history: [],
  activeCategory: "Common",
  search: "",
  visit: { ...emptyVisit },
  readyPdf: null,
  pdfPreparing: false,
  sessionReports: [],
  selectedIds: [],
  currentIndex: 0,
  appliances: {}
};

function item(id, name, category, description, family, scopeReview = false) {
  return { id, name, category, description, family, scopeReview };
}

function catalogItem(id) {
  return taxonomy.find((entry) => entry.id === id);
}

function currentId() {
  return state.selectedIds[state.currentIndex];
}

function currentItem() {
  return catalogItem(currentId());
}

function currentRecord() {
  return state.appliances[currentId()];
}

function createRecord(id) {
  const entry = catalogItem(id);
  return {
    id,
    type: entry.name,
    brand: "",
    model: "",
    serial: "",
    age: "",
    appliancePhotos: [],
    tagPhotos: [],
    issuePhotos: [],
    answers: {},
    concern: "",
    overallCondition: "Good",
    suggestedScore: 8.6,
    confirmedScore: 8.6,
    status: "Minor Maintenance Recommended",
    assessmentConfirmed: false,
    notes: "",
    followUpNote: "",
    serviceRecommended: "No",
    scopeReview: entry.scopeReview
  };
}



function setScreen(screen) {
  state.history.push(state.screen);
  state.screen = screen;
  render();
}

function goBack() {
  const previous = state.history.pop();
  if (!previous) return;
  state.screen = previous;
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function progressShell(content, percent = null, label = "") {
  return `
    <section class="screen">
      ${percent === null ? "" : `
        <div class="progress-wrap">
          <div class="progress-meta"><span>${label}</span><span>${percent}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        </div>
      `}
      ${content}
    </section>
  `;
}

function contextRows() {
  return `
    <div class="context-card">
      <div class="context-row"><span class="label">Customer</span><strong>${escapeHtml(state.visit.customerName)}</strong></div>
      <div class="context-row"><span class="label">Address</span><strong>${escapeHtml(state.visit.address)}</strong></div>
      <div class="context-row"><span class="label">Technician</span><strong>${escapeHtml(state.visit.technician)}</strong></div>
      <div class="context-row"><span class="label">Inspection Date</span><strong>${escapeHtml(state.visit.date)}</strong></div>
    </div>
  `;
}

function renderStart() {
  app.innerHTML = progressShell(
    '<div class="welcome-intro"><p>Record appliance conditions, photos and recommendations. Prepare a professional report directly on your phone.</p></div>' +
    '<div class="panel welcome-panel"><span class="eyebrow">New inspection</span><h3>Start a visit</h3>' +
    '<p>Enter the customer details, select appliances, then record your findings and Health Scores.</p>' +
    '<button class="primary-button" type="button" data-action="start">Start Visit</button></div>' +
    '<p class="privacy-note">Reports are prepared on your device. Save and share the PDF with the customer and ATP office; this page does not automatically send or store customer reports.</p>'
  );
}

function renderCustomer() {
  app.innerHTML = progressShell(`
    <div class="screen-head">
      <span class="eyebrow">Step 1</span>
      <h2>Customer & Visit</h2>
      <p>Enter the customer's visit details. Your information stays on this device until you share the PDF.</p>
    </div>
    <form class="panel form-grid" data-form="visit">
      ${field("Customer Name", "customerName", state.visit.customerName)}
      ${field("Service Address", "address", state.visit.address)}
      ${field("Email", "email", state.visit.email, "email")}
      ${field("Phone", "phone", state.visit.phone, "tel")}
      ${field("Technician", "technician", state.visit.technician)}
      ${field("Inspection Date", "date", state.visit.date)}
      <button class="primary-button" type="submit">Continue</button>
    </form>
  `, 10, "Visit");
}

function field(label, name, value, type = "text") {
  return `
    <label class="field">
      <span>${label}</span>
      <input type="${name === "date" ? "date" : type}" name="${name}" value="${escapeHtml(value)}" ${["customerName", "address", "email", "phone", "technician", "date"].includes(name) ? "required" : ""}>
    </label>
  `;
}

function renderSelect() {
  const results = filteredTaxonomy();
  const grouped = groupByCategory(results);
  app.innerHTML = progressShell(`
    <div class="screen-head">
      <span class="eyebrow">Step 2</span>
      <h2>Select Appliances</h2>
      <p>Select every appliance being checked today. Common ATP appliances are listed first.</p>
    </div>
    <div class="selector-tools">
      <label class="field">
        <span>Search Appliance Type</span>
        <input type="search" value="${escapeHtml(state.search)}" data-search placeholder="Search refrigerator, range, dryer...">
      </label>
      <div class="category-tabs">
        ${categories.map((category) => `<button class="pill-button ${state.activeCategory === category ? "active" : ""}" type="button" data-category="${category}">${category}</button>`).join("")}
      </div>
    </div>
    <div class="appliance-list">
      ${Object.entries(grouped).map(([category, items]) => `
        <div class="category-group">
          <div class="category-title"><span class="eyebrow">${category}</span><span class="muted">${items.length}</span></div>
          ${items.map(selectorCard).join("")}
        </div>
      `).join("") || `<div class="panel"><p class="muted">No matching appliance types.</p></div>`}
    </div>
    <div class="panel">
      <div class="screen-head">
        <h3>Appliances for This Visit</h3>
        <p>${state.selectedIds.length} selected</p>
      </div>
      <ul class="selected-strip">
        ${state.selectedIds.length ? state.selectedIds.map((id) => `<li><strong>${catalogItem(id).name}</strong><span>${catalogItem(id).scopeReview ? "Scope review" : "Ready"}</span></li>`).join("") : `<li><span class="muted">No appliances selected yet.</span></li>`}
      </ul>
    </div>
    <button class="primary-button" type="button" data-action="add-selected">Add Selected Appliances</button>
  `, 20, "Selection");
}

function filteredTaxonomy() {
  const query = state.search.trim().toLowerCase();
  return taxonomy.filter((entry) => {
    const categoryMatch = query ? true : entry.category === state.activeCategory;
    const searchMatch = !query || `${entry.name} ${entry.description} ${entry.category}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
}

function groupByCategory(items) {
  return items.reduce((groups, entry) => {
    groups[entry.category] ||= [];
    groups[entry.category].push(entry);
    return groups;
  }, {});
}

function selectorCard(entry) {
  return `
    <button class="selector-card ${state.selectedIds.includes(entry.id) ? "selected" : ""}" type="button" data-toggle="${entry.id}">
      <span>
        <strong>${entry.name}</strong>
        <small>${entry.description}${entry.scopeReview ? " - Service scope confirmation required" : ""}</small>
      </span>
      <span class="selector-dot" aria-hidden="true"></span>
    </button>
  `;
}

function renderDetails() {
  const record = currentRecord();
  const itemData = currentItem();
  app.innerHTML = progressShell(`
    ${applianceHead("Appliance Details")}
    ${itemData.scopeReview ? `<div class="disclaimer">Service scope confirmation required for this appliance type before operational use.</div>` : ""}
    <form class="panel" data-form="details" id="details-form">
      <div class="screen-head section-title">
        <span class="eyebrow">Appliance Information</span>
        <h3>Appliance Information</h3>
      </div>
      <div class="details-grid">
        <label class="field"><span>Appliance Type</span><input name="type" value="${escapeHtml(record.type)}" readonly></label>
        ${field("Brand", "brand", record.brand)}
        ${field("Model Number", "model", record.model)}
        ${field("Serial Number - Optional", "serial", record.serial)}
        ${field("Approximate Age", "age", record.age)}
      </div>
    </form>
    ${multiPhotoGallery("Appliance Photos", "appliancePhotos", record.appliancePhotos, "Front of appliance")}
    ${multiPhotoGallery("Model / Serial Tag Photos", "tagPhotos", record.tagPhotos, "Model tag")}
    ${multiPhotoGallery("Issue / Condition Photos - Optional", "issuePhotos", record.issuePhotos, "Door gasket wear")}
    <button class="primary-button inline-submit" type="submit" form="details-form">Continue to Questions</button>
  `, applianceProgress(34), applianceLabel());
}

function applianceHead(title) {
  const itemData = currentItem();
  return `
    <div class="screen-head">
      <span class="eyebrow">Appliance ${state.currentIndex + 1} of ${state.selectedIds.length}</span>
      <h2>${title}</h2>
      <p>${itemData.name}</p>
    </div>
  `;
}

function applianceLabel() {
  return `Appliance ${state.currentIndex + 1} of ${state.selectedIds.length}`;
}

function applianceProgress(base) {
  const perAppliance = state.selectedIds.length ? (state.currentIndex / state.selectedIds.length) * 54 : 0;
  return Math.min(92, Math.round(base + perAppliance));
}

function multiPhotoGallery(title, group, photos, captionPlaceholder) {
  const safeId = group.replace(/[^a-z0-9]/gi, "-");
  return `
    <div class="panel photo-gallery">
      <div class="screen-head section-title">
        <span class="eyebrow">${title}</span>
        <h3>${title}</h3>
        <p>Add as many photos as needed. Captions are optional.</p>
      </div>
      <div class="thumbnail-grid">
        ${photos.length ? photos.map((photo, index) => photoTile(group, photo, index, captionPlaceholder)).join("") : `<div class="empty-gallery">No photos added yet.</div>`}
      </div>
      <div class="photo-actions">
        <label class="file-label camera" for="${safeId}-camera">Take Photo</label>
        <label class="file-label upload" for="${safeId}-upload">Upload Photo</label>
        <label class="file-label add" for="${safeId}-add">Add Another Photo</label>
        <input class="file-input" id="${safeId}-camera" type="file" accept="image/*" capture="environment" data-photo-group="${group}">
        <input class="file-input" id="${safeId}-upload" type="file" accept="image/*" data-photo-group="${group}">
        <input class="file-input" id="${safeId}-add" type="file" accept="image/*" data-photo-group="${group}">
      </div>
    </div>
  `;
}

function photoTile(group, photo, index, placeholder) {
  return `
    <div class="photo-tile">
      <button class="photo-preview-button" type="button" data-preview-photo="${group}:${index}">
        <img src="${photo.src}" alt="${escapeHtml(photo.caption || "Inspection photo")}">
        <span>View</span>
      </button>
      <label class="field">
        <span>Caption Optional</span>
        <input value="${escapeHtml(photo.caption)}" data-photo-caption="${group}:${index}" placeholder="${escapeHtml(placeholder)}">
      </label>
      <button class="ghost-button" type="button" data-remove-photo="${group}:${index}">Remove</button>
    </div>
  `;
}

function renderPhotoPreview(group, index) {
  const record = currentRecord();
  const photo = record[group]?.[index];
  if (!photo) {
    renderDetails();
    return;
  }
  app.innerHTML = progressShell(`
    ${applianceHead("Photo Preview")}
    <div class="panel photo-preview-panel">
      <img src="${photo.src}" alt="${escapeHtml(photo.caption || "Inspection photo preview")}">
      <p class="muted">${escapeHtml(photo.caption || "No caption")}</p>
      <button class="primary-button" type="button" data-action="back-to-details">Back to Appliance Details</button>
    </div>
  `, applianceProgress(34), applianceLabel());
}

function renderQuestions() {
  const record = currentRecord();
  const questions = questionSets[currentItem().family] || questionSets.other;
  app.innerHTML = progressShell(`
    ${applianceHead("Customer Questions")}
    <div class="panel form-grid">
      ${questions.map((question) => questionBlock(question, record.answers[question] || "")).join("")}
      <label class="field">
        <span>Customer Concern Optional</span>
        <textarea data-concern placeholder="Short customer concern">${escapeHtml(record.concern)}</textarea>
      </label>
    </div>
    <button class="primary-button" type="button" data-action="questions-next">Continue</button>
  `, applianceProgress(52), applianceLabel());
}

function questionBlock(question, value) {
  return `
    <div class="question-card" data-question="${escapeHtml(question)}">
      <h3>${question}</h3>
      <div class="choice-grid">
        ${["Yes", "No", "Sometimes", "Not Applicable"].map((choice) => `<button class="choice ${choice === value ? "active" : ""}" type="button" data-answer="${choice}">${choice}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderScoreNotes() {
  const record = currentRecord();
  updateSuggestedScore(record, true);
  app.innerHTML = progressShell(`
    ${applianceHead("Overall Score")}
    <div class="panel">
      <div class="screen-head section-title">
        <span class="eyebrow">Condition Summary</span>
        <h3>Overall Condition</h3>
      </div>
      <div class="condition-grid">
        ${conditionOptions.map((option) => `<button class="choice ${record.overallCondition === option.label ? "active" : ""}" type="button" data-condition="${option.label}">${option.label}</button>`).join("")}
      </div>
    </div>
    <div class="score-panel">
      <span class="eyebrow">Suggested Score</span>
      <div class="score-display"><strong id="scoreValue">${record.confirmedScore.toFixed(1)}</strong><span>/ 10</span></div>
      <span class="status-chip" id="statusValue">${record.status}</span>
      <label class="field">
        <span>Technician Confirm / Adjust</span>
        <input type="range" min="1" max="10" step="0.1" value="${record.confirmedScore}" data-score-slider>
      </label>
    </div>
    <div class="panel form-grid">
      <label class="field">
        <span>Findings & Recommendations</span>
        <textarea data-notes placeholder="Concise technician summary">${escapeHtml(record.notes)}</textarea>
      </label>
      <div class="question-card">
        <h3>Service Recommended</h3>
        <div class="choice-grid">
          ${["No", "Yes"].map((choice) => `<button class="choice ${record.serviceRecommended === choice ? "active" : ""}" type="button" data-service="${choice}">${choice}</button>`).join("")}
        </div>
      </div>
    </div>
    <button class="primary-button" type="button" data-action="save-appliance">${state.currentIndex === state.selectedIds.length - 1 ? "Review & Complete" : "Next Appliance"}</button>
  `, applianceProgress(72), applianceLabel());
}

function renderReviewComplete() {
  const records = selectedRecords();
  app.innerHTML = progressShell(`
    <div class="screen-head">
      <span class="eyebrow">Final Step</span>
      <h2>Review & Complete</h2>
      <p>Confirm the findings, then prepare a PDF to share with the customer and ATP office.</p>
    </div>
    ${contextRows()}
    <div class="summary-grid">
      ${records.map(summaryCard).join("")}
    </div>
    <p class="disclaimer">This score reflects the appliance’s condition at the time of inspection and is not a guarantee against future failures.</p>
    <div class="actions">
      <button class="secondary-button" type="button" data-action="report">Preview Customer Report</button>
      <button class="primary-button" type="button" data-action="prepare-pdf">Prepare PDF</button>
      <button class="secondary-button" type="button" data-action="download-pdf" ${state.readyPdf ? "" : "disabled"}>Save PDF</button>
      <button class="primary-button" type="button" data-action="share-pdf" ${state.readyPdf ? "" : "disabled"}>Share PDF</button>
    </div>
    <div class="report-guidance">
      <strong>Delivery checklist</strong>
      <p>Share the PDF with the customer and send a copy to the ATP office at atpcaresupport@gmail.com. No automatic emails or cloud backups are enabled.</p>
      <p>Customer email: <b>${escapeHtml(state.visit.email)}</b></p>
      <button class="ghost-button" type="button" data-action="copy-recipients">Copy customer + office email addresses</button>
    </div>
  `, 100, "Complete");
}

function selectedRecords() {
  return state.selectedIds.map((id) => state.appliances[id]);
}

function summaryCard(record) {
  const mainPhoto = record.appliancePhotos[0]?.src;
  const allThumbnails = [...record.appliancePhotos, ...record.tagPhotos, ...record.issuePhotos];
  return `
    <article class="summary-card">
      <div class="summary-main">
        <div class="thumb">${mainPhoto ? `<img src="${mainPhoto}" alt="${record.type} photo">` : record.type.slice(0, 2)}</div>
        <div>
          <strong>${escapeHtml(record.brand)} ${escapeHtml(record.type)}</strong>
          <p class="muted">${escapeHtml(record.model)} / ${escapeHtml(record.age)}</p>
        </div>
      </div>
      <div class="score-row"><span class="status-chip light">${record.status}</span><span class="score-chip">${record.confirmedScore.toFixed(1)} / 10</span></div>
      <p class="muted">Overall Condition: <strong>${record.overallCondition}</strong></p>
      <p class="muted">Service Recommended: <strong>${record.serviceRecommended}</strong></p>
      <p>${escapeHtml(record.notes || "No technician notes recorded.")}</p>
      ${allThumbnails.length ? `<div class="issue-mini">${allThumbnails.map((photo) => `<img src="${photo.src}" alt="${escapeHtml(photo.caption || "Inspection photo")}">`).join("")}</div>` : ""}
    </article>
  `;
}

function renderReport() {
  const records = selectedRecords();
  app.innerHTML = progressShell(`
    <article class="report">
      <div class="report-hero">
        <div class="report-brand">
          <img src="assets/atp-logo-original-transparent.png" alt="Appliance Tech Pros logo">
          <div>
            <span class="eyebrow">ATP Care</span>
            <h1>Appliance Health Report</h1>
          </div>
        </div>
        <p>${escapeHtml(state.visit.customerName)} / ${escapeHtml(state.visit.date)} / ${escapeHtml(state.visit.technician)}</p>
      </div>
      <div class="report-body">
        <div class="panel">
          <span class="eyebrow">Overall Home Appliance Summary</span>
          <h2>${records.length} Appliances Checked</h2>
          <ul class="selected-strip">
            ${records.map((record) => `<li><strong>${escapeHtml(record.type)}</strong><span>${record.confirmedScore.toFixed(1)} / 10 - ${record.status}</span></li>`).join("")}
          </ul>
        </div>
        <div class="report-grid">
          ${records.map(reportCard).join("")}
        </div>
        <p class="disclaimer">This score reflects the appliance’s condition at the time of inspection and is not a guarantee against future failures.</p>
      </div>
    </article>
  `);
}

function reportCard(record) {
  const mainPhoto = record.appliancePhotos[0]?.src;
  const reportPhotos = [...record.appliancePhotos.slice(1), ...record.tagPhotos, ...record.issuePhotos];
  return `
    <article class="report-card">
      <div class="report-card-head">
        <div class="report-photo">${mainPhoto ? `<img src="${mainPhoto}" alt="${record.type} photo">` : record.type.slice(0, 2)}</div>
        <div>
          <span class="eyebrow">${escapeHtml(record.type)}</span>
          <h3>${escapeHtml(record.brand)} ${escapeHtml(record.model)}</h3>
          <p class="muted">Approximate age: ${escapeHtml(record.age)}</p>
          <div class="score-chip">${record.confirmedScore.toFixed(1)} / 10</div>
          <strong>${record.overallCondition} - ${record.status}</strong>
        </div>
      </div>
      <div class="report-section"><h4>Technician Notes</h4><p>${escapeHtml(record.notes || "No technician notes recorded.")}</p></div>
      ${record.serviceRecommended === "Yes" ? `<div class="report-section"><h4>Service Recommended</h4><p>ATP recommends service follow-up for this appliance.</p></div>` : ""}
      ${reportPhotos.length ? `<div class="report-section"><h4>Inspection Photos</h4><div class="issue-mini">${reportPhotos.map((photo) => `<img src="${photo.src}" alt="${escapeHtml(photo.caption || "Inspection photo")}">`).join("")}</div></div>` : ""}
    </article>
  `;
}

function renderHistory() {
  const prepared = state.sessionReports;
  const cards = prepared.length ? prepared.map((r) =>
    '<article class="history-card"><span class="eyebrow">Prepared PDF</span>' +
    '<h3>' + escapeHtml(r.customerName) + '</h3>' +
    '<p class="muted">' + escapeHtml(r.preparedAt) + ' · ' + r.applianceCount + ' appliance(s)</p>' +
    '<p class="muted">A PDF copy exists only in this open tab unless saved or shared.</p>' +
    '<button class="secondary-button" type="button" data-action="download-history-pdf" data-session-index="' + prepared.indexOf(r) + '">Save This PDF</button></article>'
  ).join("") : '<div class="panel"><p class="muted">No reports have been prepared in this browser tab.</p></div>';
  app.innerHTML = progressShell(
    '<div class="screen-head"><span class="eyebrow">This Session Only</span><h2>Prepared Reports</h2>' +
    '<p>These are temporary copies, not permanent customer history. Save and send each PDF to ATP for recordkeeping.</p></div>' +
    '<div class="history-grid">' + cards + '</div>' +
    '<button class="primary-button" type="button" data-action="new-visit">Start New Visit</button>'
  );
}

function updateSuggestedScore(record, preserveManual = false) {
  const selected = conditionOptions.find((option) => option.label === record.overallCondition);
  const suggested = selected ? selected.score : 8.6;
  record.suggestedScore = suggested;
  if (!preserveManual) record.confirmedScore = suggested;
  record.status = statusFromScore(record.confirmedScore);
}

function statusFromScore(score) {
  if (score >= 9) return "Operating Normally Today";
  if (score >= 8) return "Minor Maintenance Recommended";
  if (score >= 7) return "Monitor";
  if (score >= 5) return "Service Recommended";
  return "Immediate Attention";
}

function saveNotes() {
  const record = currentRecord();
  const notes = document.querySelector("[data-notes]");
  if (notes) record.notes = notes.value.trim();
}

function nextAfterAppliance() {
  saveNotes();
  const record = currentRecord();
  if (!record.assessmentConfirmed) { showToast("Confirm the condition and score before continuing."); return; }
  if (!record.notes.trim()) { showToast("Add findings and recommendations before continuing."); return; }
  invalidatePreparedPdf();
  if (state.currentIndex < state.selectedIds.length - 1) {
    state.currentIndex += 1;
    setScreen("details");
  } else {
    setScreen("review");
  }
}


function invalidatePreparedPdf() { state.readyPdf = null; }

function sessionIssue() {
  for (const [field, label] of [
    ["customerName", "Customer name"], ["address", "Service address"],
    ["email", "Customer email"], ["phone", "Customer phone"],
    ["technician", "Technician name"], ["date", "Inspection date"]
  ]) if (!String(state.visit[field] || "").trim()) return label + " is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.visit.email)) return "Enter a valid customer email address.";
  if (!state.selectedIds.length) return "Select at least one appliance.";
  for (const record of selectedRecords()) {
    if (![...(record.appliancePhotos || []), ...(record.tagPhotos || []), ...(record.issuePhotos || [])].length) return "Add an inspection photo for " + record.type + ".";
    if (!record.assessmentConfirmed) return "Confirm the condition and score of " + record.type + ".";
    if (!record.notes.trim()) return "Enter findings and recommendations for " + record.type + ".";
  }
  return "";
}

async function preparePdf() {
  if (state.pdfPreparing) return;
  const issue = sessionIssue();
  if (issue) { showToast(issue); return; }
  state.pdfPreparing = true;
  const button = document.querySelector('[data-action="prepare-pdf"]');
  if (button) { button.disabled = true; button.textContent = "Preparing PDF…"; }
  try {
    const pdf = await window.ATPReportExport.generate(state.visit, selectedRecords());
    state.readyPdf = pdf;
    state.sessionReports.unshift({
      customerName: state.visit.customerName,
      applianceCount: state.selectedIds.length,
      preparedAt: new Date().toLocaleString(),
      pdf
    });
    state.sessionReports = state.sessionReports.slice(0, 3);
    renderReviewComplete();
    showToast("PDF ready. Now save it and share with customer + ATP office.");
  } catch (error) {
    showToast(error && error.message ? error.message : "PDF could not be generated.");
    if (button) { button.disabled = false; button.textContent = "Prepare PDF"; }
  } finally { state.pdfPreparing = false; }
}

function downloadBlob(pdf) {
  const url = URL.createObjectURL(pdf.blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = pdf.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 45000);
  showToast("PDF saved/downloaded. Send it to customer and ATP office.");
}

function downloadPdf() {
  if (!state.readyPdf) { showToast("Prepare the PDF first."); return; }
  downloadBlob(state.readyPdf);
}

async function sharePdf() {
  if (!state.readyPdf) { showToast("Prepare the PDF first."); return; }
  const result = state.readyPdf;
  const file = new File([result.blob], result.fileName, { type: "application/pdf" });
  if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    try {
      await navigator.share({
        files: [file],
        title: "ATP Appliance Healthscore Card",
        text: "Inspection report from Appliance Tech Pros. Copy ATP's office at " + result.officeEmail + "."
      });
      showToast("Verify the report was sent to both customer and ATP office.");
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }
  downloadPdf();
  showToast("Saved the PDF. Attach it to an email to the customer and ATP office.");
}

async function copyRecipients() {
  const addresses = [state.visit.email, window.ATPReportExport.OFFICE_EMAIL].filter(Boolean).join(", ");
  try {
    await navigator.clipboard.writeText(addresses);
    showToast("Both email addresses copied.");
  } catch { showToast("Use customer email and atpcaresupport@gmail.com."); }
}

function newVisit() {
  state.history = [];
  state.visit = { ...emptyVisit, date: [
    new Date().getFullYear(),
    String(new Date().getMonth() + 1).padStart(2, "0"),
    String(new Date().getDate()).padStart(2, "0")
  ].join("-") };
  state.activeCategory = "Common"; state.search = "";
  state.selectedIds = []; state.currentIndex = 0; state.appliances = {};
  state.readyPdf = null;
  setScreen("customer");
}

function render() {
  backButton.hidden = state.screen === "start";
  document.querySelector(".app-header").classList.toggle("is-home", state.screen === "start");
  const screens = {
    start: renderStart,
    customer: renderCustomer,
    select: renderSelect,
    details: renderDetails,
    questions: renderQuestions,
    score: renderScoreNotes,
    review: renderReviewComplete,
    report: renderReport,
    history: renderHistory
  };
  screens[state.screen]();
  app.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "start") setScreen("customer");

  if (button.dataset.category) {
    state.activeCategory = button.dataset.category;
    state.search = "";
    renderSelect();
  }

  if (button.dataset.toggle) {
    invalidatePreparedPdf();
    const id = button.dataset.toggle;
    state.selectedIds = state.selectedIds.includes(id)
      ? state.selectedIds.filter((selected) => selected !== id)
      : [...state.selectedIds, id];
    renderSelect();
  }

  if (button.dataset.action === "add-selected") {
    if (!state.selectedIds.length) {
      showToast("Select at least one appliance for this visit.");
      return;
    }
    state.selectedIds.forEach((id) => {
      state.appliances[id] ||= createRecord(id);
    });
    state.currentIndex = 0;
    setScreen("details");
  }

  if (button.dataset.answer) {
    const card = button.closest("[data-question]");
    currentRecord().answers[card.dataset.question] = button.dataset.answer;
    card.querySelectorAll(".choice").forEach((choice) => choice.classList.remove("active"));
    button.classList.add("active");
  }

  if (button.dataset.action === "questions-next") {
    document.querySelectorAll("[data-question]").forEach((card) => {
      const active = card.querySelector(".choice.active");
      if (active && !currentRecord().answers[card.dataset.question]) {
        currentRecord().answers[card.dataset.question] = active.dataset.answer;
      }
    });
    const concern = document.querySelector("[data-concern]");
    if (concern) currentRecord().concern = concern.value.trim();
    updateSuggestedScore(currentRecord());
    invalidatePreparedPdf();
    setScreen("score");
  }

  if (button.dataset.condition) {
    const record = currentRecord();
    record.overallCondition = button.dataset.condition;
    updateSuggestedScore(record);
    record.assessmentConfirmed = true;
    invalidatePreparedPdf();
    renderScoreNotes();
  }

  if (button.dataset.service) {
    currentRecord().serviceRecommended = button.dataset.service;
    invalidatePreparedPdf();
    document.querySelectorAll("[data-service]").forEach((choice) => choice.classList.remove("active"));
    button.classList.add("active");
  }

  if (button.dataset.removePhoto) {
    const [group, index] = button.dataset.removePhoto.split(":");
    currentRecord()[group].splice(Number(index), 1);
    invalidatePreparedPdf();
    renderDetails();
  }

  if (button.dataset.previewPhoto) {
    const [group, index] = button.dataset.previewPhoto.split(":");
    renderPhotoPreview(group, Number(index));
  }

  if (button.dataset.action === "back-to-details") renderDetails();
  if (button.dataset.action === "save-appliance") nextAfterAppliance();
  if (button.dataset.action === "report") setScreen("report");
  if (button.dataset.action === "prepare-pdf") { preparePdf(); return; }
  if (button.dataset.action === "download-pdf") { downloadPdf(); return; }
  if (button.dataset.action === "share-pdf") { sharePdf(); return; }
  if (button.dataset.action === "copy-recipients") { copyRecipients(); return; }
  if (button.dataset.action === "new-visit") { newVisit(); return; }
  if (button.dataset.action === "download-history-pdf") {
    const report = state.sessionReports[Number(button.dataset.sessionIndex)];
    if (report) downloadBlob(report.pdf);
    return;
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.dataset.form === "visit") {
    if (!form.reportValidity()) return;
    state.visit = Object.fromEntries(new FormData(form).entries());
    invalidatePreparedPdf();
    setScreen("select");
  }
  if (form.dataset.form === "details") {
    const data = new FormData(form);
    const record = currentRecord();
    record.type = data.get("type");
    record.brand = data.get("brand");
    record.model = data.get("model");
    record.serial = data.get("serial");
    record.age = data.get("age");
    if (!String(record.brand || "").trim()) { showToast("Enter the appliance brand or write Unknown."); return; }
    invalidatePreparedPdf();
    setScreen("questions");
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.name && target.closest('[data-form="visit"]')) { state.visit[target.name] = target.value; invalidatePreparedPdf(); }
  if (target.name && target.closest('[data-form="details"]')) { currentRecord()[target.name] = target.value; invalidatePreparedPdf(); }
  if (target.matches("[data-notes]")) { currentRecord().notes = target.value; invalidatePreparedPdf(); }
  if (target.matches("[data-concern]")) { currentRecord().concern = target.value; invalidatePreparedPdf(); }
  if (event.target.matches("[data-search]")) {
    state.search = event.target.value;
    renderSelect();
    const search = document.querySelector("[data-search]");
    if (search) {
      search.focus();
      search.setSelectionRange(state.search.length, state.search.length);
    }
  }
  if (event.target.matches("[data-score-slider]")) {
    const record = currentRecord();
    record.confirmedScore = Number(event.target.value);
    record.assessmentConfirmed = true;
    invalidatePreparedPdf();
    record.status = statusFromScore(record.confirmedScore);
    document.querySelector("#scoreValue").textContent = record.confirmedScore.toFixed(1);
    document.querySelector("#statusValue").textContent = record.status;
  }
  if (event.target.matches("[data-photo-caption]")) {
    const [group, index] = event.target.dataset.photoCaption.split(":");
    currentRecord()[group][Number(index)].caption = event.target.value;
    invalidatePreparedPdf();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-photo-group]")) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      currentRecord()[event.target.dataset.photoGroup].push({ src: reader.result, caption: "" });
      invalidatePreparedPdf();
      renderDetails();
    };
    reader.readAsDataURL(file);
  }
});

backButton.addEventListener("click", goBack);
historyButton.addEventListener("click", () => setScreen("history"));

render();
