import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import ResourceCover from '../components/ds/ResourceCover'
import { docHref, hiringProof } from '../data/hiring'
import type { HiringDoc } from '../data/hiring'
import { allExperienceDocs, caseIntro, caseSteps, experienceHandbook, patterns, resultPoints, results, sourceNote, sources, tenets } from '../data/hiringExperience'

const ease = [0.16, 1, 0.3, 1] as const
const REQUEST_TEAM = { topic: 'speaking', subject: 'Redefining the hiring experience for my team', message: 'I would like to talk about redefining the hiring experience for my design team.\n\nTeam size:\nWhere hiring hurts today:\n' } as const
const titleOf = (slug?: string) => allExperienceDocs.find(d => d.slug === slug)?.title

function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: React.ReactNode }) {
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

function DocLink({ slug }: { slug?: string }) {
  const t = titleOf(slug)
  if (!slug || !t) return null
  return <a href={docHref(slug)} download className="text-body-sm text-signal-ink underline underline-offset-4 inline-flex gap-1.5 items-center" aria-label={`Download ${t}, PDF`}>Worksheet: {t}</a>
}

function DownloadCard({ d }: { d: HiringDoc }) {
  return (
    <li className="card flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="text-label text-signal-ink">{d.kind}</span><span className="font-mono text-xs text-ink-3">PDF · {d.pages} {d.pages === 1 ? 'page' : 'pages'}</span></div>
      <h4 className="text-title text-ink">{d.title}</h4>
      <p className="text-body-sm text-ink-2">{d.summary}</p>
      <a href={docHref(d.slug)} download className="btn btn-secondary btn-sm mt-auto self-start" aria-label={`Download ${d.title}, PDF, ${d.pages} pages`}>
        Download
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </li>
  )
}

export default function HiringExperiencePage() {
  const { open } = useContact()
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
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
          <dl className="grid sm:grid-cols-3 gap-x-8 gap-y-6 mt-14 pt-8 hairline-top">
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
        <ol className="grid md:grid-cols-2 gap-4">
          {patterns.map((p, i) => (
            <li key={p.n} className={`card flex flex-col gap-4 ${patterns.length % 2 === 1 && i === patterns.length - 1 ? 'md:col-span-2' : ''}`}>
              <span className="text-label text-signal-ink">Pattern {p.n}</span>
              <h3 className="text-title text-ink">{p.title}</h3>
              <p className="text-body-sm text-ink-2">{p.problem}</p>
              <p className="text-body-sm text-ink-3">{p.evidence} <a href={p.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{p.source.label}</a></p>
              <div className="pt-4 hairline-top">
                <span className="text-label text-ink-3 block mb-2">What can be done</span>
                <ul className="flex flex-col gap-2">{p.doThis.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
              </div>
              <div className="mt-auto"><DocLink slug={p.doc} /></div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="case-study" label="The case study" title="What I did about it." intro={caseIntro.note}>
        <blockquote className="font-serif text-ink max-w-3xl mb-12" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)', lineHeight: 1.25 }}>&ldquo;{caseIntro.quote}&rdquo;</blockquote>
        <ol className="grid md:grid-cols-2 gap-4">
          {caseSteps.map(s => (
            <li key={s.n} className="card flex flex-col gap-4">
              <span className="text-label text-signal-ink">Step {s.n}</span>
              <h3 className="text-title text-ink">{s.title}</h3>
              <p className="text-body-sm text-ink-2">{s.text}</p>
              <ul className="flex flex-col gap-2">{s.points.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
              <div className="mt-auto"><DocLink slug={s.doc} /></div>
            </li>
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
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{allExperienceDocs.slice(8).concat(allExperienceDocs.slice(0, 8)).map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
        <div className="flex flex-wrap gap-3 mt-10">
          <a href={experienceHandbook.href} download className="btn btn-primary">Download all as one handbook</a>
          <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Bring this to your team</Button>
        </div>
      </Section>

      <Section id="sources" label="Where the evidence comes from" title="Sources." intro={sourceNote}>
        <ul className="flex flex-col gap-3">
          {sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-body text-ink-2 underline underline-offset-4">{s.label}</a></li>)}
        </ul>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to="/resources" variant="tertiary">Back to Practice</Button>
          <Button to="/leadership" variant="tertiary" arrow>Journey</Button>
        </div>
      </section>
    </>
  )
}
