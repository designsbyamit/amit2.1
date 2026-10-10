// Search component anatomy for the AI-Powered Search case study.
// Three panels drawn as live HTML inside a real SAP Horizon shell bar (geometry measured from Figma node 6-62101):
//   01 Anatomy & spacing (static, annotated)   02 Field states (looping)   03 Suggestions & type-ahead (looping)
import { useEffect, useRef, useState, type ReactNode } from 'react'
import './search-anatomy.css'

const A = `${import.meta.env.BASE_URL}images/case-studies/sap-search/`
const QUERY = 'Current status & end date of SOW IDs for CyberSecure Ltd'
const PLACEHOLDER = 'Search across all SAP applications...'

// SAP Horizon icon paths (@ui5/webcomponents-icons v5, 16×16)
const P = {
  bell: 'M8 1c2.21 0 3.628.956 4.451 2.315.789 1.302.99 2.902.99 4.19v.636c0 1.072.341 1.976.691 2.62.189.347.41.678.669.974.442.469.098 1.265-.546 1.265h-3.837c-.281 1.15-1.256 2-2.418 2-1.162 0-2.137-.85-2.418-2H1.745c-.646 0-.989-.798-.544-1.267a5.19 5.19 0 0 0 .666-.971c.35-.645.691-1.55.691-2.621v-.636c0-1.288.202-2.888.99-4.19C4.372 1.955 5.791 1 8 1Zm0 1.5c-1.695 0-2.621.69-3.167 1.592-.582.96-.774 2.237-.774 3.413v.636c0 1.404-.45 2.563-.885 3.359h9.652c-.436-.795-.886-1.955-.886-3.36v-.635c0-1.176-.191-2.453-.773-3.413C10.621 3.19 9.695 2.5 8 2.5Z',
  help: 'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8a2.99 2.99 0 0 1 .75 5.884v.366a.75.75 0 0 1-1.5 0V8.231c0-.547.407-.716.904-.757.498-.042 1.346-.54 1.346-1.483A1.49 1.49 0 0 0 8 4.5c-.883 0-1.414.582-1.504 1.567A.75.75 0 0 1 5 5.991 2.99 2.99 0 0 1 8 3Z',
  overflow: 'M2 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
  history: 'M7.92 0C12.394 0 16 3.55 16 8s-3.606 8-8.08 8C4.066 16 .832 13.341.02 9.778a.751.751 0 0 1 1.463-.334C2.139 12.325 4.766 14.5 7.92 14.5c3.662 0 6.58-2.895 6.58-6.5s-2.918-6.5-6.58-6.5C5.38 1.5 3.143 2.927 2.06 5h3.19a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 5.75v-5a.75.75 0 0 1 1.5 0v2.362A8.155 8.155 0 0 1 7.92 0Zm-.17 3a.75.75 0 0 1 .75.75v3.866l2.703 2.04a.75.75 0 0 1-.905 1.196l-3-2.263A.751.751 0 0 1 7 7.99V3.75A.75.75 0 0 1 7.75 3Z',
  decline: 'M11.72 3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 1 1 1.06-1.06L8 6.94l3.72-3.72Z',
  search: 'M7 1a6 6 0 0 1 4.738 9.678l3.042 3.042a.75.75 0 1 1-1.06 1.06l-3.042-3.042A6 6 0 1 1 7 1Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z',
  ai: 'M4.774 5.518c.23-.69 1.222-.69 1.452 0 .811 2.38 1.873 3.441 4.256 4.252.69.24.69 1.23 0 1.46-2.383.811-3.445 1.871-4.256 4.253-.23.69-1.222.69-1.452 0C3.963 13.1 2.9 12.04.518 11.23c-.69-.24-.69-1.231 0-1.461 2.383-.81 3.445-1.871 4.256-4.252Zm7.83-5.234a.417.417 0 0 1 .791 0c.44 1.298 1.02 1.877 2.32 2.317.38.13.38.669 0 .799-1.3.439-1.88 1.018-2.32 2.316a.417.417 0 0 1-.79 0c-.44-1.298-1.02-1.877-2.32-2.316a.423.423 0 0 1 0-.8c1.3-.439 1.88-1.018 2.32-2.316Z',
}
// Amit's AI-search icon (Figma export, 19×18)
const AI_SEARCH = 'M7.45093 0.876655C7.95939 0.876655 8.45908 0.927501 8.94037 1.02569C9.16822 1.07195 9.36836 1.20684 9.49676 1.40067C9.62516 1.59451 9.6713 1.83141 9.62504 2.05926C9.57877 2.28712 9.44388 2.48726 9.25005 2.61566C9.05621 2.74406 8.81931 2.7902 8.59146 2.74393C7.4873 2.51868 6.34115 2.62588 5.29792 3.05197C4.25468 3.47806 3.3612 4.20391 2.73045 5.13775C2.0997 6.07159 1.76 7.17148 1.7543 8.29836C1.7486 9.42524 2.07715 10.5285 2.69842 11.4687C3.31968 12.4089 4.20576 13.1437 5.24464 13.5803C6.28351 14.017 7.42851 14.1358 8.53489 13.9217C9.64127 13.7076 10.6593 13.1703 11.4604 12.3777C12.2614 11.5851 12.8095 10.5728 13.0352 9.46875C13.0581 9.35593 13.103 9.24872 13.1674 9.15326C13.2317 9.05779 13.3142 8.97593 13.4102 8.91235C13.5062 8.84878 13.6137 8.80472 13.7267 8.78272C13.8397 8.76071 13.956 8.76117 14.0688 8.78408C14.1816 8.80699 14.2888 8.8519 14.3843 8.91624C14.4798 8.98058 14.5616 9.06309 14.6252 9.15907C14.6888 9.25504 14.7328 9.3626 14.7548 9.47561C14.7768 9.58861 14.7764 9.70483 14.7535 9.81766C14.5399 10.8632 14.1044 11.8506 13.4762 12.7132L13.3035 12.9412L16.505 16.1427C16.6639 16.3001 16.7567 16.5123 16.7642 16.7358C16.7718 16.9593 16.6937 17.1773 16.5458 17.3451C16.398 17.5129 16.1915 17.6179 15.9688 17.6385C15.7461 17.6591 15.524 17.5938 15.3478 17.4559L15.2654 17.3823L12.0639 14.1808C11.1306 14.9162 10.035 15.4179 8.8685 15.6438C7.70195 15.8698 6.49829 15.8135 5.35793 15.4796C4.21757 15.1458 3.17358 14.544 2.31307 13.7247C1.45255 12.9053 0.80046 11.892 0.4112 10.7693C0.0219394 9.64668 -0.0932027 8.44722 0.0753794 7.27101C0.243961 6.09481 0.691379 4.97597 1.3803 4.00785C2.06923 3.03973 2.97968 2.25039 4.03571 1.7057C5.09173 1.16101 6.26271 0.876756 7.45093 0.876655ZM14.9025 0C15.0665 -3.65264e-07 15.2272 0.0460051 15.3664 0.132788C15.5055 0.219571 15.6176 0.343651 15.6897 0.490927L15.7318 0.593495L15.8458 0.924871C15.9661 1.27745 16.1599 1.60045 16.4144 1.87248C16.6689 2.14452 16.9783 2.35939 17.3221 2.50285L17.4842 2.56421L17.8156 2.6773C17.9797 2.73329 18.1235 2.83668 18.2289 2.9744C18.3342 3.11212 18.3964 3.27798 18.4074 3.45102C18.4185 3.62405 18.378 3.79648 18.2911 3.94651C18.2042 4.09653 18.0747 4.21741 17.9191 4.29385L17.8156 4.33593L17.4842 4.4499C17.1317 4.57018 16.8087 4.76399 16.5366 5.01849C16.2646 5.273 16.0497 5.58239 15.9063 5.92619L15.8449 6.08837L15.7318 6.41974C15.6757 6.5838 15.5723 6.72754 15.4345 6.83279C15.2967 6.93804 15.1308 7.00008 14.9578 7.01106C14.7848 7.02204 14.6124 6.98146 14.4624 6.89447C14.3124 6.80747 14.1916 6.67796 14.1153 6.52231L14.0732 6.41974L13.9592 6.08837C13.8389 5.73579 13.6451 5.41279 13.3906 5.14075C13.1361 4.86872 12.8267 4.65385 12.4829 4.51039L12.3207 4.44902L11.9894 4.33593C11.8253 4.27995 11.6815 4.17656 11.5761 4.03884C11.4708 3.90112 11.4086 3.73525 11.3976 3.56222C11.3865 3.38918 11.427 3.21675 11.5139 3.06673C11.6008 2.9167 11.7303 2.79583 11.8859 2.71938L11.9894 2.6773L12.3207 2.56334C12.6733 2.44306 12.9963 2.24925 13.2684 1.99475C13.5404 1.74024 13.7553 1.43085 13.8987 1.08705L13.9601 0.924871L14.0732 0.593495C14.1322 0.420432 14.244 0.270172 14.3927 0.16375C14.5414 0.0573281 14.7196 7.29615e-05 14.9025 0ZM14.9025 2.80179C14.6951 3.06277 14.4586 3.29924 14.1977 3.50662C14.4595 3.71409 14.6944 3.94904 14.9025 4.21145C15.11 3.94962 15.3449 3.71468 15.6073 3.50662C15.3463 3.29924 15.1099 3.06277 14.9025 2.80179Z'

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
)
const AISearchIcon = () => (
  <svg viewBox="0 0 19 18" width={19} height={18} aria-hidden="true" style={{ flex: 'none' }}><path fillRule="evenodd" clipRule="evenodd" d={AI_SEARCH} fill="#0D99FF" /></svg>
)
const Arrow = () => (
  <svg width="20" height="24" viewBox="0 0 20 24" aria-hidden="true"><path d="M2 1.5v18.5l4.8-4.6 3.4 7.2 3.1-1.5-3.3-7h6.6z" fill="#131e29" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
)
const IBeam = () => (
  <svg width="14" height="24" viewBox="0 0 14 24" aria-hidden="true"><path d="M3 2h3l1 1 1-1h3M7 3v18M3 22h3l1-1 1 1h3" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" /><path d="M3 2h3l1 1 1-1h3M7 3v18M3 22h3l1-1 1 1h3" fill="none" stroke="#131e29" strokeWidth="1.5" strokeLinecap="round" /></svg>
)

