// Content for the AI-search prototype. The behaviour, queries, suggestions, AI overviews and results
// come from the original AI-Powered Search prototype in the case study (Pending POs, Flight to Bangalore,
// laptop comparison, Q2 goals, SOW status). Names, amounts and dates are the demo data used there.

export type AppId = 's4' | 'concur' | 'ariba' | 'sf' | 'fieldglass'
export type Tone = 'pos' | 'neg' | 'warn' | 'info'
export type RouteKey = 'po' | 'travel' | 'buy' | 'goals' | 'sow'

export const apps: Record<AppId, { name: string; short: string; hue: string; role: string }> = {
  s4: { name: 'iSearch', short: 'iS', hue: '#6C8BFF', role: 'Procurement' },
  concur: { name: 'Concur', short: 'C', hue: '#34D6B6', role: 'Travel & Expense' },
  ariba: { name: 'Ariba', short: 'A', hue: '#FFB35C', role: 'Procurement' },
  sf: { name: 'SuccessFactors', short: 'SF', hue: '#C58BFF', role: 'People & Performance' },
  fieldglass: { name: 'Fieldglass', short: 'F', hue: '#FF7A9C', role: 'Contingent workforce' },
}

/* ---------- Home ---------- */

export const home = {
  greeting: 'Good morning, Alex',
  sub: 'What would you like to do today?',
  cards: [
    { t: 'My Purchase Orders', s: '12 active', icon: 'receipt', go: 'po' },
    { t: 'Pending Invoices', s: '3 need approval', icon: 'inbox', go: 'po' },
    { t: 'Catalog', s: 'Browse products', icon: 'box', go: 'buy' },
    { t: 'Reports', s: 'Spend analytics', icon: 'trend', go: 'po' },
  ] as { t: string; s: string; icon: string; go: RouteKey }[],
}

export const appHomes: Record<'travel' | 'buy' | 'goals', { app: AppId; title: string; sub: string; hint: string; cards: [string, string, string][] }> = {
  travel: { app: 'concur', title: 'Travel & Expense', sub: 'Welcome back, Maria. What are you looking for today?', hint: 'flight to Bangalore',
    cards: [['My Trips', '2 upcoming · 1 pending approval', 'plane'], ['Expense Reports', '3 open · 1 overdue', 'receipt'], ['Book Travel', 'Flights, Hotels, Cars', 'globe'], ['Travel Requests', '1 pending approval', 'send'], ['Company Policy', 'Updated 01 May 2026', 'book'], ['Travel Support', '24/7 assistance available', 'chat']] },
  buy: { app: 'ariba', title: 'Procurement', sub: 'Welcome back, Maria. What are you looking for today?', hint: 'laptop',
    cards: [['Purchase Orders', '12 open · 3 require action', 'receipt'], ['Shopping Cart', '4 items · €8,240 total', 'cart'], ['RFQs & Bids', '6 active · 2 closing soon', 'layers'], ['Supplier Contracts', '28 active · 5 expiring', 'doc'], ['Preferred Suppliers', '142 approved suppliers', 'users'], ['Invoices', '9 pending · 2 overdue', 'inbox']] },
  goals: { app: 'sf', title: 'People & Performance', sub: 'Welcome back, Maria. What are you looking for today?', hint: 'Draft goals for product design team',
    cards: [['My Team', '8 direct reports · 3 goals pending', 'users'], ['Goals', '3 open · 1 due this month', 'target'], ['Learning', '2 courses in progress', 'book'], ['Performance Review', 'Mid-year review: Jun 2026', 'flag'], ['Time Off', '12 days remaining this year', 'sun'], ['Org Chart', 'Explore company structure', 'layers']] },
}

/* ---------- Type-ahead ---------- */

export interface Sug { text: string; app: AppId; route: RouteKey }
const s = (app: AppId, route: RouteKey, items: string[]): Sug[] => items.map(text => ({ text, app, route }))

