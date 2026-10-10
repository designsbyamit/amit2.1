import Breadcrumb from '../components/ds/Breadcrumb'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapSearch as S } from '../data/sapSearch'
import type { Screen } from '../data/sapSearch'

import SectionHeader from '../components/ds/SectionHeader'
import SearchAnatomy from '../components/case/SearchAnatomy'

const cs = caseStudies.find(c => c.id === 'sap-search')!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

function Prototype({ hash }: { hash: string }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--line-2)' }}>
      <div className="flex items-center justify-between gap-4 px-4 py-2 bg-surface-2">
        <span className="text-caption text-ink-3">Interactive prototype · UI5 Web Components</span>
        <a href={`${S.prototype}#${hash}`} target="_blank" rel="noopener noreferrer" className="text-caption text-ink-2 hover:text-white tap-target inline-flex items-center">Open full screen ↗</a>
      </div>
      <iframe key={hash} title="AI-Powered Search prototype" src={`${S.prototype}#${hash}`} className="w-full block bg-white" style={{ height: 'min(820px, 80vh)' }} loading="lazy" />
    </div>
  )
}

export default function SAPSearchStoryPage() {
  const [active, setActive] = useState(S.flows[0].id)
  const [zoom, setZoom] = useState<Screen | null>(null)
  const flow = S.flows.find(f => f.id === active)!

  return (
    <div className="bg-surface-0 min-h-screen">
      {/* Hero */}
      <header className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-site">
          <Breadcrumb items={[{ label: 'Craft', to: '/craft' }, { label: 'AI-Powered Search' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{S.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-[60ch]">{cs.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="tag">{S.kicker}</span>
            {S.pillars.map(p => <span key={p} className="tag">{p}</span>)}
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-4xl">
            {[['Role', cs.role], ['Timeline', cs.timeline], ['Domain', cs.domain], ...(cs.stats ?? []).map(s => [s.label, s.value])].slice(0, 4).map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      {/* Problem */}
      <Section id="problem">
        <SectionHeader label="01 · The problem" title="What needed to be fixed?" intro={cs.challenge} />
        <div className="grid md:grid-cols-3 gap-4">
          {S.challenges.map(c => (
            <div key={c.area} className="card">
              <p className="text-overline text-ink-3">{c.area}</p>
              <ul className="mt-5 space-y-3">{c.items.map(i => <li key={i} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">—</span>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Exploration */}
      <Section id="explore" tone="raised">
        <SectionHeader label="02 · Exploration" title="Where search capability meets AI and real user problems." intro="Every idea was tested against three inputs at once: what search can do, what AI can offer, and the problems users actually have." />
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {S.ideas.inputs.map(i => <div key={i} className="card text-center"><p className="text-title text-white">{i}</p></div>)}
        </div>
        <p className="text-overline text-ink-3 mb-4">AI offerings</p>
        <div className="flex flex-wrap gap-2 mb-14">{S.ideas.aiOfferings.map(a => <span key={a} className="tag">{a}</span>)}</div>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <p className="text-overline text-ink-3 mb-4">Search functionalities</p>
            <dl className="divide-y" style={{ borderColor: 'var(--line-1)' }}>
              {S.searchFunctionalities.map(([t, d]) => (
                <div key={t} className="py-4 grid sm:grid-cols-[180px_1fr] gap-2 hairline-top"><dt className="text-body text-white">{t}</dt><dd className="text-body-sm text-ink-2">{d}</dd></div>
              ))}
            </dl>
          </div>
          <div className="space-y-10">
            <div><p className="text-overline text-ink-3 mb-4">Search mechanics</p><div className="flex flex-wrap gap-2">{S.mechanics.map(m => <span key={m} className="tag">{m}</span>)}</div></div>
            <div><p className="text-overline text-ink-3 mb-4">AI functionalities</p><div className="flex flex-wrap gap-2">{S.aiFunctionalities.map(m => <span key={m} className="tag">{m}</span>)}</div></div>
          </div>
        </div>
      </Section>

      {/* Recommendations */}
      <Section id="recommendations">
        <SectionHeader label="03 · Solution recommendations" title="Ten capabilities for one search across every application." intro={cs.approach} />
        <ol className="grid sm:grid-cols-2 gap-x-10">
          {S.recommendations.map((r, i) => (
            <li key={r} className="flex gap-5 py-4 hairline-top"><span className="text-label text-ink-3 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span><span className="text-body text-white">{r}</span></li>
          ))}
        </ol>
      </Section>

      {/* Patterns */}
      <Section id="patterns" tone="raised">
        <SectionHeader label="04 · Common patterns" title="A pattern library for AI search." intro="Grouped by the moment in the search journey they serve, then defined so every product team applies them the same way." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {S.patternGroups.map((g, i) => (
            <div key={g.title} className="card">
              <p className="text-label text-ink-3">{i + 1}</p>
              <p className="text-title text-white mt-2">{g.title}</p>
              {g.note && <p className="text-body-sm text-ink-3 mt-2">{g.note}</p>}
              <ul className="mt-4 space-y-2">{g.items.map(it => <li key={it} className="text-body-sm text-ink-2">{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <dl className="grid md:grid-cols-2 gap-x-10">
          {S.patternDefinitions.map(([t, d]) => (
            <div key={t} className="py-4 hairline-top"><dt className="text-body text-white">{t}</dt><dd className="text-body-sm text-ink-2 mt-1">{d}</dd></div>
          ))}
        </dl>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <SectionHeader label="05 · The experience" title="One search, six journeys." intro="Built entirely with native enterprise UI components. Pick a journey to see its screens and try it live." />
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Journeys">
          {S.flows.map(f => (
            <button key={f.id} type="button" role="tab" aria-selected={f.id === active} className="chip" aria-pressed={f.id === active} onClick={() => setActive(f.id)}>
              {f.label} · {f.title.replace('Use case: ', '')}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          <h3 className="text-heading text-white">{flow.title}</h3>
          <p className="text-body-lg text-ink-2 mt-4 max-w-[65ch]">{flow.summary}</p>
          {flow.id === 'component' && <SearchAnatomy />}
          {flow.screens.length > 0 && <div className="grid md:grid-cols-2 gap-6 mt-10">
            {flow.screens.map(s => (
              <figure key={s.id} className="m-0">
                <button type="button" onClick={() => setZoom(s)} className="block w-full rounded-lg overflow-hidden border focus-visible:outline-2" style={{ borderColor: 'var(--line-2)', cursor: 'zoom-in' }} aria-label={`Enlarge screen ${s.id.replace('-', '.')} ${s.name}`}>
                  <img src={s.img} alt={`${flow.title}: ${s.name}`} width={1440} height={900} className="w-full h-auto block bg-white" loading="lazy" decoding="async" />
                </button>
                <figcaption className="text-caption text-ink-3 mt-3">{s.id.replace('-', '.')} — {s.name}</figcaption>
              </figure>
            ))}
          </div>}
          <p className="text-body text-ink-2 mt-12">{flow.screens.length > 0 ? 'Try this journey live. The prototype uses the same UI5 components as the screens above.' : (flow.id === 'component' ? 'Try the same behaviour live: hover, focus, type, use the arrow keys and press Enter.' : 'Try this journey live, built with the same UI5 components.')}</p>
          <div className="mt-10"><Prototype hash={flow.hash} /></div>
        </div>
      </Section>

      {/* Outcome */}
      <Section id="outcome" tone="raised">
        <SectionHeader label="06 · Outcome" title="From fragmented search to a suite-wide standard." intro={cs.outcome} />
        <div className="grid md:grid-cols-3 gap-4">
          {(cs.highlights ?? []).map(h => <blockquote key={h} className="card text-body-lg text-white m-0">{h}</blockquote>)}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/craft" className="btn btn-secondary">All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about AI search</Link>
        </div>
      </Section>

      {zoom && <Lightbox screen={zoom} onClose={() => setZoom(null)} />}
    </div>
  )
}

function Lightbox({ screen, onClose }: { screen: Screen; onClose: () => void }) {
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
          <span className="text-caption text-ink-2">{screen.id.replace('-', '.')} — {screen.name}</span>
          <a href={screen.img} target="_blank" rel="noopener noreferrer" className="text-caption text-ink-2 hover:text-white underline" onClick={e => e.stopPropagation()}>Open at full resolution ↗</a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} autoFocus>Close</button>
        </div>
      </div>
    </div>
  )
}
