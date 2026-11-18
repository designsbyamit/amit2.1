import { Fragment, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { heroClass, heroStyle } from '../data/caseTheme'
import Breadcrumb from '../components/ds/Breadcrumb'
import CaseTags from '../components/ds/CaseTags'
import CaseThumb from '../components/ds/CaseThumb'
import ProcessFlow from '../components/playback/ProcessFlow'
import VideoModal from '../components/ui/VideoModal'
import { caseStudies } from '../data/work'
import { playbackById, type Visual } from '../data/playbacks'
import { storyById, type Chapter } from '../data/stories'
import { films } from '../data/films'

const Embed = lazy(() => import('../components/playback/Embeds'))

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function Figure({ v }: { v: Visual }) {
  return (
    <figure className={'embed' in v ? '' : v.narrow ? 'max-w-lg' : ''}>
      {'embed' in v
        ? <Suspense fallback={<div className="rounded-3 bg-surface-2" style={{ aspectRatio: '16 / 7' }} />}><Embed name={v.embed} /></Suspense>
        : <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-1)', aspectRatio: v.ratio }}>
            <img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="w-full h-full object-cover block" />
          </div>}
      <figcaption className="text-body-sm text-ink-3 mt-3 max-w-2xl">{v.caption}</figcaption>
    </figure>
  )
}

const Chips = ({ items, big }: { items: string[]; big?: boolean }) => (
  <ul className="flex flex-wrap gap-2 md:gap-3">
    {items.map(x => (
      <li key={x} className={big ? 'rounded-full border px-4 py-2 md:px-5 md:py-2.5 font-serif text-ink' : 'tag'} style={big ? { borderColor: 'var(--line-2)', fontSize: 'var(--fs-title)' } : undefined}>{x}</li>
    ))}
  </ul>
)

/** Which chapter is on screen, for the spine marker. */
function useActive(count: number) {
  const [active, setActive] = useState(-1)
  const refs = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)) }), { rootMargin: '-45% 0px -50% 0px' })
    refs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [count])
  return { active, refs }
}

/**
 * The short story, proposal version. One grammar for every case, its own story inside it:
 * the crux on the first screen, one thing to follow (the spine), chapters with story headings, one decision told large, an honest ending.
 */
