// Grow · Portfolio Best Practices. Guidance on building a portfolio with a character, and on presenting design work, with examples taken from the case studies on this site.

export interface GuideSection {
  id: string
  n: string
  kicker: string
  title: string
  lead: string
  points?: { t: string; d: string }[]
  example?: { label: string; quote: string; note: string; to?: string }
  pairs?: { weak: string; strong: string; why: string }[]
  worksheet?: boolean
}

export const characterPrompts = [
  { id: 'values', label: 'What you stand for', hint: 'Two or three beliefs about design that you would defend in a disagreement.' },
  { id: 'voice', label: 'How you sound', hint: 'Plain or playful, precise or poetic. Write three words, then one sentence in that voice.' },
  { id: 'taste', label: 'What you find beautiful', hint: 'What you lean towards and what you avoid, in type, colour, space and motion.' },
  { id: 'view', label: 'Your point of view', hint: 'One thing you believe about your field that most people would push back on.' },
  { id: 'behaviour', label: 'How you behave in the work', hint: 'The habits a colleague would recognise: how you start, how you disagree, how you finish.' },
]

export const guide: GuideSection[] = [
  {
    id: 'character', n: '', kicker: 'THE IDEA', title: 'Your portfolio is a reflection of you.',
    lead: 'A portfolio is the one place where you control the whole impression. If it could belong to anyone, it will be remembered as no one. Give it a character: a consistent way of seeing, speaking and choosing that a reader can feel within seconds.',
    points: [
      { t: 'Character is felt before it is read', d: 'Tone, pace, spacing and what is left out say who you are before the first paragraph does.' },
      { t: 'It is consistent, not decorated', d: 'The same values show up in the words, the layout, the motion and the projects you choose to show.' },
      { t: 'It makes the work easier to trust', d: 'A reader who understands how you think reads each project as evidence of it, not as an isolated result.' },
    ],
  },
  {
    id: 'brand', n: '', kicker: 'CHARACTER AND BRAND', title: 'Personal brand and character are not the same thing.',
    lead: 'Personal brand is how you want to be known: a role, a focus, a reputation. Character is how you actually are: what you value, how you speak, what you notice. Brand is the label on the door. Character is the room. Start with character, and let the brand be a short, honest summary of it.',
    pairs: [
      { weak: 'Personal brand: “Design leader focused on AI.”', strong: 'Character: someone who asks who decides what, and when, before asking what to automate.', why: 'The brand tells people where to file you. The character tells them what working with you is like.' },
      { weak: 'Brand: a logo, a palette, a headline.', strong: 'Character: the way every sentence, layout and motion on the site behaves the same way.', why: 'A brand can be copied in an afternoon. A character is built through repeated choices.' },
    ],
  },
  {
    id: 'define', n: '', kicker: 'DEFINE IT', title: 'How to define the character of your portfolio.',
    lead: 'Answer five questions in your own words. Keep each answer short and concrete. Then read the result back and ask: would a stranger recognise this person from the portfolio alone?',
    worksheet: true,
  },
  {
    id: 'show', n: '', kicker: 'MAKE IT VISIBLE', title: 'Build the character into the whole site.',
    lead: 'Once you have named it, check every surface against it. A character that lives only in the “About” page is a slogan.',
    points: [
      { t: 'Name and role', d: 'How you introduce yourself in the first second: the words, the order, what is current. Make it specific enough to be only you.' },
      { t: 'Voice', d: 'Write headings and captions the way you would explain the work to a colleague. Cut anything you would never say aloud.' },
      { t: 'Visual language', d: 'Choose type, colour and space that express your taste, and keep to them. Restraint reads as confidence.' },
      { t: 'Motion and interaction', d: 'Speed, easing and feedback show how considerate you are. Fast and quiet says something different from slow and theatrical.' },
      { t: 'Choice of projects', d: 'The projects you include, and the ones you leave out, are the strongest statement of what you value.' },
      { t: 'Recurring ideas', d: 'Two or three ideas that return across projects give a reader a thread to follow, and make the whole feel designed.' },
    ],
  },
  {
    id: 'anatomy', n: '02', kicker: 'ANATOMY', title: 'The anatomy of any project.',
    lead: 'Whatever the project, the same six parts do the work. Order them so a reader can stop after any one and still have understood something. Use this as a skeleton for every project, then let the story shape what you emphasise.',
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
    id: 'story', n: '', kicker: 'STORYTELLING', title: 'Tell it as a story, with a turn in the middle.',
    lead: 'A story is not a longer case study. It is the same facts arranged so the reader wants to know what happens next. Anchor it to one tension and let every section move it forward.',
    points: [
      { t: 'Open with the stake', d: 'Start where something was wrong or at risk, in one or two plain sentences, before you mention any solution.' },
      { t: 'Find the turning point', d: 'Most projects have one moment where the question changed. Find it, name it and give it room. It is the heart of the story.' },
      { t: 'Show the struggle', d: 'The options that failed, the constraint that hurt and the disagreement that mattered make the result believable.' },
      { t: 'Be specific, not general', d: 'One real detail beats three adjectives. A number, a quote or a single screen can carry a whole section.' },
      { t: 'Let the reader see you think', d: 'Write what you noticed, what you chose and why, so the story is also a portrait of your character.' },
      { t: 'End on what changed', d: 'Close with the outcome and a short reflection, then stop. Do not summarise what the reader has just read.' },
    ],
    example: {
      label: 'A turning point in the Agentic case study',
      quote: 'How do we automate it? becomes Who decides what, and when?',
      note: 'The film shows the first question struck out and the second written in its place. The story turns on that reframe, and every later decision follows from it.',
      to: '/craft/sap-agentic',
    },
  },
  {
    id: 'decisions', n: '03', kicker: 'DECISIONS', title: 'Show the decision, not the deliverable.',
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
  'The portfolio has a character I can describe in one sentence.',
  'My name, voice, visuals and motion all behave the same way.',
  'Each project has a stake at the start and a turning point in the middle.',
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

guide.forEach((g, i) => { g.n = String(i + 1).padStart(2, '0') })
