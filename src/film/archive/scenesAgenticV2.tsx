import type { CSSProperties, ReactNode } from 'react'
import { C, In, Words, Label, Scene, mono } from '../ui'
import { seg, easeOut, easeInOut, clamp } from '../engine'

/* Agentic order confirmation, told as one story: the problem, the concept layer, the architecture, the whole flow, what is next.
   Timed to a 124 bpm score: every scene starts on a bar line. */
const BEAT = 60 / 124
export const BAR = BEAT * 4
export const at = (bar: number) => bar * BAR
export const FILM = { hook: [0, at(4)], problem: [at(4), at(12)], concept: [at(12), at(28)], arch: [at(28), at(34)], flow: [at(34), at(52)], auto: [at(52), at(58)], close: [at(58), at(66)] } as const

const B = import.meta.env.BASE_URL
const dir = `${B}images/case-studies/sap-agentic/`
export const SHOTS = ['ops-worklist', 'ops-validate', 'buyer-worklist', 'buyer-review', 'gr-review', 'buyer-share', 'buyer-email', 'buyer-sent', 'buyer-versions', 'buyer-revised', 'buyer-activity']
export const shotUrl = (id: string) => `${dir}${id}.svg`

export const Star = ({ size = 80, color = C.lime }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C53 36 64 47 96 50 C64 53 53 64 50 96 C47 64 36 53 4 50 C36 47 47 36 50 4Z" fill={color} /></svg>
)

const Tag = ({ children, color = C.lime, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <span style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color, border: `1px solid ${color}`, borderRadius: 999, padding: '6px 16px', ...style }}>{children}</span>
)
const pop = (t: number, a: number, d = 0.45) => easeOut(seg(t, a, a + d))

/** Four beat dots and a credit line that stay under the film from the first beat to the end of the flow. */
export function Frame({ t }: { t: number }) {
  if (t < at(4) - 0.2 || t > at(58)) return null
  const bi = Math.floor(t / BEAT) % 4, ph = (t % BEAT) / BEAT
  const o = easeOut(seg(t, at(4) - 0.2, at(4) + 0.6)) * (1 - easeOut(seg(t, at(58) - 0.6, at(58))))
  return (
    <div style={{ position: 'absolute', left: 100, bottom: 34, display: 'flex', alignItems: 'center', gap: 22, opacity: o }}>
      <div style={{ display: 'flex', gap: 8 }}>{[0, 1, 2, 3].map(i => <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === bi ? C.lime : C.line, transform: `scale(${i === bi ? 1.5 - 0.5 * ph : 1})` }} />)}</div>
      <span style={{ fontFamily: mono, fontSize: 17, letterSpacing: '0.14em', color: C.dim }}>AGENTIC ORDER CONFIRMATION</span>
    </div>
  )
}

/* ───────────── 0 · HOOK ───────────── */
export function Hook({ t }: { t: number }) {
  const [s, e] = FILM.hook
  const grow = easeInOut(seg(t, 2.6, 6.8))
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={0.3} o={e - 0.4} style={{ left: 120, top: 150 }}><Label>Agentic order confirmation · a design story</Label></In>
      <Words t={t} a={0.9} text="Weeks." size={300} weight={200} style={{ left: 114, top: 250 }} />
      <In t={t} a={2.6} o={e - 0.3} style={{ left: 120, top: 640, width: 1680 }}>
        <div style={{ height: 10, borderRadius: 5, background: C.line, overflow: 'hidden' }}><div style={{ width: `${grow * 100}%`, height: '100%', background: C.amber }} /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.mute }}><span>A SUPPLIER REPLIES</span><span>THE ORDER IS CONFIRMED</span></div>
      </In>
      <Words t={t} a={4.4} text="The goal: hours." size={120} weight={300} style={{ left: 120, top: 760 }} accent={['hours']} />
    </Scene>
  )
}

