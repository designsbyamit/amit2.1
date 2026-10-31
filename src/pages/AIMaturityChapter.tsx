import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { DownloadCard, Section, StepCard } from '../components/leading/ChapterParts'
import { chapters, LEADING_DESIGN_PATH, WORKSHEET_KIT_5 } from '../data/leadingDesign'
import { chapterFive as c5, chapterFiveDocs } from '../data/leadingDesignAI'
import type { Point } from '../data/leadingDesignGrowth'

const ease = [0.16, 1, 0.3, 1] as const
// The Figma file link is set only on the staging project (VITE_LEADING_DESIGN_FIGMA_5). Where it is unset, the button asks to request the file.
const FIGMA: string = import.meta.env.VITE_LEADING_DESIGN_FIGMA_5 || ''
const REQUEST_TEAM = { topic: 'speaking', subject: 'AI maturity for my design organisation: Leading Design chapter 5', message: 'I would like to talk about AI maturity and capability in my design organisation.\n\nTeam or programme size:\nWhere we are today:\n' } as const

const docs = (slugs: string[]) => chapterFiveDocs.filter(d => slugs.includes(d.slug))
const W = {
  stand: docs(['ai-maturity-assessment-worksheet']),
  build: docs(['ai-capability-matrix-worksheet']),
  responsible: docs(['ai-usage-charter-worksheet']),
  plan: docs(['ai-workflow-redesign-worksheet', 'ai-six-month-roadmap-tracker']),
  measure: docs(['ai-scorecard-worksheet']),
}

function Points({ items }: { items: Point[] }) {
  return (
    <ol className="grid md:grid-cols-2 gap-4">
      {items.map((p, i) => (
        <li key={p.title} className={`card flex flex-col gap-4 ${items.length % 2 === 1 && i === items.length - 1 ? 'md:col-span-2' : ''}`}>
          <span className="text-label text-signal-ink">Point {String(i + 1).padStart(2, '0')}</span>
          <h3 className="text-title text-ink">{p.title}</h3>
          <p className="text-body-sm text-ink-2">{p.text}</p>
          <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">This week</span>{p.ask}</p>
        </li>
      ))}
    </ol>
  )
}
function Sub({ children }: { children: React.ReactNode }) { return <h3 className="text-label text-ink-3 mt-16 mb-5">{children}</h3> }
function Lead({ children }: { children: React.ReactNode }) { return <p className="text-body text-ink-2 max-w-[62ch] mb-8">{children}</p> }
function Worksheets({ items, label = 'Worksheets for this part' }: { items: typeof chapterFiveDocs; label?: string }) {
  return (<><Sub>{label}</Sub><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map(d => <DownloadCard key={d.slug} d={d} />)}</ul></>)
}

const SCORE_WORDS = ['', 'Awareness', 'Application', 'Integration', 'Expertise', 'Transformation']

/** A quick self-check. Nothing is stored or sent. The level is capped one above the weakest dimension, because the lowest score limits the rest. */
function SelfCheck() {
  const [scores, setScores] = useState<number[]>(() => c5.stand.dimensions.map(() => 0))
  const done = scores.every(s => s > 0)
  const avg = done ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const min = done ? Math.min(...scores) : 0
  const level = done ? Math.min(Math.round(avg), min + 1) : 0
  const weakest = done ? c5.stand.dimensions.filter((_, i) => scores[i] === min).map(d => d.name) : []
  return (
    <div className="card flex flex-col gap-6" aria-labelledby="selfcheck-h">
      <div>
        <p className="text-label text-signal-ink mb-2">Try it</p>
        <h3 id="selfcheck-h" className="text-title text-ink">A five-minute self-check</h3>
        <p className="text-body-sm text-ink-2 mt-2 max-w-[62ch]">Score each dimension from your team’s real work. This gives a first reading only. The worksheet asks you to name the evidence behind every score. Nothing here is saved.</p>
      </div>
      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {c5.stand.dimensions.map((d, i) => (
          <li key={d.name} className="flex flex-col gap-1.5">
            <label htmlFor={`sc-${i}`} className="text-body-sm text-ink">{d.name}</label>
            <select id={`sc-${i}`} className="field" value={scores[i]} onChange={e => setScores(s => s.map((v, j) => (j === i ? Number(e.target.value) : v)))}>
              <option value={0}>Choose a score</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} · {SCORE_WORDS[n]}</option>)}
            </select>
          </li>
        ))}
      </ul>
      <div className="pt-6 hairline-top" aria-live="polite">
        {done ? (
          <>
            <p className="text-heading text-ink">Level {level}: {c5.stand.levels[level - 1].name}</p>
            <p className="text-body-sm text-ink-2 mt-2 max-w-[62ch]">Your average is {avg.toFixed(1)}, but your lowest score is {min}, in {weakest.join(' and ').toLowerCase()}. The weakest dimension limits the level, so start there.</p>
            <button type="button" className="btn btn-tertiary btn-sm mt-4" onClick={() => setScores(c5.stand.dimensions.map(() => 0))}>Start again</button>
          </>
        ) : (
          <p className="text-body-sm text-ink-3">Score all eight dimensions to see a reading.</p>
        )}
      </div>
    </div>
  )
}

