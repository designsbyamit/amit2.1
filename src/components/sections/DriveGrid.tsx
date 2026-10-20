import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/* Five "what I drive" ideas, drawn like the resource covers: flat line motifs
   in signal lime and light ink on a colour field with a faint grid. */
const L = '#C8F55A'
const I = '#ECEDEF'
const ring = { fill: 'none', stroke: I, strokeWidth: 2 } as const
const lime = { fill: 'none', stroke: L, strokeWidth: 2 } as const
const svgp = { viewBox: '0 0 120 70', className: 'w-full h-full', 'aria-hidden': true } as const

const Suite = () => (
  <svg {...svgp}>
    <rect x="8" y="26" width="38" height="32" rx="4" {...ring} />
    <rect x="30" y="16" width="38" height="32" rx="4" {...ring} />
    <rect x="52" y="6" width="38" height="32" rx="4" {...lime} />
    <path d="M90 22 H108 M100 14 L108 22 L100 30" {...lime} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="64" r="3" fill={I} /><circle cx="60" cy="64" r="3" fill={I} /><circle cx="106" cy="64" r="3" fill={L} />
    <path d="M17 64 H57 M63 64 H103" stroke={I} strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="3 3" />
  </svg>
)

const AINative = () => (
  <svg {...svgp}>
    <circle cx="60" cy="35" r="27" {...ring} strokeOpacity=".55" strokeDasharray="3 3" />
    <path d="M60 8 C62 26 66 31 86 35 C66 39 62 44 60 62 C58 44 54 39 34 35 C54 31 58 26 60 8Z" fill={L} />
    <path d="M96 10 C97 17 99 19 106 20 C99 21 97 23 96 30 C95 23 93 21 86 20 C93 19 95 17 96 10Z" fill="none" stroke={I} strokeWidth="1.6" />
    <circle cx="14" cy="56" r="4" fill={I} /><circle cx="106" cy="58" r="3" fill={I} />
  </svg>
)

const Craft = () => (
  <svg {...svgp}>
    <path d="M10 22 V10 H22 M98 10 H110 V22 M110 48 V60 H98 M22 60 H10 V48" {...ring} strokeLinecap="round" strokeLinejoin="round" />
    <rect x="30" y="20" width="40" height="30" rx="4" {...ring} />
    <circle cx="74" cy="35" r="17" fill={L} />
    <path d="M66 35 L72 41 L83 29" fill="none" stroke="#0E1A33" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Talent = () => (
  <svg {...svgp}>
    {[[10, 14], [36, 26], [62, 38], [88, 50]].map(([x, h], i) => (
      <rect key={x} x={x} y={62 - h} width="22" height={h} rx="3" fill={i === 3 ? L : 'none'} stroke={i === 3 ? L : I} strokeWidth="2" />
    ))}
    <path d="M12 38 C30 34 54 24 96 8" {...lime} strokeDasharray="3 3" />
    <circle cx="99" cy="7" r="5" fill={I} />
  </svg>
)

const Community = () => (
  <svg {...svgp}>
    <g stroke={I} strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="3 3"><path d="M60 35 L20 16 M60 35 L100 16 M60 35 L20 56 M60 35 L100 56" /></g>
    {[[20, 16], [100, 16], [20, 56], [100, 56]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="9" {...ring} />)}
    <circle cx="60" cy="35" r="14" fill={L} />
    <circle cx="20" cy="16" r="3" fill={I} /><circle cx="100" cy="56" r="3" fill={I} />
  </svg>
)

const items: { n: string; art: ReactNode; tone: string; text: string; wide?: boolean }[] = [
  { n: '01', art: <Suite />, tone: 'var(--field-cobalt)', text: 'Driving suite-first design by crafting harmonised experiences across SAP products into scalable, connected ecosystems.' },
  { n: '02', art: <AINative />, tone: 'var(--field-plum)', text: 'Shaping AI-native and multi-modal experiences through experimentation, systems thinking, and value-centred innovation.' },
  { n: '03', art: <Craft />, tone: 'var(--field-teal)', text: 'Championing design excellence through strategic execution, customer co-creation, critiques, and high-quality delivery standards.' },
  { n: '04', art: <Talent />, tone: 'var(--field-graphite)', wide: true, text: 'Building and nurturing resilient design talent through mentoring, AI-led upskilling, and future-ready capability development.' },
  { n: '05', art: <Community />, tone: 'var(--field-cobalt)', wide: true, text: 'Leading and growing design communities through partnerships, initiatives, and events that expand the impact of design beyond designers.' },
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
            <div className="relative rounded-2 overflow-hidden w-[46%] max-w-[210px] aspect-[12/7] shrink-0" style={{ background: d.tone }}>
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="absolute inset-0 p-2 md:p-3">{d.art}</div>
            </div>
          </div>
          <span className="block w-14 h-px" style={{ background: i === 1 ? 'var(--signal)' : 'rgb(var(--ink-rgb) / 0.6)' }} />
          <p className="text-body text-ink-2 max-w-[44ch]">{d.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}
