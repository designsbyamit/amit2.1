import type { ReactNode } from 'react'
import { C, In, Words, Label, Scene, mono, countTo } from './ui'
import { Star } from './scenesAgentic'
import { seg, easeOut, easeInOut, easeOutBack, clamp } from './engine'
import { L, FONT72, Shell, Field, Scaled, Pointer, pathAt, press, typed, Ico, P, shellX } from './searchUi'

const Chip = ({ children, color = C.lime }: { children: ReactNode; color?: string }) => (
  <div style={{ display: 'inline-block', padding: '14px 28px', borderRadius: 40, background: 'rgba(15,16,19,0.94)', border: `2px solid ${color}`, color, fontSize: 31, whiteSpace: 'nowrap', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>{children}</div>
)
const lane = (t: number, a: number, o: number, text: string, color?: string) => (
  <In t={t} a={a} o={o} style={{ left: 0, width: 1920, top: 992, textAlign: 'center' }}><Chip color={color}>{text}</Chip></In>
)
const bold = (text: string, q: string) => (q && text.toLowerCase().startsWith(q.toLowerCase()) ? <><b>{text.slice(0, q.length)}</b>{text.slice(q.length)}</> : <>{text}</>)

const TRIPS: [string, string][] = [
  ['Business trip · SFO → BLR · Emirates EK237 · Jun 10–17', 'Travel'],
  ['Business trip · SFO → SIN · Singapore Airlines · Jul 3–10', 'Travel'],
  ['Conference · SFO → NRT · ANA NH106 · Aug 15–22', 'Travel'],
]
const FLIGHTS = [
  { h: 'Emirates · Economy · $1,240 · 21h 30m · 1 stop DXB', s: 'Departs 08:00 · arrives 23:30 +1 · preferred carrier for this route', ok: true },
  { h: 'Emirates · Economy · $980 · 23h 15m · 1 stop DXB', s: 'Cheapest · 1h 45m longer', ok: true },
  { h: 'United Airlines · Economy · $1,100 · 22h 50m · 1 stop FRA', s: 'Visa required · processing 5–7 days', ok: true },
  { h: 'Lufthansa · Business · $1,850 · 20h 15m · 1 stop MUC', s: 'Needs manager approval', ok: false },
  { h: 'Singapore Airlines · Economy · $1,120 · 24h 05m · 1 stop SIN', s: 'Policy compliant', ok: true },
]
const AI_TEXT = 'AI insight: Emirates EK237 is the preferred SFO → BLR route at $1,240. 1 stop in Dubai. Policy compliant. Preferred hotel: The Leela Palace, Bangalore.'

/* ───────────── 6 · THE PROTOTYPE  (117–152) ───────────── */
export function SPrototype({ t }: { t: number }) {
  const W = 1440, H = 780
  const view = t < 123.4 ? 1 : t < 130.5 ? 2 : t < 133.5 ? 3 : 4
  const v2 = easeOut(seg(t, 123.2, 123.8)), v3 = seg(t, 130.4, 130.8), v4 = easeOut(seg(t, 133.3, 133.9))
  const xs = shellX(W)

  // home → type-ahead
  const q = typed('flight to', t, 119.6, 5)
  const popOpen = view === 1 ? easeOut(seg(t, 119.0, 119.3)) * (1 - seg(t, 123.1, 123.4)) : 0
  const homeField = t < 118.8 ? 'default' : 'active'
  // pointer path in window design coords
  const [px, py] = pathAt(t, [
    [117.4, 700, 460], [118.6, 1020, 30], [122.0, 1020, 30], [122.9, 880, 118],
    [127.9, 960, 300], [129.2, 1308, 224], [131.0, 1308, 224], [133.9, 900, 330],
    [137.6, 900, 330], [142.2, 1156, 542],
  ])
  const clicks = [118.8, 123.2, 130.0, 143.4]
  const pr = Math.max(...clicks.map(c => press(t, c)))
  const pShow = t < 117.6 ? easeOut(seg(t, 117.2, 117.6)) : t > 133.2 && t < 137.4 ? 0 : t > 144.6 ? 1 - seg(t, 144.6, 145.2) : 1

  // results
  const aiTyped = typed(AI_TEXT, t, 124.0, 48)
  const prefer = easeOut(seg(t, 127.4, 127.9))
  // loader
  const prog = clamp((t - 130.7) / 2.6)
  // booking
  const fields: [string, string][] = [['Traveller', 'Maria Schmidt'], ['Company code', '1000'], ['Cost centre', 'IT-0450'], ['Trip purpose', 'Business meeting'], ['Approval required', 'No · within policy']]
  const booked = easeOutBack(seg(t, 145.6, 146.4))
  const btnState = t < 143.5 ? 0 : t < 145.4 ? 1 : 2
  const elapsed = Math.round(countTo(t, 118.0, 146.0, 0, 47))
  const mm = '0:' + String(elapsed).padStart(2, '0')

  const shellField = view === 1 ? <Field t={t} state={homeField} text={homeField === 'active' ? q : ''} /> : view === 2 || view === 3 ? <Field t={t} state="typed" text="Palo Alto to Bangalore" /> : <Field t={t} state="default" ph="Search across all applications..." />

  return (
    <Scene t={t} s={117} e={152}>
      <In t={t} a={117.2} o={151} style={{ left: 96, top: 10 }}><Label>06 · The prototype · a trip, booked through search</Label></In>
      <In t={t} a={118} o={151} y={0} style={{ right: 100, top: 6 }}><div style={{ fontFamily: mono, fontSize: 24, color: t > 146 ? C.green : C.lime, letterSpacing: '0.1em' }}>ELAPSED {mm}</div></In>
      <Scaled left={96} top={46} k={1.2} style={{ width: W, height: H, opacity: easeOut(seg(t, 117.1, 117.8)), transform: `scale(1.2) translateY(${(1 - easeOut(seg(t, 117.1, 117.8))) * 24}px)`, fontFamily: FONT72 }}>
        <div style={{ position: 'relative', width: W, height: H, background: L.bg, borderRadius: 10, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)', color: L.ink }}>
          {/* VIEW 1 — home */}
          {view === 1 && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 64, top: 96, fontSize: 36, fontWeight: 700 }}>Good morning, Maria</div>
              <div style={{ position: 'absolute', left: 64, top: 146, fontSize: 18, color: L.sub }}>Monday · 3 approvals waiting · 1 trip to plan</div>
              {[['To approve', '3'], ['My trips', '1'], ['Expenses', '2 open'], ['Goals', '4 on track']].map(([a, b], i) => (
                <div key={a} style={{ position: 'absolute', left: 64 + i * 338, top: 200, width: 318, height: 150, borderRadius: 14, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '24px 26px' }}>
                  <div style={{ fontSize: 16, color: L.sub }}>{a}</div><div style={{ fontSize: 42, fontWeight: 300, marginTop: 14 }}>{b}</div>
                </div>
              ))}
              <div style={{ position: 'absolute', left: 64, top: 390, width: 1312, height: 320, borderRadius: 14, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '24px 26px' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Today</div>
                {['Review Q3 supplier scorecard', 'Approve 3 purchase requisitions', 'Team 1:1 · 15:30'].map(x => <div key={x} style={{ fontSize: 17, color: L.sub, padding: '16px 0', borderBottom: `1px solid ${L.line}` }}>{x}</div>)}
              </div>
            </div>
          )}
          {/* VIEW 2 — results */}
          {view >= 2 && view <= 3 && (
            <div style={{ position: 'absolute', inset: 0, opacity: v2 }}>
              <div style={{ position: 'absolute', left: 0, top: 52, width: W, height: 44, background: '#fff', borderBottom: `1px solid ${L.line}`, fontSize: 14, color: L.sub, padding: '14px 64px', boxSizing: 'border-box' }}>8 flights found · San Francisco (SFO) → Bangalore (BLR) · Jun 10–17, 2026</div>
              <div style={{ position: 'absolute', left: 64, top: 112, width: 1312, minHeight: 56, borderRadius: 8, background: L.violetBg, border: '1px solid #C9A9FF', padding: '18px 20px', boxSizing: 'border-box', fontSize: 15, color: L.violet }}>
                <span style={{ marginRight: 10 }}>✦</span>{aiTyped}
              </div>
              {FLIGHTS.map((f, i) => {
                const p = easeOut(seg(t, 124.8 + i * 0.35, 125.4 + i * 0.35))
                const pref = i === 0 ? prefer : 0
                const bad = !f.ok && t > 127.8
                return (
                  <div key={i} style={{ position: 'absolute', left: 64, top: 194 + i * 88 + (1 - p) * 20, width: 1312, height: 76, boxSizing: 'border-box', background: pref > 0 ? '#EAF3FF' : '#fff', border: pref > 0 ? '2px solid #0064D9' : '1px solid transparent', borderRadius: 6, padding: '14px 18px', opacity: p * (bad ? 0.6 : 1), boxShadow: '0 1px 3px rgba(34,53,72,.15)' }}>
                    <div style={{ fontSize: 17, display: 'flex', gap: 14, alignItems: 'center' }}>
                      {f.h}
                      {f.ok ? <span style={{ fontSize: 12, color: L.green, background: L.greenBg, borderRadius: 4, padding: '3px 8px' }}>✓ Policy compliant</span> : <span style={{ fontSize: 12, color: L.red, background: L.redBg, borderRadius: 4, padding: '3px 8px', opacity: easeOut(seg(t, 127.8, 128.3)) }}>Exceeds policy limit</span>}
                      {i === 0 && pref > 0 && <span style={{ fontSize: 12, color: '#fff', background: L.violet, borderRadius: 4, padding: '3px 8px', opacity: pref }}>✦ Preferred</span>}
                    </div>
                    <div style={{ fontSize: 14, color: L.sub, marginTop: 8 }}>{f.s}</div>
                    {i === 0 && <div style={{ position: 'absolute', right: 18, top: 18, width: 96, height: 40, borderRadius: 8, background: press(t, 130.0) > 0 ? '#0050B0' : L.blue, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 700, opacity: prefer }}>Book</div>}
                  </div>
                )
              })}
            </div>
          )}
          {/* VIEW 3 — hand-off */}
          {view === 3 && (
            <div style={{ position: 'absolute', inset: 0, background: `rgba(30,40,50,${0.5 * v3})`, display: 'grid', placeItems: 'center', opacity: v3 }}>
              <div style={{ width: 400, height: 300, borderRadius: 16, background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.4)', textAlign: 'center', padding: '28px 40px', boxSizing: 'border-box', transform: `scale(${0.94 + 0.06 * v3})` }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: '#0A91E4', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 38, fontWeight: 700, margin: '0 auto' }}>V</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 14 }}>Voyage</div>
                <div style={{ fontSize: 15, color: L.sub, marginTop: 6 }}>Opening your booking…</div>
                <div style={{ height: 4, background: L.line, borderRadius: 2, marginTop: 22 }}><div style={{ width: `${prog * 100}%`, height: '100%', background: '#0A91E4', borderRadius: 2 }} /></div>
                <div style={{ display: 'inline-block', marginTop: 22, padding: '8px 28px', border: `1px solid ${L.line}`, borderRadius: 8, color: L.blue, fontSize: 14, fontWeight: 700 }}>Cancel</div>
              </div>
            </div>
          )}
          {/* VIEW 4 — booking */}
          {view === 4 && (
            <div style={{ position: 'absolute', inset: 0, opacity: v4 }}>
              <div style={{ position: 'absolute', left: 0, top: 52, width: W, height: 56, background: '#0A91E4', color: '#fff', fontSize: 22, fontWeight: 700, padding: '15px 64px', boxSizing: 'border-box' }}>Book flight — Palo Alto to Bangalore</div>
              <div style={{ position: 'absolute', left: 64, top: 124, fontSize: 13, color: L.sub }}>Travel → SFO to Bangalore → Select flight → Review</div>
              <div style={{ position: 'absolute', left: 64, top: 156, width: 840, height: 232, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '24px 32px', boxSizing: 'border-box' }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>EK237 — San Francisco (SFO) → Bangalore (BLR)</div>
                {[['Airline', 'Emirates'], ['Departure', '08:00 — San Francisco Int’l (SFO)'], ['Arrival', '23:30 +1 — Kempegowda Int’l Airport (BLR)'], ['Class', 'Economy'], ['Fare', '$1,240.00']].map(([a, b], i) => {
                  const p = easeOut(seg(t, 133.7 + i * 0.2, 134.2 + i * 0.2))
                  return <div key={a} style={{ display: 'flex', fontSize: 14, marginTop: 10, opacity: p }}><span style={{ width: 160, color: L.sub }}>{a}</span><span>{b}</span></div>
                })}
                <div style={{ display: 'inline-block', marginTop: 10, fontSize: 12, color: L.green, background: L.greenBg, padding: '3px 10px', borderRadius: 4 }}>✓ Compliant with policy</div>
              </div>
              <div style={{ position: 'absolute', left: 64, top: 408, padding: '9px 28px', border: `1px solid ${L.line}`, borderRadius: 8, color: L.blue, fontSize: 14, fontWeight: 700, background: '#fff' }}>Back to results</div>
              <div style={{ position: 'absolute', left: 936, top: 156, width: 440, height: 580, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '26px 32px', boxSizing: 'border-box' }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Booking summary</div>
                {fields.map(([a, b], i) => {
                  const f = easeOut(seg(t, 134.6 + i * 0.5, 135.2 + i * 0.5)) * (1 - seg(t, 137.4 + i * 0.1, 138.2 + i * 0.1))
                  return (
                    <div key={a} style={{ marginTop: 16, padding: '4px 8px', marginLeft: -8, marginRight: -8, borderRadius: 6, background: `rgba(200,245,90,${0.55 * f})`, outline: f > 0.05 ? `2px solid rgba(120,170,20,${f})` : 'none' }}>
                      <div style={{ fontSize: 12, color: L.sub }}>{a}{f > 0.1 && <span style={{ color: '#4C7A00', fontWeight: 700, marginLeft: 8 }}>✦ from your search</span>}</div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{b}</div>
                    </div>
                  )
                })}
                <div style={{ position: 'absolute', left: 32, right: 32, top: 396, borderTop: `1px solid ${L.line}` }} />
                <div style={{ position: 'absolute', left: 32, right: 32, top: 416, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}><span>Total</span><span>$1,240.00</span></div>
                <div style={{ position: 'absolute', left: 32, right: 32, top: 476, height: 48, borderRadius: 8, background: btnState === 2 ? L.green : press(t, 143.4) > 0 ? '#0050B0' : L.blue, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 700 }}>
                  {btnState === 0 ? 'Book flight' : btnState === 1 ? 'Booking…' : '✓ Booked'}
                </div>
              </div>
              {t > 145.4 && (
                <div style={{ position: 'absolute', inset: 0, background: `rgba(30,40,50,${0.45 * clamp(booked)})`, display: 'grid', placeItems: 'center' }}>
                  <div style={{ width: 520, borderRadius: 16, background: '#fff', padding: '34px 40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,.4)', transform: `scale(${0.8 + 0.2 * clamp(booked, 0, 1.2)})`, opacity: clamp(booked) }}>
                    <div style={{ width: 76, height: 76, borderRadius: '50%', background: L.green, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 42, margin: '0 auto' }}>✓</div>
                    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 16 }}>Flight booked</div>
                    <div style={{ fontSize: 15, color: L.sub, marginTop: 6 }}>EK237 · SFO → BLR · Jun 10–17 · $1,240.00</div>
                    {['Itinerary sent to your inbox', 'Added to your calendar', 'Hotel suggested · The Leela Palace'].map((x, i) => {
                      const p = easeOut(seg(t, 146.4 + i * 0.4, 146.9 + i * 0.4))
                      return <div key={x} style={{ marginTop: 14, fontSize: 15, textAlign: 'left', padding: '10px 14px', background: L.bg, borderRadius: 8, opacity: p, transform: `translateX(${(1 - p) * 20}px)` }}><span style={{ color: L.green, marginRight: 10 }}>✓</span>{x}</div>
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* shell bar & popover */}
          <Shell w={W} name={view >= 4 ? 'Voyage' : 'NorthStar'} field={shellField} />
          {view === 1 && (
            <div className="sa-pop" style={{ left: xs.fieldR - 560, top: 56, width: 560, opacity: popOpen, transform: `translateY(${(1 - popOpen) * -4}px)` }}>
              {!q ? (
                <><div className="sa-gh">Recent searches</div>
                  {['Pending POs this quarter', 'Goals for Lena Hart'].map(x => <div key={x} className="sa-row"><span className="ic"><Ico d={P.history} /></span><span className="t">{x}</span></div>)}
                  <div className="sa-gh">Suggested</div>
                  {['Leave balance', 'Expense report for May'].map(x => <div key={x} className="sa-row"><span className="ic"><Ico d={P.search} /></span><span className="t">{x}</span></div>)}</>
              ) : (
                <><div className="sa-gh">Suggested</div>
                  {TRIPS.map(([x, app], i) => <div key={x} className={`sa-row ${i === 0 && t > 122.7 ? 'is-focus' : ''}`}><span className="ic"><Ico d={P.search} /></span><span className="t">{bold(x, q)}</span><span className="app">{app}</span></div>)}</>
              )}
            </div>
          )}
          <Pointer x={px} y={py} show={pShow} press={pr} />
        </div>
      </Scaled>
      {lane(t, 117.5, 119.2, 'Maria opens any product. The search is already there.')}
      {lane(t, 119.6, 122.2, 'She types a sentence, not a query.')}
      {lane(t, 123.5, 127.2, 'AI reads the intent: route, dates, policy.')}
      {lane(t, 127.6, 130.0, 'One recommendation, and the reason why.')}
      {lane(t, 130.4, 133.4, 'Search to action: straight into the booking.')}
      {lane(t, 134.0, 137.6, 'Nothing to re-type. The trip arrives filled in.', C.green)}
      {lane(t, 138.2, 143.0, 'Policy-compliant, so there is no approval chain.', C.green)}
      {lane(t, 147.4, 151.4, 'Booked. From one sentence, in 47 seconds.', C.green)}
    </Scene>
  )
}

/* ───────────── 7 · OUTCOME  (152–166) ───────────── */
export function SOutcome({ t }: { t: number }) {
  return (
    <Scene t={t} s={152} e={166.2}>
      <In t={t} a={152.2} o={160} style={{ left: 100, top: 60 }}><Label>07 · The outcome</Label></In>
      <div style={{ opacity: 1 - seg(t, 156.4, 156.9) }}>
        <Words t={t} a={152.4} text="Same Maria. Same trip." size={72} style={{ left: 100, top: 108, width: 1500 }} />
        {[
          { x: 100, a: 153.2, lab: 'Before', col: C.red, big: '11 min', lines: ['4 apps searched', '0 answers', 'Booked by email, over policy'], mark: '✕' },
          { x: 1000, a: 154.6, lab: 'After', col: C.lime, big: '47 sec', lines: ['1 search', 'One recommendation, with the reason', 'Booked in policy, no approval chain'], mark: '✓' },
        ].map(c => {
          const p = easeOut(seg(t, c.a, c.a + 0.8))
          return (
            <div key={c.lab} style={{ position: 'absolute', left: c.x, top: 280, width: 820, height: 560, borderRadius: 22, background: C.panel, border: `1.5px solid ${c.col}`, padding: '40px 50px', opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
              <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', color: c.col, textTransform: 'uppercase' }}>{c.lab}</div>
              <div style={{ fontSize: 190, fontWeight: 100, lineHeight: 1.1, color: c.col, letterSpacing: '-0.05em', marginTop: 10 }}>{c.big}</div>
              {c.lines.map((l, i) => <div key={l} style={{ fontSize: 33, fontWeight: 300, marginTop: 18, opacity: easeOut(seg(t, c.a + 0.8 + i * 0.35, c.a + 1.3 + i * 0.35)) }}><span style={{ color: c.col, marginRight: 16 }}>{c.mark}</span>{l}</div>)}
            </div>
          )
        })}
        <In t={t} a={156} y={0} style={{ left: 100, top: 1010 }}><div style={{ fontFamily: mono, fontSize: 16, color: C.dim }}>ILLUSTRATIVE SCENARIO FIGURES</div></In>
      </div>
      {[
        ['One search', 'for every application'],
        ['Answers', 'not just links'],
        ['Search', 'to action'],
      ].map(([a, b], i) => (
        <In key={a} t={t} a={157 + i * 0.6} o={160.4} y={30} style={{ left: 100 + i * 590, top: 360, width: 540 }}>
          <div style={{ padding: '38px 36px', borderRadius: 20, background: C.panel, border: `1px solid ${C.lime}` }}>
            <div style={{ fontSize: 54, fontWeight: 200, color: C.lime, letterSpacing: '-0.03em' }}>{a}</div>
            <div style={{ fontSize: 36, color: C.ink, marginTop: 8, fontWeight: 300 }}>{b}</div>
          </div>
        </In>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: C.bg, opacity: easeOut(seg(t, 160.6, 161.4)) }} />
      <In t={t} a={161.3} d={1} style={{ left: 0, width: 1920, top: 380, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Star size={70} /></div>
        <div style={{ fontSize: 84, fontWeight: 200, letterSpacing: '-0.035em', marginTop: 20 }}>AI-Powered Search</div>
        <div style={{ fontFamily: mono, fontSize: 24, color: C.mute, letterSpacing: '0.14em', marginTop: 20 }}>DESIGN LEAD · AMIT KUMAR TIWARI</div>
        <div style={{ fontSize: 26, color: C.dim, marginTop: 34 }}>NorthStar is a fictional company. Scenario figures are illustrative.</div>
      </In>
    </Scene>
  )
}
void easeInOut
