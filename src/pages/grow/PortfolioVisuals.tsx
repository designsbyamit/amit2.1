import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/* Visuals for Portfolio Best Practices, drawn like the resource covers:
   flat line motifs in signal lime and light ink on a colour field. */
const L = '#C8F55A'
const I = '#ECEDEF'
const ring = { fill: 'none', stroke: I, strokeWidth: 2 } as const
const lime = { fill: 'none', stroke: L, strokeWidth: 2 } as const
const dash = { stroke: I, strokeOpacity: 0.55, strokeWidth: 1.2, strokeDasharray: '3 3', fill: 'none' } as const
const svgp = { viewBox: '0 0 120 70', className: 'w-full h-full', 'aria-hidden': true } as const
const grid = { backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }

type Tone = 'cobalt' | 'teal' | 'plum' | 'graphite'
const tones: Record<Tone, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' }

export const Field = ({ tone = 'cobalt', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-2 ${className}`} style={{ background: tones[tone] }}>
    <div className="absolute inset-0 opacity-[0.07]" style={grid} />
    <div className="relative w-full h-full">{children}</div>
  </div>
)

/* ---------- small icons (120 x 70) ---------- */
const icons: Record<string, ReactNode> = {
  nametag: <svg {...svgp}><rect x="22" y="12" width="76" height="46" rx="6" {...ring} /><circle cx="42" cy="30" r="7" fill={L} /><path d="M56 27 H86 M56 36 H78" {...ring} strokeLinecap="round" /><path d="M32 48 H88" {...dash} /></svg>,
  voice: <svg {...svgp}>{[14, 26, 18, 38, 24, 46, 20, 32, 14].map((h, i) => <rect key={i} x={12 + i * 11} y={35 - h / 2} width="5" height={h} rx="2.5" fill={i === 5 ? L : I} />)}</svg>,
  palette: <svg {...svgp}><rect x="12" y="14" width="28" height="42" rx="4" {...ring} /><rect x="46" y="14" width="28" height="42" rx="4" fill={I} fillOpacity=".25" stroke={I} strokeWidth="2" /><rect x="80" y="14" width="28" height="42" rx="4" fill={L} /></svg>,
  motion: <svg {...svgp}><path d="M10 58 C 40 58, 44 12, 110 12" {...lime} /><circle cx="10" cy="58" r="4" fill={I} /><circle cx="60" cy="33" r="4" fill={I} /><circle cx="110" cy="12" r="5" fill={L} /><path d="M10 64 H110" {...dash} /></svg>,
  projects: <svg {...svgp}>{[[14, 12], [48, 12], [82, 12], [14, 40], [48, 40], [82, 40]].map(([x, y], i) => <rect key={i} x={x} y={y} width="26" height="20" rx="3" fill={i === 1 ? L : 'none'} stroke={i === 1 ? L : I} strokeWidth="2" strokeOpacity={i === 1 ? 1 : i % 2 ? 0.45 : 1} />)}</svg>,
  thread: <svg {...svgp}><path d="M12 50 C 34 14, 56 60, 80 26 S 104 20, 110 18" {...lime} />{[[12, 50], [46, 38], [80, 26]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill={I} />)}<circle cx="110" cy="18" r="5" fill={L} /></svg>,
  headline: <svg {...svgp}><path d="M14 18 H86" stroke={I} strokeWidth="5" strokeLinecap="round" /><path d="M14 34 H64" stroke={L} strokeWidth="3" strokeLinecap="round" /><rect x="14" y="46" width="92" height="12" rx="3" {...ring} strokeOpacity=".6" /></svg>,
  caption: <svg {...svgp}><rect x="14" y="8" width="92" height="38" rx="4" {...ring} /><path d="M26 36 L44 22 L58 32 L70 24 L94 38" {...ring} strokeOpacity=".5" strokeLinejoin="round" /><path d="M14 56 H80 M14 64 H54" {...lime} strokeLinecap="round" /></svg>,
  oneVisual: <svg {...svgp}><circle cx="60" cy="35" r="24" {...lime} /><circle cx="60" cy="35" r="8" fill={I} /><path d="M12 35 H36 M84 35 H108" {...dash} /></svg>,
  length: <svg {...svgp}><rect x="12" y="28" width="96" height="14" rx="7" {...ring} /><rect x="12" y="28" width="62" height="14" rx="7" fill={L} /><path d="M74 20 V50" stroke={I} strokeWidth="2" /></svg>,
  lock: <svg {...svgp}><rect x="34" y="30" width="52" height="30" rx="5" {...ring} /><path d="M44 30 V22 a16 16 0 0 1 32 0 V30" {...lime} /><circle cx="60" cy="45" r="4" fill={L} /></svg>,
  number: <svg {...svgp}><path d="M12 56 L36 44 L60 48 L84 24 L108 12" {...lime} strokeLinejoin="round" />{[[12, 56], [36, 44], [60, 48], [84, 24]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill={I} />)}<circle cx="108" cy="12" r="5" fill={L} /></svg>,
  behaviour: <svg {...svgp}><path d="M12 20 H70 M12 35 H88 M12 50 H52" {...ring} strokeLinecap="round" strokeOpacity=".5" /><path d="M96 12 V58 M88 50 L96 58 L104 50" {...lime} strokeLinecap="round" strokeLinejoin="round" /></svg>,
  flag: <svg {...svgp}><path d="M34 10 V62" {...ring} strokeLinecap="round" /><path d="M34 12 H88 L78 25 L88 38 H34" fill={L} /></svg>,
  quote: <svg {...svgp}><rect x="14" y="10" width="76" height="34" rx="8" {...ring} /><path d="M30 44 L26 58 L44 44" fill="none" stroke={I} strokeWidth="2" strokeLinejoin="round" /><path d="M32 22 H72 M32 32 H58" {...lime} strokeLinecap="round" /><circle cx="102" cy="52" r="6" fill={L} /></svg>,
  start: <svg {...svgp}><circle cx="30" cy="35" r="12" fill={L} /><path d="M46 35 H108" {...ring} strokeLinecap="round" /><path d="M100 27 L108 35 L100 43" {...ring} strokeLinecap="round" strokeLinejoin="round" /></svg>,
  turn: <svg {...svgp}><path d="M12 22 H56 C 70 22, 70 48, 84 48 H108" {...ring} strokeLinecap="round" /><circle cx="63" cy="35" r="7" fill={L} /></svg>,
  struggle: <svg {...svgp}><path d="M12 40 L24 20 L36 50 L48 18 L60 52 L72 24 L84 46 L108 34" {...ring} strokeLinejoin="round" strokeLinecap="round" /></svg>,
  detail: <svg {...svgp}><circle cx="52" cy="32" r="18" {...ring} /><path d="M66 46 L90 62" {...lime} strokeWidth="3" strokeLinecap="round" /><circle cx="52" cy="32" r="5" fill={L} /></svg>,
  think: <svg {...svgp}><path d="M24 26 a16 16 0 1 1 28 10 c-3 3-4 5-4 9 H36 c0-4-1-6-4-9 a16 16 0 0 1-8-10Z" {...ring} /><path d="M38 54 H48" {...lime} strokeLinecap="round" /><path d="M66 30 H108 M66 42 H92" {...ring} strokeOpacity=".5" strokeLinecap="round" /></svg>,
  end: <svg {...svgp}><path d="M12 48 C 40 48, 60 14, 100 14" {...ring} /><circle cx="100" cy="14" r="6" fill={L} /><path d="M12 58 H108" {...dash} /></svg>,
}

export type IconKey = keyof typeof icons

/** Points as small picture tiles instead of a text list. */
export function PointTiles({ points, keys, tone = 'cobalt' }: { points: { t: string; d: string }[]; keys: IconKey[]; tone?: Tone }) {
  return (
    <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {points.map((p, i) => (
        <motion.li key={p.t} className="card !p-0 overflow-hidden flex flex-col" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}>
          <Field tone={tone} className="aspect-[12/7] !rounded-none"><div className="absolute inset-0 p-5">{icons[keys[i] ?? 'thread']}</div></Field>
          <div className="p-5">
            <p className="text-title text-ink" style={{ fontWeight: 400 }}>{p.t}</p>
            <p className="text-body-sm text-ink-3 mt-2">{p.d}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

/* ---------- Character wheel ---------- */
export function CharacterWheel() {
  const facets = [['Values', -90], ['Voice', -18], ['Taste', 54], ['Point of view', 126], ['Behaviour', 198]] as const
  const pt = (a: number, r: number) => [200 + r * Math.cos((a * Math.PI) / 180), 130 + r * Math.sin((a * Math.PI) / 180)]
  return (
    <Field tone="cobalt" className="mt-10 aspect-[16/10] md:aspect-[2/1]">
      <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full" role="img" aria-label="Character at the centre, expressed through values, voice, taste, point of view and behaviour">
        <circle cx="200" cy="130" r="92" {...dash} />
        {facets.map(([, a]) => { const [x, y] = pt(a, 92); return <line key={a} x1="200" y1="130" x2={x} y2={y} {...dash} /> })}
        <circle cx="200" cy="130" r="34" fill={L} />
        <text x="200" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0E1A33">Character</text>
        {facets.map(([name, a], i) => {
          const [x, y] = pt(a, 92)
          const [lx, ly] = pt(a, 114)
          return (
            <g key={name}>
              <circle cx={x} cy={y} r="12" {...ring} />
              <circle cx={x} cy={y} r="3.5" fill={i === 1 ? L : I} />
              <text x={lx} y={ly + 4} textAnchor={Math.abs(lx - 200) < 12 ? 'middle' : lx > 200 ? 'start' : 'end'} fontSize="12" fill={I}>{name}</text>
            </g>
          )
        })}
      </svg>
    </Field>
  )
}

/* ---------- Brand vs character ---------- */
export function BrandVsCharacter() {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-4">
      <figure className="card !p-0 overflow-hidden">
        <Field tone="graphite" className="aspect-[12/7] !rounded-none">
          <svg {...svgp} className="absolute inset-0 w-full h-full p-6">
            <rect x="34" y="8" width="52" height="56" rx="4" {...ring} /><circle cx="78" cy="38" r="2.5" fill={I} />
            <rect x="44" y="18" width="32" height="14" rx="3" fill={L} /><path d="M49 25 H71" stroke="#0E1A33" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Field>
        <figcaption className="p-5"><p className="text-label text-ink-3">Personal brand</p><p className="text-title text-ink mt-2" style={{ fontWeight: 400 }}>The label on the door.</p><p className="text-body-sm text-ink-3 mt-2">How you want to be known: a role, a focus, a reputation.</p></figcaption>
      </figure>
      <figure className="card !p-0 overflow-hidden">
        <Field tone="plum" className="aspect-[12/7] !rounded-none">
          <svg {...svgp} className="absolute inset-0 w-full h-full p-6">
            <rect x="14" y="6" width="92" height="58" rx="4" {...ring} />
            <path d="M14 48 H106" {...dash} />
            <circle cx="38" cy="30" r="9" {...ring} /><rect x="58" y="22" width="14" height="26" rx="2" fill={I} fillOpacity=".3" stroke={I} strokeWidth="2" /><path d="M82 48 V36 a10 10 0 0 1 20 0 V48" {...lime} />
            <circle cx="38" cy="30" r="3" fill={L} />
          </svg>
        </Field>
        <figcaption className="p-5"><p className="text-label text-signal-ink">Character</p><p className="text-title text-ink mt-2" style={{ fontWeight: 400 }}>The room behind it.</p><p className="text-body-sm text-ink-3 mt-2">How you actually are: what you value, how you speak, what you notice.</p></figcaption>
      </figure>
    </div>
  )
}

/* ---------- Anatomy of a project (annotated wireframe) ---------- */
const bar = (w: string, o = 0.18, h = 6) => <span className="block rounded-full" style={{ width: w, height: h, background: `rgb(var(--ink-rgb) / ${o})` }} />

export function AnatomyDiagram({ points }: { points: { t: string; d: string }[] }) {
  const [active, setActive] = useState(0)
  const blocks: ReactNode[] = [
    <div key="1" className="flex gap-3 items-center"><div className="flex-1 flex flex-col gap-2">{bar('70%', 0.55, 9)}{bar('95%')}{bar('80%')}</div><span className="w-14 h-12 rounded-2 bg-surface-1 border border-[color:var(--line-1)]" /></div>,
    <div key="2" className="flex gap-2 flex-wrap">{['Role', 'Team', 'Timeline'].map(c => <span key={c} className="text-[10px] px-2.5 py-1 rounded-full border border-[color:var(--line-2)] text-ink-3">{c}</span>)}</div>,
    <div key="3" className="flex flex-col gap-2 pl-3 border-l-2" style={{ borderColor: 'rgb(var(--ink-rgb) / .5)' }}>{bar('90%', 0.55, 8)}{bar('60%', 0.25)}</div>,
    <div key="4" className="grid grid-cols-3 gap-2">{[0, 1, 2].map(i => <span key={i} className="h-12 rounded-2 border p-2 flex flex-col gap-1.5" style={{ borderColor: i === 1 ? 'var(--signal-ink)' : 'var(--line-1)', background: i === 1 ? 'rgb(var(--ink-rgb) / .06)' : 'transparent' }}>{bar('70%', 0.4, 4)}{bar('50%', 0.2, 4)}</span>)}</div>,
    <div key="5" className="grid grid-cols-3 gap-2">{['', '', ''].map((_, i) => <span key={i} className="h-12 rounded-2 bg-surface-1 border border-[color:var(--line-1)] flex flex-col justify-center px-3 gap-1.5">{bar('40%', 0.7, 9)}{bar('70%', 0.2, 4)}</span>)}</div>,
    <div key="6" className="flex flex-col gap-2">{bar('85%')}{bar('55%')}</div>,
  ]
  return (
    <div className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      <div className="lg:col-span-6 card !p-5 md:!p-6" role="img" aria-label="Wireframe of a project page with its six parts marked 1 to 6">
        <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-[color:var(--line-1)]">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-[color:var(--line-2)]" />)}<span className="ml-3 flex-1 h-4 rounded-full bg-surface-1" /></div>
        <div className="flex flex-col gap-3">
          {blocks.map((b, i) => (
            <button key={i} type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-label={points[i]?.t}
              className="relative text-left rounded-2 p-3 pl-10 transition-all" style={{ outline: active === i ? '2px solid var(--signal)' : '1px solid var(--line-1)', outlineOffset: active === i ? 2 : 0, background: active === i ? 'rgb(var(--ink-rgb) / .04)' : 'transparent' }}>
              <span className="absolute left-3 top-3 w-5 h-5 rounded-full grid place-items-center text-[10px] font-medium" style={{ background: active === i ? 'var(--signal)' : 'rgb(var(--ink-rgb) / .12)', color: active === i ? '#0E1A33' : 'var(--ink-2, currentColor)' }}>{i + 1}</span>
              {b}
            </button>
          ))}
        </div>
      </div>
      <ol className="lg:col-span-6 flex flex-col">
        {points.map((p, i) => (
          <li key={p.t}>
            <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="w-full text-left flex gap-4 py-4 border-t border-[color:var(--line-1)] last:border-b">
              <span className="text-label pt-1 w-6" style={{ color: active === i ? 'var(--signal-ink)' : undefined }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1"><span className={`block text-title ${active === i ? 'text-ink' : 'text-ink-3'}`} style={{ fontWeight: 400 }}>{p.t.replace(/^\d · /, '')}</span>
                <span className={`block text-body-sm mt-1.5 ${active === i ? 'text-ink-2' : 'text-ink-3'} ${active === i ? '' : 'hidden md:block opacity-70'}`}>{p.d}</span></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Story arc ---------- */
export function StoryArc() {
  const stages = [['Stake', 40, 139], ['Struggle', 150, 98], ['Turning point', 270, 42], ['Outcome', 370, 110]] as const
  return (
    <Field tone="teal" className="mt-10 aspect-[16/9] md:aspect-[2.2/1]">
      <svg viewBox="0 0 440 200" className="absolute inset-0 w-full h-full" role="img" aria-label="Story arc: stake, struggle, turning point, outcome">
        <path d="M24 176 H416" {...dash} />
        <motion.path d="M30 140 C 60 140, 100 120, 150 98 C 200 76, 230 42, 270 42 C 310 42, 330 100, 370 110 L 410 112" {...lime}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />
        {stages.map(([name, x, y], i) => (
          <g key={name}>
            <line x1={x} y1={y} x2={x} y2="176" {...dash} />
            <circle cx={x} cy={y} r={i === 2 ? 8 : 5} fill={i === 2 ? L : I} />
            {i === 2 && <circle cx={x} cy={y} r="14" {...lime} strokeOpacity=".5" />}
            <text x={x} y="194" textAnchor="middle" fontSize="9.5" fill={I}>{name}</text>
          </g>
        ))}
        <text x="24" y="16" fontSize="8" fill={I} fillOpacity=".7" letterSpacing="1">TENSION</text>
      </svg>
    </Field>
  )
}

/* ---------- Decision flow ---------- */
export function DecisionFlow() {
  const Box = ({ label, children, hot }: { label: string; children: ReactNode; hot?: boolean }) => (
    <div className="flex-1 min-w-[8.5rem]"><p className="text-label text-ink-3 mb-3">{label}</p><div className="rounded-2 border p-3 flex flex-col gap-2" style={{ borderColor: hot ? 'var(--signal-ink)' : 'var(--line-1)', background: hot ? 'rgb(var(--ink-rgb) / .05)' : 'transparent' }}>{children}</div></div>
  )
  const Arrow = () => <span aria-hidden className="hidden md:grid place-items-center text-ink-3 pt-8">&rarr;</span>
  return (
    <div className="mt-10 card !p-5 md:!p-7 flex flex-col md:flex-row gap-4 md:gap-3">
      <Box label="1 · Options">{['A', 'B', 'C'].map((o, i) => <span key={o} className={`text-body-sm px-2.5 py-1.5 rounded-2 border ${i === 1 ? 'border-[color:var(--signal-ink)] text-ink' : 'border-[color:var(--line-1)] text-ink-3 line-through decoration-[color:var(--line-2)]'}`}>Option {o}</span>)}</Box>
      <Arrow />
      <Box label="2 · Criteria">{['Easy to find', 'Stays out of the way', 'Fits what exists'].map(c => <span key={c} className="text-body-sm text-ink-2">&bull; {c}</span>)}</Box>
      <Arrow />
      <Box label="3 · Choice" hot><span className="text-body-sm text-ink">Option B</span><span className="block h-1 rounded-full" style={{ background: 'var(--signal)' }} /><span className="text-body-sm text-ink-3">and why it won</span></Box>
      <Arrow />
      <Box label="4 · Cost"><span className="text-body-sm text-ink-2">What it gave up</span><span className="block border-t border-dashed border-[color:var(--line-2)]" /><span className="text-body-sm text-ink-3">Said plainly</span></Box>
    </div>
  )
}

export { icons }
