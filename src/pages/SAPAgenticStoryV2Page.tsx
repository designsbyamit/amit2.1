import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { caseStudies } from '../data/work'
import { sapAgenticV2 as S } from '../data/sapAgenticV2'
import { story as T, type Chapter } from '../data/sapAgenticV2Story'
import AsIsFlowV2 from '../components/agentic/v2/AsIsFlowV2'
import StickyInsights from '../components/agentic/v2/StickyInsights'
import ContractV2 from '../components/agentic/v2/ContractV2'
import SwimlaneV2 from '../components/agentic/v2/SwimlaneV2'
import FlowDiagramV2 from '../components/agentic/v2/FlowDiagramV2'
import FlowPlayerV2 from '../components/agentic/v2/FlowPlayerV2'
import RiskLogic from '../components/agentic/v2/RiskLogic'
import PatternLoop from '../components/agentic/v2/Patterns'
import RiskVisual from '../components/agentic/RiskVisual'
import AutonomyLadder from '../components/agentic/AutonomyLadder'

const cs = caseStudies.find(c => c.id === 'sap-agentic')!
const shot = (id: string) => `${import.meta.env.BASE_URL}images/case-studies/sap-agentic/${id}.webp`

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

/** Chapter number, a question or claim as the title, and who shaped it: shared, then what I drove. */
function Head({ c }: { c: Chapter }) {
  return (
    <header className="mb-14 md:mb-16">
      <p className="text-label text-ink-3">Chapter {c.n}</p>
      <h2 className="text-display-l text-white mt-4 max-w-4xl">{c.title}</h2>
      <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">{c.intro}</p>
      {c.together && (
        <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-3 mt-8 max-w-4xl hairline-top pt-5">
          <div><dt className="text-label text-ink-3">Together</dt><dd className="text-body text-ink-2 mt-1">{c.together}</dd></div>
          <div><dt className="text-label text-signal-ink">I drove</dt><dd className="text-body text-white mt-1">{c.drove}</dd></div>
        </dl>
      )}
    </header>
  )
}

