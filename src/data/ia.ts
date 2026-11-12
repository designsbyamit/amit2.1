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

/** The four capability pillars. The current works sit under them; everything earlier is listed as previous works. */
export const pillars: { name: string; ids: string[] }[] = [
  { name: 'Design leadership', ids: ['sap-search'] },
  { name: 'Interaction craft', ids: ['sap-signin'] },
  { name: 'Technical acumen', ids: ['sap-collections', 'sap-agentic', 'sap-compositional'] },
]
export const previousWorkIds = ['engaze', 'airline-app', 'data-ai', 'dnetworx']

/** Works dropdown and Works page: all six case studies, in the site display order, numbered 01 to 06. */
export const menuWorks = caseStudies

/** In my labs: ideas still being explored. Shown as cards, never as half-finished pages. */
export const labs = [
  { id: 'compositional', title: 'Compositional Design', text: 'How AI can compose experiences inside a design language an organisation defines, and stay inspectable.' },
  { id: 'maturity', title: 'AI Maturity', text: 'How design organisations move from trying AI to building it into the way they work.' },
  { id: 'shape', title: 'The Shifting Shape of Design in the AI Era', text: 'What changes in the designer’s role, skills and craft as AI takes on more of the making.' },
] as const

import type { MarkName } from '../components/marks/Marks'
import type { FieldTone } from '../components/ds/MediaFrame'

/** A page listed in a main-nav menu. The first three show a cover; the rest are listed on the right. */
export interface MenuItem { label: string; to: string; kind: string; mark?: MarkName; tone?: FieldTone; soon?: boolean; note?: string; href?: string }

/** The Grow section: three places, and two still to come. */
export const growItems: MenuItem[] = [
  { label: 'Grow', to: '/learn', kind: 'Overview', mark: 'grow', tone: 'cobalt' },
  { label: 'Mentoring', to: '/mentoring', kind: 'Mentoring', mark: 'mentor', tone: 'cobalt' },
  { label: 'Toolkits', to: '/learn/practice', kind: 'Toolkits', mark: 'toolkit', tone: 'teal' },
  { label: 'Portfolio Guide', to: '/learn/portfolio', kind: 'Guide', mark: 'portfolio', tone: 'plum' },
  { label: 'Library', to: '/learn/library', kind: 'Articles', mark: 'notes', tone: 'cobalt' },
  { label: 'AlphaVector', to: '', href: 'https://alphavector.designsbyamit.com/', kind: 'Find your direction', mark: 'wingspan', tone: 'graphite' },
]

/** Practice: the frameworks and playbooks on the Practice page that have a page of their own. */
export const practiceItems: MenuItem[] = [
  { label: 'AI-Native Frameworks', to: '/resources/ai-native-patterns', kind: 'Playbook', mark: 'compositional', tone: 'teal' },
  { label: 'Dual Fluency', to: '/resources/dual-fluency', kind: 'Playbook', mark: 'persona', tone: 'cobalt' },
  { label: 'Conversation Experience', to: '/resources/conversation-experience', kind: 'Playbook', mark: 'convai', tone: 'plum' },
]

export const leadershipItems: MenuItem[] = [
  { label: NAMES.leadership, to: '/leadership', kind: 'Career', mark: 'lead', tone: 'cobalt' },
  { label: 'Experience', to: '/leadership/stories', kind: 'Stories', mark: 'experience', tone: 'teal' },
  { label: 'Collective', to: '/community', kind: 'Community', mark: 'community', tone: 'plum' },
  { label: NAMES.diary, to: '/reflections', kind: 'Writing', mark: 'notes', tone: 'cobalt' },
  { label: 'Leading Design', to: '/resources/leading-design', kind: 'Guide', mark: 'toolkit', tone: 'plum' },
]
