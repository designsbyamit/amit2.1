/** The Grow Library: every article, framework and worksheet, in one list. Add an entry here and it appears on /learn/library. */

export type LibraryFormat = 'Article' | 'Framework' | 'Worksheet'

/** Broad categories, shown as tabs. A category appears only once it has an entry. */
export const libraryCategories = ['AI & Future of Design', 'Career & Craft', 'Leadership'] as const
export type LibraryCategory = (typeof libraryCategories)[number]

export type Point = { t: string; d: string }

export type Section =
  | { id: string; kind: 'prose'; kicker: string; title: string; lead?: string; body: string[] }
  | { id: string; kind: 'points'; kicker: string; title: string; lead?: string; points: Point[] }
  | { id: string; kind: 'stages'; kicker: string; title: string; lead?: string; stages: { who: string; focus: string; watch: string; proof: string }[] }
  | { id: string; kind: 'drills'; kicker: string; title: string; lead?: string; drills: { t: string; d: string; output: string }[]; link?: { label: string; to: string } }
  | { id: string; kind: 'stack'; kicker: string; title: string; lead?: string; groups: { job: string; why: string; tools: string[]; tip: string }[]; reviewed: string }
  | { id: string; kind: 'plan'; kicker: string; title: string; lead?: string; phases: { when: string; name: string; steps: string[]; output: string }[] }
  | { id: string; kind: 'questions'; kicker: string; title: string; lead?: string; questions: { q: string; good: string }[] }
  | { id: string; kind: 'mistakes'; kicker: string; title: string; lead?: string; items: string[] }
  | { id: string; kind: 'checklist'; kicker: string; title: string; lead?: string; items: string[] }
  | { id: string; kind: 'links'; kicker: string; title: string; lead?: string; links: { label: string; note: string; to?: string; href?: string }[] }

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
    summary: 'The skill is judgment, not a long tool list: what changes when you design AI products, the capabilities to build, a tool stack by job and a seven day practice plan.',
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
        'The main skill is judgment, not mastering many tools. Practise the work, then choose the tools that help you do it.',
        'Shape the experience around what AI makes possible and what people still need, rather than only designing an interface around AI.',
        'This is a five to ten minute read. Use it as a map: what is different, what to build, what to use and how to show it.',
      ],
    },
    sections: [
      {
        id: 'problem', kind: 'points', kicker: '01 · A different design problem', title: 'The material has changed.',
        lead: 'Traditional interfaces are deterministic. AI experiences are probabilistic, context sensitive and sometimes wrong. That changes how you think, not only what you draw.',
        points: [
          { t: 'Traditional interfaces', d: 'You define a fixed path, then check that people can complete the task.' },
          { t: 'AI experiences', d: 'Outputs vary, depend on context and can be wrong, so the same path does not give the same result twice.' },
          { t: 'Traditional thinking', d: 'Design the screens and the route through them. Validate task completion.' },
          { t: 'AI-native thinking', d: 'Design the conditions the system works in. Evaluate quality across scenarios and levels of risk.' },
        ],
      },
      {
        id: 'capabilities', kind: 'points', kicker: '02 · Capabilities to build', title: 'Fluency, not machine learning engineering.',
        lead: 'Design for uncertainty. Make clear what the AI knows, what it does not, what it did and what the person can do next.',
        points: [
          { t: 'AI literacy', d: 'Model strengths and failure modes, and how prompts, data, latency and cost matter.' },
          { t: 'Problem framing', d: 'Find problems that suit AI, and recognise when AI is not the answer.' },
          { t: 'Human-AI interaction', d: 'Intent, control, transparency, trust, correction, handoff and graceful failure.' },
          { t: 'Prototyping', d: 'Build working experiments, not only static screens.' },
          { t: 'Quality and responsibility', d: 'Test edge cases, bias, privacy, reliability and wrong answers.' },
          { t: 'Systems thinking', d: 'Data, permissions, tools, integrations and human oversight.' },
          { t: 'Collaboration', d: 'Work with product, engineering, domain and risk experts.' },
          { t: 'Communication', d: 'Present your reasoning, evidence and limits. A tool list is not a case study.' },
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
        id: 'stack', kind: 'stack', kicker: '04 · The tool stack', title: 'A starting point, not a ranking.',
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
        id: 'plan', kind: 'plan', kicker: '05 · A seven day practice plan', title: 'Take one ordinary task through seven days.',
        lead: 'Pick a small, everyday task and work through it step by step.',
        phases: [
          { when: 'Day 1', name: 'Choose a problem', steps: ['Talk to a user and define the friction.'], output: 'A clear problem statement.' },
          { when: 'Day 2', name: 'Check AI fit', steps: ['Decide what needs intelligence and what does not.'], output: 'A list of where AI helps and where it does not.' },
          { when: 'Day 3', name: 'Explore behaviour', steps: ['Compare model outputs for the same inputs.'], output: 'Notes on how models differ.' },
          { when: 'Day 4', name: 'Design the flow', steps: ['Include uncertainty and recovery in the flow.'], output: 'A flow that shows what happens when the AI is wrong.' },
          { when: 'Day 5', name: 'Build a prototype', steps: ['Make one key interaction work.'], output: 'A working prototype.' },
          { when: 'Day 6', name: 'Test', steps: ['Cover normal, edge and failure cases.'], output: 'Test results and what you changed.' },
          { when: 'Day 7', name: 'Share learnings', steps: ['Show evidence, limits and next steps.'], output: 'A short write-up you can share.' },
        ],
      },
      {
        id: 'prove', kind: 'points', kicker: '06 · Show it', title: 'What a strong case study covers.',
        lead: 'A hiring manager wants evidence that you can think about behaviour, not only visuals.',
        points: [
          { t: 'The user problem', d: 'The problem, and why AI fits it.' },
          { t: 'Your choices', d: 'The model and interaction choices you made, and why.' },
          { t: 'The prototype', d: 'A working prototype, not only screens.' },
          { t: 'Test results', d: 'What you tested and what you changed because of it.' },
          { t: 'Risks and oversight', d: 'The risks you found and where a human stays in control.' },
        ],
      },
      {
        id: 'avoid', kind: 'mistakes', kicker: '07 · What to avoid', title: 'What slows people down.',
        items: [
          'Optimising for tool count instead of judgment.',
          'Polished chat interfaces with no clear problem behind them.',
          'Happy path demos that leave out failure.',
          'Accuracy claims that were never evaluated.',
          'Automation with no user control.',
        ],
      },
      {
        id: 'check', kind: 'checklist', kicker: '08 · Self check', title: 'Are you ready to apply?',
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
        id: 'resources', kind: 'links', kicker: '09 · Further resources', title: 'Keep going.',
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
