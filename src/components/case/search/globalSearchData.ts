// Fictional data for the "one search across every application" demonstrations (deep dive, short version and film).
// Application names are generic on purpose. Companies, people and amounts are made up.

export type AppKey = 'travel' | 'expenses' | 'procurement' | 'people' | 'policies'

export const APPS: Record<AppKey, { name: string; hue: string; tint: string; blurb: string; cards: [string, string][] }> = {
  travel: { name: 'Travel', hue: '#0B7FB8', tint: '#E3F2FA', blurb: 'Trips and bookings', cards: [['My trips', '2 upcoming'], ['Book travel', 'Flights, hotels, cars'], ['Travel requests', '1 awaiting approval']] },
  expenses: { name: 'Expenses', hue: '#16794C', tint: '#E6F4EC', blurb: 'Claims and advances', cards: [['My claims', '3 open'], ['Receipts', '5 to attach'], ['Advances', '1 draft']] },
  procurement: { name: 'Procurement', hue: '#A85F08', tint: '#FDF0DC', blurb: 'Requests and orders', cards: [['Purchase orders', '12 open'], ['Shopping cart', '4 items'], ['Supplier contracts', '5 expiring']] },
  people: { name: 'People', hue: '#6B3FD4', tint: '#F1EAFF', blurb: 'Teams and goals', cards: [['My team', '8 direct reports'], ['Goals', '3 open'], ['Learning', '2 in progress']] },
  policies: { name: 'Policies', hue: '#647081', tint: '#EDF0F4', blurb: 'Guides and rules', cards: [['Travel', 'Limits and approvals'], ['Equipment', 'What you can request'], ['Goals', 'How to set them']] },
}

export interface GRow { app: AppKey; title: string; meta: string; action: string; primary?: boolean }
export interface GScenario {
  id: string
  label: string
  start: AppKey
  query: string
  summary: string
  rows: GRow[]
  carry: string[]
  appTitle: string
  fields: [string, string][]
  cta: string
}

export const SCENARIOS: GScenario[] = [
  {
    id: 'trip', label: 'A flight', start: 'expenses', query: 'flight to Bangalore next week',
    summary: 'Northwind Air on Jun 10 is the preferred route at $1,240 and sits inside the travel policy. Answers come from three applications.',
    rows: [
      { app: 'travel', title: 'Flight · SFO to BLR · Northwind Air · Jun 10-17', meta: '$1,240 · 1 stop · Within policy', action: 'Book', primary: true },
      { app: 'travel', title: 'Flight · SFO to BLR · Skyline Air · Jun 10-17', meta: '$980 · 1h 45m longer', action: 'Book' },
      { app: 'expenses', title: 'Trip advance', meta: 'Draft · $300', action: 'Continue' },
      { app: 'policies', title: 'International travel policy', meta: 'Economy up to $1,500, approval above', action: 'Read' },
    ],
    carry: ['SFO to BLR', 'Jun 10-17', 'Northwind Air'],
    appTitle: 'Book flight',
    fields: [['Route', 'SFO to BLR'], ['Dates', 'Jun 10-17, 2026'], ['Carrier', 'Northwind Air · Economy'], ['Fare', '$1,240.00'], ['Approval', 'Not needed · within policy']],
    cta: 'Book flight',
  },
  {
    id: 'laptop', label: 'A purchase', start: 'people', query: 'laptop for new joiner',
    summary: 'The standard 14 in laptop from the preferred supplier arrives in three days and fits the equipment policy. Answers come from three applications.',
    rows: [
      { app: 'procurement', title: 'Laptop 14 in · Standard', meta: '$1,150 · Preferred supplier · 3 days', action: 'Request', primary: true },
      { app: 'procurement', title: 'Laptop 16 in · Performance', meta: '$1,890 · 5 days', action: 'Request' },
      { app: 'people', title: 'Priya Nair · starts Dec 1', meta: 'New joiner · Design team', action: 'Open' },
      { app: 'policies', title: 'Equipment policy', meta: 'One laptop per employee', action: 'Read' },
    ],
    carry: ['Laptop 14 in', 'Preferred supplier', 'Deliver to Priya Nair'],
    appTitle: 'New requisition',
    fields: [['Item', 'Laptop 14 in · Standard'], ['Supplier', 'Preferred supplier'], ['Quantity', '1'], ['Deliver to', 'Priya Nair · Dec 1'], ['Total', '$1,150.00']],
    cta: 'Submit request',
  },
  {
    id: 'goals', label: 'A goal', start: 'procurement', query: 'goals for Lena Hart',
    summary: 'Lena has three goals this quarter. One is at risk and the others are on track. Answers come from three applications.',
    rows: [
      { app: 'people', title: 'Cut onboarding time by 30%', meta: '20% complete · At risk', action: 'Edit goal', primary: true },
      { app: 'people', title: 'Launch the design review cadence', meta: 'On track', action: 'Open' },
      { app: 'procurement', title: 'Requisitions for Lena’s team', meta: '2 pending', action: 'Review' },
      { app: 'policies', title: 'Goal setting guide', meta: 'Quarterly cycle', action: 'Read' },
    ],
    carry: ['Lena Hart', 'Cut onboarding time by 30%', 'Q2 goals'],
    appTitle: 'Edit goal',
    fields: [['Owner', 'Lena Hart'], ['Goal', 'Cut onboarding time by 30%'], ['Progress', '20% complete'], ['Status', 'At risk'], ['Due', 'Jun 30, 2026']],
    cta: 'Save goal',
  },
]

export const STEPS = [
  { n: 1, t: 'It lives in the shell bar', d: 'The same field, in the same place, in every application. Nobody has to find a search page first.' },
  { n: 2, t: 'Results come from every application', d: 'One list, each result tagged with the application it comes from, with filters to narrow by application.' },
  { n: 3, t: 'An action opens the application', d: 'Choosing an action hands over to that application, with the question and the choice already carried across.' },
]
