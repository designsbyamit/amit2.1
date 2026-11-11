import type { CSSProperties, ReactNode } from 'react'
import { seg, easeOut, lerp } from '../engine'

/** The shared stage for the cover previews. Every preview is a pure function of time on an 1800 x 1000 stage
 *  (the cover's own ratio): a mesh backdrop, one product surface (a desktop window or a phone) that never moves,
 *  a camera that glides inside it, and a quiet step rail below. With `still` the rail and cursor are left out and
 *  the optional `accent` elements are drawn instead: that is how the static covers are cut from the same scenes. */
export const F = "'Geist Variable','Geist',system-ui,sans-serif"
export const M = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace"
export const STAGE = { w: 1800, h: 1000 }
export const W = 1500, H = 760
export const WIN = { x: 150, y: 76 }
const RAIL_Y = 878
const MESH = `${import.meta.env.BASE_URL}images/mesh/`

/** Light product UI. Lines are hairlines at stage scale (1.5px reads as a crisp single line on the card). */
export const U = { bg: '#F5F7FA', card: '#FFFFFF', line: '#E2E7EE', line2: '#EDF0F4', ink: '#141B24', ink2: '#3A4553', mute: '#647081', faint: '#97A1AE', err: '#B3261E', errBg: '#FDEEEC', ok: '#16794C', okBg: '#E6F4EC', warn: '#8A5A00', warnBg: '#FFF2D9', off: '#E9EDF2', offInk: '#7A8594' }
export const HL = '1.5px'
export const line = (c: string = U.line) => `${HL} solid ${c}`
export const SH = { card: '0 1px 2px rgba(16,24,40,.05), 0 8px 24px -12px rgba(16,24,40,.14)', pop: '0 2px 6px rgba(16,24,40,.08), 0 30px 60px -18px rgba(16,24,40,.32)' }

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
export const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
export const ty = (s: string, t: number, a: number, cps: number) => s.slice(0, clamp(Math.floor((t - a) * cps), 0, s.length))
export const fade = (t: number, a: number, b: number) => seg(t, a, b)
export const fin = (t: number, a: number, d = 0.45) => easeOut(seg(t, a, a + d))
export const clk = (t: number, cs: number[]) => cs.some(c => t >= c && t < c + 0.16)
export const caret = (t: number) => Math.floor(t * 2.2) % 2 === 0
export { easeOut, lerp }

export type Cam = { t: number; s: number; x: number; y: number }
export function camAt(k: Cam[], t: number) {
  if (t <= k[0].t) return k[0]
  for (let i = 0; i < k.length - 1; i++) if (t < k[i + 1].t) { const p = ease(seg(t, k[i].t, k[i + 1].t)); return { t, s: lerp(k[i].s, k[i + 1].s, p), x: lerp(k[i].x, k[i + 1].x, p), y: lerp(k[i].y, k[i + 1].y, p) } }
  return k[k.length - 1]
}
export type Cur = [number, number, number]
function curAt(k: Cur[], t: number) {
  if (t <= k[0][0]) return { x: k[0][1], y: k[0][2] }
  for (let i = 0; i < k.length - 1; i++) if (t < k[i + 1][0]) { const p = ease(seg(t, k[i][0], k[i + 1][0])); return { x: lerp(k[i][1], k[i + 1][1], p), y: lerp(k[i][2], k[i + 1][2], p) } }
  const l = k[k.length - 1]; return { x: l[1], y: l[2] }
}

