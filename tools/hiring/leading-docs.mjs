// Worksheets for the Leading Design book. Rendered by tools/hiring/build.mjs with:  ONLY=leading NODE_PATH=$(npm root -g) node tools/hiring/build.mjs
// They are separate from the hiring handbooks and are not bundled into them.
export const leadingDocs = [
  {
    slug: 'team-shape-and-capability-worksheet', kind: 'Worksheet', part: 1, partLabel: 'Leading Design · Building a design team',
    title: 'Team Shape and Capability Worksheet',
    sub: 'Decide what the team needs to become before you decide who to hire.',
    use: 'Fill this in with your own leader or product partner before you open a requisition. Sections 1 to 3 describe the team you need. Sections 4 to 6 turn that into decisions.',
    blocks: [
      { t: 'h', text: '1. The vision we are building toward' },
      { t: 'boxes', cols: 1, items: [
        { title: 'What leadership wants design to be in the next twelve to twenty-four months', hint: 'Ask them. Write it in their words, not yours.', n: 3 },
        { title: 'The business and product bets the team must support', hint: 'Where will the organisation put its effort?', n: 3 },
        { title: 'What would be different if the team succeeded', hint: 'Two or three things someone outside design would notice', n: 2 },
      ] },
      { t: 'h', text: '2. The work the team will do' },
      { t: 'table', cols: ['Area of work', 'Share of effort today', 'Share in twelve months', 'Skills it needs'], rows: [], blank: 5, rowH: 38 },
      { t: 'pb' },
      { t: 'h', text: '3. Skills: broad or deep' },
      { t: 'p', text: 'For each capability, mark the depth you need (1 aware, 2 working, 3 strong, 4 leads others) now and in twelve months, then who has it today.' },
      { t: 'table', cols: ['Capability', 'Need now', 'Need in 12 months', 'Who has it today', 'Gap'], rows: [['Research and discovery'], ['Interaction and service design'], ['Visual and brand craft'], ['Content and conversation design'], ['Prototyping and testing'], ['Design systems'], ['Data and AI fluency'], ['Facilitation and storytelling'], ['']], blank: 0, rowH: 30 },
      { t: 'p', text: 'Look at the pattern. Mostly 2s across the board is a broad team. A few 4s and many 1s is a deep one. Neither is wrong, but the team should be one on purpose.' },
      { t: 'h', text: '4. The shape of the team' },
      { t: 'boxes', cols: 3, items: [
        { title: 'Roles we have', hint: 'By level and capability', n: 4 },
        { title: 'Roles we need', hint: 'What is missing for sections 1 to 3', n: 4 },
        { title: 'Where we depend on partners', hint: 'Product, engineering, data, research, design systems', n: 4 },
      ] },
      { t: 'pb' },
      { t: 'h', text: '5. Culture on purpose' },
      { t: 'p', text: 'A team has a culture whether or not you design one. Name it, so you can hire for it and protect it.' },
      { t: 'boxes', cols: 3, items: [
        { title: 'Three behaviours we want to be known for', hint: 'Specific enough to observe', n: 4 },
        { title: 'How they show up in daily work', hint: 'Meetings, critique, handoffs, how we disagree', n: 4 },
        { title: 'What we will not accept', hint: 'Be honest about what you have tolerated', n: 4 },
      ] },
      { t: 'h', text: '6. Sequence the hires' },
      { t: 'table', cols: ['Role or capability', 'Why now', 'Hire, grow or borrow', 'By when'], rows: [], blank: 5, rowH: 38 },
      { t: 'note', text: 'Take the first hire from this page into the Role Definition Worksheet. Come back to this page every six months. The team you need changes as the work does.' },
    ],
  },
]
