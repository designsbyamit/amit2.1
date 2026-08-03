export interface CaseStudySection {
  label?: string
  heading?: string
  body: string
  image?: string
  images?: string[]
  items?: { title: string; description: string }[]
}

export interface CaseStudy {
  id: string
  number: string
  category: string
  title: string
  shortTitle: string
  tagline: string
  role?: string
  timeline?: string
  domain?: string
  tags?: string[]
  challenge: string
  approach: string
  outcome: string
  image?: string
  images?: string[]
  stats?: { label: string; value: string }[]
  sections?: CaseStudySection[]
  highlights?: string[]
  testimonial?: { quote: string; name: string; title: string; avatar?: string }
  prototypeUrl?: string
}

const B = import.meta.env.BASE_URL

export const caseStudies: CaseStudy[] = [
  {
    id: 'airline-app',
    number: '01',
    category: 'Service Design · OmniChannel · B2C',
    title: 'OmniChannel Travel Experience — Leading Airlines',
    shortTitle: 'Saudia Airlines',
    tagline: 'Designing a service ecosystem, not an app. Turning a $2M digital channel into a $100M revenue engine.',
    role: 'App Design Lead',
    timeline: 'Jan 2023',
    domain: 'Airlines & Travel · Service Design',
    tags: ['Service Design', 'OmniChannel', 'Airlines', 'Revenue Growth'],
    challenge: 'Leading airline in the Middle East, brand value $500M in 2022, 95+ destinations across four continents. Target: 100M tourists/year by 2030. Digital team was structured around functional owners — each building independently — producing an incoherent whole. The mandate: grow digital bookings from a $2M channel to a $100M revenue stream.',
    approach: 'Reframed the engagement as a service architecture problem, not a UI problem. Led experience strategy across 11+ designers in a modular pod structure where each pod owned a journey node. Research happened in airport lounges and stakeholder sessions — because the friction that mattered most was physical before it was digital.',
    outcome: '92% engagement boost. 50× increase in ancillary sales — a category previously buried so deep in the booking flow that most users never encountered it. The pod delivery model became the standard framework for large-scale design programmes at Accenture ME.',
    image: `${B}images/case-studies/saudia-hero.png`,
    stats: [
      { label: 'Engagement Boost', value: '92%' },
      { label: 'Add-on Sales', value: '50×' },
    ],
    sections: [
      {
        label: 'Ambitions',
        heading: 'Ambitions to soar beyond the sky',
        body: 'The airline had ambitions to reach 100 million annual tourists by 2030. Goals: 50× conversion growth, $100M revenue growth through digital channels, optimise support operations with AI. Design direction: Effortlessly Simple & Delightful / Innovation at its Core / Building Trust & Connection.',
        image: `${B}images/case-studies/saudia-01.png`,
      },
      {
        label: 'Getting Started',
        heading: 'Navigation, inconsistency & fragmented experiences were key struggles',
        body: 'UX Audit surfaced six failure categories: Navigation & Discoverability failures, Fragmented Experience across touchpoints, Poor Information Architecture, Lack of Engagement and ancillary discovery, Brand inconsistency between web and app, and Accessibility failures for a carrier serving millions.',
        image: `${B}images/case-studies/saudia-02.png`,
        items: [
          { title: 'Navigation & Discoverability', description: 'No consistent model for how passengers moved between journeys — every section had to be relearned.' },
          { title: 'Fragmented experience', description: 'Booking, manage, check-in, and ancillaries each had their own logic, visual language, and user assumptions.' },
          { title: 'Hidden ancillary value', description: 'Add-ons buried too late in the booking flow — not a discovery problem, an architecture problem.' },
          { title: 'Accessibility failures', description: 'No accessibility consideration for one of the region\'s busiest carriers.' },
        ],
      },
      {
        label: 'Design Direction',
        heading: 'Unify, simplify, and modernise the experience',
        body: 'Modular "pod" structure with 11+ designers, each owning a journey node. 3-week collaborative sprints. 6 user archetypes from surveys, lounge interviews, and stakeholder interviews. Design direction unified around three principles: Effortlessly Simple & Delightful, Innovation at its Core, Building Trust & Connection.',
        image: `${B}images/case-studies/saudia-03.png`,
      },
      {
        label: 'User Research',
        heading: 'Unveiling users\' pain points — a deep dive',
        body: 'A compact view of user-journey mapping across three key flows. Research conducted at airport lounges surfaced friction that no analytics dashboard could — the most consequential UX insights came from watching passengers navigate check-in desks, not from session recordings.',
        image: `${B}images/case-studies/saudia-04.png`,
      },
      {
        label: 'Plan & Book',
        heading: 'Plan and book a trip',
        body: 'Key problems in the booking flow: Fragmented planning, search, and booking experience / Information overload on search results / Unclear ancillary services. Idea generation workshops using Crazy 8s and stakeholder co-creation sessions produced the new booking architecture.',
        images: [
          `${B}images/case-studies/saudia-05.png`,
          `${B}images/case-studies/saudia-06.png`,
          `${B}images/case-studies/saudia-07.jpg`,
        ],
      },
      {
        label: 'Manage & Check-in',
        heading: 'Manage bookings and check-in',
        body: 'Users\' pain points in the manage flow: Onboarding with existing trips, unintuitive booking management, cumbersome post-booking ancillaries, and check-in discoverability. Each pain point addressed systematically through the pod structure.',
        images: [
          `${B}images/case-studies/saudia-08.jpg`,
          `${B}images/case-studies/saudia-09.jpg`,
          `${B}images/case-studies/saudia-10.png`,
          `${B}images/case-studies/saudia-11.png`,
        ],
      },
      {
        label: 'Impact',
        heading: '92% engagement boost',
        body: '92% engagement boost including 50× growth in ancillary sales — which had been structurally invisible in the previous architecture. Moving add-ons to the right moment in the journey, with the right framing, was a design decision that translated directly into revenue. No new features. No new capability. The same content, in the right place, at the right time.',
        images: [
          `${B}images/case-studies/saudia-12.png`,
          `${B}images/case-studies/saudia-13.png`,
          `${B}images/case-studies/saudia-14.png`,
          `${B}images/case-studies/saudia-15.png`,
          `${B}images/case-studies/saudia-16.png`,
        ],
      },
    ],
    highlights: [
      'Framing the engagement as service ecosystem design — not UI redesign — changed what stakeholders requested. They stopped asking for features and started asking for journeys.',
      'Research at airport lounges surfaced friction no analytics could. The most consequential insights came from watching passengers navigate check-in desks.',
      'The 50× increase in ancillary sales came from no new functionality — only from repositioning existing content at the right moment in the journey.',
    ],
    testimonial: {
      quote: 'As a leader, Amit focused on developing skills and expanding the competencies of his team. His vast knowledge of UI/UX never left questions unanswered. Amit championed design thinking, putting in the effort to get to know everyone and embed himself into the team culture.',
      name: 'Stepan G.',
      title: 'Design Direction for Saudia, Accenture ME',
    },
  },
  ,
  {
    id: 'data-ai',
    number: '02',
    category: 'Data Visualisation · AI · Enterprise',
    title: 'Executive Data-Products for Insights-Driven Decisions',
    shortTitle: 'Data Products',
    tagline: 'Anchoring the data-governance pillar — designing executive-grade data products that translate complexity into actionable intelligence.',
    role: 'Design Lead',
    timeline: 'May 2024',
    domain: 'Data Governance · Enterprise AI',
    tags: ['Data Visualisation', 'AI', 'Enterprise UX', 'Governance'],
    challenge: 'Anchoring the data-governance pillar for Accenture\'s global data and AI capability. Led redesign of Collibra (data governance tool) experience and defined an NCPI heuristic evaluation framework. The platform had grown through acquisition and engineering decisions, not design intent.',
    approach: 'Structured UX audit of the Collibra ecosystem using the custom NCPI heuristic evaluation framework. Goals alignment with product and stakeholders, as-is state evaluation, FY24 Design Strategy Roadmap for Data Governance. Cross-functional co-design sessions with product, data, and business stakeholders.',
    outcome: '76% adoption of the governance marketplace — driven by a redesign that made data assets discoverable and trustworthy to non-technical users. The DG Scorecard became a reference product for how Accenture presents data governance health to enterprise clients.',
    image: `${B}images/case-studies/dataai-hero.png`,
    stats: [
      { label: 'Marketplace Adoption', value: '76%' },
      { label: 'Scope', value: 'Global Practice' },
    ],
    sections: [
      {
        label: 'Key Developments',
        heading: 'Key developments across the data governance practice',
        body: 'Four focus areas defined the engagement: Goals alignment with product and stakeholders / As-is state evaluation and experience strategy / FY24 Design Strategy Roadmap for Data Governance / DG Scorecard deliverables spanning Design Direction, Cross-Collaboration, Skill Development, and Documentation.',
        image: `${B}images/case-studies/dataai-01.jpg`,
      },
      {
        label: 'Design, Test & Track',
        heading: 'Design, test and track',
        body: 'Portfolio of products delivered: Collibra redesign — heuristic evaluation surfacing 40+ friction points prioritised by business impact / DG Scorecard releases — executive-readable governance health signals with drill-down capability / PowerBI design system — consistent visual language for data visualisation across the practice.',
        image: `${B}images/case-studies/dataai-02.jpg`,
        items: [
          { title: 'Collibra Redesign', description: 'NCPI heuristic evaluation of the data governance platform — surfaced friction points, prioritised by business impact and implementation cost.' },
          { title: 'DG Scorecard', description: 'Executive-readable governance health score. One signal, drill-down available. Designed for the CDO\'s review, not the data steward\'s daily workflow.' },
          { title: 'PowerBI Design System', description: 'Consistent visual language for data visualisation — charts, tables, and KPI tiles that read as one system regardless of author.' },
        ],
      },
      {
        label: 'UX Audit',
        heading: 'UX audit for data governance tools ecosystem',
        body: 'Heuristic evaluation of Collibra using the NCPI framework revealed: information overload without hierarchy, no executive-level summary layer, inconsistent interaction patterns across modules, and missing trust signals for data quality. Each finding was mapped to a business impact score before prioritisation.',
        image: `${B}images/case-studies/dataai-03.png`,
      },
    ],
    highlights: [
      'Data governance UX is fundamentally a trust problem, not an information problem. Executives don\'t need more data — they need confidence signals that let them act.',
      'The NCPI heuristic framework gave stakeholders a shared vocabulary for evaluating UX quality — transforming design critique from subjective preference to structured assessment.',
      'Co-design sessions with business stakeholders revealed decision-making workflows that no requirements document had captured.',
    ],
    testimonial: {
      quote: 'Amit spent a couple of weeks to understand how Collibra is used across the DG practice before proposing a design direction. That level of investment before recommendations is rare and it showed in the quality of the output.',
      name: 'Liz Rivas',
      title: 'Associate Director, Data Governance, Accenture US',
    },
  },
  {
    id: 'engaze',
    number: '03',
    category: 'Generative AI · Conversational Design · HR',
    title: 'Engaze: AI-Native Workplace Companion',
    shortTitle: 'Engaze HCM AI',
    tagline: '"Engaze" simplifies your work life — leave balances, approvals, benefits — just ask.',
    role: 'Capability Lead',
    timeline: 'May 2024',
    domain: 'Generative AI · HR Tech',
    tags: ['Generative AI', 'Conversational Design', 'HR', 'Content Strategy'],
    challenge: 'The client had a functioning chatbot built by engineering on a traditional flow-based model. Enterprise HR systems are built for compliance, not for people — every question an employee asks hits a system designed for auditors, not someone with two minutes between meetings.',
    approach: 'Adopted an organic design approach — shifted from a generic process to a flexible, agile, experimental approach due to the pace of Gen AI evolution. Defined five principles instead of flows, evaluated 45+ conversational AI products, and built a 3-layered design strategy.',
    outcome: '90% CSAT in a category where enterprise HR bots typically score below 60%. Engaze became the most praised HR AI product. Executive recognition: "standards set quite high and it proudly stands beside any other leading studios\' work globally."',
    image: `${B}images/case-studies/engaze-hero.jpg`,
    stats: [
      { label: 'CSAT Score', value: '90%' },
      { label: 'Recognition', value: '#1 HR AI' },
    ],
    sections: [
      {
        label: 'Background',
        heading: 'Simplifying employee interactions',
        body: '"Engaze" streamlines employee interactions, eliminating friction and offering a more human touch. The challenge was not to replace an existing chatbot with something prettier — it was to demonstrate why a principle-first design approach outperforms a flow-based engineering approach in a domain where edge cases outnumber happy paths.',
        image: `${B}images/case-studies/engaze-01.png`,
      },
      {
        label: 'Understanding Scope',
        heading: 'Understanding the employee-experience scope',
        body: 'Adopted an organic design approach — shifted from a generic design process to a flexible, agile, experimental approach due to the pace of Gen AI evolution. Rapid prototyping enabled faster iteration cycles, validating hypotheses before committing to direction.',
        image: `${B}images/case-studies/engaze-02.png`,
      },
      {
        label: 'Employee Struggles',
        heading: 'Uncovered the most common daily struggles of employees',
        body: 'Three categories of employee struggle emerged from research: information-based interactions, communication, and complex transactional tasks. These became the design brief — not the engineering backlog.',
        image: `${B}images/case-studies/engaze-03.png`,
        items: [
          { title: 'Information interactions', description: 'Leave balances, policy lookups, benefit details — questions employees ask dozens of times a year that should take seconds, not tickets.' },
          { title: 'Communication tasks', description: 'Approvals, status updates, escalations — interactions that cross team boundaries and lose context at every handoff.' },
          { title: 'Complex transactions', description: 'Multi-step processes like onboarding tasks, expense submissions, and requests that span multiple systems.' },
        ],
      },
      {
        label: 'Design Philosophy',
        heading: 'Conversational AI Design Philosophy — 3-Layered Strategy',
        body: 'The 3-layered design strategy governed every decision: Natural Conversational Experiences at the interaction layer, Content Strategy Thumb-rules at the language layer, and Conversational Interface Design Guidelines at the UI layer. Bot capabilities were defined as: Deep Organisation Knowledge, Emotional Intelligence (sentiment analysis), Creative Responder, and Natural Conversation Flow.',
        image: `${B}images/case-studies/engaze-04.png`,
      },
      {
        label: 'Holistic Approach',
        heading: 'Holistic approach for more human-like interactions',
        body: 'Post evaluating 45+ conversational and Gen AI applications, the design direction emerged: interfaces embracing bold visual language, dark modes, and conversational tone — designed for the same quality bar as consumer AI products, not enterprise compliance tools.',
        image: `${B}images/case-studies/engaze-05.png`,
      },
      {
        label: 'Dialog Flows',
        heading: 'Crafting dialog flows',
        body: 'Dialog flows were built around the five principles — Trust, Guidance, Discoverability, Cognitive Simplicity, and Continuity. Each principle answered a specific failure mode from the previous generation of HR bots. Flows were tested against real employee scenarios, not hypothetical ones.',
        image: `${B}images/case-studies/engaze-06.png`,
      },
      {
        label: 'Interface Design',
        heading: 'Conversational interface design',
        body: 'The conversational UI was designed to feel like a trusted colleague, not a help desk ticket system. Response architecture, tone calibration, and failure grammar were treated as first-class design decisions — not content afterthoughts.',
        images: [
          `${B}images/case-studies/engaze-07.png`,
          `${B}images/case-studies/engaze-08.png`,
          `${B}images/case-studies/engaze-09.png`,
          `${B}images/case-studies/engaze-10.png`,
          `${B}images/case-studies/engaze-11.png`,
        ],
      },
    ],
    highlights: [
      'Rapid prototyping approach enabled faster iteration — prototypes were the primary argument, not supporting material.',
      'Led design direction enabling team growth in conversational design across the engagement.',
      'Close collaboration with development and data science teams is imperative for Gen-AI work.',
      'Designs received strong validation during usability testing — 90% CSAT confirmed principles over flows.',
    ],
    testimonial: {
      quote: 'Greatly impressed by the quality of designs, the attention to detail and delightful experience. Happy to see that the standards are set quite high and it proudly stands beside any other leading studios\' work globally.',
      name: 'Saran S.',
      title: 'Managing Director, Accenture Operations',
    },
  },
  ,
  {
    id: 'dnetworx',
    number: '04',
    category: 'Enterprise UX · Telecommunications · Self-Serve',
    title: 'Enterprise Experience for Self-Serve Network Installations',
    shortTitle: 'dNetWorX $5M',
    tagline: 'Turning a technically complex, change-resistant enterprise platform into a self-serve operational capability saving $5M.',
    role: 'Design Lead',
    timeline: 'Jun 2023',
    domain: 'Telecom · Enterprise Operations',
    tags: ['Enterprise UX', 'Telecommunications', 'Self-Serve', 'Operational Design'],
    challenge: '"dNetWorX" helps enterprises modify and upgrade network services with zero downtime. Client: leading CMT company (NDA). Expert users had adapted to years of dysfunction — mistaking workarounds for competence. Every network modification for 70,000+ enterprise customers required multi-team handoffs. The cost: $5M in overhead.',
    approach: 'Weekly sprint structure, each sprint dedicated to a specific module with 2 checkpoint reviews and 2 co-working sessions per week. Progressive disclosure as the core design principle. 4 weeks of deep-dive uncovering navigational challenges, access restrictions, cognitive load, and complex processes.',
    outcome: '$5M saved through reduction in support tickets, manual intervention hours, and multi-team escalations. Network modifications that required three-team handoffs now completed in a single self-serve flow.',
    image: `${B}images/case-studies/dnetworx-hero.png`,
    stats: [
      { label: 'Cost Savings', value: '$5M' },
      { label: 'Customers', value: '70K+' },
    ],
    sections: [
      {
        label: 'Background',
        heading: 'Tim\'s story and his challenges',
        body: 'Persona: Tim, 45, network engineer at a large bank — responsible for 24/7 uptime of network devices. Tim\'s team handles dozens of network modifications per week. Each one requires navigating a system designed for maximum configurability, not operational speed. Tim has adapted to the dysfunction. He doesn\'t know it\'s broken.',
        image: `${B}images/case-studies/dnetworx-01.png`,
      },
      {
        label: 'Design Process',
        heading: 'Agile, adaptable and organic approach',
        body: 'Weekly sprint structure with each sprint dedicated to a specific module. 2 checkpoint reviews + 2 co-working sessions per week kept stakeholders aligned without slowing design. The approach built trust with change-resistant technical stakeholders — weekly reviews where they could see decisions being made, not just outcomes being presented.',
        image: `${B}images/case-studies/dnetworx-02.png`,
      },
      {
        label: 'Problem Space',
        heading: 'Dig deeper — from vagueness towards clarity',
        body: '4 weeks of deep-dive uncovered four thematic problems: Navigational Challenges — buried entry points and inconsistent navigation patterns / Access Restrictions & Approvals — multi-team handoffs for routine tasks / Cognitive Load & Technical Jargon — dense language that slowed expert users / Complex & Time-Consuming Processes — workflows that should be self-serve requiring escalation.',
        image: `${B}images/case-studies/dnetworx-03.png`,
        items: [
          { title: 'Navigational challenges', description: 'Entry points buried within a large enterprise platform. Engineers needed to know where to look before they could begin work.' },
          { title: 'Access restrictions & approvals', description: 'Routine modifications required multi-team approval chains that had accumulated over years with no current operational reason.' },
          { title: 'Cognitive load & jargon', description: 'Dense technical language on every screen added reading overhead to already complex operational tasks.' },
          { title: 'Complex processes', description: 'Tasks that should be self-serve required cross-team coordination — $5M in overhead that better design could eliminate.' },
        ],
      },
      {
        label: 'Information Architecture',
        heading: 'Untangling the complex information architecture',
        body: 'IA decision: dNetWorX entry points on the Vertex Enterprise Center landing page — prominent, with direct CTAs, static links within Pods, and tweaked global navigation. Engineers reached their most common tasks in two actions instead of seven.',
        image: `${B}images/case-studies/dnetworx-04.png`,
      },
      {
        label: 'Impact',
        heading: 'Simple and seamless',
        body: '$5M saved. Network modifications from 3-team handoffs to single self-serve flow. Key highlights: Design standards established in ambiguous technical environments / Cross-geo stakeholder management / Evangelising design thinking in an engineering-first organisation.',
        images: [
          `${B}images/case-studies/dnetworx-05.png`,
          `${B}images/case-studies/dnetworx-06.png`,
        ],
      },
    ],
    highlights: [
      'Progressive disclosure worked because it respected what expert users already knew. The framing was never "simpler" — it was "faster to the thing you need."',
      'Trust in a change-resistant environment is earned through transparency. Weekly sprint reviews built confidence before any final decisions were required.',
      'The $5M saving framed design work in operational impact terms — not UX quality. Design that cannot be measured in business outcomes is decoration.',
    ],
    testimonial: {
      quote: 'Right from day one, Amit established himself as an expert who understood the Customer Experience journey. This application is external client-facing — 70k+ customers — and customer experience is critical to the company brand, customer retention, and pivot to digital experience.',
      name: 'Mitesh Shah',
      title: 'Associate Director, Accenture CMT, US',
    },
  },
  ,
  {
    id: 'sap-search',
    number: '05',
    category: 'AI · Enterprise UX · SAP',
    title: 'AI-Powered Search — Contextual Discovery at Enterprise Scale',
    shortTitle: 'SAP AI Search',
    tagline: 'Rethinking how enterprise users find what they need in intelligent systems that understand intent, not just keywords.',
    role: 'Design Lead',
    timeline: '2024–Ongoing',
    domain: 'AI · Enterprise SaaS',
    tags: ['AI', 'Search Design', 'Enterprise UX', 'SAP'],
    challenge: 'Each SAP product had its own legacy search implementation, vocabulary, and assumptions. Introducing AI-powered search meant solving fragmentation and trust simultaneously — making AI-surfaced results trustworthy to enterprise users who are already sceptical of AI.',
    approach: 'Three principles: intent over query, contextual relevance over completeness, transparent reasoning over magical results. The hardest decision: surfacing AI confidence levels to users already sceptical of automation.',
    outcome: 'Deployed as a foundational suite capability. Design standards now govern AI-surfaced discovery across the SAP suite. Task completion rates improved measurably for complex cross-module queries.',
    stats: [
      { label: 'Scope', value: 'Suite-wide' },
      { label: 'Scale', value: '300M+ users' },
    ],
    sections: [
      {
        label: 'Coming Soon',
        heading: 'Full case study being documented',
        body: 'This project is currently active. Full documentation — including design decisions, interaction principles, and outcome data — will be published here. Reach out if you\'d like to discuss the work directly.',
      },
    ],
    highlights: [
      'Trust in AI search is a design problem before it is a model problem.',
      'Designing standards for 300M+ users required principles, not prescriptions.',
      'Enterprise users detect evasion faster than uncertainty — and they punish evasion with distrust.',
    ],
  },
  ,
  {
    id: 'sap-agentic',
    number: '06',
    category: 'Agentic AI · Enterprise · SAP',
    title: 'Agentic Invoice Clearance — Autonomous Enterprise Workflows',
    shortTitle: 'Agentic Invoice',
    tagline: 'Designing the human-AI relationship in autonomous systems where agents act, escalate, and require oversight.',
    role: 'Design Lead',
    timeline: '2024–Ongoing',
    domain: 'Agentic AI · Enterprise Operations',
    tags: ['Agentic AI', 'Automation', 'Enterprise UX', 'SAP'],
    challenge: 'Initial brief: "add a UI" to the agent\'s actions. Reframed: the UI is the mechanism by which humans trust and oversee the agent. The question was not how to present information — it was how to design the relationship between human authority and AI autonomy.',
    approach: 'One governing principle: human oversight is not an escape hatch — it is the product. Three-tier communication hierarchy: high-confidence actions as concise log, boundary decisions with visible reasoning, escalations as high-priority interruptions.',
    outcome: 'Deployed in production. Manual overhead dropped measurably. Zero increase in error rates versus fully manual processes. Framework being extended to other agentic use cases across the SAP suite.',
    stats: [
      { label: 'Model', value: 'Agentic AI' },
      { label: 'Scope', value: 'Enterprise Ops' },
    ],
    sections: [
      {
        label: 'Coming Soon',
        heading: 'Full case study being documented',
        body: 'This project is currently active. Full documentation — including the agentic UX framework, communication hierarchy design, and production outcomes — will be published here. Reach out if you\'d like to discuss the work directly.',
      },
    ],
    highlights: [
      'The most important decision in agentic systems is what the agent does NOT show.',
      'Human override mechanisms are core to the trust model — not edge cases.',
      'This project forced a new vocabulary for agentic design: supervision, confidence surfacing, escalation design.',
    ],
  },
]