// Diagrams and product fragments for the AI-Powered Search case study.
// The diagrams use the site tokens (they follow the light and dark themes). The product fragments draw a light enterprise UI on purpose.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* ───────── shared ───────── */
/** Draws a fixed-size composition and scales it to the width of its container, so a product view never overflows on a phone. */
export function Scaled({ w, h, children, className = '', minW = 0 }: { w: number; /** Fixed design height, or 'auto' to follow the content. */ h: number | 'auto'; children: ReactNode; className?: string; /** Below this container width the view keeps this width and scrolls sideways instead of shrinking further. */ minW?: number }) {
  const ref = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(w)
  const [ch, setCh] = useState(typeof h === 'number' ? h : 0)
  useEffect(() => { const el = ref.current; if (!el) return; const ro = new ResizeObserver(() => setCw(el.clientWidth)); ro.observe(el); setCw(el.clientWidth); return () => ro.disconnect() }, [])
  useEffect(() => { if (h !== 'auto') return; const el = inner.current; if (!el) return; const ro = new ResizeObserver(() => setCh(el.offsetHeight)); ro.observe(el); setCh(el.offsetHeight); return () => ro.disconnect() }, [h])
  const k = Math.max(cw, minW) / w, H = typeof h === 'number' ? h : ch
  return <div ref={ref} className={className} style={{ overflowX: cw < minW ? 'auto' : 'visible' }}>
    <div style={{ height: H * k, width: w * k, position: 'relative', transition: 'height .25s' }}>
      <div ref={inner} style={{ width: w, height: typeof h === 'number' ? h : undefined, transform: `scale(${k})`, transformOrigin: '0 0', position: 'absolute', left: 0, top: 0 }}>{children}</div>
    </div>
  </div>
}

