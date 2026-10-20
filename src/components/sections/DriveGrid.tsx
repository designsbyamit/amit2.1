import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/* Five "what I drive" ideas, each with a small geometric figure.
   All colour comes from theme tokens so it works in light and dark. */
const I = (a: number) => `rgb(var(--ink-rgb) / ${a})`
const L = 'var(--signal)'
const thin = { fill: 'none', stroke: I(0.45), strokeWidth: 1 } as const
const dot = { fill: I(0.95) } as const

const Planes = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
    <path d="M20 150 L120 50" stroke={I(0.3)} strokeDasharray="2 4" fill="none" />
    {[0.12, 0.28, 0.5, 0.9].map((a, i) => (
      <path key={i} d={`M${60 + i * 36} ${100 - i * 10} l44 -14 v86 l-44 14 z`} fill={I(a)} />
    ))}
    <circle cx="22" cy="152" r="2.5" {...dot} />
  </svg>
)

const Orbit = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
    <ellipse cx="120" cy="90" rx="100" ry="64" transform="rotate(-18 120 90)" {...thin} />
    <circle cx="120" cy="90" r="52" {...thin} />
    <circle cx="120" cy="90" r="66" fill="none" stroke={I(0.3)} strokeDasharray="1 4" />
    <defs>
      <linearGradient id="dr-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={I(0.15)} /><stop offset="1" stopColor={I(0.95)} />
      </linearGradient>
    </defs>
    <circle cx="120" cy="90" r="24" fill="url(#dr-g)" />
    <circle cx="26" cy="76" r="3" {...dot} /><circle cx="214" cy="104" r="3" {...dot} />
    <circle cx="70" cy="150" r="3" {...dot} /><circle cx="94" cy="44" r="2" {...dot} />
    <circle cx="176" cy="58" r="2.5" fill={L} />
  </svg>
)

const Compose = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" aria-hidden>
    <circle cx="140" cy="62" r="30" {...thin} />
    <line x1="100" y1="62" x2="226" y2="62" stroke={I(0.3)} />
    <rect x="40" y="96" width="44" height="64" fill={I(0.12)} />
    <rect x="96" y="56" width="22" height="104" fill={I(0.3)} />
    <path d="M118 56 a52 52 0 0 1 0 104 z" fill={I(0.92)} />
    <circle cx="86" cy="104" r="2.5" {...dot} />
    <circle cx="228" cy="156" r="2" fill={L} />
  </svg>
)

const Steps = () => (
  <svg viewBox="0 0 420 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <line x1="20" y1="156" x2="400" y2="156" stroke={I(0.3)} />
    {[[40, 22, 0.25], [118, 54, 0.5], [196, 86, 0.92], [274, 118, 0.14]].map(([x, h, a], i) => (
      <rect key={i} x={x} y={156 - h} width="70" height={h} fill={I(a)} />
    ))}
    <path d="M40 120 C 90 50, 190 78, 232 36" {...thin} />
    <circle cx="258" cy="26" r="9" {...dot} />
    <circle cx="170" cy="62" r="2" {...dot} />
    <circle cx="354" cy="40" r="2" fill={L} />
  </svg>
)

const Network = () => (
  <svg viewBox="0 0 420 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <path d="M20 80 C 90 10, 170 20, 230 78 S 360 150, 390 40" {...thin} />
    <path d="M30 86 C 100 160, 190 150, 240 94 S 340 20, 390 46" {...thin} />
    <circle cx="214" cy="84" r="46" fill="none" stroke={I(0.3)} strokeDasharray="1 4" />
    <circle cx="214" cy="84" r="24" {...dot} />
    {[[54, 82, 11], [128, 128, 8]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} {...dot} />)}
    <circle cx="124" cy="30" r="5" {...dot} /><circle cx="296" cy="64" r="3" {...dot} />
    <circle cx="372" cy="30" r="9" fill={I(0.25)} /><circle cx="300" cy="134" r="12" fill={I(0.25)} />
    <circle cx="400" cy="92" r="7" {...dot} />
    <circle cx="346" cy="116" r="2.5" fill={L} />
  </svg>
)

const items: { n: string; art: ReactNode; text: string; wide?: boolean }[] = [
  { n: '01', art: <Planes />, text: 'Driving suite-first design by crafting harmonised experiences across SAP products into scalable, connected ecosystems.' },
  { n: '02', art: <Orbit />, text: 'Shaping AI-native and multi-modal experiences through experimentation, systems thinking, and value-centred innovation.' },
  { n: '03', art: <Compose />, text: 'Championing design excellence through strategic execution, customer co-creation, critiques, and high-quality delivery standards.' },
  { n: '04', art: <Steps />, wide: true, text: 'Building and nurturing resilient design talent through mentoring, AI-led upskilling, and future-ready capability development.' },
  { n: '05', art: <Network />, wide: true, text: 'Leading and growing design communities through partnerships, initiatives, and events that expand the impact of design beyond designers.' },
]

export default function DriveGrid() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-6 border-t border-[color:var(--line-1)]">
      {items.map((d, i) => (
        <motion.li
          key={d.n}
          className={`relative flex flex-col gap-6 p-6 md:p-8 border-b border-[color:var(--line-1)] md:border-l first:md:border-l-0 ${d.wide ? 'md:col-span-3' : 'md:col-span-2'} ${i === 3 ? 'md:!border-l-0' : ''}`}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
        >
          <div className="flex items-start justify-between gap-4">
            <span aria-hidden className="font-serif leading-[0.85] text-[72px] md:text-[96px]" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>{d.n}</span>
            <div className={`${d.wide ? 'w-[60%]' : 'w-[48%]'} max-w-[360px] aspect-[4/3] md:aspect-auto md:h-[110px] lg:h-[130px]`}>{d.art}</div>
          </div>
          <span className="block w-14 h-px" style={{ background: i === 1 ? 'var(--signal)' : 'rgb(var(--ink-rgb) / 0.6)' }} />
          <p className="text-body text-ink-2 max-w-[44ch]">{d.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}
