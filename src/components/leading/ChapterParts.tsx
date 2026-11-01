import type { ReactNode } from 'react'
import { docHref } from '../../data/hiring'
import type { HiringDoc } from '../../data/hiring'
import { worksheetLink } from '../../data/leadingDesign'

/** A page section with a label, a heading and an optional intro, as used across the Leading Design chapters. */
export function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="section-y hairline-top scroll-mt-24" aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <div className="grid-site gap-y-6 mb-12 md:mb-16">
          <div className="col-span-4 md:col-span-6">
            <p className="text-overline text-ink-3 mb-4">{label}</p>
            <h2 id={`${id}-h`} className="text-heading text-ink">{title}</h2>
          </div>
          {intro && <p className="col-span-4 md:col-span-5 md:col-start-8 self-end text-body text-ink-2">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

/** A downloadable worksheet card: the PDF, and a link to fill it in online where an editable version exists. */
export function DownloadCard({ d }: { d: HiringDoc }) {
  const online = worksheetLink[d.slug]
  return (
    <li className="card flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="text-label text-signal-ink">{d.kind}</span><span className="font-mono text-xs text-ink-3">PDF · {d.pages} pages</span></div>
      <h4 className="text-title text-ink">{d.title}</h4>
      <p className="text-body-sm text-ink-2">{d.summary}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        <a href={docHref(d.slug)} download className="btn btn-secondary btn-sm self-start" aria-label={`Download ${d.title}, PDF, ${d.pages} pages`}>
          Download
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
        {online && <a href={online} target="_blank" rel="noopener noreferrer" className="btn btn-tertiary btn-sm self-start" aria-label={`Fill in ${d.title} online, with a filled example (opens in a new tab)`}>Fill in online</a>}
      </div>
    </li>
  )
}

/** A numbered card with a title, a line of text, optional bullets and an optional "watch for" note. */
export function StepCard({ label, title, text, how, watch, wide }: { label: string; title: string; text?: string; how?: string[]; watch?: string; wide?: boolean }) {
  return (
    <li className={`card flex flex-col gap-4 ${wide ? 'md:col-span-2' : ''}`}>
      <span className="text-label text-signal-ink">{label}</span>
      <h3 className="text-title text-ink">{title}</h3>
      {text && <p className="text-body-sm text-ink-2">{text}</p>}
      {how && <ul className="flex flex-col gap-2">{how.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>}
      {watch && <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">Watch for</span>{watch}</p>}
    </li>
  )
}
