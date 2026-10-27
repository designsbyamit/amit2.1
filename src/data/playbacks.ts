// Playbacks: the one-minute version of each project.
// Rule: nothing here is stated that is not already on the site or was not said by Amit. Outcomes are the team's.
// `featured` decides which projects appear in the home page carousel; every project appears on Works.

export interface Playback {
  id: string
  /** Impact-led headline, written like a news story. */
  headline: string
  /** One or two sentences for cards. */
  dek: string
  /** A second line about the role, from what the case study already says. */
  roleNote: string
  /** How I led it: the team and the cross-disciplinary partners. */
  led: string
  beats: {
    about: string; challenge: string; users: string; solution: string; impact: string
    /** Optional: the challenge as a short list, followed by `challengeNote`. */
    challengePoints?: string[]; challengeNote?: string
    /** Optional: the personas, shown as chips above the sentence in `users`. */
    personas?: string[]
  }
  /** Optional: the end-to-end process, shown as a flow between the solution and the impact. */
  flow?: { title: string; text: string; by: 'Agent' | 'People' | 'Agent + people' }[]
  metric: { value: string; label: string }
  featured: boolean
}

export const playbacks: Playback[] = [
  {
    id: 'sap-agentic',
    headline: 'Human-led agentic AI cuts order confirmation TAT from weeks to hours',
    dek: 'An agent extracts and compares, people validate and decide. Co-created with customers as a white-labelled solution across supply chain management.',
    led: 'I led a design team of 7 to 8, working alongside engineering, product, data science and accessibility, with customers co-creating the solution.',
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
    flow: [
      { title: 'Document ingestion', text: 'Supplier order confirmations, RFQ responses, purchase orders and other documents arrive in many formats and languages.', by: 'Agent' },
      { title: 'Extraction, parsing and mapping', text: 'The agent extracts the relevant data and attributes from every document and maps them to the order.', by: 'Agent' },
      { title: 'Comparison and validation', text: 'Extracted information is compared against the purchase order. Discrepancies are identified and validated.', by: 'Agent' },
      { title: 'Decision support', text: 'Results are presented clearly: pricing, terms, delivery, logistics and other attributes, each with its reasoning.', by: 'Agent' },
      { title: 'Human decision-making', text: 'Results are routed to the right stakeholders to approve, escalate or ask for clarification.', by: 'People' },
      { title: 'Communication and closure', text: 'Decisions and actions go back to the relevant parties, and the process is closed.', by: 'Agent + people' },
    ],
    metric: { value: 'Weeks → hours', label: 'Order confirmation turnaround time' },
    featured: true,
  },
  {
    id: 'engaze',
    headline: 'Conversation-first HCM suite that earned 90% employee satisfaction',
    dek: 'A conversational experience built on five principles instead of flows, with one companion serving employees and managers across the HCM suite. The employee module shipped at 90% CSAT.',
    led: 'I led a design team of 7 to 8, working alongside engineering, product, data science and accessibility.',
    roleNote: 'The team researched conversation design in depth, including how to build a persona that keeps one consistent conversation pattern.',
    beats: {
      about: 'An AI-native HCM suite where the conversation is the product: five design principles, shaped into one conversational application and one companion that serves employees and managers.',
      challenge: 'HCM suites are built for administrators and sold as separate modules. The brief was to improve the experience of every role.',
      users: 'Five roles: employee, manager, recruiter, HR and leadership, each starting from its own day.',
      solution: 'Five principles instead of flows, proven in the employee-experience module, then extended as one companion, one trust model and one people graph.',
      impact: 'The employee-experience module shipped at 90% CSAT and was the most praised HR AI product at the client.',
    },
    metric: { value: '90%', label: 'CSAT in the employee-experience module' },
    featured: true,
  },
  {
    id: 'airline-app',
    headline: 'Air travel booking journey redesign drove 50x in-app add-on sales',
    dek: 'A service ecosystem rather than an app: engagement up 92%, add-on sales up 50×, check-in cut from 9 steps to 2.',
    led: 'I led experience strategy across 11+ designers in a pod model, working alongside engineering, product, data science and accessibility.',
    roleNote: 'I led experience strategy across 11+ designers, and the whole mobile experience with an 8–9 person team for almost a year.',
    beats: {
      about: 'A mobile experience for a leading Middle East air carrier, serving 30M+ guests annually.',
      challenge: 'Functional teams each built on their own, producing an incoherent whole. The goal was to grow digital bookings from a $2M channel to $100M.',
      users: 'Travellers of a carrier with 95+ destinations. The friction that mattered most was physical before it was digital.',
      solution: 'The work was reframed as a service architecture problem, with modular pods each owning a journey node and research done in airport lounges.',
      impact: 'Engagement up 92%, add-on sales up 50×, and check-in cut from 9 steps to 2. The pod model became the standard for large design programmes at Accenture ME.',
    },
    metric: { value: '50×', label: 'Increase in add-on sales' },
    featured: true,
  },
  {
    id: 'dnetworx',
    headline: 'Dynamic network management app that saved $5M',
    dek: 'A change-resistant network platform made self-serve for enterprises, with 70,000+ customers and a client-reported $5M saving.',
    led: 'I led the design effort in one team with engineering and product partners.',
    roleNote: 'A massive project on complex technology, where what the platform changes lands on the customer’s own infrastructure.',
    beats: {
      about: 'Self-serve network installations for an enterprise platform that modifies and upgrades network services with zero downtime.',
      challenge: 'Every network change for 70,000+ enterprise customers needed multi-team handoffs, at a cost of $5M in overhead.',
      users: 'Expert operations users who had adapted to years of dysfunction, and the enterprise customers they serve.',
      solution: 'Progressive disclosure as the core principle, weekly sprints dedicated to one module each, and four weeks of deep-dive discovery up front.',
      impact: '$5M saved, a figure reported by the client. Changes that needed three-team handoffs are now done in a single self-serve flow.',
    },
    metric: { value: '$5M', label: 'Saved, as reported by the client' },
    featured: true,
  },
  {
    id: 'sap-search',
    headline: 'Designing AI-Search experience scaling across 15000+ products',
    dek: 'AI search built into the design system so each improvement reaches every product that adopts it, designed to earn the trust of sceptical enterprise users.',
    led: 'I led a design team of 7 to 8, working alongside engineering, product, data science and accessibility.',
    roleNote: 'A design-system component case: the craft of interaction and behaviour, the anatomy of the component, and the specification product teams build from.',
    beats: {
      about: 'One unified AI-powered search experience across the product suite.',
      challenge: 'Each product had its own legacy search, vocabulary and assumptions, and enterprise users were sceptical of AI-surfaced results.',
      users: 'Enterprise users across the suite who already distrust automation and need to see why a result appeared.',
      solution: 'Intent over query, relevance over completeness, and reasoning shown instead of magic, including surfacing the AI’s confidence.',
      impact: 'Owned by the design team as part of the design system. Every improvement reaches each product that adopts it.',
    },
    metric: { value: '15,000+', label: 'Products it is designed to scale across' },
    featured: false,
  },
  {
    id: 'data-ai',
    headline: 'Marketplace for data governance apps driving 76% adoption',
    dek: 'Executive data products for a global data and AI practice. The scorecard became a reference for presenting governance health to enterprise clients.',
    led: 'I led the design effort, working alongside engineering, product, data science and accessibility.',
    roleNote: 'I led the redesign of the Collibra data-governance experience and defined the NCPI heuristic evaluation framework.',
    beats: {
      about: 'Executive-grade data products that turn the complexity of data governance into something leaders can act on.',
      challenge: 'The platform had grown through acquisition and engineering decisions, not design intent.',
      users: 'Executives and non-technical users who needed to find and trust data assets.',
      solution: 'A structured UX audit with a custom heuristic framework, a design roadmap, and co-design with product, data and business teams.',
      impact: '76% adoption of the governance marketplace. The scorecard became a reference for how governance health is presented to enterprise clients.',
    },
    metric: { value: '76%', label: 'Governance marketplace adoption' },
    featured: false,
  },
]

export const playbackById = (id: string) => playbacks.find(p => p.id === id)
