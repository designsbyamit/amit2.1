// The AI Summary pattern, playable: collapsed, expanded, reference links, and tracing one insight to its sources
// (either in the reference panel or by focusing the results that produced it).
import { useState, type ReactNode } from 'react'
import { Scaled } from './SearchDiagrams'

const P = { ink: '#1D2D3E', ink2: '#475E75', mute: '#556B82', line: '#E5E9EE', bg: '#F5F6F7', blue: '#0064D9', blueS: '#EBF8FF', chip: '#D1EFFF', hl: '#CDE3FB', skel: '#E4E7EA', focus: '#EAF5FC' }
const F = "'72','Geist Variable','Geist',system-ui,sans-serif"
const path = {
  spark: 'M12 3.5l1.9 5.2 5.1 1.8-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.8z',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  chevD: 'M6 9.5l6 6 6-6', chevU: 'M6 14.5l6-6 6 6', speak: 'M4 9.5h3.5L12 5.5v13l-4.5-4H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11',
  copy: 'M8.5 8.5h11v11h-11zM5 15.5V4.5h11', up: 'M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.2 2.6L12.5 9H18a2 2 0 0 1 2 2.3l-1.2 6.7A2 2 0 0 1 16.8 20H7',
}
const I = ({ n, s = 16, c = P.blue, w = 1.8 }: { n: keyof typeof path; s?: number; c?: string; w?: number }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block' }}><path d={path[n]} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>

const INSIGHTS: { t: ReactNode; refs: number[] }[] = [
  { t: <>ABC Company remained a <b style={{ fontWeight: 700 }}>key supplier of raw materials throughout FY 2024-2025</b>, contributing to 27% of total raw material procurement.</>, refs: [0, 4, 5] },
  { t: <>Procurement peaked in Q3 (Oct-Dec 2024), driven by increased demand for copper wire and steel sheets in production.</>, refs: [1, 2] },
  { t: <>Cost efficiency improved by 6% compared to FY 2023-2024, due to better negotiated rates and bulk ordering strategies.</>, refs: [3, 6] },
  { t: <>Delivery performance was strong, with a 92% on-time delivery rate and minimal quality issues reported.</>, refs: [2, 5] },
]
const REFS = ['PO-2025-001876', 'PO-2025-001902', 'PO-2025-001944', 'CT-2024-0311', 'PO-2025-002015', 'PO-2025-002088', 'PR-2025-1823']
// what each result is, so the list reads as real search results (sample data)
const ROWS: { title: string; type: 'Purchase Order' | 'Contract' | 'Requisition'; meta: string; amount: string; status: [string, string, string] }[] = [
  { title: 'Hot-rolled steel sheets, 3 mm', type: 'Purchase Order', meta: 'ABC Company · Plant 1010', amount: '$412,600.00', status: ['Delivered', '#EAF7EE', '#256F3A'] },
  { title: 'Copper wire, 2.5 mm, 500 coils', type: 'Purchase Order', meta: 'ABC Company · Plant 1020', amount: '$186,240.00', status: ['Delivered', '#EAF7EE', '#256F3A'] },
  { title: 'Steel sheets, galvanised, Q3 lot', type: 'Purchase Order', meta: 'ABC Company · Plant 1010', amount: '$298,900.00', status: ['Delivered', '#EAF7EE', '#256F3A'] },
  { title: 'Raw materials framework agreement', type: 'Contract', meta: 'ABC Company · Valid to Mar 2026', amount: '$2,400,000.00', status: ['Active', '#E5F0FF', '#0057D2'] },
  { title: 'Aluminium billets, 6061 grade', type: 'Purchase Order', meta: 'ABC Company · Plant 1030', amount: '$94,180.00', status: ['In transit', '#FFF3E0', '#AA5808'] },
  { title: 'Copper cathodes, grade A', type: 'Purchase Order', meta: 'ABC Company · Plant 1020', amount: '$221,500.00', status: ['Delivered', '#EAF7EE', '#256F3A'] },
  { title: 'Steel plates for Q1 production', type: 'Requisition', meta: 'Requested by Sarah Chen', amount: '$89,450.00', status: ['Approved', '#EAF7EE', '#256F3A'] },
]
const doc = { po: 'M7 3.5h7l4 4V20.5H7zM14 3.5V8h4M9.5 12h6M9.5 15h6M9.5 18h3.5', ct: 'M6 3.5h12v17H6zM9 8h6M9 11h6M9 14h3M14 17.5l1.5 1.5 3-3', pr: 'M5 6.5h14M5 12h14M5 17.5h9M3 6.5h.01M3 12h.01M3 17.5h.01' }

type Mode = 'panel' | 'results'
export default function AISummary() {
  const [mode, setMode] = useState<Mode>('results')
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState(false)
  const [focus, setFocus] = useState<number | null>(null)
  const reset = (m: Mode) => { setMode(m); setOpen(false); setPanel(false); setFocus(null) }
  const tap = (i: number) => { setOpen(true); setFocus(focus === i ? null : i); if (mode === 'panel') setPanel(true) }
  const related = focus === null ? [] : INSIGHTS[focus].refs
  const order = mode === 'results' && focus !== null ? [...related, ...REFS.map((_, i) => i).filter(i => !related.includes(i))] : REFS.map((_, i) => i)
  const cardW = mode === 'panel' && panel ? 640 : 1000

  const head = <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => { setOpen(!open); if (open) { setFocus(null); setPanel(false) } }}>
    <I n="spark" s={22} />
    <span style={{ fontSize: 18, fontWeight: 700, color: P.ink }}>AI Summary</span>
    <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: P.chip, color: P.ink }}>7 results analyzed</span>
    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }} onClick={e => e.stopPropagation()}>
      <I n="speak" s={20} />
      {mode === 'panel' && !panel && <button type="button" onClick={() => { setOpen(true); setPanel(true) }} style={{ background: 'none', border: 0, padding: 0, fontSize: 13, fontWeight: 600, color: P.ink, textDecoration: 'underline', cursor: 'pointer', fontFamily: F }}>Reference Links</button>}
    </span>
  </div>

  const list = <ul style={{ margin: '14px 0 0', paddingLeft: 22, listStyle: 'disc', display: 'grid', gap: 4, fontSize: 15.5, lineHeight: '23px', color: P.ink, maxHeight: open ? 400 : 52, overflow: 'hidden', position: 'relative', WebkitMaskImage: open ? 'none' : 'linear-gradient(#000 55%, transparent)', maskImage: open ? 'none' : 'linear-gradient(#000 55%, transparent)' }}>
    {INSIGHTS.map((x, i) => <li key={i}>
      <span style={{ background: focus === i ? P.hl : 'transparent', borderRadius: 3, transition: 'background .2s' }}>{x.t}</span>
      <button type="button" aria-label={`Show the sources for insight ${i + 1}`} onClick={() => tap(i)} style={{ display: 'inline-grid', placeItems: 'center', verticalAlign: -3, marginLeft: 6, width: 20, height: 20, borderRadius: 10, border: 0, padding: 0, background: focus === i ? P.blue : P.blueS, cursor: 'pointer' }}><I n="link" s={12} c={focus === i ? '#fff' : P.blue} w={2.2} /></button>
    </li>)}
  </ul>

  const card = <div style={{ width: cardW, background: '#fff', borderRadius: panel ? '12px 0 0 12px' : 12, padding: '20px 26px 12px', boxShadow: '0 0 0 1px rgba(29,45,62,.06), 0 2px 6px rgba(29,45,62,.06)', transition: 'width .25s' }}>
    {head}{list}
    {open && <div style={{ display: 'flex', alignItems: 'center', marginTop: 18, fontSize: 12.5, color: P.ink2 }}>
      <span>AI responses may include mistakes. <u>Learn more</u></span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}><I n="copy" s={20} /><I n="up" s={20} /><span style={{ transform: 'scaleY(-1)' }}><I n="up" s={20} /></span></span>
    </div>}
    <div style={{ textAlign: 'center', marginTop: 10 }}>
      <button type="button" onClick={() => { setOpen(!open); if (open) { setFocus(null); setPanel(false) } }} style={{ background: 'none', border: 0, color: P.blue, fontSize: 13, fontFamily: F, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{open ? 'Show less' : 'Show more'}<I n={open ? 'chevU' : 'chevD'} s={14} /></button>
    </div>
  </div>

  const refsPanel = <div style={{ width: 360, background: '#fff', borderRadius: '0 12px 12px 0', borderLeft: `1px solid ${P.line}`, display: 'flex', flexDirection: 'column', boxShadow: '0 0 0 1px rgba(29,45,62,.06)' }}>
    <div style={{ padding: '14px 18px', borderBottom: `1px solid ${P.line}`, fontSize: 13.5, fontWeight: 600, color: P.ink }}>Reference Links{focus === null ? ` (${REFS.length})` : ''}</div>
    <div style={{ padding: 18, display: 'grid', gap: 10, alignContent: 'start', flex: 1, maxHeight: 300, overflow: 'auto' }}>
      {(focus === null ? REFS.map((_, i) => i) : related).map(i => <div key={i} style={{ border: `1px solid ${P.blue}`, background: P.blueS, borderRadius: 8, padding: '9px 12px', fontSize: 12.5, color: P.ink }}><b style={{ fontWeight: 600 }}>{ROWS[i].title}</b><div style={{ color: P.ink2, marginTop: 2 }}>{REFS[i]}</div></div>)}
      {focus !== null && <button type="button" onClick={() => setFocus(null)} style={{ justifySelf: 'end', background: 'none', border: 0, color: P.blue, fontSize: 12.5, textDecoration: 'underline', cursor: 'pointer', fontFamily: F }}>Show all Links</button>}
    </div>
    <div style={{ padding: '10px 18px', borderTop: `1px solid ${P.line}`, textAlign: 'right' }}><button type="button" onClick={() => { setPanel(false); setFocus(null) }} style={{ background: 'none', border: 0, color: P.blue, fontSize: 13, cursor: 'pointer', fontFamily: F }}>Close</button></div>
  </div>

  const tabs: [string, number][] = [['All', 7], ['Purchase Orders', 5], ['Contracts', 1], ['Requisitions', 1]]
  const results = <div style={{ width: 1000, marginTop: 14, background: '#fff', borderRadius: 12, boxShadow: '0 0 0 1px rgba(29,45,62,.06), 0 1px 3px rgba(29,45,62,.04)', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 0' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: P.ink }}>Showing 7 results</span>
      <span style={{ marginLeft: 'auto', fontSize: 12.5, color: P.ink2 }}>Sort by <b style={{ fontWeight: 600, color: P.ink }}>Relevance</b></span>
    </div>
    <div style={{ display: 'flex', gap: 22, padding: '10px 20px 0', borderBottom: `1px solid ${P.line}` }}>
      {tabs.map(([t, n], i) => <span key={t} style={{ fontSize: 13, fontWeight: i ? 400 : 600, color: i ? P.ink2 : P.blue, paddingBottom: 9, borderBottom: `2px solid ${i ? 'transparent' : P.blue}`, marginBottom: -1 }}>{t} <span style={{ color: P.mute, fontWeight: 400 }}>({n})</span></span>)}
    </div>
    {order.map((i, k) => { const hot = related.includes(i); const r = ROWS[i]
      const icon = r.type === 'Contract' ? doc.ct : r.type === 'Requisition' ? doc.pr : doc.po
      return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderTop: k ? `1px solid ${P.line}` : 0, background: hot ? P.focus : '#fff', transition: 'background .25s' }}>
        <span style={{ width: 34, height: 34, borderRadius: 8, background: P.blueS, display: 'grid', placeItems: 'center', flex: 'none' }}><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path d={icon} fill="none" stroke={P.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 3 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 13.5, fontWeight: 600, color: P.blue }}>{r.title}</span><span style={{ fontSize: 11, fontWeight: 600, padding: '1px 6px', borderRadius: 4, background: P.bg, color: P.ink2 }}>{r.type}</span></span>
          <span style={{ fontSize: 12, color: P.ink2 }}>{REFS[i]} · {r.meta}</span>
        </span>
        {hot && <span style={{ fontSize: 11.5, color: P.blue, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}><I n="spark" s={12} />Used in the insight</span>}
        <span style={{ width: 120, textAlign: 'right', fontSize: 13, fontWeight: 600, color: P.ink, fontVariantNumeric: 'tabular-nums' }}>{r.amount}</span>
        <span style={{ width: 82, display: 'flex', justifyContent: 'flex-end' }}><span style={{ fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: r.status[1], color: r.status[2] }}>{r.status[0]}</span></span>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" fill="none" stroke={P.mute} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div> })}
  </div>

  return <div>
    <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist" aria-label="Two ways to trace an insight">
      <button type="button" role="tab" aria-selected={mode === 'results'} className="chip" onClick={() => reset('results')}>Trace into the results</button>
      <button type="button" role="tab" aria-selected={mode === 'panel'} className="chip" onClick={() => reset('panel')}>Trace in a reference panel</button>
      <span className="text-caption text-ink-3 ml-1">Open the summary, then select a link icon next to an insight.</span>
    </div>
    <div className="rounded-xl p-4 md:p-8" style={{ background: 'var(--field-paper)' }}>
      <Scaled w={1000} h="auto" minW={700}>
        <div style={{ fontFamily: F, width: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>{card}{mode === 'panel' && panel && refsPanel}</div>
          {mode === 'results' && results}
        </div>
      </Scaled>
    </div>
  </div>
}
