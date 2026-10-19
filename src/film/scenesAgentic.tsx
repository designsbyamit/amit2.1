import type { CSSProperties, ReactNode } from 'react'
import { C, In, Words, Label, Scene, mono, fmt, countTo } from './ui'
import { seg, easeOut, easeInOut, easeOutBack, lerp, rnd, clamp } from './engine'

/* Agentic order confirmation, as a story for someone who has never seen procurement:
   a pharma company, three people, one problem, the concept, the solution, the impact.
   Timed to a 124 bpm score: every scene starts on a bar line. */
const BEAT = 60 / 124
export const BAR = BEAT * 4
export const at = (bar: number) => bar * BAR + 0.03 // the supplied track sits on a 124 bpm grid, first beat at 0.03 s
export const FILM = { hook: [0, at(4)], setup: [at(4), at(8)], people: [at(8), at(12)], problem: [at(12), at(24)], concept: [at(24), at(32)], solution: [at(32), at(45)], impact: [at(45), at(52)], next: [at(52), at(60)] } as const

const B = import.meta.env.BASE_URL
const dir = `${B}images/case-studies/sap-agentic/`
export const SHOTS = ['buyer-worklist', 'buyer-review', 'buyer-share', 'buyer-email']
export const shotUrl = (id: string) => `${dir}${id}.webp`
/** Swap these files to change the persona portraits. */
export const PEOPLE = [
  { id: 'david', name: 'David Paul', role: 'Procurement Operations', line: 'Reads every PDF.', img: `${dir}persona-david-face.jpg` },
  { id: 'adrian', name: 'Adrian Smith', role: 'Buyer', line: 'Decides what is acceptable.', img: `${dir}persona-adrian-face.jpg` },
  { id: 'rajan', name: 'Rajan Nair', role: 'Goods Recipient', line: 'Checks quantity and dates.', img: `${dir}persona-rajan-face.jpg` },
]
export const IMAGES = [...SHOTS.map(shotUrl), ...PEOPLE.map(p => p.img)]

const VENDORS = ['Helios Components AG', 'Baumann Chemie', 'Kestrel Reagents', 'Orchid Solvents', 'Veritas Fine Chem', 'Nordlicht GmbH', 'Altamira Pharma', 'Sable Polymers', 'Tessera Labs', 'Quillon Catalysts', 'Meridian Excipients', 'Brightwater Bio', 'Onyx Packaging', 'Ferro & Vale']

export const Star = ({ size = 80, color = C.lime }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C53 36 64 47 96 50 C64 53 53 64 50 96 C47 64 36 53 4 50 C36 47 47 36 50 4Z" fill={color} /></svg>
)
const Tag = ({ children, color = C.lime, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <span style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color, border: `1px solid ${color}`, borderRadius: 999, padding: '6px 16px', ...style }}>{children}</span>
)
const pop = (t: number, a: number, d = 0.45) => easeOut(seg(t, a, a + d))
const panel: CSSProperties = { position: 'absolute', borderRadius: 18, background: C.panel, border: `1px solid ${C.line}` }

/** Four beat dots, bottom left, from the first beat to the impact. */
export function Frame({ t }: { t: number }) {
  if (t < at(4) - 0.2 || t > at(57)) return null
  const bi = Math.floor(t / BEAT) % 4, ph = (t % BEAT) / BEAT
  const o = easeOut(seg(t, at(4) - 0.2, at(4) + 0.6)) * (1 - easeOut(seg(t, at(57) - 0.6, at(57))))
  return (
    <div style={{ position: 'absolute', left: 100, bottom: 30, display: 'flex', gap: 8, opacity: o }}>
      {[0, 1, 2, 3].map(i => <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === bi ? C.lime : C.line, transform: `scale(${i === bi ? 1.5 - 0.5 * ph : 1})` }} />)}
    </div>
  )
}

/* ───────────── 0 · HOOK ───────────── */
export function Hook({ t }: { t: number }) {
  const [, e] = FILM.hook
  const draw = easeOut(seg(t, 0.2, 4.5))
  const hex = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, i) => `${cx + r * Math.cos((Math.PI / 3) * i + Math.PI / 6)},${cy + r * Math.sin((Math.PI / 3) * i + Math.PI / 6)}`).join(' ')
  return (
    <Scene t={t} s={0} e={e}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} aria-hidden="true">
        <g transform={`rotate(${t * 2.2} 1480 500)`} fill="none" stroke={C.cobalt} strokeWidth="2">
          {[[1480, 500], [1636, 410], [1636, 590], [1480, 680], [1324, 590], [1324, 410], [1480, 320]].map(([x, y], i) => <polygon key={i} points={hex(x, y, 90)} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp(draw * 1.4 - i * 0.1)} opacity={i === 0 ? 1 : 0.6} />)}
          {[[1480, 500], [1636, 410], [1636, 590], [1324, 590]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill={i === 0 ? C.lime : C.cobalt} stroke="none" opacity={clamp(draw * 2 - i * 0.4)} />)}
        </g>
      </svg>
      <In t={t} a={0.3} o={e - 0.3} style={{ left: 120, top: 150 }}><Label>NorthStar Chemicals &amp; Pharma · a story</Label></In>
      <Words t={t} a={0.8} text="Every medicine" size={150} style={{ left: 120, top: 300 }} />
      <Words t={t} a={2.2} text="starts as an email." size={150} weight={300} style={{ left: 120, top: 460 }} accent={['email']} />
      <In t={t} a={4.6} o={e - 0.3} y={16} style={{ left: 120, top: 700, width: 1700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}><Star size={52} /><span style={{ fontSize: 38, fontWeight: 300 }}>NorthStar buys raw materials from suppliers. That is procurement.</span></div>
      </In>
    </Scene>
  )
}

