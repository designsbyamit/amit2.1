// Content for Leading Design, chapter 4: Elevating design quality at the organisation (design excellence).
// Written in a generic voice so it travels across organisations. One idea runs through it: two horizons, protecting today's excellence and creating tomorrow's.
import type { HiringDoc } from './hiring'
import type { Point } from './leadingDesignGrowth'

export const chapterFour = {
  intro: [
    'Quality in a design organisation does not fall in one place. It falls between teams: one team tests with users, another reviews internally, a third moves fast under delivery pressure. Each is reasonable on its own. Together they produce experiences that feel as if different companies made them.',
    'This chapter is about holding one standard across all of it, and about raising that standard over time. It is built on five pillars and two horizons. One horizon protects what you ship today. The other explores what you should build next. Collaboration is how both get done.',
  ],
  outcomes: [
    'A clear picture of quality, consistency and release assurance across teams',
    'Three levels of review, five gates and a scorecard reviewers can share',
    'A small, protected future team with a pipeline from idea to product',
    'A calendar that gives both horizons the time they need',
    'Eight editable worksheets, each with a filled example',
  ],

  pillars: {
    lead: 'Five pillars describe design excellence at scale. The first four are what the organisation needs to achieve. The fifth is how it achieves them.',
    items: [
      { n: '01', name: 'Design quality', text: 'Raising the craft, usability, accessibility and execution standard of every experience.', kind: 'Outcome' },
      { n: '02', name: 'Consistency and harmonisation', text: 'Creating coherent experiences across products, workflows, scenarios and touchpoints.', kind: 'Outcome' },
      { n: '03', name: 'Excellence reviews and release assurance', text: 'Quality gates that make sure experiences meet the standard before they launch.', kind: 'Outcome' },
      { n: '04', name: 'Future forward and experience innovation', text: 'Exploring the north-star experience, trying what is newly possible and creating the next generation of solutions.', kind: 'Outcome' },
      { n: '05', name: 'Collaborative design practice', text: 'Shared ownership, cross-functional partnership and knowledge exchange in every other pillar.', kind: 'Enabler' },
    ],
    now: { title: 'Protect today’s excellence', tag: 'Now', text: 'Everything we ship meets the quality and experience standard.', bullets: ['Quality assurance', 'Consistency', 'Release readiness', 'Experience integrity'] },
    next: { title: 'Create tomorrow’s excellence', tag: 'Next', text: 'Explore, experiment and establish the next generation of experiences.', bullets: ['Foresight', 'North-star vision', 'Experimentation', 'Innovation and scale'] },
    culture: 'One shared design quality culture connects both horizons: craft, understanding of customers, consistency and collaboration.',
    points: [
      { title: 'Protect the promise, then extend it', text: 'A great design organisation is as good at guarding what it ships today as at imagining what it could ship tomorrow. One protects the experience promise. The other expands it.', ask: 'Write one sentence on what each horizon means for your team.' },
      { title: 'Collaboration is how, not what', text: 'Collaboration is not another outcome to measure. It is the way the four outcomes get done, so build it into each of them instead of running a separate programme.', ask: 'Pick one pillar and name the collaboration that holds it up.' },
    ] as Point[],
  },

  basics: {
    lead: 'The first two pillars are the foundation: a quality standard people share, and experiences that hold together across products.',
    points: [
      { title: 'Quality is a standard, not a taste', text: 'If quality means what the most senior person likes, it will move with the person. Write down what good looks like in usability, accessibility, craft, content and edge cases, and score against it.', ask: 'List the six areas you would score a flow on.' },
      { title: 'Fix the pattern, not the person', text: 'When several teams repeat the same weakness, that is a gap in the organisation, not in five designers. Look for the pattern before you coach the individual.', ask: 'Find one issue that keeps recurring and ask what is missing in the system.' },
      { title: 'Follow the journey, not the org chart', text: 'People cross products without noticing the boundaries. Check consistency along the journey they take, and agree on terms, patterns and flows once.', ask: 'Walk one real customer journey across two products and note every difference.' },
      { title: 'Some differences are right', text: 'Consistency is not sameness. A dense table for analysts may be better than a spacious one for occasional users. Record deliberate differences, so they stop looking like mistakes.', ask: 'Name one difference that you would keep on purpose.' },
    ] as Point[],
  },

  reviews: {
    lead: 'In a large organisation, many teams ship many things at once. Even with good designers and a design system, quality varies. Excellence reviews are the independent check that makes it less so, without turning the manager into a bottleneck.',
    challenge: 'How do you make sure every experience being released meets a consistent standard, whichever team, product or designer made it?',
    points: [
      { title: 'A review protects the customer, not the organisation', text: 'A good review improves the work and helps the next team avoid the same mistake. If it feels like a defence against criticism, it has lost its purpose.', ask: 'Ask your last reviewed team what they would change about the process.' },
      { title: 'Match the scrutiny to the stakes', text: 'A small change to a familiar component should not face the same scrutiny as a new customer journey. Define clearly which features enter which level.', ask: 'Write the criteria for what counts as a major journey in your organisation.' },
      { title: 'Never waive the critical issues', text: 'Serious usability, accessibility, security-related or functional problems are not traded away because a date is close. Say this before the pressure arrives.', ask: 'Agree with your product partners which kinds of issue are never waived.' },
      { title: 'Separate design failure from trade-off', text: 'Not every deviation is a design failure. Some are engineering constraints, some are product decisions. Understand each, and accept the meaningful ones on purpose.', ask: 'Record who accepted each deviation, and why.' },
    ] as Point[],
    dimensionsLead: 'Evaluate every significant feature on the same five dimensions, whatever the product.',
    dimensions: [
      { name: 'Problem and customer value', q: 'Are we solving the right problem?', text: 'Problem clarity, relevance and customer needs.' },
      { name: 'Experience quality', q: 'Is this a genuinely good experience?', text: 'Usability, simplicity, completeness and accessibility.' },
      { name: 'Design craft', q: 'Is the execution at the expected standard?', text: 'Visual quality, interaction design and attention to detail.' },
      { name: 'Consistency and harmonisation', q: 'Does it feel like part of our ecosystem?', text: 'Shared patterns, terminology and behaviour across products.' },
      { name: 'Implementation readiness', q: 'Will what ships match what was designed?', text: 'Feasibility, design-to-code parity and edge-case coverage.' },
    ],
    levelsLead: 'Three levels of review, so scrutiny follows complexity.',
    levels: [
      { n: 1, name: 'Standard review', cx: 'Low complexity', fits: 'Minor enhancements, familiar workflows, changes using established patterns.', does: ['Peer review by another designer', 'Design-system compliance', 'Accessibility and interaction checks', 'Design QA before release'], owner: 'The project design lead or a peer reviewer' },
      { n: 2, name: 'Experience review', cx: 'Medium complexity', fits: 'Significant feature changes, new workflows, changes that touch several touchpoints.', does: ['A structured experience-quality assessment', 'Usability and scenario validation', 'Consistency and harmonisation review', 'A cross-functional design review'], owner: 'A senior designer, design manager or experience reviewer' },
      { n: 3, name: 'Excellence review', cx: 'High complexity', fits: 'New product experiences, major journeys, cross-product capabilities, AI-driven interactions and strategic initiatives.', does: ['An independent expert review', 'Customer validation and evidence', 'End-to-end journey evaluation', 'Design-system and ecosystem impact', 'Implementation readiness, with escalation where needed'], owner: 'An excellence panel or central design leadership' },
    ],
    gatesLead: 'Reviews run as a structured process, not an informal conversation. The first three gates can happen before development is finished, which spares you from finding fundamental problems at the last minute.',
    gates: [
      { n: 1, name: 'Problem validation', q: 'Is the problem well understood? Are customer needs, use cases and intended outcomes clear?', when: 'Before development' },
      { n: 2, name: 'Experience validation', q: 'Is the experience intuitive, complete, usable and accessible? Have the relevant scenarios been considered?', when: 'Before development' },
      { n: 3, name: 'Design excellence validation', q: 'Does it meet visual, interaction, content and design-system standards, and fit the wider ecosystem?', when: 'Before development' },
      { n: 4, name: 'Implementation validation', q: 'Does the build reflect the approved design? Are critical deviations, edge cases and accessibility issues resolved?', when: 'During implementation' },
      { n: 5, name: 'Release readiness', q: 'Are the quality criteria met? Are remaining issues documented, owned and on an acceptable plan?', when: 'Before release' },
    ],
    outcomesLead: 'Every review ends in a documented decision.',
    outcomes: [
      { name: 'Approved', meaning: 'Meets the required quality bar.', next: 'Proceed.' },
      { name: 'Approved with actions', meaning: 'Minor, non-critical improvements remain.', next: 'Proceed with tracked actions.' },
      { name: 'Rework required', meaning: 'Significant experience gaps were found.', next: 'Address them and return for review.' },
      { name: 'Escalation required', meaning: 'Major risk, unresolved conflict or strategic impact.', next: 'A leadership decision.' },
    ],
    panelLead: 'For a central design organisation, a small rotating group of experienced practitioners works better than making every review depend on the manager. The panel evaluates, challenges and guides. It does not design solutions for other teams.',
    panel: [
      { role: 'Design excellence lead', does: 'Owns the review method and the quality bar' },
      { role: 'Senior design representatives', does: 'Judge interaction, visual and experience quality' },
      { role: 'Design-system representative', does: 'Looks at pattern use and deviations' },
      { role: 'Accessibility specialist', does: 'Looks at inclusive experience' },
      { role: 'Product representative', does: 'Checks customer and business goals' },
      { role: 'Engineering representative', does: 'Checks readiness to build' },
    ],
    principles: ['Rotate reviewers to spread expertise', 'Use one shared rubric', 'Document decisions and recurring gaps', 'Allow asynchronous submission', 'Review only what needs that level of scrutiny', 'Track repeat issues across products to find systemic problems', 'Keep turnaround predictable'],
    metricsLead: 'Judge the review mechanism too.',
    metrics: [
      { name: 'First-pass approval rate', tells: 'How consistently teams meet the standard before review' },
      { name: 'Critical issues found before release', tells: 'Whether reviews catch what matters' },
      { name: 'Experience defects after release', tells: 'Whether quality gaps are reaching customers' },
      { name: 'Rework caused by experience gaps', tells: 'The cost of finding things late' },
      { name: 'Review turnaround time', tells: 'Whether governance is slowing delivery' },
      { name: 'Repeat issue rate', tells: 'Whether teams learn from feedback' },
      { name: 'Design-system deviations', tells: 'Whether shared standards are being adopted' },
    ],
    caution: 'Do not aim for 100% first-pass approval. It can push reviewers to lower their standards. Look for fewer recurring issues, fewer defects that reach customers and faster resolution.',
  },

  future: {
    lead: 'Most design organisations are built around the roadmap. Teams receive requirements, solve problems and ship. That is necessary, and it carries a risk: the organisation gets very good at improving what exists and less good at imagining what should.',
    challenge: 'If we were designing this experience from scratch today, knowing what we know about technology and changing expectations, what would we create?',
    points: [
      { title: 'Protect the time, or it will not exist', text: 'Delivery will always win against exploration unless time is set aside. Give the work a calendar, a small team and an owner.', ask: 'Find two protected days a month and put them in diaries.' },
      { title: 'Ideas without a route are decoration', text: 'A future team that makes only concept decks has little effect. Every idea needs a path into products, patterns or roadmaps.', ask: 'For your last concept, name the team that could adopt it.' },
      { title: 'A failed experiment is a result', text: 'An experiment that disproves an assumption stops the organisation from investing in the wrong direction. Reward the learning, not only the wins.', ask: 'Ask your team for an experiment that failed, and what it saved.' },
      { title: 'Not a closed club', text: 'The future team should involve different people depending on the subject. Keep the door open so ideas stay grounded and adopted.', ask: 'Invite someone from outside design to your next signals review.' },
    ] as Point[],
    respLead: 'A small, focused group, often called a future experience lab or north-star studio, has four responsibilities. The name matters less than the mandate.',
    resp: [
      { name: 'Envision', text: 'Imagine the future state of customer experiences and challenge current assumptions.', does: ['Define north-star concepts', 'Explore future journeys', 'Identify new interaction models', 'Challenge existing paradigms'] },
      { name: 'Experiment', text: 'Turn ideas into testable prototypes and small experiments.', does: ['Build interactive prototypes', 'Explore AI and agentic experiences', 'Test new interaction patterns', 'Check assumptions with customers'] },
      { name: 'Validate', text: 'Find which ideas have real customer, technical and business potential.', does: ['Test desirability', 'Assess feasibility', 'Evaluate business relevance', 'Identify risks and dependencies'] },
      { name: 'Incubate and scale', text: 'Move promising concepts towards adoption by product teams.', does: ['Create proofs of concept', 'Develop reusable patterns', 'Find integration opportunities', 'Hand validated concepts to delivery teams'] },
    ],
    territoriesLead: 'Give the work an agenda of five territories. Revisit them as strategy changes. Do not limit exploration to AI: the next big gain may be a simpler workflow.',
    territories: [
      { name: 'Future of interaction', text: 'New ways people interact with digital products.', eg: 'Conversational, multimodal, voice and spatial interfaces' },
      { name: 'AI-native experiences', text: 'Experiences built around what AI can do.', eg: 'Intelligent search, copilots, autonomous agents' },
      { name: 'Experience simplification', text: 'Rethinking complex workflows.', eg: 'Fewer steps, proactive help, predictive workflows' },
      { name: 'Future of work', text: 'How roles and behaviours may change.', eg: 'People and agents working together, adaptive workspaces' },
      { name: 'Ecosystem experiences', text: 'How products work together as one.', eg: 'Shared intelligence, continuity of context, unified journeys' },
    ],
    pipelineLead: 'The most important part is a pipeline that turns thinking into experiments, and experiments into products.',
    pipeline: [
      { n: 1, name: 'Signal discovery', verb: 'Explore', text: 'Find emerging customer needs, shifts in the market, technology and gaps in experience.', out: 'An opportunity brief' },
      { n: 2, name: 'North-star vision', verb: 'Imagine', text: 'Define what an exceptional future experience could be. Describe the desired future, not only the next feature.', out: 'A narrative, a journey and a concept' },
      { n: 3, name: 'Rapid experimentation', verb: 'Prototype', text: 'Make light prototypes and demonstrations, and test the assumptions that matter most.', out: 'A working prototype and evidence' },
      { n: 4, name: 'Validation and incubation', verb: 'Validate', text: 'Test with customers, check feasibility and find the business value. Refine.', out: 'A validated concept and a proposal for adoption' },
      { n: 5, name: 'Productisation and scale', verb: 'Adopt', text: 'Work with product teams to bring proven concepts into products, patterns and roadmaps.', out: 'A product initiative, a pattern or a capability' },
    ],
    modelsLead: 'There are two ways to staff it, and the best answer is usually a mix.',
    models: [
      { name: 'A dedicated core team', pros: ['Sustained focus', 'Clear accountability', 'Steady experimentation skill', 'Future-facing expertise that builds up'], cons: ['Drifting from product reality', 'Being seen as a concept factory', 'Ideas delivery teams cannot adopt'] },
      { name: 'A distributed network', pros: ['Wider product knowledge', 'Closer to real customer problems', 'More chances of adoption', 'Shared responsibility'], cons: ['Delivery priorities compete', 'Scattered exploration', 'No dedicated capacity'] },
    ],
    hybrid: 'A hybrid model works best: a small central team that owns the exploration portfolio and method, supported by exploration champions in each product team who keep the ideas grounded.',
    lab: [
      { role: 'North-star lead', does: 'Vision, strategic alignment and the exploration portfolio' },
      { role: 'Experience strategist', does: 'Trends, foresight and customer opportunities' },
      { role: 'Experience designer', does: 'North-star journeys and interaction concepts' },
      { role: 'Creative technologist', does: 'Prototyping, AI and emerging technology' },
      { role: 'Research partner', does: 'Validation and experiments' },
      { role: 'Exploration champions', does: 'People from product teams who bring ideas, domain knowledge and routes to adoption' },
    ],
    labNote: 'An illustrative shape. Roles can be shared or part time, depending on capacity.',
    calendarLead: 'Protect time on the calendar. Without it, delivery wins every week.',
    calendar: [
      { name: 'Future signals review', what: 'Discuss emerging technology, market trends and customer shifts', cadence: 'Monthly' },
      { name: 'North-star jam', what: 'Imagine experiences that are far better than today’s', cadence: 'Monthly' },
      { name: 'Experience experiment sprint', what: 'Build and test a small concept', cadence: 'Two to four weeks' },
      { name: 'Future experience showcase', what: 'Show prototypes and what was learned', cadence: 'Monthly' },
      { name: 'Innovation portfolio review', what: 'Decide which experiments to advance', cadence: 'Quarterly' },
      { name: 'North-star strategy review', what: 'Revisit the vision and its relevance', cadence: 'Half-yearly' },
    ],
    metricsLead: 'Do not judge a future team by features shipped. Its job is to create options and reduce uncertainty before large investment.',
    metrics: [
      { name: 'Opportunities identified', tells: 'The breadth of relevant exploration' },
      { name: 'Experiments run', tells: 'The ability to turn ideas into tests' },
      { name: 'Assumptions validated', tells: 'The reduction in uncertainty' },
      { name: 'Customer validation', tells: 'Evidence of desirability' },
      { name: 'Concepts adopted by product teams', tells: 'Influence on product direction' },
      { name: 'Experiment-to-adoption rate', tells: 'How well the pipeline works' },
      { name: 'Reusable patterns created', tells: 'Value beyond a single experiment' },
      { name: 'Strategic opportunities influenced', tells: 'Contribution to long-term differentiation' },
    ],
    caution: 'Do not reward a high experiment-to-adoption rate on its own. It can discourage ambitious work. Learning, including validated disconfirmation, is a valuable outcome.',
  },

  together: {
    lead: 'Collaboration is not one more pillar to measure. It is the way every pillar works.',
    rows: [
      { pillar: 'Design quality', how: 'Peer critique, expert review and design pairing' },
      { pillar: 'Consistency', how: 'Cross-product councils and clear ownership of patterns' },
      { pillar: 'Excellence reviews', how: 'Independent reviewers, with product and engineering taking part' },
      { pillar: 'Future forward', how: 'Exploration champions, partnerships and cross-team experiments' },
    ],
    calendarLead: 'Reviews follow releases. Exploration follows its own calendar. Both need an owner.',
    calendar: [
      { name: 'Design critique', cadence: 'Weekly', owner: 'Design leads' },
      { name: 'Design quality assessment', cadence: 'At project milestones', owner: 'Design leads' },
      { name: 'Experience review', cadence: 'Every two weeks', owner: 'Senior designers' },
      { name: 'Excellence and release reviews', cadence: 'Before significant releases', owner: 'The excellence panel' },
      { name: 'Harmonisation review', cadence: 'Monthly', owner: 'Central experience owners' },
      { name: 'Future signals review and north-star jam', cadence: 'Monthly', owner: 'The future experience lab' },
      { name: 'Experiment sprint', cadence: 'Every two to four weeks', owner: 'Exploration champions' },
      { name: 'Future experience showcase', cadence: 'Monthly', owner: 'The future experience lab' },
      { name: 'Design excellence health check', cadence: 'Quarterly', owner: 'Design leadership' },
      { name: 'Innovation portfolio review', cadence: 'Quarterly', owner: 'North-star lead and leadership' },
    ],
    close: 'The review mechanism makes sure you never compromise your standards as you scale. The future mechanism makes sure you never grow comfortable with the standards you have reached. Together they turn design excellence from a personal skill into an organisational advantage.',
  },
}

