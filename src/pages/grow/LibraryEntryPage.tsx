import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ds/Button'
import Callout from '../../components/ds/Callout'
import Tag from '../../components/ds/Tag'
import { copyText, useLocalState } from '../../hooks/useLocalState'
import { findEntry, readMinutes, type Section } from '../../data/library'

const h2 = 'text-display-l text-ink mt-4'
const h2Size = { fontSize: 'clamp(2rem,4vw,2.75rem)' } as const

function Body({ s, slug }: { s: Section; slug: string }) {
  const [done, setDone] = useLocalState<number[]>(`grow.library.${slug}.${s.id}`, [])
  switch (s.kind) {
    case 'prose':
      return <div className="mt-8 flex flex-col gap-5 max-w-measure-xl">{s.body.map(p => <p key={p} className="text-body text-ink-2">{p}</p>)}</div>
    case 'points':
      return (
        <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {s.points.map(p => <div key={p.t}><dt className="text-title text-ink">{p.t}</dt><dd className="text-body text-ink-2 mt-2">{p.d}</dd></div>)}
        </dl>
      )
    case 'stages':
      return (
        <ul className="mt-10 grid lg:grid-cols-3 gap-5">
          {s.stages.map(st => (
            <li key={st.who} className="card flex flex-col gap-4">
              <p className="text-overline text-ink-3">{st.who}</p>
              <div><p className="text-label text-ink-3">Focus</p><p className="text-body text-ink-2 mt-1">{st.focus}</p></div>
              <div><p className="text-label text-ink-3">Watch out for</p><p className="text-body text-ink-2 mt-1">{st.watch}</p></div>
              <div><p className="text-label text-signal-ink">First proof</p><p className="text-body text-ink mt-1">{st.proof}</p></div>
            </li>
          ))}
        </ul>
      )
    case 'drills':
      return (
        <>
          <ol className="mt-10 grid md:grid-cols-2 gap-5">
            {s.drills.map((d, i) => (
              <li key={d.t} className="card flex flex-col gap-3">
                <p className="text-label text-ink-3">Drill {String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-title text-ink">{d.t}</h3>
                <p className="text-body text-ink-2">{d.d}</p>
                <p className="text-body-sm text-ink-3 mt-auto pt-2"><span className="text-label">You leave with </span>{d.output}</p>
              </li>
            ))}
          </ol>
          {s.link && <p className="mt-8"><Button to={s.link.to} variant="secondary" arrow>{s.link.label}</Button></p>}
        </>
      )
    case 'stack':
      return (
        <>
          <p className="text-label text-ink-3 mt-6">Last reviewed {s.reviewed}</p>
          <ul className="mt-6 flex flex-col">
            {s.groups.map(g => (
              <li key={g.job} className="hairline-top last:border-b last:border-[color:var(--line-1)] py-6 grid md:grid-cols-12 gap-x-8 gap-y-3">
                <h3 className="text-title text-ink md:col-span-3">{g.job}</h3>
                <div className="md:col-span-5">
                  <p className="text-body text-ink-2">{g.why}</p>
                  <p className="text-body-sm text-ink-3 mt-2">{g.tip}</p>
                </div>
                <div className="md:col-span-4 flex flex-wrap gap-2 content-start">{g.tools.map(t => <Tag key={t}>{t}</Tag>)}</div>
              </li>
            ))}
          </ul>
        </>
      )
    case 'plan':
      return (
        <ol className="mt-10 grid lg:grid-cols-3 gap-5">
          {s.phases.map(p => (
            <li key={p.name} className="card flex flex-col gap-4">
              <div><p className="text-label text-ink-3">{p.when}</p><h3 className="text-heading text-ink mt-1">{p.name}</h3></div>
              <ul className="flex flex-col gap-3">{p.steps.map(x => <li key={x} className="text-body text-ink-2">{x}</li>)}</ul>
              <p className="text-body-sm text-ink-3 mt-auto pt-2"><span className="text-label">Output </span>{p.output}</p>
            </li>
          ))}
        </ol>
      )
    case 'questions':
      return (
        <ul className="mt-10 flex flex-col">
          {s.questions.map(q => (
            <li key={q.q} className="hairline-top last:border-b last:border-[color:var(--line-1)] py-6 grid md:grid-cols-2 gap-x-10 gap-y-2">
              <p className="text-title text-ink">{q.q}</p>
              <p className="text-body text-ink-2"><span className="text-label text-signal-ink">A strong answer </span>{q.good}</p>
            </li>
          ))}
        </ul>
      )
    case 'mistakes':
      return <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4">{s.items.map(m => <li key={m} className="text-body text-ink-2">{m}</li>)}</ul>
    case 'checklist': {
      const tog = (i: number) => setDone(c => (c.includes(i) ? c.filter(x => x !== i) : [...c, i]))
      return (
        <>
          <p className="text-body text-ink-2 mt-5">{done.length} of {s.items.length} true today. Saved in this browser only.</p>
          <ul className="mt-8 flex flex-col">
            {s.items.map((c, i) => (
              <li key={c} className="hairline-top last:border-b last:border-[color:var(--line-1)]">
                <label className="flex items-start gap-4 py-4 cursor-pointer">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 accent-[color:var(--signal)]" checked={done.includes(i)} onChange={() => tog(i)} />
                  <span className={`text-body ${done.includes(i) ? 'text-ink-3' : 'text-ink-2'}`}>{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </>
      )
    }
  }
}

export default function LibraryEntryPage() {
  const { slug = '' } = useParams()
  const e = findEntry(slug)
  const [copied, setCopied] = useState(false)
  if (!e) return <Navigate to="/learn/library" replace />
  const toc = e.sections.map(s => ({ id: s.id, label: s.title }))
  return (
    <>
      <PageHeader label={`Library · ${e.series ?? e.format}`} title={e.title}
        subtitle={e.summary}
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Library', to: '/learn/library' }, { label: e.series ?? e.format }]} />

      <div className="container-site hairline-top">
        <div className="grid lg:grid-cols-12 gap-x-12">
          <nav aria-label="On this page" className="hidden lg:block lg:col-span-3 py-16">
            <ul className="sticky top-28 flex flex-col gap-3 border-l border-[color:var(--line-1)]">
              <li><a href="#answer" className="block pl-4 text-body-sm text-ink-3 hover:text-ink">The short answer</a></li>
              {toc.map((t, i) => <li key={t.id}><a href={`#${t.id}`} className="block pl-4 text-body-sm text-ink-3 hover:text-ink"><span className="text-label mr-2">{String(i + 1).padStart(2, '0')}</span>{t.label}</a></li>)}
            </ul>
          </nav>

          <div className="lg:col-span-9">
            <section id="answer" className="py-16 md:py-20 border-b border-[color:var(--line-1)] scroll-mt-24">
              <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                <div><dt className="text-label text-ink-3">The question</dt><dd className="text-heading text-ink mt-2">{e.concern}</dd></div>
                <div><dt className="text-label text-ink-3">What you will take away</dt><dd className="text-body text-ink-2 mt-2">{e.need}</dd></div>
                <div><dt className="text-label text-ink-3">Written for</dt><dd className="mt-2 flex flex-wrap gap-2">{e.audience.map(a => <Tag key={a}>{a}</Tag>)}</dd></div>
                <div><dt className="text-label text-ink-3">Details</dt><dd className="text-body-sm text-ink-2 mt-2">{e.category} · {e.series} · {readMinutes(e)} min read · {e.published}</dd></div>
              </dl>
              <div className="mt-12">
                <p className="text-overline text-ink-3">{e.answer.title}</p>
                <div className="mt-4 flex flex-col gap-4 max-w-measure-xl">
                  {e.answer.lines.map((l, i) => <p key={l} className={i === 0 ? 'text-body-lg text-ink' : 'text-body text-ink-2'}>{l}</p>)}
                </div>
              </div>
            </section>

            {e.sections.map(s => (
              <section key={s.id} id={s.id} className="py-16 md:py-20 border-b border-[color:var(--line-1)] scroll-mt-24">
                <p className="text-overline text-ink-3">{s.kicker}</p>
                <h2 className={h2} style={h2Size}>{s.title}</h2>
                {s.lead && <p className="text-body-lg text-ink-2 mt-5 max-w-measure-xl">{s.lead}</p>}
                <Body s={s} slug={e.slug} />
              </section>
            ))}

            <section className="py-16 md:py-20">
              <Callout title="Where to go next">
                <p>Practise with the <Link to="/learn/practice" className="underline underline-offset-4">Toolkits</Link>, shape your story with the <Link to="/learn/portfolio" className="underline underline-offset-4">Portfolio Guide</Link>, or talk it through in <Link to="/mentoring" className="underline underline-offset-4">Mentoring</Link>.</p>
              </Callout>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={async () => { setCopied(await copyText(window.location.href)); setTimeout(() => setCopied(false), 1800) }}>{copied ? 'Link copied' : 'Copy link'}</Button>
                <Button to="/learn/library" variant="secondary" arrow>Back to the Library</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