const P = { ink: '#141B24', ink2: '#3A4553', mute: '#647081', faint: '#97A1AE', line: '#E2E7EE', bg: '#F5F7FA', card: '#FFFFFF', blue: '#0064D9', blueS: '#E8F1FC', violet: '#6B3FD4', violetS: '#F1EAFF', ok: '#16794C', okS: '#E6F4EC', warn: '#8A5A00', warnS: '#FFF2D9' }
const F = "'72','Geist Variable','Geist',system-ui,sans-serif"
const I = {
  spark: 'M12 3.5l1.9 5.2 5.1 1.8-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.8z', search: 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM15.5 15.5L20 20',
  clock: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 7.5V12l3 2', arrow: 'M5 12h13M13 7l5 5-5 5', check: 'M5 12.5l4.2 4.2L19 7', lock: 'M6.5 11h11v9h-11zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  up: 'M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.2 2.6L12.5 9H18a2 2 0 0 1 2 2.3l-1.2 6.7A2 2 0 0 1 16.8 20H7', doc: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4', rec: 'M4 6h16M4 12h16M4 18h10', chat: 'M5 5h14v10H10l-4 4v-4H5z', globe: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM3.5 12h17M12 3c2.5 2.6 3.5 5.6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-5.6-3.5-9s1-6.4 3.5-9z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5', filter: 'M4.5 6h15M7.5 12h9M10.5 18h3',
}
const Ic = ({ n, s = 14, c = 'currentColor', w = 1.8 }: { n: keyof typeof I; s?: number; c?: string; w?: number }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block' }}><path d={I[n]} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>
const Chip = ({ children, bg = P.blueS, fg = P.blue }: { children: ReactNode; bg?: string; fg?: string }) =>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 999, background: bg, color: fg, fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{children}</span>

/* ───────── 01 · fragmentation: one search box per product ───────── */
export function Fragmented() {
  const boxes = [
    { app: 'Procurement', ph: 'Document number', r: 2, h: 26 },
    { app: 'Travel', ph: 'Search trips', r: 14, h: 30 },
    { app: 'People', ph: 'Employee ID or name', r: 4, h: 34 },
    { app: 'Finance', ph: 'Invoice ID only', r: 0, h: 28 },
    { app: 'Contracts', ph: 'Keyword', r: 8, h: 24 },
    { app: 'Workforce', ph: 'SOW reference', r: 18, h: 32 },
  ]
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-3" aria-label="Six products, six different search boxes">
    {boxes.map((b, i) => <div key={b.app} className="rounded-lg p-4" style={{ background: P.bg, fontFamily: F }}>
      <div style={{ fontSize: 12, color: P.mute, fontWeight: 600 }}>{b.app}</div>
      <div style={{ marginTop: 12, height: b.h, borderRadius: b.r, border: `1px solid ${i % 2 ? '#B7C0CC' : '#89919A'}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px', fontSize: 12, color: P.faint, flexDirection: i % 3 === 1 ? 'row-reverse' : 'row', justifyContent: 'space-between' }}><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.ph}</span><Ic n="search" s={13} c={P.mute} /></div>
      <div style={{ marginTop: 10, fontSize: 11, color: i === 3 ? '#B3261E' : P.faint }}>{['Exact match only', 'No history', 'Own vocabulary', 'No claim matches this ID', 'No filters', 'Session expired'][i]}</div>
    </div>)}
  </div>
}

/* ───────── 03 · workstreams ───────── */
const WS = [
  { n: 'Workstream 1', title: 'Pre-search and querying', stretch: 'Before results', d: 2, owns: ['Entry points in every shell bar', 'Recent and suggested searches', 'Type-ahead', 'Natural language, and how a question is shaped'], aim: 'People ask in their own words, from anywhere.' },
  { n: 'Workstream 2', title: 'Search and results', stretch: 'Within results', d: 3, owns: ['Results layout and grouping', 'Filters', 'Contextual explanations', 'Actions on each row', 'Common Fiori patterns'], aim: 'One results page every product can use.' },
  { n: 'Workstream 3', title: 'Results to products and applications', stretch: 'Into the product', d: 3, owns: ['How a result becomes the next step', 'Hand-off into each product', 'Context carried across', 'Cross-product navigation, and the move into the assistant'], aim: 'Search ends where the work begins.' },
]
const HANDOFF = ['The shaped question', 'The chosen result, with its context']
export function Workstreams() {
  return <div>
    <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center mb-4">
      {WS.map((w, i) => <div key={w.n} className="contents">
        <div className="flex items-center gap-3"><span className="text-overline text-ink-3">{w.stretch}</span><span className="flex-1 hairline-top" /></div>
        {i < 2 && <span className="text-ink-3 px-2" aria-hidden>→</span>}
      </div>)}
    </div>
    <ol className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 lg:gap-0 items-stretch list-none p-0 m-0">
      {WS.map((w, i) => <li key={w.n} className="contents">
        <div className="card flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="text-overline text-ink-3 whitespace-nowrap">{w.n}</p>
            <span className="flex items-center gap-1 whitespace-nowrap" aria-label={`${w.d} designers`}>{Array.from({ length: w.d }).map((_, k) => <span key={k} className="inline-block rounded-full bg-surface-3" style={{ width: 'var(--space-20)', height: 'var(--space-20)', boxShadow: 'inset 0 0 0 1px var(--line-2)' }} />)}<span className="text-caption text-ink-3 ml-2">{w.d} designers</span></span>
          </div>
          <p className="text-title text-ink mt-4">{w.title}</p>
          <p className="text-overline text-ink-3 mt-6">Owned</p>
          <ul className="mt-3 space-y-2 list-none p-0">{w.owns.map(o => <li key={o} className={`text-body-sm flex gap-3 ${o === 'Common Fiori patterns' ? 'text-signal' : 'text-ink-2'}`}><span aria-hidden className="text-ink-3">·</span>{o}</li>)}</ul>
          <div className="mt-auto pt-6"><p className="text-overline text-ink-3">Aim</p><p className="text-body text-ink mt-2">{w.aim}</p></div>
        </div>
        {i < 2 && <div className="flex lg:flex-col items-center justify-center gap-2 px-3 py-1 lg:py-0" aria-label={`Hand-off: ${HANDOFF[i]}`}>
          <span className="text-ink-3 lg:hidden" aria-hidden>↓</span>
          <span className="text-caption text-ink-3 lg:text-center" style={{ maxWidth: 'var(--space-120)' }}>{HANDOFF[i]}</span>
          <span className="hidden lg:block text-ink-3" aria-hidden>→</span>
        </div>}
      </li>)}
    </ol>
    <div className="mt-3 rounded-lg p-5 bg-surface-2 grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-2 items-baseline">
      <p className="text-overline text-ink-3">Shared by all three</p>
      <p className="text-body-sm text-ink-2">UI5 and the enterprise web UI kit as the only building blocks. Every document reviewed for familiar, consistent interaction patterns, so the three stretches meet without a separate rulebook.</p>
    </div>
  </div>
}

/* ───────── 04 · where the opportunity sits ───────── */
export function OpportunityVenn() {
  const c = [
    { cx: 300, cy: 190, label: 'Search functionalities', sub: '9 kinds of search', color: 'var(--link)' },
    { cx: 215, cy: 330, label: 'AI offerings', sub: '4 kinds of AI', color: 'var(--signal)' },
    { cx: 385, cy: 330, label: 'Users’ problems', sub: '12 pain points', color: 'var(--danger)' },
  ]
  return <svg viewBox="0 0 600 500" className="w-full h-auto block" role="img" aria-label="Three overlapping circles: search functionalities, AI offerings and users’ problems. Where all three meet: search that understands.">
    {c.map(k => <circle key={k.label} cx={k.cx} cy={k.cy} r={150} fill={k.color} fillOpacity={0.1} stroke={k.color} strokeWidth={1.5} />)}
    <text x={300} y={92} textAnchor="middle" fill="var(--color-ink)" style={{ font: '400 var(--text-md) var(--font-sans)' }}>{c[0].label}</text>
    <text x={300} y={114} textAnchor="middle" fill="var(--color-ink-3)" style={{ font: '400 var(--text-xs) var(--font-mono)', letterSpacing: '.08em' }}>{c[0].sub.toUpperCase()}</text>
    <text x={150} y={392} textAnchor="middle" fill="var(--color-ink)" style={{ font: '400 var(--text-md) var(--font-sans)' }}>{c[1].label}</text>
    <text x={150} y={414} textAnchor="middle" fill="var(--color-ink-3)" style={{ font: '400 var(--text-xs) var(--font-mono)', letterSpacing: '.08em' }}>{c[1].sub.toUpperCase()}</text>
    <text x={450} y={392} textAnchor="middle" fill="var(--color-ink)" style={{ font: '400 var(--text-md) var(--font-sans)' }}>{c[2].label}</text>
    <text x={450} y={414} textAnchor="middle" fill="var(--color-ink-3)" style={{ font: '400 var(--text-xs) var(--font-mono)', letterSpacing: '.08em' }}>{c[2].sub.toUpperCase()}</text>
    <circle cx={300} cy={283} r={6} fill="var(--signal)" />
    <text x={300} y={262} textAnchor="middle" fill="var(--color-ink)" style={{ font: '500 var(--text-sm) var(--font-sans)' }}>Search that</text>
    <text x={300} y={312} textAnchor="middle" fill="var(--color-ink)" style={{ font: '500 var(--text-sm) var(--font-sans)' }}>understands</text>
  </svg>
}

/* ───────── 05 · ten capabilities: a small, true-to-life fragment for each ───────── */
const Frame = ({ children }: { children: ReactNode }) =>
  <div style={{ background: P.bg, borderRadius: 10, padding: 14, fontFamily: F, color: P.ink, fontSize: 12.5, height: 150, overflow: 'hidden', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>{children}</div>
const Field = ({ q, ai = true }: { q: string; ai?: boolean }) =>
  <div style={{ height: 32, borderRadius: 16, border: `1px solid ${P.blue}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden' }}>{ai ? <Ic n="spark" s={14} c={P.blue} /> : <Ic n="search" s={14} c={P.mute} />}<span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{q}</span></div>
const Row = ({ t, app, right }: { t: string; app?: string; right?: ReactNode }) =>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1px solid ${P.line}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, whiteSpace: 'nowrap' }}><span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>{app && <span style={{ color: P.mute, fontSize: 11 }}>{app}</span>}{right}</div>

export const CAPABILITIES: { t: string; answers: string; why: string; visual: ReactNode }[] = [
  { t: 'Natural Language Understanding', answers: 'Lack of NLP integration · inadequate autocomplete',
    why: 'Enterprise data is structured, but people think in sentences. The query is parsed into intent and entities (object, supplier, time) so a plain question maps onto the right fields and filters.',
    visual: <Frame><Field q="SOWs for CyberSecure Ltd ending this quarter" /><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Chip>Object · SOW</Chip><Chip>Supplier · CyberSecure Ltd</Chip><Chip>End date · this quarter</Chip></div></Frame> },
  { t: 'Cross-application semantic search', answers: 'Poor indexing · one search per product',
    why: 'Each product indexed its own words. Matching on meaning across every application lets “trip” find travel requests, expenses and policies, wherever they live.',
    visual: <Frame><Field q="trip to Bangalore" /><Row t="Business trip · SFO → BLR · Jun 10-17" app="Concur" /><Row t="Travel policy · international trips" app="Policies" /></Frame> },
  { t: 'Context-aware and role-based personalisation', answers: 'No personalisation · lack of contextual search',
    why: 'The same words mean different work to different people. Role, current product and recent activity become ranking signals, within what the person is allowed to see.',
    visual: <Frame><Field q="pending approvals" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}><div><div style={{ fontSize: 10.5, color: P.mute, marginBottom: 4 }}>A manager sees</div><Row t="3 leave requests" /></div><div><div style={{ fontSize: 10.5, color: P.mute, marginBottom: 4 }}>A buyer sees</div><Row t="5 purchase requisitions" /></div></div></Frame> },
  { t: 'Predictive and proactive suggestions', answers: 'Inadequate autocomplete · search history limitations',
    why: 'Most searches repeat or follow the work in progress. Recent searches and suggestions appear on focus, before a key is pressed, each naming the product it comes from.',
    visual: <Frame><div style={{ background: '#fff', border: `1px solid ${P.line}`, borderRadius: 10, padding: '8px 10px', display: 'grid', gap: 6 }}><div style={{ fontSize: 10.5, color: P.mute, fontWeight: 600 }}>Recent searches</div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ic n="clock" s={13} c={P.mute} /><span style={{ flex: 1 }}>Pending POs</span><span style={{ color: P.mute, fontSize: 11 }}>iSearch</span></div><div style={{ fontSize: 10.5, color: P.mute, fontWeight: 600 }}>Suggested for you</div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Ic n="spark" s={13} c={P.blue} /><span style={{ flex: 1 }}>SOWs expiring this month</span><span style={{ color: P.mute, fontSize: 11 }}>Fieldglass</span></div></div></Frame> },
  { t: 'Actionable results (search to action)', answers: 'Poor integration with other tools',
    why: 'Finding the record is rarely the goal. Each result carries the actions of its object and a deep link that opens the right product with the context already filled in.',
    visual: <Frame><Row t="PR 7800098765 · IT equipment" right={<span style={{ display: 'flex', gap: 6 }}><span style={{ padding: '3px 9px', borderRadius: 6, background: P.blue, color: '#fff', fontSize: 11 }}>Approve</span><span style={{ padding: '3px 9px', borderRadius: 6, border: `1px solid ${P.line}`, color: P.blue, fontSize: 11 }}>Open in Ariba</span></span>} /><Row t="Invoice 51000412 · change requested" right={<span style={{ padding: '3px 9px', borderRadius: 6, border: `1px solid ${P.line}`, color: P.blue, fontSize: 11 }}>Open</span>} /></Frame> },
  { t: 'Federated search with a unified ontology', answers: 'Records and documents searched apart',
    why: 'Answers sit in records (orders, SOWs) and in documents (policies, contracts). One shared vocabulary of entities lets both land in a single ranked list instead of one list per source.',
    visual: <Frame><div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}><div style={{ display: 'grid', gap: 4 }}><Row t="Records" right={<Ic n="rec" s={13} c={P.mute} />} /><Row t="Documents" right={<Ic n="doc" s={13} c={P.mute} />} /></div><Ic n="arrow" s={18} c={P.mute} /><div style={{ display: 'grid', gap: 4 }}><Row t="SOW 4471 · CyberSecure" /><Row t="Contract · CyberSecure" /><Row t="Policy · SOW renewals" /></div></div></Frame> },
  { t: 'Conversational search agent', answers: 'No alternate search modes',
    why: 'Some questions need a follow-up, not another query. A result can hand the question and its results to the assistant, so the conversation continues with that context.',
    visual: <Frame><Row t="Education policy · 2026" app="Policies" /><div style={{ alignSelf: 'flex-end', background: P.ink, color: '#fff', borderRadius: 14, padding: '6px 12px', fontSize: 12 }}>Does it cover part-time courses?</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, color: P.violet, fontSize: 11.5, fontWeight: 500 }}><Ic n="chat" s={14} c={P.violet} />Continues in the assistant, with the policy as context</div></Frame> },
  { t: 'Secure, explainable results', answers: 'Trust in AI answers · ineffective feedback',
    why: 'An AI summary is only useful if people can check it. Results are filtered by each person’s authorisations before ranking, and every summary names its sources and its reason.',
    visual: <Frame><div style={{ background: P.violetS, borderRadius: 8, padding: '8px 10px', fontSize: 12, lineHeight: '17px' }}><b style={{ color: P.violet, fontWeight: 600 }}>AI overview</b> · 14 POs pending, 3 over $100k.</div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Chip bg="#fff" fg={P.ink2}>Based on 14 records</Chip><Chip bg="#fff" fg={P.ink2}><Ic n="lock" s={12} c={P.ink2} />Only what you can access</Chip></div></Frame> },
  { t: 'Learning and feedback loops', answers: 'Ineffective feedback mechanisms',
    why: 'Ranking should improve with use. What people open, act on and mark as unhelpful feeds back into relevance, instead of every search starting from zero.',
    visual: <Frame><Row t="Travel policy · international trips" right={<span style={{ display: 'flex', gap: 8, alignItems: 'center', color: P.mute, fontSize: 11 }}>Helpful?<Ic n="up" s={14} c={P.ok} /><span style={{ transform: 'scaleY(-1)', display: 'block' }}><Ic n="up" s={14} c={P.faint} /></span></span>} /><div style={{ fontSize: 11.5, color: P.mute }}>Opened, acted on, marked helpful: signals for the next ranking.</div></Frame> },
  { t: 'Multilingual and localised search', answers: 'A global workforce, many languages',
    why: 'People search in the language they work in. Queries and content are matched across languages, and results come back with local formats for dates, numbers and currency.',
    visual: <Frame><Field q="Auftragsbestätigung Lieferant Müller" /><Row t="Order confirmation · Müller GmbH · 12.11.2026" app="Ariba" /><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: P.mute }}><Ic n="globe" s={13} c={P.mute} />German query, matched to the record</div></Frame> },
]