// ── Geometry (px, measured from the Figma shell bar at 1×) ─────────────────
const FIELD_W = 400
function shellX(w: number) {
  const avatar = w - 48 - 32, more = avatar - 8 - 36, help = more - 8 - 36, bell = help - 8 - 36
  const fieldR = bell - 8
  return { avatar, more, help, bell, fieldR, field: fieldR - FIELD_W }
}

type FieldState = 'default' | 'hover' | 'active' | 'typing' | 'typed'
function Field({ state, text = '', clearHover = false }: { state: FieldState; text?: string; clearHover?: boolean }) {
  const cls = state === 'hover' ? 'is-hover' : state === 'default' ? '' : 'is-active'
  const focused = state === 'active' || state === 'typing' || state === 'typed'
  const overflow = text.length > (state === 'typed' ? 42 : 46) // the field scrolls to keep the caret in view
  return (
    <div className={`sa-field ${cls}`}>
      <span className="sa-text" style={focused && overflow ? { justifyContent: 'flex-end' } : undefined}>
        {text
          ? <><span className="val" style={{ flex: focused ? 'none' : undefined }}>{text}</span>{focused && <i className="sa-caret" />}</>
          : <>{focused && <i className="sa-caret" style={{ marginLeft: 0, marginRight: 1 }} />}<span className="sa-ph">{PLACEHOLDER}</span></>}
      </span>
      {state === 'typed' && <span className={`sa-clear ${clearHover ? 'is-hover' : ''}`}><Ico d={P.decline} /></span>}
      <AISearchIcon />
    </div>
  )
}

