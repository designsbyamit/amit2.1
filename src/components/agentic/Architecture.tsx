import { motion, useReducedMotion } from 'framer-motion'

interface Stage { n: string; title: string; body: string; img: string; name: string; pos: string }

/** Four stages as one visual flow: a line draws through four screen crops. */
export default function Architecture({ stages, onZoom }: { stages: Stage[]; onZoom: (i: number) => void }) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const
  return (
    <div className="relative">
      <motion.div className="hidden lg:block absolute left-[6%] right-[6%] top-[11px] h-px" style={{ background: 'var(--line-2)', transformOrigin: 'left' }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} aria-hidden="true" />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {stages.map((s, i) => (
          <motion.li key={s.n} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.55, delay: i * 0.14, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="relative z-10 w-6 h-6 rounded-full grid place-items-center text-[10px]" style={{ background: 'var(--signal)', color: '#10130a' }}>{s.n}</span>
              {i < stages.length - 1 && <span className="lg:hidden flex-1 h-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />}
            </div>
            <button type="button" onClick={() => onZoom(i)} className="block w-full rounded-lg overflow-hidden border focus-visible:outline-2" style={{ borderColor: 'var(--line-2)', cursor: 'zoom-in' }} aria-label={`Enlarge screen: ${s.name}`}>
              <img src={s.img} alt={s.name} width={1440} height={899} className="w-full aspect-[4/3] object-cover bg-white block" style={{ objectPosition: s.pos }} loading="lazy" decoding="async" />
            </button>
            <h3 className="text-title text-white mt-5">{s.title}</h3>
            <p className="text-body text-ink-2 mt-2">{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
