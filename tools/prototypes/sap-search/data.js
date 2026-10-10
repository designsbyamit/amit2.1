// Content transcribed from the Figma file "S-Projects › AI-Powered Search", frames 1.1–5.4.
export const apps = { s4: 'S/4HANA Cloud', ariba: 'Ariba', concur: 'Concur', sf: 'SuccessFactors', fieldglass: 'Fieldglass' };

export const home = {
  app: 's4', greeting: 'Good morning, Alex', sub: 'What would you like to do today?',
  cards: [['My Purchase Orders', '12 active', '14 pending POs', 'po'], ['Pending Invoices', '3 need approval', '14 pending POs', 'po'], ['Catalog', 'Browse products', '14 pending POs', 'buy'], ['Reports', 'Spend analytics', '14 pending POs', 'po']],
  suggestions: ['Create Purchase Order', 'Approve Purchase Requisition', 'View Procurement Dashboard', 'Compare Suppliers — Q2 2026'],
};

// Type-ahead lists exactly as in frames 1.4, 1.5, 3.2, 4.2, 5.2
export const typeahead = {
  sow: { route: 'sow', app: 'Fieldglass', items: ['Current status & end date of SOW IDs for CyberSecure Ltd', 'At-risk SOWs — CyberSecure Ltd', 'SOWs expiring in the next 30 days — CyberSecure Ltd', 'Pending items on SOW 1150 — Endpoint Protection Rollout', 'Workers assigned to SOW 1133 — Compliance Readiness'] },
  purchase: { route: 'po', app: 'S/4HANA Cloud', items: ['PO 4500012345 — ACME Office Supplies', 'PR 7800098765 — IT Equipment Request', 'Contract CNT-2026-001 — Facilities Mgmt', 'Invoice INV-884521 — Accenture Services', 'GR 5500045321 — Electronics Delivery'] },
  pur: { route: 'po', app: 'S/4HANA Cloud', items: ['Purchase Orders — Pending Approval (14)', 'Purchase Requisitions — New This Week (8)', 'Purchase Contract — IT Equipment 2026', 'Purchase Invoice — Due This Week (3)'] },
  flight: { route: 'travel', app: 'Concur', items: ['Business Trip · SFO → BLR · Emirates EK237 · Jun 10–17', 'Business Trip · SFO → SIN · Singapore Airlines · Jul 3–10', 'Conference · SFO → NRT · ANA NH106 · Aug 15–22', 'Workshop · SFO → ZRH · Swiss LX40 · Sep 5–12', 'SAP Global Summit · SFO → AMS · KLM · Sep 20–27'] },
  laptop: { route: 'buy', app: 'Ariba', items: ['Difference: iPhone 17 vs iPhone 17 Pro', 'Difference: iPhone 17 vs iPhone 17 Air', 'Difference: iPhone 17 vs iPhone 16 Pro', 'Difference: iPhone 17 Pro vs Samsung S25 Ultra', 'Difference: iPhone 17 Pro vs iPhone 17 Pro Max'] },
  goals: { route: 'goals', app: 'SuccessFactors', items: ['Draft quarterly OKRs — Product Design Q3', 'Generate goals aligned to company strategy', 'Review goal progress — Engineering team', 'Calibrate performance metrics Q2 2026', 'Apply leadership goal templates'] },
};

export const capsules = {
  app: 'ariba', query: 'purchase orders', chips: ['Open POs', 'Overdue', 'Pending Approval', 'By Supplier', 'This Quarter', 'High Value'],
  cards: [['Open Purchase Orders', '47 items pending review'], ['Overdue Invoices', '12 invoices overdue'], ['Pending Approvals', '8 requests awaiting you'], ['Supplier Contracts', '5 expiring within 30 days']],
};

