import { motion, useReducedMotion } from 'framer-motion'

interface Step { t: string; d: string }
interface Nuance { k: string; t: string; d: string }

/** The "before" flow: six hand-offs on a time bar that grows from hours to weeks, with the three nuances called out. */
export default function AsIsFlow({ title, steps, nuances }: { title: string; steps: Step[]; nuances: Nuance[] }) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const
  return (
    <div>
      <p className="text-overline text-ink-3 mb-6">{title}</p>
      <div className="overflow-x-auto pb-2" tabIndex={0} aria-label="Diagram, scrolls sideways on small screens">
        <div className="min-w-[960px]">
          <ol className="grid grid-cols-6 gap-3">
            {steps.map((s, i) => (
              <motion.li key={s.t} className="relative" initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.5, delay: i * 0.12, ease }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full border grid place-items-center text-label text-ink-2" style={{ borderColor: 'var(--line-2)' }}>{i + 1}</span>
                  {i < steps.length - 1 && <span className="flex-1 h-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />}
                </div>
                <p className="text-body text-white leading-snug">{s.t}</p>
                <p className="text-body-sm text-ink-3 mt-2">{s.d}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-8">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.08)' }}>
              <motion.div className="h-full rounded-full" style={{ background: 'var(--signal)', transformOrigin: 'left' }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }} />
            </div>
            <div className="flex justify-between mt-2 text-label text-ink-3"><span>Confirmation arrives</span><span className="text-ink">Weeks later</span></div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-12">
        {nuances.map((n, i) => (
          <motion.div key={n.k} className="card" style={i === 0 ? { borderColor: 'var(--signal)' } : undefined} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i, ease }}>
            <p className="text-overline text-signal-ink">{n.k}{i === 0 ? ' · the one that matters most' : ''}</p>
            <p className={`${i === 0 ? 'text-heading' : 'text-title'} text-white mt-3`}>{n.t}</p>
            <p className="text-body text-ink-2 mt-3">{n.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
