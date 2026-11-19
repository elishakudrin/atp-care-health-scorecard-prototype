# ATP Care — Appliance Healthscore Card

## Current implementation
The published GitHub Pages version is a **mobile-first, browser-local report creation tool**. It is not the secured Cloudflare production backend. Do not mistake a prepared or shared PDF for confirmed customer delivery or a saved Housecall Pro record.

### Working features
- Enter customer, address, technician, contact and inspection date (blank for every new visit).
- Select appliances and record brand, model, serial, estimated age and concerns.
- Take/upload appliance, model tag and issue photos on a phone.
- Answer inspection questions; confirm condition and technician Health Score.
- Enter findings and recommendations for each appliance.
- Prepare a combined, branded PDF with photos locally in the browser.
- Save/download the PDF or use a supported phone's native **Share PDF** sheet.
- Copy the customer and office email addresses.
- Access prepared reports during the **same open browser tab only**.

### Technician workflow
1. Open the site on your phone. Select **Start Visit**.
2. Enter the real customer details and choose the appliances being inspected.
3. Add at least one photo for each inspected appliance; record brand, condition and findings.
4. Review the results and tap **Prepare PDF**.
5. Tap **Share PDF** (on iPhone) to send it by approved email with the customer **and** `atpcaresupport@gmail.com` included. If native sharing is unavailable, tap **Save PDF** and manually attach it to an email.
6. Verify both recipients received their copies. Ensure the office records the report against the right HCP job.

### Critical delivery limitations
- **No automatic customer or office email** is sent from GitHub Pages.
- **No durable customer history or cloud report storage** exists in this version.
- **No Housecall Pro integration** is active.
- The temporary report history disappears when the tab is closed or refreshed. Download/share each PDF before closing.
- Customer data stays in the browser memory until the technician shares/downloads a report. Avoid using shared or unmanaged devices; clear browser files and downloads in line with ATP privacy procedures.
- Do not publish customer photos, reports, or personal information into this public GitHub repository.

### Production work still required
Production architecture and data-delivery code are held separately in `elishakudrin/atp-care-plan-system/implementation/health-scorecard-prototype/`. The secure deployment requires Cloudflare Access, verified JWT/session credentials, a D1 database, private R2 storage, validated Resend sending, and end-to-end testing before automatic delivery can be switched on.

The original ATP Care logo is used unchanged, with a transparent PNG background.