export const Box = ({ x, y, w, h, s, children }: { x: number; y: number; w?: number; h?: number; s?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', ...s }}>{children}</div>
export const one: CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
export const center: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
export const Txt = ({ x, y, w, h, size, color, weight = 400, mono, s, children }: { x: number; y: number; w: number; h?: number; size: number; color?: string; weight?: number; mono?: boolean; s?: CSSProperties; children?: ReactNode }) =>
  <Box x={x} y={y} w={w} h={h ?? Math.round(size * 1.4)} s={{ fontSize: size, lineHeight: `${h ?? Math.round(size * 1.4)}px`, color, fontWeight: weight, fontFamily: mono ? M : F, letterSpacing: mono ? '.06em' : size >= 30 ? '-.015em' : undefined, ...one, ...s }}>{children}</Box>

/** Line icons, drawn on a 24 grid with a round 1.75 stroke. */
const PATHS: Record<string, string> = {
  check: 'M5 12.5l4.2 4.2L19 7',
  spark: 'M12 3.5l1.9 5.2 5.1 1.8-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.8z',
  search: 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM15.5 15.5L20 20',
  chevR: 'M9.5 6l6 6-6 6', chevD: 'M6 9.5l6 6 6-6', chevL: 'M14.5 6l-6 6 6 6',
  arrowR: 'M5 12h13M13 7l5 5-5 5', arrowUp: 'M12 19V6M7 11l5-5 5 5',
  mail: 'M4 6.5h16v11H4zM4.5 7l7.5 6 7.5-6', doc: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4',
  close: 'M6.5 6.5l11 11M17.5 6.5l-11 11', plus: 'M12 5v14M5 12h14',
  clock: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 7.5V12l3 2',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5',
  plane: 'M10.5 13.5L3.5 11l1.4-1.4 7.1 1.1 4.3-4.3c.8-.8 2.1-.8 2.9 0s.8 2.1 0 2.9l-4.3 4.3 1.1 7.1-1.4 1.4-2.5-7-3 3v2.4l-1.2 1.2-1.4-3.4-3.4-1.4 1.2-1.2H7.5z',
  shield: 'M12 3.5l7 2.8v5.2c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6.3z',
  bars: 'M5 19V11M10 19V6M15 19v-5M20 19V9',
  menu: 'M4 7h16M4 12h16M4 17h16', bell: 'M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5H5zM10 20.5h4',
  undo: 'M8.5 7.5L4.5 11.5l4 4M5 11.5h9a5 5 0 0 1 0 10h-2',
  cal: 'M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4', filter: 'M4.5 6h15M7.5 12h9M10.5 18h3',
  layers: 'M12 4l8.5 4.5L12 13 3.5 8.5zM3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5',
  bolt: 'M13 3L5.5 13.5H12L11 21l7.5-10.5H12z', pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  swap: 'M7 7.5h12M15.5 4l3.5 3.5L15.5 11M17 16.5H5M8.5 13L5 16.5 8.5 20',
  dot: 'M12 12.01',
}
export const Ico = ({ n, s = 22, c = 'currentColor', w = 1.75, fill }: { n: keyof typeof PATHS | string; s?: number; c?: string; w?: number; fill?: string }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: 'block', flex: 'none' }}><path d={PATHS[n]} fill={fill ?? 'none'} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>

export const Pill = ({ x, y, w, h = 30, bg, fg, size = 16, children, s }: { x: number; y: number; w: number; h?: number; bg: string; fg: string; size?: number; children: ReactNode; s?: CSSProperties }) =>
  <Box x={x} y={y} w={w} h={h} s={{ borderRadius: h / 2, background: bg, color: fg, fontSize: size, fontWeight: 500, gap: 6, ...center, ...one, ...s }}>{children}</Box>

const isStill = () => typeof window !== 'undefined' && !!(window as unknown as { __cover?: boolean }).__cover

function Cursor({ t, k, clicks, touch }: { t: number; k: Cur[]; clicks: number[]; touch?: boolean }) {
  if (!k.length) return null
  const p = curAt(k, t); const first = k[0][0], last = k[k.length - 1][0]
  const o = fade(t, first, first + 0.3) * (1 - fade(t, last, last + 0.4))
  const c = clicks.find(c => t >= c && t < c + 0.55)
  const down = clicks.some(c => t >= c && t < c + 0.16)
  return <>
    {c !== undefined && <div style={{ position: 'absolute', left: p.x - 24, top: p.y - 24, width: 48, height: 48, borderRadius: 24, border: `1.5px solid ${touch ? '#fff' : U.ink}`, opacity: 0.5 * (1 - (t - c) / 0.55), transform: `scale(${0.4 + (t - c) / 0.55})`, pointerEvents: 'none' }} />}
    {touch
      ? <div style={{ position: 'absolute', left: p.x - 20, top: p.y - 20, width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,.55)', border: '1.5px solid rgba(255,255,255,.9)', boxShadow: '0 4px 12px rgba(0,0,0,.25)', opacity: o, transform: `scale(${down ? 0.85 : 1})` }} />
      : <svg width="30" height="30" viewBox="0 0 24 24" style={{ position: 'absolute', left: p.x - 3, top: p.y - 2, opacity: o, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.28))', transform: down ? 'scale(.9)' : 'none', transformOrigin: '3px 2px' }}><path d="M4.5 2.5l14 8.6-6.1 1.5-3.4 5.9z" fill="#fff" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" /></svg>}
  </>
}

/** Segmented step rail, under the product surface. */
function Rail({ t, caps, light }: { t: number; caps: [number, string][]; light?: boolean }) {
  let i = 0; for (let k = 0; k < caps.length; k++) if (t >= caps[k][0]) i = k
  const next = i + 1 < caps.length ? caps[i + 1][0] : null
  const fill = (k: number) => (k < i ? 1 : k > i ? 0 : next === null ? 1 : clamp((t - caps[i][0]) / (next - caps[i][0]), 0, 1))
  const lab = caps[i][1], since = t - caps[i][0]
  const c = light ? '20,27,36' : '255,255,255'
  return <>
    <div style={{ position: 'absolute', left: WIN.x, top: RAIL_Y, width: W, height: 3, display: 'flex', gap: 10 }}>
      {caps.map((_, k) => <div key={k} style={{ flex: 1, height: 3, borderRadius: 2, background: `rgba(${c},.22)`, overflow: 'hidden' }}><div style={{ width: `${fill(k) * 100}%`, height: 3, background: `rgba(${c},.92)` }} /></div>)}
    </div>
    <div style={{ position: 'absolute', left: WIN.x, top: RAIL_Y + 22, width: W - 140, height: 40, fontSize: 28, lineHeight: '40px', color: `rgba(${c},.95)`, fontWeight: 450, letterSpacing: '-.005em', opacity: i === 0 ? 1 : fin(since, 0, 0.35), transform: `translateY(${(i === 0 ? 0 : 1 - fin(since, 0, 0.35)) * 6}px)`, ...one }}>{lab}</div>
    <div style={{ position: 'absolute', left: WIN.x + W - 120, top: RAIL_Y + 26, width: 120, height: 32, textAlign: 'right', fontFamily: M, fontSize: 20, lineHeight: '32px', letterSpacing: '.12em', color: `rgba(${c},.6)` }}>{String(i + 1).padStart(2, '0')} / {String(caps.length).padStart(2, '0')}</div>
  </>
}

export type Look = { mesh: string; a: string; tint: string; dark: string; ui?: string; fg?: string; light?: boolean }

/** A backdrop: the case's mesh, lit softly from the top left, with a gentle vignette. */
export function Backdrop({ look }: { look: Look }) {
  return <>
    <div style={{ position: 'absolute', inset: 0, background: look.dark }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${MESH}${look.mesh}-cover.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
  </>
}

/** Desktop: the product window stays put and the camera glides inside it. */
export function Stage({ look, t, cam, cur, clicks = [], caps, accent, children }: { look: Look; t: number; cam: Cam[]; cur: Cur[]; clicks?: number[]; caps: [number, string][]; accent?: ReactNode; children: ReactNode }) {
  const c = camAt(cam, t), still = isStill()
  const tx = clamp(W / 2 - c.x * c.s, W - W * c.s, 0), tyy = clamp(H / 2 - c.y * c.s, H - H * c.s, 0)
  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: F, WebkitFontSmoothing: 'antialiased' }}>
    <Backdrop look={look} />
    <div style={{ position: 'absolute', left: WIN.x - 10, top: WIN.y - 10, width: W + 20, height: H + 20, borderRadius: 28, background: 'rgba(255,255,255,.10)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18)' }} />
    <div style={{ position: 'absolute', left: WIN.x, top: WIN.y, width: W, height: H, borderRadius: 18, overflow: 'hidden', background: look.ui ?? U.bg, color: look.fg ?? U.ink, boxShadow: '0 1px 0 rgba(255,255,255,.4) inset, 0 2px 4px rgba(0,0,0,.10), 0 24px 48px -16px rgba(0,0,0,.35), 0 70px 120px -40px rgba(0,0,0,.45)' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0', transform: `translate(${tx}px,${tyy}px) scale(${c.s})` }}>
        {children}
        {!still && <Cursor t={t} k={cur} clicks={clicks} />}
      </div>
    </div>
    {still ? accent : <Rail t={t} caps={caps} light={look.light} />}
  </div>
}

/** Phone: one portrait device on the mesh; the camera moves the whole world, so the phone can be read up close. */
export const PH = { w: 390, h: 844 }
export function PhoneStage({ look, t, cam, cur, clicks = [], caps, accent, dark, children }: { look: Look; t: number; cam: Cam[]; cur: Cur[]; clicks?: number[]; caps: [number, string][]; accent?: ReactNode; dark?: boolean; children: ReactNode }) {
  const c = camAt(cam, t), still = isStill()
  const k = 0.9, PW = PH.w * k + 24, PHh = PH.h * k + 24
  const px = 900 - PW / 2, py = 30
  const vh = RAIL_Y - 20
  const ox = 900 - c.x * c.s, oy = clamp(vh / 2 - c.y * c.s, vh - (py + PHh + 20) * c.s, 0)
  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: F, WebkitFontSmoothing: 'antialiased' }}>
    <Backdrop look={look} />
    <div style={{ position: 'absolute', left: 0, top: 0, width: 1800, height: 1000, transformOrigin: '0 0', transform: `translate(${ox}px,${oy}px) scale(${c.s})` }}>
      {still && accent}
      <div style={{ position: 'absolute', left: px, top: py, width: PW, height: PHh, borderRadius: 66, background: '#0B0D10', boxShadow: '0 0 0 1.5px rgba(255,255,255,.18) inset, 0 2px 6px rgba(0,0,0,.25), 0 40px 80px -24px rgba(0,0,0,.55)' }}>
        <div style={{ position: 'absolute', left: 12, top: 12, width: PH.w * k, height: PH.h * k, borderRadius: 54, overflow: 'hidden', background: dark ? '#0E1012' : '#fff' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: PH.w, height: PH.h, transformOrigin: '0 0', transform: `scale(${k})`, color: dark ? '#F2F4F5' : U.ink }}>
            {children}
            {!still && <Cursor t={t} k={cur} clicks={clicks} touch />}
            <div style={{ position: 'absolute', left: PH.w / 2 - 62, top: 12, width: 124, height: 34, borderRadius: 17, background: '#000' }} />
            <div style={{ position: 'absolute', left: PH.w / 2 - 68, top: PH.h - 14, width: 136, height: 5, borderRadius: 3, background: dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.35)' }} />
          </div>
        </div>
      </div>
    </div>
    {!still && <Rail t={t} caps={caps} light={look.light} />}
  </div>
}

/** A floating accent card for the covers: crisp white, hairline, soft depth. */
export const Float = ({ x, y, w, h, children, s }: { x: number; y: number; w: number; h?: number; children: ReactNode; s?: CSSProperties }) =>
  <Box x={x} y={y} w={w} h={h} s={{ background: '#fff', borderRadius: 18, border: `1px solid rgba(20,27,36,.06)`, boxShadow: '0 2px 6px rgba(0,0,0,.10), 0 30px 60px -20px rgba(0,0,0,.45)', color: U.ink, fontFamily: F, ...s }}>{children}</Box>
