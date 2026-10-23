// Content for "Hiring is an experience problem" (Practice > Hiring is an experience problem).
// Industry evidence comes from published articles and surveys; no peer-reviewed study of design hiring was found, and the page says so.
import { hiringDocs } from './hiring'
import type { HiringDoc } from './hiring'

export const experienceDocs: HiringDoc[] = [
  { slug: 'assignment-and-signals-handbook', kind: 'Handbook', part: 2, pages: 3, title: 'On-site Assignment and Signals Handbook', summary: 'Design the challenge from the role, write the deliverable criteria, and decide the signals you will look for before you meet anyone.' },
  { slug: 'candidate-feedback-survey-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'Candidate Feedback Survey Worksheet', summary: 'Ask every candidate how the process felt, define a positive result up front, and act on what you hear.' },
  { slug: 'hiring-experience-tenets-check', kind: 'Worksheet', part: 1, pages: 1, title: 'Hiring Experience Tenets Check', summary: 'Score your hiring against nine tenets, note the evidence and pick the first changes to make.' },
]
export const allExperienceDocs: HiringDoc[] = [...hiringDocs, ...experienceDocs]
export const experienceHandbook = { href: '/downloads/hiring/hiring-experience-handbook-complete.pdf', pages: 25 }

export interface Source { label: string; url: string }
export interface Pattern { n: string; title: string; problem: string; evidence: string; source: Source; doThis: string[]; doc?: string }

export const patterns: Pattern[] = [
  { n: '01', title: 'Design is filed under engineering',
    problem: 'Design roles are titled, scoped and approved as a variant of engineering. The titles blur, the work is judged by engineering yardsticks, and designers find that shipping authority sits elsewhere.',
    evidence: 'The same “design engineer” title is used for roles that lean mostly design, mostly development, or like an augmented product manager, and in some companies only engineers can push to production.',
    source: { label: 'The design engineer symptom, UX Collective', url: 'https://uxdesign.cc/the-design-engineer-symptom-what-a-rising-job-title-reveals-850d5e4fd9cc' },
    doThis: ['Name the role by the design problem it owns, then say where it sits and who it works with.', 'Write the outcomes the person is accountable for, in design terms, before any skills list.', 'Agree with HR a design job family with its own levels, so the title means one thing.', 'Say plainly how much shipping authority the role has.'], doc: 'role-definition-worksheet' },
  { n: '02', title: 'One job description, many roles',
    problem: 'A description written once is reused, lightly edited, across titles and teams. It asks one person to do research, interface, motion, front-end and brand, and tells the candidate nothing about this job.',
    evidence: 'Design recruiters describe listings that bundle UX, UI, research, motion, front-end and no-code skills into one role, and a wide spread of titles that leaves candidates unsure what a role is.',
    source: { label: 'The state of design recruitment, Verified Insider', url: 'https://verifiedinsider.substack.com/p/the-state-of-design-recruitment-in' },
    doThis: ['Reuse the process and never the description. Write each role fresh from its three outcomes.', 'Split requirements into must have, can learn here and not needed.', 'Keep it short and candidate-first: why the role exists, the team, what is expected.', 'Include how you hire, so the page itself is an honest signal.'], doc: 'role-definition-worksheet' },
  { n: '03', title: 'Volume outruns attention',
    problem: 'An open role draws far more applications than anyone can read with care, so screening turns into a filter on keywords and logos, and the process around it becomes slow and impersonal.',
    evidence: 'Open design roles can attract hundreds of applications a day, and no team has time to review thousands thoughtfully, which is why personal feedback is rare.',
    source: { label: 'How many designers does it take to fix the UX job market, UX Collective', url: 'https://uxdesign.cc/how-many-designers-does-it-take-to-fix-the-ux-job-market-3b225543aaa2' },
    doThis: ['Spend human attention where the signal is richest, and be honest about what the first screen can tell you.', 'Write a short application ask tied to the role, so what arrives is comparable.', 'Set the number of candidates you will take into each stage before you open the role.', 'Make the screen about the signals you defined, not about the brand names on a résumé.'], doc: 'assignment-and-signals-handbook' },
  { n: '04', title: 'Silence after the interview',
    problem: 'Candidates give hours and hear nothing. Updates are late, decisions are never sent, and the people who were not selected learn the outcome by absence.',
    evidence: 'Glassdoor found 3.1 per cent of interview reviews in October 2023 mentioned ghosting, up 112 per cent since the pandemic began, and 87 per cent of those reviews described a negative experience overall.',
    source: { label: 'Employer ghosting has doubled, HR Dive, on Glassdoor data', url: 'https://www.hrdive.com/news/employer-ghosting-doubled-in-recent-years-glassdoor/698304/' },
    doThis: ['Promise response times in the first message, then keep them.', 'Give every candidate who reached an interview a written answer, and feedback where policy allows.', 'Own the three moments where candidates feel most ignored, by name.', 'Ask everyone how it felt, and read the answers as a team.'], doc: 'decisions-and-candidate-care-playbook' },
  { n: '05', title: 'Assignments that take and give nothing back',
    problem: 'The take-home exercise asks for unpaid hours, done alone, against a vague brief, and judged on criteria the candidate never sees.',
    evidence: 'Critics point to a task sized for about eight hours but allowed days, to unpaid work, to no chance to ask questions or collaborate, and to briefs reused without clear goals or user information.',
    source: { label: 'Why design managers should stop using take-home assignments, UX Planet', url: 'https://uxplanet.org/why-design-managers-should-stop-using-take-home-assignments-in-the-hiring-process-edc3d932451b' },
    doThis: ['Time-box the assignment, say the time up front and keep it in one sitting.', 'Let the candidate ask questions and work with people from the team, as the real job would.', 'Write the brief from the role, with the criteria the candidate can see.', 'Never use a live product problem that collects free work.'], doc: 'assignment-and-signals-handbook' },
  { n: '06', title: 'Pedigree and familiarity stand in for evidence',
    problem: 'When the signals are not defined, people fall back on what is easy to see: a famous employer, a known name, someone who reminds them of the last hire.',
    evidence: 'Design recruiters describe a “glamour” search that favours prestige brands, hiring that leans on personal connections, and ageism that overlooks experienced designers.',
    source: { label: 'The state of design recruitment, Verified Insider', url: 'https://verifiedinsider.substack.com/p/the-state-of-design-recruitment-in' },
    doThis: ['Score each competency on written anchors, independently, before anyone discusses.', 'Ask every candidate for the same role the same questions.', 'Record the strongest evidence and the main concern for each competency.', 'Review who you advance, and who you do not, every quarter.'], doc: 'interview-evaluation-handbook' },
  { n: '07', title: 'Nobody has defined what good looks like',
    problem: 'Interviewers meet the candidate with no shared idea of what a strong response contains. Each forms an impression, and the debrief becomes a negotiation between impressions.',
    evidence: 'This one comes from my own practice more than a survey: briefs without clear goals, and assessments judged on whatever the reviewer happens to value, appear in the criticism of take-home exercises and match what I saw in organisations that had not written down their signals.',
    source: { label: 'Why design managers should stop using take-home assignments, UX Planet', url: 'https://uxplanet.org/why-design-managers-should-stop-using-take-home-assignments-in-the-hiring-process-edc3d932451b' },
    doThis: ['Define the signals for the role before you meet anyone.', 'For each signal, say how it shows up in the room and how you will probe it.', 'Define what the deliverable must contain, and what you do not need.', 'Brief interviewers on the signal they own.'], doc: 'assignment-and-signals-handbook' },
]

export const caseIntro = {
  quote: 'I have redefined the hiring experience in my organisations. In one of them I reinstated the on-site assignment, looked at the whole journey from the candidate’s point of view, and asked candidates how it felt.',
  note: 'The method below is the one I used. The worksheets turn each step into something you can fill in.',
}

export interface CaseStep { n: string; title: string; text: string; points: string[]; doc?: string }
export const caseSteps: CaseStep[] = [
  { n: '01', title: 'Start from the candidate', text: 'I walked the journey as the candidate lives it: how they hear about the role, what they are told, what each stage asks of them, and what they hear back. Interviewers and the decision-maker came next, because the same process is lived by all three.',
    points: ['Mapped every stage from the candidate’s side first.', 'Marked where people are most likely to feel lost or ignored.', 'Agreed what we promise at each stage, and who owns it.'], doc: 'candidate-journey-map-worksheet' },
  { n: '02', title: 'Reinstate the on-site assignment', text: 'We brought back the assignment, held on site and in one sitting. The candidate works on a real kind of problem, can ask questions, can talk to the team, and then walks us through their thinking. The time is stated up front and the brief is the same for everyone applying for that role.',
    points: ['Time-boxed, with the duration told in advance.', 'The candidate can ask questions and work with people from the team.', 'No live product problem and no free work collected.', 'A walk-through at the end, with a conversation about the decisions.'], doc: 'assignment-and-signals-handbook' },
  { n: '03', title: 'Define the challenge from the job role', text: 'The assignment is not a reused exercise. For each role we wrote the core problem that person will own, then shaped a problem statement from it: context, who it is for, the constraint and what is out of scope.',
    points: ['Started from the role’s three outcomes.', 'Wrote a problem statement short enough to read in two minutes.', 'Decided what the candidate is given, and who they can ask.'], doc: 'assignment-and-signals-handbook' },
  { n: '04', title: 'Define the deliverable criteria', text: 'From the problem statement and the role, we wrote what a strong response contains, and also what we do not need, so nobody is marked down for skipping it.',
    points: ['Problem framing, approach, decisions and trade-offs, communication, response to critique.', 'Each tied to why this role needs it.', 'A line for what is not needed.'], doc: 'assignment-and-signals-handbook' },
  { n: '05', title: 'Define the signals, by role', text: 'A signal is something we can observe that predicts success in the job. For each role we named the signals, said how each shows up in the room and decided how to probe it. A product designer, a researcher, a systems designer and a lead do not share the same signals.',
    points: ['Named before anyone was interviewed.', 'Assigned to interviewers, so each owned a signal.', 'Scored independently against written anchors, then discussed.'], doc: 'interview-evaluation-handbook' },
  { n: '06', title: 'Ask candidates how it felt', text: 'After the outcome was known we asked everyone who reached an interview about the hiring and interview experience, and treated the answers as product feedback.',
    points: ['Sent to every candidate who reached an interview, whatever the outcome.', 'Decided what counts as positive before reading any answers.', 'Shared with HR and interviewers, with one change owned after each round.'], doc: 'candidate-feedback-survey-worksheet' },
]

export const results = { big: 'Above 95%', label: 'of candidate responses on the hiring and interview experience were positive', note: 'From the feedback collected after the process. The aim was never the score. It was to find out what the experience felt like to the people in it.' }
export const resultPoints = [
  { title: 'A process people could describe', text: 'Candidates knew what would happen, what was asked of them and when they would hear back.' },
  { title: 'Interviewers who were ready', text: 'Each owned a signal, used the same questions and scored on evidence.' },
  { title: 'Decisions we could explain', text: 'Every decision had its strongest evidence and main concern written down.' },
  { title: 'A loop that kept improving', text: 'Feedback went back to HR and the panel, and one change was owned after each round.' },
]

export const tenets = [
  { n: '1', title: 'Hiring is a product with three users', text: 'The candidate, the interviewer and the decision-maker all live the process. Design it for all three.' },
  { n: '2', title: 'Define the role by the work', text: 'Name it for the design problem it owns, not the nearest engineering title.' },
  { n: '3', title: 'Reuse the process, not the description', text: 'Every role starts from its own outcomes.' },
  { n: '4', title: 'Spend attention where the signal is richest', text: 'Do not hide behind keywords and logos at scale.' },
  { n: '5', title: 'Test what the job will ask', text: 'Give a realistic problem, the people to ask, and the time the work deserves.' },
  { n: '6', title: 'Define the signals before you meet anyone', text: 'Say what good looks like, and how it shows up in the room.' },
  { n: '7', title: 'Respect time', text: 'Every ask is proportionate and stated up front.' },
  { n: '8', title: 'Close every loop', text: 'Everyone gets a reply and a chance to tell you how it felt.' },
  { n: '9', title: 'Measure the experience like a product', text: 'Define what positive means first, then read the results as a team.' },
]

export const sourceNote = 'The evidence here comes from published articles and surveys by design recruiters, practitioners and Glassdoor. I looked for peer-reviewed research on design hiring specifically and did not find any, so treat the figures as industry reporting. Pattern 07 and the case study draw on my own practice.'
export const sources: Source[] = Array.from(new Map(patterns.map(p => [p.source.url, p.source])).values())