export const recent: Sug[] = [
  { text: 'Pending POs', app: 's4', route: 'po' },
  { text: 'Flight to Bangalore', app: 'concur', route: 'travel' },
  { text: 'Draft goals for product design team', app: 'sf', route: 'goals' },
]
export const suggested: Sug[] = [
  { text: 'SOWs expiring this month', app: 'fieldglass', route: 'sow' },
  { text: 'Invoices awaiting my approval', app: 's4', route: 'po' },
]
const current: Sug[] = [
  { text: 'Current status & end date of SOW IDs for CyberSecure Ltd', app: 'fieldglass', route: 'sow' },
  { text: 'Current status of PO 4500012345 (ACME)', app: 's4', route: 'po' },
  { text: 'Current trip — SFO → BLR, Jun 10–17', app: 'concur', route: 'travel' },
  { text: 'Current quarter goals — Product Design team', app: 'sf', route: 'goals' },
]
const sets = {
  sow: s('fieldglass', 'sow', ['Current status & end date of SOW IDs for CyberSecure Ltd', 'At-risk SOWs — CyberSecure Ltd', 'SOWs expiring in the next 30 days — CyberSecure Ltd', 'Pending items on SOW 1150 — Endpoint Protection Rollout', 'Workers assigned to SOW 1133 — Compliance Readiness']),
  purchase: s('s4', 'po', ['PO 4500012345 — ACME Office Supplies', 'PR 7800098765 — IT Equipment Request', 'Contract CNT-2026-001 — Facilities Mgmt', 'Invoice INV-884521 — Accenture Services', 'GR 5500045321 — Electronics Delivery']),
  pur: s('s4', 'po', ['Purchase Orders — Pending Approval (14)', 'Purchase Requisitions — New This Week (8)', 'Purchase Contract — IT Equipment 2026', 'Purchase Invoice — Due This Week (3)']),
  flight: s('concur', 'travel', ['Business Trip · SFO → BLR · Emirates EK237 · Jun 10–17', 'Business Trip · SFO → SIN · Singapore Airlines · Jul 3–10', 'Conference · SFO → NRT · ANA NH106 · Aug 15–22', 'Workshop · SFO → ZRH · Swiss LX40 · Sep 5–12', 'SAP Global Summit · SFO → AMS · KLM · Sep 20–27']),
  laptop: s('ariba', 'buy', ['Difference: iPhone 17 vs iPhone 17 Pro', 'Difference: iPhone 17 vs iPhone 17 Air', 'Difference: iPhone 17 vs iPhone 16 Pro', 'Difference: iPhone 17 Pro vs Samsung S25 Ultra', 'Difference: iPhone 17 Pro vs iPhone 17 Pro Max']),
  goals: s('sf', 'goals', ['Draft quarterly OKRs — Product Design Q3', 'Generate goals aligned to company strategy', 'Review goal progress — Engineering team', 'Calibrate performance metrics Q2 2026', 'Apply leadership goal templates']),
}

/** Same matching rules as the original prototype: plain-language prefixes decide which product answers. */
export function suggest(raw: string): Sug[] | null {
  const t = raw.trim().toLowerCase()
  if (!t) return null
  if (/^cu|current/.test(t)) {
    const hit = current.filter(c => c.text.toLowerCase().includes(t))
    return hit.length ? hit : current
  }
  if (/sow|cyber|fieldglass|supplier|end date/.test(t)) return sets.sow
  if (/^pur/.test(t) && t.length < 5) return sets.pur
  if (/^purch|po\b|invoice/.test(t)) return sets.purchase
  if (/flight|trip|bangalore|palo|travel/.test(t)) return sets.flight
  if (/laptop|iphone|device|compare|differ/.test(t)) return sets.laptop
  if (/goal|okr|draft|team|performance/.test(t)) return sets.goals
  return sets.pur
}

/* ---------- Results ---------- */

export interface Action { label: string; kind: 'primary' | 'ghost'; icon: string; go?: 'booking' | 'ariba' | 'goaldraft'; does?: 'approve' | 'follow' | 'file' | 'request' | 'worker' | 'items' | 'people' }
export interface Row {
  title: string; chips: string[]; ref: string; desc: string; kv: [string, string][]
  status: { label: string; tone: Tone }; level?: { label: string; tone: Tone }
  note: string; actions: Action[]; tabs: number[]; progress?: number
}
export interface Result {
  app: AppId; key: RouteKey; icon: string; query: string; question: string
  summaryTitle: string; summary: string; more: string; total: number
  sources: string[]; how: string[]
  tabs: string[]; facets: { label: string; test: (r: Row) => boolean }[]; rows: Row[]
}

