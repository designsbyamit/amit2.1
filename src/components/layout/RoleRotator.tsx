import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const roles = ['Design Leader', 'Experience Strategist', 'Agentic Experience Designer', 'Systems Thinker', 'Design Community Builder']

/** Name and a role that rotates every few seconds, shown beside the logo. */
export default function NameRoles() {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(k => (k + 1) % roles.length), 3200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="flex flex-col leading-tight min-w-0">
      <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-ink whitespace-nowrap">Amit Kumar Tiwari</span>
      <span className="relative h-[1.1rem] overflow-hidden text-[0.75rem] text-ink-3 whitespace-nowrap" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={roles[i]} className="block" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">{roles.join(', ')}</span>
    </span>
  )
}
