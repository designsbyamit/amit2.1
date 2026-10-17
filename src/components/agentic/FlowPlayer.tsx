import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Who = 'Agent' | 'Administrator' | 'Operations' | 'Buyer' | 'Goods recipient'
type Rect = [number, number, number, number]
interface Step { ch: number; shot: string; who: Who; title: string; text: string; ring?: Rect; overlay?: string; dur?: number }

const CHAPTERS = ['Set-up', 'Validate', 'Decide', 'Reply', 'Revise']

/** One order, start to finish, over the real screens. Every frame shows the whole screen; nothing zooms or crops. */
const STEPS: Step[] = [
  { ch: 0, shot: 'admin-setup', who: 'Administrator', title: 'Connect the mailbox and the ERP', text: 'An administrator opens Administration. Neither the Microsoft Office 365 mailbox nor the ERP system is connected yet.', ring: [0.07, 0.18, 0.53, 0.22] },
  { ch: 0, shot: 'admin-connected', who: 'Administrator', title: 'Both connected', text: 'Confirmations now arrive from the mailbox, and the purchase orders come from the ERP.', ring: [0.07, 0.18, 0.53, 0.22] },
  { ch: 1, shot: 'signin-ops', who: 'Operations', title: 'Each role signs in to the same assistant', text: 'David, in procurement operations, signs in. The buyer and the goods recipient use the same sign-in.', ring: [0.37, 0.25, 0.3, 0.5] },
  { ch: 1, shot: 'ops-worklist', who: 'Operations', title: 'The worklist is already waiting', text: 'The agent has read the new confirmations. Operations sees what needs validating and how confident the agent is.', ring: [0.03, 0.24, 0.36, 0.12] },
  { ch: 1, shot: 'ops-read', who: 'Operations', title: 'Extraction beside the PDF', text: 'What the agent read sits next to the supplier’s document, with its confidence on the order.', ring: [0, 0.04, 0.62, 0.5] },
  { ch: 1, shot: 'ops-edit', who: 'Operations', title: 'Switch to edit', text: 'Operations edits the extraction wherever the agent read it wrong.', ring: [0.03, 0.26, 0.62, 0.3] },
  { ch: 1, shot: 'ops-editing', who: 'Operations', title: 'Correct what is wrong', text: 'A field is fixed in place, with Save or Cancel at hand.', ring: [0.46, 0.38, 0.5, 0.14] },
  { ch: 1, shot: 'ops-confirm', who: 'Operations', title: 'Save a draft, or confirm', text: 'Updates are logged for audit. Operations can save a draft or confirm validation.', ring: [0.33, 0.37, 0.34, 0.27] },
  { ch: 1, shot: 'ops-saved', who: 'Operations', title: 'Corrections saved', text: 'The correction is kept, and the page waits for the final confirmation.', ring: [0.42, 0.865, 0.16, 0.08] },
  { ch: 1, shot: 'ops-validate', who: 'Operations', title: 'Gate one: mark validation complete', text: 'Nothing moves on until a person says so. Confirming starts the routing.', ring: [0.33, 0.44, 0.34, 0.26] },
  { ch: 1, shot: 'ops-validated', who: 'Operations', title: 'Validation complete', text: 'The extraction is now the record. The agent can compare it with the purchase order.', ring: [0.43, 0.86, 0.16, 0.08] },
  { ch: 2, shot: 'buyer-worklist', who: 'Buyer', title: 'The buyer starts with risk', text: 'Adrian sees every confirmation with its discrepancies, risk and status, with the highest risk first.', ring: [0, 0.42, 1, 0.36] },
  { ch: 2, shot: 'buyer-review', who: 'Agent', title: 'Every difference, with its reasoning', text: 'The agent compares with the purchase order, rates severity and explains each difference in plain language.', ring: [0.02, 0.5, 0.96, 0.22] },
  { ch: 2, shot: 'buyer-extraction', who: 'Buyer', title: 'The data behind it', text: 'The Extraction tab shows what the discrepancies came from, beside the supplier’s PDF.', ring: [0, 0.2, 0.62, 0.55] },
  { ch: 2, shot: 'buyer-decided', who: 'Buyer', title: 'Gate two: decide each difference', text: 'Accept or reject each commercial difference, then confirm the decisions.', ring: [0.02, 0.5, 0.96, 0.44] },
  { ch: 2, shot: 'buyer-saved', who: 'Buyer', title: 'Decisions saved, waiting for the others', text: 'The buyer’s part is done. The goods recipient still has to decide.', ring: [0.42, 0.86, 0.16, 0.08] },
  { ch: 2, shot: 'gr-worklist', who: 'Goods recipient', title: 'In parallel, another worklist', text: 'Rajan, the store executive, starts from his own worklist, grouped by purchase order.', ring: [0.03, 0.3, 0.93, 0.15] },
  { ch: 2, shot: 'gr-review', who: 'Goods recipient', title: 'Only what he can judge', text: 'Quantity and delivery date, accepted or rejected against what the store actually needs.', ring: [0.02, 0.7, 0.96, 0.22] },
  { ch: 2, shot: 'gr-decided', who: 'Goods recipient', title: 'Decisions made', text: 'Each difference is accepted or rejected.', ring: [0.02, 0.7, 0.96, 0.22] },
  { ch: 2, shot: 'gr-confirm', who: 'Goods recipient', title: 'Confirm the decisions', text: 'Submit becomes available once every difference has an answer.', ring: [0.88, 0.075, 0.1, 0.08] },
  { ch: 2, shot: 'gr-submit', who: 'Goods recipient', title: 'Submit, with an optional comment', text: 'The decisions go on for further processing.', ring: [0.33, 0.37, 0.34, 0.27] },
  { ch: 3, shot: 'buyer-share', who: 'Buyer', title: 'Next action: share with the supplier', text: 'With every decision in, the page names what happens next.', ring: [0.02, 0.27, 0.96, 0.2] },
  { ch: 3, shot: 'buyer-share', overlay: 'buyer-email', who: 'Agent', title: 'The reply drafts itself', text: 'The Email Supplier dialog opens over the object page, drafted by the agent with the discrepancy list attached.', dur: 6000 },
  { ch: 3, shot: 'buyer-sent', who: 'Buyer', title: 'Gate three: send', text: 'The buyer reviews and sends. The page says what happens next: all set for now.', ring: [0.02, 0.27, 0.96, 0.2] },
  { ch: 4, shot: 'buyer-versions', who: 'Agent', title: 'A revision arrives', text: 'The supplier’s revised confirmation comes back, grouped under the same purchase order.', ring: [0.03, 0.36, 0.93, 0.12] },
  { ch: 4, shot: 'buyer-revised', who: 'Buyer', title: 'A new version to review', text: 'The same page, for version 2, with its own discrepancies to decide.', ring: [0, 0.04, 0.72, 0.2] },
  { ch: 4, shot: 'gr-worklist-2', who: 'Goods recipient', title: 'Everyone stays in step', text: 'In the goods recipient’s worklist the first version is resolved and the revision waits.', ring: [0.03, 0.33, 0.93, 0.13] },
  { ch: 4, shot: 'buyer-activity', who: 'Agent', title: 'Everything is on the record', text: 'One timeline of who did what, including the AI Agent, from the first email to the close.', ring: [0, 0.25, 0.64, 0.66], dur: 5600 },
]
const DUR = 4200
const ease = [0.16, 1, 0.3, 1] as const
const counts = CHAPTERS.map((_, c) => STEPS.filter(s => s.ch === c).length)

