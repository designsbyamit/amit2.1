import type { CSSProperties, ReactNode } from 'react'
import { seg, easeOut, lerp } from './engine'

/** The short flows that play on the project covers. Each is a pure function of time on an 1800 x 1000 stage
 *  (the cover's own ratio): the product window never moves, the camera moves inside it, and every element sits on a fixed grid.
 *  Illustrative data only. */
const MESH = `${import.meta.env.BASE_URL}images/mesh/`
const F = "'Geist Variable','Geist',system-ui,sans-serif"
const M = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace"
export const STAGE = { w: 1800, h: 1000 }
const W = 1500, H = 760

const U = { bg: '#F3F5F8', card: '#FFFFFF', line: '#DCE2EA', ink: '#18212B', mute: '#5B6776', err: '#B3261E', errBg: '#FDECEA', ok: '#17794F', okBg: '#E4F4EC', warn: '#7A4F00', warnBg: '#FFF1D6', off: '#E6EAEF', offInk: '#677383' }
const A = {
  signin: { mesh: 'sap-signin', a: '#0B4F46', tint: '#E2F0ED', dark: '#062E29' },
  collections: { mesh: 'sap-collections', a: '#005695', tint: '#E3EEF8', dark: '#02223F' },
  search: { mesh: 'sap-search', a: '#111160', tint: '#E8E8F6', dark: '#0A0A3A' },
  cds: { mesh: 'sap-compositional', a: '#4A1B85', tint: '#EEE6F8', dark: '#240A45' },
}
type K = keyof typeof A

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const ty = (s: string, t: number, a: number, cps: number) => s.slice(0, clamp(Math.floor((t - a) * cps), 0, s.length))
const fade = (t: number, a: number, b: number) => seg(t, a, b)
const clk = (t: number, cs: number[]) => cs.some(c => t >= c && t < c + 0.16)
const caret = (t: number) => Math.floor(t * 2) % 2 === 0

type Cam = { t: number; s: number; x: number; y: number }
function camAt(k: Cam[], t: number) {
  if (t <= k[0].t) return k[0]
  for (let i = 0; i < k.length - 1; i++) if (t < k[i + 1].t) { const p = ease(seg(t, k[i].t, k[i + 1].t)); return { s: lerp(k[i].s, k[i + 1].s, p), x: lerp(k[i].x, k[i + 1].x, p), y: lerp(k[i].y, k[i + 1].y, p) } }
  return k[k.length - 1]
}
type Cur = [number, number, number]
function curAt(k: Cur[], t: number) {
  if (t <= k[0][0]) return { x: k[0][1], y: k[0][2] }
  for (let i = 0; i < k.length - 1; i++) if (t < k[i + 1][0]) { const p = ease(seg(t, k[i][0], k[i + 1][0])); return { x: lerp(k[i][1], k[i + 1][1], p), y: lerp(k[i][2], k[i + 1][2], p) } }
  const l = k[k.length - 1]; return { x: l[1], y: l[2] }
}

const Box = ({ x, y, w, h, s, children }: { x: number; y: number; w?: number; h?: number; s?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', ...s }}>{children}</div>
const line1: CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const Txt = ({ x, y, w, h, size, color = U.ink, weight = 400, mono, s, children }: { x: number; y: number; w: number; h?: number; size: number; color?: string; weight?: number; mono?: boolean; s?: CSSProperties; children?: ReactNode }) =>
  <Box x={x} y={y} w={w} h={h ?? Math.round(size * 1.4)} s={{ fontSize: size, lineHeight: `${h ?? Math.round(size * 1.4)}px`, color, fontWeight: weight, fontFamily: mono ? M : F, ...line1, ...s }}>{children}</Box>

function Cursor({ t, k, clicks }: { t: number; k: Cur[]; clicks: number[] }) {
  const p = curAt(k, t); const first = k[0][0], last = k[k.length - 1][0]
  const o = fade(t, first, first + 0.3) * (1 - fade(t, last, last + 0.4))
  const c = clicks.find(c => t >= c && t < c + 0.5)
  return <>
    {c !== undefined && <div style={{ position: 'absolute', left: p.x - 26, top: p.y - 26, width: 52, height: 52, borderRadius: 26, border: `3px solid ${U.ink}`, opacity: 0.55 * (1 - (t - c) / 0.5), transform: `scale(${0.4 + (t - c) / 0.5})`, pointerEvents: 'none' }} />}
    <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: 'absolute', left: p.x - 3, top: p.y - 2, opacity: o, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.35))', transform: clicks.some(c => t >= c && t < c + 0.16) ? 'scale(.9)' : 'none', transformOrigin: '3px 2px' }}><path d="M4 2l15 9-6.5 1.6L9 19z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  </>
}

