import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Role { who: string; job: string }
type Col = [string, boolean, boolean, boolean]

const SEV = { High: ['rgb(217 45 32 / 0.14)', '#B42318'], Medium: ['rgb(220 104 3 / 0.16)', '#B54708'], Low: ['rgb(6 118 71 / 0.14)', '#067647'] } as const

const Tile = ({ k, v, u }: { k: string; v: string; u?: string }) => (
  <div className="rounded-2 border px-3 py-2 min-w-[120px]" style={{ borderColor: 'var(--line-2)', background: 'var(--surface-0)' }}>
    <p className="text-caption text-ink-3">{k}</p><p className="text-title text-white leading-tight">{v}<span className="text-body-sm text-ink-3">{u}</span></p>
  </div>
)
const Filter = ({ k }: { k: string }) => (
  <div className="min-w-[120px]"><p className="text-caption text-ink-3">{k}</p>
    <div className="rounded-2 border px-3 py-1.5 text-body-sm text-ink-2 flex justify-between" style={{ borderColor: 'var(--line-control)', background: 'var(--surface-0)' }}>All<span aria-hidden="true">⌄</span></div></div>
)
const Pill = ({ s }: { s: keyof typeof SEV }) => <span className="rounded-full px-2.5 py-0.5 text-label" style={{ background: SEV[s][0], color: SEV[s][1] }}>{s}</span>
const Chip = ({ children }: { children: ReactNode }) => <span className="rounded-full border px-2.5 py-0.5 text-label text-ink-2" style={{ borderColor: 'var(--line-2)' }}>{children}</span>
const Link = ({ children }: { children: ReactNode }) => <span className="text-body-sm" style={{ color: 'var(--link)' }}>{children}</span>

/** The three worklists, compared by what is distinctive in each, not by screenshots. */
export default function WorklistCompare({ roles, columns }: { roles: Role[]; columns: Col[] }) {
  const reduce = useReducedMotion()
  const colsFor = (k: 1 | 2 | 3) => (
    <div className="flex flex-wrap gap-1.5">
      {columns.map(c => {
        const on = c[k]; const key = c[0] === 'Discrepancies' || c[0] === 'Risk'
        return <span key={c[0]} className="rounded-[5px] px-2 py-0.5 text-label" style={on ? (key ? { background: 'var(--signal)', color: 'var(--on-signal)' } : { background: 'rgb(var(--ink-rgb) / 0.07)', color: 'rgb(var(--ink-rgb) / 0.75)' }) : { border: '1px dashed var(--line-control)', color: 'rgb(var(--ink-rgb) / 0.4)', textDecoration: 'line-through' }}>{c[0]}</span>
      })}
    </div>
  )
  const rows: { label: string; cells: ReactNode[] }[] = [
    { label: 'Opens with', cells: [
      <div className="flex flex-wrap gap-3"><Tile k="Pending validation" v="2" /><Tile k="Avg. confidence score" v="91" u="%" /></div>,
      <div className="flex flex-wrap gap-3"><Filter k="Risk" /><Filter k="Status" /></div>,
      <div className="flex flex-wrap gap-3"><Filter k="Risk" /><Filter k="Status" /></div>,
    ] },
    { label: 'Columns', cells: [colsFor(1), colsFor(2), colsFor(3)] },
    { label: 'What a row says', cells: [
      <p className="text-body-sm text-ink-2">Supplier, order value and when it arrived.</p>,
      <div className="space-y-2"><p className="text-body-sm text-ink-2">How many discrepancies, or the headline change. Revisions group under the purchase order.</p><p className="text-body-sm text-white flex items-center gap-2">Price: +8.4%, Delay: +7 days <Pill s="High" /></p></div>,
      <div className="space-y-2"><p className="text-body-sm text-ink-2">The same, grouped by purchase order with its versions.</p><p className="text-body-sm text-white">▸ 4994546957 <span className="text-ink-3">· 1505899/2, 1505899/1</span></p></div>,
    ] },
    { label: 'Status', cells: [['New', 'In progress', 'Processed'], ['In progress', 'Resolved'], ['In progress', 'Resolved']].map(l => <div className="flex flex-wrap gap-1.5">{l.map(x => <Chip key={x}>{x}</Chip>)}</div>) },
    { label: 'Action', cells: [['Validate', 'View', 'Archive'], ['Review', 'Submit'], ['Review', 'Submit']].map(l => <div className="flex flex-wrap gap-x-4 gap-y-1">{l.map(x => <Link key={x}>{x}</Link>)}</div>) },
  ]
  const fade = (i: number) => reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-4%' }, transition: { duration: 0.45, delay: i * 0.05 } }

  return (
    <div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-[130px_repeat(3,minmax(0,1fr))] gap-x-8">
          <div />
          {roles.map((r, i) => (
            <motion.div key={r.who} className="pb-5" {...fade(i)}>
              <p className="text-title text-white">{r.who}</p>
              <p className="text-body-sm text-ink-3 mt-1">{r.job}</p>
            </motion.div>
          ))}
          {rows.map((row, ri) => (
            <div key={row.label} className="contents">
              <p className="hairline-top pt-4 pb-5 text-overline text-ink-3">{row.label}</p>
              {row.cells.map((c, ci) => <motion.div key={ci} className="hairline-top pt-4 pb-5" {...fade(ri + ci)}>{c}</motion.div>)}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:hidden space-y-10">
        {roles.map((r, ci) => (
          <div key={r.who}>
            <p className="text-title text-white">{r.who}</p>
            <p className="text-body-sm text-ink-3 mt-1">{r.job}</p>
            <div className="mt-4">
              {rows.map(row => (
                <div key={row.label} className="hairline-top py-4"><p className="text-overline text-ink-3 mb-3">{row.label}</p>{row.cells[ci]}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-caption text-ink-3 mt-8">Highlighted columns appear only where there is something to weigh. Struck-through columns are not on that view.</p>
    </div>
  )
}
