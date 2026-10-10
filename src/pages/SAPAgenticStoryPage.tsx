import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapAgentic as S } from '../data/sapAgentic'
import type { AScreen } from '../data/sapAgentic'
import SectionHeader from '../components/ds/SectionHeader'

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
          <Link to="/craft" className="text-label text-ink-3 hover:text-white tap-target inline-flex items-center">← Craft</Link>
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{S.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-[60ch]">{cs.tagline}</p>
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

      <Section id="problem">
        <SectionHeader label="01 · The problem" title="Every order confirmation is a small investigation." intro={cs.challenge} />
        <div className="grid md:grid-cols-3 gap-4">
          {S.problem.map((p, i) => (
            <div key={p.title} className="card">
              <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-title text-white mt-2">{p.title}</p>
              <p className="text-body text-ink-2 mt-4">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="approach" tone="raised">
        <SectionHeader label="02 · The approach" title="The agent does the reading. People make the decisions." intro={cs.approach} />
        <ol className="space-y-14">
          {S.principles.map((p, i) => {
            const s = shotOf(p.shot)
            return (
              <li key={p.n} className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <p className="text-label text-ink-3">{p.n}</p>
                  <h3 className="text-heading text-white mt-2">{p.title}</h3>
                  <p className="text-body-lg text-ink-2 mt-4 max-w-[52ch]">{p.body}</p>
                </div>
                <button type="button" onClick={() => setZoom(s)} className="block w-full rounded-lg overflow-hidden border focus-visible:outline-2" style={{ borderColor: 'var(--line-2)', cursor: 'zoom-in' }} aria-label={`Enlarge screen: ${s.name}`}>
                  <img src={s.img} alt={s.name} width={1440} height={899} className="w-full h-auto block bg-white" loading="lazy" decoding="async" />
                </button>
              </li>
            )
          })}
        </ol>
      </Section>

      <Section id="personas">
        <SectionHeader label="03 · Personas" title="Three people, three kinds of judgement." intro="Each role sees only the decisions it is qualified to make." />
        <div className="grid md:grid-cols-3 gap-4">
          {S.personas.map(p => (
            <article key={p.id} className="card !p-0 overflow-hidden">
              <img src={p.img} alt={`${p.name}, ${p.title}`} width={900} height={900} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
              <div className="p-6">
                <p className="text-overline text-ink-3">{p.role}</p>
                <p className="text-title text-white mt-3">{p.name}</p>
                <p className="text-body-sm text-ink-3 mt-1">{p.title}</p>
                <p className="text-label text-ink-3 mt-6">Responsibilities</p>
                <ul className="mt-3 space-y-3">{p.resp.map(r => <li key={r} className="text-body-sm text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">—</span>{r}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="flow" tone="raised">
        <SectionHeader label="04 · The flow" title="From the supplier's email to approve and close." intro="One agent-led flow, with two people reviewing in parallel." />
        <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: 'var(--line-2)' }}>
          <img src={S.flowImg} alt="System flow: order confirmation received via email, data extracted and corrected if required, validation marked complete, discrepancy view generated and routed to two parallel reviews, sent back to the supplier if a revision is required, then approved and closed." width={1720} height={500} className="w-full h-auto block" loading="lazy" decoding="async" />
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 mt-10">
          {S.flowSteps.map(([t, d], i) => (
            <li key={t} className="flex gap-5 py-4 hairline-top"><span className="text-label text-ink-3 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span><span><span className="text-body text-white block">{t}</span><span className="text-body-sm text-ink-3 block mt-1">{d}</span></span></li>
          ))}
        </ol>
      </Section>

      <Section id="experience">
        <SectionHeader label="05 · The experience" title="Four journeys, one assistant." intro="Built with native SAP Fiori components. Pick a journey and select any screen to enlarge it." />
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

      <Section id="outcome" tone="raised">
        <SectionHeader label="06 · Outcome" title="A complete, role-based path from email to close." intro={cs.outcome} />
        <div className="grid md:grid-cols-3 gap-4">
          {(cs.highlights ?? []).map(h => <blockquote key={h} className="card text-body-lg text-white m-0">{h}</blockquote>)}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/craft" className="btn btn-secondary">← All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about agentic AI</Link>
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
