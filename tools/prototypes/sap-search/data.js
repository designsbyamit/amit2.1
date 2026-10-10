// Content from the Figma file "S-Projects › AI-Powered Search" (frames 1.1–5.4).
// Rows marked `sample: true` are illustrative filler where the Figma text could not be read.
export const user = { name: 'Alex', initials: 'AJ' };

export const homeSuggestions = [
  { text: 'Create Purchase Order', icon: 'add-document' },
  { text: 'Approve Purchase Requisition', icon: 'approvals' },
  { text: 'View Procurement Dashboard', icon: 'business-objects-experience' },
  { text: 'Compare Suppliers — Q2 2026', icon: 'compare' },
];

export const scenarios = [
  { id: 'po', title: 'Procurement insights', subtitle: 'Find pending purchase orders', query: 'purchase orders', icon: 'sales-order' },
  { id: 'travel', title: 'Travel & Expense', subtitle: 'Book a business trip in SAP Concur', query: 'flight to Bangalore', icon: 'flight' },
  { id: 'buy', title: 'Procurement', subtitle: 'Compare and order devices in SAP Ariba', query: 'iPhone 17 Pro', icon: 'cart' },
  { id: 'goals', title: 'People & Performance', subtitle: 'Review team goals in SuccessFactors', query: 'Alex Johnson goals', icon: 'employee' },
];

// Type-ahead dictionary: what the field suggests while typing
export const typeahead = [
  { text: 'purchase orders', description: 'Purchase Orders · S/4HANA', icon: 'sales-order', route: 'po' },
  { text: 'pending purchase orders', description: 'Purchase Orders · S/4HANA', icon: 'sales-order', route: 'po' },
  { text: 'purchase requisitions to approve', description: 'Approvals', icon: 'approvals', route: 'po' },
  { text: 'flight to Bangalore', description: 'Travel · SAP Concur', icon: 'flight', route: 'travel' },
  { text: 'flight SFO to BLR, June 10–17', description: 'Travel · SAP Concur', icon: 'flight', route: 'travel' },
  { text: 'hotel in Bangalore', description: 'Travel · SAP Concur', icon: 'building', route: 'travel' },
  { text: 'iPhone 17 Pro', description: 'Catalog · SAP Ariba', icon: 'iphone', route: 'buy' },
  { text: 'iPhone 17 vs iPhone 17 Pro comparison', description: 'Catalog · SAP Ariba', icon: 'compare', route: 'buy' },
  { text: 'Alex Johnson goals', description: 'Goals · SuccessFactors', icon: 'goal', route: 'goals' },
  { text: 'Alex Johnson — Q2 2026 goals', description: 'Goals · SuccessFactors', icon: 'goal', route: 'goals' },
];

export const aiCapsules = ['Open POs', 'Overdue', 'Pending Approval', 'By Supplier', 'This Quarter', 'High Value'];

export const poResults = {
  title: 'Pending POs', meta: '14 results · $1.8M impacted',
  tabs: [['All', 14], ['Purchase Orders', 14], ['Suppliers', 3], ['Approvals', 5], ['Analytics', null]],
  rows: [
    { id: '4500012345', title: 'PO 4500012345 — Office Supplies', vendor: 'Staples GmbH', createdBy: 'Maria Schmidt', createdOn: '15 May 2026', amount: '€2,400.00', currency: 'EUR', companyCode: '1000', status: 'Open' },
    { id: '4500012351', title: 'PO 4500012351 — Laptops (25 units)', vendor: 'CDW Enterprise', createdBy: 'Maria Schmidt', createdOn: '12 May 2026', amount: '€48,750.00', currency: 'EUR', companyCode: '1000', status: 'Pending Approval', sample: true },
    { id: '4500012362', title: 'PO 4500012362 — Packaging Material', vendor: 'Smurfit Westrock', createdBy: 'Jonas Weber', createdOn: '9 May 2026', amount: '€126,300.00', currency: 'EUR', companyCode: '1000', status: 'Overdue', sample: true },
    { id: '4500012370', title: 'PO 4500012370 — Facility Services Q2', vendor: 'ISS Facility Services', createdBy: 'Priya Nair', createdOn: '6 May 2026', amount: '€310,000.00', currency: 'EUR', companyCode: '1000', status: 'Pending Approval', sample: true },
    { id: '4500012384', title: 'PO 4500012384 — Cloud Licences', vendor: 'Contoso Software', createdBy: 'Alex Johnson', createdOn: '2 May 2026', amount: '€92,400.00', currency: 'EUR', companyCode: '1000', status: 'Open', sample: true },
  ],
};

