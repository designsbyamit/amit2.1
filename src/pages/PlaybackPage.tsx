import { Fragment, Suspense, lazy, useState } from 'react'
import { heroClass, heroStyle } from '../data/caseTheme'
import CaseTags from '../components/ds/CaseTags'
import { Link, Navigate, useParams } from 'react-router-dom'
import Mark, { markForCase } from '../components/marks/Marks'
import Breadcrumb from '../components/ds/Breadcrumb'
import CaseThumb from '../components/ds/CaseThumb'
import Stat from '../components/ds/Stat'
import ShortStoryTag from '../components/playback/ShortStoryTag'
import ProcessFlow from '../components/playback/ProcessFlow'
import { TagList } from '../components/ds/Tag'
import { caseStudies } from '../data/work'
import { playbackById, type BeatKey, type Visual } from '../data/playbacks'
import { films } from '../data/films'
import VideoModal from '../components/ui/VideoModal'

const Embed = lazy(() => import('../components/playback/Embeds'))

const LABELS: Record<BeatKey, string> = { about: 'What it is', challenge: 'The challenge', users: 'Who it is for', solution: 'The solution', decision: 'A design decision', impact: 'The impact' }
const ORDER: BeatKey[] = ['about', 'challenge', 'users', 'solution', 'decision', 'impact']

/** One picture inside a beat, with a line saying what it shows. */
function BeatVisual({ v }: { v: Visual }) {
  return (
    <figure className={'embed' in v ? '' : v.narrow ? 'max-w-md' : ''}>
      {'embed' in v
        ? <Suspense fallback={<div className="rounded-3 bg-surface-2" style={{ aspectRatio: '16 / 7' }} />}><Embed name={v.embed} /></Suspense>
        : <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-1)', aspectRatio: v.ratio }}>
            <img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="w-full h-full object-cover block" />
          </div>}
      <figcaption className="text-body-sm text-ink-3 mt-3 max-w-2xl">{v.caption}</figcaption>
    </figure>
  )
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** The short version of a case study, as plain stacked sections: the headline, one clean cover, then short beats, each project in its own order, with pictures where they explain.
 *  Nothing plays and nothing slides. The button to the detailed case study is fixed to the bottom of the screen the whole way down. */
