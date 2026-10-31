import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { DownloadCard, Section, StepCard } from '../components/leading/ChapterParts'
import { chapters, LEADING_DESIGN_PATH, WORKSHEET_KIT_4 } from '../data/leadingDesign'
import { chapterFour as c4, chapterFourDocs } from '../data/leadingDesignQuality'
import type { Point } from '../data/leadingDesignGrowth'

const ease = [0.16, 1, 0.3, 1] as const
// The Figma file link is set only on the staging project (VITE_LEADING_DESIGN_FIGMA_4). Where it is unset, the button asks to request the file.
const FIGMA: string = import.meta.env.VITE_LEADING_DESIGN_FIGMA_4 || ''
const REQUEST_TEAM = { topic: 'speaking', subject: 'Design excellence for my organisation: Leading Design chapter 4', message: 'I would like to talk about design quality, reviews and future exploration in my organisation.\n\nTeam or programme size:\nWhere we are today:\n' } as const

const docs = (slugs: string[]) => chapterFourDocs.filter(d => slugs.includes(d.slug))
const W = {
  basics: docs(['design-quality-assessment-worksheet', 'harmonisation-audit-worksheet']),
  reviews: docs(['feature-excellence-review-worksheet']),
  future: docs(['future-signals-radar-worksheet', 'north-star-experience-canvas', 'experimentation-canvas', 'experiment-to-scale-assessment']),
  together: docs(['design-excellence-health-check']),
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
function Worksheets({ items, label = 'Worksheets for this part' }: { items: typeof chapterFourDocs; label?: string }) {
  return (<><Sub>{label}</Sub><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map(d => <DownloadCard key={d.slug} d={d} />)}</ul></>)
}
function Rows({ rows }: { rows: { a: string; b: string; c?: string }[] }) {
  return (
    <ul className="flex flex-col">
      {rows.map(r => (
        <li key={r.a} className="hairline-top py-5 grid md:grid-cols-12 gap-x-6 gap-y-1">
          <p className="md:col-span-4 text-label text-signal-ink">{r.a}</p>
          <p className="md:col-span-5 text-body-sm text-ink">{r.b}</p>
          {r.c && <p className="md:col-span-3 text-body-sm text-ink-2">{r.c}</p>}
        </li>
      ))}
    </ul>
  )
}
function Dark({ children, big }: { children: React.ReactNode; big?: boolean }) {
  return <p className={`card mt-4 ${big ? 'text-[1.25rem] font-light' : 'text-body'}`} style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{children}</p>
}

