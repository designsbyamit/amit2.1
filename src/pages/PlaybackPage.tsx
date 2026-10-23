import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/ds/Breadcrumb'
import CaseThumb from '../components/ds/CaseThumb'
import Stat from '../components/ds/Stat'
import { TagList } from '../components/ds/Tag'
import { caseStudies } from '../data/work'
import { playbackById } from '../data/playbacks'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** The short version of a case study, as plain stacked sections: the headline, one clean cover, then five short beats.
 *  Nothing plays and nothing slides. The button to the detailed case study is fixed to the bottom of the screen the whole way down. */
export default function PlaybackPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const pb = id ? playbackById(id) : undefined
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
  const meta = [cs.role, cs.timeline, cs.domain].filter(Boolean)

  return (
    <article style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: cs.shortTitle }]} /></div>
          <p className="text-label text-ink-3 mb-5">
            <span className="text-signal-ink">{cs.number}</span> / {cs.category.split(' · ').slice(0, 2).join(' · ')}
          </p>
          <h1 className="text-ink font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.1rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textWrap: 'balance' }}>{pb.headline}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{pb.dek}</p>
          <div className="mt-10"><CaseThumb id={cs.id} ratio="1800 / 1000" /></div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-label text-ink-3">{meta.join(' · ')}</p>
            {cs.tags && <TagList items={cs.tags.slice(0, 3)} label="Topics" />}
          </div>
          <p className="text-body-lg text-ink mt-6 max-w-2xl">{pb.roleNote}</p>
        </div>
      </header>

      {beats.map(([label, text], i) => (
        <section key={label} className={`hairline-top section-y ${i % 2 === 0 ? 'bg-surface-1' : 'bg-surface-0'}`} aria-labelledby={`beat-${i}`}>
          <div className="container-site grid-site gap-y-6 items-start">
            <h2 id={`beat-${i}`} className="col-span-4 md:col-span-3 text-overline text-ink-3">{label}</h2>
            <div className="col-span-4 md:col-span-8">
              {label === 'The impact' && <div className="mb-6"><Stat value={pb.metric.value} label={pb.metric.label} /></div>}
              <p className="text-body-lg text-ink-2 max-w-2xl">{text}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="hairline-top section-y">
        <div className="container-site grid-site gap-y-8 items-center">
          <div className="col-span-4 md:col-span-8">
            <p className="text-label text-ink-3 mb-3">Want the whole story?</p>
            <h2 className="text-heading text-ink max-w-[24ch]">The process, the screens and the decisions behind it.</h2>
          </div>
          <div className="col-span-4 md:col-span-4 md:justify-self-end">
            <Link to={`/craft/${next.id}`} className="btn btn-ghost">Next: {next.shortTitle}<Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Always in reach */}
      <div className="fixed inset-x-0 bottom-0 z-30" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="border-t" style={{ background: 'var(--surface-1, #0b0d12)', borderColor: 'var(--line-1)' }}>
          <div className="container-site py-3 flex items-center justify-between gap-4">
            <p className="text-label text-ink-2 truncate hidden sm:block">{cs.shortTitle}</p>
            <Link to={detail} className="btn btn-primary !py-2 ml-auto">View the detailed case study<Arrow /></Link>
          </div>
        </div>
      </div>
    </article>
  )
}
