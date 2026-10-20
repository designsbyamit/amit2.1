import type { ReactNode } from 'react'

/* Small animated pictograms for the Grow hub, in the same family as the
   resource covers: lime and light ink line motifs on a colour field. */
const L = '#C8F55A'
const I = '#ECEDEF'
const ring = { fill: 'none', stroke: I, strokeWidth: 2 } as const
const lime = { fill: 'none', stroke: L, strokeWidth: 2 } as const
const dash = { stroke: I, strokeOpacity: 0.55, strokeWidth: 1.2, strokeDasharray: '3 3', fill: 'none' } as const
const S = ({ children }: { children: ReactNode }) => <svg viewBox="0 0 120 70" className="w-full h-full" aria-hidden>{children}</svg>
const d = (s: number) => ({ animationDelay: `${s}s` })

export const MentoringPictogram = () => (
  <S>
    <circle cx="30" cy="35" r="18" {...ring} /><circle cx="30" cy="35" r="5" fill={I} />
    <circle cx="94" cy="40" r="11" {...ring} /><circle cx="94" cy="40" r="3.5" fill={L} />
    <path d="M50 35 H80" {...dash} />
    <circle className="pg pg-shuttle" style={{ ['--dx' as string]: '28px' }} cx="52" cy="35" r="4.5" fill={L} />
  </S>
)

export const ResourcesPictogram = () => (
  <S>
    <rect x="22" y="12" width="64" height="40" rx="4" {...ring} strokeOpacity=".35" />
    <rect x="30" y="18" width="64" height="40" rx="4" {...ring} strokeOpacity=".65" />
    <g className="pg pg-bob">
      <rect x="38" y="24" width="64" height="40" rx="4" fill={L} />
      <path d="M48 36 H90 M48 44 H78 M48 52 H66" stroke="#0E1A33" strokeWidth="2" strokeLinecap="round" />
    </g>
  </S>
)

export const CommunityPictogram = () => (
  <S>
    <g {...dash}><path d="M60 35 L22 14 M60 35 L98 14 M60 35 L22 56 M60 35 L98 56" /></g>
    {[[22, 14], [98, 14], [22, 56], [98, 56]].map(([x, y], i) => (
      <g key={x + '-' + y}><circle className="pg pg-pulse" style={d(i * 0.5)} cx={x} cy={y} r="8" {...ring} /><circle cx={x} cy={y} r="2.5" fill={I} /></g>
    ))}
    <circle className="pg pg-pulse" cx="60" cy="35" r="13" fill={L} />
  </S>
)

export const ReflectionsPictogram = () => (
  <S>
    <path className="pg pg-draw" style={{ ['--len' as string]: '80', strokeDasharray: 80 }} d="M14 18 H94" {...ring} strokeLinecap="round" />
    <path className="pg pg-draw" style={{ ['--len' as string]: '60', strokeDasharray: 60, ...d(0.5) }} d="M14 34 H74" {...ring} strokeLinecap="round" strokeOpacity=".7" />
    <path className="pg pg-draw" style={{ ['--len' as string]: '44', strokeDasharray: 44, ...d(1) }} d="M14 50 H58" {...lime} strokeLinecap="round" />
    <rect className="pg pg-blink" x="64" y="43" width="4" height="14" rx="1" fill={L} />
  </S>
)

export const PracticePictogram = () => (
  <S>
    {[[12, 14], [36, 24], [60, 34], [84, 44]].map(([x, h], i) => (
      <rect key={x} x={x} y={62 - h} width="24" height={h} rx="3" fill={i === 3 ? 'none' : 'none'} stroke={i === 3 ? L : I} strokeWidth="2" strokeOpacity={i === 3 ? 1 : 0.55 + i * 0.15} />
    ))}
    <circle className="pg pg-climb" cx="24" cy="42" r="5" fill={L} />
  </S>
)

export const PortfolioPictogram = () => (
  <S>
    <rect x="14" y="6" width="92" height="58" rx="4" {...ring} />
    {[[22, 14, 76, 10], [22, 30, 34, 26], [62, 30, 36, 26]].map(([x, y, w, h], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} rx="2.5" {...ring} strokeOpacity=".45" strokeWidth="1.5" />
        <rect className="pg pg-hl" style={d(i * 1.4)} x={x} y={y} width={w} height={h} rx="2.5" fill={L} />
      </g>
    ))}
  </S>
)
