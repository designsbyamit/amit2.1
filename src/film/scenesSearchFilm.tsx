// AI-Powered Search film, about 1:46. One question; every application had its own search box; we listened first;
// eight designers in three workstreams; an answer you can check; then the product: a global search in the shell bar
// of every application, results from all of them, and an action that opens the right application.
import logoLoader from '../assets/logo-loader.svg?raw'
import { C, In, Words, Label, Scene, mono } from './ui'
import { Pill, Cursor } from './kit'
import { seg, easeOut, easeInOut, easeOutBack, clamp, lerp } from './engine'
import { L, FONT72, Shell, Field, Scaled, Pointer, pathAt, press, typed, shellX, FIELD_W } from './searchUi'
import { APPS, SCENARIOS, type AppKey } from '../components/case/search/globalSearchData'

export const SEARCH_FILM_DURATION = 102

const sc = SCENARIOS[0]
const QUERY = sc.query
const tag = (k: AppKey) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px 3px 8px', borderRadius: 999, background: APPS[k].tint, color: APPS[k].hue, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
    <span style={{ width: 8, height: 8, borderRadius: 4, background: APPS[k].hue }} />{APPS[k].name}
  </span>
)
const Chip = ({ children, color = C.lime }: { children: string; color?: string }) => (
  <div style={{ display: 'inline-block', padding: '14px 28px', borderRadius: 40, background: 'rgba(15,16,19,0.94)', border: `2px solid ${color}`, color, fontSize: 31, whiteSpace: 'nowrap', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>{children}</div>
)
const lane = (t: number, a: number, o: number, text: string, color?: string) => (
  <In t={t} a={a} o={o} style={{ left: 0, width: 1920, top: 992, textAlign: 'center' }}><Chip color={color}>{text}</Chip></In>
)

/* ───────────── 1 · HOOK (0-6.4) ───────────── */
export function SHook({ t }: { t: number }) {
  const text = typed(QUERY, t, 0.9, 13)
  const pulse = easeOut(seg(t, 3.4, 4.2))
  return (
    <Scene t={t} s={0} e={6.4}>
      <In t={t} a={0.3} o={6} style={{ left: 100, top: 70 }}><Label color={C.mute}>A film · AI-Powered Search</Label></In>
      <Words t={t} a={0.4} text="One question." size={128} style={{ left: 0, width: 1920, textAlign: 'center', top: 270 }} />
      <div style={{ position: 'absolute', left: 410, top: 520, width: 1100, height: 104, borderRadius: 52, border: `2px solid ${C.lime}`, background: 'rgba(200,245,90,0.07)', boxShadow: `0 0 ${70 * pulse}px rgba(200,245,90,0.3)`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 40px', color: C.ink, fontSize: 44, fontWeight: 300, opacity: easeOut(seg(t, 0.5, 1.1)) }}>
        <span style={{ width: 30, height: 30, borderRadius: '50%', border: `4px solid ${C.lime}`, flex: 'none' }} />
        <span>{text}<span style={{ opacity: Math.sin(t * 8) > 0 ? 1 : 0 }}>|</span></span>
      </div>
      <In t={t} a={3.8} style={{ left: 0, width: 1920, textAlign: 'center', top: 700 }}><div style={{ fontSize: 40, fontWeight: 300, color: C.mute }}>Where do you ask it?</div></In>
    </Scene>
  )
}

/* ───────────── 2 · COMPLEXITY (6.4-17) ───────────── */
type Box = { name: string; ph: string; res: string; variant: number }
const BOXES: Box[] = [
  { name: 'Expenses', ph: 'Search by claim ID', res: 'No claim matches. This box only searches claim IDs.', variant: 1 },
  { name: 'Procurement', ph: 'Document number', res: '0 results for “flight to Bangalore next week”', variant: 0 },
  { name: 'People', ph: 'Employee name', res: 'This search covers people only.', variant: 2 },
  { name: 'Travel', ph: 'Search bookings', res: 'Session expired. Sign in again to search.', variant: 3 },
]
function AppWin({ t, i, a, q }: { t: number; i: number; a: number; q: number }) {
  const d = BOXES[i]
  const p = easeOut(seg(t, a, a + 0.7))
  const text = typed(QUERY, t, q, 18)
  const res = easeOut(seg(t, q + 1.7, q + 2.2))
  const col = i % 2, row = Math.floor(i / 2)
  const base = { fontFamily: FONT72, fontSize: 18, color: L.ink, display: 'flex', alignItems: 'center', height: 44, whiteSpace: 'nowrap' as const, overflow: 'hidden' as const }
  const content = text ? <span>{text}<span style={{ opacity: Math.sin(t * 8) > 0 ? 1 : 0 }}>|</span></span> : <span style={{ color: L.sub }}>{d.ph}</span>
  const box = d.variant === 0 ? <div style={{ ...base, width: 360, border: `1px solid ${L.sub}`, borderRadius: 4, padding: '0 14px' }}>{content}</div>
    : d.variant === 1 ? <div style={{ ...base, width: 360, borderBottom: `2px solid ${L.sub}`, padding: '0 4px' }}>{content}</div>
    : d.variant === 2 ? <div style={{ ...base, width: 360, border: `1px solid ${L.sub}`, borderRadius: 22, padding: '0 18px', background: '#fff' }}>{content}</div>
    : <div style={{ ...base, width: 420 }}><div style={{ flex: 1, border: `1px solid ${L.sub}`, borderRadius: '4px 0 0 4px', height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', overflow: 'hidden' }}>{content}</div><div style={{ background: L.blue, color: '#fff', height: 44, padding: '0 18px', display: 'flex', alignItems: 'center', borderRadius: '0 4px 4px 0' }}>Go</div></div>
  return (
    <div style={{ position: 'absolute', left: 100 + col * 910, top: 300 + row * 330, width: 810, height: 300, borderRadius: 14, background: L.bg, overflow: 'hidden', opacity: p, transform: `translateY(${(1 - p) * 40}px)`, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', fontFamily: FONT72 }}>
      <div style={{ height: 50, background: '#fff', borderBottom: `1px solid ${L.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 20, fontWeight: 700, color: '#003e87' }}>{d.name}</div>
      <div style={{ padding: '28px 36px' }}>{box}</div>
      <div style={{ padding: '0 36px', opacity: res, transform: `translateY(${(1 - res) * 14}px)` }}>
        <div style={{ fontSize: 23, color: L.red, fontWeight: 700, display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: L.red, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18, flex: 'none' }}>✕</span>{d.res}</div>
      </div>
    </div>
  )
}
export function SComplex({ t }: { t: number }) {
  return (
    <Scene t={t} s={6.4} e={17}>
      <In t={t} a={6.6} o={16.4} style={{ left: 100, top: 60 }}><Label color={C.red}>The complexity</Label></In>
      <div style={{ opacity: 1 - seg(t, 12.6, 13.1) }}><Words t={t} a={6.8} text="Every application had its own search box." size={66} style={{ left: 100, top: 112, width: 1700 }} /></div>
      {t > 13 && <Words t={t} a={13.1} text="Its own words. Its own rules. No single place to start." size={66} style={{ left: 100, top: 112, width: 1750 }} color={C.amber} />}
      {BOXES.map((_, i) => <AppWin key={i} t={t} i={i} a={7.4 + i * 0.35} q={8.2 + i * 1.2} />)}
    </Scene>
  )
}

/* ───────────── 3 · PEOPLE (17-27) ───────────── */
export function SPeople({ t }: { t: number }) {
  const cards = [
    { x: 100, a: 18.8, k: 'Line of business stakeholders', h: 'Shaped the vision', d: 'The challenges, and what search should offer.' },
    { x: 1010, a: 20.2, k: 'People who search every day', h: 'Shaped the patterns', d: 'How a question is asked and what an answer shows.' },
  ]
  return (
    <Scene t={t} s={17} e={27}>
      <In t={t} a={17.2} o={26.4} style={{ left: 100, top: 60 }}><Label>The people</Label></In>
      <Words t={t} a={17.4} text="We listened first, then wrote the vision." size={72} style={{ left: 100, top: 112, width: 1700 }} />
      {cards.map(c => (
        <In key={c.k} t={t} a={c.a} y={40} style={{ left: c.x, top: 330, width: 810 }}>
          <div style={{ borderRadius: 22, background: C.panel, border: `1px solid ${C.line}`, padding: '40px 46px', height: 300, boxSizing: 'border-box' }}>
            <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', color: C.cobalt, textTransform: 'uppercase' }}>{c.k}</div>
            <div style={{ fontSize: 64, fontWeight: 200, letterSpacing: '-0.03em', marginTop: 24 }}>{c.h}</div>
            <div style={{ fontSize: 30, fontWeight: 300, color: C.mute, marginTop: 16 }}>{c.d}</div>
          </div>
        </In>
      ))}
      <In t={t} a={22.4} style={{ left: 100, top: 690 }}><div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', color: C.mute, textTransform: 'uppercase' }}>The vision, written before any screen</div></In>
      {['Consistent', 'User friendly', 'Contextual'].map((x, i) => (
        <In key={x} t={t} a={23 + i * 0.5} y={24} style={{ left: 100 + i * 420, top: 760 }}><Pill color={C.lime} style={{ borderColor: C.lime, fontSize: 38, padding: '18px 38px' }}>{x}</Pill></In>
      ))}
    </Scene>
  )
}

/* ───────────── 4 · ORGANISATION (27-37) ───────────── */
export function SOrg({ t }: { t: number }) {
  const seg3 = [
    { n: 2, t: 'Before the search', d: 'Entry points, type-ahead and how a question is shaped.', a: 29 },
    { n: 3, t: 'The results', d: 'Layout, grouping, filters and actions on each row.', a: 30.2 },
    { n: 3, t: 'Results to the next step', d: 'How a result opens the application where work continues.', a: 31.4 },
  ]
  const line = easeInOut(seg(t, 28.6, 31.6))
  return (
    <Scene t={t} s={27} e={37}>
      <In t={t} a={27.2} o={36.4} style={{ left: 100, top: 60 }}><Label>How the work was organised</Label></In>
      <Words t={t} a={27.4} text="Eight designers. Three workstreams. One journey." size={72} style={{ left: 100, top: 112, width: 1750 }} />
      <div style={{ position: 'absolute', left: 130, top: 640, width: 1660 * line, height: 6, borderRadius: 3, background: C.lime }} />
      {t > 31 && <div style={{ position: 'absolute', left: 1770, top: 622, fontSize: 40, color: C.lime, opacity: easeOut(seg(t, 31.4, 31.9)) }}>→</div>}
      {seg3.map((s, i) => (
        <In key={s.t} t={t} a={s.a} y={36} style={{ left: 100 + i * 560, top: 330, width: 520 }}>
          <div style={{ borderRadius: 22, background: C.panel, border: `1px solid ${C.line}`, padding: '34px 36px', height: 250, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: 10 }}>{Array.from({ length: s.n }, (_, k) => <span key={k} style={{ width: 22, height: 22, borderRadius: '50%', background: C.lime, opacity: easeOut(seg(t, s.a + 0.3 + k * 0.15, s.a + 0.7 + k * 0.15)) }} />)}</div>
            <div style={{ fontSize: 40, fontWeight: 300, marginTop: 20, lineHeight: 1.1 }}>{s.t}</div>
            <div style={{ fontSize: 26, color: C.mute, marginTop: 12, lineHeight: 1.3 }}>{s.d}</div>
          </div>
          <div style={{ position: 'absolute', left: 258, top: 310, width: 22, height: 22, borderRadius: '50%', background: C.bg, border: `3px solid ${C.lime}` }} />
        </In>
      ))}
      <In t={t} a={33.4} y={20} style={{ left: 100, top: 760, width: 1700 }}><div style={{ fontSize: 42, fontWeight: 200, lineHeight: 1.2 }}>Each group owned a stretch of the journey, not an application. <span style={{ color: C.lime }}>The seams are where search had to feel like one thing.</span></div></In>
    </Scene>
  )
}

/* ───────────── 5 · KEY DECISION (37-51) ───────────── */
const INSIGHTS: { t: string; refs: number[] }[] = [
  { t: 'Northwind Air is the preferred carrier for this route.', refs: [0] },
  { t: 'The $980 fare is cheaper but adds 1h 45m.', refs: [1] },
  { t: 'Both fares are inside the international travel policy.', refs: [0, 1, 3] },
]
export function SDecision({ t }: { t: number }) {
  const open = easeOut(seg(t, 39.6, 40.4))
  const focus = t >= 46.2 ? 2 : t >= 42.6 ? 0 : -1
  const related = focus < 0 ? [] : INSIGHTS[focus].refs
  const [px, py] = pathAt(t, [[40.8, 1100, 700], [42.2, 925, 382], [44.4, 925, 382], [45.8, 946, 464], [49.6, 946, 464]])
  const rows = sc.rows
  return (
    <Scene t={t} s={37} e={51}>
      <In t={t} a={37.2} o={50.4} style={{ left: 100, top: 60 }}><Label>The key decision</Label></In>
      <Words t={t} a={37.4} text="An AI answer is only useful if you can check it." size={66} style={{ left: 100, top: 112, width: 1750 }} />
      <Scaled left={280} top={290} k={1.36} style={{ width: 1000, fontFamily: FONT72, opacity: easeOut(seg(t, 38.2, 38.9)) }}>
        <div style={{ width: 1000, background: '#fff', borderRadius: 12, boxShadow: '0 0 0 1px rgba(29,45,62,.06), 0 2px 6px rgba(29,45,62,.12)', padding: '18px 24px 16px', color: L.ink }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700 }}>✦ AI Summary<span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: '#D1EFFF' }}>4 results analyzed</span></div>
          <div style={{ marginTop: 10, display: 'grid', gap: 6, overflow: 'hidden', height: lerp(26, 96, open) }}>
            {INSIGHTS.map((x, i) => (
              <div key={i} style={{ fontSize: 15.5, lineHeight: '24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: focus === i ? '#CDE3FB' : 'transparent', borderRadius: 3, padding: '0 3px', transition: 'none' }}>{x.t}</span>
                <span style={{ width: 24, height: 24, borderRadius: 12, border: `1.5px solid ${L.blue}`, display: 'grid', placeItems: 'center', color: L.blue, fontSize: 13, background: focus === i ? '#EBF8FF' : '#fff' }}>⛓</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 12, boxShadow: '0 0 0 1px rgba(29,45,62,.06)', overflow: 'hidden' }}>
          {rows.map((r, i) => {
            const hot = related.includes(i)
            const p = easeOut(seg(t, 39 + i * 0.25, 39.5 + i * 0.25))
            return (
              <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 22px', borderTop: i ? `1px solid ${L.line}` : 0, background: hot ? '#EAF5FC' : '#fff', opacity: p }}>
                <div style={{ width: 112, flex: 'none' }}>{tag(r.app)}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14.5, fontWeight: 700, color: L.blue }}>{r.title}</div><div style={{ fontSize: 12.5, color: L.sub, marginTop: 2 }}>{r.meta}</div></div>
                {hot && <span style={{ fontSize: 12, color: L.blue, fontWeight: 700 }}>✦ Contributed to the insight</span>}
              </div>
            )
          })}
        </div>
      </Scaled>
      <Cursor x={px} y={py} show={t > 40.6 && t < 49.6} />
      {lane(t, 40.4, 44.0, 'Every insight carries a link to the results behind it.')}
      {lane(t, 44.4, 50.2, 'Select it, and those results rise into focus.')}
    </Scene>
  )
}

/* ───────────── 6 · PRODUCT (51-97) ───────────── */
const W = 1440, H = 780

export function SProduct({ t }: { t: number }) {
  const xs = shellX(W)
  const swap: AppKey = t < 52.6 ? 'expenses' : t < 54.6 ? 'procurement' : t < 56.6 ? 'people' : 'expenses'
  const view = t < 64.8 ? 'home' : t < 77.2 ? 'results' : t < 81.4 ? 'handoff' : 'app'
  const typedQ = typed(QUERY, t, 60.2, 9)
  const open = view === 'home' ? easeOut(seg(t, 59.6, 59.9)) : 0
  const appName = view === 'app' || (view === 'handoff' && t > 80.4) ? 'Travel' : APPS[swap].name
  const filter = t >= 71.0 && t < 73.0 ? 'travel' : 'all'
  const shown = sc.rows.filter(r => filter === 'all' || r.app === filter)
  const aiText = typed(sc.summary, t, 66.4, 46)
  const prog = clamp((t - 77.6) / 2.8)
  const booked = easeOutBack(seg(t, 88.0, 88.8))
  const clicks = [58.9, 71.0, 73.0, 76.4, 87.2]
  const pr = Math.max(...clicks.map(c => press(t, c)))
  const [px, py] = pathAt(t, [
    [57.8, 900, 330], [58.6, 1020, 28], [64.6, 1020, 28], [66.2, 1100, 120], [70.5, 330, 150], [72.4, 330, 150], [72.9, 200, 150],
    [75.8, 1290, 330], [78.0, 1290, 330], [83.0, 700, 400], [86.8, 202, 520], [89.2, 202, 520],
  ])
  const pShow = t < 57.7 ? 0 : t > 89.4 ? 1 - seg(t, 89.4, 90.0) : 1
  const fieldState = view === 'home' ? (t < 58.9 ? 'default' : 'typing') : view === 'results' ? 'typed' : 'default'
  const shellField = <Field t={t} state={fieldState} text={view === 'home' ? typedQ : view === 'results' ? QUERY : ''} />
  const ring = easeOut(seg(t, 51.8, 52.3)) * (1 - seg(t, 57.4, 57.9))
  const resFade = easeOut(seg(t, 64.9, 65.5))
  const fields = sc.fields
  const win = easeOut(seg(t, 51.0, 51.7))
  return (
    <Scene t={t} s={51} e={90}>
      <In t={t} a={51.1} o={89.4} style={{ left: 96, top: 12 }}><Label>The product · one search, in every application</Label></In>
      <Scaled left={96} top={48} k={1.2} style={{ width: W, height: H, opacity: win, fontFamily: FONT72 }}>
        <div style={{ position: 'relative', width: W, height: H, background: L.bg, borderRadius: 10, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)', color: L.ink }}>
          {view === 'home' && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 64, top: 96, fontSize: 36, fontWeight: 700 }}>{APPS[swap].name}</div>
              <div style={{ position: 'absolute', left: 64, top: 146, fontSize: 18, color: L.sub }}>Welcome back, Maria. {APPS[swap].blurb}.</div>
              {APPS[swap].cards.map(([a, b], i) => (
                <div key={a} style={{ position: 'absolute', left: 64 + i * 438, top: 200, width: 418, height: 150, borderRadius: 14, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '24px 26px', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: 16, color: L.sub }}>{a}</div><div style={{ fontSize: 40, fontWeight: 300, marginTop: 14 }}>{b}</div>
                </div>
              ))}
              <div style={{ position: 'absolute', left: 64, top: 390, width: 1312, height: 300, borderRadius: 14, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '24px 26px', boxSizing: 'border-box' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Today</div>
                {['Three things need your attention', 'Two items updated since yesterday', 'Team 1:1 · 15:30'].map(x => <div key={x} style={{ fontSize: 17, color: L.sub, padding: '16px 0', borderBottom: `1px solid ${L.line}` }}>{x}</div>)}
              </div>
            </div>
          )}
          {view === 'results' && (
            <div style={{ position: 'absolute', inset: 0, opacity: resFade }}>
              <div style={{ position: 'absolute', left: 64, top: 76, fontSize: 28, fontWeight: 700 }}>Results for “{QUERY}”</div>
              <div style={{ position: 'absolute', left: 64, top: 118, display: 'flex', gap: 10 }}>
                {(['all', 'travel', 'expenses', 'policies'] as const).map(k => {
                  const on = filter === k
                  const n = k === 'all' ? 4 : k === 'travel' ? 2 : 1
                  return <span key={k} style={{ padding: '6px 16px', borderRadius: 999, fontSize: 15, fontWeight: 700, border: `1px solid ${on ? L.blue : L.line}`, background: on ? '#E8F1FC' : '#fff', color: on ? L.blue : '#3A4553' }}>{k === 'all' ? 'All applications' : APPS[k].name} ({n})</span>
                })}
                <span style={{ marginLeft: 14, alignSelf: 'center', fontSize: 14, color: L.sub, opacity: easeOut(seg(t, 67.4, 68)) }}>4 results from 3 applications</span>
              </div>
              <div style={{ position: 'absolute', left: 64, top: 172, width: 1312, borderRadius: 10, background: L.violetBg, border: '1px solid #D8C6FA', padding: '14px 20px', boxSizing: 'border-box', fontSize: 16, lineHeight: '23px', color: L.violet, minHeight: 74 }}><b style={{ marginRight: 10 }}>✦ AI overview</b>{aiText}</div>
              <div style={{ position: 'absolute', left: 64, top: 268, width: 1312, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', overflow: 'hidden' }}>
                {shown.map((r, i) => {
                  const p = easeOut(seg(t, 68.4 + i * 0.4, 69 + i * 0.4))
                  return (
                    <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 20, height: 84, padding: '0 24px', boxSizing: 'border-box', borderTop: i ? `1px solid ${L.line}` : 0, opacity: filter === 'all' ? p : 1 }}>
                      <div style={{ width: 132, flex: 'none' }}>{tag(r.app)}</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 18, fontWeight: 700, color: L.blue }}>{r.title}</div><div style={{ fontSize: 14, color: L.sub, marginTop: 4 }}>{r.meta}</div></div>
                      <div style={{ padding: '10px 22px', borderRadius: 8, fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', background: r.primary ? (press(t, 76.4) > 0 ? '#0050B0' : L.blue) : '#fff', color: r.primary ? '#fff' : L.blue, border: r.primary ? 0 : `1px solid ${L.blue}` }}>{r.action} in {APPS[r.app].name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {view === 'handoff' && (
            <div style={{ position: 'absolute', inset: 0, background: `rgba(30,40,50,${0.5 * seg(t, 77.2, 77.6)})`, display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 460, borderRadius: 16, background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.4)', textAlign: 'center', padding: '30px 40px', boxSizing: 'border-box', transform: `scale(${0.94 + 0.06 * seg(t, 77.2, 77.6)})` }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: APPS.travel.hue, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 38, fontWeight: 700, margin: '0 auto' }}>T</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginTop: 14 }}>Opening Travel</div>
                <div style={{ fontSize: 15, color: L.sub, marginTop: 6 }}>Carrying over from your search</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
                  {sc.carry.map((c, i) => <span key={c} style={{ background: L.greenBg, color: L.green, fontSize: 13, fontWeight: 700, borderRadius: 999, padding: '4px 12px', opacity: easeOut(seg(t, 77.8 + i * 0.3, 78.3 + i * 0.3)) }}>{c}</span>)}
                </div>
                <div style={{ height: 4, background: L.line, borderRadius: 2, marginTop: 22 }}><div style={{ width: `${prog * 100}%`, height: '100%', background: APPS.travel.hue, borderRadius: 2 }} /></div>
              </div>
            </div>
          )}
          {view === 'app' && (
            <div style={{ position: 'absolute', inset: 0, opacity: easeOut(seg(t, 81.4, 82.0)) }}>
              <div style={{ position: 'absolute', left: 0, top: 52, width: W, height: 56, background: APPS.travel.hue, color: '#fff', fontSize: 22, fontWeight: 700, padding: '15px 64px', boxSizing: 'border-box' }}>{sc.appTitle}</div>
              <div style={{ position: 'absolute', left: 64, top: 124, fontSize: 14, color: L.sub }}>Search results → Travel</div>
              <div style={{ position: 'absolute', left: 64, top: 156, width: 860, height: 440, borderRadius: 12, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '26px 32px', boxSizing: 'border-box' }}>
                {fields.map(([k, v], i) => {
                  const f = easeOut(seg(t, 82.4 + i * 0.4, 83 + i * 0.4))
                  const fade = 1 - seg(t, 85.6 + i * 0.1, 86.4 + i * 0.1)
                  return (
                    <div key={k} style={{ display: 'flex', alignItems: 'baseline', padding: '10px 10px', marginBottom: 8, borderRadius: 6, background: `rgba(200,245,90,${0.5 * f * (0.4 + 0.6 * fade)})`, opacity: f }}>
                      <span style={{ width: 150, fontSize: 15, color: L.sub }}>{k}</span>
                      <span style={{ flex: 1, fontSize: 18, fontWeight: 700 }}>{v}</span>
                      <span style={{ fontSize: 13, color: '#4C7A00', fontWeight: 700, opacity: fade * f }}>✦ from your search</span>
                    </div>
                  )
                })}
                <div style={{ marginTop: 18, width: 220, height: 48, borderRadius: 8, background: t > 88 ? L.green : press(t, 87.2) > 0 ? '#0050B0' : L.blue, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 700 }}>{t > 88 ? '✓ Booked' : 'Book flight'}</div>
              </div>
              {t > 88 && (
                <div style={{ position: 'absolute', left: 960, top: 156, width: 416, borderRadius: 12, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.18)', padding: '26px 30px', boxSizing: 'border-box', opacity: clamp(booked) }}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>Flight booked</div>
                  {['Itinerary sent to your inbox', 'Added to your calendar', 'Within policy, no approval chain'].map(x => <div key={x} style={{ marginTop: 14, fontSize: 15, background: L.bg, borderRadius: 8, padding: '10px 14px' }}><span style={{ color: L.green, marginRight: 10 }}>✓</span>{x}</div>)}
                </div>
              )}
            </div>
          )}
          {/* typing popover */}
          {view === 'home' && open > 0 && (
            <div className="sa-pop" style={{ left: xs.fieldR - 560, top: 56, width: 560, opacity: open, transform: `translateY(${(1 - open) * -4}px)` }}>
              <div className="sa-gh">Suggested</div>
              {[['Flight to Bangalore · Jun 10-17', 'travel'], ['Flight to Singapore · Jul 3-10', 'travel'], ['Travel policy · international trips', 'policies']].map(([x, a], i) => (
                <div key={x} className={`sa-row ${i === 0 && t > 63.4 ? 'is-focus' : ''}`}><span className="t">{x}</span><span className="app">{APPS[a as AppKey].name}</span></div>
              ))}
            </div>
          )}
          <Shell w={W} name={appName} field={shellField} />
          {/* ring around the field: the field never moves */}
          <div style={{ position: 'absolute', left: xs.field - 8, top: 4, width: FIELD_W + 16, height: 44, borderRadius: 24, border: `3px solid ${C.lime}`, opacity: ring, boxShadow: `0 0 30px rgba(200,245,90,0.6)`, pointerEvents: 'none' }} />
          <Pointer x={px} y={py} show={pShow} press={pr} />
        </div>
      </Scaled>
      {lane(t, 51.4, 53.2, 'Open any application.')}
      {lane(t, 53.4, 56.4, 'The search is already there, in the shell bar.')}
      {lane(t, 56.6, 58.4, 'Same field. Same place. Every application.')}
      {lane(t, 58.9, 64.4, 'Maria is in Expenses. She asks for a flight in a sentence.')}
      {lane(t, 65.4, 70.4, 'Results from every application, each tagged with its source.')}
      {lane(t, 70.6, 75.6, 'Filter by application, or see everything together.')}
      {lane(t, 75.8, 80.4, 'An action opens the application it belongs to.')}
      {lane(t, 81.4, 87.0, 'Nothing to re-type. The trip arrives filled in.', C.green)}
      {lane(t, 88.4, 90.2, 'Booked, in Travel, from a search started in Expenses.', C.green)}
    </Scene>
  )
}

/* ───────────── 6b · START ANYWHERE (90-97) ───────────── */
export function SAnywhere({ t }: { t: number }) {
  const rows: { from: AppKey; to: AppKey; q: string; a: number }[] = [
    { from: 'expenses', to: 'travel', q: 'A flight to Bangalore', a: 91.0 },
    { from: 'people', to: 'procurement', q: 'A laptop for a new joiner', a: 92.4 },
    { from: 'procurement', to: 'people', q: 'The goals for a team member', a: 93.8 },
  ]
  return (
    <Scene t={t} s={90} e={97}>
      <In t={t} a={90.2} o={96.4} style={{ left: 100, top: 60 }}><Label>Start anywhere</Label></In>
      <Words t={t} a={90.4} text="Start anywhere. Land where the work is." size={72} style={{ left: 100, top: 112, width: 1750 }} />
      {rows.map((r, i) => (
        <In key={r.q} t={t} a={r.a} y={26} style={{ left: 100, top: 340 + i * 190, width: 1720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36, borderRadius: 22, background: C.panel, border: `1px solid ${C.line}`, padding: '34px 44px' }}>
            <div style={{ transform: 'scale(1.6)', transformOrigin: '0 50%', width: 190 }}>{tag(r.from)}</div>
            <span style={{ fontFamily: mono, fontSize: 24, color: C.mute, width: 220 }}>searches</span>
            <div style={{ fontSize: 44, fontWeight: 300, flex: 1 }}>{r.q}</div>
            <span style={{ color: C.lime, fontSize: 44 }}>→</span>
            <div style={{ transform: 'scale(1.6)', transformOrigin: '100% 50%', width: 200, display: 'flex', justifyContent: 'flex-end' }}>{tag(r.to)}</div>
          </div>
        </In>
      ))}
    </Scene>
  )
}

/* ───────────── 7 · SIGNATURE (97-102) ───────────── */
export function SResult({ t }: { t: number }) {
  const sign = easeOut(seg(t, 97.1, 97.8))
  return (
    <Scene t={t} s={97} e={102}>
      <div style={{ position: 'absolute', inset: 0, background: C.bg, opacity: sign }} />
      {t > 97.1 && (
        <div style={{ position: 'absolute', left: 0, width: 1920, top: 330, textAlign: 'center', opacity: sign }}>
          <div className="logo-loader-mark" aria-hidden style={{ width: 130, height: 130, margin: '0 auto', color: C.ink }} dangerouslySetInnerHTML={{ __html: logoLoader.replace(/<title>.*?<\/title>/, '').replace(/ width="96" height="96"/, ' width="100%" height="100%"') }} />
          <div style={{ fontSize: 84, fontWeight: 200, letterSpacing: '-0.035em', marginTop: 40 }}>AI-Powered Search</div>
          <div style={{ fontSize: 26, color: C.dim, marginTop: 30 }}>Applications, people and data in this film are fictional.</div>
        </div>
      )}
    </Scene>
  )
}