export const travel = {
  meta: '8 flights found · San Francisco (SFO) → Bangalore (BLR) · Jun 10–17, 2026',
  insight: 'Emirates EK237 is the preferred SFO→BLR route at $1,240. 1 stop Dubai (DXB). Policy compliant. Preferred hotel: The Leela Palace, Bangalore.',
  flights: [
    { code: 'EK237', airline: 'Emirates', dep: '08:00 SFO', arr: '23:30+1 BLR', stops: '1 stop · DXB', fare: '$1,240', preferred: true },
    { code: 'QR738', airline: 'Qatar Airways', dep: '16:05 SFO', arr: '04:10+2 BLR', stops: '1 stop · DOH', fare: '$1,310', sample: true },
    { code: 'LH455', airline: 'Lufthansa', dep: '15:40 SFO', arr: '01:45+2 BLR', stops: '1 stop · FRA', fare: '$1,395', sample: true },
  ],
  booking: {
    title: 'Book Flight — Palo Alto to Bangalore',
    crumbs: ['Travel', 'SFO to Bangalore', 'Select Flight', 'Review'],
    flight: 'EK237 — San Francisco (SFO) → Bangalore (BLR)',
    details: [['Airline', 'Emirates'], ['Departure', "08:00 — San Francisco Int'l (SFO)"], ['Arrival', "23:30+1 — Kempegowda Int'l Airport (BLR)"], ['Class', 'Economy'], ['Fare', '$1,240.00']],
    summary: [['Traveller', 'Maria Schmidt'], ['Company Code', '1000'], ['Cost Center', 'IT-0450'], ['Trip Purpose', 'Business Meeting'], ['Approval Required', 'No (< €400)']],
    total: '$1,240.00',
  },
};

export const procurement = {
  title: 'iPhone 17 vs iPhone 17 Pro comparison', meta: '2 products compared',
  aiTitle: 'AI Comparison: iPhone 17 vs iPhone 17 Pro',
  // Rows exactly as in Figma frame 4.3 (note: spec values in the file describe laptops; see report)
  products: ['iPhone 17', 'iPhone 17 Pro'],
  rows: [['Processor', 'Intel Core i7-1365U', 'Intel Core i7-1355U'], ['RAM', '16 GB DDR5', '16 GB DDR4'], ['Storage', '512 GB NVMe SSD', '512 GB SSD'], ['Display', '14" 2.8K OLED', '15.6" FHD IPS'], ['Weight', '1.12 kg', '1.78 kg'], ['Warranty', '3 years on-site', '3 years ProSupport']],
  ariba: {
    title: 'Procurement — iPhone 17 Pro (Qty: 50)',
    crumbs: ['Catalog', 'IT Equipment', 'Mobile Devices', 'iPhone 17 Pro'],
    product: 'Apple iPhone 17 Pro — 256GB Natural Titanium', price: '$59,950.00', unit: 1199,
    details: [['Supplier', 'CDW Enterprise Technology Solutions'], ['SKU', 'MYPG3LL/A — Natural Titanium 256GB'], ['Lead Time', '2–3 business days'], ['Contract', 'Apple Enterprise 2026 — CDW Preferred Contract']],
    qty: 50,
  },
};

export const goals = {
  title: 'Alex Johnson — Q2 2026 Goals', meta: 'Performance Manager: Sarah Chen · Department: Engineering',
  items: [
    ['Deliver Q2 Product Roadmap', 'Complete all 3 milestones by end of June 2026', 75, 'On Track'],
    ['Improve Team Velocity by 20%', 'Increase sprint completion rate through process improvements', 60, 'On Track'],
    ['Complete Leadership Training', 'Finish SAP Internal Leadership Certification Program', 40, 'In Progress'],
    ['Customer Satisfaction Score ≥ 4.5', 'NPS improvement initiative with monthly reviews', 55, 'In Progress'],
    ['Mentor 2 Junior Developers', 'Monthly 1:1 sessions and code review support', 50, 'In Progress'],
    ['Reduce Tech Debt by 30%', 'Refactoring backlog clearance with Platform team', 20, 'At Risk'],
  ],
  draft: { name: 'Deliver Q2 Product Roadmap', description: 'Complete all 3 milestones by end of June 2026 with full stakeholder sign-off', target: 'June 30, 2026', category: 'Operational Excellence', progress: 75, weight: '20%' },
};
