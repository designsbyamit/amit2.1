// Illustrative data for the order-confirmation prototype.
// The order, the five differences and the three people come from the case study; the rest is invented for the demo.

const B = import.meta.env.BASE_URL
const face = (n: string) => `${B}images/case-studies/sap-agentic/persona-${n}-face.jpg`

export type Sev = 'high' | 'med' | 'low'
export type Owner = 'buyer' | 'gr' | 'agent'
export type Choice = 'accept' | 'reject'

export const people = {
  agent: { name: 'Agent', role: 'Order confirmation agent' },
  david: { name: 'David Paul', role: 'Procurement operations', img: face('david') },
  adrian: { name: 'Adrian Smith', role: 'Buyer', img: face('adrian') },
  rajan: { name: 'Rajan Nair', role: 'Goods recipient', img: face('rajan') },
}

export interface Diff {
  id: string
  field: string
  po: string
  oc: string
  delta: string
  sev: Sev
  owner: Owner
  why: string
  rec: Choice
  conf: number
  quote: string
  done?: { by: 'rajan' | 'agent'; choice: Choice; note: string }
  mail: { en: [string, string]; de: [string, string] } // [if rejected, if accepted]
}

export const order = {
  oc: '1505899',
  po: '4994546957',
  supplier: 'Helios Components AG',
  city: 'Stuttgart',
  value: '€164,865.00',
  received: 'Today, 07:42',
  confidence: 96,
  risk: 'High' as const,
}

export const diffs: Diff[] = [
  {
    id: 'total', field: 'Total value', po: '€142,800.00', oc: '€164,865.00', delta: '+€22,065 (15.4%)', sev: 'high', owner: 'buyer',
    why: 'The unit price on line 1001 rose from €15.83 to €25.04. Accepting means paying €22,065 more than ordered.',
    rec: 'reject', conf: 97, quote: 'Gesamtbetrag 164.865,00 €',
    mail: {
      en: ['Total value: please confirm at the ordered price, €142,800.00.', 'We accept the revised total of €164,865.00.'],
      de: ['Gesamtbetrag: bitte zum bestellten Preis von 142.800,00 € bestätigen.', 'Den geänderten Gesamtbetrag von 164.865,00 € akzeptieren wir.'],
    },
  },
  {
    id: 'terms', field: 'Payment terms', po: 'Net 30', oc: 'Net 45', delta: '+15 days', sev: 'high', owner: 'buyer',
    why: 'Translated from “45 Tage netto”. Terms longer than 30 days need Finance approval.',
    rec: 'reject', conf: 99, quote: 'Zahlungsbedingungen: 45 Tage netto',
    mail: {
      en: ['Payment terms: our agreement is Net 30.', 'We accept payment terms of Net 45.'],
      de: ['Zahlungsbedingungen: vereinbart sind 30 Tage netto.', 'Die Zahlungsbedingungen von 45 Tagen netto akzeptieren wir.'],
    },
  },
  {
    id: 'pack', field: 'Packaging fee', po: 'None', oc: '€65.00', delta: 'New cost', sev: 'med', owner: 'buyer',
    why: '“Verpackungspauschale”, a flat packaging fee. It is under your €100 tolerance for added costs.',
    rec: 'accept', conf: 94, quote: 'Verpackungspauschale 65,00 €',
    mail: {
      en: ['Packaging fee: please remove the €65.00 packaging fee.', 'We accept the packaging fee of €65.00.'],
      de: ['Verpackungspauschale: bitte die Pauschale von 65,00 € streichen.', 'Die Verpackungspauschale von 65,00 € akzeptieren wir.'],
    },
  },
  {
    id: 'qty', field: 'Quantity, line 1002', po: '2,500', oc: '2,000', delta: '−500 units', sev: 'med', owner: 'gr',
    why: 'The supplier confirms 2,000 of 2,500. Current stock covers about three weeks of the gap.',
    rec: 'accept', conf: 98, quote: '1002 · 2.000 Stk',
    done: { by: 'rajan', choice: 'accept', note: 'Stock covers it. The rest can follow on the next order.' },
    mail: {
      en: ['Line 1002: please deliver the full 2,500 units.', 'We accept the reduced quantity of 2,000 units on line 1002.'],
      de: ['Position 1002: bitte die volle Menge von 2.500 Stück liefern.', 'Die reduzierte Menge von 2.000 Stück für Position 1002 akzeptieren wir.'],
    },
  },
  {
    id: 'desc', field: 'Description, line 1001', po: 'Microcontroller Module Rev. B', oc: 'Steuerungsmodul Rev. B', delta: 'Wording only', sev: 'low', owner: 'agent',
    why: 'Same part number and specification. This is the German name for the same item.',
    rec: 'accept', conf: 96, quote: 'Steuerungsmodul Rev. B',
    done: { by: 'agent', choice: 'accept', note: 'Resolved inside policy: wording-only differences on a matching part number.' },
    mail: { en: ['', ''], de: ['', ''] },
  },
]

export const queue = [
  { id: 'helios', supplier: 'Helios Components AG', po: '4994546957', value: '€164,865', sev: 'high' as Sev, diffs: 5, at: '07:42', open: true },
  { id: 'kessler', supplier: 'Kessler Fasteners GmbH', po: '4994547120', value: '€38,210', sev: 'med' as Sev, diffs: 2, at: '07:15' },
  { id: 'nordwerk', supplier: 'Nordwerk Elektronik', po: '4994547388', value: '€12,904', sev: 'low' as Sev, diffs: 1, at: '06:58' },
]

export const handled = [
  ['Brenner Präzision', '4994546811', 'Exact match', '06:12'],
  ['Altmark Polymer', '4994546830', 'Exact match', '06:14'],
  ['Vossberg Kabel', '4994546902', 'Within 2% tolerance', '06:20'],
  ['Lindqvist Metall AB', '4994546915', 'Exact match', '06:31'],
  ['Hafen Logistikteile', '4994546944', 'Exact match', '06:40'],
  ['Rheintal Optik', '4994546977', 'Within 2% tolerance', '06:52'],
  ['Corvin Industrial', '4994547002', 'Exact match', '07:03'],
  ['Saale Dichtungen', '4994547031', 'Exact match', '07:09'],
  ['Ostwind Motoren', '4994547066', 'Within 2% tolerance', '07:21'],
  ['Kranich Hydraulik', '4994547090', 'Exact match', '07:30'],
  ['Weserland Guss', '4994547104', 'Exact match', '07:36'],
] as [string, string, string, string][]

export const asks = [
  {
    q: 'Why is this order high risk?',
    a: 'Two of the five differences are high severity: the total is 15.4% above the purchase order, and the payment terms move from 30 to 45 days. Either one alone would rate the order high. The other three are small or already settled.',
  },
  {
    q: 'What if I accept the new payment terms?',
    a: 'Cash leaves 15 days later, which helps working capital, but terms above 30 days need Finance approval under your policy. If you accept, I will route it to Finance before the reply goes out.',
  },
  {
    q: 'How has Helios responded before?',
    a: 'Across their last 12 confirmations, Helios changed the price three times. Each time they sent a corrected confirmation after the reply, on average 2.4 days later.',
  },
]
