export interface CaseStudy {
  id: string
  number: string
  category: string
  title: string
  tagline: string
  challenge: string
  approach: string
  outcome: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'agentic-ai',
    number: '01',
    category: 'Agentic AI · Enterprise UX · Automation',
    title: 'Agentic AI for Order Confirmation',
    tagline: 'Orchestrating intelligent automation at enterprise scale',
    challenge:
      'Order confirmation workflows in enterprise ERP systems are fragmented across dozens of manual touchpoints — slowing operations, multiplying errors, and exhausting teams with low-value decisions.',
    approach:
      'Designed an agentic AI framework where agents handle routine confirmations autonomously, surface exceptions intelligently, and collaborate with humans only when judgment is required. Mapped the full decision topology before designing the interaction layer.',
    outcome:
      'Reduced manual intervention in confirmation workflows by over 70%. Established a reusable agentic UX pattern now applied across multiple SAP order management surfaces.',
  },
  {
    id: 'genie-hcm',
    number: '02',
    category: 'Conversational AI · HCM · Enterprise',
    title: 'Genie — Holistic Conversational HCM',
    tagline: 'Reimagining the employee experience through conversational AI',
    challenge:
      "HR systems are notoriously complex — dispersed across portals, forms, and processes that demand employees navigate bureaucracy instead of getting answers. AI promised a better path but nobody had mapped what that experience should actually feel like.",
    approach:
      "Led end-to-end conversational design for Genie — SAP's AI assistant for HCM. Designed multimodal interaction patterns for text, voice, and embedded surface contexts. Drove organizational alignment between product, engineering, and business stakeholders.",
    outcome:
      "Genie became a flagship SAP AI product. Significantly improved employee task completion rates in early pilots. Established conversational design standards now used across SAP's AI portfolio.",
  },
  {
    id: 'ai-search',
    number: '03',
    category: 'Search · AI · Information Architecture',
    title: 'AI-Powered Search Experience',
    tagline: 'Making enterprise knowledge discoverable through contextual AI',
    challenge:
      'Enterprise search is broken — keyword matching returns noise, relevance is opaque, and users abandon rather than iterate. As knowledge scales, findability degrades exponentially.',
    approach:
      'Designed a contextual AI search layer that interprets intent, surfaces related concepts, and presents results in structured knowledge formats rather than raw lists. Built scalable IA patterns that work across content types.',
    outcome:
      'Adoption increased significantly in internal pilots. Time-to-answer reduced. The information architecture framework became a reusable pattern for other search surfaces in the product ecosystem.',
  },
  {
    id: 'saudia',
    number: '04',
    category: 'Service Design · Travel · Scale',
    title: 'Saudia Airlines Experience',
    tagline: 'Orchestrating end-to-end experience for a national carrier at scale',
    challenge:
      'Designing a complete digital experience for a national airline — web, app, kiosk, and service touchpoints — within 100 days, with a 16-designer team, across six parallel workstreams.',
    approach:
      'Structured the team into delivery pods, each owning a distinct journey segment. Led design operations, cross-pod alignment, and quality — ensuring cohesion without bottlenecks. Introduced systems thinking to manage cross-surface consistency.',
    outcome:
      'Delivered full-scale experience redesign within 100-day commitment. The pod model became an internal Accenture case study for large-scale UX delivery. End-to-end journey coverage across booking, check-in, lounge, and post-flight.',
  },
]
