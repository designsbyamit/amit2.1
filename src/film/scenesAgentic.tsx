import { C, In, Words, Label, Scene, mono, fmt, countTo } from './ui'
import { seg, easeOut, easeInOut, lerp, rnd, clamp, easeOutBack } from './engine'

const B = import.meta.env.BASE_URL
const dir = `${B}images/case-studies/sap-agentic/`

const VENDORS = ['Helios Components AG', 'Baumann Chemie', 'Kestrel Reagents', 'Orchid Solvents', 'Veritas Fine Chem', 'Nordlicht GmbH', 'Altamira Pharma', 'Sable Polymers', 'Tessera Labs', 'Quillon Catalysts', 'Meridian Excipients', 'Brightwater Bio', 'Onyx Packaging', 'Ferro & Vale']

const Star = ({ size = 80, color = C.lime }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C53 36 64 47 96 50 C64 53 53 64 50 96 C47 64 36 53 4 50 C36 47 47 36 50 4Z" fill={color} /></svg>
)

/* ───────────── 0 · HOOK  (0–10) ───────────── */
export function Hook({ t }: { t: number }) {
  const draw = easeOut(seg(t, 0.2, 4.5))
  const hex = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, i) => `${cx + r * Math.cos((Math.PI / 3) * i + Math.PI / 6)},${cy + r * Math.sin((Math.PI / 3) * i + Math.PI / 6)}`).join(' ')
  return (
    <Scene t={t} s={0} e={10}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.55 }} aria-hidden="true">
        <g transform={`rotate(${t * 2.2} 1360 540)`} fill="none" stroke={C.cobalt} strokeWidth="2">
          {[[1360, 540], [1360 + 156, 540 - 90], [1360 + 156, 540 + 90], [1360, 540 + 180], [1360 - 156, 540 + 90], [1360 - 156, 540 - 90], [1360, 540 - 180]].map(([x, y], i) => (
            <polygon key={i} points={hex(x, y, 90)} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp(draw * 1.4 - i * 0.1)} opacity={i === 0 ? 1 : 0.6} />
          ))}
          {[[1360, 540], [1516, 450], [1516, 630], [1204, 630]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill={i === 0 ? C.lime : C.cobalt} stroke="none" opacity={clamp(draw * 2 - i * 0.4)} />)}
        </g>
      </svg>
      <In t={t} a={0.6} o={9} style={{ left: 120, top: 150 }}><Label>NorthStar Chemicals &amp; Pharma · a case study</Label></In>
      <Words t={t} a={1.2} text="Every medicine" size={150} style={{ left: 120, top: 330 }} />
      <Words t={t} a={2.9} text="starts as an email." size={150} weight={300} style={{ left: 120, top: 490 }} accent={['email']} />
      <In t={t} a={6.2} o={9} y={16} style={{ left: 120, top: 720, width: 980 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}><Star size={56} /><span style={{ fontSize: 40, fontWeight: 300, color: C.ink }}>NorthStar makes the chemicals and drugs the world depends on.</span></div>
        <div style={{ fontSize: 30, color: C.mute, marginTop: 18, marginLeft: 78, fontWeight: 300 }}>Every batch begins with raw materials from suppliers it has to trust.</div>
      </In>
    </Scene>
  )
}

