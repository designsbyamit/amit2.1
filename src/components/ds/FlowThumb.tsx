import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* A thumbnail made for the thumbnail: the order-confirmation flow, composed one beat at a time.
   The camera glides from step to step (ease in, ease out), the pulse leads it, neighbours recede, and the
   progress rail keeps the whole flow legible. All motion is a pure function of time. */

const C = { ink: '#ECEDEF', mute: '#9AA0B4', dim: '#5E6482', lime: '#C8F55A', cob: '#7B93FF', red: '#FF7A6B', amber: '#FFC857', green: '#5BE3A0' }
const MONO = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace"
const H = 800, CW = 600, CH = 370, SP = 780, D = 2.8, HOLD = 1.8, LAST = 3.0
const LOOP = 6 * D + LAST
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const easeIO = (x: number) => x * x * x * (x * (x * 6 - 15) + 10)
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)

type Kind = 'sys' | 'agent' | 'person'
interface N { chap: number; dy: number; h: number; kind: Kind; label: string; title: string; sub: string; gate?: string }
const NODES: N[] = [
  { chap: 0, dy: 0, h: CH, kind: 'sys', label: 'SUPPLIER', title: 'The order confirmation', sub: 'Arrives by email, as a PDF' },
  { chap: 1, dy: 0, h: CH, kind: 'agent', label: 'AI AGENT', title: 'Reads and compares', sub: 'Against the purchase order' },
  { chap: 2, dy: 0, h: CH, kind: 'person', label: 'PROCUREMENT OPS', title: 'Validates the reading', sub: 'Checks and corrects', gate: 'GATE 1' },
  { chap: 3, dy: 0, h: CH, kind: 'agent', label: 'AI AGENT', title: 'Rates and routes', sub: 'Every difference, to its owner' },
  { chap: 4, dy: -152, h: 276, kind: 'person', label: 'BUYER', title: 'Cost and logistics', sub: 'Accepts or rejects', gate: 'GATE 2' },
  { chap: 4, dy: 152, h: 276, kind: 'person', label: 'GOODS RECIPIENT', title: 'Quantity and dates', sub: 'Accepts or rejects', gate: 'GATE 2' },
  { chap: 5, dy: 0, h: CH, kind: 'agent', label: 'AI AGENT', title: 'Drafts the reply', sub: 'To the supplier' },
  { chap: 6, dy: 0, h: CH, kind: 'person', label: 'BUYER', title: 'Reviews and sends', sub: 'Nothing leaves without a person', gate: 'GATE 3' },
]
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7]]
const STEPS: { kind: Kind; name: string }[] = [
  { kind: 'sys', name: 'Email arrives' }, { kind: 'agent', name: 'The agent reads' }, { kind: 'person', name: 'A person validates' }, { kind: 'agent', name: 'The agent routes' },
  { kind: 'person', name: 'People decide' }, { kind: 'agent', name: 'The agent drafts' }, { kind: 'person', name: 'A person sends' },
]
const col = (k: Kind) => (k === 'agent' ? C.lime : k === 'person' ? C.cob : C.mute)
const nx = (n: N) => n.chap * SP

/* camera position in chapter units, with dwell and an eased move */
function camAt(t: number) {
  for (let i = 0; i < 6; i++) { const a = i * D + HOLD; if (t < a) return i; if (t < (i + 1) * D) return i + easeIO(seg(t, a, (i + 1) * D)) }
  return 6
}
const arrive = (i: number) => i * D

function bez(a: [number, number], b: [number, number], p: number): [number, number] {
  const mx = (a[0] + b[0]) / 2
  const u = 1 - p
  return [u * u * u * a[0] + 3 * u * u * p * mx + 3 * u * p * p * mx + p * p * p * b[0], u * u * u * a[1] + 3 * u * u * p * a[1] + 3 * u * p * p * b[1] + p * p * p * b[1]]
}

const Tick = ({ c, s = 18, on = 1 }: { c: string; s?: number; on?: number }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" style={{ opacity: on }}><circle cx="10" cy="10" r="9" fill="none" stroke={c} strokeWidth="1.2" opacity=".5" /><path d="M5.5 10.4 8.7 13.4 14.5 7" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - on)} /></svg>
)
const Row = ({ children, on, y = 10 }: { children: ReactNode; on: number; y?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: on, transform: `translateY(${(1 - on) * y}px)` }}>{children}</div>
)
const Chip = ({ c, on, filled, children }: { c: string; on?: number; filled?: number; children: ReactNode }) => (
  <span style={{ padding: '8px 20px', borderRadius: 99, fontSize: 21, border: `1px solid ${c}`, color: filled ? '#0B1020' : c, background: filled ? c : 'transparent', opacity: on ?? 1, transition: 'none', fontWeight: filled ? 500 : 400 }}>{children}</span>
)