/* ───────────── 1 · THE SETUP ───────────── */
export function Setup({ t: t0 }: { t: number }) {
  const [s, e0] = FILM.setup
  const K = 2, e = s + (e0 - s) * K, t = s + (t0 - s) * K // the scene was drawn for 15.5 s, played in 7.7
  const cx = 960, cy = 470
  const pos = VENDORS.map((_, i) => { const a = (i / VENDORS.length) * Math.PI * 2 - Math.PI / 2; return [cx + Math.cos(a) * 760, cy + Math.sin(a) * 320] as [number, number] })
  const rfq = countTo(t, s + 2, s + 3.4, 0, 14)
  const back = countTo(t, s + 6, s + 9.4, 0, 14)
  const flood = t > s + 10.6 ? countTo(t, s + 10.6, s + 14.6, 14, 412) : back
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>01 · The setup</Label></In>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        {pos.map(([x, y], i) => <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.line} strokeWidth="1.5" opacity={easeOut(seg(t, s + 0.6 + i * 0.06, s + 1.4 + i * 0.06)) * 0.9} />)}
      </svg>
      <div style={{ position: 'absolute', left: cx - 130, top: cy - 90, width: 260, height: 180, borderRadius: 24, background: C.panel, border: `2px solid ${C.lime}`, display: 'grid', placeItems: 'center', boxShadow: `0 0 ${40 + 30 * easeOut(seg(t, s + 10.6, s + 14.6))}px rgba(200,245,90,${0.18 + 0.22 * easeOut(seg(t, s + 10.6, s + 14.6))})`, opacity: easeOut(seg(t, s + 0.3, s + 1)) }}>
        <div style={{ textAlign: 'center' }}><Star size={46} /><div style={{ fontSize: 34, fontWeight: 400, marginTop: 8 }}>NorthStar</div><div style={{ fontFamily: mono, fontSize: 16, color: C.mute, letterSpacing: '0.1em' }}>PROCUREMENT</div></div>
      </div>
      {pos.map(([x, y], i) => {
        const pin = easeOutBack(seg(t, s + 0.6 + i * 0.06, s + 1.3 + i * 0.06))
        const out = seg(t, s + 2 + i * 0.09, s + 3.6 + i * 0.09)
        const rep = seg(t, s + 6 + i * 0.16, s + 7.8 + i * 0.16)
        return (
          <div key={i}>
            <div style={{ position: 'absolute', left: x - 105, top: y - 24, width: 210, height: 48, borderRadius: 24, background: C.panel, border: `1px solid ${rep > 0 && rep < 1 ? C.amber : C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, transform: `scale(${pin})`, opacity: pin, whiteSpace: 'nowrap' }}>{VENDORS[i]}</div>
            {out > 0 && out < 1 && <div style={{ position: 'absolute', left: lerp(cx, x, easeInOut(out)) - 16, top: lerp(cy, y, easeInOut(out)) - 11, width: 32, height: 22, borderRadius: 4, background: C.lime, boxShadow: '0 0 18px rgba(200,245,90,0.6)' }} />}
            {rep > 0 && rep < 1 && <div style={{ position: 'absolute', left: lerp(x, cx, easeInOut(rep)) - 15, top: lerp(y, cy, easeInOut(rep)) - 19, width: 30, height: 38, borderRadius: 4, background: '#F5F6F7', boxShadow: '0 0 18px rgba(255,200,87,0.55)' }}><div style={{ margin: '8px 5px', height: 3, background: C.red }} /><div style={{ margin: '5px 5px', height: 3, background: '#9AA0AA' }} /></div>}
          </div>
        )
      })}
      <In t={t} a={s + 2} o={s + 5.8} style={{ left: 0, width: 1920, top: 880, textAlign: 'center' }}>
        <div style={{ fontSize: 54, fontWeight: 200 }}>One request goes out to <span style={{ color: C.lime }}>{Math.round(rfq)}</span> suppliers.</div>
        <div style={{ fontSize: 28, color: C.mute, marginTop: 8, fontWeight: 300 }}>A request for quotation.</div>
      </In>
      <In t={t} a={s + 6} o={s + 10.4} style={{ left: 0, width: 1920, top: 880, textAlign: 'center' }}>
        <div style={{ fontSize: 54, fontWeight: 200 }}>{Math.round(back)} replies come back. <span style={{ color: C.amber }}>Each one a PDF.</span></div>
        <div style={{ fontSize: 28, color: C.mute, marginTop: 8, fontWeight: 300 }}>Order confirmations: what they will deliver, at what price.</div>
      </In>
      <In t={t} a={s + 10.6} o={e - 0.3} style={{ left: 0, width: 1920, top: 860, textAlign: 'center' }}>
        <div style={{ fontFamily: mono, fontSize: 26, color: C.mute, letterSpacing: '0.1em' }}>ORDER CONFIRMATIONS THIS WEEK · EVERY LAYOUT DIFFERENT</div>
        <div style={{ fontSize: 130, fontWeight: 200, lineHeight: 1, color: C.amber, letterSpacing: '-0.04em' }}>{fmt(flood)}</div>
      </In>
    </Scene>
  )
}

/* ───────────── 2 · THE PEOPLE ───────────── */
export function People({ t: t0 }: { t: number }) {
  const [s, e0] = FILM.people
  const K = 1.5, e = s + (e0 - s) * K, t = s + (t0 - s) * K
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>02 · The people</Label></In>
      <Words t={t} a={s + 0.4} text="Three people. One decision." size={96} style={{ left: 100, top: 130, width: 1600 }} />
      {PEOPLE.map((p, i) => {
        const a = s + 1.6 + i * 1.3
        const q = easeOut(seg(t, a, a + 0.8))
        return (
          <div key={p.id} style={{ position: 'absolute', left: 120 + i * 590, top: 340, width: 540, height: 600, borderRadius: 22, background: C.panel, border: `1px solid ${C.line}`, overflow: 'hidden', opacity: q, transform: `translateY(${(1 - q) * 60}px)` }}>
            <img src={p.img} alt="" style={{ width: '100%', height: 330, objectFit: 'cover', objectPosition: '50% 28%' }} />
            <div style={{ padding: '22px 28px' }}>
              <div style={{ fontFamily: mono, fontSize: 18, color: C.lime, letterSpacing: '0.12em' }}>{p.role.toUpperCase()}</div>
              <div style={{ fontSize: 40, fontWeight: 300, marginTop: 6 }}>{p.name}</div>
              <div style={{ fontSize: 25, color: C.mute, marginTop: 8, lineHeight: 1.3 }}>{p.line}</div>
            </div>
          </div>
        )
      })}
    </Scene>
  )
}

/* ───────────── 3 · THE PROBLEM ───────────── */
function Doc({ t, a }: { t: number; a: number }) {
  const scan = seg(t, a + 0.8, a + 3)
  const flare = (x: number) => easeOut(seg(t, a + x, a + x + 0.5))
  const row = (y: number, text: string, f: number) => (
    <div style={{ position: 'absolute', left: 40, right: 40, top: y, height: 54, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 24, color: '#1A1C21', background: `rgba(255,107,91,${0.22 * f})`, outline: f > 0.05 ? `2px solid rgba(255,107,91,${f})` : 'none', fontFamily: mono, fontWeight: 500 }}>{text}</div>
  )
  return (
    <div style={{ position: 'absolute', left: 120, top: 70, width: 780, height: 940, borderRadius: 14, background: '#F5F6F7', color: '#1A1C21', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
      <div style={{ padding: '36px 40px 0', fontSize: 20, color: '#5B616C', fontFamily: mono, letterSpacing: '0.08em' }}>HELIOS COMPONENTS AG · KUNDENSERVICE</div>
      <div style={{ padding: '10px 40px', fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}>Auftragsbestätigung</div>
      <div style={{ padding: '0 40px', fontSize: 22, color: '#5B616C' }}>Nr. 1505899 · Ihre Bestellung 4994546957</div>
      {[240, 284].map((y, i) => <div key={y} style={{ position: 'absolute', left: 40, top: y, width: 700 - i * 120, height: 10, borderRadius: 5, background: '#D5D9DF' }} />)}
      {row(340, 'Gesamtbetrag:  € 164.865,00', flare(3.4))}
      {row(430, 'Zahlungsbedingungen:  45 Tage netto', flare(5))}
      {row(520, 'Pos. 1002 · Menge:  2.000 Stk', flare(6.6))}
      {[640, 690, 740, 790, 840].map((y, i) => <div key={y} style={{ position: 'absolute', left: 40, top: y, width: 620 - (i % 3) * 80, height: 10, borderRadius: 5, background: '#E2E5EA' }} />)}
      {scan > 0 && scan < 1 && <div style={{ position: 'absolute', left: 0, right: 0, top: 120 + scan * 780, height: 4, background: C.cobalt, boxShadow: `0 0 30px ${C.cobalt}` }} />}
    </div>
  )
}
export function Problem({ t: t0 }: { t: number }) {
  const [s, e0] = FILM.problem
  const K = 0.75, e = s + (e0 - s) * K, t = s + (t0 - s) * K
  const docOut = 1 - easeOut(seg(t, s + 8, s + 8.6))
  const rowIn = (x: number) => easeOut(seg(t, s + x, s + x + 0.6))
  const sev = easeInOut(seg(t, s + 9, s + 12.4))
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 20 }}><Label color={C.red}>03 · The problem</Label></In>
      {docOut > 0.01 && (
        <div style={{ opacity: docOut }}>
          <div style={{ transform: `translateX(${(1 - easeOut(seg(t, s + 0.3, s + 1.2))) * -300}px)` }}><Doc t={t} a={s} /></div>
          <div style={{ position: 'absolute', left: 1000, top: 100, width: 800 }}>
            <In t={t} a={s + 2.6} y={10} style={{ position: 'relative' }}><div style={{ fontFamily: mono, fontSize: 20, color: C.mute, letterSpacing: '0.12em', marginBottom: 14 }}>WHAT WE ORDERED → WHAT THEY CONFIRMED</div></In>
            {[
              { a: 3, f: 'Total value', from: '€142,800', to: '€164,865', d: '+ €22,065 · 15.4%', tag: 'HIGH' },
              { a: 4.6, f: 'Payment terms', from: 'Net 30', to: '“45 Tage netto”', d: '+ 15 days · in German', tag: 'HIGH' },
              { a: 6.2, f: 'Quantity · line 1002', from: '2,500', to: '2,000', d: '− 500 units', tag: 'MEDIUM' },
            ].map(r => (
              <div key={r.f} style={{ marginBottom: 14, borderRadius: 16, background: C.panel, border: `1px solid ${r.tag === 'HIGH' ? C.red : C.amber}`, padding: '20px 26px 22px', opacity: rowIn(r.a), transform: `translateX(${(1 - rowIn(r.a)) * 60}px)` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 18, letterSpacing: '0.1em', color: C.mute }}><span>{r.f.toUpperCase()}</span><span style={{ color: r.tag === 'HIGH' ? C.red : C.amber }}>{r.tag}</span></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 14 }}><span style={{ fontSize: 34, color: C.mute, textDecoration: 'line-through', fontWeight: 300 }}>{r.from}</span><span style={{ fontSize: 54, fontWeight: 300 }}>{r.to}</span></div>
                <div style={{ fontSize: 24, color: r.tag === 'HIGH' ? C.red : C.amber, marginTop: 6 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <In t={t} a={s + 8.8} o={e - 0.3} style={{ left: 0, width: 1920, top: 250 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22 }}>
          {['€22,065 overpaid', 'Cash tied up 15 days longer', '500 units short', 'A batch waits'].map((x, i) => {
            const p = easeOutBack(seg(t, s + 9 + i * 0.8, s + 9.7 + i * 0.8))
            return (
              <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={{ padding: '22px 28px', borderRadius: 14, border: `1.5px solid ${C.red}`, background: `rgba(255,107,91,${0.1 + i * 0.1})`, fontSize: 30, transform: `scale(${p})`, opacity: p }}>{x}</div>
                {i < 3 && <span style={{ color: C.red, fontSize: 36, opacity: p }}>→</span>}
              </div>
            )
          })}
        </div>
        <div style={{ margin: '26px auto 0', width: 1200, height: 10, borderRadius: 5, background: C.line, overflow: 'hidden' }}><div style={{ width: `${sev * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.amber}, ${C.red})` }} /></div>
        <div style={{ fontFamily: mono, fontSize: 20, color: C.red, textAlign: 'center', marginTop: 12, letterSpacing: '0.16em' }}>SEVERITY · RISING</div>
      </In>
      <Words t={t} a={s + 12.7} text="Read by eye. Chased by email." size={84} weight={200} style={{ left: 100, top: 640 }} />
      <Words t={t} a={s + 13.9} text="It takes weeks." size={110} weight={300} style={{ left: 100, top: 780 }} accent={['weeks.']} />
    </Scene>
  )
}

/* ───────────── 4 · THE CONCEPT ───────────── */
function Head({ t, a, o, n, title, sub }: { t: number; a: number; o: number; n: string; title: string; sub: string }) {
  return (
    <>
      <In t={t} a={a} o={o} style={{ left: 100, top: 80 }}><Label>04 · The concept · {n}</Label></In>
      <Words t={t} a={a + 0.2} text={title} size={88} weight={200} style={{ left: 100, top: 190, width: 800 }} />
      <In t={t} a={a + 1.2} o={o} y={14} style={{ left: 100, top: 440, width: 780 }}><div style={{ fontSize: 32, fontWeight: 300, color: C.mute, lineHeight: 1.3 }}>{sub}</div></In>
    </>
  )
}
function AgentCard({ t, a, o }: { t: number; a: number; o: number }) {
  const rows: [string, string, string][] = [['Job', 'Read, compare, prepare each decision.', C.lime], ['Does', 'Scores confidence. Rates each difference. Drafts the reply.', C.cobalt], ['Never', 'Accepts a deviation. Answers the supplier alone.', C.red], ['Hands over to', 'Operations · Buyer · Goods recipient', C.amber]]
  return (
    <>
      <Head t={t} a={a} o={o} n="the agent" title="Give the agent a job, and limits." sub="What it will, and will not, do." />
      {rows.map(([k, v, col], i) => {
        const p = pop(t, a + 0.9 + i * BEAT * 1.5)
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
      <Head t={t} a={a} o={o} n="the contract" title="Write down when a person decides." sub="A human-agent contract, before any screen." />
      <div style={{ ...panel, left: 960, top: 130, width: 860, height: 800, padding: 28, opacity: pop(t, a + 0.6) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>WORKSHEET · AGENT–HUMAN CONTRACT</div>
        <div style={{ fontSize: 38, fontWeight: 300, marginTop: 8 }}>Supplier order confirmation</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 26 }}>
          {CONTRACT.map((c, i) => {
            const p = pop(t, a + 1 + i * BEAT * 0.8)
            const hot = i === 3 || i === 4 ? easeOut(seg(t, a + 4.2, a + 4.8)) : 0
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
  const conf = Math.round(91 * easeOut(seg(t, a + 1, a + 2.8)))
  return (
    <>
      <Head t={t} a={a} o={o} n="the risk" title="Measure what matters." sub="How sure the agent is. How much it matters." />
      <div style={{ ...panel, left: 980, top: 130, width: 380, height: 360, padding: 30, opacity: pop(t, a + 0.6) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>CONFIDENCE</div>
        <div style={{ fontSize: 150, fontWeight: 200, lineHeight: 1, marginTop: 18, letterSpacing: '-0.04em' }}>{conf}<span style={{ fontSize: 56, color: C.mute }}>%</span></div>
        <div style={{ height: 10, borderRadius: 5, background: C.line, marginTop: 24, overflow: 'hidden' }}><div style={{ height: '100%', width: `${conf}%`, background: C.ink }} /></div>
      </div>
      <div style={{ ...panel, left: 1390, top: 130, width: 430, height: 360, padding: 30, opacity: pop(t, a + 0.9) }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>HOW IT FLOWS</div>
        {['Deviation', 'Severity', 'Order risk', 'Worklist priority'].map((c, i) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: i ? 20 : 26, opacity: pop(t, a + 1.2 + i * BEAT * 0.8) }}><span style={{ width: 34, height: 34, borderRadius: 17, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 17, background: i === 3 ? C.lime : 'transparent', color: i === 3 ? C.bg : C.mute, border: `1.5px solid ${i === 3 ? C.lime : C.dim}` }}>{i + 1}</span><span style={{ fontSize: 30, fontWeight: 300 }}>{c}</span></div>)}
      </div>
      <div style={{ ...panel, left: 980, top: 520, width: 840, height: 420, padding: '24px 30px' }}>
        <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.14em', color: C.dim }}>DIFFERENCES FROM ONE ORDER</div>
        {RISKS.map(([k, v, col], i) => {
          const p = pop(t, a + 2.2 + i * BEAT * 1.2)
          return <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px', alignItems: 'center', gap: 20, marginTop: 22, opacity: p }}><span style={{ fontSize: 28, fontWeight: 300 }}>{k}</span><div style={{ height: 8, borderRadius: 4, background: C.line, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(v === 'High' ? 100 : v === 'Medium' ? 62 : 28) * p}%`, background: col }} /></div><span style={{ fontFamily: mono, fontSize: 20, color: col, letterSpacing: '0.08em', textAlign: 'right' }}>{v.toUpperCase()}</span></div>
        })}
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.line}`, paddingTop: 16, opacity: pop(t, a + 4.6) }}><span style={{ fontSize: 30 }}>Order risk</span><Tag color={C.red}>High</Tag></div>
      </div>
    </>
  )
}
export function Concept({ t: t0 }: { t: number }) {
  const [s, e] = FILM.concept
  const QL = 2 * BAR, CL = 2 * BAR
  const KQ = 1.24, tq = s + (t0 - s) * KQ
  const strike = easeOut(seg(tq, s + 1.9, s + 2.5))
  return (
    <Scene t={t0} s={s} e={e}>
      {t0 < s + QL && (
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - easeOut(seg(t0, s + QL - 0.5, s + QL - 0.1)) }}>
          <In t={tq} a={s + 0.1} o={s + 6} style={{ left: 100, top: 90 }}><Label>04 · The concept</Label></In>
          <Words t={tq} a={s + 0.2} text="So the question changed." size={110} weight={200} style={{ left: 100, top: 190 }} />
          <In t={tq} a={s + 1.2} o={s + 6} style={{ left: 100, top: 470 }}><div style={{ position: 'relative', display: 'inline-block', fontSize: 62, fontWeight: 300, color: C.dim }}>How do we automate it?<span style={{ position: 'absolute', left: 0, top: '56%', height: 4, width: `${strike * 100}%`, background: C.red }} /></div></In>
          <Words t={tq} a={s + 2.6} text="Who decides what, and when?" size={104} weight={300} style={{ left: 100, top: 590 }} accent={['decides']} />
        </div>
      )}
      {[AgentCard, ContractMini, RiskCard].map((V, i) => {
        const a = s + QL + i * CL, KC = 5.8 / CL
        if (t0 < a - 0.01 || t0 > a + CL + 0.1) return null
        const tc = a + (t0 - a) * KC
        const fade = i === 2 ? 1 : 1 - easeOut(seg(t0, a + CL - 0.4, a + CL))
        return <div key={i} style={{ position: 'absolute', inset: 0, opacity: fade }}><V t={tc} a={a} o={a + 5.5} /></div>
      })}
    </Scene>
  )
}

/* ───────────── 5 · THE SOLUTION ───────────── */
const NODES = [
  { id: 'mail', label: 'Supplier email', sub: 'PDF arrives', x: 100, y: 400, kind: 'sys' },
  { id: 'agent', label: 'AI Agent', sub: 'Reads and compares', x: 390, y: 400, kind: 'ai' },
  { id: 'ops', label: 'Procurement Ops', sub: 'Validates', x: 680, y: 400, kind: 'human' },
  { id: 'view', label: 'Differences', sub: 'Rated and routed', x: 970, y: 400, kind: 'ai' },
  { id: 'buyer', label: 'Buyer', sub: 'Cost and logistics', x: 1260, y: 270, kind: 'human' },
  { id: 'gr', label: 'Goods Recipient', sub: 'Quantity and dates', x: 1260, y: 530, kind: 'human' },
  { id: 'mailout', label: 'Reply to supplier', sub: 'Drafted by the agent', x: 1560, y: 400, kind: 'ai' },
]
const EDGES: [string, string][] = [['mail', 'agent'], ['agent', 'ops'], ['ops', 'view'], ['view', 'buyer'], ['view', 'gr'], ['buyer', 'mailout'], ['gr', 'mailout']]
const SCREENS: { shot: string; overlay?: boolean; who: string; title: string; text: string }[] = [
  { shot: 'buyer-worklist', who: 'Buyer', title: 'Only what needs a person', text: 'Highest risk first.' },
  { shot: 'buyer-review', who: 'Agent', title: 'Every difference, explained', text: 'Rated, with the reason.' },
  { shot: 'buyer-share', overlay: true, who: 'Agent', title: 'The reply drafts itself', text: 'A person reviews and sends.' },
]
export function Solution({ t }: { t: number }) {
  const [s, e] = FILM.solution
  const diagOut = 1 - easeOut(seg(t, s + 8.6, s + 9.2))
  const N = (id: string) => NODES.find(n => n.id === id)!
  const W = 250, H = 120
  const col = (k: string) => (k === 'ai' ? C.lime : k === 'human' ? C.cobalt : C.mute)
  const pk = ((t - (s + 5)) % 3.6) / 3.6
  const path = ['mail', 'agent', 'ops', 'view', 'buyer', 'mailout']
  const seglen = 1 / (path.length - 1)
  const pi = Math.min(path.length - 2, Math.floor(pk / seglen))
  const pp = (pk - pi * seglen) / seglen
  const pa = N(path[pi]), pb = N(path[pi + 1])
  const t0 = s + 9.4, L = (e - t0) / SCREENS.length
  const i = clamp(Math.floor((t - t0) / L), 0, SCREENS.length - 1)
  const sc = SCREENS[i], a = t0 + i * L
  const ph = seg(t, a, a + 0.35)
  const FW = 1120, FH = FW / (1440 / 899)
  return (
    <Scene t={t} s={s} e={e}>
      {diagOut > 0.01 && (
        <div style={{ position: 'absolute', inset: 0, opacity: diagOut }}>
          <In t={t} a={s + 0.2} o={s + 8.6} style={{ left: 100, top: 70 }}><Label>05 · The solution</Label></In>
          <Words t={t} a={s + 0.4} text="The agent reads. People decide." size={78} style={{ left: 100, top: 130, width: 1700 }} accent={['reads']} />
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
            {EDGES.map(([x, y], k) => {
              const A = N(x), Bn = N(y)
              const x1 = A.x + W, y1 = A.y + H / 2, x2 = Bn.x, y2 = Bn.y + H / 2
              const p = easeOut(seg(t, s + 1.2 + k * 0.5, s + 1.9 + k * 0.5))
              const mx = (x1 + x2) / 2
              return <path key={k} d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} fill="none" stroke={C.mute} strokeWidth="2.5" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} opacity={0.8} />
            })}
            <path d="M100 740 H1820" stroke={C.line} strokeWidth="3" fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - easeOut(seg(t, s + 4, s + 6))} />
          </svg>
          {NODES.map((n, k) => {
            const p = easeOutBack(seg(t, s + 0.9 + k * 0.4, s + 1.6 + k * 0.4))
            return (
              <div key={n.id} style={{ position: 'absolute', left: n.x, top: n.y, width: W, height: H, borderRadius: 18, background: C.panel, border: `2px solid ${col(n.kind)}`, padding: '20px 22px', transform: `scale(${p})`, opacity: clamp(p), boxShadow: n.kind === 'ai' ? '0 0 40px rgba(200,245,90,0.12)' : undefined }}>
                <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: '0.12em', color: col(n.kind) }}>{n.kind === 'ai' ? 'AGENT' : n.kind === 'human' ? 'PERSON' : 'SYSTEM'}</div>
                <div style={{ fontSize: 26, fontWeight: 400, marginTop: 6, whiteSpace: 'nowrap' }}>{n.label}</div>
                <div style={{ fontSize: 20, color: C.mute }}>{n.sub}</div>
              </div>
            )
          })}
          {t > s + 5 && <div style={{ position: 'absolute', left: lerp(pa.x + W, pb.x, easeInOut(pp)) - 14, top: lerp(pa.y + H / 2, pb.y + H / 2, easeInOut(pp)) - 14, width: 28, height: 28, borderRadius: '50%', background: C.lime, boxShadow: '0 0 36px rgba(200,245,90,0.9)' }} />}
          <In t={t} a={s + 6} o={s + 8.6} style={{ left: 0, width: 1920, top: 890, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', gap: 22 }}>{['Agent reads and compares', 'People decide', 'Every step logged'].map((x, k) => <div key={x} style={{ padding: '16px 32px', borderRadius: 40, border: `1.5px solid ${C.lime}`, fontSize: 32, color: C.lime, background: 'rgba(200,245,90,0.08)', transform: `scale(${easeOutBack(seg(t, s + 6.2 + k * 0.4, s + 6.9 + k * 0.4))})` }}>{x}</div>)}</div>
          </In>
        </div>
      )}
      {t >= t0 - 0.2 && (
        <div style={{ position: 'absolute', inset: 0, opacity: easeOut(seg(t, t0 - 0.2, t0 + 0.3)) }}>
          <In t={t} a={t0} o={e - 0.3} style={{ left: 100, top: 70 }}><Label>05 · The solution · what people see</Label></In>
          <div key={i} style={{ position: 'absolute', left: 100, top: 230, width: 520, opacity: easeOut(ph), transform: `translateY(${(1 - easeOut(ph)) * 20}px)` }}>
            <Tag color={sc.who === 'Agent' ? C.lime : C.mute} style={{ fontSize: 16 }}>{sc.who}</Tag>
            <div style={{ fontSize: 58, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 22 }}>{sc.title}</div>
            <div style={{ fontSize: 29, color: C.mute, fontWeight: 300, lineHeight: 1.35, marginTop: 22 }}>{sc.text}</div>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 170, width: FW, height: FH, borderRadius: 18, overflow: 'hidden', background: '#F5F6F7', boxShadow: '0 40px 100px rgba(0,0,0,0.55)', border: `1px solid ${C.line}` }}>
            {SCREENS.map((f, n) => (n === i || n === i - 1) && <img key={f.shot} src={shotUrl(f.shot)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#fff', opacity: n === i ? ph : 1 - ph, transform: `scale(${n === i ? 1.02 - 0.02 * ph : 1})` }} />)}
            {sc.overlay && (
              <div style={{ position: 'absolute', inset: 0, opacity: easeOut(seg(t, a + 0.3, a + 0.8)) }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,22,0.5)' }} />
                <div style={{ position: 'absolute', left: '50%', top: '7%', height: '86%', aspectRatio: '0.531', transform: `translate(-50%, ${(1 - easeOut(seg(t, a + 0.4, a + 1))) * 30}px)`, borderRadius: 10, background: `#fff url(${shotUrl('buyer-email')}) no-repeat`, backgroundSize: '133.7% auto', backgroundPosition: '50% 37.5%', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }} />
              </div>
            )}
          </div>
          <div style={{ position: 'absolute', left: 700, top: 170 + FH + 26, width: FW, display: 'flex', gap: 6 }}>
            {SCREENS.map((_, n) => <div key={n} style={{ flex: 1, height: 5, borderRadius: 3, background: C.line, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(n < i ? 1 : n === i ? seg(t, a, a + L) : 0) * 100}%`, background: C.ink }} /></div>)}
          </div>
        </div>
      )}
    </Scene>
  )
}

/* ───────────── 6 · THE IMPACT ───────────── */
export function Impact({ t }: { t: number }) {
  const [s, e] = FILM.impact
  const N = 412
  const calm = seg(t, s + 0.4, s + 3.6)
  const dim = 1 - 0.7 * easeOut(seg(t, s + 7.2, s + 8))
  return (
    <Scene t={t} s={s} e={e}>
      <In t={t} a={s + 0.2} o={e - 0.3} style={{ left: 100, top: 20 }}><Label>06 · The impact</Label></In>
      <div style={{ position: 'absolute', left: 100, top: 80, width: 1720, display: 'grid', gridTemplateColumns: 'repeat(35, 1fr)', gap: 8, opacity: 0.8 * dim }}>
        {Array.from({ length: N }, (_, k) => {
          const bad = rnd(k * 1.7 + 9) < 0.34
          const resolved = clamp(calm * 1.8 - rnd(k + 5) * 0.8)
          const waiting = bad && rnd(k * 3.1) < 0.18
          const colr = waiting ? C.amber : resolved > 0.5 ? (bad ? C.green : '#4E5A52') : bad ? C.red : '#E4E7EC'
          return <div key={k} style={{ aspectRatio: '4/5', borderRadius: 3, background: colr, opacity: waiting ? 0.9 : 0.55 }} />
        })}
      </div>
      <In t={t} a={s + 1} o={s + 4.4} style={{ left: 0, width: 1920, top: 800, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '26px 52px', borderRadius: 20, background: 'rgba(15,16,19,0.92)', border: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 60, fontWeight: 200, letterSpacing: '-0.03em' }}>The same wall of confirmations. <span style={{ color: C.lime }}>Calm.</span></div>
          <div style={{ fontSize: 28, color: C.mute, marginTop: 8 }}>People only see what needs a person.</div>
        </div>
      </In>
      {[['Reading', 'becomes deciding'], ['Hidden differences', 'arrive with their reasons'], ['Scattered emails', 'become one audit trail']].map(([x, y], k) => (
        <In key={x} t={t} a={s + 4.2 + k * 0.7} o={s + 7.6} y={30} style={{ left: 140 + k * 590, top: 330, width: 540 }}>
          <div style={{ padding: '36px 34px', borderRadius: 20, background: 'rgba(15,16,19,0.94)', border: `1px solid ${C.lime}` }}>
            <div style={{ fontSize: 48, fontWeight: 200, color: C.lime, letterSpacing: '-0.03em' }}>{x}</div>
            <div style={{ fontSize: 34, marginTop: 8, fontWeight: 300 }}>{y}</div>
          </div>
        </In>
      ))}
      <Words t={t} a={s + 7.8} text="From weeks" size={150} weight={200} style={{ left: 120, top: 300 }} />
      <Words t={t} a={s + 8.9} text="to hours." size={190} weight={300} style={{ left: 120, top: 500 }} accent={['hours.']} />
    </Scene>
  )
}

/* ───────────── 7 · WHAT COMES NEXT ───────────── */
const LEVELS: [string, string, string][] = [['Assist', 'Agent recommends. Person acts.', 'FLOOR'], ['Guided autonomy', 'Agent prepares. Person decides.', 'TODAY'], ['Bounded autonomy', 'Agent resolves within policy. People handle exceptions.', 'NEXT']]
export function Next({ t }: { t: number }) {
  const [s, e] = FILM.next
  const card = easeOut(seg(t, s + 9.2, s + 10))
  return (
    <Scene t={t} s={s} e={e + 2}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - card }}>
        <In t={t} a={s + 0.2} o={s + 9.2} style={{ left: 100, top: 70 }}><Label>07 · What comes next</Label></In>
        <Words t={t} a={s + 0.4} text="Toward the" size={76} weight={200} style={{ left: 100, top: 170 }} />
        <Words t={t} a={s + 1.2} text="autonomous enterprise." size={76} weight={300} style={{ left: 100, top: 260 }} accent={['autonomous']} />
        <In t={t} a={s + 2.4} o={s + 9.2} y={14} style={{ left: 100, top: 440, width: 760 }}><div style={{ fontSize: 32, fontWeight: 300, color: C.mute, lineHeight: 1.3 }}>Earned where confidence is high and risk is low.</div></In>
        {LEVELS.map(([n, d, tag], i) => {
          const p = pop(t, s + 1.6 + i * BEAT * 2.5, 0.6)
          const hot = tag === 'TODAY'
          return (
            <div key={n} style={{ position: 'absolute', left: 980 + i * 8, top: 640 - i * 200, width: 840 - i * 8, height: 170, borderRadius: 18, padding: '22px 30px', background: hot ? 'rgba(200,245,90,0.12)' : C.panel, border: `${hot ? 2 : 1}px ${tag === 'NEXT' ? 'dashed' : 'solid'} ${hot ? C.lime : C.line}`, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span style={{ fontSize: 40, fontWeight: 300 }}>{n}</span><Tag color={hot ? C.lime : C.mute} style={{ fontSize: 16, padding: '3px 12px' }}>{tag}</Tag></div>
              <div style={{ fontSize: 24, color: C.mute, marginTop: 10, lineHeight: 1.3 }}>{d}</div>
            </div>
          )
        })}
      </div>
      <In t={t} a={s + 10} style={{ left: 0, width: 1920, top: 330, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Star size={70} /></div>
        <div style={{ fontSize: 88, fontWeight: 200, letterSpacing: '-0.035em', marginTop: 20 }}>Agentic Order Confirmation</div>
        <div style={{ fontSize: 50, fontWeight: 300, color: C.lime, marginTop: 18 }}>Simplifying the complex.</div>
        <div style={{ fontSize: 24, color: C.dim, marginTop: 40 }}>NorthStar is a fictional company. Scenario figures are illustrative.</div>
      </In>
    </Scene>
  )
}