/* ───────────── 1 · SETUP  (10–28) ───────────── */
export function Setup({ t }: { t: number }) {
  const cx = 960, cy = 470
  const pos = VENDORS.map((_, i) => { const a = (i / VENDORS.length) * Math.PI * 2 - Math.PI / 2; return [cx + Math.cos(a) * 760, cy + Math.sin(a) * 320] as [number, number] })
  const rfq = countTo(t, 12, 13.5, 0, 14)
  const back = countTo(t, 16.5, 20, 0, 14)
  const flood = t > 21.5 ? countTo(t, 21.5, 26, 14, 412) : back
  return (
    <Scene t={t} s={10} e={28}>
      <In t={t} a={10.2} o={27} style={{ left: 100, top: 70 }}><Label>01 · The setup</Label></In>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        {pos.map(([x, y], i) => <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.line} strokeWidth="1.5" opacity={easeOut(seg(t, 10.8 + i * 0.07, 11.6 + i * 0.07)) * 0.9} />)}
      </svg>
      {/* centre */}
      <div style={{ position: 'absolute', left: cx - 130, top: cy - 90, width: 260, height: 180, borderRadius: 24, background: C.panel, border: `2px solid ${C.lime}`, display: 'grid', placeItems: 'center', transform: `scale(${1 + 0.03 * Math.sin(t * 4) * (t > 16 ? 1 : 0)})`, boxShadow: `0 0 ${40 + 30 * easeOut(seg(t, 21.5, 26))}px rgba(200,245,90,${0.18 + 0.22 * easeOut(seg(t, 21.5, 26))})`, opacity: easeOut(seg(t, 10.3, 11)) }}>
        <div style={{ textAlign: 'center' }}><Star size={46} /><div style={{ fontSize: 34, fontWeight: 400, marginTop: 8 }}>NorthStar</div><div style={{ fontFamily: mono, fontSize: 16, color: C.mute, letterSpacing: '0.1em' }}>PROCUREMENT</div></div>
      </div>
      {pos.map(([x, y], i) => {
        const pin = easeOutBack(seg(t, 10.8 + i * 0.07, 11.5 + i * 0.07))
        const out = seg(t, 12 + i * 0.09, 13.6 + i * 0.09)
        const rep = seg(t, 16.3 + i * 0.16, 18.1 + i * 0.16)
        return (
          <div key={i}>
            <div style={{ position: 'absolute', left: x - 105, top: y - 24, width: 210, height: 48, borderRadius: 24, background: C.panel, border: `1px solid ${rep > 0 && rep < 1 ? C.amber : C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, color: C.ink, transform: `scale(${pin})`, opacity: pin, whiteSpace: 'nowrap' }}>{VENDORS[i]}</div>
            {out > 0 && out < 1 && <div style={{ position: 'absolute', left: lerp(cx, x, easeInOut(out)) - 16, top: lerp(cy, y, easeInOut(out)) - 11, width: 32, height: 22, borderRadius: 4, background: C.lime, boxShadow: '0 0 18px rgba(200,245,90,0.6)' }}><div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0,100% 0,50% 60%)', background: 'rgba(0,0,0,0.25)' }} /></div>}
            {rep > 0 && rep < 1 && <div style={{ position: 'absolute', left: lerp(x, cx, easeInOut(rep)) - 15, top: lerp(y, cy, easeInOut(rep)) - 19, width: 30, height: 38, borderRadius: 4, background: '#F5F6F7', boxShadow: '0 0 18px rgba(255,200,87,0.55)' }}><div style={{ margin: '8px 5px', height: 3, background: C.red }} /><div style={{ margin: '5px 5px', height: 3, background: '#9AA0AA' }} /><div style={{ margin: '5px 5px', height: 3, background: '#9AA0AA' }} /></div>}
          </div>
        )
      })}
      {/* counters */}
      <In t={t} a={12} o={16.2} style={{ left: 0, width: 1920, top: 900, textAlign: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 200 }}>One RFQ goes out to <span style={{ color: C.lime }}>{Math.round(rfq)}</span> suppliers.</div>
      </In>
      <In t={t} a={16.4} o={21.3} style={{ left: 0, width: 1920, top: 900, textAlign: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 200 }}>{Math.round(back)} replies come back. <span style={{ color: C.amber }}>Every one is a PDF.</span></div>
      </In>
      <In t={t} a={21.6} o={27.4} style={{ left: 0, width: 1920, top: 870, textAlign: 'center' }}>
        <div style={{ fontFamily: mono, fontSize: 28, color: C.mute, letterSpacing: '0.1em' }}>ORDER CONFIRMATIONS THIS WEEK</div>
        <div style={{ fontSize: 130, fontWeight: 200, lineHeight: 1, color: C.amber, letterSpacing: '-0.04em' }}>{fmt(flood)}</div>
      </In>
      <In t={t} a={25.6} o={27.4} style={{ left: 0, width: 1920, top: 140, textAlign: 'center' }}>
        <div style={{ fontSize: 44, fontWeight: 300, color: C.ink }}>In the supplier’s own layout. Often in another language.</div>
      </In>
    </Scene>
  )
}

/* ───────────── 2 · PROBLEM  (28–55) ───────────── */
function Doc({ t }: { t: number }) {
  const scan = seg(t, 31, 34.2)
  const flare = (a: number) => easeOut(seg(t, a, a + 0.5))
  const row = (y: number, text: string, f: number, danger = false) => (
    <div style={{ position: 'absolute', left: 40, right: 40, top: y, height: 54, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 24, color: '#1A1C21', background: `rgba(255,107,91,${0.22 * f})`, outline: f > 0.05 ? `2px solid rgba(255,107,91,${f})` : 'none', fontFamily: danger ? mono : undefined, fontWeight: 500 }}>{text}</div>
  )
  return (
    <div style={{ position: 'absolute', left: 120, top: 70, width: 780, height: 940, borderRadius: 14, background: '#F5F6F7', color: '#1A1C21', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
      <div style={{ padding: '36px 40px 0', fontSize: 20, color: '#5B616C', fontFamily: mono, letterSpacing: '0.08em' }}>HELIOS COMPONENTS AG · KUNDENSERVICE</div>
      <div style={{ padding: '10px 40px', fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}>Auftragsbestätigung</div>
      <div style={{ padding: '0 40px', fontSize: 22, color: '#5B616C' }}>Nr. 1505899 · Ihre Bestellung 4994546957</div>
      {[240, 284].map((y, i) => <div key={y} style={{ position: 'absolute', left: 40, top: y, width: 700 - i * 120, height: 10, borderRadius: 5, background: '#D5D9DF' }} />)}
      {row(340, 'Gesamtbetrag:  € 164.865,00', flare(34.6), true)}
      {row(430, 'Zahlungsbedingungen:  45 Tage netto', flare(36.6), true)}
      {row(520, 'Pos. 1002 · Menge:  2.000 Stk', flare(38.6), true)}
      {[640, 690, 740, 790, 840].map((y, i) => <div key={y} style={{ position: 'absolute', left: 40, top: y, width: 620 - (i % 3) * 80, height: 10, borderRadius: 5, background: '#E2E5EA' }} />)}
      {scan > 0 && scan < 1 && <div style={{ position: 'absolute', left: 0, right: 0, top: 120 + scan * 780, height: 4, background: C.cobalt, boxShadow: `0 0 30px ${C.cobalt}` }} />}
    </div>
  )
}

export function Problem({ t }: { t: number }) {
  const docOut = 1 - easeOut(seg(t, 48.4, 49.2))
  const rowIn = (a: number) => easeOut(seg(t, a, a + 0.6))
  const sev = easeInOut(seg(t, 43, 48.5))
  const N = 412
  const grid = seg(t, 49.4, 52)
  return (
    <Scene t={t} s={28} e={55}>
      <In t={t} a={28.2} o={54} style={{ left: 100, top: 20 }}><Label color={C.red}>02 · The problem</Label></In>
      <div style={{ opacity: docOut * (1 - easeOut(seg(t, 42.4, 43.2))), transform: `translateX(${(1 - easeOut(seg(t, 28.3, 29.4))) * -300}px)` }}><Doc t={t} /></div>
      {/* comparison cards */}
      {t < 49 && (
        <div style={{ position: 'absolute', left: lerp(1000, 560, easeInOut(seg(t, 42.2, 43.4))), top: 100, width: 800, opacity: docOut }}>
          <In t={t} a={34.2} y={10} style={{ position: 'relative' }}><div style={{ fontFamily: mono, fontSize: 20, color: C.mute, letterSpacing: '0.12em', marginBottom: 14 }}>PO 4994546957 → WHAT THEY CONFIRMED</div></In>
          {[
            { a: 34.8, f: 'Total value', from: '€142,800', to: '€164,865', d: '+ €22,065 · 15.4%', tag: 'HIGH' },
            { a: 36.8, f: 'Payment terms', from: 'Net 30', to: '“45 Tage netto”', d: '+ 15 days · German', tag: 'HIGH' },
            { a: 38.8, f: 'Quantity · line 1002', from: '2,500', to: '2,000', d: '− 500 units', tag: 'MEDIUM' },
          ].map(r => (
            <div key={r.f} style={{ marginBottom: 14, borderRadius: 16, background: C.panel, border: `1px solid ${r.tag === 'HIGH' ? C.red : C.amber}`, padding: '20px 26px 22px', opacity: rowIn(r.a), transform: `translateX(${(1 - rowIn(r.a)) * 60}px)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 18, letterSpacing: '0.1em', color: C.mute }}><span>{r.f.toUpperCase()}</span><span style={{ color: r.tag === 'HIGH' ? C.red : C.amber }}>{r.tag}</span></div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 14 }}>
                <span style={{ fontSize: 34, color: C.mute, textDecoration: 'line-through', fontWeight: 300 }}>{r.from}</span>
                <span style={{ fontSize: 54, fontWeight: 300 }}>{r.to}</span>
              </div>
              <div style={{ fontSize: 24, color: r.tag === 'HIGH' ? C.red : C.amber, marginTop: 6 }}>{r.d}</div>
            </div>
          ))}
          <In t={t} a={41} o={48} y={10} style={{ position: 'relative' }}><div style={{ fontSize: 33, fontWeight: 300, marginTop: 14, whiteSpace: 'nowrap', textAlign: 'center' }}>Three differences. One page. <span style={{ color: C.red }}>Buried in German.</span></div></In>
        </div>
      )}
      {/* severity chain */}
      <In t={t} a={43} o={48.6} style={{ left: 0, width: 1920, top: 880 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22 }}>
          {['€22,065 overpaid', 'Cash tied up 15 days longer', '500 units short', 'A batch waits. The line stops.'].map((s, i) => {
            const p = easeOutBack(seg(t, 43.2 + i * 1.1, 43.9 + i * 1.1))
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={{ padding: '22px 30px', borderRadius: 14, border: `1.5px solid ${C.red}`, background: `rgba(255,107,91,${0.1 + i * 0.1})`, fontSize: 30, transform: `scale(${p}) rotate(${(1 - p) * -4}deg)`, opacity: p }}>{s}</div>
                {i < 3 && <span style={{ color: C.red, fontSize: 36, opacity: p }}>→</span>}
              </div>
            )
          })}
        </div>
        <div style={{ margin: '26px auto 0', width: 1200, height: 10, borderRadius: 5, background: C.line, overflow: 'hidden' }}><div style={{ width: `${sev * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.amber}, ${C.red})` }} /></div>
        <div style={{ fontFamily: mono, fontSize: 20, color: C.red, textAlign: 'center', marginTop: 12, letterSpacing: '0.16em' }}>SEVERITY · RISING</div>
      </In>
      {/* scale */}
      {t > 49 && (
        <div>
          <div style={{ position: 'absolute', left: 100, top: 80, width: 1720, display: 'grid', gridTemplateColumns: 'repeat(35, 1fr)', gap: 8 }}>
            {Array.from({ length: N }, (_, i) => {
              const p = clamp(grid * 1.7 - rnd(i + 3) * 0.7)
              const bad = rnd(i * 1.7 + 9) < 0.34
              const hot = bad && t > 52.5
              return <div key={i} style={{ aspectRatio: '4/5', borderRadius: 3, background: hot ? C.red : '#E4E7EC', opacity: p * (hot ? 0.9 : 0.55), transform: `scale(${easeOut(p)})` }} />
            })}
          </div>
          <In t={t} a={51.4} o={54.4} y={10} style={{ left: 0, width: 1920, top: 840, textAlign: 'center', background: 'transparent' }}>
            <div style={{ display: 'inline-block', padding: '26px 46px', borderRadius: 18, background: 'rgba(15,16,19,0.88)', border: `1px solid ${C.line}` }}>
              <div style={{ fontSize: 58, fontWeight: 200 }}><span style={{ color: C.amber }}>{fmt(countTo(t, 51.4, 53, 0, 412))}</span> confirmations a week · <span style={{ color: C.red }}>3 people</span> to read them</div>
              <div style={{ fontSize: 30, color: C.mute, marginTop: 8 }}>≈ 172 hours of reading. Some will slip through.</div>
            </div>
          </In>
        </div>
      )}
      <In t={t} a={30} o={34} style={{ left: 120, top: 1010 }}><div style={{ fontFamily: mono, fontSize: 16, color: C.dim }}>ILLUSTRATIVE SCENARIO FIGURES</div></In>
    </Scene>
  )
}