function Shell({ w, y, field, left = 0 }: { w: number; y: number; field: ReactNode; left?: number }) {
  const x = shellX(w)
  return (
    <div className="sa-shell" style={{ top: y, width: w, left }}>
      <img src={`${A}sap-logo.png`} alt="SAP" className="sa-abs" style={{ left: 56, top: 11, width: 59, height: 29 }} />
      <span className="sa-pname" style={{ left: 125 }}>Product Name</span>
      <div className="sa-abs" style={{ left: x.field, top: 0 }}>{field}</div>
      <span className="sa-btn" style={{ left: x.bell }}><Ico d={P.bell} /></span>
      <span className="sa-btn" style={{ left: x.help }}><Ico d={P.help} /></span>
      <span className="sa-btn" style={{ left: x.more }}><Ico d={P.overflow} /></span>
      <span className="sa-avatar" style={{ left: x.avatar }}><img src={`${A}avatar.png`} alt="" /></span>
    </div>
  )
}

// ── Annotation primitives ───────────────────────────────────────────────
function HDim({ x1, x2, y, label, below = false }: { x1: number; x2: number; y: number; label: string; below?: boolean }) {
  return (
    <div className="sa-dim" style={{ left: x1, top: y, width: x2 - x1 }}>
      <span className="ln" style={{ left: 0, right: 0, top: 0, height: 1 }} />
      <span className="ln" style={{ left: 0, top: -5, width: 1, height: 11 }} />
      <span className="ln" style={{ right: 0, top: -5, width: 1, height: 11 }} />
      <span className="lb" style={{ left: '50%', top: below ? 8 : -26, transform: 'translateX(-50%)' }}>{label}</span>
    </div>
  )
}
function VDim({ x, y1, y2, label, side = 'right' }: { x: number; y1: number; y2: number; label: string; side?: 'left' | 'right' }) {
  return (
    <div className="sa-dim" style={{ left: x, top: y1, height: y2 - y1, width: 0 }}>
      <span className="ln" style={{ top: 0, bottom: 0, left: 0, width: 1 }} />
      <span className="ln" style={{ top: 0, left: -5, height: 1, width: 11 }} />
      <span className="ln" style={{ bottom: 0, left: -5, height: 1, width: 11 }} />
      <span className="lb" style={{ top: '50%', transform: 'translateY(-50%)', ...(side === 'right' ? { left: 10 } : { right: 10 }) }}>{label}</span>
    </div>
  )
}
function Mk({ n, x, y, to, show = true }: { n: number; x: number; y: number; to?: number; show?: boolean }) {
  return (
    <>
      {to !== undefined && <span className="sa-lead" style={{ left: x, top: Math.min(y, to), height: Math.abs(to - y), opacity: show ? 1 : 0 }} />}
      <span className="sa-mk" style={{ left: x, top: y, opacity: show ? 1 : 0 }}>{n}</span>
    </>
  )
}

