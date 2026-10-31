// Content for Leading Design, chapter 2: Growth and performance metrics for design teams.
// Written in a generic voice on purpose: it has to travel across organisations, structures and ways of recognising growth,
// so it says "the next level" and "growth", not promotion, and avoids anything that assumes one company's system.
// A chapter always has points and worksheets. A framework appears only where it helps.
import type { HiringDoc } from './hiring'

export interface Point { title: string; text: string; ask: string }
export interface Step { title: string; text: string; how?: string[]; watch?: string }
export interface Method { name: string; what: string; when: string; watch: string }

export const chapterTwo = {
  intro: [
    'People do their best work when they can answer three questions without guessing: how am I doing, where am I headed, and does anyone notice? Feedback answers the first. Performance management answers the second. Growth, and the attention behind it, answers the third.',
    'This chapter follows the order a manager meets them in. It begins with giving feedback that people can use, moves to managing performance against goals that matter to both the person and the organisation, and then defines growth for everyone, not only for those ready for the next level. It ends with the limits of leading by example, and what takes its place: trust and influence.',
  ],
  outcomes: [
    'A way of giving feedback that is warm, objective and consistent',
    'A cadence and a set of tenets your team has agreed together',
    'A private one-page profile for each person you lead',
    'Team goals that cascade into individual goals, with measures set in advance',
    'A recommendation for the next level that is clear, complete and fair',
    'A definition of growth for every person, and a map of trust across the team',
  ],

  // ── Part 1: Giving feedback ────────────────────────────────────────────────
  feedback: {
    lead: 'Feedback is the most frequent thing a manager does, and the thing most often done carelessly. It goes wrong in two ways: it arrives as opinion, or it forgets to say thank you. This part addresses both.',
    points: [
      { title: 'Acknowledge the effort. Appreciate what worked.',
        text: 'Whatever the relationship, and whatever the message, begin by recognising what the person put in and what went well. The method will change as trust grows. This will not.',
        ask: 'Before your next piece of feedback, write one sentence about the effort you saw.' },
      { title: 'Be objective. Leave out “I think” and “I feel”.',
        text: 'A review is not a statement of taste. Say what you observed, what it affected and what it is measured against. If you cannot name the standard, you are not yet ready to give the feedback.',
        ask: 'Rewrite your last piece of feedback without “I think” or “I feel”, and see what is left.' },
      { title: 'Let the method follow the relationship.',
        text: 'A new relationship often calls for a gentler shape. Once trust is built, you can be plain and spare the sugar, because the person knows you are on their side. The acknowledgement stays either way.',
        ask: 'For each person, note whether you have earned directness yet.' },
      { title: 'Make it a rhythm, and make it a rule.',
        text: 'Feedback saved for a review arrives as a surprise. Make it regular, write it down and share the principles with the whole team, so that giving and receiving it feels ordinary.',
        ask: 'Draft three feedback tenets and take them to your team.' },
    ] as Point[],
    methodsLead: 'No single method suits every moment. These five are worth knowing, and worth choosing between on purpose.',
    methods: [
      { name: 'The sandwich', what: 'Appreciation, then the point, then appreciation or a look ahead.',
        when: 'A new relationship, a sensitive moment, or someone who has just taken a risk.',
        watch: 'It can harden into a formula, and people learn to wait for the “but”. Keep the appreciation specific and true.' },
      { name: 'Direct, once trust is built', what: 'Acknowledge the effort, then say the point plainly, with no padding.',
        when: 'When trust is strong and the person has told you they prefer it straight.',
        watch: 'Directness is earned, not assumed. Ask how each person likes to receive feedback.' },
      { name: 'Situation, behaviour, impact', what: 'Describe the moment, what you saw or heard, and the effect it had. The model comes from the Center for Creative Leadership.',
        when: 'Whenever feedback needs to stay concrete and free of opinion.',
        watch: 'Behaviour means what you observed, not what you assume about intent.' },
      { name: 'Feedforward', what: 'Marshall Goldsmith’s idea: offer suggestions for what to try next, in place of a review of what has passed.',
        when: 'When the past cannot be changed and the person needs ideas to move on.',
        watch: 'It should not replace a necessary conversation about something that has already caused harm.' },
      { name: 'Care and challenge together', what: 'From Kim Scott’s Radical Candor: care personally about the person, and challenge their work directly. Use it as a check on yourself.',
        when: 'Before any conversation: am I doing both?',
        watch: 'Challenge without care feels harsh. Care without challenge feels like flattery.' },
    ] as Method[],
    objective: {
      title: 'An objective review in four moves',
      lead: 'When you review someone’s work, the aim is a conclusion that someone else, shown the same evidence and the same standard, would also reach. That takes four moves.',
      steps: [
        { title: 'Observe', text: 'Describe what you saw or read, with the date and the work. Facts only.' },
        { title: 'Measure against a standard', text: 'Name what it is measured against: the expectation for the level, the goal, the agreed metric or a tenet of the team.' },
        { title: 'Explain the impact', text: 'Say what it did to the user, the work, the team or the goal.' },
        { title: 'Agree the next step', text: 'Say what good looks like, ask for their view, and offer your support.' },
      ] as Step[],
      test: 'The test: could someone else look at the same evidence and the same standard and reach the same conclusion? If not, the review is still an opinion.',
    },
    cadenceLead: 'A method is only as good as the rhythm it lives in. Set the cadence once, agree it with the team, and let it become part of how the work gets done.',
    cadence: [
      { title: 'In every one-to-one', text: 'A few minutes on recent work: one thing that went well, and one to try.' },
      { title: 'After a milestone or a review', text: 'Within two days, while the work is fresh.' },
      { title: 'Between peers and from partners', text: 'Teach the team to give feedback sideways, and ask the people who work alongside you for theirs.' },
      { title: 'At formal reviews', text: 'No surprises. Everything in the review has been said before.' },
    ] as Step[],
    tenetsLead: 'Then write the rules down. A short list that the team agreed to is worth more than a long one that the manager wrote. A few to begin from:',
    tenets: [
      'We acknowledge the effort first, always.',
      'We give evidence and a standard, never opinion.',
      'We give feedback within two days of the work.',
      'We give hard feedback in private and appreciation in public.',
      'Feedback goes in every direction, including to the manager.',
    ],
    receive: 'Ask for feedback on yourself, and answer it where everyone can see. Nothing makes a tenet more believable.',
  },

  // ── Part 2: Performance management ─────────────────────────────────────────
  performance: {
    lead: 'Performance management works when it begins with the person, connects to what the organisation needs, and ends with measures that both people agreed in advance. It also includes the quieter work of recommending someone for the next level.',
    points: [
      { title: 'Begin with the person, privately.',
        text: 'I keep a one-page profile for each person in my team: their background, their skills and their aspirations. I do not ask them to fill it in. I ask questions in conversation and write it myself, and it stays with me.',
        ask: 'Write the one-pager for the person you know least well.' },
      { title: 'Look for the overlap.',
        text: 'A goal that serves only the organisation gets delivered. A goal that also serves the person gets owned. The craft is in finding where the two meet.',
        ask: 'For one person, mark where an aspiration and a team goal overlap.' },
      { title: 'Decide the measure before the work begins.',
        text: 'Agree what will be measured, how and when, using SMART goals, so that the review is a comparison and not a debate.',
        ask: 'Pick one goal and write its metric, its source and its review date.' },
      { title: 'When you cannot decide, you can still recommend.',
        text: 'The decision about the next level is often not yours to make. Your part is to make the case so clear, complete and fair that the person who decides can say yes with confidence.',
        ask: 'Start a running evidence note for each person on your team.' },
    ] as Point[],
    cascade: {
      title: 'From organisational goal to individual performance',
      lead: 'Six steps that carry a goal from the top of the organisation to a single person, and back again at review.',
      steps: [
        { title: 'Know the person', text: 'Build the one-page profile from conversation: background, skills and aspirations.' },
        { title: 'Read the organisation’s goals', text: 'Understand what the organisation is trying to achieve this year, in its own words.' },
        { title: 'Set the team’s goals', text: 'Translate the organisational goals into team objectives and key results.' },
        { title: 'Find the overlap', text: 'Turn team goals into individual goals, choosing the ones that also serve what the person wants.' },
        { title: 'Define the metrics', text: 'Write each goal as a SMART goal, with a measure, a source and a date.' },
        { title: 'Review against the metrics', text: 'At each review, compare the work with what was agreed. When circumstances change, change the goal, and say so.' },
      ] as Step[],
      smart: [
        { term: 'Specific', text: 'It says exactly what will be done.' },
        { term: 'Measurable', text: 'You can tell, with a number or a clear sign, whether it happened.' },
        { term: 'Achievable', text: 'It stretches the person without breaking them.' },
        { term: 'Relevant', text: 'It serves a team goal and something the person wants.' },
        { term: 'Time-bound', text: 'It has a date.' },
      ],
    },
    recommend: {
      title: 'Recommending someone for the next level',
      lead: 'When someone is ready and the decision is not yours, a recommendation is the most useful thing you can write. It needs to be persuasive, and it needs to be true.',
      steps: [
        { title: 'Gather the evidence', text: 'Collect work, outcomes and dates, from the person and from the people who have worked with them.' },
        { title: 'Read what the next level asks for', text: 'Use the criteria as written. Note the breadth they expect, including how the person works across other disciplines.' },
        { title: 'Map the evidence', text: 'Place each piece of evidence against a criterion. Where there is none, note the gap honestly.' },
        { title: 'Choose the form', text: 'A short deck with one slide for each criterion, or an email that carries the same evidence. Use the form the decision maker prefers.' },
        { title: 'Write to persuade', text: 'Begin with a summary of three sentences. Follow with the evidence, the impact in numbers where you have them, and the voices of partners. Name the gaps, and the plan to support them.' },
        { title: 'Check for fairness', text: 'Compare the case with others at the same level. Ask whether the evidence maps to the criteria and not only to effort. Tell the person what you are doing.' },
      ] as Step[],
      close: 'When growth is happening in the team, the team stays healthy. Performance managed with no growth in view turns mundane, and people begin to look elsewhere.',
    },
    shortfall: {
      title: 'When performance falls short',
      lead: 'An addition worth considering. The same care applies when the work is below what was agreed, and the kindest thing is usually to be early and clear.',
      steps: [
        { title: 'Say it early', text: 'Name it when you first see it, not when the review comes round.' },
        { title: 'Be specific', text: 'Use the evidence and the standard, as in any objective review.' },
        { title: 'Agree the support, with dates', text: 'Write down what will change, what help you will give and when you will look again.' },
        { title: 'Review and decide', text: 'Look at the evidence on the date you agreed, and say plainly what happens next.' },
      ] as Step[],
    },
  },

  // ── Part 3: People's growth ────────────────────────────────────────────────
  growth: {
    lead: 'Growth is what keeps people. The next level is one form of it, and it cannot be offered to everyone at every cycle. Defining growth for each person, and making it visible, keeps people confident and moving, whatever their rating.',
    points: [
      { title: 'Growth is wider than the next level.',
        text: 'If someone has an average rating, or the timing is not right, growth still has a meaning for them. Your task is to define it.',
        ask: 'Pick someone whose next level is not yet on the table, and write what growth could mean for them this quarter.' },
      { title: 'Define it person by person.',
        text: 'With the one-pager in hand, ask what growth means to this person. The answer will differ from everyone else’s.',
        ask: 'Ask the question in your next one-to-one, and listen for the words they use.' },
      { title: 'Make it visible.',
        text: 'When people can see that they are growing, they gain confidence, and confidence is the right attitude to bring to the work. Name progress when it happens, and name the evidence.',
        ask: 'Tell one person this week where you have seen them grow.' },
      { title: 'Retention follows growth.',
        text: 'Where performance is managed and growth is never defined, the work turns mundane and people start to look elsewhere.',
        ask: 'Ask each person what would make them stay, and what would make them leave.' },
    ] as Point[],
    dimensionsLead: 'Growth has more than one dimension. Five are worth asking about, for everyone.',
    dimensions: [
      { name: 'Financial', means: 'Reward that reflects the scope and value of the work, now and over time.', ask: 'What does fair reward look like for you? What are you working towards?', do: 'Know what you can and cannot influence. Raise the case where it belongs. Be honest about timing.' },
      { name: 'Career', means: 'A path to the next level, a wider role, or a different kind of work.', ask: 'Where would you like to be in two or three years? What would you like to own?', do: 'Give scope before the title. Name the criteria. Write the recommendation when the evidence is there.' },
      { name: 'Emotional', means: 'Confidence, recognition, belonging, and a sense that the work matters.', ask: 'When do you feel most valued here? What would help you feel more trusted?', do: 'Acknowledge effort and results with specifics. Credit people in front of others. Notice when someone is stretched thin.' },
      { name: 'Hard skills', means: 'Craft, tools, methods and domain knowledge.', ask: 'What would you like to be better at in six months? What would you like to learn?', do: 'Pair people. Offer a project that needs the skill. Make time for learning, and protect it.' },
      { name: 'Soft skills', means: 'Communication, influence, facilitation and leading others.', ask: 'Where would you like to be more confident? Who would you like to learn from?', do: 'Coach before a hard conversation or a presentation. Offer a chance to lead a meeting or a workshop.' },
    ],
    noStepLead: 'When the next level is not the right step this cycle, growth still has somewhere to go.',
    noStep: [
      { title: 'Scope', text: 'A workstream of their own.' },
      { title: 'Visibility', text: 'A chance to present the work.' },
      { title: 'Learning', text: 'A course, a pairing or a project that stretches them.' },
      { title: 'Recognition', text: 'Credit given in the open, with specifics.' },
      { title: 'Reward', text: 'An honest conversation about it.' },
      { title: 'A trial of the next level', text: 'A stretch role that tests the work in advance.' },
    ] as Step[],
  },

  // ── Part 4: What is wrong with lead by example ─────────────────────────────
  example: {
    lead: '“Lead by example” is good advice that runs out of road. It works for how you behave and, sometimes, for how you work. It stops working the moment you lead people, because much of a leader’s work is work the team is not asked to do.',
    points: [
      { title: 'The paradox.',
        text: 'If people follow what you do, but you are not meant to do what they do, then what is there to follow? You make decisions. You enable other people’s growth. Neither belongs to the team.',
        ask: 'List what you do in a week that no one on your team is asked to do.' },
      { title: 'Example works for behaviour.',
        text: 'How you give feedback, how you disagree, how you own a mistake, how you treat people when things are tight. These can be seen, and so they can be followed. In some cases, craft can be shown too.',
        ask: 'Choose one behaviour you want from the team, and do it visibly this week.' },
      { title: 'Where example runs out, influence takes over.',
        text: 'In the most challenging areas, the work is either yours alone or your team member’s alone. There you lead through influence: people follow your direction because they trust your judgement.',
        ask: 'For one hard decision, write down how you will explain it, not only announce it.' },
      { title: 'Influence rests on trust, and trust is human.',
        text: 'Trust is not built at work alone. A person is more than a role, and to build trust you will need to step into a space that is a little more human, if not personal. Not everything is professional.',
        ask: 'Learn one thing about each person that has nothing to do with the work, if they are glad to share it.' },
      { title: 'Read the room, then each person in it.',
        text: 'Notice the sentiment of the team and of each individual. Patterns of behaviour differ, people need different things, and the dynamic with each person will be different. This is organisational psychology put to daily use.',
        ask: 'Write one sentence on how the team feels today, and one on each person.' },
    ] as Point[],
    choiceLead: 'Not every situation asks for the same kind of leadership. A simple way to tell them apart:',
    choice: [
      { situation: 'Behaviour: feedback, disagreement, owning mistakes', way: 'Lead by example', how: 'Do it visibly, every time.' },
      { situation: 'Craft you still practise', way: 'Lead by example, where it is true', how: 'Share the work, including the rough parts.' },
      { situation: 'Decisions and trade-offs', way: 'Lead by influence', how: 'Explain the reasoning in the open and invite challenge.' },
      { situation: 'Enabling someone’s growth', way: 'Lead by influence', how: 'Make the case, give scope, and be clear about what you can and cannot decide.' },
      { situation: 'Hard conversations and conflict', way: 'Both', how: 'Be visible about how you approach them. Keep what is private, private.' },
    ],
    trust: {
      title: 'Building trust across the team',
      lead: 'Four habits that build the kind of trust influence depends on.',
      steps: [
        { title: 'Notice', text: 'Pay attention to the sentiment of the team and of each person. What changed recently?' },
        { title: 'Understand', text: 'Learn how each person behaves, and what matters to them beyond the work.' },
        { title: 'Adapt', text: 'Change how you communicate with each person, not what you stand for.' },
        { title: 'Invest', text: 'Give regular time that is not about tasks, and keep it.' },
      ] as Step[],
      note: 'Archetypes can help you adapt. They are not boxes. When someone surprises you, update the page.',
    },
  },
}