export default function DesignExcellenceChapter() {
  const { open } = useContact()
  const c = chapters[3]
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design', to: LEADING_DESIGN_PATH }, { label: c.title }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Leading Design · Chapter {c.n}</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>{c.title}</motion.h1>
              {c4.intro.map((t, i) => <p key={i} className={`${i === 0 ? 'text-body-lg mt-6' : 'text-body mt-4'} text-ink-2 max-w-2xl`}>{t}</p>)}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={WORKSHEET_KIT_4} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your organisation</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="text-label text-ink-3 mb-3">By the end you will have</p>
              <ul className="flex flex-col gap-3">{c4.outcomes.map(o => <li key={o} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{o}</li>)}</ul>
            </div>
          </div>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-12">
            {[['pillars', '1 Five pillars'], ['basics', '2 Quality and consistency'], ['reviews', '3 Excellence reviews'], ['future', '4 Future forward'], ['together', '5 Working together'], ['worksheets', 'Editable worksheets']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      {/* 1 · Pillars and horizons */}
      <Section id="pillars" label="Part 1" title="Five pillars, two horizons." intro={c4.pillars.lead}>
        <ol className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {c4.pillars.items.map(p => (
            <li key={p.n} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">{p.n} · {p.kind}</span>
              <h3 className="text-title text-ink">{p.name}</h3>
              <p className="text-body-sm text-ink-2">{p.text}</p>
            </li>
          ))}
        </ol>
        <Sub>Two horizons of design leadership</Sub>
        <div className="grid md:grid-cols-2 gap-4">
          {[c4.pillars.now, c4.pillars.next].map(h => (
            <div key={h.tag} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">{h.tag}</span>
              <h3 className="text-heading text-ink">{h.title}</h3>
              <p className="text-body text-ink-2">{h.text}</p>
              <ul className="flex flex-wrap gap-2">{h.bullets.map(b => <li key={b} className="chip">{b}</li>)}</ul>
            </div>
          ))}
        </div>
        <Dark>{c4.pillars.culture}</Dark>
        <div className="mt-10"><Points items={c4.pillars.points} /></div>
      </Section>

      {/* 2 · Quality and consistency */}
      <Section id="basics" label="Part 2" title="Quality and consistency." intro={c4.basics.lead}>
        <Points items={c4.basics.points} />
        <Worksheets items={W.basics} />
      </Section>

      {/* 3 · Excellence reviews */}
      <Section id="reviews" label="Part 3" title="Excellence reviews and release assurance." intro={c4.reviews.lead}>
        <p className="card text-[1.25rem] font-light mb-8" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c4.reviews.challenge}</p>
        <Points items={c4.reviews.points} />

        <Sub>Framework: five things to evaluate</Sub>
        <Lead>{c4.reviews.dimensionsLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {c4.reviews.dimensions.map((d, i) => <StepCard key={d.name} label={`Dimension ${i + 1}`} title={d.name} text={`${d.text} Key question: ${d.q}`} />)}
        </ol>

        <Sub>Framework: three levels of review</Sub>
        <Lead>{c4.reviews.levelsLead}</Lead>
        <ol className="grid md:grid-cols-3 gap-4">
          {c4.reviews.levels.map(l => (
            <li key={l.n} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">Level {l.n} · {l.cx}</span>
              <h4 className="text-title text-ink">{l.name}</h4>
              <p className="text-body-sm text-ink-2">{l.fits}</p>
              <ul className="flex flex-col gap-2">{l.does.map(x => <li key={x} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{x}</li>)}</ul>
              <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">Owner</span>{l.owner}</p>
            </li>
          ))}
        </ol>
        <p className="text-body text-ink-2 max-w-[62ch] mt-6">The important part is writing down the criteria that decide which features enter each level.</p>

        <Sub>Framework: the five gates</Sub>
        <Lead>{c4.reviews.gatesLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {c4.reviews.gates.map(g => <StepCard key={g.n} label={`Gate ${g.n} · ${g.when}`} title={g.name} text={g.q} />)}
        </ol>

        <Sub>Clear outcomes</Sub>
        <Lead>{c4.reviews.outcomesLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {c4.reviews.outcomes.map((o, i) => <StepCard key={o.name} label={`Outcome ${i + 1}`} title={o.name} text={`${o.meaning} Next: ${o.next}`} />)}
        </ol>
        <Dark>Non-negotiable: critical usability, accessibility, security-related or functional issues are not waived because a deadline is close.</Dark>

        <Sub>The review panel</Sub>
        <Lead>{c4.reviews.panelLead}</Lead>
        <Rows rows={c4.reviews.panel.map(p => ({ a: p.role, b: p.does }))} />
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-8">{c4.reviews.principles.map(p => <li key={p} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{p}</li>)}</ul>

        <Sub>Measuring the reviews</Sub>
        <Lead>{c4.reviews.metricsLead}</Lead>
        <Rows rows={c4.reviews.metrics.map(m => ({ a: m.name, b: m.tells }))} />
        <p className="text-body text-ink-2 max-w-[62ch] mt-6">{c4.reviews.caution}</p>
        <Worksheets items={W.reviews} label="Worksheet for this part" />
      </Section>

      {/* 4 · Future forward */}
      <Section id="future" label="Part 4" title="Future forward and experience innovation." intro={c4.future.lead}>
        <p className="card text-[1.25rem] font-light mb-8" style={{ background: 'var(--field-teal)', color: '#ECEDEF' }}>{c4.future.challenge}</p>
        <Points items={c4.future.points} />

        <Sub>Framework: four responsibilities</Sub>
        <Lead>{c4.future.respLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {c4.future.resp.map((r, i) => <StepCard key={r.name} label={`Responsibility ${i + 1}`} title={r.name} text={r.text} how={r.does} />)}
        </ol>

        <Sub>Five territories to explore</Sub>
        <Lead>{c4.future.territoriesLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {c4.future.territories.map((t, i) => <StepCard key={t.name} label={`Territory ${i + 1}`} title={t.name} text={`${t.text} For example: ${t.eg.toLowerCase()}.`} />)}
        </ol>

        <Sub>Framework: from north star to product adoption</Sub>
        <Lead>{c4.future.pipelineLead}</Lead>
        <ol className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {c4.future.pipeline.map(s => <StepCard key={s.n} label={`Stage ${s.n} · ${s.verb}`} title={s.name} text={s.text} watch={s.out} />)}
        </ol>

        <Sub>How to organise it</Sub>
        <Lead>{c4.future.modelsLead}</Lead>
        <div className="grid md:grid-cols-2 gap-4">
          {c4.future.models.map(m => (
            <div key={m.name} className="card flex flex-col gap-4">
              <h4 className="text-title text-ink">{m.name}</h4>
              <div><span className="text-label text-ink-3 block mb-2">Strengths</span><ul className="flex flex-col gap-1.5">{m.pros.map(x => <li key={x} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{x}</li>)}</ul></div>
              <div><span className="text-label text-ink-3 block mb-2">Risks</span><ul className="flex flex-col gap-1.5">{m.cons.map(x => <li key={x} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{x}</li>)}</ul></div>
            </div>
          ))}
        </div>
        <Dark>{c4.future.hybrid}</Dark>
        <div className="mt-8"><Rows rows={c4.future.lab.map(l => ({ a: l.role, b: l.does }))} /></div>
        <p className="text-body-sm text-ink-3 max-w-[62ch] mt-4">{c4.future.labNote}</p>

        <Sub>A protected calendar</Sub>
        <Lead>{c4.future.calendarLead}</Lead>
        <Rows rows={c4.future.calendar.map(x => ({ a: x.name, b: x.what, c: x.cadence }))} />

        <Sub>Measuring it differently</Sub>
        <Lead>{c4.future.metricsLead}</Lead>
        <Rows rows={c4.future.metrics.map(m => ({ a: m.name, b: m.tells }))} />
        <p className="text-body text-ink-2 max-w-[62ch] mt-6">{c4.future.caution}</p>
        <Worksheets items={W.future} label="Worksheets for this part" />
      </Section>

      {/* 5 · Together */}
      <Section id="together" label="Part 5" title="Working together." intro={c4.together.lead}>
        <Sub>Collaboration inside each pillar</Sub>
        <Rows rows={c4.together.rows.map(r => ({ a: r.pillar, b: r.how }))} />
        <Sub>The operating calendar</Sub>
        <Lead>{c4.together.calendarLead}</Lead>
        <Rows rows={c4.together.calendar.map(x => ({ a: x.name, b: x.owner, c: x.cadence }))} />
        <Dark big>{c4.together.close}</Dark>
        <Worksheets items={W.together} label="Worksheet for this part" />
      </Section>

      <Section id="worksheets" label="Everything in one place" title="All the worksheets for this chapter." intro="Print them, or fill them in on the page, with a filled example beside each. Your notes stay in your browser.">
        <div className="card flex flex-col gap-4 mb-8" style={{ background: 'var(--field-teal)' }}>
          <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Editable worksheets</span>
          <p className="text-[1.25rem] font-light max-w-[52ch]" style={{ color: '#ECEDEF' }}>Type straight into each worksheet, then switch to the filled example (a fictional company, NorthStar) to see how it is used.</p>
          <div className="flex flex-wrap gap-3">
            <a href={WORKSHEET_KIT_4} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open the editable worksheets<span className="sr-only"> (opens in a new tab)</span></a>
            {FIGMA
              ? <a href={FIGMA} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open in Figma<span className="sr-only"> (opens in a new tab)</span></a>
              : <Button variant="secondary" onClick={() => open({ topic: 'resource', subject: 'Request - Leading Design chapter 4 worksheets (Figma)', message: 'I would like to request the editable Figma worksheets for Leading Design chapter 4, Elevating design quality at the organisation.' })}>Request the Figma file</Button>}
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{chapterFourDocs.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to={LEADING_DESIGN_PATH} variant="tertiary">Back to Leading Design</Button>
          <Button to="/resources/leading-design/ai-maturity-for-design-orgs" variant="tertiary" arrow>Chapter 5: AI maturity</Button>
        </div>
      </section>
    </>
  )
}
