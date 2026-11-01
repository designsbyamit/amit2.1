import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ds/Button'
import { topics, totalChallenges } from '../../data/growPractice'
import { useLocalState } from '../../hooks/useLocalState'

export const doneKey = 'grow.practice.done'

export default function PracticePage() {
  const [done] = useLocalState<string[]>(doneKey, [])
  const count = done.length
  return (
    <>
      <PageHeader label="Grow · Practice Toolkits" title="Practice designing with AI." subtitle="A ladder in four steps: a conversational interface, a conversational system, an agentic experience, then many agents working together. Do the exercise, reflect, then compare your approach with others. Your answers stay in this browser."
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Practice Toolkits' }]} />
      <section className="hairline-top">
        <div className="container-site py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-label text-ink-3">{topics.length} stages · {totalChallenges} challenges</p>
          <p className="text-label text-ink-2" aria-live="polite">{count} of {totalChallenges} done</p>
        </div>
      </section>
      {topics.map(t => {
        const n = t.challenges.filter(c => done.includes(`${t.id}/${c.id}`)).length
        return (
          <section key={t.id} id={t.id} className="section-y hairline-top">
            <div className="container-site grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <p className="text-overline text-ink-3">STEP {t.step} · {t.kicker}</p>
                <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>{t.title}</h2>
                <p className="text-body text-ink-2 mt-5 max-w-[40ch]">{t.blurb}</p>
                <p className="text-label text-ink-3 mt-6">{n} of {t.challenges.length} done</p>
                <div className="mt-8">
                  <p className="text-overline text-ink-3">PAIR WITH THE TOOLKIT</p>
                  <ul className="mt-3 space-y-4">
                    {t.toolkits.map(k => (
                      <li key={k.title}>
                        {k.external
                          ? <a href={k.to} className="text-body-sm text-ink underline underline-offset-4 decoration-[color:var(--line-1)] hover:decoration-[color:var(--signal-ink)]">{k.title} &rarr;</a>
                          : <Link to={k.to} className="text-body-sm text-ink underline underline-offset-4 decoration-[color:var(--line-1)] hover:decoration-[color:var(--signal-ink)]">{k.title} &rarr;</Link>}
                        <span className="block text-body-sm text-ink-3 mt-1 max-w-[40ch]">{k.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ol className="md:col-span-8">
                {t.challenges.map((c, i) => {
                  const ok = done.includes(`${t.id}/${c.id}`)
                  return (
                    <li key={c.id} className="hairline-top last:border-b last:border-[color:var(--line-1)]">
                      <Link to={`/learn/practice/${t.id}/${c.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-4 py-6 items-start hover:bg-surface-1 transition-colors -mx-3 px-3 rounded-2">
                        <span className="text-label text-ink-3 pt-1">{String(i + 1).padStart(2, '0')}</span>
                        <span>
                          <span className="block text-title text-ink" style={{ fontWeight: 400 }}>{c.title}</span>
                          <span className="block text-body-sm text-ink-3 mt-2 max-w-[56ch]">{c.scenario}</span>
                          <span className="flex flex-wrap gap-2 mt-3"><span className="tag">{c.level}</span><span className="tag">{c.minutes} min</span></span>
                        </span>
                        <span className="text-label pt-1 flex items-center gap-2 text-ink-3 group-hover:text-ink">{ok ? <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--signal-ink)" strokeWidth="1.8" aria-hidden><path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" /></svg>Done</> : <>Start &rarr;</>}</span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )
      })}
      <section className="section-y hairline-top">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <p className="text-heading text-ink max-w-[28ch]" style={{ fontWeight: 300 }}>Want a second pair of eyes on your answers?</p>
          <Button to="/mentoring" variant="secondary" arrow>Book a mentoring session</Button>
        </div>
      </section>
    </>
  )
}
