import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/ds/Breadcrumb'
import Stat from '../components/ds/Stat'
import { TagList } from '../components/ds/Tag'
import PlaybackPlayer from '../components/playback/PlaybackPlayer'
import { caseStudies } from '../data/work'
import { playbackById } from '../data/playbacks'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** The short version of a case study: the headline, a one-minute playback, the role in two lines, then the five beats.
 *  A button to the detailed case study stays within reach the whole way down. */
export default function PlaybackPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const pb = id ? playbackById(id) : undefined
  const playerEnd = useRef<HTMLDivElement>(null)
  const [past, setPast] = useState(false)

  useEffect(() => {
    const el = playerEnd.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [id])

  if (!cs || !pb) return <Navigate to="/craft" replace />

  const detail = `/craft/${cs.id}/details`
  const next = caseStudies[(caseStudies.findIndex(c => c.id === cs.id) + 1) % caseStudies.length]
  const beats: [string, string][] = [
    ['What it is', pb.beats.about],
    ['The challenge', pb.beats.challenge],
    ['Who it is for', pb.beats.users],
    ['The solution', pb.beats.solution],
    ['The impact', pb.beats.impact],
  ]
  const meta = [cs.role, cs.timeline, cs.domain].filter(Boolean).join(' · ')

  return (
    <article>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: cs.shortTitle }]} /></div>
          <motion.p className="text-label text-ink-3 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-signal-ink">{cs.number}</span> / {cs.category.split(' · ').slice(0, 2).join(' · ')}
          </motion.p>
          <motion.h1 className="text-display-l text-ink max-w-[22ch]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {pb.headline}
          </motion.h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{pb.dek}</p>
          <div className="mt-10"><PlaybackPlayer id={cs.id} playback={pb} category={cs.category.split(' · ').slice(0, 2).join(' · ')} /></div>
          <div ref={playerEnd} />
        </div>
      </section>

      {/* Role in two lines, then the way into the full case study */}
      <section className="container-site py-10 md:py-14">
        <div className="grid-site gap-y-8 items-start">
          <div className="col-span-4 md:col-span-8">
            <p className="text-label text-ink-3 mb-3">{meta}</p>
            <p className="text-body-lg text-ink max-w-2xl">{pb.roleNote}</p>
            {cs.tags && <div className="mt-6"><TagList items={cs.tags.slice(0, 3)} label="Topics" /></div>}
          </div>
          <div className="col-span-4 md:col-span-4 md:justify-self-end">
            <Link to={detail} className="btn btn-primary">View the detailed case study<Arrow /></Link>
          </div>
        </div>
      </section>

      {/* The five beats */}
      <section className="hairline-top section-y">
        <div className="container-site">
          <dl className="grid gap-y-12">
            {beats.map(([label, text], i) => (
              <motion.div key={label} className="grid-site gap-y-3 items-start" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <dt className="col-span-4 md:col-span-3 text-overline text-ink-3"><span className="text-signal-ink mr-3">{String(i + 1).padStart(2, '0')}</span>{label}</dt>
                <dd className="col-span-4 md:col-span-9">
                  {label === 'The impact' && (
                    <div className="mb-6">
                      <Stat value={pb.metric.value} label={pb.metric.label} />
                    </div>
                  )}
                  <p className="text-body-lg text-ink-2 max-w-2xl">{text}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hairline-top section-y">
        <div className="container-site grid-site gap-y-8 items-center">
          <div className="col-span-4 md:col-span-8">
            <p className="text-label text-ink-3 mb-3">Want the whole story?</p>
            <h2 className="text-heading text-ink max-w-[24ch]">The process, the screens and the decisions behind it.</h2>
          </div>
          <div className="col-span-4 md:col-span-4 md:justify-self-end flex flex-col sm:flex-row md:flex-col gap-3">
            <Link to={detail} className="btn btn-primary">View the detailed case study<Arrow /></Link>
            <Link to={`/craft/${next.id}`} className="btn btn-ghost">Next: {next.shortTitle}<Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Stays in reach once the player has scrolled out of view */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ${past ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-hidden={!past}
      >
        <div className="border-t" style={{ background: 'var(--surface-1, #0b0d12)', borderColor: 'var(--line-1)' }}>
          <div className="container-site py-3 flex items-center justify-between gap-4">
            <p className="text-label text-ink-2 truncate hidden sm:block">{cs.shortTitle}</p>
            <Link to={detail} tabIndex={past ? 0 : -1} className="btn btn-primary !py-2 ml-auto">View the detailed case study<Arrow /></Link>
          </div>
        </div>
      </div>
    </article>
  )
}
