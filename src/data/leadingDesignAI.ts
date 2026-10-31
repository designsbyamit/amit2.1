// Content for Leading Design, chapter 5: AI maturity for design organisations.
// Generic on purpose: it has to travel across organisations, tools and regions, so it describes capability and judgement, never a product.
// Framed on the idea of capability, not job grades, and on measuring the quality of judgement, never the volume of work handed to AI.
import type { HiringDoc } from './hiring'
import type { Point } from './leadingDesignGrowth'

export const chapterFive = {
  intro: [
    'Most design teams now use AI. Fewer can say what they have gained, where it goes wrong, or what they should build next. The distance between using the tools and being good with them is the subject of this chapter.',
    'It treats AI maturity as a capability to grow, not a tool to roll out. It begins with what is changing, helps you see honestly where your team stands, and then covers building skill, leading responsibly, planning six months and measuring without fooling yourself. It ends with a rule worth keeping: never judge a team by how much work it hands to AI. Judge it by the quality of its judgement.',
  ],
  outcomes: [
    'An honest reading of where your team stands, scored from real work',
    'A capability map for each person, and a learning track to match',
    'A usage charter: what is safe, what needs a check, what is off limits',
    'One redesigned workflow, tested on live work',
    'A six-month plan with owners and signs that it is working',
    'A scorecard that puts quality beside speed',
  ],

  // ── Part 1: What is changing ───────────────────────────────────────────────
  ground: {
    lead: 'Access to AI is no longer the difference between teams. What people do with it is. Five shifts explain most of what managers meet.',
    points: [
      { title: 'From access to capability', text: 'Having the tools is the easy part. Skill is knowing when to use them, how to direct them and when to put them down. Two teams with the same tools can be a year apart.', ask: 'List the tools your team uses, then beside each, who is genuinely good at it.' },
      { title: 'From individual to team intelligence', text: 'When each person builds a private routine, the gains stay private. A team gets stronger when what one person learns becomes how everyone works.', ask: 'Ask each person for one routine worth sharing, and share one this week.' },
      { title: 'From generation to judgement', text: 'Making something is now cheap. Knowing whether it is good, true and right for the person using it is scarce. This is where designers add the most.', ask: 'Write down how your team decides that an AI output is good enough. If you cannot, that is your first task.' },
      { title: 'From interface to intelligence', text: 'Designing for AI is more than screens. It is behaviour, trust, explanation and what happens when the system is wrong. Few teams have practised this.', ask: 'Pick one AI feature you know and list what a user sees when it fails.' },
      { title: 'From experiment to measured impact', text: 'Trying things was right at first. Now people ask what changed. A team that can show better work, not only faster work, earns trust and room to grow.', ask: 'Choose one measure of quality to track beside speed.' },
    ] as Point[],
    evidenceLead: 'A few findings help explain the moment. They come from surveys and usage studies, much of it self-reported, so treat them as signals and check them against your own team.',
    evidence: [
      { figure: '78% / 32%', text: 'In Figma’s 2025 survey, 78% said AI improves their efficiency, while only 32% said they could rely on its output.', source: 'Figma 2025 AI report', url: 'https://www.figma.com/blog/figma-2025-ai-report-perspectives/' },
      { figure: '41%', text: 'Designers taking part in development doubled to 41% in a year, and developers doing design work rose from 44% to 60%. Roles are blending.', source: 'Figma 2026 AI report', url: 'https://www.figma.com/blog/2026-ai-report/' },
      { figure: '62% / 39%', text: 'McKinsey found 62% of organisations experimenting with AI agents, but only 39% reporting any enterprise-level financial impact. Redesigning workflows was among the strongest factors for real impact.', source: 'McKinsey, The state of AI in 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
      { figure: '57% / 43%', text: 'In a study of real conversations with an AI assistant, 57% of use was augmentation (working with the person) and 43% was automation.', source: 'Anthropic Economic Index, 2025', url: 'https://www.anthropic.com/research/the-anthropic-economic-index' },
    ],
  },

  // ── Part 2: Where you stand ────────────────────────────────────────────────
  stand: {
    lead: 'You cannot plan the climb without knowing where the foot of it is. This part gives you five levels, eight dimensions to score and a rule that keeps the result honest.',
    points: [
      { title: 'Levels describe capability, not grades', text: 'A person at a high level of AI capability is not necessarily senior, and a senior person may be at the start. Keep the two scales apart, or the conversation will turn into a ranking.', ask: 'Say this out loud before any assessment.' },
      { title: 'Score the evidence, not the confidence', text: 'People overrate and underrate themselves in equal measure. Look at the files, the reviews and what shipped. Where there is no evidence, score the lower number.', ask: 'For each score, name the piece of work that earns it.' },
      { title: 'The lowest score sets the level', text: 'A team strong in tools and weak in evaluation is not strong. The weakest dimension holds up or holds back all the rest, so do not average it away.', ask: 'Find your lowest dimension before you plan anything else.' },
    ] as Point[],
    levelsLead: 'Five levels, from first steps to a team that has changed how its organisation designs. Each describes what you would see, the evidence that proves it, and the move that takes you up.',
    levels: [
      { n: 1, name: 'Aware and experimenting', sees: 'People try tools on their own. Use is occasional and uneven. Output is checked by instinct.', evidence: 'A few examples of use. No shared practice or rules.', up: 'Learn the basics together, agree what is safe, and use AI on real work with a second pair of eyes.' },
      { n: 2, name: 'Augmented practitioner', sees: 'Individuals use AI well inside their own craft, for research, ideas, prototypes and writing, and they know where it fails.', evidence: 'Visible gains in speed or range on named pieces of work, and a record of what went wrong.', up: 'Turn personal routines into shared workflows, and judge output against a common standard.' },
      { n: 3, name: 'Orchestrator', sees: 'The team designs workflows that mix people, tools and agents, with checkpoints where a person decides.', evidence: 'One or more redesigned workflows with measures before and after.', up: 'Take what you know about AI into the products you design, not only the way you work.' },
      { n: 4, name: 'Product and experience innovator', sees: 'The team shapes AI-powered products: behaviour, trust, explanation, recovery. Evaluation is part of the design process.', evidence: 'Shipped AI features with evaluation, user evidence and a record of decisions.', up: 'Change how the wider organisation designs, and carry responsibility into every stage.' },
      { n: 5, name: 'AI-native and transformational', sees: 'The team has changed how its organisation designs, decides and learns. Responsible practice is routine. Others look to it.', evidence: 'Sustained, measured impact across several dimensions, on real work, over time.', up: 'Keep the bar rising and share what you know.' },
    ],
    dimensionsLead: 'Score each of these from 1 to 5: Awareness, Application, Integration, Expertise, Transformation.',
    dimensions: [
      { name: 'AI literacy', text: 'Understanding what AI can and cannot do, and why it fails.' },
      { name: 'Tools and ecosystem', text: 'Choosing and combining tools on purpose, and knowing what each is for.' },
      { name: 'AI-enabled design practice', text: 'Using AI inside research, ideas, prototypes and craft without losing the craft.' },
      { name: 'Workflow intelligence', text: 'Designing how people, tools and agents work together, with checkpoints.' },
      { name: 'AI product expertise', text: 'Designing AI behaviour: trust, explanation, feedback and recovery.' },
      { name: 'Data and evaluation', text: 'Judging whether an output is good, and showing how you know.' },
      { name: 'Responsible AI', text: 'Fairness, privacy, transparency and accountability, built into the work.' },
      { name: 'Culture and leadership', text: 'Whether people feel safe to try, to say it went wrong and to ask for help.' },
    ],
    topRules: ['Every dimension scores 4 or higher', 'At least four dimensions show top-level evidence', 'The impact has lasted over time', 'Responsible AI scores 4 or higher', 'The scores rest on real work, not self-report'],
    topLead: 'A team is AI-native only when all of these hold.',
  },

  // ── Part 3: Building capability ────────────────────────────────────────────
  build: {
    lead: 'Capability grows from practice on real work, guided by someone who knows what good looks like. Choose learning by what people need to be able to do, not by which tool is in fashion.',
    points: [
      { title: 'Teach capability, not tools', text: 'Tools change every few months. The ability to frame a problem, direct a system, judge an output and explain a decision does not. Teach that, and the tools take care of themselves.', ask: 'Rewrite one training idea as a capability, with no tool named.' },
      { title: 'Protect the human edge', text: 'Judgement, intuition, systems thinking, making meaning and deciding ethically are what AI leaves to people. Give them as much practice as the tools.', ask: 'Name one practice that builds judgement in each person, such as reasoning aloud in critique.' },
      { title: 'Learn on live work', text: 'A workshop that nobody applies is theatre. Every month should end with something used in real work and a record of what was learned.', ask: 'Attach each learning goal to a live project.' },
    ] as Point[],
    tracksLead: 'Six tracks cover the ground. Most people need two or three, in the order that fits where they are.',
    tracks: [
      { id: 'A', name: 'Foundations', text: 'How AI works, where it fails and how to talk about it plainly.' },
      { id: 'B', name: 'AI in the craft', text: 'Research, ideation, prototyping and writing with AI, keeping the craft.' },
      { id: 'C', name: 'Workflows and agents', text: 'Designing how people and AI work together, with checkpoints.' },
      { id: 'D', name: 'Designing AI products', text: 'Behaviour, trust, explanation, feedback and error states.' },
      { id: 'E', name: 'Data and evaluation', text: 'Judging output, building rubrics and reading evidence.' },
      { id: 'F', name: 'Responsible AI and leadership', text: 'Risk, fairness, change and bringing others with you.' },
    ],
    journeysLead: 'Three journeys run side by side, and a mature team does all of them.',
    journeys: [
      { name: 'AI for design', text: 'Using AI to do design work better: research, concepts, prototypes, writing.' },
      { name: 'Design for AI', text: 'Designing products where AI is part of what the user meets.' },
      { name: 'Design with AI', text: 'Designing how people and AI work together, as colleagues in a workflow.' },
    ],
  },

  // ── Part 4: Leading responsibly ────────────────────────────────────────────
  responsible: {
    lead: 'Responsibility is not a final review. It is part of every stage of the work, and it is the dimension most teams score lowest. Writing it down is the start.',
    points: [
      { title: 'A person is always accountable', text: 'Whoever or whatever made an output, a named person stands behind it. Say this early. It settles most arguments before they begin.', ask: 'Add this line to your team’s working agreement.' },
      { title: 'Say when AI shaped the work', text: 'Disclosure builds trust with colleagues and users. It also makes it easier to find the cause when something goes wrong.', ask: 'Decide where disclosure appears: in the file, the review or the release note.' },
      { title: 'Keep a person at every high-stakes step', text: 'The higher the cost of being wrong, the closer a person should sit to the decision. Name those steps in advance.', ask: 'List your three highest-stakes decisions and who makes each.' },
      { title: 'Protect the data and the people behind it', text: 'Know what is shared with a tool and who can see it. Check output for bias and for who it leaves out, before it ships.', ask: 'Ask your security and data partners what must never be put into a public tool.' },
    ] as Point[],
    zonesLead: 'A green, amber and red list is the simplest policy that works. It tells people what they may do without asking.',
    zones: [
      { zone: 'Green', name: 'Use freely', text: 'Low risk, no sensitive data. For example research summaries, naming ideas, early layouts. Say it was used, and review before sharing.' },
      { zone: 'Amber', name: 'Use with a check', text: 'Involves customer or company data, or reaches users. Use approved tools, have a second person check and keep a record.' },
      { zone: 'Red', name: 'Do not use', text: 'Personal data in public tools, generated users in place of real research, or shipping output nobody has reviewed.' },
    ],
    stagesLead: 'Then decide where in the work someone looks. One question for each stage is enough to begin.',
    stages: [
      { name: 'Discover', q: 'Is AI the right tool for this problem?' },
      { name: 'Define', q: 'Whose data are we using, and may we?' },
      { name: 'Design', q: 'Did we choose this, or did the tool?' },
      { name: 'Build', q: 'Does it work for people with different needs?' },
      { name: 'Test', q: 'How do we know it is good, against what?' },
      { name: 'Launch', q: 'Is use disclosed, and can users correct it?' },
      { name: 'Learn', q: 'What went wrong, and what do we change?' },
    ],
    legal: 'Rules differ by region and sector, and they change. For example, the EU AI Act has applied its AI literacy duty since February 2025 and its main transparency rules from August 2026 (some parts later), and India’s AI Governance Guidelines of November 2025 are voluntary. Treat this as a prompt to ask, not as advice: confirm what applies to you with your legal and security partners, and note the date you checked.',
  },

  // ── Part 5: Six months and the operating model ─────────────────────────────
  plan: {
    lead: 'A plan turns intent into a habit. This one runs six months, each month ending in something used in real work. It is a steady climb, not a leap.',
    points: [
      { title: 'One level in six months is a strong result', text: 'A team that moves up one level, on evidence, has done well. Promising two invites shortcuts, and the shortcuts show up later as rework and doubt.', ask: 'Write the level you are aiming for and the evidence that would prove it.' },
      { title: 'Redesign workflows, do not bolt on tools', text: 'The strongest gains come from changing how work flows, with people deciding where it matters. A tool added to an unchanged process gives a small gain.', ask: 'Choose one workflow that costs the team the most time or causes the most rework.' },
      { title: 'Name an owner for every month', text: 'Plans without owners become wishes. Give each month to a person, and make it easy for them to say it slipped.', ask: 'Put a name beside each month.' },
    ] as Point[],
    monthsLead: 'A shape to adapt. Move months around, but keep the order: foundations, habit, workflow, product, embedding, review.',
    months: [
      { m: 'Month 1', name: 'Foundations', text: 'Score the team from evidence. Agree the usage charter. Choose the one workflow to redesign.', out: 'Assessment and charter' },
      { m: 'Month 2', name: 'Habit', text: 'Start a weekly show-and-tell. Draft a rubric for judging output. List the tools and what each is for.', out: 'Rubric v1 and tool list' },
      { m: 'Month 3', name: 'Workflow', text: 'Redesign the chosen workflow with checkpoints and run it on live work.', out: 'Workflow map and first measures' },
      { m: 'Month 4', name: 'Product', text: 'Design patterns for explanation, trust and recovery in one AI feature.', out: 'A pattern set for the feature' },
      { m: 'Month 5', name: 'Embed', text: 'Use the rubric in every review. Redesign a second workflow.', out: 'Two workflows live' },
      { m: 'Month 6', name: 'Review', text: 'Score again, on evidence. Share what you learned. Plan the next six months.', out: 'Maturity review' },
    ],
    opsLead: 'A few roles and rituals keep it alive when attention moves elsewhere. Keep them small.',
    roles: [
      { name: 'An owner of the capability plan', text: 'Usually you, or someone you trust. Keeps the plan moving and reports on it.' },
      { name: 'Practice champions', text: 'People who share what works, and run the show-and-tell.' },
      { name: 'An evaluation reviewer', text: 'Keeps the rubric alive and checks that it is used.' },
      { name: 'A responsible AI partner', text: 'From legal, security or data, working with you on the charter.' },
    ],
    rituals: [
      { name: 'Weekly show-and-tell', text: 'One example of AI done well or badly.' },
      { name: 'Monthly rubric review', text: 'Add examples, retire what no longer fits.' },
      { name: 'Quarterly charter review', text: 'Change the rules when the work has changed.' },
      { name: 'Six-monthly maturity review', text: 'Score again and plan the next stretch.' },
    ],
    rhythmNote: 'Avoid learning theatre: workshops, badges and slide decks that nobody applies. If a ritual produces nothing used in real work, change it.',
    pace: [
      { from: '1 to 2', time: 'One to two months' },
      { from: '2 to 3', time: 'Two to three months' },
      { from: '3 to 4', time: 'Two to four months' },
      { from: '4 to 5', time: 'Three to six months' },
    ],
    paceNote: 'Planning estimates for a focused team, not benchmarks. Moving from the first level to the last in six months is unlikely, and promising it will cost you trust.',
  },

  // ── Part 6: Measuring ──────────────────────────────────────────────────────
  measure: {
    lead: 'What you measure becomes what the team does. Measure only speed, and you will get fast, average work. Put quality, expertise and responsibility beside it.',
    points: [
      { title: 'Outcomes, not volume', text: 'Never measure maturity by how much work is handed to AI. A team can delegate a great deal and understand very little.', ask: 'Delete any measure that counts the amount of AI used.' },
      { title: 'Quality beside speed, always', text: 'If time falls and quality falls with it, the team has not matured. Show the two together, every time.', ask: 'Pair every speed measure with a quality measure.' },
      { title: 'Targets from your own baseline', text: 'Industry numbers rarely match your team. Set a baseline, set a target you believe and review it each month.', ask: 'Capture a baseline before you change anything.' },
    ] as Point[],
    groupsLead: 'Five groups give a balanced view. Choose one or two measures in each.',
    groups: [
      { name: 'Adoption', text: 'Are people using AI on real work, and confident in it?', eg: 'People using AI weekly; confidence in AI-assisted work' },
      { name: 'Productivity', text: 'Is the work faster or lighter, for a reason you can name?', eg: 'Time for one workflow, before and after' },
      { name: 'Quality', text: 'Is the work better, by a standard you can show?', eg: 'Output passing the rubric at first review; corrections after release' },
      { name: 'AI product expertise', text: 'Can people design and judge AI behaviour?', eg: 'People who can explain a system’s failure cases' },
      { name: 'Responsible AI', text: 'Are the checks real?', eg: 'Work with disclosure and checks recorded' },
    ],
    checklistLead: 'A last check for managers, in six groups. Answer yes, not yet or no, and let the “not yet” answers set your next move.',
    checklist: [
      { name: 'Understand', items: ['I can explain what AI does well and badly in plain words', 'I know what each tool my team uses is for', 'I have tried the tools myself on real work', 'I know where my team’s knowledge is thin'] },
      { name: 'Practise', items: ['Everyone on the team has used AI on live work this month', 'We share what works and what fails, every week', 'We have a way of judging output', 'Our best practice is written down'] },
      { name: 'Organise', items: ['We have redesigned at least one workflow, not only added a tool', 'Every workflow has a named person at the high-stakes steps', 'Someone owns the capability plan', 'The plan has dates and owners'] },
      { name: 'Protect', items: ['We have a usage charter in plain language', 'Everyone knows what must never go into a public tool', 'We say when AI shaped the work', 'Legal and security have seen our charter'] },
      { name: 'Measure', items: ['We have a baseline for quality and for speed', 'We measure outcomes, not how much AI is used', 'We review the scorecard every month', 'We have changed something because of it'] },
      { name: 'Lead', items: ['People feel safe to say that AI got it wrong', 'I have talked openly about worries over roles', 'People can see how their own growth fits the plan', 'I can show leaders the evidence, not only the story'] },
    ],
    close: 'Never measure the maturity of a design team by how much work it delegates to AI. Measure the quality of its judgement, the work it ships and the people it grows.',
  },
}

export const chapterFiveDocs: HiringDoc[] = [
  { slug: 'ai-maturity-assessment-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'AI Maturity Assessment Worksheet', summary: 'Score your team on eight dimensions from real work, and find the one dimension that holds the rest back.' },
  { slug: 'ai-capability-matrix-worksheet', kind: 'Worksheet', part: 1, pages: 1, title: 'AI Capability Matrix Worksheet', summary: 'A role-based view of who is where, what each person needs next and which learning track gets them there.' },
  { slug: 'ai-usage-charter-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'AI Usage Charter Worksheet', summary: 'Write down what is safe, what needs a check and what is off limits, and where in the work someone looks.' },
  { slug: 'ai-workflow-redesign-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'AI Workflow Redesign Worksheet', summary: 'Redesign one workflow so that people and AI each do what they do best, with a human checkpoint where it matters.' },
  { slug: 'ai-six-month-roadmap-tracker', kind: 'Worksheet', part: 3, pages: 2, title: 'Six-Month AI Roadmap Tracker', summary: 'Plan six months of capability building, month by month, with owners and signs that it is working.' },
  { slug: 'ai-scorecard-worksheet', kind: 'Worksheet', part: 3, pages: 1, title: 'AI Scorecard Worksheet', summary: 'A balanced view of adoption, productivity, quality, expertise and responsibility, so speed never hides a drop in quality.' },
]
