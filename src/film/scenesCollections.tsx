import { easeOut, seg, lerp } from './engine'
import { C, In, Words, Scene, mono } from './ui'
import { Over, Pill, Panel, Cursor } from './kit'

const rowsIn = (t: number, a: number, i: number) => easeOut(seg(t, a + i * 0.25, a + i * 0.25 + 0.6))

export function CHook({ t }: { t: number }) {
  return <Scene t={t} s={0} e={5}>
    <Over style={{ left: 140, top: 150 }}>Collections · 140 countries</Over>
    <Words t={t} a={0.5} text="Agents prepare." size={168} weight={600} style={{ left: 140, top: 300, width: 1600 }} />
    <Words t={t} a={1.7} text="People decide." size={168} weight={600} color={C.lime} style={{ left: 140, top: 500, width: 1600 }} />
    <In t={t} a={3.2} style={{ left: 140, top: 790 }}><div style={{ fontSize: 40, color: C.mute, width: 1300, lineHeight: 1.3 }}>Overdue invoices, managed by agents and led by humans.</div></In>
  </Scene>
}

export function CProblem({ t }: { t: number }) {
  const rows: [string, string][] = [['NorthStar', 'Company Code 1000'], ['NorthStar', 'Company Code 2000'], ['NorthStar', 'Company Code 3000'], ['NorthStar', 'Company Code 4000']]
  return <Scene t={t} s={5} e={14}>
    <Over style={{ left: 140, top: 110 }}>The problem</Over>
    <Words t={t} a={5.3} text="Long lists, one row per company code." size={84} weight={600} style={{ left: 140, top: 170, width: 1500 }} />
    {rows.map(([a, b], i) => <In key={b} t={t} a={7 + i * 0.3} x={-30} y={0} style={{ left: 140, top: 450 + i * 120, width: 1640 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 36px', height: 96, borderRadius: 20, background: C.panel, border: `1px solid ${C.line}`, fontSize: 38, color: C.ink }}><span style={{ width: 420 }}>{a}</span><span style={{ color: C.mute, fontFamily: mono, fontSize: 28 }}>{b}</span><span style={{ flex: 1 }} /><span style={{ color: C.dim, fontSize: 28 }}>Overdue</span></div></In>)}
    <In t={t} a={9.8} y={20} style={{ left: 140, top: 950 }}><div style={{ fontSize: 40, color: C.mute }}>The same customer, again and again. Most of the time goes into rebuilding context.</div></In>
  </Scene>
}

export function CApproach({ t }: { t: number }) {
  const steps: [string, string, boolean?][] = [['Validate scope', 'Deterministic'], ['Predict arrears', 'Model'], ['Investigate context', 'Agent and tool work'], ['Recommend', 'Grounded in evidence'], ['Decide', 'A person approves', true], ['Communicate', 'Within policy'], ['Monitor outcome', 'Event driven']]
  return <Scene t={t} s={14} e={26}>
    <Over style={{ left: 140, top: 100 }}>The approach</Over>
    <Words t={t} a={14.3} text="The agent prepares. A person decides." size={80} weight={600} style={{ left: 140, top: 160, width: 1640 }} />
    {steps.map(([n, k, h], i) => { const a = 16 + i * 0.7; const p = easeOut(seg(t, a, a + 0.5)); return <In key={n} t={t} a={a} y={26} style={{ left: 140 + (i % 4) * 420, top: 430 + Math.floor(i / 4) * 250, width: 390 }}>
      <div style={{ height: 210, borderRadius: 24, padding: '28px 28px', background: h ? C.lime : C.panel, border: `1px solid ${h ? C.lime : C.line}`, color: h ? C.bg : C.ink, transform: `scale(${0.96 + 0.04 * p})` }}>
        <div style={{ fontFamily: mono, fontSize: 22, color: h ? C.bg : C.dim }}>{String(i + 1).padStart(2, '0')}</div>
        <div style={{ fontSize: 38, fontWeight: 600, marginTop: 14, lineHeight: 1.1 }}>{n}</div>
        <div style={{ fontSize: 26, marginTop: 10, color: h ? C.bg : C.mute }}>{k}</div></div></In> })}
    <In t={t} a={22} y={16} style={{ left: 140 + 420, top: 960 }}><div style={{ fontSize: 34, color: C.mute }}>Reading and preparing run on their own. Anything that reaches a customer needs a person.</div></In>
  </Scene>
}

export function CWork({ t }: { t: number }) {
  const sel = t > 31.4
  const open = t > 33
  const approve = t > 41.6
  const draft = t > 36.5
  const cx = t < 30.5 ? lerp(1500, 1120, easeOut(seg(t, 28.6, 30.4))) : t < 40.6 ? 1120 : lerp(1120, 1560, easeOut(seg(t, 40, 41.4)))
  const cy = t < 30.5 ? lerp(800, 355, easeOut(seg(t, 28.6, 30.4))) : t < 40.6 ? 355 : lerp(355, 852, easeOut(seg(t, 40, 41.4)))
  const list: [string, string, string, string][] = [['NorthStar', '1000 · 2000 · 3000', 'High', 'Send a reminder'], ['Customer B', '1000', 'Medium', 'Wait for the cooldown'], ['Customer C', '1000 · 4000', 'Medium', 'Review the dispute']]
  return <Scene t={t} s={26} e={46}>
    <Over style={{ left: 140, top: 56 }}>The product · illustrative data</Over>
    <In t={t} a={26.4} y={30} style={{ left: 140, top: 120, width: 1640, height: 860 }}>
      <Panel style={{ width: 1640, height: 860, overflow: 'hidden', position: 'relative', background: C.panel }}>
        <div style={{ height: 76, display: 'flex', alignItems: 'center', padding: '0 36px', borderBottom: `1px solid ${C.line}`, fontSize: 28, color: C.ink, gap: 36 }}><b style={{ fontWeight: 600 }}>Collections</b><span style={{ color: C.mute }}>{open ? 'Customer 360' : 'Worklist'}</span></div>
        {!open && <div style={{ padding: '24px 36px' }}>
          <div style={{ display: 'flex', fontFamily: mono, fontSize: 22, color: C.dim, padding: '0 28px 14px' }}><span style={{ width: 360 }}>CUSTOMER</span><span style={{ width: 420 }}>COMPANY CODES</span><span style={{ width: 260 }}>PRIORITY</span><span>RECOMMENDED ACTION</span></div>
          {list.map(([n, cc, p, a], i) => <div key={n} style={{ opacity: rowsIn(t, 27, i), display: 'flex', alignItems: 'center', padding: '0 28px', height: 108, marginBottom: 14, borderRadius: 18, border: `1px solid ${sel && i === 0 ? C.lime : C.line}`, background: sel && i === 0 ? C.panel2 : 'transparent', fontSize: 32, color: C.ink }}>
            <span style={{ width: 360, fontWeight: 600 }}>{n}</span><span style={{ width: 420, color: C.mute, fontFamily: mono, fontSize: 26 }}>{cc}</span>
            <span style={{ width: 260, display: 'flex', alignItems: 'center', gap: 12 }}>{p}<span title="AI" style={{ fontFamily: mono, fontSize: 18, color: C.lime, border: `1px solid ${C.lime}`, borderRadius: 8, padding: '2px 8px' }}>AI</span></span>
            <span style={{ color: C.lime, fontSize: 28 }}>{a}</span></div>)}
          <In t={t} a={29} y={10} style={{ left: 36, top: 520, width: 1500 }}><div style={{ fontSize: 30, color: C.mute }}>One row per customer. Company codes listed inline. Priority is marked as AI output and can be explained.</div></In>
        </div>}
        {open && <div style={{ padding: '30px 36px', position: 'relative', height: 770 }}>
          <In t={t} a={33.1} y={14} style={{ left: 36, top: 30, width: 760 }}><div style={{ fontFamily: mono, fontSize: 22, color: C.dim }}>SUMMARY</div><div style={{ fontSize: 36, color: C.ink, marginTop: 12, lineHeight: 1.3 }}>NorthStar has open items in three company codes. One reminder was sent before. No open dispute.</div></In>
          <In t={t} a={34.6} y={14} style={{ left: 36, top: 290, width: 760 }}>
            <div style={{ padding: '26px 30px', borderRadius: 22, border: `1px solid ${C.lime}`, background: C.panel2 }}>
              <div style={{ fontFamily: mono, fontSize: 22, color: C.lime }}>NEXT BEST ACTION</div>
              <div style={{ fontSize: 38, fontWeight: 600, color: C.ink, marginTop: 12 }}>Send a reminder</div>
              <div style={{ fontSize: 28, color: C.mute, marginTop: 8 }}>Because the open items are past due and no dispute is logged.</div></div></In>
          {draft && <In t={t} a={36.5} x={40} y={0} style={{ left: 860, top: 30, width: 700 }}>
            <div style={{ padding: '26px 30px', borderRadius: 22, border: `1px solid ${C.line}`, background: C.panel2 }}>
              <div style={{ fontFamily: mono, fontSize: 22, color: C.dim }}>EMAIL DRAFT · EDITABLE</div>
              <div style={{ fontSize: 30, color: C.ink, marginTop: 16, lineHeight: 1.4 }}>Hello, this is a friendly reminder about the open items on your account. Please let us know if anything is unclear.</div>
              <div style={{ marginTop: 22, display: 'flex', gap: 14 }}><Pill bg={approve ? C.lime : C.panel} color={approve ? C.bg : C.ink} style={{ fontWeight: 600 }}>{approve ? 'Approved' : 'Approve'}</Pill><Pill>Edit</Pill><Pill>Reject</Pill></div></div></In>}
          {approve && <In t={t} a={42.3} y={14} style={{ left: 860, top: 400, width: 700 }}><div style={{ fontSize: 32, color: C.lime }}>✓ Sent after approval, from fresh data</div></In>}
        </div>}
      </Panel>
    </In>
    <Cursor x={cx} y={cy} show={t > 28.5 && t < 43} />
  </Scene>
}

export function COutcome({ t }: { t: number }) {
  return <Scene t={t} s={46} e={58}>
    <Over style={{ left: 140, top: 130 }}>The outcome</Over>
    <Words t={t} a={46.4} text="Phases 1 and 2 are live with the customer." size={96} weight={600} style={{ left: 140, top: 190, width: 1500 }} />
    {[['140', 'countries'], ['4', 'agents'], ['1', 'approval before anything is sent']].map(([n, l], i) => <In key={l} t={t} a={48.4 + i * 0.7} y={24} style={{ left: 140 + i * 560, top: 560, width: 520 }}>
      <div style={{ fontSize: 190, fontWeight: 600, letterSpacing: '-0.05em', color: i === 2 ? C.lime : C.ink, lineHeight: 1 }}>{n}</div><div style={{ fontSize: 36, color: C.mute, marginTop: 12 }}>{l}</div></In>)}
    <In t={t} a={52.4} style={{ left: 140, top: 940 }}><div style={{ fontSize: 30, color: C.dim }}>Read the short story, or ask for the access code for the full case study.</div></In>
  </Scene>
}
