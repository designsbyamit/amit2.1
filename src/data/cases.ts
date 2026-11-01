// Leadership cases: compact, evidence-labelled accounts. Longer first-person stories live in ./leadership.ts.
// Rule: nothing is stated here that Amit has not said himself. Outcomes are the team's.

export interface Outcome { label: string; text: string }
export interface Beat { label: string; text: string }
export interface Practice {
  title: string
  forWhom: string
  problem: string
  whenToUse: string
  steps: { title: string; text: string }[]
  signals: string[]
  failureModes: string[]
}

export interface LeadershipCase {
  slug: string
  number: string
  title: string
  subtitle: string
  claim: string
  strip: { label: string; value: string }[]
  strands: { people: string; craft: string; business: string }
  beats: Beat[]
  outcomes: Outcome[]
  practice: Practice
  next: { title: string; steps: string[] }
  account: string[]
  lesson: string
}

export const cases: LeadershipCase[] = [
  {
    slug: 'ai-experimentation-to-capability',
    number: '01',
    title: 'From AI experimentation to an organisational capability',
    subtitle: 'Building the people, practices and tools to turn an emerging technology into design and business opportunity.',
    claim: 'Adopting a new tool is not the same as building a capability. A team needs a way to learn, experiment, capture what it knows and apply it, and the leader’s job is to build that, not to arrive with the answers.',
    strip: [
      { label: 'Role', value: 'Design leader guiding a group of fresh interns' },
      { label: 'Year', value: '2024' },
      { label: 'Team', value: '10 interns, over 3 months' },
      { label: 'Domain', value: 'Generative AI in the design process; banking, retail and manufacturing use cases' },
    ],
    strands: {
      people: 'Ten fresh interns grew through real work: design skills, soft skills, industry understanding and familiarity with emerging technology. The interns went on to full-time roles.',
      craft: 'Reviews, flows and solution approaches were refined with the designers as the proofs of concept developed.',
      business: 'Use cases across banking, retail and manufacturing, and conversational-commerce solutions that reached customers including Reliance and Walmart.',
    },
    beats: [
      { label: 'The problem', text: 'Generative AI was emerging, with no established practices and few clear answers. The ambition was to change how design is practised and to find real business use, with a group of fresh interns.' },
      { label: 'The insight', text: 'Ad hoc experimentation would not be enough. The team needed a structured way to learn, test ideas, capture knowledge and translate it into applications. I had to learn enough to give direction, and accept that we would find much of the answer together.' },
      { label: 'What I did', text: 'Set up collaborative research, peer learning, a growing knowledge library, and sprint-based roadmaps with OKRs. Turned a broad ambition into manageable work. Worked with the designers on flows, designs and solution approaches, and held regular reviews.' },
      { label: 'The trade-off', text: 'Enough structure for people to make progress, without closing exploration down too early.' },
      { label: 'What changed', text: 'We produced a GenAI learning portal, a design-process toolkit with a tool stack, a use-case repository and proofs of concept, and both the portal and the toolkit were adopted. Conversational commerce became one concrete route from exploration to customer solutions. The interns grew across craft, interpersonal skills, industry knowledge and technology, and moved into full-time roles.' },
    ],
    outcomes: [
      { label: 'Capability', text: 'A GenAI learning portal for designers and a design-process toolkit with a tool stack for each stage. Both were adopted.' },
      { label: 'Use cases', text: 'A repository of business use cases, with 2\u20134 use cases developed in each of banking, retail and manufacturing, and proofs of concept to test them.' },
      { label: 'Customers', text: 'Conversational-commerce solutions that reached customers including Reliance and Walmart.' },
      { label: 'People', text: 'Ten fresh interns, over three months, grew in design skills, soft skills, industry understanding and familiarity with emerging technology. They moved into full-time roles and kept growing, and told us they came to value working together.' },
    ],
    practice: {
      title: 'Build the capability. Grow the people. Apply the learning.',
      forWhom: 'Design leaders taking a team into an emerging technology with no playbook',
      problem: 'Teams get access to new tools but not a way to learn from them, so knowledge stays in individual heads and experiments never reach a real problem.',
      whenToUse: 'When the domain is moving faster than established practice, and the team is early in career or new to the area.',
      steps: [
        { title: 'Create the learning environment', text: 'Give people a shared direction, access to knowledge and a structured way to experiment.' },
        { title: 'Develop people through real work', text: 'Combine hands-on coaching and regular reviews with room for the team to own their thinking, decisions and presentations.' },
        { title: 'Connect exploration to application', text: 'Turn what the team learns into reusable assets, testable solutions and chances to solve real problems.' },
      ],
      signals: [
        'People can explain why they made a design decision, not just what they made.',
        'Findings are captured in a shared place and reused by someone else.',
        'Each experiment names the design question or business problem it serves.',
      ],
      failureModes: [
        'No learning agenda: the team plays with tools and nothing accumulates.',
        'The leader supplies every answer, so the team never builds its own judgement.',
        'Experiments never meet a real user or business problem.',
      ],
    },
    next: {
      title: 'Where I would take it next',
      steps: [
        'Learn systematically: a learning agenda, foundational knowledge, research sources, a shared library.',
        'Experiment with intent: hypotheses, small experiments, documented learning tied to a question.',
        'Build reusable assets: frameworks, toolkits, patterns, reference implementations.',
        'Validate business relevance: prioritise real problems, test through proofs of concept, define what is needed to move into projects.',
        'Scale what works: capture lessons from adoption, improve the assets, make it repeatable across teams.',
      ],
    },
    account: [
      'When generative AI began emerging as a new design opportunity, I saw a chance to explore how it could evolve the design process and unlock meaningful business use cases.',
      'I took on the challenge of building this capability with a group of fresh interns in a domain where established practices and clear answers were still limited. Before I could guide the team, I needed to build enough foundational knowledge to provide direction while accepting that we would discover much of the answer together.',
      'I established a structured approach to learning and experimentation through collaborative research, peer learning, a growing knowledge library, and sprint-based roadmaps with OKRs. We progressively turned an ambiguous opportunity into manageable work.',
      'The initiative produced a GenAI learning portal for designers, a design-process toolkit and framework, a tool stack for different stages of the design process, and a repository of potential business use cases initially focused on banking and retail.',
      'We also developed proofs of concept. One example was conversational commerce, with solutions sold to customers including Reliance and Walmart. I worked alongside the designers to refine flows, develop solution approaches, improve designs, present proofs of concept, and review their work as it progressed.',
      'But the outcome I value most is not limited to the assets we created or the customer opportunities we explored. It is the growth of the people involved.',
      'The interns developed their design skills, soft skills, understanding of industry work, and familiarity with emerging technology. AI was an especially exciting area for them to explore. Their feedback also reflected how our working relationship evolved: they came to value me deeply as a leader.',
      'The experience reinforced a principle I carry into leadership: when you enter unfamiliar territory, you don’t need to have every answer. You need the patience to learn, the resilience to keep moving, and the ability to create enough structure for people to learn, contribute and grow together.',
    ],
    lesson: 'In unfamiliar territory you don’t need every answer. You need the patience to learn, the resilience to keep moving, and enough structure for people to learn, contribute and grow together.',
  },
]

export const caseBySlug = (slug?: string) => cases.find(c => c.slug === slug)
