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
  headline: 'Six hand\u2011offs became three decisions',
  line: 'How an agent made supplier order confirmation radically more efficient, and what that teaches about defining agents for any business problem. Most agents are built because they can be. This one had to earn every step it took over.',

  chapters: {
    problem: {
      label: 'The business problem',
      title: 'The work started where the time was leaking, not where the AI could go.',
      body: 'The tempting brief is “let AI read the supplier’s PDF”. So before anything else, one confirmation was mapped end to end. Six hand-offs, three roles, no single record. Reading the PDF was the cheapest step in the chain. The waiting between people was the expensive one, and a difference nobody caught became a wrong order.',
      steps: [
        { t: 'Supplier replies', d: 'A PDF, in its own layout and language.' },
        { t: 'Someone reads it', d: 'Field by field, by eye.' },
        { t: 'Compared with the PO', d: 'Line by line, in another system.' },
        { t: 'Risk judged by hand', d: 'No common structure.' },
        { t: 'Owners chased', d: 'Buyer and goods recipient, by email.' },
        { t: 'Supplier told what to fix', d: 'And the cycle repeats.' },
      ],
      takeaway: 'Map the whole chain before choosing what to automate. The costly step is rarely the one in the brief.',
    },
    judgement: {
      label: 'Where the judgement sits',
      title: 'Every task was then sorted into work or judgement.',
      body: 'Work is anything a careful person does the same way every time. Judgement is anything someone has to answer for. Reading, matching and chasing took the hours. A handful of decisions carried all the accountability. That one line decided what the agent could ever be.',
      work: ['Reading every document, in any layout or language', 'Extracting each field and matching it to the order', 'Finding every difference', 'Routing each difference to its owner', 'Drafting the reply to the supplier', 'Keeping the record'],
      judgement: ['Is net 45 days acceptable from this supplier?', 'Do 500 fewer units still cover the store?', 'Is a later delivery worth a cheaper price?', 'What goes back to the supplier, and when?'],
      takeaway: 'If someone has to answer for it, it stays with a person. Everything else is a candidate for the agent.',
    },
    decisions: {
      label: 'The decisions',
      title: 'The experience was won or lost at five forks.',
      body: 'Every agentic product has a few moments where the shape of the whole thing is decided. Some had three credible answers, some two, and one had only ever one. Each was judged against the people who would live with it every day.',
      list: [
        {
          q: 'Where does the day start?',
          options: ['A dashboard of charts', 'The supplier’s email', 'A worklist, ranked by risk'],
          pick: 2,
          why: 'A dashboard tells you how things are going; it does not tell you what to do next. An inbox has no order to it at all. The worklist won: it arrives already read, compared and ranked, so the riskiest confirmation is the first thing anyone touches.',
          shots: [{ id: 'buyer-worklist' }],
          caption: 'The buyer’s worklist: every confirmation with its discrepancies and risk, highest risk first.',
        },
        {
          q: 'Where does a person step in?',
          options: ['Once, at the end', 'At every step', 'At three gates'],
          pick: 2,
          why: 'Only at the end is too late: a misread has already travelled. At every step, the agent saves nobody any time. Three gates put a person exactly where accountability sits: validate the reading, decide each difference, send the reply.',
        },
        {
          q: 'One view for everyone, or one per role?',
          options: ['One shared view', 'One anatomy, tuned per role'],
          pick: 1,
          why: 'Operations, the buyer and the goods recipient look at the same order for different reasons. One anatomy keeps it familiar for all three. Shared columns stay put; only the columns a role decides on change.',
          shots: [{ id: 'ops-worklist', label: 'Operations' }, { id: 'buyer-worklist', label: 'Buyer' }, { id: 'gr-worklist', label: 'Goods recipient' }],
        },
        {
          q: 'How is risk shown?',
          options: ['One score to trust', 'Each difference, with its reason'],
          pick: 1,
          why: 'A score asks people to trust the agent. Evidence lets them check it. Both values, the change, the severity and a plain reason let a buyer decide in seconds and defend the decision later.',
          shots: [{ id: 'buyer-review' }],
          caption: 'Each difference from the purchase order with its severity and reasoning, ready to accept or reject.',
        },
        {
          q: 'Where does the source document sit?',
          options: ['Beside the data, always'],
          pick: 0,
          why: 'This one was never a debate. Nobody acts on a value they cannot trace, so what the agent read sits next to the supplier’s PDF, one click away at every stage.',
          shots: [{ id: 'ops-read' }],
          caption: 'What the agent read, beside the supplier’s document, with its confidence.',
        },
      ] as Decision[],
      takeaway: 'Find the few forks that shape the product, decide them deliberately, and write down why. The rest follows.',
    },
    scale: {
      label: 'The scale test',
      title: 'Every choice was stress-tested at scale. That is where the agent earned its place.',
      body: 'A design that works for ten orders a day has to work for every supplier, in every layout and language, across teams on every continent, with revisions coming back again and again. Wherever a template or a rule survived that test, the rule stayed. The agent went only where they broke.',
      rows: [
        { breaks: 'A template per supplier layout', holds: 'A model that reads any layout and says how sure it is' },
        { breaks: 'One threshold for every field', holds: 'Severity judged by what a difference does downstream' },
        { breaks: 'Flag everything for review', holds: 'Only the differences that need judgement reach people, riskiest first' },
        { breaks: 'Status chased by email', holds: 'One record per order, with every version and every action' },
      ],
      takeaway: 'Use a rule wherever a rule survives scale. An agent belongs only where rules break.',
    },
    vision: {
      label: 'The vision',
      title: 'The agent’s contract was written before a single screen was drawn.',
      body: 'What it does, what it never does, and how its autonomy can grow. The never list mattered most, because it is what lets people trust everything else. Autonomy is earned, not granted: it grows only where confidence is high and risk is low, inside policy.',
      never: ['Accepts or rejects a difference', 'Confirms its own reading', 'Writes to the supplier on its own'],
      ladder: [
        { t: 'Assist', d: 'The agent recommends. People do the work.' },
        { t: 'Guided autonomy', d: 'The agent prepares. People decide at three gates.', now: true },
        { t: 'Bounded autonomy', d: 'High confidence, low risk: resolved inside policy. People review exceptions.' },
      ],
      takeaway: 'Define what the agent never does before what it does. Then let autonomy be earned, one level at a time.',
    },
    reasoning: {
      label: 'How it reasons',
      title: 'Not a parser. Not a recommender. It reasons.',
      body: 'Parsers have read documents for years, and a recommendation without reasoning is just another score. The real design work was deciding, step by step, where the model judges, where fixed logic is safer, and where a person decides. Here is one order, all the way through.',
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
      takeaway: 'Give the model only the steps that need interpretation. Keep everything that must be repeatable as fixed logic, and every accountable decision with a person.',
    },
    value: {
      label: 'The value',
      title: 'Six hand-offs became three decisions.',
      body: 'That is what disruptively efficient looks like in practice: not more automation, but people spending their time only where their judgement is needed.',
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
      takeaway: 'Measure an agent by the decisions it frees people for, not by how much it automates.',
    },
  },

  see: { title: 'See it work', line: 'One order, from the supplier’s email to the reply, on the real screens.' },
}
