import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CaseStudy } from '../../data/work'
import MediaFrame from './MediaFrame'
import CaseCover from '../ui/CaseCover'

/** Case study list item: number + category, title, tagline, "Read" action, screenshot on a coloured field.
 *  The whole row is one link; the inner "Read" label is visual only. */
export default function CaseRow({ cs, index = 0, headingLevel = 'h3' }: { cs: CaseStudy; index?: number; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  return (
    <motion.li className="hairline-top list-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={`/craft/${cs.id}`} className="group grid-site gap-y-6 py-10 md:py-14" data-cursor="project" data-cursor-label="View case">
        <div className="col-span-4 md:col-span-5 flex flex-col justify-center gap-4 md:pr-6 order-2 md:order-1">
          <p className="text-label text-ink-3"><span className="text-signal-ink">{cs.number}</span> / {cs.category.split(' · ').slice(0, 2).join(' · ')}</p>
          <H className="text-heading text-ink group-hover:underline decoration-1 underline-offset-[0.18em]">{cs.title}</H>
          <p className="text-body text-ink-2 max-w-md">{cs.tagline}</p>
          {cs.role && <p className="tag">{cs.role}</p>}
          <span className="btn btn-ghost self-start mt-1" aria-hidden="true">Read the case study
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <div className="col-span-4 md:col-span-7 order-1 md:order-2">
          {cs.image
            ? <MediaFrame src={cs.image} alt="" tone={cs.tone} className="transition-transform duration-500 group-hover:scale-[1.01]" />
            : <CaseCover cs={cs} className="w-full rounded-2" minHeight={320} />}
        </div>
      </Link>
    </motion.li>
  )
}