export default function FlowPlayer({ imgs, title, intro }: { imgs: Record<string, string>; title: string; intro: string }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(!reduce)
  const [ended, setEnded] = useState(false)
  const [inView, setInView] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const fills = useRef<(HTMLSpanElement | null)[]>([])
  const elapsed = useRef(0)
  const loaded = useRef(false)
  const step = STEPS[i]
  const run = playing && inView && !ended

  const paint = useCallback((idx: number, p: number) => {
    const ch = STEPS[idx].ch
    const before = STEPS.slice(0, idx).filter(s => s.ch === ch).length
    CHAPTERS.forEach((_, c) => {
      const el = fills.current[c]; if (!el) return
      const f = c < ch ? 1 : c > ch ? 0 : Math.min(1, (before + p) / counts[c])
      el.style.transform = `scaleX(${f})`
    })
  }, [])

  useEffect(() => {
    const el = root.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el); return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!inView || loaded.current) return
    loaded.current = true
    Object.values(imgs).forEach(src => { const im = new Image(); im.decoding = 'async'; im.src = src })
  }, [inView, imgs])
  useEffect(() => {
    const dur = STEPS[i].dur ?? DUR
    paint(i, elapsed.current / dur)
    if (!run) return
    let raf = 0
    const t0 = performance.now() - elapsed.current
    const tick = (now: number) => {
      elapsed.current = now - t0
      paint(i, elapsed.current / dur)
      if (elapsed.current >= dur) {
        elapsed.current = 0
        if (i >= STEPS.length - 1) { paint(i, 1); setEnded(true); setPlaying(false) } else setI(i + 1)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [i, run, paint])

  const go = (n: number) => { elapsed.current = 0; setEnded(false); setI((n + STEPS.length) % STEPS.length) }
  const toggle = () => {
    if (ended) { elapsed.current = 0; setEnded(false); setI(0); setPlaying(true); return }
    setPlaying(p => !p)
  }
  const jumpChapter = (c: number) => go(STEPS.findIndex(s => s.ch === c))
  const actorStyle = step.who === 'Agent' ? { background: 'var(--signal)', color: '#10130a' } : { border: '1px solid rgb(var(--ink-rgb) / 0.5)' }
  const [rx, ry, rw, rh] = step.ring ?? [0, 0, 0, 0]

  return (
    <div ref={root}>
      <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-8 lg:gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <h3 className="text-heading text-white">{title}</h3>
          <p className="text-body text-ink-2 mt-3">{intro}</p>
          <div className="mt-8 min-h-[230px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
                <span className="inline-block rounded-full px-3 py-1 text-label" style={actorStyle}>{step.who}</span>
                <p className="text-label text-ink-3 mt-4">{CHAPTERS[step.ch]} · step {i + 1} of {STEPS.length}</p>
                <p className="text-title text-white mt-1">{step.title}</p>
                <p className="text-body text-ink-2 mt-3">{step.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => go(i - 1)} aria-label="Previous step">&larr;</button>
            <button type="button" className="btn btn-primary btn-sm min-w-[84px]" onClick={toggle}>{ended ? 'Replay' : playing ? 'Pause' : 'Play'}</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => go(i + 1)} aria-label="Next step">&rarr;</button>
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: 'var(--line-2)', background: '#f5f6f7', aspectRatio: '1440 / 899' }}>
            <AnimatePresence initial={false}>
              <motion.img key={step.shot} src={imgs[step.shot]} alt={step.title} className="absolute inset-0 w-full h-full block bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.45 }} />
            </AnimatePresence>
            <AnimatePresence>
              {step.overlay && (
                <motion.div key="overlay" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="absolute inset-0" style={{ background: 'rgb(10 14 22 / 0.5)' }} />
                  <motion.div role="img" aria-label="Email Supplier dialog, drafted by the agent" className="absolute rounded-lg" style={{ left: '50%', top: '7%', height: '86%', aspectRatio: '0.531', x: '-50%', background: `#fff url(${imgs[step.overlay]}) no-repeat`, backgroundSize: '133.7% auto', backgroundPosition: '50% 37.5%', boxShadow: '0 24px 60px rgb(0 0 0 / 0.4)' }}
                    initial={reduce ? false : { y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.2 }} />
                </motion.div>
              )}
            </AnimatePresence>
            {step.ring && (
              <motion.div key={`ring-${i}`} className="absolute rounded-md pointer-events-none" style={{ left: `${rx * 100}%`, top: `${ry * 100}%`, width: `${rw * 100}%`, height: `${rh * 100}%`, border: '2px solid #7aa800' }}
                initial={reduce ? false : { opacity: 0, scale: 1.03 }} animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, boxShadow: ['0 0 0 0px rgb(200 245 90 / 0.0)', '0 0 0 7px rgb(200 245 90 / 0.5)', '0 0 0 3px rgb(200 245 90 / 0.3)'] }} transition={{ delay: 0.55, duration: 0.9, ease }} />
            )}
            {!playing && (
              <button type="button" onClick={toggle} aria-label={ended ? 'Replay the flow' : 'Play the flow'} className="absolute inset-0 grid place-items-center" style={{ background: 'rgb(10 14 22 / 0.08)' }}>
                <span className="w-16 h-16 rounded-full grid place-items-center" style={{ background: 'var(--signal)', color: '#10130a', boxShadow: '0 10px 30px rgb(0 0 0 / 0.3)' }}>
                  {ended ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>}
                </span>
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-5" role="tablist" aria-label="Chapters">
            {CHAPTERS.map((c, n) => (
              <button key={c} type="button" role="tab" aria-selected={n === step.ch} onClick={() => jumpChapter(n)} className="text-left min-w-0" style={{ flex: counts[n] }}>
                <span className="block h-1 rounded-full overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <span ref={el => { fills.current[n] = el }} className="block h-full rounded-full origin-left" style={{ background: 'rgb(var(--ink-rgb))', transform: 'scaleX(0)' }} />
                </span>
                <span className={`block mt-2 text-label truncate ${n === step.ch ? 'text-white' : 'text-ink-3'}`}>{c}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
