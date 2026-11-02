import { useEffect } from 'react'
import Breadcrumb from '../components/ds/Breadcrumb'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapAgenticV2 as S } from '../data/sapAgenticV2'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
import { motion } from 'framer-motion'
import AsIsFlow from '../components/agentic/AsIsFlow'
import FlowDiagram from '../components/agentic/FlowDiagram'
import ContractWorksheet from '../components/agentic/ContractWorksheet'
import Swimlane from '../components/agentic/Swimlane'
import RiskVisual from '../components/agentic/RiskVisual'
import FlowPlayer from '../components/agentic/FlowPlayer'
import AnimThumb from '../components/ds/AnimThumb'
import AutonomyLadder from '../components/agentic/AutonomyLadder'

const cs = caseStudies.find(c => c.id === 'sap-agentic')!
const C = S.chapters

const shot = (id: string) => `${import.meta.env.BASE_URL}images/case-studies/sap-agentic/${id}.webp`

/** One line that hands the reader from one chapter to the next. */
function Bridge({ text }: { text: string }) {
  return <p className="text-body-lg text-ink-3 mt-14 md:mt-20 max-w-measure-l hairline-top pt-6">{text}</p>
}

function Frame({ id, alt }: { id: string; alt: string }) {
  return (
    <figure className="m-0 rounded-3 overflow-hidden border border-[color:var(--line-1)] bg-surface-1">
      <img src={shot(id)} alt={alt} width={2880} height={1798} className="w-full h-auto block" loading="lazy" decoding="async" />
    </figure>
  )
}

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

