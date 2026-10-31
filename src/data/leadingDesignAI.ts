// Content for Leading Design, chapter 5: AI maturity for design organisations.
// Structure: three questions (Where are we? What next? How do we know it is working?). Each opens in layers, so the page
// shows the shape first and the depth only on request. Generic on purpose: it has to travel across sectors and tools.
// Revised after an independent review by an AI-visionary design leader (see the commit message for what changed).
import type { HiringDoc } from './hiring'

export interface Move { lens: string; title: string; text: string }
export interface Level { n: number; name: string; line: string; looks: string; evidence: string; skills: string; moves: Move[] }

export const chapterFive = {
  intro: [
    'Most design teams now use AI. Far fewer can say what it has changed for their work, where it fails, or what to build next. Using the tools is easy to see. Being good with them, safely, as a team, is harder to see and harder to build.',
    'This chapter gives you a way to see where your team stands, a short list of what to do next at your level, and a way to tell whether it is working. It is deliberately plain. Open only as much as you need.',
  ],

  questions: [
    { id: 'where', n: '1', title: 'Where are we?', text: 'What AI maturity means, five levels with evidence you can check, what “integrated” really means, and how your sector changes the route.', cta: 'Find your level' },
    { id: 'next', n: '2', title: 'What should we do next?', text: 'Pick your level and see the three moves that matter most, the partners you need around the team, and the newer risks to watch.', cta: 'See your three moves' },
    { id: 'proof', n: '3', title: 'How do we know it is working?', text: 'A few honest measures for progress, quality and safety, and how to grow people and talk to a worried team.', cta: 'Measure progress' },
  ],

  reality: {
    lead: 'A grounded start. Wide use is not the same as real gain.',
    items: [
      { figure: '78% / 32%', text: 'Figma’s 2025 survey: 78% said AI improves their efficiency, yet only 32% said they could rely on its output.', source: 'Figma 2025 AI report', url: 'https://www.figma.com/blog/figma-2025-ai-report-perspectives/' },
      { figure: '41%', text: 'Figma’s 2026 report: designers taking part in development doubled to 41% in a year, and developers doing design work rose from 44% to 60%. The edges of the role are moving.', source: 'Figma 2026 AI report', url: 'https://www.figma.com/blog/2026-ai-report/' },
      { figure: '62% / 39%', text: 'McKinsey (2025): 62% of organisations are at least experimenting with AI agents, and 39% report any enterprise-level financial effect. Redesigning workflows was among the strongest factors for real impact.', source: 'McKinsey, The state of AI in 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    ],
    note: 'These are surveys, much of it self-reported. Read them as signals and check against your own team. Many teams will find they sit at level 1 or 2. That is a normal place to start.',
  },

  // ── 1 · Where are we? ──────────────────────────────────────────────────────
  model: {
    title: 'What we mean by AI maturity',
    definition: 'AI maturity is how reliably a design organisation turns AI into better design outcomes, safely, as a team and not as a handful of enthusiasts.',
    how: 'The model has two parts. Four lenses describe what the team does. A few enablers describe what it needs around it. Your level is your lowest lens score, because a team that is strong in tools and weak in trust is not strong. Trust is one of the four lenses, so it counts in that lowest score.',
    lenses: [
      { name: 'People and skills', asks: 'Can people use AI, direct it and judge what it makes?' },
      { name: 'Ways of working', asks: 'Is AI part of shared workflows, with a person deciding where it matters?' },
      { name: 'Product', asks: 'Does the team design how AI behaves in what it ships, and test it?' },
      { name: 'Trust', asks: 'Are data, security, fairness and accountability handled to the standard your sector expects?' },
    ],
    enablers: [
      { name: 'Partners on day one', text: 'Security, data protection and legal. Needed before any AI is used on real work, in every sector.' },
      { name: 'Evaluation skill', text: 'Someone who can build and run a test of whether AI output is good. Borrowed is fine. Needed by level 3.' },
      { name: 'Engineering and prototyping', text: 'AI or machine-learning engineers, and design technologists who can prototype with models. Needed where you design AI features.' },
      { name: 'Approved tools and safe data', text: 'What you may use, and data you may use it on.' },
      { name: 'A sponsor', text: 'A leader who protects time and takes the risk of trying.' },
    ],
    cap: 'Enablers cap the lenses. The Product lens rarely rises above level 3 without a working link to engineering and evaluation skills.',
    controls: 'One rule holds at every level: any work that touches personal, client or regulated data needs its Trust controls in place before AI is used on it, whatever the team’s level.',
    gridTitle: 'What each score looks like',
    gridLead: 'Score from what you can show. Each cell is something observable. If you cannot point to it, score the level below.',
    grid: [
      { lens: 'People and skills', cells: ['A few people try tools on their own', 'Individuals use AI well in their craft and can name where it fails', 'Everyone can use, direct and judge AI output, and new joiners are taught', 'People can explain how AI features behave and fail, to users and partners', 'The team teaches others and shapes how the organisation learns'] },
      { lens: 'Ways of working', cells: ['No shared practice', 'Personal routines with real gains, not shared', 'One or more written workflows with human checkpoints, used by several people and reviewed monthly', 'AI is built into standards, reviews and handovers across the team', 'Other teams adopt your workflows'] },
      { lens: 'Product', cells: ['No AI in what you ship', 'You critique AI features others build', 'You design one AI feature with engineering, including how it explains and fails', 'You help decide behaviour, test with data partners and monitor after launch', 'Your patterns and review method are used across products'] },
      { lens: 'Trust', cells: ['Unwritten, and unofficial use may be happening', 'A one-page rule of safe and unsafe use, and a list of approved tools', 'A charter reviewed with security and legal, a tool register, and disclosure of AI use', 'Controls for AI features: data, human oversight with real authority to say no, and a record of decisions', 'Controls run automatically, are reviewed quarterly and are shared with others'] },
    ],
  },

  integration: {
    title: 'What “integrated” means',
    definition: 'Integrated means AI no longer depends on individual enthusiasm. It lives in the team’s workflows, standards and reviews, and you can show it.',
    test: 'The test: choose three recent pieces of work at random. For each, can you show whether AI was used, which rule applied and who checked it? Then ask: if your best AI user left tomorrow, would the practice survive?',
    degrees: [
      { name: 'Personal', text: 'One person’s habit. Gains stay with them.' },
      { name: 'Shared', text: 'The team’s workflow, written down, used by several people and reviewed.' },
      { name: 'Built in', text: 'Part of standards, reviews, handovers and the products you ship.' },
    ],
  },

  levels: [
    { n: 1, name: 'Exploring', line: 'People try AI on their own, officially or not.',
      looks: 'Use is occasional and uneven. Tools are personal, and some may be unapproved. Output is checked by instinct. There are no shared rules.',
      evidence: 'A few examples of use. Nothing written down.',
      skills: 'Security, data protection and legal as partners from the start. One or two people who want to go deeper.',
      moves: [
        { lens: 'Trust', title: 'Ask what people already use, without blame', text: 'People often use personal accounts when nothing is approved, and bans without an alternative drive use underground. Find out, then agree an approved route. Ask security which data may never go into a tool.' },
        { lens: 'Ways of working', title: 'Use AI on one real piece of work', text: 'Pick live work, not a demo. Have a second person check the result and record what went wrong.' },
        { lens: 'People and skills', title: 'Start a weekly show-and-tell', text: 'One example a week, good or bad. This is how private habits become shared knowledge.' },
      ] },
    { n: 2, name: 'Practising', line: 'Individuals use AI well inside their craft.',
      looks: 'People use AI for research, ideas, prototypes and writing, and know where it fails. Gains are real but private.',
      evidence: 'Named pieces of work with measured gains, and a record of failures.',
      skills: 'A few champions. Security and legal have seen a one-page rule. No engineering partner needed yet.',
      moves: [
        { lens: 'Ways of working', title: 'Redesign one team workflow', text: 'Choose the workflow that costs most time or causes most rework. Map today, design tomorrow, add a human checkpoint where a mistake would matter.' },
        { lens: 'People and skills', title: 'Agree how to judge output', text: 'A short rubric: accurate, useful, fair, on brand. Use it in reviews so “looks fine” stops being the standard.' },
        { lens: 'Trust', title: 'Write the charter and a tool register', text: 'Green, amber and red uses. A list of tools with an owner, the data each may touch, and the cost. Take it to security and legal.' },
      ] },
    { n: 3, name: 'Integrated', line: 'AI is part of how the team works, and survives people leaving.',
      looks: 'Shared workflows with checkpoints. A rubric in reviews. A charter people follow. A register of tools. The three-pieces test passes.',
      evidence: 'Before and after measures on one or two workflows. A new joiner picks it up from the team.',
      skills: 'Someone who can build and run an evaluation, even if borrowed. A named contact in engineering or data.',
      moves: [
        { lens: 'Product', title: 'Take AI into one feature you ship', text: 'Design how it explains itself, how it fails and how people recover. Work with engineering from the start.' },
        { lens: 'People and skills', title: 'Build a small test set', text: 'With a data person, collect good and bad cases and check the feature against them. Run it again whenever the model or tool version changes.' },
        { lens: 'Trust', title: 'Set controls for AI features', text: 'What the feature may do alone, who can say no and has the time and information to do it, and what is recorded. Treat connections to company data as data paths.' },
      ] },
    { n: 4, name: 'Designing AI', line: 'The team shapes how AI behaves in products.',
      looks: 'Designers help decide behaviour, not only the interface. Evaluation is part of the design process. Responsible practice is routine.',
      evidence: 'Shipped AI features with evaluation, user evidence, monitoring after launch and a record of decisions.',
      skills: 'A standing partnership with AI engineers and evaluation specialists, paired with the team where you design AI features, and a design technologist.',
      moves: [
        { lens: 'Product', title: 'Get a seat at the table on behaviour', text: 'Join decisions about thresholds, prompts, data and what the system may do alone. In some organisations model-risk or data teams own these. Aim for a voice, not control.' },
        { lens: 'Ways of working', title: 'Share your patterns and reviews', text: 'Publish explanation and recovery patterns and offer your review method to other teams.' },
        { lens: 'Trust', title: 'Make safety routine', text: 'Checks at each gate, monitoring after launch, an audit trail where your sector needs one, and a way to learn from every incident or near miss.' },
      ] },
    { n: 5, name: 'Leading', line: 'The team changes how the organisation designs and decides.',
      looks: 'Others adopt your patterns and review methods. Design has a voice in AI strategy. The team renews its own standards. This level depends on your organisation as much as your team.',
      evidence: 'Sustained, measured impact across products and over time, on real work.',
      skills: 'Shared ownership across design, engineering and data, with evaluation and design technology close to the team.',
      moves: [
        { lens: 'Trust', title: 'Review tools and the charter every quarter', text: 'Models, tools and rules change quickly. Retire what no longer fits, and write down what you learned.' },
        { lens: 'People and skills', title: 'Grow other teams', text: 'Run clinics, lend people and coach. Your level is only secure if others rise too.' },
        { lens: 'Product', title: 'Keep looking ahead', text: 'Give part of the team’s time to what is not yet obvious, so you are not only improving today’s practice.' },
      ] },
  ] as Level[],

  rules: [
    'Score the evidence, not the confidence. Where there is no evidence, score the lower number.',
    'Your level is your lowest lens. Do not average it away.',
    'Level reflects practice, not the tools you are allowed to use. A team limited to one approved tool can still be at level 3.',
    'Move up a level only when the evidence has held for a full quarter.',
    'Levels describe the team’s capability, not anyone’s job grade.',
  ],

  sector: {
    title: 'Your sector changes the route, not the destination',
    lead: 'A bank, a ministry and a consumer app can all reach level 4. They get there by different paths, at different speeds, and with different things to prove. Risk also sits in the use, not only the sector: a bank’s mood boards are not its credit-decision screens.',
    rule: 'So treat Trust in two ways. It is a lens, and it counts in your lowest score. And controls come before data: where work touches personal, client or regulated data, the controls must exist first, at any level.',
    rows: [
      { name: 'Banking and financial services', worry: 'Security, customer data, fairness and explanations for decisions, and answering to audit.', changes: 'Approved tools only. No customer data in prompts. Everything AI-assisted can be traced. Model risk teams may own the decisions you want to influence.', design: 'Design explanations and ways to appeal a decision. Prototype with synthetic data. Keep an evidence log for reviews.' },
      { name: 'Government and public sector', worry: 'Data privacy and sovereignty, accessibility, public accountability and procurement rules.', changes: 'Tools may need approval or hosting in your own environment, so the tool path is slower. Plain language and inclusion are expected.', design: 'Plain-language explanation, a visible human override, accessibility checks, notices and consent. Build the safe sandbox first.' },
      { name: 'Healthcare and life sciences', worry: 'Patient safety, privacy and clinical oversight.', changes: 'A person stays in the loop. No identifiable data. The limits of AI advice must be clear.', design: 'Safe defaults, clear error states and honest statements of what the system cannot do.' },
      { name: 'Enterprise and industrial', worry: 'Confidentiality of company and customer data, fit with existing systems, and how people feel about their roles.', changes: 'Clear data classification. Integration with enterprise data. Open conversation with employee representatives.', design: 'Explanation of each agent action, review and undo, and workflows that show who decided what.' },
      { name: 'Consumer and start-up', worry: 'Speed, brand trust, privacy of individuals, content rights and younger users.', changes: 'Fewer approvals, so faster experiments, and a greater risk of skipping the basics.', design: 'Disclosure, easy correction, and checks on content and bias before launch.' },
    ],
    note: 'Not legal advice. Confirm what applies to you with your legal, security and data-protection partners, and note the date you checked.',
  },

  // ── 2 · What next? ─────────────────────────────────────────────────────────
  next: {
    lead: 'Choose your level. You will see three moves, each tagged with the lens it lifts. First find your lowest lens, then do that lens’s move first. Three moves, not thirty.',
    skillsTitle: 'Partners around the team',
    skillsLead: 'Design teams rarely have every skill AI needs, and you do not have to hire to fill the gap. Start with the partners who keep you safe, add evaluation by level 3, and add engineering where you design AI features. Never hire to fix a maturity score.',
    roles: [
      { name: 'Security, data protection and legal', text: 'From day one. They tell you what data may go where, and what you must be able to show.' },
      { name: 'Evaluation: a data scientist or similar', text: 'Knows how to test whether output is good. Builds test sets with you. By level 3, even if borrowed.' },
      { name: 'AI or machine-learning engineer', text: 'Knows what the system can really do and how it fails. Needed where you design AI features, and most from level 4.' },
      { name: 'Design technologist', text: 'A designer who can prototype with models, to show what could work.' },
    ],
    ways: [
      { name: 'Borrow', text: 'A fixed monthly slot with someone from engineering, data or security. The cheapest way to start.' },
      { name: 'Grow', text: 'Train a curious designer into the design-technologist role, with time protected.' },
      { name: 'Embed', text: 'Pair an engineer or data scientist with the team. Worth it where you design AI features.' },
    ],
    pace: 'Plan for a quarter or two per level. One level in six months is a strong result. Claiming two invites shortcuts that show up later as rework and doubt.',
    watchTitle: 'Newer risks to watch',
    watch: [
      { name: 'Unofficial use', text: 'People using personal accounts when nothing is approved. Ask, do not punish, and offer a safe route.' },
      { name: 'Agents with too much freedom', text: 'Systems that take several steps alone. Limit what they may do without a person, and treat each connection to company data as a data path.' },
      { name: 'Tools that add AI quietly', text: 'Existing tools gaining AI features. Check what they send, keep and train on, and where the data lives.' },
      { name: 'Models that change under you', text: 'A provider updates a model and behaviour shifts. Re-run your test set when versions change.' },
      { name: 'Rubber-stamping', text: 'A person “in the loop” who has no time, no information or no authority to say no is not oversight. Make it real.' },
      { name: 'Cost that hides in review', text: 'Seats and usage are visible. Review time is not. Track both, and agree when to stop a workflow that is not paying back.' },
    ],
  },

  // ── 3 · How do we know? ────────────────────────────────────────────────────
  proof: {
    lead: 'What you measure becomes what the team does. Count how much AI is used and you will get more AI. Measure better work, safer work and more capable people, and you will get those.',
    rules: [
      { title: 'Quality beside speed', text: 'If time falls and quality falls with it, you have not matured. You have become faster at average work. Always show both.' },
      { title: 'Evidence moving up', text: 'Re-score each quarter. Progress is a lens moving up on evidence, not a number that feels better.' },
      { title: 'No surveillance', text: 'Team scorecards never include any one person’s AI use. Individual growth conversations never use team scores.' },
    ],
    groupsLead: 'Four groups give a balanced view. Use no more than six measures in total.',
    groups: [
      { name: 'Use', text: 'Is AI used on real work, in shared ways?', eg: 'Share of work using a shared workflow' },
      { name: 'Outcomes', text: 'Is the work faster and better?', eg: 'Time for one workflow, beside rework and review time; a monthly blind sample of ten recent pieces scored by two reviewers' },
      { name: 'Capability', text: 'Does the team know what AI does and where it fails?', eg: 'A list of known failure cases for each AI feature, reviewed this quarter' },
      { name: 'Trust and partners', text: 'Is it safe, and do we have what we need?', eg: 'Work with checks recorded; incidents and near misses; regular sessions with the evaluation or engineering partner' },
    ],
    peopleTitle: 'Growing people as the team grows',
    people: [
      'Use the capability matrix with each person: where they are, what is next and which learning track fits. It is for development conversations. Levels describe capability, not grades, and are not a target for everyone.',
      'People grow when they practise one level above their own on live work, with feedback, not from courses alone.',
      'Protect early-career designers’ judgement. If AI takes the routine work, give them tasks to do by hand first and compare, so they learn what good looks like.',
      'Not every designer needs to become an engineer. Aim for a team with a few deeper specialists and many confident practitioners.',
      'Recognise AI capability as one strand of growth, with evidence, beside craft, influence and leadership.',
    ],
    fearTitle: 'Talking to a worried team',
    fear: [
      { name: 'What changes', text: 'Some tasks get faster, some roles broaden, and the way we judge work gets more important.' },
      { name: 'What does not', text: 'People remain accountable for the work, and craft and judgement are what we are growing.' },
      { name: 'What I will not do', text: 'Use AI usage numbers to judge individuals or make decisions about jobs. Say this in public, and keep to it.' },
    ],
    close: 'Never measure the maturity of a design team by how much work it hands to AI. Measure the quality of its judgement, the work it ships and the people it grows.',
  },

  glossary: [
    { term: 'Agent', def: 'A system that takes several steps towards a goal, often using other tools, with less direction at each step.' },
    { term: 'Evaluation', def: 'A planned way to judge whether AI output is good, using agreed criteria.' },
    { term: 'Test set', def: 'A collection of good and bad cases you check a feature against, again and again.' },
    { term: 'Model version', def: 'The particular release of an AI model. Behaviour can change when it changes.' },
    { term: 'Hallucination', def: 'Output that sounds sure but is wrong or invented.' },
    { term: 'Threshold', def: 'The point at which a system acts, or asks a person, such as a confidence level.' },
    { term: 'Human in the loop', def: 'A person who reviews or decides. Only real if they have time, information and authority.' },
    { term: 'Data path', def: 'Any route by which company or personal data reaches a tool, including connections and plug-ins.' },
    { term: 'Audit trail', def: 'A record of what was done, by whom or what, and when, that can be checked later.' },
    { term: 'Synthetic data', def: 'Made-up data that resembles the real thing, used so real data is not exposed.' },
  ],
}

export const chapterFiveDocs: HiringDoc[] = [
  { slug: 'ai-maturity-assessment-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'AI Maturity Assessment Worksheet', summary: 'Score four lenses from real work, check the enablers, test whether AI is integrated and check the trust gate for your sector.' },
  { slug: 'ai-capability-matrix-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'AI Capability Matrix Worksheet', summary: 'Who is where, what each person needs next, and which skills you must borrow, grow or embed.' },
  { slug: 'ai-usage-charter-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'AI Usage Charter Worksheet', summary: 'What is safe, what needs a check and what is off limits, shaped by your sector, with a register of tools.' },
  { slug: 'ai-workflow-redesign-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'AI Workflow Redesign Worksheet', summary: 'Redesign one workflow so people and AI each do what they do best, with a human checkpoint where it matters.' },
  { slug: 'ai-six-month-roadmap-tracker', kind: 'Worksheet', part: 3, pages: 2, title: 'Six-Month AI Roadmap Tracker', summary: 'Plan six months month by month, with owners and signs that it is working.' },
  { slug: 'ai-scorecard-worksheet', kind: 'Worksheet', part: 3, pages: 1, title: 'AI Scorecard Worksheet', summary: 'A balanced view of use, outcomes, capability and trust, so speed never hides a drop in quality.' },
]
