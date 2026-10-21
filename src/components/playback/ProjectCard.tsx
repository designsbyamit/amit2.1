import { Link } from 'react-router-dom'
import CaseThumb from '../ds/CaseThumb'
import { TagList } from '../ds/Tag'
import type { CaseStudy } from '../../data/work'
import type { Playback } from '../../data/playbacks'

const PlayDot = () => (
  <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-[var(--signal)] text-black" aria-hidden="true">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
  </span>
)

/** A project told like a news story: a large cover, an impact-led headline, a short dek and a few tags.
 *  `tile` is the carousel card (image above, text below); `row` is the stacked Works layout (image beside the text). */
export default function ProjectCard({ cs, pb, variant = 'tile', headingLevel = 'h3' }: { cs: CaseStudy; pb: Playback; variant?: 'tile' | 'row'; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  const row = variant === 'row'
  return (
    <Link
      to={`/craft/${cs.id}`}
      className={`group ${row ? 'grid-site gap-y-6 py-10 md:py-14' : 'block h-full'}`}
      data-cursor="project"
      data-cursor-label="Watch"
    >
      <div className={row ? 'col-span-4 md:col-span-7 order-1 md:order-2' : ''}>
        <CaseThumb id={cs.id} ratio="16 / 10" className="transition-transform duration-500 group-hover:scale-[1.012]" />
      </div>
      <div className={row ? 'col-span-4 md:col-span-5 order-2 md:order-1 flex flex-col justify-center gap-4 md:pr-6' : 'flex flex-col gap-4 pt-6'}>
        <p className="text-label text-ink-3"><span className="text-signal-ink">{cs.number}</span> / {cs.category.split(' · ').slice(0, 2).join(' · ')}</p>
        <H className={`text-heading text-ink group-hover:underline decoration-1 underline-offset-[0.18em] ${row ? '' : 'max-w-[26ch]'}`}>{pb.headline}</H>
        <p className="text-body text-ink-2 max-w-[56ch]">{pb.dek}</p>
        {cs.tags && <TagList items={cs.tags.slice(0, 3)} label="Topics" />}
        <span className="inline-flex items-center gap-3 text-label text-ink mt-1" aria-hidden="true"><PlayDot />Watch the one-minute story</span>
      </div>
    </Link>
  )
}