// ── Stage: draws a fixed-size canvas and scales it to the container ───────
function Stage({ w, h, label, minWidth = 0, maxScale = 1.25, crop, children }: { w: number; h: number; label: string; minWidth?: number; maxScale?: number; crop?: [number, number]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(w)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(([e]) => setCw(Math.max(minWidth, e.contentRect.width)))
    ro.observe(el); return () => ro.disconnect()
  }, [minWidth])
  const c = crop && cw < 700 ? crop : [0, w]
  const s = Math.min(maxScale, cw / (c[1] - c[0]))
  const tx = Math.max(0, (cw - (c[1] - c[0]) * s) / 2) - c[0] * s
  return (
    <div ref={ref} className="sa-scroll">
      <div className="sa-stage" role="img" aria-label={label} style={{ height: h * s, width: minWidth ? Math.max(minWidth, cw) : undefined }}>
        <div className="sa-canvas" style={{ width: w, height: h, transform: `translate(${tx}px,0) scale(${s})` }}>{children}</div>
      </div>
    </div>
  )
}

// ── Looping timeline (pauses off-screen; respects reduced motion) ────────
type Seg = { key: string; label: string; d: number }
function useLoop(segs: Seg[], rootRef: React.RefObject<HTMLElement | null>, restAt: number) {
  const total = segs.reduce((a, s) => a + s.d, 0)
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [t, setT] = useState(reduce ? restAt : 0)
  const [paused, setPaused] = useState(!!reduce)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = rootRef.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el); return () => io.disconnect()
  }, [rootRef])
  useEffect(() => {
    if (paused || !inView) return
    let raf = 0, last = performance.now()
    const tick = (now: number) => { setT(p => (p + (now - last)) % total); last = now; raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, inView, total])
  let acc = 0, idx = 0
  for (let i = 0; i < segs.length; i++) { if (t < acc + segs[i].d) { idx = i; break } acc += segs[i].d }
  const starts = segs.map((_, i) => segs.slice(0, i).reduce((a, s) => a + s.d, 0))
  return { t, idx, local: t - acc, total, paused, setPaused, jump: (i: number, offset = 0) => { setT(starts[i] + offset); setPaused(true) } }
}

