// Travel booking short case study, rebuilt from Amit's master prompt (20 Nov 2026):
// eight chapters, third person, matter of fact. Confirmed facts only; framing and gaps are listed in docs/travel-story-content-map.md.
const B = import.meta.env.BASE_URL
const img = (n: string) => `${B}images/case-studies/airline/${n}.webp`

export const travel = {
  kicker: 'Case study · Consumer travel experience',
  headline: 'Making a complex travel journey feel effortless',
  intro: 'An airline’s mobile app, redesigned across home, booking, ancillaries, check-in and managing a booking. Five interconnected journeys, designed by several teams at once, brought together into one product.',
  glance: [
    ['Role', 'Design lead, hands-on in the craft'],
    ['Scope', 'Five interconnected experience areas'],
    ['Team', '11+ designers across multiple pods'],
    ['Platform', 'Mobile, iOS'],
    ['Delivery', 'Multiple sprints, on an aggressive timeline'],
  ] as [string, string][],

  chapters: {
    ambition: {
      label: '01 · The ambition',
      title: 'An airline app is more than a place to book a flight.',
      body: 'A trip is a sequence of connected decisions. Finding a flight, choosing a fare, adding a seat or a bag, checking in and changing plans are different tasks with different stakes, but to a traveller they are one journey. Each area could be designed well on its own and the app could still feel disjointed. The challenge was to make five areas behave as one product, and to keep every task in it as short as it could be.',
      areas: [
        ['Home', 'Where every trip starts, and where it returns'],
        ['Booking', 'Search, fares and purchase'],
        ['Ancillaries', 'Seats, bags and extras'],
        ['Check-in', 'Getting ready to fly'],
        ['Manage bookings', 'Everything after the purchase'],
      ] as [string, string][],
    },
    understand: {
      label: '02 · The starting point',
      title: 'Before designing the solution, the experience had to be understood.',
      body: 'The work began with what already existed, not with new screens. A shared understanding of the problem, held by every pod, mattered more at the start than any single idea.',
      inputs: [
        ['Research and insights', 'Existing customer research, studied and refined together with the research team.'],
        ['The current app', 'The existing mobile experience, reviewed end to end.'],
        ['Benchmarking', 'Comparable consumer travel experiences, evaluated side by side.'],
        ['Requirements', 'The product requirements and constraints each area carried.'],
      ] as [string, string][],
      context: 'A redesigned web experience already set the broader direction. The mobile app had to complement it without becoming a copy of it.',
      map: { src: img('airline-07'), alt: 'Journey map from discovery to checkout: high-level tasks, touchpoints, pain points, emotion, recommendations and opportunities', caption: 'One of the journey maps, from discovery to checkout. Each stage records the tasks, touchpoints, pain points and emotion, then the recommendations and opportunities they point to.' },
      audit: { src: img('airline-03'), alt: 'An issue-by-issue experience evaluation, with a benchmark of 54 competitor experiences', caption: 'Experience evaluation: an issue-by-issue review, benchmarked against 54 competitor experiences.' },
    },
    diagnose: {
      label: '03 · Diagnosing the experience',
      title: 'The real challenge was not the number of screens. It was the effort between them.',
      body: 'Understanding became a diagnosis by asking the same questions of every stage. Where were customers spending effort that added nothing? Which steps could go? Where did one part of the journey fail to hand over to the next? What did a customer need to know and do at that moment, and which interactions could mobile make more natural? The journey maps answered in customers’ own terms, and their pain points became the design priorities.',
      stages: [
        { stage: 'Discovery', pains: ['Frustrated when no single place summarises the trip', 'Conflicting reviews across websites'], priority: 'Bring what a trip needs into one place' },
        { stage: 'Booking', pains: ['Long forms to fill in', 'Entering every detail again, even when signed in', 'No way to sort or filter by price and departure time', 'Picking the wrong seat from a confusing layout'], priority: 'Ask once, fill in the rest, and make each choice easy to read' },
        { stage: 'Checkout', pains: ['An unclear price breakdown', 'Limited payment options'], priority: 'Keep the price visible, with its breakdown one tap away' },
      ],
      source: 'Pain points as recorded in the project’s journey maps.',
    },
    structure: {
      label: '04 · Breaking down the complexity',
      title: 'Five experience areas. Multiple teams. One shared direction.',
      body: 'The app was divided into five areas, each owned by a pod in which design, product and engineering worked together. More than 11 designers worked across the pods, each with its own product and engineering partners, in sprints that ran side by side. Ownership made each area fast. The risk was that five fast teams would produce five apps, so the whole journey stayed visible to everyone: the points where one area hands over to the next were treated as shared work, not as any one pod’s edge.',
      sprint: { src: img('airline-05'), alt: 'A three-week design sprint across product, design, engineering and client', caption: 'The rhythm of a sprint: discovery and explorations, wireframes and product review, client review, visual design, then iterations to a final drop.' },
    },
    coherence: {
      label: '05 · One coherent experience',
      title: 'Consistency is not making everything look the same.',
      body: 'A coherent app lets customers move between stages of travel without relearning how it works. That depends on what customers feel more than what they see: one way to navigate between journeys, the same interaction for the same kind of choice, an information hierarchy that puts the next decision first, and expectations that hold from the first search to the boarding pass. It also meant designing for the phone rather than shrinking the web: native iOS conventions, touch where it helps, and device capabilities such as Face ID to sign in.',
      checks: ['Connected journeys', 'Aligned interaction patterns', 'A clear information hierarchy', 'Mobile and iOS behaviours'],
      row: [['home', 'Home'], ['results', 'Booking'], ['seat', 'Ancillaries'], ['pass', 'Check-in'], ['confirmed', 'Manage']] as [string, string][],
    },
    details: {
      label: '06 · Inside the details',
      title: 'Good interactions account for what happens when things do not go to plan.',
      body: 'Check-in looks like one task. In practice it branches. Check-in may not be open yet. One passenger may be travelling, or several. A check-in can fail. Some journeys need additional documents or a visa. Each branch changes what the customer can do, what they need to be told and what happens next. Check-in was designed hands-on as the reference journey: its branches were made explicit, and the approach became one the other pods built on.',
      scenarios: [
        ['Check-in not yet open', 'Check-in open'],
        ['A single passenger', 'Several passengers'],
        ['Check-in succeeds', 'Check-in fails'],
        ['Documents in order', 'Documents or a visa needed'],
      ] as [string, string][],
      questions: ['What can the customer do now?', 'What do they need to know?', 'What happens next?'],
      craftTitle: 'Then, fewer steps and fewer fields.',
      craft: [
        ['Familiar conventions', 'Native iOS patterns customers already know, instead of new ones to learn.'],
        ['Touch first', 'Gestures and touch interactions where they make a choice quicker.'],
        ['Fewer fields', 'Every step and form field questioned, and removed where it added nothing.'],
        ['Filled in for the customer', 'Information retrieved or populated automatically wherever possible.'],
      ] as [string, string][],
      screens: [['missing', 'Only what is missing'], ['passenger', 'The native keyboard'], ['pass', 'Straight to the pass']] as [string, string][],
    },
    outcomes: {
      label: '07 · The transformation',
      title: 'Less effort for customers. A digital channel operating at scale.',
      figures: [
        ['9 → 2', 'Steps to check in', 'The check-in journey, reduced from nine steps to two.'],
        ['4 min', 'To book a flight', 'For returning customers, booking a flight takes about four minutes in the redesigned experience.'],
        ['$100M', 'Digital booking revenue', 'Digital bookings grew into a $100 million revenue stream.'],
      ] as [string, string, string][],
      note: 'The first two describe the redesigned journeys. The third describes the scale of the digital channel, which many factors beyond design contributed to.',
    },
    idea: {
      label: '08 · The bigger idea',
      title: 'Simplicity at scale is the result of getting complexity right.',
      body: 'A mobile experience is not a desktop experience made smaller. It is designed around the person, their context, the task in front of them and what the device can do. When many journeys, teams and requirements come together, the work is to make all of that complexity invisible to the customer.',
      quote: 'Designing at scale requires seeing the entire experience while caring deeply about the smallest interaction.',
    },
  },

  role: 'Design lead for the mobile experience: experience strategy across 11+ designers in multiple pods, hands-on on the critical interactions, with check-in designed as the reference journey.',
}
