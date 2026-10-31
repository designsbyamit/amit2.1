import { motion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { docHref, firstMonth, hiringDocs, hiringParts } from '../data/hiring'
import { DownloadCard, Section } from '../components/leading/ChapterParts'
import GrowthChapter from './GrowthChapter'
import AIMaturityChapter from './AIMaturityChapter'
import type { HiringDoc } from '../data/hiring'
import { chapterOne, chapterOneWorksheets, chapters, LEADING_DESIGN_PATH, teamShapeDoc, WORKSHEET_KIT } from '../data/leadingDesign'

// The Figma file URL is set only on the staging project (VITE_LEADING_DESIGN_FIGMA). Where it is unset, the button asks to request the file instead.
const FIGMA_WORKSHEETS: string = import.meta.env.VITE_LEADING_DESIGN_FIGMA || ''

const ease = [0.16, 1, 0.3, 1] as const
const REQUEST_TEAM = { topic: 'speaking', subject: 'Building a design team: Leading Design chapter 1', message: 'I would like to talk about building a design team in my organisation.\n\nTeam size:\nWhere we are today:\n' } as const

const find = (slugs: string[]): HiringDoc[] => slugs.map(s => s === teamShapeDoc.slug ? teamShapeDoc : hiringDocs.find(d => d.slug === s)).filter((d): d is HiringDoc => !!d)

function BuildingADesignTeam() {
  const { open } = useContact()
  const c = chapters[0]
  const hiring = hiringParts.filter(p => p.id !== 'onboarding')
  const onboarding = hiringParts.find(p => p.id === 'onboarding')!
  const ws = { team: find(chapterOneWorksheets.team), hiring: find(chapterOneWorksheets.hiring), onboarding: find(chapterOneWorksheets.onboarding) }
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design', to: LEADING_DESIGN_PATH }, { label: c.title }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Leading Design · Chapter {c.n}</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>{c.title}</motion.h1>
              {chapterOne.intro.map((t, i) => <p key={i} className={`${i === 0 ? 'text-body-lg mt-6' : 'text-body mt-4'} text-ink-2 max-w-2xl`}>{t}</p>)}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={docHref(teamShapeDoc.slug)} download className="btn btn-primary">Download the Team Shape Worksheet <span className="hidden sm:inline font-mono text-xs opacity-70">PDF · {teamShapeDoc.pages} pages</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="text-label text-ink-3 mb-3">By the end you will have</p>
              <ul className="flex flex-col gap-3">{chapterOne.outcomes.map(o => <li key={o} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{o}</li>)}</ul>
            </div>
          </div>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-12">
            {[['principles', 'Points'], ['team-shape', 'Framework: team shape'], ['hiring', 'Framework: hiring'], ['onboarding', 'Framework: onboarding'], ['first-month', 'Your first month'], ['worksheets', 'Editable worksheets']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      <Section id="principles" label="Points to carry" title="Five beliefs to build a team by." intro="Each belief comes with one thing to do this week.">
        <ol className="grid md:grid-cols-2 gap-4">
          {chapterOne.principles.map((p, i) => (
            <li key={p.title} className={`card flex flex-col gap-4 ${chapterOne.principles.length % 2 === 1 && i === chapterOne.principles.length - 1 ? 'md:col-span-2' : ''}`}>
              <span className="text-label text-signal-ink">Principle {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-title text-ink">{p.title}</h3>
              <p className="text-body-sm text-ink-2">{p.text}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">This week</span>{p.ask}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="team-shape" label="Framework 1" title={chapterOne.teamFramework.title} intro={chapterOne.teamFramework.lead}>
        <ol className="grid md:grid-cols-2 gap-4">
          {chapterOne.teamFramework.steps.map((s, i) => (
            <li key={s.title} className={`card flex flex-col gap-4 ${chapterOne.teamFramework.steps.length % 2 === 1 && i === chapterOne.teamFramework.steps.length - 1 ? 'md:col-span-2' : ''}`}>
              <span className="text-label text-signal-ink">Step {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-title text-ink">{s.title}</h3>
              <p className="text-body-sm text-ink-2">{s.text}</p>
              <ul className="flex flex-col gap-2">{s.how.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
            </li>
          ))}
        </ol>
        <h3 className="text-label text-ink-3 mt-14 mb-5">Worksheet for this framework</h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{ws.team.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <Section id="hiring" label="Framework 2" title="Design the hiring experience." intro="Hiring is lived by three people at once: the candidate, the interviewer and the person who decides. This framework designs it for all three, working with HR. The full playbook has every step.">
        <div className="flex flex-col gap-4">
          {hiring.map(part => (
            <article key={part.id} className="card grid md:grid-cols-12 gap-x-8 gap-y-4">
              <div className="md:col-span-5 flex flex-col gap-3">
                <span className="text-label text-signal-ink">Part {part.n}</span>
                <h3 className="text-title text-ink">{part.title}</h3>
                <p className="text-body-sm text-ink-2">{part.lead}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-label text-ink-3 mb-3">The steps</p>
                <ol className="flex flex-col gap-2">{part.steps.map((s, i) => <li key={s.title} className="text-body-sm text-ink-2 flex gap-3"><span className="font-mono text-xs text-ink-3 pt-0.5">{String(i + 1).padStart(2, '0')}</span>{s.title}</li>)}</ol>
              </div>
              <div className="md:col-span-3">
                <p className="text-label text-ink-3 mb-3">What you will have</p>
                <p className="text-body-sm text-ink-2">{part.outcome}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <Button to="/resources/hiring-experience" arrow>Hiring is an experience problem</Button>
          <Button to="/resources/hiring" variant="secondary">Step by step: How I hire</Button>
        </div>
        <h3 className="text-label text-ink-3 mt-14 mb-5">Worksheets for this framework</h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{ws.hiring.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <Section id="onboarding" label="Framework 3" title={onboarding.title} intro={onboarding.lead}>
        <ol className="grid md:grid-cols-2 gap-4">
          {onboarding.steps.map((s, i) => (
            <li key={s.title} className="card flex flex-col gap-4">
              <span className="text-label text-signal-ink">Step {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-title text-ink">{s.title}</h3>
              <p className="text-body-sm text-ink-2">{s.what}</p>
              <ul className="flex flex-col gap-2">{s.how.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">Watch for</span>{s.watch}</p>
            </li>
          ))}
          <li className="card flex flex-col gap-3 md:col-span-2" style={{ background: 'var(--field-teal)' }}>
            <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>What you will have</span>
            <p className="text-[1.25rem] font-light" style={{ color: '#ECEDEF' }}>{onboarding.outcome}</p>
          </li>
        </ol>
        <h3 className="text-label text-ink-3 mt-14 mb-5">Worksheet for this framework</h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{ws.onboarding.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <Section id="first-month" label="If you are new to this" title="Your first month." intro="You do not need to be an expert to start. Four weeks, one real role, and a way to learn from the first candidate.">
        <ol className="grid md:grid-cols-4 gap-4">
          {firstMonth.map(w => (
            <li key={w.week} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">{w.week}</span>
              <h3 className="text-title text-ink">{w.title}</h3>
              <p className="text-body-sm text-ink-2">{w.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="worksheets" label="Everything in one place" title="All the worksheets for this chapter." intro="Print them, fill them in with your leader and your HR partner, and adapt them to your organisation. Six of them are also editable, each with a filled example.">
        <div className="card flex flex-col gap-4 mb-8" style={{ background: 'var(--field-teal)' }}>
          <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Editable worksheets</span>
          <p className="text-[1.25rem] font-light max-w-[52ch]" style={{ color: '#ECEDEF' }}>Type straight into each worksheet and switch to the filled example (a fictional company, NorthStar) to see how it is used. Your notes stay in your browser.</p>
          <div className="flex flex-wrap gap-3">
            <a href={WORKSHEET_KIT} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
            {FIGMA_WORKSHEETS
              ? <a href={FIGMA_WORKSHEETS} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open in Figma<span className="sr-only"> (opens in a new tab)</span></a>
              : <Button variant="secondary" onClick={() => open({ topic: 'resource', subject: 'Request - Leading Design chapter 1 worksheets (Figma)', message: 'I would like to request the editable Figma worksheets for Leading Design chapter 1, Building a design team.' })}>Request the Figma file</Button>}
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...ws.team, ...ws.hiring, ...ws.onboarding].map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to={LEADING_DESIGN_PATH} variant="tertiary">Back to Leading Design</Button>
          <Button to="/resources" variant="tertiary" arrow>Resources</Button>
        </div>
      </section>
    </>
  )
}

export default function LeadingChapterPage() {
  const { chapter } = useParams()
  const c = chapters.find(x => x.slug === chapter)
  if (!c || !c.ready) return <Navigate to={LEADING_DESIGN_PATH} replace />
  if (c.slug === 'building-a-design-team') return <BuildingADesignTeam />
  if (c.slug === 'growth-and-performance-metrics') return <GrowthChapter />
  if (c.slug === 'ai-maturity-for-design-orgs') return <AIMaturityChapter />
  return <Navigate to={LEADING_DESIGN_PATH} replace />
}