/* ───────── 06 · pattern anatomy on a results page ───────── */
const Num = ({ n, x, y }: { n: number; x: number; y: number }) =>
  <div style={{ position: 'absolute', left: x, top: y, width: 26, height: 26, borderRadius: 13, background: P.ink, color: '#fff', fontSize: 13, fontWeight: 600, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 3px #fff', fontFamily: F }}>{n}</div>
const Tag = ({ children, bg = '#D1EFFF', fg = P.ink, s }: { children: ReactNode; bg?: string; fg?: string; s?: CSSProperties }) =>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6, background: bg, color: fg, fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', ...s }}>{children}</span>
const Btn = ({ children, primary }: { children: ReactNode; primary?: boolean }) =>
  <span style={{ padding: '5px 12px', borderRadius: 8, background: primary ? P.blue : '#fff', border: `1px solid ${primary ? P.blue : '#BCC3CA'}`, color: primary ? '#fff' : P.blue, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>
const More = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="5" r="1.8" fill={P.blue} /><circle cx="12" cy="12" r="1.8" fill={P.blue} /><circle cx="12" cy="19" r="1.8" fill={P.blue} /></svg>
const Mark = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" fill="none" stroke={P.blue} strokeWidth="1.8" strokeLinejoin="round" /></svg>

/** One search result, the shared row every product uses. */
function ResultRow({ title, type, match, ids, desc, attrs, tags, actions, thumb = true, gap = 18 }: { title: string; type: string; match: string; ids: string[]; desc: string; attrs: [string, string][]; tags: ReactNode; actions: ReactNode; thumb?: boolean; gap?: number }) {
  return <div style={{ display: 'flex', gap, padding: '16px 20px', fontFamily: F, color: P.ink }}>
    {thumb && <div style={{ width: 96, height: 96, borderRadius: 12, background: '#E1E4E8', flex: 'none' }} />}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: P.blue, whiteSpace: 'nowrap' }}>{title}</span><Tag>{type}</Tag><Tag>{match}</Tag>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>{actions}<Mark /><More /></span>
      </div>
      <div style={{ fontSize: 12.5, color: P.ink2, marginTop: 4 }}>{ids.join('  •  ')}</div>
      <div style={{ fontSize: 13.5, marginTop: 8 }}>{desc}</div>
      <div style={{ display: 'flex', gap: 36, marginTop: 8 }}>{attrs.map(([k, v]) => <div key={k}><div style={{ fontSize: 12.5, color: P.mute }}>{k}</div><div style={{ fontSize: 13.5, marginTop: 2 }}>{v}</div></div>)}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>{tags}</div>
    </div>
  </div>
}

export const ROW_PARTS = [
  ['Thumbnail', 'An image, avatar or icon for the object, so a mixed list can be scanned by kind.'],
  ['Title', 'The object’s name as a link into the product that owns it.'],
  ['Entity type', 'What the result is: order, requisition, goal, employee, SOW.'],
  ['Match', 'How well it matches the query, as a percentage, so ranking can be read.'],
  ['Subheader', 'Identifiers and the area it belongs to, separated by dots.'],
  ['Description', 'One or two lines that say what the record is about.'],
  ['Attributes', 'Up to six label and value pairs, chosen per entity type.'],
  ['Labels', 'Status, risk and AI notes as tags. AI-written ones carry the spark.'],
  ['Actions', 'One primary action, up to two secondary, then bookmark and more.'],
] as [string, string][]

export function RowAnatomy() {
  const N = ({ n, x, y }: { n: number; x: number; y: number }) => <div style={{ position: 'absolute', left: x, top: y, width: 22, height: 22, borderRadius: 11, background: P.ink, color: '#fff', fontSize: 11.5, fontWeight: 600, display: 'grid', placeItems: 'center', fontFamily: F }}>{n}</div>
  return <Scaled w={1040} h={244} minW={760}>
    <div style={{ position: 'relative', width: 1040, height: 244, background: '#fff', borderRadius: 12, boxShadow: '0 0 0 1px rgba(29,45,62,.08)' }}>
      <div style={{ position: 'absolute', left: 30, top: 30, right: 0 }}>
        <ResultRow gap={44} title="Mobile Device Purchase Order" type="Order" match="96% Match to Query" ids={['PO-2025-001823', 'Supply Chain']}
          desc="50 units of a mobile handset with accessories, as per agreed pricing and delivery schedule."
          attrs={[['Amount', '$89,450.00'], ['Requested by', 'Sarah Chen'], ['Date of delivery', '2025-08-16'], ['Supplier', 'Diamond Electronics'], ['Category', 'Raw material']]}
          tags={<><Tag bg="#FFE9D6" fg="#9A4A00">Status: Ready for pickup</Tag><Tag bg="#2E7D32" fg="#fff">✓ Approved by supplier</Tag><Tag bg="#EBF8FF" fg={P.blue}>High</Tag></>}
          actions={<><Btn primary>Contact Supplier</Btn><Btn>View PO</Btn></>} />
      </div>
      <N n={1} x={16} y={84} />
      {[[2, 49], [5, 76], [6, 103], [7, 133], [8, 177]].map(([n, y]) => <N key={n} n={n} x={158} y={y} />)}
      <N n={3} x={443} y={14} /><N n={4} x={546} y={14} /><N n={9} x={810} y={14} />
    </div>
  </Scaled>
}

export const PATTERN_ZONES = [
  { t: 'Query input and understanding', d: 'The question stays visible in the shell bar and as the page title, and suggested filters show what was understood.', p: ['Type-ahead suggestions', 'Natural language query parsing', 'Conversational follow-up', 'Multi-entity query support'] },
  { t: 'Result exploration and interpretation', d: 'An AI overview answers first, collapsed by default, with its sources one click away, then the records themselves.', p: ['Result grouping and summarisation', 'Search result annotations', 'Multi-result preview and comparison'] },
  { t: 'Result grouping and filtering', d: 'Tabs by object type with counts, and a sort, so the list narrows without a new search.', p: ['Dynamic filters and faceted search', 'Search within results'] },
  { t: 'Context and explanations', d: 'Every row shows its type, its match to the query and its status, and AI-written notes carry the spark.', p: ['Explainable AI recommendations', 'Contextual search entry points', 'Smart history and re-query'] },
  { t: 'Actionability and next steps', d: 'One primary action and up to two secondary ones on the row, plus bookmark and more, so work starts from the result.', p: ['Inline smart actions', 'Task-oriented suggestions', 'Save search as smart bookmark'] },
]
export function PatternAnatomy() {
  return <Scaled w={1040} h={'auto'} minW={760}>
    <div style={{ position: 'relative', width: 1040, background: P.bg, borderRadius: 14, overflow: 'hidden', fontFamily: F, color: P.ink, paddingBottom: 20 }}>
      <div style={{ height: 48, background: '#fff', borderBottom: `1px solid ${P.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px' }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: P.blue }}>Procurement</span>
        <div style={{ marginLeft: 'auto', width: 400, height: 32, borderRadius: 16, border: `1px solid #89919A`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontSize: 13.5 }}>Pending POs for material MOB-00123<span style={{ marginLeft: 'auto' }}><Ic n="search" s={16} c={P.ink2} /></span></div>
        <span style={{ width: 28, height: 28, borderRadius: 14, background: '#D9DEE3' }} />
      </div>
      <div style={{ background: '#fff', padding: '16px 24px', borderBottom: `1px solid ${P.line}`, fontSize: 21, fontWeight: 700 }}>Search results for “Pending POs for material MOB-00123”</div>
      <div style={{ margin: '16px 24px 0', background: '#fff', borderRadius: 12, padding: '16px 22px 10px', boxShadow: '0 1px 3px rgba(29,45,62,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Ic n="spark" s={22} c={P.blue} /><span style={{ fontSize: 17, fontWeight: 600 }}>AI Overview</span><span style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 600, textDecoration: 'underline' }}>Sources</span><More /></div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12 }}>Insight</div>
        <ul style={{ margin: '6px 0 0', paddingLeft: 20, listStyle: 'disc', fontSize: 13.5, lineHeight: '21px' }}><li><b style={{ fontWeight: 600 }}>Supplier engagement:</b> Both POs are approved by the supplier, indicating no upstream delays.</li><li><b style={{ fontWeight: 600 }}>Logistics bottleneck:</b> PO-2025-001823 is stuck at the pickup stage, suggesting a delay in transportation…</li></ul>
        <div style={{ textAlign: 'center', fontSize: 13, color: P.blue, marginTop: 8 }}>⌄ Show more</div>
      </div>
      <div style={{ margin: '14px 24px 0', background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(29,45,62,.08)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 0' }}><span style={{ fontSize: 14.5, fontWeight: 600 }}>Showing 7 related results for ‘MOB-00123’</span><span style={{ marginLeft: 'auto', fontSize: 13, color: P.blue, border: '1px solid #BCC3CA', borderRadius: 8, padding: '4px 10px' }}>Sort by ⌄</span></div>
        <div style={{ display: 'flex', gap: 28, padding: '14px 28px 0', borderBottom: `1px solid ${P.line}`, fontSize: 13.5, fontWeight: 600 }}>{['Purchase Orders (2)', 'Purchase Requisitions (1)', 'Suppliers (2)', 'Contacts (2)'].map((t, i) => <span key={t} style={{ color: i ? P.ink : P.blue, borderBottom: i ? 0 : `2px solid ${P.blue}`, paddingBottom: 10 }}>{t}</span>)}</div>
        <ResultRow thumb={false} title="Mobile Device Purchase Order" type="Order" match="96% Match to Query" ids={['PO-2025-001823', 'Supply Chain']} desc="50 units of a mobile handset with accessories. Items to be delivered to the Mumbai warehouse by August 16, 2025."
          attrs={[['Amount', '$89,450.00'], ['Requested by', 'Sarah Chen'], ['Date of delivery', '2025-08-16'], ['Supplier', 'Diamond Electronics']]}
          tags={<><Tag bg="#FFE9D6" fg="#9A4A00">Status: Ready for pickup</Tag><Tag bg="#2E7D32" fg="#fff">✓ Approved by supplier</Tag><Tag bg="#EBF8FF" fg={P.blue}>High</Tag></>} actions={<><Btn primary>Contact Supplier</Btn><Btn>View PO</Btn></>} />
        <div style={{ borderTop: `1px solid ${P.line}` }}><ResultRow thumb={false} title="Executive Team Mobile & Accessories" type="Order" match="84% Match to Query" ids={['PO-2025-006523', 'Supply Chain']} desc="30 units with standard warranty. Delivery expected at the Bengaluru distribution centre."
          attrs={[['Amount', '$89,450.00'], ['Requested by', 'Sarah Chen'], ['Date of delivery', '2025-01-16'], ['Supplier', 'Wurth Electronics']]}
          tags={<><Tag bg="#2E7D32" fg="#fff">✓ Delivered</Tag><Tag bg="#E9730C" fg="#fff">⚠ Payment due</Tag><Tag bg="#EBF8FF" fg={P.blue}>Medium</Tag></>} actions={<><Btn primary>Contact Supplier</Btn><Btn>View PO</Btn></>} /></div>
      </div>
      <Num n={1} x={546} y={11} /><Num n={2} x={10} y={124} /><Num n={3} x={10} y={322} /><Num n={4} x={10} y={552} /><Num n={5} x={1012} y={414} />
    </div>
  </Scaled>
}
