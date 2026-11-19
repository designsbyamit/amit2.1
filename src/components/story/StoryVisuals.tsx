// Diagrams for the short stories (v2). Drawn in the site tokens, so they follow the light and dark themes.
// Each one carries a single idea from its beat. Copy comes from docs/short-stories-v2-outlines.md.
import { lazy, Suspense, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AsIsFlowV2 from '../agentic/v2/AsIsFlowV2'
import RiskVisual from '../agentic/RiskVisual'
import { Spectrum } from './Spectrum'
import { story as AG } from '../../data/sapAgenticV2Story'
import { sapAgenticV2 as AGD } from '../../data/sapAgenticV2'

const Collage = lazy(() => import('../illustrations/travel/Collage'))

const ease = [0.16, 1, 0.3, 1] as const

/** Appears once, gently, when it scrolls into view. Static for reduced motion. */
function Rise({ children, i = 0, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.6, delay: i * 0.08, ease }}>{children}</motion.div>
}

const Label = ({ children, className = '' }: { children: ReactNode; className?: string }) => <p className={`text-label text-ink-3 ${className}`}>{children}</p>
const Big = ({ children, className = '' }: { children: ReactNode; className?: string }) => <p className={`font-serif text-ink leading-none ${className}`} style={{ fontSize: 'var(--fs-d-l)' }}>{children}</p>

/* ───────────── agentic ───────────── */

function AgenticSplit() {
  const does = ['Extracts each field, with a confidence score', 'Finds every difference and rates it', 'Explains each difference in plain words', 'Routes each one to its owner', 'Drafts the reply to the supplier', 'Logs everything it does']
  const never = ['Accepts or rejects a difference', 'Confirms its own extraction', 'Writes to the supplier']
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <Rise className="rounded-3 border p-6 md:p-8" >
        <Label>The agent does</Label>
        <ul className="mt-6 space-y-4">{does.map(d => <li key={d} className="flex gap-3 text-body-lg text-ink"><span className="mt-2 h-2 w-2 rounded-full bg-signal shrink-0" aria-hidden="true" />{d}</li>)}</ul>
        <p className="text-body-sm text-ink-3 mt-8">The work: reading, comparing, drafting.</p>
      </Rise>
      <Rise i={1} className="rounded-3 p-6 md:p-8 bg-surface-1 border">
        <Label>The agent never</Label>
        <ul className="mt-6 space-y-4">{never.map(d => <li key={d} className="flex gap-3 text-body-lg text-ink"><span className="mt-2 h-2 w-2 rounded-full border border-current shrink-0" aria-hidden="true" />{d}</li>)}</ul>
        <p className="text-body-sm text-ink-3 mt-8">The judgement stays with people. Is net 45 days acceptable? Do 500 fewer units still cover the store?</p>
      </Rise>
    </div>
  )
}

function AgenticLadder() {
  const reduce = useReducedMotion()
  const levels = AGD.autonomy.levels as { name: string; text: string; state: 'floor' | 'today' | 'next' }[]
  const h = ['h-40', 'h-56', 'h-72']
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 items-end">
      {levels.map((l, i) => (
        <motion.div key={l.name} className={`rounded-3 p-4 md:p-6 flex flex-col justify-end relative ${h[i]} ${l.state === 'today' ? 'bg-ink text-surface-0' : 'border'}`}
          style={{ borderStyle: l.state === 'next' ? 'dashed' : undefined, borderColor: l.state === 'next' ? 'var(--signal-ink)' : undefined, transformOrigin: 'bottom' }}
          initial={reduce ? false : { scaleY: 0.3, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease }}>
          <span className={`absolute top-3 left-4 md:top-4 md:left-6 text-label ${l.state === 'today' ? 'rounded-full bg-signal text-signal-on px-2 py-0.5' : 'text-ink-3'}`}>{l.state === 'today' ? 'Today' : l.state === 'next' ? 'Earned later' : 'Floor'}</span>
          <p className="text-title">{l.name}</p>
          <p className="text-body-sm mt-2 opacity-80 hidden md:block">{l.text}</p>
        </motion.div>
      ))}
    </div>
  )
}

