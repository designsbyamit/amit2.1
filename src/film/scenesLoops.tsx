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
  signin: { mesh: 'sap-signin', a: '#0B5F73', tint: '#E0F0F3', dark: '#053640' },
  collections: { mesh: 'sap-collections', a: '#005695', tint: '#E3EEF8', dark: '#02223F' },
  search: { mesh: 'sap-search', a: '#111160', tint: '#E8E8F6', dark: '#0A0A3A' },
  cds: { mesh: 'sap-compositional', a: '#5B43C8', tint: '#ECE8FB', dark: '#241A66' },
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

/* ───────────── Search: a trip, booked through search (24 s), the same flow as the prototype ───────────── */
export const SEARCH_LOOP = 24
const TRIPS: [string, string][] = [['Business trip · SFO → BLR · Emirates EK237 · Jun 10-17', 'Travel'], ['Business trip · SFO → SIN · Singapore Airlines · Jul 3-10', 'Travel'], ['Conference · SFO → NRT · ANA NH106 · Aug 15-22', 'Travel']]
const FLIGHTS: [string, string, boolean][] = [
  ['Emirates · Economy · $1,240 · 21h 30m · 1 stop DXB', 'Departs 08:00 · arrives 23:30 +1 · preferred carrier for this route', true],
  ['Emirates · Economy · $980 · 23h 15m · 1 stop DXB', 'Cheapest · 1h 45m longer', true],
  ['United Airlines · Economy · $1,100 · 22h 50m · 1 stop FRA', 'Visa required · processing 5-7 days', true],
  ['Lufthansa · Business · $1,850 · 20h 15m · 1 stop MUC', 'Needs manager approval', false],
  ['Singapore Airlines · Economy · $1,120 · 24h 05m · 1 stop SIN', 'Policy compliant', true]]