export default function AIMaturityChapter() {
  const { open } = useContact()
  const c = chapters[4]
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design', to: LEADING_DESIGN_PATH }, { label: c.title }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Leading Design · Chapter {c.n}</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>{c.title}</motion.h1>
              {c5.intro.map((t, i) => <p key={i} className={`${i === 0 ? 'text-body-lg mt-6' : 'text-body mt-4'} text-ink-2 max-w-2xl`}>{t}</p>)}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={WORKSHEET_KIT_5} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="text-label text-ink-3 mb-3">By the end you will have</p>
              <ul className="flex flex-col gap-3">{c5.outcomes.map(o => <li key={o} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{o}</li>)}</ul>
            </div>
          </div>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-12">
            {[['ground', '1 What is changing'], ['stand', '2 Where you stand'], ['build', '3 Building capability'], ['responsible', '4 Leading responsibly'], ['plan', '5 Six months'], ['measure', '6 Measuring'], ['worksheets', 'Editable worksheets']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      {/* 1 · What is changing */}
      <Section id="ground" label="Part 1" title="What is changing." intro={c5.ground.lead}>
        <Points items={c5.ground.points} />
        <Sub>What the research suggests</Sub>
        <Lead>{c5.ground.evidenceLead}</Lead>
        <ul className="grid md:grid-cols-2 gap-4">
          {c5.ground.evidence.map(e => (
            <li key={e.source} className="card flex flex-col gap-3">
              <span className="text-display-l text-ink">{e.figure}</span>
              <p className="text-body-sm text-ink-2">{e.text}</p>
              <p className="text-body-sm mt-auto pt-4 hairline-top"><a href={e.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-ink-2 hover:text-ink">{e.source}<span className="sr-only"> (opens in a new tab)</span></a></p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 2 · Where you stand */}
      <Section id="stand" label="Part 2" title="Where you stand." intro={c5.stand.lead}>
        <Points items={c5.stand.points} />

        <Sub>Framework: five levels of capability</Sub>
        <Lead>{c5.stand.levelsLead}</Lead>
        <ol className="grid md:grid-cols-5 gap-4">
          {c5.stand.levels.map(l => (
            <li key={l.n} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">Level {l.n}</span>
              <h4 className="text-title text-ink">{l.name}</h4>
              <p className="text-body-sm text-ink-2">{l.sees}</p>
              <p className="text-body-sm text-ink-2"><span className="text-label text-ink-3 block mb-1">Evidence</span>{l.evidence}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">To move up</span>{l.up}</p>
            </li>
          ))}
        </ol>

        <Sub>Framework: eight dimensions to score</Sub>
        <Lead>{c5.stand.dimensionsLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {c5.stand.dimensions.map((d, i) => <StepCard key={d.name} label={`Dimension ${String(i + 1).padStart(2, '0')}`} title={d.name} text={d.text} />)}
        </ol>
        <div className="card mt-4" style={{ background: 'var(--field-teal)' }}>
          <p className="font-mono text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#C8F55A' }}>The top level, honestly</p>
          <p className="text-[1.25rem] font-light mb-4" style={{ color: '#ECEDEF' }}>{c5.stand.topLead}</p>
          <ul className="flex flex-col gap-2">{c5.stand.topRules.map(r => <li key={r} className="text-body-sm flex gap-2" style={{ color: '#ECEDEF' }}><span aria-hidden="true" style={{ color: '#C8F55A' }}>–</span>{r}</li>)}</ul>
        </div>

        <div className="mt-10"><SelfCheck /></div>
        <Worksheets items={W.stand} label="Worksheet for this part" />
      </Section>

      {/* 3 · Building capability */}
      <Section id="build" label="Part 3" title="Building capability." intro={c5.build.lead}>
        <Points items={c5.build.points} />
        <Sub>Framework: six learning tracks</Sub>
        <Lead>{c5.build.tracksLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {c5.build.tracks.map(t => <StepCard key={t.id} label={`Track ${t.id}`} title={t.name} text={t.text} />)}
        </ol>
        <Sub>Three journeys, side by side</Sub>
        <Lead>{c5.build.journeysLead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c5.build.journeys.map((j, i) => <StepCard key={j.name} label={`Journey ${i + 1}`} title={j.name} text={j.text} />)}
        </ol>
        <Worksheets items={W.build} label="Worksheet for this part" />
      </Section>

      {/* 4 · Leading responsibly */}
      <Section id="responsible" label="Part 4" title="Leading responsibly." intro={c5.responsible.lead}>
        <Points items={c5.responsible.points} />
        <Sub>Framework: green, amber and red</Sub>
        <Lead>{c5.responsible.zonesLead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c5.responsible.zones.map(z => <StepCard key={z.zone} label={z.zone} title={z.name} text={z.text} />)}
        </ol>
        <Sub>Where in the work someone looks</Sub>
        <Lead>{c5.responsible.stagesLead}</Lead>
        <ol className="flex flex-col">
          {c5.responsible.stages.map((s, i) => (
            <li key={s.name} className="hairline-top py-5 grid md:grid-cols-12 gap-x-6 gap-y-1">
              <span className="font-mono text-xs text-ink-3 md:col-span-1 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <p className="md:col-span-3 text-label text-signal-ink">{s.name}</p>
              <p className="md:col-span-8 text-body text-ink">{s.q}</p>
            </li>
          ))}
        </ol>
        <p className="card mt-6 text-body-sm text-ink-2">{c5.responsible.legal}</p>
        <Worksheets items={W.responsible} label="Worksheet for this part" />
      </Section>

      {/* 5 · Six months */}
      <Section id="plan" label="Part 5" title="Six months, and the way of working." intro={c5.plan.lead}>
        <Points items={c5.plan.points} />
        <Sub>Framework: a six-month shape</Sub>
        <Lead>{c5.plan.monthsLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {c5.plan.months.map(m => (
            <li key={m.m} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">{m.m}</span>
              <h4 className="text-title text-ink">{m.name}</h4>
              <p className="text-body-sm text-ink-2">{m.text}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">You will have</span>{m.out}</p>
            </li>
          ))}
        </ol>

        <Sub>Roles and rituals</Sub>
        <Lead>{c5.plan.opsLead}</Lead>
        <div className="grid md:grid-cols-2 gap-4">
          <ol className="grid gap-4">{c5.plan.roles.map(r => <StepCard key={r.name} label="Role" title={r.name} text={r.text} />)}</ol>
          <ol className="grid gap-4">{c5.plan.rituals.map(r => <StepCard key={r.name} label="Ritual" title={r.name} text={r.text} />)}</ol>
        </div>
        <p className="text-body text-ink-2 max-w-[62ch] mt-6">{c5.plan.rhythmNote}</p>

        <Sub>How long each step takes</Sub>
        <ul className="grid sm:grid-cols-4 gap-4">
          {c5.plan.pace.map(p => <li key={p.from} className="card"><span className="text-label text-signal-ink block mb-2">Level {p.from}</span><p className="text-title text-ink">{p.time}</p></li>)}
        </ul>
        <p className="text-body-sm text-ink-3 max-w-[62ch] mt-4">{c5.plan.paceNote}</p>
        <Worksheets items={W.plan} label="Worksheets for this part" />
      </Section>

      {/* 6 · Measuring */}
      <Section id="measure" label="Part 6" title="Measuring without fooling yourself." intro={c5.measure.lead}>
        <Points items={c5.measure.points} />
        <Sub>Framework: a balanced scorecard</Sub>
        <Lead>{c5.measure.groupsLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {c5.measure.groups.map((g, i) => (
            <li key={g.name} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">Group {i + 1}</span>
              <h4 className="text-title text-ink">{g.name}</h4>
              <p className="text-body-sm text-ink-2">{g.text}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">For example</span>{g.eg}</p>
            </li>
          ))}
        </ol>

        <Sub>A last check for managers</Sub>
        <Lead>{c5.measure.checklistLead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c5.measure.checklist.map(g => (
            <li key={g.name} className="card flex flex-col gap-3">
              <h4 className="text-title text-ink">{g.name}</h4>
              <ul className="flex flex-col gap-2">{g.items.map(it => <li key={it} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{it}</li>)}</ul>
            </li>
          ))}
        </ol>
        <p className="card mt-4 text-[1.25rem] font-light" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c5.measure.close}</p>
        <Worksheets items={W.measure} label="Worksheet for this part" />
      </Section>

      <Section id="worksheets" label="Everything in one place" title="All the worksheets for this chapter." intro="Print them, or fill them in on the page, with a filled example beside each. Your notes stay in your browser.">
        <div className="card flex flex-col gap-4 mb-8" style={{ background: 'var(--field-teal)' }}>
          <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Editable worksheets</span>
          <p className="text-[1.25rem] font-light max-w-[52ch]" style={{ color: '#ECEDEF' }}>Type straight into each worksheet, then switch to the filled example (a fictional company, NorthStar) to see how it is used.</p>
          <div className="flex flex-wrap gap-3">
            <a href={WORKSHEET_KIT_5} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
            {FIGMA
              ? <a href={FIGMA} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open in Figma<span className="sr-only"> (opens in a new tab)</span></a>
              : <Button variant="secondary" onClick={() => open({ topic: 'resource', subject: 'Request - Leading Design chapter 5 worksheets (Figma)', message: 'I would like to request the editable Figma worksheets for Leading Design chapter 5, AI maturity for design organisations.' })}>Request the Figma file</Button>}
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{chapterFiveDocs.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to={LEADING_DESIGN_PATH} variant="tertiary">Back to Leading Design</Button>
          <Button to="/resources/leading-design/growth-and-performance-metrics" variant="tertiary" arrow>Chapter 2: Growth and performance metrics</Button>
        </div>
      </section>
    </>
  )
}
