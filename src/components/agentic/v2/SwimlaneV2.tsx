import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './v2.css'

type Cell = { k: 'a' | 'h' | 'g'; t: string }
interface Lane { who: string; cells: Cell[][] }
type Mode = 'h' | 'v' | 'L'
/** Edges in the order the work moves: from, to, route, then small offsets so heads that meet do not overlap. */
const EDGES: [string, string, Mode, number?, number?, number?][] = [
  ['0:0', '0:1', 'h'], ['0:1', '1:1', 'v'], ['1:1', '1:2', 'h'], ['1:2', '0:3', 'h', 0, 0, -18],
  ['0:3', '2:3', 'v'], ['0:3', '3:3', 'L', 10, 0], ['2:3', '0:4', 'h', 0, -9, -14], ['3:3', '0:4', 'h', 0, 9, 14],
  ['0:4', '2:4', 'v'], ['2:4', '0:5', 'h'],
]
const R = 10
interface Box { l: number; r: number; t: number; b: number }

/** Who acts at each step, with a moving connector that threads the boxes in the order the work moves. */
export default function SwimlaneV2({ cols, lanes, legendA, legendG, legendH }: { cols: string[]; lanes: Lane[]; legendA: string; legendG: string; legendH: string }) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const
  const wrap = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const [paths, setPaths] = useState<string[]>([])
  const [size, setSize] = useState<[number, number]>([0, 0])

  const measure = () => {
    const w = wrap.current; if (!w) return
    const o = w.getBoundingClientRect()
    const box = (k: string): Box | null => { const e = refs.current[k]; if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left - o.left, r: r.right - o.left, t: r.top - o.top, b: r.bottom - o.top } }
    const out: string[] = []
    for (const [a, b, m, da = 0, db = 0, dm = 0] of EDGES) {
      const A = box(a), B = box(b); if (!A || !B) continue
      const y1 = (A.t + A.b) / 2 + da, y2 = (B.t + B.b) / 2 + db
      if (m === 'v') {
        const x = (A.l + A.r) / 2
        out.push(B.t > A.t ? `M${x} ${A.b} V${B.t}` : `M${x} ${A.t} V${B.b}`)
      } else if (m === 'L') {
        const x = A.l - 14
        out.push(`M${A.l} ${y1} H${x + R} A${R} ${R} 0 0 0 ${x} ${y1 + R} V${y2 - R} A${R} ${R} 0 0 0 ${x + R} ${y2} H${B.l}`)
      } else if (Math.abs(y1 - y2) < 8) {
        const y = (y1 + y2) / 2
        out.push(`M${A.r} ${y} H${B.l}`)
      } else {
        const mx = (A.r + B.l) / 2 + dm, up = y2 < y1, d = up ? -R : R
        out.push(`M${A.r} ${y1} H${mx - R} A${R} ${R} 0 0 ${up ? 0 : 1} ${mx} ${y1 + d} V${y2 - d} A${R} ${R} 0 0 ${up ? 1 : 0} ${mx + R} ${y2} H${B.l}`)
      }
    }
    setPaths(out); setSize([o.width, o.height])
  }
  useLayoutEffect(() => { measure() }, [lanes])
  useEffect(() => {
    const w = wrap.current; if (!w) return
    const ro = new ResizeObserver(measure); ro.observe(w)
    return () => ro.disconnect()
  }, [])

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-label text-ink-2">
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-1" style={{ background: 'rgb(var(--ink-rgb))' }} />{legendA}</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-1 border-2" style={{ borderColor: 'var(--signal)', background: 'rgb(var(--signal-rgb) / 0.35)' }} />{legendG}</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-1 border" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.5)' }} />{legendH}</span>
      </div>
      <div className="overflow-x-auto pb-2" tabIndex={0} aria-label="Diagram, scrolls sideways on small screens">
        <div ref={wrap} className="relative min-w-scroll-m">
          <svg className="absolute inset-0 pointer-events-none" width={size[0]} height={size[1]} aria-hidden="true">
            <defs>
              <marker id="sl-arrow" viewBox="0 0 12 12" refX="10.5" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M2 2 L10 6 L2 10" fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></marker>
            </defs>
            {paths.map((d, i) => (
              <motion.path key={i} d={d} fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" className={reduce ? undefined : 'cx-flow'} markerEnd="url(#sl-arrow)"
                initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.18, duration: 0.5 }} />
            ))}
          </svg>
          <div className="relative" style={{ display: 'grid', gridTemplateColumns: `var(--size-cell) repeat(${cols.length}, minmax(var(--size-cell), 1fr))` }}>
            <div />
            {cols.map((c, i) => (
              <motion.div key={c} className="px-2 pb-3 text-label text-ink-3 flex items-center gap-2" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span>{String(i + 1).padStart(2, '0')}</span><span>{c}</span>
              </motion.div>
            ))}
            {lanes.map((l, li) => (
              <div key={l.who} className="contents">
                <div className="hairline-top py-4 pr-3 text-body text-white">{l.who}</div>
                {l.cells.map((cell, ci) => (
                  <div key={ci} className="hairline-top p-3 min-h-lane">
                    {cell.map(c => (
                      <motion.div key={c.t} ref={(e: HTMLDivElement | null) => { refs.current[`${li}:${ci}`] = e }} className="relative rounded-lg px-3 py-2.5 text-body leading-snug w-[72%] mx-auto"
                        style={c.k === 'a' ? { background: 'rgb(var(--ink-rgb))', color: 'var(--surface-0)' } : c.k === 'g' ? { border: 'var(--space-2) solid var(--signal)', background: 'var(--surface-1)', color: 'rgb(var(--ink-rgb))' } : { border: 'var(--space-1) solid rgb(var(--ink-rgb) / 0.5)', background: 'var(--surface-1)', color: 'rgb(var(--ink-rgb))' }}
                        initial={reduce ? false : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.25 + ci * 0.16, ease }}>
                        {c.k === 'g' && <span className="block text-t-2xs tracking-overline uppercase opacity-70 mb-1">Gate</span>}
                        {c.t}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
