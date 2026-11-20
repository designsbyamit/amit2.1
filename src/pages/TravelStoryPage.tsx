import { Suspense, lazy, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Breadcrumb from '../components/ds/Breadcrumb'
import { travel as T } from '../data/travelStory'

const Collage = lazy(() => import('../components/illustrations/travel/Collage'))
const PhoneRow = lazy(() => import('../components/illustrations/travel/PhoneRow'))
const ease = [0.16, 1, 0.3, 1] as const
const C = T.chapters

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const Fallback = () => <div className="rounded-3 bg-surface-2" style={{ aspectRatio: '16 / 7' }} />

function Rise({ children, delay = 0, className = '', li }: { children: ReactNode; delay?: number; className?: string; li?: boolean }) {
  const reduce = useReducedMotion()
  const Tag = li ? motion.li : motion.div
  return <Tag className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.7, delay, ease }}>{children}</Tag>
}

function Chapter({ id, label, title, body, children, raised }: { id: string; label: string; title: string; body?: string; children: ReactNode; raised?: boolean }) {
  return (
    <section id={id} className={`section-y hairline-top scroll-mt-24 ${raised ? 'bg-surface-1' : ''}`} aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <Rise>
          <p className="text-label text-signal-ink">{label}</p>
          <h2 id={`${id}-h`} className="font-serif text-ink font-light mt-4 max-w-4xl" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.08, textWrap: 'balance' }}>{title}</h2>
          {body && <p className="text-body-lg text-ink-2 mt-5 max-w-2xl">{body}</p>}
        </Rise>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}

function Artefact({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <Rise>
      <figure>
        <div className="rounded-3 overflow-hidden border bg-white" style={{ borderColor: 'var(--line-1)' }}><img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto block" /></div>
        <figcaption className="text-body-sm text-ink-3 mt-3 max-w-2xl">{caption}</figcaption>
      </figure>
    </Rise>
  )
}

