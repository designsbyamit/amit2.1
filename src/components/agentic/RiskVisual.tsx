import { motion, useReducedMotion } from 'framer-motion'

type Sev = 'High' | 'Medium' | 'Low'
const SEV: Record<Sev, { bg: string; fg: string; w: number }> = {
  High: { bg: 'rgb(217 45 32 / 0.14)', fg: '#B42318', w: 100 },
  Medium: { bg: 'rgb(220 104 3 / 0.16)', fg: '#B54708', w: 62 },
  Low: { bg: 'rgb(6 118 71 / 0.14)', fg: '#067647', w: 28 },
}

/** Deviation -> severity -> order risk -> priority, with real deviations from one order and the confidence measure. */
export default function RiskVisual({ chain, examples, orderRisk, confidence, note }: { chain: string[]; examples: [string, string, string, Sev][]; orderRisk: string; confidence: { value: number; label: string }; note: string }) {
  const reduce = useReducedMotion()
  return (
    <div className="grid lg:grid-cols-[1fr_1.7fr] gap-10 lg:gap-14">
      <div>
        <ol className="relative">
          {chain.map((c, i) => (
            <motion.li key={c} className="flex items-center gap-4 pb-8 last:pb-0 relative" initial={reduce ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.18, duration: 0.5 }}>
              {i < chain.length - 1 && <span className="absolute left-[13px] top-8 bottom-0 w-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />}
              <span className="w-7 h-7 rounded-full grid place-items-center text-label shrink-0" style={{ background: i === chain.length - 1 ? 'var(--signal)' : 'transparent', border: '1px solid var(--line-2)', color: i === chain.length - 1 ? '#10130a' : undefined }}>{i + 1}</span>
              <span className="text-title text-white">{c}</span>
            </motion.li>
          ))}
        </ol>
        <div className="card mt-10">
          <p className="text-overline text-ink-3">Confidence</p>
          <div className="flex items-end gap-3 mt-3"><span className="text-display-l text-white leading-none">{confidence.value}</span><span className="text-heading text-ink-3 mb-1">%</span></div>
          <div className="h-1.5 rounded-full mt-4 overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.08)' }}>
            <motion.div className="h-full rounded-full" style={{ background: 'rgb(var(--ink-rgb))', transformOrigin: 'left', width: `${confidence.value}%` }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }} />
          </div>
          <p className="text-body-sm text-ink-3 mt-3">{confidence.label}</p>
        </div>
      </div>
      <div>
        <p className="text-overline text-ink-3 mb-5">{note}</p>
        <ul>
          {examples.map(([field, change, delta, sev], i) => (
            <motion.li key={field} className="hairline-top py-4 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 items-center" initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
              <div><p className="text-body text-white">{field}</p><p className="text-body-sm text-ink-3 mt-1">{change} · {delta}</p></div>
              <span className="rounded-full px-3 py-1 text-label" style={{ background: SEV[sev].bg, color: SEV[sev].fg }}>{sev}</span>
              <div className="col-span-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.06)' }}>
                <motion.div className="h-full rounded-full" style={{ background: SEV[sev].fg, width: `${SEV[sev].w}%`, transformOrigin: 'left' }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: 'easeOut' }} />
              </div>
            </motion.li>
          ))}
        </ul>
        <motion.div className="hairline-top pt-5 flex items-center justify-between" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}>
          <span className="text-title text-white">Order risk</span>
          <span className="rounded-full px-4 py-1.5 text-label" style={{ background: SEV.High.bg, color: SEV.High.fg }}>{orderRisk}</span>
        </motion.div>
      </div>
    </div>
  )
}