/* the little scene inside each card; lt = seconds since the camera arrived */
function Body({ i, lt }: { i: number; lt: number }) {
  const a = (s: number, d = 0.45) => easeOut(seg(lt, s, s + d))
  if (i === 0) return (
    <div style={{ position: 'relative', height: 90 }}>
      <svg width="96" height="72" viewBox="0 0 96 72" style={{ position: 'absolute', left: 0, top: 4 }}><rect x="2" y="2" width="92" height="68" rx="8" fill="none" stroke={C.mute} strokeWidth="1.4" /><path d="M4 6 48 40 92 6" fill="none" stroke={C.mute} strokeWidth="1.4" /></svg>
      <div style={{ position: 'absolute', left: 140, top: 6, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', opacity: a(0.15), transform: `translateX(${(1 - a(0.15, 0.7)) * 50}px)` }}>
        <span style={{ fontFamily: MONO, fontSize: 14, color: C.red, letterSpacing: '.08em' }}>PDF</span><span style={{ fontSize: 24, color: C.ink }}>Auftragsbestätigung</span>
      </div>
    </div>)
  if (i === 1) return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        {[0.9, 0.62, 0.78].map((w, k) => <div key={k} style={{ height: 8, width: `${w * 100}%`, borderRadius: 4, background: 'rgba(255,255,255,0.10)' }} />)}
        <div style={{ position: 'absolute', left: 0, right: 0, top: ((lt * 0.9) % 1.0) * 56 - 8, height: 22, background: 'linear-gradient(180deg, transparent, rgba(200,245,90,0.30), transparent)', opacity: clamp(lt * 3) }} />
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>
        {['Price', 'Quantity', 'Date'].map((q, k) => <span key={q} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: a(0.3 + k * 0.4), fontSize: 22, color: C.ink }}><Tick c={C.lime} s={21} on={a(0.45 + k * 0.4, 0.3)} />{q}</span>)}
      </div>
    </div>)
  if (i === 2) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {['Fields read correctly', 'Corrections made'].map((q, k) => <Row key={q} on={a(0.1 + k * 0.3)}><Tick c={C.cob} on={a(0.5 + k * 0.4, 0.3)} /><span style={{ fontSize: 24, color: C.ink }}>{q}</span></Row>)}
      <div style={{ marginTop: 6 }}><Chip c={C.cob} filled={lt > 1.35 ? 1 : 0} on={a(0.2)}>{lt > 1.35 ? 'Validated' : 'Confirm'}</Chip></div>
    </div>)
  if (i === 3) {
    const rows: [string, string, string][] = [['Unit price', 'Buyer', C.red], ['Quantity', 'Goods', C.amber], ['Delivery date', 'Goods', C.green]]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map(([q, to, c], k) => <Row key={q} on={a(0.1 + k * 0.3)}><span style={{ width: 10, height: 10, borderRadius: 10, background: c, boxShadow: `0 0 12px ${c}` }} /><span style={{ fontSize: 24, color: C.ink, flex: 1 }}>{q}</span><span style={{ fontFamily: MONO, fontSize: 14, color: C.mute, letterSpacing: '.1em', opacity: a(0.5 + k * 0.3) }}>→ {to.toUpperCase()}</span></Row>)}
      </div>)
  }
  return null
}

function PairBody({ who, lt }: { who: 0 | 1; lt: number }) {
  const pick = lt > (who ? 1.15 : 0.75)
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
      <Chip c={C.cob} filled={pick && who === 0 ? 1 : 0}>Accept</Chip><Chip c={C.cob} filled={pick && who === 1 ? 1 : 0}>Reject</Chip>
    </div>)
}