export const results = {
  title: 'Pending POs', meta: '14 results · $1.8M impacted',
  tabs: ['All (14)', 'Purchase Orders (14)', 'Suppliers (3)', 'Approvals (5)', 'Analytics'],
  all: [
    ['Due: Jan 31, 2026 · Vendor: Office Depot GmbH · $42,500 · ⚠ Overdue 8 days', 'Requestor: T. Mueller · Dept: Facility Mgmt', 'PO_Details.pdf', 'Negative'],
    ['Due: Feb 03, 2026 · Vendor: Lenovo Solutions AG · $127,800 · Pending L2', 'Requestor: A. Schneider · Dept: IT', 'Vendor_Quote.pdf', 'Critical'],
    ['Due: Jan 28, 2026 · Vendor: CleanPro Services · $18,200 · Pending L1', 'Requestor: D. Park · Dept: Operations', 'Service_Agreement.pdf', 'Critical'],
    ['Created 28 Apr 2026 · Vendor: SAP SE · Amount: €45,000', 'Requestor: L. Kim · Dept: Finance', 'Invoice_Draft.pdf', 'None'],
    ['Created 20 Apr 2026 · Vendor: Corporate Travel · Amount: €3,200', 'Requestor: T. Mueller · Dept: Facility Mgmt', 'PO_Details.pdf', 'None'],
  ],
  documents: [
    ['Modified 12 May 2026 · Finance Dept', 'Requestor: T. Mueller · Dept: Facility Mgmt', 'PO_Details.pdf'],
    ['Modified 05 May 2026 · Procurement Dept', 'Requestor: A. Schneider · Dept: IT', 'Vendor_Quote.pdf'],
    ['Modified 01 May 2026 · Sourcing Dept', 'Requestor: D. Park · Dept: Operations', 'Service_Agreement.pdf'],
    ['Modified 28 Apr 2026 · Legal Dept', 'Requestor: L. Kim · Dept: Finance', 'Invoice_Draft.pdf'],
    ['Modified 22 Apr 2026 · Finance Dept', 'Requestor: T. Mueller · Dept: Facility Mgmt', 'PO_Details.pdf'],
    ['Modified 15 Apr 2026 · HR Dept', 'Requestor: A. Schneider · Dept: IT', 'Vendor_Quote.pdf'],
  ],
  products: [['PO 4500012345', 'Office Supplies — Office Depot GmbH'], ['Standing Desk 180cm', 'Height-adjustable · SKU: SD-180-X'], ['Monitor 27" 4K', 'USB-C · SKU: MON-27-4K'], ['Laptop Bag 15"', 'Waterproof · SKU: LB-15-WP'], ['Keyboard & Mouse Set', 'Wireless · SKU: KMS-WL-SET'], ['USB-C Hub 7-port', 'Thunderbolt 4 · SKU: HUB-7-TB4']],
  panelList: [
    ['Created 15 May 2026 · Vendor: Staples GmbH · €2,400', 'Requestor: T. Mueller · Dept: Facility Mgmt', 'PO_Details.pdf'],
    ['Created 10 May 2026 · Vendor: Dell Technologies · €18,600', 'Requestor: A. Schneider · Dept: IT', 'Vendor_Quote.pdf'],
    ['Created 02 May 2026 · Vendor: CleanPro AG · €950', 'Requestor: D. Park · Dept: Operations', 'Service_Agreement.pdf'],
    ['Created 28 Apr 2026 · Vendor: SAP SE · €45,000', 'Requestor: L. Kim · Dept: Finance', 'Invoice_Draft.pdf'],
  ],
  detail: { title: 'PO 4500012345 — Office Supplies', status: 'Open', fields: [['Vendor', 'Staples GmbH'], ['Created By', 'Maria Schmidt'], ['Created On', '15 May 2026'], ['Net Amount', '€2,400.00'], ['Currency', 'EUR'], ['Company Code', '1000']] },
};

