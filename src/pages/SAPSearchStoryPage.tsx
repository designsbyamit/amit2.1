import Breadcrumb from '../components/ds/Breadcrumb'
import { heroClass, heroStyle } from '../data/caseTheme'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/work'
import { sapSearch as S } from '../data/sapSearch'

import SectionHeader from '../components/ds/SectionHeader'
import CaseThumb from '../components/ds/CaseThumb'
import SearchAnatomy from '../components/case/SearchAnatomy'
import { Fragmented, Workstreams, OpportunityVenn, CAPABILITIES, PatternAnatomy, PATTERN_ZONES, RowAnatomy, ROW_PARTS } from '../components/case/search/SearchDiagrams'
import AISummary from '../components/case/search/AISummary'
import GlobalSearch from '../components/case/search/GlobalSearch'

const cs = caseStudies.find(c => c.id === 'sap-search')!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

const AI_VERBS: [string, string][] = [['Informational AI', 'answers and explains'], ['Transactional AI', 'does the task'], ['Analytical AI', 'finds the signal'], ['Generative AI', 'drafts and summarises']]
const PILLARS: [string, string][] = [
  ['Consistent', 'One search field in every shell bar, and one results page every product can use.'],
  ['User friendly', 'Ask in a sentence, the way you would ask a colleague, and get an answer you can act on.'],
  ['Contextual', 'Results shaped by who you are and where you are, carried into the product where the work happens.'],
]