function Stage({ id, t, dur, cam, cur, clicks, caps, children }: { id: K; t: number; dur: number; cam: Cam[]; cur: Cur[]; clicks: number[]; caps: [number, number, string][]; children: ReactNode }) {
  const c = camAt(cam, t), a = A[id]
  const tx = clamp(W / 2 - c.x * c.s, W - W * c.s, 0), tyy = clamp(H / 2 - c.y * c.s, H - H * c.s, 0)
  const cap = caps.find(([s, e]) => t >= s && t < e)
  const co = cap ? Math.min(fade(t, cap[0], cap[0] + 0.3), 1 - fade(t, cap[1] - 0.3, cap[1])) : 0
  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: F, background: a.dark }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${MESH}${a.mesh}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    <div style={{ position: 'absolute', left: 150, top: 60, width: W, height: H, borderRadius: 20, overflow: 'hidden', background: U.bg, color: U.ink, boxShadow: '0 50px 100px -30px rgba(0,0,0,.55), 0 0 0 2px rgba(255,255,255,.14)' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0', transform: `translate(${tx}px,${tyy}px) scale(${c.s})` }}>
        {children}
        <Cursor t={t} k={cur} clicks={clicks} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: U.bg, opacity: Math.max(1 - fade(t, 0, 0.5), fade(t, dur - 0.5, dur)), pointerEvents: 'none' }} />
    </div>
    <div style={{ position: 'absolute', left: 0, top: 872, width: STAGE.w, height: 64, display: 'flex', justifyContent: 'center', opacity: co }}>
      {cap && <div style={{ height: 64, padding: '0 36px', borderRadius: 32, background: a.dark, color: '#fff', fontSize: 32, lineHeight: '64px', whiteSpace: 'nowrap', fontWeight: 500 }}>{cap[2]}</div>}
    </div>
  </div>
}

const Button = ({ x, y, w, label, a, on = true, pressed = false, prog }: { x: number; y: number; w: number; label: string; a: string; on?: boolean; pressed?: boolean; prog?: number }) =>
  <Box x={x} y={y} w={w} h={60} s={{ borderRadius: 14, background: on ? a : U.off, color: on ? '#fff' : U.offInk, fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: pressed ? 'scale(.985)' : 'none', overflow: 'hidden' }}>
    {label}{prog !== undefined && <div style={{ position: 'absolute', left: 0, bottom: 0, height: 6, width: `${prog * 100}%`, background: '#fff', opacity: 0.9 }} />}
  </Box>
const Field = ({ x, y, w, h = 60, value, focus, err, c, a, size = 24 }: { x: number; y: number; w: number; h?: number; value: string; focus?: boolean; err?: boolean; c: boolean; a: string; size?: number }) =>
  <Box x={x} y={y} w={w} h={h} s={{ borderRadius: 12, border: `2px solid ${err ? U.err : focus ? a : U.line}`, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: size, color: U.ink, overflow: 'hidden', whiteSpace: 'nowrap' }}>
    {value}{focus && c && <span style={{ width: 2, height: size + 4, background: a, marginLeft: 2 }} />}
  </Box>

/* ───────────── Sign-in: identity first, with errors (18 s) ───────────── */
export const SIGNIN_LOOP = 18
export function LoopSignIn({ t }: { t: number }) {
  const a = A.signin
  const CX = 470, CY = 44, X = CX + 48, IW = 464
  const clicks = [1.7, 2.6, 5.8, 7.7, 9.8, 11.4, 13.2]
  const email = ty('name@example.com', t, 2.9, 8)
  const fullEmail = email.length === 16
  const emptyErr = t >= 1.8 && t < 2.9
  const s1 = (1 - fade(t, 6.8, 7.1)), s2 = fade(t, 7.0, 7.3) * (1 - fade(t, 14.0, 14.3)), s3 = fade(t, 14.3, 14.7)
  const pw1 = t >= 8.0 && t < 11.4 ? Math.min(8, Math.floor((t - 8.0) * 9)) : 0
  const pw2 = t >= 11.6 ? Math.min(10, Math.floor((t - 11.6) * 9)) : 0
  const pw = t < 11.5 ? pw1 : pw2
  const banner = t >= 10.0 && t < 11.6
  const prog1 = t >= 5.8 && t < 7.0 ? fade(t, 5.9, 6.9) : undefined
  const prog2 = t >= 13.2 && t < 14.2 ? fade(t, 13.3, 14.1) : undefined
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 1.2, s: 1.25, x: 750, y: 385 }, { t: 6.8, s: 1.25, x: 750, y: 385 }, { t: 7.4, s: 1.25, x: 750, y: 385 }, { t: 13.8, s: 1.25, x: 750, y: 385 }, { t: 14.8, s: 1.15, x: 750, y: 380 }, { t: 16.4, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1250, 650], [0.5, 1250, 650], [1.6, 900, 494], [1.9, 900, 494], [2.5, 880, 370], [5.0, 880, 370], [5.7, 900, 494], [6.0, 900, 494], [7.6, 880, 434], [9.0, 880, 434], [9.7, 900, 544], [10.2, 900, 544], [11.3, 880, 434], [12.7, 880, 434], [13.1, 900, 544], [14.0, 900, 544]]
  const caps: [number, number, string][] = [[0.3, 1.7, 'Start with who you are'], [1.7, 3.0, 'Errors appear in the field, in plain words'], [3.0, 7.0, 'Identity first: one email or username'], [7.0, 10.0, 'Then the right method for that account'], [10.0, 13.2, 'A clear banner, and the email stays put'], [13.3, 17.6, 'Signed in, the same way in every product']]
  return <Stage id="signin" t={t} dur={SIGNIN_LOOP} cam={cam} cur={cur} clicks={clicks} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />
    <Box x={CX} y={CY} w={560} h={672} s={{ background: '#fff', borderRadius: 22, border: `2px solid ${U.line}`, boxShadow: '0 30px 60px -30px rgba(10,30,40,.25)' }} />
    <Box x={X} y={CY + 44} w={44} h={44} s={{ borderRadius: 12, background: a.a }} />
    <Txt x={X} y={CY + 108} w={IW} h={50} size={40} weight={600}>{s3 > 0.5 ? 'Welcome back' : 'Sign in'}</Txt>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s1, pointerEvents: 'none' }}>
      <Txt x={X} y={CY + 266} w={IW} size={22} color={U.mute}>Email or username</Txt>
      <Field x={X} y={CY + 296} w={IW} value={email} focus={t >= 2.6 && t < 5.7} err={emptyErr} c={caret(t)} a={a.a} />
      <Txt x={X} y={CY + 364} w={IW} h={30} size={21} color={U.err} s={{ opacity: emptyErr ? 1 : 0 }}>Enter your email or username.</Txt>
      <Button x={X} y={CY + 420} w={IW} label={prog1 !== undefined ? 'Checking how you sign in' : 'Continue'} a={a.a} on={fullEmail} pressed={clk(t, [1.7, 5.8])} prog={prog1} />
      <Txt x={X} y={CY + 520} w={IW} size={22} color={a.a} weight={500}>Need sign in assistance?</Txt>
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s2, pointerEvents: 'none' }}>
      <Box x={X} y={CY + 172} w={IW} h={76} s={{ borderRadius: 12, border: `2px solid ${U.err}`, background: U.errBg, color: U.err, fontSize: 21, lineHeight: '28px', padding: '9px 18px', opacity: banner ? 1 : 0 }}>We couldn’t sign you in. Check your details and try again.</Box>
      <Box x={X} y={CY + 266} w={IW} h={50} s={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 25, background: a.tint, padding: '0 20px', fontSize: 22, color: U.ink }}><span style={{ flex: 1, ...line1 }}>name@example.com</span><span style={{ color: a.a, fontWeight: 600 }}>Change</span></Box>
      <Txt x={X} y={CY + 330} w={IW} size={22} color={U.mute}>Password</Txt>
      <Field x={X} y={CY + 360} w={IW} value={'•'.repeat(pw)} focus={(t >= 7.7 && t < 9.8) || (t >= 11.4 && t < 13.2)} err={banner} c={caret(t)} a={a.a} />
      <Button x={X} y={CY + 470} w={IW} label={prog2 !== undefined ? 'Signing you in' : 'Sign in'} a={a.a} on={pw > 0} pressed={clk(t, [9.8, 13.2])} prog={prog2} />
      <Txt x={X} y={CY + 566} w={IW} size={22} color={a.a} weight={500}>Forgot password?</Txt>
      <Txt x={X} y={CY + 604} w={IW} size={22} color={a.a} weight={500}>Need sign in assistance?</Txt>
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s3, pointerEvents: 'none' }}>
      <Box x={750 - 40} y={CY + 240} w={80} h={80} s={{ borderRadius: 40, background: a.a, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, transform: `scale(${0.8 + 0.2 * easeOut(fade(t, 14.3, 14.9))})` }}>✓</Box>
      <Txt x={X} y={CY + 356} w={IW} h={40} size={32} weight={600} s={{ textAlign: 'center' }}>You are signed in</Txt>
      <Box x={X} y={CY + 412} w={IW} h={68} s={{ fontSize: 22, lineHeight: '34px', color: U.mute, textAlign: 'center' }}>Your identity is verified. Taking you to your workspace.</Box>
      <Box x={X + 82} y={CY + 510} w={IW - 164} h={8} s={{ borderRadius: 4, background: U.line }}><Box x={0} y={0} w={(IW - 164) * fade(t, 14.6, 17.4)} h={8} s={{ borderRadius: 4, background: a.a }} /></Box>
    </Box>
  </Stage>
}

