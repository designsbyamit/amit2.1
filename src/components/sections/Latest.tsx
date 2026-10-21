import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cases } from '../../data/cases'
import { reflections } from '../../data/reflections'
import StoryCover from '../ds/StoryCover'
import ResourceCover from '../ds/ResourceCover'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** One full-width row: visual on the left, the details on the right, so every item reads in one fold. */
function Row({ to, kind, title, text, cta, visual, delay }: { to: string; kind: string; title: string; text: string; cta: string; visual: React.ReactNode; delay: number }) {
  return (
    <motion.li className="list-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-4%' }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={to} className="group card card-link !p-0 overflow-hidden flex flex-col md:flex-row md:min-h-[17rem]">
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:w-[40%] shrink-0">{visual}</div>
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10 flex-1">
          <p className="text-label text-signal-ink">{kind}</p>
          <h3 className="text-heading text-ink group-hover:underline decoration-1 underline-offset-[0.18em] max-w-[28ch]">{title}</h3>
          <p className="text-body text-ink-2 max-w-[62ch] line-clamp-3">{text}</p>
          <span className="btn btn-ghost self-start mt-1">{cta}<Arrow /></span>
        </div>
      </Link>
    </motion.li>
  )
}

/** Latest: a leadership practice, a workshop and a piece of writing, each at full width. Projects live in Selected work above. */
export default function Latest() {
  const practice = cases.find(c => c.slug === 'ai-experimentation-to-capability') ?? cases[0]
  const piece = reflections.find(r => r.id === 'vedic-design-series') ?? reflections[0]
  const img = (src?: string, pos?: string) => src ? <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} /> : <div className="w-full h-full bg-surface-1" />
  return (
    <section className="section-y hairline-top" id="latest">
      <div className="container-site">
        <h2 className="text-display-l text-ink mb-12 md:mb-16">Latest</h2>
        <ul className="grid gap-4 md:gap-6">
          <Row to={`/leadership/cases/${practice.slug}`} kind="Practice" title={practice.title} text={practice.subtitle} cta="Read the case" delay={0.06}
            visual={<StoryCover motif="culture" tone="teal" number={practice.number} className="!rounded-none w-full h-full" ratio="16 / 10" />} />
          <Row to="/resources/dual-fluency" kind="Workshop" title="Build Dual Fluency" text="A Framework, a vocabulary and set of tools for translating design quality into business outcomes." cta="View Toolkit" delay={0.12}
            visual={<div className="absolute inset-0"><ResourceCover bleed title="Dual Fluency" kind="Playbook" motif="loop" tone="cobalt" index={3} /></div>} />
          <Row to="/reflections" kind="Writing" title={piece.title} text={piece.excerpt} cta="Read the series" delay={0.18}
            visual={img(piece.image)} />
        </ul>
      </div>
    </section>
  )
}
