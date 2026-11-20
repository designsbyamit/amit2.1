// Short stories, v2 (Nov 2026). Each one argues a single highlight.
// First screen: headline, one supporting line, one still. Then 4 to 6 beats, each about one screen tall:
// a large statement, a short body, one visual. The nuance beat is set largest. Then an honest ending.
// Content approved in docs/short-stories-v2-outlines.md. Every line is in Amit's voice and needs his read.

/** Visuals are named here and drawn in components/story. */
export type StoryVisual =
  | { kind: 'embed'; name: 'search-global' | 'search-summary' | 'search-fragmented' | 'agentic-gates'; caption?: string }
  | { kind: 'image'; src: string; alt: string; ratio: string; caption?: string }
  | { kind: 'diagram'; name: string; caption?: string }

export interface Beat {
  statement: string
  body: string
  visual: StoryVisual
  /** The nuance beat, set largest. */
  nuance?: boolean
  /** A short note set under the visual, for honesty about what is shown. */
  note?: string
  /** Search only: where the beat sits between keywords (0) and conversation (1). */
  spectrum?: number
  /** A link shown under the body. */
  link?: { label: string; to: string }
}

export interface Story {
  id: string
  /** What the story argues, for reference only. */
  highlight: string
  headline: string
  line: string
  still: { src?: string; diagram?: string; alt: string }
  beats: Beat[]
  ending: {
    label: string
    stands: string
    delivered?: string
    role: string
  }
}