export default function PlaybackPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const pb = id ? playbackById(id) : undefined
  const [watching, setWatching] = useState(false)
  if (!cs || !pb) return <Navigate to="/craft" replace />

  const detail = `/craft/${cs.id}/details`
  const film = films[cs.id]
  const order = (pb.order ?? ORDER).filter(k => k === 'decision' ? !!pb.decision : !!pb.beats[k as Exclude<BeatKey, 'decision'>])
  const meta = [cs.role, cs.timeline, cs.domain].filter(Boolean)

  return (
    <article>
      <header className={heroClass(cs.id)} style={{ paddingTop: 'var(--header-h)', ...heroStyle(cs.id) }}>
        <div className="container-site pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: cs.shortTitle }]} /></div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5">
            {markForCase(cs.id) && <Mark name={markForCase(cs.id)!} size={36} className="text-ink-2" />}
            <p className="text-label text-ink-3">
              <span className="text-signal-ink">{cs.number}</span> / <CaseTags category={cs.category} />
            </p>
            <span className="md:hidden"><ShortStoryTag compact /></span>
          </div>
          <h1 className="text-ink font-serif" style={{ fontSize: 'var(--fs-page-title)', lineHeight: 1.1, letterSpacing: 'var(--track-title)', textWrap: 'balance' }}>{pb.headline}</h1>
          <div className="relative md:min-h-40">
            <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{pb.dek}</p>
            <div className="hidden md:block absolute right-[3%] top-[var(--space-20)]"><ShortStoryTag /></div>
          </div>
          <div className="mt-10"><CaseThumb id={cs.id} ratio="1800 / 1000" live /></div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-label text-ink-3">{meta.join(' · ')}</p>
            {cs.tags && <TagList items={cs.tags.slice(0, 3)} label="Topics" />}
          </div>
          <p className="text-body-lg text-ink mt-6 max-w-2xl">{pb.roleNote}</p>
          {pb.led && (
            <div className="mt-6 max-w-2xl rounded-3 border px-5 py-4" style={{ borderColor: 'rgb(var(--signal-ink-rgb) / 0.22)', background: 'rgb(var(--signal-ink-rgb) / 0.06)' }}>
              <p className="text-label text-ink-3">How I led it</p>
              <p className="text-body text-ink mt-1.5">{pb.led}</p>
            </div>
          )}
        </div>
      </header>

      {order.map((key, i) => {
        const label = pb.labels?.[key] ?? LABELS[key]
        const visuals = pb.visuals?.[key] ?? []
        return (
          <Fragment key={key}>
            <section className={`hairline-top section-y ${i % 2 === 0 ? 'bg-surface-1' : 'bg-surface-0'}`} aria-labelledby={`beat-${key}`}>
              <div className="container-site grid-site gap-y-6 items-start">
                <h2 id={`beat-${key}`} className="col-span-4 md:col-span-3 text-overline text-ink-3">{label}</h2>
                <div className="col-span-4 md:col-span-9 min-w-0">
                  {key === 'decision' && pb.decision ? (
                    <>
                      <h3 className="text-heading text-ink max-w-measure-l" style={{ textWrap: 'balance' }}>{pb.decision.heading}</h3>
                      <p className="text-body-lg text-ink-2 mt-5 max-w-2xl">{pb.decision.body}</p>
                    </>
                  ) : (
                    <>
                      {key === 'impact' && pb.metric && <div className="mb-6"><Stat value={pb.metric.value} label={pb.metric.label} /></div>}
                      {key === 'users' && pb.beats.personas && (
                        <ul className="flex flex-wrap gap-2 mb-5" aria-label="Personas">{pb.beats.personas.map(x => <li key={x} className="tag">{x}</li>)}</ul>
                      )}
                      <p className="text-body-lg text-ink-2 max-w-2xl">{pb.beats[key as Exclude<BeatKey, 'decision'>]}</p>
                      {key === 'challenge' && pb.beats.challengePoints && (
                        <ul className="mt-5 flex flex-col gap-3 max-w-2xl">
                          {pb.beats.challengePoints.map(x => (
                            <li key={x} className="flex gap-3 text-body-lg text-ink-2"><span aria-hidden="true" className="text-signal-ink mt-[0.1em]">-</span>{x}</li>
                          ))}
                        </ul>
                      )}
                      {key === 'challenge' && pb.beats.challengeNote && <p className="text-body-lg text-ink mt-6 max-w-2xl">{pb.beats.challengeNote}</p>}
                    </>
                  )}
                  {visuals.length > 0 && <div className="mt-10 md:mt-12 flex flex-col gap-12">{visuals.map((v, j) => <BeatVisual key={j} v={v} />)}</div>}
                </div>
              </div>
            </section>
            {key === 'solution' && pb.flow && <ProcessFlow stages={pb.flow} />}
          </Fragment>
        )
      })}

      {/* One component with the footer: it stays at the bottom of the screen while scrolling, then settles into the footer. */}
      <div className="sticky bottom-0 z-30 border-t bg-bg" style={{ borderColor: 'var(--line-1)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="container-site py-3 md:py-4 flex items-center justify-between gap-4">
          <p className="hidden md:block text-body text-ink-2 min-w-0">Want to get inside the messy process, explore the screens, and understand the design decisions?</p>
          <div className="flex items-center gap-3 w-full md:w-auto md:shrink-0">
            {film && <button type="button" onClick={() => setWatching(true)} className="btn btn-secondary !py-2 !px-4 md:!px-6 whitespace-nowrap flex-1 md:flex-none justify-center min-w-0">Watch the video</button>}
            <Link to={detail} className="btn btn-primary !py-2 !px-4 md:!px-6 whitespace-nowrap flex-1 md:flex-none justify-center min-w-0"><span className="md:hidden">Deep dive</span><span className="hidden md:inline">Take a deep dive</span><Arrow /></Link>
          </div>
        </div>
      </div>
      {watching && film && <VideoModal src={film.to} title={film.title} onClose={() => setWatching(false)} />}
    </article>
  )
}