function AgenticSignals() {
  const signals = [
    { k: 'Did I read it right?', s: 'Extraction signals', out: 'Confidence', term: '0.25 × (1 − confidence)', tone: 'var(--risk-medium)', ex: ['“voraussichtlich Kalenderwoche 13” is an approximate week, not a date. The agent infers it at low confidence and asks for a written date instead of trusting its guess.', 'A column headed “PREIS” is mapped to unit price, and the mapping is shown.'] },
    { k: 'What actually differs?', s: 'Deviation signals', out: 'Severity', term: '0.55 × deviation', tone: 'var(--risk-high)', ex: ['Each difference is measured against what it does downstream, not against a flat percentage.'] },
    { k: 'Error or pattern?', s: 'Context signals', out: 'Supplier history', term: '0.20 × history', tone: 'var(--risk-low)', ex: ['A third price deviation from the same supplier in a year is a pattern, not a typo.'] },
  ]
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 md:gap-4">
        {signals.map((s, i) => (
          <Rise key={s.k} i={i} className="rounded-3 border p-5 md:p-6 flex flex-col">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.tone }} aria-hidden="true" /><Label>{s.s}</Label></div>
            <p className="font-serif text-ink mt-4" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.25 }}>{s.k}</p>
            <div className="mt-4 space-y-3 flex-1">{s.ex.map(e => <p key={e} className="text-body-sm text-ink-2">{e}</p>)}</div>
            <p className="text-label mt-6 pt-4 border-t" style={{ borderColor: 'var(--line-1)', color: s.tone }}>Gives {s.out.toLowerCase()}</p>
          </Rise>
        ))}
      </div>
      {/* the three signals converge */}
      <Rise i={3} className="relative mt-3 md:mt-4">
        <svg viewBox="0 0 300 24" className="w-full h-6 hidden md:block" preserveAspectRatio="none" aria-hidden="true">
          {[50, 150, 250].map(x => <path key={x} d={`M${x} 0 C${x} 14 150 10 150 24`} fill="none" stroke="var(--line-2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
        </svg>
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          <div className="rounded-3 bg-surface-1 border p-5 md:p-6">
            <Label>Order risk</Label>
            <p className="text-title text-ink mt-3">One verdict from three signals</p>
          </div>
          <div className="rounded-3 bg-surface-1 border p-5 md:p-6">
            <Label>Recommendation</Label>
            <p className="text-title text-ink mt-3">With its reason, in plain words</p>
          </div>
        </div>
      </Rise>
      <Rise i={4} className="mt-3 md:mt-4 rounded-3 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-8" >
        <div className="rounded-3 border-2 border-dashed p-5 md:p-6 w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-8" style={{ borderColor: 'var(--risk-high)' }}>
          <p className="text-label shrink-0" style={{ color: 'var(--risk-high)' }}>Hard stops</p>
          <p className="text-body text-ink-2">Some issues block approval whatever the score, such as a missing mandatory certificate. A weighted score can hide one catastrophic input behind several good ones.</p>
        </div>
      </Rise>
      <Rise i={5} className="mt-8">
        <p className="font-mono text-body-sm text-ink overflow-x-auto whitespace-nowrap pb-1">Risk = <span style={{ color: 'var(--risk-high)' }}>0.55 × deviation</span> + <span style={{ color: 'var(--risk-medium)' }}>0.25 × (1 − confidence)</span> + <span style={{ color: 'var(--risk-low)' }}>0.20 × history</span></p>
        <p className="text-body-sm text-ink-3 mt-2">The weights we proposed as a starting point, to be tuned against real orders. Hard stops override the score.</p>
      </Rise>
    </div>
  )
}

function AgenticValue() {
  const items: [string, string][] = [
    ['Attention where it is needed.', 'The worklist is ordered by order risk, then order value, so the risky confirmations come first.'],
    ['Reading and comparing done.', 'No one checks a German PDF against the order line by line.'],
    ['Uncertainty shown, not hidden.', 'A low-confidence field is flagged next to the source document, so no one acts on a guess.'],
    ['Each decision with its owner.', 'Cost to the buyer, quantity and dates to the goods recipient, and nothing sent without a person.'],
    ['Every round tracked.', 'A revised confirmation comes back as a new version, so what was agreed in the last round is never lost.'],
    ['One trail for every action.', 'The agent and each person are named on one timeline, so an escalation already carries its reasoning.'],
  ]
  return (
    <div>
      <ol className="grid md:grid-cols-2 gap-x-10">
        {items.map(([t, d], i) => (
          <Rise key={t} i={i} className="hairline-top py-5 flex gap-5">
            <span className="text-label text-signal-ink tabular-nums pt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-body text-ink-2"><span className="text-ink">{t}</span> {d}</p>
          </Rise>
        ))}
      </ol>
      <Rise i={6} className="hairline-top pt-5 mt-2">
        <p className="text-body text-ink-2"><span className="text-label text-ink-3 mr-3">For the organisation</span><span className="text-ink">Five patterns built to be reused</span> in other agentic workflows across supply chain.</p>
      </Rise>
    </div>
  )
}