export default function StoryPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const st = id ? storyById(id) : undefined
  const pb = id ? playbackById(id) : undefined
  const [watching, setWatching] = useState(false)
  const { active, refs } = useActive(st?.chapters.length ?? 0)
  if (!cs || !st) return <Navigate to={id ? `/craft/${id}` : '/craft'} replace />

  const film = films[cs.id]
  const meta = [cs.role, cs.timeline, cs.domain].filter(Boolean)
  const crux = [
    { label: 'The tension', text: st.crux.tension },
    { label: 'The decision', text: st.crux.decision },
    { label: st.crux.standsLabel ?? 'Where it stands', text: st.crux.stands },
  ]

  const chapter = (c: Chapter, i: number) => (
    <section key={c.heading} ref={el => { refs.current[i] = el }} data-i={i} className="hairline-top section-y" aria-labelledby={`ch-${i}`}>
      <div className="container-site grid-site gap-y-6 items-start">
        <div className="col-span-4 md:col-span-5">
          <p className="text-label text-signal-ink tabular-nums">{String(i + 1).padStart(2, '0')}</p>
          <h2 id={`ch-${i}`} className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.12, textWrap: 'balance' }}>{c.heading}</h2>
        </div>
        <div className="col-span-4 md:col-span-7 min-w-0 md:pt-8">
          <p className="text-body-lg text-ink-2 max-w-2xl">{c.body}</p>
          {c.chips && <div className="mt-6"><Chips items={c.chips} /></div>}
          {c.facts && (
            <dl className="mt-8 grid grid-cols-3 gap-4 md:gap-8">
              {c.facts.map(f => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-serif text-ink leading-none" style={{ fontSize: 'var(--fs-d-l)' }}>{f.value}</dd>
                  <dd className="text-body-sm text-ink-3 mt-2">{f.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {c.visual && <div className="col-span-4 md:col-span-12 mt-4 md:mt-8"><Figure v={c.visual} /></div>}
      </div>
    </section>
  )

  return (
    <article>
      {/* ── first screen: the crux ── */}
      <header className={heroClass(cs.id)} style={{ paddingTop: 'var(--header-h)', ...heroStyle(cs.id) }}>
        <div className="container-site pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: cs.shortTitle }]} /></div>
          <p className="text-label text-ink-3 mb-5"><span className="text-signal-ink">{cs.number}</span> / <CaseTags category={cs.category} /></p>
          <h1 className="text-ink font-serif max-w-5xl" style={{ fontSize: 'var(--fs-page-title)', lineHeight: 1.08, letterSpacing: 'var(--track-title)', textWrap: 'balance' }}>{st.headline}</h1>
          <dl className="mt-10 md:mt-12 grid md:grid-cols-3 gap-6 md:gap-10 border-t pt-6 md:pt-8" style={{ borderColor: 'var(--line-2)' }}>
            {crux.map((c, i) => (
              <div key={c.label}>
                <dt className="text-label text-ink-3"><span className="text-signal-ink tabular-nums">{String.fromCharCode(65 + i)}</span> &nbsp;{c.label}</dt>
                <dd className={`mt-3 ${i === 1 ? 'font-serif text-ink' : 'text-body-lg text-ink-2'}`} style={i === 1 ? { fontSize: 'var(--fs-title)', lineHeight: 1.3 } : undefined}>{c.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 md:mt-12"><CaseThumb id={cs.id} ratio="1800 / 1000" live /></div>
          <p className="text-label text-ink-3 mt-6">{meta.join(' · ')}</p>
        </div>
      </header>

      {/* ── the spine: what the reader follows, and where they are ── */}
      <div className="sticky z-20 border-b bg-bg" style={{ top: 'var(--header-h)', borderColor: 'var(--line-1)' }}>
        <div className="container-site py-3 flex items-center gap-4">
          <p className="text-label text-ink-3 shrink-0">Following</p>
          <p className="text-body-sm text-ink truncate min-w-0">{st.spine}</p>
          <ol className="ml-auto hidden md:flex items-center gap-1.5" aria-hidden="true">
            {st.chapters.map((_, i) => <li key={i} className={`h-1 rounded-full transition-all ${i === active ? 'w-6 bg-signal' : i < active ? 'w-3 bg-ink-3' : 'w-3 bg-[var(--line-2)]'}`} />)}
          </ol>
        </div>
      </div>

      {/* ── chapters, with the decision told large where it happens in the story ── */}
      {st.chapters.map((c, i) => (
        <Fragment key={c.heading}>
          {chapter(c, i)}
          {c.flow && pb?.flow && <ProcessFlow stages={pb.flow} />}
          {i === st.decisionAfter && (
            <section className="section-y bg-surface-1 hairline-top" aria-labelledby="decision">
              <div className="container-site">
                <p className="text-label text-signal-ink">The decision</p>
                <h2 id="decision" className="font-serif text-ink font-light mt-5 max-w-5xl" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.06, textWrap: 'balance' }}>{st.decision.heading}</h2>
                <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{st.decision.body}</p>
                {st.decision.chips && <div className="mt-8"><Chips items={st.decision.chips} big /></div>}
                {st.decision.visual && <div className="mt-10 md:mt-12"><Figure v={st.decision.visual} /></div>}
              </div>
            </section>
          )}
        </Fragment>
      ))}

      {/* ── the ending: an honest status, the role, and where to go next ── */}
      <section className="section-y hairline-top" aria-labelledby="ending">
        <div className="container-site grid-site gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <p className="text-label text-signal-ink">{st.ending.label}</p>
            <h2 id="ending" className="font-serif text-ink mt-5" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.15, textWrap: 'balance' }}>{st.ending.statement}</h2>
            {st.ending.note && <p className="text-body text-ink-3 mt-5 max-w-xl">{st.ending.note}</p>}
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-9 md:pt-10">
            <p className="text-label text-ink-3">My role</p>
            <p className="text-body-lg text-ink mt-3">{st.ending.role}</p>
            {st.ending.led && <p className="text-body text-ink-2 mt-3">{st.ending.led}</p>}
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 z-30 border-t bg-bg" style={{ borderColor: 'var(--line-1)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="container-site py-3 md:py-4 flex items-center justify-between gap-4">
          <p className="hidden md:block text-body text-ink-2 min-w-0">Want the screens, the process and every decision?</p>
          <div className="flex items-center gap-3 w-full md:w-auto md:shrink-0">
            {film && <button type="button" onClick={() => setWatching(true)} className="btn btn-secondary !py-2 !px-4 md:!px-6 whitespace-nowrap flex-1 md:flex-none justify-center min-w-0">Watch the film</button>}
            <Link to={`/craft/${cs.id}/details`} className="btn btn-primary !py-2 !px-4 md:!px-6 whitespace-nowrap flex-1 md:flex-none justify-center min-w-0">Read the full case <Arrow /></Link>
          </div>
        </div>
      </div>
      {watching && film && <VideoModal src={film.to} title={film.title} onClose={() => setWatching(false)} />}
    </article>
  )
}
