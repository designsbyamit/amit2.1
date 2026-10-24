import type { ReactNode } from 'react'

/* Fine-line pictograms for the Leadership hub tiles. Same family as the Grow pictograms (lime and light ink on a colour field),
   but drawn with a constant 1.25px line, so they stay fine at any size. */
const L = '#C8F55A'
const I = '#ECEDEF'
const T = { vectorEffect: 'non-scaling-stroke', strokeWidth: 1.25 } as const
const ring = { fill: 'none', stroke: I, ...T } as const
const lime = { fill: 'none', stroke: L, ...T } as const
const dash = { stroke: I, strokeOpacity: 0.5, fill: 'none', strokeDasharray: '3 4', ...T } as const
const S = ({ children }: { children: ReactNode }) => <svg viewBox="0 0 120 70" className="w-full h-full" aria-hidden>{children}</svg>
const d = (s: number) => ({ animationDelay: `${s}s` })

/** Experience: stories stacked, the top one lifting. */
export const ExperiencePictogram = () => (
  <S>
    <rect x="22" y="30" width="64" height="30" rx="4" {...ring} strokeOpacity=".35" />
    <rect x="30" y="22" width="64" height="30" rx="4" {...ring} strokeOpacity=".6" />
    <g className="pg pg-bob">
      <rect x="38" y="14" width="64" height="30" rx="4" {...ring} />
      <path d="M48 25 H90 M48 32 H80" {...ring} strokeOpacity=".6" strokeLinecap="round" />
      <circle cx="91" cy="32" r="2.6" fill={L} />
    </g>
  </S>
)

/** Collective: people around one shared centre. */
export const CollectivePictogram = () => (
  <S>
    <g {...dash}><path d="M60 35 L24 16 M60 35 L96 16 M60 35 L24 54 M60 35 L96 54" /></g>
    {[[24, 16], [96, 16], [24, 54], [96, 54]].map(([x, y], i) => (
      <g key={x + '-' + y}><circle className="pg pg-pulse" style={{ ...d(i * 0.5), transformOrigin: `${x}px ${y}px` }} cx={x} cy={y} r="8" {...ring} /><circle cx={x} cy={y} r="1.8" fill={I} /></g>
    ))}
    <circle className="pg pg-pulse" style={{ transformOrigin: '60px 35px' }} cx="60" cy="35" r="9" {...lime} />
    <circle cx="60" cy="35" r="3" fill={L} />
  </S>
)

/** Reflections: lines of thought, the last one still being written. */
export const ReflectionsFinePictogram = () => (
  <S>
    <path className="pg pg-draw" style={{ ['--len' as string]: '80', strokeDasharray: 80 }} d="M14 18 H94" {...ring} strokeLinecap="round" />
    <path className="pg pg-draw" style={{ ['--len' as string]: '60', strokeDasharray: 60, ...d(0.5) }} d="M14 34 H74" {...ring} strokeOpacity=".7" strokeLinecap="round" />
    <path className="pg pg-draw" style={{ ['--len' as string]: '44', strokeDasharray: 44, ...d(1) }} d="M14 50 H58" {...lime} strokeLinecap="round" />
    <rect className="pg pg-blink" x="63" y="44" width="2" height="12" rx="1" fill={L} />
  </S>
)