const AI_TEXT = 'AI insight: Emirates EK237 is the preferred SFO → BLR route at $1,240. 1 stop in Dubai. Policy compliant. Preferred hotel: The Leela Palace, Bangalore.'
const VIOLET = '#6B3FD4', VIOLET_BG = '#F1EAFF'
export function LoopSearch({ t }: { t: number }) {
  const a = A.search
  const clicks = [2.0, 5.8, 11.8, 19.2]
  const view = t < 6.0 ? 1 : t < 12.0 ? 2 : t < 15.0 ? 3 : 4
  const v2 = fade(t, 6.0, 6.5) , v3 = fade(t, 12.0, 12.5), v4 = fade(t, 15.0, 15.5)
  const active = t >= 2.0 && view === 1
  const q = ty('flight to', t, 2.8, 6)
  const pop = fade(t, 2.1, 2.4) * (1 - fade(t, 5.9, 6.2))
  const aiTxt = ty(AI_TEXT, t, 6.6, 48)
  const prefer = fade(t, 9.8, 10.3)
  const prog = fade(t, 12.4, 14.8)
  const btn = t < 19.2 ? 0 : t < 21.0 ? 1 : 2
  const booked = easeOut(fade(t, 21.0, 21.6))
  const fields: [string, string][] = [['Traveller', 'Maria Schmidt'], ['Company code', '1000'], ['Cost centre', 'IT-0450'], ['Trip purpose', 'Business meeting'], ['Approval required', 'No · within policy']]
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 1.0, s: 1, x: 750, y: 380 }, { t: 1.9, s: 1.2, x: 750, y: 200 }, { t: 5.8, s: 1.2, x: 750, y: 200 }, { t: 6.6, s: 1.2, x: 750, y: 317 }, { t: 12.0, s: 1.2, x: 750, y: 317 }, { t: 15.6, s: 1.15, x: 750, y: 387 }, { t: 21.8, s: 1.15, x: 750, y: 387 }, { t: 22.8, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1000, 500], [0.6, 1000, 500], [1.8, 920, 28], [2.3, 920, 28], [4.9, 860, 134], [6.0, 860, 134], [6.8, 1330, 560], [11.3, 1221, 270], [12.2, 1221, 270], [14.0, 1330, 560], [18.0, 1330, 560], [18.9, 1082, 660], [19.9, 1082, 660]]
  const caps: [number, number, string][] = [[0.3, 2.0, 'Search is already in the shell bar'], [2.1, 5.8, 'Type a sentence, not a query'], [6.0, 9.8, 'AI reads the intent: route, dates, policy'], [9.8, 11.8, 'One recommendation, and the reason why'], [12.0, 15.0, 'Search to action: straight into the booking'], [15.2, 19.0, 'Nothing to re-type: the trip arrives filled in'], [19.2, 23.2, 'Booked from one sentence, within policy']]
  const fieldText = view === 1 ? (active ? q : 'Search') : view === 4 ? 'Search' : 'Palo Alto to Bangalore'
  const fieldOn = view === 1 ? active : view !== 4
  const Row = ({ y, name, app, focus, bold }: { y: number; name: string; app: string; focus?: boolean; bold?: string }) => <>
    <Box x={8} y={y} w={744} h={56} s={{ borderRadius: 10, background: focus ? a.tint : '#fff' }} />
    <Box x={24} y={y + 14} w={28} h={28} s={{ borderRadius: 14, border: `3px solid ${U.mute}` }} />
    <Txt x={68} y={y + 10} w={560} h={36} size={22}>{bold ? <><b style={{ fontWeight: 700 }}>{name.slice(0, bold.length)}</b>{name.slice(bold.length)}</> : name}</Txt>
    <Txt x={640} y={y + 12} w={96} h={32} size={19} color={U.mute} s={{ textAlign: 'right' }}>{app}</Txt></>
  return <Stage id="search" t={t} dur={SEARCH_LOOP} cam={cam} cur={cur} clicks={clicks} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 1 ? 1 : 0 }}>
      <Txt x={200} y={24} w={700} h={46} size={38} weight={600}>Good morning</Txt>
      <Txt x={200} y={76} w={900} size={22} color={U.mute}>3 approvals waiting · 1 trip to plan</Txt>
      {[['To approve', '3'], ['My trips', '1'], ['Expenses', '2 open'], ['Goals', '4 on track']].map(([l, v], i) => <Box key={l} x={200 + i * 280} y={128} w={260} h={140} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16 }}>
        <Txt x={22} y={20} w={216} size={20} color={U.mute}>{l}</Txt><Txt x={22} y={62} w={216} h={56} size={44} weight={300}>{v}</Txt></Box>)}
      <Box x={200} y={296} w={1100} h={340} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 16 }}>
        <Txt x={24} y={20} w={400} h={32} size={24} weight={600}>Today</Txt>
        {['Review Q3 supplier scorecard', 'Approve 3 purchase requisitions', 'Team 1:1 · 15:30'].map((x, i) => <div key={x}><Box x={0} y={72 + i * 84} w={1096} h={2} s={{ background: U.line }} /><Txt x={24} y={72 + i * 84 + 28} w={900} h={32} size={22} color={U.mute}>{x}</Txt></div>)}
      </Box>
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 2 ? v2 : 0, visibility: view === 2 ? 'visible' : 'hidden' }}>
      <Txt x={200} y={8} w={900} h={30} size={20} color={U.mute}>Results for “Palo Alto to Bangalore”</Txt>
      <Box x={200} y={48} w={1100} h={88} s={{ background: VIOLET_BG, border: '2px solid #C9B2F5', borderRadius: 12, padding: '12px 18px', fontSize: 21, lineHeight: '30px', color: U.ink, overflow: 'hidden' }}><span style={{ color: VIOLET, marginRight: 8 }}>✦</span>{aiTxt}</Box>
      {FLIGHTS.map(([h, sub, ok], i) => { const p = easeOut(fade(t, 7.2 + i * 0.3, 7.8 + i * 0.3)), pf = i === 0 ? prefer : 0
        return <div key={h} style={{ opacity: p }}>
          <Box x={200} y={152 + i * 84} w={1100} h={76} s={{ background: pf > 0.5 ? a.tint : '#fff', border: `2px solid ${pf > 0.5 ? a.a : U.line}`, borderRadius: 12 }} />
          <Txt x={224} y={152 + i * 84 + 8} w={620} h={30} size={21} weight={500}>{h}</Txt>
          <Txt x={224} y={152 + i * 84 + 42} w={640} h={26} size={18} color={U.mute}>{sub}</Txt>
          <Box x={864} y={152 + i * 84 + 22} w={ok ? 164 : 150} h={32} s={{ borderRadius: 6, background: ok ? U.okBg : U.errBg, color: ok ? U.ok : U.err, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok ? '✓ Policy compliant' : 'Approval needed'}</Box>
          {i === 0 && <Box x={1038} y={152 + 22} w={118} h={32} s={{ borderRadius: 6, background: VIOLET, color: '#fff', fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pf }}>✦ Preferred</Box>}
          {i === 0 && <Box x={1166} y={152 + 16} w={110} h={44} s={{ borderRadius: 8, background: a.a, color: '#fff', fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [11.8]) ? 'scale(.96)' : 'none' }}>Select</Box>}
        </div> })}
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 3 ? v3 : 0, visibility: view === 3 ? 'visible' : 'hidden' }}>
      <Box x={530} y={140} w={440} h={320} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 20, boxShadow: '0 30px 60px -30px rgba(10,10,60,.35)' }}>
        <Box x={180} y={32} w={80} h={80} s={{ borderRadius: 40, background: '#2A5BD7', color: '#fff', fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>V</Box>
        <Txt x={20} y={128} w={396} h={40} size={30} weight={600} s={{ textAlign: 'center' }}>Voyage</Txt>
        <Txt x={20} y={176} w={396} h={30} size={21} color={U.mute} s={{ textAlign: 'center' }}>Opening your booking…</Txt>
        <Box x={40} y={228} w={356} h={8} s={{ borderRadius: 4, background: U.line }}><Box x={0} y={0} w={356 * prog} h={8} s={{ borderRadius: 4, background: '#2A5BD7' }} /></Box>
        <Box x={158} y={256} w={120} h={42} s={{ border: `2px solid ${U.line}`, borderRadius: 8, color: a.a, fontSize: 19, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</Box>
      </Box>
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 4 ? v4 : 0, visibility: view === 4 ? 'visible' : 'hidden' }}>
      <Box x={0} y={0} w={W} h={52} s={{ background: '#2A5BD7' }} />
      <Txt x={200} y={9} w={700} h={34} size={26} weight={600} color="#fff">Book flight</Txt>
      <Txt x={200} y={70} w={900} size={18} color={U.mute}>Travel  →  SFO to Bangalore  →  Select flight  →  Review</Txt>
      <Box x={200} y={108} w={640} h={330} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 14 }}>
        <Txt x={24} y={20} w={592} h={34} size={23} weight={600}>EK237 · San Francisco (SFO) → Bangalore (BLR)</Txt>
        {[['Airline', 'Emirates'], ['Departure', '08:00, San Francisco Int’l (SFO)'], ['Arrival', '23:30 +1, Bangalore (BLR)'], ['Class', 'Economy'], ['Fare', '$1,240.00']].map(([l, v], i) =>
          <div key={l} style={{ opacity: easeOut(fade(t, 15.4 + i * 0.2, 15.9 + i * 0.2)) }}><Txt x={24} y={76 + i * 40} w={150} h={30} size={20} color={U.mute}>{l}</Txt><Txt x={180} y={76 + i * 40} w={436} h={30} size={20}>{v}</Txt></div>)}
        <Box x={24} y={284} w={210} h={32} s={{ borderRadius: 6, background: U.okBg, color: U.ok, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓ Compliant with policy</Box>
      </Box>
      <Box x={864} y={108} w={436} h={540} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 14 }}>
        <Txt x={32} y={24} w={372} h={34} size={23} weight={600}>Booking summary</Txt>
        {fields.map(([l, v], i) => { const f = easeOut(fade(t, 16.0 + i * 0.5, 16.5 + i * 0.5)) * (1 - fade(t, 18.4 + i * 0.1, 19.0 + i * 0.1))
          return <div key={l}>
            <Box x={24} y={72 + i * 66} w={388} h={58} s={{ borderRadius: 8, background: `rgba(200,245,90,${0.55 * f})`, border: `2px solid rgba(120,170,20,${0.6 * f})` }} />
            <Txt x={40} y={72 + i * 66 + 4} w={360} h={24} size={17} color={U.mute}>{l}{f > 0.15 && <span style={{ color: '#3F6B00', fontWeight: 700, marginLeft: 10 }}>✦ from your search</span>}</Txt>
            <Txt x={40} y={72 + i * 66 + 28} w={360} h={26} size={21} weight={600}>{v}</Txt></div> })}
        <Box x={32} y={412} w={372} h={2} s={{ background: U.line }} />
        <Txt x={32} y={428} w={200} h={30} size={22} weight={600}>Total</Txt><Txt x={232} y={428} w={172} h={30} size={22} weight={600} s={{ textAlign: 'right' }}>$1,240.00</Txt>
        <Box x={32} y={468} w={372} h={56} s={{ borderRadius: 10, background: btn === 2 ? U.ok : '#2A5BD7', color: '#fff', fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [19.2]) ? 'scale(.98)' : 'none' }}>{['Book flight', 'Booking…', '✓ Booked'][btn]}</Box>
      </Box>
      {t >= 21.0 && <Box x={490} y={90} w={520} h={430} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 20, boxShadow: '0 40px 80px -20px rgba(10,10,60,.45)', transform: `translateY(${(1 - booked) * 24}px)`, opacity: booked }}>
        <Box x={218} y={30} w={84} h={84} s={{ borderRadius: 42, background: U.ok, color: '#fff', fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</Box>
        <Txt x={20} y={128} w={476} h={40} size={30} weight={600} s={{ textAlign: 'center' }}>Flight booked</Txt>
        <Txt x={20} y={174} w={476} h={28} size={19} color={U.mute} s={{ textAlign: 'center' }}>EK237 · SFO → BLR · Jun 10-17 · $1,240.00</Txt>
        {['Itinerary sent to your inbox', 'Added to your calendar', 'Hotel suggested · The Leela Palace'].map((x, i) => { const p = easeOut(fade(t, 21.6 + i * 0.4, 22.1 + i * 0.4))
          return <Box key={x} x={28} y={226 + i * 64} w={460} h={52} s={{ borderRadius: 10, background: U.bg, opacity: p, transform: `translateX(${(1 - p) * 20}px)`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontSize: 20 }}><span style={{ color: U.ok, fontWeight: 700 }}>✓</span>{x}</Box> })}
      </Box>}
    </Box>

    <Box x={0} y={0} w={W} h={56} s={{ background: a.a }} />
    <Box x={24} y={14} w={28} h={28} s={{ borderRadius: 8, background: '#fff' }} />
    <Box x={1424} y={12} w={32} h={32} s={{ borderRadius: 16, background: a.tint }} />
    <Box x={640} y={9} w={700} h={38} s={{ borderRadius: 19, background: fieldOn ? '#fff' : '#2C2C86', display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontSize: 21, color: fieldOn ? U.ink : '#D6D6F5' }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, border: `3px solid ${fieldOn ? a.a : '#D6D6F5'}`, flex: 'none' }} />
      <span style={line1}>{fieldText}{active && t < 6.0 && caret(t) ? '|' : ''}</span></Box>
    <Box x={580} y={60} w={760} h={q ? 232 : 312} s={{ background: '#fff', borderRadius: 14, border: `2px solid ${U.line}`, boxShadow: '0 30px 60px -20px rgba(10,10,60,.35)', opacity: pop, visibility: pop > 0 ? 'visible' : 'hidden', overflow: 'hidden' }}>
      {!q ? <>
        <Txt x={24} y={10} w={300} h={30} size={18} color={U.mute}>Recent searches</Txt>
        <Row y={42} name="Pending POs this quarter" app="" /><Row y={98} name="Goals for my team" app="" />
        <Txt x={24} y={164} w={300} h={30} size={18} color={U.mute}>Suggested</Txt>
        <Row y={196} name="Leave balance" app="" /><Row y={252} name="Expense report for May" app="" /></> : <>
        <Txt x={24} y={10} w={300} h={30} size={18} color={U.mute}>Suggested</Txt>
        {TRIPS.map(([n, ap], i) => <Row key={n} y={42 + i * 60} name={n} app={ap} focus={i === 0 && t >= 4.6} />)}</>}
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
      <Box x={24} y={54} w={592} h={60} s={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>{[1, 0.75, 0.55, 0.4, 0.28].map((h, k) => <div key={k} style={{ flex: 1, height: 60 * h * easeOut(fade(t, 15 + k * 0.12, 16 + k * 0.12)), borderRadius: '6px 6px 2px 2px', background: k === 0 ? a.a : '#B8A8F0' }} />)}</Box>
    </Box>
    <Box x={830} y={596} w={630} h={140} s={{ background: a.tint, border: `2px solid ${a.a}`, borderRadius: 16, opacity: ev, transform: `translateY(${(1 - ev) * 16}px)` }}>
      <Txt x={24} y={18} w={500} h={24} size={17} color={a.a} mono>IXO EVALUATION  ·  FEEDBACK LOOP</Txt>
      <Box x={24} y={56} w={580} h={70} s={{ fontSize: 26, lineHeight: '34px', fontWeight: 600, color: U.ink }}>Checked against the original intent, then refined.</Box>
    </Box>
  </Stage>
}