/* ───────────── search ───────────── */

function SearchGap() {
  return (
    <div className="rounded-3 border px-6 md:px-12">
      <Spectrum at={0.04} large gap />
      <div className="grid grid-cols-2 gap-6 pb-8 md:pb-12 -mt-2">
        <p className="text-body-sm text-ink-3">Traditional search: keywords, its own rules in every application.</p>
        <p className="text-body-sm text-ink-3 text-right">A modern AI assistant: a conversation.</p>
      </div>
    </div>
  )
}

function SearchHandoff() {
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center">
      <Rise className="rounded-3 border p-5 md:p-6">
        <Label>A result</Label>
        <p className="text-title text-ink mt-3">Education policy</p>
        <p className="text-body-sm text-ink-3 mt-1">Policy · Updated this year</p>
        <p className="text-body-sm text-ink-2 mt-4">Covers courses, certifications and how much of the cost is reimbursed.</p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal text-signal-on px-4 py-2 text-body-sm">Continue in the assistant</p>
      </Rise>
      <div className="flex md:block justify-center text-ink-3" aria-hidden="true">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-90 md:rotate-0"><path d="M2 12h34M28 4l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <Rise i={1} className="rounded-3 bg-surface-1 border p-5 md:p-6 space-y-3">
        <Label>The assistant</Label>
        <p className="rounded-3 bg-surface-2 px-4 py-3 text-body-sm text-ink-3">From your search: Education policy</p>
        <p className="ml-auto max-w-xs rounded-3 bg-ink text-surface-0 px-4 py-3 text-body-sm">Does it cover an online course?</p>
        <p className="max-w-xs rounded-3 border px-4 py-3 text-body-sm text-ink-2">Yes, if it relates to your role. Here is what the policy says.</p>
        <p className="text-label text-ink-3 opacity-60 pt-2">How far this goes is evolving</p>
      </Rise>
      <p className="md:col-span-3 text-body-sm text-ink-3">Sample text.</p>
    </div>
  )
}

/* ───────────── HR suite ───────────── */

function EngazeBubble() {
  return (
    <div className="rounded-3 bg-surface-1 border p-6 md:p-12 flex flex-col gap-4">
      <Label>Esha · Employee</Label>
      <Rise className="ml-auto max-w-3xl rounded-3 bg-ink text-surface-0 px-6 py-5 md:px-10 md:py-8 font-serif" >
        <span style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.2 }}>I need a sick leave for today.</span>
      </Rise>
    </div>
  )
}

function EngazeIntent() {
  const facts: [string, string][] = [['Sick leave, for today', 'The leave type and the date'], ['5 of 12 days left', 'Her balance'], ['What the policy allows', 'Read before anything is applied'], ['Her manager and team', 'Who needs to know']]
  return (
    <div className="grid md:grid-cols-[1fr_1.4fr_1.2fr] gap-4 md:gap-6 items-stretch">
      <Rise className="rounded-3 bg-ink text-surface-0 p-5 md:p-6 self-start">
        <p className="text-label opacity-70">Esha</p>
        <p className="font-serif mt-3" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>I need a sick leave for today.</p>
      </Rise>
      <ol className="space-y-2">
        {facts.map(([t, d], i) => (
          <Rise key={t} i={i + 1} className="rounded-3 border px-5 py-4 flex items-baseline gap-4">
            <span className="text-label text-signal-ink tabular-nums shrink-0">{i + 1}</span>
            <span><span className="text-body text-ink block">{t}</span><span className="text-body-sm text-ink-3">{d}</span></span>
          </Rise>
        ))}
      </ol>
      <Rise i={5} className="rounded-3 bg-surface-1 border p-5 md:p-6 self-end">
        <p className="text-label text-ink-3">The companion</p>
        <p className="text-body-lg text-ink mt-3">Sorry you’re unwell, Esha. I’ve got sick leave ready for today. Have a look before I apply it.</p>
        <div className="mt-5 flex gap-2"><span className="rounded-full bg-signal text-signal-on px-4 py-1.5 text-body-sm">Apply</span><span className="rounded-full border px-4 py-1.5 text-body-sm text-ink-2">Change</span></div>
      </Rise>
    </div>
  )
}