/* ───────────── 3 · PROCESS & CRAFT  (55–75) ───────────── */
const PERSONAS = [
  { id: 'david', name: 'David Paul', role: 'Procurement Operations', line: 'Confirms what the agent extracted.' },
  { id: 'adrian', name: 'Adrian Smith', role: 'Buyer', line: 'Weighs cost and logistics impact.' },
  { id: 'rajan', name: 'Rajan Nair', role: 'Goods Recipient', line: 'Judges quantity and delivery dates.' },
]
const PRINCIPLES = [
  ['01', 'Extract first, then let a person confirm.'],
  ['02', 'Show every difference, and why.'],
  ['03', 'Route each decision to the role that can judge it.'],
  ['04', 'Always say what happens next.'],
  ['05', 'Log everything.'],
]
export function Process({ t }: { t: number }) {
  const pi = clamp(Math.floor((t - 61.2) / 1.55), 0, 4)
  const wire = seg(t, 69.6, 72.4)
  const hi = easeInOut(seg(t, 72.2, 73.6))
  return (
    <Scene t={t} s={55} e={75}>
      <In t={t} a={55.2} o={74} style={{ left: 100, top: 70 }}><Label>03 · Process &amp; craft</Label></In>
      {/* personas */}
      {t < 61.4 && <>
        <Words t={t} a={55.6} text="Three people. Three kinds of judgement." size={72} style={{ left: 100, top: 150, width: 1500 }} />
        {PERSONAS.map((p, i) => {
          const a = 57 + i * 1.1
          const q = easeOut(seg(t, a, a + 0.8))
          return (
            <div key={p.id} style={{ position: 'absolute', left: 140 + i * 590, top: 380, width: 520, height: 520, borderRadius: 22, background: C.panel, border: `1px solid ${C.line}`, overflow: 'hidden', opacity: q * (1 - seg(t, 60.7, 61.4)), transform: `translateY(${(1 - q) * 60}px)` }}>
              <img src={`${dir}persona-${p.id}.jpg`} alt="" style={{ width: '100%', height: 300, objectFit: 'cover', filter: 'grayscale(1) contrast(1.05)', opacity: 0.9 }} />
              <div style={{ padding: '22px 28px' }}>
                <div style={{ fontFamily: mono, fontSize: 18, color: C.lime, letterSpacing: '0.12em' }}>{p.role.toUpperCase()}</div>
                <div style={{ fontSize: 36, fontWeight: 300, marginTop: 6 }}>{p.name}</div>
                <div style={{ fontSize: 24, color: C.mute, marginTop: 6 }}>{p.line}</div>
              </div>
            </div>
          )
        })}
      </>}
      {/* principles */}
      {t >= 61.2 && t < 69.8 && (
        <div style={{ opacity: easeOut(seg(t, 61.2, 61.9)) * (1 - seg(t, 69.2, 69.8)) }}>
          <div style={{ position: 'absolute', left: 100, top: 160, fontFamily: mono, fontSize: 22, color: C.mute, letterSpacing: '0.14em' }}>FIVE DESIGN PRINCIPLES</div>
          <div style={{ position: 'absolute', left: 100, top: 300 }}>
            <div key={pi} style={{ fontSize: 230, fontWeight: 100, color: C.lime, lineHeight: 1, letterSpacing: '-0.06em', opacity: easeOut(seg(t, 61.2 + pi * 1.55, 61.7 + pi * 1.55)) }}>{PRINCIPLES[pi][0]}</div>
          </div>
          <div key={'t' + pi} style={{ position: 'absolute', left: 560, top: 330, width: 1260, fontSize: 92, fontWeight: 200, letterSpacing: '-0.035em', lineHeight: 1.06, opacity: easeOut(seg(t, 61.3 + pi * 1.55, 61.9 + pi * 1.55)), transform: `translateY(${(1 - easeOut(seg(t, 61.3 + pi * 1.55, 61.9 + pi * 1.55))) * 30}px)` }}>{PRINCIPLES[pi][1]}</div>
          <div style={{ position: 'absolute', left: 560, top: 800, display: 'flex', gap: 14 }}>{PRINCIPLES.map((_, i) => <div key={i} style={{ width: i === pi ? 90 : 36, height: 8, borderRadius: 4, background: i <= pi ? C.lime : C.line, transition: 'none' }} />)}</div>
        </div>
      )}
      {/* sketch → screen */}
      {t >= 69.6 && (
        <div style={{ position: 'absolute', left: 310, top: 190, width: 1300, height: 812, transform: `scale(${lerp(0.94, 1, easeOut(seg(t, 69.6, 72)))})`, opacity: easeOut(seg(t, 69.6, 70.2)) }}>
          <img src={`${dir}buyer-review.svg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 14, opacity: hi, boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }} />
          <svg viewBox="0 0 1400 875" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 1 - hi }} aria-hidden="true">
            <g fill="none" stroke={C.lime} strokeWidth="3" strokeLinecap="round">
              {[
                'M20 20 H1380 V855 H20 Z', 'M20 90 H1380', 'M60 150 H700', 'M60 190 H420',
                'M60 280 H1340 V400 H60 Z', 'M60 470 H1340', 'M60 520 H1340', 'M60 570 H1340', 'M60 620 H1340',
                'M60 700 H1340 V820 H60 Z', 'M110 330 H600', 'M110 350 H420',
              ].map((d, i) => <path key={i} d={d} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp(wire * 2.4 - i * 0.14)} />)}
            </g>
          </svg>
        </div>
      )}
      <In t={t} a={70} o={74} style={{ left: 100, top: 112 }}><div style={{ fontSize: 40, fontWeight: 300 }}>Craft: from a sketch to a screen people can trust.</div></In>
    </Scene>
  )
}

/* ───────────── 4 · ARCHITECTURE  (75–95) ───────────── */
const NODES = [
  { id: 'mail', label: 'Supplier email', sub: 'PDF arrives', x: 100, y: 400, kind: 'sys' },
  { id: 'agent', label: 'AI Agent', sub: 'Extracts & compares', x: 390, y: 400, kind: 'ai' },
  { id: 'ops', label: 'Procurement Ops', sub: 'Validates extraction', x: 680, y: 400, kind: 'human' },
  { id: 'view', label: 'Discrepancy view', sub: 'Generated & routed', x: 970, y: 400, kind: 'ai' },
  { id: 'buyer', label: 'Buyer', sub: 'Cost & logistics', x: 1260, y: 270, kind: 'human' },
  { id: 'gr', label: 'Goods Recipient', sub: 'Quantity & dates', x: 1260, y: 530, kind: 'human' },
  { id: 'mailout', label: 'Email supplier', sub: 'Drafted by the agent', x: 1560, y: 400, kind: 'ai' },
]
const EDGES: [string, string][] = [['mail', 'agent'], ['agent', 'ops'], ['ops', 'view'], ['view', 'buyer'], ['view', 'gr'], ['buyer', 'mailout'], ['gr', 'mailout']]
export function Architecture({ t }: { t: number }) {
  const N = (id: string) => NODES.find(n => n.id === id)!
  const W = 250, H = 120
  const col = (k: string) => (k === 'ai' ? C.lime : k === 'human' ? C.cobalt : C.mute)
  const pk = ((t - 85) % 4.2) / 4.2 // data packet loop after 85s
  const path = ['mail', 'agent', 'ops', 'view', 'buyer', 'mailout']
  const seglen = 1 / (path.length - 1)
  const pi = Math.min(path.length - 2, Math.floor(pk / seglen))
  const pp = (pk - pi * seglen) / seglen
  const pa = N(path[pi]), pb = N(path[pi + 1])
  return (
    <Scene t={t} s={75} e={95}>
      <In t={t} a={75.2} o={94} style={{ left: 100, top: 70 }}><Label>04 · Solution architecture</Label></In>
      <Words t={t} a={75.6} text="The agent reads. People decide." size={78} style={{ left: 100, top: 130, width: 1700 }} accent={['reads']} />
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        {EDGES.map(([a, b], i) => {
          const A = N(a), Bn = N(b)
          const x1 = A.x + W, y1 = A.y + H / 2, x2 = Bn.x, y2 = Bn.y + H / 2
          const p = easeOut(seg(t, 77 + i * 1.1, 78.2 + i * 1.1))
          const mx = (x1 + x2) / 2
          return <path key={i} d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} fill="none" stroke={C.mute} strokeWidth="2.5" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} opacity={0.8} />
        })}
        {/* audit thread */}
        <path d="M100 740 H1820" stroke={C.line} strokeWidth="3" fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - easeOut(seg(t, 84, 87))} />
      </svg>
      {NODES.map((n, i) => {
        const p = easeOutBack(seg(t, 76.6 + i * 1.0, 77.4 + i * 1.0))
        return (
          <div key={n.id} style={{ position: 'absolute', left: n.x, top: n.y, width: W, height: H, borderRadius: 18, background: C.panel, border: `2px solid ${col(n.kind)}`, padding: '20px 22px', transform: `scale(${p})`, opacity: clamp(p), boxShadow: n.kind === 'ai' ? `0 0 40px rgba(200,245,90,0.12)` : undefined }}>
            <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: '0.12em', color: col(n.kind) }}>{n.kind === 'ai' ? 'AGENT' : n.kind === 'human' ? 'PERSON' : 'SYSTEM'}</div>
            <div style={{ fontSize: 26, fontWeight: 400, marginTop: 6, whiteSpace: 'nowrap' }}>{n.label}</div>
            <div style={{ fontSize: 20, color: C.mute }}>{n.sub}</div>
          </div>
        )
      })}
      {t > 85 && <div style={{ position: 'absolute', left: lerp(pa.x + W, pb.x, easeInOut(pp)) - 14, top: lerp(pa.y + H / 2, pb.y + H / 2, easeInOut(pp)) - 14, width: 28, height: 28, borderRadius: '50%', background: C.lime, boxShadow: '0 0 36px rgba(200,245,90,0.9)' }} />}
      <In t={t} a={84.4} o={94.2} style={{ left: 100, top: 760 }}>
        <div style={{ fontFamily: mono, fontSize: 20, color: C.mute, letterSpacing: '0.12em' }}>ACTIVITY LOG · AI AGENT · OPERATIONS · BUYER · GOODS RECIPIENT · SYSTEM</div>
        <div style={{ fontSize: 30, color: C.ink, marginTop: 10, fontWeight: 300 }}>Every correction, recommendation, decision and email, in one audit trail.</div>
      </In>
      <In t={t} a={90.2} o={94.4} style={{ left: 0, width: 1920, top: 900, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 22 }}>
          {['Agent reads and compares', 'People decide', 'Every step logged'].map((s, i) => <div key={s} style={{ padding: '18px 34px', borderRadius: 40, border: `1.5px solid ${C.lime}`, fontSize: 34, color: C.lime, background: 'rgba(200,245,90,0.08)', transform: `scale(${easeOutBack(seg(t, 90.4 + i * 0.5, 91.1 + i * 0.5))})` }}>{s}</div>)}
        </div>
      </In>
    </Scene>
  )
}

/* ───────────── 5 · THE PEAK  (95–108) ───────────── */
function Cam({ src, t, a, b, from, to, children }: { src: string; t: number; a: number; b: number; from: [number, number, number]; to: [number, number, number]; children?: React.ReactNode }) {
  const p = easeInOut(seg(t, a, b))
  const cx = lerp(from[0], to[0], p), cy = lerp(from[1], to[1], p), s = lerp(from[2], to[2], p)
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 900, transformOrigin: '0 0', transform: `translate(${960 - cx * s}px, ${540 - cy * s}px) scale(${s})` }}>
        <img src={`${dir}${src}.svg`} alt="" style={{ width: 1440, height: 900, display: 'block', borderRadius: 8, boxShadow: '0 30px 90px rgba(0,0,0,0.7)' }} />
        {children}
      </div>
    </div>
  )
}
const Chip = ({ children, color = C.lime, style }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) => (
  <div style={{ display: 'inline-block', padding: '14px 26px', borderRadius: 40, background: 'rgba(15,16,19,0.92)', border: `2px solid ${color}`, color, fontSize: 32, fontWeight: 400, whiteSpace: 'nowrap', boxShadow: `0 10px 40px rgba(0,0,0,0.5)`, ...style }}>{children}</div>
)
export function Peak({ t }: { t: number }) {
  const hl = (a: number, y: number, color: string) => <div style={{ position: 'absolute', left: 46, top: y, width: 1350, height: 32, borderRadius: 6, background: color, opacity: 0.22 * easeOut(seg(t, a, a + 0.4)), outline: `2px solid ${color}`, outlineOffset: -2 }} />
  const typed = (full: string, a: number, cps: number) => full.slice(0, Math.max(0, Math.floor((t - a) * cps)))
  const body = 'Dear Michael, we have reviewed the confirmation for PO 4994546957 and ask you to revert the unit price for line item 1001 and keep the agreed payment terms (Net 30).'
  return (
    <Scene t={t} s={95} e={108}>
      <div style={{ position: 'absolute', inset: 0, background: C.bg }} />
      {t < 99.5 && (
        <div style={{ opacity: 1 - seg(t, 99, 99.6) }}>
          <Cam src="ops-read" t={t} a={95} b={99} from={[720, 450, 0.95]} to={[760, 380, 1.45]}>
            <div style={{ position: 'absolute', left: 1000, top: 215, width: 420, height: 560, border: `3px solid ${C.cobalt}`, borderRadius: 8, boxShadow: `0 0 40px ${C.cobalt}`, opacity: easeOut(seg(t, 95.6, 96.2)) }} />
            <div style={{ position: 'absolute', left: 440, top: 92, width: 180, height: 30, border: `3px solid ${C.green}`, borderRadius: 16, opacity: easeOut(seg(t, 97.3, 97.8)) }} />
          </Cam>
          <In t={t} a={95.4} o={96.9} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip color={C.cobalt}>The agent reads the German PDF</Chip></In>
          <In t={t} a={97.0} o={98.2} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip color={C.green}>Extracted · confidence shown</Chip></In>
          <In t={t} a={98.3} o={99.4} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip>David confirms. Nothing moves on without him.</Chip></In>
        </div>
      )}
      {t >= 99.2 && t < 103.8 && (
        <div style={{ opacity: easeOut(seg(t, 99.2, 99.9)) * (1 - seg(t, 103.3, 103.9)) }}>
          <Cam src="buyer-review" t={t} a={99.2} b={103.4} from={[720, 330, 1.0]} to={[720, 500, 1.35]}>
            {hl(100.4, 508, C.red)}{hl(101.1, 540, C.red)}{hl(101.8, 572, C.amber)}
          </Cam>
          <In t={t} a={99.8} o={101.3} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip>Adrian sees every difference</Chip></In>
          <In t={t} a={101.4} o={103.3} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip color={C.amber}>…and the reason: “Translated from German ‘45 Tage netto’”</Chip></In>
        </div>
      )}
      {t >= 103.4 && t < 106.2 && (
        <div style={{ opacity: easeOut(seg(t, 103.4, 104)) * (1 - seg(t, 105.7, 106.3)) }}>
          <Cam src="gr-review" t={t} a={103.4} b={106} from={[720, 480, 1.15]} to={[720, 485, 1.3]}>
            {hl(104.4, 704, C.amber)}{hl(104.9, 744, C.red)}
          </Cam>
          <In t={t} a={103.8} o={105.8} style={{ left: 0, width: 1920, top: 930, textAlign: 'center' }}><Chip>Rajan judges only what he can: quantity and delivery</Chip></In>
        </div>
      )}
      {t >= 106 && (
        <div style={{ opacity: easeOut(seg(t, 106, 106.6)) }}>
          <div style={{ position: 'absolute', left: 460, top: 140, width: 1000, height: 640, borderRadius: 20, background: C.panel, border: `1px solid ${C.line}`, boxShadow: '0 40px 100px rgba(0,0,0,0.6)', padding: '36px 44px' }}>
            <div style={{ fontFamily: mono, fontSize: 20, color: C.lime, letterSpacing: '0.12em' }}>DRAFTED BY THE AGENT</div>
            <div style={{ fontSize: 30, marginTop: 14, color: C.ink }}>Re: Order Confirmation for PO 4994546957</div>
            <div style={{ height: 1, background: C.line, margin: '22px 0' }} />
            <div style={{ fontSize: 30, lineHeight: 1.5, color: C.mute, fontWeight: 300, minHeight: 280 }}>{typed(body, 106.3, 70)}<span style={{ color: C.lime, opacity: Math.sin(t * 10) > 0 ? 1 : 0 }}>▍</span></div>
            <div style={{ marginTop: 18, display: 'inline-block', padding: '10px 18px', borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 22 }}>📎 Discrepancies.pdf</div>
          </div>
          <In t={t} a={107.2} style={{ left: 0, width: 1920, top: 840, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '20px 40px', borderRadius: 50, background: 'rgba(91,227,160,0.12)', border: `2px solid ${C.green}`, fontSize: 44, color: C.green }}>✓ Sent to supplier · all set for now</div>
          </In>
        </div>
      )}
      
    </Scene>
  )
}

/* ───────────── 6 · DENOUEMENT  (108–120) ───────────── */
export function Denouement({ t }: { t: number }) {
  const N = 412
  const calm = seg(t, 108.4, 112)
  return (
    <Scene t={t} s={108} e={120.4}>
      <div style={{ position: 'absolute', left: 100, top: 80, width: 1720, display: 'grid', gridTemplateColumns: 'repeat(35, 1fr)', gap: 8, opacity: 0.8 * (1 - 0.6 * seg(t, 112.5, 114)) }}>
        {Array.from({ length: N }, (_, i) => {
          const bad = rnd(i * 1.7 + 9) < 0.34
          const resolved = clamp(calm * 1.8 - rnd(i + 5) * 0.8)
          const waiting = bad && rnd(i * 3.1) < 0.18
          const colr = waiting ? C.amber : resolved > 0.5 ? (bad ? C.green : '#4E5A52') : bad ? C.red : '#E4E7EC'
          return <div key={i} style={{ aspectRatio: '4/5', borderRadius: 3, background: colr, opacity: waiting ? 0.9 : 0.55 }} />
        })}
      </div>
      <In t={t} a={109} o={115.2} style={{ left: 0, width: 1920, top: 800, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '28px 54px', borderRadius: 20, background: 'rgba(15,16,19,0.92)', border: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 62, fontWeight: 200, letterSpacing: '-0.03em' }}>The same wall of confirmations. <span style={{ color: C.lime }}>Calm.</span></div>
          <div style={{ fontSize: 30, color: C.mute, marginTop: 10 }}>People only see what needs a person.</div>
        </div>
      </In>
      {[
        ['Reading', 'becomes deciding'],
        ['Hidden differences', 'arrive with their reasons'],
        ['Scattered emails', 'become one audit trail'],
      ].map(([a, b], i) => (
        <In key={a} t={t} a={113 + i * 0.7} o={116.4} y={30} style={{ left: 140 + i * 590, top: 330, width: 540 }}>
          <div style={{ padding: '36px 34px', borderRadius: 20, background: 'rgba(15,16,19,0.94)', border: `1px solid ${C.lime}` }}>
            <div style={{ fontSize: 48, fontWeight: 200, color: C.lime, letterSpacing: '-0.03em' }}>{a}</div>
            <div style={{ fontSize: 34, color: C.ink, marginTop: 8, fontWeight: 300 }}>{b}</div>
          </div>
        </In>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: C.bg, opacity: easeOut(seg(t, 116.4, 117.2)) }} />
      <In t={t} a={117} d={1} style={{ left: 0, width: 1920, top: 380, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Star size={70} /></div>
        <div style={{ fontSize: 84, fontWeight: 200, letterSpacing: '-0.035em', marginTop: 20 }}>Agentic Order Confirmation</div>
        <div style={{ fontFamily: mono, fontSize: 24, color: C.mute, letterSpacing: '0.14em', marginTop: 20 }}>DESIGN LEAD · AMIT KUMAR TIWARI</div>
        <div style={{ fontSize: 26, color: C.dim, marginTop: 34 }}>NorthStar is a fictional company. Scenario figures are illustrative.</div>
      </In>
    </Scene>
  )
}
