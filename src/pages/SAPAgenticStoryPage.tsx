import Breadcrumb from '../components/ds/Breadcrumb'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapAgentic as S } from '../data/sapAgentic'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
import { motion } from 'framer-motion'
import AsIsFlow from '../components/agentic/AsIsFlow'
import FlowDiagram from '../components/agentic/FlowDiagram'
import WorklistCompare from '../components/agentic/WorklistCompare'
import ContractWorksheet from '../components/agentic/ContractWorksheet'
import Swimlane from '../components/agentic/Swimlane'
import RiskVisual from '../components/agentic/RiskVisual'
import FlowPlayer from '../components/agentic/FlowPlayer'
import AutonomyLadder from '../components/agentic/AutonomyLadder'

const cs = caseStudies.find(c => c.id === 'sap-agentic')!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

export default function SAPAgenticStoryPage() {
  const total = S.journeys.reduce((a, j) => a + j.screens.length, 0)

  return (
    <div className="bg-surface-0 min-h-screen">
      <header className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-site relative">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic Order Confirmation' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl lg:max-w-[62%]">{S.title}</h1>
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
              <img src={p.img} alt={`${p.name}, ${p.title}`} width={800} height={800} className="w-full aspect-[5/4] object-cover" style={{ objectPosition: '50% 30%' }} loading="lazy" decoding="async" />
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
        <FlowDiagram />
      </Section>

      <Section id="agent">
        <SectionHeader label="05 · Agent definition" title={S.agent.title} intro={S.agent.intro} />
        <dl className="max-w-4xl">
          {S.agent.rows.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8 py-5 hairline-top"><dt className="text-overline text-ink-3 pt-1">{k}</dt><dd className="text-body-lg text-ink-2">{v}</dd></div>
          ))}
        </dl>
      </Section>

      <Section id="contract" tone="raised">
        <SectionHeader label="06 · Human-agent contract" title={S.contract.title} intro={S.contract.intro} />
        <ContractWorksheet d={S.contract} />
      </Section>

      <Section id="hitl">
        <SectionHeader label="07 · Human in the loop" title={S.hitl.title} intro={S.hitl.intro} />
        <Swimlane cols={S.hitl.cols} lanes={S.hitl.lanes as never} legendA={S.hitl.legendA} legendG={S.hitl.legendG} legendH={S.hitl.legendH} />
      </Section>

      <Section id="worklist" tone="raised">
        <SectionHeader label="08 · Worklist definition" title={S.worklist.title} intro={S.worklist.intro} />
        <WorklistCompare roles={S.worklist.roles} columns={S.worklist.columns} />
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
    </div>
  )
}
