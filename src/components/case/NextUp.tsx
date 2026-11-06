import { Link } from 'react-router-dom'
import type { NextLink } from '../../data/sequence'

/** The one way to move on to the next piece, at the end of a page: a label, the next title and one primary button. Content comes from src/data/sequence.ts. */
export default function NextUp({ link }: { link: NextLink | null }) {
  if (!link) return null
  const { label, to, title, eyebrow, cta, alt } = link
  return (
    <section className="hairline-top section-y bg-surface-0" aria-label={label}>
      <div className="container-site grid-site gap-y-6 items-center">
        <div className="col-span-4 md:col-span-8">
          <p className="text-overline text-ink-3 mb-4">{label}</p>
          <Link to={to} className="group block">
            {eyebrow && <p className="text-label text-ink-3 mb-2">{eyebrow}</p>}
            <h2 className="text-heading text-ink group-hover:opacity-75 transition-opacity max-w-measure-s">{title}</h2>
          </Link>
        </div>
        <div className="col-span-4 md:col-span-4 md:justify-self-end flex flex-wrap gap-3">
          {alt && <Link to={to} className="btn btn-secondary">{cta}</Link>}
          <Link to={alt ? alt.to : to} className="btn btn-primary">{alt ? alt.cta : cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
