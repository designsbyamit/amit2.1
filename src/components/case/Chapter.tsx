import { useState, type ReactNode } from 'react'
import Tabs from '../ds/Tabs'

/** Shared building blocks for the detailed case studies. Each case still composes its own page and its own chapters. */

export function Section({ id, children, raised = false }: { id?: string; children: ReactNode; raised?: boolean }) {
  return (
    <section id={id} className={`section-y hairline-top ${raised ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

/** A chapter opens with its number, a question or claim as the title, and one short introduction. */
export function Head({ n, title, intro, together, drove }: { n: number; title: string; intro?: string; together?: string; drove?: string }) {
  return (
    <header className="mb-14 md:mb-16">
      <p className="text-label text-ink-3">Chapter {n}</p>
      <h2 className="text-display-l text-white mt-4 max-w-4xl">{title}</h2>
      {intro && <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">{intro}</p>}
      {(together || drove) && (
        <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-3 mt-8 max-w-4xl hairline-top pt-5">
          {together && <div><dt className="text-label text-ink-3">Together</dt><dd className="text-body text-ink-2 mt-1">{together}</dd></div>}
          {drove && <div><dt className="text-label text-signal-ink">I drove</dt><dd className="text-body text-white mt-1">{drove}</dd></div>}
        </dl>
      )}
    </header>
  )
}

/** One screen, framed on a white field so light interfaces read cleanly on the dark page. */
export function Fig({ src, alt, caption, ratio, className = '' }: { src: string; alt: string; caption?: string; ratio?: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-3 overflow-hidden border bg-white" style={{ borderColor: 'var(--line-2)', aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-contain object-top block" />
      </div>
      {caption && <figcaption className="text-body text-ink-3 mt-3 max-w-measure-xl">{caption}</figcaption>}
    </figure>
  )
}

/** A set of screens behind tabs, each with a line about what it shows. */
export function ScreenTabs({ label, screens }: { label: string; screens: { id: string; label: string; src: string; alt: string; note: string; ratio?: string }[] }) {
  const [v, setV] = useState(screens[0].id)
  const cur = screens.find(s => s.id === v) ?? screens[0]
  return (
    <Tabs label={label} tabs={screens.map(s => ({ id: s.id, label: s.label }))} value={v} onChange={setV} variant="chip">
      <div className="grid lg:grid-cols-[1fr_20rem] gap-8 items-start">
        <Fig src={cur.src} alt={cur.alt} ratio={cur.ratio} />
        <p className="text-body-lg text-ink-2">{cur.note}</p>
      </div>
    </Tabs>
  )
}

/** Numbered items in columns, each a short title and one line. */
export function Numbered({ items, cols = 3 }: { items: { t: string; d: string }[]; cols?: 2 | 3 }) {
  return (
    <ol className={`grid gap-x-8 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((p, i) => (
        <li key={p.t} className="hairline-top py-6">
          <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
          <p className="v2-item text-white mt-2">{p.t}</p>
          <p className="text-body text-ink-2 mt-2">{p.d}</p>
        </li>
      ))}
    </ol>
  )
}

/** A definition list: a small label on the left, the sentence on the right. */
export function Defs({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="max-w-4xl">
      {rows.map(([k, v]) => (
        <div key={k} className="grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-8 py-4 hairline-top"><dt className="text-label text-ink-3 pt-1">{k}</dt><dd className="text-body text-ink-2">{v}</dd></div>
      ))}
    </dl>
  )
}

/** A table that scrolls sideways on small screens. */
export function Grid({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} aria-label="Table, scrolls sideways on small screens">
      <table className="table min-w-scroll-m">
        <thead><tr>{head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i === 0 ? 'text-white' : undefined}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

/** A steps strip: who acts at each step, with the human step marked. */
export function Strip({ steps }: { steps: { step: string; kind: string; human?: boolean }[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {steps.map((s, i) => (
        <li key={s.step} className={`rounded-3 border p-5 ${s.human ? 'bg-surface-2' : 'bg-surface-0'}`} style={{ borderColor: s.human ? 'var(--line-2)' : 'var(--line-2)' }}>
          <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}{s.human ? ' · People' : ''}</p>
          <p className="v2-item text-white mt-2">{s.step}</p>
          <p className="text-body text-ink-2 mt-1">{s.kind}</p>
        </li>
      ))}
    </ol>
  )
}
