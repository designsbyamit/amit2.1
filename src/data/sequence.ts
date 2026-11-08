// Where each page sends you next. One place for every "next" link on the site, so the label, title, eyebrow and
// button read the same everywhere, and every title is the item's own title (never a shortened one).
import { caseStudies } from './work'
import { shortStories } from './shortStories'
import { publishedStories, storySlug } from './leadership'
import { cases } from './cases'
import { chapters, chapterPath } from './leadingDesign'

export interface NextLink { label: string; to: string; title: string; eyebrow?: string; cta: string; alt?: { to: string; cta: string } }

const after = <T,>(list: T[], i: number) => list[(i + 1) % list.length]

/** Next project, from a case study. */
export function nextCase(id: string): NextLink | null {
  const i = caseStudies.findIndex(c => c.id === id)
  if (i < 0) return null
  const n = after(caseStudies, i)
  return { label: 'Next case study', to: `/craft/${n.id}`, title: n.title, eyebrow: n.category.split(' · ').slice(0, 3).join(' · '), cta: 'View teaser', alt: { to: `/craft/${n.id}/details`, cta: 'Take a deep dive' } }
}

export function nextShortStory(slug: string): NextLink | null {
  const i = shortStories.findIndex(s => s.slug === slug)
  if (i < 0 || shortStories.length < 2) return null
  const n = after(shortStories, i)
  return { label: 'Read next', to: `/craft/stories/${n.slug}`, title: n.title, cta: 'Read the short story' }
}

export function nextLeadershipStory(slug: string): NextLink | null {
  const i = publishedStories.findIndex(s => storySlug(s) === slug)
  if (i < 0) return null
  const n = after(publishedStories, i)
  return { label: 'Next story', to: `/leadership/stories/${storySlug(n)}`, title: n.title, cta: 'Read the story' }
}

export function nextLeadershipCase(slug: string): NextLink | null {
  const i = cases.findIndex(c => c.slug === slug)
  if (i < 0) return null
  const n = after(cases, i)
  return { label: 'Next case', to: `/leadership/cases/${n.slug}`, title: n.title, cta: 'Read the case' }
}

/** The order the resources are read in. */
const resources: { to: string; title: string; kind: string; cta: string }[] = [
  { to: '/resources/dual-fluency', title: 'Dual Fluency', kind: 'Framework', cta: 'Open the framework' },
  { to: '/resources/ai-native-patterns', title: 'AI-Native Frameworks', kind: 'Playbook', cta: 'Open the playbook' },
  { to: '/resources/ai-native-patterns/glossary', title: 'AI-native glossary', kind: 'Glossary', cta: 'Open the glossary' },
  { to: '/resources/conversation-experience', title: 'Conversation Experience: The New Frontier of UX', kind: 'Playbook', cta: 'Open the playbook' },
  { to: '/resources/leading-design', title: 'Leading Design', kind: 'Guide', cta: 'Open the guide' },
  { to: '/resources/hiring', title: 'How I hire: a hiring playbook for design teams', kind: 'Playbook', cta: 'Open the playbook' },
  { to: '/resources/hiring-experience', title: 'Hiring is an experience problem', kind: 'Article', cta: 'Read the article' },
]

export function nextResource(path: string): NextLink {
  const i = Math.max(0, resources.findIndex(r => r.to === path))
  const n = after(resources, i)
  return { label: 'Next in Resources', to: n.to, title: n.title, eyebrow: n.kind, cta: n.cta }
}

/** Next written chapter of Leading Design. */
export function nextChapter(slug: string): NextLink | null {
  const ready = chapters.filter(c => c.ready)
  const i = ready.findIndex(c => c.slug === slug)
  if (i < 0) return null
  const n = after(ready, i)
  return { label: 'Next chapter', to: chapterPath(n.slug), title: n.title, eyebrow: `Chapter ${n.n}`, cta: 'Read the chapter' }
}
