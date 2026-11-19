import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/** The bridge between keywords and conversation. The point shows where the beat sits. */
export function Spectrum({ at, large = false, gap = false, faintEnd = false }: { at: number; large?: boolean; gap?: boolean; faintEnd?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <div className={large ? 'py-10 md:py-16' : ''} aria-label={`Between keywords and conversation: ${Math.round(at * 100)}% of the way`} role="img">
      <div className="flex justify-between text-label text-ink-3 mb-3"><span>Keywords</span><span className={faintEnd ? 'opacity-50' : ''}>Conversation</span></div>
      <div className="relative h-4">
        {gap ? (
          <>
            <div className="absolute left-0 top-1/2 h-px bg-ink-3" style={{ width: '12%' }} />
            <div className="absolute right-0 top-1/2 h-px bg-ink-3" style={{ width: '12%' }} />
            <div className="absolute top-1/2 h-px border-t border-dashed" style={{ left: '14%', right: '14%', borderColor: 'var(--line-2)' }} />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 md:-top-9 text-label text-ink-3 whitespace-nowrap">A leap</span>
          </>
        ) : (
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: faintEnd ? 'linear-gradient(90deg, var(--line-2) 70%, transparent)' : 'var(--line-2)' }} />
        )}
        <motion.span className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-signal ${large ? 'h-4 w-4' : 'h-3 w-3'}`}
          initial={reduce ? false : { left: '0%' }} whileInView={{ left: `${at * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease }} style={{ left: `${at * 100}%` }} />
      </div>
    </div>
  )
}
