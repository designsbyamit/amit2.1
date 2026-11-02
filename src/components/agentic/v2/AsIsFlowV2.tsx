import { motion, useReducedMotion } from 'framer-motion'
import { PICTOGRAMS } from './Pictograms'

interface Step { t: string; d: string }

/** The "before" flow: six hand-offs, each with an animated pictogram, on a time bar that grows to weeks. */
export default function AsIsFlowV2({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const
  return (
    <div>
      <ol className="grid grid-cols-2 lg:grid-cols-3 gap-x-s40 gap-y-s80 lg:gap-x-s60 lg:gap-y-s120">
        {steps.map((s, i) => (
          <motion.li key={s.t} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.5, delay: i * 0.08, ease }}>
            <div className="w-3/4 rounded-3 border border-[color:var(--line-1)] bg-surface-0 p-s20">{PICTOGRAMS[i]}</div>
            <p className="text-label text-ink-3 mt-s30">{String(i + 1).padStart(2, '0')}</p>
            <p className="text-title text-white mt-s10 leading-snug">{s.t}</p>
            <p className="text-body-sm text-ink-3 mt-s10 max-w-measure-s">{s.d}</p>
          </motion.li>
        ))}
      </ol>
      <div className="mt-s120">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.08)' }}>
          <motion.div className="h-full rounded-full" style={{ background: 'var(--signal)', transformOrigin: 'left' }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease }} />
        </div>
        <div className="flex justify-between mt-s20 text-label text-ink-3"><span>Confirmation arrives</span><span className="text-ink">Weeks later</span></div>
      </div>
    </div>
  )
}