export const travel = {
  home: { app: 'concur', title: 'Travel & Expense', sub: 'Welcome back, Maria. What are you looking for today?', cards: [['My Trips', '2 upcoming · 1 pending approval', '3 trips booked'], ['Expense Reports', '3 open · 1 overdue', '3 trips booked'], ['Book Travel', 'Flights, Hotels, Cars', '3 trips booked'], ['Travel Requests', '1 pending approval', '3 trips booked'], ['Company Policy', 'Updated 01 May 2026', '3 trips booked'], ['Travel Support', '24/7 assistance available', '3 trips booked']] },
  query: 'Palo Alto to Bangalore',
  meta: '8 flights found · San Francisco (SFO) → Bangalore (BLR) · Jun 10–17, 2026',
  insight: 'AI Insight: Emirates EK237 is the preferred SFO→BLR route at $1,240. 1 stop Dubai (DXB). Policy compliant. Preferred hotel: The Leela Palace, Bangalore.',
  flights: [
    ['Emirates · Business · $1,240 · 21h 30m · 1 stop DXB · Policy Compliant ✓', 'Economy · 1 stop · 22h 15m · Policy compliant', 'Hotel_Booking.pdf', 'Positive'],
    ['Emirates · Economy · $980 · 23h 15m · 1 stop DXB · Policy Compliant ✓', 'Estimated cost: $1,247 per person', 'Itinerary.pdf', 'Positive'],
    ['United Airlines · Economy · $1,100 · 22h 50m · 1 stop FRA · Compliant ✓', 'Visa required · Processing: 5–7 days', 'Expense_Estimate.pdf', 'Positive'],
    ['Lufthansa · Business · $1,850 · 20h 15m · 1 stop MUC · Exceeds policy limit', '4.2★ · 0.8km from office · Breakfast incl.', 'Visa_Checklist.pdf', 'Negative'],
    ['Lufthansa · Economy · €245 · 1h 15m direct · Compliant with policy', 'Economy · 1 stop · 22h 15m · Policy compliant', 'Hotel_Booking.pdf', 'Positive'],
  ],
  booking: {
    title: 'Book Flight — Palo Alto to Bangalore', crumbs: ['Travel', 'SFO to Bangalore', 'Select Flight', 'Review'],
    flight: 'EK237 — San Francisco (SFO) → Bangalore (BLR)',
    details: [['Airline', 'Emirates'], ['Departure', "08:00 — San Francisco Int'l (SFO)"], ['Arrival', "23:30+1 — Kempegowda Int'l Airport (BLR)"], ['Class', 'Economy'], ['Fare', '$1,240.00']],
    summary: [['Traveller', 'Maria Schmidt'], ['Company Code', '1000'], ['Cost Center', 'IT-0450'], ['Trip Purpose', 'Business Meeting'], ['Approval Required', 'No (< €400)']],
    total: '$1,240.00',
  },
};

export const procurement = {
  home: { app: 's4', title: 'Procurement', sub: 'Welcome back, Maria. What are you looking for today?', cards: [['Purchase Orders', '12 open · 3 require action', '2 products compared'], ['Shopping Cart', '4 items · €8,240 total', '2 products compared'], ['RFQs & Bids', '6 active · 2 closing soon', '2 products compared'], ['Supplier Contracts', '28 active · 5 expiring', '2 products compared'], ['Preferred Suppliers', '142 approved suppliers', '2 products compared'], ['Invoices', '9 pending · 2 overdue', '2 products compared']] },
  title: 'iPhone 17 vs iPhone 17 Pro comparison', meta: '2 products compared', aiTitle: 'AI Comparison: iPhone 17 vs iPhone 17 Pro',
  products: [['Apple iPhone 17 Pro', 'Apple'], ['Dell Latitude 5540', 'Dell'], ['HP EliteBook 850', 'HP']],
  rows: [['Processor', 'Intel Core i7-1365U', 'Intel Core i7-1355U', 'Intel Core i7-1355U'], ['RAM', '16 GB DDR5', '16 GB DDR4', '16 GB DDR4'], ['Storage', '512 GB NVMe SSD', '512 GB SSD', '512 GB PCIe SSD'], ['Display', '14" 2.8K OLED', '15.6" FHD IPS', '15.6" FHD IPS'], ['Weight', '1.12 kg', '1.78 kg', '1.79 kg'], ['Warranty', '3 years on-site', '3 years ProSupport', '3 years next-day']],
  ariba: {
    title: 'Procurement — iPhone 17 Pro (Qty: 50)', crumbs: ['Catalog', 'IT Equipment', 'Mobile Devices', 'iPhone 17 Pro'],
    product: 'Apple iPhone 17 Pro — 256GB Natural Titanium', price: '$59,950.00', unit: 1199,
    details: [['Supplier', 'CDW Enterprise Technology Solutions'], ['SKU', 'MYPG3LL/A — Natural Titanium 256GB'], ['Lead Time', '2–3 business days'], ['Contract', 'Apple Enterprise 2026 — CDW Preferred Contract']],
    qty: 50,
  },
};

