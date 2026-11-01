import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ds/Button'
import Chip from '../../components/ds/Chip'
import { qas, themes, type Theme } from '../../data/growCurious'

export default function CuriousPage() {
  const [theme, setTheme] = useState<Theme | 'All'>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  useEffect(() => { const h = window.location.hash.slice(1); if (h && qas.some(q => q.id === h)) setOpen(h) }, [])
  const list = useMemo(() => {
    const s = query.trim().toLowerCase()
    return qas.filter(q => (theme === 'All' || q.theme === theme) && (!s || (q.q + ' ' + q.a.join(' ')).toLowerCase().includes(s)))
  }, [theme, query])
  return (
    <>
      <PageHeader label="Grow · Curious Minds" title="Questions designers ask." subtitle="Meaningful questions from conversations with designers, answered through experience and a point of view."
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Curious Minds' }]} />
      <section className="section-y hairline-top">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by theme">
              <Chip pressed={theme === 'All'} onClick={() => setTheme('All')}>All</Chip>
              {themes.map(t => <Chip key={t} pressed={theme === t} onClick={() => setTheme(t)}>{t}</Chip>)}
            </div>
            <div>
              <label htmlFor="cm-search" className="sr-only">Search questions</label>
              <input id="cm-search" className="field md:w-72" type="search" placeholder="Search questions" value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>
          <p className="text-label text-ink-3 mb-4" aria-live="polite">{list.length} {list.length === 1 ? 'question' : 'questions'}</p>
          <ul>
            {list.map(q => {
              const isOpen = open === q.id
              return (
                <li key={q.id} id={q.id} className="hairline-top last:border-b last:border-[color:var(--line-1)] scroll-mt-28">
                  <button type="button" aria-expanded={isOpen} aria-controls={`${q.id}-a`} onClick={() => { setOpen(isOpen ? null : q.id); if (!isOpen) history.replaceState(null, '', `#${q.id}`) }}
                    className="w-full grid grid-cols-[1fr_auto] md:grid-cols-[9rem_1fr_auto] gap-x-6 gap-y-2 items-start text-left py-6 group">
                    <span className="text-label text-ink-3 md:pt-2 order-2 md:order-none col-span-2 md:col-span-1">{q.theme}</span>
                    <span className="text-heading text-ink group-hover:opacity-80" style={{ fontWeight: 300, fontSize: 'clamp(1.25rem,2.4vw,1.75rem)' }}>{q.q}</span>
                    <span aria-hidden className="text-ink-3 text-2xl leading-none pt-1">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div id={`${q.id}-a`} className="md:pl-[10.5rem] pb-8 pr-10 flex flex-col gap-4">
                      {q.a.map((p, i) => <p key={i} className="text-body-lg text-ink-2 max-w-[62ch]">{p}</p>)}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          {list.length === 0 && <p className="text-body text-ink-2 mt-8">No question matches that. Try another word, or send me yours below.</p>}
        </div>
      </section>
      <section className="section-y hairline-top">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-heading text-ink max-w-[26ch]" style={{ fontWeight: 300 }}>Have a question of your own?</p>
            <p className="text-body text-ink-2 mt-3 max-w-[52ch]">Send it over. The ones that help other designers may be answered here.</p>
          </div>
          <Button to="/contact" arrow>Send a question</Button>
        </div>
      </section>
    </>
  )
}
