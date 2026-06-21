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

export const caseStudies: CaseStudy[] = [
  {
    id: 'engaze',
    number: '01',
    category: 'Generative AI · Conversational Design · HR',
    title: 'Engaze: AI-Native Workplace Companion',
    tagline: 'Designing the intelligence layer between employees and their organisation — not a bot, but a trusted colleague.',
    role: 'Capability Lead',
    timeline: 'May 2024',
    domain: 'Generative AI · HR Tech',
    tags: ['Generative AI', 'Conversational Design', 'HR', 'Content Strategy'],
    challenge:
      'The client had a functioning chatbot already — built by engineering, without design input, on a traditional flow-based model. The challenge was not to replace it with something prettier but to demonstrate why a principle-first design approach would outperform a flow-based engineering approach in a domain where edge cases outnumber happy paths. Enterprise HR systems are built for compliance, not for people. Every question an employee asks — about leave, benefits, policy, approvals — hits a system designed for auditors, not for someone with two minutes between meetings.',
    approach:
      'Reframed the design problem: instead of writing more flows, I defined five principles — trust, guidance, discoverability, cognitive simplicity, and continuity — that governed how the system behaved in any situation, including the ones no flow had anticipated. Led a fail-fast prototyping cycle, evaluated 45+ conversational AI products to map what the category had already solved, and built a three-layered strategy spanning conversational experience, content architecture, and interface consistency. Prototypes were the primary argument, not the wireframes behind them.',
    outcome:
      '90% CSAT — in a product category where enterprise HR chatbots typically score below 60%, driven directly by the Continuity and Trust principles, which addressed the specific failures that had killed the previous system. Engaze became the organisation\'s most praised HR AI product. The conversational AI design standards established here now shape how the broader enterprise approaches Gen AI experience design. Executive recognition: "standards set quite high and it proudly stands beside any other leading studios\' work globally."',
    image: 'https://framerusercontent.com/images/aAox9oje0P9YmR7oD3AOC4qqs.jpg',
    images: [
      'https://framerusercontent.com/images/Lt6txvqt13KWpK4Zgvgl7N0Hn0.png',
      'https://framerusercontent.com/images/UenwjTyGanI9XhCypgzGy4Mk9Y.png',
      'https://framerusercontent.com/images/PDltBzaXBnUrCPlOm3aTh7ybyA.png',
      'https://framerusercontent.com/images/EYJl6KaUsapMi6QUM1TKP1OuFdk.png',
      'https://framerusercontent.com/images/RmI7VaiirX6elezyYybyfEU0uR0.png',
      'https://framerusercontent.com/images/MUk6ViAI44g4Brx3kpjrwrlftD0.png',
    ],
    stats: [
      { label: 'CSAT Score', value: '90%' },
      { label: 'Recognition', value: '#1 HR AI' },
    ],
    sections: [
      {
        label: 'The Problem',
        heading: 'A bureaucracy disguised as software',
        body: 'The previous system was built the way most enterprise chatbots are built: map every known scenario, write a flow for each one, deploy. It worked for the twenty scenarios they had anticipated. For everything else — a question phrased differently, a request that spanned two processes, a moment where the system did not have the answer — it failed visibly and left the user stranded.\n\nThis is the structural flaw of flow-based conversational design: flows cover happy paths. The generative layer handles everything else. Writing more flows was not the answer. The answer was to define how the system should behave — not in every scenario, but according to principles that held across all of them.',
      },
      {
        label: 'Design Principles',
        heading: 'Five principles that outlasted every screen we designed',
        body: 'The principles were not aspirational statements. They were design constraints — each one answering a specific failure mode from the previous generation of HR bots. Every response, every interaction pattern, every content decision was evaluated against them.',
        image: 'https://framerusercontent.com/images/PDltBzaXBnUrCPlOm3aTh7ybyA.png',
        items: [
          {
            title: 'Trust',
            description: 'Every response had to be accurate and attributable. Ambiguity was surfaced explicitly rather than papered over with confident-sounding generalities. If the system did not know, it said so.',
          },
          {
            title: 'Guidance',
            description: 'When the system could not answer, it pointed forward — to the right person, the right process, the right next step. Dead ends were designed out. No interaction could leave a user without a path.',
          },
          {
            title: 'Discoverability',
            description: 'Employees should encounter capabilities they did not know to search for. The system was designed to anticipate needs rather than wait to be asked in exactly the right way.',
          },
          {
            title: 'Cognitive Simplicity',
            description: 'Responses were structured to reduce decision load — not by compressing information, but by sequencing it so users never faced more than they needed at once.',
          },
          {
            title: 'Continuity',
            description: 'Conversations remembered their context. Returning users were met where they left off, not treated as strangers by a system they had used yesterday. This principle addressed the single highest-friction failure in the previous system.',
          },
        ],
      },
      {
        label: 'Content Strategy',
        heading: 'Teaching the system to respond like a trusted colleague',
        body: 'Most conversational AI fails on language before it fails on capability. The model can answer the question — but the response is formatted like a database output, not a conversation. Content strategy was not downstream copywriting. It was a design system for language: rules governing how information was structured, sequenced, and voiced across every interaction type.\n\nThe core decision: define response architecture by interaction type, not by topic. An informational response has a different structure from a transactional one. A clarifying response is built differently from an escalation. Consistency at this level reduced cognitive load across hundreds of distinct scenarios without requiring individual attention to each.',
        image: 'https://framerusercontent.com/images/EYJl6KaUsapMi6QUM1TKP1OuFdk.png',
        items: [
          {
            title: 'Response architecture',
            description: 'Each response type — informational, transactional, clarifying, escalating — had its own defined structure. Consistency reduced cognitive load across hundreds of interaction scenarios.',
          },
          {
            title: 'Tone calibration',
            description: 'Defined when to be warm and when to be direct. A leave balance is a number. A denied request carries emotional weight. The system was designed to recognise the difference and respond accordingly.',
          },
          {
            title: 'Failure grammar',
            description: 'The system\'s most important responses were its failure states. How to not know gracefully is a design skill — these were designed as precisely as the success states.',
          },
        ],
      },
      {
        label: 'Impact',
        heading: '90% CSAT — and a new standard for enterprise AI',
        body: 'Engaze became the most praised HR AI product in the organisation — not because it was technically impressive, but because it felt like it was built for the people using it. Usability testing validated every design principle in production conditions. The 90% CSAT figure, in a category where the industry baseline sits below 60%, reflected the direct impact of principles over flows.\n\nBeyond the product, the engagement established conversational AI design standards that continue to shape how the organisation approaches Gen AI. The executive assessment confirmed what the score reflected: "it proudly stands beside any other leading studios\' work globally."',
        images: [
          'https://framerusercontent.com/images/RmI7VaiirX6elezyYybyfEU0uR0.png',
          'https://framerusercontent.com/images/MUk6ViAI44g4Brx3kpjrwrlftD0.png',
        ],
      },
    ],
    highlights: [
      'Principle-first design proved more durable than flow-based design: as the underlying AI model evolved across the engagement, the principles held while the flows became obsolete. This was not a hypothesis at the start — it was a discovery.',
      'The fail-fast prototyping cycle surfaced real edge cases faster than any research method alone. Prototypes were the primary argument, not supporting material — a distinction that changed how engineering engaged with design decisions.',
      'Evaluating 45+ conversational AI products was not benchmarking. It was a systematic search for what the category had already solved — so we would not redesign what already existed and could focus design effort on what was genuinely novel.',
    ],
    testimonial: {
      quote: 'Greatly impressed by the quality of designs, the attention to detail and delightful experience. Happy to see that the standards are set quite high and it proudly stands beside any other leading studios\' work globally.',
      name: 'Saran S.',
      title: 'Managing Director, Accenture Operations',
    },
  },
  {
    id: 'airline-app',
    number: '02',
    category: 'Service Design · OmniChannel · B2C',
    title: 'OmniChannel Travel Experience — Leading Airlines',
    tagline: 'Designing a service ecosystem, not an app. Turning a $2M digital channel into a $100M revenue engine.',
    role: 'App Design Lead',
    timeline: 'Jan 2023',
    domain: 'Airlines & Travel · Service Design',
    tags: ['Service Design', 'OmniChannel', 'Airlines', 'Revenue Growth'],
    challenge:
      'The airline\'s digital team was structured around functional owners — booking, check-in, loyalty, support — each building independently, each making reasonable local decisions that produced an incoherent whole at the service level. Users experienced this as a broken journey: every section had its own navigation logic, its own visual language, its own assumptions about who the user was. The mandate was not to redesign an app — it was to design a digital business. The target: grow digital bookings from a $2M channel to a $100M revenue stream, reach 100 million annual tourists, and reduce contact centre load through experience quality alone.',
    approach:
      'I reframed the engagement before a wireframe was drawn: this was not a UI problem, it was a service architecture problem. Led experience strategy across 11+ designers in a modular pod structure, where each pod owned a journey node — not a feature. The design strategy defined the business case, the service architecture, and the delivery model first. Research happened in airport lounges and stakeholder sessions — not just surveys — because the friction that mattered most was physical before it was digital.',
    outcome:
      '92% engagement boost. 50x increase in ancillary sales — a category previously buried so deep in the booking flow that most users never encountered it. The pod delivery model outlasted the engagement: it became the standard framework for large-scale design programmes at Accenture ME. The lesson embedded in the outcome: when designers own journeys instead of features, they design for coherence instead of correctness.',
    image: 'https://framerusercontent.com/images/HckfStwSHyARIzjTF82rWioFiQ.png',
    images: [
      'https://framerusercontent.com/images/XdclXe2TkjCYucXmLe1bvrFKc54.jpg',
      'https://framerusercontent.com/images/qkl06LfkK1uSry3boiSM5GdnAI.jpg',
      'https://framerusercontent.com/images/4anqJq7Hkz3MOSyQcH1Rcy7yDdc.png',
    ],
    stats: [
      { label: 'Engagement Boost', value: '92%' },
      { label: 'Add-on Sales', value: '50×' },
    ],
    sections: [
      {
        label: 'Design Strategy',
        heading: 'The booking app was not the product. The passenger journey was.',
        body: 'When a business wants to grow digital revenue 50-fold, every stakeholder sees a booking flow problem. The more important question is: why does the booking flow underperform? In this case, the answer was that the app was one isolated touchpoint in a journey that included airport check-in, cabin crew interactions, loyalty programmes, and support channels — none of which were coherent with each other. Fixing only the app would have optimised the wrong thing.\n\nI reframed the engagement around three interconnected business mandates: conversion growth, revenue transformation, and support reduction. These were not UX metrics — they were business outcomes. This reframe changed what stakeholders asked for. They stopped requesting features and started requesting journeys.',
      },
      {
        label: 'Ecosystem Audit',
        heading: 'Six failure categories. One structural problem.',
        body: 'A comprehensive audit of web and mobile — benchmarked against the wider airline industry — surfaced six failure categories across the passenger experience. But beneath each category was the same root cause: the digital product had been built in functional silos. Booking, manage, check-in, and ancillaries each had their own navigation logic, their own visual language, and their own assumptions about who the user was.\n\nThis was not a design quality problem. It was an organisational structure problem that had produced a product structure problem. The audit made that argument with data.',
        image: 'https://framerusercontent.com/images/XdclXe2TkjCYucXmLe1bvrFKc54.jpg',
        items: [
          {
            title: 'Fragmented navigation',
            description: 'No consistent model for how passengers moved between journeys — every section had to be relearned. Direct cause of abandonment and support escalations.',
          },
          {
            title: 'Disjointed service identity',
            description: 'Visual language built for print, not digital — the brand failed to translate to the contexts where passengers actually used it.',
          },
          {
            title: 'Hidden ancillary value',
            description: 'Add-ons and services were buried — appearing too late in the booking flow, or not at all. The direct cause of the revenue underperformance. Not a discovery problem. An architecture problem.',
          },
          {
            title: 'Inaccessible at scale',
            description: 'No accessibility consideration for one of the region\'s busiest carriers — a significant portion of the passenger base excluded by design inaction.',
          },
        ],
      },
      {
        label: 'Service Architecture',
        heading: 'Pods, journeys, and a delivery model built to scale',
        body: 'The delivery model mirrored the product architecture. A modular pod structure organised 11+ designers around journey nodes — booking, check-in, manage, ancillaries, post-flight — rather than features or components. Each pod operated independently but shared a common design system and a single strategic direction: Effortlessly Simple & Delightful, Innovation at its Core, Building Trust & Connection.\n\nThree-week sprints with tight stakeholder alignment kept the work at the pace the business needed. The sprint cadence was not a process imposition — it was a trust-building mechanism. Showing work frequently reduced the approval cycle and gave the client enough visibility to make decisions without slowing delivery. At 11 designers working in parallel, that structural discipline was the difference between coherence and chaos.',
        image: 'https://framerusercontent.com/images/qkl06LfkK1uSry3boiSM5GdnAI.jpg',
      },
      {
        label: 'Impact',
        heading: '92% engagement. 50× add-ons. A new model for enterprise design delivery.',
        body: 'The 92% engagement boost included the 50x growth in ancillary sales — which had been structurally invisible in the previous architecture. Moving add-ons to the right moment in the journey, with the right framing, was a design decision that translated directly into revenue. No new features. No new product capability. The same content, in the right place, at the right time.\n\nThe pod delivery model became an internal case study for how to structure design at enterprise scale without sacrificing quality or coherence. The core insight: align the delivery model to the service model. The two are not separate problems.',
        image: 'https://framerusercontent.com/images/4anqJq7Hkz3MOSyQcH1Rcy7yDdc.png',
      },
    ],
    highlights: [
      'Framing the engagement as service ecosystem design — not UI redesign — changed what stakeholders requested. They stopped asking for features and started asking for journeys. That shift in how the client talked about the work was the signal that the strategy had landed.',
      'Research conducted at airport lounges surfaced friction that no analytics dashboard could: physical context translated directly into digital design decisions. The most consequential UX insights came from watching passengers navigate check-in desks, not from session recordings.',
      'The 50x increase in ancillary sales came from no new functionality — only from repositioning existing content at the right moment in the journey. This was the clearest proof that architecture is revenue strategy.',
    ],
    testimonial: {
      quote: 'As a leader, Amit focused on developing skills and expanding the competencies of his team, as well as optimising the processes. Amit conducts conversations perfectly — he can listen, and his vast knowledge of UI/UX never left questions unanswered. Amit championed design thinking, putting in the effort to get to know everyone and embed himself into the team culture even during remote working times.',
      name: 'Stepan G.',
      title: 'Design Direction for Saudia, Accenture ME',
    },
  },
  {
    id: 'dnetworx',
    number: '03',
    category: 'Enterprise UX · Telecommunications · Self-Serve',
    title: 'Self-Serve Network Operations — $5M in Operational Savings',
    tagline: 'Turning a technically complex, change-resistant enterprise platform into a self-serve operational capability.',
    role: 'Design Lead',
    timeline: 'Jun 2023',
    domain: 'Telecom · Enterprise Operations',
    tags: ['Enterprise UX', 'Telecommunications', 'Self-Serve', 'Operational Design'],
    challenge:
      'The platform had been built entirely by engineering teams over several years, without design input at any stage. When I arrived, the primary response from technical stakeholders was: "Our users are experts. They don\'t need it simplified." That framing was the real problem. Expert users had spent years developing workarounds for the existing complexity — and had mistaken their adaptations for competence with the system itself. Every network modification for the 70,000+ enterprise customers required multi-team handoffs, buried navigation, and approval chains that existed for no current operational reason. The cost was $5M in overhead that a better-designed system could eliminate.',
    approach:
      'Designed around the principle of operational clarity: give engineers the information and controls they need at the moment they need them, without the cognitive overhead of a system built for maximum configurability. The breakthrough was progressive disclosure — show less upfront without removing anything. Expert users retained full control on demand. Engineers under time pressure saw only what they needed. No capability was removed. The cognitive load dropped significantly. Built trust with change-resistant stakeholders through transparent, sprint-based delivery: weekly reviews where stakeholders could see decisions being made, not just outcomes being presented.',
    outcome:
      '$5M saved — quantified through reduction in support tickets, manual intervention hours, and multi-team escalations that the previous architecture generated systematically. Network modifications that had required three-team handoffs could now be completed in a single self-serve flow. Design maturity was introduced into a technically complex, change-resistant environment — earning executive recognition from Mitesh Shah, Associate Director at Accenture CMT: "customer experience is critical to the company brand, customer retention, and pivot to digital experience."',
    image: 'https://framerusercontent.com/images/TbkqWIhpPg4MPkgmMdeTLzqTvY.png',
    images: [
      'https://framerusercontent.com/images/KcAAacJVkbnKiOmOfZSErrxikA4.png',
      'https://framerusercontent.com/images/4MU9vUq0PITcV5ODrFAhoAbk.png',
      'https://framerusercontent.com/images/C8xzTsG2zVRgkW9pGm53BMfLAYs.png',
      'https://framerusercontent.com/images/4CltnxROdEapC9RNGWaeIf5uWgs.png',
      'https://framerusercontent.com/images/cPjlTYcHUOrB8LroO82lwJY.png',
      'https://framerusercontent.com/images/N3ZexQ0PLpKgFbND3uqNmfTdg.png',
    ],
    stats: [
      { label: 'Cost Savings', value: '$5M' },
      { label: 'Customers', value: '70K+' },
    ],
    sections: [
      {
        label: 'The Operational Problem',
        heading: 'Enterprise complexity that had nowhere to go',
        body: 'The dNetWorX platform served 70,000+ enterprise customers across complex network configurations. Every time an engineer needed to modify a network service — a routine operational task — they navigated a system designed for maximum configurability, not for speed or clarity. Deeply buried navigation, cumbersome approval chains, dense technical language on every screen, and poor performance combined to make a routine task feel like a cross-departmental project.\n\nThe deeper problem: the people closest to the system had adapted to its failures. They had built mental models, workarounds, and tribal knowledge around a system that should have been self-evident. This made the case for change harder — because the dysfunction was invisible to the people most capable of explaining it.',
        image: 'https://framerusercontent.com/images/KcAAacJVkbnKiOmOfZSErrxikA4.png',
      },
      {
        label: 'Design Strategy',
        heading: 'Progressive disclosure in a system that resisted simplification',
        body: 'This surfaced the core tension: removing complexity from an expert system feels like taking something away — even when the thing being taken is unnecessary friction. The experts\' resistance was legitimate. They had invested time in mastering the system. Simplification threatened to invalidate that investment.\n\nProgressive disclosure resolved the tension: show less by default without removing anything. The default state assumed competence without assuming familiarity with this specific interface. Full technical control remained available on demand. First-time users or engineers under time pressure saw only what they needed. Nobody lost anything. The cognitive cost of reading the system dropped for everyone — including the experts who had never consciously noticed it.',
        image: 'https://framerusercontent.com/images/4MU9vUq0PITcV5ODrFAhoAbk.png',
      },
      {
        label: 'Key Design Decisions',
        heading: 'Four interventions that changed the operational model',
        body: 'The information architecture redesign addressed the structural root of the findability problem. Four specific interventions worked together — each targeting a different layer of the operational failure.',
        items: [
          {
            title: 'Surfaced entry points',
            description: 'Clear dNetWorX entry points on the landing page, with direct CTAs for quick navigation. Engineers reached their most common tasks in two actions instead of seven — a change that sounds incremental and compounds over thousands of sessions a day.',
          },
          {
            title: 'Progressive disclosure',
            description: 'Technical configuration details hidden by default, shown on demand. The default state assumed competence without assuming familiarity — the distinction that made experts receptive to the change.',
          },
          {
            title: 'Streamlined access flow',
            description: 'The approval and entitlement flow was redesigned end-to-end. Multi-handoff processes became a navigable, trackable workflow with clear status at every step. The old process had three teams involved. The new one had one.',
          },
          {
            title: 'Plain language for expert users',
            description: 'Replacing jargon with plain language was not about dumbing down — it was about reducing the cognitive cost of reading a dense system at speed. Expert users read faster when the language is clear. That\'s not a UX principle. It\'s cognitive science.',
          },
        ],
        image: 'https://framerusercontent.com/images/4CltnxROdEapC9RNGWaeIf5uWgs.png',
      },
      {
        label: 'Impact',
        heading: '$5M saved. The design standard set.',
        body: 'The $5M saving was not a UX metric. It was an operational outcome — quantified through the reduction in support tickets, manual intervention hours, and three-team escalations that the old architecture had required systematically. Network modifications that previously needed multiple handoffs could now be completed in a single self-serve flow.\n\nThe broader outcome was introducing design maturity into an environment that had not valued it. As Mitesh Shah reflected: "Right from day one, Amit established himself as an expert who understood the Customer Experience journey. This application is external client-facing — 70k+ customers — and customer experience is critical to the company brand, customer retention, and pivot to digital experience."',
        image: 'https://framerusercontent.com/images/N3ZexQ0PLpKgFbND3uqNmfTdg.png',
      },
    ],
    highlights: [
      'Progressive disclosure worked because it respected what expert users already knew — rather than forcing them to relearn a simplified version of their own domain. The framing was never "simpler" — it was "faster to the thing you need."',
      'Trust in a change-resistant environment is earned through transparency, not through persuasion. Weekly sprint reviews with live stakeholder participation built confidence in the direction before any final decisions were required. By the time we presented recommendations, they were not news.',
      'The $5M saving framed design work in operational impact terms — not UX quality. That framing changed how the business valued the engagement. Design that cannot be measured in business outcomes is decoration.',
    ],
    testimonial: {
      quote: 'Right from day one, Amit established himself as an expert who understood the Customer Experience journey. Having understanding of client\'s design standards helped us fast-track building the wireframes, which was key to help visualise various client stakeholders with key features being planned. This application is external client-facing — 70k+ customers — and customer experience is critical to the company brand, customer retention, and pivot to digital experience.',
      name: 'Mitesh Shah',
      title: 'Associate Director, Accenture CMT, US',
    },
  },
  {
    id: 'sap-search',
    number: '04',
    category: 'AI · Enterprise UX · SAP',
    title: 'AI-Powered Search — Contextual Discovery at Enterprise Scale',
    tagline: 'Rethinking how enterprise users find what they need in intelligent systems that understand intent, not just keywords.',
    role: 'Design Lead',
    timeline: '2024–Ongoing',
    domain: 'AI · Enterprise SaaS',
    tags: ['AI', 'Search Design', 'Enterprise UX', 'SAP'],
    challenge:
      'At SAP scale, search was not one problem — it was dozens. Each product had its own legacy search implementation, its own vocabulary, its own assumptions about what users were looking for. This fragmentation had accumulated over years of isolated product decisions, each reasonable locally and incoherent at suite level. Introducing AI-powered search meant solving the fragmentation problem and the trust problem simultaneously: how do you make AI-surfaced results trustworthy to enterprise users who are already sceptical of AI, and who work in systems where an incorrect result has business consequences?',
    approach:
      'I anchored the design around three principles that governed every decision: intent over query (design for what users are trying to accomplish, not the words they typed), contextual relevance over completeness (scope results to what matters in this moment, not everything that matches), and transparent reasoning over magical results (when AI surfaces something, show how it got there). The highest-risk decision was the third — surfacing AI confidence levels to users already sceptical of automation. The instinct was to hide uncertainty. The principle held: hiding uncertainty destroys trust faster than showing it.',
    outcome:
      'Deployed across multiple SAP products as a foundational suite capability. The design standards established here now govern how AI-surfaced discovery works across the SAP suite — setting a consistent expectation for users across hundreds of products about what AI results look like, what confidence means, and what to do when the system does not know. Task completion rates improved measurably for complex cross-module queries that had previously failed users under traditional keyword search.',
    stats: [
      { label: 'Scope', value: 'Suite-wide' },
      { label: 'Scale', value: '300M+ users' },
    ],
    sections: [
      {
        label: 'The Problem',
        heading: 'Enterprise users don\'t search — they hunt',
        body: 'In complex enterprise software, users rarely know the exact name of what they\'re looking for. They know what they\'re trying to accomplish. Traditional keyword search fails this pattern systematically — it requires users to know the system\'s vocabulary before they can find anything in it. The cognitive burden is placed entirely on the user, and the results feel arbitrary to anyone who doesn\'t already know where to look.\n\nAI changes this possibility space, but introduces new design obligations. How do you make AI-surfaced results trustworthy in a domain where users are accountable for the accuracy of the information they act on? How do you handle low-confidence results — present them or withhold them? What does the user need to know about how a result was generated? These were design questions before they were engineering questions.',
      },
      {
        label: 'Design Principles',
        heading: 'Intent over query. Transparency over magic.',
        body: 'Three principles governed every design decision across the search experience — each one a direct response to a specific failure mode of AI search in enterprise contexts.',
        items: [
          {
            title: 'Intent over query',
            description: 'The system was designed to understand what the user was trying to accomplish, not just what words they typed. Suggestions, filters, and results were organised around tasks, not document names.',
          },
          {
            title: 'Contextual relevance',
            description: 'Results were scoped to what was relevant to the user\'s current context — role, module, recent activity. Completeness was less valuable than relevance at the moment of need.',
          },
          {
            title: 'Transparent reasoning',
            description: 'When AI surfaced a result that required explanation, the system showed its reasoning in accessible language. Confidence levels and source attribution were designed into the result format — not added as an afterthought. If the system was uncertain, the design showed it.',
          },
        ],
      },
      {
        label: 'Trust Design',
        heading: 'Designing for the moment AI gets it wrong',
        body: 'Trust in AI search is not built by getting everything right — it is built by being honest about uncertainty. The highest-risk design decisions were the failure states: what happens when the system surfaces a low-confidence result? What happens when it misunderstands the intent?\n\nThe principle was consistent: surface uncertainty explicitly, provide clear paths to refine or correct, and never present a low-confidence result with the same visual weight as a high-confidence one. Enterprise users are not forgiving of systems that pretend to know more than they do — particularly when the cost of acting on a wrong result is a business process error. Honest uncertainty is a design feature, not a limitation.',
      },
      {
        label: 'Impact',
        heading: 'A foundational capability for the intelligent enterprise',
        body: 'The search experience was deployed as a suite-level foundational capability — the first consistent AI-search interaction model across SAP products. The standards created a coherent trust model: users now have a consistent expectation of how AI results behave, regardless of which SAP product they are working in. That consistency is itself a trust signal.\n\nThe most consequential design work was on failure states and low-confidence results — scenarios that received the least engineering attention but had the highest impact on user trust. The principle that emerged: designing the system\'s uncertainty with the same care as its confidence is what separates trustworthy AI from impressive AI.',
      },
    ],
    highlights: [
      'Trust in AI search is a design problem before it is a model problem. The quality of the result matters less than the quality of the design around it — and designing for uncertainty, not just for accuracy, is what makes AI results trustworthy to users with accountability for outcomes.',
      'Designing standards for 300M+ users across dozens of product contexts required establishing principles rather than prescribing interfaces — the design system had to be opinionated about behaviour, not visual form.',
      'The transparent reasoning principle was the hardest to defend internally. Every instinct was to hide uncertainty. The principle held: enterprise users detect evasion faster than uncertainty, and they punish evasion with distrust.',
    ],
  },
  {
    id: 'sap-signin',
    number: '05',
    category: 'Enterprise UX · Design Systems · SAP',
    title: 'Unified Sign-In & Sign-Out — Authentication at Enterprise Scale',
    tagline: 'Harmonising the authentication experience across the SAP product suite — coherent, accessible, and governable at scale.',
    role: 'Design Lead',
    timeline: '2023–2024',
    domain: 'Enterprise SaaS · Design Systems',
    tags: ['Design Systems', 'Authentication', 'Accessibility', 'SAP'],
    challenge:
      'Previous attempts at unifying SAP\'s authentication experience had stalled for a consistent reason: they tried to solve the aesthetic problem without addressing the governance problem. Product teams would adopt a standard and then diverge from it — not out of negligence, but because the standard did not account for their legitimate contextual needs. The result: years of accumulated inconsistency across sign-in flows, error states, session management, and multi-factor patterns, each team having made reasonable local decisions that produced an incoherent whole. Authentication is the first interaction a user has with any product. In a fragmented suite, that first interaction communicates fragmentation.',
    approach:
      'I approached this as a systems design problem, not a UI problem. The most important design decision was the distinction between what had to be universal and what could legitimately vary. Core interaction patterns — credential entry, error handling, session management, multi-factor flows — were standardised completely. Contextual elements — product branding, entry point placement, scenario-specific variants — remained flexible within defined parameters. Without this distinction, standardisation either fails (too rigid) or produces no coherence (too flexible). Accessibility was a first-class design constraint from the start, not a compliance retrofit.',
    outcome:
      'A unified authentication experience shipped across the SAP suite — the first consistent first-interaction for users navigating across hundreds of products. WCAG AA compliance was achieved across all touchpoints, reached by designing accessibility in at the component level rather than auditing it at the end. Authentication-related support tickets dropped measurably. The governance model created a sustainable path for maintaining coherence as the suite evolves — the structural change that prevented previous standardisation attempts from holding.',
    stats: [
      { label: 'Accessibility', value: 'WCAG AA' },
      { label: 'Scope', value: 'Suite-wide' },
    ],
    sections: [
      {
        label: 'The Systems Problem',
        heading: 'A thousand login screens. Zero coherent experience.',
        body: 'Authentication is the first interaction a user has with any product. In a fragmented suite, that first interaction communicates fragmentation — and users notice in ways they cannot always articulate. The problem was not aesthetic. It was architectural: each product team had made reasonable local decisions that, at suite scale, produced an incoherent whole.\n\nThe previous standardisation efforts had failed for a consistent reason: they prescribed a visual standard without establishing a governance model. Teams adopted the standard and then diverged — because the standard did not account for their legitimate variation needs. Fixing individual screens would not address this. Only a systems-level intervention that distinguished universal from contextual would.',
      },
      {
        label: 'Design Approach',
        heading: 'Standardise the behaviour. Flex the context.',
        body: 'The core design decision: establish what must be identical everywhere and what can legitimately vary. This distinction was more consequential than any visual decision in the project.\n\nCore interaction patterns — credential entry, error handling, session management, multi-factor flows, accessibility behaviour — were standardised completely. Contextual elements — product branding, entry-point placement, the specific variant scenarios each product needed — were accommodated within a defined parameter set. Variable, but bounded. The governance model was part of the design: a review and contribution process so product teams could propose variants without fragmenting the system. Standards without governance do not survive enterprise scale.',
        items: [
          {
            title: 'Universal standards',
            description: 'Core authentication patterns, error states, accessibility requirements, and session management behaved identically across every product — creating a consistent mental model regardless of entry point.',
          },
          {
            title: 'Contextual flexibility',
            description: 'Product-specific branding contexts, entry-point placements, and scenario variants were accommodated within a defined component system. Variable within bounds — the distinction that made the standard adoptable.',
          },
          {
            title: 'Governance model',
            description: 'A review and contribution process was established so product teams could propose variants without fragmenting the system. The governance model was the mechanism that would allow the standard to hold over time.',
          },
          {
            title: 'Accessibility as constraint',
            description: 'WCAG AA compliance was designed in at the component level — colour contrast, keyboard navigation, screen reader behaviour, and focus management specified before any visual refinement. Problems caught in design cost a fraction of problems caught in audit.',
          },
        ],
      },
      {
        label: 'Impact',
        heading: 'Coherence at suite scale — a structural achievement',
        body: 'The unified authentication experience shipped across the SAP suite — establishing a consistent first-interaction for users across hundreds of products. Support tickets dropped. WCAG AA compliance was achieved across all touchpoints.\n\nThe governance model was the durability mechanism. Without it, this project would have followed the same trajectory as its predecessors: initial adoption, gradual divergence, accumulated inconsistency. The structural change — the distinction between universal and contextual, supported by a contribution process — is what will prevent the fragmentation patterns from recurring.',
      },
    ],
    highlights: [
      'Authentication design at suite scale is a governance problem as much as a design problem. The standards work is only as durable as the process that maintains them — and that process is itself a design decision.',
      'Treating accessibility as a design constraint rather than a compliance checklist changed what was built. Every interaction was designed with keyboard and screen reader behaviour in mind from the start — problems were caught during design, not during audit, at a fraction of the cost.',
      'The most valuable insight was the universal/contextual distinction. Previous unification attempts had failed by trying to standardise everything — including the elements that legitimately needed to vary. Identifying that boundary was the design breakthrough.',
    ],
  },
  {
    id: 'sap-agentic',
    number: '06',
    category: 'Agentic AI · Enterprise · SAP',
    title: 'Agentic AI for Order Confirmation — Autonomous Enterprise Workflows',
    tagline: 'Designing the human-AI relationship in autonomous systems where agents act, escalate, and require oversight.',
    role: 'Design Lead',
    timeline: '2024–Ongoing',
    domain: 'Agentic AI · Enterprise Operations',
    tags: ['Agentic AI', 'Automation', 'Enterprise UX', 'SAP'],
    challenge:
      'The business process team had designed the automation logic before design was brought in. The initial brief was to "add a UI" to the agent\'s actions — treat design as presentation of an already-determined system. I reframed the brief: the UI was not cosmetic. It was the mechanism by which humans could trust and oversee the agent. That conversation changed the scope of the work. Agentic AI systems act autonomously — completing tasks, making decisions, orchestrating workflows without waiting for human instruction at each step. The design question was not how to present information. It was how to design the relationship between human authority and AI autonomy in a system processing millions of business-critical transactions.',
    approach:
      'Designed the experience around a single governing principle: human oversight is not an escape hatch — it is the product. Every autonomous action was designed to be observable, interruptible, and auditable. The agent\'s reasoning was surfaced at the right level: enough to build trust, not so much that it created the information overload that defeats the purpose of automation. The communication hierarchy governed what overseers saw by default versus on demand — completed high-confidence actions as a concise log, boundary decisions with visible reasoning, escalations as high-priority interruptions with full context upfront.',
    outcome:
      'Deployed in production for enterprise order confirmation workflows. Manual confirmation overhead dropped measurably. Zero increase in error rates compared to fully manual processes — the critical proof point that human oversight, when designed correctly, catches what needs catching without adding friction to everything else. The design framework is being extended to other agentic use cases across the SAP suite, establishing the vocabulary and interaction model for agentic AI at enterprise scale.',
    stats: [
      { label: 'Model', value: 'Agentic AI' },
      { label: 'Scope', value: 'Enterprise Ops' },
    ],
    sections: [
      {
        label: 'The Design Challenge',
        heading: 'When the AI acts first and explains later',
        body: 'In agentic systems, the user is no longer the primary actor. The agent processes orders, makes matching decisions, flags exceptions, and escalates only what requires human judgment. The user\'s role shifts from operator to overseer — a fundamentally different cognitive posture that most enterprise UX patterns are not designed for.\n\nThis shift creates a new design obligation: the interface must communicate what the agent did, why it made each decision, and what still requires human attention — without overwhelming the overseer with information the agent was specifically designed to handle independently. Too much information defeats the purpose of automation. Too little information destroys trust. The design problem is calibrating that boundary, in real time, across thousands of transaction types.',
      },
      {
        label: 'Design Principles',
        heading: 'Three principles for human-AI collaboration in autonomous systems',
        body: 'The design framework was built around three principles that governed every decision — each one addressing a specific failure mode of agentic AI in enterprise contexts.',
        items: [
          {
            title: 'Show the outcome, surface the reasoning',
            description: 'The primary interface surfaced what the agent decided, not every step it took. Reasoning was available on demand — not by default — for users who needed to audit or verify. The distinction between surfacing and hiding reasoning is the difference between oversight and noise.',
          },
          {
            title: 'Design for the exception, not the average',
            description: 'The agent handled routine cases autonomously. Design priority went to exceptions — the moments when something fell outside the confidence threshold and human judgment was required. These moments received the greatest design care because they were the moments that determined whether users trusted the system.',
          },
          {
            title: 'Human authority is always present',
            description: 'Every autonomous action could be reviewed, reversed, or overridden — effortlessly, as a normal part of the overseer\'s workflow, not as an emergency escape valve. Designing the override as a routine interaction, not an edge case, was the principle that made the system trustworthy.',
          },
        ],
      },
      {
        label: 'Orchestration Design',
        heading: 'Designing the agent\'s voice — how a system communicates autonomy',
        body: 'One of the most novel design challenges in agentic systems is communication hierarchy: the agent needs to explain what it did without becoming a constant source of noise. The design framework established three communication tiers:\n\n— Completed actions with high confidence: surfaced as a concise log, not a notification stream. Overseers scan, not read.\n— Decisions near the confidence boundary: surfaced prominently, reasoning visible, action required.\n— Escalations requiring human judgment: treated as high-priority interruptions, full context provided upfront, no hunting for information.\n\nThis hierarchy meant overseers could calibrate their attention to the actual risk level of each event — the design condition that prevents the alert fatigue that makes AI-augmented workflows fail in practice.',
      },
      {
        label: 'Impact',
        heading: 'A new model for enterprise human-AI collaboration',
        body: 'The order confirmation system shipped in production — processing enterprise transactions with measurable reductions in manual overhead and zero increase in error rates. The zero-increase in errors was the critical proof point: human oversight, when designed correctly, does not slow the system down. It catches what needs catching without adding friction to everything else.\n\nThe design framework established for this project is being extended to other agentic use cases across the SAP suite. The most significant outcome was conceptual: the project demonstrated that the right design model for agentic AI is not "AI that helps humans" but "humans who oversee AI" — a different product philosophy that demands a different design approach.',
      },
    ],
    highlights: [
      'The most important design decision in agentic systems is what the agent does NOT show. Filtering the right information out of the primary interface is as consequential as deciding what to surface — information overload and information deficit both destroy trust, just differently.',
      'Human override mechanisms are not edge case features — they are core to the trust model. Designing them with the same care as the primary interaction was a non-negotiable principle from the start.',
      'The project forced a new vocabulary for agentic design at SAP: supervision, exception handling, confidence surfacing, escalation design. These concepts, developed here, are now part of the broader agentic AI design framework being applied across the suite.',
    ],
  },
]
