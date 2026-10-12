import type { CSSProperties, ReactNode } from 'react'
import { easeInOut, clamp } from './engine'
import '../components/case/search-anatomy.css'

// Light "product UI" building blocks for the Search film. Geometry matches the Figma shell bar (see SearchAnatomy).
export const A = `${import.meta.env.BASE_URL}images/case-studies/sap-search/`
export const L = { bg: '#F5F6F7', white: '#fff', ink: '#131E29', sub: '#556B81', blue: '#0064D9', line: '#D9DEE2', ai: '#0D99FF', violet: '#7B2FF7', violetBg: '#F4EEFF', green: '#188918', greenBg: '#E8F6EA', red: '#D20A0A', redBg: '#FFEAF4', amber: '#E9730C', amberBg: '#FFF3E0', pink: '#D1006E' }
export const FONT72 = "'72','72full',Arial,Helvetica,sans-serif"

const P = {
  bell: 'M8 1c2.21 0 3.628.956 4.451 2.315.789 1.302.99 2.902.99 4.19v.636c0 1.072.341 1.976.691 2.62.189.347.41.678.669.974.442.469.098 1.265-.546 1.265h-3.837c-.281 1.15-1.256 2-2.418 2-1.162 0-2.137-.85-2.418-2H1.745c-.646 0-.989-.798-.544-1.267a5.19 5.19 0 0 0 .666-.971c.35-.645.691-1.55.691-2.621v-.636c0-1.288.202-2.888.99-4.19C4.372 1.955 5.791 1 8 1Zm0 1.5c-1.695 0-2.621.69-3.167 1.592-.582.96-.774 2.237-.774 3.413v.636c0 1.404-.45 2.563-.885 3.359h9.652c-.436-.795-.886-1.955-.886-3.36v-.635c0-1.176-.191-2.453-.773-3.413C10.621 3.19 9.695 2.5 8 2.5Z',
  help: 'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8a2.99 2.99 0 0 1 .75 5.884v.366a.75.75 0 0 1-1.5 0V8.231c0-.547.407-.716.904-.757.498-.042 1.346-.54 1.346-1.483A1.49 1.49 0 0 0 8 4.5c-.883 0-1.414.582-1.504 1.567A.75.75 0 0 1 5 5.991 2.99 2.99 0 0 1 8 3Z',
  overflow: 'M2 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
  history: 'M7.92 0C12.394 0 16 3.55 16 8s-3.606 8-8.08 8C4.066 16 .832 13.341.02 9.778a.751.751 0 0 1 1.463-.334C2.139 12.325 4.766 14.5 7.92 14.5c3.662 0 6.58-2.895 6.58-6.5s-2.918-6.5-6.58-6.5C5.38 1.5 3.143 2.927 2.06 5h3.19a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 5.75v-5a.75.75 0 0 1 1.5 0v2.362A8.155 8.155 0 0 1 7.92 0Zm-.17 3a.75.75 0 0 1 .75.75v3.866l2.703 2.04a.75.75 0 0 1-.905 1.196l-3-2.263A.751.751 0 0 1 7 7.99V3.75A.75.75 0 0 1 7.75 3Z',
  decline: 'M11.72 3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 1 1 1.06-1.06L8 6.94l3.72-3.72Z',
  search: 'M7 1a6 6 0 0 1 4.738 9.678l3.042 3.042a.75.75 0 1 1-1.06 1.06l-3.042-3.042A6 6 0 1 1 7 1Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z',
  ai: 'M4.774 5.518c.23-.69 1.222-.69 1.452 0 .811 2.38 1.873 3.441 4.256 4.252.69.24.69 1.23 0 1.46-2.383.811-3.445 1.871-4.256 4.253-.23.69-1.222.69-1.452 0C3.963 13.1 2.9 12.04.518 11.23c-.69-.24-.69-1.231 0-1.461 2.383-.81 3.445-1.871 4.256-4.252Zm7.83-5.234a.417.417 0 0 1 .791 0c.44 1.298 1.02 1.877 2.32 2.317.38.13.38.669 0 .799-1.3.439-1.88 1.018-2.32 2.316a.417.417 0 0 1-.79 0c-.44-1.298-1.02-1.877-2.32-2.316a.423.423 0 0 1 0-.8c1.3-.439 1.88-1.018 2.32-2.316Z',
}