function End({ i, lt }: { i: number; lt: number }) {
  const a = (s: number, d = 0.45) => easeOut(seg(lt, s, s + d))
  if (i === 5) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <div style={{ fontFamily: MONO, fontSize: 14, color: C.mute, letterSpacing: '.1em', opacity: a(0) }}>TO · SUPPLIER</div>
      {[0.92, 0.7, 0.82, 0.4].map((w, k) => <div key={k} style={{ height: 8, borderRadius: 4, background: 'rgba(200,245,90,0.34)', width: `${w * 100 * clamp((lt - 0.15 - k * 0.32) / 0.5)}%` }} />)}
    </div>)
  const sent = lt > 1.0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Chip c={C.cob} filled={sent ? 1 : 0}>{sent ? 'Sent' : 'Send reply'}</Chip>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 22, color: C.lime, opacity: a(1.3), transform: `translateX(${(1 - a(1.3)) * 10}px)` }}><Tick c={C.lime} on={a(1.4, 0.3)} />Every step logged</span>
    </div>)
}

/** `at` freezes the loop on one moment (seconds) and `bare` drops the running captions: used to cut still covers from the loop. */
export default function FlowThumb({ at, bare, zoom = 1, oy = 0 }: { at?: number; bare?: boolean; zoom?: number; oy?: number } = {}) {
  const box = useRef<HTMLDivElement>(null)
  const [t, setT] = useState(at ?? 1.5 * D + 1.5)
  const [dim, setDim] = useState({ w: 1280, h: 800 })

  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(() => setDim({ w: el.clientWidth || 1280, h: el.clientHeight || 800 }))
    ro.observe(el); setDim({ w: el.clientWidth || 1280, h: el.clientHeight || 800 })
    if (at !== undefined || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => ro.disconnect()
    let raf = 0, visible = false, t0 = 0
    const frame = (now: number) => { if (!t0) t0 = now; setT(((now - t0) / 1000) % LOOP); raf = requestAnimationFrame(frame) }
    const sync = () => { cancelAnimationFrame(raf); raf = 0; if (visible && !document.hidden) { t0 = 0; raf = requestAnimationFrame(frame) } }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() }, { threshold: 0.2 })
    io.observe(el); document.addEventListener('visibilitychange', sync)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  const k = (dim.h / H) * zoom, Wd = dim.w / k
  const cam = camAt(t), camX = cam * SP
  const fade = at !== undefined ? 1 : Math.min(seg(t, 0, 0.7), 1 - seg(t, LOOP - 0.7, LOOP))
  const ci = Math.min(6, Math.round(cam))
  const settled = Math.abs(cam - ci) < 0.02
  const sx = (x: number) => Wd / 2 + (x - camX)
  const breathe = (n: number) => Math.sin(t * 0.9 + n) * 3

  const wrap: CSSProperties = { position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(120% 100% at 15% 0%, #1B2457 0%, #0C1129 56%, #080B1A 100%)', fontFamily: "'Geist Variable','Geist',system-ui,sans-serif", color: C.ink }
  return (
    <div ref={box} style={wrap}>
      <div style={{ position: 'absolute', left: 0, top: oy, width: Wd, height: H, transformOrigin: '0 0', transform: `scale(${k})`, opacity: fade }}>
        {/* backdrop: slow parallax grid and glow */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1.4px)', backgroundSize: '44px 44px', backgroundPosition: `${-camX * 0.22}px 0`, maskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)', WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)' }} />
        <div style={{ position: 'absolute', width: 760, height: 760, borderRadius: '50%', left: Wd / 2 - 380 - camX * 0.1 % 400, top: 20, background: `radial-gradient(circle, ${col(STEPS[ci].kind)}1F, transparent 65%)`, opacity: 0.8 }} />

        {/* chrome that stays put */}
        {!bare && <div style={{ position: 'absolute', left: 64, top: 52, fontFamily: MONO, fontSize: 14, letterSpacing: '.16em', color: C.dim }}>ORDER CONFIRMATION · THE FLOW</div>}
        {!bare && <div style={{ position: 'absolute', right: 64, top: 52, fontFamily: MONO, fontSize: 14, letterSpacing: '.16em', color: C.mute }}>{String(ci + 1).padStart(2, '0')} / 07</div>}

        {/* the world, softly faded at both edges */}
        <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)' }}>
          <svg width={Wd} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            {EDGES.map(([a, b], e) => {
              const A = NODES[a], B = NODES[b]
              const p0: [number, number] = [sx(nx(A)) + CW / 2, 400 + A.dy], p1: [number, number] = [sx(nx(B)) - CW / 2, 400 + B.dy]
              const j = B.chap, start = (j - 1) * D + HOLD - 0.3
              const p = easeIO(seg(t, start, start + 1.15))
              const mx = (p0[0] + p1[0]) / 2
              const d = `M${p0[0]} ${p0[1]} C${mx} ${p0[1]} ${mx} ${p1[1]} ${p1[0]} ${p1[1]}`
              const live = p > 0.001 && p < 0.999
              const pt = bez(p0, p1, p)
              return (
                <g key={e}>
                  <path d={d} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" strokeDasharray="2 7" />
                  <path d={d} fill="none" stroke={col(B.kind === 'person' ? 'person' : A.kind)} strokeOpacity="0.75" strokeWidth="1.4" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
                  {live && <g><circle cx={pt[0]} cy={pt[1]} r="16" fill={C.lime} opacity=".16" /><circle cx={pt[0]} cy={pt[1]} r="5" fill={C.lime} /></g>}
                </g>
              )
            })}
          </svg>
          {NODES.map((n, idx) => {
            const d = Math.abs(cam - n.chap), x = sx(nx(n)) - CW / 2
            const sc = 1 - 0.13 * Math.min(d, 1.2), op = clamp(1 - 0.58 * Math.min(d, 1) - 0.4 * Math.max(0, d - 1))
            const c = col(n.kind), lt = Math.max(0, t - arrive(n.chap)), act = n.chap === ci && settled
            const ring = n.kind === 'person' && n.gate && n.chap === ci ? easeOut(seg(lt, 0.0, 1.1)) : 0
            return (
              <div key={idx} style={{ position: 'absolute', left: x, top: 400 + n.dy - n.h / 2 + breathe(idx), width: CW, height: n.h, transform: `scale(${sc})`, opacity: op, transformOrigin: '50% 50%' }}>
                {ring > 0 && ring < 1 && <div style={{ position: 'absolute', inset: -6 - ring * 26, borderRadius: 30 + ring * 20, border: `1.2px solid ${C.cob}`, opacity: (1 - ring) * 0.7 }} />}
                <div style={{ position: 'absolute', inset: 0, borderRadius: 26, background: n.gate ? 'linear-gradient(160deg, rgba(123,147,255,0.14), rgba(123,147,255,0.04))' : 'rgba(255,255,255,0.045)', border: `1px solid ${c}${act ? 'CC' : '66'}`, boxShadow: n.kind === 'agent' ? `0 0 ${act ? 60 : 24}px ${C.lime}${act ? '26' : '10'}` : undefined, backdropFilter: 'blur(2px)' }} />
                <div style={{ position: 'relative', padding: '32px 38px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 7, background: c }} />
                    <span style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '.16em', color: c }}>{n.label}</span>
                    {n.gate && <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 13, letterSpacing: '.12em', padding: '4px 12px', borderRadius: 99, border: `1px solid ${C.cob}`, color: '#0B1020', background: C.cob }}>{n.gate}</span>}
                  </div>
                  <div style={{ fontSize: n.h < CH ? 38 : 44, fontWeight: 300, marginTop: n.h < CH ? 14 : 20, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{n.title}</div>
                  <div style={{ fontSize: 23, color: C.mute, marginTop: 4 }}>{n.sub}</div>
                  <div style={{ marginTop: n.h < CH ? 12 : 26 }}>
                    {n.chap <= 3 && <Body i={n.chap} lt={lt} />}
                    {n.chap === 4 && <PairBody who={n.dy < 0 ? 0 : 1} lt={lt} />}
                    {n.chap >= 5 && <End i={n.chap} lt={lt} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* progress rail: the whole flow, always legible */}
        {!bare && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 52, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
          {STEPS.map((s, i) => {
            const on = i <= ci, c = col(s.kind), cur = i === ci
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: cur ? 14 : 9, height: cur ? 14 : 9, borderRadius: 14, background: on ? c : 'transparent', border: `1.2px solid ${on ? c : 'rgba(255,255,255,0.25)'}`, boxShadow: cur ? `0 0 18px ${c}` : undefined }} />
                {i < 6 && <div style={{ width: 54, height: 1.2, background: i < ci ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.14)', margin: '0 8px' }} />}
              </div>
            )
          })}
        </div>}
        {!bare && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: MONO, fontSize: 13, letterSpacing: '.16em', color: col(STEPS[ci].kind) }}>{STEPS[ci].name.toUpperCase()}</div>}
      </div>
    </div>
  )
}
