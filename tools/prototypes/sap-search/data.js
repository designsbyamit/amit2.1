// Content transcribed from the Figma file "S-Projects › AI-Powered Search", frames 1.1–5.4.
export const apps = { s4: 'S/4HANA Cloud', ariba: 'Ariba', concur: 'Concur', sf: 'SuccessFactors' };

export const home = {
  app: 's4', greeting: 'Good morning, Alex', sub: 'What would you like to do today?',
  cards: [['My Purchase Orders', '12 active', '14 pending POs', 'po'], ['Pending Invoices', '3 need approval', '14 pending POs', 'po'], ['Catalog', 'Browse products', '14 pending POs', 'buy'], ['Reports', 'Spend analytics', '14 pending POs', 'po']],
  suggestions: ['Create Purchase Order', 'Approve Purchase Requisition', 'View Procurement Dashboard', 'Compare Suppliers — Q2 2026'],
};

// Type-ahead lists exactly as in frames 1.4, 1.5, 3.2, 4.2, 5.2
export const typeahead = {
  purchase: { route: 'po', items: ['PO 4500012345 — ACME Office Supplies', 'PR 7800098765 — IT Equipment Request', 'Contract CNT-2026-001 — Facilities Mgmt', 'Invoice INV-884521 — Accenture Services', 'GR 5500045321 — Electronics Delivery'] },
  pur: { route: 'po', items: ['Purchase Orders — Pending Approval (14)', 'Purchase Requisitions — New This Week (8)', 'Purchase Contract — IT Equipment 2026', 'Purchase Invoice — Due This Week (3)'] },
  flight: { route: 'travel', items: ['Business Trip · SFO → BLR · Emirates EK237 · Jun 10–17', 'Business Trip · SFO → SIN · Singapore Airlines · Jul 3–10', 'Conference · SFO → NRT · ANA NH106 · Aug 15–22', 'Workshop · SFO → ZRH · Swiss LX40 · Sep 5–12', 'SAP Global Summit · SFO → AMS · KLM · Sep 20–27'] },
  laptop: { route: 'buy', items: ['Difference: iPhone 17 vs iPhone 17 Pro', 'Difference: iPhone 17 vs iPhone 17 Air', 'Difference: iPhone 17 vs iPhone 16 Pro', 'Difference: iPhone 17 Pro vs Samsung S25 Ultra', 'Difference: iPhone 17 Pro vs iPhone 17 Pro Max'] },
  goals: { route: 'goals', items: ['Draft quarterly OKRs — Product Design Q3', 'Generate goals aligned to company strategy', 'Review goal progress — Engineering team', 'Calibrate performance metrics Q2 2026', 'Apply leadership goal templates'] },
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
