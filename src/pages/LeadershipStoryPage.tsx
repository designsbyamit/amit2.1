import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publishedStories, storySlug } from '../data/leadership'
import Breadcrumb from '../components/ds/Breadcrumb'
import StoryCover from '../components/ds/StoryCover'
import RevealText from '../components/ui/RevealText'

export default function LeadershipStoryPage() {
  const { slug } = useParams()
  const idx = publishedStories.findIndex(s => storySlug(s) === slug)
  if (idx < 0) return <Navigate to="/leadership/stories" replace />
  const s = publishedStories[idx]
  const prev = publishedStories[idx - 1]
  const next = publishedStories[idx + 1]
  const n = String(idx + 1).padStart(2, '0')

  return (
    <article>
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-12">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Leadership', to: '/leadership' }, { label: 'Stories', to: '/leadership/stories' }, { label: `Story ${n}` }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-7">
              <p className="text-label text-ink-3 mb-5"><span className="text-signal-ink">Story {n}</span>{s.context && <> / {s.context}</>}</p>
              <h1 className="text-display-l text-ink"><RevealText text={s.title} delay={0.1} /></h1>
            </div>
            <motion.div className="col-span-4 md:col-span-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <StoryCover motif={s.motif ?? 'seat'} tone={s.tone} ratio="4 / 3" />
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container-site pb-24 md:pb-32">
        <div className="grid-site">
          <div className="col-span-4 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3">
            <div className="flex flex-col gap-6 hairline-top pt-12">
              {s.narrative.map((p, i) => <p key={i} className="text-body-editorial text-ink-2">{p}</p>)}
            </div>

            {s.learnings && s.learnings.length > 0 && (
              <section className="mt-16" aria-labelledby="learned">
                <h2 id="learned" className="text-overline text-ink-3 mb-6">What I learned</h2>
                <ol className="flex flex-col gap-5">
                  {s.learnings.map((l, i) => (
                    <li key={i} className="flex gap-5"><span className="text-label text-signal-ink pt-1 flex-none">{String(i + 1).padStart(2, '0')}</span><p className="text-body text-ink">{l}</p></li>
                  ))}
                </ol>
              </section>
            )}

            {s.nuggets && s.nuggets.length > 0 && (
              <section className="mt-16" aria-labelledby="nuggets">
                <h2 id="nuggets" className="text-overline text-ink-3 mb-6">Nuggets to remember</h2>
                <ul className="grid sm:grid-cols-2 gap-3">{s.nuggets.map((x, i) => <li key={i} className="card !p-5 text-body text-ink">{x}</li>)}</ul>
              </section>
            )}

            {s.lesson && (
              <figure className="mt-16 rounded-3 p-8 md:p-10" style={{ background: 'var(--field-graphite)' }}>
                <blockquote className="quote !text-[#ECEDEF]">“{s.lesson}”</blockquote>
              </figure>
            )}
          </div>
        </div>

        <nav aria-label="More stories" className="mt-20 hairline-top pt-10 grid md:grid-cols-2 gap-4">
          {prev ? <Link to={`/leadership/stories/${storySlug(prev)}`} className="card card-link"><p className="text-label text-ink-3 mb-2">Previous story</p><p className="text-title text-ink">{prev.title}</p></Link> : <span />}
          {next ? <Link to={`/leadership/stories/${storySlug(next)}`} className="card card-link md:text-right"><p className="text-label text-ink-3 mb-2">Next story</p><p className="text-title text-ink">{next.title}</p></Link>
            : <Link to="/leadership/stories" className="card card-link md:text-right"><p className="text-label text-ink-3 mb-2">Back to</p><p className="text-title text-ink">All leadership stories</p></Link>}
        </nav>
      </div>
    </article>
  )
}
