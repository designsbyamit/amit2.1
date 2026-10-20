// Grow · Practice Toolkits. Topic-wise design challenges: do the work, reflect, then compare approaches.

export interface Approach { name: string; how: string; tradeoff: string }
export interface Challenge {
  id: string
  title: string
  level: 'Warm-up' | 'Core' | 'Stretch'
  minutes: number
  scenario: string
  task: string[]
  constraints: string[]
  reflect: string[]
  approaches: Approach[]
}
export interface Topic { id: string; title: string; kicker: string; blurb: string; challenges: Challenge[] }

export const topics: Topic[] = [
  {
    id: 'framing', title: 'Framing the problem', kicker: 'BEFORE ANY SCREEN',
    blurb: 'Most weak design starts as a well-made answer to a badly stated question. Practise stating the question.',
    challenges: [
      {
        id: 'rewrite-the-brief', title: 'Rewrite the brief', level: 'Warm-up', minutes: 20,
        scenario: 'A stakeholder sends you one line: “We need a dashboard for managers.” Nothing else.',
        task: ['Write the three questions you would ask first, and why each one changes the design.', 'Write the problem as one sentence with a person, a situation and an outcome, with no solution in it.', 'Rewrite it a second time for a different manager and notice what changes.'],
        constraints: ['No mention of “dashboard”, “charts” or “widgets” in the problem sentence.', 'The sentence must be testable: you could tell whether it was solved.'],
        reflect: ['Which of your questions was really about the stakeholder, not the user?', 'What did you assume about “managers” that you could not yet know?', 'How would you check your sentence in a day, not a month?'],
        approaches: [
          { name: 'Job to be done', how: 'When [situation], a manager wants to [motivation], so they can [outcome].', tradeoff: 'Keeps you off solutions; can feel abstract to stakeholders who want to see something.' },
          { name: 'Decision first', how: 'Start from the decision the manager makes each week and work backwards to the data it needs.', tradeoff: 'Very concrete and testable; assumes you can name the decision, which needs a conversation first.' },
          { name: 'Pain first', how: 'Describe the current workaround in detail (spreadsheets, forwarded emails) and what it costs.', tradeoff: 'Builds the case quickly; can anchor you to fixing the workaround rather than the goal.' },
        ],
      },
      {
        id: 'one-assumption', title: 'One assumption, five whys', level: 'Core', minutes: 30,
        scenario: 'Your team wants to add a “smart suggestions” panel to an invoicing tool because “users want faster invoicing”.',
        task: ['List five assumptions inside that sentence.', 'Pick the one that would hurt most if wrong. Ask “why” five times to find what sits underneath it.', 'Design the cheapest possible test of that assumption that is not building the feature.'],
        constraints: ['The test must run in under two days.', 'It must be able to prove you wrong.'],
        reflect: ['Which assumption were you most attached to?', 'What would you have built if you had skipped this step?', 'Who would you need to convince to run your test?'],
        approaches: [
          { name: 'Fake door', how: 'Show the entry point and measure intent before building anything behind it.', tradeoff: 'Fast and cheap; measures curiosity, not whether the feature would actually help.' },
          { name: 'Five conversations', how: 'Talk to five people who invoice, and watch one of them do it.', tradeoff: 'Rich and fast; small sample, so look for patterns, not proof.' },
          { name: 'Concierge', how: 'Do the “smart suggestion” by hand for a few users and see if they change behaviour.', tradeoff: 'Tests value, not usability; labour-heavy so it only works for a handful.' },
        ],
      },
      {
        id: 'say-no-to-a-feature', title: 'Say no to a feature', level: 'Stretch', minutes: 40,
        scenario: 'A senior stakeholder asks for a feature that two customers have requested. You think it will clutter the product.',
        task: ['Write what you would say in the room: three sentences, no jargon.', 'Offer an alternative that serves the underlying need.', 'Name what evidence would change your mind.'],
        constraints: ['You may not say the word “because” followed by “users”: be specific about which users.', 'The alternative must be something the team could ship in the same effort.'],
        reflect: ['What did the stakeholder actually care about?', 'Did your “no” protect the product, or your taste?', 'What would a “yes, and” look like?'],
        approaches: [
          { name: 'Reframe the need', how: 'Restate the request as the problem behind it, then show two ways to serve it.', tradeoff: 'Keeps the relationship intact; can read as dodging if the stakeholder wanted a yes.' },
          { name: 'Trade-off table', how: 'Show what the feature costs in complexity, support and the things it would push down the roadmap.', tradeoff: 'Makes the decision shared; needs honest numbers you may not have yet.' },
          { name: 'Time-box a test', how: 'Agree to a small, reversible experiment with a clear success bar.', tradeoff: 'Moves the conversation forward; the experiment itself must be cheap to be worth it.' },
        ],
      },
    ],
  },
  {
    id: 'flows', title: 'Flows and interaction', kicker: 'MAKING IT WORK',
    blurb: 'Good flows feel obvious because someone removed a hundred small decisions. Practise removing them.',
    challenges: [
      {
        id: 'four-screens', title: 'A returns flow in four screens', level: 'Warm-up', minutes: 30,
        scenario: 'A customer wants to return one item from a three-item order. Design the whole flow in four screens or fewer.',
        task: ['Sketch the four screens and the single action on each.', 'Mark where the customer could get stuck and what the screen says when they do.', 'Cut one screen. What breaks?'],
        constraints: ['One primary action per screen.', 'Every screen must say where the customer is and what happens next.'],
        reflect: ['Which screen did you want to add and why?', 'Where did you make the customer do work the system could do?', 'What is the worst moment in your flow, and how would you know?'],
        approaches: [
          { name: 'Linear', how: 'Pick item, say why, choose refund or exchange, confirm.', tradeoff: 'Easy to follow and test; slow for customers who know what they want.' },
          { name: 'Single page', how: 'Everything on one screen with progressive disclosure.', tradeoff: 'Fastest for confident users; denser and harder to make accessible.' },
          { name: 'Conversational', how: 'A short guided exchange that asks only what it needs.', tradeoff: 'Gentle for newcomers; harder to scan and to correct a mistake.' },
        ],
      },
      {
        id: 'empty-loading-error', title: 'Empty, loading, error', level: 'Core', minutes: 35,
        scenario: 'Take any list screen you have designed. Design the three states nobody reviews: empty, loading and error.',
        task: ['Draw each state for a first-time user and for a returning user.', 'Write the exact words on each, as if the product had a voice.', 'Decide what the user can do from each state.'],
        constraints: ['No state may be a dead end.', 'The error state must tell the user whether it is their fault.'],
        reflect: ['Which state did you find hardest to write for?', 'What does the empty state teach a new user?', 'Which of these would you defend if there were no time to build it?'],
        approaches: [
          { name: 'Teach in the empty state', how: 'Show what will appear here and the single best first action.', tradeoff: 'Turns blank screens into onboarding; risks nagging users who know what they are doing.' },
          { name: 'Skeleton loading', how: 'Show the shape of the content while it loads.', tradeoff: 'Feels fast; misleading if the content shape often changes.' },
          { name: 'Recoverable errors', how: 'Say what happened, keep the user’s work, offer a retry and a way out.', tradeoff: 'Builds trust; takes engineering time to preserve state.' },
        ],
      },
      {
        id: 'cut-the-steps', title: 'Cut the steps', level: 'Stretch', minutes: 45,
        scenario: 'A task takes seven actions in an enterprise tool, and the most common version of it is always the same.',
        task: ['Map the seven actions and mark which ones the user decides and which ones they merely perform.', 'Redesign so the common case takes two actions.', 'Say what you moved, what you removed and what you made the system decide.'],
        constraints: ['The rare case must still be possible.', 'Nothing risky may become one click without a way back.'],
        reflect: ['What did you assume was “common”? How would you check?', 'Where did you trade control for speed?', 'How would an expert and a newcomer each experience your version?'],
        approaches: [
          { name: 'Smart defaults', how: 'Pre-fill the likely answers and let people edit.', tradeoff: 'Big time saver; wrong defaults quietly cause errors.' },
          { name: 'Shortcuts for experts', how: 'Keep the full flow but add a direct entry for frequent tasks.', tradeoff: 'Serves both groups; adds a second path to maintain.' },
          { name: 'Progressive disclosure', how: 'Show the essentials first and reveal the rest on demand.', tradeoff: 'Reduces noise; hides options people may need to find.' },
        ],
      },
    ],
  },
  {
    id: 'craft', title: 'Visual craft', kicker: 'THE DETAILS THAT CARRY IT',
    blurb: 'Craft is not decoration. It is the care that makes the next decision easier for the reader.',
    challenges: [
      {
        id: 'three-hierarchies', title: 'One screen, three hierarchies', level: 'Warm-up', minutes: 25,
        scenario: 'Take a single screen with a title, a status, a primary number, a table and one action.',
        task: ['Lay it out three times, each time making a different element the first thing seen.', 'Use only size, weight, position and contrast to do it.', 'Squint at each and say what you see first, second and third.'],
        constraints: ['One typeface, two weights, no colour beyond one accent.', 'No boxes or borders added just to separate things.'],
        reflect: ['Which version matched what the user actually needs first?', 'What did you have to give up to make one thing loud?', 'Which of your choices would survive a different screen size?'],
        approaches: [
          { name: 'Number first', how: 'The primary number carries the page; everything else supports it.', tradeoff: 'Strong for monitoring tasks; weak when the task is to act, not to read.' },
          { name: 'Action first', how: 'The call to action leads; the data is context.', tradeoff: 'Drives completion; can push people to act before they have understood.' },
          { name: 'Status first', how: 'The state of the thing leads, so exceptions are seen at once.', tradeoff: 'Great for triage; needs a calm default state to work.' },
        ],
      },
      {
        id: 'type-and-spacing', title: 'Type and spacing from scratch', level: 'Core', minutes: 40,
        scenario: 'Design a small type and spacing system for a content-heavy page, and then use it.',
        task: ['Choose a type scale of five sizes and justify each in one line.', 'Choose a spacing scale of six steps based on one base unit.', 'Apply them to a page and list every place you were tempted to break them.'],
        constraints: ['Body text between 16 and 18 px, and a comfortable line length.', 'Every gap on the page must come from your spacing scale.'],
        reflect: ['Where did the system help you decide faster?', 'Where did it fight you, and was the system or the design wrong?', 'How would you explain it to a developer in two sentences?'],
        approaches: [
          { name: 'Modular scale', how: 'Multiply by a fixed ratio from a base size.', tradeoff: 'Harmonious and predictable; jumps get large at the top of the scale.' },
          { name: 'Hand-tuned steps', how: 'Pick sizes by eye and name them by purpose.', tradeoff: 'Fits the content exactly; harder to extend consistently.' },
          { name: 'Fluid type', how: 'Let sizes scale smoothly between a minimum and a maximum.', tradeoff: 'Looks right at every width; harder to test and to hand off.' },
        ],
      },
      {
        id: 'colour-with-restraint', title: 'Colour with restraint', level: 'Stretch', minutes: 40,
        scenario: 'Design a status-heavy screen using one hue for emphasis and neutrals for everything else.',
        task: ['Define your neutrals and your one accent, with a purpose for each.', 'Show three states (ok, needs attention, failed) without relying on colour alone.', 'Check contrast and then check the screen in greyscale.'],
        constraints: ['Text contrast must meet accessibility guidelines.', 'The accent may be used for one kind of thing only.'],
        reflect: ['What did the greyscale version teach you?', 'Which state needed more than colour to be understood?', 'What would you lose if the brand colour changed tomorrow?'],
        approaches: [
          { name: 'One accent, many neutrals', how: 'Use the accent for the single thing you want noticed.', tradeoff: 'Calm and premium; leaves little room for rich status coding.' },
          { name: 'Semantic palette', how: 'Reserve red, amber and green for status, with a neutral brand.', tradeoff: 'Instantly understood; needs icons or labels for colour-blind users.' },
          { name: 'Shape and weight first', how: 'Differentiate states with icon, label and weight; add colour last.', tradeoff: 'Accessible by default; takes more space on a dense screen.' },
        ],
      },
    ],
  },
  {
    id: 'ai', title: 'Designing with AI', kicker: 'NEW MATERIAL, OLD JUDGEMENT',
    blurb: 'AI changes what a screen can do, not what a person needs. Practise deciding what to automate and where a person decides.',
    challenges: [
      {
        id: 'when-should-it-ask', title: 'When should the assistant ask?', level: 'Warm-up', minutes: 25,
        scenario: 'An assistant helps people book meeting rooms. Sometimes it is sure what to do. Sometimes it is not.',
        task: ['List five situations: two where it should act, two where it should ask, one where it should stop.', 'Write the exact question it asks in each “ask” case.', 'Say what the assistant does if the person ignores the question.'],
        constraints: ['No question may be longer than one sentence.', 'Asking must always be cheaper than getting it wrong.'],
        reflect: ['What made one situation safe to automate and another not?', 'How did you decide where “sure enough” begins?', 'How does the person undo an action?'],
        approaches: [
          { name: 'Act, then show', how: 'Do the likely thing and make the result easy to undo.', tradeoff: 'Feels effortless; needs a very cheap undo and low stakes.' },
          { name: 'Propose, then confirm', how: 'Offer one clear suggestion for a quick yes or no.', tradeoff: 'Keeps control with the person; adds a step to every task.' },
          { name: 'Ask when confidence is low', how: 'Use the system’s own uncertainty to decide when to interrupt.', tradeoff: 'Balances speed and safety; only as good as the confidence signal.' },
        ],
      },
      {
        id: 'show-the-work', title: 'Show the work', level: 'Core', minutes: 35,
        scenario: 'An AI reads a document and fills a form. The user must decide whether to trust it.',
        task: ['Design how the system shows where each value came from.', 'Design how it shows what it is unsure about, without alarming the user.', 'Decide what the user can fix and how that teaches the system.'],
        constraints: ['No percentage may be shown unless you can say what it means to the user.', 'The user must be able to check a value in one action.'],
        reflect: ['What does the user need in order to trust it a little more each time?', 'When does showing uncertainty become noise?', 'What happens to a value the user corrected?'],
        approaches: [
          { name: 'Source highlights', how: 'Link each value to the exact place it was read from.', tradeoff: 'Builds trust fast; needs the source to be visible alongside.' },
          { name: 'Confidence bands', how: 'Group values into “sure”, “check this” and “missing”.', tradeoff: 'Easy to scan; the grouping thresholds must be honest and tested.' },
          { name: 'Exceptions only', how: 'Show only what needs a person and keep the rest collapsed.', tradeoff: 'Saves time; users may stop looking at what is hidden.' },
        ],
      },
      {
        id: 'the-human-gate', title: 'Design the human gate', level: 'Stretch', minutes: 45,
        scenario: 'An agent prepares decisions about supplier order confirmations. A person must decide at a few points. You choose where.',
        task: ['Map the flow from document received to order closed and mark what the agent does.', 'Choose where a person decides and say why each gate exists.', 'Describe what the person sees at a gate so a decision takes seconds, not minutes.'],
        constraints: ['The agent may never accept or reject a deviation on its own.', 'Every gate must name its owner.'],
        reflect: ['Which gate could you later relax, and what would you need to see first?', 'What did you make the agent explain, and in what words?', 'Who is accountable when the agent is wrong?'],
        approaches: [
          { name: 'Few, heavy gates', how: 'Let the agent run until a clear decision point and ask for a considered yes or no.', tradeoff: 'Less interruption; each decision needs good context to be quick.' },
          { name: 'Many, light checks', how: 'Ask for quick confirmations along the way.', tradeoff: 'Safer early on; trains people to click through without reading.' },
          { name: 'Growing autonomy', how: 'Start with recommendations and widen what the agent may do as trust is earned.', tradeoff: 'A natural path to scale; needs clear limits written down at each level.' },
        ],
      },
    ],
  },
  {
    id: 'communicate', title: 'Communicating decisions', kicker: 'MAKING THE WORK LAND',
    blurb: 'A decision only exists once someone else understands it. Practise explaining yours.',
    challenges: [
      {
        id: 'ninety-seconds', title: 'Defend a trade-off in 90 seconds', level: 'Warm-up', minutes: 20,
        scenario: 'You chose simplicity over flexibility in a settings screen. An engineering lead wants more options exposed.',
        task: ['Write the 90-second version out loud, in four sentences.', 'Include what you gave up and who pays for it.', 'End with what would change your mind.'],
        constraints: ['No design jargon.', 'You may not begin with “users prefer”.'],
        reflect: ['Which sentence carried the argument?', 'Did you name what you gave up?', 'What would they ask next?'],
        approaches: [
          { name: 'Problem, choice, cost', how: 'State the problem, your choice and what it costs.', tradeoff: 'Clear and honest; needs you to know the cost.' },
          { name: 'Show, then tell', how: 'Put two options side by side and walk through one task.', tradeoff: 'Persuasive; takes preparation and a screen to share.' },
          { name: 'Ask first', how: 'Ask what they are worried about and answer that.', tradeoff: 'Builds the relationship; the 90 seconds is not yours to plan.' },
        ],
      },
      {
        id: 'case-study-opening', title: 'Write the case-study opening', level: 'Core', minutes: 35,
        scenario: 'Take a project you are proud of. Write the first 150 words of its case study.',
        task: ['State the problem and why it mattered, before you say what you made.', 'State your role in one sentence.', 'End with the outcome, in plain words.'],
        constraints: ['No adjectives like “beautiful” or “seamless”.', 'No numbers you cannot stand behind.'],
        reflect: ['Would a stranger know what was at stake?', 'Is your role clear without claiming the team’s work?', 'What is the one sentence you would keep if you could keep only one?'],
        approaches: [
          { name: 'Outcome first', how: 'Open with the change, then explain how it came about.', tradeoff: 'Hooks a busy reader; needs a real outcome to stand on.' },
          { name: 'Problem first', how: 'Open with the situation before the work.', tradeoff: 'Builds context; can feel slow if the problem is already well known.' },
          { name: 'Person first', how: 'Open with the person who struggled and what happened to them.', tradeoff: 'Memorable; keep it truthful, not dramatised.' },
        ],
      },
      {
        id: 'critique-without-prescribing', title: 'Critique without prescribing', level: 'Stretch', minutes: 30,
        scenario: 'A colleague shares a design that is not working yet. You have ten minutes of their time.',
        task: ['Write five comments that describe what you see and what it does to the user, with no fixes.', 'Write two questions that would help them find the fix.', 'Say what is working, specifically.'],
        constraints: ['Do not use the words “should” or “just”.', 'Each comment must refer to a goal.'],
        reflect: ['Which comment was secretly your preference?', 'How would your feedback change for a junior and for a peer?', 'What would you want to hear if it were your work?'],
        approaches: [
          { name: 'Goal, observation, effect', how: 'Say what the work is for, what you see and what it does to the reader.', tradeoff: 'Keeps the conversation about the work; needs a shared goal.' },
          { name: 'Questions only', how: 'Ask until they find it themselves.', tradeoff: 'Builds judgement; can feel evasive when time is short.' },
          { name: 'Two options', how: 'Offer two different directions and let them choose.', tradeoff: 'Gives a way forward; risks the work becoming yours.' },
        ],
      },
    ],
  },
]

export const findChallenge = (topicId?: string, id?: string) => {
  const topic = topics.find(t => t.id === topicId)
  const idx = topic ? topic.challenges.findIndex(c => c.id === id) : -1
  return topic && idx >= 0 ? { topic, challenge: topic.challenges[idx], index: idx } : null
}
export const totalChallenges = topics.reduce((a, t) => a + t.challenges.length, 0)