function Rail({ segs, idx, local, paused, onJump, onToggle, notes }: { segs: Seg[]; idx: number; local: number; paused: boolean; onJump: (i: number) => void; onToggle: () => void; notes?: ReactNode }) {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="chip" onClick={onToggle} aria-label={paused ? 'Play animation' : 'Pause animation'}>{paused ? '▶ Play' : '❚❚ Pause'}</button>
        {segs.map((s, i) => (
          <button key={s.key} type="button" className="chip relative overflow-hidden" aria-pressed={i === idx} onClick={() => onJump(i)}>
            <span className="relative">{String(i + 1).padStart(2, '0')} · {s.label}</span>
            {i === idx && !paused && <span aria-hidden className="absolute left-0 bottom-0 h-[2px] bg-white/70" style={{ width: `${Math.min(100, (local / s.d) * 100)}%` }} />}
          </button>
        ))}
      </div>
      {notes}
    </div>
  )
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <ol className="grid sm:grid-cols-2 gap-x-10 mt-6">
      {items.map(([t, d], i) => (
        <li key={t} className="flex gap-4 py-3 hairline-top">
          <span className="w-6 h-6 shrink-0 rounded-full grid place-items-center text-caption" style={{ background: '#1d2d3e', color: '#fff', boxShadow: '0 0 0 1px rgba(255,255,255,.4)' }}>{i + 1}</span>
          <span className="text-body-sm text-ink-2"><span className="text-white">{t}</span> — {d}</span>
        </li>
      ))}
    </ol>
  )
}

// ═══ 01 · Anatomy & spacing ═════════════════════════════════════════════
function Anatomy() {
  const O = 60, W = 1440, Y = 104, r = shellX(W)
  const x = { field: r.field + O, fieldR: r.fieldR + O, bell: r.bell + O, help: r.help + O, more: r.more + O, avatar: r.avatar + O }
  const Z = { x: 360 + O, y: 292, s: 2 } // 2× detail of the field
  const zx = (v: number) => Z.x + v * Z.s, zy = (v: number) => Z.y + v * Z.s
  return (
    <Stage w={W + 2 * O} h={430} minWidth={720} maxScale={1} label="Annotated SAP shell bar with the AI search field: spacing and sizes">
      <Shell w={W} y={Y} left={O} field={<Field state="default" />} />
      {/* outer spacing */}
      <HDim x1={O} x2={O + 56} y={Y - 18} label="56" />
      <HDim x1={O + 115} x2={O + 125} y={Y - 18} label="10" />
      <HDim x1={x.field} x2={x.fieldR} y={Y - 18} label="400" />
      <HDim x1={O + W - 48} x2={O + W} y={Y - 18} label="48" />
      <VDim x={O - 12} y1={Y} y2={Y + 52} label="52" side="left" />
      <HDim x1={x.fieldR} x2={x.bell} y={Y + 70} label="8" below />
      <HDim x1={x.help} x2={x.help + 36} y={Y + 70} label="36" below />
      <HDim x1={x.more - 8} x2={x.more} y={Y + 70} label="8" below />
      <HDim x1={x.avatar} x2={x.avatar + 32} y={Y + 70} label="32" below />
      {/* element markers */}
      <Mk n={1} x={O + 85} y={34} to={Y + 11} />
      <Mk n={2} x={O + 176} y={34} to={Y + 18} />
      <Mk n={3} x={x.field + 120} y={34} to={Y + 8} />
      <Mk n={4} x={x.fieldR - 18} y={34} to={Y + 17} />
      <Mk n={5} x={x.help + 18} y={34} to={Y + 8} />
      <Mk n={6} x={x.avatar + 16} y={34} to={Y + 10} />
      {/* 2× detail */}
      <span className="sa-abs" style={{ left: Z.x, top: Z.y - 64, font: "700 13px/1 '72', Arial", color: '#556b81', letterSpacing: '.04em' }}>SEARCH FIELD · TYPED STATE · DETAIL AT 2×</span>
      <div className="sa-abs" style={{ left: Z.x, top: Z.y - 8 * Z.s, transform: `scale(${Z.s})`, transformOrigin: '0 0' }}>
        <Field state="typed" text="Current status & end date of" />
      </div>
      <HDim x1={zx(0)} x2={zx(14)} y={Z.y - 14} label="14" />
      <HDim x1={zx(FIELD_W - 9 - 19 - 8 - 24)} x2={zx(FIELD_W - 9 - 19 - 8)} y={Z.y - 14} label="24" />
      <HDim x1={zx(FIELD_W - 9 - 19 - 8)} x2={zx(FIELD_W - 9 - 19)} y={zy(36) + 14} label="8" below />
      <HDim x1={zx(FIELD_W - 9 - 19)} x2={zx(FIELD_W - 9)} y={Z.y - 14} label="19" />
      <HDim x1={zx(FIELD_W - 9)} x2={zx(FIELD_W)} y={zy(36) + 14} label="9" below />
      <VDim x={zx(FIELD_W) + 20} y1={zy(0)} y2={zy(36)} label="36" />
      <span className="sa-note" style={{ left: zx(0) - 276, top: zy(18) - 30 }}><b>Pill · radius 18</b><br />1px #556B81, 2px #0064D9 on focus</span>
      <span className="sa-lead" style={{ left: zx(0) - 26, top: zy(18), height: 0, width: 26, borderLeft: 0, borderTop: '1px dashed #1d2d3e' }} />
      <span className="sa-note" style={{ left: zx(FIELD_W) + 70, top: zy(18) - 30 }}><b>72 Regular 14 · #131E29</b><br />placeholder #556B81</span>
    </Stage>
  )
}

