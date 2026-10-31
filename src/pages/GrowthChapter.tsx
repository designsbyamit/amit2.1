import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { DownloadCard, Section, StepCard } from '../components/leading/ChapterParts'
import { chapters, LEADING_DESIGN_PATH, WORKSHEET_KIT_2 } from '../data/leadingDesign'
import { chapterTwo as c2, chapterTwoDocs } from '../data/leadingDesignGrowth'
import type { Point } from '../data/leadingDesignGrowth'

const ease = [0.16, 1, 0.3, 1] as const
// The Figma file link is set only on the staging project (VITE_LEADING_DESIGN_FIGMA_2). Where it is unset, the button asks to request the file.
const FIGMA: string = import.meta.env.VITE_LEADING_DESIGN_FIGMA_2 || ''
const REQUEST_TEAM = { topic: 'speaking', subject: 'Growth and performance for my managers: Leading Design chapter 2', message: 'I would like to talk about feedback, performance and growth in my organisation.\n\nTeam or programme size:\nWhere we are today:\n' } as const

const docs = (slugs: string[]) => chapterTwoDocs.filter(d => slugs.includes(d.slug))
const W = {
  feedback: docs(['feedback-preparation-worksheet', 'feedback-cadence-and-tenets-worksheet']),
  performance: docs(['team-member-one-pager', 'goal-cascade-and-metrics-worksheet', 'next-level-recommendation-worksheet']),
  growth: docs(['growth-definition-worksheet']),
  example: docs(['team-dynamics-and-trust-map']),
}

