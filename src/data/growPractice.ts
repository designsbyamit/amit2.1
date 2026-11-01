// Grow · Practice Toolkits. A ladder for designing with AI:
// conversational interface, then conversational system, then agentic experience, then multi-agent orchestration.

export interface Approach { name: string; how: string; tradeoff: string }
export interface Challenge {
  id: string
  title: string
  level: 'Warm-up' | 'Core' | 'Stretch'
  minutes: number
  scenario: string
  task: string[]
  constraints: string[]
  reflect: string[]
  approaches: Approach[]
}
export interface ToolkitRef { title: string; note: string; to: string; external?: boolean }
export interface Topic { id: string; step: string; title: string; kicker: string; blurb: string; toolkits: ToolkitRef[]; challenges: Challenge[] }

const CX: ToolkitRef = { title: 'Conversation Experience Kit', note: '', to: '/resources/conversation-experience' }
const AIN: ToolkitRef = { title: 'AI-Native Frameworks', note: '', to: '/resources/ai-native-patterns' }
const AAI: ToolkitRef = { title: 'Agent-Agent Interaction (AAI) Toolkit', note: '', to: '/aai-toolkit/', external: true }

export const topics: Topic[] = [
  {
    id: 'interface', step: '01', title: 'Conversational AI interface', kicker: 'THE SURFACE',
    blurb: 'Start with the place where the person and the AI meet: the first message, the shape of a response, and what happens when it goes wrong.',
    toolkits: [
      { ...CX, note: 'Prompt & Response Systems, and Multi-Turn Flows, for the language and rhythm of the exchange.' },
    ],
    challenges: [
      {
        id: 'the-first-message', title: 'Design the first message', level: 'Warm-up', minutes: 25,
        scenario: 'An assistant helps employees with leave and payslip questions. Design the screen a person sees before they type anything.',
        task: ['Decide what the assistant says first, and what it does not say.', 'Design the way people discover what they can ask: suggestions, examples or something else.', 'Write the text for the empty input field.'],
        constraints: ['No more than three suggestions on screen.', 'It must be clear, in one glance, that this is an AI and what it can see.'],
        reflect: ['What did you assume the person already knows?', 'Which suggestion would the most people choose, and how would you find out?', 'What would make a returning user skip all of this?'],
        approaches: [
          { name: 'Suggested prompts', how: 'Offer a few tappable, real questions drawn from what people actually ask.', tradeoff: 'Teaches by example and cuts effort; can narrow how people think they may use it.' },
          { name: 'Capability statement', how: 'Say plainly what it can and cannot do, in one or two lines.', tradeoff: 'Sets honest expectations; plain statements are easy to skim past.' },
          { name: 'Context-aware nudge', how: 'Lead with something relevant to the person right now, such as a balance that is about to expire.', tradeoff: 'Feels helpful and personal; depends on data access and can feel intrusive.' },
        ],
      },
      {
        id: 'response-shape', title: 'Choose the shape of the answer', level: 'Core', minutes: 35,
        scenario: 'The same assistant gets three kinds of questions: “How many sick days do I have left?”, “Apply for leave tomorrow”, and “What is the policy on carrying leave forward?”',
        task: ['Design one response for each: informational, transactional and policy.', 'For each, decide what is shown as text, what as a card, and what as a button.', 'Design the response when the assistant is not sure.'],
        constraints: ['No answer may be a wall of text.', 'The transactional response must show what will happen before it happens.'],
        reflect: ['Which response were you tempted to answer with a paragraph, and why?', 'How does your uncertain response differ from a confident one?', 'What does the person do next in each case?'],
        approaches: [
          { name: 'Answer first, detail on demand', how: 'Give the short answer, and let the person expand the reasoning.', tradeoff: 'Fast to read; the detail can go unread when it matters.' },
          { name: 'Structured cards', how: 'Use a card for facts and actions, with prose only for explanation.', tradeoff: 'Scannable and actionable; costs more to design and build per response type.' },
          { name: 'Conversational prose', how: 'Reply in natural sentences, with the action inline.', tradeoff: 'Feels human; harder to scan and easy to ramble.' },
        ],
      },
      {
        id: 'repair', title: 'Repair the conversation', level: 'Stretch', minutes: 40,
        scenario: 'The person asks to “move my leave to next week”. The assistant has two leave requests and picks the wrong one.',
        task: ['Design what the person sees and can do the moment they realise it is wrong.', 'Design how the assistant asks for clarification when it should have asked first.', 'Design how the person undoes the change.'],
        constraints: ['Repair must take no more than two actions.', 'The assistant must not blame the person.'],
        reflect: ['How early could the system have known it was unsure?', 'What did you add to make undo feel safe?', 'When should the conversation hand over to a person?'],
        approaches: [
          { name: 'Confirm before acting', how: 'Restate what it understood and ask for a yes before changing anything.', tradeoff: 'Prevents mistakes; adds a step to every request.' },
          { name: 'Offer the options', how: 'Show the two possible requests and let the person pick.', tradeoff: 'Resolves ambiguity in one tap; only works when the options are few.' },
          { name: 'Act, then make undo obvious', how: 'Do it, show exactly what changed and give a visible undo.', tradeoff: 'Feels effortless; needs low stakes and a reliable undo.' },
        ],
      },
    ],
  },
  {
    id: 'system', step: '02', title: 'Conversational AI system', kicker: 'THE SYSTEM BEHIND THE CHAT',
    blurb: 'A good conversation is built on decisions you cannot see on screen: what the system understands, what it remembers and when it admits it does not know.',
    toolkits: [
      { ...CX, note: 'Intent Design, and Trust & Safety, for what the system understands and how it earns trust.' },
      { ...AIN, note: 'Context Engineering, for deciding what the AI needs to know to do its job.' },
    ],
    challenges: [
      {
        id: 'map-the-intents', title: 'Map the intents', level: 'Warm-up', minutes: 30,
        scenario: 'You are designing an HR assistant. You have collected eight things people typed into the old help desk.',
        task: ['Write eight realistic things people would say, in their own words and not yours.', 'Group them into the smallest sensible set of intents.', 'For each, note what the person says and what they actually mean.'],
        constraints: ['At least two utterances must be vague or incomplete.', 'Decide what is out of scope and what the assistant says for it.'],
        reflect: ['Where did what people say differ most from what they mean?', 'Which intent would you split in two, and why?', 'How would you find out what people really type?'],
        approaches: [
          { name: 'Task-led', how: 'Group by the job the person wants done, such as apply, check or change.', tradeoff: 'Clear and testable; hides questions that are really worries or complaints.' },
          { name: 'Topic-led', how: 'Group by subject, such as leave, pay or benefits.', tradeoff: 'Mirrors how content is organised; mixes very different tasks inside one topic.' },
          { name: 'Situation-led', how: 'Group by what is going on for the person, such as being unwell or travelling.', tradeoff: 'Human and context-rich; harder to define and to train.' },
        ],
      },
      {
        id: 'what-it-remembers', title: 'Decide what it remembers', level: 'Core', minutes: 35,
        scenario: 'The assistant can remember things within a conversation, across conversations, or not at all.',
        task: ['List what it should remember for the length of one conversation, for a week and for good.', 'Design how the person sees what is remembered and how they remove it.', 'Decide what happens when the memory is wrong.'],
        constraints: ['The person must be able to see and delete any memory.', 'Nothing sensitive may be remembered without being asked.'],
        reflect: ['What did you decide to forget on purpose?', 'How does remembering change what people dare to say?', 'Who owns the memory, the person or the company?'],
        approaches: [
          { name: 'Session only', how: 'Remember within a conversation and then let it go.', tradeoff: 'Safest and simplest; people repeat themselves every time.' },
          { name: 'Explicit memory', how: 'Remember only what the person chooses to save.', tradeoff: 'Builds trust and control; people rarely save anything.' },
          { name: 'Learned and visible', how: 'Learn from behaviour, and show a plain list of what it has learned.', tradeoff: 'Feels intelligent; needs strong controls and an honest explanation.' },
        ],
      },
      {
        id: 'trust-and-i-dont-know', title: 'Sources, confidence and “I don’t know”', level: 'Stretch', minutes: 45,
        scenario: 'The assistant answers policy questions from company documents. Sometimes the documents conflict or do not cover the question.',
        task: ['Design how an answer shows where it came from.', 'Design the “I don’t know” response and where it sends the person next.', 'Design what happens when two sources disagree.'],
        constraints: ['No confidence number unless you can say what it means for the person.', 'The “I don’t know” must be useful, not a dead end.'],
        reflect: ['How much of the source is enough to build trust without cluttering the answer?', 'When would you rather the assistant stayed silent?', 'How does the system learn from the cases it could not answer?'],
        approaches: [
          { name: 'Inline sources', how: 'Link each claim to the exact passage it came from.', tradeoff: 'Verifiable at a glance; adds visual weight to every answer.' },
          { name: 'Graded answers', how: 'Show a plain “sure”, “check this” or “not covered” state.', tradeoff: 'Easy to scan; the thresholds must be honest and tested.' },
          { name: 'Escalate to a person', how: 'When it is unsure, hand over with the context already written.', tradeoff: 'Protects the person; only works if a person is available to pick it up.' },
        ],
      },
    ],
  },
  {
    id: 'agentic', step: '03', title: 'Agentic experience', kicker: 'WHEN THE AI ACTS FOR YOU',
    blurb: 'When the AI does things, not only says things, the design question changes: what may it do, when does a person decide, and how do you stay in control?',
    toolkits: [
      { ...AIN, note: 'Agent Mission Blueprint and AI-native Experience Blueprint, for defining the agent and designing its experience.' },
    ],
    challenges: [
      {
        id: 'job-description', title: 'Write the agent’s job description', level: 'Warm-up', minutes: 25,
        scenario: 'An agent will read supplier order confirmations and compare them with purchase orders. Define it before you design any screen.',
        task: ['Write its job in one sentence.', 'List what it reads, what it does, what it never does and who it hands over to.', 'Write one sentence you would put on screen to describe it to a user.'],
        constraints: ['“Never” must have at least two items.', 'Every hand-over must name a person or a role.'],
        reflect: ['Which “never” was hardest to write?', 'What would go wrong if one of your “never” items were removed?', 'How would a new user learn this definition?'],
        approaches: [
          { name: 'Job, reads, does, never, hands over', how: 'A short, structured definition that every screen can follow.', tradeoff: 'Precise and reusable; needs a regular review as the agent grows.' },
          { name: 'Persona first', how: 'Describe the agent as a role with a manner, a scope and limits.', tradeoff: 'Easy to communicate; can overpromise human-like ability.' },
          { name: 'Boundaries first', how: 'Start with what the agent may never do and build outwards.', tradeoff: 'Very safe; can lead to an agent that does too little to be useful.' },
        ],
      },
      {
        id: 'autonomy-levels', title: 'Choose a level of autonomy', level: 'Core', minutes: 35,
        scenario: 'The same agent could just recommend, act on routine tasks and ask about exceptions, or act freely inside set limits. Assist, guided autonomy or bounded autonomy.',
        task: ['Pick a level for each of four tasks: reading, comparing, drafting and replying to a supplier.', 'Say what evidence would move each task up a level.', 'Design how a person sees which level the agent is working at.'],
        constraints: ['At least one task must stay with a person for good.', 'The level must be visible without opening a settings page.'],
        reflect: ['What made one task safe to hand over and another not?', 'Who decides when to move up a level?', 'How would you take autonomy back if it went wrong?'],
        approaches: [
          { name: 'Start low, widen with trust', how: 'Begin with recommendations and give more autonomy as results prove out.', tradeoff: 'Safe and credible; slower to show value.' },
          { name: 'Different levels per task', how: 'Match autonomy to the risk of each task, not to the agent as a whole.', tradeoff: 'Fits real risk; more to explain and to design.' },
          { name: 'Let the person set it', how: 'Give the person a dial for how much the agent may do.', tradeoff: 'Gives control; most people leave defaults, so the defaults carry the weight.' },
        ],
      },
      {
        id: 'the-human-gate', title: 'Design the human gate', level: 'Stretch', minutes: 45,
        scenario: 'An agent prepares decisions about supplier order confirmations. A person must decide at a few points, and you choose where.',
        task: ['Map the flow from document received to order closed and mark what the agent does.', 'Choose where a person decides and say why each gate exists.', 'Describe what the person sees at a gate so a decision takes seconds, not minutes.'],
        constraints: ['The agent may never accept or reject a deviation on its own.', 'Every gate must name its owner.'],
        reflect: ['Which gate could you later relax, and what would you need to see first?', 'What did you make the agent explain, and in what words?', 'Who is accountable when the agent is wrong?'],
        approaches: [
          { name: 'Few, heavy gates', how: 'Let the agent run until a clear decision point and ask for a considered yes or no.', tradeoff: 'Less interruption; each decision needs good context to be quick.' },
          { name: 'Many, light checks', how: 'Ask for quick confirmations along the way.', tradeoff: 'Safer early on; trains people to click through without reading.' },
          { name: 'Growing autonomy', how: 'Start with recommendations and widen what the agent may do as trust is earned.', tradeoff: 'A natural path to scale; needs clear limits written down at each level.' },
        ],
      },
    ],
  },
  {
    id: 'orchestration', step: '04', title: 'Multi-agent orchestration', kicker: 'MANY AGENTS, ONE OUTCOME',
    blurb: 'When several agents work together, the design is no longer one conversation. It is a system of roles, hand-offs and oversight that a person must still be able to understand.',
    toolkits: [
      { ...AAI, note: 'Guidelines, reusable interaction patterns, worksheets and a four-step playbook (context, assess, analyse, resolve) for how agents work with each other.' },
      { ...AIN, note: 'Agent Mission Blueprint, for giving each agent a clear job.' },
    ],
    challenges: [
      {
        id: 'map-the-agents', title: 'Map the agents', level: 'Warm-up', minutes: 30,
        scenario: 'A finance team wants to chase overdue invoices with agents. You can use several, each with its own job.',
        task: ['List the agents you would create and give each a one-line job.', 'Draw who talks to whom, and who talks to a person.', 'For each agent, write one thing it must never do.'],
        constraints: ['Fewer agents is better. Justify every one you add.', 'Every agent must have a clear owner who is a person.'],
        reflect: ['Which agent did you merge or remove, and why?', 'Where could two agents give the person conflicting advice?', 'Who is responsible when the outcome is wrong?'],
        approaches: [
          { name: 'One agent per task', how: 'Give each step in the process its own focused agent.', tradeoff: 'Simple to reason about and test; many hand-offs and more to coordinate.' },
          { name: 'One lead and specialists', how: 'A coordinator agent delegates to specialists and speaks to the person.', tradeoff: 'One voice for the user; the coordinator becomes a bottleneck and a single point of failure.' },
          { name: 'Peers that negotiate', how: 'Agents of equal standing work out the result between them.', tradeoff: 'Flexible and resilient; hard to predict, to explain and to audit.' },
        ],
      },
      {
        id: 'design-the-handoff', title: 'Design the hand-off', level: 'Core', minutes: 40,
        scenario: 'One agent has read an invoice dispute. It must pass the case to another agent that drafts the reply, and then to a person.',
        task: ['List exactly what travels with the hand-off: facts, reasoning, open questions.', 'Design what the receiving agent says back if the hand-off is incomplete.', 'Design what the person sees so they do not have to ask what happened before.'],
        constraints: ['No hand-off may lose the original request.', 'The person must be able to see the full chain in one view.'],
        reflect: ['What gets lost in every hand-off, and how would you notice?', 'Who is accountable at each step?', 'What would you log, and who would read it?'],
        approaches: [
          { name: 'Shared case file', how: 'All agents read and write one structured record of the case.', tradeoff: 'Nothing gets lost; the shared record needs strict rules about who may change what.' },
          { name: 'Summary hand-off', how: 'Each agent passes on a short summary and its recommendation.', tradeoff: 'Light and fast; summaries drop detail that the next step may need.' },
          { name: 'Contract between agents', how: 'Define what each agent promises to provide and what it expects to receive.', tradeoff: 'Clear and testable; takes upfront design and has to be maintained.' },
        ],
      },
      {
        id: 'the-conductor-view', title: 'Design the conductor’s view', level: 'Stretch', minutes: 50,
        scenario: 'A person supervises five agents working on dozens of cases at once. They need to know what is happening without reading every message.',
        task: ['Design the one screen they spend most of their time on.', 'Show what each agent is doing, what is stuck and what needs a person.', 'Design how they step in, redirect an agent or stop the whole system.'],
        constraints: ['A stuck or conflicting agent must be visible within seconds.', 'Stopping everything must be possible from the main screen.'],
        reflect: ['What did you choose not to show?', 'How does this view change as the number of agents doubles?', 'What would make the supervisor trust the system, and what would make them stop watching it?'],
        approaches: [
          { name: 'Exception-first queue', how: 'Show only what needs a person, ordered by risk.', tradeoff: 'Saves attention; hides healthy work, so trust has to be earned elsewhere.' },
          { name: 'Live map of agents', how: 'Show each agent and its current state, like an air-traffic view.', tradeoff: 'Gives a real sense of the system; becomes noisy as it scales.' },
          { name: 'Timeline of the case', how: 'Show one case from start to now, with each agent’s contribution.', tradeoff: 'Great for understanding and audit; weak as an overview of many cases.' },
        ],
      },
    ],
  },
]

export const findChallenge = (topicId?: string, id?: string) => {
  const topic = topics.find(t => t.id === topicId)
  const idx = topic ? topic.challenges.findIndex(c => c.id === id) : -1
  return topic && idx >= 0 ? { topic, challenge: topic.challenges[idx], index: idx } : null
}
export const totalChallenges = topics.reduce((a, t) => a + t.challenges.length, 0)
