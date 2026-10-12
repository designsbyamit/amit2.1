import { C, In, Words, Label, Scene, mono, fmt, countTo } from './ui'
import { seg, easeOut, easeInOut, easeOutBack, lerp, rnd, clamp } from './engine'
import { L, FONT72, typed } from './searchUi'
import { sapSearch as S } from '../data/sapSearch'

const center = { left: 0, width: 1920, textAlign: 'center' as const }

/* ───────────── 0 · HOOK  (0–9) ───────────── */
export function SHook({ t }: { t: number }) {
  const merge = easeInOut(seg(t, 7.0, 8.3))
  const line = (a: number, o: number, text: string, color?: string) => (
    <div style={{ opacity: 1 - seg(t, o, o + 0.45) }}><Words t={t} a={a} text={text} size={118} color={color} style={{ ...center, top: 400 }} /></div>
  )
  return (
    <Scene t={t} s={0} e={9}>
      <In t={t} a={0.3} o={6.8} style={{ left: 100, top: 70 }}><Label color={C.mute}>A film · AI-Powered Search</Label></In>
      {Array.from({ length: 43 }, (_, i) => {
        if (i === 22) return null
        const col = i % 9, row = Math.floor(i / 9)
        const a = 0.2 + rnd(i + 1) * 3.2
        const p = easeOut(seg(t, a, a + 0.6))
        return (
          <div key={i} style={{ position: 'absolute', left: 110 + col * 188, top: 110 + row * 190 + (col % 2) * 40, width: 168, height: 42, borderRadius: i % 3 === 0 ? 21 : i % 3 === 1 ? 6 : 0, border: `1.5px solid ${C.dim}`, opacity: p * 0.26 * (1 - merge), display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', color: C.mute, fontSize: 17, borderBottomWidth: i % 3 === 2 ? 1.5 : 1.5 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid ${C.mute}` }} />{['Search…', 'Find a form', 'Look up', 'Search claims', 'By ID only', 'Search tickets'][i % 6]}
          </div>
        )
      })}
      {line(0.5, 2.5, 'Forty-three apps.')}
      {line(2.9, 4.9, 'Forty-three search boxes.', C.amber)}
      {line(5.2, 6.8, 'No two alike.', C.red)}
      {t > 6.9 && (
        <div style={{ position: 'absolute', left: lerp(110 + 4 * 188, 700, merge), top: lerp(110 + 2 * 190 + 0, 480, merge), width: lerp(168, 520, merge), height: lerp(42, 76, merge), borderRadius: 40, border: `2px solid ${C.lime}`, background: 'rgba(200,245,90,0.08)', boxShadow: `0 0 ${60 * merge}px rgba(200,245,90,0.35)`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', color: C.lime, fontSize: lerp(17, 30, merge), opacity: easeOut(seg(t, 6.9, 7.3)) }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', border: `3px solid ${C.lime}`, flex: 'none' }} />Search everything
        </div>
      )}
    </Scene>
  )
}

/* ───────────── 1 · SETUP  (9–25) ───────────── */
type AppDef = { name: string; ph: string; res: string; variant: number; docs?: string[] }
const APPS: AppDef[] = [
  { name: 'Atlas · Intranet', ph: 'Search Atlas', res: '0 results for “flight to Bangalore”', variant: 0 },
  { name: 'Ledger · Expenses', ph: 'Search by claim ID', res: 'No claim matches. This box only searches claim IDs.', variant: 1 },
  { name: 'Voyage · Travel', ph: 'Search bookings', res: 'Session expired. Sign in again to search.', variant: 2 },
  { name: 'Vault · Documents', ph: 'Find a document', res: '412 documents. None about booking a flight.', variant: 3, docs: ['Travel_Policy_2019.pdf', 'Bangalore_Office_Map.pdf', 'Visa_Checklist_old.pdf'] },
]
function AppWin({ t, i, a, q }: { t: number; i: number; a: number; q: number }) {
  const d = APPS[i]
  const p = easeOut(seg(t, a, a + 0.7))
  const text = typed('flight to Bangalore', t, q, 18)
  const res = easeOut(seg(t, q + 1.5, q + 2.0))
  const col = i % 2, row = Math.floor(i / 2)
  const box = (() => {
    const base = { fontFamily: FONT72, fontSize: 18, color: L.ink, display: 'flex', alignItems: 'center', height: 44, whiteSpace: 'nowrap' as const }
    const content = text ? <span>{text}<span style={{ opacity: Math.sin(t * 8) > 0 ? 1 : 0 }}>|</span></span> : <span style={{ color: L.sub }}>{d.ph}</span>
    if (d.variant === 0) return <div style={{ ...base, width: 360, border: `1px solid ${L.sub}`, borderRadius: 4, padding: '0 14px' }}>{content}</div>
    if (d.variant === 1) return <div style={{ ...base, width: 360, borderBottom: `2px solid ${L.sub}`, padding: '0 4px' }}>{content}</div>
    if (d.variant === 2) return <div style={{ ...base, width: 360, border: `1px solid ${L.sub}`, borderRadius: 22, padding: '0 18px', gap: 10, background: '#fff' }}><span>⌕</span>{content}</div>
    return <div style={{ ...base, width: 420, gap: 0 }}><div style={{ flex: 1, border: `1px solid ${L.sub}`, borderRadius: '4px 0 0 4px', height: 44, display: 'flex', alignItems: 'center', padding: '0 14px' }}>{content}</div><div style={{ background: L.blue, color: '#fff', height: 44, padding: '0 18px', display: 'flex', alignItems: 'center', borderRadius: '0 4px 4px 0' }}>Go</div></div>
  })()
  return (
    <div style={{ position: 'absolute', left: 100 + col * 910, top: 270 + row * 380, width: 810, height: 350, borderRadius: 14, background: L.bg, overflow: 'hidden', opacity: p, transform: `translateY(${(1 - p) * 40}px)`, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', fontFamily: FONT72 }}>
      <div style={{ height: 50, background: '#fff', borderBottom: `1px solid ${L.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF6B5B' }} /><span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFC857' }} /><span style={{ width: 11, height: 11, borderRadius: '50%', background: '#5BE3A0' }} />
        <span style={{ marginLeft: 14, fontSize: 20, fontWeight: 700, color: '#003e87' }}>{d.name}</span>
      </div>
      <div style={{ padding: '32px 36px' }}>{box}</div>
      <div style={{ padding: '0 36px', opacity: res, transform: `translateY(${(1 - res) * 14}px)` }}>
        <div style={{ fontSize: 24, color: L.red, fontWeight: 700, display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: L.red, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18 }}>✕</span>{d.res}</div>
        {d.docs && <div style={{ marginTop: 16, opacity: 0.55 }}>{d.docs.map(x => <div key={x} style={{ fontSize: 20, color: L.sub, padding: '7px 0', borderBottom: `1px solid ${L.line}` }}>{x}</div>)}</div>}
      </div>
    </div>
  )
}
export function SSetup({ t }: { t: number }) {
  return (
    <Scene t={t} s={9} e={25}>
      <In t={t} a={9.2} o={24.4} style={{ left: 100, top: 60 }}><Label>01 · The setup</Label></In>
      <Words t={t} a={9.4} text="Maria needs a flight to Bangalore." size={64} style={{ left: 100, top: 108, width: 1700 }} />
      <In t={t} a={10.4} o={22.2} style={{ left: 100, top: 196 }}><div style={{ fontFamily: mono, fontSize: 21, color: C.mute, letterSpacing: '0.1em' }}>SALES OPERATIONS · NORTHSTAR CHEMICALS &amp; PHARMA · 9,000 PEOPLE · 43 APPS</div></In>
      <In t={t} a={22.6} o={24.4} style={{ left: 100, top: 188 }}><div style={{ fontSize: 36, fontWeight: 300, color: C.red }}>Four apps. Four search boxes. Zero answers.</div></In>
      {APPS.map((_, i) => <AppWin key={i} t={t} i={i} a={11.2 + i * 0.35} q={12.4 + i * 2.85} />)}
    </Scene>
  )
}

/* ───────────── 2 · PROBLEM  (25–51) ───────────── */
export function SProblem({ t }: { t: number }) {
  const chain = ['Search fails', 'Asks a colleague', 'Books by email', '$1,850 · over policy', 'Finance reworks it']
  const sev = easeInOut(seg(t, 36.2, 42.5))
  const dots = Array.from({ length: 450 }, (_, i) => i)
  return (
    <Scene t={t} s={25} e={51}>
      <In t={t} a={25.2} o={50} style={{ left: 100, top: 60 }}><Label color={C.red}>02 · The problem</Label></In>
      {/* why it fails */}
      <div style={{ opacity: 1 - seg(t, 35.2, 35.8) }}>
        <Words t={t} a={25.4} text="Why does search fail?" size={72} style={{ left: 100, top: 108, width: 1500 }} />
        {S.challenges.map((c, ci) => {
          const a = 26.6 + ci * 1.4
          const p = easeOut(seg(t, a, a + 0.7))
          return (
            <div key={c.area} style={{ position: 'absolute', left: 100 + ci * 590, top: 270, width: 540, height: 520, borderRadius: 20, background: C.panel, border: `1px solid ${C.line}`, padding: '34px 36px', opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>
              <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.red, textTransform: 'uppercase', minHeight: 56 }}>{c.area}</div>
              {c.items.map((it, ii) => {
                const q = easeOut(seg(t, a + 0.9 + ii * 0.55, a + 1.4 + ii * 0.55))
                return <div key={it} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 26, fontSize: 29, fontWeight: 300, opacity: q, transform: `translateX(${(1 - q) * 20}px)` }}><span style={{ color: C.red, fontSize: 26, lineHeight: '38px' }}>✕</span><span style={{ lineHeight: 1.25 }}>{it}</span></div>
              })}
            </div>
          )
        })}
      </div>
      {/* severity chain */}
      <In t={t} a={36} o={43.6} style={{ left: 0, width: 1920, top: 300 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22 }}>
          {chain.map((s, i) => {
            const p = easeOutBack(seg(t, 36.3 + i * 1.0, 37.0 + i * 1.0))
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={{ padding: '24px 28px', borderRadius: 14, border: `1.5px solid ${C.red}`, background: `rgba(255,107,91,${0.1 + i * 0.1})`, fontSize: 29, whiteSpace: 'nowrap', transform: `scale(${p}) rotate(${(1 - p) * -4}deg)`, opacity: clamp(p) }}>{s}</div>
                {i < 4 && <span style={{ color: C.red, fontSize: 34, opacity: clamp(p) }}>→</span>}
              </div>
            )
          })}
        </div>
        <div style={{ margin: '44px auto 0', width: 1200, height: 10, borderRadius: 5, background: C.line, overflow: 'hidden' }}><div style={{ width: `${sev * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.amber}, ${C.red})` }} /></div>
        <div style={{ fontFamily: mono, fontSize: 20, color: C.red, textAlign: 'center', marginTop: 14, letterSpacing: '0.16em' }}>SEVERITY · RISING</div>
        <div style={{ fontSize: 50, fontWeight: 200, textAlign: 'center', marginTop: 70, opacity: easeOut(seg(t, 41.4, 42.4)) }}>One failed search becomes <span style={{ color: C.red }}>a policy breach.</span></div>
      </In>
      {/* scale */}
      {t > 44 && (
        <div>
          {[
            { a: 44.4, lab: '9,000 employees × 11 searches a day', to: 99000, unit: 'searches a day', col: C.ink },
            { a: 46.2, lab: '1 in 3 does not find the answer', to: 33000, unit: 'failed searches a day', col: C.red },
            { a: 48.0, lab: '≈ 2.1 hours a week, per person', to: 18900, unit: 'hours lost every week', col: C.amber },
          ].map((b, i) => (
            <In key={i} t={t} a={b.a} y={30} style={{ left: 100, top: 160 + i * 270 }}>
              <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.1em', color: C.mute, textTransform: 'uppercase' }}>{b.lab}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 6 }}>
                <span style={{ fontSize: 130, fontWeight: 200, lineHeight: 1.05, color: b.col, letterSpacing: '-0.04em' }}>{fmt(countTo(t, b.a + 0.2, b.a + 1.8, 0, b.to))}</span>
                <span style={{ fontSize: 32, color: C.mute }}>{b.unit}</span>
              </div>
            </In>
          ))}
          <div style={{ position: 'absolute', left: 1060, top: 170, width: 760, display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gap: 8 }}>
            {dots.map(i => {
              const p = clamp((t - 44.4) * 2.2 - rnd(i + 11) * 1.4)
              const bad = rnd(i * 2.3 + 5) < 0.33
              const hot = bad && t > 47.4 + rnd(i) * 1.2
              return <div key={i} style={{ aspectRatio: '1', borderRadius: '50%', background: hot ? C.red : '#C9CED6', opacity: p * (hot ? 0.95 : 0.5), transform: `scale(${easeOut(p)})` }} />
            })}
          </div>
          <In t={t} a={45.2} style={{ left: 1060, top: 760 }}><div style={{ fontFamily: mono, fontSize: 20, color: C.mute, letterSpacing: '0.12em' }}>EACH DOT = 20 PEOPLE · RED = A FAILED SEARCH</div></In>
        </div>
      )}
      <In t={t} a={26} o={34} style={{ left: 100, top: 1010 }}><div style={{ fontFamily: mono, fontSize: 16, color: C.dim }}>ILLUSTRATIVE SCENARIO FIGURES</div></In>
      <In t={t} a={44.2} o={50} style={{ left: 100, top: 1010 }}><div style={{ fontFamily: mono, fontSize: 16, color: C.dim }}>ILLUSTRATIVE SCENARIO FIGURES</div></In>
    </Scene>
  )
}

/* ───────────── 3 · PROCESS  (51–74) ───────────── */
const AI_OFFERINGS = [['Informational AI', 'answers and explains'], ['Transactional AI', 'does the task'], ['Analytical AI', 'finds the signal'], ['Generative AI', 'drafts and summarises']]
export function SProcess({ t }: { t: number }) {
  const circ = [
    { x: 960, y: 520, l: 'Search functionalities', c: C.cobalt, a: 52.4 },
    { x: 780, y: 810, l: 'AI offerings', c: C.lime, a: 53.1 },
    { x: 1140, y: 810, l: 'Users’ problems', c: C.red, a: 53.8 },
  ]
  const vennFade = 1 - seg(t, 57.0, 57.6)
  return (
    <Scene t={t} s={51} e={74}>
      <In t={t} a={51.2} o={73.2} style={{ left: 100, top: 60 }}><Label>03 · Process &amp; craft</Label></In>
      {/* venn */}
      {t < 57.7 && (
        <div style={{ opacity: vennFade }}>
          <Words t={t} a={51.4} text="Start with three inputs." size={72} style={{ left: 100, top: 108, width: 1500 }} />
          {circ.map((c, i) => {
            const p = easeOut(seg(t, c.a, c.a + 0.9))
            return (
              <div key={i} style={{ position: 'absolute', left: c.x - 215, top: c.y - 215 - 40, width: 430, height: 430, borderRadius: '50%', border: `2px solid ${c.c}`, background: `${c.c}1F`, transform: `scale(${p})`, opacity: p, display: 'grid', placeItems: i === 0 ? 'start center' : i === 1 ? 'center start' : 'center end' }}>
                <div style={{ fontSize: 33, fontWeight: 300, textAlign: 'center', width: 190, margin: i === 0 ? '52px 0 0' : i === 1 ? '0 0 0 50px' : '0 50px 0 0', color: C.ink, lineHeight: 1.15 }}>{c.l}</div>
              </div>
            )
          })}
          <In t={t} a={55.2} o={56.9} s={0.2} style={{ left: 960 - 230, top: 650, width: 460, textAlign: 'center' }}><div style={{ fontSize: 34, fontWeight: 400, color: C.lime }}>Search that understands</div></In>
        </div>
      )}
      {/* inputs, in detail */}
      <div style={{ opacity: 1 - seg(t, 62.6, 63.1) }}>
        {t >= 57.6 && t < 63.2 && <Words t={t} a={57.7} text="Every idea met all three." size={64} style={{ left: 100, top: 108, width: 1500 }} />}
        <In t={t} a={58.3} style={{ left: 100, top: 250 }}><div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.cobalt }}>9 SEARCH FUNCTIONALITIES</div></In>
        {S.searchFunctionalities.map(([n], i) => {
          const p = easeOut(seg(t, 58.5 + i * 0.12, 59.1 + i * 0.12))
          return <div key={n} style={{ position: 'absolute', left: 100 + (i % 3) * 235, top: 310 + Math.floor(i / 3) * 90, width: 222, height: 68, borderRadius: 14, border: `1.5px solid ${C.cobalt}`, background: 'rgba(110,139,255,0.08)', display: 'grid', placeItems: 'center', fontSize: 23, opacity: p, transform: `scale(${0.9 + 0.1 * p})` }}>{n}</div>
        })}
        <In t={t} a={59.4} style={{ left: 850, top: 250 }}><div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.lime }}>4 AI OFFERINGS</div></In>
        {AI_OFFERINGS.map(([n, s], i) => {
          const p = easeOut(seg(t, 59.6 + i * 0.18, 60.2 + i * 0.18))
          return <div key={n} style={{ position: 'absolute', left: 850, top: 310 + i * 90, width: 440, height: 72, borderRadius: 14, border: `1.5px solid ${C.lime}`, background: 'rgba(200,245,90,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}><span style={{ fontSize: 25, whiteSpace: 'nowrap' }}>{n}</span><span style={{ fontSize: 18, color: C.mute, whiteSpace: 'nowrap' }}>{s}</span></div>
        })}
        <In t={t} a={60.6} style={{ left: 1320, top: 250 }}><div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.red }}>12 PAIN POINTS</div></In>
        {['Inadequate autocomplete', 'No natural language', 'Poor indexing', 'No personalisation', 'No context', 'Limited filters'].map((x, i) => {
          const p = easeOut(seg(t, 60.8 + i * 0.15, 61.4 + i * 0.15))
          return <div key={x} style={{ position: 'absolute', left: 1320, top: 310 + i * 60, fontSize: 27, fontWeight: 300, opacity: p, transform: `translateX(${(1 - p) * 20}px)` }}><span style={{ color: C.red }}>— </span>{x}</div>
        })}
        <In t={t} a={61.8} style={{ left: 1320, top: 680 }}><div style={{ fontSize: 24, color: C.mute }}>…and six more</div></In>
        <In t={t} a={61.2} y={0} style={{ left: 100, top: 640, width: 1700 }}><div style={{ height: 1, background: C.line }} /></In>
        <In t={t} a={61.6} style={{ left: 100, top: 690, width: 1100 }}><div style={{ fontSize: 40, fontWeight: 200 }}>Each idea had to answer <span style={{ color: C.lime }}>what search can do</span>, <span style={{ color: C.lime }}>what AI can add</span>, and <span style={{ color: C.red }}>what hurts today.</span></div></In>
      </div>
      {/* ten capabilities */}
      {t >= 62.8 && (
        <div style={{ opacity: easeOut(seg(t, 62.9, 63.5)) * (1 - seg(t, 67.7, 68.3)) }}>
          <Words t={t} a={63} text="Ten capabilities, one search." size={72} style={{ left: 100, top: 108, width: 1500 }} />
          {S.recommendations.map((r, i) => {
            const p = easeOut(seg(t, 63.8 + i * 0.28, 64.4 + i * 0.28))
            return (
              <div key={r} style={{ position: 'absolute', left: 100 + (i % 2) * 900, top: 280 + Math.floor(i / 2) * 118, width: 850, display: 'flex', gap: 26, alignItems: 'baseline', opacity: p, transform: `translateY(${(1 - p) * 20}px)`, borderTop: `1px solid ${C.line}`, paddingTop: 22 }}>
                <span style={{ fontFamily: mono, fontSize: 22, color: C.lime }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 31, fontWeight: 300, lineHeight: 1.2 }}>{r}</span>
              </div>
            )
          })}
        </div>
      )}
      {/* patterns */}
      {t >= 68.2 && (
        <div>
          <Words t={t} a={68.4} text="19 patterns, in four moments." size={72} style={{ left: 100, top: 108, width: 1500 }} accent={['19']} />
          {S.patternGroups.map((g, i) => {
            const p = easeOut(seg(t, 69.4 + i * 0.5, 70.2 + i * 0.5))
            return (
              <div key={g.title} style={{ position: 'absolute', left: 100 + i * 437, top: 300, width: 410, height: 500, borderRadius: 20, background: C.panel, border: `1px solid ${C.line}`, padding: '30px 30px', opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>
                <div style={{ fontSize: 110, fontWeight: 100, color: C.lime, lineHeight: 1, letterSpacing: '-0.05em' }}>{g.items.length}</div>
                <div style={{ fontSize: 30, fontWeight: 400, marginTop: 14, minHeight: 112, lineHeight: 1.2 }}>{g.title}</div>
                {g.items.slice(0, 3).map(x => <div key={x} style={{ fontSize: 21, color: C.mute, marginTop: 12 }}>— {x}</div>)}
              </div>
            )
          })}
        </div>
      )}
    </Scene>
  )
}
