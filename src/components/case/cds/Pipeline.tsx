/** The intent-to-interface path of the compositional design system, as one row of steps:
 *  who acts at each step, the check before anything renders, and the learning that goes back in. */
const STEPS: { t: string; who: string; gate?: boolean }[] = [
  { t: 'Human intent', who: 'Person' },
  { t: 'Context and understanding', who: 'LLM' },
  { t: 'CDS and composition', who: 'CDS · Composition' },
  { t: 'Specification', who: 'Composition' },
  { t: 'Guardrails and validation', who: 'Guardrails', gate: true },
  { t: 'Rendering and runtime', who: 'Renderer' },
  { t: 'Outcome, evaluation, learning', who: 'Evaluation' },
]

export default function Pipeline() {
  return (
    <figure className="m-0 mb-16" aria-label="From intent to interface in seven steps">
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 list-none p-0 m-0">
        {STEPS.map((s, i) => (
          <li key={s.t} className="relative rounded-lg p-4 flex flex-col gap-3 bg-surface-2 border" style={{ borderColor: s.gate ? 'var(--signal)' : 'var(--line-1)' }}>
            <span className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-body-sm text-ink">{s.t}</span>
            <span className={`mt-auto text-caption ${s.gate ? 'text-signal' : 'text-ink-3'}`}>{s.gate ? 'Checked before it renders' : s.who}</span>
            {i < STEPS.length - 1 && <span aria-hidden className="hidden lg:block absolute top-1/2 text-ink-3" style={{ right: 'calc(var(--space-10) * -1.2)', transform: 'translateY(-50%)' }}>›</span>}
          </li>
        ))}
      </ol>
      <div className="mt-3 rounded-lg px-4 py-3 flex items-center gap-3 text-caption text-ink-3 border" style={{ borderColor: 'var(--line-1)' }}>
        <span aria-hidden>↺</span>The outcome is judged against the intent, and the learning goes back into steps 2 to 4.
      </div>
    </figure>
  )
}