/* ───────────── 1 · THE PROBLEM ───────────── */
const ASIS = [['Supplier replies', 'An email with a PDF, in the supplier’s own layout.'], ['Someone reads it', 'Often in German, checked by eye.'], ['Compared with the PO', 'Line by line, in another system.'], ['Risk judged by hand', 'Mapped without structure.'], ['Owners chased', 'Buyer and goods recipient, by email.'], ['Supplier told what to fix', 'And the cycle repeats.']]
const NUANCE = [['Time', 'Weeks, not hours', 'One confirmation took weeks to process. The business needed hours.'], ['Scattered', 'Documents live everywhere', 'Emails, PDF attachments, the ERP and other apps. No single place for an order’s story.'], ['Unstructured', 'Risk mapped by hand', 'Supplier and risk profiles, mapped by hand with no common structure.']]
export function Problem({ t }: { t: number }) {
  const [s, e] = FILM.problem
  const bar = easeInOut(seg(t, s + 2.6, s + 9.2))
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label color={C.red}>01 · The business problem</Label></In>
      <Words t={t} a={s + 0.4} text="It looked like automation." size={84} weight={200} style={{ left: 100, top: 120 }} />
      <Words t={t} a={s + 1.7} text="It was a design problem." size={84} weight={300} style={{ left: 100, top: 220 }} accent={['design']} />
      {ASIS.map(([a, b], i) => {
        const p = pop(t, s + 2.6 + i * BEAT * 1.5)
        return (
          <div key={a} style={{ position: 'absolute', left: 100 + i * 290, top: 380, width: 270, opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, border: `1.5px solid ${C.dim}`, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 18, color: C.mute }}>{i + 1}</div>
            <div style={{ fontSize: 30, fontWeight: 400, marginTop: 14, lineHeight: 1.15 }}>{a}</div>
            <div style={{ fontSize: 21, color: C.mute, marginTop: 8, lineHeight: 1.3 }}>{b}</div>
          </div>
        )
      })}
      <In t={t} a={s + 2.6} o={e - 0.3} style={{ left: 100, top: 640, width: 1720 }}>
        <div style={{ height: 12, borderRadius: 6, background: C.line, overflow: 'hidden' }}><div style={{ width: `${bar * 100}%`, height: '100%', background: C.lime }} /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: mono, fontSize: 19, letterSpacing: '0.12em', color: C.dim }}><span>CONFIRMATION ARRIVES</span><span style={{ color: C.ink, opacity: seg(t, s + 8.4, s + 9.2) }}>WEEKS LATER</span></div>
      </In>
      {NUANCE.map(([k, h, d], i) => {
        const p = pop(t, s + 9.8 + i * BEAT * 2)
        return (
          <div key={k} style={{ position: 'absolute', left: 100 + i * 580, top: 740, width: 560, height: 240, borderRadius: 18, background: C.panel, border: `1px solid ${C.line}`, padding: '28px 32px', opacity: p, transform: `translateY(${(1 - p) * 24}px)` }}>
            <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: '0.14em', color: C.lime, textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontSize: 40, fontWeight: 300, marginTop: 10, letterSpacing: '-0.02em' }}>{h}</div>
            <div style={{ fontSize: 23, color: C.mute, marginTop: 10, lineHeight: 1.35 }}>{d}</div>
          </div>
        )
      })}
    </Scene>
  )
}

/* ───────────── 2 · THE CONCEPT ───────────── */
function ConceptHead({ t, a, o, n, title, sub }: { t: number; a: number; o: number; n: number; title: string; sub: string }) {
  return (
    <>
      <In t={t} a={a} o={o} style={{ left: 100, top: 80 }}><Label>02 · The concept · {n} of 4</Label></In>
      <Words t={t} a={a + 0.2} text={title} size={92} weight={200} style={{ left: 100, top: 190, width: 800 }} />
      <In t={t} a={a + 1.4} o={o} y={14} style={{ left: 100, top: 560, width: 760 }}><div style={{ fontSize: 34, fontWeight: 300, color: C.mute, lineHeight: 1.3 }}>{sub}</div></In>
    </>
  )
}
const panel: CSSProperties = { position: 'absolute', borderRadius: 18, background: C.panel, border: `1px solid ${C.line}` }

