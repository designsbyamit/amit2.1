import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import SectionHeader from '../ds/SectionHeader'

/** Hub of leadership cases: the leadership cases hub. */
export default function LeadershipCases({ limit }: { limit?: number }) {
  const list = limit ? cases.slice(0, limit) : cases
  return (
    <section className="section-y hairline-top" id="cases">
      <div className="container-site">
        <SectionHeader label="Leadership cases" title="What changed, and how." intro="What the team achieved, and a practice you can adapt from each." />
        <ul className="grid gap-4">
          {list.map(c => (
            <li key={c.slug}>
              <Link to={`/leadership/cases/${c.slug}`} className="group card !p-8 md:!p-10 grid gap-6 md:grid-cols-[6rem_1fr_auto] items-start hover:bg-surface-1 transition-colors">
                <p className="text-label text-signal-ink">Case {c.number}</p>
                <div>
                  <h3 className="text-heading text-ink mb-3 max-w-[30ch]" style={{ fontWeight: 300 }}>{c.title}</h3>
                  <p className="text-body text-ink-2 max-w-[60ch]">{c.claim}</p>
                </div>
                <span className="text-label text-ink-3 md:text-right">Practice included</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
