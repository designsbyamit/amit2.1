// The supplier order confirmation short story. Between a case study and a guide: the story of one agentic product,
// told in chapters, each closing with the takeaway a reader can use on their own work.
// Each chapter answers one question:
//   The business problem: what is the business losing?      Where the judgement sits: what should the agent never take?
//   The decisions: which path, at each fork?                  The scale test: why does this need an agent at all?
//   The vision: how far can autonomy go?                      How it reasons: what makes it more than a parser?
//   The value: what does it give back?                        Then: see it work.

export type Who = 'model' | 'logic' | 'person'

export interface Decision {
  q: string
  options: string[]
  pick: number
  why: string
  /** A real screen that shows the decision, or a set of them. */
  shots?: { id: string; label?: string }[]
  caption?: string
}

export const guide = {
  label: 'Agentic order confirmations · Procurement',
  headline: 'An agent that earns its place',
  line: 'Most agents are built because they can be. This one started from a business problem: confirming supplier orders. Every step it automates had to earn its place, and what that took carries over to any agentic product.',

  chapters: {
    problem: {
      label: 'The business problem',
      title: 'One confirmation, six hand-offs, weeks of waiting.',
      body: 'A supplier answers a purchase order with a PDF in its own layout and language. Someone reads it, checks every field against the order and chases the owner of each difference. Three roles, no single record. Every hand-off adds waiting, and a difference nobody catches becomes a wrong order.',
      steps: [
        { t: 'Supplier replies', d: 'A PDF, in its own layout and language.' },
        { t: 'Someone reads it', d: 'Field by field, by eye.' },
        { t: 'Compared with the PO', d: 'Line by line, in another system.' },
        { t: 'Risk judged by hand', d: 'No common structure.' },
        { t: 'Owners chased', d: 'Buyer and goods recipient, by email.' },
        { t: 'Supplier told what to fix', d: 'And the cycle repeats.' },
      ],
      takeaway: 'Start from what the business is losing, not from what a model can do.',
    },
    judgement: {
      label: 'Where the judgement sits',
      title: 'Most of the work needs no judgement. The decisions do.',
      body: 'Reading, matching and chasing take the time. The few decisions that matter take the expertise. That line shaped everything after it.',
      work: ['Reading every document, in any layout or language', 'Extracting each field and matching it to the order', 'Finding every difference', 'Routing each difference to its owner', 'Drafting the reply to the supplier', 'Keeping the record'],
      judgement: ['Is net 45 days acceptable from this supplier?', 'Do 500 fewer units still cover the store?', 'Is a later delivery worth a cheaper price?', 'What goes back to the supplier, and when?'],
      takeaway: 'Give the agent the work. Keep the judgement with people.',
    },
    decisions: {
      label: 'The decisions',
      title: 'The experience was decided at a handful of forks.',
      body: 'Some had three good answers, some two, and one had only one. Each was weighed against the people doing the work.',
      list: [
        {
          q: 'Where does the day start?',
          options: ['A dashboard of charts', 'The supplier’s email', 'A worklist, ranked by risk'],
          pick: 2,
          why: 'People act on orders, not on charts, and an inbox has no order to it. The worklist arrives already read, compared and ranked, so the riskiest confirmation is the first thing anyone sees.',
          shots: [{ id: 'buyer-worklist' }],
          caption: 'The buyer’s worklist: every confirmation with its discrepancies and risk, highest risk first.',
        },
        {
          q: 'Where does a person step in?',
          options: ['Once, at the end', 'At every step', 'At three gates'],
          pick: 2,
          why: 'At the end is too late to catch a misread. At every step, the agent saves nobody any time. Three gates put a person exactly where judgement is needed: validate the reading, decide each difference, send the reply.',
        },
        {
          q: 'One view for everyone, or one per role?',
          options: ['One shared view', 'One anatomy, tuned per role'],
          pick: 1,
          why: 'Operations, the buyer and the goods recipient judge the same order differently. Shared columns stay put. Only the columns a role decides on change.',
          shots: [{ id: 'ops-worklist', label: 'Operations' }, { id: 'buyer-worklist', label: 'Buyer' }, { id: 'gr-worklist', label: 'Goods recipient' }],
        },
        {
          q: 'How is risk shown?',
          options: ['One score to trust', 'Each difference, with its reason'],
          pick: 1,
          why: 'A score asks for faith. Both values, the change, the severity and a plain reason let a buyer decide in seconds.',
          shots: [{ id: 'buyer-review' }],
          caption: 'Each difference from the purchase order with its severity and reasoning, ready to accept or reject.',
        },
        {
          q: 'Where does the source document sit?',
          options: ['Beside the data, always'],
          pick: 0,
          why: 'Nobody trusts a value they cannot trace. What the agent read sits next to the supplier’s PDF, one click away at every stage.',
          shots: [{ id: 'ops-read' }],
          caption: 'What the agent read, beside the supplier’s document, with its confidence.',
        },
      ] as Decision[],
      takeaway: 'Name every fork. Weigh it against the people doing the work, and write down why.',
    },
    scale: {
      label: 'The scale test',
      title: 'What works for ten orders a day has to work for every supplier.',
      body: 'Every layout and language, teams on every continent, revisions that come back again and again. Simpler answers fail exactly there, and that is why this needs an agent.',
      rows: [
        { breaks: 'A template per supplier layout', holds: 'A model that reads any layout and says how sure it is' },
        { breaks: 'One threshold for every field', holds: 'Severity judged by what a difference does downstream' },
        { breaks: 'Flag everything for review', holds: 'Only the differences that need judgement reach people, riskiest first' },
        { breaks: 'Status chased by email', holds: 'One record per order, with every version and every action' },
      ],
      takeaway: 'An agent belongs where simpler answers break at scale.',
    },
    vision: {
      label: 'The vision',
      title: 'Delegate the work. Keep the accountability. Earn the autonomy.',
      body: 'The agent was written down before any screen was drawn. The line that matters most is what it never does. Autonomy grows only where confidence is high and risk is low, inside policy.',
      never: ['Accepts or rejects a difference', 'Confirms its own reading', 'Writes to the supplier on its own'],
      ladder: [
        { t: 'Assist', d: 'The agent recommends. People do the work.' },
        { t: 'Guided autonomy', d: 'The agent prepares. People decide at three gates.', now: true },
        { t: 'Bounded autonomy', d: 'High confidence, low risk: resolved inside policy. People review exceptions.' },
      ],
      takeaway: 'Decide what the agent never does before deciding what it does.',
    },
    reasoning: {
      label: 'How it reasons',
      title: 'Not a parser. Not a recommender. It reasons.',
      body: 'Parsers have read documents for years. The value is in the judgement between reading and recommending, and it changes with every order. Some steps are the model’s judgement, some are fixed logic, and three belong to people.',
      flow: [
        { who: 'model' as Who, t: 'Read', d: 'Interprets any layout and language. Maps “PREIS” to unit price, reads “voraussichtlich KW 13” as a week, not a date, and gives each field a confidence.' },
        { who: 'person' as Who, t: 'Validate', d: 'Operations confirms the reading, starting with the least certain fields.' },
        { who: 'logic' as Who, t: 'Compare', d: 'Every field is matched against the purchase order. The same input always gives the same result.' },
        { who: 'model' as Who, t: 'Weigh', d: 'Decides whether a difference matters: a reworded description is noise, net 30 to net 45 is not. Weighs the field, the size of the change, the supplier’s history and its own uncertainty.' },
        { who: 'model' as Who, t: 'Explain', d: 'Writes the reason in plain words, so the decision takes seconds.' },
        { who: 'logic' as Who, t: 'Route', d: 'Commercial differences to the buyer, quantity and dates to the goods recipient. Ownership is a rule, not a guess.' },
        { who: 'person' as Who, t: 'Decide', d: 'Each owner accepts or rejects only what is theirs.' },
        { who: 'model' as Who, t: 'Draft', d: 'Writes the reply to the supplier, in the supplier’s language, with every decision attached.' },
        { who: 'person' as Who, t: 'Send', d: 'The buyer reviews and sends. Nothing leaves without a person.' },
      ],
      example: {
        title: 'One order, five differences, one verdict',
        rows: [
          ['Total value', '€142,800 → €164,865', '+15.4%', 'High'],
          ['Payment terms', 'Net 30 → Net 45 days', '+15 days', 'High'],
          ['Additional costs', 'none → €65.00', 'New cost', 'Medium'],
          ['Quantity, line 1002', '2,500 → 2,000', '−500 units', 'Medium'],
          ['Description, line 1001', 'German term differs', 'Same meaning', 'Low'],
        ] as [string, string, string, 'High' | 'Medium' | 'Low'][],
        verdict: 'Order risk: High. To the top of the buyer’s worklist, with finance approval flagged for the payment terms.',
      },
      takeaway: 'Design which steps the model judges, which follow fixed logic, and where a person decides.',
    },
    value: {
      label: 'The value',
      title: 'Measured in decisions, not in automation.',
      body: 'People spend their time only where their judgement is needed.',
      business: [
        { t: 'Weeks to hours', d: 'Confirmation without the chain of hand-offs.' },
        { t: 'Fewer wrong orders', d: 'No difference moves on unseen.' },
        { t: 'Patterns that travel', d: 'Worklists, extraction, referencing, discrepancy review and the audit trail carry over to other supply chain flows.' },
      ],
      people: [
        { t: 'Operations', d: 'Checks what the agent read, not every field.' },
        { t: 'Buyer', d: 'Starts with the riskiest orders, each difference already explained.' },
        { t: 'Goods recipient', d: 'Sees only quantity and dates, against what the store needs.' },
      ],
    },
  },

  see: { title: 'See it work', line: 'One order, from the supplier’s email to the reply, on the real screens.' },
}
