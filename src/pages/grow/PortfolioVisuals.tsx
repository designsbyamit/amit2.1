import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/* Three visuals only, each for something text cannot show well:
   the character wheel, the anatomy of a project, and the story arc.
   Drawn like the resource covers: lime and light ink on a colour field. */
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
