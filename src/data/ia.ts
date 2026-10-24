// Information architecture: what sits under each main-nav item, in one place.
import { caseStudies } from './work'

/** Page names that were renamed. Change here and the nav, headers and page titles follow. */
export const NAMES = {
  leadership: 'Journey',
  diary: 'Reflections',
} as const

/** The five major works, in order. Each opens its short story, then the detailed case study. */
export const bigFiveIds = ['sap-agentic', 'sap-search', 'engaze', 'airline-app', 'dnetworx']
export const bigFive = bigFiveIds.map(id => caseStudies.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c)

/** Works dropdown and Works page: all six case studies, in the site display order, numbered 01 to 06. */
export const menuWorks = caseStudies

/** Research that is on the way. Shown as coming soon, never as a half-finished page. */
export const research = [
  'Compositional Design',
  'AI Maturity in Design Organisations',
  'The Shifting Shape of Design by AI',
  'Agentic AI Interventions in FinTech',
]

import type { MarkName } from '../components/marks/Marks'
import type { FieldTone } from '../components/ds/MediaFrame'

/** A page listed in a main-nav menu. The first three show a cover; the rest are listed on the right. */
export interface MenuItem { label: string; to: string; kind: string; mark?: MarkName; tone?: FieldTone; soon?: boolean; note?: string }

/** The Grow section: four places, the last still to come. */
export const growItems: MenuItem[] = [
  { label: 'Mentoring', to: '/mentoring', kind: 'Mentoring', mark: 'mentor', tone: 'cobalt' },
  { label: 'Toolkits', to: '/learn/practice', kind: 'Toolkits', mark: 'toolkit', tone: 'teal' },
  { label: 'Portfolio Guide', to: '/learn/portfolio', kind: 'Guide', mark: 'portfolio', tone: 'plum' },
  { label: 'WingSpan', to: '', kind: 'Coming soon', soon: true, note: 'Wings for your design career' },
]

export const leadershipItems: MenuItem[] = [
  { label: NAMES.leadership, to: '/leadership', kind: 'Career', mark: 'lead', tone: 'cobalt' },
  { label: 'Experience', to: '/leadership/stories', kind: 'Stories', mark: 'experience', tone: 'teal' },
  { label: 'Collective', to: '/community', kind: 'Community', mark: 'community', tone: 'plum' },
  { label: NAMES.diary, to: '/reflections', kind: 'Writing', mark: 'notes', tone: 'cobalt' },
]
