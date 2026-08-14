# ATP Care Health Scorecard Prototype

Status: PLANNED prototype  
Last updated: 2026-08-13

## Purpose

This isolated static prototype demonstrates a mobile-first ATP Care Appliance Health Check workflow for technician and owner review. It is not a production app.

## Technician Workflow

1. Review customer, service address, technician, and inspection date.
2. Confirm or edit fake demo visit information.
3. Select multiple appliances from a grouped/searchable residential appliance taxonomy.
4. Enter appliance details.
5. Add appliance and model/serial tag photos.
6. Add multiple optional issue/condition photos with optional captions.
7. Answer 2-4 short appliance-specific customer questions.
8. Select one Overall Condition for the appliance.
9. Confirm or adjust the suggested score out of 10.
10. Add one concise Findings & Recommendations note and mark Service Recommended Yes/No.
11. Continue to the next appliance or final Review & Complete page.

## Customer Report Workflow

The customer report preview shows customer-friendly cards with appliance photo, appliance type, brand, model, approximate age, score, status, technician notes, issue photos, and Service Recommended when applicable.

## Appliance Taxonomy

The selector is organized by:

- Common
- Refrigeration
- Cooking
- Laundry
- Dishwashing
- Ice / Beverage
- Ventilation
- Specialty / Other

Specialty appliances are marked `Service scope confirmation required` where ATP operational scope must be confirmed. Microwave is not listed as a standard serviced appliance. Combination/speed oven entries are explicitly labeled for ATP review when microwave functionality may be involved.

## Inspection History Concept

The history view demonstrates that every completed health check should become a separate dated record. Previous inspection snapshots must not be overwritten.

## Future Backend Requirements

- Authentication and technician identity
- Permanent visit records
- Child appliance inspection records
- Score and status audit history
- Secure photo storage
- Offline or poor-signal handling
- Backend validation
- Customer report generation

## Future Housecall Pro Integration

Housecall Pro should remain the source of truth for customer identity, contact information, service history, payment, plan, and membership. A future production scorecard should link completed inspections back to the correct Housecall Pro customer/job without replacing Housecall Pro as source of truth.

## Future Airtable Integration

Airtable may be used for operating queues, manager review, reporting, follow-up, and service-recommended workflows. This prototype makes no Airtable calls.

## Future Email / PDF Delivery

Future production work must define branded PDF generation, customer email delivery, delivery logging, resend handling, and permanent report storage.

## Future Photo Storage

Prototype photos are browser-local previews only. Production photos require secure storage, thumbnail generation, access control, retention rules, and deletion policy.

## Fake / Prototype-Only Items

- Demo customer information
- Demo technician
- Demo brands and model numbers
- Local image previews with multiple photos per appliance group
- In-memory state
- Suggested score logic
- Save, report generation, and send-to-customer actions

## Open Locally

Open `implementation/health-scorecard-prototype/index.html` in a browser.

No build step is required.
