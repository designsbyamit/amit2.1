// The supplier order confirmation short story, written as a guide: how to build an agentic solution that is genuinely
// meaningful, worked through one example. Each move answers one question:
//   1 What is the business losing?            2 Where is the judgement?        3 Which path, at each crossroad?
//   4 What breaks at scale, and why an agent?  5 What is the agent, and what is it not?
//   6 Where does the agent reason?             7 What value does it create?    Then: see it work.

export type Who = 'model' | 'logic' | 'person'

export const guide = {
  label: 'A guide, worked through one example',
  headline: 'How to build an agentic solution that is genuinely meaningful',
  line: 'Most agents are built because they can be. A meaningful one starts from a business problem and earns every step it automates. Here is the path, worked through supplier order confirmations.',

  moves: {
    problem: {
      title: 'Start with what the business is losing.',
      body: 'Not with the model. In supplier order confirmations, one confirmation passes six manual hand-offs across three roles, with no single record. Every hand-off adds waiting, and a difference nobody catches becomes a wrong order.',
      steps: [
        { t: 'Supplier replies', d: 'A PDF, in its own layout and language.' },
        { t: 'Someone reads it', d: 'Field by field, by eye.' },
        { t: 'Compared with the PO', d: 'Line by line, in another system.' },
        { t: 'Risk judged by hand', d: 'No common structure.' },
        { t: 'Owners chased', d: 'Buyer and goods recipient, by email.' },
        { t: 'Supplier told what to fix', d: 'And the cycle repeats.' },
      ],
    },
    judgement: {
      title: 'Separate the work from the judgement.',
      body: 'An agent earns its place on the work. People keep the judgement. Draw the line before anything else, because every later decision depends on it.',
      work: ['Reading every document, in any layout or language', 'Extracting each field and matching it to the order', 'Finding every difference', 'Routing each difference to its owner', 'Drafting the reply to the supplier', 'Keeping the record'],
      judgement: ['Is net 45 days acceptable from this supplier?', 'Do 500 fewer units still cover the store?', 'Is a later delivery worth a cheaper price?', 'What goes back to the supplier, and when?'],
    },
    crossroads: {
      title: 'Choose the path one crossroad at a time.',
      body: 'Every agentic product has a handful of forks where the experience is decided. Name each one, weigh the options against the people doing the work, and write down why.',
      forks: [
        { q: 'Where does the day start?', options: ['A dashboard of charts', 'A worklist of orders'], pick: 1, why: 'People act on orders, not on charts. The worklist arrives already read, compared and ranked by risk.' },
        { q: 'One view, or one per role?', options: ['One shared view', 'One anatomy, tuned per role'], pick: 1, why: 'Three roles judge the same order differently. Shared columns stay put; only the columns a role decides on change.' },
        { q: 'Where does a person step in?', options: ['Once, at the end', 'At three gates'], pick: 1, why: 'Validate the reading, decide each difference, send the reply. Each gate is a decision only a person should make.' },
        { q: 'How is risk shown?', options: ['One score to trust', 'Each difference, with its reason'], pick: 1, why: 'A score asks for faith. Both values, the change, the severity and a plain reason let someone decide in seconds.' },
        { q: 'Where is the source?', options: ['Behind the data', 'Beside the data'], pick: 1, why: 'Nobody trusts a value they cannot trace. The supplier’s document stays one click away at every stage.' },
      ],
    },
    scale: {
      title: 'Ask what breaks at scale. That is where the agent belongs.',
      body: 'A design that works for ten orders a day has to work for every supplier, in every layout and language, across teams on every continent. Simpler answers fail exactly there.',
      rows: [
        { breaks: 'A template per supplier layout', holds: 'A model that reads any layout and says how sure it is' },
        { breaks: 'One threshold for every field', holds: 'Severity judged by what a difference does downstream' },
        { breaks: 'Flag everything for review', holds: 'Only the differences that need judgement reach people, riskiest first' },
        { breaks: 'Status chased by email', holds: 'One record per order, with every version and every action' },
      ],
    },
    vision: {
      title: 'Delegate the work. Keep the accountability. Earn the autonomy.',
      body: 'Write the agent down before drawing a screen. The line that matters most is what it never does. Autonomy grows only where confidence is high and risk is low, inside policy.',
      never: ['Accepts or rejects a difference', 'Confirms its own reading', 'Writes to the supplier on its own'],
      ladder: [
        { t: 'Assist', d: 'The agent recommends. People do the work.' },
        { t: 'Guided autonomy', d: 'The agent prepares. People decide at three gates.', now: true },
        { t: 'Bounded autonomy', d: 'High confidence, low risk: resolved inside policy. People review exceptions.' },
      ],
    },
    reasoning: {
      title: 'It is not a parser, and not a recommender. Design how it reasons.',
      body: 'Parsers have read documents for years. The value is in the judgement between reading and recommending, and it changes with every order. Design which steps the model judges, which follow fixed logic, and where a person decides.',
      flow: [
        { who: 'model' as Who, t: 'Read', d: 'Interprets any layout and language. Maps “PREIS” to unit price, reads “voraussichtlich KW 13” as a week, not a date, and gives each field a confidence.' },
        { who: 'person' as Who, t: 'Gate 1: validate', d: 'Operations confirms the reading, starting with the least certain fields.' },
        { who: 'logic' as Who, t: 'Compare', d: 'Every field is matched against the purchase order. The same input always gives the same result.' },
        { who: 'model' as Who, t: 'Weigh', d: 'Decides whether a difference matters: a reworded description is noise, net 30 to net 45 is not. Weighs the field, the size of the change, the supplier’s history and its own uncertainty.' },
        { who: 'model' as Who, t: 'Explain', d: 'Writes the reason in plain words, so the decision takes seconds.' },
        { who: 'logic' as Who, t: 'Route', d: 'Commercial differences to the buyer, quantity and dates to the goods recipient. Ownership is a rule, not a guess.' },
        { who: 'person' as Who, t: 'Gate 2: decide', d: 'Each owner accepts or rejects only what is theirs.' },
        { who: 'model' as Who, t: 'Draft', d: 'Writes the reply to the supplier, in the supplier’s language, with every decision attached.' },
        { who: 'person' as Who, t: 'Gate 3: send', d: 'The buyer reviews and sends. Nothing leaves without a person.' },
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
    },
    value: {
      title: 'Measure it in decisions, not in automation.',
      body: 'The agent is worth building when people spend their time only where their judgement is needed.',
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
