import type { ReactNode } from 'react'
import { C, In, Words, Label, Scene, mono } from './ui'
import { seg, easeOut, clamp } from './engine'
import { L, FONT72, Shell, Field, shellX, FIELD_W, Scaled, Pointer, pathAt, press, typed, Ico, P } from './searchUi'

/* annotation primitives (pink dimension lines on the dark stage) */
const HDim = ({ x1, x2, y, label, below = false, o = 1 }: { x1: number; x2: number; y: number; label: string; below?: boolean; o?: number }) => (
  <div className="sa-dim" style={{ left: x1, top: y, width: x2 - x1, opacity: o }}>
    <span className="ln" style={{ left: 0, right: 0, top: 0, height: 1 }} />
    <span className="ln" style={{ left: 0, top: -5, width: 1, height: 11 }} />
    <span className="ln" style={{ right: 0, top: -5, width: 1, height: 11 }} />
    <span className="lb" style={{ left: '50%', top: below ? 8 : -26, transform: 'translateX(-50%)' }}>{label}</span>
  </div>
)
const VDim = ({ x, y1, y2, label, side = 'right', o = 1 }: { x: number; y1: number; y2: number; label: string; side?: 'left' | 'right'; o?: number }) => (
  <div className="sa-dim" style={{ left: x, top: y1, height: y2 - y1, width: 0, opacity: o }}>
    <span className="ln" style={{ top: 0, bottom: 0, left: 0, width: 1 }} />
    <span className="ln" style={{ top: 0, left: -5, height: 1, width: 11 }} />
    <span className="ln" style={{ bottom: 0, left: -5, height: 1, width: 11 }} />
    <span className="lb" style={{ top: '50%', transform: 'translateY(-50%)', ...(side === 'right' ? { left: 10 } : { right: 10 }) }}>{label}</span>
  </div>
)
const Mk = ({ n, x, y, to, o = 1 }: { n: number; x: number; y: number; to: number; o?: number }) => (
  <>
    <span className="sa-lead" style={{ left: x, top: Math.min(y, to), height: Math.abs(to - y), opacity: o, borderLeft: '1px dashed #ECEDEF' }} />
    <span className="sa-mk" style={{ left: x, top: y, opacity: o, background: C.lime, color: '#0F1013', boxShadow: 'none' }}>{n}</span>
  </>
)
const rev = (t: number, a: number) => easeOut(seg(t, a, a + 0.5))

