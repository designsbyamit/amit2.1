import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Who = 'Agent' | 'Operations' | 'Buyer' | 'Goods recipient'
interface Step { shot: string; who: Who; title: string; text: string; focus: [number, number, number, number]; contain?: boolean }

/** One order, start to finish. Each step zooms to the part of the real screen that matters. */
const STEPS: Step[] = [
  { shot: 'ops-worklist', who: 'Operations', title: 'The worklist is already waiting', text: 'The agent has read the new confirmations. Operations sees what needs validating and how confident the agent is.', focus: [0.03, 0.25, 0.36, 0.16] },
  { shot: 'ops-read', who: 'Operations', title: 'Extraction beside the PDF', text: 'What the agent read sits next to the supplier’s document, with its confidence on the order.', focus: [0, 0.04, 0.62, 0.5] },
  { shot: 'ops-editing', who: 'Operations', title: 'Correct what is wrong', text: 'Operations fixes a field in place. Every change is logged for audit.', focus: [0.46, 0.38, 0.5, 0.14] },
  { shot: 'ops-validate', who: 'Operations', title: 'Gate one: confirm validation', text: 'Nothing moves on until a person says so. Confirming starts the routing.', focus: [0.33, 0.5, 0.36, 0.28] },
  { shot: 'buyer-worklist', who: 'Buyer', title: 'The buyer starts with risk', text: 'Every confirmation shows its discrepancies, risk and status, so the highest-risk orders come first.', focus: [0.0, 0.42, 1, 0.36] },
  { shot: 'buyer-review', who: 'Agent', title: 'Every difference, with its reasoning', text: 'The agent compares with the purchase order, rates severity and explains each difference in plain language.', focus: [0.02, 0.5, 0.96, 0.22] },
  { shot: 'gr-review', who: 'Goods recipient', title: 'Gate two: decide your part', text: 'In parallel, the goods recipient sees only quantity and delivery, and accepts or rejects against what the store needs.', focus: [0.02, 0.7, 0.96, 0.22] },
  { shot: 'buyer-decided', who: 'Buyer', title: 'The buyer decides commercial terms', text: 'Accept or reject each difference, then confirm the decisions.', focus: [0.02, 0.5, 0.96, 0.44] },
  { shot: 'buyer-email', who: 'Agent', title: 'The reply drafts itself', text: 'The agent drafts the email to the supplier with the discrepancy list attached.', focus: [0, 0, 1, 1], contain: true },
  { shot: 'buyer-sent', who: 'Buyer', title: 'Gate three: send', text: 'The buyer reviews and sends. The page says what happens next: all set for now.', focus: [0.02, 0.27, 0.96, 0.2] },
  { shot: 'buyer-revised', who: 'Agent', title: 'The revision arrives as a new version', text: 'The supplier’s revised confirmation comes back grouped under the same order, ready to review.', focus: [0, 0.04, 0.72, 0.2] },
  { shot: 'buyer-activity', who: 'Agent', title: 'Everything is on the record', text: 'One timeline of who did what, including the AI Agent, from the first email to the close.', focus: [0, 0.25, 0.64, 0.66] },
]
const DUR = 5400
const ease = [0.16, 1, 0.3, 1] as const

export default function FlowPlayer({ imgs, title, intro }: { imgs: Record<string, string>; title: string; intro: string }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const step = STEPS[i]
  const run = playing && inView && !reduce

  useEffect(() => {
    const el = root.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el); return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!run) return
    const t = setTimeout(() => setI(n => (n + 1) % STEPS.length), DUR)
    return () => clearTimeout(t)
  }, [i, run])

  const [fx, fy, fw, fh] = step.focus
  const s = step.contain ? 1 : Math.min(2.6, 0.94 / Math.max(fw, fh))
  const tx = step.contain ? 0 : Math.min(0, Math.max(1 - s, 0.5 - (fx + fw / 2) * s)) * 100
  const ty = step.contain ? 0 : Math.min(0, Math.max(1 - s, 0.5 - (fy + fh / 2) * s)) * 100
  const actorStyle = step.who === 'Agent' ? { background: 'var(--signal)', color: '#10130a' } : { border: '1px solid rgb(var(--ink-rgb) / 0.5)' }

  return (
    <div ref={root}>
      <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-8 lg:gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <h3 className="text-heading text-white">{title}</h3>
          <p className="text-body text-ink-2 mt-3">{intro}</p>
          <div className="mt-8 min-h-[190px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
                <span className="inline-block rounded-full px-3 py-1 text-label" style={actorStyle}>{step.who}</span>
                <p className="text-label text-ink-3 mt-4">Step {i + 1} of {STEPS.length}</p>
                <p className="text-title text-white mt-1">{step.title}</p>
                <p className="text-body text-ink-2 mt-3">{step.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setI(n => (n - 1 + STEPS.length) % STEPS.length)} aria-label="Previous step">&larr;</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => setPlaying(p => !p)} aria-pressed={!playing}>{playing && !reduce ? 'Pause' : 'Play'}</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setI(n => (n + 1) % STEPS.length)} aria-label="Next step">&rarr;</button>
          </div>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: 'var(--line-2)', background: '#f5f6f7', aspectRatio: '1440 / 899' }}>
            <AnimatePresence mode="sync" initial={false}>
              {step.contain ? (
                <motion.img key={i} src={imgs[step.shot]} alt="" className="absolute inset-0 w-full h-full object-contain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
              ) : (
                <motion.div key={i} className="absolute inset-0" style={{ transformOrigin: '0 0' }}
                  initial={reduce ? false : { opacity: 0, x: '0%', y: '0%', scale: 1 }} animate={{ opacity: 1, x: `${tx}%`, y: `${ty}%`, scale: s }} exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.45 }, x: { duration: 1.3, ease, delay: 0.25 }, y: { duration: 1.3, ease, delay: 0.25 }, scale: { duration: 1.3, ease, delay: 0.25 } }}>
                  <img src={imgs[step.shot]} alt={step.title} className="w-full h-full block bg-white" />
                  <motion.div className="absolute rounded-md pointer-events-none" style={{ left: `${fx * 100}%`, top: `${fy * 100}%`, width: `${fw * 100}%`, height: `${fh * 100}%`, boxShadow: `0 0 0 ${2 / s}px #7aa800, 0 0 0 ${6 / s}px rgb(200 245 90 / 0.45)` }}
                    initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex gap-1.5 mt-4" role="tablist" aria-label="Steps">
            {STEPS.map((st, n) => (
              <button key={n} type="button" role="tab" aria-selected={n === i} aria-label={`Step ${n + 1}: ${st.title}`} onClick={() => setI(n)} className="relative flex-1 h-6 group">
                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <span className="block h-full rounded-full" style={{ background: 'rgb(var(--ink-rgb))', width: n < i ? '100%' : n === i ? (run ? '100%' : '100%') : '0%', transition: n === i && run ? `width ${DUR}ms linear` : 'width .3s', ...(n === i && run ? {} : {}) }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
