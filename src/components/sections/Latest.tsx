import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cases } from '../../data/cases'
import { reflections } from '../../data/reflections'
import StoryCover from '../ds/StoryCover'
import ResourceCover from '../ds/ResourceCover'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** One framed card: a visual, the kind, a title, a short line and a way in. */
function Item({ to, kind, title, text, cta, visual, delay }: { to: string; kind: string; title: string; text: string; cta: string; visual: React.ReactNode; delay: number }) {
  return (
    <motion.li className="list-none" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={to} className="group card card-link !p-0 overflow-hidden flex flex-col h-full">
        <div className="relative overflow-hidden aspect-[16/10] shrink-0 [&>*]:transition-transform [&>*]:duration-700 [&>*]:ease-out group-hover:[&>*]:scale-[1.03] motion-reduce:group-hover:[&>*]:scale-100">{visual}</div>
        <div className="flex flex-col gap-3 p-6 md:p-8 flex-1">
          <p className="text-label text-signal-ink">{kind}</p>
          <h3 className="text-title text-ink group-hover:underline decoration-1 underline-offset-[0.18em]">{title}</h3>
          <p className="text-body text-ink-2 line-clamp-3 max-w-2xl">{text}</p>
          <span className="btn btn-ghost self-start mt-auto !px-0">{cta}<Arrow /></span>
        </div>
      </Link>
    </motion.li>
  )
}

/** A leadership practice, a workshop and a piece of writing. Shown inside Latest Works, below the projects, with its own separation. */
export default function Latest() {
  const practice = cases.find(c => c.slug === 'ai-experimentation-to-capability') ?? cases[0]
  const piece = reflections.find(r => r.id === 'ai-genai-framework') ?? reflections[0]
  const img = (src?: string, pos?: string) => src ? <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} /> : <div className="w-full h-full bg-surface-1" />
  return (
    <div className="mt-16 md:mt-24 pt-10 md:pt-14 border-t" style={{ borderColor: 'var(--line-2)' }} id="latest">
      <h3 className="text-label text-ink-3 mb-8 md:mb-10">Practice, workshop and writing</h3>
        <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Item to="/community/design-hub" kind="Community" title="Leading Design Hub India" text="14 events this year, 252+ members and volunteers who own their spaces." cta="Read the story" delay={0}
            visual={img(`${import.meta.env.BASE_URL}images/design-hub/film-poster.webp`)} />
          <Item to={`/leadership/cases/${practice.slug}`} kind="Practice" title={practice.title} text={practice.subtitle} cta="Read the case" delay={0.08}
            visual={<StoryCover motif="culture" tone="teal" className="!rounded-none w-full h-full" ratio="16 / 10" />} />
          <Item to="/resources/dual-fluency" kind="Workshop" title="Build Dual Fluency" text="A Framework, a vocabulary and set of tools for translating design quality into business outcomes." cta="View Toolkit" delay={0}
            visual={<div className="absolute inset-0"><ResourceCover bleed title="Dual Fluency" kind="Playbook" motif="loop" tone="cobalt" index={3} /></div>} />
          <Item to="/reflections" kind="Writing" title={piece.title} text={piece.excerpt} cta="Read the article" delay={0.08}
            visual={img(piece.image)} />
        </ul>
    </div>
  )
}