// ═══ 02 · Field states ══════════════════════════════════════════════════
const STATE_SEGS: Seg[] = [
  { key: 'default', label: 'Default', d: 1800 },
  { key: 'hover', label: 'Hover', d: 1800 },
  { key: 'active', label: 'Active', d: 1700 },
  { key: 'typing', label: 'Typing', d: QUERY.length * 45 + 400 },
  { key: 'typed', label: 'Typed', d: 2800 },
]
const STATE_NOTES: Record<string, ReactNode> = {
  default: <><b>Default</b> · 1px #556B81 border · radius 18 · placeholder · AI-search icon</>,
  hover: <><b>Hover</b> · border turns #0064D9 with a soft inner glow · text cursor</>,
  active: <><b>Active</b> · 2px #0064D9 focus border · caret at start · placeholder until first key</>,
  typing: <><b>Typing</b> · text scrolls to keep the caret in view · suggestions open (see 03)</>,
  typed: <><b>Typed</b> · clear (×) appears 8px before the AI icon · Enter runs the search</>,
}
function States() {
  const W = 960, Y = 40, x = shellX(W), ref = useRef<HTMLDivElement>(null)
  const L = useLoop(STATE_SEGS, ref, STATE_SEGS.slice(0, 4).reduce((a, s) => a + s.d, 0) + 300)
  const k = STATE_SEGS[L.idx].key as FieldState
  const text = k === 'typing' ? QUERY.slice(0, Math.floor(L.local / 45)) : k === 'typed' ? QUERY : ''
  const fy = Y + 8, cx = x.field
  const cur = k === 'default' ? { l: cx + 250, t: 150, ib: false, o: 1 }
    : k === 'hover' || k === 'active' ? { l: cx + 120, t: fy + 6, ib: true, o: 1 }
    : k === 'typing' ? { l: cx + 120, t: fy + 6, ib: true, o: 0 }
    : { l: cx + FIELD_W - 9 - 19 - 8 - 12, t: fy + 14, ib: false, o: 1 }
  return (
    <div ref={ref}>
      <Stage w={W} h={190} crop={[x.field - 24, W]} label="Animated search field states: default, hover, active, typing, typed">
        <Shell w={W} y={Y} field={<Field state={k} text={text} clearHover={k === 'typed' && L.local > 700} />} />
        {k === 'active' && <span key="ring" className="sa-ring" style={{ left: cx + 126, top: fy + 18 }} />}
        <span className="sa-cursor" style={{ left: cur.l, top: cur.t, opacity: cur.o }}>{cur.ib ? <IBeam /> : <Arrow />}</span>
        <span className="sa-lead" style={{ left: cx + 200, top: fy + 40, height: 34 }} />
        <span className="sa-note" style={{ left: cx + 200, top: fy + 76, transform: 'translateX(-50%)' }}>{STATE_NOTES[k]}</span>
      </Stage>
      <Rail segs={STATE_SEGS} idx={L.idx} local={L.local} paused={L.paused} onJump={i => L.jump(i, i === 3 ? QUERY.length * 30 : 0)} onToggle={() => L.setPaused(!L.paused)} />
    </div>
  )
}

