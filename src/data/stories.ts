// Short stories, proposal version (Nov 2026).
// One grammar for every case: a crux on the first screen (the tension, the decision, where it stands), one concrete thing to follow
// through the story (the spine), chapters with story headings instead of generic labels, one decision told large, and an honest ending.
// Each case keeps its own spine and its own order. Nothing here goes beyond what is already on the site or what Amit has said.

import type { Visual } from './playbacks'

export interface Chapter {
  heading: string
  body: string
  visual?: Visual
  /** Short facts set large, for the chapters that carry numbers. */
  facts?: { value: string; label: string }[]
  /** Words set as chips, for the chapters that carry a short list (principles, roles). */
  chips?: string[]
  /** Show the end-to-end process flow from the playback data after this chapter. */
  flow?: boolean
}

export interface Story {
  id: string
  headline: string
  /** The thing the reader follows from start to finish. */
  spine: string
  crux: { tension: string; decision: string; stands: string; standsLabel?: string }
  chapters: Chapter[]
  /** Where the decision sits among the chapters (index it comes after). */
  decisionAfter: number
  decision: { heading: string; body: string; visual?: Visual; chips?: string[] }
  ending: { label: string; statement: string; note?: string; role: string; led?: string }
}

const B = import.meta.env.BASE_URL
const S = (n: string) => `${B}images/short/${n}.webp`
const C = (n: string) => `${B}images/case-studies/${n}`