export default function SAPAgenticStoryV2Page() {
  const total = S.journeys.reduce((a, j) => a + j.screens.length, 0)
  useEffect(() => {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'; document.head.appendChild(m)
    return () => { m.remove() }
  }, [])

  return (
    <div className="bg-surface-0 min-h-screen">
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic Order Confirmation' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl lg:max-w-[62%]">{S.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">{S.strap}</p>
          <div className="mt-8"><Button to="/craft/sap-agentic/film" arrow>Watch the 2-minute film</Button></div>
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="tag">{S.kicker}</span>
            {S.pillars.map(p => <span key={p} className="tag">{p}</span>)}
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-4xl">
            {[['Role', 'Design Lead · discovery and patterns'], ['Domain', cs.domain], ['Personas', '3'], ['Screens', String(total)]].map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <section aria-label="The agent at work" className="pb-16 md:pb-24 bg-surface-0">
        <div className="container-site">
          <p className="text-overline text-ink-3 mb-4">The agent at work</p>
          <div className="relative overflow-hidden rounded-3 border border-[color:var(--line-1)] w-full md:w-1/2" style={{ aspectRatio: '16 / 10' }} aria-hidden="true">
            <AnimThumb id="agenticDemo" />
          </div>
          <p className="text-body-sm text-ink-3 mt-3 max-w-measure-xl">It reads the supplier&rsquo;s PDF, compares it with the purchase order and prepares each decision for a person.</p>
        </div>
      </section>

      <Section id="role">
        <SectionHeader label="My role" title={S.role.title} intro={S.role.intro} />
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className="lg:col-span-6 flex flex-col gap-5 max-w-measure-xl">
            {S.role.paras.map(p => <p key={p} className="text-body text-ink-2">{p}</p>)}
            <p className="text-body-sm text-ink-3 hairline-top pt-4">{S.role.sharedNote}</p>
          </div>
          <div className="lg:col-span-6">
            <p className="text-overline text-ink-3 mb-2">{S.role.ownTitle}</p>
            <ol>
              {S.role.items.map((it, i) => (
                <li key={it.title} className="hairline-top py-4 grid grid-cols-[2rem_1fr] gap-x-3">
                  <span className="text-label text-ink-3 pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div><p className="text-title text-white">{it.title}</p><p className="text-body-sm text-ink-2 mt-1">{it.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="problem" tone="raised">
        <SectionHeader label="Chapter 1" title={S.framing.title} intro={S.framing.intro} />
        <AsIsFlow title={S.framing.asisTitle} steps={S.framing.asis} nuances={S.framing.nuances} />
        <Bridge text={C.transitions[0]} />
      </Section>

      <Section id="complexity">
        <SectionHeader label="Chapter 2" title={C.complexity.title} intro={C.complexity.intro} />
        <p className="text-overline text-ink-3 mb-5">{C.complexity.persona}</p>
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
                <ul className="mt-2 space-y-2">{p.resp.map(r => <li key={r} className="text-body-sm text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{r}</li>)}</ul>
              </div>
            </motion.article>
          ))}
        </div>
        <Bridge text={C.transitions[1]} />
      </Section>

      <Section id="collaboration" tone="raised">
        <SectionHeader label="Chapter 3" title={C.collaboration.title} intro={C.collaboration.intro} />
        <blockquote className="m-0 max-w-4xl font-serif text-white" style={{ fontSize: 'var(--fs-quote)', lineHeight: 1.2 }}>
          Not automating a procurement workflow. Redesigning how work and decisions move between people and agents.
        </blockquote>
        <ol className="grid md:grid-cols-3 gap-x-8 mt-12">
          {C.collaboration.principles.map((p, i) => (
            <li key={p.t} className="hairline-top py-6">
              <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-title text-white mt-2">{p.t}</p>
              <p className="text-body text-ink-2 mt-2">{p.d}</p>
            </li>
          ))}
        </ol>
        <h3 className="text-heading text-white mt-16">{S.agent.title}</h3>
        <dl className="max-w-4xl mt-4">
          {S.agent.rows.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8 py-4 hairline-top"><dt className="text-overline text-ink-3 pt-1">{k}</dt><dd className="text-body text-ink-2">{v}</dd></div>
          ))}
        </dl>
        <h3 className="text-heading text-white mt-16 mb-3">{S.contract.title}</h3>
        <p className="text-body text-ink-2 mb-8 max-w-measure-xl">{S.contract.intro}</p>
        <ContractWorksheet d={S.contract} />
        <h3 className="text-heading text-white mt-16">{S.hitl.title}</h3>
        <p className="text-body text-ink-2 mt-3 mb-8 max-w-measure-xl">{S.hitl.intro}</p>
        <Swimlane cols={S.hitl.cols} lanes={S.hitl.lanes as never} legendA={S.hitl.legendA} legendG={S.hitl.legendG} legendH={S.hitl.legendH} />
        <Bridge text={C.transitions[2]} />
      </Section>

      <Section id="flow">
        <SectionHeader label="Chapter 4" title={C.flow.title} intro={C.flow.intro} />
        <FlowDiagram />
        <div className="mt-16">
          <p className="text-overline text-ink-3 mb-3">One order, from email to close</p>
          <FlowPlayer imgs={Object.fromEntries(S.journeys.flatMap(j => j.screens).map(sc => [sc.id, sc.img]))} title="Order 1505899" intro="Real screens from the prototype, played in order." />
        </div>
        <Bridge text={C.transitions[3]} />
      </Section>

      <Section id="risk" tone="raised">
        <SectionHeader label="Chapter 5" title={C.risk.title} intro={C.risk.intro} />
        <ol className="grid md:grid-cols-5 gap-x-6 mb-14">
          {C.risk.steps.map((t, i) => (
            <li key={t} className="hairline-top py-4"><p className="text-label text-signal-ink">{String(i + 1).padStart(2, '0')}</p><p className="text-body-sm text-ink-2 mt-2">{t}</p></li>
          ))}
        </ol>
        <RiskVisual chain={S.risk.chain} examples={S.risk.examples} orderRisk={S.risk.orderRisk} confidence={S.risk.confidence} note={C.risk.note} />
        <h3 className="text-heading text-white mt-16">{C.risk.scenariosTitle}</h3>
        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {C.risk.scenarios.map(sc => (
            <div key={sc.t}>
              <Frame id={sc.shots[0]} alt={sc.t} />
              <p className="text-title text-white mt-5">{sc.t}</p>
              <p className="text-body text-ink-2 mt-2">{sc.d}</p>
            </div>
          ))}
        </div>
        <Bridge text={C.transitions[4]} />
      </Section>

      <Section id="patterns">
        <SectionHeader label="Chapter 6" title={C.patterns.title} intro={C.patterns.intro} />
        <div className="flex flex-col gap-24 md:gap-32">
          {S.patterns.map(pt => (
            <article key={pt.n} id={`pattern-${pt.n}`} className="scroll-mt-24">
              <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6">
                <header className="lg:col-span-4">
                  <p className="text-overline text-signal-ink">Pattern {pt.n}</p>
                  <h3 className="text-heading text-white mt-3">{pt.name}</h3>
                </header>
                <dl className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
                  <div><dt className="text-label text-ink-3">The problem</dt><dd className="text-body-sm text-ink-2 mt-2">{pt.problem}</dd></div>
                  <div><dt className="text-label text-ink-3">The design decision</dt><dd className="text-body-sm text-ink-2 mt-2">{pt.decision}</dd></div>
                  <div><dt className="text-label text-ink-3">Where else it applies</dt><dd className="text-body-sm text-ink-2 mt-2">{pt.reuse}</dd></div>
                </dl>
              </div>
              <div className={`mt-8 grid gap-4 ${pt.shots.length === 1 ? '' : pt.shots.length === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3'}`}>
                {pt.shots.map(id => <Frame key={id} id={id} alt={`${pt.name}: ${S.journeys.flatMap(j => j.screens).find(x => x.id === id)?.name ?? ''}`} />)}
              </div>
            </article>
          ))}
        </div>
        <Bridge text={C.transitions[5]} />
      </Section>

      <Section id="outcome" tone="raised">
        <SectionHeader label="Chapter 7" title={C.enables.title} intro={C.enables.intro} />
        <p className="text-overline text-ink-3 mb-5">Where it can go next</p>
        <AutonomyLadder levels={S.autonomy.levels as never} next={S.autonomy.next} />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-20">
          <div>
            <p className="text-overline text-ink-3">What this rests on</p>
            <ul className="mt-3">{C.enables.rests.map(t => <li key={t} className="hairline-top py-3 text-body text-ink-2">{t}</li>)}</ul>
          </div>
          <div>
            <p className="text-overline text-ink-3">What I am not claiming</p>
            <ul className="mt-3">{C.enables.notClaimed.map(t => <li key={t} className="hairline-top py-3 text-body text-ink-2">{t}</li>)}</ul>
          </div>
        </div>
        <h3 className="text-heading text-white mt-20">{C.enables.outcomeTitle}</h3>
        <p className="text-body text-ink-2 mt-3 max-w-measure-xl">{C.enables.outcome}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/craft" className="btn btn-secondary">All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about agentic AI</Link>
        </div>
      </Section>
    </div>
  )
}
