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
  beats: { about: string; challenge: string; users: string; solution: string; impact: string }
  metric: { value: string; label: string }
  featured: boolean
}

export const playbacks: Playback[] = [
  {
    id: 'sap-agentic',
    headline: 'Built to take supplier order confirmation from weeks to hours, with people deciding every step',
    dek: 'An agent extracts and compares, people validate and decide. Co-created with customers as a white-labelled solution across supply chain management.',
    roleNote: 'I framed it as a design pattern and led the agent, the human-in-the-loop model and the architecture.',
    beats: {
      about: 'An AI agent that reads supplier order confirmations and compares them to purchase orders, while people make every decision.',
      challenge: 'Confirmation took weeks. Someone read each PDF, often in German, and checked it line by line against the order.',
      users: 'Three personas: operations, the buyer and the goods recipient, with the supplier on the other end of every order.',
      solution: 'The agent extracts and compares, and people validate and decide. Every difference carries its reasoning, and every step is logged.',
      impact: 'A complete path from the supplier’s email to approve and close, across 33 screens. Co-created with customers as a white-labelled solution across supply chain management.',
    },
    metric: { value: 'Weeks → hours', label: 'Order confirmation time the design is built to reach' },
    featured: true,
  },
  {
    id: 'engaze',
    headline: 'An HR companion that 9 in 10 employees were satisfied with',
    dek: 'One AI companion across the HR suite, from employee to leadership, built on five principles instead of flows. The employee module shipped at 90% CSAT.',
    roleNote: 'The team researched conversation design in depth, including how to build a persona that keeps one consistent conversation pattern.',
    beats: {
      about: 'An AI-native HR suite where one companion serves employees, managers, recruiters, HR and leadership.',
      challenge: 'HR suites are built for administrators and sold as separate modules. The brief was to improve the experience of every role.',
      users: 'Five roles: employee, manager, recruiter, HR and leadership, each starting from its own day.',
      solution: 'Five principles instead of flows, proven in the employee-experience module, then extended as one companion, one trust model and one people graph.',
      impact: 'The employee-experience module shipped at 90% CSAT and was the most praised HR AI product at the client.',
    },
    metric: { value: '90%', label: 'CSAT in the employee-experience module' },
    featured: true,
  },
  {
    id: 'airline-app',
    headline: 'An airline app that grew add-on sales 50× by designing the journey, not the booking flow',
    dek: 'The mobile experience for a carrier serving 30M+ guests a year: engagement up 92%, check-in cut from 9 steps to 2.',
    roleNote: 'I led experience strategy across 11+ designers, and the whole mobile experience with an 8–9 person team for almost a year.',
    beats: {
      about: 'The mobile experience for a Middle East carrier serving 30M+ guests a year, designed as a service ecosystem.',
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
    headline: '$5M saved by turning three-team handoffs into one self-serve flow',
    dek: 'A change-resistant network platform made self-serve for enterprises, with 70,000+ customers and a client-reported $5M saving.',
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
    headline: 'One AI search for every product in the suite, defined once and piloted in three',
    dek: 'AI search built into the design system so each improvement reaches every product that adopts it, designed to earn the trust of sceptical enterprise users.',
    roleNote: 'A design-system component case: the craft of interaction and behaviour, the anatomy of the component, and the specification product teams build from.',
    beats: {
      about: 'One AI search experience, defined once in the design system and shared across every product in the suite.',
      challenge: 'Each product had its own legacy search, vocabulary and assumptions, and enterprise users were sceptical of AI-surfaced results.',
      users: 'Enterprise users across the suite who already distrust automation and need to see why a result appeared.',
      solution: 'Intent over query, relevance over completeness, and reasoning shown instead of magic, including surfacing the AI’s confidence.',
      impact: 'Piloted in three products and owned by the design team. Every improvement reaches each product that adopts it.',
    },
    metric: { value: '3', label: 'Products piloting' },
    featured: false,
  },
  {
    id: 'data-ai',
    headline: '76% adoption for a data-governance marketplace made for non-technical users',
    dek: 'Executive data products for a global data and AI practice. The scorecard became a reference for presenting governance health to enterprise clients.',
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
