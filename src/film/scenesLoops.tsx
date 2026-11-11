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

/* ───────────── Collections: worklist, Customer 360, an email with attachments (24 s) ───────────── */
export const COLLECTIONS_LOOP = 24
const LINK = '#0A5FB4', NBA_BG = '#DDEEFB', NBA_LINE = '#B9D8F2'
const PR = { High: ['#F7C9C5', '#8E1B13'], Medium: ['#FFE2A6', '#6E4600'], Low: ['#CDEFD8', '#14663F'] } as const
const Usd = ({ v }: { v: string }) => <>{v}<span style={{ color: U.mute, fontSize: 14, marginLeft: 5 }}>USD</span></>
type WRow = { id: string; name: string; codes: string; pr?: keyof typeof PR; od: string; due: string; cb: string; days: string; bo: string; boa: string; act?: string }
const W_ROWS: WRow[] = [
  { id: '56102', name: 'Orchard Gro…', codes: '1000', pr: 'High', od: '384,006.55', due: '398,182.58', cb: '7,988.07', days: '20', bo: '3', boa: '31,810.96' },
  { id: '92341', name: 'Kestrel Foo…', codes: '', pr: 'High', od: '92,011.93', due: '102,101.82', cb: '1,994.62', days: '18', bo: '5', boa: '22,660.73' },
  { id: '76530', name: 'BlueFern Tr…', codes: '1000', pr: 'High', od: '97,810.96', due: '129,291.01', cb: '2,189.04', days: '10', bo: '0', boa: '' },
  { id: '22804', name: 'Linden & Ro…', codes: '1000', pr: 'High', od: '49,752.85', due: '76,718.91', cb: '10,247.15', days: '10', bo: '0', boa: '', act: 'Call Customer' },
  { id: '82033', name: 'Copperfield…', codes: '3000', pr: 'High', od: '45,700.06', due: '53,810.25', cb: '14,299.94', days: '18', bo: '0', boa: '82,622.47' },
  { id: '82047', name: 'Halden Fre…', codes: '4000', pr: 'High', od: '70,616.73', due: '80,095.18', cb: '9,383.27', days: '8', bo: '5', boa: '', act: 'Review and Approve' },
  { id: '102944', name: 'Wexford Su…', codes: '1000', pr: 'Medium', od: '109,522.35', due: '117,760.25', cb: '4,477.65', days: '17', bo: '0', boa: '' },
  { id: '102937', name: 'Ashgrove Mi…', codes: '1000', pr: 'Medium', od: '91,456.10', due: '136,810.25', cb: '8,543.90', days: '18', bo: '0', boa: '' },
  { id: '28290', name: 'Fernhill Lo…', codes: '3000', pr: 'Medium', od: '18,400.00', due: '30,400.00', cb: '31,600.00', days: '14', bo: '0', boa: '' },
]
const CHILD: WRow[] = [
  { id: '', name: '', codes: '1000', od: '51,346.20', due: '62,213.54', cb: '1006.55', days: '18', bo: '2', boa: '12,112.03', act: 'Email Customer' },
  { id: '', name: '', codes: '3000', od: '40,665.73', due: '39888.28', cb: '988.07', days: '16', bo: '3', boa: '10,548.70', act: 'Email Customer' }]
const HIST: [string, string, string][] = [
  ['Oct 14, 2026, 3:25:35 PM', '3000: A blocked orders email with the subject “Blocked Orders - Kestrel Foods Limited - 92341” was sent to the customer contacts.', 'Email Sent · agent@collections.example'],
  ['Sep 22, 2026, 9:44:28 AM', '1000: A credit limit reached email with the subject “Credit Limit Reached - Kestrel Foods Limited - 92341” was sent to the customer contacts.', 'Email Failed · agent@collections.example'],
  ['Aug 13, 2026, 2:20:15 PM', '1000: A remittance advice email with the subject “Remittance Advice - Kestrel Foods Limited - 92341” was sent to Finance.', 'Email Sent · agent@collections.example']]