const AI_SEARCH = 'M7.45093 0.876655C7.95939 0.876655 8.45908 0.927501 8.94037 1.02569C9.16822 1.07195 9.36836 1.20684 9.49676 1.40067C9.62516 1.59451 9.6713 1.83141 9.62504 2.05926C9.57877 2.28712 9.44388 2.48726 9.25005 2.61566C9.05621 2.74406 8.81931 2.7902 8.59146 2.74393C7.4873 2.51868 6.34115 2.62588 5.29792 3.05197C4.25468 3.47806 3.3612 4.20391 2.73045 5.13775C2.0997 6.07159 1.76 7.17148 1.7543 8.29836C1.7486 9.42524 2.07715 10.5285 2.69842 11.4687C3.31968 12.4089 4.20576 13.1437 5.24464 13.5803C6.28351 14.017 7.42851 14.1358 8.53489 13.9217C9.64127 13.7076 10.6593 13.1703 11.4604 12.3777C12.2614 11.5851 12.8095 10.5728 13.0352 9.46875C13.0581 9.35593 13.103 9.24872 13.1674 9.15326C13.2317 9.05779 13.3142 8.97593 13.4102 8.91235C13.5062 8.84878 13.6137 8.80472 13.7267 8.78272C13.8397 8.76071 13.956 8.76117 14.0688 8.78408C14.1816 8.80699 14.2888 8.8519 14.3843 8.91624C14.4798 8.98058 14.5616 9.06309 14.6252 9.15907C14.6888 9.25504 14.7328 9.3626 14.7548 9.47561C14.7768 9.58861 14.7764 9.70483 14.7535 9.81766C14.5399 10.8632 14.1044 11.8506 13.4762 12.7132L13.3035 12.9412L16.505 16.1427C16.6639 16.3001 16.7567 16.5123 16.7642 16.7358C16.7718 16.9593 16.6937 17.1773 16.5458 17.3451C16.398 17.5129 16.1915 17.6179 15.9688 17.6385C15.7461 17.6591 15.524 17.5938 15.3478 17.4559L15.2654 17.3823L12.0639 14.1808C11.1306 14.9162 10.035 15.4179 8.8685 15.6438C7.70195 15.8698 6.49829 15.8135 5.35793 15.4796C4.21757 15.1458 3.17358 14.544 2.31307 13.7247C1.45255 12.9053 0.80046 11.892 0.4112 10.7693C0.0219394 9.64668 -0.0932027 8.44722 0.0753794 7.27101C0.243961 6.09481 0.691379 4.97597 1.3803 4.00785C2.06923 3.03973 2.97968 2.25039 4.03571 1.7057C5.09173 1.16101 6.26271 0.876756 7.45093 0.876655ZM14.9025 0C15.0665 -3.65264e-07 15.2272 0.0460051 15.3664 0.132788C15.5055 0.219571 15.6176 0.343651 15.6897 0.490927L15.7318 0.593495L15.8458 0.924871C15.9661 1.27745 16.1599 1.60045 16.4144 1.87248C16.6689 2.14452 16.9783 2.35939 17.3221 2.50285L17.4842 2.56421L17.8156 2.6773C17.9797 2.73329 18.1235 2.83668 18.2289 2.9744C18.3342 3.11212 18.3964 3.27798 18.4074 3.45102C18.4185 3.62405 18.378 3.79648 18.2911 3.94651C18.2042 4.09653 18.0747 4.21741 17.9191 4.29385L17.8156 4.33593L17.4842 4.4499C17.1317 4.57018 16.8087 4.76399 16.5366 5.01849C16.2646 5.273 16.0497 5.58239 15.9063 5.92619L15.8449 6.08837L15.7318 6.41974C15.6757 6.5838 15.5723 6.72754 15.4345 6.83279C15.2967 6.93804 15.1308 7.00008 14.9578 7.01106C14.7848 7.02204 14.6124 6.98146 14.4624 6.89447C14.3124 6.80747 14.1916 6.67796 14.1153 6.52231L14.0732 6.41974L13.9592 6.08837C13.8389 5.73579 13.6451 5.41279 13.3906 5.14075C13.1361 4.86872 12.8267 4.65385 12.4829 4.51039L12.3207 4.44902L11.9894 4.33593C11.8253 4.27995 11.6815 4.17656 11.5761 4.03884C11.4708 3.90112 11.4086 3.73525 11.3976 3.56222C11.3865 3.38918 11.427 3.21675 11.5139 3.06673C11.6008 2.9167 11.7303 2.79583 11.8859 2.71938L11.9894 2.6773L12.3207 2.56334C12.6733 2.44306 12.9963 2.24925 13.2684 1.99475C13.5404 1.74024 13.7553 1.43085 13.8987 1.08705L13.9601 0.924871L14.0732 0.593495C14.1322 0.420432 14.244 0.270172 14.3927 0.16375C14.5414 0.0573281 14.7196 7.29615e-05 14.9025 0ZM14.9025 2.80179C14.6951 3.06277 14.4586 3.29924 14.1977 3.50662C14.4595 3.71409 14.6944 3.94904 14.9025 4.21145C15.11 3.94962 15.3449 3.71468 15.6073 3.50662C15.3463 3.29924 15.1099 3.06277 14.9025 2.80179Z'

export const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
)
export const AISearchIcon = () => (
  <svg viewBox="0 0 19 18" width={19} height={18} aria-hidden="true" style={{ flex: 'none' }}><path fillRule="evenodd" clipRule="evenodd" d={AI_SEARCH} fill="#0D99FF" /></svg>
)
export { P }

