import type { ReactNode } from 'react'

/* A small family of abstract pictograms. One idea per mark, drawn as a thin line with a single accent node.
   They share a 64 grid, a constant on-screen line weight and one accent, so they read as one hand.
   Used sparingly: one per page header or card, never as decoration between sections. */

export type MarkName =
  | 'lead' | 'community' | 'notes'
  | 'agentic' | 'search' | 'engaze' | 'airline' | 'data' | 'network'
  | 'file18' | 'greenux' | 'gxd' | 'convai' | 'persona' | 'portal'

const A = 'var(--mk-accent, var(--signal))'

/** `L` is a line that draws in; `D` a quiet dashed guide; `N` the accent node. */
const L = (p: { d?: string; cx?: number; cy?: number; r?: number; x?: number; y?: number; w?: number; h?: number; rx?: number; o?: number; fill?: string }, k?: string | number) => {
  const common = { className: 'mk-ln', pathLength: 1, opacity: p.o, fill: p.fill ?? 'none' } as const
  if (p.d) return <path key={k} {...common} d={p.d} />
  if (p.r !== undefined) return <circle key={k} {...common} cx={p.cx} cy={p.cy} r={p.r} />
  return <rect key={k} {...common} x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rx} />
}
const D = (d: string, k?: string | number) => <path key={k} className="mk-guide" d={d} fill="none" strokeDasharray="1.5 3" opacity=".6" />
const N = (cx: number, cy: number, r = 3.5, k?: string | number) => <circle key={k} className="mk-node" cx={cx} cy={cy} r={r} fill={A} stroke="none" />

