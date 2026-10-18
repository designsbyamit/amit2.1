// Illustrative data for the order-confirmation prototype.
// The order, the differences, the three people and the flow (receive → extract → validate →
// decide in parallel → reply → revised version → approve and close) come from the case study.
// Supplier history, other suppliers, times and policy thresholds are invented for the demo.

const B = import.meta.env.BASE_URL
const face = (n: string) => `${B}images/case-studies/sap-agentic/persona-${n}-face.jpg`

export type Sev = 'high' | 'med' | 'low'
export type Choice = 'accept' | 'reject'
export type PersonaId = 'david' | 'adrian' | 'rajan'
export type Who = PersonaId | 'agent' | 'system' | 'supplier'

export const people: Record<PersonaId, { name: string; first: string; role: string; title: string; img: string; job: string; does: string[] }> = {
  david: {
    name: 'David Paul', first: 'David', role: 'Procurement operations', title: 'Procurement Operations Manager', img: face('david'),
    job: 'Checks what the agent read, fixes anything wrong and confirms the validation.',
    does: ['Compare the extraction with the supplier’s PDF', 'Correct low-confidence fields', 'Confirm validation to route the differences'],
  },
  adrian: {
    name: 'Adrian Smith', first: 'Adrian', role: 'Buyer', title: 'Category Buyer', img: face('adrian'),
    job: 'Decides the commercial differences, answers the supplier and closes the order.',
    does: ['Accept or reject price, terms and fees', 'Send the agent’s drafted reply to the supplier', 'Approve the revised confirmation and close'],
  },
  rajan: {
    name: 'Rajan Nair', first: 'Rajan', role: 'Goods recipient', title: 'Store Executive', img: face('rajan'),
    job: 'Judges whether quantity and delivery changes work for the store.',
    does: ['Review quantity and delivery changes', 'Accept or reject against what the store needs', 'Submit with a comment'],
  },
}

export const order = {
  oc: '1505899', po: '4994546957', supplier: 'Helios Components AG', email: 'auftrag@helios-components.de',
  value: '€164,865.00', revisedValue: '€142,865.00', received: '07:42', confidence: 93,
}

/* ---------- Extraction (David) ---------- */

export interface Field { id: string; group: 'Header' | 'Line 1001' | 'Line 1002'; label: string; value: string; quote: string; conf: number; note?: string; mark?: string }

export const fields: Field[] = [
  { id: 'f-sup', group: 'Header', label: 'Supplier', value: 'Helios Components AG', quote: 'Helios Components AG', conf: 99 },
  { id: 'f-po', group: 'Header', label: 'Purchase order', value: '4994546957', quote: 'Ihre Bestellung 4994546957', conf: 99 },
  { id: 'f-date', group: 'Header', label: 'Confirmation date', value: '17 Oct 2026', quote: 'Datum 17.10.2026', conf: 98 },
  { id: 'f-total', group: 'Header', label: 'Total (net)', value: '€164,865.00', quote: 'Gesamtbetrag 164.865,00 €', conf: 97, mark: 'total' },
  { id: 'f-terms', group: 'Header', label: 'Payment terms', value: 'Net 45 days', quote: '45 Tage netto', conf: 99, mark: 'terms' },
  { id: 'f-pack', group: 'Header', label: 'Additional costs', value: '€65.00 packaging fee', quote: 'Verpackungspauschale 65,00 €', conf: 94, mark: 'pack' },
  { id: 'f-inco', group: 'Header', label: 'Delivery terms', value: 'Delivered free', quote: 'Lieferung frei Haus', conf: 92 },
  { id: 'f-1-desc', group: 'Line 1001', label: 'Description', value: 'Control module Rev. B', quote: 'Steuerungsmodul Rev. B', conf: 96, mark: 'desc' },
  { id: 'f-1-qty', group: 'Line 1001', label: 'Quantity', value: '2,500 pcs', quote: '2.500 Stk', conf: 99 },
  { id: 'f-1-price', group: 'Line 1001', label: 'Unit price', value: '€25.04', quote: '25,04 €', conf: 98 },
  { id: 'f-2-qty', group: 'Line 1002', label: 'Quantity', value: '2,000 pcs', quote: '2.000 Stk', conf: 98, mark: 'qty' },
  { id: 'f-2-price', group: 'Line 1002', label: 'Unit price', value: '€51.10', quote: '51,10 €', conf: 98 },
  { id: 'f-2-del', group: 'Line 1002', label: 'Delivery date', value: '13 Nov 2026', quote: 'Liefertermin KW 46', conf: 71, mark: 'delivery',
    note: 'The PDF gives a calendar week, not a date. I used the Friday of week 46. Please check.' },
]

/* ---------- Differences (after validation) ---------- */

export interface Diff {
  id: string; owner: 'buyer' | 'gr' | 'agent'; field: string; line?: string
  po: string; oc: string; delta: string; sev: Sev; rec: Choice; conf: number
  why: string; impact: string
  mail: { en: [string, string]; de: [string, string] } // [if rejected, if accepted]
}

