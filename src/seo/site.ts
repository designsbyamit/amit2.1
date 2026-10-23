declare const __SITE_URL__: string
// One place for what every page says about itself to search engines, AI assistants and link previews.
// The runtime hook (useRouteSeo) and the build-time page generator (tools/seo/build.ts) both read this.
import { playbacks } from '../data/playbacks'
import { caseStudies } from '../data/work'
import { publishedStories, storySlug } from '../data/leadership'

export const SITE = {
  /** Production is www; the staging branch (neo) is a beta that points at itself and is kept out of search. */
  url: __SITE_URL__,
  name: 'Amit Kumar Tiwari',
  role: 'Design Leader',
  employer: 'SAP Labs',
  city: 'Bengaluru',
  country: 'IN',
  /** Accounts and sites that are verifiably the same person. Add LinkedIn and others here. */
  sameAs: [] as string[],
  ogDefault: '/og/home.jpg',
}

export interface RouteMeta {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  /** Paths below this prefix share the meta of their parent and are not treated as unknown. */
  group?: string
}

const T = (s: string) => `${s} · ${SITE.name}`

const base: RouteMeta[] = [
  { path: '/', title: `${SITE.name} — Design Leader for AI-native enterprise experiences`, description: 'Design Leader at SAP with 16+ years shaping AI-native enterprise experiences: agentic AI, conversational design, AI search and design systems, delivered at scale.', type: 'profile' },
  { path: '/craft', title: T('Selected work'), description: 'Case studies across AI experiences, conversational design, enterprise UX and large-scale design systems. Every project is live in market.' },
  { path: '/leadership', title: T('Design leadership'), description: 'The career arc, the philosophy and what I have learned about making design matter inside large organisations, where influence is earned, not assigned.' },
  { path: '/leadership/stories', title: T('Leadership stories'), description: 'Moments that shaped how I lead: the conflicts, the first team, the community and the culture work. Each story ends with what I learned.' },
  { path: '/about', title: T('About'), description: 'A design leader in Bengaluru who started out writing code, took on leadership roles as early as college, and has spent 16+ years turning complicated ideas into products people can use.', type: 'profile' },
  { path: '/mentoring', title: T('Mentoring'), description: 'Mentoring for designers who are growing: how I coach, what we work on, and how to start.' },
  { path: '/community', title: T('Design community'), description: 'The community initiatives, events and collaborations that extend design practice beyond organisational walls.' },
  { path: '/reflections', title: T('Reflections'), description: 'Essays and observations on where design, AI and the systems we are building go next.' },
  { path: '/resources', title: T('Resources'), description: 'Frameworks, templates, reading lists and thinking tools built from years of workshops, mentoring conversations and enterprise design challenges.' },
  { path: '/resources/hiring', title: T('How I hire: a hiring playbook for design teams'), description: 'A hiring system for design teams, built from scratch with HR: role definition, employer story, candidate and interviewer journeys, evaluation, candidate care and onboarding, with downloadable worksheets.', type: 'article' },
  { path: '/resources/hiring-experience', title: T('Hiring is an experience problem'), description: 'Seven patterns in design hiring and what can be done about each, plus a case study of redefining the experience: on-site assignment, signals defined by role, candidate feedback, with worksheets and tenets.', type: 'article' },
  { path: '/resources/dual-fluency', title: T('Dual fluency'), description: 'A framework for designers working fluently with both people and AI systems.' },
  { path: '/resources/ai-native-patterns', title: T('AI-native design patterns'), description: 'Design patterns for AI-native products: how experiences change when software can reason.' },
  { path: '/resources/conversation-experience', title: T('Conversation experience'), description: 'Principles and patterns for designing conversational experiences that work in enterprise settings.' },
  { path: '/learn', title: T('Grow'), description: 'For designers who are growing: mentoring, practices, community, writing, and places to practise and present your work.', group: '/learn/practice/' },
  { path: '/learn/practice', title: T('Design practice'), description: 'Practice challenges and toolkits for designers who want to sharpen their craft.' },
  { path: '/learn/portfolio', title: T('Portfolio best practices'), description: 'How to present your design work so a hiring manager understands it in a minute.' },
  { path: '/contact', title: T('Contact'), description: 'Get in touch about design leadership, speaking, mentoring or collaboration.' },
  { path: '/admin', title: T('Portal'), description: 'Private.', noindex: true },
  { path: '/design-system', title: T('Design system'), description: 'Internal design system reference.', noindex: true },
]

const projects: RouteMeta[] = playbacks.flatMap(p => {
  const cs = caseStudies.find(c => c.id === p.id)
  const out: RouteMeta[] = [{ path: `/craft/${p.id}`, title: T(p.headline), description: p.dek, image: `/og/${p.id}.jpg`, type: 'article' }]
  if (cs) out.push({ path: `/craft/${p.id}/details`, title: T(`${cs.shortTitle}: the detailed case study`), description: cs.tagline, image: `/og/${p.id}.jpg`, type: 'article' })
  return out
})

const stories: RouteMeta[] = publishedStories.map(s => ({
  path: `/leadership/stories/${storySlug(s)}`, title: T(s.title), description: s.lesson, type: 'article' as const,
}))

export const routes: RouteMeta[] = [...base, ...projects, ...stories]
const byPath = new Map(routes.map(r => [r.path, r]))
const groups = [...routes.map(r => r.group).filter((g): g is string => !!g), '/leadership/cases/']

export const metaFor = (pathname: string): RouteMeta | null => {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const hit = byPath.get(p)
  if (hit) return hit
  if (groups.some(g => p.startsWith(g))) return null
  return { path: p, title: T('Page not found'), description: 'This page does not exist.', noindex: true }
}

export const abs = (p: string) => (p.startsWith('http') ? p : SITE.url + p)
