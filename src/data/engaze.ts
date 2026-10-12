const B = import.meta.env.BASE_URL
const I = (n: string) => `${B}images/case-studies/engaze-hcm/${n}.webp`
const O = (n: string) => `${B}images/case-studies/${n}`

export type Role = { id: string; label: string; who: string; need: string; moments: string[]; ai: string[]; image: string; alt: string }

export const engaze = {
  title: 'Engaze: an AI-native HCM suite for every role',
  kicker: 'Employee experience shipped · suite designed',
  hero: I('hcm-hero'),
  brief: 'Design an AI-powered human capital management suite that improves the experience of everyone who touches it, whatever their role: employee, new joiner, people manager, recruiter, HR partner or senior leader. The bar was the best of the category, set against suites such as Workday, SAP SuccessFactors and SmartRecruiters.',
  honesty: 'What shipped: the employee-experience module (conversational HR companion), with measured results. What is design vision: the wider suite, built as a case-study exercise on top of the same principles. Screens and numbers for the wider suite are illustrative and marked so.',
  problem: [
    ['Fragmented by module', 'Recruiting, onboarding, performance, learning, pay and planning each ship as a separate product with its own navigation, vocabulary and login.'],
    ['Built for administrators', 'The primary user of most HCM software is the person configuring it. Everyone else visits for a task, fails to find it, and files a ticket.'],
    ['AI as a bolt-on', 'A chatbot or a summarise button is added to each module. Nothing is shared: not context, not trust, not the person.'],
  ] as [string, string][],
  principle: 'One companion, many surfaces. The same five principles (Trust, Guidance, Discoverability, Cognitive simplicity, Continuity) that made the employee bot work are applied to every role, so the product feels like one mind rather than twelve modules.',
  roles: [
    { id: 'employee', label: 'Employee', who: 'Esha · Sr Dev Lead', need: 'Get on with the work. Leave, pay and benefits should take seconds, not tickets.', moments: ['Apply sick leave in a sentence', 'Compare tax regimes with her own numbers', 'Ask where a policy says what it says'], ai: ['Acts on her behalf with confirmation', 'Every answer cites its source', 'Never a dead end: always a next step'], image: I('hcm-employee'), alt: 'Employee home: conversation, time off, tax comparison, payslip' },
    { id: 'joiner', label: 'New joiner', who: 'Navin · day one', need: 'Feel expected, not processed. Paperwork finished before he arrives.', moments: ['Checklist already 5 of 8 done', 'Buddy and team welcome surfaced', 'Benefit deadlines explained, not listed'], ai: ['Handles forms in the background', 'Prioritises by deadline, not by module', 'Answers in the same thread, on any device'], image: I('hcm-onboarding'), alt: 'New joiner day-one checklist with companion chat' },
    { id: 'manager', label: 'People manager', who: 'Manoj · Delivery Manager', need: 'Spend time on people, not on forms. Know who needs him and why.', moments: ['Approvals pre-checked against policy', '1:1 prep with wins, goals and topics', 'Review drafts grounded in real feedback'], ai: ['Drafts, never decides: edit before sharing', 'Shows the evidence behind each draft', 'Flags workload signals early'], image: I('hcm-manager'), alt: 'Manager home: team pulse, approvals, 1:1 prep, review draft' },
    { id: 'recruiter', label: 'Recruiter', who: 'Priya · Talent Acquisition', need: 'Shortlist fairly and fast, and explain every call to the hiring manager.', moments: ['214 applicants to 12 with reasons', 'Ask for skills and notice in plain language', 'Interview kit generated from the role'], ai: ['Why-this-match with evidence', 'Names and photos hidden at screening', 'Fairness check visible, not hidden in a report'], image: I('hcm-recruiter'), alt: 'Recruiter requisition view with ranked candidates and Ask Engaze' },
    { id: 'hr', label: 'HR partner', who: 'Ananya · HR Operations', need: 'Resolve routine cases in bulk, keep judgement for the hard ones.', moments: ['Queue shows what Engaze already resolved', 'Policy change impact before publishing', 'Low-confidence answers routed to review'], ai: ['Answers grounded in policy, with citations', 'Drafts policy wording and regional comms', 'Escalates by confidence, not by keyword'], image: I('hcm-hr'), alt: 'HR case queue with policy impact panel' },
    { id: 'leader', label: 'Senior leader', who: 'Rohan · Chief People Officer', need: 'See the workforce as a system, and test decisions before making them.', moments: ['A morning briefing, not a dashboard hunt', 'Attrition by function with reasons', 'Scenario: reskill or hire, side by side'], ai: ['Explains drivers, not just numbers', 'Models trade-offs with stated assumptions', 'Shares a plan with Finance in one step'], image: I('hcm-leader'), alt: 'Leader briefing with attrition and reskill-versus-hire scenario' },
  ] as Role[],
  scope: { image: I('hcm-map'), alt: 'Suite scope across Attract, Join, Work, Grow, Reward and Understand' },
  architecture: { image: I('hcm-architecture'), alt: 'Five-layer platform architecture', points: [
    ['Connected, not replaced', 'Systems of record stay where they are. The companion sits on top, so adoption does not wait for a migration.'],
    ['Trust is a layer, not a feature', 'Explainability, human approvals, fairness monitoring and an audit trail apply to every answer and every action.'],
    ['One intelligence, many agents', 'A role-aware orchestrator routes to recruit, onboard, perform, learn, reward and insight agents that share one people graph.'],
  ] as [string, string][] },
  positioning: {
    intro: 'A design hypothesis, not a benchmark. Typical suite patterns on the left; the Engaze stance on the right.',
    rows: [
      ['Entry point', 'Menus organised by module', 'One conversation, with modules behind it'],
      ['Role model', 'Admin first, others via self-service', 'Every role has a home that starts from its day'],
      ['AI', 'Assistant added to each module', 'Shared context and trust across modules'],
      ['Explainability', 'Scores and reports', 'Reasons and sources inline, every time'],
      ['Action', 'Navigate, fill forms, submit', 'Ask, confirm, done; with undo'],
      ['Integration', 'Replace legacy systems', 'Connect to existing systems of record'],
    ] as [string, string, string][],
  },
  ex: {
    title: 'Deep dive: employee experience',
    intro: 'The module that shipped. A conversational companion for leave balances, approvals, benefits and pay, designed principle-first rather than flow-first, and measured against enterprise HR bots that typically score below 60% CSAT.',
    teaserLabel: 'Watch the teaser · 58 s',
    stats: [['90%', 'CSAT'], ['<60%', 'typical enterprise HR bot'], ['45+', 'conversational products evaluated'], ['5', 'design principles']] as [string, string][],
    steps: [
      { label: 'Scope', heading: 'The employee-experience scope', body: 'An organic, experimental approach suited to the pace of generative AI. Rapid prototypes were the primary argument, validating hypotheses before direction was committed.', image: O('engaze-02.png') },
      { label: 'Struggles', heading: 'The most common daily struggles', body: 'Information lookups, communication across teams, and complex multi-step transactions. These became the design brief, not the engineering backlog.', image: O('engaze-03.png') },
      { label: 'Philosophy', heading: 'A three-layer strategy', body: 'Natural conversation at the interaction layer, content thumb-rules at the language layer, interface guidelines at the UI layer. Capabilities: deep organisation knowledge, emotional intelligence, a creative responder, natural flow.', image: O('engaze-04.png') },
      { label: 'Direction', heading: 'Consumer-grade, not compliance-grade', body: 'After evaluating 45+ conversational and generative products: bold visual language, dark mode and a conversational tone.', image: O('engaze-05.png') },
      { label: 'Dialogs', heading: 'Dialog flows from principles', body: 'Trust, Guidance, Discoverability, Cognitive simplicity and Continuity, each answering a failure mode of the previous generation of HR bots.', image: O('engaze-06.png') },
    ],
    screens: [7, 8, 9, 10, 11].map(n => O(`engaze-${String(n).padStart(2, '0')}.png`)),
  },
  language: { image: I('hcm-system'), alt: 'Engaze design language: colour, type, components, principles' },
  outcomes: {
    measured: [['90% CSAT', 'in a category that typically scores below 60%'], ['#1 HR AI', 'most praised HR AI product at the client'], ['Executive recognition', '"Stands beside any other leading studios\' work globally."']] as [string, string][],
    vision: ['One design language across six roles and every stage of the lifecycle', 'Role homes designed and prototyped for recruiter, manager, HR partner and leader', 'A trust model (sources, approvals, fairness, audit) specified once and reused'] as string[],
  },
}