/* ───────────── Collections: worklist to Customer 360 to an email (22 s) ───────────── */
export const COLLECTIONS_LOOP = 22
const Pill = ({ x, y, w, label, kind }: { x: number; y: number; w: number; label: string; kind: 'high' | 'med' | 'low' | 'past' }) => {
  const m = { high: [U.errBg, U.err], past: [U.errBg, U.err], med: [U.warnBg, U.warn], low: [U.off, U.offInk] }[kind]
  return <Box x={x} y={y} w={w} h={36} s={{ borderRadius: 18, background: m[0], color: m[1], fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label}</Box>
}
export function LoopCollections({ t }: { t: number }) {
  const a = A.collections
  const clicks = [2.4, 9.6, 17.4]
  const rows: [string, string, string, 'high' | 'med' | 'low', string][] = [
    ['Customer A', '1000 · 2000', 'High', 'high', 'Send a reminder'], ['Customer B', '1000', 'High', 'high', 'Review the dispute'], ['Customer C', '1000 · 4000', 'Medium', 'med', 'Wait for the cooldown'],
    ['Customer D', '3000', 'Medium', 'med', 'Send a reminder'], ['Customer E', '2000', 'Low', 'low', 'No action needed']]
  const w1 = 1 - fade(t, 2.5, 2.9)
  const pageO = 1
  const v2 = fade(t, 2.7, 3.2)
  const panel = easeOut(fade(t, 9.8, 10.5))
  const body = ty('Hello, this is a reminder about the open items on your account. Please let us know if anything is unclear. Thank you.', t, 10.8, 44)
  const a1 = fade(t, 13.8, 14.2), a1ok = t >= 14.9, a2 = fade(t, 14.6, 15.0), a2ok = t >= 15.7
  const approved = t >= 17.4, sent = t >= 17.9
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 2.4, s: 1, x: 750, y: 380 }, { t: 3.2, s: 1.4, x: 400, y: 340 }, { t: 5.2, s: 1.4, x: 400, y: 340 }, { t: 6.2, s: 1.4, x: 400, y: 420 }, { t: 6.8, s: 1.4, x: 400, y: 420 }, { t: 7.6, s: 1, x: 750, y: 380 }, { t: 9.0, s: 1, x: 750, y: 380 }, { t: 9.7, s: 1.3, x: 1000, y: 260 }, { t: 10.7, s: 1.5, x: 1000, y: 300 }, { t: 14.0, s: 1.5, x: 1000, y: 300 }, { t: 15.2, s: 1.5, x: 1000, y: 470 }, { t: 18.6, s: 1.5, x: 1000, y: 470 }, { t: 20.2, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1300, 640], [0.7, 1300, 640], [2.2, 150, 286], [2.7, 150, 286], [3.4, 730, 420], [8.4, 730, 420], [9.5, 1370, 128], [10.2, 1370, 128], [10.9, 1160, 470], [16.8, 1160, 470], [17.3, 650, 642], [18.2, 650, 642]]
  const caps: [number, number, string][] = [[0.3, 2.5, 'Start from a prioritised worklist'], [2.7, 9.4, 'Customer 360 gives the reason before the action'], [9.8, 13.8, 'One click drafts the email'], [13.8, 17.2, 'Attachments are fetched automatically'], [17.4, 21.4, 'A person approves before anything is sent']]
  const Shell = <>
    <Box x={0} y={0} w={W} h={56} s={{ background: '#fff', borderBottom: `2px solid ${U.line}` }} />
    {[0, 1, 2].map(i => <Box key={i} x={24} y={19 + i * 8} w={22} h={3} s={{ background: U.ink, borderRadius: 2 }} />)}
    <Txt x={68} y={12} w={300} h={32} size={24} weight={600}>Collections</Txt>
    <Box x={1424} y={12} w={32} h={32} s={{ borderRadius: 16, background: a.tint, border: `2px solid ${a.a}` }} />
  </>
  return <Stage id="collections" t={t} dur={COLLECTIONS_LOOP} cam={cam} cur={cur} clicks={clicks} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />
    {Shell}

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: w1 }}>
      <Txt x={40} y={28} w={600} h={44} size={34} weight={600}>Worklist</Txt>
      <Txt x={40} y={76} w={700} size={22} color={U.mute}>Customers that need action, ordered by priority</Txt>
      <Box x={40} y={144} w={1420} h={472} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16, overflow: 'hidden' }}>
        <Box x={0} y={0} w={1416} h={48} s={{ background: U.bg, borderBottom: `2px solid ${U.line}` }} />
        {([['CUSTOMER', 24], ['COMPANY CODES', 360], ['PRIORITY', 650], ['RECOMMENDED ACTION', 900], ['', 1260]] as [string, number][]).map(([l, x]) => <Txt key={l + x} x={x} y={12} w={260} h={24} size={17} color={U.mute} mono>{l}</Txt>)}
        {rows.map(([n, cc, pr, kind, act], i) => {
          const y = 48 + i * 84, hov = i === 0 && t >= 1.8
          return <div key={n} style={{ opacity: easeOut(fade(t, 0.1 + i * 0.15, 0.6 + i * 0.15)) }}>
            <Box x={0} y={y} w={1416} h={84} s={{ background: hov ? a.tint : '#fff', borderBottom: i < 4 ? `2px solid ${U.line}` : 'none' }} />
            <Txt x={24} y={y + 24} w={300} h={36} size={24} weight={600}>{n}</Txt>
            <Txt x={360} y={y + 24} w={260} h={36} size={22} color={U.mute} mono>{cc}</Txt>
            <Pill x={650} y={y + 24} w={120} label={pr} kind={kind} />
            <Txt x={784} y={y + 24} w={40} h={36} size={24} color={a.a}>✦</Txt>
            <Txt x={900} y={y + 24} w={340} h={36} size={22}>{act}</Txt>
            <Txt x={1260} y={y + 24} w={140} h={36} size={22} color={a.a} weight={600}>Email</Txt>
          </div>
        })}
      </Box>
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: v2 * pageO, transform: `translateX(${(1 - v2) * 60}px)` }}>
      <Txt x={40} y={16} w={600} size={20} color={U.mute}>Worklist  /  Customer A</Txt>
      <Txt x={40} y={46} w={700} h={46} size={36} weight={600}>Customer A</Txt>
      <Box x={1280} y={44} w={180} h={52} s={{ borderRadius: 12, background: a.a, color: '#fff', fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [9.6]) ? 'scale(.97)' : 'none' }}>Email customer</Box>
      {(['Overview', 'Open items', 'Disputes', 'Emails'] as string[]).map((l, i) => <Txt key={l} x={[40, 171, 317, 443][i]} y={118} w={130} h={36} size={22} weight={i === 0 ? 600 : 400} color={i === 0 ? a.a : U.mute}>{l}</Txt>)}
      <Box x={40} y={156} w={1420} h={2} s={{ background: U.line }} />
      <Box x={40} y={154} w={96} h={4} s={{ background: a.a, borderRadius: 2 }} />

      <Box x={40} y={180} w={660} h={190} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16, opacity: easeOut(fade(t, 3.3, 3.9)) }}>
        <Txt x={24} y={20} w={400} h={24} size={17} color={U.mute} mono>SUMMARY</Txt>
        <Box x={24} y={56} w={610} h={110} s={{ fontSize: 24, lineHeight: '36px', color: U.ink }}>Customer A has open items in two company codes. A reminder was sent last time, and no dispute is open.</Box>
      </Box>
      <Box x={40} y={390} w={660} h={190} s={{ background: a.tint, border: `2px solid ${a.a}`, borderRadius: 16, opacity: easeOut(fade(t, 4.4, 5.0)) }}>
        <Txt x={24} y={20} w={400} h={24} size={17} color={a.a} mono>NEXT BEST ACTION  ✦</Txt>
        <Txt x={24} y={60} w={610} h={46} size={38} weight={600}>Send a reminder</Txt>
        <Box x={24} y={118} w={610} h={60} s={{ fontSize: 22, lineHeight: '30px', color: U.mute }}>The open items are past due, and no dispute is logged.</Box>
      </Box>
      <Box x={740} y={180} w={720} h={400} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16, overflow: 'hidden', opacity: easeOut(fade(t, 5.6, 6.2)) }}>
        <Txt x={24} y={20} w={400} h={24} size={17} color={U.mute} mono>OPEN ITEMS</Txt>
        <Box x={0} y={60} w={716} h={44} s={{ background: U.bg, borderTop: `2px solid ${U.line}`, borderBottom: `2px solid ${U.line}` }} />
        {([['DOCUMENT', 24], ['CODE', 330], ['STATUS', 500]] as [string, number][]).map(([l, x]) => <Txt key={l} x={x} y={70} w={200} h={24} size={17} color={U.mute} mono>{l}</Txt>)}
        {['90001201', '90001244', '90001310', '90001388'].map((d, i) => <div key={d}>
          <Box x={0} y={104 + i * 72} w={716} h={72} s={{ borderBottom: i < 3 ? `2px solid ${U.line}` : 'none' }} />
          <Txt x={24} y={104 + i * 72 + 18} w={290} h={36} size={22} mono>Invoice {d}</Txt>
          <Txt x={330} y={104 + i * 72 + 18} w={140} h={36} size={22} color={U.mute} mono>{i < 2 ? '1000' : '2000'}</Txt>
          <Pill x={500} y={104 + i * 72 + 18} w={150} label="Past due" kind="past" />
        </div>)}
      </Box>
    </Box>

    <Box x={500} y={56} w={1000} h={H - 56} s={{ background: '#fff', borderLeft: `2px solid ${U.line}`, boxShadow: '-30px 0 60px -30px rgba(10,30,60,.3)', visibility: t >= 9.8 ? 'visible' : 'hidden', transform: `translateX(${(1 - panel) * 760}px)` }}>
      <Txt x={32} y={22} w={500} h={40} size={30} weight={600}>Email customer</Txt>
      <Txt x={32} y={80} w={90} h={30} size={20} color={U.mute}>To</Txt>
      <Box x={130} y={72} w={838} h={46} s={{ borderRadius: 10, border: `2px solid ${U.line}`, padding: '0 14px', fontSize: 22, lineHeight: '42px', ...line1 }}>accounts@customer-a.example</Box>
      <Txt x={32} y={140} w={90} h={30} size={20} color={U.mute}>Subject</Txt>
      <Box x={130} y={132} w={838} h={46} s={{ borderRadius: 10, border: `2px solid ${U.line}`, padding: '0 14px', fontSize: 22, lineHeight: '42px', ...line1 }}>Open items on your account</Box>
      <Box x={32} y={198} w={936} h={140} s={{ borderRadius: 10, border: `2px solid ${U.line}`, padding: '12px 16px', fontSize: 22, lineHeight: '32px', color: U.ink, overflow: 'hidden' }}>{body}{t >= 10.8 && t < 13.6 && caret(t) && <span style={{ display: 'inline-block', width: 2, height: 24, background: a.a, verticalAlign: 'middle' }} />}</Box>
      <Txt x={32} y={364} w={500} h={24} size={17} color={U.mute} mono>ATTACHMENTS  ·  FETCHED AUTOMATICALLY</Txt>
      {([['Invoice copies.pdf', a1, a1ok], ['Account statement.pdf', a2, a2ok]] as [string, number, boolean][]).map(([n, o, ok], i) =>
        <Box key={n} x={32} y={402 + i * 64} w={936} h={52} s={{ borderRadius: 10, border: `2px solid ${ok ? a.a : U.line}`, background: ok ? a.tint : '#fff', opacity: o, display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', fontSize: 22 }}>
          <span style={{ width: 24, height: 30, borderRadius: 4, background: a.a, flex: 'none' }} /><span style={{ flex: 1, ...line1 }}>{n}</span>
          <span style={{ fontFamily: M, fontSize: 17, color: ok ? a.a : U.mute, flex: 'none' }}>{ok ? 'ADDED' : 'FETCHING'}</span></Box>)}
      <Box x={32} y={560} w={230} h={52} s={{ borderRadius: 12, background: sent ? U.ok : a.a, color: '#fff', fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [17.4]) ? 'scale(.97)' : 'none' }}>{sent ? 'Sent  ✓' : approved ? 'Approving' : 'Approve and send'}</Box>
      <Box x={276} y={560} w={110} h={52} s={{ borderRadius: 12, border: `2px solid ${U.line}`, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Edit</Box>
    </Box>
  </Stage>
}

/* ───────────── Search: booking a trip from the shell bar (20 s) ───────────── */
export const SEARCH_LOOP = 20
export function LoopSearch({ t }: { t: number }) {
  const a = A.search
  const clicks = [2.0, 5.6, 9.0, 11.2, 12.4, 14.6]
  const exp = easeOut(fade(t, 2.0, 2.6)) * (1 - fade(t, 5.6, 5.9))
  const q = ty('book a trip', t, 2.8, 9)
  const drop = fade(t, 4.2, 4.5) * (1 - fade(t, 5.6, 5.9))
  const modal = easeOut(fade(t, 5.8, 6.4))
  const step = t < 9.2 ? 0 : t < 12.6 ? 1 : t < 15.0 ? 2 : 3
  const sw = (s: number, a1: number, b1: number) => fade(t, a1, a1 + 0.3) * (1 - fade(t, b1 - 0.3, b1)) * (step === s || (t >= a1 && t < b1) ? 1 : 0)
  const to = ty('Berlin', t, 6.6, 8)
  const dates = fade(t, 7.6, 8.0)
  const sel = t >= 11.2
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 1.2, s: 1, x: 750, y: 380 }, { t: 2.0, s: 1.5, x: 1150, y: 170 }, { t: 5.4, s: 1.5, x: 1150, y: 170 }, { t: 6.4, s: 1.25, x: 750, y: 398 }, { t: 15.0, s: 1.25, x: 750, y: 398 }, { t: 16.6, s: 1.1, x: 750, y: 380 }, { t: 18.0, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 900, 420], [0.8, 900, 420], [1.9, 1352, 28], [2.3, 1352, 28], [3.0, 1100, 30], [5.0, 1100, 30], [5.5, 1066, 100], [6.0, 1066, 100], [6.5, 960, 301], [7.8, 960, 301], [8.7, 1090, 668], [9.1, 1090, 668], [11.1, 900, 388], [11.5, 900, 388], [12.3, 1090, 668], [12.7, 1090, 668], [14.5, 1090, 668], [15.2, 1090, 668]]
  const caps: [number, number, string][] = [[0.3, 2.0, 'Search lives in the shell bar'], [2.0, 5.6, 'Say what you want to do'], [5.8, 9.0, 'The trip is prefilled from context'], [9.2, 12.4, 'Options are checked against travel policy'], [12.6, 15.0, 'Review everything in one place'], [15.0, 19.4, 'Booked, without leaving search']]
  const tabs = ['Trip', 'Flights', 'Review']
  const flights: [string, string, string, boolean][] = [['09:40  →  14:15', 'Direct  ·  8h 35m', 'EUR 640', true], ['06:10  →  15:30', '1 stop  ·  12h 20m', 'EUR 480', true], ['21:05  →  10:20', '1 stop  ·  14h 05m', 'EUR 455', false]]
  const review: [string, string][] = [['Flight', '06:10 → 15:30, 1 stop'], ['Dates', 'Mon 17 Nov to Fri 21 Nov'], ['Policy', 'Within travel policy'], ['Total', 'EUR 480']]
  return <Stage id="search" t={t} dur={SEARCH_LOOP} cam={cam} cur={cur} clicks={clicks} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />
    <Box x={0} y={0} w={W} h={56} s={{ background: a.a }} />
    <Box x={24} y={14} w={28} h={28} s={{ borderRadius: 8, background: '#fff' }} />
    <Txt x={68} y={12} w={300} h={32} size={24} weight={600} color="#fff">Home</Txt>
    <Box x={1424} y={12} w={32} h={32} s={{ borderRadius: 16, background: a.tint }} />
    <Box x={1342} y={14} w={22} h={22} s={{ borderRadius: 11, border: '3px solid #fff', opacity: 1 - exp }} />
    <Box x={1360} y={33} w={12} h={3} s={{ background: '#fff', borderRadius: 2, transform: 'rotate(45deg)', transformOrigin: '0 50%', opacity: 1 - exp }} />
    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: 1 - modal }}>
    <Txt x={40} y={28} w={700} h={46} size={36} weight={600}>Good morning</Txt>
    {[0, 1].map(r => [0, 1, 2].map(c => <Box key={r + '' + c} x={40 + c * 480} y={104 + r * 280} w={440} h={240} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16 }}>
      <Txt x={24} y={22} w={380} h={34} size={26} weight={600}>{['Approvals', 'Travel', 'Inbox', 'Expenses', 'Team', 'Reports'][r * 3 + c]}</Txt>
      <Box x={24} y={84} w={300} h={14} s={{ borderRadius: 7, background: U.off }} /><Box x={24} y={116} w={380} h={14} s={{ borderRadius: 7, background: U.off }} /><Box x={24} y={148} w={220} h={14} s={{ borderRadius: 7, background: U.off }} /></Box>))}
    </Box>

    <Box x={1376 - (44 + 576 * exp)} y={8} w={44 + 576 * exp} h={40} s={{ borderRadius: 20, background: '#fff', opacity: exp > 0.01 ? 1 : 0, overflow: 'hidden' }}>
      <Box x={14} y={9} w={16} h={16} s={{ borderRadius: 8, border: `3px solid ${a.a}` }} />
      <Txt x={46} y={0} w={560} h={40} size={22} s={{ opacity: fade(t, 2.5, 2.8) }}>{q}{t >= 2.8 && t < 5.6 && caret(t) ? '|' : ''}</Txt>
    </Box>
    <Box x={756} y={60} w={620} h={208} s={{ background: '#fff', borderRadius: 14, boxShadow: '0 30px 60px -20px rgba(10,10,60,.35)', border: `2px solid ${U.line}`, opacity: drop, pointerEvents: 'none' }}>
      {([['Book a trip', 'Travel'], ['My trips', 'Travel'], ['Travel policy', 'Help']] as [string, string][]).map(([n, s], i) => <div key={n}>
        <Box x={6} y={6 + i * 64} w={604} h={64} s={{ borderRadius: 10, background: i === 0 && t >= 4.8 ? a.tint : '#fff' }} />
        <Txt x={24} y={6 + i * 64 + 14} w={400} h={36} size={24} weight={i === 0 ? 600 : 400}>{n}</Txt>
        <Txt x={480} y={6 + i * 64 + 14} w={110} h={36} size={20} color={U.mute} s={{ textAlign: 'right' }}>{s}</Txt></div>)}
    </Box>

    <Box x={330} y={84} w={840} h={640} s={{ background: '#fff', borderRadius: 22, border: `2px solid ${U.line}`, boxShadow: '0 50px 100px -30px rgba(10,10,60,.5)', visibility: t >= 5.8 ? 'visible' : 'hidden', transform: `translateY(${(1 - modal) * 40}px)` }} />
    <Box x={0} y={0} w={W} h={H} s={{ visibility: t >= 5.8 ? 'visible' : 'hidden', transform: `translateY(${(1 - modal) * 40}px)`, pointerEvents: 'none' }}>
      <Txt x={366} y={110} w={600} h={46} size={36} weight={600}>Book a trip</Txt>
      {step < 3 && tabs.map((l, i) => <Txt key={l} x={366 + i * 256} y={176} w={240} h={36} size={22} weight={step === i || (step === 3 && i === 2) ? 600 : 400} color={step === i || (step === 3 && i === 2) ? a.a : U.mute}>{l}</Txt>)}
      {step < 3 && <><Box x={366} y={216} w={768} h={2} s={{ background: U.line }} /><Box x={366 + step * 256} y={214} w={240} h={4} s={{ background: a.a, borderRadius: 2 }} /></>}

      <Box x={0} y={0} w={W} h={H} s={{ opacity: step === 0 ? 1 : 0 }}>
        <Txt x={366} y={244} w={372} size={20} color={U.mute}>From</Txt><Field x={366} y={272} w={372} h={58} value="Bengaluru" c={false} a={a.a} />
        <Txt x={762} y={244} w={372} size={20} color={U.mute}>To</Txt><Field x={762} y={272} w={372} h={58} value={to} focus={t >= 6.4 && t < 8.0} c={caret(t)} a={a.a} />
        <Txt x={366} y={354} w={372} size={20} color={U.mute}>Depart</Txt><Field x={366} y={382} w={372} h={58} value={dates > 0.5 ? 'Mon 17 Nov' : ''} c={false} a={a.a} />
        <Txt x={762} y={354} w={372} size={20} color={U.mute}>Return</Txt><Field x={762} y={382} w={372} h={58} value={dates > 0.5 ? 'Fri 21 Nov' : ''} c={false} a={a.a} />
        <Txt x={366} y={464} w={372} size={20} color={U.mute}>Purpose</Txt><Field x={366} y={490} w={768} h={58} value="Business trip" c={false} a={a.a} />
      </Box>
      <Box x={0} y={0} w={W} h={H} s={{ opacity: sw(1, 9.2, 12.6) }}>
        {flights.map(([tm, sub, pr, ok], i) => { const picked = sel && i === 1; return <div key={tm}>
          <Box x={366} y={244 + i * 100} w={768} h={88} s={{ borderRadius: 14, border: `2px solid ${picked ? a.a : U.line}`, background: picked ? a.tint : '#fff' }} />
          <Box x={388} y={244 + i * 100 + 30} w={28} h={28} s={{ borderRadius: 14, border: `3px solid ${picked ? a.a : U.line}`, background: picked ? a.a : '#fff' }} />
          <Txt x={434} y={244 + i * 100 + 12} w={300} h={34} size={26} weight={600}>{tm}</Txt>
          <Txt x={434} y={244 + i * 100 + 48} w={300} h={28} size={20} color={U.mute}>{sub}</Txt>
          <Txt x={760} y={244 + i * 100 + 28} w={190} h={32} size={20} color={ok ? U.ok : U.warn} weight={600}>{ok ? 'Within policy' : 'Over policy'}</Txt>
          <Txt x={960} y={244 + i * 100 + 24} w={150} h={40} size={28} weight={600} s={{ textAlign: 'right' }}>{pr}</Txt></div> })}
      </Box>
      <Box x={0} y={0} w={W} h={H} s={{ opacity: sw(2, 12.6, 15.0) }}>
        {review.map(([l, v], i) => <div key={l}>
          <Box x={366} y={252 + i * 72} w={768} h={64} s={{ borderBottom: `2px solid ${U.line}`, opacity: easeOut(fade(t, 12.8 + i * 0.25, 13.3 + i * 0.25)) }} />
          <Txt x={366} y={252 + i * 72 + 14} w={200} h={36} size={22} color={U.mute} s={{ opacity: easeOut(fade(t, 12.8 + i * 0.25, 13.3 + i * 0.25)) }}>{l}</Txt>
          <Txt x={580} y={252 + i * 72 + 14} w={554} h={36} size={i === 3 ? 28 : 24} weight={i === 3 ? 600 : 500} color={i === 2 ? U.ok : U.ink} s={{ textAlign: 'right', opacity: easeOut(fade(t, 12.8 + i * 0.25, 13.3 + i * 0.25)) }}>{v}</Txt></div>)}
      </Box>
      <Box x={0} y={0} w={W} h={H} s={{ opacity: fade(t, 15.0, 15.5) }}>
        <Box x={750 - 44} y={270} w={88} h={88} s={{ borderRadius: 44, background: a.a, color: '#fff', fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</Box>
        <Txt x={366} y={390} w={768} h={46} size={36} weight={600} s={{ textAlign: 'center' }}>Trip booked</Txt>
        <Txt x={366} y={448} w={768} h={34} size={24} color={U.mute} s={{ textAlign: 'center' }}>Your itinerary is on its way to your inbox.</Txt>
      </Box>
      {step < 3 && <Box x={934} y={640} w={200} h={56} s={{ borderRadius: 14, background: a.a, color: '#fff', fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [9.0, 12.4, 14.6]) ? 'scale(.97)' : 'none' }}>{['Find flights', 'Review', 'Book trip'][step]}</Box>}
    </Box>
  </Stage>
}