const lvl = (t: 'Low' | 'Medium' | 'High', label = 'Risk Level'): { label: string; tone: Tone } => ({ label: `${label} · ${t}`, tone: t === 'High' ? 'neg' : t === 'Medium' ? 'warn' : 'pos' })
const pdf = (n: string): Action => ({ label: n, kind: 'ghost', icon: 'paperclip', does: 'file' })

const po: Result = {
  app: 's4', key: 'po', icon: 'receipt', query: 'Pending POs', question: 'Pending purchase orders',
  summaryTitle: 'Purchase Order Summary',
  summary: 'There are 14 purchase orders pending in iSearch, with $1.8M impacted. One is overdue: Office Depot GmbH ($42,500) is 8 days past its 31 January due date. Two are waiting on approval: Lenovo Solutions AG ($127,800) at level 2 and CleanPro Services ($18,200) at level 1,',
  more: 'which together hold up $146,000. The other orders are on schedule. Approving the Lenovo order clears the largest single amount, and the Office Depot order needs a follow-up with T. Mueller in Facility Mgmt.',
  total: 14, sources: ['iSearch · Purchase orders', 'Approval workflow'],
  how: ['Read “Pending POs” as: purchase orders not yet fully processed', 'Searched purchase orders in iSearch you can see', 'Grouped them by overdue and waiting on approval', 'Ranked by amount, so the largest exposure comes first'],
  tabs: ['All', 'Overdue', 'Pending Approval'],
  facets: [
    { label: 'Over $100K', test: r => /127,800/.test(r.chips[0]) },
    { label: 'Needs follow-up', test: r => /Follow/.test(r.actions[0].label) },
    { label: 'Level 2 approval', test: r => r.kv.some(([, v]) => v === 'Level 2') },
  ],
  rows: [
    { title: 'Office Depot GmbH — Office supplies', chips: ['$42,500'], ref: 'Requestor: T. Mueller • Facility Mgmt', desc: 'Purchase order with PO_Details.pdf attached.', kv: [['Due Date', '31-Jan-2026'], ['Approval', 'Approved']], status: { label: 'Overdue', tone: 'neg' }, level: lvl('High'), note: 'Overdue 8 days: follow up with the supplier', actions: [{ label: 'Follow Up', kind: 'primary', icon: 'mail', does: 'follow' }, pdf('PO_Details.pdf')], tabs: [1] },
    { title: 'Lenovo Solutions AG — IT equipment', chips: ['$127,800'], ref: 'Requestor: A. Schneider • IT', desc: 'Purchase order with Vendor_Quote.pdf attached.', kv: [['Due Date', '03-Feb-2026'], ['Approval', 'Level 2']], status: { label: 'Pending Approval', tone: 'warn' }, level: lvl('Medium'), note: 'Largest pending amount', actions: [{ label: 'Approve', kind: 'primary', icon: 'check', does: 'approve' }, pdf('Vendor_Quote.pdf')], tabs: [2] },
    { title: 'CleanPro Services — Facility services', chips: ['$18,200'], ref: 'Requestor: D. Park • Operations', desc: 'Service agreement with Service_Agreement.pdf attached.', kv: [['Due Date', '28-Jan-2026'], ['Approval', 'Level 1']], status: { label: 'Pending Approval', tone: 'warn' }, level: lvl('Medium'), note: 'Waiting on level-1 approval', actions: [{ label: 'Approve', kind: 'primary', icon: 'check', does: 'approve' }, pdf('Service_Agreement.pdf')], tabs: [2] },
    { title: 'Northwind SE — Software services', chips: ['€45,000'], ref: 'Requestor: L. Kim • Finance', desc: 'Invoice draft with Invoice_Draft.pdf attached.', kv: [['Created', '28-Apr-2026'], ['Approval', 'Not required']], status: { label: 'Open', tone: 'info' }, level: lvl('Low'), note: 'On schedule', actions: [pdf('Invoice_Draft.pdf')], tabs: [] },
    { title: 'Corporate Travel — Travel services', chips: ['€3,200'], ref: 'Requestor: T. Mueller • Facility Mgmt', desc: 'Purchase order with PO_Details.pdf attached.', kv: [['Created', '20-Apr-2026'], ['Approval', 'Not required']], status: { label: 'Open', tone: 'info' }, level: lvl('Low'), note: 'On schedule', actions: [pdf('PO_Details.pdf')], tabs: [] },
  ],
}

