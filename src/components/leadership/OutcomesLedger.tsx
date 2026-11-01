import type { Outcome } from '../../data/cases'

/** Outcomes as a ledger: one row per kind of result. The team owns every row. */
export default function OutcomesLedger({ rows }: { rows: Outcome[] }) {
  return (
    <section aria-labelledby="out-h">
      <h2 id="out-h" className="text-overline text-ink-3 mb-2">Outcomes</h2>
      <p className="text-body text-ink-2 max-w-[58ch] mb-8">What we achieved together.</p>
      <ul className="hairline-top">
        {rows.map((r, i) => (
          <li key={i} className="grid gap-3 md:grid-cols-[9.5rem_1fr] py-5 border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
            <p className="text-label text-signal-ink">{r.label}</p>
            <p className="text-body text-ink">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