export const stories: Story[] = [
  {
    id: 'sap-agentic',
    headline: 'Supplier order confirmations, where agents do the legwork and humans make the call',
    spine: 'One supplier order confirmation',
    crux: {
      tension: 'Every confirmation arrives in its own format and language, and has to be checked against the purchase order by several people.',
      decision: 'Agents do the reading and comparing. People make every decision that matters, at three gates.',
      stands: 'In implementation with a customer. Its KPIs will be tracked once it runs in production.',
    },
    chapters: [
      { heading: 'It arrives as a PDF, in German', body: 'A supplier confirms an order by email. Confirmations, RFQ responses and purchase orders come in many formats and languages, and each one has to be matched against the order before anything moves.' },
      { heading: 'The agent reads it and compares', body: 'The agent extracts every field, maps it to the purchase order and finds each difference: price, quantity, delivery date. Every difference carries its reasoning, so nobody has to redo the agent’s work to trust it.' },
      { heading: 'Three gates, three people', body: 'Operations checks that the agent read the document correctly. The buyer decides on cost and logistics, the goods recipient on quantities and dates. The buyer reviews the reply before it goes back to the supplier. Nothing leaves without a person.', visual: { embed: 'agentic-gates', caption: 'Gate 2 of three. Each difference goes to the person who owns it. Only a person can accept or reject.' } },
      { heading: 'Every step, on one timeline', body: 'From the supplier’s email to approve and close, across 33 screens, with every step logged in one activity timeline. Co-created with customers as a white-labelled solution across supply chain management.', flow: true },
    ],
    decisionAfter: 2,
    decision: { heading: 'In autonomous systems, what the agent doesn’t show matters as much as what it does', body: 'The instinct in agentic design is to surface everything: every step, every inference, every confidence score. But information overload defeats the purpose of automation. We settled on one principle: show the outcome, surface the reasoning only when it matters, and always keep the human able to intervene. Trust is designed, not assumed.' },
    ending: { label: 'Where it stands', statement: 'In implementation with a customer. Its KPIs will be tracked once it runs in production.', role: 'I framed it as a design pattern and led the agent, the human-in-the-loop model and the architecture.' },
  },
  {
    id: 'sap-search',
    headline: 'Enterprise search that gets things done',
    spine: 'One question, asked from any application',
    crux: {
      tension: 'Every application had its own search box. A question that crossed applications had no place to start.',
      decision: 'One field in the same place in every application, and an AI answer you can always check.',
      stands: 'The foundation for the suite’s search, now evolving into a more conversational experience.',
    },
    chapters: [
      { heading: 'Every application had its own search box', body: 'Each with its own vocabulary and its own rules. A question that crossed applications, such as a trip, a supplier or a contract, had no single place to start.' },
      { heading: 'We listened before we drew', body: 'Line of business stakeholders shaped the vision. The people who search across the suite every day shaped the patterns. The vision and its principles were written before the first screen.' },
      { heading: 'Eight designers, owning the seams', body: 'Three workstreams, each owning one stretch of the journey instead of one application, because the seams were exactly where search had to feel like one thing.', visual: { embed: 'search-workstreams', caption: 'Three workstreams along one journey: before results, within results, into the product.' } },
      { heading: 'One results page, everywhere', body: 'Results from every application in one list, each tagged with where it comes from. Acting on a result opens that application with the question and the choice carried across. The work became ten capabilities and one results page every application applies the same way.', visual: { embed: 'search-anatomy', caption: 'One results page for every application, redrawn with fictional data.' } },
      { heading: 'Try it', body: 'Start in any application, ask the same question, and the field is always in the same place.', visual: { embed: 'search-global', caption: 'Sample data and made-up applications.' } },
    ],
    decisionAfter: 3,
    decision: { heading: 'An AI answer is only useful if you can check it', body: 'The AI summary stays collapsed by default, so the results stay in view. Every insight carries a link to the results that produced it. We explored two ways to show them: a reference panel beside the summary, and pulling the source results to the top of the list.', visual: { embed: 'search-summary', caption: 'Open the summary, then select a link icon next to an insight. Sample data.' } },
    ending: { label: 'Where it stands', statement: 'The foundation for the suite’s search, now evolving into a more conversational experience.', note: 'Delivered as a validated direction, ten capability recommendations, a pattern library and a live prototype covering six journeys.', role: 'Design Lead for the search vision and its three workstreams.', led: 'I led eight designers in three groups, alongside engineering and product.' },
  },
  {
    id: 'engaze',
    headline: 'An HR suite where the conversation is the product',
    spine: 'Esha’s sick morning',
    crux: {
      tension: 'HR suites are built for administrators and sold as modules. Five roles start their day in five different places.',
      decision: 'We stopped writing flows and wrote five principles that teach the system how to behave.',
      stands: 'The employee module shipped as a companion beside the portal people already use.',
    },
    chapters: [
      { heading: 'Esha wakes up with a fever', body: 'She asks if she can take the day off. The companion checks her leave balance, reads the policy, finds who to tell, and shows her the leave before it applies anything. One conversation, instead of a visit to each module.' },
      { heading: 'Behind it, a suite built for administrators', body: 'HCM suites are sold as separate modules. Five roles, from a new joiner to a chief people officer, each start their day in a different place. The brief was to improve the experience of every role.', visual: { src: C('engaze-hcm/hcm-map.webp'), alt: 'Suite scope across Attract, Join, Work, Grow, Reward and Understand', ratio: '2700 / 960', caption: 'The suite vision: the whole employee lifecycle, in one product.' } },
      { heading: 'Three people shaped it', body: 'The module that shipped was designed around three archetypes, whose needs decided what the companion had to do.', chips: ['Navin, the new joiner', 'Esha, the experienced employee', 'Manoj, the manager'], visual: { src: S('engaze-archetypes'), alt: 'Three archetypes: Navin the new joiner, Esha the experienced employee and Manoj the manager', ratio: '2000 / 1410', caption: 'The three archetypes, with their needs and primary tasks.' } },
      { heading: 'One companion, one tap away', body: 'Proven in the employee module, then extended across the suite as one companion, one trust model and one people graph.', visual: { src: S('engaze-portal'), alt: 'The companion beside the employee’s workplace portal, on a tablet', ratio: '2000 / 1505', caption: 'The companion sits beside the portal people already use.' } },
    ],
    decisionAfter: 2,
    decision: { heading: 'We stopped designing flows and started designing principles', body: 'In conversational AI, dialog flows only cover the happy path. The generative layer handles everything else, so writing more flows was the wrong answer. We defined five principles that teach the system how to behave in any situation. They outlasted every screen we designed.', chips: ['Trust', 'Guidance', 'Discoverability', 'Cognitive simplicity', 'Continuity'] },
    ending: { label: 'Where it stands', statement: 'The employee module shipped as a companion beside the portal people already use.', note: 'In usability testing, the employee module scored 90% satisfaction.', role: 'The team researched conversation design in depth, including how to build a persona that keeps one consistent conversation pattern.', led: 'I led a design team of 5 to 6, inside a larger team where the rest of the people came from other disciplines.' },
  },
  {
    id: 'airline-app',
    headline: 'Redesigning the trip, not the booking flow',
    spine: 'One passenger, from planning to boarding',
    crux: {
      tension: 'Teams built on their own, and the homepage alone had 183 issues, while the business wanted digital bookings to grow from $2M to $100M.',
      decision: 'The booking app was not the product. The passenger journey was.',
      stands: 'The programme met its $100M goal, and the partnership continues.',
      standsLabel: 'The result',
    },
    chapters: [
      { heading: '183 issues on one homepage', body: 'Functional teams each built on their own, and the result was an incoherent whole: 183 issues on the homepage, 21 of them major, benchmarked against 54 competitors.', visual: { src: C('airline/airline-03.webp'), alt: 'Homepage audit showing 183 issues and a benchmark of 54 competitors', ratio: '871 / 855', caption: 'The homepage audit.', narrow: true } },
      { heading: 'The friction started at the airport', body: 'For travellers of a carrier with 95+ destinations, the friction that mattered most was physical before it was digital. So the research was done in airport lounges.' },
      { heading: 'Five journeys, five pods', body: 'Five journeys, from plan and book to manage and check in, each owned end to end by one pod of design, product and engineering.', visual: { src: C('airline/airline-13.webp'), alt: 'Booking flow screens: where to, flight search, dates, passengers, fares, seats and extras', ratio: '2200 / 1530', caption: 'Plan and book: search, dates, passengers, fares, seats and extras.' } },
      { heading: 'Check-in, from nine steps to two', body: 'What changed for the passenger, measured after release.', facts: [{ value: '9 → 2', label: 'Steps to check in' }, { value: '+92%', label: 'Engagement' }, { value: '50×', label: 'Add-on sales' }] },
    ],
    decisionAfter: 1,
    decision: { heading: 'The booking app was not the product. The passenger journey was.', body: 'When a business wants to grow digital revenue 50-fold, every stakeholder sees a booking flow problem. Reframing it as a service problem changed what we built. The pod structure was itself a design decision: when designers own journeys instead of features, they design for coherence rather than correctness.', visual: { src: C('airline/airline-04.webp'), alt: 'Five journey pods, each with design, product and engineering, surrounded by client stakeholders, legal and marketing', ratio: '2116 / 1098', caption: 'Five journey pods, each with design, product and engineering.' } },
    ending: { label: 'The result', statement: 'The programme met its goal of growing digital bookings from $2M to $100M, and the partnership continues.', note: 'A programme result, delivered together with product, engineering and the client’s teams. The pod model became the standard for large design programmes at Accenture ME.', role: 'I led experience strategy across 11+ designers in five journey pods, and the whole mobile experience with an 8 to 9 person team for almost a year.' },
  },
]

export const storyById = (id: string) => stories.find(s => s.id === id)
