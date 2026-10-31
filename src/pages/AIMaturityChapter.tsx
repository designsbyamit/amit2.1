import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { DownloadCard, Section, StepCard } from '../components/leading/ChapterParts'
import { chapters, LEADING_DESIGN_PATH, WORKSHEET_KIT_5 } from '../data/leadingDesign'
import { chapterFive as c5, chapterFiveDocs } from '../data/leadingDesignAI'

const ease = [0.16, 1, 0.3, 1] as const
// The Figma file link is set only on the staging project (VITE_LEADING_DESIGN_FIGMA_5). Where it is unset, the button asks to request the file.
const FIGMA: string = import.meta.env.VITE_LEADING_DESIGN_FIGMA_5 || ''
const REQUEST_TEAM = { topic: 'speaking', subject: 'AI maturity for my design organisation: Leading Design chapter 5', message: 'I would like to talk about AI maturity and capability in my design organisation.\n\nTeam or programme size:\nSector:\nWhere we are today:\n' } as const

const docs = (slugs: string[]) => chapterFiveDocs.filter(d => slugs.includes(d.slug))
const W = {
  where: docs(['ai-maturity-assessment-worksheet', 'ai-capability-matrix-worksheet']),
  next: docs(['ai-workflow-redesign-worksheet', 'ai-usage-charter-worksheet', 'ai-six-month-roadmap-tracker']),
  proof: docs(['ai-scorecard-worksheet']),
}

function Sub({ children }: { children: React.ReactNode }) { return <h3 className="text-label text-ink-3 mt-12 mb-5">{children}</h3> }
function Worksheets({ items, label = 'Worksheets for this question' }: { items: typeof chapterFiveDocs; label?: string }) {
  return (<><Sub>{label}</Sub><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map(d => <DownloadCard key={d.slug} d={d} />)}</ul></>)
}

/** A layer of depth that stays closed until asked for. Uses the native element, so it works without script and with the keyboard. */
function Layer({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <details className="card group mt-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
        <span className="flex flex-col gap-1"><span className="text-title text-ink">{title}</span>{hint && <span className="text-body-sm text-ink-3">{hint}</span>}</span>
        <span aria-hidden="true" className="font-mono text-xl text-ink-3 transition-transform group-open:rotate-45 shrink-0">+</span>
      </summary>
      <div className="pt-8">{children}</div>
    </details>
  )
}

function Bullets({ items }: { items: string[] }) {
  return <ul className="flex flex-col gap-2">{items.map(x => <li key={x} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{x}</li>)}</ul>
}

/** Choose a level. One choice drives both the detail in question 1 and the moves in question 2. */
function LevelPicker({ level, onPick, idPrefix }: { level: number; onPick: (n: number) => void; idPrefix: string }) {
  return (
    <div role="radiogroup" aria-label="Choose your level" className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {c5.levels.map(l => (
        <button key={l.n} id={`${idPrefix}-${l.n}`} type="button" role="radio" aria-checked={level === l.n} onClick={() => onPick(l.n)}
          className={`card text-left flex flex-col gap-2 transition-colors ${level === l.n ? 'ring-2 ring-[var(--focus-ring)]' : ''}`}>
          <span className="text-label text-signal-ink">Level {l.n}</span>
          <span className="text-title text-ink">{l.name}</span>
          <span className="text-body-sm text-ink-2">{l.line}</span>
        </button>
      ))}
    </div>
  )
}

const SCORE_WORDS = ['', 'Exploring', 'Practising', 'Integrated', 'Designing AI', 'Leading']

