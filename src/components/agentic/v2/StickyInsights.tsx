import { motion, useReducedMotion } from 'framer-motion'
import './v2.css'

interface Note { k: string; t: string; d: string; scrawl: string; tone: 'a' | 'b' | 'c'; tilt: number }

/** Three findings as sticky notes with handwritten scribbles. Colours and the hand font are tokens. */
export default function StickyInsights({ notes }: { notes: Note[] }) {
  const reduce = useReducedMotion()
  return (
    <ul className="grid md:grid-cols-3 gap-s60 md:gap-s40 lg:gap-s60 mt-s80">
      {notes.map((n, i) => (
        <motion.li key={n.k} className="sticky min-h-card-s" style={{ background: `var(--note-${n.tone})`, rotate: `${n.tilt}deg` }}
          initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: n.tilt }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
          <p className="text-overline" style={{ color: 'var(--note-ink)', opacity: 0.7 }}>{n.k}</p>
          <p className="text-title mt-s10" style={{ color: 'var(--note-ink)' }}>{n.t}</p>
          <p className="hand mt-s30">{n.d}</p>
          <p className="scrawl mt-s40 flex items-center gap-2">
            <svg width="30" height="16" viewBox="0 0 30 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12 C8 2 16 14 24 4" /><path d="M19 3 L25 4 L23 10" /></svg>
            {n.scrawl}
          </p>
        </motion.li>
      ))}
    </ul>
  )
}
