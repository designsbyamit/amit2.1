import type { LedgerRow } from '../../data/cases'
import { ProvenanceChip } from './EvidenceChip'

/** Separates my contribution, the team's work and influenced outcomes, and lists evidence still missing. */
export default function ClaimLedger({ rows, gaps }: { rows: LedgerRow[]; gaps: string[] }) {
  return (
    <section aria-labelledby="ledger-h">
      <h2 id="ledger-h" className="text-overline text-ink-3 mb-2">Claim ledger</h2>
      <p className="text-body text-ink-2 max-w-[58ch] mb-8">Who did what, and how far the evidence goes.</p>
      <ul className="hairline-top">
        {rows.map((r, i) => (
          <li key={i} className="grid gap-3 md:grid-cols-[9.5rem_1fr] py-5 border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
            <div><ProvenanceChip who={r.who} /></div>
            <p className="text-body text-ink">{r.text}</p>
          </li>
        ))}
      </ul>
      {gaps.length > 0 && (
        <div className="mt-8 rounded-3 p-6 bg-surface-1">
          <p className="text-label text-ink-3 mb-3">Evidence not yet established</p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {gaps.map((g, i) => <li key={i} className="text-body text-ink-2 flex gap-2"><span aria-hidden="true" className="text-ink-3">&ndash;</span>{g}</li>)}
          </ul>
        </div>
      )}
    </section>
  )
}
