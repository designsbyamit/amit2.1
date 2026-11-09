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
  /** How I led it. Only set where a larger design team was led; leave out for solo or small-pod work. */
  led?: string
  beats: {
    about: string; challenge: string; users: string; solution: string; impact?: string
    /** Optional: the challenge as a short list, followed by `challengeNote`. */
    challengePoints?: string[]; challengeNote?: string
    /** Optional: the personas, shown as chips above the sentence in `users`. */
    personas?: string[]
  }
  /** Optional: the end-to-end process, shown as a flow between the solution and the impact. */
  flow?: { title: string; text: string; by: 'Agent' | 'People' | 'Agent + people' }[]
  /** Optional: leave out where the figure is scale, not impact. */
  metric?: { value: string; label: string }
  featured: boolean
}

export const playbacks: Playback[] = [
  {
    id: 'sap-agentic',
    headline: 'From inbox to approval, automating the legwork',
    dek: 'RFQ approvals towards autonomous procurement decisions.',
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
    
    featured: true,
  },
  {
    id: 'engaze',
    headline: 'Enterprise Assistant to Stay Engaged',
    dek: 'Making HR conversations the starting point for an autonomous HCM experience.',
    led: 'I led a design team of 5 to 6, inside a larger team where the rest of the people came from other disciplines.',
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
    headline: 'Omnichannel Air travel experience',
    dek: 'Connecting the travel booking journey across channels that drives a 92% boost in engagement.',
    led: 'I led experience strategy across 11+ designers, organised in pods that each owned a journey.',
    roleNote: 'I led experience strategy across 11+ designers, and the whole mobile experience with an 8-9 person team for almost a year.',
    beats: {
      about: 'A mobile experience for a leading Middle East air carrier, serving 30M+ guests annually.',
      challenge: 'Functional teams each built on their own, producing an incoherent whole. The goal was to grow digital bookings from a $2M channel to $100M.',
      users: 'Travellers of a carrier with 95+ destinations. The friction that mattered most was physical before it was digital.',
      solution: 'The work was reframed as a service architecture problem, with modular pods each owning a journey node and research done in airport lounges.',
      impact: 'Engagement up 92%, add-on sales up 50×, and check-in cut from 9 steps to 2. The pod model became the standard for large design programmes at Accenture ME.',
    },
    metric: { value: '50×', label: 'Increase in add-on sales' },
    featured: false,
  },
  {
    id: 'dnetworx',
    headline: 'Dynamic Network Management',
    dek: 'Self-serve network management that saved $5M',
    led: 'I led a design team of mostly 5 to 6, working as one team with engineering and product partners.',
    roleNote: 'A massive project on complex technology, where what the platform changes lands on the customer’s own infrastructure.',
    beats: {
      about: 'Self-serve network installations for an enterprise platform that modifies and upgrades network services with zero downtime.',
      challenge: 'Every network change for 70,000+ enterprise customers needed multi-team handoffs, at a cost of $5M in overhead.',
      users: 'Expert operations users who had adapted to years of dysfunction, and the enterprise customers they serve.',
      solution: 'Progressive disclosure as the core principle, weekly sprints dedicated to one module each, and four weeks of deep-dive discovery up front.',
      impact: '$5M saved, a figure reported by the client. Changes that needed three-team handoffs are now done in a single self-serve flow.',
    },
    metric: { value: '$5M', label: 'Saved, as reported by the client' },
    featured: false,
  },
  {
    id: 'sap-search',
    headline: 'Search that talks back and gets things done',
    dek: 'Turning enterprise search into a unified path from questions to action.',
    led: 'I led eight designers in three groups, alongside engineering and product.',
    roleNote: 'Design Lead for the search vision and its three workstreams.',
    beats: {
      about: 'One AI powered search experience for the product suite.',
      challenge: 'Each product had its own search. We first needed to understand what line of business stakeholders needed and what search should offer. Two questions stayed hard: how search hands over to the conversational assistant, and how much information results should show.',
      users: 'Line of business stakeholders and the people who search across the suite every day.',
      solution: 'A vision and principles in Figma, three groups for pre-search and querying, search and results, and results to products and applications. The direction was tested and validated, and a prototype was built.',
    },
    featured: true,
  },
  {
    id: 'sap-collections',
    headline: 'Overdue invoices, managed by agents and led by humans',
    dek: 'Multi-agentic orchestrations for overdue invoices across 140 countries.',
    led: 'I led the design, together with product and engineering.',
    roleNote: 'Design Lead. Four rounds of discovery with three roles.',
    beats: {
      about: 'A collections app where an agent prepares the work on overdue customers.',
      challenge: 'Collectors work long lists across many company codes, inside the constraints of the enterprise UI framework.',
      users: 'Three roles, met over four rounds of discovery.',
      solution: 'One row per customer with company codes inline and an explainable priority. A Next Best Action comes before the draft, and a person approves before anything is sent. Phases 1 and 2 are released.',
    },
    featured: false,
  },
  {
    id: 'sap-compositional',
    headline: 'Beyond compositions',
    dek: 'Intelligent Experience Optimisation for CompDS.',
    roleNote: 'Research and point of view. Status: working hypothesis.',
    beats: {
      about: 'A compositional design system gives AI a governed design language for creating experiences.',
      challenge: 'Generative interfaces jump from prompt to arbitrary UI, with nothing to inspect on the way.',
      users: 'Designers and product teams who will work alongside AI.',
      solution: 'Keep the LLM, the design language, composition and guardrails apart, and check every step from intent to interface. Eight deliverables make it practical.',
    },
    featured: false,
  },
  {
    id: 'sap-signin',
    headline: 'Crafting a unified sign-in, consistent across 1,500+ apps',
    dek: 'Harmonising authentication across 1,500+ apps',
    roleNote: 'Guidelines and five interactive prototypes.',
    beats: {
      about: 'A single sign in and sign out standard for the cloud products.',
      challenge: 'The first screen of every product looked different, with basics missing.',
      users: 'People who move between products, and the product teams who build the entry.',
      solution: 'Three flows, one card anatomy, recovery inside the same card and non blaming language. Adoption is not reported.',
    },
    featured: false,
  },
  {
    id: 'data-ai',
    headline: 'Data Products Marketplace',
    dek: 'Enabling Data Governance Adoption for the Enterprise',
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
