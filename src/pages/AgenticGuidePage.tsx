import { Fragment, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { heroClass, heroStyle } from '../data/caseTheme'
import Breadcrumb from '../components/ds/Breadcrumb'
import AsIsFlowV2 from '../components/agentic/v2/AsIsFlowV2'
import FlowPlayerV2 from '../components/agentic/v2/FlowPlayerV2'
import VideoModal from '../components/ui/VideoModal'
import { sapAgenticV2 as S } from '../data/sapAgenticV2'
import { guide as G, type Who } from '../data/agenticGuide'
import { films } from '../data/films'

const ease = [0.16, 1, 0.3, 1] as const
const shot = (id: string) => `${import.meta.env.BASE_URL}images/case-studies/sap-agentic/${id}.webp`

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** Rises into place once, as it enters. Reduced motion shows it set. */
function Rise({ children, delay = 0, className = '', li, style }: { children: ReactNode; delay?: number; className?: string; li?: boolean; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  const Tag = li ? motion.li : motion.div
  return (
    <Tag className={className} style={style} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </Tag>
  )
}

/** One move of the guide: its number, the move as a statement, a short body, then its visual. */
function Move({ n, title, body, children, raised, big }: { n: number; title: string; body: string; children: ReactNode; raised?: boolean; big?: boolean }) {
  return (
    <section className={`section-y hairline-top ${raised ? 'bg-surface-1' : ''}`} aria-labelledby={`move-${n}`}>
      <div className="container-site">
        <Rise>
          <p className="text-label text-signal-ink">Move {n}</p>
          <h2 id={`move-${n}`} className="font-serif text-ink font-light mt-4 max-w-4xl" style={{ fontSize: big ? 'var(--fs-d-l)' : 'var(--fs-heading)', lineHeight: 1.08, textWrap: 'balance' }}>{title}</h2>
          <p className="text-body-lg text-ink-2 mt-5 max-w-2xl">{body}</p>
        </Rise>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}

const WHO: Record<Who, { label: string; dot: string; text: string }> = {
  model: { label: 'Model judgement', dot: 'bg-signal', text: 'text-signal-ink' },
  logic: { label: 'Fixed logic', dot: 'bg-ink-3', text: 'text-ink-3' },
  person: { label: 'A person decides', dot: 'bg-ink', text: 'text-ink' },
}

const SEV: Record<'High' | 'Medium' | 'Low', string> = { High: 'text-danger', Medium: 'text-ink', Low: 'text-ink-3' }

export default function AgenticGuidePage() {
  const M = G.moves
  const imgs = Object.fromEntries(S.journeys.flatMap(j => j.screens).map(sc => [sc.id, sc.img]))
  const film = films['sap-agentic']
  const [watching, setWatching] = useState(false)

  return (
    <article>
      {/* ── first screen: the claim, one line, one still ── */}
      <header className={heroClass('sap-agentic')} style={{ paddingTop: 'var(--header-h)', ...heroStyle('sap-agentic') }}>
        <div className="container-site pt-10 md:pt-14 pb-14 md:pb-20">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic Order Confirmations' }]} /></div>
          <p className="text-label text-ink-3">{G.label}</p>
          <h1 className="font-serif text-ink mt-5 max-w-5xl" style={{ fontSize: 'var(--fs-page-title)', lineHeight: 1.06, letterSpacing: 'var(--track-title)', textWrap: 'balance' }}>{G.headline}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{G.line}</p>
          <figure className="mt-10 md:mt-14 rounded-3 overflow-hidden border bg-white" style={{ borderColor: 'var(--line-1)', boxShadow: 'var(--shadow-3)' }}>
            <img src={shot('buyer-review')} alt="The buyer’s view of one confirmation: each difference from the purchase order with its severity and reason, ready to accept or reject." className="w-full h-auto block" decoding="async" />
          </figure>
        </div>
      </header>

      {/* 1 · the business problem */}
      <Move n={1} title={M.problem.title} body={M.problem.body}>
        <AsIsFlowV2 steps={M.problem.steps} />
      </Move>

      {/* 2 · work and judgement */}
      <Move n={2} title={M.judgement.title} body={M.judgement.body} raised>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <Rise>
            <p className="text-label text-ink-3">The work · the agent takes it</p>
            <ul className="mt-4">{M.judgement.work.map(x => <li key={x} className="hairline-top py-4 text-body-lg text-ink-2">{x}</li>)}</ul>
          </Rise>
          <Rise delay={0.1}>
            <p className="text-label text-signal-ink">The judgement · people keep it</p>
            <ul className="mt-4">{M.judgement.judgement.map(x => <li key={x} className="hairline-top py-4 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{x}</li>)}</ul>
          </Rise>
        </div>
      </Move>

      {/* 3 · the crossroads */}
      <Move n={3} title={M.crossroads.title} body={M.crossroads.body}>
        <ol>
          {M.crossroads.forks.map((f, i) => (
            <li key={f.q} className="hairline-top py-6 md:py-8">
              <Rise delay={i * 0.04} className="grid md:grid-cols-12 gap-x-8 gap-y-4 items-start">
                <div className="md:col-span-4">
                  <p className="text-label text-ink-3 tabular-nums">Crossroad {i + 1}</p>
                  <p className="font-serif text-ink mt-2" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.25 }}>{f.q}</p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-2">
                  {f.options.map((o, k) => (
                    <p key={o} className={`flex items-center gap-3 text-body ${k === f.pick ? 'text-ink' : 'text-ink-3 line-through decoration-[color:var(--line-2)]'}`}>
                      <span aria-hidden="true" className={`block w-2 h-2 rounded-full shrink-0 ${k === f.pick ? 'bg-signal' : 'border border-[color:var(--line-2)]'}`} />
                      {o}<span className="sr-only">{k === f.pick ? ' (chosen)' : ' (set aside)'}</span>
                    </p>
                  ))}
                </div>
                <p className="md:col-span-4 text-body text-ink-2">{f.why}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </Move>

      {/* 4 · scale */}
      <Move n={4} title={M.scale.title} body={M.scale.body} raised>
        <div className="grid grid-cols-2 gap-x-6 md:gap-x-12">
          <p className="text-label text-ink-3 pb-3">Breaks at scale</p>
          <p className="text-label text-signal-ink pb-3">Holds at scale</p>
          {M.scale.rows.map(r => (
            <Fragment key={r.breaks}>
              <p className="hairline-top py-5 text-body-lg text-ink-3">{r.breaks}</p>
              <p className="hairline-top py-5 text-body-lg text-ink">{r.holds}</p>
            </Fragment>
          ))}
        </div>
      </Move>

      {/* 5 · the vision */}
      <Move n={5} title={M.vision.title} body={M.vision.body}>
        <Rise>
          <p className="text-label text-ink-3">The agent never</p>
          <ul className="mt-4 max-w-2xl">{M.vision.never.map(x => <li key={x} className="hairline-top py-4 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{x}</li>)}</ul>
        </Rise>
        <ol className="grid md:grid-cols-3 gap-4 mt-14">
          {M.vision.ladder.map((l, i) => (
            <Rise li key={l.t} delay={i * 0.08} className={`card h-full ${l.now ? 'bg-surface-2' : ''}`} style={l.now ? { borderColor: 'rgb(var(--signal-ink-rgb) / 0.5)' } : undefined}>
                <p className={`text-label ${l.now ? 'text-signal-ink' : 'text-ink-3'}`}>{l.now ? 'Today' : i === 0 ? 'Floor' : 'Earned next'}</p>
                <p className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-title)' }}>{l.t}</p>
                <p className="text-body text-ink-2 mt-2">{l.d}</p>
            </Rise>
          ))}
        </ol>
      </Move>

      {/* 6 · the nuance: how it reasons */}
      <Move n={6} title={M.reasoning.title} body={M.reasoning.body} raised big>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6" aria-hidden="true">
          {(Object.keys(WHO) as Who[]).map(k => <span key={k} className="flex items-center gap-2 text-label text-ink-3"><span className={`block w-2 h-2 rounded-full ${WHO[k].dot}`} />{WHO[k].label}</span>)}
        </div>
        <ol className="grid md:grid-cols-3 gap-4">
          {M.reasoning.flow.map((s, i) => (
            <Rise li key={s.t} delay={(i % 3) * 0.06} className="card h-full">
                <p className={`flex items-center gap-2 text-label ${WHO[s.who].text}`}><span className={`block w-2 h-2 rounded-full ${WHO[s.who].dot}`} aria-hidden="true" /><span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> · {WHO[s.who].label}</p>
                <p className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-title)' }}>{s.t}</p>
                <p className="text-body text-ink-2 mt-2">{s.d}</p>
            </Rise>
          ))}
        </ol>

        <Rise className="mt-16">
          <p className="text-label text-ink-3">{M.reasoning.example.title}</p>
          <table className="w-full mt-4 text-left">
            <thead className="sr-only"><tr><th>Field</th><th>Change</th><th>Size</th><th>Severity</th></tr></thead>
            <tbody>
              {M.reasoning.example.rows.map(([f, ch, sz, sev]) => (
                <tr key={f} className="hairline-top">
                  <td className="py-4 pr-4 text-body text-ink">{f}</td>
                  <td className="py-4 pr-4 text-body text-ink-2 hidden md:table-cell">{ch}</td>
                  <td className="py-4 pr-4 text-body text-ink-3">{sz}</td>
                  <td className={`py-4 text-label text-right ${SEV[sev]}`}>{sev}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hairline-top pt-5 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{M.reasoning.example.verdict}</p>
        </Rise>
      </Move>

      {/* 7 · the value */}
      <Move n={7} title={M.value.title} body={M.value.body}>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {M.value.business.map((v, i) => (
            <Rise key={v.t} delay={i * 0.06}>
              <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.1 }}>{v.t}</p>
              <p className="text-body text-ink-2 mt-3">{v.d}</p>
            </Rise>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 mt-12">
          {M.value.people.map(v => (
            <div key={v.t} className="hairline-top py-5">
              <p className="text-label text-ink-3">{v.t}</p>
              <p className="text-body-lg text-ink mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </Move>

      {/* see it work: the real screens, played in order */}
      <section className="section-y hairline-top bg-surface-1" aria-labelledby="see">
        <div className="container-site">
          <Rise>
            <h2 id="see" className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.06 }}>{G.see.title}</h2>
            <p className="text-body-lg text-ink-2 mt-4 max-w-2xl">{G.see.line}</p>
          </Rise>
          <div className="mt-10"><FlowPlayerV2 imgs={imgs} title="Order 1505899" intro="" /></div>
          <div className="mt-14 flex flex-wrap gap-3">
            {film && <button type="button" onClick={() => setWatching(true)} className="btn btn-secondary">Watch the film</button>}
            <Link to="/craft/sap-agentic/details" className="btn btn-primary">Read the full case <Arrow /></Link>
          </div>
        </div>
      </section>
      {watching && film && <VideoModal src={film.to} title={film.title} onClose={() => setWatching(false)} />}
    </article>
  )
}
