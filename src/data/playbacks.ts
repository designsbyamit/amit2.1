// Playbacks: the one-minute version of each project.
// Rule: nothing here is stated that is not already on the site or was not said by Amit. Outcomes are the team's.
// `featured` decides which projects appear in the home page carousel; every project appears on Works.

export type BeatKey = 'about' | 'challenge' | 'users' | 'solution' | 'decision' | 'impact'

/** A picture inside a beat: an image file, or one of the diagrams already drawn for the detailed case study. */
export type Visual =
  | { src: string; alt: string; caption: string; ratio: string; narrow?: boolean }
  | { embed: 'search-workstreams' | 'search-anatomy' | 'search-summary' | 'cds-pipeline' | 'collections-steps' | 'agentic-gates'; caption: string }

export interface Playback {
  id: string
  /** Impact-led headline, written like a news story. */
  headline: string
  /** One or two sentences for cards. */
  dek: string
  /** A second line about the role, from what the case study already says. */
  roleNote: string
  /** How I led it. Only set where a larger design team was led; leave out for solo or small-pod work. */
  led?: string
  beats: {
    about?: string; challenge: string; users: string; solution: string; impact?: string
    /** Optional: the challenge as a short list, followed by `challengeNote`. */
    challengePoints?: string[]; challengeNote?: string
    /** Optional: the personas, shown as chips above the sentence in `users`. */
    personas?: string[]
  }
  /** The order the beats are told in. Leave a beat out to drop it. Default: about, challenge, users, solution, decision, impact. */
  order?: BeatKey[]
  /** Optional beat labels, where the default does not fit the story. */
  labels?: Partial<Record<BeatKey, string>>
  /** Two or three pictures from the detailed case study, placed inside the beats they explain. Gated cases only use redrawn, fictional material. */
  visuals?: Partial<Record<BeatKey, Visual[]>>
  /** Optional: the end-to-end process, shown as a flow after the solution. */
  flow?: { title: string; text: string; by: 'Agent' | 'People' | 'Agent + people' }[]
  /** One design decision worth telling. */
  decision?: { heading: string; body: string }
  /** Optional: leave out where the figure is scale, not impact. */
  metric?: { value: string; label: string }
  featured: boolean
}

const B = import.meta.env.BASE_URL
const S = (n: string) => `${B}images/short/${n}.webp`
const C = (n: string) => `${B}images/case-studies/${n}`