function Pattern({ t, a, o }: { t: number; a: number; o: number }) {
  const px = [1000, 1290, 1580]
  const titles = ['A document in', 'A comparison', 'A decision']
  return (
    <>
      <ConceptHead t={t} a={a} o={o} n={1} title="A pattern, not a use case." sub="Solve it once: a document in, a comparison, a decision. The answer holds for the next customer and the next document." />
      {px.map((x, i) => {
        const p = pop(t, a + 1 + i * BEAT * 2)
        const col = i === 1 ? C.amber : i === 2 ? C.lime : C.cobalt
        return (
          <div key={i} style={{ ...panel, left: x, top: 250, width: 240, height: 320, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, padding: 22 }}>
            {i === 0 && [0, 1, 2, 3, 4].map(r => <div key={r} style={{ height: 10, borderRadius: 5, background: r === 0 ? C.mute : C.line, width: `${100 - r * 12}%`, marginTop: r ? 16 : 6 }} />)}
            {i === 1 && <><div style={{ display: 'flex', gap: 10 }}>{[0, 1].map(c => <div key={c} style={{ flex: 1 }}>{[0, 1, 2].map(r => <div key={r} style={{ height: 12, borderRadius: 6, marginTop: r ? 16 : 6, background: c === 1 && r === 1 ? C.red : C.line }} />)}</div>)}</div><div style={{ marginTop: 26, fontFamily: mono, fontSize: 18, color: C.red, letterSpacing: '0.08em' }}>+ 15 DAYS</div></>}
            {i === 2 && <div style={{ display: 'grid', gap: 14, marginTop: 8 }}><div style={{ height: 54, borderRadius: 27, background: C.lime, color: C.bg, display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 500 }}>Accept</div><div style={{ height: 54, borderRadius: 27, border: `1.5px solid ${C.dim}`, display: 'grid', placeItems: 'center', fontSize: 24, color: C.mute }}>Reject</div></div>}
            <div style={{ position: 'absolute', left: 22, bottom: 20, fontSize: 25, color: col }}>{titles[i]}</div>
          </div>
        )
      })}
      {[1240, 1530].map((x, i) => <div key={x} style={{ position: 'absolute', left: x, top: 395, width: 50, height: 3, background: C.lime, opacity: pop(t, a + 1.8 + i * BEAT * 2), transform: 'scaleX(1)', transformOrigin: 'left' }} />)}
      {['The next customer', 'The next document'].map((c, i) => <In key={c} t={t} a={a + 4.6 + i * BEAT * 2} o={o} style={{ left: 1000 + i * 380, top: 650 }}><Tag color={C.mute}>{c}</Tag></In>)}
      <In t={t} a={a + 5.8} o={o} style={{ left: 1000, top: 740, width: 820 }}><div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', color: C.lime }}>SAME PATTERN → SAME ANSWER</div></In>
    </>
  )
}

function AgentCard({ t, a, o }: { t: number; a: number; o: number }) {
  const rows: [string, string, string][] = [['Job', 'Read each confirmation, compare it with the purchase order, prepare every decision for a person.', C.lime], ['Does', 'Extracts with a confidence score. Rates every difference and explains it. Routes it to its owner. Drafts the reply. Logs everything.', C.cobalt], ['Never', 'Accepts a deviation. Confirms its own extraction. Answers the supplier alone.', C.red], ['Hands over to', 'Operations · the buyer · the goods recipient', C.amber]]
  return (
    <>
      <ConceptHead t={t} a={a} o={o} n={2} title="The agent, defined." sub="A promise about what it will and will not do. Every screen, role and permission follows from it." />
      {rows.map(([k, v, col], i) => {
        const p = pop(t, a + 1 + i * BEAT * 2)
        return (
          <div key={k} style={{ ...panel, left: 980, top: 150 + i * 200, width: 840, height: 176, padding: '24px 30px', opacity: p, transform: `translateX(${(1 - p) * 40}px)`, borderLeft: `5px solid ${col}` }}>
            <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.14em', color: col, textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontSize: 29, fontWeight: 300, marginTop: 10, lineHeight: 1.3 }}>{v}</div>
          </div>
        )
      })}
    </>
  )
}

