// Content for Leading Design: a manager's guide to leading design teams, in five chapters.
// Every chapter has a story, notes or points, and worksheets. A framework is optional.
// Chapter 1 is written. The others are listed on the landing page and open once they are written (ready: true).

export interface Chapter { n: string; slug: string; title: string; summary: string; topics: string[]; ready: boolean }

export const LEADING_DESIGN_PATH = '/resources/leading-design'
export const chapterPath = (slug: string) => `${LEADING_DESIGN_PATH}/${slug}`

export const chapters: Chapter[] = [
  { n: '01', slug: 'building-a-design-team', title: 'Building a design team', ready: true,
    summary: 'Decide what the team must become, then hire and onboard for it: team shape, a hiring experience designed for candidates and interviewers, and a first ninety days written with the new joiner. Six editable worksheets, each with a filled example.',
    topics: ['Team shape', 'Hiring', 'Onboarding'] },
  { n: '02', slug: 'growth-and-performance-metrics', title: 'Growth and performance metrics for design teams', ready: false,
    summary: 'Feedback and objective reviews, performance management and growing people, with measures that describe the work and the person, not only the output.',
    topics: ['Feedback', 'Performance', 'Growth'] },
  { n: '03', slug: 'design-rituals', title: 'Design rituals', ready: false,
    summary: 'Critique, inspiration, appreciation and conversations that matter: the regular habits that make a team’s culture visible.',
    topics: ['Critique', 'Inspiration', 'Appreciation'] },
  { n: '04', slug: 'elevating-design-quality', title: 'Elevating design quality at the organisation', ready: false,
    summary: 'Quality at scale, harmonisation across teams, a north-star vision and the craft upskilling that keeps the bar rising.',
    topics: ['Quality', 'Harmonisation', 'Vision'] },
  { n: '05', slug: 'ai-maturity-for-design-orgs', title: 'AI maturity for design organisations', ready: false,
    summary: 'Where your design organisation stands with AI, what to build next, and how to lead people through the change without fear.',
    topics: ['AI maturity', 'Capability', 'Change'] },
]

export const bookParts = [
  { title: 'Story, notes and points', text: 'What happened, what I learned, and the points to carry into your own team.' },
  { title: 'A framework, where it helps', text: 'Some chapters have a step-by-step way of working to run with your team. Others do not need one.' },
  { title: 'Worksheets, always', text: 'Every chapter has worksheets: printable pages, and editable ones with a filled example to learn from.' },
]

/** The editable worksheets for chapter 1: the page and Figma file, and each worksheet's tab in the online kit. */
export const WORKSHEET_KIT = '/templates/leading-design-chapter-1.html'
export const worksheetTab: Record<string, string> = {
  'team-shape-and-capability-worksheet': 'team',
  'hiring-experience-alignment-worksheet': 'alignment',
  'role-definition-worksheet': 'role',
  'employer-story-and-outreach-worksheet': 'story',
  'hr-partnership-worksheet': 'hr',
  'candidate-journey-map-worksheet': 'journey',
}

// ── Chapter 1 ────────────────────────────────────────────────────────────────

export interface Principle { title: string; text: string; ask: string }
export interface TeamStep { title: string; text: string; how: string[] }

export const chapterOne = {
  intro: [
    'Most new managers inherit a requirement: two designers for this product, one more for that programme. It is easy to fill the requirement and call it a team.',
    'A team is different. It has a point of view on what it needs to become, a culture someone chose, and a way of welcoming people that matches what was promised when they were hired. This chapter takes you from the first conversation about vision to a new designer’s first ninety days.',
  ],
  outcomes: [
    'A written picture of the team you need, agreed with your own leader',
    'A role definition and a team story you can say out loud',
    'A hiring experience designed for the candidate, the interviewer and the decision-maker',
    'A ninety-day plan written with the new joiner',
  ],
  principles: [
    { title: 'Have a point of view on what the team must become',
      text: 'Filling roles is not building a team. Before you hire, ask what this team should be able to do in a year that it cannot do now.',
      ask: 'Write one paragraph describing the team you want in twelve months, and test it with someone senior.' },
    { title: 'Start from the vision, not the requisition',
      text: 'The open role is a symptom. Spend time with senior leadership on the vision and the capability they are trying to create, then decide who the team needs.',
      ask: 'Book a conversation with your leader about direction before you open the next role.' },
    { title: 'Build culture on purpose',
      text: 'A team has a culture whether or not you design one. Choose the behaviours you want, show them early, and hire and onboard for them. A culture built deliberately tends to spread beyond the team.',
      ask: 'Name three behaviours you want the team known for, and one thing you will do this month to show each.' },
    { title: 'Design hiring and onboarding as one experience',
      text: 'The same process is lived by the candidate, the interviewer and the person who decides, and then by the new joiner. The first ninety days decide whether the promises made while hiring were true.',
      ask: 'Map the journey from all three sides, then add the new joiner’s first week.' },
    { title: 'Decide on evidence, and close every loop',
      text: 'Score against the work, not the impression. Reply to every candidate, promptly and specifically. People remember how a process ended long after they forget how it began.',
      ask: 'Agree a reply time for every stage with your HR partner, and keep to it for one hire.' },
  ] as Principle[],
  teamFramework: {
    title: 'From requirement to team shape',
    lead: 'A five-step way to decide what the team needs before you write a job description. Run it with your own leader or product partner, and keep the worksheet as the record.',
    steps: [
      { title: 'Ask for the vision', text: 'Find out what leadership wants design to be in the next twelve to twenty-four months, in their words.',
        how: ['Ask what would be different if the team succeeded.', 'Note the business and product bets the team must support.'] },
      { title: 'Map the work', text: 'List the areas of work the team will do, and how the mix changes over the year.',
        how: ['Show effort today next to effort in twelve months.', 'Name the skills each area of work needs.'] },
      { title: 'Choose broad or deep', text: 'Decide capability by capability how much depth you need, and be a broad or a deep team on purpose.',
        how: ['Rate the depth you need now and later.', 'Mark who has each capability today, and where the gaps are.'] },
      { title: 'Shape the roles', text: 'Turn the gaps into roles, and be honest about where you depend on partners.',
        how: ['List roles you have, roles you need and what you will borrow.', 'Check the shape against any single client or product the team serves.'] },
      { title: 'Sequence the hires', text: 'Decide what to hire, what to grow and what to borrow, and in which order.',
        how: ['Take the first role into the Role Definition Worksheet.', 'Return to this page every six months.'] },
    ] as TeamStep[],
  },
}

/** Worksheet slugs for chapter 1, in the order they are used. */
export const chapterOneWorksheets = {
  team: ['team-shape-and-capability-worksheet'],
  hiring: ['hiring-experience-alignment-worksheet', 'role-definition-worksheet', 'employer-story-and-outreach-worksheet', 'hr-partnership-worksheet', 'candidate-journey-map-worksheet', 'interview-evaluation-handbook', 'decisions-and-candidate-care-playbook'],
  onboarding: ['onboarding-playbook'],
}

export const teamShapeDoc = { slug: 'team-shape-and-capability-worksheet', kind: 'Worksheet' as const, part: 1 as const, title: 'Team Shape and Capability Worksheet', pages: 3, summary: 'Decide what the team needs to become before you decide who to hire: vision, work, broad or deep skills, culture and the order of hires.' }
