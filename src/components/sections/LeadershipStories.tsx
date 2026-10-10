import { motion } from 'framer-motion'
import { publishedStories } from '../../data/leadership'
import StoryCard from '../ds/StoryCard'
import SectionHeader from '../ds/SectionHeader'
import Button from '../ds/Button'

/** Hub of leadership stories: cards only; each opens its own page. */
export default function LeadershipStories({ asPage }: { asPage?: boolean }) {
  if (publishedStories.length === 0) return null
  const [first, ...rest] = publishedStories
  return (
    <section className={`relative ${asPage ? 'pb-24 md:pb-32' : 'section-y hairline-top'}`} id="stories">
      <div className="container-site">
        {!asPage && <SectionHeader label="Leadership stories" title="Real lessons, honestly told." intro="Moments that shaped how I lead. Each one is a short read." action={<Button to="/leadership/stories" variant="secondary" arrow>All stories</Button>} />}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6 }}>
          <StoryCard story={first} index={0} featured />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          {rest.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}>
              <StoryCard story={s} index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