/* ───────────── 4 · CRAFT · ANATOMY  (74–95) ───────────── */
const LEGEND = [
  ['Product logo', 'placeholder slot · 59 × 29 · 56 from the edge'],
  ['Product name', 'bold 16 · 10 after the logo'],
  ['AI search field', '400 wide · 36 tall · right-aligned to the actions'],
  ['AI-search icon', '19 wide · 9 from the field edge'],
  ['Shell actions', 'notifications, help, more · 36 × 36 · 8 apart'],
  ['Profile', '32 avatar · 48 from the right edge'],
]
export function SAnatomy({ t }: { t: number }) {
  const W = 1147, x = shellX(W)
  const A = 1 - seg(t, 88.2, 88.8)
  const FW = FIELD_W
  return (
    <Scene t={t} s={74} e={95}>
      <In t={t} a={74.2} o={94} style={{ left: 100, top: 60 }}><Label>04 · Craft · Anatomy</Label></In>
      {t < 89 && (
        <div style={{ opacity: A }}>
          <Words t={t} a={74.4} text="One field. The same in every product." size={64} style={{ left: 100, top: 108, width: 1700 }} />
          <Scaled left={100} top={340} k={1.5} style={{ width: W, height: 52, opacity: rev(t, 75), fontFamily: FONT72 }}>
            <Shell w={W} field={<Field t={t} state="default" />} />
            <HDim x1={0} x2={56} y={72} label="56" below o={rev(t, 78)} />
            <HDim x1={115} x2={125} y={72} label="10" below o={rev(t, 78.6)} />
            <HDim x1={x.field} x2={x.fieldR} y={72} label="400" below o={rev(t, 79.2)} />
            <HDim x1={W - 48} x2={W} y={72} label="48" below o={rev(t, 79.8)} />
            <VDim x={-14} y1={0} y2={52} label="52" side="left" o={rev(t, 80.4)} />
            <HDim x1={x.fieldR} x2={x.bell} y={72} label="8" below o={rev(t, 81)} />
            <HDim x1={x.help} x2={x.help + 36} y={72} label="36" below o={rev(t, 81.5)} />
            <HDim x1={x.more - 8} x2={x.more} y={72} label="8" below o={rev(t, 82)} />
            <HDim x1={x.avatar} x2={x.avatar + 32} y={72} label="32" below o={rev(t, 82.4)} />
            {[[1, 85, 11], [2, 176, 18], [3, x.field + 120, 8], [4, x.fieldR - 18, 17], [5, x.help + 18, 8], [6, x.avatar + 16, 10]].map(([n, mx, to], i) => (
              <Mk key={n} n={n} x={mx} y={-62} to={to} o={rev(t, 83 + i * 0.55)} />
            ))}
          </Scaled>
          {LEGEND.map(([a, b], i) => {
            const p = rev(t, 83.2 + i * 0.55)
            return (
              <div key={a} style={{ position: 'absolute', left: 100 + (i % 2) * 860, top: 640 + Math.floor(i / 2) * 115, display: 'flex', gap: 22, alignItems: 'center', opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: C.lime, color: C.bg, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 22, flex: 'none' }}>{i + 1}</span>
                <div><div style={{ fontSize: 31, fontWeight: 400 }}>{a}</div><div style={{ fontFamily: mono, fontSize: 18, color: C.mute, marginTop: 4, letterSpacing: '0.04em' }}>{b}</div></div>
              </div>
            )
          })}
        </div>
      )}
      {t >= 88.5 && (
        <div style={{ opacity: easeOut(seg(t, 88.6, 89.3)) }}>
          <Words t={t} a={88.8} text="Down to the pixel." size={64} style={{ left: 100, top: 108, width: 1700 }} />
          <Scaled left={480} top={420} k={2.4} style={{ width: FW, height: 36 }}>
            <Field t={t} state="typed" text="Current status & end date of" />
            <HDim x1={0} x2={14} y={-14} label="14" o={rev(t, 89.8)} />
            <HDim x1={FW - 9 - 19 - 8 - 24} x2={FW - 9 - 19 - 8} y={-14} label="24" o={rev(t, 90.2)} />
            <HDim x1={FW - 9 - 19 - 8} x2={FW - 9 - 19} y={50} label="8" below o={rev(t, 90.6)} />
            <HDim x1={FW - 9 - 19} x2={FW - 9} y={-14} label="19" o={rev(t, 91.0)} />
            <HDim x1={FW - 9} x2={FW} y={50} label="9" below o={rev(t, 91.4)} />
            <VDim x={FW + 22} y1={0} y2={36} label="36" o={rev(t, 91.8)} />
          </Scaled>
          {[
            ['Pill · radius 18', '1px #556B81 border · 2px #0064D9 on focus', 91.6],
            ['A clear control that appears when it is needed', '× shows 8px before the AI icon once there is text', 92.6],
          ].map(([a, b, at], i) => (
            <In key={i} t={t} a={at as number} style={{ left: 480, top: 700 + i * 120 }}>
              <div style={{ fontSize: 38, fontWeight: 300 }}>{a}</div>
              <div style={{ fontFamily: mono, fontSize: 21, color: C.mute, marginTop: 8, letterSpacing: '0.04em' }}>{b}</div>
            </In>
          ))}
        </div>
      )}
    </Scene>
  )
}