// ═══ 03 · Suggestions & type-ahead ══════════════════════════════════════
type Sug = { t: string; app: string; icon: 'history' | 'ai' | 'search' }
const OPEN_GROUPS: [string, Sug[]][] = [
  ['Recent searches', [
    { t: 'Pending POs', app: 'S/4HANA Cloud', icon: 'history' },
    { t: 'Flight to Bangalore', app: 'Concur', icon: 'history' },
    { t: 'Draft goals for product design team', app: 'SuccessFactors', icon: 'history' },
  ]],
  ['Suggested for you', [
    { t: 'SOWs expiring this month', app: 'Fieldglass', icon: 'ai' },
    { t: 'Invoices awaiting my approval', app: 'S/4HANA Cloud', icon: 'ai' },
  ]],
]
export const TYPEAHEAD: Sug[] = [
  { t: 'Current status & end date of SOW IDs for CyberSecure Ltd', app: 'Fieldglass', icon: 'search' },
  { t: 'Current status of PO 4500012345 (ACME)', app: 'S/4HANA Cloud', icon: 'search' },
  { t: 'Current trip — SFO → BLR, Jun 10–17', app: 'Concur', icon: 'search' },
  { t: 'Current quarter goals — Product Design team', app: 'SuccessFactors', icon: 'search' },
]
const SUG_SEGS: Seg[] = [
  { key: 'open', label: 'Focus: recent & suggested', d: 2400 },
  { key: 'cur', label: 'Type-ahead', d: 2000 },
  { key: 'narrow', label: 'Refine', d: 2200 },
  { key: 'key', label: 'Arrow keys', d: 1400 },
  { key: 'enter', label: 'Enter', d: 2400 },
]
function hl(t: string, q: string) {
  const i = t.toLowerCase().indexOf(q.toLowerCase())
  if (!q || i < 0) return t
  return <>{t.slice(0, i)}<b>{t.slice(i, i + q.length)}</b>{t.slice(i + q.length)}</>
}
function Row({ s, q, focus }: { s: Sug; q: string; focus?: boolean }) {
  return (
    <div className={`sa-row ${focus ? 'is-focus' : ''}`}>
      <span className="ic"><Ico d={s.icon === 'history' ? P.history : s.icon === 'ai' ? P.ai : P.search} /></span>
      <span className="t">{hl(s.t, q)}</span><span className="app">{s.app}</span>
    </div>
  )
}
function Suggestions() {
  const W = 960, Y = 24, x = shellX(W), ref = useRef<HTMLDivElement>(null)
  const L = useLoop(SUG_SEGS, ref, 2400 + 2000 + 2200 + 200)
  const k = SUG_SEGS[L.idx].key
  const typed = k === 'open' ? '' : k === 'cur' ? 'Cur'.slice(0, 1 + Math.floor(L.local / 140)) : k === 'narrow' ? 'Current status'.slice(0, Math.min(14, 3 + Math.floor(L.local / 80))) : k === 'key' ? 'Current status' : QUERY
  const list = typed.length >= 'Current s'.length ? TYPEAHEAD.filter(s => s.t.toLowerCase().includes(typed.toLowerCase())) : TYPEAHEAD
  const open = k !== 'enter'
  const popTop = Y + 8 + 36 + 4, px = x.field, row1 = popTop + 8 + 32 + 22
  return (
    <div ref={ref}>
      <Stage w={W} h={390} crop={[x.field - 40, W]} label="Animated suggestions dropdown and type-ahead behaviour">
        <Shell w={W} y={Y} field={<Field state={k === 'enter' ? 'typed' : typed ? 'typing' : 'active'} text={typed} />} />
        <div className={`sa-pop ${open ? '' : 'is-closed'}`} style={{ left: px, top: popTop }}>
          {k === 'open'
            ? OPEN_GROUPS.map(([g, items]) => <div key={g}><div className="sa-gh">{g}</div>{items.map(s => <Row key={s.t} s={s} q="" />)}</div>)
            : <><div className="sa-gh">Suggestions</div>{list.map((s, i) => <Row key={s.t} s={s} q={typed} focus={k === 'key' && i === 0} />)}</>}
        </div>
        <Mk n={1} x={px + 480 + 22} y={popTop + 14} show={open} />
        <Mk n={2} x={px - 22} y={popTop + 8 + 18} show={open} />
        <Mk n={3} x={px - 22} y={row1} show={k === 'cur' || k === 'narrow'} />
        <Mk n={4} x={px + 480 + 22} y={row1} show={open} />
        <Mk n={5} x={px - 22} y={row1} show={k === 'key'} />
        {k === 'key' && <span className="sa-abs" style={{ left: px + 480 + 44, top: row1 - 13 }}><span className="sa-key">↓</span></span>}
        {k === 'enter' && <>
          <span className="sa-abs" style={{ left: px + 120, top: popTop + 26 }}><span className="sa-key">Enter ⏎</span></span>
          <Mk n={6} x={px + 96} y={popTop + 39} />
          <span className="sa-note" style={{ left: px + 210, top: popTop + 20 }}>Runs the search → unified results page</span>
        </>}
      </Stage>
      <Rail segs={SUG_SEGS} idx={L.idx} local={L.local} paused={L.paused} onJump={i => L.jump(i, i === 1 ? 900 : i === 2 ? 1500 : 0)} onToggle={() => L.setPaused(!L.paused)} />
    </div>
  )
}