/** A quick self-check on the four lenses. Nothing is stored or sent. Your level is your lowest lens. */
function SelfCheck({ onPick }: { onPick: (n: number) => void }) {
  const [scores, setScores] = useState<number[]>(() => c5.model.lenses.map(() => 0))
  const done = scores.every(s => s > 0)
  const min = done ? Math.min(...scores) : 0
  const weakest = done ? c5.model.lenses.filter((_, i) => scores[i] === min).map(l => l.name) : []
  return (
    <div className="flex flex-col gap-6">
      <p className="text-body-sm text-ink-2 max-w-[62ch]">Score each lens from what you can show, using the grid above. Nothing here is saved. The worksheet asks you to name the evidence behind every score.</p>
      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {c5.model.lenses.map((d, i) => (
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
            <p className="text-heading text-ink">Level {min}: {c5.levels[min - 1].name}</p>
            <p className="text-body-sm text-ink-2 mt-2 max-w-[62ch]">Your lowest lens is {weakest.join(' and ').toLowerCase()}. That sets your level, so do that lens’s move first. Remember: controls must be in place before AI touches personal, client or regulated data, at any level.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="#next" className="btn btn-primary btn-sm" onClick={() => onPick(min)}>See your three moves</a>
              <button type="button" className="btn btn-tertiary btn-sm" onClick={() => setScores(c5.model.lenses.map(() => 0))}>Start again</button>
            </div>
          </>
        ) : (
          <p className="text-body-sm text-ink-3">Score all four lenses to see a reading.</p>
        )}
      </div>
    </div>
  )
}

export default function AIMaturityChapter() {
  const { open } = useContact()
  const c = chapters[4]
  const [level, setLevel] = useState(0)
  const L = level ? c5.levels[level - 1] : null
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design', to: LEADING_DESIGN_PATH }, { label: c.title }]} /></div>
          <div className="max-w-3xl">
            <p className="text-overline text-ink-3 mb-5">Leading Design · Chapter {c.n}</p>
            <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>{c.title}</motion.h1>
            {c5.intro.map((t, i) => <p key={i} className={`${i === 0 ? 'text-body-lg mt-6' : 'text-body mt-4'} text-ink-2`}>{t}</p>)}
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#where" className="btn btn-primary">Start with question 1</a>
              <a href={WORKSHEET_KIT_5} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
              <Button variant="tertiary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
            </div>
          </div>
          <ol className="grid md:grid-cols-3 gap-4 mt-14">
            {c5.questions.map(q => (
              <li key={q.id}>
                <a href={`#${q.id}`} className="card card-link flex flex-col gap-3 h-full">
                  <span className="text-label text-signal-ink">Question {q.n}</span>
                  <h2 className="text-title text-ink">{q.title}</h2>
                  <p className="text-body-sm text-ink-2">{q.text}</p>
                  <span className="text-label text-ink-3 mt-auto pt-4 hairline-top">{q.cta} →</span>
                </a>
              </li>
            ))}
          </ol>
          <details className="mt-8 [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer list-none text-label text-ink-3 hover:text-ink">A grounded start: what the research says today +</summary>
            <p className="text-body-sm text-ink-2 max-w-[62ch] mt-4">{c5.reality.lead}</p>
            <ul className="grid md:grid-cols-3 gap-4 mt-4">
              {c5.reality.items.map(e => (
                <li key={e.source} className="card flex flex-col gap-3">
                  <span className="text-display-l text-ink">{e.figure}</span>
                  <p className="text-body-sm text-ink-2">{e.text}</p>
                  <p className="text-body-sm mt-auto pt-4 hairline-top"><a href={e.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-ink-2 hover:text-ink">{e.source}<span className="sr-only"> (opens in a new tab)</span></a></p>
                </li>
              ))}
            </ul>
            <p className="text-body-sm text-ink-3 max-w-[62ch] mt-4">{c5.reality.note}</p>
          </details>
        </div>
      </section>

      {/* 1 · Where are we? */}
      <Section id="where" label="Question 1" title="Where are we?" intro={c5.model.definition}>
        <p className="text-body text-ink-2 max-w-[62ch] mb-8">{c5.model.how}</p>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {c5.model.lenses.map((l, i) => <StepCard key={l.name} label={`Lens ${i + 1}`} title={l.name} text={l.asks} />)}
        </ol>

        <Sub>The five levels. Choose yours, or take the quick check below.</Sub>
        <LevelPicker level={level} onPick={setLevel} idPrefix="lv" />
        <div className="card mt-4" aria-live="polite">
          {L ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div><span className="text-label text-ink-3 block mb-1">What it looks like</span><p className="text-body-sm text-ink-2">{L.looks}</p></div>
              <div><span className="text-label text-ink-3 block mb-1">Evidence</span><p className="text-body-sm text-ink-2">{L.evidence}</p></div>
              <div><span className="text-label text-ink-3 block mb-1">Skills and partners around you</span><p className="text-body-sm text-ink-2">{L.skills}</p></div>
            </div>
          ) : <p className="text-body-sm text-ink-3">Choose a level to see what it looks like, the evidence for it and the skills around it.</p>}
        </div>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 mt-6">{c5.rules.map(r => <li key={r} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{r}</li>)}</ul>

        <Sub>Go deeper, only if you need to</Sub>
        <Layer title="Quick check: find your level in five minutes" hint="Four scores, one reading. Nothing is saved.">
          <SelfCheck onPick={setLevel} />
        </Layer>
        <Layer title="What each score looks like" hint="Observable evidence for each lens at each level, so scoring is not guesswork.">
          <p className="text-body-sm text-ink-2 max-w-[62ch] mb-6">{c5.model.gridLead}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[860px]">
              <thead><tr><th className="text-label text-ink-3 py-2 pr-4 align-bottom">Lens</th>{c5.levels.map(l => <th key={l.n} className="text-label text-signal-ink py-2 px-3 align-bottom">{l.n} · {l.name}</th>)}</tr></thead>
              <tbody>
                {c5.model.grid.map(r => (
                  <tr key={r.lens} className="hairline-top align-top">
                    <th scope="row" className="text-body-sm text-ink py-4 pr-4 font-medium">{r.lens}</th>
                    {r.cells.map((cell, i) => <td key={i} className="text-body-sm text-ink-2 py-4 px-3">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Layer>
        <Layer title="What “integrated” means" hint="The test that separates a habit from a practice.">
          <p className="text-body text-ink max-w-[62ch]">{c5.integration.definition}</p>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">{c5.integration.test}</p>
          <ol className="grid md:grid-cols-3 gap-4 mt-6">{c5.integration.degrees.map((d, i) => <StepCard key={d.name} label={`Degree ${i + 1}`} title={d.name} text={d.text} />)}</ol>
        </Layer>
        <Layer title="Enablers: what you need around the team" hint="Partners and skills that cap how far the lenses can rise.">
          <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{c5.model.enablers.map((e, i) => <StepCard key={e.name} label={`Enabler ${i + 1}`} title={e.name} text={e.text} />)}</ol>
          <p className="text-body text-ink-2 max-w-[62ch] mt-6">{c5.model.cap}</p>
        </Layer>
        <Layer title="Your sector changes the route" hint="Banking, government, health, enterprise, consumer: what each asks of design.">
          <p className="text-body text-ink-2 max-w-[62ch]">{c5.sector.lead}</p>
          <p className="text-body text-ink max-w-[62ch] mt-4">{c5.sector.rule}</p>
          <p className="card mt-4 text-body-sm" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c5.model.controls}</p>
          <ul className="flex flex-col mt-8">
            {c5.sector.rows.map(r => (
              <li key={r.name} className="hairline-top py-6 grid md:grid-cols-12 gap-x-6 gap-y-3">
                <p className="md:col-span-3 text-label text-signal-ink">{r.name}</p>
                <div className="md:col-span-3"><span className="text-label text-ink-3 block mb-1">What worries them</span><p className="text-body-sm text-ink-2">{r.worry}</p></div>
                <div className="md:col-span-3"><span className="text-label text-ink-3 block mb-1">What it changes</span><p className="text-body-sm text-ink-2">{r.changes}</p></div>
                <div className="md:col-span-3"><span className="text-label text-ink-3 block mb-1">What design can do</span><p className="text-body-sm text-ink-2">{r.design}</p></div>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-3 max-w-[62ch] mt-4">{c5.sector.note}</p>
        </Layer>
        <Worksheets items={W.where} />
      </Section>

      {/* 2 · What next? */}
      <Section id="next" label="Question 2" title="What should we do next?" intro={c5.next.lead}>
        <LevelPicker level={level} onPick={setLevel} idPrefix="nx" />
        <div className="mt-4" aria-live="polite">
          {L ? (
            <>
              <p className="text-body text-ink-2 mb-4">From level {L.n}, {L.name.toLowerCase()}, towards {L.n < 5 ? `level ${L.n + 1}, ${c5.levels[L.n].name.toLowerCase()}` : 'keeping the bar rising'}:</p>
              <ol className="grid md:grid-cols-3 gap-4">
                {L.moves.map((m, i) => <StepCard key={m.title} label={`Move ${i + 1} · lifts ${m.lens}`} title={m.title} text={m.text} />)}
              </ol>
              <p className="text-body-sm text-ink-3 mt-4 max-w-[62ch]">{c5.next.pace}</p>
            </>
          ) : <p className="card text-body-sm text-ink-3">Choose a level above, or run the quick check in question 1, to see your three moves.</p>}
        </div>

        <Sub>Go deeper, only if you need to</Sub>
        <Layer title={c5.next.skillsTitle} hint="Who you need near the team, and three ways to get them.">
          <p className="text-body text-ink-2 max-w-[62ch] mb-6">{c5.next.skillsLead}</p>
          <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">{c5.next.roles.map((r, i) => <StepCard key={r.name} label={`Partner ${i + 1}`} title={r.name} text={r.text} />)}</ol>
          <ol className="grid md:grid-cols-3 gap-4 mt-4">{c5.next.ways.map(w => <StepCard key={w.name} label="Way to get it" title={w.name} text={w.text} />)}</ol>
        </Layer>
        <Layer title={c5.next.watchTitle} hint="Six things that did not worry design teams a few years ago.">
          <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{c5.next.watch.map((w, i) => <StepCard key={w.name} label={`Risk ${i + 1}`} title={w.name} text={w.text} />)}</ol>
        </Layer>
        <Worksheets items={W.next} />
      </Section>

      {/* 3 · How do we know? */}
      <Section id="proof" label="Question 3" title="How do we know it is working?" intro={c5.proof.lead}>
        <ol className="grid md:grid-cols-3 gap-4">{c5.proof.rules.map((r, i) => <StepCard key={r.title} label={`Rule ${i + 1}`} title={r.title} text={r.text} />)}</ol>
        <Sub>{c5.proof.groupsLead}</Sub>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {c5.proof.groups.map((g, i) => (
            <li key={g.name} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">Group {i + 1}</span>
              <h4 className="text-title text-ink">{g.name}</h4>
              <p className="text-body-sm text-ink-2">{g.text}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">For example</span>{g.eg}</p>
            </li>
          ))}
        </ol>

        <Sub>Go deeper, only if you need to</Sub>
        <Layer title={c5.proof.peopleTitle} hint="Capability, development and the juniors on your team.">
          <Bullets items={c5.proof.people} />
        </Layer>
        <Layer title={c5.proof.fearTitle} hint="Three things to say, and one thing to promise.">
          <ol className="grid md:grid-cols-3 gap-4">{c5.proof.fear.map((f, i) => <StepCard key={f.name} label={`Say ${i + 1}`} title={f.name} text={f.text} />)}</ol>
        </Layer>
        <Layer title="Plain words for the jargon" hint="Ten terms managers keep meeting.">
          <dl className="grid md:grid-cols-2 gap-x-10 gap-y-4">{c5.glossary.map(g => <div key={g.term}><dt className="text-body-sm text-ink font-medium">{g.term}</dt><dd className="text-body-sm text-ink-2">{g.def}</dd></div>)}</dl>
        </Layer>
        <p className="card mt-6 text-[1.25rem] font-light" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c5.proof.close}</p>
        <Worksheets items={W.proof} />
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
          <Button to="/resources/leading-design/elevating-design-quality" variant="tertiary" arrow>Chapter 4: Elevating design quality</Button>
        </div>
      </section>
    </>
  )
}