const book: Action = { label: 'Book', kind: 'primary', icon: 'plane', go: 'booking' }
const travel: Result = {
  app: 'concur', key: 'travel', icon: 'plane', query: 'Flight to Bangalore', question: 'Flights from San Francisco (SFO) to Bangalore (BLR), Jun 10–17, 2026',
  summaryTitle: 'Trip Summary',
  summary: '8 flights match your trip from San Francisco (SFO) to Bangalore (BLR), 10–17 June 2026. Emirates EK237 is the preferred route at $1,240, with one stop in Dubai (DXB), and is within travel policy. The Lufthansa business fare at $1,850 is over the policy limit,',
  more: 'so it would need approval. The preferred hotel for this trip is The Leela Palace, Bangalore, 0.8 km from the office. India requires a visa, with processing taking 5–7 days, so apply before you book.',
  total: 8, sources: ['Concur · Travel booking', 'Company travel policy'],
  how: ['Read “Flight to Bangalore” as your trip SFO → BLR, 10–17 June', 'Searched flights available to you in Concur', 'Checked each fare against your company travel policy', 'Put the preferred route first, then the rest by fare'],
  tabs: ['All', 'Policy Compliant', 'Exceeds Policy'],
  facets: [
    { label: '1 stop', test: r => r.kv.some(([k, v]) => k === 'Stops' && v.startsWith('1')) },
    { label: 'Economy', test: r => r.chips.includes('Economy') },
    { label: 'Business', test: r => r.chips.includes('Business') },
  ],
  rows: [
    { title: 'Emirates EK237 — via Dubai', chips: ['$1,240', 'Business'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Preferred route, with The Leela Palace as the preferred hotel.', kv: [['Duration', '21h 30m'], ['Stops', '1 (DXB)']], status: { label: 'Policy Compliant', tone: 'pos' }, level: { label: 'Preferred Route', tone: 'pos' }, note: 'Recommended for this trip', actions: [book], tabs: [1] },
    { title: 'Emirates — via Dubai', chips: ['$980', 'Economy'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Estimated cost: $1,247 per person.', kv: [['Duration', '23h 15m'], ['Stops', '1 (DXB)']], status: { label: 'Policy Compliant', tone: 'pos' }, note: 'Lowest fare', actions: [book], tabs: [1] },
    { title: 'United Airlines — via Frankfurt', chips: ['$1,100', 'Economy'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Visa required; processing takes 5–7 days.', kv: [['Duration', '22h 50m'], ['Stops', '1 (FRA)']], status: { label: 'Policy Compliant', tone: 'pos' }, note: 'Apply for the visa first', actions: [book], tabs: [1] },
    { title: 'Lufthansa — via Munich', chips: ['$1,850', 'Business'], ref: 'SFO → BLR • Jun 10–17, 2026', desc: 'Fastest option on this route.', kv: [['Duration', '20h 15m'], ['Stops', '1 (MUC)']], status: { label: 'Exceeds Policy', tone: 'neg' }, level: { label: 'Approval Needed', tone: 'warn' }, note: 'Over the policy limit', actions: [{ label: 'Request Approval', kind: 'ghost', icon: 'send', does: 'request' }], tabs: [2] },
  ],
}

const req = (primary: boolean): Action => ({ label: 'Request in Ariba', kind: primary ? 'primary' : 'ghost', icon: 'cart', go: 'ariba' })
const buy: Result = {
  app: 'ariba', key: 'buy', icon: 'box', query: 'laptop', question: 'Laptops in the IT equipment catalog',
  summaryTitle: 'Product Comparison',
  summary: 'Three devices match in the IT equipment catalog. All have an Intel Core i7 processor, 16 GB of RAM, a 512 GB SSD and a three-year warranty. The Apple iPhone 17 Pro is the lightest at 1.12 kg, has a 14" 2.8K OLED display and is on the preferred CDW contract,',
  more: 'with a 2–3 business-day lead time; 50 units come to $59,950. The Dell Latitude 5540 and HP EliteBook 850 both have 15.6" FHD displays and weigh about 1.8 kg.',
  total: 3, sources: ['Ariba · IT equipment catalog', 'Apple Enterprise 2026 contract'],
  how: ['Read “laptop” as a catalog search in IT equipment', 'Compared the three matching devices on the same specs', 'Checked which ones are on a preferred contract', 'Put the contract item first'],
  tabs: ['All', 'On Contract', 'Catalog Only'],
  facets: [
    { label: 'Lightest first', test: r => r.kv.some(([k, v]) => k === 'Weight' && parseFloat(v) < 1.5) },
    { label: 'OLED display', test: r => r.kv.some(([, v]) => /OLED/.test(v)) },
    { label: 'Next-day warranty', test: r => /next-day/.test(r.desc) },
  ],
  rows: [
    { title: 'Apple iPhone 17 Pro', chips: ['$1,199 / unit'], ref: 'Supplier: CDW • Apple Enterprise 2026', desc: 'Intel Core i7-1365U · 16 GB DDR5 · 512 GB NVMe SSD · 3 years on-site.', kv: [['Display', '14" 2.8K OLED'], ['Weight', '1.12 kg'], ['Lead Time', '2–3 days']], status: { label: 'On Contract', tone: 'pos' }, level: { label: 'Preferred', tone: 'pos' }, note: 'Lightest of the three', actions: [req(true)], tabs: [1] },
    { title: 'Dell Latitude 5540', chips: ['Dell'], ref: 'IT equipment catalog', desc: 'Intel Core i7-1355U · 16 GB DDR4 · 512 GB SSD · 3 years ProSupport.', kv: [['Display', '15.6" FHD IPS'], ['Weight', '1.78 kg'], ['Lead Time', '—']], status: { label: 'Catalog', tone: 'info' }, note: 'Heavier, larger display', actions: [req(false)], tabs: [2] },
    { title: 'HP EliteBook 850', chips: ['HP'], ref: 'IT equipment catalog', desc: 'Intel Core i7-1355U · 16 GB DDR4 · 512 GB PCIe SSD · 3 years next-day.', kv: [['Display', '15.6" FHD IPS'], ['Weight', '1.79 kg'], ['Lead Time', '—']], status: { label: 'Catalog', tone: 'info' }, note: 'Next-day warranty service', actions: [req(false)], tabs: [2] },
  ],
}

const goalRows: [string, string, number, string][] = [
  ['Deliver Q2 Product Roadmap', 'Complete all 3 milestones by end of June 2026', 75, 'On Track'],
  ['Improve Team Velocity by 20%', 'Increase sprint completion rate through process improvements', 60, 'On Track'],
  ['Complete Leadership Training', 'Finish Internal Leadership Certification Program', 40, 'In Progress'],
  ['Customer Satisfaction Score ≥ 4.5', 'NPS improvement initiative with monthly reviews', 55, 'On Track'],
  ['Mentor 2 Junior Developers', 'Monthly 1:1 sessions and code review support', 50, 'In Progress'],
  ['Reduce Tech Debt by 30%', 'Refactoring backlog clearance with Platform team', 20, 'At Risk'],
]
const goals: Result = {
  app: 'sf', key: 'goals', icon: 'target', query: 'Draft goals for product design team', question: 'Q2 2026 goals for Alex Johnson',
  summaryTitle: 'Goal Summary',
  summary: 'Alex Johnson has six goals for Q2 2026 in SuccessFactors. Three are on track, two are in progress and one is at risk: Reduce Tech Debt by 30% is 20% complete. The furthest along is Deliver Q2 Product Roadmap at 75%,',
  more: 'and average progress across all six goals is 50%. The leadership training and mentoring goals are at or below the halfway mark and may need time set aside before the June review.',
  total: 6, sources: ['SuccessFactors · Goals', 'Q2 2026 review cycle'],
  how: ['Read “goals for product design team” as Alex Johnson’s goals this quarter', 'Pulled the six Q2 2026 goals from SuccessFactors', 'Grouped them by on track, in progress and at risk', 'Ordered by the goal plan'],
  tabs: ['All', 'On Track', 'At Risk'],
  facets: [
    { label: 'Over halfway', test: r => (r.progress ?? 0) >= 50 },
    { label: 'Below halfway', test: r => (r.progress ?? 0) < 50 },
  ],
  rows: goalRows.map(([t, d, p, st], i) => ({
    title: t, chips: [`${p}%`], ref: 'Alex Johnson • Engineering', desc: d, kv: [['Owner', 'Alex Johnson'], ['Manager', 'Sarah Chen']],
    status: { label: st, tone: st === 'On Track' ? 'pos' : st === 'At Risk' ? 'neg' : 'info' } as { label: string; tone: Tone },
    level: lvl(st === 'At Risk' ? 'High' : st === 'On Track' ? 'Low' : 'Medium'),
    note: st === 'At Risk' ? 'Behind for the quarter' : p >= 60 ? 'Ahead of the halfway mark' : 'Around the halfway mark',
    actions: [{ label: 'Edit Goal', kind: i === 0 ? 'primary' : 'ghost', icon: 'edit', go: 'goaldraft' } as Action], tabs: st === 'On Track' ? [1] : st === 'At Risk' ? [2] : [], progress: p,
  })),
}

const sowRows = [
  { id: '1023', title: 'Cloud Security Audit', ref: 'SOW-201', desc: 'Ongoing audit of cloud infrastructure security.', owner: 'Priya Mehta', end: '30-Sep-2025', status: 'In Progress', risk: 'Low', note: 'On Track', progress: 95, employees: 3 },
  { id: '1045', title: 'Endpoint Protection Rollout', ref: 'SOW-202', desc: 'Deployment of endpoint protection across all devices.', owner: 'Arjun Rao', end: '15-Aug-2025', status: 'Delayed', risk: 'High', note: 'Awaiting budget approval', progress: 82, employees: 14 },
  { id: '1101', title: 'IAM Integration', ref: 'SOW-204', desc: 'Integration of Identity & Access Management systems.', owner: 'Rakesh Iyer', end: '10-Oct-2025', status: 'Completed', risk: 'Low', note: 'Delivered ahead of schedule', progress: 68, employees: 16 },
  { id: '1120', title: 'Penetration Testing', ref: 'SOW-205', desc: 'External and internal penetration testing engagement.', owner: 'Anil Deshmukh', end: 'TBD', status: 'In Review', risk: 'Medium', note: 'Legal review in progress', progress: 80, employees: 7 },
  { id: '1133', title: 'Compliance Readiness', ref: 'SOW-206', desc: 'Preparing for ISO 27001 certification.', owner: 'Sneha Patil', end: '11-Oct-2025', status: 'Delayed', risk: 'High', note: 'Awaiting budget approval', progress: 97, employees: 9 },
  { id: '1150', title: 'Endpoint Protection Rollout', ref: 'SOW-207', desc: 'Implementation of threat intel feeds and dashboards.', owner: 'Kavita Joshi', end: '05-Sep-2025', status: 'Delayed', risk: 'High', note: 'Slight delay due to staffing', progress: 85, employees: 12, pending: true },
  { id: '1172', title: 'Data Loss Prevention (DLP)', ref: 'SOW-208', desc: 'Rollout of DLP policies and monitoring tools.', owner: 'Rohit Sharma', end: '25-Sep-2025', status: 'In Progress', risk: 'Medium', note: 'Awaiting budget approval', progress: 90, employees: 5 },
]
const expiring = ['1172', '1023']
const sowTone: Record<string, Tone> = { 'In Progress': 'pos', Delayed: 'warn', Completed: 'pos', 'In Review': 'info' }
const sow: Result = {
  app: 'fieldglass', key: 'sow', icon: 'users', query: 'Current status & end date of SOW IDs for CyberSecure Ltd', question: 'Current status and end date of SOW IDs for CyberSecure Ltd?',
  summaryTitle: 'SOW Summary',
  summary: 'CyberSecure Ltd currently has seven active and historical Statements of Work (SOWs) in Fieldglass. These SOWs span across various statuses including Active, Completed, In Review, and Expired. The total spend across these SOWs is approximately $415,000, with worker counts ranging from 0 to 8. Most active SOWs are progressing on schedule, while',
  more: 'three (1045, 1133 and 1150) are delayed and rated high risk: two are awaiting budget approval and one is short of staff. SOW 1101 was delivered ahead of schedule, and the end date of SOW 1120 is still to be confirmed while legal review is in progress.',
  total: 7, sources: ['Fieldglass · Statements of work', 'Supplier: CyberSecure Ltd'],
  how: ['Read the question as: status and end date of every SOW for CyberSecure Ltd', 'Searched statements of work for that supplier in Fieldglass', 'Sorted them into at-risk and expiring', 'Kept the staffing actions on each row'],
  tabs: ['All', 'At-Risk SOWs', 'Upcoming Expirations'],
  facets: [
    { label: 'Delayed', test: r => r.status.label === 'Delayed' },
    { label: 'Awaiting budget', test: r => /budget/.test(r.note) },
    { label: 'Business Unit: Supply Chain', test: () => true },
  ],
  rows: sowRows.map(t => ({
    title: `CyberSecure – ${t.title}`, chips: [`SOW ID ${t.id}`, `${t.progress}%`], ref: `${t.ref} • Supply Chain`, desc: t.desc, kv: [['Owner', t.owner], ['End Date', t.end]] as [string, string][],
    status: { label: t.status, tone: sowTone[t.status] }, level: lvl(t.risk as 'Low' | 'Medium' | 'High'), note: t.note, progress: t.progress,
    actions: [
      { label: `${t.employees} Employees`, kind: 'primary', icon: 'users', does: 'people' } as Action,
      ...(t.status !== 'Completed' && t.status !== 'In Review' ? [{ label: 'Add Worker', kind: 'ghost', icon: 'plus', does: 'worker' } as Action] : []),
      ...(t.pending || t.risk === 'High' ? [{ label: 'Pending Items', kind: 'ghost', icon: 'flag', does: 'items' } as Action] : []),
    ],
    tabs: [...(t.risk === 'High' ? [1] : []), ...(expiring.includes(t.id) ? [2] : [])],
  })),
}

export const results: Record<RouteKey, Result> = { po, travel, buy, goals, sow }

/* ---------- App screens reached from a result ---------- */

export const booking = {
  title: 'Book Flight — Palo Alto to Bangalore', crumbs: ['Travel', 'SFO to Bangalore', 'Select Flight', 'Review'],
  flight: 'EK237 — San Francisco (SFO) → Bangalore (BLR)',
  details: [['Airline', 'Emirates'], ['Departure', "08:00 — San Francisco Int'l (SFO)"], ['Arrival', "23:30+1 — Kempegowda Int'l Airport (BLR)"], ['Class', 'Economy'], ['Fare', '$1,240.00']] as [string, string][],
  summary: [['Traveller', 'Maria Schmidt'], ['Company Code', '1000'], ['Cost Center', 'IT-0450'], ['Trip Purpose', 'Business Meeting'], ['Approval Required', 'No (< €400)']] as [string, string][],
  total: '$1,240.00',
}
export const ariba = {
  title: 'Procurement — iPhone 17 Pro', crumbs: ['Catalog', 'IT Equipment', 'Mobile Devices', 'iPhone 17 Pro'],
  product: 'Apple iPhone 17 Pro — 256GB Natural Titanium', unit: 1199, qty: 50,
  details: [['Supplier', 'CDW Enterprise Technology Solutions'], ['SKU', 'MYPG3LL/A — Natural Titanium 256GB'], ['Lead Time', '2–3 business days'], ['Contract', 'Apple Enterprise 2026 — CDW Preferred Contract']] as [string, string][],
}
export const goalDraft = {
  name: 'Deliver Q2 Product Roadmap', description: 'Complete all 3 milestones by end of June 2026 with full stakeholder sign-off',
  category: 'Operational Excellence', progress: 75, weight: '20%', categories: ['Operational Excellence', 'Customer Focus', 'People Development'],
}