export default function SAPAgenticStoryV2Page() {
  const imgs = Object.fromEntries(S.journeys.flatMap(j => j.screens).map(sc => [sc.id, sc.img]))
  const C = T.chapters
  return (
    <div className="bg-surface-0 min-h-screen">
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic Order Confirmations' }]} />
          <p className="text-label text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl lg:max-w-[62%]">{T.hero.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">{T.hero.strap}</p>
          <div className="mt-8"><Button to="/craft/sap-agentic/film" arrow>Watch the 2-minute film</Button></div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-5xl">
            {T.hero.facts.map(([k, v]) => (
              <div key={k}><dt className="text-label text-ink-3">{k}</dt><dd className="v2-item text-white mt-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <Section id="context" tone="raised">
        <p className="text-label text-ink-3">{T.context.label}</p>
        <h2 className="text-display-l text-white mt-4 max-w-4xl">{T.context.title}</h2>
        <div className="mt-8 flex flex-col gap-5 max-w-measure-xl">
          {T.context.paras.map(p => <p key={p} className="text-body-lg text-ink-2">{p}</p>)}
        </div>
      </Section>

      <Section id={C.problem.id}>
        <Head c={C.problem} />
        <AsIsFlowV2 steps={T.asis} />
        <h3 className="text-heading text-white mt-20">{T.stickiesTitle}</h3>
        <StickyInsights notes={T.stickies} />
      </Section>

      <Section id={C.people.id} tone="raised">
        <Head c={C.people} />
        <div className="grid md:grid-cols-3 gap-4">
          {S.personas.map((p, i) => (
            <motion.article key={p.id} className="card !p-0 overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <img src={p.img} alt={`${p.name}, ${p.title}`} width={600} height={600} className="w-full aspect-square object-cover bg-white" loading="lazy" decoding="async" />
              <div className="p-6">
                <p className="text-label text-ink-3">{p.role}</p>
                <p className="v2-item text-white mt-2">{p.name}</p>
                <p className="text-body text-ink-3">{p.title}</p>
                <p className="text-label text-signal-ink mt-6">Their struggle</p>
                <p className="text-body text-ink-2 mt-2">{p.struggle}</p>
                <p className="text-label text-ink-3 mt-6">They own</p>
                <ul className="mt-2 space-y-2">{p.resp.map(r => <li key={r} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{r}</li>)}</ul>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id={C.contract.id}>
        <Head c={C.contract} />
        <ol className="grid md:grid-cols-3 gap-x-8">
          {T.principles.map((p, i) => (
            <li key={p.t} className="hairline-top py-6">
              <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="v2-item text-white mt-2">{p.t}</p>
              <p className="text-body text-ink-2 mt-2">{p.d}</p>
            </li>
          ))}
        </ol>
        <h3 className="text-heading text-white mt-16">{T.agentTitle}</h3>
        <dl className="max-w-4xl mt-4">
          {T.agent.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-8 py-4 hairline-top"><dt className="text-label text-ink-3 pt-1">{k}</dt><dd className="text-body text-ink-2">{v}</dd></div>
          ))}
        </dl>
        <h3 className="text-heading text-white mt-16">{T.contractTitle}</h3>
        <p className="text-body text-ink-2 mt-3 mb-8 max-w-measure-xl">{T.contractIntro}</p>
        <ContractV2 />
        <h3 className="text-heading text-white mt-16">{T.hitlTitle}</h3>
        <p className="text-body text-ink-2 mt-3 mb-8 max-w-measure-xl">{T.hitlIntro}</p>
        <SwimlaneV2 cols={S.hitl.cols} lanes={S.hitl.lanes as never} legendA={S.hitl.legendA} legendG={S.hitl.legendG} legendH={S.hitl.legendH} />
      </Section>

      <Section id={C.flow.id} tone="raised">
        <Head c={C.flow} />
        <FlowDiagramV2 />
        <div className="mt-20">
          <FlowPlayerV2 imgs={imgs} title="Order 1505899" intro="Real screens from the prototype, played in order." />
        </div>
      </Section>

      <Section id={C.risk.id}>
        <Head c={C.risk} />
        <RiskLogic formula={T.riskFormula} rows={T.riskRows} />
        <p className="text-body text-ink-3 mt-6 max-w-measure-xl">{T.riskNote}</p>
        <h3 className="text-heading text-white mt-16 mb-8">{T.riskAppliedTitle}</h3>
        <RiskVisual chain={S.risk.chain} examples={S.risk.examples} orderRisk={S.risk.orderRisk} confidence={S.risk.confidence} note="Real differences from one order in the prototype." />
        <h3 className="text-heading text-white mt-20">{T.scenariosTitle}</h3>
        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {T.scenarios.map(sc => (
            <div key={sc.t}>
              <figure className="m-0 rounded-3 overflow-hidden border border-[color:var(--line-1)] bg-surface-1">
                <img src={shot(sc.shot)} alt={sc.t} width={2880} height={1798} className="w-full h-auto block" loading="lazy" decoding="async" />
              </figure>
              <p className="v2-item text-white mt-5">{sc.t}</p>
              <p className="text-body text-ink-2 mt-2">{sc.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id={C.patterns.id} tone="raised">
        <Head c={C.patterns} />
        <div className="flex flex-col gap-s120 md:gap-s160">
          {T.patterns.map(pt => (
            <article key={pt.n} id={`pattern-${pt.n}`} className="scroll-mt-24 grid lg:grid-cols-12 gap-x-s80 gap-y-s40 items-start">
              <div className="lg:col-span-5">
                <p className="text-label text-signal-ink">Pattern {pt.n}</p>
                <h3 className="text-heading text-white mt-s20">{pt.name}</h3>
                <dl className="mt-s40 flex flex-col gap-s30">
                  <div><dt className="text-label text-ink-3">The problem</dt><dd className="text-body text-ink-2 mt-s10">{pt.problem}</dd></div>
                  <div><dt className="text-label text-ink-3">The decision</dt><dd className="text-body text-ink-2 mt-s10">{pt.decision}</dd></div>
                  <div><dt className="text-label text-ink-3">Where else</dt><dd className="text-body text-ink-2 mt-s10">{pt.reuse}</dd></div>
                </dl>
              </div>
              <div className="lg:col-span-7"><PatternLoop frames={pt.frames} name={pt.name} /></div>
            </article>
          ))}
        </div>
      </Section>

      <Section id={C.next.id}>
        <Head c={C.next} />
        <AutonomyLadder levels={S.autonomy.levels as never} next={T.next.list} />
        <div className="mt-s120 max-w-measure-xl">
          <p className="text-label text-ink-3">{T.next.restsTitle}</p>
          <ul className="mt-s20">{T.next.rests.map(t => <li key={t} className="hairline-top py-s20 text-body text-ink-2">{t}</li>)}</ul>
        </div>
        <div className="mt-s80 flex flex-wrap gap-s20">
          <Link to="/craft" className="btn btn-secondary">All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about agentic AI</Link>
        </div>
      </Section>
    </div>
  )
}
