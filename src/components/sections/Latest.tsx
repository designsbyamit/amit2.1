import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudies } from '../../data/work'
import { cases } from '../../data/cases'
import { reflections } from '../../data/reflections'
import { initiatives } from '../../data/community'
import CaseThumb from '../ds/CaseThumb'
import StoryCover from '../ds/StoryCover'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function Card({ to, kind, title, text, cta, visual, delay }: { to: string; kind: string; title: string; text: string; cta: string; visual: React.ReactNode; delay: number }) {
  return (
    <motion.li className="list-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-4%' }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={to} className="group card card-link !p-0 overflow-hidden flex flex-col h-full">
        <div className="overflow-hidden" style={{ aspectRatio: '4 / 3' }}>{visual}</div>
        <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
          <p className="text-label text-signal-ink">{kind}</p>
          <h3 className="text-title text-ink group-hover:underline decoration-1 underline-offset-[0.18em]">{title}</h3>
          <p className="text-body-sm text-ink-2 line-clamp-3">{text}</p>
          <span className="btn btn-ghost self-start mt-auto">{cta}<Arrow /></span>
        </div>
      </Link>
    </motion.li>
  )
}

/** Latest: one project, one leadership practice, one talk, one piece of writing. */
export default function Latest() {
  const work = caseStudies.find(c => c.id === 'sap-agentic') ?? caseStudies[0]
  const practice = cases.find(c => c.slug === 'ai-experimentation-to-capability') ?? cases[0]
  const talk = initiatives.find(i => i.id === 'designup-workshop') ?? initiatives[0]
  const piece = reflections.find(r => r.id === 'vedic-design-series') ?? reflections[0]
  return (
    <section className="section-y hairline-top" id="latest">
      <div className="container-site">
        <h2 className="text-display-l text-ink mb-12 md:mb-16">Latest</h2>
        <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card to={`/craft/${work.id}`} kind="Project" title={work.title} text={work.tagline} cta="Read the case study" delay={0}
            visual={<CaseThumb id={work.id} className="w-full h-full object-cover" />} />
          <Card to={`/leadership/cases/${practice.slug}`} kind="Practice" title={practice.title} text={practice.subtitle} cta="Read the case" delay={0.08}
            visual={<StoryCover motif="culture" tone="teal" number={practice.number} className="!rounded-none w-full h-full" ratio="4 / 3" />} />
          <Card to="/resources/dual-fluency" kind="Talk" title={talk.name} text={talk.description} cta="See the talk" delay={0.16}
            visual={talk.image ? <img src={talk.image} alt="" loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: talk.imageFocus }} /> : <div className="w-full h-full bg-surface-1" />} />
          <Card to="/reflections" kind="Writing" title={piece.title} text={piece.excerpt} cta="Read the series" delay={0.24}
            visual={piece.image ? <img src={piece.image} alt="" loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-surface-1" />} />
        </ul>
      </div>
    </section>
  )
}
