// Agentic AI - Supplier Order Confirmation Experience (Autonomous Ordering)
// Content comes from the Figma frames "Autonomous Ordering": Cover, Personas, System Flow and the 33 screen frames.
// Screens are the original SVG exports, stored in public/images/case-studies/sap-agentic/<id>.webp
// (only the oversized embedded photos / document previews were recompressed; all vector content is untouched).

export interface AScreen { id: string; name: string; note?: string; img: string }
export interface AJourney { id: string; label: string; title: string; summary: string; screens: AScreen[] }

const B = import.meta.env.BASE_URL
const dir = `${B}images/case-studies/sap-agentic/`

export const sapAgenticV2 = {
  title: 'Reimagining order confirmation for an agentic supply chain',
  strap: 'An agent handles the document-heavy work. People stay in control of the decisions.',
  kicker: 'Autonomous ordering',
  pillars: ['Agent reads and compares', 'People decide', 'Every step logged'],
  flowImg: `${dir}system-flow.webp`,

  framing: {
    title: 'Why does order confirmation need to change?',
    intro: 'Order confirmation is a document-heavy procurement step. A supplier answers a purchase order with a PDF in its own layout, often in German, and someone has to check every price, term, quantity and date against what was ordered. When that check is slow, planning waits. When it misses a difference, the order moves on with the wrong terms. Several roles are involved, so every hand-off adds waiting. The business needed hours, not weeks.',
    asisTitle: 'How it worked before',
    asis: [
      { t: 'Supplier replies', d: 'An email with a PDF, in the supplier’s own layout.' },
      { t: 'Someone reads it', d: 'Often in German, checked by eye.' },
      { t: 'Compared with the PO', d: 'Line by line, in another system.' },
      { t: 'Risk judged by hand', d: 'Supplier and risk profiles, mapped without structure.' },
      { t: 'Owners chased', d: 'Buyer and goods recipient, by email.' },
      { t: 'Supplier told what to fix', d: 'And the cycle repeats.' },
    ],
    nuances: [
      { k: 'Time', t: 'Weeks, not hours', d: 'One confirmation took weeks to process. The business needed hours.' },
      { k: 'Scattered', t: 'Documents live everywhere', d: 'Emails, PDF attachments, the ERP and other apps, with no single place for an order’s story.' },
      { k: 'Unstructured', t: 'Risk mapped by hand', d: 'Supplier and risk profiles were mapped by hand, with no common structure.' },
    ],
  },

  personasTitle: 'Three roles, three kinds of struggle.',

  role: {
    title: 'Turning a customer-backed use case into a reusable agentic experience.',
    intro: 'The work began as an existing Forward Deployed Engineering use case: a real procurement challenge, to be solved with a customer and able to scale across their global teams. The problem and the product direction were shared by the customer and product teams. My part was the design.',
    paras: [
      'I led design discovery and customer co-creation over several rounds of discussions with customer stakeholders, including operations and buyer roles. That showed us the existing process, the decisions people had to make and where an agent could take effort away.',
      'The end-to-end workflow took shape through shared ownership between the customer, product and design. I turned those inputs into an experience model: how the agent fits the existing process, takes on the document-heavy work and brings people in when judgement is needed.',
      'I drove two areas most closely: the logic for evaluating the risk of a supplier response, and a set of interaction patterns designed to be reused. I worked with product, engineering and AI specialists throughout, to check feasibility and to influence how it was built.',
    ],
    ownTitle: 'What I personally drove',
    items: [
      { title: 'Customer discovery', body: 'Led design discussions with operations and buyer stakeholders to understand the process and its constraints.' },
      { title: 'Experience and workflow', body: 'Shaped the end-to-end experience with customer and product teams, and how agent work and human decisions come together.' },
      { title: 'Risk evaluation', body: 'Proposed discrepancy and severity based logic to judge the risk of a supplier response. Refined it with product stakeholders.' },
      { title: 'Human-agent collaboration', body: 'Defined where the agent acts, where people review and where a decision is required.' },
      { title: 'Reusable patterns', body: 'Designed worklists, document interactions, discrepancy review, activity logs and audit trails for reuse in other agentic use cases.' },
      { title: 'Cross-functional alignment', body: 'Worked with product, engineering and AI specialists to test feasibility and influence implementation.' },
    ],
    sharedNote: 'Shared with customer and product: the use case, the end-to-end workflow and the final risk approach.',
  },

  chapters: {
    complexity: {
      title: 'What makes the problem complex?',
      intro: 'One order passes through a supplier, a document, an ERP record and three internal roles, and each of them sees a different part of the problem. What I learned in discovery shaped everything after it.',
      persona: 'Three roles share one order and see it differently.',
    },
    collaboration: {
      title: 'How should people and agents work together?',
      intro: 'This is the central idea of the project. It was not a decision to automate a procurement workflow. It was a decision about how work and decisions move between people and an agent.',
      principles: [
        { t: 'Delegate the work, not the accountability', d: 'The agent reads, compares and prepares. People keep the decisions that need business judgement.' },
        { t: 'Make risk understandable before asking for trust', d: 'The agent does not just flag something as risky. It shows the differences and their severity, so a person can see why attention is needed.' },
        { t: 'Make every action traceable', d: 'People can see what the agent did, which documents it used and how the work progressed. Logs and audit trails are part of the experience.' },
      ],
    },
    flow: {
      title: 'How does the experience work end to end?',
      intro: 'From a supplier confirmation arriving, to extraction, discrepancies, risk and the right human decision. One flow, with the whole order followed through it.',
    },
    risk: {
      title: 'How do we make risk and decisions understandable?',
      intro: 'This is the part I drove most closely. I proposed judging a supplier response by the differences found in it: what each difference is, how severe it is, and what that adds up to for the order. Product stakeholders reviewed the approach and we refined it together.',
      steps: ['Find the differences between the supplier response and the purchase order.', 'Understand the nature of each difference.', 'Assess how severe it is.', 'Use both to judge the potential risk of the response.', 'Decide whether a person needs to review or step in.'],
      note: 'This is the design logic I proposed, not a fixed scoring system with set thresholds. The examples are real differences from one order in the prototype.',
      scenariosTitle: 'When it is not straightforward',
      scenarios: [
        { t: 'The agent is unsure it read the document right', d: 'Each extraction carries a confidence score and sits beside the supplier PDF. Where it is low or wrong, the operations manager corrects the field, and the correction is logged.', shots: ['ops-editing'] },
        { t: 'A difference with real consequences', d: 'A payment term extended from net 30 to net 45 days arrives rated High, with a plain-language reason and a note that finance approval is needed. The buyer decides, not the agent.', shots: ['buyer-review'] },
      ],
    },
    patterns: {
      title: 'How did the design take shape?',
      intro: 'Six interaction patterns carry the experience. Each one answers a specific problem, and each was designed so it could be used again in other agentic workflows.',
    },
    enables: {
      title: 'What does this work enable?',
      intro: 'A complete, role-based path from the supplier email to approve and close, designed across three personas and 33 screens. The patterns are meant to carry over to other use cases.',
      rests: ['A working prototype of 33 screens across three roles.', 'Discovery and co-creation with customer stakeholders.', 'Workflows tested against feasibility with product, engineering and AI specialists.'],
      notClaimed: ['A measured turnaround time. Weeks to hours is the aim of the design, not a reported result.', 'A deployment figure or number of teams using it.', 'Reuse in other use cases. The patterns were designed for reuse.'],
      outcomeTitle: 'Designed to take weeks down to hours.',
      outcome: 'A complete, role-based path from the supplier email to approve and close: an agent definition, a human-agent contract, a risk logic and a shared architecture, designed across three personas and 33 screens. The aim of the design is to bring order confirmation from weeks down to hours. That is the intended improvement, not a measured result.',
    },
    transitions: [
      'Understanding the process meant looking beyond the documents, to the people, decisions and risks involved.',
      'What discovery showed pointed to a different way of dividing the work between an agent and the people responsible for it.',
      'With responsibilities set, the next question was how the model would work end to end inside an existing enterprise process.',
      'Not every difference carries the same consequence, so the flow needed a way to tell them apart.',
      'Those decisions needed consistent interactions that people could rely on at every step.',
      'Together, these patterns form a base that can reach beyond order confirmation.',
    ],
  },

  patterns: [
    { n: '01', name: 'Persona-based worklists', problem: 'Three roles receive the same order, but each needs to see and prioritise different things.', decision: 'Each role starts in a worklist built for its job. The shared columns stay in the same place, and what differs is what that role needs to decide: confidence for operations, discrepancies and risk for the buyer and the goods recipient.', reuse: 'Any workflow where several roles act on one object can use the same anatomy.', shots: ['ops-worklist', 'buyer-worklist', 'gr-worklist'] },
    { n: '02', name: 'Document parsing and extraction', problem: 'Supplier documents arrive in many layouts and languages, and nothing can move on until the data is right.', decision: 'The agent shows what it extracted as a structured form, with a confidence score, so a person can check it, correct it and mark it validated before anything goes downstream.', reuse: 'Any use case that turns incoming documents into structured data.', shots: ['ops-read', 'ops-edit'] },
    { n: '03', name: 'Document referencing', problem: 'People will not trust an extracted value if they cannot see where it came from.', decision: 'The original PDF sits beside the extracted data, and the Extraction tab stays available later in the flow, so a buyer reviewing a difference can go back to the source.', reuse: 'Any agent output that depends on a source document.', shots: ['buyer-extraction'] },
    { n: '04', name: 'Discrepancy review', problem: 'A list of differences is not enough to decide. People need context, size and a reason.', decision: 'Each difference shows the purchase order value, the confirmed value, the change, a severity and a plain-language reason. The next action is named on the page, and each person accepts or rejects only what they can judge.', reuse: 'Any comparison between what was expected and what arrived.', shots: ['buyer-review', 'gr-review'] },
    { n: '05', name: 'Activity logs', problem: 'When an agent acts, people need to see what it did and how the work progressed.', decision: 'One timeline holds corrections, recommendations, decisions and emails, each labelled by who acted: the agent, operations, the buyer, the goods recipient or the system.', reuse: 'Any workflow where people and an agent act on the same record.', shots: ['buyer-activity'] },
    { n: '06', name: 'Audit trails', problem: 'Decisions and changes have to stay accountable after the fact.', decision: 'Changes are saved with who made them, and a revised confirmation comes back as a new version under the same purchase order, so earlier decisions stay visible.', reuse: 'Any process where decisions need to be traced later.', shots: ['buyer-versions', 'ops-saved'] },
  ],

  architecture: {
    title: 'One flow, from inbox to close.',
    intro: 'Where the document comes in, how it is parsed, and how the work moves between the agent and three roles. Each person enters the same order at a different step.',
  },

  contract: {
    title: 'The human-agent contract.',
    intro: 'Before any screen, a working agreement between people and the agent: what it covers, what it may do, when a person decides, and how it grows. Filled in for this use case.',
    useCase: 'Supplier order confirmation',
    team: 'Procurement, supply chain management',
    capabilities: [
      ['Retrieve and read information', true, 'Email, PDF and purchase order'],
      ['Analyze and summarize', true, 'Compare, rate severity, explain'],
      ['Create content or recommendations', true, 'Next action and a drafted supplier email'],
      ['Update records', false, ''],
      ['Trigger workflows or transactions', true, 'Routes each deviation to its owner'],
      ['Communicate with users', true, 'Recommends the next action on every page'],
    ] as [string, boolean, string][],
    levels: [
      { name: 'Assist', text: 'Agent recommends, human executes.', when: 'Confidence is low or risk is high.', today: false },
      { name: 'Guided autonomy', text: 'Agent executes routine tasks, escalates exceptions.', when: 'Routine reading, comparing and drafting. A person decides at three gates.', today: true },
      { name: 'Bounded autonomy', text: 'Agent executes within explicit limits and policies.', when: 'Confidence is high and risk is low, inside policy.', today: false },
    ],
    roles: [
      ['AI agent', 'Reads, compares, rates, routes, drafts, logs.'],
      ['Procurement operations', 'Validates the extraction.'],
      ['Buyer', 'Decides commercial deviations, replies to the supplier, escalates critical risks.'],
      ['Goods recipient', 'Decides quantity and delivery.'],
      ['Administrator', 'Connects the mailbox and ERP, manages users.'],
    ] as [string, string][],
  },

  agent: {
    title: 'The agent, defined.',
    intro: 'An agent is a promise about what it will and will not do. Every screen, role and permission follows from it.',
    rows: [
      ['Job', 'Read each supplier order confirmation, compare it with the purchase order and prepare every decision for a person.'],
      ['Reads', 'The supplier’s email and PDF, in the supplier’s layout and often in German, and the purchase order in the ERP.'],
      ['Does', 'Extracts with a confidence score. Finds every difference, rates its severity and explains it in plain language. Routes each to its owner. Drafts the supplier email. Logs everything as the AI Agent.'],
      ['Never', 'Accepts or rejects a deviation, confirms its own extraction, or answers the supplier without the buyer.'],
      ['Hands over to', 'Operations for validation, the buyer for commercial deviations, the goods recipient for quantity and delivery.'],
    ] as [string, string][],
  },

  hitl: {
    title: 'Human in the loop, by design.',
    intro: 'The agent does the reading and the preparing. A person decides at three gates: validate, decide, send.',
    cols: ['Receive', 'Extract', 'Validate', 'Compare and route', 'Reply', 'Close'],
    lanes: [
      { who: 'Agent', cells: [
        [{ k: 'a', t: 'Picks up email and PDF' }],
        [{ k: 'a', t: 'Extracts, scores confidence' }],
        [],
        [{ k: 'a', t: 'Compares, rates severity, explains, routes' }],
        [{ k: 'a', t: 'Drafts supplier email' }],
        [{ k: 'a', t: 'Closes when nothing is left' }],
      ] },
      { who: 'Operations', cells: [
        [], [{ k: 'h', t: 'Checks and corrects' }], [{ k: 'g', t: 'Confirms validation' }], [], [], [],
      ] },
      { who: 'Buyer', cells: [
        [], [], [], [{ k: 'g', t: 'Decides commercial deviations' }], [{ k: 'g', t: 'Reviews and sends' }], [],
      ] },
      { who: 'Goods recipient', cells: [
        [], [], [], [{ k: 'g', t: 'Decides quantity and delivery' }], [], [],
      ] },
    ],
    legendA: 'Agent acts',
    legendG: 'Person decides: a gate',
    legendH: 'Person checks',
  },

  worklist: {
    title: 'Three worklists, one anatomy.',
    intro: 'Each role starts in a worklist built for its job. The shared columns stay in the same place, so the next action is always where you expect it. What differs is what each role needs in order to decide.',
    roles: [
      { who: 'Operations', job: 'Is the extraction right?' },
      { who: 'Buyer', job: 'Which commercial deviations to accept?' },
      { who: 'Goods recipient', job: 'Do quantity and delivery work for the store?' },
    ],
    columns: [
      ['PO no.', true, true, true],
      ['Document no.', true, true, true],
      ['Supplier', true, true, true],
      ['Order value', true, true, true],
      ['Received on', true, true, true],
      ['Status', true, true, true],
      ['Action', true, true, true],
      ['Discrepancies', false, true, true],
      ['Risk', false, true, true],
    ] as [string, boolean, boolean, boolean][],
  },

  risk: {
    title: 'How a deviation becomes a risk rating.',
    intro: 'Two measures run through the experience. Confidence says how sure the agent is that it read the document correctly. Risk says how much a difference matters.',
    chain: ['Deviation', 'Severity', 'Order risk', 'Worklist priority'],
    confidence: { value: 91, label: 'Average extraction confidence on the operations worklist' },
    examples: [
      ['Total invoice value', '€142,800 → €164,865', '+€22,065 (15.4%)', 'High'],
      ['Payment terms', 'Net 30 → Net 45 days', '+15 days', 'High'],
      ['Additional costs', 'none → €65.00', 'new cost', 'Medium'],
      ['Quantity, line 1002', '2,500 → 2,000', '−500 units', 'Medium'],
      ['Description, line 1001', 'German term differs', 'no functional difference', 'Low'],
    ] as [string, string, string, 'High' | 'Medium' | 'Low'][],
    orderRisk: 'High',
    note: 'Real deviations from one order in the prototype.',
  },

  prototype: {
    title: 'One order, from email to close.',
    intro: 'Follow a single confirmation through the assistant, from set-up to the revised version, handing between the agent and three people. Press play, or pick a chapter.',
  },

  autonomy: {
    title: 'Autonomy, and where it goes next.',
    intro: 'Today a person decides at three gates. The two measures that already run through the product, confidence and risk, are what let autonomy grow safely: each step up the ladder is earned where confidence is high and risk is low.',
    levels: [
      { name: 'Assist', text: 'The agent recommends. The person does the work.', state: 'floor' },
      { name: 'Guided autonomy', text: 'The agent reads, compares, routes and drafts. A person decides at three gates.', state: 'today' },
      { name: 'Bounded autonomy', text: 'High confidence, low risk: the agent resolves inside explicit policy. People review exceptions.', state: 'next' },
    ],
    next: [
      'Let high-confidence, low-risk differences resolve inside policy, with the buyer reviewing exceptions.',
      'Keep every step in the activity log, so autonomy can always be audited.',
      'Extend the same pattern across supply chain management.',
    ],
  },

  problem: [
    { title: 'A supplier replies', body: "Order confirmations arrive by email as PDFs, in the supplier's own layout and often in German: “Tage netto”, “Auftragsbestätigung”." },
    { title: 'Someone has to check it', body: 'Every price, payment term, quantity and delivery date has to be read and compared with the purchase order, line by line.' },
    { title: 'Each difference needs an owner', body: 'Commercial differences belong to the buyer, quantities and dates to the goods recipient, and the supplier has to be told exactly what to fix.' },
  ],

  principles: [
    { n: '01', title: 'Extract first, then let a person confirm', body: 'The agent reads the email and the PDF and shows what it found next to the original, with a confidence score. The operations manager corrects anything, saves a draft and marks the validation complete. Nothing moves on until a person has said so.', shot: 'ops-read' },
    { n: '02', title: 'Show every difference, and why', body: 'Each discrepancy shows the PO value, the confirmed value, the delta, a severity and a plain-language AI reasoning. For example: “Translated from German ‘45 Tage netto’. Finance approval needed for extension.”', shot: 'buyer-review' },
    { n: '03', title: 'Route each decision to the right role', body: 'The discrepancy view is generated and routed. Buyers weigh cost and logistics impact; goods recipients validate quantities and delivery dates against what the business actually needs. Both just accept or reject.', shot: 'gr-review' },
    { n: '04', title: 'Always say what happens next', body: 'An Insights and Recommendations panel on every page names the next action: review, confirm, share with the supplier, or “all set for now”. The buyer’s email to the supplier is drafted by the agent, with the discrepancy list attached.', shot: 'buyer-email' },
    { n: '05', title: 'Log everything', body: 'Corrections, AI recommendations, decisions and emails land in one Activity timeline, labelled by who acted: AI Agent, the operations manager, the buyer, the goods recipient or the system.', shot: 'buyer-activity' },
  ],

  personas: [
    { id: 'david', role: 'Procurement Operations', name: 'David Paul', title: 'Procurement Operations Manager', img: `${dir}persona-david-face.jpg`, struggle: 'Reads each PDF in the supplier\u2019s own layout, often in German, and checks every figure by hand.', resp: ['Review the extracted data from the order confirmations and make corrections', 'Confirm validated to kick off the discrepancy routing as per the policy'] },
    { id: 'adrian', role: 'Buyer', name: 'Adrian Smith', title: 'Category Buyer', img: `${dir}persona-adrian-face.jpg`, struggle: 'Must weigh cost and logistics impact on each difference, then tell the supplier exactly what to fix.', resp: ['Evaluate and accept/reject deviations based on logistics and cost impact', 'Escalate critical commercial risks to procurement leadership'] },
    { id: 'rajan', role: 'Goods Recipient', name: 'Rajan Nair', title: 'Store Executive', img: `${dir}persona-rajan-face.jpg`, struggle: 'Must judge whether quantity and delivery changes work for what the business actually needs.', resp: ['Validate quantity deviations based on actual business requirements', 'Review delivery date changes and assess impact on operations and flag risks'] },
  ],

  flowSteps: [
    ['Order confirmation received via email', 'The supplier replies to the purchase order.'],
    ['Data extracted and corrected if required', 'The agent extracts the data. Procurement operations corrects it.'],
    ['Validation marked complete', 'Operations confirms, which kicks off discrepancy routing.'],
    ['Discrepancy view generated and routed', 'Two parallel reviews: each person accepts or rejects their discrepancies.'],
    ['Send back to supplier if revision required', 'The buyer emails the supplier what needs to change.'],
    ['Approve and close', 'When nothing is left to resolve, the confirmation is closed.'],
  ] as [string, string][],

  journeys: [
    { id: 'access', label: '01', title: 'Sign in, set-up and navigation',
      summary: 'Three personas sign in to the same Supplier Order Confirmation Assistant. An administrator connects Microsoft Office 365 (the mailbox the confirmations arrive in) and the ERP system, and manages users through the identity service.',
      screens: [
        { id: 'signin-ops', name: 'Sign in: Procurement Operations' },
        { id: 'signin-buyer', name: 'Sign in: Buyer' },
        { id: 'signin-gr', name: 'Sign in: Goods Recipient' },
        { id: 'admin-setup', name: 'Administration: connections not yet made' },
        { id: 'admin-connected', name: 'Administration: connected' },
        { id: 'admin-menu', name: 'Navigation: queue, administration, archive' },
        { id: 'account-menu', name: 'Account menu with Sign Out' },
        { id: 'signed-out', name: 'Signed out' },
      ] },
    { id: 'ops', label: '02', title: 'Procurement Operations: validate the extraction',
      summary: 'David opens the worklist, sees what is waiting for validation and how confident the agent is, then checks the extraction against the supplier’s PDF, fixes what is wrong, saves and confirms. Every change is logged for audit.',
      screens: [
        { id: 'ops-worklist', name: 'My Worklist: pending validation and average confidence' },
        { id: 'ops-read', name: 'Extraction beside the supplier PDF (read)' },
        { id: 'ops-edit', name: 'Edit mode' },
        { id: 'ops-editing', name: 'Correcting a field, Save or Cancel' },
        { id: 'ops-confirm', name: 'Save Draft or Confirm Validation' },
        { id: 'ops-saved', name: 'Corrections saved' },
        { id: 'ops-validate', name: 'Mark validation as complete' },
        { id: 'ops-validated', name: 'Validation complete' },
      ] },
    { id: 'buyer', label: '03', title: 'Buyer: resolve discrepancies and answer the supplier',
      summary: 'Adrian sees every confirmation with its discrepancies, risk and status. He opens one, reads the AI reasoning, accepts or rejects each difference and lets the agent draft the email that goes back to the supplier. A revised confirmation comes back as a new version.',
      screens: [
        { id: 'buyer-worklist', name: 'My Worklist with discrepancies, risk and status' },
        { id: 'buyer-versions', name: 'Versions grouped under one purchase order' },
        { id: 'buyer-review', name: 'Review the discrepancies' },
        { id: 'buyer-decided', name: 'Confirm the discrepancy decisions' },
        { id: 'buyer-saved', name: 'Decisions saved, waiting for the others' },
        { id: 'buyer-share', name: 'Next action: share with the supplier' },
        { id: 'buyer-email', name: 'Email Supplier, drafted by the agent' },
        { id: 'buyer-sent', name: 'Sent to supplier, all set for now' },
        { id: 'buyer-extraction', name: 'Extraction tab: the data behind the discrepancies' },
        { id: 'buyer-activity', name: 'Activity: who did what, including the AI Agent' },
        { id: 'buyer-revised', name: 'Revised confirmation, new version to review' },
      ] },
    { id: 'gr', label: '04', title: 'Goods Recipient: validate quantity and delivery',
      summary: 'Rajan only sees what he can judge: quantity and delivery date. He accepts or rejects each one against what the store actually needs, and submits with an optional comment.',
      screens: [
        { id: 'gr-worklist', name: 'My Worklist, grouped by purchase order' },
        { id: 'gr-worklist-2', name: 'Worklist: first version resolved, revision waiting' },
        { id: 'gr-review', name: 'Review quantity and delivery discrepancies' },
        { id: 'gr-decided', name: 'Decisions made' },
        { id: 'gr-confirm', name: 'Confirm the decisions, Submit' },
        { id: 'gr-submit', name: 'Submit for further processing, with a comment' },
      ] },
  ].map(j => ({ ...j, screens: j.screens.map(s => ({ ...s, img: `${dir}${s.id}.webp` })) })) as AJourney[],
}