/* ───────────── 5 · CRAFT · INTERACTION  (95–117) ───────────── */
const STATES: { k: 'default' | 'hover' | 'active' | 'typing' | 'typed'; label: string; a: number; copy: ReactNode }[] = [
  { k: 'default', label: 'Default', a: 95.8, copy: <><b style={{ color: C.lime }}>Default</b> · 1px border · radius 18 · placeholder · AI-search icon</> },
  { k: 'hover', label: 'Hover', a: 97.5, copy: <><b style={{ color: C.lime }}>Hover</b> · border turns #0064D9 with a soft inner glow</> },
  { k: 'active', label: 'Active', a: 99.2, copy: <><b style={{ color: C.lime }}>Active</b> · 2px focus border · caret at the start · placeholder stays until the first key</> },
  { k: 'typing', label: 'Typing', a: 101.0, copy: <><b style={{ color: C.lime }}>Typing</b> · the field scrolls to keep the caret in view</> },
  { k: 'typed', label: 'Typed', a: 103.0, copy: <><b style={{ color: C.lime }}>Typed</b> · clear (×) appears 8px before the AI icon · Enter runs the search</> },
]
const bold = (text: string, q: string) => {
  if (q && text.toLowerCase().startsWith(q.toLowerCase())) return <><b>{text.slice(0, q.length)}</b>{text.slice(q.length)}</>
  return <>{text}</>
}
const OPEN_GROUPS: [string, [string, string][]][] = [
  ['Recent searches', [['Pending POs this quarter', 'Procurement'], ['Goals for Lena Hart', 'People']]],
  ['Suggested', [['Leave balance', 'People'], ['Expense report for May', 'Finance']]],
]
const MATCHES: [string, string][] = [['Flight to Bangalore · Jun 10–17', 'Travel'], ['Flight to Singapore · Jul 3–10', 'Travel'], ['Flight to Tokyo · Conference', 'Travel']]

export function SInteraction({ t }: { t: number }) {
  const cur = [...STATES].reverse().find(s => t >= s.a) ?? STATES[0]
  const full = 'Current status & end date of'
  const text = cur.k === 'typing' ? typed(full, t, 101.0, 14) : cur.k === 'typed' ? full : ''
  const [px, py] = pathAt(t, [[97.0, 1180, 600], [97.6, 1010, 372], [100.3, 1010, 372], [101.0, 1200, 560], [103.6, 1100, 640], [104.3, 1264, 374]])
  const pShow = (t > 96.9 && t < 100.6 ? 1 : 0) + (t > 103.5 && t < 105 ? 1 : 0)
  // type-ahead
  const q = typed('flight to', t, 107.4, 6)
  const open = easeOut(seg(t, 105.9, 106.2)) * (1 - seg(t, 113.0, 113.3))
  const rowFocus = t > 112.0 ? 0 : t > 110.9 ? 1 : t > 110.2 ? 0 : -1
  const fieldState = t < 105.8 ? 'default' : t >= 112.2 ? 'typed' : q ? 'typing' : 'active'
  return (
    <Scene t={t} s={95} e={117}>
      <In t={t} a={95.2} o={116} style={{ left: 100, top: 60 }}><Label>05 · Craft · Interaction behaviour</Label></In>
      {t < 105.3 && (
        <div style={{ opacity: 1 - seg(t, 104.8, 105.3) }}>
          <Words t={t} a={95.3} text="Five states. Each one earns its place." size={64} style={{ left: 100, top: 108, width: 1700 }} />
          <Scaled left={560} top={330} k={2} style={{ width: 400, height: 36 }}>
            <Field t={t} state={cur.k} text={text} clearHover={cur.k === 'typed' && t > 104.4} />
          </Scaled>
          <div style={{ position: 'absolute', left: 0, width: 1920, top: 520, display: 'flex', justifyContent: 'center', gap: 20 }}>
            {STATES.map(s => <div key={s.k} style={{ width: 190, textAlign: 'center', padding: '14px 0', borderRadius: 40, border: `1.5px solid ${cur.k === s.k ? C.lime : C.line}`, background: cur.k === s.k ? 'rgba(200,245,90,0.12)' : 'transparent', color: cur.k === s.k ? C.lime : C.mute, fontSize: 26, opacity: rev(t, 95.6) }}>{s.label}</div>)}
          </div>
          <div key={cur.k} style={{ position: 'absolute', left: 0, width: 1920, top: 640, textAlign: 'center', fontSize: 31, fontWeight: 300, color: C.ink, opacity: rev(t, cur.a + 0.1), transform: `translateY(${(1 - rev(t, cur.a + 0.1)) * 14}px)` }}>{cur.copy}</div>
          <Pointer x={px} y={py} show={clamp(pShow)} press={press(t, 99.2)} />
        </div>
      )}
      {t >= 105.2 && (
        <div>
          <Words t={t} a={105.4} text="Type-ahead that thinks ahead." size={64} style={{ left: 100, top: 108, width: 1700 }} />
          <Scaled left={100} top={300} k={1.6} style={{ width: 480, height: 300, fontFamily: FONT72 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 400 }}><Field t={t} state={fieldState} text={t >= 112.2 ? 'Flight to Bangalore' : q} /></div>
            <div className="sa-pop" style={{ left: 0, top: 40, opacity: open, transform: `translateY(${(1 - open) * -4}px)` }}>
              {!q ? OPEN_GROUPS.map(([g, items], gi) => (
                <div key={g}><div className="sa-gh">{g}</div>{items.map(([x, app]) => <div key={x} className="sa-row"><span className="ic"><Ico d={gi === 0 ? P.history : P.search} /></span><span className="t">{x}</span><span className="app">{app}</span></div>)}</div>
              )) : (
                <div><div className="sa-gh">Suggested</div>{MATCHES.map(([x, app], i) => <div key={x} className={`sa-row ${rowFocus === i ? 'is-focus' : ''}`}><span className="ic"><Ico d={P.search} /></span><span className="t">{bold(x, q)}</span><span className="app">{app}</span></div>)}</div>
              )}
            </div>
          </Scaled>
          {[
            { a: 106.4, h: 'Opens 4px below the field', s: 'on focus · 480 wide · radius 12' },
            { a: 108.4, h: 'Every keystroke re-ranks the list', s: 'matched characters in bold · 44px rows' },
            { a: 110.2, h: 'Keyboard first', s: '↑ ↓ to move · Enter runs it · Esc closes' },
          ].map((n, i) => (
            <In key={i} t={t} a={n.a} style={{ left: 1160, top: 320 + i * 160 }}>
              <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: C.lime, color: C.bg, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 20, flex: 'none', marginTop: 4 }}>{i + 1}</span>
                <div><div style={{ fontSize: 34, fontWeight: 300 }}>{n.h}</div><div style={{ fontFamily: mono, fontSize: 20, color: C.mute, marginTop: 8 }}>{n.s}</div></div>
              </div>
            </In>
          ))}
          {t > 110.1 && t < 113.1 && (
            <div style={{ position: 'absolute', left: 890, top: 330 + 58 + 8 + 60, opacity: 1 }}>
              {t < 112.0 && <span style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 8, border: `2px solid ${C.lime}`, color: C.lime, fontFamily: mono, fontSize: 26 }}>↓</span>}
              {t >= 112.0 && <span style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 8, border: `2px solid ${C.lime}`, background: 'rgba(200,245,90,0.15)', color: C.lime, fontFamily: mono, fontSize: 26 }}>Enter ⏎</span>}
            </div>
          )}
          <In t={t} a={113.4} y={20} style={{ left: 100, top: 440 }}>
            <div style={{ fontSize: 66, fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.08 }}>Same behaviour,<br />in <span style={{ color: C.lime }}>every product.</span></div>
            <div style={{ fontSize: 28, color: C.mute, marginTop: 22, fontWeight: 300 }}>Predictable, so nobody has to relearn it.</div>
          </In>
        </div>
      )}
    </Scene>
  )
}
// keep L referenced for palette parity with the prototype scene
void L
