import fs from "node:fs";
import { chromium } from "playwright";
const url = "http://127.0.0.1:8765/";
const browser = await chromium.launch({ headless: true, channel: "chrome", args: ["--no-sandbox"] });
const errors = [];
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==", "base64");
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(url, { waitUntil: "networkidle" });
if (await page.locator(".screen-head h1").count()) throw Error("Duplicated giant home heading remains");
if (!(await page.locator(".logo-lockup strong").innerText()).includes("Appliance Healthscore Card")) throw Error("Header title missing");
await page.locator('[data-action="start"]').click();
for (const [name,value] of Object.entries({
  customerName: "QA Sample",
  address: "123 Sample Road, Atlanta GA",
  email: "qa@example.com",
  phone: "5550100000",
  technician: "Serge"
})) await page.locator('input[name="'+name+'"]').fill(value);
await page.locator('[data-form="visit"] [type="submit"]').click();
await page.locator('[data-toggle="refrigerator-freezer"]').click();
await page.locator('[data-action="add-selected"]').click();
await page.locator('input[name="brand"]').fill("GE");
await page.locator('input[name="model"]').fill("QA-2026");
await page.locator('#appliancePhotos-upload').setInputFiles({
  name: "test.png", mimeType: "image/png", buffer: png
});
await page.waitForFunction(() => document.querySelectorAll(".photo-tile img").length >= 1);
await page.locator('[data-form="details"] + .photo-gallery').count();
await page.locator('button[form="details-form"]').click();
await page.locator('.question-card').first().locator('[data-answer="Yes"]').click();
await page.locator('[data-action="questions-next"]').click();
await page.locator('[data-condition="Good"]').click();
await page.locator('[data-notes]').fill("Unit functions correctly; no issues found today.");
await page.locator('[data-action="save-appliance"]').click();
await page.locator('[data-action="prepare-pdf"]').click();
await page.waitForFunction(() => !document.querySelector('[data-action="download-pdf"]').disabled, { timeout: 20000 });
const [download] = await Promise.all([
  page.waitForEvent("download"),
  page.locator('[data-action="download-pdf"]').click()
]);
const bytes = fs.readFileSync(await download.path());
if (bytes.length < 3500 || bytes.toString("latin1",0,5) !== "%PDF-") throw Error("Downloaded report is not a real PDF: " + bytes.length);
for (const width of [320,375,390,430,768]) {
  await page.setViewportSize({ width, height: 844 });
  await page.waitForTimeout(150);
  const layout = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, vw: window.innerWidth,
    header: document.querySelector(".app-header").getBoundingClientRect().width,
    title: document.querySelector(".logo-lockup strong").getBoundingClientRect().width,
    history: document.querySelector("#historyButton").getBoundingClientRect().width
  }));
  if (layout.sw > layout.vw + 2) throw Error("Horizontal overflow at " + width + ": " + JSON.stringify(layout));
}
await page.locator("#historyButton").click();
if (await page.getByText("Aug 10, 2027").count()) throw Error("Fake inspection history remains");
if (!await page.getByText("QA Sample").count()) throw Error("Session report missing");
if (errors.length) throw Error("Browser runtime error(s): " + errors.join(" | "));
console.log("PASS: iPhone flow, customer visit, photo, score, real PDF (" + bytes.length + " bytes), session history, 5 breakpoints.");
await browser.close();