const ChipGrid = ({ items }: { items: [string, string][] }) => (
  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {items.map(([a, b], i) => (
      <Rise key={a} i={i}>
        <li className="rounded-3 border px-5 py-5 h-full">
          <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-title)' }}>{a}</p>
          <p className="text-body-sm text-ink-3 mt-2">{b}</p>
        </li>
      </Rise>
    ))}
  </ul>
)

const EngazeQueries = () => <ChipGrid items={[['A fact', '“My leave balance”'], ['An action', '“Apply for leave”'], ['A chart', '“Show my CTC breakup”'], ['A draft', '“Write a feedback”'], ['An analysis', '“Old versus new tax regime for me”']]} />
const EngazePrinciples = () => <ChipGrid items={[['Trust', 'Sources on every answer'], ['Guidance', 'Never a dead end'], ['Discoverability', 'Capabilities in context'], ['Cognitive simplicity', 'One decision per screen'], ['Continuity', 'One thread, every device']]} />

function EngazePersona() {
  const cards = [{ n: 'The Caregiver', t: ['Warm', 'Caring', 'Reassuring', 'Supportive'] }, { n: 'The Sage', t: ['Knowledgeable', 'Clear', 'Calm', 'Objective'] }]
  return (
    <div>
      <Label>An example, built with the method</Label>
      <div className="grid md:grid-cols-[1fr_1fr_1.2fr] gap-3 md:gap-4 mt-4">
        {cards.map((c, i) => (
          <Rise key={c.n} i={i} className="rounded-3 border p-5 md:p-6">
            <p className="text-label text-ink-3">Archetype {i + 1}</p>
            <p className="font-serif text-ink mt-3" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.1 }}>{c.n}</p>
            <ul className="flex flex-wrap gap-2 mt-5">{c.t.map(t => <li key={t} className="tag">{t}</li>)}</ul>
          </Rise>
        ))}
        <Rise i={2} className="rounded-3 bg-surface-1 border p-5 md:p-6 flex flex-col">
          <p className="text-label text-ink-3">The tone it produces</p>
          <p className="text-body-sm text-ink-3 mt-3">Warm first, then clear. Short sentences. Never more than it needs to say.</p>
          <p className="mt-auto pt-6 rounded-3 text-ink font-serif" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.3 }}>“Sorry you’re unwell, Esha. Rest up.”</p>
        </Rise>
      </div>
    </div>
  )
}

/* ───────────── travel ───────────── */

const Figures = ({ items, cols = 3 }: { items: [string, string][]; cols?: 3 | 4 }) => (
  <dl className={`grid grid-cols-2 ${cols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-x-6 gap-y-10`}>
    {items.map(([v, l], i) => (
      <Rise key={l} i={i} className="hairline-top pt-5">
        <dt className="sr-only">{l}</dt>
        <dd><Big>{v}</Big></dd>
        <dd className="text-body-sm text-ink-3 mt-3 max-w-xs">{l}</dd>
      </Rise>
    ))}
  </dl>
)

const TravelScale = () => <Figures items={[['30M+', 'Guests a year (public figure, for scale)'], ['95+', 'Destinations (public figure, for scale)'], ['5 years', 'Of digital transformation, of which this was part']]} />
const TravelAudit = () => <Figures items={[['183', 'Issues on one homepage'], ['21', 'Of them major'], ['54', 'Competitors in the benchmark']]} />
const TravelResults = () => <Figures cols={4} items={[['9 → 2', 'Steps to check in'], ['4 min', 'To book a flight, for returning customers'], ['30%', 'Less effort to choose a seat'], ['4.7', 'App store rating, up from about 3']]} />

