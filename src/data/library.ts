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
    summary: 'A practical map of what to learn, what to practise and how to show it, with a tool stack by job and a ninety day plan.',
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
        'You do not need a new job title, a machine learning degree or a long list of tools. You need three things.',
        'Understand the material: how AI products behave, where they fail and why. Practise on real behaviours, not only on screens. Then prove it with a small set of work that shows your judgment.',
        'The rest of this playbook is how to do each of those, in the order that works.',
      ],
    },
    sections: [
      {
        id: 'job', kind: 'points', kicker: '01 · The job', title: 'What an AI designer actually does.',
        lead: 'Most of the work is not making screens look intelligent. It is deciding how a system that gives different answers each time should behave, and making that behaviour understandable and safe for people.',
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
        lead: 'Aim for the understanding a good collaborator needs, not an engineer’s depth. If you can explain these to a product manager without notes, you are in good shape.',
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
        id: 'practise', kind: 'drills', kicker: '04 · Practise', title: 'Six drills that build the right muscle.',
        lead: 'Each drill takes a few hours and leaves you with something you can show. Do them in order, or pick the one that matches the gap you feel.',
        drills: [
          { t: 'Add AI to a product you know', d: 'Choose an app you use daily. Propose one AI feature, say what the system does and does not do, and describe what happens when it is wrong.', output: 'A one page behaviour brief.' },
          { t: 'Design the uncertainty', d: 'Take a single AI answer and design five states: confident, unsure, wrong, slow and refused. Decide what the person sees and can do in each.', output: 'Five annotated screens.' },
          { t: 'Map an agent with approvals', d: 'Pick a task such as booking travel or reconciling expenses. Break it into steps, mark what the agent does alone, where it asks and where it stops.', output: 'A flow with approval points.' },
          { t: 'Write a quality rubric', d: 'Collect twenty outputs from any AI tool for the same task. Write four criteria, score each output, and note what you would change in the prompt or the design.', output: 'A scored sheet and a short note.' },
          { t: 'Put a live model behind a prototype', d: 'Build a rough working version of drill one using a prompt playground or an AI coding tool. Test it with three people and write down what surprised you.', output: 'A running prototype and notes.' },
          { t: 'Critique three shipped products', d: 'Pick three AI products. For each, describe the behaviour, one thing it does well, one thing that would confuse a new user and how you would fix it.', output: 'A short written teardown.' },
        ],
        link: { label: 'Practise with the Toolkits', to: '/learn/practice' },
      },
      {
        id: 'stack', kind: 'stack', kicker: '05 · The tool stack', title: 'Tools, grouped by the job they do.',
        lead: 'Tools change every few months, so learn the job each one does and keep one per job. You do not need all of these.',
        reviewed: 'November 2026',
        groups: [
          { job: 'Think and research', why: 'Summarise sources, prepare interview guides, challenge your reasoning and draft first versions.', tools: ['Claude', 'ChatGPT', 'Gemini', 'Perplexity'], tip: 'Use one assistant daily so you learn its habits and limits.' },
          { job: 'Design and prototype', why: 'Explore layouts and interaction, then make flows people can click.', tools: ['Figma', 'Figma Make', 'Framer'], tip: 'Keep your design files as the source of truth for structure and states.' },
          { job: 'Build with a live model', why: 'Feel how a feature behaves with real outputs, errors and delays.', tools: ['Claude Code', 'Cursor', 'v0', 'Lovable', 'Bolt'], tip: 'Rough and working beats polished and static.' },
          { job: 'Test prompts and behaviour', why: 'Write, compare and tune instructions, and see how a model responds to edge cases.', tools: ['Anthropic Console', 'OpenAI Playground', 'Google AI Studio'], tip: 'Save your test inputs so you can rerun them after each change.' },
          { job: 'Evaluate quality', why: 'Score outputs against a rubric and compare versions over time.', tools: ['A spreadsheet', 'Notion or a doc'], tip: 'Start with a sheet. Dedicated evaluation tools matter once you have a test set worth keeping.' },
          { job: 'Show and share', why: 'Publish your work where a hiring manager can open it in one click.', tools: ['A portfolio site', 'GitHub', 'Vercel', 'Loom'], tip: 'A short walkthrough video makes a prototype easy to review.' },
        ],
      },
      {
        id: 'prove', kind: 'points', kicker: '06 · Show it', title: 'How to demonstrate capability.',
        lead: 'A hiring manager wants evidence that you can think about behaviour, not only visuals. Three pieces are enough.',
        points: [
          { t: 'One deep case study', d: 'An AI feature from problem to outcome. Include the behaviour you defined, the failure states, how you evaluated quality and what changed after testing.' },
          { t: 'One thing that runs', d: 'A working prototype with a live model, plus a short video. It shows you can make and test, not only describe.' },
          { t: 'One piece of thinking', d: 'A teardown or a short article about an AI product. It shows how you reason, and it gives people something to share.' },
          { t: 'A clear story about you', d: 'Say in two sentences what you design, for whom and what you are curious about next. The portfolio guide shows how to build this.' },
        ],
      },
      {
        id: 'plan', kind: 'plan', kicker: '07 · A ninety day plan', title: 'Learn, practise, prove.',
        lead: 'About five hours a week is enough. Adjust the pace, keep the order.',
        phases: [
          { when: 'Days 1 to 30', name: 'Learn', steps: ['Use one AI assistant every day and keep notes on where it surprises or fails you.', 'Read about how models work until you can explain prompts, context and hallucination simply.', 'Teardown three shipped AI products using drill six.', 'List the gaps you feel most. Choose two drills to start with.'], output: 'Three teardowns and a short gap list.' },
          { when: 'Days 31 to 60', name: 'Practise', steps: ['Do drills one to four and keep every output.', 'Build a rough live prototype with drill five.', 'Show your work to two people and ask what was unclear.', 'Revise once, then stop polishing.'], output: 'A behaviour brief, five states, an agent flow, a rubric and a prototype.' },
          { when: 'Days 61 to 90', name: 'Prove', steps: ['Turn your strongest drill into a case study with failure states and evaluation.', 'Record a two minute walkthrough of the prototype.', 'Publish both, write the two sentence story about you, and ask for a review.', 'Apply, or put the work in front of your own team.'], output: 'A case study, a prototype with a video and a clear story.' },
        ],
      },
      {
        id: 'interview', kind: 'questions', kicker: '08 · Be ready', title: 'Questions you should expect.',
        lead: 'There is no script, but strong answers share a shape: a specific example, a decision, a tradeoff and a result.',
        questions: [
          { q: 'How would you design a feature when the output can be wrong?', good: 'Names the cost of being wrong, shows how the person can notice and fix it, and says how you would measure it.' },
          { q: 'When should a system act on its own and when should it ask?', good: 'Ties the answer to risk and reversibility, not to a general feeling about autonomy.' },
          { q: 'How do you know the AI feature is good?', good: 'Describes a test set, a rubric and how reviews feed back into design and prompts.' },
          { q: 'What would you not use AI for?', good: 'Gives a real example and a reason, which shows judgment more than enthusiasm does.' },
          { q: 'How do you work with engineers on model behaviour?', good: 'Mentions reading outputs together, sharing test cases and agreeing on a quality bar early.' },
          { q: 'Which AI tools do you use, and why?', good: 'Explains the job each tool does in your process and where it let you down.' },
        ],
      },
      {
        id: 'mistakes', kind: 'mistakes', kicker: '09 · Common mistakes', title: 'What slows people down.',
        items: [
          'Treating AI design as a visual style, with sparkle icons and chat bubbles but no defined behaviour.',
          'Chasing every new tool instead of deepening one process.',
          'Showing only the happy path and leaving out failure states.',
          'Skipping evaluation, so there is no evidence the design works.',
          'Waiting to feel ready. Ship a small piece of work and let feedback do the teaching.',
          'Claiming AI skills in a portfolio without a project that shows them.',
        ],
      },
      {
        id: 'check', kind: 'checklist', kicker: '10 · Self check', title: 'Are you ready to apply?',
        lead: 'Tick what is true today. The unchecked items are your next steps.',
        items: [
          'I can explain how a language model produces an answer, in two minutes, without jargon.',
          'I can name the main AI interaction patterns and one risk of each.',
          'I have designed at least one AI feature, including what happens when it fails.',
          'I have written a quality rubric and used it to review real outputs.',
          'I have a working prototype with a live model that someone else has tried.',
          'My portfolio shows one deep AI case study, not only visuals.',
          'I can describe the role of trust, control and oversight in my own work.',
          'I use at least one AI tool in my process and can say where it falls short.',
          'I can tell a two sentence story about what I design and why.',
          'I have shown my work to someone and changed it because of their feedback.',
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