/** The travel booking short case study: eight chapters, from the ambition to the bigger idea. */
export default function TravelStoryPage() {
  return (
    <article>
      <header className="story-hero" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-14 md:pb-20">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Travel Booking' }]} /></div>
          <p className="text-label text-ink-3">{T.kicker}</p>
          <h1 className="font-serif text-ink mt-5 max-w-5xl" style={{ fontSize: 'var(--fs-d-2xl)', lineHeight: 1.02, letterSpacing: 'var(--track-title)', textWrap: 'balance' }}>{T.headline}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{T.intro}</p>
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-6 mt-12 md:mt-14">
            {T.glance.map(([k, v]) => (
              <div key={k} className="hairline-top pt-4">
                <dt className="text-label text-ink-3">{k}</dt>
                <dd className="text-body text-ink mt-2">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 md:mt-16" role="img" aria-label="The redesigned app’s screens, light and dark: sign in, home, search, results, fares, seats, passenger details, add-ons, review and pay, confirmation and boarding pass."><Suspense fallback={<Fallback />}><Collage /></Suspense></div>
        </div>
      </header>

      {/* 01 */}
      <Chapter id="ambition" {...C.ambition}>
        <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {C.ambition.areas.map(([a, d], i) => (
            <Rise li key={a} delay={i * 0.06} className="relative panel p-5 md:p-6">
              <p className="text-label text-signal-ink tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-title text-ink mt-3">{a}</p>
              <p className="text-body-sm text-ink-3 mt-2">{d}</p>
            </Rise>
          ))}
        </ol>
        <p className="text-body-sm text-ink-3 mt-4">Five interconnected areas of one travel experience.</p>
      </Chapter>

      {/* 02 */}
      <Chapter id="understand" {...C.understand} raised>
        <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {C.understand.inputs.map(([t, d], i) => (
            <Rise li key={t} delay={i * 0.06} className="hairline-top pt-5">
              <p className="text-title text-ink">{t}</p>
              <p className="text-body text-ink-2 mt-2">{d}</p>
            </Rise>
          ))}
        </ol>
        <p className="text-body text-ink-3 mt-10 max-w-2xl">{C.understand.context}</p>
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Artefact {...C.understand.map} />
          <Artefact {...C.understand.audit} />
        </div>
      </Chapter>

      {/* 03 */}
      <Chapter id="diagnose" {...C.diagnose}>
        <div className="grid md:grid-cols-3 gap-4">
          {C.diagnose.stages.map((s, i) => (
            <Rise key={s.stage} delay={i * 0.08} className="panel p-5 md:p-6 flex flex-col">
              <p className="text-label text-ink-3">{s.stage}</p>
              <p className="text-label text-ink-3 mt-5">Where customers spent effort</p>
              <ul className="mt-3 space-y-2">{s.pains.map(p => <li key={p} className="flex gap-3 text-body text-ink-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-danger shrink-0" aria-hidden="true" />{p}</li>)}</ul>
              <div className="mt-auto pt-6">
                <div className="hairline-top pt-4">
                  <p className="text-label text-signal-ink">Design priority</p>
                  <p className="text-title text-ink mt-2">{s.priority}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
        <p className="text-body-sm text-ink-3 mt-4">{C.diagnose.source}</p>
      </Chapter>

      {/* 04 */}
      <Chapter id="structure" {...C.structure} raised>
        <div className="panel-quiet p-4 md:p-6">
          <p className="text-label text-ink-3 text-center">Client stakeholders · Legal · Marketing</p>
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
            {C.ambition.areas.map(([a], i) => (
              <Rise li key={a} delay={i * 0.06} className="panel p-4 md:p-5">
                <p className="text-label text-signal-ink tabular-nums">Pod {i + 1}</p>
                <p className="text-title text-ink mt-2">{a}</p>
                <ul className="mt-4 space-y-1.5">{['Design', 'Product', 'Engineering'].map(r => <li key={r} className="flex items-center gap-2 text-body-sm text-ink-3"><span className="h-1.5 w-1.5 rounded-full bg-ink-3" aria-hidden="true" />{r}</li>)}</ul>
              </Rise>
            ))}
          </ol>
          <Rise delay={0.3} className="mt-3 panel-signal px-5 py-4 text-center text-body text-ink">One customer journey, visible to every pod, with the hand-offs between areas treated as shared work</Rise>
        </div>
        <div className="flex items-baseline gap-4 mt-10">
          <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1 }}>11+</p>
          <p className="text-body text-ink-2">designers across multiple pods, each with its own product and engineering partners</p>
        </div>
        <div className="mt-12 max-w-4xl"><Artefact {...C.structure.sprint} /></div>
      </Chapter>

      {/* 05 */}
      <Chapter id="coherence" {...C.coherence}>
        <Rise><Suspense fallback={<Fallback />}><PhoneRow items={C.coherence.row} /></Suspense></Rise>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-10">
          {C.coherence.checks.map(c => <li key={c} className="hairline-top pt-4 flex items-center gap-3 text-body text-ink"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-signal-ink shrink-0" aria-hidden="true"><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>{c}</li>)}
        </ul>
        <p className="text-body-sm text-ink-3 mt-6">The same app across five areas, rebuilt from the delivered designs with sample data.</p>
      </Chapter>

      {/* 06 */}
      <Chapter id="details" {...C.details} raised>
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <Rise className="lg:col-span-7 panel p-5 md:p-7">
            <p className="text-label text-ink-3">Check-in, as it really happens</p>
            <ul className="mt-5 space-y-3">
              {C.details.scenarios.map(([a, b]) => (
                <li key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <span className="rounded-2 border px-3 py-2 text-body text-ink-2" style={{ borderColor: 'var(--line-2)' }}>{a}</span>
                  <span className="text-label text-ink-3">or</span>
                  <span className="rounded-2 border px-3 py-2 text-body text-ink-2" style={{ borderColor: 'var(--line-2)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-label text-ink-3 mt-8">Each branch had to answer</p>
            <ul className="flex flex-wrap gap-2 mt-3">{C.details.questions.map(q => <li key={q} className="rounded-full px-4 py-2 bg-surface-2 text-body text-ink">{q}</li>)}</ul>
          </Rise>
          <Rise delay={0.1} className="lg:col-span-5 panel-signal p-5 md:p-7 flex flex-col justify-center">
            <p className="text-label text-ink-3">From complexity to simplicity</p>
            <p className="font-serif text-ink mt-4" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1 }}>9 → 2</p>
            <p className="text-body-lg text-ink-2 mt-3">steps to check in, with every branch still handled</p>
          </Rise>
        </div>
        <Rise className="mt-16 md:mt-20">
          <h3 className="font-serif text-ink" style={{ fontSize: 'var(--fs-title)' }}>{C.details.craftTitle}</h3>
          <ol className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mt-6">
            {C.details.craft.map(([t, d], i) => (
              <li key={t} className="hairline-top pt-5">
                <p className="text-label text-signal-ink tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-title text-ink mt-2">{t}</p>
                <p className="text-body text-ink-2 mt-2">{d}</p>
              </li>
            ))}
          </ol>
        </Rise>
        <div className="mt-12 max-w-3xl"><Suspense fallback={<Fallback />}><PhoneRow items={C.details.screens} arrows={false} /></Suspense></div>
      </Chapter>

      {/* 07 */}
      <Chapter id="outcomes" {...C.outcomes}>
        <dl className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {C.outcomes.figures.map(([v, l, d], i) => (
            <Rise key={l} delay={i * 0.08} className="hairline-top pt-6">
              <dt className="sr-only">{l}</dt>
              <dd className="font-serif text-ink" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1 }}>{v}</dd>
              <dd className="text-title text-ink mt-4">{l}</dd>
              <dd className="text-body text-ink-2 mt-2">{d}</dd>
            </Rise>
          ))}
        </dl>
        <p className="text-body-sm text-ink-3 mt-8 max-w-2xl">{C.outcomes.note}</p>
      </Chapter>

      {/* 08 */}
      <Chapter id="idea" {...C.idea} raised>
        <Rise>
          <blockquote className="font-serif text-ink max-w-4xl" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.2, textWrap: 'balance' }}>“{C.idea.quote}”</blockquote>
        </Rise>
      </Chapter>

      <section className="section-y hairline-top" aria-label="Role and next steps">
        <div className="container-site grid-site gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <p className="text-label text-ink-3">Role</p>
            <p className="text-body-lg text-ink mt-3 max-w-2xl">{T.role}</p>
          </div>
          <div className="col-span-4 md:col-span-12 flex flex-wrap items-center gap-3">
            <Link to="/craft/airline-app/details" className="btn btn-primary">Read the full case <Arrow /></Link>
          </div>
        </div>
      </section>
    </article>
  )
}