/** The seven PDF worksheets for chapter 2, in the order they are used. */
export const chapterTwoDocs: HiringDoc[] = [
  { slug: 'feedback-preparation-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'Feedback Preparation Worksheet', summary: 'Prepare feedback that is appreciative, objective and clear before you say a word.' },
  { slug: 'feedback-cadence-and-tenets-worksheet', kind: 'Worksheet', part: 1, pages: 2, title: 'Feedback Cadence and Tenets Worksheet', summary: 'Make feedback a regular part of how the team works, and write down the rules everyone follows.' },
  { slug: 'team-member-one-pager', kind: 'Worksheet', part: 2, pages: 2, title: 'Team Member One-Pager', summary: 'A private one-page profile of each person, written by you from conversations, to guide goals, feedback and growth.' },
  { slug: 'goal-cascade-and-metrics-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'Goal Cascade and Metrics Worksheet', summary: 'Turn an organisational goal into team goals, then into individual goals that overlap with what each person wants.' },
  { slug: 'next-level-recommendation-worksheet', kind: 'Worksheet', part: 2, pages: 2, title: 'Next-Level Recommendation Worksheet', summary: 'Gather the evidence, map it to the next level and write a recommendation that is clear, complete and fair.' },
  { slug: 'growth-definition-worksheet', kind: 'Worksheet', part: 3, pages: 2, title: 'Growth Definition Worksheet', summary: 'Define what growth means for each person in five dimensions, so people can see themselves growing.' },
  { slug: 'team-dynamics-and-trust-map', kind: 'Worksheet', part: 3, pages: 2, title: 'Team Dynamics and Trust Map', summary: 'Understand each person as a whole human being, and plan how to build trust and influence with them.' },
]
