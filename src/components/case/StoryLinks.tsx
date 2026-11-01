import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'

/** On a detailed case study: a way back to the short story, near the top of the page. */
export function BackToShort({ id }: { id: string }) {
  const cs = caseStudies.find(c => c.id === id)
  if (!cs) return null
  return (
    <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: 'calc(var(--header-h) + 6px)' }}>
      <div className="container-site">
        <Link to={`/craft/${id}`} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-label text-ink-2 hover:text-white transition-colors bg-bg" style={{ borderColor: 'var(--line-2)' }} aria-label={`Back to the short story: ${cs.shortTitle}`}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Short story
        </Link>
      </div>
    </div>
  )
}

/** At the end of a detailed case study: the next project, so people keep exploring. */
export function NextCase({ id }: { id: string }) {
  const i = caseStudies.findIndex(c => c.id === id)
  if (i < 0) return null
  const next = caseStudies[(i + 1) % caseStudies.length]
  return (
    <section className="hairline-top section-y bg-surface-0" aria-labelledby="next-case-h">
      <div className="container-site grid-site gap-y-6 items-center">
        <div className="col-span-4 md:col-span-8">
          <p id="next-case-h" className="text-overline text-ink-3 mb-4">Next case study</p>
          <Link to={`/craft/${next.id}`} className="group block">
            <p className="text-label text-ink-3 mb-2">{next.category.split(' · ').slice(0, 2).join(' · ')}</p>
            <h2 className="text-heading text-ink group-hover:opacity-75 transition-opacity max-w-[28ch]">{next.shortTitle}</h2>
          </Link>
        </div>
        <div className="col-span-4 md:col-span-4 md:justify-self-end">
          <Link to={`/craft/${next.id}`} className="btn btn-primary">Read the short story
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
