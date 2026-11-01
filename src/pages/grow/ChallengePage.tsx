import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ds/Button'
import { TextArea } from '../../components/ds/Field'
import { findChallenge } from '../../data/growPractice'
import { copyText, useLocalState } from '../../hooks/useLocalState'
import { doneKey } from './PracticePage'

export default function ChallengePage() {
  const { topic: tid, id } = useParams()
  const found = findChallenge(tid, id)
  const key = `${tid}/${id}`
  const [done, setDone] = useLocalState<string[]>(doneKey, [])
  const [answers, setAnswers] = useLocalState<Record<string, string>>(`grow.practice.answers.${key}`, {})
  const [copied, setCopied] = useState(false)
  if (!found) return <Navigate to="/learn/practice" replace />
  const { topic, challenge: c, index } = found
  const isDone = done.includes(key)
  const next = topic.challenges[index + 1]
  const set = (k: string, v: string) => setAnswers(a => ({ ...a, [k]: v }))
  const toggle = () => setDone(d => (d.includes(key) ? d.filter(x => x !== key) : [...d, key]))
  const copy = async () => {
    const text = [`${c.title} (${topic.title})`, '', 'My approach:', answers.work || '', '', ...c.reflect.flatMap((q, i) => [q, answers[`r${i}`] || '', ''])].join('\n')
    setCopied(await copyText(text)); setTimeout(() => setCopied(false), 1800)
  }
  return (
    <>
      <PageHeader label={`${topic.title} · ${c.level} · ${c.minutes} min`} title={c.title} subtitle={c.scenario}
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Practice Toolkits', to: '/learn/practice' }, { label: c.title }]} />

      <section className="section-y hairline-top">
        <div className="container-site grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 flex flex-col gap-12">
            <div>
              <p className="text-overline text-ink-3">The task</p>
              <ol className="mt-5 flex flex-col gap-4">
                {c.task.map((t, i) => <li key={i} className="grid grid-cols-[2rem_1fr] gap-2"><span className="text-label text-signal-ink pt-1">{i + 1}</span><span className="text-body text-ink-2">{t}</span></li>)}
              </ol>
            </div>
            <div>
              <p className="text-overline text-ink-3">The constraints</p>
              <ul className="mt-5 flex flex-col gap-3">
                {c.constraints.map((t, i) => <li key={i} className="flex gap-3 text-body-sm text-ink-2"><span aria-hidden className="text-ink-3">-</span>{t}</li>)}
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-8">
            <TextArea label="Your approach" hint="Sketch it on paper or in your tool, and note the key decisions here. Saved in this browser as you type." rows={8} value={answers.work || ''} onChange={e => set('work', e.target.value)} />
            <div>
              <p className="text-overline text-ink-3 mb-5">Reflect</p>
              <div className="flex flex-col gap-6">
                {c.reflect.map((q, i) => <TextArea key={i} label={q} rows={3} value={answers[`r${i}`] || ''} onChange={e => set(`r${i}`, e.target.value)} />)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={toggle} variant={isDone ? 'secondary' : 'primary'}>{isDone ? 'Marked as done' : 'Mark as done'}</Button>
              <Button onClick={copy} variant="secondary">{copied ? 'Copied' : 'Copy my answers'}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <p className="text-overline text-ink-3">Compare approaches</p>
          <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>{isDone ? 'Three ways to see it.' : 'Do the work first.'}</h2>
          {isDone ? (
            <ul className="grid md:grid-cols-3 gap-4 md:gap-6 mt-10">
              {c.approaches.map(a => (
                <li key={a.name} className="card !p-7 flex flex-col gap-4">
                  <h3 className="text-title text-ink" style={{ fontWeight: 400 }}>{a.name}</h3>
                  <p className="text-body text-ink-2">{a.how}</p>
                  <p className="text-body-sm text-ink-3 mt-auto"><span className="text-ink-2">Trade-off.</span> {a.tradeoff}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body text-ink-2 mt-6 max-w-[56ch]">Mark the challenge as done to see other approaches and what each one trades off. Comparing after you have tried it is where the learning is.</p>
          )}
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <Link to="/learn/practice" className="text-label text-ink-3 hover:text-ink">&larr; All challenges</Link>
          {next ? <Button to={`/learn/practice/${topic.id}/${next.id}`} variant="secondary" arrow>Next: {next.title}</Button> : <Button to="/learn/practice" variant="secondary" arrow>Choose another stage</Button>}
        </div>
      </section>
    </>
  )
}
