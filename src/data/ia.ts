// Information architecture: what sits under each main-nav item, in one place.
import { caseStudies } from './work'

/** Page names that were renamed. Change here and the nav, headers and page titles follow. */
export const NAMES = {
  leadership: 'How I lead',
  diary: 'Field Notes',
} as const

/** The five major works, in order. Each opens its short story, then the detailed case study. */
export const bigFiveIds = ['sap-agentic', 'sap-search', 'engaze', 'airline-app', 'dnetworx']
export const bigFive = bigFiveIds.map(id => caseStudies.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c)

/** Case studies shown in the Works dropdown (dNetWorX is left out). Every case study is listed on the Works page. */
export const allWorks = [...bigFive, ...caseStudies.filter(c => c.id === 'data-ai')]
export const menuWorks = allWorks.filter(c => c.id !== 'dnetworx')

/** Research that is on the way. Shown as coming soon, never as a half-finished page. */
export const research = [
  'Compositional Design',
  'AI Maturity in Design Organisations',
  'The Shifting Shape of Design by AI',
  'Agentic AI Interventions in FinTech',
]

/** The Grow section: four places, the last still to come. */
export const growItems = [
  { label: 'Mentoring', to: '/mentoring' },
  { label: 'Toolkits', to: '/learn/practice' },
  { label: 'Portfolio Guide', to: '/learn/portfolio' },
  { label: 'WingSpan', to: '', soon: true, note: 'Wings for your design career' },
]

export const leadershipItems = [
  { label: NAMES.leadership, to: '/leadership' },
  { label: 'Community', to: '/community' },
  { label: NAMES.diary, to: '/reflections' },
]