function Points({ items, wordFor = 'Point' }: { items: Point[]; wordFor?: string }) {
  return (
    <ol className="grid md:grid-cols-2 gap-4">
      {items.map((p, i) => (
        <li key={p.title} className={`card flex flex-col gap-4 ${items.length % 2 === 1 && i === items.length - 1 ? 'md:col-span-2' : ''}`}>
          <span className="text-label text-signal-ink">{wordFor} {String(i + 1).padStart(2, '0')}</span>
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
function Worksheets({ items, label = 'Worksheets for this part' }: { items: typeof chapterTwoDocs; label?: string }) {
  return (<><Sub>{label}</Sub><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map(d => <DownloadCard key={d.slug} d={d} />)}</ul></>)
}

export default function GrowthChapter() {
  const { open } = useContact()
  const c = chapters[1]
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design', to: LEADING_DESIGN_PATH }, { label: 'Growth and performance metrics' }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Leading Design · Chapter {c.n}</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>Growth and performance metrics for design teams</motion.h1>
              {c2.intro.map((t, i) => <p key={i} className={`${i === 0 ? 'text-body-lg mt-6' : 'text-body mt-4'} text-ink-2 max-w-2xl`}>{t}</p>)}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={WORKSHEET_KIT_2} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="text-label text-ink-3 mb-3">By the end you will have</p>
              <ul className="flex flex-col gap-3">{c2.outcomes.map(o => <li key={o} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{o}</li>)}</ul>
            </div>
          </div>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-12">
            {[['feedback', '1 Giving feedback'], ['performance', '2 Performance'], ['growth', '3 People’s growth'], ['example', '4 Lead by example'], ['worksheets', 'Editable worksheets']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      {/* 1 · Giving feedback */}
      <Section id="feedback" label="Part 1" title="Giving feedback." intro={c2.feedback.lead}>
        <Points items={c2.feedback.points} />

        <Sub>Framework: five ways to give feedback</Sub>
        <Lead>{c2.feedback.methodsLead}</Lead>
        <ol className="grid md:grid-cols-2 gap-4">
          {c2.feedback.methods.map((m, i) => (
            <li key={m.name} className={`card flex flex-col gap-4 ${c2.feedback.methods.length % 2 === 1 && i === c2.feedback.methods.length - 1 ? 'md:col-span-2' : ''}`}>
              <span className="text-label text-signal-ink">Method {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-title text-ink">{m.name}</h3>
              <p className="text-body-sm text-ink-2">{m.what}</p>
              <p className="text-body-sm text-ink-2"><span className="text-label text-ink-3 block mb-1">Use it when</span>{m.when}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">Watch for</span>{m.watch}</p>
            </li>
          ))}
        </ol>

        <Sub>Framework: {c2.feedback.objective.title.toLowerCase()}</Sub>
        <Lead>{c2.feedback.objective.lead}</Lead>
        <ol className="grid md:grid-cols-4 gap-4">
          {c2.feedback.objective.steps.map((s, i) => <StepCard key={s.title} label={`Move ${i + 1}`} title={s.title} text={s.text} />)}
        </ol>
        <p className="card mt-4 text-body text-ink" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c2.feedback.objective.test}</p>

        <Sub>Setting the cadence, and the tenets</Sub>
        <Lead>{c2.feedback.cadenceLead}</Lead>
        <ol className="grid md:grid-cols-4 gap-4">
          {c2.feedback.cadence.map((s, i) => <StepCard key={s.title} label={`Rhythm ${i + 1}`} title={s.title} text={s.text} />)}
        </ol>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mt-10">
          <div>
            <p className="text-body text-ink-2 max-w-[48ch]">{c2.feedback.tenetsLead}</p>
            <p className="text-body text-ink-2 max-w-[48ch] mt-4">{c2.feedback.receive}</p>
          </div>
          <ul className="flex flex-col gap-3">{c2.feedback.tenets.map(t => <li key={t} className="card text-body-sm text-ink">{t}</li>)}</ul>
        </div>
        <Worksheets items={W.feedback} />
      </Section>

      {/* 2 · Performance management */}
      <Section id="performance" label="Part 2" title="Managing performance." intro={c2.performance.lead}>
        <Points items={c2.performance.points} />

        <Sub>Framework: {c2.performance.cascade.title.toLowerCase()}</Sub>
        <Lead>{c2.performance.cascade.lead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c2.performance.cascade.steps.map((s, i) => <StepCard key={s.title} label={`Step ${String(i + 1).padStart(2, '0')}`} title={s.title} text={s.text} />)}
        </ol>
        <dl className="grid sm:grid-cols-5 gap-x-6 gap-y-4 mt-8 pt-8 hairline-top">
          {c2.performance.cascade.smart.map(s => (
            <div key={s.term}><dt className="text-label text-signal-ink mb-1">{s.term}</dt><dd className="text-body-sm text-ink-2">{s.text}</dd></div>
          ))}
        </dl>

        <Sub>Framework: {c2.performance.recommend.title.toLowerCase()}</Sub>
        <Lead>{c2.performance.recommend.lead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c2.performance.recommend.steps.map((s, i) => <StepCard key={s.title} label={`Step ${String(i + 1).padStart(2, '0')}`} title={s.title} text={s.text} />)}
        </ol>
        <p className="card mt-4 text-[1.25rem] font-light" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c2.performance.recommend.close}</p>

        <Sub>{c2.performance.shortfall.title}</Sub>
        <Lead>{c2.performance.shortfall.lead}</Lead>
        <ol className="grid md:grid-cols-4 gap-4">
          {c2.performance.shortfall.steps.map((s, i) => <StepCard key={s.title} label={`Step ${i + 1}`} title={s.title} text={s.text} />)}
        </ol>
        <Worksheets items={W.performance} />
      </Section>

      {/* 3 · People's growth */}
      <Section id="growth" label="Part 3" title="People’s growth." intro={c2.growth.lead}>
        <Points items={c2.growth.points} />

        <Sub>Framework: five dimensions of growth</Sub>
        <Lead>{c2.growth.dimensionsLead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c2.growth.dimensions.map((d, i) => (
            <li key={d.name} className="card flex flex-col gap-4">
              <span className="text-label text-signal-ink">Dimension {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-title text-ink">{d.name}</h3>
              <p className="text-body-sm text-ink-2">{d.means}</p>
              <p className="text-body-sm text-ink-2"><span className="text-label text-ink-3 block mb-1">Ask</span>{d.ask}</p>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">You can</span>{d.do}</p>
            </li>
          ))}
        </ol>

        <Sub>When the next level is not the right step</Sub>
        <Lead>{c2.growth.noStepLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {c2.growth.noStep.map(s => <StepCard key={s.title} label="Growth still looks like" title={s.title} text={s.text} />)}
        </ol>
        <Worksheets items={W.growth} label="Worksheet for this part" />
      </Section>

      {/* 4 · What is wrong with lead by example */}
      <Section id="example" label="Part 4" title="What is wrong with “lead by example”." intro={c2.example.lead}>
        <Points items={c2.example.points} />

        <Sub>Framework: example, or influence?</Sub>
        <Lead>{c2.example.choiceLead}</Lead>
        <ul className="flex flex-col">
          {c2.example.choice.map(r => (
            <li key={r.situation} className="hairline-top py-6 grid md:grid-cols-12 gap-x-6 gap-y-2">
              <p className="md:col-span-5 text-body text-ink">{r.situation}</p>
              <p className="md:col-span-3 text-label text-signal-ink">{r.way}</p>
              <p className="md:col-span-4 text-body-sm text-ink-2">{r.how}</p>
            </li>
          ))}
        </ul>

        <Sub>Framework: {c2.example.trust.title.toLowerCase()}</Sub>
        <Lead>{c2.example.trust.lead}</Lead>
        <ol className="grid md:grid-cols-4 gap-4">
          {c2.example.trust.steps.map((s, i) => <StepCard key={s.title} label={`Habit ${i + 1}`} title={s.title} text={s.text} />)}
        </ol>
        <p className="text-body text-ink-2 max-w-[62ch] mt-6">{c2.example.trust.note}</p>
        <Worksheets items={W.example} label="Worksheet for this part" />
      </Section>

      <Section id="worksheets" label="Everything in one place" title="All the worksheets for this chapter." intro="Print them, or fill them in on the page, with a filled example beside each. Your notes stay in your browser.">
        <div className="card flex flex-col gap-4 mb-8" style={{ background: 'var(--field-teal)' }}>
          <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Editable worksheets</span>
          <p className="text-[1.25rem] font-light max-w-[52ch]" style={{ color: '#ECEDEF' }}>Type straight into each worksheet, then switch to the filled example (a fictional company, NorthStar) to see how it is used.</p>
          <div className="flex flex-wrap gap-3">
            <a href={WORKSHEET_KIT_2} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
            {FIGMA
              ? <a href={FIGMA} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open in Figma<span className="sr-only"> (opens in a new tab)</span></a>
              : <Button variant="secondary" onClick={() => open({ topic: 'resource', subject: 'Request - Leading Design chapter 2 worksheets (Figma)', message: 'I would like to request the editable Figma worksheets for Leading Design chapter 2, Growth and performance metrics.' })}>Request the Figma file</Button>}
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{chapterTwoDocs.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to={LEADING_DESIGN_PATH} variant="tertiary">Back to Leading Design</Button>
          <Button to="/resources/leading-design/building-a-design-team" variant="tertiary" arrow>Chapter 1: Building a design team</Button>
        </div>
      </section>
    </>
  )
}
