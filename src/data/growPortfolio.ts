// Grow · Portfolio Best Practices. Guidance on presenting design work, with examples taken from the case studies on this site.

export interface GuideSection {
  id: string
  n: string
  kicker: string
  title: string
  lead: string
  points?: { t: string; d: string }[]
  example?: { label: string; quote: string; note: string; to?: string }
  pairs?: { weak: string; strong: string; why: string }[]
}

export const guide: GuideSection[] = [
  {
    id: 'job', n: '01', kicker: 'THE JOB', title: 'A portfolio shows how you think.',
    lead: 'Screens show what you made. A portfolio earns its place when the reader can see what you noticed, what you chose and what you left out. Everything below follows from that.',
    points: [
      { t: 'Write for a reader with a few minutes', d: 'They are comparing you with many others. Make the first screen tell them what the project was, what you did and what changed.' },
      { t: 'Show fewer projects, deeper', d: 'Three well-told case studies say more than ten galleries. Pick the work that shows a range of judgement, not a range of tools.' },
      { t: 'Let the work be specific', d: 'Real constraints, real trade-offs, real people. Specificity is what makes a case study believable.' },
    ],
  },
  {
    id: 'anatomy', n: '02', kicker: 'ANATOMY', title: 'The parts of a case study.',
    lead: 'Most strong case studies carry the same six parts. Order them so a reader can stop after any one and still have understood something.',
    points: [
      { t: '1 · Context', d: 'Who it was for, what the business needed, and why it was hard. Two or three sentences.' },
      { t: '2 · Your role', d: 'What you were responsible for, in one sentence, with the team as a team. Be exact rather than modest or grand.' },
      { t: '3 · The problem, framed', d: 'The question you decided to answer. If you reframed the brief, say how.' },
      { t: '4 · Decisions', d: 'The two or three choices that shaped the outcome: options, criteria, the choice and what it cost.' },
      { t: '5 · Outcome', d: 'What changed for people and for the business, in the plainest honest words you have.' },
      { t: '6 · Reflection', d: 'What you would do differently, or what the work taught you. It signals that you keep learning.' },
    ],
    example: {
      label: 'How the Agentic case study opens',
      quote: 'Processing a supplier order confirmation took weeks. The goal was a few hours.',
      note: 'Problem and stake in two short sentences, before any mention of the solution. The next section is titled “A design problem, not an automation project”, which frames the thinking before the screens.',
      to: '/craft/sap-agentic',
    },
  },
  {
    id: 'decisions', n: '03', kicker: 'DECISIONS', title: 'Tell the decision, not the deliverable.',
    lead: 'Recruiters and design leaders hire judgement. Show a decision the way you would explain it to a colleague: what the options were, how you judged them, what you chose and what that cost.',
    points: [
      { t: 'Name the options you set aside', d: 'A reader trusts a choice more when they can see the alternatives it beat.' },
      { t: 'Say what you judged them against', d: 'Two or three criteria, stated plainly. They show how you think.' },
      { t: 'Admit the cost', d: 'Every real decision gives something up. Saying so is a sign of seniority, not of weakness.' },
    ],
    example: {
      label: 'How the dNetWorX case study tells a decision',
      quote: 'Six entry points tested, one kept.',
      note: 'Each placement was judged against the same three questions: easy to find, out of the way of expert users, and consistent with existing patterns. The section lists what was set aside and why, then the one that was kept.',
      to: '/craft/dnetworx',
    },
  },
  {
    id: 'impact', n: '04', kicker: 'IMPACT', title: 'Show impact without inventing it.',
    lead: 'Business impact matters, and it is often not yours to measure. Do not round up or guess. Use the strongest honest signal you have, and say where it came from.',
    points: [
      { t: 'A measured result, attributed', d: 'If a number exists, give it and say who reported it. “A realised figure reported by the client” reads as more credible than a bare number.' },
      { t: 'A change in behaviour', d: 'People doing something faster, with fewer hand-offs, or without asking for help. Describe it in words if you cannot count it.' },
      { t: 'A decision that moved', d: 'A team that stopped, started or changed direction because of your work is real impact.' },
      { t: 'A voice from the work', d: 'A short, genuine quote from a colleague, customer or user, with their permission.' },
    ],
  },
  {
    id: 'presenting', n: '05', kicker: 'PRESENTING', title: 'Make it easy to read.',
    lead: 'Presentation is part of the argument. A tidy page says you can organise complexity for someone else.',
    points: [
      { t: 'Lead with a clear title and one-line summary', d: 'Say what the project was and the outcome before the first image.' },
      { t: 'Annotate your screens', d: 'A caption that says why a screen is the way it is does more than the screen alone.' },
      { t: 'Use one visual per idea', d: 'Cut images that repeat a point. A diagram of the flow is often worth more than ten screens.' },
      { t: 'Keep the length honest', d: 'Long enough to show the thinking, short enough that a stranger can follow it in one sitting.' },
      { t: 'Keep confidential work confidential', d: 'Anonymise clients and data where needed, in the way the airline project on this site is simply called “Airline App”. Show the thinking, not the secret.' },
    ],
  },
  {
    id: 'rewrites', n: '06', kicker: 'REWRITES', title: 'Weak to strong, in one line.',
    lead: 'Small changes in wording change how credible the work sounds.',
    pairs: [
      { weak: 'I redesigned the app to be more user-friendly.', strong: 'Returning customers kept abandoning the booking flow at payment, so I removed two steps and moved the price summary above the form.', why: 'Names the problem, the change and the reason.' },
      { weak: 'I collaborated with stakeholders.', strong: 'I ran weekly reviews with engineering and the product owner so decisions were made where everyone could see them.', why: 'Shows how you work, not only that you worked.' },
      { weak: 'The design increased engagement.', strong: 'More people finished the task without help. I measured it by watching sessions before and after, with a small group.', why: 'Honest about the evidence and the method.' },
      { weak: 'I used design thinking.', strong: 'We tested three ways to find the feature and kept the one that asked people to learn the least.', why: 'Replaces a label with what you actually did.' },
    ],
  },
]