/* ───────────── CDS: intent to output, IXO as a parallel layer (22 s) ───────────── */
export const CDS_LOOP = 22
const COLS = ['Intent', 'Context', 'Plan', 'Govern', 'Specify', 'Compose']
const CW = 210, GAP = 8, X0 = 160
const colX = (i: number) => X0 + i * (CW + GAP)
export function LoopCds({ t }: { t: number }) {
  const a = A.cds
  const step = clamp(Math.floor((t - 2.0) / 2.1), -1, 5)
  const rowY = [140, 252, 364, 476]
  const lanes: [string, (string | null)[], boolean][] = [
    ['LLM', ['Reads the request', 'Reads the context', 'Reasons and plans', null, 'Writes the spec', null], false],
    ['IXO', ['Infer', 'Contextualise', 'Plan the experience', 'Govern', 'Specify', 'Evaluate'], true],
    ['CDS', [null, null, null, null, null, 'Compose from approved parts'], false],
    ['Guardrails', [null, null, null, 'Policies and permissions', null, 'Validate'], false]]
  const out = easeOut(fade(t, 14.8, 15.6)), ev = easeOut(fade(t, 17.0, 17.8))
  const cx = (i: number) => colX(i) + CW / 2
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 1.6, s: 1, x: 750, y: 380 }, ...[0, 1, 2, 3, 4, 5].map(i => ({ t: 2.0 + i * 2.1, s: 1.15, x: clamp(cx(i), 650, 790), y: 330 })), { t: 14.6, s: 1.15, x: 790, y: 330 }, { t: 15.6, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 0, 0]]
  const caps: [number, number, string][] = [[0.3, 2.0, 'From a plain-language intent'], [2.0, 6.2, 'The LLM reads the request and the context'], [6.2, 10.4, 'IXO decides what experience should exist'], [10.4, 14.6, 'Policy enforces. The LLM only recommends'], [14.8, 17.0, 'CDS composes it from approved parts'], [17.0, 21.6, 'IXO evaluates the result and feeds it back']]
  return <Stage id="cds" t={t} dur={CDS_LOOP} cam={cam} cur={cur} clicks={[]} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />
    <Box x={40} y={28} w={1420} h={60} s={{ background: a.tint, border: `2px solid ${a.a}`, borderRadius: 30, opacity: easeOut(fade(t, 0.2, 0.7)) }}>
      <Txt x={26} y={14} w={110} h={28} size={17} color={a.a} mono>INTENT</Txt>
      <Txt x={150} y={9} w={1240} h={38} size={26} weight={500}>“Help me understand why attrition is rising.”</Txt>
    </Box>
    {COLS.map((c, i) => <Txt key={c} x={colX(i)} y={104} w={CW} h={26} size={18} mono color={step >= i ? a.a : U.mute} weight={step === i ? 700 : 400} s={{ textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: easeOut(fade(t, 0.6 + i * 0.1, 1.1 + i * 0.1)) }}>{c}</Txt>)}
    <Box x={152} y={rowY[1] - 6} w={1316} h={108} s={{ background: a.tint, border: `2px solid ${a.a}`, borderRadius: 22, opacity: easeOut(fade(t, 1.0, 1.6)) }} />
    {lanes.map(([n, cells, hot], li) => <div key={n}>
      <Txt x={40} y={rowY[li] + 30} w={112} h={36} size={n === 'Guardrails' ? 21 : 24} weight={hot ? 700 : 600} color={hot ? a.a : U.ink} s={{ opacity: easeOut(fade(t, 0.8 + li * 0.15, 1.3 + li * 0.15)) }}>{n}</Txt>
      {cells.map((c, i) => { if (!c) return null; const act = step === i, past = step > i
        return <Box key={i} x={colX(i)} y={rowY[li]} w={CW} h={96} s={{ borderRadius: 16, background: act ? a.a : past ? a.tint : '#fff', color: act ? '#fff' : U.ink, border: `2px solid ${act || past ? a.a : U.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 14px', fontSize: 22, lineHeight: '28px', fontWeight: hot ? 600 : 500, opacity: easeOut(fade(t, 1.2 + li * 0.12 + i * 0.08, 1.8 + li * 0.12 + i * 0.08)) }}>{c}</Box> })}
    </div>)}
    <Box x={160} y={596} w={640} h={140} s={{ background: '#fff', border: `2px solid ${a.a}`, borderRadius: 16, opacity: out, transform: `translateY(${(1 - out) * 16}px)` }}>
      <Txt x={24} y={18} w={400} h={24} size={17} color={a.a} mono>GENERATED EXPERIENCE</Txt>
      <Box x={24} y={54} w={592} h={60} s={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>{[1, 0.75, 0.55, 0.4, 0.28].map((h, k) => <div key={k} style={{ flex: 1, height: 60 * h * easeOut(fade(t, 15 + k * 0.12, 16 + k * 0.12)), borderRadius: '6px 6px 2px 2px', background: k === 0 ? a.a : '#B79AE0' }} />)}</Box>
    </Box>
    <Box x={830} y={596} w={630} h={140} s={{ background: a.tint, border: `2px solid ${a.a}`, borderRadius: 16, opacity: ev, transform: `translateY(${(1 - ev) * 16}px)` }}>
      <Txt x={24} y={18} w={500} h={24} size={17} color={a.a} mono>IXO EVALUATION  ·  FEEDBACK LOOP</Txt>
      <Box x={24} y={56} w={580} h={70} s={{ fontSize: 26, lineHeight: '34px', fontWeight: 600, color: U.ink }}>Checked against the original intent, then refined.</Box>
    </Box>
  </Stage>
}
