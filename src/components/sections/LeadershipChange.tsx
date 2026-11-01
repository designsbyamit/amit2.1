import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import Button from '../ds/Button'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** Stories: one featured case from the leadership work, with a way through to all of them. */
export default function LeadershipChange() {
  const c = cases[0]
  return (
    <section className="section-y hairline-top" id="stories">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <h2 className="text-display-l text-ink">Stories</h2>
          <Button to="/leadership/stories" variant="tertiary" arrow>All stories</Button>
        </div>
        <Link to={`/leadership/cases/${c.slug}`} className="group card card-link !p-8 md:!p-10 flex flex-col gap-3">
          <h3 className="text-heading text-ink max-w-[30ch] group-hover:underline decoration-1 underline-offset-[0.18em]" style={{ fontWeight: 300 }}>{c.title}</h3>
          <p className="text-body text-ink-2 max-w-[62ch]">{c.claim}</p>
          <span className="btn btn-ghost self-start mt-2" aria-hidden="true">Read the case<Arrow /></span>
        </Link>
      </div>
    </section>
  )
}