export const diffs: Diff[] = [
  { id: 'total', owner: 'buyer', field: 'Total value', po: '€142,800.00', oc: '€164,865.00', delta: '+€22,065 (15.4%)', sev: 'high', rec: 'reject', conf: 97,
    why: 'The unit price on line 1001 rose from €15.83 to €25.04.', impact: 'Accepting means paying €22,065 more than ordered. Over your €5,000 limit for price changes.',
    mail: { en: ['Total value: please confirm at the ordered price, €142,800.00.', 'We accept the revised total of €164,865.00.'], de: ['Gesamtbetrag: bitte zum bestellten Preis von 142.800,00 € bestätigen.', 'Den geänderten Gesamtbetrag von 164.865,00 € akzeptieren wir.'] } },
  { id: 'terms', owner: 'buyer', field: 'Payment terms', po: 'Net 30', oc: 'Net 45', delta: '+15 days', sev: 'high', rec: 'reject', conf: 99,
    why: 'Translated from “45 Tage netto”.', impact: 'Terms longer than 30 days need Finance approval under your policy.',
    mail: { en: ['Payment terms: our agreement is Net 30.', 'We accept payment terms of Net 45.'], de: ['Zahlungsbedingungen: vereinbart sind 30 Tage netto.', 'Die Zahlungsbedingungen von 45 Tagen netto akzeptieren wir.'] } },
  { id: 'pack', owner: 'buyer', field: 'Packaging fee', po: 'None', oc: '€65.00', delta: 'New cost', sev: 'med', rec: 'accept', conf: 94,
    why: '“Verpackungspauschale”, a flat packaging fee.', impact: 'Under your €100 tolerance for added costs.',
    mail: { en: ['Packaging fee: please remove the €65.00 packaging fee.', 'We accept the packaging fee of €65.00.'], de: ['Verpackungspauschale: bitte die Pauschale von 65,00 € streichen.', 'Die Verpackungspauschale von 65,00 € akzeptieren wir.'] } },
  { id: 'qty', owner: 'gr', field: 'Quantity', line: 'Line 1002 · Sensor housing', po: '2,500', oc: '2,000', delta: '−500 units', sev: 'med', rec: 'accept', conf: 98,
    why: 'The supplier confirms 2,000 of the 2,500 ordered.', impact: 'Store stock covers about three weeks of the gap. The rest can follow on the next order.',
    mail: { en: ['Line 1002: please deliver the full 2,500 units.', 'We accept the reduced quantity of 2,000 units on line 1002.'], de: ['Position 1002: bitte die volle Menge von 2.500 Stück liefern.', 'Die reduzierte Menge von 2.000 Stück für Position 1002 akzeptieren wir.'] } },
  { id: 'delivery', owner: 'gr', field: 'Delivery date', line: 'Line 1002 · Sensor housing', po: '6 Nov 2026', oc: '13 Nov 2026', delta: '+7 days', sev: 'high', rec: 'reject', conf: 71,
    why: 'Read from “KW 46”, checked by David.', impact: 'The winter promotion starts on 10 Nov. A delivery after that date misses it.',
    mail: { en: ['Line 1002: please keep the agreed delivery date of 6 November.', 'We accept the later delivery date on line 1002.'], de: ['Position 1002: bitte den vereinbarten Liefertermin 06.11.2026 einhalten.', 'Den späteren Liefertermin für Position 1002 akzeptieren wir.'] } },
  { id: 'desc', owner: 'agent', field: 'Description', line: 'Line 1001 · Control module', po: 'Microcontroller Module Rev. B', oc: 'Steuerungsmodul Rev. B', delta: 'Wording only', sev: 'low', rec: 'accept', conf: 96,
    why: 'Same part number and specification, named in German.', impact: 'Resolved inside policy: wording-only differences on a matching part number.',
    mail: { en: ['', ''], de: ['', ''] } },
]

/* ---------- Worklists ---------- */

export const others = [
  { supplier: 'Kessler Fasteners GmbH', po: '4994547120', doc: '7731042', value: '€38,210', at: '07:15', sev: 'med' as Sev, diffs: 2, conf: 95 },
  { supplier: 'Nordwerk Elektronik', po: '4994547388', doc: 'AB-22918', value: '€12,904', at: '06:58', sev: 'low' as Sev, diffs: 1, conf: 97 },
  { supplier: 'Brenner Präzision', po: '4994546811', doc: '0098812', value: '€9,450', at: '06:12', sev: 'low' as Sev, diffs: 0, conf: 99 },
]

export const handled = [
  ['Brenner Präzision', 'Exact match'], ['Altmark Polymer', 'Exact match'], ['Vossberg Kabel', 'Within 2% tolerance'],
  ['Lindqvist Metall AB', 'Exact match'], ['Hafen Logistikteile', 'Exact match'], ['Rheintal Optik', 'Within 2% tolerance'],
  ['Corvin Industrial', 'Exact match'], ['Saale Dichtungen', 'Exact match'], ['Ostwind Motoren', 'Within 2% tolerance'],
  ['Kranich Hydraulik', 'Exact match'], ['Weserland Guss', 'Exact match'],
] as [string, string][]

export const asks = [
  { q: 'Why is this order high risk?', a: 'Three differences are high severity: the total is 15.4% above the purchase order, the payment terms move from 30 to 45 days, and the delivery slips past the store’s promotion start. Any one of them alone would rate the order high.' },
  { q: 'What if I accept the new payment terms?', a: 'Cash leaves 15 days later, which helps working capital, but terms over 30 days need Finance approval under your policy. If you accept, I’ll route it to Finance before the reply goes out.' },
  { q: 'How has Helios responded before?', a: 'Across their last 12 confirmations, Helios changed the price three times. Each time they sent a corrected confirmation after the reply, on average 2.4 days later.' },
]