export const stories: Story[] = [
  {
    id: 'sap-agentic',
    highlight: 'How to build an agentic solution that is genuinely meaningful.',
    headline: 'An agent is worth building only where judgement is needed.',
    line: 'How we decided what an agent should take on in supplier order confirmations, what it should never do, and where people stay in charge.',
    still: { src: '/images/covers/sap-agentic-1600.webp', alt: 'The order confirmation assistant: a buyer reviews the differences the agent found between a purchase order and a supplier confirmation.' },
    beats: [
      {
        statement: 'Confirming one order meant six hand-offs, three roles and no single record.',
        body: 'A supplier answers a purchase order with a PDF, in its own layout and often in German. Someone checks every price, term, quantity and date by eye, then chases the owner of each difference. Every hand-off adds waiting.',
        visual: { kind: 'diagram', name: 'agentic-asis' },
      },
      {
        statement: 'Most of the work needs no judgement. The decisions do.',
        body: 'Reading, extracting, comparing and drafting are work. Deciding whether net 45 days is acceptable, or whether 500 fewer units still cover the store, is judgement. The agent takes the work. People keep the judgement.',
        visual: { kind: 'diagram', name: 'agentic-split' },
      },
      {
        statement: 'Guided autonomy: the agent prepares, a person decides at three gates.',
        body: 'Validate, decide, send. One human-agent contract, written before any screen, sets the line. More autonomy is earned later, only where confidence is high and risk is low, inside policy.',
        visual: { kind: 'diagram', name: 'agentic-ladder' },
      },
      {
        statement: 'Not a parser. Not a recommender. The design is in how it reasons.',
        body: 'Parsers existed before. The hard part is judgement under uncertainty. The agent weighs three kinds of signal: how sure it is that it read the document, what actually differs, and what this supplier has done before. Uncertainty is itself a risk.',
        visual: { kind: 'diagram', name: 'agentic-signals' },
        nuance: true,
      },
      {
        statement: 'The same 10% is not the same risk.',
        body: 'Each field gets its own tolerance, set by what the difference does downstream. A 10% shortfall on a part with safety stock is an inconvenience. A 10% price rise on a high-value order is a financial problem. A wording change never raises risk.',
        visual: { kind: 'diagram', name: 'agentic-risk' },
        note: 'The logic I proposed, refined with product. Tolerances are levers, not fixed thresholds.',
      },
      {
        statement: 'Every recommendation stops at a person.',
        body: 'Operations confirms the agent read the document right. The buyer decides on cost, the goods recipient on quantity and dates. The buyer reviews the reply before it goes back. Only a person can accept or reject.',
        visual: { kind: 'embed', name: 'agentic-gates', caption: 'Gate 2 of three: the buyer and the goods recipient each decide on the differences they own.' },
      },
      {
        statement: 'What the design is built to give back.',
        body: 'Confirmation in hours, not weeks: a design aim, not a result yet. Beyond speed, six things change for the people doing the work.',
        visual: { kind: 'diagram', name: 'agentic-value' },
      },
    ],
    ending: {
      label: 'Where it stands',
      stands: 'In implementation with a customer. Its KPIs will be tracked once it runs in production.',
      role: 'I framed it as a design pattern and led the agent, the human-in-the-loop model and the risk logic.',
    },
  },

  {
    id: 'sap-search',
    highlight: 'The bridge from traditional search to a conversational experience.',
    headline: 'Between search and conversation, there is a bridge.',
    line: 'People who live with traditional search will not leap to a modern AI assistant overnight. Search can carry them most of the way.',
    still: { src: '/images/covers/sap-search-1600.webp', alt: 'Search in the shell bar, answering a question in a sentence with results from every application.' },
    beats: [
      {
        statement: 'Every application had its own search box.',
        body: 'Each with its own vocabulary and its own rules. A question that crossed applications, such as a trip, a supplier or a contract, had no place to start. People asked for plain language and got keywords.',
        visual: { kind: 'embed', name: 'search-fragmented' },
        spectrum: 0,
      },
      {
        statement: 'It is not keywords or conversation. It is not 0 or 1.',
        body: 'A modern AI assistant exists. But people on established systems still live with traditional search and its limits. Asking them to jump straight to a conversation is a leap. The way across is a middle ground.',
        visual: { kind: 'diagram', name: 'search-gap' },
        spectrum: 0.1,
      },
      {
        statement: 'Search becomes the middle ground.',
        body: 'One field in the shell bar of every application. Ask in a sentence, the way you would ask a colleague. Get results from every application and an answer that names its sources. Then act, right from search.',
        visual: { kind: 'embed', name: 'search-global' },
        nuance: true,
        spectrum: 0.5,
      },
      {
        statement: 'An AI answer is only useful if you can check it.',
        body: 'The summary stays collapsed, so the results stay in view. Every insight links to the results that produced it. That is what makes people willing to trust a sentence instead of a list.',
        visual: { kind: 'embed', name: 'search-summary' },
        spectrum: 0.56,
      },
      {
        statement: 'Search ends where the work begins.',
        body: 'Approve or reject a requisition right on the result row. Or open the application with the question and the choice carried across, so nobody has to guess where to go next.',
        visual: { kind: 'image', src: '/images/case-studies/sap-search/row-actions.webp', alt: 'A search result row for a requisition, with Approve and Reject on the row. After approving, it reads Approved.', ratio: '16 / 9' },
        spectrum: 0.62,
      },
      {
        statement: 'The next step is conversation.',
        body: 'One journey already shows the way: someone asks about the education policy, reads the results and wants to know more, and the result offers to continue in the AI assistant.',
        visual: { kind: 'diagram', name: 'search-handoff' },
        spectrum: 0.8,
      },
    ],
    ending: {
      label: 'Where it stands',
      stands: 'Built to carry people from search into conversation, one step at a time.',
      delivered: 'Delivered: a validated direction, ten capability recommendations, a pattern library and a live prototype covering six journeys.',
      role: 'Design Lead for the search vision. I led eight designers in three workstreams, alongside engineering and product.',
    },
  },

  {
    id: 'engaze',
    highlight: 'Conversational design as the core of an AI product, and assistants with the right personality and tone of voice.',
    headline: 'In an AI product, the conversation is the design.',
    line: 'How an HR assistant learned to read what people mean, behave well beyond the happy path, and sound like one character every time.',
    still: { src: '/images/covers/engaze-1600.webp', alt: 'The HR companion answering an employee in a chat beside the workplace portal.' },
    beats: [
      {
        statement: '“I need a sick leave for today.”',
        body: 'Esha types one sentence. She names no module, no leave type, no form. Everything the product does next starts from what she meant, not what she clicked.',
        visual: { kind: 'diagram', name: 'engaze-bubble' },
      },
      {
        statement: 'Behind one sentence, four things to work out.',
        body: 'That it is sick leave, and for today. How many days she has left. What the policy allows. Who needs to know. The companion works it out, then asks before it applies anything.',
        visual: { kind: 'diagram', name: 'engaze-intent' },
        nuance: true,
      },
      {
        statement: 'Not every question wants the same kind of answer.',
        body: '“My leave balance” wants a fact. “Apply for leave” wants an action. “Show my CTC breakup” wants a chart. “Write a feedback” wants a draft. “Old versus new tax regime for me” wants an analysis. Each got its own response pattern.',
        visual: { kind: 'diagram', name: 'engaze-queries' },
      },
      {
        statement: 'Flows cover the happy path. Principles cover the rest.',
        body: 'The generative layer handles everything a flow never wrote down. So we stopped writing more flows and wrote five principles that teach the system how to behave in any situation.',
        visual: { kind: 'diagram', name: 'engaze-principles' },
      },
      {
        statement: 'An assistant should sound like one character, from the first turn to the thousandth.',
        body: 'We built a way to give assistants the right personality. Choose two brand archetypes. Adopt the traits that come with them. Define the tone of voice. Capture it all in a persona template before writing any dialog.',
        visual: { kind: 'diagram', name: 'engaze-persona' },
        link: { label: 'See the persona template', to: '/craft/engaze/details#persona-template' },
      },
      {
        statement: 'One tap away, beside the portal people already use.',
        body: 'The employee module shipped as a companion inside the workplace portal, so nobody had to learn a new place to go. In usability testing, it scored 90% satisfaction.',
        visual: { kind: 'image', src: '/images/short/engaze-portal.webp', alt: 'The workplace portal with the HR companion open on the side.', ratio: '16 / 10' },
      },
    ],
    ending: {
      label: 'Where it stands',
      stands: 'The employee module shipped as a companion beside the portal people already use.',
      role: 'I led a design team of 5 to 6, inside a larger team where the rest of the people came from other disciplines.',
    },
  },

  {
    id: 'airline-app',
    highlight: 'Designing at scale.',
    headline: 'At this scale, keeping it one experience is the design problem.',
    line: 'A mobile app and responsive web for a carrier with 30M+ guests a year, with use cases across the whole trip, designed by many teams at once.',
    still: { diagram: 'travel-collage', alt: 'A collage of the app’s screens, light and dark: sign in, home, search, results, fares, seats, passenger details, add-ons, review and pay, confirmation and boarding pass.' },
    beats: [
      {
        statement: '30M+ guests a year. 95+ destinations. One experience in their pocket.',
        body: 'Part of a five-year digital transformation. The business goal was to grow digital bookings from a $2M channel into a $100M revenue stream. The guest and destination figures are public, for scale, not results of this work.',
        visual: { kind: 'diagram', name: 'travel-scale' },
      },
      {
        statement: 'A trip is not one flow. It is a hundred use cases, end to end.',
        body: 'Mixed cabins, an infant on a lap, multi-city trips, branded fares, a booking on hold, three passengers with missing passport details, a transit visa, a group check-in, a delay that needs rebooking. Each one had to feel like the same app.',
        visual: { kind: 'diagram', name: 'travel-trip' },
        nuance: true,
      },
      {
        statement: 'Built by function, it fell apart: 183 issues on one homepage.',
        body: 'Functional teams each built on their own, and the whole never added up. The homepage alone had 183 issues, 21 of them major, against a benchmark of 54 competitors. A service problem, not a UI problem.',
        visual: { kind: 'diagram', name: 'travel-audit' },
      },
      {
        statement: 'Five journeys, five pods, one design language.',
        body: 'Each pod owned one journey end to end, with design, product and engineering together. A design language of 400+ components kept web and app consistent across 6,000+ screens, while designers worked from eight cities in four time zones.',
        visual: { kind: 'diagram', name: 'travel-pods' },
      },
      {
        statement: 'Check-in, from nine steps to two.',
        body: 'Measured after release. Booking a flight in 4 minutes for returning customers. 30% less effort to choose a seat. An eVisa in 3 steps. App store rating up from about 3 to 4.7.',
        visual: { kind: 'diagram', name: 'travel-results' },
      },
    ],
    ending: {
      label: 'The result',
      stands: 'The programme met its goal of growing digital bookings from $2M to $100M, and the partnership continues. A programme result, delivered together with product, engineering and the client’s teams.',
      role: 'I led experience strategy across 11+ designers in five journey pods, and the whole mobile experience with an 8 to 9 person team for almost a year.',
    },
  },
]

export const storyById = (id: string) => stories.find(s => s.id === id)
