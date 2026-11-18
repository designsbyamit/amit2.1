import { caseStudies } from '../../data/work'
import { playbackById } from '../../data/playbacks'

/** The words, exactly as written. */
export const COPY = {
  hero: { main: 'Design is undergoing a profound transformation.', sub: ['Evolving human behaviour.', 'Changing business ambitions.', 'And the technology enabling both.', 'I work at their convergence.'] },
  outcomes: { main: 'This convergence is changing what design can make possible.', sub: ['More meaningful experiences.', 'More intelligent products.', 'Greater business value.'] },
  works: { main: 'From possibility to practice.', sub: 'A selection of experiences shaped across enterprise, AI and digital products.' },
  atlas: { main: 'Every experience adds to the perspective.' },
  teams: { main: 'Because meaningful work takes collective effort.', sub: 'Building teams. Developing talent. Creating the conditions for good design to thrive.' },
  hub: { main: 'And good design grows beyond the team.', sub: 'Creating spaces for designers to connect, exchange ideas and grow together.' },
  share: { main: 'Experience becomes more valuable when it is shared.', sub: 'Workshops. Mentoring. Resources. Ideas translated into practice.' },
  next: { main: 'Exploring new possibilities in design, business and AI.', sub: 'Always open to meaningful collaborations and conversations.' },
} as const

/** 04: each measure gets its own moment. */
export const MEASURES = [
  { big: '16+', small: 'years.' },
  { big: '61', small: 'projects.' },
  { line: 'Multiple industries.' },
  { line: 'An evolving body of work.' },
] as const

export const SHARE = [
  { kind: 'Workshop', title: 'Build Dual Fluency', to: '/resources/dual-fluency', field: 'var(--field-cobalt)' },
  { kind: 'Resource', title: 'Leading Design', to: '/resources/leading-design', field: 'var(--field-plum)' },
  { kind: 'Initiative', title: 'From AI experiments to a capability', to: '/leadership/cases/ai-experimentation-to-capability', field: 'var(--field-teal)' },
] as const

export const WORKS = ['sap-search', 'sap-agentic', 'airline-app'].map(id => {
  const cs = caseStudies.find(c => c.id === id)!
  return { id, title: cs.shortTitle, line: playbackById(id)?.headline ?? cs.title }
})

export const CHAPTERS = ['Convergence', 'Outcomes', 'Selected works', 'Career atlas', 'Building teams', 'Community', 'Sharing', 'Collaborate']
