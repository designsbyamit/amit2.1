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

type Size = 'feature' | 'tile' | 'wide'

function Tile({ to, kind, title, text, cta, visual, size, delay, className = '' }: { to: string; kind: string; title: string; text: string; cta: string; visual: React.ReactNode; size: Size; delay: number; className?: string }) {
  const feature = size === 'feature'
  const wide = size === 'wide'
  return (
    <motion.li className={`list-none ${className}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-4%' }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={to} className={`group card card-link !p-0 overflow-hidden flex h-full ${wide ? 'flex-col md:flex-row' : 'flex-col'}`}>
        <div className={`overflow-hidden ${feature ? 'flex-1 min-h-[16rem]' : wide ? 'md:w-[40%] shrink-0 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}`}>{visual}</div>
        <div className={`flex flex-col gap-3 ${feature ? 'p-7 md:p-10' : wide ? 'p-6 md:p-10 flex-1 justify-center' : 'p-5 md:p-6 flex-1'}`}>
          <p className="text-label text-signal-ink">{kind}</p>
          <h3 className={`${feature || wide ? 'text-heading' : 'text-title'} text-ink group-hover:underline decoration-1 underline-offset-[0.18em]`}>{title}</h3>
          <p className={`text-body-sm text-ink-2 ${feature || wide ? 'max-w-[56ch] line-clamp-3' : 'line-clamp-2'}`}>{text}</p>
          <span className="btn btn-ghost self-start mt-2">{cta}<Arrow /></span>
        </div>
      </Link>
    </motion.li>
  )
}

/** Latest as a bento grid: the project takes the largest area, then a practice, a talk and a piece of writing. */
export default function Latest() {
  const work = caseStudies.find(c => c.id === 'sap-agentic') ?? caseStudies[0]
  const practice = cases.find(c => c.slug === 'ai-experimentation-to-capability') ?? cases[0]
  const talk = initiatives.find(i => i.id === 'designup-workshop') ?? initiatives[0]
  const piece = reflections.find(r => r.id === 'vedic-design-series') ?? reflections[0]
  const img = (src?: string, pos?: string) => src ? <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: pos }} /> : <div className="w-full h-full bg-surface-1" />
  return (
    <section className="section-y hairline-top" id="latest">
      <div className="container-site">
        <h2 className="text-display-l text-ink mb-12 md:mb-16">Latest</h2>
        <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Tile className="sm:col-span-2 lg:row-span-2" size="feature" to={`/craft/${work.id}`} kind="Project" title={work.title} text={work.tagline} cta="Read the case study" delay={0}
            visual={<CaseThumb id={work.id} className="w-full h-full object-cover" />} />
          <Tile size="tile" to={`/leadership/cases/${practice.slug}`} kind="Practice" title={practice.title} text={practice.subtitle} cta="Read the case" delay={0.08}
            visual={<StoryCover motif="culture" tone="teal" number={practice.number} className="!rounded-none w-full h-full" ratio="16 / 10" />} />
          <Tile size="tile" to="/resources/dual-fluency" kind="Talk" title={talk.name} text={talk.description} cta="See the talk" delay={0.16}
            visual={img(talk.image, talk.imageFocus)} />
          <Tile className="sm:col-span-2 lg:col-span-3" size="wide" to="/reflections" kind="Writing" title={piece.title} text={piece.excerpt} cta="Read the series" delay={0.24}
            visual={img(piece.image)} />
        </ul>
      </div>
    </section>
  )
}
