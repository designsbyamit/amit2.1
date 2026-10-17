import { motion, useReducedMotion } from 'framer-motion'

interface Level { name: string; text: string; state: 'floor' | 'today' | 'next' }

/** Three steps rising left to right; "today" is filled, "next" is dashed. */
export default function AutonomyLadder({ levels, next }: { levels: Level[]; next: string[] }) {
  const reduce = useReducedMotion()
  const heights = ['38%', '64%', '90%']
  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
      <div className="grid grid-cols-3 gap-3 items-end min-h-[340px]">
        {levels.map((l, i) => (
          <motion.div key={l.name} className="rounded-2xl p-5 flex flex-col justify-end relative" style={{ height: heights[i], minHeight: 170, border: l.state === 'next' ? '2px dashed var(--signal)' : '1px solid var(--line-2)', background: l.state === 'today' ? 'rgb(var(--ink-rgb))' : 'transparent', color: l.state === 'today' ? 'var(--surface-0)' : undefined, transformOrigin: 'bottom' }}
            initial={reduce ? false : { scaleY: 0.2, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <span className="absolute top-4 left-5 text-[10px] uppercase tracking-[0.1em] rounded-full px-2 py-0.5" style={l.state === 'today' ? { background: 'var(--signal)', color: '#10130a' } : { border: '1px solid currentColor', opacity: 0.6 }}>{l.state === 'today' ? 'Today' : l.state === 'next' ? 'Next' : 'Floor'}</span>
            <p className="text-title">{l.name}</p>
            <p className="text-body-sm mt-2 opacity-80">{l.text}</p>
          </motion.div>
        ))}
      </div>
      <div>
        <p className="text-overline text-ink-3 mb-5">Next evolutions</p>
        <ol className="space-y-5">
          {next.map((n, i) => (
            <li key={n} className="flex gap-4"><span className="text-label text-ink-3 w-6 shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span><span className="text-body-lg text-ink-2">{n}</span></li>
          ))}
        </ol>
      </div>
    </div>
  )
}
