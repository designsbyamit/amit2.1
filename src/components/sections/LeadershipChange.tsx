import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import { publishedStories, storySlug } from '../../data/leadership'
import SectionHeader from '../ds/SectionHeader'
import Button from '../ds/Button'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** One section for the leadership narrative: what changed in the organisations I led, and the stories behind how.
 *  Cases first, then the shorter stories, in one quiet list each. */
export default function LeadershipChange() {
  return (
    <section className="section-y hairline-top" id="what-changed">
      <div className="container-site">
        <SectionHeader label="Leadership" title="What changed, and how." intro="What the teams achieved, the practice you can adapt from each, and the moments that shaped how I lead." />

        <h3 className="text-label text-ink-3 mb-5">Cases</h3>
        <ul className="grid gap-4">
          {cases.map(c => (
            <li key={c.slug}>
              <Link to={`/leadership/cases/${c.slug}`} className="group card card-link !p-8 md:!p-10 flex flex-col gap-3">
                <h4 className="text-heading text-ink max-w-[30ch] group-hover:underline decoration-1 underline-offset-[0.18em]" style={{ fontWeight: 300 }}>{c.title}</h4>
                <p className="text-body text-ink-2 max-w-[62ch]">{c.claim}</p>
                <span className="btn btn-ghost self-start mt-2" aria-hidden="true">Read the case<Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between gap-6 mt-16 mb-5">
          <h3 className="text-label text-ink-3">Stories</h3>
          <Button to="/leadership/stories" variant="tertiary" arrow>All stories</Button>
        </div>
        <ul className="hairline-top">
          {publishedStories.map(s => (
            <li key={s.id} className="hairline-bottom">
              <Link to={`/leadership/stories/${storySlug(s)}`} className="group grid md:grid-cols-[1fr_1.2fr_auto] gap-x-10 gap-y-2 items-baseline py-6">
                <h4 className="text-title text-ink group-hover:underline decoration-1 underline-offset-[0.18em]">{s.title}</h4>
                <p className="text-body-sm text-ink-2 line-clamp-2">{s.lesson}</p>
                <span className="text-ink-3 hidden md:block" aria-hidden="true"><Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
