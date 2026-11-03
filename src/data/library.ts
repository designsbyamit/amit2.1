/** The Grow Library: every article, framework and worksheet, in one list. Add an entry here and it appears on /learn/library. */

export type LibraryFormat = 'Article' | 'Framework' | 'Worksheet'

/** Broad categories, shown as tabs. A category appears only once it has an entry. */
export const libraryCategories = ['AI & Future of Design', 'Career & Craft', 'Leadership'] as const
export type LibraryCategory = (typeof libraryCategories)[number]

export type Point = { t: string; d: string }

/** A published fact that backs a section, shown as a quiet line with its source. */
export type Evidence = { text: string; label: string; url: string }

export type Section =
  | { id: string; kind: 'prose'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; body: string[] }
  | { id: string; kind: 'points'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; points: Point[] }
  | { id: string; kind: 'stages'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; stages: { who: string; focus: string; watch: string; proof: string }[] }
  | { id: string; kind: 'drills'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; drills: { t: string; d: string; output: string }[]; link?: { label: string; to: string } }
  | { id: string; kind: 'stack'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; groups: { job: string; why: string; tools: string[]; tip: string }[]; reviewed: string }
  | { id: string; kind: 'plan'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; phases: { when: string; name: string; steps: string[]; output: string }[] }
  | { id: string; kind: 'questions'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; questions: { q: string; good: string }[] }
  | { id: string; kind: 'mistakes'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; items: string[] }
  | { id: string; kind: 'checklist'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; items: string[] }
  | { id: string; kind: 'links'; kicker: string; title: string; lead?: string; evidence?: Evidence[]; links: { label: string; note: string; to?: string; href?: string }[] }

export interface LibraryEntry {
  slug: string
  format: LibraryFormat
  title: string
  /** One sentence for cards and search results. */
  summary: string
  category: LibraryCategory
  series?: string
  audience: string[]
  /** The question the reader walks in with. */
  concern: string
  /** What the reader should be able to do after reading. */
  need: string
  published: string
  /** ISO date, for sorting. */
  date: string
  answer: { title: string; lines: string[] }
  sections: Section[]
}

