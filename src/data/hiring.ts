// Content for the hiring playbook (Practice > How I hire). The downloadable files are built by tools/hiring/build.mjs from tools/hiring/docs.mjs.

export interface HiringDoc { slug: string; kind: 'Worksheet' | 'Handbook' | 'Playbook'; title: string; summary: string; pages: number; part: 1 | 2 | 3 }

export const hiringDocs: HiringDoc[] = [
  { slug: 'hiring-experience-alignment-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'Hiring Experience Alignment Worksheet', summary: 'Define a hiring experience that fits your organisation: the promises you make, your constraints, and what each stage owes the candidate.' },
  { slug: 'role-definition-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'Role Definition Worksheet', summary: 'Turn a vague need into a clear role, then write a job description people want to answer.' },
  { slug: 'employer-story-and-outreach-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'Employer Story and Outreach Worksheet', summary: 'Say what working in your team is really like, and plan where and how people will hear it.' },
  { slug: 'hr-partnership-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'HR Partnership Worksheet', summary: 'Learn the HR tools, agree who does what, and set up a rhythm for improving hiring together.' },
  { slug: 'candidate-journey-map-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'Candidate Journey Map Worksheet', summary: 'Map the whole process from the candidate, the interviewer and the decision-maker at once.' },
  { slug: 'interview-evaluation-handbook', kind: 'Handbook', part: 2, pages: 3, title: 'Interview and Evaluation Handbook', summary: 'Brief interviewers, ask comparable questions, score against evidence and record the decision.' },
  { slug: 'decisions-and-candidate-care-playbook', kind: 'Playbook', part: 2, pages: 2, title: 'Decisions and Candidate Care Playbook', summary: 'Make the offer well and close the loop with everyone, including the people you do not select.' },
  { slug: 'onboarding-playbook', kind: 'Playbook', part: 3, pages: 2, title: 'Onboarding Playbook', summary: 'From accepted offer to the end of the first ninety days, planned with the new joiner.' },
]
export const completeHandbook = { href: '/downloads/hiring/hiring-handbook-complete.pdf', pages: 19 }
export const docHref = (slug: string) => `/downloads/hiring/${slug}.pdf`

export interface HiringStep { title: string; what: string; how: string[]; watch: string }
export interface HiringPart { id: string; n: string; title: string; lead: string; outcome: string; steps: HiringStep[] }

export const hiringParts: HiringPart[] = [
  {
    id: 'managing', n: '01', title: 'Managing the hiring experience',
    lead: 'Before a single candidate applies, the hiring experience already exists in your tools, your job descriptions and your relationship with HR. This part is about shaping those on purpose.',
    outcome: 'A written hiring experience agreed with HR, a role people understand, a story that is honest, and a working rhythm with HR.',
    steps: [
      { title: 'Get comfortable with the HR system', what: 'Learn the applicant system, requisition flow and feedback forms from the inside, so you design with the system and not against it.',
        how: ['Take one real role from requisition to posting yourself.', 'Apply as a candidate, on a phone too, and see the pipeline as a recruiter does.', 'Submit interview feedback in the tool, then find where the reports live.', 'List what the system cannot do before you promise anything.'],
        watch: 'Asking for changes before you understand the tool. HR teams respond to someone who has done the work in their system.' },
      { title: 'Define the role, not a wish list', what: 'Describe the problem the person will solve and the outcomes that mean it worked, then separate what is needed on day one from what can be taught.',
        how: ['Write three outcomes for the first twelve months.', 'Split requirements into must have, can learn here, and not needed.', 'Write the job description last, in plain language, with how you hire included.'],
        watch: 'A description that is really a portrait of the last person, or of yourself.' },
      { title: 'Tell the team story honestly', what: 'Say what the work is, how the team works, and what is hard, so the right people feel encouraged and the wrong fit can self-select.',
        how: ['Write the story in four parts: what we make, how we work, what we value, what is hard.', 'List the proof a candidate can actually see: work, talks, writing, how you hire.', 'Publish how you hire. It is the strongest signal of a team that respects people.'],
        watch: 'Adjectives with no evidence. Candidates trust specifics.' },
      { title: 'Publicise and create pull', what: 'Choose a few activities you can keep up, and use them to let designers meet your team before they apply.',
        how: ['Pick two or three: open portfolio reviews, a team talk or meetup, a referral kit, a how-we-hire page, team spotlight posts.', 'Give each an owner, a rhythm and a signal that tells you it works.', 'Run them for six months before judging.'],
        watch: 'One big event followed by silence. Small and regular beats big and once.' },
      { title: 'Work with HR as a partner', what: 'Agree who owns what, how you will work, and what you will measure, then improve the system together after every hire.',
        how: ['Write down who does what at every stage.', 'Agree response times for candidate updates, scheduling and feedback.', 'Pilot one change on one role, then review it with evidence.', 'Share what candidates told you about the process.'],
        watch: 'Treating HR as a service desk. Changes land when you sit down together with real examples.' },
    ],
  },
  {
    id: 'candidate', n: '02', title: 'The candidate hiring experience',
    lead: 'The same process is lived by three people at once: the candidate, the interviewer who has to be ready, and the person who decides. Designing for all three is what makes it feel fair.',
    outcome: 'A mapped journey with clear promises, briefed interviewers, a scorecard everyone uses the same way, and a respectful answer for every candidate.',
    steps: [
      { title: 'Map the candidate journey', what: 'Lay out every stage, what the candidate needs to know at each, and what you promise to do and by when.',
        how: ['Use a recent hire’s real timeline.', 'Mark the three moments where a candidate is most likely to feel lost or ignored.', 'Decide what you send or do at each, and who owns it.'],
        watch: 'Silence between stages. It is the most common reason good candidates lose interest or trust.' },
      { title: 'Design the interviewer’s journey', what: 'Make it easy for interviewers to be prepared, fair and prompt.',
        how: ['Brief every interviewer on the role, the competency they own and the questions to start from.', 'Give them a notes format that separates what they saw from what they think.', 'Ask for feedback within 24 hours, before they read anyone else’s.'],
        watch: 'Interviewers improvising. It makes comparison impossible and the experience uneven.' },
      { title: 'Evaluate against evidence', what: 'Define the competencies for the role and what each rating means, so scores describe the work and not the impression.',
        how: ['Write short anchors for ratings one to four for your role and level.', 'Score independently first, then discuss.', 'Go competency by competency in the debrief, starting with the least certain.'],
        watch: 'Pedigree and comfort standing in for evidence.' },
      { title: 'Run the decision well', what: 'Decide as a team, with one person accountable, and write down the reason.',
        how: ['Record ratings, strongest evidence and the main concern for each competency.', 'Name the risks and how you would reduce them.', 'Have the hiring manager call the selected candidate, then send the written offer.'],
        watch: 'A decision that cannot be explained afterwards, to the candidate or to yourself.' },
      { title: 'Care for the candidates you do not select', what: 'Reply promptly, kindly and specifically to everyone, and keep the door open where it is right to.',
        how: ['Agree a reply time for every stage a candidate can reach.', 'Share one specific thing you noticed, where policy allows.', 'Invite them to tell you how the process felt. Keep strong candidates in touch, with their permission.'],
        watch: 'The part most teams skip. It is also the part candidates remember longest.' },
    ],
  },
  {
    id: 'onboarding', n: '03', title: 'The onboarding experience',
    lead: 'The hiring experience does not end at the offer. A new designer’s first ninety days decide whether the promises you made during hiring were true.',
    outcome: 'A plan that starts the day the offer is accepted, a first week that feels expected, and a ninety-day path written with the new joiner.',
    steps: [
      { title: 'Start before day one', what: 'Between acceptance and start, keep the person warm and remove friction.',
        how: ['Send a welcome note from the manager and the team.', 'Have equipment, accounts and access ready.', 'Choose a buddy and share the first-week schedule in advance.'],
        watch: 'Weeks of silence after the offer is signed.' },
      { title: 'Make the first week feel expected', what: 'The first days set the tone, so plan them in detail.',
        how: ['Have someone ready to meet them and the workspace working.', 'Plan who they meet each day and one small thing they can contribute.', 'Have an early conversation about what matters most.'],
        watch: 'Leaving the new joiner to chase access and introductions.' },
      { title: 'Plan the first ninety days together', what: 'Use three stages, learn, contribute, own, and write them with the new joiner, not for them.',
        how: ['Days 1 to 30: the people, the product, how we work, one small contribution.', 'Days 31 to 60: real work with support and a clear picture of what good looks like.', 'Days 61 to 90: an area they lead, and how you will know it is going well.'],
        watch: 'A plan handed over finished. A plan they helped write is one they follow.' },
      { title: 'Close the loop back into hiring', what: 'At thirty days, ask what the hiring process promised that onboarding did not deliver.',
        how: ['Ask the new joiner what they would tell the next person.', 'Compare their answers with your stage promises.', 'Change one thing, and tell HR what you learned.'],
        watch: 'Treating hiring and onboarding as separate projects with separate owners.' },
    ],
  },
]

export const firstMonth = [
  { week: 'Week 1', title: 'Learn the system', text: 'Complete a requisition yourself, apply as a candidate, and sit with your HR partner.' },
  { week: 'Week 2', title: 'Define the role and the story', text: 'Write the role definition and the team story. Choose one outreach activity.' },
  { week: 'Week 3', title: 'Design the journey', text: 'Map the stages and set promises. Build the scorecard and brief your interviewers.' },
  { week: 'Week 4', title: 'Pilot it on one hire', text: 'Run the first candidate through it, ask them how it felt, and note what to change.' },
]

export const hiringProof = [
  { value: '200+', label: 'Designers hired across teams and organisations' },
  { value: '6–30', label: 'Direct reports across teams, about 10 on average' },
  { value: 'From scratch', label: 'Hiring and onboarding set up end to end in one organisation, with HR' },
]