export const goals = {
  home: { app: 'sf', title: 'People & Performance', sub: 'Welcome back, Maria. What are you looking for today?', cards: [['My Team', '8 direct reports · 3 goals pending', '8 direct reports'], ['Goals', '3 open · 1 due this month', '8 direct reports'], ['Learning', '2 courses in progress', '8 direct reports'], ['Performance Review', 'Mid-year review: Jun 2026', '8 direct reports'], ['Time Off', '12 days remaining this year', '8 direct reports'], ['Org Chart', 'Explore company structure', '8 direct reports']] },
  title: 'Alex Johnson — Q2 2026 Goals', meta: 'Performance Manager: Sarah Chen · Department: Engineering',
  items: [
    ['Deliver Q2 Product Roadmap', 'Complete all 3 milestones by end of June 2026', 75, 'On Track'],
    ['Improve Team Velocity by 20%', 'Increase sprint completion rate through process improvements', 60, 'On Track'],
    ['Complete Leadership Training', 'Finish SAP Internal Leadership Certification Program', 40, 'In Progress'],
    ['Customer Satisfaction Score ≥ 4.5', 'NPS improvement initiative with monthly reviews', 55, 'On Track'],
    ['Mentor 2 Junior Developers', 'Monthly 1:1 sessions and code review support', 50, 'In Progress'],
    ['Reduce Tech Debt by 30%', 'Refactoring backlog clearance with Platform team', 20, 'At Risk'],
  ],
  draft: { name: 'Deliver Q2 Product Roadmap', description: 'Complete all 3 milestones by end of June 2026 with full stakeholder sign-off', category: 'Operational Excellence', progress: 75, weight: '20%' },
};