export const mistakes = [
  'Starting with the solution instead of the problem.',
  'Describing the process (“we did research, then wireframes”) without a decision in it.',
  'Claiming the whole team’s work as your own, or hiding yours behind “we”.',
  'Numbers with no source, or a metric that your work could not have moved.',
  'Screens with no captions, so the reader has to guess why they matter.',
  'Too many projects, so none of them is deep enough to remember.',
  'No reflection, which makes everything look like it went to plan.',
  'Showing confidential material you were not cleared to show.',
]

export const checklist = [
  'The first screen says what the project was and what changed.',
  'My role is stated in one clear sentence.',
  'The problem is framed before the solution appears.',
  'At least two decisions show options, criteria and the cost.',
  'Every number has a source, or is removed.',
  'Each important screen has a caption that explains the thinking.',
  'I have shown fewer, stronger projects rather than many shallow ones.',
  'Confidential details are anonymised.',
  'There is a short reflection at the end.',
  'A stranger could follow it in one sitting.',
]

export const template = `CASE STUDY TEMPLATE

TITLE — what the project was, in plain words
ONE-LINE SUMMARY — what changed, and for whom

CONTEXT (2–3 sentences)
Who it was for, what the business needed, and why it was hard.

MY ROLE (1 sentence)
What I was responsible for. The team, named as a team.

THE PROBLEM, FRAMED
The question I decided to answer. If I reframed the brief, how and why.

DECISIONS (2–3)
For each: the options, what I judged them against, what I chose, what it cost.

OUTCOME
What changed for people and for the business. Source for every number.

REFLECTION
What I would do differently, or what this taught me.`