export function LoopCollections({ t }: { t: number }) {
  const a = A.collections
  const clicks = [2.0, 4.8, 11.0, 17.6]
  const exp = easeOut(fade(t, 2.0, 2.7))
  const p2 = easeOut(fade(t, 4.9, 5.5))
  const onW = t < 5.0, onC = t >= 5.0
  const dlg = easeOut(fade(t, 11.2, 11.8)), dlgOn = t >= 11.2 && t < 18.4
  const body = ty('Hello, your account has two open credit notes that can be offset against the upcoming payment. Copies are attached for your review. Please let us know if you have any questions.', t, 11.9, 52)
  const at1 = fade(t, 14.6, 15.0), at1ok = t >= 15.5, at2 = fade(t, 15.4, 15.8), at2ok = t >= 16.3
  const sending = t >= 17.6 && t < 18.3, done = t >= 18.8
  const hist = easeOut(fade(t, 19.0, 19.8))
  const toast = fade(t, 18.7, 19.0) * (1 - fade(t, 22.0, 22.4))
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.9, s: 1, x: 750, y: 380 }, { t: 1.6, s: 1.45, x: 520, y: 330 }, { t: 2.8, s: 1.45, x: 520, y: 330 }, { t: 3.2, s: 1.4, x: 930, y: 330 }, { t: 4.0, s: 1.4, x: 930, y: 330 }, { t: 4.6, s: 1.45, x: 520, y: 330 }, { t: 5.2, s: 1.45, x: 520, y: 330 }, { t: 5.8, s: 1.4, x: 520, y: 270 }, { t: 8.0, s: 1.4, x: 520, y: 270 }, { t: 9.0, s: 1.4, x: 520, y: 470 }, { t: 11.2, s: 1.4, x: 520, y: 470 }, { t: 11.9, s: 1.25, x: 750, y: 380 }, { t: 18.3, s: 1.25, x: 750, y: 380 }, { t: 19.0, s: 1.1, x: 750, y: 380 }, { t: 22.0, s: 1.1, x: 750, y: 380 }, { t: 23.0, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1250, 620], [0.8, 1250, 620], [1.9, 160, 310], [2.5, 160, 310], [3.3, 1290, 346], [3.9, 1290, 346], [4.7, 215, 310], [5.0, 215, 310], [6.0, 1010, 640], [10.2, 1010, 640], [10.9, 200, 483], [11.6, 200, 483], [12.4, 1250, 640], [16.3, 1250, 640], [17.4, 462, 630], [18.2, 462, 630], [19.0, 1010, 640]]
  const caps: [number, number, string][] = [[0.3, 4.4, 'A prioritised worklist, one row per customer'], [4.6, 11.0, 'Customer 360: the insight and the next best action'], [11.2, 14.6, 'The email is drafted for you'], [14.6, 17.4, 'Attachments are fetched automatically'], [17.6, 19.0, 'A person approves before it is sent'], [19.0, 23.0, 'The send is logged in the account history']]
  const Shell = <>
    <Box x={0} y={0} w={W} h={54} s={{ background: '#fff', borderBottom: `2px solid ${U.line}` }} />
    {[0, 1, 2].map(i => <Box key={i} x={30} y={18 + i * 8} w={22} h={3} s={{ background: U.ink, borderRadius: 2 }} />)}
    <Txt x={76} y={12} w={420} h={30} size={21} weight={500} color={LINK}>Collections Assistant</Txt>
    <Box x={1390} y={14} w={26} h={26} s={{ borderRadius: 13, border: `3px solid ${U.ink}`, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</Box>
    <Box x={1432} y={9} w={36} h={36} s={{ borderRadius: 18, background: a.tint, border: `3px solid ${a.a}` }} />
  </>
  const COLS: [string, number, number, boolean][] = [['Customer ID', 66, 80, false], ['Customer Name', 150, 130, false], ['Company Codes', 290, 100, false], ['Priority', 424, 90, false], ['Overdue Amount', 490, 140, true], ['Due by End of Month', 630, 140, true], ['Credit Balance', 770, 140, true], ['Predicted Average Arrear Days', 910, 120, true], ['Blocked Orders', 1030, 90, true], ['Blocked Orders Amount', 1120, 130, true], ['Actions', 1270, 150, false]]
  const RH = 36, R0 = 256
  const rowY = (i: number) => R0 + i * RH + (i >= 2 ? 2 * RH * exp : 0)
  const WCell = ({ r, y, bg, hov, i }: { r: WRow; y: number; bg: string; hov?: boolean; i: number }) => <div style={{ opacity: easeOut(fade(t, 0.1 + i * 0.07, 0.6 + i * 0.07)) }}>
    <Box x={49} y={y} w={1402} h={RH} s={{ background: bg, borderBottom: `2px solid ${U.line}` }} />
    <Txt x={66} y={y + 5} w={80} h={26} size={17}>{r.id}</Txt>
    <Txt x={150} y={y + 5} w={140} h={26} size={17} weight={500} color={LINK} s={{ textDecoration: hov ? 'underline' : 'none' }}>{r.codes === '' ? <><span style={{ marginRight: 8, display: 'inline-block',  }}>{exp > 0.5 ? '⌄' : '›'}</span>{r.name}</> : r.name}</Txt>
    <Txt x={290} y={y + 5} w={100} h={26} size={17}>{r.codes}</Txt>
    {r.pr && <Box x={424} y={y + 6} w={70} h={24} s={{ borderRadius: 5, background: PR[r.pr][0], color: PR[r.pr][1], fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.pr}</Box>}
    {([['od', 490], ['due', 630], ['cb', 770]] as [keyof WRow, number][]).map(([k, x]) => <Txt key={k} x={x} y={y + 5} w={140} h={26} size={17} s={{ textAlign: 'right' }}><Usd v={r[k] as string} /></Txt>)}
    <Txt x={910} y={y + 5} w={120} h={26} size={17} s={{ textAlign: 'right' }}>{r.days}</Txt>
    <Txt x={1030} y={y + 5} w={90} h={26} size={17} s={{ textAlign: 'right' }}>{r.bo}</Txt>
    <Txt x={1120} y={y + 5} w={130} h={26} size={17} s={{ textAlign: 'right' }}>{r.boa ? <Usd v={r.boa} /> : ''}</Txt>
    <Txt x={1270} y={y + 5} w={160} h={26} size={17} color={r.act ? LINK : U.mute}>{r.act ? <><span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 7, background: LINK, marginRight: 8, verticalAlign: -1 }} />{r.act}</> : '--'}</Txt>
    <Txt x={1430} y={y + 5} w={16} h={26} size={17} color={U.mute}>›</Txt>
  </div>
  return <Stage id="collections" t={t} dur={COLLECTIONS_LOOP} cam={cam} cur={cur} clicks={clicks} caps={caps}>
    <Box x={0} y={0} w={W} h={H} s={{ background: '#fff' }} />
    {Shell}

    <Box x={0} y={54} w={W} h={H - 54} s={{ opacity: onW ? 1 : 0, visibility: onW ? 'visible' : 'hidden' }}>
      <Txt x={48} y={6} w={700} h={40} size={30} weight={700} color={LINK}>My Collection Worklist  ⌄</Txt>
      <Txt x={48} y={48} w={700} h={26} size={17} color={U.mute}>Last agent review: 11/09/26 11:59 PM</Txt>
    </Box>
    <Box x={0} y={0} w={W} h={H} s={{ opacity: onW ? 1 : 0, visibility: onW ? 'visible' : 'hidden' }}>
      <Box x={48} y={134} w={1404} h={H - 134 - 20} s={{ border: `2px solid ${U.line}`, borderRadius: 10, background: '#fff' }} />
      <Txt x={66} y={146} w={170} h={36} size={20} weight={700}>Accounts (20)</Txt>
      {([['Overdue Amount', '69.38M USD', 250, 232], ['Due by End of Month', '82.69M USD', 490, 300], ['High Risk Customers', '8', 800, 250], ['Blocked Orders', '10', 1060, 200]] as [string, string, number, number][]).map(([l, v, x, w]) =>
        <Box key={l} x={x - 10} y={146} w={w} h={36} s={{ background: '#EEF1F5', borderLeft: `5px solid ${a.a}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 12px', fontSize: 16 }}><span>{l}</span><b style={{ fontWeight: 600 }}>{v}</b></Box>)}
      <Txt x={1350} y={146} w={36} h={36} size={22} color={a.a}>⚙</Txt><Txt x={1400} y={146} w={36} h={36} size={22} color={a.a}>⤢</Txt>
      <Box x={49} y={196} w={1402} h={60} s={{ borderTop: `2px solid ${U.line}`, borderBottom: `2px solid ${U.line}`, background: '#fff' }} />
      {COLS.map(([l, x, w, r]) => <Box key={l} x={x} y={198} w={w} h={56} s={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', display: 'flex', alignItems: 'center', justifyContent: r ? 'flex-end' : 'flex-start', textAlign: r ? 'right' : 'left' }}>{l === 'Priority' ? <span><span style={{ color: a.a }}>✦ </span>Priority</span> : l === 'Predicted Average Arrear Days' ? <span><span style={{ color: a.a }}>✦ </span>Predicted Avg Arrear Days</span> : l}</Box>)}
      {W_ROWS.map((r, i) => { const idx = i; const y = rowY(idx); const hov = i === 1 && t >= 4.0
        return <WCell key={r.id} r={r} y={y} i={i} hov={hov} bg={i === 1 ? '#F4F8FC' : '#fff'} /> })}
      {CHILD.map((r, k) => <div key={k} style={{ opacity: exp, visibility: exp > 0 ? 'visible' : 'hidden' }}><WCell r={r} y={R0 + (2 + k) * RH} i={0} bg="#F4F8FC" /></div>)}
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: 1, visibility: onC ? 'visible' : 'hidden', transform: `translateX(${(1 - p2) * 50}px)`, background: '#fff' }}>
      <Box x={0} y={54} w={W} h={H - 54} s={{ background: '#fff' }} />
      <Txt x={48} y={66} w={700} h={24} size={16} color={LINK}>Collection Worklist  <span style={{ color: U.mute }}>/  Kestrel Foods Limited</span></Txt>
      <Txt x={48} y={92} w={700} h={44} size={34} weight={700}>Kestrel Foods Limited</Txt>
      <Txt x={48} y={138} w={900} h={26} size={16} color={U.mute}>Customer Contact: <span style={{ color: LINK, fontWeight: 600 }}>p.morris@kestrelfoods.example</span>, <span style={{ color: LINK }}>2 more</span>   <span style={{ color: a.a }}>✦</span> Priority: <span style={{ background: PR.High[0], color: PR.High[1], borderRadius: 5, padding: '2px 12px', fontWeight: 700, fontSize: 14 }}>High</span></Txt>
      <Box x={1350} y={94} w={98} h={38} s={{ border: `2px solid ${LINK}`, borderRadius: 8, color: LINK, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Close</Box>
      <Box x={0} y={176} w={W} h={H - 176} s={{ background: '#F4F6F8' }} />

      <Box x={48} y={188} w={950} h={128} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 10, opacity: easeOut(fade(t, 5.6, 6.2)) }}>
        <Txt x={20} y={12} w={600} h={32} size={20} weight={700}><span style={{ color: a.a }}>✦  </span>Insights and Recommendations</Txt>
        <Box x={0} y={50} w={946} h={2} s={{ background: U.line }} />
        <Txt x={20} y={58} w={900} h={28} size={18} weight={700}>Multiple invoices in extreme arrears (&gt;90 days)</Txt>
        <Box x={20} y={86} w={906} h={36} s={{ fontSize: 16, lineHeight: '18px', color: U.ink }}>Customer has 92K currently overdue across 9 invoices, with the oldest overdue by 133 days. An additional 28K is due by the end of the month, increasing total exposure risk.</Box>
      </Box>
      <Box x={48} y={330} w={950} h={366} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 10, opacity: easeOut(fade(t, 6.4, 7.0)) }}>
        <Txt x={20} y={12} w={600} h={32} size={20} weight={700}><span style={{ color: a.a }}>◎  </span>Next Best Actions</Txt>
        {([['1000: Send Credit Note Copies', 'Invoice INV-30442310 of 92,011.93 is due in 5 days. There are 2 open credit notes totalling 65,345.65 on this account. Sending copies now gives the customer time to offset against the upcoming payment and reduce the amount owed.', 'Send Credit Note Copies'], ['3000: Chase Overdue Invoices', '18,792.78 is overdue across 2 invoices, with the oldest now 24 days past due. The customer’s average days-to-pay is 27. Escalating via a direct email with a firm deadline may prompt the overdue payment before month-end.', 'Send Email']] as [string, string, string][]).map(([h, b, btn], i) =>
          <Box key={h} x={20} y={56 + i * 150} w={906} h={140} s={{ background: i === 0 && done ? '#DDF3E6' : NBA_BG, border: `2px solid ${i === 0 && done ? '#9FD6B5' : NBA_LINE}`, borderRadius: 8 }}>
            <Txt x={16} y={10} w={870} h={26} size={17} weight={700}>{h}</Txt>
            <Box x={16} y={38} w={874} h={54} s={{ fontSize: 15.5, lineHeight: '18px', color: U.ink }}>{b}</Box>
            <Box x={16} y={96} w={i === 0 ? 232 : 118} h={34} s={{ background: '#fff', border: `2px solid ${i === 0 && done ? U.ok : LINK}`, borderRadius: 7, color: i === 0 && done ? U.ok : LINK, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: i === 0 && clk(t, [11.0]) ? 'scale(.97)' : 'none' }}>{i === 0 && done ? '✓ Sent' : <><span>➤</span>{btn}</>}</Box>
          </Box>)}
      </Box>
      <Box x={48} y={710} w={950} h={90} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 10 }}>
        {['Account Overview', 'Open Items', 'Disputes'].map((l, i) => <Txt key={l} x={20 + [0, 190, 330][i]} y={16} w={180} h={30} size={17} weight={i === 0 ? 700 : 400} color={i === 0 ? LINK : U.ink}>{l}</Txt>)}
        <Box x={20} y={48} w={158} h={3} s={{ background: LINK }} />
      </Box>

      <Box x={1030} y={176} w={470} h={H - 176} s={{ background: '#fff', borderLeft: `2px solid ${U.line}`, overflow: 'hidden' }}>
        <Txt x={24} y={14} w={400} h={34} size={20} weight={700}>↺  Account History</Txt>
        {['All', '1000', '3000', '4000'].map((l, i) => <Txt key={l} x={24 + i * 78} y={66} w={70} h={28} size={16} weight={i === 0 ? 700 : 400} color={i === 0 ? LINK : U.ink}>{l}</Txt>)}
        <Box x={24} y={96} w={44} h={3} s={{ background: LINK }} />
        {[['Nov 11, 2026, 6:52:10 AM', '1000: A credit note copies email with the subject “Credit Note Copies - Kestrel Foods Limited - 92341” was sent to the customer contacts, with 2 attachments.', 'Email Sent · agent@collections.example'], ...HIST].map(([d, tx, st], i) => {
          const yy = i === 0 ? 120 : 120 + (i - 1) * 136 + 136 * hist
          const o = i === 0 ? hist : 1
          return <div key={i} style={{ opacity: o }}>
            {i === 0 && <Box x={16} y={yy - 6} w={430} h={132} s={{ background: '#E8F6EE', borderRadius: 8 }} />}
            <Box x={24} y={yy + 6} w={10} h={10} s={{ borderRadius: 5, background: i === 0 ? U.ok : '#9AA6B4' }} />
            <Txt x={44} y={yy} w={400} h={22} size={14} color={U.mute}>{d}</Txt>
            <Box x={44} y={yy + 24} w={400} h={62} s={{ fontSize: 14.5, lineHeight: '20px' }}>{tx}</Box>
            <Txt x={44} y={yy + 88} w={400} h={20} size={14} color={U.mute}>{st}</Txt>
            <Txt x={44} y={yy + 108} w={200} h={20} size={14} color={LINK} weight={600}>View Email</Txt></div>
        })}
      </Box>
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ visibility: dlgOn ? 'visible' : 'hidden', pointerEvents: 'none', background: '#E6ECF2' }}>
      <Box x={360} y={80} w={780} h={600} s={{ background: '#fff', border: `2px solid ${U.line}`, borderRadius: 14, boxShadow: '0 40px 80px -20px rgba(0,30,60,.5)', transform: `translateY(${(1 - dlg) * 30}px)`, opacity: dlg }}>
        <Txt x={28} y={20} w={640} h={40} size={26} weight={700}>Send Credit Note Copies</Txt>
        <Txt x={700} y={20} w={50} h={40} size={28} color={U.mute}>×</Txt>
        <Txt x={28} y={90} w={90} h={30} size={17} color={U.mute}>To</Txt>
        <Box x={120} y={82} w={634} h={46} s={{ border: `2px solid ${U.line}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px' }}><span style={{ background: a.tint, borderRadius: 6, padding: '4px 12px', fontSize: 17 }}>p.morris@kestrelfoods.example</span><span style={{ color: U.mute, fontSize: 17 }}>+2 more</span></Box>
        <Txt x={28} y={148} w={90} h={30} size={17} color={U.mute}>Subject</Txt>
        <Box x={120} y={140} w={634} h={46} s={{ border: `2px solid ${U.line}`, borderRadius: 8, padding: '0 14px', fontSize: 19, lineHeight: '42px', ...line1 }}>Credit note copies for your account</Box>
        <Txt x={28} y={204} w={500} h={24} size={14} mono color={a.a}>✦ DRAFTED BY THE AGENT · EDITABLE</Txt>
        <Box x={28} y={234} w={726} h={118} s={{ border: `2px solid ${U.line}`, borderRadius: 8, padding: '10px 16px', fontSize: 19, lineHeight: '29px', overflow: 'hidden' }}>{body}{t >= 11.9 && t < 14.6 && caret(t) && <span style={{ display: 'inline-block', width: 2, height: 22, background: a.a, verticalAlign: 'middle' }} />}</Box>
        <Txt x={28} y={370} w={600} h={24} size={14} mono color={U.mute}>ATTACHMENTS · FETCHED AUTOMATICALLY</Txt>
        {([['Credit note CN-20417.pdf', at1, at1ok], ['Credit note CN-20463.pdf', at2, at2ok]] as [string, number, boolean][]).map(([n, o, ok], i) =>
          <Box key={n} x={28} y={400 + i * 56} w={726} h={48} s={{ border: `2px solid ${ok ? a.a : U.line}`, background: ok ? a.tint : '#fff', borderRadius: 8, opacity: o, display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', fontSize: 19 }}>
            <span style={{ width: 22, height: 28, borderRadius: 4, background: a.a, flex: 'none' }} /><span style={{ flex: 1, ...line1 }}>{n}</span><span style={{ fontFamily: M, fontSize: 15, color: ok ? a.a : U.mute, flex: 'none' }}>{ok ? 'ATTACHED' : 'FETCHING'}</span></Box>)}
        <Box x={28} y={520} w={140} h={50} s={{ borderRadius: 8, background: sending ? U.ok : a.a, color: '#fff', fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [17.6]) ? 'scale(.97)' : 'none' }}>{sending ? 'Sending…' : 'Send'}</Box>
        <Box x={184} y={520} w={120} h={50} s={{ borderRadius: 8, border: `2px solid ${LINK}`, color: LINK, fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</Box>
      </Box>
    </Box>
    <Box x={980} y={66} w={400} h={48} s={{ background: U.ok, color: '#fff', borderRadius: 10, fontSize: 19, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: toast, visibility: toast > 0 ? 'visible' : 'hidden', boxShadow: '0 20px 40px -15px rgba(0,60,30,.5)' }}>✓ Email sent to the customer</Box>
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
