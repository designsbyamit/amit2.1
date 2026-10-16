import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import SectionHeader from '../ds/SectionHeader'
import { StatusChip } from '../leadership/EvidenceChip'

/** Hub of leadership cases: the evidence-first view of how I lead. */
export default function LeadershipCases({ limit }: { limit?: number }) {
  const list = limit ? cases.slice(0, limit) : cases
  return (
    <section className="section-y hairline-top" id="cases">
      <div className="container-site">
        <SectionHeader label="Leadership cases" title="What I changed, and the evidence." intro="Each case separates my contribution from the team’s and says how far the evidence goes. Each ends with a practice you can adapt." />
        <ul className="grid gap-4">
          {list.map(c => (
            <li key={c.slug}>
              <Link to={`/leadership/cases/${c.slug}`} className="group card !p-8 md:!p-10 grid gap-6 md:grid-cols-[6rem_1fr_auto] items-start hover:bg-surface-1 transition-colors">
                <p className="text-label text-signal-ink">Case {c.number}</p>
                <div>
                  <h3 className="text-heading text-ink mb-3 max-w-[30ch]" style={{ fontWeight: 300 }}>{c.title}</h3>
                  <p className="text-body text-ink-2 max-w-[60ch]">{c.claim}</p>
                </div>
                <div className="flex md:flex-col gap-2 md:items-end"><StatusChip status={c.practice.status} /><span className="text-label text-ink-3">Practice included</span></div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