// ═══ Export ═════════════════════════════════════════════════════════════
export default function SearchAnatomy() {
  return (
    <div className="space-y-16 mt-10">
      <figure className="m-0">
        <figcaption className="mb-5"><p className="text-overline text-ink-3">Anatomy & spacing</p><p className="text-body text-ink-2 mt-2 max-w-[65ch]">The AI search lives in the SAP shell bar of every product, so it looks and sits the same everywhere. Measurements at 1×.</p></figcaption>
        <Anatomy />
        <Legend items={[
          ['SAP logo', '59×29, 56 from the left edge'],
          ['Product name', '72 Bold 16, 10 after the logo'],
          ['AI search field', '400×36 pill, 8 before the first action'],
          ['AI search icon', '19×18, the only trailing icon: it marks the search as AI-powered'],
          ['Shell actions', 'notifications, help, more: 36×36 buttons, 16px icons, 8 apart'],
          ['Avatar', '32, 48 from the right edge. Shell bar: 52 high, white, Horizon shadow'],
        ]} />
      </figure>
      <figure className="m-0">
        <figcaption className="mb-5"><p className="text-overline text-ink-3">States</p><p className="text-body text-ink-2 mt-2 max-w-[65ch]">Default, hover, active, typing and typed, on a loop. Pick a state to pause on it.</p></figcaption>
        <States />
      </figure>
      <figure className="m-0">
        <figcaption className="mb-5"><p className="text-overline text-ink-3">Suggestions & type-ahead</p><p className="text-body text-ink-2 mt-2 max-w-[65ch]">One list across every SAP application, from the first focus to Enter.</p></figcaption>
        <Suggestions />
        <Legend items={[
          ['Popover', 'opens 4px below the field on focus · 480 wide · radius 12 · Horizon shadow'],
          ['Group header', '"Recent searches" and "Suggested for you" on focus; one "Suggestions" group once typing starts'],
          ['Type-ahead', 'matched characters in bold; the list updates on every keystroke, 44px rows'],
          ['Source application', 'each suggestion names the SAP product it comes from: one search across all of them'],
          ['Keyboard', '↑ / ↓ moves through the rows while the caret stays in the field'],
          ['Enter or click', 'fills the field, closes the list and opens the unified results page'],
        ]} />
      </figure>
    </div>
  )
}
