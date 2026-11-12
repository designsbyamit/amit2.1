import { motion } from 'framer-motion'
import { publishedStories } from '../../data/leadership'
import StoryCard from '../ds/StoryCard'
import SectionHeader from '../ds/SectionHeader'
import Button from '../ds/Button'
import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import StoryCover from '../ds/StoryCover'

/** The leadership case, shown among the stories as one of the articles. */
function CaseCard() {
  const c = cases[0]
  return (
    <Link to={`/leadership/cases/${c.slug}`} className="group card card-link !p-0 overflow-hidden flex flex-col h-full">
      <StoryCover motif="culture" tone="teal" className="!rounded-none transition-transform duration-500 group-hover:scale-[1.015]" ratio="16 / 10" />
      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
        <h3 className="text-title text-ink group-hover:underline decoration-1 underline-offset-[0.18em]">{c.title}</h3>
        <p className="text-body-sm text-ink-2 line-clamp-3">{c.lesson}</p>
        <span className="btn btn-ghost self-start mt-auto" aria-hidden="true">Read the story
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  )
}

/** Hub of leadership stories: cards only; each opens its own page. */
export default function LeadershipStories({ asPage }: { asPage?: boolean }) {
  if (publishedStories.length === 0) return null
  const [first, ...rest] = publishedStories
  return (
    <section className={`relative ${asPage ? 'pb-24 md:pb-32' : 'section-y hairline-top'}`} id="stories">
      <div className="container-site">
        {!asPage && <SectionHeader label="Leadership stories" title="Lessons from the work." intro="Moments that shaped how I lead. Each one is a short read." action={<Button to="/leadership/stories" variant="secondary" arrow>All stories</Button>} />}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6 }}>
          <StoryCard story={first} index={0} featured />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          {cases[0] && <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6 }}><CaseCard /></motion.div>}
          {rest.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6, delay: ((i + 1) % 2) * 0.08 }}>
              <StoryCard story={s} index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