export const library: LibraryEntry[] = [
  {
    slug: 'what-does-it-take-to-become-an-ai-designer',
    format: 'Article',
    title: 'What does it actually take to become an AI designer?',
    summary: 'What to learn, what to practise and how to show it: a seven day plan, six practice sets and a tool stack by job.',
    category: 'AI & Future of Design',
    series: 'AI Designer Playbook',
    audience: ['Aspiring designers', 'Early-career designers', 'Mid-career designers'],
    concern: 'How do I break into the AI-Designer industry?',
    need: 'Know what to learn, what to practise, how to demonstrate capability and which tools to use.',
    published: 'November 2026',
    date: '2026-11-02',
    answer: {
      title: 'The short answer',
      lines: [
        'Judgment, not tools. Practise the work, then choose the tools that help you do it.',
        'Shape the experience around what AI makes possible and what people still need, not only an interface around AI.',
        'Understand how AI products behave and fail, practise on real behaviours, and show your judgment in a small body of work. A week is enough to start.',
      ],
    },
    sections: [
      {
        id: 'job', kind: 'points', kicker: '01 · The job', title: 'What an AI designer actually does.',
        lead: 'Traditional interfaces are deterministic. AI experiences are probabilistic, context sensitive and sometimes wrong. Most of the work is not making screens look intelligent. It is deciding how a system that gives different answers each time should behave, and making that behaviour understandable and safe for people.',
        evidence: [
          { text: 'Design skills rank first among skills asked for in AI job listings, and AI jobs in design and make industries are up 147% over two years.', label: 'Autodesk, 2026 AI Jobs Report', url: 'https://adsknews.autodesk.com/en/news/2026-ai-jobs-report/' },
          { text: '52% of Figma users building AI products say design matters more for AI products than for traditional ones, and 95% say at least as much.', label: 'Figma, 2025 AI report', url: 'https://www.figma.com/blog/figma-2025-ai-report-perspectives/' },
        ],
        points: [
          { t: 'Shape the behaviour', d: 'Decide what the system does, what it should refuse, when it asks and when it acts. This is the product, not decoration on top of it.' },
          { t: 'Design for uncertainty', d: 'Outputs can be wrong, slow or different from last time. You design how confidence, errors and corrections show up so people are never stranded.' },
          { t: 'Set the level of trust and control', d: 'Choose where a person approves, where they can undo and where the system can go ahead alone. Trust is built by these decisions, not by tone of voice.' },
          { t: 'Define what good looks like', d: 'Write down the quality bar and review real outputs against it. In AI products, judging output is part of design, not a step after it.' },
          { t: 'Work close to the model', d: 'Write and test prompts, read samples with engineers, and understand data and cost well enough to make realistic choices.' },
          { t: 'Use AI in your own process', d: 'Designing with AI tools and designing AI products are different skills. The strongest candidates can talk about both without mixing them up.' },
        ],
      },
      {
        id: 'learn', kind: 'points', kicker: '02 · Learn', title: 'What to learn, in plain terms.',
        lead: 'Design for uncertainty: make clear what the AI knows, what it does not, what it did and what the person can do next. Aim for the understanding a good collaborator needs, not an engineer’s depth. If you can explain these to a product manager without notes, you are in good shape.',
        evidence: [
          { text: 'Only 32% of Figma users say they can rely on AI output, which is why evaluation is a design skill.', label: 'Figma, 2025 AI report', url: 'https://www.figma.com/blog/figma-2025-ai-report-perspectives/' },
          { text: "Microsoft's 18 human-AI interaction guidelines were tested by 49 design practitioners across 20 AI products.", label: 'Microsoft Research, CHI 2019', url: 'https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/' },
        ],
        points: [
          { t: 'How models work, roughly', d: 'Prompts, context, tokens, probability, hallucination, latency and cost. Enough to predict how a feature will behave and to explain why.' },
          { t: 'The main interaction patterns', d: 'Conversational interfaces, generation tools, copilots inside existing workflows, AI search and agents that complete tasks. Know the strengths and traps of each.' },
          { t: 'Evaluation', d: 'How to build a small test set, write a rubric and compare versions. This is the habit that most separates serious candidates from hobbyists.' },
          { t: 'Trust, safety and ethics', d: 'Bias, privacy, consent, transparency and human oversight. You do not need to be a policy expert, but you must raise these early and concretely.' },
          { t: 'Prototyping with real models', d: 'A clickable flow cannot show how an AI feature feels. Learn to put a live model behind a prototype, even a rough one.' },
          { t: 'Communicating tradeoffs', d: 'Explain choices in terms of quality, risk, speed and cost. Hiring managers listen for this more than for tool names.' },
        ],
      },
      {
        id: 'stages', kind: 'stages', kicker: '03 · Where you start', title: 'Start from where you are.',
        lead: 'The path is the same, but the first move is different at each stage.',
        stages: [
          { who: 'Aspiring', focus: 'Build the foundation. Learn the vocabulary, study shipped AI products and design one small feature end to end.', watch: 'Collecting certificates instead of making things. One finished project beats five courses.', proof: 'A single case study on an AI feature you designed, including how it fails.' },
          { who: 'Early career', focus: 'Move your current work toward AI. Pick one feature on your team where AI could help and write the case for it, or volunteer for any AI work already in flight.', watch: 'Only polishing the interface. Ask to join conversations about behaviour, data and quality.', proof: 'A before and after of a real feature, with the decisions you made about behaviour and errors.' },
          { who: 'Mid career', focus: 'Bring your judgment. You already know how to frame problems and work with teams. Add evaluation, trust and system thinking, then lead a piece of AI work.', watch: 'Assuming seniority replaces fluency. Teams still expect you to have used these tools and to have an opinion.', proof: 'A story where you shaped an AI decision: what you changed, what you measured, what you would do differently.' },
        ],
      },
      {
        id: 'practise', kind: 'drills', kicker: '04 · Practice sets', title: 'Six practice sets that build the right muscle.',
        lead: 'Each set takes a few hours and leaves you with something you can show. Use them inside the seven day plan that follows, or pick the one that matches the gap you feel.',
        drills: [
          { t: 'Add AI to a product you know', d: 'Choose an app you use daily. Propose one AI feature, say what the system does and does not do, and describe what happens when it is wrong.', output: 'A one page behaviour brief.' },
          { t: 'Design the uncertainty', d: 'Take a single AI answer and design five states: confident, unsure, wrong, slow and refused. Decide what the person sees and can do in each.', output: 'Five annotated screens.' },
          { t: 'Map an agent with approvals', d: 'Pick a task such as booking travel or reconciling expenses. Break it into steps, mark what the agent does alone, where it asks and where it stops.', output: 'A flow with approval points.' },
          { t: 'Write a quality rubric', d: 'Collect twenty outputs from any AI tool for the same task. Write four criteria, score each output, and note what you would change in the prompt or the design.', output: 'A scored sheet and a short note.' },
          { t: 'Put a live model behind a prototype', d: 'Build a rough working version of practice set 1 using a prompt playground or an AI coding tool. Test it with three people and write down what surprised you.', output: 'A running prototype and notes.' },
          { t: 'Critique three shipped products', d: 'Pick three AI products. For each, describe the behaviour, one thing it does well, one thing that would confuse a new user and how you would fix it.', output: 'A short written teardown.' },
        ],
        link: { label: 'Practise with the Toolkits', to: '/learn/practice' },
      },
      {
        id: 'plan', kind: 'plan', kicker: '05 · A seven day plan', title: 'Take one ordinary task through seven days.',
        lead: 'Pick a small, everyday task and work through it step by step.',
        phases: [
          { when: 'Day 1', name: 'Choose a problem', steps: ['Talk to a user and define the friction.'], output: 'A clear problem statement.' },
          { when: 'Day 2', name: 'Check AI fit', steps: ['Decide what needs intelligence and what does not.', 'Use practice set 1 to propose one AI feature.'], output: 'A list of where AI helps and where it does not.' },
          { when: 'Day 3', name: 'Explore behaviour', steps: ['Compare model outputs for the same inputs.'], output: 'Notes on how models differ.' },
          { when: 'Day 4', name: 'Design the flow', steps: ['Include uncertainty and recovery in the flow.', 'Use practice sets 2 and 3: design the five states and map the approvals.'], output: 'A flow that shows what happens when the AI is wrong.' },
          { when: 'Day 5', name: 'Build a prototype', steps: ['Make one key interaction work.', 'Use practice set 5 to put a live model behind it.'], output: 'A working prototype.' },
          { when: 'Day 6', name: 'Test', steps: ['Cover normal, edge and failure cases.', 'Use practice set 4 to score real outputs against a rubric.'], output: 'Test results and what you changed.' },
          { when: 'Day 7', name: 'Share learnings', steps: ['Show evidence, limits and next steps.'], output: 'A short write-up you can share.' },
        ],
      },
      {
        id: 'stack', kind: 'stack', kicker: '06 · The tool stack', title: 'A starting point, not a ranking.',
        lead: 'A simple starter stack: ChatGPT or Claude, Figma, Google AI Studio, Figma Make or Lovable, and a spreadsheet. Tools change quickly, so check current capabilities, data handling, access and pricing before you use any of them.',
        reviewed: 'November 2026',
        groups: [
          { job: 'Research and framing', why: 'Understand the problem space and sharpen the question before you design.', tools: ['ChatGPT', 'Claude', 'Perplexity'], tip: 'Use the assistant as a thinking partner, then check what it tells you.' },
          { job: 'Model exploration', why: 'See how a model actually behaves with your inputs before you design around it.', tools: ['Google AI Studio', 'Anthropic Console', 'OpenAI Playground'], tip: 'Compare outputs across models and keep the inputs you tried.' },
          { job: 'Interaction design', why: 'Design the flow, the states and the recovery paths.', tools: ['Figma', 'Google PAIR', 'Microsoft HAX'], tip: 'PAIR and HAX are guidance to design with, not tools to operate.' },
          { job: 'Prototyping', why: 'Make one key interaction work so you can test how it feels.', tools: ['Figma Make', 'Lovable', 'Replit'], tip: 'One working interaction teaches more than ten static screens.' },
          { job: 'Testing', why: 'Run normal, edge and failure cases and see what changes.', tools: ['A spreadsheet of test scenarios', 'Promptfoo', 'LangSmith'], tip: 'Start with the spreadsheet. Promptfoo and LangSmith add repeatable evaluation.' },
          { job: 'Workflows', why: 'Connect actions and integrations once the experience needs them.', tools: ['n8n'], tip: 'Reach for this only when the design needs actions or integrations.' },
        ],
      },
      {
        id: 'prove', kind: 'points', kicker: '07 · Show it', title: 'What a strong case study covers.',
        lead: 'A hiring manager wants evidence that you can think about behaviour, not only visuals.',
        evidence: [
          { text: '39% of design leaders rank designing AI products a top five skill for new hires, and 47% of hiring managers rank systems thinking and service design a top five requirement.', label: 'Figma, 5 design skills to sharpen in the AI era', url: 'https://www.figma.com/blog/skills-for-the-ai-era/' },
        ],
        points: [
          { t: 'The user problem', d: 'The problem, and why AI fits it.' },
          { t: 'Your choices', d: 'The model and interaction choices you made, and why.' },
          { t: 'The prototype', d: 'A working prototype, not only screens.' },
          { t: 'Test results', d: 'What you tested and what you changed because of it.' },
          { t: 'Risks and oversight', d: 'The risks you found and where a human stays in control.' },
        ],
      },
      {
        id: 'avoid', kind: 'mistakes', kicker: '08 · What to avoid', title: 'What slows people down.',
        items: [
          'Optimising for tool count instead of judgment.',
          'Polished chat interfaces with no clear problem behind them.',
          'Happy path demos that leave out failure.',
          'Accuracy claims that were never evaluated.',
          'Automation with no user control.',
        ],
      },
      {
        id: 'check', kind: 'checklist', kicker: '09 · Self check', title: 'Are you ready to apply?',
        lead: 'Tick what is true today. The unchecked items are your next steps.',
        items: [
          'I understand how AI products behave and where they fail.',
          'I can tell when a problem suits AI and when it does not.',
          'I have designed an AI flow that covers uncertainty and recovery.',
          'I have built a working prototype, not only static screens.',
          'I have tested normal, edge and failure cases and changed my design because of it.',
          'I can explain the risks, privacy and bias questions in my own work.',
          'I have worked with engineering, product or domain experts on an AI problem.',
          'I can present my reasoning, evidence and limits, not just a tool list.',
        ],
      },
      {
        id: 'resources', kind: 'links', kicker: '10 · Further resources', title: 'Keep going.',
        links: [
          { label: 'AI-Native Design Framework: 11 UX patterns', note: 'My framework, on this site.', to: '/resources/ai-native-patterns' },
          { label: 'Practice Toolkits', note: 'Worksheets to practise with.', to: '/learn/practice' },
          { label: 'Google PAIR Guidebook', note: 'pair.withgoogle.com', href: 'https://pair.withgoogle.com/' },
          { label: 'Microsoft HAX Toolkit', note: 'microsoft.com/en-us/haxtoolkit', href: 'https://www.microsoft.com/en-us/haxtoolkit/' },
          { label: 'Guidelines for Human-AI Interaction', note: 'Microsoft Research', href: 'https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/' },
          { label: 'NIST AI Risk Management Framework', note: 'nist.gov', href: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        ],
      },
    ],
  },
]

export const findEntry = (slug: string) => library.find(e => e.slug === slug)

/** Rough reading time from the words in the entry. */
export function readMinutes(e: LibraryEntry) {
  const words = JSON.stringify([e.answer, e.sections]).split(/\s+/).length
  return Math.max(3, Math.round(words / 230))
}
