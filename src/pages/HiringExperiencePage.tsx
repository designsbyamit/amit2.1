import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import ResourceCover from '../components/ds/ResourceCover'
import { docHref, hiringProof } from '../data/hiring'
import { allExperienceDocs, caseIntro, caseSteps, experienceHandbook, patterns, resultPoints, results, sourceNote, sources, tenets } from '../data/hiringExperience'

const ease = [0.16, 1, 0.3, 1] as const
const REQUEST_TEAM = { topic: 'speaking', subject: 'Redefining the hiring experience for my team', message: 'I would like to talk about redefining the hiring experience for my design team.\n\nTeam size:\nWhere hiring hurts today:\n' } as const
const titleOf = (slug?: string) => allExperienceDocs.find(d => d.slug === slug)?.title

function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-14 md:py-20 hairline-top scroll-mt-24" aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <div className="grid-site gap-y-6 mb-8 md:mb-10">
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


const chev = (open: boolean) => <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}><path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>

/** One row of an accordion: a number, a title and a one-line summary; the detail opens beneath it. */
function Row({ id, kicker, title, summary, open, onToggle, children }: { id: string; kicker: string; title: string; summary?: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <li className="hairline-top first:border-t-0">
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${id}-panel`} className="w-full flex items-start gap-4 md:gap-6 py-5 text-left group">
          <span className="text-label text-signal-ink w-16 md:w-24 shrink-0 pt-1">{kicker}</span>
          <span className="flex-1 min-w-0">
            <span className="block text-title text-ink group-hover:text-signal-ink transition-colors">{title}</span>
            {summary && !open && <span className="block text-body-sm text-ink-3 mt-1 line-clamp-2">{summary}</span>}
          </span>
          <span className="text-ink-3 pt-1">{chev(open)}</span>
        </button>
      </h3>
      {open && <div id={`${id}-panel`} className="pb-6 pl-[5rem] md:pl-[7.5rem] pr-8 flex flex-col gap-4">{children}</div>}
    </li>
  )
}

function useOpen() {
  const [openIds, set] = useState<string[]>([])
  return { openIds, toggle: (id: string) => set(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id]), setAll: (ids: string[]) => set(ids) }
}

function ExpandAll({ ids, openIds, setAll }: { ids: string[]; openIds: string[]; setAll: (ids: string[]) => void }) {
  const all = openIds.length === ids.length
  return <button type="button" className="text-body-sm text-ink-2 underline underline-offset-4 hover:text-ink" onClick={() => setAll(all ? [] : ids)}>{all ? 'Collapse all' : 'Expand all'}</button>
}

function DocLink({ slug }: { slug?: string }) {
  const t = titleOf(slug)
  if (!slug || !t) return null
  return <a href={docHref(slug)} download className="text-body-sm text-signal-ink underline underline-offset-4 inline-flex gap-1.5 items-center" aria-label={`Download ${t}, PDF`}>Worksheet: {t}</a>
}

export default function HiringExperiencePage() {
  const { open } = useContact()
  const pat = useOpen()
  const cs = useOpen()
  const [showAll, setShowAll] = useState(false)
  const docs = allExperienceDocs.slice(8).concat(allExperienceDocs.slice(0, 8))
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-8 md:pt-12 pb-12 md:pb-14">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Practice', to: '/resources' }, { label: 'Hiring is an experience problem' }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Case study · Hiring design teams</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>Hiring is an experience problem.</motion.h1>
              <motion.p className="text-body-lg text-ink-2 mt-6 max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
                Candidates, interviewers, hiring managers and HR all live it. Most of what goes wrong in design hiring is an experience that nobody designed.
              </motion.p>
              <p className="text-body text-ink-2 mt-4 max-w-2xl">Here are seven patterns I see across the industry, what can be done about each, and how I redefined the experience in my own organisations, with the worksheets and tenets to do the same in yours.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={experienceHandbook.href} download className="btn btn-primary">Download the handbook <span className="hidden sm:inline font-mono text-xs opacity-70">PDF · {experienceHandbook.pages} pages</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-10 max-w-[240px]">
              <ResourceCover title="Hiring is an experience problem" kind="Case study" motif="conversation" tone="plum" />
            </div>
          </div>
          <dl className="grid sm:grid-cols-3 gap-x-8 gap-y-6 mt-10 pt-6 hairline-top">
            {[{ value: results.big, label: 'positive candidate responses on the hiring and interview experience' }, ...hiringProof.slice(0, 1), { value: '7', label: 'industry patterns, each with what to do about it' }].map(p => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-serif text-ink" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', lineHeight: 1 }}>{p.value}</dd>
                <dd className="text-body-sm text-ink-3 mt-2">{p.label}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-10">
            {[['patterns', 'Seven patterns'], ['case-study', 'What I did'], ['results', 'Results'], ['tenets', 'Nine tenets'], ['worksheets', 'Worksheets'], ['sources', 'Sources']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      <Section id="patterns" label="The problem" title="Seven patterns in design hiring." intro="Each is something designers, recruiters and hiring managers describe, and each has a fix that is within a hiring manager’s reach.">
        <div className="flex justify-end mb-2"><ExpandAll ids={patterns.map(p => 'p' + p.n)} openIds={pat.openIds} setAll={pat.setAll} /></div>
        <ol className="border-y" style={{ borderColor: 'var(--line-1)' }}>
          {patterns.map(p => (
            <Row key={p.n} id={'p' + p.n} kicker={`Pattern ${p.n}`} title={p.title} summary={p.problem} open={pat.openIds.includes('p' + p.n)} onToggle={() => pat.toggle('p' + p.n)}>
              <p className="text-body-sm text-ink-2">{p.problem}</p>
              <p className="text-body-sm text-ink-3">{p.evidence}</p>
              <div>
                <span className="text-label text-ink-3 block mb-2">What can be done</span>
                <ul className="flex flex-col gap-2">{p.doThis.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
              </div>
              <DocLink slug={p.doc} />
            </Row>
          ))}
        </ol>
      </Section>

      <Section id="case-study" label="The case study" title="What I did about it." intro={caseIntro.note}>
        <blockquote className="font-serif text-ink max-w-3xl mb-8" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', lineHeight: 1.25 }}>&ldquo;{caseIntro.quote}&rdquo;</blockquote>
        <div className="flex justify-end mb-2"><ExpandAll ids={caseSteps.map(c => 'c' + c.n)} openIds={cs.openIds} setAll={cs.setAll} /></div>
        <ol className="border-y" style={{ borderColor: 'var(--line-1)' }}>
          {caseSteps.map(c => (
            <Row key={c.n} id={'c' + c.n} kicker={`Step ${c.n}`} title={c.title} summary={c.text} open={cs.openIds.includes('c' + c.n)} onToggle={() => cs.toggle('c' + c.n)}>
              <p className="text-body-sm text-ink-2">{c.text}</p>
              <ul className="flex flex-col gap-2">{c.points.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
              <DocLink slug={c.doc} />
            </Row>
          ))}
        </ol>
      </Section>

      <Section id="results" label="Results" title="How it landed.">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="card md:col-span-5 flex flex-col gap-3" style={{ background: 'var(--field-teal)' }}>
            <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Candidate feedback</span>
            <p className="font-serif" style={{ color: '#ECEDEF', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1 }}>{results.big}</p>
            <p className="text-[1.15rem] font-light" style={{ color: '#ECEDEF' }}>{results.label}.</p>
            <p className="text-body-sm" style={{ color: '#B9BEC6' }}>{results.note}</p>
          </div>
          <ul className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {resultPoints.map(r => (
              <li key={r.title} className="card flex flex-col gap-2">
                <h3 className="text-title text-ink">{r.title}</h3>
                <p className="text-body-sm text-ink-2">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="tenets" label="Tenets" title="Nine tenets to relook at." intro="Use them as questions when you redefine your own hiring experience. The Tenets Check turns them into a scored worksheet.">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenets.map(t => (
            <li key={t.n} className="card flex flex-col gap-2">
              <span className="font-serif text-ink-3" style={{ fontSize: '2rem', lineHeight: 1 }}>{t.n}</span>
              <h3 className="text-title text-ink">{t.title}</h3>
              <p className="text-body-sm text-ink-2">{t.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8"><DocLink slug="hiring-experience-tenets-check" /></div>
      </Section>

      <Section id="worksheets" label="Reusable" title="The worksheets, handbooks and playbooks." intro="Eleven documents, written to be printed and filled in with your HR partner. The first three are new for this page.">
        <ul className="border-y" style={{ borderColor: 'var(--line-1)' }}>
          {(showAll ? docs : docs.slice(0, 4)).map(d => (
            <li key={d.slug} className="hairline-top first:border-t-0 flex items-center gap-4 py-4">
              <span className="text-label text-signal-ink w-24 shrink-0 hidden sm:block">{d.kind}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-title text-ink">{d.title}</h3>
                <p className="text-body-sm text-ink-3 mt-0.5 line-clamp-1 sm:line-clamp-2">{d.summary}</p>
              </div>
              <span className="font-mono text-xs text-ink-3 hidden md:block shrink-0">PDF · {d.pages}p</span>
              <a href={docHref(d.slug)} download className="btn btn-secondary btn-sm shrink-0" aria-label={`Download ${d.title}, PDF, ${d.pages} pages`}>
                <span className="sr-only sm:not-sr-only">Download</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} className="mt-4 text-body-sm text-ink-2 underline underline-offset-4 hover:text-ink">{showAll ? 'Show fewer' : `Show all ${docs.length} documents`}</button>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href={experienceHandbook.href} download className="btn btn-primary">Download all as one handbook</a>
          <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Bring this to your team</Button>
        </div>
      </Section>

      <section id="sources" className="hairline-top py-8">
        <div className="container-site">
          <h2 className="text-[11px] uppercase tracking-wider text-ink-3 mb-2">Sources</h2>
          <p className="text-[11px] leading-snug text-ink-3 max-w-3xl mb-2">{sourceNote}</p>
          <ul className="flex flex-col gap-1">
            {sources.map(s => <li key={s.url} className="text-[11px] leading-snug"><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink-3 underline underline-offset-2 hover:text-ink">{s.label}</a></li>)}
          </ul>
        </div>
      </section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to="/resources" variant="tertiary">Back to Practice</Button>
          <Button to="/leadership" variant="tertiary" arrow>Journey</Button>
        </div>
      </section>
    </>
  )
}
