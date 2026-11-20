import { Fragment, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { heroClass, heroStyle } from '../data/caseTheme'
import Breadcrumb from '../components/ds/Breadcrumb'
import AsIsFlowV2 from '../components/agentic/v2/AsIsFlowV2'
import FlowPlayerV2 from '../components/agentic/v2/FlowPlayerV2'
import VideoModal from '../components/ui/VideoModal'
import { sapAgenticV2 as S } from '../data/sapAgenticV2'
import { guide as G, type Who, type Decision } from '../data/agenticGuide'
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

/** A real screen, framed the same way everywhere. */
const Screen = ({ id, alt }: { id: string; alt: string }) => (
  <div className="rounded-3 overflow-hidden border bg-white" style={{ borderColor: 'var(--line-1)', boxShadow: 'var(--shadow-2)' }}>
    <img src={shot(id)} alt={alt} loading="lazy" decoding="async" className="w-full h-auto block" />
  </div>
)

/** One chapter of the story: its name, a claim, the story, its evidence, then the takeaway a reader can keep. */
function Chapter({ id, label, title, body, takeaway, children, raised, big }: { id: string; label: string; title: string; body: string; takeaway?: string; children: ReactNode; raised?: boolean; big?: boolean }) {
  return (
    <section id={id} className={`section-y hairline-top scroll-mt-24 ${raised ? 'bg-surface-1' : ''}`} aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <Rise>
          <p className="text-label text-signal-ink">{label}</p>
          <h2 id={`${id}-h`} className="font-serif text-ink font-light mt-4 max-w-4xl" style={{ fontSize: big ? 'var(--fs-d-l)' : 'var(--fs-heading)', lineHeight: 1.08, textWrap: 'balance' }}>{title}</h2>
          <p className="text-body-lg text-ink-2 mt-5 max-w-2xl">{body}</p>
        </Rise>
        <div className="mt-12 md:mt-16">{children}</div>
        {takeaway && (
          <Rise className="mt-14 md:mt-20 hairline-top pt-6 grid md:grid-cols-12 gap-x-8 gap-y-2">
            <p className="md:col-span-3 text-label text-ink-3 pt-1">The takeaway</p>
            <p className="md:col-span-9 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{takeaway}</p>
          </Rise>
        )}
      </div>
    </section>
  )
}

/** The options weighed at one fork. The chosen one is lit; the others stay visible, quieter. */
function Options({ d, inline }: { d: Decision; inline?: boolean }) {
  if (d.options.length === 1) {
    return <p className="flex items-center gap-3 text-body-lg text-ink"><span aria-hidden="true" className="block w-2 h-2 rounded-full bg-signal shrink-0" />{d.options[0]}</p>
  }
  return (
    <ul className={inline ? 'flex flex-wrap gap-x-8 gap-y-2' : 'flex flex-col gap-2'}>
      {d.options.map((o, k) => (
        <li key={o} className={`flex items-center gap-3 text-body-lg ${k === d.pick ? 'text-ink' : 'text-ink-3'}`}>
          <span aria-hidden="true" className={`block w-2 h-2 rounded-full shrink-0 ${k === d.pick ? 'bg-signal' : 'border border-[color:var(--line-2)]'}`} />
          {o}<span className="sr-only">{k === d.pick ? ' (chosen)' : ' (set aside)'}</span>
        </li>
      ))}
    </ul>
  )
}

/** Each decision gets the layout its evidence needs: a screen beside it, a row of screens under it, or words alone. */
function DecisionBlock({ d, flip }: { d: Decision; flip: boolean }) {
  const head = (
    <>
      <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.25 }}>{d.q}</p>
      <div className="mt-5"><Options d={d} inline={!d.shots} /></div>
      <p className="text-body text-ink-2 mt-5 max-w-xl">{d.why}</p>
    </>
  )
  if (!d.shots) return <Rise className="hairline-top py-10 md:py-14 max-w-4xl">{head}</Rise>
  if (d.shots.length > 1) {
    return (
      <Rise className="hairline-top py-10 md:py-14">
        <div className="max-w-3xl">{head}</div>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {d.shots.map(s => (
            <figure key={s.id}>
              <Screen id={s.id} alt={`${s.label} worklist`} />
              <figcaption className="text-label text-ink-3 mt-3">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </Rise>
    )
  }
  return (
    <Rise className="hairline-top py-10 md:py-14 grid lg:grid-cols-12 gap-x-12 gap-y-8 items-center">
      <div className={`lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>{head}</div>
      <figure className={`lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
        <Screen id={d.shots[0].id} alt={d.caption ?? d.q} />
        {d.caption && <figcaption className="text-body-sm text-ink-3 mt-3">{d.caption}</figcaption>}
      </figure>
    </Rise>
  )
}

const WHO: Record<Who, { label: string; dot: string; text: string }> = {
  model: { label: 'Model judgement', dot: 'bg-signal', text: 'text-signal-ink' },
  logic: { label: 'Fixed logic', dot: 'bg-ink-3', text: 'text-ink-3' },
  person: { label: 'A person decides', dot: 'bg-ink', text: 'text-ink' },
}
const SEV: Record<'High' | 'Medium' | 'Low', string> = { High: 'text-danger', Medium: 'text-ink', Low: 'text-ink-3' }

export default function AgenticGuidePage() {
  const C = G.chapters
  const imgs = Object.fromEntries(S.journeys.flatMap(j => j.screens).map(sc => [sc.id, sc.img]))
  const film = films['sap-agentic']
  const [watching, setWatching] = useState(false)
  const index = [['problem', C.problem.label], ['judgement', C.judgement.label], ['decisions', C.decisions.label], ['scale', C.scale.label], ['vision', C.vision.label], ['reasoning', C.reasoning.label], ['value', C.value.label], ['see', G.see.title]]
  const singles = C.decisions.list.filter(d => d.shots?.length === 1)

  return (
    <article>
      {/* ── first screen: the story and its promise, and what it covers ── */}
      <header className={heroClass('sap-agentic')} style={{ paddingTop: 'var(--header-h)', ...heroStyle('sap-agentic') }}>
        <div className="container-site pt-10 md:pt-14 pb-14 md:pb-20">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic Order Confirmations' }]} /></div>
          <p className="text-label text-ink-3">{G.label}</p>
          <h1 className="font-serif text-ink mt-5 max-w-5xl" style={{ fontSize: 'var(--fs-d-2xl)', lineHeight: 1.02, letterSpacing: 'var(--track-title)', textWrap: 'balance' }}>{G.headline}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{G.line}</p>
          <nav aria-label="In this story" className="mt-12 md:mt-16 max-w-3xl">
            <p className="text-label text-ink-3">In this story</p>
            <ol className="mt-3 grid sm:grid-cols-2 gap-x-10">
              {index.map(([id, name], i) => (
                <li key={id} className="hairline-top">
                  <a href={`#${id}`} className="flex items-baseline gap-4 py-3 text-body text-ink-2 hover:text-ink transition-colors">
                    <span className="text-label text-ink-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>{name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <Chapter id="problem" {...C.problem}>
        <AsIsFlowV2 steps={C.problem.steps} />
      </Chapter>

      <Chapter id="judgement" {...C.judgement} raised>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <Rise>
            <p className="text-label text-ink-3">The work · the agent takes it</p>
            <ul className="mt-4">{C.judgement.work.map(x => <li key={x} className="hairline-top py-4 text-body-lg text-ink-2">{x}</li>)}</ul>
          </Rise>
          <Rise delay={0.1}>
            <p className="text-label text-signal-ink">The judgement · people keep it</p>
            <ul className="mt-4">{C.judgement.judgement.map(x => <li key={x} className="hairline-top py-4 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{x}</li>)}</ul>
          </Rise>
        </div>
      </Chapter>

      <Chapter id="decisions" {...C.decisions}>
        <div>{C.decisions.list.map(d => <DecisionBlock key={d.q} d={d} flip={singles.indexOf(d) % 2 === 1} />)}</div>
      </Chapter>

      <Chapter id="scale" {...C.scale} raised>
        <div className="grid grid-cols-2 gap-x-6 md:gap-x-12">
          <p className="text-label text-ink-3 pb-3">Breaks at scale</p>
          <p className="text-label text-signal-ink pb-3">Holds at scale</p>
          {C.scale.rows.map(r => (
            <Fragment key={r.breaks}>
              <p className="hairline-top py-5 text-body-lg text-ink-3">{r.breaks}</p>
              <p className="hairline-top py-5 text-body-lg text-ink">{r.holds}</p>
            </Fragment>
          ))}
        </div>
      </Chapter>

      <Chapter id="vision" {...C.vision}>
        <Rise>
          <p className="text-label text-ink-3">The agent never</p>
          <ul className="mt-4 max-w-2xl">{C.vision.never.map(x => <li key={x} className="hairline-top py-4 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{x}</li>)}</ul>
        </Rise>
        <ol className="grid md:grid-cols-3 gap-4 mt-14">
          {C.vision.ladder.map((l, i) => (
            <Rise li key={l.t} delay={i * 0.08} className={`card h-full ${l.now ? 'bg-surface-2' : ''}`} style={l.now ? { borderColor: 'rgb(var(--signal-ink-rgb) / 0.5)' } : undefined}>
              <p className={`text-label ${l.now ? 'text-signal-ink' : 'text-ink-3'}`}>{l.now ? 'Today' : i === 0 ? 'Floor' : 'Earned next'}</p>
              <p className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-title)' }}>{l.t}</p>
              <p className="text-body text-ink-2 mt-2">{l.d}</p>
            </Rise>
          ))}
        </ol>
      </Chapter>

      <Chapter id="reasoning" {...C.reasoning} raised big>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6" aria-hidden="true">
          {(Object.keys(WHO) as Who[]).map(k => <span key={k} className="flex items-center gap-2 text-label text-ink-3"><span className={`block w-2 h-2 rounded-full ${WHO[k].dot}`} />{WHO[k].label}</span>)}
        </div>
        <ol className="grid md:grid-cols-3 gap-4">
          {C.reasoning.flow.map((s, i) => (
            <Rise li key={s.t} delay={(i % 3) * 0.06} className="card h-full">
              <p className={`flex items-center gap-2 text-label ${WHO[s.who].text}`}><span className={`block w-2 h-2 rounded-full ${WHO[s.who].dot}`} aria-hidden="true" />{WHO[s.who].label}</p>
              <p className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-title)' }}>{s.t}</p>
              <p className="text-body text-ink-2 mt-2">{s.d}</p>
            </Rise>
          ))}
        </ol>
        <Rise className="mt-16">
          <p className="text-label text-ink-3">{C.reasoning.example.title}</p>
          <table className="w-full mt-4 text-left">
            <thead className="sr-only"><tr><th>Field</th><th>Change</th><th>Size</th><th>Severity</th></tr></thead>
            <tbody>
              {C.reasoning.example.rows.map(([f, ch, sz, sev]) => (
                <tr key={f} className="hairline-top">
                  <td className="py-4 pr-4 text-body text-ink">{f}</td>
                  <td className="py-4 pr-4 text-body text-ink-2 hidden md:table-cell">{ch}</td>
                  <td className="py-4 pr-4 text-body text-ink-3">{sz}</td>
                  <td className={`py-4 text-label text-right ${SEV[sev]}`}>{sev}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hairline-top pt-5 font-serif text-ink" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>{C.reasoning.example.verdict}</p>
        </Rise>
      </Chapter>

      <Chapter id="value" {...C.value}>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {C.value.business.map((v, i) => (
            <Rise key={v.t} delay={i * 0.06}>
              <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.1 }}>{v.t}</p>
              <p className="text-body text-ink-2 mt-3">{v.d}</p>
            </Rise>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 mt-12">
          {C.value.people.map(v => (
            <div key={v.t} className="hairline-top py-5">
              <p className="text-label text-ink-3">{v.t}</p>
              <p className="text-body-lg text-ink mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* see it work: the real screens, played in order */}
      <section id="see" className="section-y hairline-top bg-surface-1 scroll-mt-24" aria-labelledby="see-h">
        <div className="container-site">
          <Rise>
            <h2 id="see-h" className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.06 }}>{G.see.title}</h2>
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
