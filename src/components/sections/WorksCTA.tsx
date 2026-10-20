import { motion } from 'framer-motion'
import Button from '../ds/Button'
import GrainOverlay from '../ui/GrainOverlay'

const EMAIL = 'uxbyamit@gmail.com'
const mail = (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

const ways = [
  { n: '01', title: 'Bring me a problem', body: 'Design leadership, AI-native product or enterprise UX that needs a second mind.', cta: 'Describe it', href: mail('A problem worth talking through', 'Hi Amit,\n\nThe problem:\nWho it affects:\nWhat has been tried:\n') },
  { n: '02', title: 'Build something with me', body: 'Research, frameworks or prototypes that are better made together, and in the open.', cta: 'Propose it', href: mail('Collaboration', 'Hi Amit,\n\nWhat we could make:\nWho is involved:\nWhy now:\n') },
  { n: '03', title: 'Put me in the room', body: 'A talk, a workshop or a portfolio review for your team or event.', cta: 'Plan it', href: mail('Talk, workshop or review', 'Hi Amit,\n\nTeam or event:\nDate and place:\nWhat the audience needs:\n') },
] as const

/** The close of the Works page: three ways to start, each a short email with the right questions already in it. */
export default function WorksCTA() {
  return (
    <section className="relative bg-black section-y px-6 md:px-12 overflow-hidden border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }} aria-labelledby="works-cta">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-20 items-end mb-12 md:mb-16">
          <motion.h2 id="works-cta" className="text-display-l text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Working on something <span style={{ color: 'var(--signal)', fontStyle: 'italic' }}>hard?</span>
          </motion.h2>
          <div>
            <p className="text-body-lg text-ink-2">Send the problem, not a brief. A few honest lines are enough to start.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/contact" arrow>Start a conversation</Button>
              <Button variant="secondary" href={`mailto:${EMAIL}`}>{EMAIL}</Button>
            </div>
          </div>
        </div>

        <ul className="grid md:grid-cols-3 gap-px rounded-2 overflow-hidden" style={{ background: 'var(--line-1)' }}>
          {ways.map((w, i) => (
            <motion.li key={w.n} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="bg-black">
              <a href={w.href} className="group flex h-full flex-col p-7 md:p-9 gap-10 transition-colors hover:bg-[rgb(var(--ink-rgb)/0.04)] focus-visible:bg-[rgb(var(--ink-rgb)/0.04)]">
                <span className="text-overline text-ink-3">{w.n}</span>
                <div>
                  <h3 className="text-heading text-white">{w.title}</h3>
                  <p className="text-body text-ink-3 mt-3 max-w-xs">{w.body}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-label text-white">
                  {w.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform group-hover:translate-x-1"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