export const playbacks: Playback[] = [
  {
    id: 'sap-agentic',
    headline: 'From inbox to approval, automating the legwork',
    dek: 'An agent reads every supplier confirmation and finds the differences. People make the decisions that matter.',
    roleNote: 'I framed it as a design pattern and led the agent, the human-in-the-loop model and the architecture.',
    beats: {
      about: 'The opportunity was to design an agentic experience for procurement. The agent ingests many documents, including supplier order confirmations and RFQ responses, and compares them against purchase orders. Procurement specialists and operations teams then validate the discrepancies, approve outcomes and make the decisions.',
      challenge: 'The process behind one order confirmation has many moving parts:',
      challengePoints: [
        'Multiple documents in different formats and languages.',
        'Matching supplier order confirmations against purchase orders.',
        'Identifying and validating discrepancies.',
        'Coordinating approvals across multiple stakeholders.',
        'Simplifying and accelerating the overall process.',
      ],
      challengeNote: 'The central design challenge was to understand the entire procurement ecosystem first, then translate that complexity into one coherent agentic experience.',
      users: 'The buyer initiates the purchase order, operations validates the confirmation and its discrepancies, and the goods recipient supports the final fulfilment.',
      personas: ['Operations executive', 'Buyer or procurement manager', 'Goods recipient'],
      solution: 'The agent extracts and compares information, while people validate and make decisions. Every difference carries its reasoning, and every step is logged.',
      impact: 'A complete path from the supplier’s email to approve and close, across 33 screens. Co-created with customers as a white-labelled solution across supply chain management.',
    },
    labels: { impact: 'The outcome' },
    visuals: {
      decision: [{ embed: 'agentic-gates', caption: 'Gate 2 of three. Differences in cost and logistics go to the buyer, quantity and dates to the goods recipient. Only a person can accept or reject.' }],
    },
    flow: [
      { title: 'Document ingestion', text: 'Supplier order confirmations, RFQ responses, purchase orders and other documents arrive in many formats and languages.', by: 'Agent' },
      { title: 'Extraction, parsing and mapping', text: 'The agent extracts the relevant data and attributes from every document and maps them to the order.', by: 'Agent' },
      { title: 'Comparison and validation', text: 'Extracted information is compared against the purchase order. Discrepancies are identified and validated.', by: 'Agent' },
      { title: 'Decision support', text: 'Results are presented clearly: pricing, terms, delivery, logistics and other attributes, each with its reasoning.', by: 'Agent' },
      { title: 'Human decision-making', text: 'Results are routed to the right stakeholders to approve, escalate or ask for clarification.', by: 'People' },
      { title: 'Communication and closure', text: 'Decisions and actions go back to the relevant parties, and the process is closed.', by: 'Agent + people' },
    ],
    decision: { heading: 'In autonomous systems, what the agent doesn’t show matters as much as what it does', body: 'The instinct in agentic AI design is to surface everything: every step, every inference, every confidence score. But information overload defeats the purpose of automation. The principle we settled on: show the outcome, surface the reasoning only when it matters, and always preserve the human’s ability to intervene. Trust is designed, not assumed.' },
    featured: true,
  },
  {
    id: 'engaze',
    headline: 'An HR suite where the conversation is the product',
    dek: 'Making HR conversations the starting point for an autonomous HCM experience.',
    led: 'I led a design team of 5 to 6, inside a larger team where the rest of the people came from other disciplines.',
    roleNote: 'The team researched conversation design in depth, including how to build a persona that keeps one consistent conversation pattern.',
    beats: {
      challenge: 'HCM suites are built for administrators and sold as separate modules. Five roles, from a new joiner to a chief people officer, each start their day in a different place. The brief was to improve the experience of every role.',
      users: 'Five roles: employee, manager, recruiter, HR and leadership. The module that shipped was designed around three archetypes, Navin the new joiner, Esha the experienced employee and Manoj the manager, whose needs shaped what the companion had to do.',
      solution: 'Five principles instead of flows, proven in the employee-experience module, then extended across the suite as one companion, one trust model and one people graph.',
      impact: 'The employee-experience module shipped at 90% CSAT and was the most praised HR AI product at the client.',
    },
    order: ['challenge', 'users', 'decision', 'solution', 'impact'],
    visuals: {
      challenge: [{ src: C('engaze-hcm/hcm-map.webp'), alt: 'Suite scope across Attract, Join, Work, Grow, Reward and Understand', ratio: '2700 / 960', caption: 'The suite vision: the whole employee lifecycle, in one product.' }],
      users: [{ src: S('engaze-archetypes'), alt: 'Three archetypes: Navin the new joiner, Esha the experienced employee and Manoj the manager', ratio: '2000 / 1410', caption: 'The three archetypes, with their needs and primary tasks.' }],
      solution: [{ src: S('engaze-portal'), alt: 'The companion beside the employee’s workplace portal, on a tablet', ratio: '2000 / 1505', caption: 'The module that shipped: the companion sits beside the portal people already use, one tap away.' }],
    },
    metric: { value: '90%', label: 'CSAT in the employee-experience module' },
    decision: { heading: 'Why we stopped designing flows and started designing principles', body: 'In conversational AI, dialog flows only cover the happy path. The generative layer handles everything else. We recognised early that writing more flows was the wrong answer: instead, we defined five principles (trust, guidance, discoverability, cognitive simplicity, continuity) that taught the system how to behave in any situation. Those five principles outlasted every screen we designed.' },
    featured: true,
  },
  {
    id: 'airline-app',
    headline: 'Redesigning the trip, not the booking flow',
    dek: 'One connected journey across channels for a carrier serving 30M+ guests a year, with engagement up 92%.',
    led: 'I led experience strategy across 11+ designers, organised in pods that each owned a journey.',
    roleNote: 'I led experience strategy across 11+ designers, and the whole mobile experience with an 8-9 person team for almost a year.',
    beats: {
      challenge: 'Functional teams each built on their own, and the result was an incoherent whole: the homepage alone had 183 issues, 21 of them major. The business goal was to grow digital bookings from a $2M channel to $100M.',
      users: 'Travellers of a carrier with 95+ destinations. The friction that mattered most was physical before it was digital, so research was done in airport lounges.',
      solution: 'Five journeys redesigned, from plan and book to manage and check in, each owned end to end by one pod of design, product and engineering.',
      impact: 'Engagement up 92%, add-on sales up 50×, and check-in cut from 9 steps to 2. The pod model became the standard for large design programmes at Accenture ME.',
    },
    order: ['challenge', 'users', 'decision', 'solution', 'impact'],
    visuals: {
      challenge: [{ src: C('airline/airline-03.webp'), alt: 'Homepage audit showing 183 issues and a benchmark of 54 competitors', ratio: '871 / 855', caption: 'The homepage audit: 183 issues, benchmarked against 54 competitors.', narrow: true }],
      decision: [{ src: C('airline/airline-04.webp'), alt: 'Modular collaboration model: five journey pods, each with design, product and engineering, surrounded by client stakeholders, legal and marketing', ratio: '2116 / 1098', caption: 'Five journey pods, each with design, product and engineering.' }],
      solution: [{ src: C('airline/airline-13.webp'), alt: 'Booking flow screens: where to, flight search, dates, passengers, fares, seats and extras', ratio: '2200 / 1530', caption: 'Plan and book: search, dates, passengers, fares, seats and extras.' }],
    },
    metric: { value: '50×', label: 'Increase in add-on sales' },
    decision: { heading: 'The booking app was not the product. The passenger journey was.', body: 'When a business wants to grow digital revenue 50-fold, every stakeholder sees a booking flow problem. Reframing it as a service ecosystem problem changed what we built. The pod structure that delivered the work was itself a design decision: when designers own journeys instead of features, they design for coherence rather than correctness.' },
    featured: false,
  },
  {
    id: 'dnetworx',
    headline: 'Three-team handoffs, turned into one self-serve flow',
    dek: 'Self-serve network management that saved $5M, as reported by the client.',
    led: 'I led a design team of mostly 5 to 6, working as one team with engineering and product partners.',
    roleNote: 'A massive project on complex technology, where what the platform changes lands on the customer’s own infrastructure.',
    beats: {
      challenge: 'Every network change for 70,000+ enterprise customers needed multi-team handoffs, at a cost of $5M in overhead. And every change lands on live infrastructure that must stay up around the clock.',
      users: 'Expert operations users who had adapted to years of dysfunction, and the enterprise customers they serve. Four weeks of deep-dive discovery came first.',
      solution: 'Progressive disclosure as the core principle: show less by default without removing anything. Weekly sprints, each dedicated to one module, with reviews where stakeholders saw decisions being made.',
      impact: '$5M saved, a figure reported by the client. Changes that needed three-team handoffs are now done in a single self-serve flow, and in the two months after release, site activations through the platform rose from 39.9% to 61.3%.',
    },
    order: ['challenge', 'users', 'decision', 'solution', 'impact'],
    visuals: {
      users: [{ src: S('dnm-story'), alt: 'Storyboard: Tim, a network engineer, cannot find where to activate his circuits and depends on expensive support', ratio: '2000 / 1995', caption: 'Tim’s story: lost on where to activate his circuits, and dependent on support that is slow and expensive.', narrow: true }],
      decision: [{ src: S('dnm-options'), alt: 'Placements explored for the network functions, with an evaluation chart and the recommended plan', ratio: '1280 / 662', caption: 'The placements explored, the evaluation and the recommended plan.' }],
      solution: [{ src: S('dnm-final'), alt: 'The redesigned experience on desktop', ratio: '2000 / 1212', caption: 'The functions live in the navigation people already use.' }],
    },
    metric: { value: '$5M', label: 'Saved, as reported by the client' },
    decision: { heading: 'Seven places the functions could live. One kept.', body: 'New users had to find the network functions without expert users being slowed down. We explored seven placements, from a sticky button to a floating info button, and judged each against the same three questions: is it easy to find, does it stay out of the way of experts, does it match patterns people already use. Six were set aside, mostly for breaking an established pattern. The one kept was the navigation people already knew, redesigned, so existing users had nothing new to learn.' },
    featured: false,
  },
  {
    id: 'sap-search',
    headline: 'Search that talks back and gets things done',
    dek: 'One search across the suite that answers in plain language, shows its sources and opens the work that follows.',
    led: 'I led eight designers in three groups, alongside engineering and product.',
    roleNote: 'Design Lead for the search vision and its three workstreams.',
    beats: {
      challenge: 'Every product had its own search box, with its own vocabulary and its own rules. A question that crossed products, such as a trip, a supplier or a contract, had no single place to start.',
      users: 'Line of business stakeholders shaped the vision, and the people who search across the suite every day shaped the patterns. We listened first, then wrote the vision and its principles before drawing a screen.',
      solution: 'Eight designers in three workstreams, each owning one stretch of the journey rather than one product, because the seams were exactly where search needed to feel like one thing. The work became ten capabilities and one results page every product can apply the same way.',
      impact: 'A direction tested and validated, ten capability recommendations, a pattern library, and a live prototype built with UI5 Web Components covering six journeys.',
    },
    order: ['challenge', 'users', 'solution', 'decision', 'impact'],
    labels: { impact: 'Where it stands' },
    visuals: {
      solution: [
        { embed: 'search-workstreams', caption: 'Three workstreams along one journey.' },
        { embed: 'search-anatomy', caption: 'One results page for every product, redrawn from the design with fictional data.' },
      ],
      decision: [{ embed: 'search-summary', caption: 'Try it: open the summary, then select a link icon next to an insight. Sample data.' }],
    },
    decision: { heading: 'An AI answer is only useful if you can check it', body: 'The AI summary is collapsed by default, so the results stay in view. Every insight carries a link to the results that produced it. We explored two ways to show them: a reference panel beside the summary, and pulling the source results to the top of the list.' },
    featured: true,
  },
  {
    id: 'sap-collections',
    headline: 'Overdue invoices, managed by agents and led by humans',
    dek: 'Multi-agentic orchestrations for overdue invoices across 140 countries.',
    led: 'I led the design, together with product and engineering.',
    roleNote: 'Design Lead. Four rounds of discovery with three roles.',
    beats: {
      challenge: 'Collectors think in customers. The system thinks in Company Codes. Most of a collector’s time went into rebuilding context from the ERP, email and spreadsheets rather than deciding, and contacting a customer twice damaged the relationship.',
      users: 'Three roles, met over four rounds of discovery: stakeholder alignment, collector interviews, administrator and manager sessions, then synthesis and playback.',
      personas: ['Collection specialist', 'Customer administrator', 'Collections manager who also collects'],
      solution: 'A worklist ordered by a priority that explains itself and is marked as AI output, and a Customer 360 that opens with a summary and a Next Best Action grounded in open items. All of it inside Fiori, whose patterns were fixed points.',
      impact: 'Phases 1 and 2 are live with the customer. A baseline is set for the outcome measures, such as DSO, overdue exposure and dispute cycle time. No result is reported yet.',
    },
    order: ['challenge', 'users', 'solution', 'decision', 'impact'],
    labels: { impact: 'Where it stands' },
    visuals: {
      solution: [
        { src: C('sap-collections/worklist-v2.webp'), alt: 'My Collection Worklist with priority, amounts and a recommended action per customer', ratio: '1800 / 909', caption: 'The worklist, shown with fictional names and data. Priority and predicted arrear days carry the AI icon.' },
        { embed: 'collections-steps', caption: 'Reading and preparing can run on their own. Anything that contacts a customer or changes a financial record needs a person.' },
      ],
      decision: [{ src: C('sap-collections/email-v2.webp'), alt: 'An email drafted by the agent, with credit notes attached, waiting for a person to send it', ratio: '1800 / 909', caption: 'The draft waits for a person. Nothing is sent until they approve it.' }],
    },
    decision: { heading: 'The recommendation comes before the draft', body: 'The agent could write the email straight away. Instead, it shows the reason and the recommended action first, so a person approves the intent before any text exists. The draft is written after approval, from fresh data, and nothing is sent until a person sends it. It costs one extra step on routine follow ups, and that step is where trust is built.' },
    featured: false,
  },
  {
    id: 'sap-compositional',
    headline: 'Giving AI a design language, with a check at every step',
    dek: 'A point of view on compositional design systems: how AI can create experiences inside a design language the organisation defines.',
    roleNote: 'Research and point of view. Status: working hypothesis.',
    beats: {
      challenge: 'Generative interfaces jump from a prompt to arbitrary UI, with nothing to inspect on the way. Most of the confusion comes from collapsing five different things into one AI layer: the LLM, the design language, composition, the reasoning about the experience, and the guardrails.',
      users: 'Designers and product teams who will work alongside AI. Their work moves from designing screens to defining the space around them: the language, rules and boundaries inside which AI creates.',
      solution: 'Seven steps from human intent to a validated, rendered experience. A reasoning model (EOM) that turns a business situation into experience direction. And eight deliverables, one per stage, assembled in a vertical slice lab into one flow from prompt to outcome.',
      impact: 'The thesis and model are written and published as a 17 page internal research site. EOM and IXO are a working hypothesis, meant to be tested.',
    },
    order: ['challenge', 'decision', 'solution', 'users', 'impact'],
    labels: { impact: 'Where it stands' },
    visuals: {
      decision: [{ embed: 'cds-pipeline', caption: 'From intent to interface, with a validation gate before anything renders.' }],
      solution: [{ src: S('cds-ixo'), alt: 'The request “Help me understand why attrition is rising” moving through the LLM, IXO, CDS and guardrails layers', ratio: '1933 / 1027', caption: 'One request, four layers. Each does only its own job, and the result is checked against the intent.' }],
    },
    decision: { heading: 'Keep the five apart', body: 'The first design decision was separation. The LLM understands and plans. The design system provides the language. Composition decides the experience. Guardrails decide what may be shown. Kept apart, every step from intent to interface can be inspected before anything renders.' },
    featured: false,
  },
  {
    id: 'sap-signin',
    headline: 'Crafting a unified sign-in, consistent across 1,500+ apps',
    dek: 'One standard for the first screen of 1,500+ apps: three flows, one card, and recovery that never needs a ticket.',
    roleNote: 'I led it from the first stakeholder conversations, through research scoping, to defining the scope. Guidelines and five interactive prototypes.',
    beats: {
      challenge: 'An audit of eight products showed the first screen of every product looked different:',
      challengePoints: [
        'Modal in some products, full page in others.',
        'Technical fields such as system, client and language shown up front.',
        'Password toggles, “Forgot password”, “Stay signed in” and help links missing in most.',
        'Privacy and terms links missing from most pages.',
      ],
      challengeNote: 'The hardest part was scope. Every product line had its own identity set up, so the standard had to cover the experience, not the identity plumbing.',
      users: 'People who move between products and meet a different sign-in each time, and the product teams who build the entry. We interviewed product owners, designers and the identity platform team.',
      solution: 'Three flows (direct, progressive and context first), one card anatomy, and recovery that starts from one link and stays inside the same card. Written so a product team can build from it without asking, and tested in four themes at WCAG 2.1 AA.',
      impact: 'Guidelines ready for implementation, and five interactive prototypes, one per scenario, with recovery and sign out.',
    },
    order: ['challenge', 'users', 'solution', 'decision', 'impact'],
    labels: { impact: 'Where it stands' },
    visuals: {
      solution: [{ src: S('signin-flow'), alt: 'Three sign-in cards: identity first, then the password for that account, then signed in', ratio: '2184 / 833', caption: 'Identity first, then the right method for that account, then signed in. The same card in every product.' }],
      decision: [{ src: S('signin-error'), alt: 'A sign-in card with an error banner above the password field and the email kept', ratio: '760 / 833', caption: 'An account error: a banner at the top, and the email stays put.', narrow: true }],
    },
    decision: { heading: 'Two kinds of error, two places, and no blame', body: 'For security, error messages cannot say whether the username or the password was wrong. We made them useful anyway. A field error sits under its field. An account error is a banner at the top, and the fields stay filled so nobody retypes. The words say what happened and what to do next, without blame. Never “Wrong password”.' },
    featured: false,
  },
  {
    id: 'data-ai',
    headline: 'Making data governance something leaders can act on',
    dek: 'A governance marketplace that non-technical people could find, trust and use, with 76% adoption.',
    roleNote: 'I led the redesign of the Collibra data-governance experience and defined the NCPI heuristic evaluation framework.',
    beats: {
      challenge: 'The platform had grown through acquisition and engineering decisions, not design intent. The audit found information overload without hierarchy, no summary layer for executives, inconsistent patterns across modules and missing trust signals for data quality.',
      users: 'Executives and non-technical users who needed to find and trust data assets.',
      solution: 'A structured UX audit with a custom heuristic framework that gave stakeholders a shared vocabulary for quality, a design roadmap, and co-design with product, data and business teams.',
      impact: '76% adoption of the governance marketplace. The scorecard became a reference for how governance health is presented to enterprise clients.',
    },
    order: ['challenge', 'users', 'solution', 'decision', 'impact'],
    visuals: {
      solution: [{ src: S('data-map'), alt: 'Key developments across the data governance practice', ratio: '2000 / 735', caption: 'Key developments across the data governance practice.' }],
      challenge: [{ src: S('data-audit'), alt: 'The UX audit of the data-governance tools', ratio: '1710 / 1497', caption: 'The UX audit, run with the NCPI heuristic framework. Each finding was mapped to a business impact score.', narrow: true }],
      decision: [{ src: S('data-scorecard'), alt: 'A governance dashboard with health signals', ratio: '2000 / 1500', caption: 'Governance health signals, readable at executive level, with drill-down available.' }],
    },
    metric: { value: '76%', label: 'Governance marketplace adoption' },
    decision: { heading: 'Governance is a trust problem, not an information problem', body: 'Executives did not need more data. They needed confidence signals that let them act. So the scorecard leads with one governance health signal, designed for the chief data officer’s review rather than the data steward’s daily workflow, with the detail one drill-down away.' },
    featured: false,
  },
]

export const playbackById = (id: string) => playbacks.find(p => p.id === id)