// Fieldglass SOW results, from Figma frames 6-61420 (At-Risk tab) and 6-61503 (All tab).
// The All frame lists SOW 1023 twice; the prototype shows the seven unique SOWs the AI summary refers to.
export const sow = {
  query: 'Current status & end date of SOW IDs for CyberSecure Ltd',
  question: 'Current status and end date of SOW IDs for CyberSecure Ltd?',
  filters: ['All', 'Supplier Name', 'Upcoming', 'Active', 'Location', 'Business Unit', 'Project Name'],
  summary: 'CyberSecure Ltd currently has seven active and historical Statements of Work (SOWs) in SAP Fieldglass. These SOWs span across various statuses including Active, Completed, In Review, and Expired. The total spend across these SOWs is approximately $415,000, with worker counts ranging from 0 to 8. Most active SOWs are progressing on schedule, while',
  summaryMore: 'three (1045, 1133 and 1150) are delayed and rated high risk: two are awaiting budget approval and one is short of staff. SOW 1101 was delivered ahead of schedule, and the end date of SOW 1120 is still to be confirmed while legal review is in progress.',
  tabs: ['All ({n})', 'At-Risk SOWs ({n})', 'Upcoming Expirations ({n})'],
  upcoming: ['1172', '1023'],
  rows: [
    { id: '1023', title: 'Cloud Security Audit', ref: 'SOW-201', unit: 'Supply Chain', desc: 'Ongoing audit of cloud infrastructure security.', owner: 'Priya Mehta', end: '30-Sep-2025', status: 'In Progress', risk: 'Low', note: 'On Track', progress: 95, employees: 3 },
    { id: '1045', title: 'Endpoint Protection Rollout', ref: 'SOW-202', unit: 'Supply Chain', desc: 'Deployment of endpoint protection across all devices.', owner: 'Arjun Rao', end: '15-Aug-2025', status: 'Delayed', risk: 'High', note: 'Awaiting budget approval', progress: 82, employees: 14 },
    { id: '1101', title: 'IAM Integration', ref: 'SOW-204', unit: 'Supply Chain', desc: 'Integration of Identity & Access Management systems.', owner: 'Rakesh Iyer', end: '10-Oct-2025', status: 'Completed', risk: 'Low', note: 'Delivered ahead of schedule', progress: 68, employees: 16 },
    { id: '1120', title: 'Penetration Testing', ref: 'SOW-205', unit: 'Supply Chain', desc: 'External and internal penetration testing engagement.', owner: 'Anil Deshmukh', end: 'TBD', status: 'In Review', risk: 'Medium', note: 'Legal review in progress', progress: 80, employees: 7 },
    { id: '1133', title: 'Compliance Readiness', ref: 'SOW-206', unit: 'Supply Chain', desc: 'Preparing for ISO 27001 certification.', owner: 'Sneha Patil', end: '11-Oct-2025', status: 'Delayed', risk: 'High', note: 'Awaiting budget approval', progress: 97, employees: 9 },
    { id: '1150', title: 'Endpoint Protection Rollout', ref: 'SOW-207', unit: 'Supply Chain', desc: 'Implementation of threat intel feeds and dashboards.', owner: 'Kavita Joshi', end: '05-Sep-2025', status: 'Delayed', risk: 'High', note: 'Slight delay due to staffing', progress: 85, employees: 12, pending: true },
    { id: '1172', title: 'Data Loss Prevention (DLP)', ref: 'SOW-208', unit: 'Supply Chain', desc: 'Rollout of DLP policies and monitoring tools.', owner: 'Rohit Sharma', end: '25-Sep-2025', status: 'In Progress', risk: 'Medium', note: 'Awaiting budget approval', progress: 90, employees: 5 },
  ],
};

// ── Search field: what the suggestions list shows (same as the case-study animation) ──
// [text, source application, route]
export const recent = [['Pending POs', 'S/4HANA Cloud', 'po'], ['Flight to Bangalore', 'Concur', 'travel'], ['Draft goals for product design team', 'SuccessFactors', 'goals']];
export const suggested = [['SOWs expiring this month', 'Fieldglass', 'sow'], ['Invoices awaiting my approval', 'S/4HANA Cloud', 'po']];
export const current = [['Current status & end date of SOW IDs for CyberSecure Ltd', 'Fieldglass', 'sow'], ['Current status of PO 4500012345 (ACME)', 'S/4HANA Cloud', 'po'], ['Current trip — SFO → BLR, Jun 10–17', 'Concur', 'travel'], ['Current quarter goals — Product Design team', 'SuccessFactors', 'goals']];

