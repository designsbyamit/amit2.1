import { Link } from 'react-router-dom'
import CaseThumb from '../ds/CaseThumb'
import type { CaseStudy } from '../../data/work'
import type { Playback } from '../../data/playbacks'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** One clean frame around the cover: the image runs full bleed, nothing else. */
export function WindowFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3 border bg-surface-1 ${className}`} style={{ borderColor: 'var(--line-2)' }}>
      {children}
    </div>
  )
}

/** A project told like a news story: a large cover, an impact-led headline, a short dek and a few tags.
 *  `tile` is the carousel card (image above, text below); `row` is the stacked Works layout (image beside the text). */
export default function ProjectCard({ cs, pb, variant = 'tile', headingLevel = 'h3', showNumber = true }: { cs: CaseStudy; pb: Playback; variant?: 'tile' | 'row'; headingLevel?: 'h2' | 'h3'; showNumber?: boolean }) {
  const H = headingLevel
  const row = variant === 'row'
  return (
    <Link
      to={`/craft/${cs.id}`}
      className={`group ${row ? 'grid-site gap-y-6 py-10 md:py-14' : 'block h-full'}`}
      data-cursor="project"
    >
      <div className={row ? 'col-span-4 md:col-span-7 order-1 md:order-2' : ''}>
        <WindowFrame className="transition-transform duration-500 group-hover:-translate-y-0.5"><CaseThumb id={cs.id} ratio="1800 / 1000" flush /></WindowFrame>
      </div>
      <div className={row ? 'col-span-4 md:col-span-5 order-2 md:order-1 flex flex-col justify-center gap-4 md:pr-6' : 'flex flex-col gap-4 pt-6'}>
        <p className="text-label text-ink-3">{showNumber && <><span className="text-signal-ink">{cs.number}</span> / </>}{cs.category.split(' · ').slice(0, 2).join(' · ')}</p>
        <H className={`text-heading text-ink group-hover:underline decoration-1 underline-offset-[0.18em] ${row ? '' : 'max-w-[26ch]'}`}>{pb.headline}</H>
        <p className="text-body text-ink-2 max-w-[56ch]">{pb.dek}</p>
        <span className="inline-flex items-center gap-2 text-label text-ink mt-1" aria-hidden="true">View project<Arrow /></span>
      </div>
    </Link>
  )
}
