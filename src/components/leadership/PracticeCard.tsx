import type { Practice } from '../../data/cases'
import { StatusChip } from './EvidenceChip'

/** A reusable method another leader can adapt: problem, when, steps, signals, failure modes, status. */
export default function PracticeCard({ practice }: { practice: Practice }) {
  const p = practice
  return (
    <section aria-labelledby="practice-h" className="rounded-3 p-8 md:p-10" style={{ background: 'var(--field-graphite)', color: '#ECEDEF' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 id="practice-h" className="text-overline" style={{ color: '#C8F55A' }}>Reusable practice</h2>
        <StatusChip status={p.status} onDark />
      </div>
      <p className="text-heading max-w-[26ch] mb-8" style={{ color: '#fff', fontWeight: 300 }}>{p.title}</p>
      <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-10">
        <div><dt className="text-label opacity-60 mb-1">For</dt><dd className="text-body">{p.forWhom}</dd></div>
        <div><dt className="text-label opacity-60 mb-1">Problem it addresses</dt><dd className="text-body">{p.problem}</dd></div>
        <div className="md:col-span-2"><dt className="text-label opacity-60 mb-1">When to use it</dt><dd className="text-body">{p.whenToUse}</dd></div>
      </dl>
      <ol className="grid md:grid-cols-3 gap-4 mb-10">
        {p.steps.map((s, i) => (
          <li key={i} className="rounded-2 p-5" style={{ background: 'rgb(255 255 255 / 0.06)' }}>
            <p className="text-label mb-2" style={{ color: '#C8F55A' }}>{String(i + 1).padStart(2, '0')}</p>
            <p className="text-body mb-2" style={{ color: '#fff', fontWeight: 500 }}>{s.title}</p>
            <p className="text-body opacity-80">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-label opacity-60 mb-3">How you know it&rsquo;s working</p>
          <ul className="flex flex-col gap-2">{p.signals.map((x, i) => <li key={i} className="text-body flex gap-2"><span aria-hidden="true" style={{ color: '#C8F55A' }}>&#10003;</span>{x}</li>)}</ul>
        </div>
        <div>
          <p className="text-label opacity-60 mb-3">Common failure modes</p>
          <ul className="flex flex-col gap-2">{p.failureModes.map((x, i) => <li key={i} className="text-body flex gap-2"><span aria-hidden="true" className="opacity-60">&times;</span>{x}</li>)}</ul>
        </div>
      </div>
      <p className="text-label opacity-60 mt-8">{p.note}</p>
    </section>
  )
}
