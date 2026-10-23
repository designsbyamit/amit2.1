import type { Playback } from '../../data/playbacks'

type Stage = NonNullable<Playback['flow']>[number]

const tone = (by: Stage['by']) =>
  by === 'People'
    ? { color: 'var(--ink, #fff)', border: 'var(--line-2)', fill: 'transparent' }
    : by === 'Agent'
      ? { color: 'var(--signal-ink, #C8F55A)', border: 'var(--line-2)', fill: 'transparent' }
      : { color: 'var(--ink-2, #aaa)', border: 'var(--line-2)', fill: 'transparent' }

/** The end-to-end process as numbered stages, with who does each one. Three across on large screens, two or one on smaller ones. */
export default function ProcessFlow({ stages }: { stages: Stage[] }) {
  return (
    <section className="hairline-top section-y bg-surface-1" aria-labelledby="flow-h">
      <div className="container-site">
        <div className="grid-site gap-y-4 mb-10 md:mb-12">
          <h2 id="flow-h" className="col-span-4 md:col-span-3 text-overline text-ink-3">How it works</h2>
          <p className="col-span-4 md:col-span-8 text-body-lg text-ink-2 max-w-2xl">From a supplier’s document to a closed order, in six stages. The agent does the reading and comparing, and people make the decisions.</p>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((st, i) => {
            const t = tone(st.by)
            return (
              <li key={st.title} className="card flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] rounded-full border px-2 py-0.5" style={{ color: t.color, borderColor: t.border }}>{st.by}</span>
                </div>
                <h3 className="text-title text-ink">{st.title}</h3>
                <p className="text-body-sm text-ink-2">{st.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