// ── One results layout for every product (structure of Figma 6-61420 / 6-61503) ──
// Each row: title, id tags, reference line, description, key facts, status, level, AI note, actions.
const TAG = { Low: ['Positive', 'sys-enter-2'], Medium: ['Critical', 'alert'], High: ['Negative', 'error'] };
const lvl = (l, label = 'Risk Level') => [`${label} - ${l}`, ...TAG[l]];
export const resultSets = {
  po: {
    app: 's4', icon: 'sales-order', query: 'Pending POs', question: 'Pending purchase orders',
    filters: ['All', 'Open POs', 'Overdue', 'Pending Approval', 'By Supplier', 'This Quarter', 'High Value'],
    summaryTitle: 'Purchase Order Summary',
    summary: 'There are 14 purchase orders pending in SAP S/4HANA Cloud, with $1.8M impacted. One is overdue: Office Depot GmbH ($42,500) is 8 days past its 31 January due date. Two are waiting on approval: Lenovo Solutions AG ($127,800) at level 2 and CleanPro Services ($18,200) at level 1,',
    more: 'which together hold up $146,000. The other orders are on schedule. Approving the Lenovo order clears the largest single amount, and the Office Depot order needs a follow-up with T. Mueller in Facility Mgmt.',
    total: 14, tabs: ['All ({n})', 'Overdue ({n})', 'Pending Approval ({n})'],
    rows: [
      { title: 'Office Depot GmbH — Office supplies', ids: ['$42,500'], ref: 'Requestor: T. Mueller • Facility Mgmt', desc: 'Purchase order with PO_Details.pdf attached.', kv: [['Due Date', '31-Jan-2026'], ['Approval', 'Approved']], status: ['Overdue', 'Negative'], level: lvl('High'), note: 'Overdue 8 days: follow up with the supplier', actions: [['Follow Up', 'Emphasized', 'email'], ['PO_Details.pdf', 'Default', 'pdf-attachment']], tabs: [1] },
      { title: 'Lenovo Solutions AG — IT equipment', ids: ['$127,800'], ref: 'Requestor: A. Schneider • IT', desc: 'Purchase order with Vendor_Quote.pdf attached.', kv: [['Due Date', '03-Feb-2026'], ['Approval', 'Level 2']], status: ['Pending Approval', 'Critical'], level: lvl('Medium'), note: 'Largest pending amount', actions: [['Approve', 'Emphasized', 'accept'], ['Vendor_Quote.pdf', 'Default', 'pdf-attachment']], tabs: [2] },
      { title: 'CleanPro Services — Facility services', ids: ['$18,200'], ref: 'Requestor: D. Park • Operations', desc: 'Service agreement with Service_Agreement.pdf attached.', kv: [['Due Date', '28-Jan-2026'], ['Approval', 'Level 1']], status: ['Pending Approval', 'Critical'], level: lvl('Medium'), note: 'Waiting on level-1 approval', actions: [['Approve', 'Emphasized', 'accept'], ['Service_Agreement.pdf', 'Default', 'pdf-attachment']], tabs: [2] },
      { title: 'SAP SE — Software services', ids: ['€45,000'], ref: 'Requestor: L. Kim • Finance', desc: 'Invoice draft with Invoice_Draft.pdf attached.', kv: [['Created', '28-Apr-2026'], ['Approval', 'Not required']], status: ['Open', 'Information'], level: lvl('Low'), note: 'On schedule', actions: [['Invoice_Draft.pdf', 'Default', 'pdf-attachment']], tabs: [] },
      { title: 'Corporate Travel — Travel services', ids: ['€3,200'], ref: 'Requestor: T. Mueller • Facility Mgmt', desc: 'Purchase order with PO_Details.pdf attached.', kv: [['Created', '20-Apr-2026'], ['Approval', 'Not required']], status: ['Open', 'Information'], level: lvl('Low'), note: 'On schedule', actions: [['PO_Details.pdf', 'Default', 'pdf-attachment']], tabs: [] },
    ],
  },
  travel: {
    app: 'concur', icon: 'flight', query: 'Flight to Bangalore', question: 'Flights from San Francisco (SFO) to Bangalore (BLR), Jun 10–17, 2026',
    filters: ['All', 'Policy Compliant', '1 Stop', 'Economy', 'Business', 'Airline', 'Departure Time'],
    summaryTitle: 'Trip Summary',
    summary: '8 flights match your trip from San Francisco (SFO) to Bangalore (BLR), 10–17 June 2026. Emirates EK237 is the preferred route at $1,240, with one stop in Dubai (DXB), and is within travel policy. The Lufthansa business fare at $1,850 is over the policy limit,',
    more: 'so it would need approval. The preferred hotel for this trip is The Leela Palace, Bangalore, 0.8 km from the office. India requires a visa, with processing taking 5–7 days, so apply before you book.',
    total: 8, tabs: ['All ({n})', 'Policy Compliant ({n})', 'Exceeds Policy ({n})'],
    rows: [
      { title: 'Emirates EK237 — via Dubai', ids: ['$1,240', 'Business'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Preferred route, with The Leela Palace as the preferred hotel.', kv: [['Duration', '21h 30m'], ['Stops', '1 (DXB)']], status: ['Policy Compliant', 'Positive'], level: ['Preferred Route', 'Positive', 'sys-enter-2'], note: 'Recommended for this trip', actions: [['Book', 'Emphasized', 'flight', 'concur']], tabs: [1] },
      { title: 'Emirates — via Dubai', ids: ['$980', 'Economy'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Estimated cost: $1,247 per person.', kv: [['Duration', '23h 15m'], ['Stops', '1 (DXB)']], status: ['Policy Compliant', 'Positive'], level: null, note: 'Lowest fare', actions: [['Book', 'Emphasized', 'flight', 'concur']], tabs: [1] },
      { title: 'United Airlines — via Frankfurt', ids: ['$1,100', 'Economy'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Visa required; processing takes 5–7 days.', kv: [['Duration', '22h 50m'], ['Stops', '1 (FRA)']], status: ['Policy Compliant', 'Positive'], level: null, note: 'Apply for the visa first', actions: [['Book', 'Emphasized', 'flight', 'concur']], tabs: [1] },
      { title: 'Lufthansa — via Munich', ids: ['$1,850', 'Business'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Fastest option on this route.', kv: [['Duration', '20h 15m'], ['Stops', '1 (MUC)']], status: ['Exceeds Policy', 'Negative'], level: ['Approval Needed', 'Critical', 'alert'], note: 'Over the policy limit', actions: [['Request Approval', 'Default', 'paper-plane']], tabs: [2] },
    ],
  },
  buy: {
    app: 'ariba', icon: 'product', query: 'laptop', question: 'Laptops in the IT equipment catalog',
    filters: ['All', 'On Contract', 'Supplier', 'Processor', 'Display', 'Weight', 'Lead Time'],
    summaryTitle: 'Product Comparison',
    summary: 'Three devices match in the IT equipment catalog. All have an Intel Core i7 processor, 16 GB of RAM, a 512 GB SSD and a three-year warranty. The Apple iPhone 17 Pro is the lightest at 1.12 kg, has a 14" 2.8K OLED display and is on the preferred CDW contract,',
    more: 'with a 2–3 business-day lead time; 50 units come to $59,950. The Dell Latitude 5540 and HP EliteBook 850 both have 15.6" FHD displays and weigh about 1.8 kg.',
    total: 3, tabs: ['All ({n})', 'On Contract ({n})', 'Catalog Only ({n})'],
    rows: [
      { title: 'Apple iPhone 17 Pro', ids: ['$1,199 / unit'], ref: 'Supplier: CDW • Apple Enterprise 2026', desc: 'Intel Core i7-1365U · 16 GB DDR5 · 512 GB NVMe SSD · 3 years on-site.', kv: [['Display', '14" 2.8K OLED'], ['Weight', '1.12 kg'], ['Lead Time', '2–3 days']], status: ['On Contract', 'Positive'], level: ['Preferred', 'Positive', 'sys-enter-2'], note: 'Lightest of the three', actions: [['Request in Ariba', 'Emphasized', 'cart', 'ariba']], tabs: [1] },
      { title: 'Dell Latitude 5540', ids: ['Dell'], ref: 'IT equipment catalog', desc: 'Intel Core i7-1355U · 16 GB DDR4 · 512 GB SSD · 3 years ProSupport.', kv: [['Display', '15.6" FHD IPS'], ['Weight', '1.78 kg'], ['Lead Time', '—']], status: ['Catalog', 'Information'], level: null, note: 'Heavier, larger display', actions: [['Request in Ariba', 'Default', 'cart', 'ariba']], tabs: [2] },
      { title: 'HP EliteBook 850', ids: ['HP'], ref: 'IT equipment catalog', desc: 'Intel Core i7-1355U · 16 GB DDR4 · 512 GB PCIe SSD · 3 years next-day.', kv: [['Display', '15.6" FHD IPS'], ['Weight', '1.79 kg'], ['Lead Time', '—']], status: ['Catalog', 'Information'], level: null, note: 'Next-day warranty service', actions: [['Request in Ariba', 'Default', 'cart', 'ariba']], tabs: [2] },
    ],
  },
  goals: {
    app: 'sf', icon: 'goal', query: 'Review goal progress — Engineering team', question: 'Q2 2026 goals for Alex Johnson',
    filters: ['All', 'On Track', 'At Risk', 'Category', 'Due Date', 'Team Member', 'Weight'],
    summaryTitle: 'Goal Summary',
    summary: 'Alex Johnson has six goals for Q2 2026 in SAP SuccessFactors. Three are on track, two are in progress and one is at risk: Reduce Tech Debt by 30% is 20% complete. The furthest along is Deliver Q2 Product Roadmap at 75%,',
    more: 'and average progress across all six goals is 50%. The leadership training and mentoring goals are at or below the halfway mark and may need time set aside before the June review.',
    total: 6, tabs: ['All ({n})', 'On Track ({n})', 'At Risk ({n})'],
    rows: [
      ['Deliver Q2 Product Roadmap', 'Complete all 3 milestones by end of June 2026', 75, 'On Track'],
      ['Improve Team Velocity by 20%', 'Increase sprint completion rate through process improvements', 60, 'On Track'],
      ['Complete Leadership Training', 'Finish SAP Internal Leadership Certification Program', 40, 'In Progress'],
      ['Customer Satisfaction Score ≥ 4.5', 'NPS improvement initiative with monthly reviews', 55, 'On Track'],
      ['Mentor 2 Junior Developers', 'Monthly 1:1 sessions and code review support', 50, 'In Progress'],
      ['Reduce Tech Debt by 30%', 'Refactoring backlog clearance with Platform team', 20, 'At Risk'],
    ].map(([t, d, p, st], i) => ({
      title: t, ids: [`${p}%`], ref: 'Alex Johnson • Engineering', desc: d, kv: [['Owner', 'Alex Johnson'], ['Manager', 'Sarah Chen']],
      status: [st, st === 'On Track' ? 'Positive' : st === 'At Risk' ? 'Negative' : 'Information'], level: lvl(st === 'At Risk' ? 'High' : st === 'On Track' ? 'Low' : 'Medium'),
      note: st === 'At Risk' ? 'Behind for the quarter' : p >= 60 ? 'Ahead of the halfway mark' : 'Around the halfway mark',
      actions: [['Edit Goal', i === 0 ? 'Emphasized' : 'Default', 'edit', 'goaldraft']], tabs: st === 'On Track' ? [1] : st === 'At Risk' ? [2] : [],
    })),
  },
};

resultSets.sow = {
  app: 'fieldglass', icon: 'employee-lookup', query: sow.query, question: sow.question, filters: sow.filters,
  summaryTitle: 'SOW Summary', summary: sow.summary, more: sow.summaryMore, total: sow.rows.length, tabs: sow.tabs,
  rows: sow.rows.map(r => ({
    title: `CyberSecure – ${r.title}`, ids: [`SOW ID ${r.id}`, `${r.progress}%`], ref: `${r.ref} • ${r.unit}`, desc: r.desc,
    kv: [['Owner', r.owner], ['End Date', r.end]],
    status: [r.status, { 'In Progress': 'Positive', Delayed: 'Critical', Completed: 'Positive', 'In Review': 'Information' }[r.status]],
    level: lvl(r.risk), note: r.note,
    actions: [[`${r.employees} Employees`, 'Emphasized', 'employee'], ...(r.status !== 'Completed' && r.status !== 'In Review' ? [['Add Worker', 'Default', 'add']] : []), ...(r.pending || r.risk === 'High' ? [['Pending Items', 'Default', '']] : [])],
    tabs: [...(r.risk === 'High' ? [1] : []), ...(sow.upcoming.includes(r.id) ? [2] : [])],
  })),
};
