import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ds/Button'
import { guide, mistakes, checklist, template, characterPrompts } from '../../data/growPortfolio'
import { copyText, useLocalState } from '../../hooks/useLocalState'
import { AnatomyDiagram, CharacterWheel, StoryArc } from './PortfolioVisuals'

export default function PortfolioPage() {
  const [checked, setChecked] = useLocalState<number[]>('grow.portfolio.checklist', [])
  const [copied, setCopied] = useState(false)
  const [sheet, setSheet] = useLocalState<Record<string, string>>('grow.portfolio.character', {})
  const [sheetCopied, setSheetCopied] = useState(false)
  const sheetText = ['MY PORTFOLIO CHARACTER', '', ...characterPrompts.flatMap(q => [q.label.toUpperCase(), sheet[q.id] || '', ''])].join('\n')
  const tog = (i: number) => setChecked(c => (c.includes(i) ? c.filter(x => x !== i) : [...c, i]))
  const toc = [...guide.map(g => ({ id: g.id, label: g.title })), { id: 'mistakes', label: 'Common mistakes' }, { id: 'checklist', label: 'Self-review checklist' }, { id: 'template', label: 'Project template' }]
  return (
    <>
      <PageHeader label="Grow · Portfolio Best Practices" title="Give your portfolio a character." subtitle="Your portfolio is a reflection of you. Define its character, build it into every surface, then shape each project with a clear anatomy and a story worth reading."
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Portfolio Best Practices' }]} />

      <div className="container-site hairline-top">
        <div className="grid lg:grid-cols-12 gap-x-12">
          <nav aria-label="On this page" className="hidden lg:block lg:col-span-3 py-16">
            <ul className="sticky top-28 flex flex-col gap-3 border-l border-[color:var(--line-1)]">
              {toc.map((t, i) => <li key={t.id}><a href={`#${t.id}`} className="block pl-4 text-body-sm text-ink-3 hover:text-ink"><span className="text-label mr-2">{String(i + 1).padStart(2, '0')}</span>{t.label}</a></li>)}
            </ul>
          </nav>

          <div className="lg:col-span-9">
            {guide.map(g => (
              <section key={g.id} id={g.id} className="py-16 md:py-20 border-b border-[color:var(--line-1)] scroll-mt-24">
                <p className="text-overline text-ink-3">{g.n} · {g.kicker}</p>
                <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>{g.title}</h2>
                <p className="text-body-lg text-ink-2 mt-5 max-w-[62ch]">{g.lead}</p>
                {g.id === 'character' && <CharacterWheel />}
                {g.id === 'story' && <StoryArc />}
                {g.points && g.id === 'anatomy' && <AnatomyDiagram points={g.points} />}
                {g.points && g.id !== 'anatomy' && (
                  <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
                    {g.points.map(p => <div key={p.t}><dt className="text-title text-ink" style={{ fontWeight: 400 }}>{p.t}</dt><dd className="text-body text-ink-2 mt-2">{p.d}</dd></div>)}
                  </dl>
                )}
                {g.worksheet && (
                  <div className="mt-10 card !p-6 md:!p-8">
                    <div className="flex flex-col gap-7">
                      {characterPrompts.map(q => (
                        <label key={q.id} className="block">
                          <span className="text-title text-ink" style={{ fontWeight: 400 }}>{q.label}</span>
                          <span className="block text-body-sm text-ink-3 mt-1">{q.hint}</span>
                          <textarea rows={3} value={sheet[q.id] || ''} onChange={e => setSheet(v => ({ ...v, [q.id]: e.target.value }))}
                            className="mt-3 w-full rounded-2 border border-[color:var(--line-1)] bg-surface-0 p-3 text-body text-ink focus:outline-none focus:border-[color:var(--signal-ink)]" />
                        </label>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Button variant="secondary" onClick={async () => { setSheetCopied(await copyText(sheetText)); setTimeout(() => setSheetCopied(false), 1800) }}>{sheetCopied ? 'Copied' : 'Copy my character sheet'}</Button>
                      <span className="text-label text-ink-3">Saved in this browser only.</span>
                    </div>
                  </div>
                )}
                {g.example && (
                  <figure className="card !p-7 md:!p-8 mt-10">
                    <p className="text-overline text-ink-3">{g.example.label}</p>
                    <blockquote className="text-heading text-ink mt-4" style={{ fontWeight: 300 }}>&ldquo;{g.example.quote}&rdquo;</blockquote>
                    <figcaption className="text-body-sm text-ink-3 mt-4 max-w-[62ch]">{g.example.note}</figcaption>
                    {g.example.to && <p className="mt-5"><Link to={g.example.to} className="text-label text-ink-2 hover:text-ink underline underline-offset-4">Read the case study &rarr;</Link></p>}
                  </figure>
                )}
                {g.pairs && (
                  <ul className="mt-10 flex flex-col gap-6">
                    {g.pairs.map(p => (
                      <li key={p.weak} className="grid md:grid-cols-2 gap-px bg-[color:var(--line-1)] border border-[color:var(--line-1)] rounded-3 overflow-hidden">
                        <div className="bg-surface-0 p-6"><p className="text-label text-ink-3">Weaker</p><p className="text-body text-ink-3 mt-3 line-through decoration-[color:var(--line-2)]">{p.weak}</p></div>
                        <div className="bg-surface-1 p-6"><p className="text-label text-signal-ink">Stronger</p><p className="text-body text-ink mt-3">{p.strong}</p><p className="text-body-sm text-ink-3 mt-3">{p.why}</p></div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="mistakes" className="py-16 md:py-20 border-b border-[color:var(--line-1)] scroll-mt-24">
              <p className="text-overline text-ink-3">Common mistakes</p>
              <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>What to look for in your own work.</h2>
              <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {mistakes.map(m => <li key={m} className="flex gap-3 text-body text-ink-2"><span aria-hidden className="text-ink-3">&mdash;</span>{m}</li>)}
              </ul>
            </section>

            <section id="checklist" className="py-16 md:py-20 border-b border-[color:var(--line-1)] scroll-mt-24">
              <p className="text-overline text-ink-3">Self-review checklist</p>
              <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>Before you share it.</h2>
              <p className="text-body text-ink-2 mt-5">{checked.length} of {checklist.length} checked. Saved in this browser.</p>
              <ul className="mt-8 flex flex-col">
                {checklist.map((c, i) => (
                  <li key={c} className="hairline-top last:border-b last:border-[color:var(--line-1)]">
                    <label className="flex items-start gap-4 py-4 cursor-pointer">
                      <input type="checkbox" className="mt-1.5 h-4 w-4 accent-[color:var(--signal)]" checked={checked.includes(i)} onChange={() => tog(i)} />
                      <span className={`text-body ${checked.includes(i) ? 'text-ink-3' : 'text-ink-2'}`}>{c}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section id="template" className="py-16 md:py-20 scroll-mt-24">
              <p className="text-overline text-ink-3">Project template</p>
              <h2 className="text-display-l text-ink mt-4" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>A skeleton to start from.</h2>
              <pre className="card !p-6 mt-8 text-body-sm text-ink-2 whitespace-pre-wrap overflow-x-auto" style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}>{template}</pre>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={async () => { setCopied(await copyText(template)); setTimeout(() => setCopied(false), 1800) }}>{copied ? 'Copied' : 'Copy the template'}</Button>
                <Button to="/mentoring" variant="secondary" arrow>Book a portfolio review</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