export default function SAPSearchStoryPage() {
  const flows = S.flows.filter(f => !['component', 'results'].includes(f.id))
  const results = S.flows.find(f => f.id === 'results')!
  const [active, setActive] = useState(flows[0].id)
  const [live, setLive] = useState<string | null>(null)
  const flow = flows.find(f => f.id === active)!

  return (
    <div className="bg-surface-0 min-h-screen">
      {/* Hero */}
      <header className={heroClass(cs.id)} style={{ paddingTop: 'var(--header-h)', ...heroStyle(cs.id) }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'AI-Powered Search' }]} />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-10">
            <div className="lg:col-span-5">
              <p className="text-overline text-ink-3">{cs.category}</p>
              <h1 className="text-display-l text-white mt-5">{cs.title}</h1>
              <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">{cs.tagline}</p>
            </div>
            <figure className="lg:col-span-7 m-0">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-3)' }}><CaseThumb id="sap-search" live flush /></div>
              <figcaption className="text-caption text-ink-3 mt-3">One sentence to a booked, policy-compliant trip. From the prototype.</figcaption>
            </figure>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top">
            {[['Role', cs.role], ['Timeline', cs.timeline], ['Team', '8 designers, 3 workstreams'], ['Status', 'Validated, prototyped']].map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      {/* 01 · Problem */}
      <Section id="problem">
        <SectionHeader label="01 · The problem" title="Every product had its own search." intro="Each application shipped its own search box, with its own vocabulary and its own rules. A question that crossed products, such as a trip, a supplier or a contract, had no single place to start." />
        <Fragmented />
        <p className="text-caption text-ink-3 mt-3">Illustrative: the kinds of difference people met from one product to the next.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-14">
          {S.challenges.map(c => (
            <div key={c.area} className="card">
              <p className="text-overline text-ink-3">{c.area}</p>
              <ul className="mt-5 space-y-3 list-none p-0">{c.items.map(i => <li key={i} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">·</span>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="text-body text-ink-2 mt-6 max-w-measure-xl">Twelve pain points, heard in conversations with line of business stakeholders before any design started.</p>
      </Section>

      {/* 02 · The idea: global search */}
      <Section id="global" tone="raised">
        <SectionHeader label="02 · The idea" title="One search, in every application." intro="This is a global search. It lives in the shell bar of every application, answers with results from all of them, and when someone acts on a result it opens that application with the question and the choice already carried across." />
        <GlobalSearch />
      </Section>

      {/* 03 · Direction */}
      <Section id="vision">
        <SectionHeader label="03 · Direction" title="We listened first, then wrote the vision." intro="The conversations shaped the vision and its principles, written in Figma before any screen: one search across every application, and a path from a question to the work that follows it." />
        <div className="grid md:grid-cols-3 gap-4">
          {PILLARS.map(([t, d], i) => (
            <div key={t} className="card">
              <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-title text-ink mt-3">{t}</p>
              <p className="text-body text-ink-2 mt-3">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-3 rounded-lg p-6 md:p-8 bg-surface-2">
          <p className="text-overline text-ink-3">Two questions we kept open</p>
          <div className="space-y-3">
            <p className="text-body-lg text-ink">How does search hand over to the conversational assistant?</p>
            <p className="text-body-lg text-ink">How much should a result show before the list stops being scannable?</p>
          </div>
        </div>
      </Section>

      {/* 03 · Organising the work */}
      <Section id="workstreams" tone="raised">
        <SectionHeader label="04 · Organising the work" title="Three workstreams along one journey." intro="With the vision written, the work was split across eight designers in three groups. Each owned one stretch of the journey rather than one product, so the seams between them were exactly where search needed to feel like one thing." />
        <Workstreams />
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {S.transition.items.map(c => <div key={c.t} className="card"><p className="text-overline text-ink-3">Where workstream 3 lands</p><p className="text-title text-ink mt-3">{c.t}</p><p className="text-body text-ink-2 mt-3">{c.d}</p></div>)}
        </div>
      </Section>

      {/* 04 · Opportunity */}
      <Section id="explore">
        <SectionHeader label="05 · Finding the opportunity" title="Where search, AI and real problems meet." intro="Every idea had to answer all three at once: what kind of search it needs, what kind of AI makes it possible, and which problem people actually have. Ideas that met only one or two were set aside." />
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div className="max-w-xl w-full mx-auto"><OpportunityVenn /></div>
          <div className="space-y-10">
            <div>
              <p className="text-overline text-ink-3 mb-4">4 AI offerings</p>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">{AI_VERBS.map(([a, v]) => <div key={a} className="flex items-baseline gap-3 hairline-top pt-3"><dt className="text-body text-ink">{a}</dt><dd className="text-body-sm text-ink-3">{v}</dd></div>)}</dl>
            </div>
            <div>
              <p className="text-overline text-ink-3 mb-4">9 search functionalities</p>
              <div className="flex flex-wrap gap-2">{S.searchFunctionalities.map(([t]) => <span key={t} className="tag">{t}</span>)}</div>
              <details className="mt-4">
                <summary className="text-body-sm text-ink-2 cursor-pointer">What each one does</summary>
                <dl className="mt-4">{S.searchFunctionalities.map(([t, d]) => <div key={t} className="py-3 grid sm:grid-cols-[160px_1fr] gap-2 hairline-top"><dt className="text-body-sm text-ink">{t}</dt><dd className="text-body-sm text-ink-2">{d}</dd></div>)}</dl>
              </details>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div><p className="text-overline text-ink-3 mb-4">Search mechanics</p><div className="flex flex-wrap gap-2">{S.mechanics.map(m => <span key={m} className="tag">{m}</span>)}</div></div>
              <div><p className="text-overline text-ink-3 mb-4">AI functionalities</p><div className="flex flex-wrap gap-2">{S.aiFunctionalities.map(m => <span key={m} className="tag">{m}</span>)}</div></div>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 · Capabilities */}
      <Section id="recommendations" tone="raised">
        <SectionHeader label="06 · Ten capabilities" title="What one search needs to do, and why." intro="The intersection became ten recommendations. Each one answers a pain point from the conversations and names the capability that makes it possible." />
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
          {CAPABILITIES.map((c, i) => (
            <li key={c.t} className="card flex flex-col gap-5 min-w-0">
              <div aria-hidden>{c.visual}</div>
              <div>
                <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-title text-ink mt-2">{c.t}</p>
                <p className="text-body text-ink-2 mt-3">{c.why}</p>
                <p className="text-caption text-ink-3 mt-4"><span className="text-overline">Answers</span> · {c.answers}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 · Patterns */}
      <Section id="patterns">
        <SectionHeader label="07 · Common patterns" title="The anatomy of one results page." intro="Ten capabilities only help if every product applies them the same way. So the patterns were defined by the moment they serve on the page, and each one placed where it lives." />
        <PatternAnatomy />
        <p className="text-caption text-ink-3 mt-3">The results page for “Pending POs for material MOB-00123”, redrawn from the design.</p>
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 list-none p-0">
          {PATTERN_ZONES.map((z, i) => (
            <li key={z.t} className="card">
              <span className="inline-grid place-items-center rounded-full bg-surface-3 text-label text-ink" style={{ width: 'var(--space-30)', height: 'var(--space-30)' }}>{i + 1}</span>
              <p className="text-title text-ink mt-4">{z.t}</p>
              <p className="text-body-sm text-ink-2 mt-3">{z.d}</p>
              <ul className="mt-4 space-y-1 list-none p-0">{z.p.map(p => <li key={p} className="text-caption text-ink-3">{p}</li>)}</ul>
            </li>
          ))}
        </ol>
        <h3 className="text-heading text-ink mt-24">One row, nine parts</h3>
        <p className="text-body-lg text-ink-2 mt-4 mb-10 max-w-measure-xl">Every product returns the same row, so a purchase order, a goal and a statement of work read the same way. Only the attributes and actions change with the entity type.</p>
        <RowAnatomy />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 mt-8 list-none p-0">
          {ROW_PARTS.map(([t, d], i) => <li key={t} className="py-4 hairline-top flex gap-4"><span className="text-label text-ink-3 w-5 shrink-0">{i + 1}</span><span><span className="text-body text-ink block">{t}</span><span className="text-body-sm text-ink-2">{d}</span></span></li>)}
        </ol>
        <figure className="m-0 mt-12">
          <img src={`${import.meta.env.BASE_URL}images/case-studies/sap-search/row-actions.webp`} alt="A requisition result with Approve and Reject on the row, and the same row after approval showing Approved" width={2688} height={776} loading="lazy" decoding="async" className="w-full h-auto block rounded-lg bg-white" />
          <figcaption className="text-caption text-ink-3 mt-3">Inline actions change state on the row: Approve and Reject become Approved, without leaving the results.</figcaption>
        </figure>

        <h3 className="text-heading text-ink mt-24">An AI summary you can trace</h3>
        <p className="text-body-lg text-ink-2 mt-4 mb-10 max-w-measure-xl">The summary is collapsed by default, so results stay in view. Each insight carries a link to its sources. We explored two ways to show them: a reference panel beside the summary, and focusing the results that produced the insight at the top of the list. Try both.</p>
        <AISummary />

        <details className="mt-8">
          <summary className="text-body-sm text-ink-2 cursor-pointer">The full pattern library, by moment in the journey</summary>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {S.patternGroups.map(g => (
              <div key={g.title} className="card">
                <p className="text-title text-ink">{g.title}</p>
                <ul className="mt-4 space-y-2 list-none p-0">{g.items.map(it => <li key={it} className="text-body-sm text-ink-2">{it}</li>)}</ul>
              </div>
            ))}
          </div>
          <dl className="grid md:grid-cols-2 gap-x-10 mt-6">
            {S.patternDefinitions.map(([t, d]) => <div key={t} className="py-4 hairline-top"><dt className="text-body text-ink">{t}</dt><dd className="text-body-sm text-ink-2 mt-1">{d}</dd></div>)}
          </dl>
        </details>
      </Section>

      {/* 07 · Experience */}
      <Section id="experience" tone="raised">
        <SectionHeader label="08 · The experience" title="From the search field to the results page." intro="The component is specified, not sketched: anatomy, spacing, states and behaviour from the first focus to Enter. Built entirely with native enterprise UI components." />
        <h3 className="text-heading text-ink">The search input</h3>
        <p className="text-body-lg text-ink-2 mt-4 max-w-measure-xl">{S.flows[0].summary}</p>
        <SearchAnatomy />

        <h3 className="text-heading text-ink mt-24">The results page</h3>
        <p className="text-body-lg text-ink-2 mt-4 max-w-measure-xl">One layout for every question: the question as the title, an AI overview that names its sources, results from every application filtered by application with counts, and rows built from the same parts. Each row says which application it comes from and carries the actions that fit it.</p>
        <LiveButton onOpen={() => setLive(results.hash)} />

        <h3 className="text-heading text-ink mt-24">Into the products</h3>
        <p className="text-body-lg text-ink-2 mt-4 max-w-measure-xl">Workstream 3 at work: the action on a result opens the right application with the context already in place. Each journey starts from a different application, because the search is in all of them.</p>
        <div className="flex flex-wrap gap-2 mt-8 mb-8" role="tablist" aria-label="Journeys">
          {flows.map(f => (
            <button key={f.id} type="button" role="tab" aria-selected={f.id === active} className="chip" onClick={() => setActive(f.id)}>{f.title.replace('Use case: ', '')}</button>
          ))}
        </div>
        <div role="tabpanel">
          <p className="text-body text-ink-2 max-w-measure-xl">{flow.summary}</p>
          <LiveButton onOpen={() => setLive(flow.hash)} />
        </div>
      </Section>

      {/* 08 · Outcome */}
      <Section id="outcome">
        <SectionHeader label="09 · Outcome" title="Back to the vision." intro={`${cs.outcome} Each principle can now be shown, not just stated.`} />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['Consistent', 'One search field specified for every shell bar, with its anatomy and five states, and one results layout shared by every product.'],
            ['User friendly', 'Natural language, type-ahead and an AI overview that names its sources, so a sentence is enough to start.'],
            ['Contextual', 'Journeys where a result opens the right application, wherever the person started, with the context carried across.'],
          ].map(([t, d]) => <div key={t} className="card"><p className="text-overline text-ink-3">{t}</p><p className="text-body-lg text-ink mt-4">{d}</p></div>)}
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <div>
            <p className="text-overline text-ink-3">What exists now</p>
            <ul className="mt-5 space-y-3 list-none p-0 text-body text-ink-2">
              <li>A direction tested and validated, and a Figma prototype.</li>
              <li>A live prototype built with UI5 Web Components, covering six journeys.</li>
              <li>Ten capability recommendations and a pattern library organised by the moment it serves.</li>
            </ul>
          </div>
          <div>
            <p className="text-overline text-ink-3">What the work shows about the approach</p>
            <ul className="mt-5 space-y-3 list-none p-0 text-body text-ink-2">
              <li>Start by listening, and write the vision from what people said.</li>
              <li>Split the team by stretches of the journey, not by product, so consistency is designed at the seams.</li>
              <li>Keep the hard questions open: the hand-over to the assistant and result density are still worth asking.</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/craft" className="btn btn-secondary">All case studies</Link>
          <Link to="/contact" className="btn btn-primary">Talk about AI search</Link>
        </div>
      </Section>

      {live && <LivePrototype hash={live} onClose={() => setLive(null)} />}
    </div>
  )
}

function LiveButton({ onOpen }: { onOpen: () => void }) {
  return <div className="mt-8 flex flex-wrap items-center gap-4">
    <button type="button" className="btn btn-secondary" onClick={onOpen}>Try it in the live prototype</button>
    <span className="text-caption text-ink-3">Opens over the page. Built with UI5 Web Components.</span>
  </div>
}

function useDialog(onClose: () => void) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
}

function LivePrototype({ hash, onClose }: { hash: string; onClose: () => void }) {
  useDialog(onClose)
  return (
    <div role="dialog" aria-modal="true" aria-label="Live prototype" className="fixed inset-0 z-dialog bg-black/90 flex flex-col p-3 md:p-8 gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-caption text-ink-2">Interactive prototype · UI5 Web Components</span>
        <div className="flex items-center gap-3">
          <a href={`${S.prototype}#${hash}`} target="_blank" rel="noopener noreferrer" className="text-caption text-ink-2 hover:text-white underline">Open in a new tab ↗</a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} autoFocus>Close</button>
        </div>
      </div>
      <iframe title="AI-Powered Search prototype" src={`${S.prototype}#${hash}`} className="w-full flex-1 block bg-white rounded-md" />
    </div>
  )
}
