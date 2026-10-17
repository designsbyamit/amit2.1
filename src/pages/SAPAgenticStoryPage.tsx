import Breadcrumb from '../components/ds/Breadcrumb'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapAgentic as S } from '../data/sapAgentic'
import type { AScreen } from '../data/sapAgentic'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
import { motion } from 'framer-motion'
import AsIsFlow from '../components/agentic/AsIsFlow'
import Architecture from '../components/agentic/Architecture'
import ContractWorksheet from '../components/agentic/ContractWorksheet'
import Swimlane from '../components/agentic/Swimlane'
import RiskVisual from '../components/agentic/RiskVisual'
import FlowPlayer from '../components/agentic/FlowPlayer'
import AutonomyLadder from '../components/agentic/AutonomyLadder'

const cs = caseStudies.find(c => c.id === 'sap-agentic')!
const shotOf = (id: string) => S.journeys.flatMap(j => j.screens).find(s => s.id === id)!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

export default function SAPAgenticStoryPage() {
  const [active, setActive] = useState(S.journeys[0].id)
  const [zoom, setZoom] = useState<AScreen | null>(null)
  const journey = S.journeys.find(j => j.id === active)!
  const total = S.journeys.reduce((a, j) => a + j.screens.length, 0)

  return (
    <div className="bg-surface-0 min-h-screen">
      <header className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-site">
          <Breadcrumb items={[{ label: 'Craft', to: '/craft' }, { label: 'Agentic Order Confirmation' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{S.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-[60ch]">{cs.tagline}</p>
          <div className="mt-8"><Button to="/craft/sap-agentic/film" arrow>Watch the 2-minute film</Button></div>
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="tag">{S.kicker}</span>
            {S.pillars.map(p => <span key={p} className="tag">{p}</span>)}
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-4xl">
            {[['Role', cs.role], ['Domain', cs.domain], ['Personas', '3'], ['Screens', String(total)]].map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <Section id="framing">
        <SectionHeader label="01 · The business problem" title={S.framing.title} intro={S.framing.intro} />
        <AsIsFlow title={S.framing.asisTitle} steps={S.framing.asis} nuances={S.framing.nuances} />
      </Section>

      <Section id="personas" tone="raised">
        <SectionHeader label="02 · Personas" title={S.personasTitle} intro="Three roles share one order and see it differently." />
        <div className="grid md:grid-cols-3 gap-4">
          {S.personas.map((p, i) => (
            <motion.article key={p.id} className="card !p-0 overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <img src={p.img} alt={`${p.name}, ${p.title}`} width={900} height={900} className="w-full aspect-[16/10] object-cover" loading="lazy" decoding="async" />
              <div className="p-6">
                <p className="text-overline text-ink-3">{p.role}</p>
                <p className="text-title text-white mt-2">{p.name}</p>
                <p className="text-body-sm text-ink-3">{p.title}</p>
                <p className="text-label text-signal-ink mt-6">Their struggle</p>
                <p className="text-body text-ink-2 mt-2">{p.struggle}</p>
                <p className="text-label text-ink-3 mt-6">They own</p>
                <ul className="mt-2 space-y-2">{p.resp.map(r => <li key={r} className="text-body-sm text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">&mdash;</span>{r}</li>)}</ul>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="role">
        <SectionHeader label="03 · My role" title={S.role.title} intro={S.role.intro} />
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {S.role.items.map((it, i) => (
            <li key={it.title} className="hairline-top py-6">
              <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-title text-white mt-2">{it.title}</p>
              <p className="text-body text-ink-2 mt-2">{it.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="architecture" tone="raised">
        <SectionHeader label="04 · Flow architecture" title={S.architecture.title} intro={S.architecture.intro} />
        <Architecture stages={S.architecture.stages.map(st => ({ ...st, img: shotOf(st.shot).img, name: shotOf(st.shot).name }))} onZoom={i => setZoom(shotOf(S.architecture.stages[i].shot))} />
      </Section>

      <Section id="contract">
        <SectionHeader label="05 · Human-agent contract" title={S.contract.title} intro={S.contract.intro} />
        <ContractWorksheet d={S.contract} />
      </Section>

      <Section id="agent" tone="raised">
        <SectionHeader label="06 · Agent definition" title={S.agent.title} intro={S.agent.intro} />
        <dl className="max-w-4xl">
          {S.agent.rows.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8 py-5 hairline-top"><dt className="text-overline text-ink-3 pt-1">{k}</dt><dd className="text-body-lg text-ink-2">{v}</dd></div>
          ))}
        </dl>
      </Section>

      <Section id="hitl">
        <SectionHeader label="07 · Human in the loop" title={S.hitl.title} intro={S.hitl.intro} />
        <Swimlane cols={S.hitl.cols} lanes={S.hitl.lanes as never} legendA={S.hitl.legendA} legendG={S.hitl.legendG} legendH={S.hitl.legendH} />
      </Section>

      <Section id="worklist" tone="raised">
        <SectionHeader label="08 · Worklist definition" title={S.worklist.title} intro={S.worklist.intro} />
        <div className="grid md:grid-cols-3 gap-6">
          {S.worklist.roles.map((r, i) => {
            const sh = shotOf(r.shot)
            return (
              <motion.div key={r.who} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <button type="button" onClick={() => setZoom(sh)} className="block w-full rounded-lg overflow-hidden border focus-visible:outline-2" style={{ borderColor: 'var(--line-2)', cursor: 'zoom-in' }} aria-label={`Enlarge screen: ${sh.name}`}>
                  <img src={sh.img} alt={sh.name} width={1440} height={899} className="w-full aspect-[4/3] object-cover bg-white block" style={{ objectPosition: r.pos }} loading="lazy" decoding="async" />
                </button>
                <h3 className="text-title text-white mt-5">{r.who}</h3>
                <ul className="mt-3 space-y-2">{r.points.map(pt => <li key={pt} className="text-body-sm text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">&mdash;</span>{pt}</li>)}</ul>
              </motion.div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 hairline-top">
          <span className="text-overline text-ink-3 mr-3">Shared columns</span>
          {S.worklist.anatomy.map(c => <span key={c} className="tag">{c}</span>)}
        </div>
      </Section>

      <Section id="risk">
        <SectionHeader label="09 · Risk scoring" title={S.risk.title} intro={S.risk.intro} />
        <RiskVisual chain={S.risk.chain} examples={S.risk.examples} orderRisk={S.risk.orderRisk} confidence={S.risk.confidence} note={S.risk.note} />
      </Section>

      <Section id="prototype" tone="raised">
        <SectionHeader label="10 · The whole flow" title={S.prototype.title} intro={S.prototype.intro} />
        <FlowPlayer imgs={Object.fromEntries(S.journeys.flatMap(j => j.screens).map(sc => [sc.id, sc.img]))} title="Order 1505899" intro="Real screens from the prototype, played in order." />
      </Section>

      <Section id="autonomy">
        <SectionHeader label="11 · Autonomy" title={S.autonomy.title} intro={S.autonomy.intro} />
        <AutonomyLadder levels={S.autonomy.levels as never} next={S.autonomy.next} />
      </Section>

      <Section id="outcome" tone="raised">
        <SectionHeader label="12 · Outcome" title="Built to take weeks down to hours." intro={cs.outcome} />
        <div className="grid md:grid-cols-3 gap-4">
          {(cs.highlights ?? []).map(h => <blockquote key={h} className="card text-body-lg text-white m-0">{h}</blockquote>)}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/craft" className="btn btn-secondary">All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about agentic AI</Link>
        </div>
      </Section>

      <Section id="experience" tone="raised">
        <SectionHeader label="13 · All screens" title="Every screen, by journey." intro="Built with native enterprise UI components. Pick a journey and select any screen to enlarge it." />
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Journeys">
          {S.journeys.map(j => (
            <button key={j.id} type="button" role="tab" aria-selected={j.id === active} className="chip" aria-pressed={j.id === active} onClick={() => setActive(j.id)}>
              {j.label} · {j.title.split(':')[0]}
            </button>
          ))}
        </div>
        <div role="tabpanel" key={journey.id}>
          <h3 className="text-heading text-white">{journey.title}</h3>
          <p className="text-body-lg text-ink-2 mt-4 max-w-[65ch]">{journey.summary}</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {journey.screens.map((s, i) => (
              <figure key={s.id} className="m-0">
                <button type="button" onClick={() => setZoom(s)} className="block w-full rounded-lg overflow-hidden border focus-visible:outline-2" style={{ borderColor: 'var(--line-2)', cursor: 'zoom-in' }} aria-label={`Enlarge screen ${i + 1}: ${s.name}`}>
                  <img src={s.img} alt={`${journey.title}: ${s.name}`} width={1440} height={899} className="w-full h-auto block bg-white" loading="lazy" decoding="async" />
                </button>
                <figcaption className="text-caption text-ink-3 mt-3">{journey.label}.{i + 1} — {s.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {zoom && <Lightbox screen={zoom} onClose={() => setZoom(null)} />}
    </div>
  )
}

function Lightbox({ screen, onClose }: { screen: AScreen; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label={screen.name} className="fixed inset-0 z-[100] bg-black/90 overflow-auto" onClick={onClose}>
      <div className="min-h-full flex flex-col items-center justify-center p-4 md:p-10 gap-4">
        <img src={screen.img} alt={screen.name} className="max-w-full max-h-[calc(100vh-7rem)] w-auto h-auto bg-white rounded-md" onClick={e => e.stopPropagation()} />
        <div className="flex items-center gap-4">
          <span className="text-caption text-ink-2">{screen.name}</span>
          <a href={screen.img} target="_blank" rel="noopener noreferrer" className="text-caption text-ink-2 hover:text-white underline" onClick={e => e.stopPropagation()}>Open at full resolution ↗</a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} autoFocus>Close</button>
        </div>
      </div>
    </div>
  )
}
