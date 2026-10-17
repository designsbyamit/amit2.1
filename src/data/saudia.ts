const B = import.meta.env.BASE_URL
const I = (n: string) => `${B}images/case-studies/saudia/${n}.webp`

export const saudia = {
  title: 'Saudia: the mobile experience for a carrier serving 30M+ guests a year',
  kicker: 'Service design · OmniChannel · B2C',
  hero: I('saudia-hero'),
  heroAlt: 'The redesigned Saudia app on two phones',
  headline: [
    ['92%', 'engagement boost'],
    ['50×', 'add-on sales'],
    ['9 → 2', 'steps to check in'],
    ['9%', 'faster booking'],
  ] as [string, string][],

  scale: {
    label: 'The scale it serves',
    title: 'A flag carrier with 100M-tourist ambitions.',
    intro: 'Saudia aims to bring 100M tourists a year to the Kingdom by 2030. The digital brief was to grow bookings from a $2M channel to a $100M revenue stream.',
    stats: [
      ['30M+', 'guests flown in 2023, up 21%'],
      ['176,000+', 'flights in 2023'],
      ['100+', 'destinations on four continents'],
    ] as [string, string][],
    note: 'Public figures for scale, not outcomes of this project.',
    directions: [
      ['Effortlessly simple and delightful', 'Every task in as few steps as it can be.'],
      ['Innovation at its core', 'Use new capability where it earns its place.'],
      ['Building trust and connection', 'A carrier that feels like one brand on every channel.'],
    ] as [string, string][],
    streams: { image: I('saudia-01'), alt: 'Four workstreams: service design and research, enhancements, innovative initiatives, new experience channels', note: 'Four workstreams ran side by side: service design and research, enhancements, innovative initiatives and new experience channels.' },
  },

  problem: {
    label: '02 · The problem',
    title: 'Six kinds of failure, one cause.',
    intro: 'A UX audit found failures everywhere. They shared a root: the digital team was organised around functional owners, each building on their own, so the whole never added up.',
    audit: { image: I('saudia-03'), alt: 'Homepage audit showing 183 issues and a benchmark of 54 competitors', note: 'The homepage alone: 183 issues, 21 of them major. The audit benchmarked 54 competitor experiences.' },
    before: { image: I('saudia-11'), alt: 'The existing Saudia website and app', note: 'The existing website and app.' },
    failures: [
      ['Navigation and discoverability', 'No consistent model for moving between journeys. Every section had to be relearned.'],
      ['Fragmented experience', 'Booking, manage, check-in and add-ons each had their own logic and visual language.'],
      ['Poor information architecture', 'Content was organised by team, not by what a traveller is trying to do.'],
      ['Hidden add-ons', 'Extras sat so deep in the booking flow that most people never found them.'],
      ['Brand inconsistency', 'The web and the app did not feel like the same airline.'],
      ['Accessibility', 'Little consideration for one of the region’s busiest carriers.'],
    ] as [string, string][],
  },

  reframe: {
    label: '03 · The reframe',
    title: 'A service architecture problem, not a UI problem.',
    body: [
      'The friction that mattered most was physical before it was digital. So research started in airport lounges, not in analytics.',
      'We designed journeys instead of features. Stakeholders stopped asking for screens and started asking for journeys.',
    ],
    process: { image: I('saudia-02'), alt: 'Four stages: users’ needs and business goals, design solution, testing and validation, insights-based optimisation', note: 'Four stages: needs and business goals, design solution, testing and validation (qualitative, quantitative, C-R-I-S-P), then optimisation from the insights.' },
  },

  people: {
    label: '04 · The people',
    title: 'Designed around how people actually travel.',
    intro: 'Surveys, lounge interviews and stakeholder interviews produced six archetypes. Three are shown here.',
    personas: { image: I('saudia-06'), alt: 'Personas: Family Planner, Convenient Worker, Solo Traveller', note: 'Three of the archetypes: the family planner, the convenient worker and the solo traveller.' },
    maps: [
      { image: I('saudia-07'), alt: 'Journey map: discovery, booking, checkout', note: 'Discovery to checkout' },
      { image: I('saudia-08'), alt: 'Journey map: pre-trip, pre-flight, in-flight', note: 'Day before to in-flight' },
      { image: I('saudia-09'), alt: 'Journey map: post-flight, on trip, post trip', note: 'Landing to post-trip' },
    ] as { image: string; alt: string; note: string }[],
    workshop: { image: I('saudia-12'), alt: 'Co-creation workshop with sticky notes and the empathise and insights method cards', note: 'Co-creation with stakeholders: personas, how-might-we questions and a feasibility matrix.' },
  },

  lead: {
    label: '05 · Leading the programme',
    title: 'Five pods. Three-week sprints. One steady rhythm.',
    body: [
      'I led experience strategy across 11+ designers, and the whole mobile experience with an 8–9 person team for almost a year.',
      'Planning, sprints, and daily work with product managers and the client, to timelines that left little slack.',
      'The pods stayed constant while people did not. Designers joined and left, and every newcomer had to be brought up to speed. Skilling people up was a challenge in its own right.',
    ],
    pods: { image: I('saudia-04'), alt: 'Modular collaboration model: five journey pods, each with design, product and engineering, surrounded by client stakeholders, legal and marketing', note: 'Each pod owned one journey: home and more, booking, ancillaries, check-in, manage bookings. Design, product and engineering sat together; client stakeholders, legal and marketing surrounded them.' },
    sprint: { image: I('saudia-05'), alt: 'Three-week organic design sprint across product, design, engineering and client', note: 'A three-week sprint: discovery, wireframes and product review, client review, visual design, then iterations to a final drop.' },
    programme: { image: I('saudia-10'), alt: 'Programme structure: governance and operations, delivery and design execution, foundational layer', note: 'The wider programme: governance and operations, delivery across app, web and other channels, and a foundational layer for research, design language and quality.' },
  },

  experience: {
    label: '06 · The experience',
    title: 'Five journeys, redesigned.',
    intro: 'The same content, in the right place, at the right moment. No new features.',
    booking: { image: I('saudia-13'), alt: 'Booking flow screens: where to, flight search, dates, passengers, fares, seats and extras', note: 'Plan and book: search, dates, passengers, fares, extras and seats.', points: ['Booking time down 9%', 'Multi-city flight selection in 3 minutes', 'Booking in 7 minutes with the eWallet'] },
    manage: { image: I('saudia-14'), alt: 'Manage and check-in screens: trips, passenger check-in, travel documents and boarding pass', note: 'Manage and check in: trips, passengers, documents and the boarding pass.', points: ['Check-in in 2 steps, down from 9', 'Claiming miles in 1 step', 'eVisa application in 3 steps'] },
    ancillaries: 'Add-ons moved to the right moment in the journey, with the right framing. That repositioning alone drove the 50×.',
    lifestyle: { image: I('saudia-15'), alt: 'The Saudia app in use', note: 'The app in use.' },
  },

  impact: {
    label: '07 · The impact',
    title: 'Measured after the final release.',
    intro: 'The numbers below were measured after the final release, at the end of 8–9 months of work.',
    tiles: [
      ['92%', 'engagement boost'],
      ['50×', 'ancillary sales'],
      ['9%', 'reduced booking time'],
      ['2 steps', 'to check in, from 9'],
      ['7 min', 'to book with the eWallet'],
      ['3 min', 'multi-city flight selection'],
      ['3 steps', 'to apply for an eVisa'],
      ['1 step', 'to claim miles'],
      ['12k', 'visas issued'],
    ] as [string, string][],
    leadership: 'The pod model became the standard framework for large-scale design programmes at Accenture ME.',
    today: {
      title: 'Where the app stands today',
      note: 'Public figures about the Saudia app and airline, for scale. Not attributed to this project.',
      stats: [
        ['4.7', 'App Store rating from 60K ratings'],
        ['5M+', 'Google Play downloads'],
        ['+40%', 'Saudia app usage in 2024'],
        ['35M', 'guests flown in 2024, up 15%'],
      ] as [string, string][],
    },
  },

  sources: [
    ['Saudia carried more than 30 million passengers in 2023 (Argaam, 22 Jan 2024)', 'https://www.argaam.com/en/article/articledetail/id/1699645'],
    ['Saudia concludes 2024 with record-breaking growth (Travel Trade Journal, 6 Feb 2025)', 'https://traveltradejournal.com/saudia-concludes-2024-with-expanded-global-operations-and-record-breaking-growth/'],
    ['Saudia on the App Store (accessed 17 Oct 2026)', 'https://apps.apple.com/us/app/-/id892721808'],
    ['Saudi Arabian Airlines apps on AppBrain (accessed 17 Oct 2026)', 'https://www.appbrain.com/dev/Saudi+Arabian+Airlines/'],
  ] as [string, string][],
}
