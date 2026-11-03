import { motion, useReducedMotion } from 'framer-motion'

export interface LogicRow { what: string; ask: string; grows: string; why: string }

/** The risk logic as a formula and a table: what is judged, what raises severity, and why. */
export default function RiskLogic({ formula, rows }: { formula: [string, string][]; rows: LogicRow[] }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <motion.dl className="rounded-3 border border-[color:var(--line-2)] bg-surface-0 p-6 md:p-8 grid gap-4" initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        {formula.map(([k, v], i) => (
          <div key={k} className="grid md:grid-cols-[10rem_1fr] gap-x-8 gap-y-1 items-baseline">
            <dt className="text-label text-ink-3">{String(i + 1).padStart(2, '0')} · {k}</dt>
            <dd className="font-mono text-ink text-body">{v}</dd>
          </div>
        ))}
      </motion.dl>
      <div className="overflow-x-auto mt-10" tabIndex={0} aria-label="Table, scrolls sideways on small screens">
        <table className="table min-w-scroll-m">
          <thead><tr><th>Kind of difference</th><th>The question</th><th>Severity grows when</th><th>Why it matters</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.what}><td className="text-white">{r.what}</td><td>{r.ask}</td><td>{r.grows}</td><td>{r.why}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