const CONTRACT = ['Purpose and scope', 'Agent capabilities', 'Guardrails and boundaries', 'Levels of autonomy', 'Approval and escalation', 'Roles and responsibilities', 'Evidence and confidence', 'Monitoring and success', 'Learning and evolution']
function ContractMini({ t, a, o }: { t: number; a: number; o: number }) {
  return (
    <>
      <ConceptHead t={t} a={a} o={o} n={3} title="The human-agent contract." sub="Before any screen: what the agent may do, when a person decides, and how its autonomy grows." />
      <div style={{ ...panel, left: 960, top: 130, width: 860, height: 800, padding: 28, opacity: pop(t, a + 0.8) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>WORKSHEET · AGENT–HUMAN CONTRACT</div>
        <div style={{ fontSize: 38, fontWeight: 300, marginTop: 8 }}>Supplier order confirmation</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 26 }}>
          {CONTRACT.map((c, i) => {
            const p = pop(t, a + 1.4 + i * BEAT)
            const hot = i === 3 || i === 4 ? easeOut(seg(t, a + 5.2, a + 5.8)) : 0
            return (
              <div key={c} style={{ height: 176, borderRadius: 14, padding: '16px 18px', background: C.panel2, border: `1.5px solid ${hot > 0.1 ? C.lime : C.line}`, opacity: p, transform: `scale(${0.94 + 0.06 * p})`, boxShadow: hot > 0.1 ? `0 0 ${24 * hot}px rgba(200,245,90,0.25)` : 'none' }}>
                <div style={{ fontFamily: mono, fontSize: 17, color: C.lime }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 26, fontWeight: 400, marginTop: 8, lineHeight: 1.18 }}>{c}</div>
                <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>{[78, 56].map(w => <div key={w} style={{ height: 6, borderRadius: 3, background: C.line, width: `${w}%` }} />)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

const RISKS: [string, string, string][] = [['Total invoice value', 'High', C.red], ['Payment terms', 'High', C.red], ['Additional costs', 'Medium', C.amber], ['Description, line 1001', 'Low', C.green]]
function RiskCard({ t, a, o }: { t: number; a: number; o: number }) {
  const conf = Math.round(91 * easeOut(seg(t, a + 1.2, a + 3.2)))
  return (
    <>
      <ConceptHead t={t} a={a} o={o} n={4} title="Risk, measured." sub="Confidence says how sure the agent is. Risk says how much a difference matters. Both decide when a person steps in." />
      <div style={{ ...panel, left: 980, top: 130, width: 380, height: 360, padding: 30, opacity: pop(t, a + 0.8) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>CONFIDENCE</div>
        <div style={{ fontSize: 150, fontWeight: 200, lineHeight: 1, marginTop: 18, letterSpacing: '-0.04em' }}>{conf}<span style={{ fontSize: 56, color: C.mute }}>%</span></div>
        <div style={{ height: 10, borderRadius: 5, background: C.line, marginTop: 24, overflow: 'hidden' }}><div style={{ height: '100%', width: `${conf}%`, background: C.ink }} /></div>
      </div>
      <div style={{ ...panel, left: 1390, top: 130, width: 430, height: 360, padding: 30, opacity: pop(t, a + 1.2) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>HOW IT FLOWS</div>
        {['Deviation', 'Severity', 'Order risk', 'Worklist priority'].map((c, i) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: i ? 20 : 26, opacity: pop(t, a + 1.6 + i * BEAT) }}><span style={{ width: 34, height: 34, borderRadius: 17, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 17, background: i === 3 ? C.lime : 'transparent', color: i === 3 ? C.bg : C.mute, border: `1.5px solid ${i === 3 ? C.lime : C.dim}` }}>{i + 1}</span><span style={{ fontSize: 30, fontWeight: 300 }}>{c}</span></div>)}
      </div>
      <div style={{ ...panel, left: 980, top: 520, width: 840, height: 420, padding: '24px 30px' }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>REAL DEVIATIONS FROM ONE ORDER</div>
        {RISKS.map(([k, v, col], i) => {
          const p = pop(t, a + 3.2 + i * BEAT * 1.5)
          return <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px', alignItems: 'center', gap: 20, marginTop: 22, opacity: p }}><span style={{ fontSize: 28, fontWeight: 300 }}>{k}</span><div style={{ height: 8, borderRadius: 4, background: C.line, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(v === 'High' ? 100 : v === 'Medium' ? 62 : 28) * p}%`, background: col }} /></div><span style={{ fontFamily: mono, fontSize: 20, color: col, letterSpacing: '0.08em', textAlign: 'right' }}>{v.toUpperCase()}</span></div>
        })}
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.line}`, paddingTop: 16, opacity: pop(t, a + 6.2) }}><span style={{ fontSize: 30 }}>Order risk</span><Tag color={C.red}>High</Tag></div>
      </div>
    </>
  )
}

export function Concept({ t }: { t: number }) {
  const [s, e] = FILM.concept
  const L = (e - s) / 4
  return (
    <Scene t={t} s={s} e={e}>
      {[Pattern, AgentCard, ContractMini, RiskCard].map((V, i) => {
        const a = s + i * L, o = a + L - 0.3
        if (t < a - 0.01 || t > o + 0.7) return null
        return <div key={i} style={{ position: 'absolute', inset: 0, opacity: 1 - easeOut(seg(t, o, o + 0.5)) }}><V t={t} a={a} o={o} /></div>
      })}
    </Scene>
  )
}

/* ───────────── 3 · ARCHITECTURE ───────────── */
type K = 'agent' | 'gate' | 'person' | 'source'
const NODES: { c: number; r: number; k: K; t: string }[] = [
  { c: 0, r: 0, k: 'source', t: 'Email with a PDF' }, { c: 0, r: 2, k: 'source', t: 'Mailbox and ERP connected' },
  { c: 1, r: 0, k: 'agent', t: 'Reads email and PDF' }, { c: 1, r: 1, k: 'agent', t: 'Extracts the data' }, { c: 1, r: 2, k: 'agent', t: 'Scores confidence' },
  { c: 2, r: 0, k: 'person', t: 'Corrects if required' }, { c: 2, r: 1, k: 'gate', t: 'Validation complete' },
  { c: 3, r: 0, k: 'agent', t: 'Compares with the PO' }, { c: 3, r: 1, k: 'agent', t: 'Rates severity and risk' }, { c: 3, r: 2, k: 'agent', t: 'Routes each difference' },
  { c: 4, r: 0, k: 'gate', t: 'Buyer decides' }, { c: 4, r: 1, k: 'gate', t: 'Goods recipient decides' },
  { c: 5, r: 0, k: 'agent', t: 'Drafts the reply' }, { c: 5, r: 1, k: 'gate', t: 'Buyer sends' }, { c: 5, r: 2, k: 'agent', t: 'Approve and close' },
]
const STAGE = ['Ingest', 'Parse', 'Validate', 'Compare and route', 'Decide', 'Reply and close']
const gx = (c: number) => 100 + c * 292, gy = (r: number) => 360 + r * 150
const LINKS: [number, number][] = [[0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 7], [6, 7], [7, 8], [8, 9], [9, 10], [9, 11], [10, 12], [11, 12], [12, 13], [13, 14]]
export function Architecture({ t }: { t: number }) {
  const [s, e] = FILM.arch
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>03 · Flow architecture</Label></In>
      <Words t={t} a={s + 0.4} text="One structure for every role." size={84} weight={200} style={{ left: 100, top: 120 }} />
      {STAGE.map((g, i) => <In key={g} t={t} a={s + 1 + i * BEAT} o={e - 0.3} y={8} style={{ left: gx(i), top: 300 }}><span style={{ fontFamily: mono, fontSize: 17, letterSpacing: '0.12em', color: C.dim }}>{`0${i + 1} ${g.toUpperCase()}`}</span></In>)}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        {LINKS.map(([a, b], i) => {
          const A = NODES[a], Bn = NODES[b]
          const x1 = gx(A.c) + (Bn.c === A.c ? 125 : 250), y1 = gy(A.r) + (Bn.c === A.c ? 80 : 40)
          const x2 = gx(Bn.c) + (Bn.c === A.c ? 125 : 0), y2 = gy(Bn.r) + (Bn.c === A.c ? 0 : 40)
          const d = Bn.c === A.c ? `M${x1} ${y1} V${y2}` : `M${x1} ${y1} C${x1 + 22} ${y1} ${x2 - 22} ${y2} ${x2} ${y2}`
          const p = easeOut(seg(t, s + 1.8 + i * 0.28, s + 2.6 + i * 0.28))
          return <path key={i} d={d} fill="none" stroke={C.mute} strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} opacity={0.85} />
        })}
      </svg>
      {NODES.map((n, i) => {
        const p = pop(t, s + 1.4 + (n.c * 3 + n.r) * 0.22)
        const st: CSSProperties = n.k === 'agent' ? { background: C.panel2, border: `1px solid ${C.line}`, borderLeft: `5px solid ${C.cobalt}` } : n.k === 'gate' ? { background: C.lime, color: C.bg, border: `1px solid ${C.lime}` } : n.k === 'person' ? { border: `1.5px solid ${C.mute}` } : { border: `1.5px dashed ${C.dim}`, color: C.mute }
        return <div key={i} style={{ position: 'absolute', left: gx(n.c), top: gy(n.r), width: 250, height: 80, borderRadius: 14, padding: '0 18px', display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 400, lineHeight: 1.15, opacity: p, transform: `translateY(${(1 - p) * 14}px)`, ...st }}>{n.t}</div>
      })}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: easeOut(seg(t, s + 3.8, s + 4.6)) }} aria-hidden="true"><path d={`M${gx(5) + 250 + 18} ${gy(1) + 40} H${gx(5) + 250 + 40} V240 H${gx(0) + 125} V${gy(0) - 14}`} fill="none" stroke={C.dim} strokeWidth="2" strokeDasharray="7 7" /></svg>
      <In t={t} a={s + 4.6} o={e - 0.3} style={{ left: 100, top: 870, width: 1720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          {['Worklist', 'Object page', 'Processing', 'Permissions'].map((c, i) => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}><Tag color={i === 3 ? C.lime : C.mute}>{c}</Tag>{i < 3 && <span style={{ color: C.dim, fontSize: 26 }}>→</span>}</span>)}
          <span style={{ fontSize: 26, color: C.mute, fontWeight: 300, marginLeft: 12 }}>The same four steps for every role. A revision returns to the inbox.</span>
        </div>
      </In>
    </Scene>
  )
}

/* ───────────── 4 · THE WHOLE FLOW ───────────── */
type Who = 'Agent' | 'Operations' | 'Buyer' | 'Goods recipient'
const FLOW: { shot: string; overlay?: boolean; who: Who; title: string; text: string; ring?: [number, number, number, number] }[] = [
  { shot: 'ops-worklist', who: 'Operations', title: 'The worklist is already waiting', text: 'The agent has read the new confirmations. Operations sees what needs validating, and how confident the agent is.', ring: [0.03, 0.24, 0.36, 0.12] },
  { shot: 'ops-validate', who: 'Operations', title: 'Gate one: validation', text: 'Corrections are logged. Nothing moves on until a person confirms.', ring: [0.33, 0.44, 0.34, 0.26] },
  { shot: 'buyer-worklist', who: 'Buyer', title: 'The buyer starts with risk', text: 'Every confirmation with its discrepancies, risk and status. Highest risk first.', ring: [0, 0.42, 1, 0.36] },
  { shot: 'buyer-review', who: 'Agent', title: 'Every difference, with reasoning', text: 'Compared with the purchase order, rated, and explained in plain language.', ring: [0.02, 0.5, 0.96, 0.22] },
  { shot: 'gr-review', who: 'Goods recipient', title: 'In parallel: quantity and delivery', text: 'The goods recipient decides only what they can judge.', ring: [0.02, 0.7, 0.96, 0.22] },
  { shot: 'buyer-share', overlay: true, who: 'Agent', title: 'The reply drafts itself', text: 'The email to the supplier opens over the object page, discrepancy list attached.' },
  { shot: 'buyer-sent', who: 'Buyer', title: 'Gate three: send', text: 'The buyer reviews and sends. The page says what happens next.', ring: [0.02, 0.27, 0.96, 0.2] },
  { shot: 'buyer-revised', who: 'Agent', title: 'A revision comes back', text: 'The supplier’s revised confirmation arrives as a new version of the same order.', ring: [0, 0.04, 0.72, 0.2] },
  { shot: 'buyer-activity', who: 'Agent', title: 'Everything on the record', text: 'One timeline of who did what, including the AI Agent.', ring: [0, 0.25, 0.64, 0.66] },
]
const WHO: Who[] = ['Agent', 'Operations', 'Buyer', 'Goods recipient']
export function Flow({ t }: { t: number }) {
  const [s, e] = FILM.flow
  const L = (e - s) / FLOW.length
  const i = clamp(Math.floor((t - s) / L), 0, FLOW.length - 1)
  const st = FLOW[i], a = s + i * L
  const ph = seg(t, a, a + 0.32)
  const beatPulse = 1 - ((t - a) % BEAT) / BEAT
  const FW = 1120, FH = FW / (1440 / 899)
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>04 · The whole flow</Label></In>
      <div style={{ position: 'absolute', left: 100, top: 150, display: 'flex', flexWrap: 'wrap', gap: 10, width: 520 }}>
        {WHO.map(w => <span key={w} style={{ fontFamily: mono, fontSize: 16, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '7px 14px', borderRadius: 999, background: w === st.who ? (w === 'Agent' ? C.lime : C.ink) : 'transparent', color: w === st.who ? C.bg : C.dim, border: `1px solid ${w === st.who ? 'transparent' : C.line}` }}>{w}</span>)}
      </div>
      <div key={i} style={{ position: 'absolute', left: 100, top: 300, width: 520, opacity: easeOut(ph), transform: `translateY(${(1 - easeOut(ph)) * 20}px)` }}>
        <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: '0.14em', color: C.lime }}>STEP {i + 1} OF {FLOW.length}</div>
        <div style={{ fontSize: 60, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 14 }}>{st.title}</div>
        <div style={{ fontSize: 30, color: C.mute, fontWeight: 300, lineHeight: 1.35, marginTop: 22 }}>{st.text}</div>
      </div>
      <div style={{ position: 'absolute', left: 700, top: 170, width: FW, height: FH, borderRadius: 18, overflow: 'hidden', background: '#F5F6F7', boxShadow: '0 40px 100px rgba(0,0,0,0.55)', border: `1px solid ${C.line}` }}>
        {FLOW.map((f, n) => (n === i || n === i - 1) && (
          <img key={f.shot + n} src={shotUrl(f.shot)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#fff', opacity: n === i ? ph : 1 - ph, transform: `scale(${n === i ? 1.02 - 0.02 * ph : 1})` }} />
        ))}
        {st.overlay && (
          <div style={{ position: 'absolute', inset: 0, opacity: easeOut(seg(t, a + 0.1, a + 0.5)) }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,22,0.5)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '7%', height: '86%', aspectRatio: '0.531', transform: `translate(-50%, ${(1 - easeOut(seg(t, a + 0.2, a + 0.8))) * 30}px)`, borderRadius: 10, background: `#fff url(${shotUrl('buyer-email')}) no-repeat`, backgroundSize: '133.7% auto', backgroundPosition: '50% 37.5%', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }} />
          </div>
        )}
        {st.ring && t > a + 0.6 && (
          <div style={{ position: 'absolute', left: `${st.ring[0] * 100}%`, top: `${st.ring[1] * 100}%`, width: `${st.ring[2] * 100}%`, height: `${st.ring[3] * 100}%`, borderRadius: 8, border: '3px solid #7aa800', boxShadow: `0 0 0 ${4 + 8 * beatPulse}px rgba(200,245,90,${0.18 + 0.3 * beatPulse})`, opacity: easeOut(seg(t, a + 0.6, a + 1)) }} />
        )}
      </div>
      <div style={{ position: 'absolute', left: 700, top: 170 + FH + 26, width: FW, display: 'flex', gap: 6 }}>
        {FLOW.map((_, n) => <div key={n} style={{ flex: 1, height: 5, borderRadius: 3, background: C.line, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(n < i ? 1 : n === i ? seg(t, a, a + L) : 0) * 100}%`, background: C.ink }} /></div>)}
      </div>
    </Scene>
  )
}

/* ───────────── 5 · AUTONOMY ───────────── */
const LEVELS: [string, string, string][] = [['Assist', 'The agent recommends. A person does the work.', 'FLOOR'], ['Guided autonomy', 'The agent reads, compares, routes and drafts. A person decides at three gates.', 'TODAY'], ['Bounded autonomy', 'High confidence and low risk: the agent resolves inside explicit policy. People review exceptions.', 'NEXT']]
export function Autonomy({ t }: { t: number }) {
  const [s, e] = FILM.auto
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>05 · Autonomy</Label></In>
      <Words t={t} a={s + 0.4} text="Autonomy that is earned." size={92} weight={200} style={{ left: 100, top: 190, width: 800 }} />
      <In t={t} a={s + 1.6} o={e - 0.3} style={{ left: 100, top: 560, width: 760 }}><div style={{ fontSize: 34, fontWeight: 300, color: C.mute, lineHeight: 1.3 }}>Each step up is earned where confidence is high and risk is low. Every step stays in the activity log.</div></In>
      {LEVELS.map(([n, d, tag], i) => {
        const p = pop(t, s + 1 + i * BEAT * 2.5, 0.6)
        const hot = tag === 'TODAY'
        return (
          <div key={n} style={{ position: 'absolute', left: 980 + i * 8, top: 640 - i * 200, width: 840 - i * 8, height: 170, borderRadius: 18, padding: '22px 30px', background: hot ? 'rgba(200,245,90,0.12)' : C.panel, border: `${hot ? 2 : 1}px ${tag === 'NEXT' ? 'dashed' : 'solid'} ${hot ? C.lime : C.line}`, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span style={{ fontSize: 40, fontWeight: 300 }}>{n}</span><Tag color={hot ? C.lime : C.mute} style={{ fontSize: 16, padding: '3px 12px' }}>{tag}</Tag></div>
            <div style={{ fontSize: 24, color: C.mute, marginTop: 10, lineHeight: 1.3 }}>{d}</div>
          </div>
        )
      })}
    </Scene>
  )
}

/* ───────────── 6 · CLOSE ───────────── */
export function Close({ t }: { t: number }) {
  const [s, e] = FILM.close
  const chips = ['An agent definition', 'A human-agent contract', 'A risk model', 'One architecture, three roles']
  return (
    <Scene t={t} s={s} e={e + 2}>
      <Words t={t} a={s + 0.3} text="Weeks to hours." size={210} weight={200} style={{ left: 110, top: 110 }} accent={['hours']} />
      <div style={{ position: 'absolute', left: 120, top: 400, display: 'flex', flexWrap: 'wrap', gap: 14, width: 1500 }}>{chips.map((c, i) => <span key={c} style={{ opacity: pop(t, s + 2.2 + i * BEAT * 1.5) }}><Tag color={C.mute}>{c}</Tag></span>)}</div>
      <In t={t} a={s + 4.6} style={{ left: 120, top: 520, width: 1400 }}><div style={{ fontSize: 38, fontWeight: 300, color: C.mute, lineHeight: 1.3 }}>Built to take order confirmation from weeks to a few hours, across three personas and 33 screens.</div></In>
      <Words t={t} a={s + 5.4} text="Simplifying the complex." size={118} weight={300} style={{ left: 120, top: 650 }} accent={['complex.']} />
      <In t={t} a={s + 6.6} style={{ left: 120, top: 860, width: 1600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <Star size={64} />
          <div><div style={{ fontSize: 44, fontWeight: 400 }}>Agentic order confirmation</div><div style={{ fontFamily: mono, fontSize: 21, letterSpacing: '0.12em', color: C.mute, marginTop: 8 }}>CO-CREATED WITH CUSTOMERS AS A WHITE-LABELLED SOLUTION ACROSS SUPPLY CHAIN MANAGEMENT</div></div>
        </div>
      </In>
    </Scene>
  )
}