export const chapterFourDocs: HiringDoc[] = [
  { slug: 'design-quality-assessment-worksheet', kind: 'Worksheet', part: 1, pages: 1, title: 'Design Quality Assessment Worksheet', summary: 'Assess one product, flow or release at a milestone, from evidence, in six areas.' },
  { slug: 'harmonisation-audit-worksheet', kind: 'Worksheet', part: 1, pages: 1, title: 'Experience Consistency and Harmonisation Audit', summary: 'Find where products and journeys differ for no good reason, and decide what to fix first.' },
  { slug: 'design-excellence-health-check', kind: 'Worksheet', part: 1, pages: 1, title: 'Design Excellence Health Check', summary: 'A quarterly look at the five pillars and two horizons, so leadership can see where to invest.' },
  { slug: 'feature-excellence-review-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'Feature Excellence Review', summary: 'The reviewer’s scorecard: twelve criteria and a clear decision before release.' },
  { slug: 'future-signals-radar-worksheet', kind: 'Worksheet', part: 3, pages: 1, title: 'Future Signals and Opportunity Radar', summary: 'Spot the shifts that could change your products, and choose the few worth an experiment.' },
  { slug: 'north-star-experience-canvas', kind: 'Worksheet', part: 3, pages: 1, title: 'North Star Experience Canvas', summary: 'Turn an opportunity into a future experience that people can understand at a glance.' },
  { slug: 'experimentation-canvas', kind: 'Worksheet', part: 3, pages: 1, title: 'Experimentation Canvas', summary: 'Turn a north-star idea into the smallest experiment that will teach you something.' },
  { slug: 'experiment-to-scale-assessment', kind: 'Worksheet', part: 3, pages: 2, title: 'Experiment-to-Scale Assessment', summary: 'Decide whether an experiment should stop, continue, be incubated or scale into a product.' },
]