function TravelTrip() {
  const reduce = useReducedMotion()
  const stages = ['Discovery', 'Booking', 'Checkout', 'Pre-trip', 'Pre-flight', 'In-flight', 'Post-flight', 'On trip', 'Post trip']
  // each use case sits on the stage where it first shows up
  const cases: [string, number][] = [
    ['Multi-city trip', 0], ['Mixed cabins', 1], ['Branded fares', 1], ['Infant on a lap', 1], ['Booking on hold', 2], ['Pay later', 2], ['Group booking', 2],
    ['Missing passport details', 3], ['Transit visa', 3], ['eVisa', 3], ['Seat and add-ons', 3], ['Group check-in', 4], ['Update passenger info', 4],
    ['Boarding pass', 4], ['Delay rebooking', 5], ['Missed connection', 6], ['Baggage claim', 6], ['Hotel and car', 7], ['Refund', 8], ['Feedback', 8],
  ]
  return (
    <div>
      {/* phones: one stage per row */}
      <ol className="md:hidden space-y-4" aria-label="Nine stages of a trip, with the use cases that each had to feel like the same app">
        {stages.map((s, i) => (
          <li key={s} className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
            <div>
              <p className="text-label text-ink-3">{s}</p>
              <ul className="flex flex-wrap gap-1.5 mt-2">{cases.filter(c => c[1] === i).map(([c]) => <li key={c} className="rounded-2 border px-2 py-1 text-t-caption text-ink-2">{c}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
      {/* wider screens: the trip as one line */}
      <ol className="hidden md:grid grid-cols-9 gap-1" aria-hidden="true">
        {stages.map((s, i) => {
          const here = cases.filter(c => c[1] === i)
          return (
            <li key={s} className="flex flex-col">
              <div className="flex flex-col-reverse gap-1.5 min-h-panel justify-start pb-3">
                {here.map(([c], j) => (
                  <motion.span key={c} className="rounded-2 border px-2 py-1.5 text-t-caption text-ink-2 leading-tight"
                    initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.07 + j * 0.05, ease }}>{c}</motion.span>
                ))}
              </div>
              <div className="relative h-4">
                <div className="absolute inset-x-0 top-1/2 h-px bg-ink-3" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-signal" />
              </div>
              <p className="text-label text-ink-3 mt-2">{s}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function TravelPods() {
  const pods = ['Home and more', 'Booking', 'Ancillaries', 'Check-in', 'Manage bookings']
  return (
    <div>
      <div className="rounded-3 border border-dashed p-4 md:p-6">
        <Label className="text-center">Client stakeholders · Legal · Marketing</Label>
        <ol className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {pods.map((p, i) => (
            <Rise key={p} i={i} className="rounded-3 bg-surface-1 border p-4 md:p-5">
              <p className="text-label text-signal-ink tabular-nums">Pod {i + 1}</p>
              <p className="text-title text-ink mt-2">{p}</p>
              <ul className="mt-4 space-y-1.5">{['Design', 'Product', 'Engineering'].map(r => <li key={r} className="flex items-center gap-2 text-body-sm text-ink-3"><span className="h-1.5 w-1.5 rounded-full bg-ink-3" aria-hidden="true" />{r}</li>)}</ul>
            </Rise>
          ))}
        </ol>
        <Rise i={5} className="mt-3 rounded-3 bg-ink text-surface-0 px-5 py-4 text-center text-body">One design language under every pod</Rise>
      </div>
      <div className="mt-10"><Figures items={[['400+', 'Components in the design language'], ['6,000+', 'Screens delivered'], ['4', 'Time zones, across eight cities']]} /></div>
    </div>
  )
}

/* ───────────── registry ───────────── */

export default function StoryDiagram({ name }: { name: string }) {
  switch (name) {
    case 'agentic-asis': return <AsIsFlowV2 steps={AG.asis} />
    case 'agentic-split': return <AgenticSplit />
    case 'agentic-ladder': return <AgenticLadder />
    case 'agentic-signals': return <AgenticSignals />
    case 'agentic-risk': return <RiskVisual chain={AGD.risk.chain} examples={AGD.risk.examples} orderRisk={AGD.risk.orderRisk} confidence={AGD.risk.confidence} note="Five real differences from one order in the prototype" />
    case 'agentic-value': return <AgenticValue />
    case 'search-gap': return <SearchGap />
    case 'search-handoff': return <SearchHandoff />
    case 'engaze-bubble': return <EngazeBubble />
    case 'engaze-intent': return <EngazeIntent />
    case 'engaze-queries': return <EngazeQueries />
    case 'engaze-principles': return <EngazePrinciples />
    case 'engaze-persona': return <EngazePersona />
    case 'travel-scale': return <TravelScale />
    case 'travel-trip': return <TravelTrip />
    case 'travel-audit': return <TravelAudit />
    case 'travel-pods': return <TravelPods />
    case 'travel-results': return <TravelResults />
    case 'travel-collage': return <Suspense fallback={<div className="rounded-3 bg-surface-2" style={{ aspectRatio: '16 / 9' }} />}><Collage /></Suspense>
    default: return null
  }
}