const marks: Record<MarkName, ReactNode> = {
  // Leadership: a line of people set at different distances, one node out in front.
  lead: <>{L({ d: 'M8 46 H26' }, 1)}{L({ d: 'M8 36 H38' }, 2)}{L({ d: 'M8 26 H50' }, 3)}{L({ cx: 56, cy: 26, r: 7, o: 0.45 }, 4)}{N(56, 26)}</>,
  // Community: three overlapping circles, one shared centre.
  community: <>{L({ cx: 24, cy: 26, r: 14 }, 1)}{L({ cx: 40, cy: 26, r: 14 }, 2)}{L({ cx: 32, cy: 40, r: 14 }, 3)}{N(32, 31)}</>,
  // Field Notes: lines of thought getting shorter, the last one still being written.
  notes: <>{L({ d: 'M10 18 H46' }, 1)}{L({ d: 'M10 30 H54' }, 2)}{L({ d: 'M10 42 H34' }, 3)}{N(41, 42, 3)}</>,

  // Agentic order confirmation: a document, an agent, a person who decides.
  agentic: <>{L({ x: 6, y: 22, w: 18, h: 20, rx: 3 }, 1)}{L({ d: 'M24 32 H33' }, 2)}{N(37, 32, 3.5)}{L({ d: 'M41 32 H47' }, 3)}{L({ cx: 55, cy: 32, r: 8 }, 4)}</>,
  // AI-powered search: scattered results resolving to one found at the centre of a lens.
  search: <>{L({ cx: 27, cy: 27, r: 15 }, 1)}{L({ d: 'M38 38 L54 54' }, 2)}{N(27, 27, 3.5)}{[[8, 10], [48, 12], [8, 44], [20, 56], [56, 30]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="1.3" fill="currentColor" stroke="none" opacity=".55" />)}</>,
  // Engaze: a conversation first, two voices, one live.
  engaze: <>{L({ x: 6, y: 10, w: 34, h: 24, rx: 9 }, 1)}{L({ x: 24, y: 30, w: 34, h: 24, rx: 9, fill: 'var(--mk-bg, var(--bg))' }, 2)}{<circle key="d1" cx="34" cy="42" r="1.6" fill="currentColor" stroke="none" opacity=".6" />}{<circle key="d2" cx="41" cy="42" r="1.6" fill="currentColor" stroke="none" opacity=".6" />}{N(48, 42, 2.6)}</>,
  // Airline: one journey across the whole service, stops along the way.
  airline: <>{L({ d: 'M8 46 C20 12 44 12 56 46' }, 1)}{L({ d: 'M6 54 H58', o: 0.4 }, 2)}{<circle key="a" cx="8" cy="46" r="3" fill="var(--mk-bg, var(--bg))" />}{<circle key="b" cx="23" cy="23" r="2.2" fill="currentColor" stroke="none" />}{N(41, 23, 3.4)}{<circle key="c" cx="56" cy="46" r="3" fill="var(--mk-bg, var(--bg))" />}</>,
  // Data products: steps in understanding, the last one lit.
  data: <>{L({ x: 10, y: 38, w: 11, h: 16, rx: 2 }, 1)}{L({ x: 26, y: 26, w: 11, h: 28, rx: 2 }, 2)}{L({ x: 42, y: 12, w: 11, h: 42, rx: 2 }, 3)}{D('M6 22 H58', 4)}{N(47.5, 22, 3)}</>,
  // Network installations: the old route stays while the new one takes over, with no gap.
  network: <>{D('M10 22 H54', 1)}{L({ d: 'M10 42 H54' }, 2)}{L({ cx: 10, cy: 22, r: 3.5 }, 3)}{L({ cx: 54, cy: 22, r: 3.5 }, 4)}{L({ cx: 10, cy: 42, r: 3.5 }, 5)}{L({ cx: 54, cy: 42, r: 3.5 }, 6)}{L({ d: 'M32 25 V39', o: 0.5 }, 7)}{N(32, 42, 3.4)}</>,

  // File18: a page for the newsroom, one line picked out.
  file18: <>{L({ d: 'M16 8 H40 L50 18 V56 H16 Z' }, 1)}{L({ d: 'M40 8 V18 H50' }, 2)}{L({ d: 'M23 30 H43' }, 3)}{L({ d: 'M23 38 H43' }, 4)}{L({ d: 'M23 46 H33' }, 5)}{N(40, 46, 2.8)}</>,
  // GreenUX: a leaf, with a single token at its tip.
  greenux: <>{L({ d: 'M10 54 C10 26 30 10 54 10 C54 36 40 54 10 54 Z' }, 1)}{L({ d: 'M10 54 L38 26', o: 0.55 }, 2)}{N(45, 19, 3.2)}</>,
  // Generative Experience Design: one form becoming another.
  gxd: <>{L({ x: 6, y: 6, w: 18, h: 18, rx: 2 }, 1)}{L({ x: 23, y: 23, w: 18, h: 18, rx: 7, o: 0.7 }, 2)}{L({ cx: 49, cy: 49, r: 9, o: 0.45 }, 3)}{N(49, 49, 3.4)}</>,
  // Conversational AI toolkit: a voice, drawn as a few bars inside a bubble.
  convai: <>{L({ d: 'M10 12 H54 V40 H32 L20 52 V40 H10 Z' }, 1)}{L({ d: 'M22 24 V28' }, 2)}{L({ d: 'M42 22 V30' }, 3)}{<path key="b" className="mk-node" d="M32 19 V33" stroke={A} fill="none" />}</>,
  // AI assistant persona builder: a person, and the character around them.
  persona: <>{L({ cx: 32, cy: 24, r: 8 }, 1)}{L({ d: 'M16 52 C16 38 48 38 48 52' }, 2)}{<circle key="h" className="mk-guide" cx="32" cy="32" r="27" fill="none" strokeDasharray="1.5 3" opacity=".6" />}{N(51, 13, 3.2)}</>,
  // Gen-AI design portal: a doorway, and someone about to go through.
  portal: <>{L({ d: 'M16 56 V30 A16 16 0 0 1 48 30 V56' }, 1)}{L({ d: 'M24 56 V32 A8 8 0 0 1 40 32 V56', o: 0.5 }, 2)}{L({ d: 'M8 56 H56', o: 0.4 }, 3)}{N(32, 46, 3.4)}</>,
}

const storyMarks: Record<string, MarkName> = {
  file18: 'file18',
  greenux: 'greenux',
  'generative-experience-design': 'gxd',
  'conversational-ai-design-toolkit': 'convai',
  'ai-assistant-persona-builder': 'persona',
  'generative-experience-design-portal': 'portal',
}
const caseMarks: Record<string, MarkName> = {
  'sap-agentic': 'agentic', 'sap-search': 'search', engaze: 'engaze', 'airline-app': 'airline', 'data-ai': 'data', dnetworx: 'network',
}
export const markForStory = (slug: string): MarkName | undefined => storyMarks[slug]
export const markForCase = (id: string): MarkName | undefined => caseMarks[id]

/** One pictogram. `size` is its rendered size; the line keeps the same weight at any size. Colour comes from the surrounding text colour; the accent from --mk-accent (default: the site's signal colour). */
export default function Mark({ name, size = 48, className = '' }: { name: MarkName; size?: number; className?: string }) {
  const sw = +(1.5 * 64 / size).toFixed(2)
  return (
    <svg className={`mk ${className}`} width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {marks[name]}
    </svg>
  )
}