export const FIELD_W = 400
export function shellX(w: number) {
  const avatar = w - 48 - 32, more = avatar - 8 - 36, help = more - 8 - 36, bell = help - 8 - 36
  const fieldR = bell - 8
  return { avatar, more, help, bell, fieldR, field: fieldR - FIELD_W }
}

export type FieldState = 'default' | 'hover' | 'active' | 'typing' | 'typed'
export function Field({ t = 0, state, text = '', ph = 'Search across all applications...', clearHover = false }: { t?: number; state: FieldState; text?: string; ph?: string; clearHover?: boolean }) {
  const cls = state === 'hover' ? 'is-hover' : state === 'default' ? '' : 'is-active'
  const focused = state === 'active' || state === 'typing' || state === 'typed'
  const overflow = text.length > (state === 'typed' ? 42 : 46)
  const caret = <i className="sa-caret" style={{ animation: 'none', opacity: Math.sin(t * 7) > -0.2 ? 1 : 0, marginLeft: text ? 1 : 0, marginRight: text ? 0 : 1 }} />
  return (
    <div className={`sa-field ${cls}`} style={{ position: 'relative', top: 0, transition: 'none' }}>
      <span className="sa-text" style={focused && overflow ? { justifyContent: 'flex-end' } : undefined}>
        {text
          ? <><span className="val" style={{ flex: focused ? 'none' : undefined }}>{text}</span>{focused && caret}</>
          : <>{focused && caret}<span className="sa-ph">{ph}</span></>}
      </span>
      {state === 'typed' && <span className={`sa-clear ${clearHover ? 'is-hover' : ''}`}><Ico d={P.decline} /></span>}
      <AISearchIcon />
    </div>
  )
}

/** The shell bar: 52px tall, field right-aligned before the bell. */
export function Shell({ w, field, name = 'Product Name', style }: { w: number; field: ReactNode; name?: string; style?: CSSProperties }) {
  const x = shellX(w)
  return (
    <div className="sa-shell" style={{ top: 0, width: w, left: 0, fontFamily: FONT72, ...style }}>
      <img src={`${A}logo-placeholder.png`} alt="" className="sa-abs" style={{ left: 56, top: 11, width: 59, height: 29 }} />
      <span className="sa-pname" style={{ left: 125 }}>{name}</span>
      <div className="sa-abs" style={{ left: x.field, top: 8 }}>{field}</div>
      <span className="sa-btn" style={{ left: x.bell }}><Ico d={P.bell} /></span>
      <span className="sa-btn" style={{ left: x.help }}><Ico d={P.help} /></span>
      <span className="sa-btn" style={{ left: x.more }}><Ico d={P.overflow} /></span>
      <span className="sa-avatar" style={{ left: x.avatar }}><img src={`${A}avatar.png`} alt="" /></span>
    </div>
  )
}

/** Keyframed pointer path: pts = [time, x, y][] */
export function pathAt(t: number, pts: [number, number, number][]): [number, number] {
  if (t <= pts[0][0]) return [pts[0][1], pts[0][2]]
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const [t0, x0, y0] = pts[i - 1], [t1, x1, y1] = pts[i]
      const p = easeInOut(clamp((t - t0) / (t1 - t0)))
      return [x0 + (x1 - x0) * p, y0 + (y1 - y0) * p]
    }
  }
  const l = pts[pts.length - 1]; return [l[1], l[2]]
}
export function Pointer({ x, y, press = 0, show = 1 }: { x: number; y: number; press?: number; show?: number }) {
  if (show <= 0) return null
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 50, opacity: show }}>
      {press > 0 && <span style={{ position: 'absolute', left: -22, top: -22, width: 44, height: 44, borderRadius: '50%', border: '3px solid #0064D9', opacity: 1 - press, transform: `scale(${0.4 + press * 1.1})` }} />}
      <svg width="22" height="28" viewBox="0 0 20 24" style={{ transform: `scale(${1 - (press > 0 && press < 0.35 ? 0.12 : 0)})`, transformOrigin: '2px 2px', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }}><path d="M2 1.5v18.5l4.8-4.6 3.4 7.2 3.1-1.5-3.3-7h6.6z" fill="#131e29" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    </div>
  )
}
/** click ripple progress for a click at time c (0..1 over 0.5s) */
export const press = (t: number, c: number) => (t >= c && t <= c + 0.5 ? (t - c) / 0.5 : 0)
export const typed = (full: string, t: number, a: number, cps: number) => full.slice(0, Math.max(0, Math.min(full.length, Math.floor((t - a) * cps))))

/** Scale a design-size block placed at (left, top). */
export function Scaled({ left, top, k, children, style }: { left: number; top: number; k: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', left, top, transform: `scale(${k})`, transformOrigin: '0 0', ...style }}>{children}</div>
}
