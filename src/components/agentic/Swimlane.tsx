import { motion, useReducedMotion } from 'framer-motion'

type Cell = { k: 'a' | 'h' | 'g'; t: string }
interface Lane { who: string; cells: Cell[][] }

/** Who acts at each step: the agent's work in filled chips, the three human gates in outlined chips. */
export default function Swimlane({ cols, lanes, legendA, legendG, legendH }: { cols: string[]; lanes: Lane[]; legendA: string; legendG: string; legendH: string }) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const
  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-label text-ink-2">
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px]" style={{ background: 'rgb(var(--ink-rgb))' }} />{legendA}</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] border-2" style={{ borderColor: 'var(--signal)', background: 'rgb(var(--signal-rgb, 200 245 90) / 0.35)' }} />{legendG}</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] border" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.5)' }} />{legendH}</span>
      </div>
      <div className="overflow-x-auto pb-2" tabIndex={0} aria-label="Diagram, scrolls sideways on small screens">
        <div className="min-w-[980px]" style={{ display: 'grid', gridTemplateColumns: `130px repeat(${cols.length}, minmax(130px, 1fr))` }}>
          <div />
          {cols.map((c, i) => (
            <motion.div key={c} className="px-2 pb-3 text-overline text-ink-3 flex items-center gap-2" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <span>{String(i + 1).padStart(2, '0')}</span><span>{c}</span>
              {i < cols.length - 1 && <span className="flex-1 h-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />}
            </motion.div>
          ))}
          {lanes.map(l => (
            <div key={l.who} className="contents">
              <div className="hairline-top py-4 pr-3 text-body text-white">{l.who}</div>
              {l.cells.map((cell, ci) => (
                <div key={ci} className="hairline-top p-2 min-h-[84px]" style={{ background: ci % 2 ? 'rgb(var(--ink-rgb) / 0.025)' : undefined }}>
                  {cell.map(c => (
                    <motion.div key={c.t} className="rounded-lg px-3 py-2.5 text-body-sm leading-snug"
                      style={c.k === 'a' ? { background: 'rgb(var(--ink-rgb))', color: 'var(--surface-0)' } : c.k === 'g' ? { border: '2px solid var(--signal)', background: 'rgb(200 245 90 / 0.28)', color: 'rgb(var(--ink-rgb))' } : { border: '1px solid rgb(var(--ink-rgb) / 0.5)', color: 'rgb(var(--ink-rgb))' }}
                      initial={reduce ? false : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.25 + ci * 0.16, ease }}>
                      {c.k === 'g' && <span className="block text-[10px] tracking-[0.08em] uppercase opacity-70 mb-1">Gate</span>}
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
  )
}
