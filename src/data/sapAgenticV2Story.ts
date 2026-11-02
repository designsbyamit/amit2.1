// Copy for the draft case study page (story-v2). Short sentences. One story, seven chapters.
import type { Pin, Note, WireKind } from '../components/agentic/v2/Patterns'
import type { LogicRow } from '../components/agentic/v2/RiskLogic'

export interface Chapter { n: number; id: string; title: string; intro: string; together: string; drove: string }

export const story = {
  hero: {
    title: 'Reimagining order confirmation for an agentic supply chain',
    strap: 'An agent handles the document-heavy work. People stay in control of the decisions.',
    facts: [['Role', 'Design lead'], ['Worked with', 'Customer, product, engineering, AI'], ['I drove', 'Human-agent model, risk logic, patterns'], ['Scope', '3 roles, 33 screens']] as [string, string][],
  },
  context: {
    label: 'Context',
    title: 'A real procurement problem, solved together.',
    paras: [
      'This began as a Forward Deployed Engineering use case: help a customer confirm supplier orders faster, in a way that could scale across their global teams.',
      'The problem and the direction belonged to the customer, product and design together. I led the design side: discovery with the customer, the experience model, and the patterns that came out of it.',
      'The story runs in seven chapters, from the problem to where it goes next. Each one says what we decided together and what I drove.',
    ],
  },
  chapters: {
    problem: { n: 1, id: 'problem', title: 'Weeks to confirm one order: six manual hand-offs, three roles, no single record.', intro: 'A supplier answers a purchase order with a PDF, in its own layout and often in German. Someone reads it, checks every price, term, quantity and date against the order, then chases the owner of each difference. Every hand-off adds waiting. A missed difference moves on as a wrong order.', together: 'The use case and its goal came from the customer and product teams.', drove: 'Seeing it as a design problem: what an agent should take on, and what people should keep.' },
    people: { n: 2, id: 'people', title: 'Three roles see the same order differently.', intro: 'Operations checks the data. The buyer weighs cost. The goods recipient judges quantity and dates. Several rounds of discovery showed what each one needs in order to decide.', together: 'Discovery rounds with customer operations and buyer stakeholders.', drove: 'Leading those sessions, and turning them into three roles with their struggles and decisions.' },
    contract: { n: 3, id: 'contract', title: 'Delegate the work, not the accountability.', intro: 'The agent reads, compares and prepares. People keep every decision that needs judgement. One contract sets the line.', together: 'Where the line sits, settled with the customer and product.', drove: 'The agent definition, the contract and the three gates.' },
    flow: { n: 4, id: 'flow', title: 'One flow from inbox to close, with three gates for people.', intro: 'From the supplier email to the closed confirmation. Follow one order all the way through.', together: 'The end-to-end workflow, shaped with the customer and product.', drove: 'Turning it into one connected flow, checked for feasibility with engineering and AI.' },
    risk: { n: 5, id: 'risk', title: 'Risk is shown as logic, not a score to trust.', intro: 'The agent does not just say High. It shows each difference, how severe it is, and why. That logic is the part I drove most closely.', together: 'The final approach, reviewed and refined with product.', drove: 'The discrepancy and severity logic.' },
    patterns: { n: 6, id: 'patterns', title: 'Five patterns carry the experience.', intro: 'Each solves one problem, and each was designed to be reused in other agentic workflows. Left: the pattern as a wireframe. Right: how it looks in the product.', together: 'Feasibility and build, with engineering and AI specialists.', drove: 'Designing the five patterns for reuse.' },
    next: { n: 7, id: 'next', title: 'Where does it go next?', intro: 'Today a person decides at three gates. Confidence and risk, already measured in the product, decide how far that can change.', together: '', drove: '' },
  } as Record<string, Chapter>,
  asis: [
    { t: 'Supplier replies', d: 'An email with a PDF, in the supplier’s own layout.' },
    { t: 'Someone reads it', d: 'Often in German, checked by eye.' },
    { t: 'Compared with the PO', d: 'Line by line, in another system.' },
    { t: 'Risk judged by hand', d: 'No common structure.' },
    { t: 'Owners chased', d: 'Buyer and goods recipient, by email.' },
    { t: 'Supplier told what to fix', d: 'And the cycle repeats.' },
  ],
  stickiesTitle: 'What discovery kept pointing to',
  stickies: [
    { k: 'Time', t: 'Weeks, not hours', d: 'One confirmation took weeks. The business needed hours.', scrawl: 'hours!', tone: 'a' as const, tilt: -2 },
    { k: 'Scattered', t: 'Documents live everywhere', d: 'Email, PDFs, the ERP, other apps. No single place for an order’s story.', scrawl: 'where is it?', tone: 'b' as const, tilt: 1.5 },
    { k: 'Unstructured', t: 'Risk mapped by hand', d: 'Supplier and risk profiles matched by eye, with no common structure.', scrawl: 'by eye', tone: 'c' as const, tilt: -1 },
  ],
  principles: [
    { t: 'The agent prepares. People decide.', d: 'Reading, comparing, drafting: the agent. Judgement: a person.' },
    { t: 'Show the risk before asking for trust.', d: 'Every flag comes with its differences and severity.' },
    { t: 'Leave a trail.', d: 'Every action traces back to the agent or the person who took it.' },
  ],
  agentTitle: 'The agent, defined',
  agent: [
    ['Job', 'Read each supplier confirmation. Compare it with the purchase order. Prepare every decision.'],
    ['Reads', 'Email and PDF, any layout, often German. The purchase order in the ERP.'],
    ['Does', 'Extracts with a confidence score. Finds each difference, rates it, explains it. Routes it. Drafts the reply. Logs it.'],
    ['Never', 'Accepts or rejects a difference. Confirms its own extraction. Writes to the supplier.'],
    ['Hands over to', 'Operations to validate. The buyer for commercial differences. The goods recipient for quantity and delivery.'],
  ] as [string, string][],
  hitlTitle: 'Human in the loop, by design',
  hitlIntro: 'The agent reads and prepares. A person decides at three gates: validate, decide, send.',
  contractTitle: 'The human-agent contract',
  contractIntro: 'A working agreement, written before any screen. Filled in for this use case.',
  riskFormula: [
    ['Severity', 'what the difference is × how large the change is'],
    ['Order risk', 'the most severe difference on the order'],
    ['Priority', 'order risk first, then order value'],
  ] as [string, string][],
  riskNote: 'This is the logic I proposed, not a fixed scoring system with set thresholds.',
  riskRows: [
    { what: 'Total value and price', ask: 'How much more would we pay?', grows: 'The increase is large against the order.', why: 'Direct commercial impact.' },
    { what: 'Payment terms', ask: 'Do the terms still match what we agreed?', grows: 'More days are added.', why: 'Needs finance approval.' },
    { what: 'Additional costs', ask: 'Is there a cost we did not plan?', grows: 'A new or bigger charge appears.', why: 'Unplanned spend.' },
    { what: 'Quantity', ask: 'Will we receive what we need?', grows: 'The shortfall or excess is large.', why: 'Stock and cover at the store.' },
    { what: 'Delivery date', ask: 'Will it arrive when needed?', grows: 'The delay is long.', why: 'Operations and stock.' },
    { what: 'Wording', ask: 'Does it change what is ordered?', grows: 'Never, if the meaning is the same.', why: 'Noise must not raise risk.' },
  ] as LogicRow[],
  riskAppliedTitle: 'Applied to one real order',
  scenariosTitle: 'When it is not straightforward',
  scenarios: [
    { t: 'The agent is unsure it read the document right', d: 'Each extraction carries a confidence score and sits beside the supplier PDF. Where it is low or wrong, operations corrects the field, and the correction is logged.', shot: 'ops-editing' },
    { t: 'A difference with real consequences', d: 'Payment terms stretched from net 30 to net 45 days arrive rated High, with a plain reason and a note that finance approval is needed. The buyer decides, not the agent.', shot: 'buyer-review' },
  ],
  patterns: [
    { n: '01', name: 'Persona-based worklists', problem: 'Three roles get the same order, but each needs to see different things first.', decision: 'One anatomy for every role. Shared columns stay put. Only the columns a role needs to decide change.', reuse: 'Any workflow where several roles act on one object.', kind: 'worklist' as WireKind, img: 'buyer-worklist', alt: 'The buyer worklist',
      pins: [{ n: 1, x: 0.3, y: 0.225 }, { n: 2, x: 0.64, y: 0.225 }, { n: 3, x: 0.87, y: 0.225 }] as Pin[], wirePins: [{ n: 1, x: 0.25, y: 0.19 }, { n: 2, x: 0.7, y: 0.19 }, { n: 3, x: 0.93, y: 0.19 }] as Pin[],
      notes: [{ n: 1, where: 'Shared columns', text: 'Same place for every role, so the next action is always where you expect it.' }, { n: 2, where: 'Role columns', text: 'The buyer sees discrepancies and risk. Operations sees confidence. The goods recipient sees groups by order.' }, { n: 3, where: 'Action', text: 'One clear action per row.' }] as Note[] },
    { n: '02', name: 'Document parsing and extraction', problem: 'Supplier documents arrive in many layouts and languages. Nothing can move on until the data is right.', decision: 'The agent shows what it read as a structured form, with a confidence score. A person checks, corrects and confirms.', reuse: 'Any use case that turns incoming documents into data.', kind: 'extraction' as WireKind, img: 'ops-read', alt: 'Extracted data beside the supplier PDF',
      pins: [{ n: 1, x: 0.445, y: 0.117 }, { n: 2, x: 0.3, y: 0.43 }, { n: 3, x: 0.6, y: 0.237 }, { n: 4, x: 0.88, y: 0.55 }] as Pin[], wirePins: [{ n: 1, x: 0.4, y: 0.1 }, { n: 2, x: 0.3, y: 0.45 }, { n: 3, x: 0.6, y: 0.27 }, { n: 4, x: 0.82, y: 0.55 }] as Pin[],
      notes: [{ n: 1, where: 'Confidence', text: 'How sure the agent is. Low scores draw attention first.' }, { n: 2, where: 'Extracted fields', text: 'Header and line items as a form, not a wall of text.' }, { n: 3, where: 'Edit', text: 'Fix a field in place. Save a draft or confirm.' }, { n: 4, where: 'Source', text: 'The original PDF stays alongside.' }] as Note[] },
    { n: '03', name: 'Document referencing', problem: 'People will not trust a value if they cannot see where it came from.', decision: 'The Extraction tab stays one click away at every stage. The source PDF sits beside the data.', reuse: 'Any agent output that depends on a source document.', kind: 'reference' as WireKind, img: 'buyer-extraction', alt: 'The Extraction tab with the supplier PDF',
      pins: [{ n: 1, x: 0.15, y: 0.215 }, { n: 2, x: 0.3, y: 0.46 }, { n: 3, x: 0.88, y: 0.46 }] as Pin[], wirePins: [{ n: 1, x: 0.2, y: 0.2 }, { n: 2, x: 0.3, y: 0.5 }, { n: 3, x: 0.82, y: 0.5 }] as Pin[],
      notes: [{ n: 1, where: 'Problem: where did this come from?', text: 'The Extraction tab, next to Discrepancies and Activity. One click back to the source.' }, { n: 2, where: 'Problem: is this value right?', text: 'The extracted values every discrepancy was built from.' }, { n: 3, where: 'Problem: does the document agree?', text: 'The supplier PDF, beside the data, so you can check by eye.' }] as Note[] },
    { n: '04', name: 'Discrepancy review', problem: 'A list of differences is not enough to decide. People need size, context and a reason.', decision: 'Each difference shows both values, the change, a severity and a plain-language reason. The next action is named on the page.', reuse: 'Any comparison between what was expected and what arrived.', kind: 'discrepancy' as WireKind, img: 'buyer-review', alt: 'The discrepancy review page',
      pins: [{ n: 1, x: 0.5, y: 0.376 }, { n: 2, x: 0.44, y: 0.505 }, { n: 3, x: 0.6, y: 0.505 }, { n: 4, x: 0.93, y: 0.505 }] as Pin[], wirePins: [{ n: 1, x: 0.4, y: 0.25 }, { n: 2, x: 0.55, y: 0.4 }, { n: 3, x: 0.66, y: 0.4 }, { n: 4, x: 0.93, y: 0.4 }] as Pin[],
      notes: [{ n: 1, where: 'Next action', text: 'The page says what to do next.' }, { n: 2, where: 'Severity', text: 'High, Medium or Low, at a glance.' }, { n: 3, where: 'AI reasoning', text: 'Why it matters, in plain language.' }, { n: 4, where: 'Resolution', text: 'Accept or reject. Each person decides only what they can judge.' }] as Note[] },
    { n: '05', name: 'Activity log and audit trail', problem: 'People need to see what the agent did, and every decision must stay traceable.', decision: 'One timeline of every action, labelled by who took it. Corrections show the old and the new value.', reuse: 'Any workflow where people and an agent act on one record.', kind: 'timeline' as WireKind, img: 'buyer-activity', alt: 'The activity timeline',
      pins: [{ n: 1, x: 0.42, y: 0.62 }, { n: 2, x: 0.45, y: 0.77 }, { n: 3, x: 0.42, y: 0.31 }] as Pin[], wirePins: [{ n: 1, x: 0.4, y: 0.58 }, { n: 2, x: 0.5, y: 0.72 }, { n: 3, x: 0.4, y: 0.3 }] as Pin[],
      notes: [{ n: 1, where: 'Who', text: 'The AI Agent, operations, the buyer, the goods recipient or the system.' }, { n: 2, where: 'What changed', text: 'Old value struck through, new value beside it, with who saved it.' }, { n: 3, where: 'Whole history', text: 'From the first email to the close, in one place.' }] as Note[] },
  ],
  next: {
    todayNote: 'Today',
    list: [
      'Let high-confidence, low-risk differences resolve inside policy. The buyer reviews exceptions.',
      'Keep every step in the activity log, so autonomy can always be audited.',
      'Carry the same patterns to other supply chain use cases.',
    ],
    restsTitle: 'What this rests on',
    rests: ['A working prototype of 33 screens across three roles.', 'Discovery and co-creation with customer stakeholders.', 'Workflows checked for feasibility with product, engineering and AI.'],
    notTitle: 'What I am not claiming',
    not: ['A measured turnaround time. Weeks to hours is the aim of the design, not a reported result.', 'A deployment figure.', 'Reuse in other use cases. The patterns were designed for it.'],
  },
}
