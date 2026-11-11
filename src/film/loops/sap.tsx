import { Box, Txt, Ico, Stage, Float, U, W, H, line, SH, HL, one, center, clamp, ty, fade, fin, clk, caret, easeOut, M, type Cam, type Cur, type Look } from './kit'

/** The four SAP-era cover previews (illustrative data only). */
const A: Record<'signin' | 'collections' | 'search' | 'cds', Look> = {
  signin: { mesh: 'sap-signin', a: '#0B5F73', tint: '#E3F1F4', dark: '#053640' },
  collections: { mesh: 'sap-collections', a: '#005695', tint: '#E6EFF8', dark: '#02223F' },
  search: { mesh: 'sap-search', a: '#111160', tint: '#EBEBF7', dark: '#0A0A3A' },
  cds: { mesh: 'sap-compositional', a: '#5B43C8', tint: '#EFEBFC', dark: '#241A66' },
}
const line1 = one

const Button = ({ x, y, w, h = 56, label, a, on = true, pressed = false, prog }: { x: number; y: number; w: number; h?: number; label: string; a: string; on?: boolean; pressed?: boolean; prog?: number }) =>
  <Box x={x} y={y} w={w} h={h} s={{ borderRadius: 12, background: on ? a : U.off, color: on ? '#fff' : U.offInk, fontSize: 21, fontWeight: 500, ...center, transform: pressed ? 'scale(.985)' : 'none', overflow: 'hidden' }}>
    {label}{prog !== undefined && <div style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: `${prog * 100}%`, background: 'rgba(255,255,255,.85)' }} />}
  </Box>
const Field = ({ x, y, w, h = 56, value, focus, err, c, a, size = 21 }: { x: number; y: number; w: number; h?: number; value: string; focus?: boolean; err?: boolean; c: boolean; a: string; size?: number }) =>
  <Box x={x} y={y} w={w} h={h} s={{ borderRadius: 12, border: line(err ? U.err : focus ? a : U.line), boxShadow: focus && !err ? `0 0 0 4px ${a}1F` : err ? `0 0 0 4px ${U.err}14` : 'none', background: '#fff', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: size, color: U.ink, overflow: 'hidden', whiteSpace: 'nowrap' }}>
    {value}{focus && c && <span style={{ width: 1.5, height: size + 6, background: a, marginLeft: 2 }} />}
  </Box>

/* ───────────── Sign-in: identity first, with a clear error (16 s) ───────────── */
export const SIGNIN_LOOP = 16
export function LoopSignIn({ t }: { t: number }) {
  const a = A.signin.a, tint = A.signin.tint
  const CX = 480, CY = 80, CWd = 540, X = CX + 52, IW = CWd - 104
  const clicks = [1.6, 5.0, 8.4, 11.6]
  const email = ty('maya.r@example.com', t, 2.2, 9)
  const full = email.length === 18
  const emptyErr = t >= 1.7 && t < 2.2
  const s1 = 1 - fade(t, 6.0, 6.3), s2 = fade(t, 6.2, 6.5) * (1 - fade(t, 12.6, 12.9)), s3 = fade(t, 12.9, 13.3)
  const pw = t >= 6.8 && t < 9.8 ? Math.min(8, Math.floor((t - 6.8) * 10)) : t >= 9.8 ? Math.min(10, Math.floor((t - 9.8) * 10)) : 0
  const banner = easeOut(fade(t, 8.6, 8.9)) * (1 - fade(t, 9.7, 9.9))
  const bannerOn = t >= 8.6 && t < 9.9
  const prog1 = t >= 5.0 && t < 6.1 ? fade(t, 5.05, 6.0) : undefined
  const prog2 = t >= 11.6 && t < 12.8 ? fade(t, 11.65, 12.7) : undefined
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.9, s: 1, x: 750, y: 380 }, { t: 1.6, s: 1.16, x: 750, y: 384 }, { t: 14.4, s: 1.16, x: 750, y: 384 }, { t: 15.6, s: 1, x: 750, y: 380 }]
  const fieldY1 = CY + 230, btnY1 = CY + 330, fieldY2 = CY + 336, btnY2 = CY + 420
  const cur: Cur[] = [[0, 1180, 640], [0.4, 1180, 640], [1.4, X + IW - 60, btnY1 + 34], [1.8, X + IW - 60, btnY1 + 34], [2.1, X + IW - 40, fieldY1 + 34], [4.4, X + IW - 40, fieldY1 + 34], [4.9, X + IW - 60, btnY1 + 34], [5.4, X + IW - 60, btnY1 + 34], [6.6, X + IW - 40, fieldY2 + 34], [8.0, X + IW - 40, fieldY2 + 34], [8.3, X + IW - 60, btnY2 + 34], [8.8, X + IW - 60, btnY2 + 34], [9.5, X + IW - 40, fieldY2 + 34], [11.1, X + IW - 40, fieldY2 + 34], [11.5, X + IW - 60, btnY2 + 34], [12.6, X + IW - 60, btnY2 + 34]]
  const caps: [number, string][] = [[0, 'Identity first: start with who you are'], [1.6, 'Errors appear in the field, in plain words'], [6.2, 'Then the right method for that account'], [8.6, 'A clear banner, and the email stays put'], [11.6, 'Signed in, the same way in every product']]
  const accent = <>
    <Float x={1250} y={250} w={400} h={128} s={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, color: U.mute, fontFamily: M, letterSpacing: '.08em' }}>STEP 2 OF 2</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 24, fontWeight: 500 }}><span style={{ width: 34, height: 34, borderRadius: 17, background: tint, color: a, ...center }}><Ico n="shield" s={20} c={a} /></span>Password, then you’re in</div>
    </Float>
    <Float x={150} y={520} w={380} h={112} s={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 52, height: 52, borderRadius: 26, background: U.okBg, ...center }}><Ico n="check" s={26} c={U.ok} w={2} /></span>
      <div><div style={{ fontSize: 24, fontWeight: 500 }}>You are signed in</div><div style={{ fontSize: 18, color: U.mute, marginTop: 4 }}>The same way in every product</div></div>
    </Float>
  </>
  return <Stage look={A.signin} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: `radial-gradient(90% 80% at 50% 0%, ${tint} 0%, ${U.bg} 62%)` }} />
    <Box x={CX} y={CY} w={CWd} h={600} s={{ background: '#fff', borderRadius: 22, border: line(), boxShadow: SH.card }} />
    <Box x={X} y={CY + 46} w={40} h={40} s={{ borderRadius: 11, background: a, ...center }}><Box x={12} y={12} w={16} h={16} s={{ borderRadius: 4, border: '2px solid rgba(255,255,255,.9)' }} /></Box>
    <Txt x={X} y={CY + 108} w={IW} h={48} size={38} weight={600}>{s3 > 0.5 ? 'Welcome back' : 'Sign in'}</Txt>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s1, visibility: s1 > 0 ? 'visible' : 'hidden' }}>
      <Txt x={X} y={CY + 196} w={IW} h={28} size={19} color={U.mute}>Email or username</Txt>
      <Field x={X} y={fieldY1} w={IW} value={email} focus={t >= 2.0 && t < 5.0} err={emptyErr} c={caret(t)} a={a} />
      <Box x={X} y={fieldY1 + 62} w={IW} h={26} s={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, color: U.err, opacity: emptyErr ? 1 : 0 }}><Ico n="close" s={16} c={U.err} w={2} />Enter your email or username.</Box>
      <Button x={X} y={btnY1} w={IW} label={prog1 !== undefined ? 'Checking how you sign in' : 'Continue'} a={a} on={full} pressed={clk(t, [1.6, 5.0])} prog={prog1} />
      <Txt x={X} y={btnY1 + 92} w={IW} h={28} size={19} color={a} weight={500}>Need sign in assistance?</Txt>
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s2, visibility: s2 > 0 ? 'visible' : 'hidden' }}>
      <Box x={X} y={CY + 166} w={IW} h={50} s={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 25, background: tint, padding: '0 8px 0 10px', fontSize: 19, color: U.ink }}>
        <span style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', ...center }}><Ico n="user" s={18} c={a} /></span><span style={{ flex: 1, ...one }}>maya.r@example.com</span><span style={{ color: a, fontWeight: 500, padding: '0 12px' }}>Change</span></Box>
      <Box x={X} y={CY + 228} w={IW} h={0} s={{ overflow: 'visible' }} />
      <Txt x={X} y={fieldY2 - 34} w={IW} h={28} size={19} color={U.mute}>Password</Txt>
      <Field x={X} y={fieldY2} w={IW} value={'•'.repeat(pw)} focus={(t >= 6.6 && t < 8.4) || (t >= 9.6 && t < 11.6)} err={bannerOn} c={caret(t)} a={a} />
      <Box x={X} y={fieldY2 + 62} w={IW} h={0} />
      <Button x={X} y={btnY2} w={IW} label={prog2 !== undefined ? 'Signing you in' : 'Sign in'} a={a} on={pw > 0} pressed={clk(t, [8.4, 11.6])} prog={prog2} />
      <Box x={X} y={btnY2 + 82} w={IW} h={28} s={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, color: a, fontWeight: 500 }}><span>Forgot password?</span><span>Need assistance?</span></Box>
      <Box x={X} y={CY + 232} w={IW} h={60} s={{ borderRadius: 12, border: line('#F1B8B2'), background: U.errBg, color: U.err, fontSize: 18, lineHeight: '24px', padding: '7px 14px 7px 44px', opacity: banner, transform: `translateY(${(1 - banner) * -6}px)`, visibility: banner > 0 ? 'visible' : 'hidden' }}>
        <span style={{ position: 'absolute', left: 14, top: 18 }}><Ico n="shield" s={20} c={U.err} /></span>We couldn’t sign you in. Check the password and try again.</Box>
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: s3, visibility: s3 > 0 ? 'visible' : 'hidden' }}>
      <Box x={CX + CWd / 2 - 40} y={CY + 210} w={80} h={80} s={{ borderRadius: 40, background: U.okBg, ...center, transform: `scale(${0.85 + 0.15 * fin(t, 13.0, 0.5)})` }}><Ico n="check" s={40} c={U.ok} w={2} /></Box>
      <Txt x={X} y={CY + 318} w={IW} h={40} size={30} weight={600} s={{ textAlign: 'center' }}>You are signed in</Txt>
      <Box x={X} y={CY + 368} w={IW} h={60} s={{ fontSize: 19, lineHeight: '28px', color: U.mute, textAlign: 'center' }}>Your identity is verified. Taking you to your workspace.</Box>
      <Box x={X + 70} y={CY + 462} w={IW - 140} h={4} s={{ borderRadius: 2, background: U.line }}><Box x={0} y={0} w={(IW - 140) * fade(t, 13.2, 15.4)} h={4} s={{ borderRadius: 2, background: a }} /></Box>
    </Box>
  </Stage>
}

/* ───────────── Collections: worklist, Customer 360, an email with attachments (24 s) ───────────── */
export const COLLECTIONS_LOOP = 20
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
export function LoopCollections({ t: tt }: { t: number }) {
  const t = tt * 1.2
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
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.9, s: 1, x: 750, y: 380 }, { t: 1.6, s: 1.45, x: 520, y: 330 }, { t: 2.8, s: 1.45, x: 520, y: 330 }, { t: 3.2, s: 1.4, x: 930, y: 330 }, { t: 4.0, s: 1.4, x: 930, y: 330 }, { t: 4.6, s: 1.45, x: 520, y: 330 }, { t: 5.2, s: 1.45, x: 520, y: 330 }, { t: 5.8, s: 1.4, x: 520, y: 270 }, { t: 8.0, s: 1.4, x: 520, y: 270 }, { t: 9.0, s: 1.4, x: 520, y: 470 }, { t: 11.2, s: 1.4, x: 520, y: 470 }, { t: 11.9, s: 1.25, x: 750, y: 380 }, { t: 18.3, s: 1.25, x: 750, y: 380 }, { t: 19.0, s: 1.1, x: 682, y: 345 }, { t: 22.0, s: 1.1, x: 682, y: 345 }, { t: 23.0, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1250, 620], [0.8, 1250, 620], [1.9, 160, 310], [2.5, 160, 310], [3.3, 1290, 346], [3.9, 1290, 346], [4.7, 215, 310], [5.0, 215, 310], [6.0, 1010, 640], [10.2, 1010, 640], [10.9, 200, 483], [11.6, 200, 483], [12.4, 1250, 640], [16.3, 1250, 640], [17.4, 462, 630], [18.2, 462, 630], [19.0, 1010, 640]]
  const caps: [number, string][] = [[0, 'A prioritised worklist, one row per customer'], [4.6, 'Customer 360: the insight and the next best action'], [11.2, 'The email is drafted for you'], [14.6, 'Attachments are fetched automatically'], [17.6, 'A person approves before it is sent'], [19.0, 'The send is logged in the account history']]
  const Shell = <>
    <Box x={0} y={0} w={W} h={54} s={{ background: '#fff', borderBottom: `${HL} solid ${U.line}` }} />
    {[0, 1, 2].map(i => <Box key={i} x={30} y={18 + i * 8} w={22} h={3} s={{ background: U.ink, borderRadius: 2 }} />)}
    <Txt x={76} y={12} w={420} h={30} size={21} weight={500} color={LINK}>Collections Assistant</Txt>
    <Box x={1388} y={15} w={24} h={24}><Ico n="bell" s={24} c={U.ink2} /></Box>
    <Box x={1432} y={9} w={36} h={36} s={{ borderRadius: 18, background: a.tint, border: `${HL} solid ${a.a}` }} />
  </>
  const COLS: [string, number, number, boolean][] = [['Customer ID', 66, 80, false], ['Customer Name', 150, 130, false], ['Company Codes', 290, 100, false], ['Priority', 424, 90, false], ['Overdue Amount', 490, 140, true], ['Due by End of Month', 630, 140, true], ['Credit Balance', 770, 140, true], ['Predicted Average Arrear Days', 910, 120, true], ['Blocked Orders', 1030, 90, true], ['Blocked Orders Amount', 1120, 130, true], ['Actions', 1270, 150, false]]
  const RH = 36, R0 = 256
  const rowY = (i: number) => R0 + i * RH + (i >= 2 ? 2 * RH * exp : 0)
  const WCell = ({ r, y, bg, hov }: { r: WRow; y: number; bg: string; hov?: boolean; i?: number }) => <div>
    <Box x={49} y={y} w={1402} h={RH} s={{ background: bg, borderBottom: `${HL} solid ${U.line}` }} />
    <Txt x={66} y={y + 5} w={80} h={26} size={17}>{r.id}</Txt>
    <Txt x={150} y={y + 5} w={140} h={26} size={17} weight={500} color={LINK} s={{ textDecoration: hov ? 'underline' : 'none' }}>{r.codes === '' ? <><span style={{ marginRight: 8, display: 'inline-block',  }}>{exp > 0.5 ? '⌄' : '›'}</span>{r.name}</> : r.name}</Txt>
    <Txt x={290} y={y + 5} w={100} h={26} size={17}>{r.codes}</Txt>
    {r.pr && <Box x={424} y={y + 6} w={70} h={24} s={{ borderRadius: 5, background: PR[r.pr][0], color: PR[r.pr][1], fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.pr}</Box>}
    {([['od', 490], ['due', 630], ['cb', 770]] as [keyof WRow, number][]).map(([k, x]) => <Txt key={k} x={x} y={y + 5} w={140} h={26} size={17} s={{ textAlign: 'right' }}><Usd v={r[k] as string} /></Txt>)}
    <Txt x={910} y={y + 5} w={120} h={26} size={17} s={{ textAlign: 'right' }}>{r.days}</Txt>
    <Txt x={1030} y={y + 5} w={90} h={26} size={17} s={{ textAlign: 'right' }}>{r.bo}</Txt>
    <Txt x={1120} y={y + 5} w={130} h={26} size={17} s={{ textAlign: 'right' }}>{r.boa ? <Usd v={r.boa} /> : ''}</Txt>
    <Txt x={1270} y={y + 5} w={160} h={26} size={17} color={r.act ? LINK : U.mute}>{r.act ? <><span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 7, background: LINK, marginRight: 8, verticalAlign: -1 }} />{r.act}</> : '--'}</Txt>
    <Txt x={1430} y={y + 5} w={16} h={26} size={17} color={U.mute}>›</Txt>
  </div>
  const accent = <>
    <Float x={1220} y={150} w={440} h={140} s={{ padding: '22px 24px' }}>
      <div style={{ fontFamily: M, fontSize: 15, letterSpacing: '.1em', color: a.a }}>NEXT BEST ACTION</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}><span style={{ width: 44, height: 44, borderRadius: 12, background: a.tint, ...center, flex: 'none' }}><Ico n="mail" s={22} c={a.a} /></span><span style={{ fontSize: 22, fontWeight: 500, lineHeight: '28px' }}>Send credit note copies</span></div>
    </Float>
    <Float x={1230} y={730} w={430} h={150} s={{ padding: '20px 22px' }}>
      <div style={{ fontFamily: M, fontSize: 15, letterSpacing: '.1em', color: U.mute }}>FETCHED AUTOMATICALLY</div>
      {['Credit note CN-20417.pdf', 'Credit note CN-20463.pdf'].map(n => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 19 }}><Ico n="doc" s={20} c={a.a} /><span style={{ flex: 1 }}>{n}</span><Ico n="check" s={18} c={U.ok} w={2.2} /></div>)}
    </Float>
  </>
  return <Stage look={A.collections} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: '#fff' }} />
    {Shell}

    <Box x={0} y={54} w={W} h={H - 54} s={{ opacity: onW ? 1 : 0, visibility: onW ? 'visible' : 'hidden' }}>
      <Txt x={48} y={6} w={700} h={40} size={30} weight={700} color={LINK}>My Collection Worklist  ⌄</Txt>
      <Txt x={48} y={48} w={700} h={26} size={17} color={U.mute}>Last agent review: 11/09/26 11:59 PM</Txt>
    </Box>
    <Box x={0} y={0} w={W} h={H} s={{ opacity: onW ? 1 : 0, visibility: onW ? 'visible' : 'hidden' }}>
      <Box x={48} y={134} w={1404} h={H - 134 - 20} s={{ border: `${HL} solid ${U.line}`, borderRadius: 10, background: '#fff' }} />
      <Txt x={66} y={146} w={170} h={36} size={20} weight={700}>Accounts (20)</Txt>
      {([['Overdue Amount', '69.38M USD', 250, 290], ['Due by End of Month', '82.69M USD', 556, 300], ['High Risk Customers', '8', 872, 250], ['Blocked Orders', '10', 1138, 200]] as [string, string, number, number][]).map(([l, v, x, w]) =>
        <Box key={l} x={x - 10} y={146} w={w} h={36} s={{ background: '#EEF1F5', borderLeft: `5px solid ${a.a}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 12px', fontSize: 16, whiteSpace: 'nowrap', gap: 12 }}><span>{l}</span><b style={{ fontWeight: 600 }}>{v}</b></Box>)}
      <Box x={1356} y={152} w={24} h={24}><Ico n="filter" s={24} c={a.a} /></Box><Box x={1404} y={152} w={24} h={24}><Ico n="layers" s={24} c={a.a} /></Box>
      <Box x={49} y={196} w={1402} h={60} s={{ borderTop: `${HL} solid ${U.line}`, borderBottom: `${HL} solid ${U.line}`, background: '#fff' }} />
      {COLS.map(([l, x, w, r]) => <Box key={l} x={x} y={198} w={w} h={56} s={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', display: 'flex', alignItems: 'center', justifyContent: r ? 'flex-end' : 'flex-start', textAlign: r ? 'right' : 'left' }}>{l === 'Priority' ? <span><span style={{ color: a.a }}>✦ </span>Priority</span> : l === 'Predicted Average Arrear Days' ? <span><span style={{ color: a.a }}>✦ </span>Predicted Avg Arrear Days</span> : l}</Box>)}
      {CHILD.map((r, k) => <div key={k} style={{ visibility: exp > 0 ? 'visible' : 'hidden' }}><WCell r={r} y={R0 + (2 + k) * RH} i={0} bg="#F4F8FC" /></div>)}
      {W_ROWS.map((r, i) => { const idx = i; const y = rowY(idx); const hov = i === 1 && t >= 4.0
        return <WCell key={r.id} r={r} y={y} i={i} hov={hov} bg={i === 1 ? '#F4F8FC' : '#fff'} /> })}
    </Box>

    <Box x={0} y={0} w={W} h={H} s={{ opacity: 1, visibility: onC ? 'visible' : 'hidden', transform: `translateX(${(1 - p2) * 50}px)`, background: '#fff' }}>
      <Box x={0} y={54} w={W} h={H - 54} s={{ background: '#fff' }} />
      <Txt x={48} y={66} w={700} h={24} size={16} color={LINK}>Collection Worklist  <span style={{ color: U.mute }}>/  Kestrel Foods Limited</span></Txt>
      <Txt x={48} y={92} w={700} h={44} size={34} weight={700}>Kestrel Foods Limited</Txt>
      <Txt x={48} y={138} w={900} h={26} size={16} color={U.mute}>Customer Contact: <span style={{ color: LINK, fontWeight: 600 }}>p.morris@kestrelfoods.example</span>, <span style={{ color: LINK }}>2 more</span>   <span style={{ color: a.a }}>✦</span> Priority: <span style={{ background: PR.High[0], color: PR.High[1], borderRadius: 5, padding: '2px 12px', fontWeight: 600, fontSize: 14 }}>High</span></Txt>
      <Box x={1350} y={94} w={98} h={38} s={{ border: `${HL} solid ${LINK}`, borderRadius: 8, color: LINK, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Close</Box>
      <Box x={0} y={176} w={W} h={H - 176} s={{ background: '#F4F6F8' }} />

      <Box x={48} y={188} w={950} h={128} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 10, opacity: easeOut(fade(t, 5.0, 5.4)) }}>
        <Txt x={20} y={12} w={600} h={32} size={20} weight={700}><span style={{ color: a.a }}>✦  </span>Insights and Recommendations</Txt>
        <Box x={0} y={50} w={946} h={2} s={{ background: U.line }} />
        <Txt x={20} y={58} w={900} h={28} size={18} weight={700}>Multiple invoices in extreme arrears (&gt;90 days)</Txt>
        <Box x={20} y={86} w={906} h={36} s={{ fontSize: 16, lineHeight: '18px', color: U.ink }}>Customer has 92K currently overdue across 9 invoices, with the oldest overdue by 133 days. An additional 28K is due by the end of the month, increasing total exposure risk.</Box>
      </Box>
      <Box x={48} y={330} w={950} h={366} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 10, opacity: easeOut(fade(t, 5.2, 5.6)) }}>
        <Txt x={20} y={12} w={600} h={32} size={20} weight={700}><span style={{ color: a.a }}>◎  </span>Next Best Actions</Txt>
        {([['1000: Send Credit Note Copies', 'Invoice INV-30442310 of 92,011.93 is due in 5 days. There are 2 open credit notes totalling 65,345.65 on this account. Sending copies now gives the customer time to offset against the upcoming payment and reduce the amount owed.', 'Send Credit Note Copies'], ['3000: Chase Overdue Invoices', '18,792.78 is overdue across 2 invoices, with the oldest now 24 days past due. The customer’s average days-to-pay is 27. Escalating via a direct email with a firm deadline may prompt the overdue payment before month-end.', 'Send Email']] as [string, string, string][]).map(([h, b, btn], i) =>
          <Box key={h} x={20} y={56 + i * 150} w={906} h={140} s={{ background: i === 0 && done ? '#DDF3E6' : NBA_BG, border: `${HL} solid ${i === 0 && done ? '#9FD6B5' : NBA_LINE}`, borderRadius: 8 }}>
            <Txt x={16} y={10} w={870} h={26} size={17} weight={700}>{h}</Txt>
            <Box x={16} y={38} w={874} h={54} s={{ fontSize: 15.5, lineHeight: '18px', color: U.ink }}>{b}</Box>
            <Box x={16} y={96} w={i === 0 ? 232 : 118} h={34} s={{ background: '#fff', border: `${HL} solid ${i === 0 && done ? U.ok : LINK}`, borderRadius: 7, color: i === 0 && done ? U.ok : LINK, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: i === 0 && clk(t, [11.0]) ? 'scale(.97)' : 'none' }}>{i === 0 && done ? '✓ Sent' : <><span>➤</span>{btn}</>}</Box>
          </Box>)}
      </Box>
      <Box x={48} y={710} w={950} h={90} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 10 }}>
        {['Account Overview', 'Open Items', 'Disputes'].map((l, i) => <Txt key={l} x={20 + [0, 190, 330][i]} y={16} w={180} h={30} size={17} weight={i === 0 ? 700 : 400} color={i === 0 ? LINK : U.ink}>{l}</Txt>)}
        <Box x={20} y={48} w={158} h={3} s={{ background: LINK }} />
      </Box>

      <Box x={1030} y={176} w={470} h={H - 176} s={{ background: '#fff', borderLeft: `${HL} solid ${U.line}`, overflow: 'hidden' }}>
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
      <Box x={360} y={80} w={780} h={600} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 14, boxShadow: '0 40px 80px -20px rgba(0,30,60,.5)', transform: `translateY(${(1 - dlg) * 30}px)`, opacity: dlg }}>
        <Txt x={28} y={20} w={640} h={40} size={26} weight={700}>Send Credit Note Copies</Txt>
        <Box x={712} y={28} w={26} h={26}><Ico n="close" s={26} c={U.mute} /></Box>
        <Txt x={28} y={90} w={90} h={30} size={17} color={U.mute}>To</Txt>
        <Box x={120} y={82} w={634} h={46} s={{ border: `${HL} solid ${U.line}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px' }}><span style={{ background: a.tint, borderRadius: 6, padding: '4px 12px', fontSize: 17 }}>p.morris@kestrelfoods.example</span><span style={{ color: U.mute, fontSize: 17 }}>+2 more</span></Box>
        <Txt x={28} y={148} w={90} h={30} size={17} color={U.mute}>Subject</Txt>
        <Box x={120} y={140} w={634} h={46} s={{ border: `${HL} solid ${U.line}`, borderRadius: 8, padding: '0 14px', fontSize: 19, lineHeight: '42px', ...line1 }}>Credit note copies for your account</Box>
        <Txt x={28} y={204} w={500} h={24} size={14} mono color={a.a}>✦ DRAFTED BY THE AGENT · EDITABLE</Txt>
        <Box x={28} y={234} w={726} h={118} s={{ border: `${HL} solid ${U.line}`, borderRadius: 8, padding: '10px 16px', fontSize: 19, lineHeight: '29px', overflow: 'hidden' }}>{body}{t >= 11.9 && t < 14.6 && caret(t) && <span style={{ display: 'inline-block', width: 2, height: 22, background: a.a, verticalAlign: 'middle' }} />}</Box>
        <Txt x={28} y={370} w={600} h={24} size={14} mono color={U.mute}>ATTACHMENTS · FETCHED AUTOMATICALLY</Txt>
        {([['Credit note CN-20417.pdf', at1, at1ok], ['Credit note CN-20463.pdf', at2, at2ok]] as [string, number, boolean][]).map(([n, o, ok], i) =>
          <Box key={n} x={28} y={400 + i * 56} w={726} h={48} s={{ border: `${HL} solid ${ok ? a.a : U.line}`, background: ok ? a.tint : '#fff', borderRadius: 8, opacity: o, display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', fontSize: 19 }}>
            <span style={{ width: 22, height: 28, borderRadius: 4, background: a.a, flex: 'none' }} /><span style={{ flex: 1, ...line1 }}>{n}</span><span style={{ fontFamily: M, fontSize: 15, color: ok ? a.a : U.mute, flex: 'none' }}>{ok ? 'ATTACHED' : 'FETCHING'}</span></Box>)}
        <Box x={28} y={520} w={140} h={50} s={{ borderRadius: 8, background: sending ? U.ok : a.a, color: '#fff', fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [17.6]) ? 'scale(.97)' : 'none' }}>{sending ? 'Sending…' : 'Send'}</Box>
        <Box x={184} y={520} w={120} h={50} s={{ borderRadius: 8, border: `${HL} solid ${LINK}`, color: LINK, fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</Box>
      </Box>
    </Box>
    <Box x={980} y={66} w={400} h={48} s={{ background: U.ok, color: '#fff', borderRadius: 10, fontSize: 19, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: toast, visibility: toast > 0 ? 'visible' : 'hidden', boxShadow: '0 20px 40px -15px rgba(0,60,30,.5)' }}><Ico n="check" s={22} c="#fff" w={2} /><span style={{ marginLeft: 10 }}>Email sent to the customer</span></Box>
  </Stage>
}

/* ───────────── Search: a trip, booked through search (24 s), the same flow as the prototype ───────────── */
export const SEARCH_LOOP = 20
const TRIPS: [string, string][] = [['Business trip · SFO → BLR · Emirates EK237 · Jun 10-17', 'Travel'], ['Business trip · SFO → SIN · Singapore Airlines · Jul 3-10', 'Travel'], ['Conference · SFO → NRT · ANA NH106 · Aug 15-22', 'Travel']]
const FLIGHTS: [string, string, boolean][] = [
  ['Emirates · Economy · $1,240 · 21h 30m · 1 stop DXB', 'Departs 08:00 · arrives 23:30 +1 · preferred carrier for this route', true],
  ['Emirates · Economy · $980 · 23h 15m · 1 stop DXB', 'Cheapest · 1h 45m longer', true],
  ['United Airlines · Economy · $1,100 · 22h 50m · 1 stop FRA', 'Visa required · processing 5-7 days', true],
  ['Lufthansa · Business · $1,850 · 20h 15m · 1 stop MUC', 'Needs manager approval', false],
  ['Singapore Airlines · Economy · $1,120 · 24h 05m · 1 stop SIN', 'Policy compliant', true]]
const AI_TEXT = 'AI insight: Emirates EK237 is the preferred SFO → BLR route at $1,240. 1 stop in Dubai. Policy compliant. Preferred hotel: The Leela Palace, Bangalore.'
const VIOLET = '#6B3FD4', VIOLET_BG = '#F1EAFF'
export function LoopSearch({ t: tt }: { t: number }) {
  const t = tt * 1.2
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
  const caps: [number, string][] = [[0, 'Search is already in the shell bar'], [2.1, 'Type a sentence, not a query'], [6.0, 'AI reads the intent: route, dates, policy'], [9.8, 'One recommendation, and the reason why'], [12.0, 'Search to action: straight into the booking'], [15.2, 'Nothing to re-type: the trip arrives filled in'], [19.2, 'Booked from one sentence, within policy']]
  const fieldText = view === 1 ? (active ? q : 'Search') : view === 4 ? 'Search' : 'Palo Alto to Bangalore'
  const fieldOn = view === 1 ? active : view !== 4
  const Row = ({ y, name, app, focus, bold }: { y: number; name: string; app: string; focus?: boolean; bold?: string }) => <>
    <Box x={8} y={y} w={744} h={56} s={{ borderRadius: 10, background: focus ? a.tint : '#fff' }} />
    <Box x={24} y={y + 14} w={28} h={28} s={{ borderRadius: 14, border: `${HL} solid ${U.mute}` }} />
    <Txt x={68} y={y + 10} w={560} h={36} size={22}>{bold ? <><b style={{ fontWeight: 600 }}>{name.slice(0, bold.length)}</b>{name.slice(bold.length)}</> : name}</Txt>
    <Txt x={640} y={y + 12} w={96} h={32} size={19} color={U.mute} s={{ textAlign: 'right' }}>{app}</Txt></>
  const accent = <>
    <Float x={110} y={30} w={520} h={76} s={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 14, fontSize: 23, fontWeight: 500 }}><Ico n="spark" s={24} c={VIOLET} />flight to Bangalore next week</Float>
    <Float x={1290} y={520} w={420} h={120} s={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 48, height: 48, borderRadius: 24, background: U.okBg, ...center, flex: 'none' }}><Ico n="check" s={24} c={U.ok} w={2.2} /></span>
      <span style={{ lineHeight: '28px' }}><span style={{ display: 'block', fontSize: 22, fontWeight: 500 }}>Flight booked</span><span style={{ fontSize: 17, color: U.mute }}>EK237 · SFO → BLR · within policy</span></span>
    </Float>
  </>
  return <Stage look={A.search} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: U.bg }} />

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 1 ? 1 : 0 }}>
      <Txt x={200} y={24} w={700} h={46} size={38} weight={600}>Good morning</Txt>
      <Txt x={200} y={76} w={900} size={22} color={U.mute}>3 approvals waiting · 1 trip to plan</Txt>
      {[['To approve', '3'], ['My trips', '1'], ['Expenses', '2 open'], ['Goals', '4 on track']].map(([l, v], i) => <Box key={l} x={200 + i * 280} y={128} w={260} h={140} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 16 }}>
        <Txt x={22} y={20} w={216} size={20} color={U.mute}>{l}</Txt><Txt x={22} y={62} w={216} h={56} size={44} weight={300}>{v}</Txt></Box>)}
      <Box x={200} y={296} w={1100} h={340} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 16 }}>
        <Txt x={24} y={20} w={400} h={32} size={24} weight={600}>Today</Txt>
        {['Review Q3 supplier scorecard', 'Approve 3 purchase requisitions', 'Team 1:1 · 15:30'].map((x, i) => <div key={x}><Box x={0} y={72 + i * 84} w={1096} h={2} s={{ background: U.line }} /><Txt x={24} y={72 + i * 84 + 28} w={900} h={32} size={22} color={U.mute}>{x}</Txt></div>)}
      </Box>
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 2 ? v2 : 0, visibility: view === 2 ? 'visible' : 'hidden' }}>
      <Txt x={200} y={8} w={900} h={30} size={20} color={U.mute}>Results for “Palo Alto to Bangalore”</Txt>
      <Box x={200} y={48} w={1100} h={88} s={{ background: VIOLET_BG, border: `${HL} solid #C9B2F5`, borderRadius: 12, padding: '12px 18px', fontSize: 21, lineHeight: '30px', color: U.ink, overflow: 'hidden' }}><span style={{ color: VIOLET, marginRight: 8 }}>✦</span>{aiTxt}</Box>
      {FLIGHTS.map(([h, sub, ok], i) => { const p = easeOut(fade(t, 7.2 + i * 0.3, 7.8 + i * 0.3)), pf = i === 0 ? prefer : 0
        return <div key={h} style={{ opacity: p }}>
          <Box x={200} y={152 + i * 84} w={1100} h={76} s={{ background: pf > 0.5 ? a.tint : '#fff', border: `${HL} solid ${pf > 0.5 ? a.a : U.line}`, borderRadius: 12 }} />
          <Txt x={224} y={152 + i * 84 + 8} w={620} h={30} size={21} weight={500}>{h}</Txt>
          <Txt x={224} y={152 + i * 84 + 42} w={640} h={26} size={18} color={U.mute}>{sub}</Txt>
          <Box x={864} y={152 + i * 84 + 22} w={ok ? 164 : 150} h={32} s={{ borderRadius: 6, background: ok ? U.okBg : U.errBg, color: ok ? U.ok : U.err, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok ? '✓ Policy compliant' : 'Approval needed'}</Box>
          {i === 0 && <Box x={1038} y={152 + 22} w={118} h={32} s={{ borderRadius: 6, background: VIOLET, color: '#fff', fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pf }}>✦ Preferred</Box>}
          {i === 0 && <Box x={1166} y={152 + 16} w={110} h={44} s={{ borderRadius: 8, background: a.a, color: '#fff', fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [11.8]) ? 'scale(.96)' : 'none' }}>Select</Box>}
        </div> })}
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 3 ? v3 : 0, visibility: view === 3 ? 'visible' : 'hidden' }}>
      <Box x={530} y={140} w={440} h={320} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 20, boxShadow: '0 30px 60px -30px rgba(10,10,60,.35)' }}>
        <Box x={180} y={32} w={80} h={80} s={{ borderRadius: 40, background: '#2A5BD7', color: '#fff', fontSize: 40, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>V</Box>
        <Txt x={20} y={128} w={396} h={40} size={30} weight={600} s={{ textAlign: 'center' }}>Voyage</Txt>
        <Txt x={20} y={176} w={396} h={30} size={21} color={U.mute} s={{ textAlign: 'center' }}>Opening your booking…</Txt>
        <Box x={40} y={228} w={356} h={8} s={{ borderRadius: 4, background: U.line }}><Box x={0} y={0} w={356 * prog} h={8} s={{ borderRadius: 4, background: '#2A5BD7' }} /></Box>
        <Box x={158} y={256} w={120} h={42} s={{ border: `${HL} solid ${U.line}`, borderRadius: 8, color: a.a, fontSize: 19, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</Box>
      </Box>
    </Box>

    <Box x={0} y={56} w={W} h={H - 56} s={{ opacity: view === 4 ? v4 : 0, visibility: view === 4 ? 'visible' : 'hidden' }}>
      <Box x={0} y={0} w={W} h={52} s={{ background: '#2A5BD7' }} />
      <Txt x={200} y={9} w={700} h={34} size={26} weight={600} color="#fff">Book flight</Txt>
      <Txt x={200} y={70} w={900} size={18} color={U.mute}>Travel  →  SFO to Bangalore  →  Select flight  →  Review</Txt>
      <Box x={200} y={108} w={640} h={330} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 14 }}>
        <Txt x={24} y={20} w={592} h={34} size={23} weight={600}>EK237 · San Francisco (SFO) → Bangalore (BLR)</Txt>
        {[['Airline', 'Emirates'], ['Departure', '08:00, San Francisco Int’l (SFO)'], ['Arrival', '23:30 +1, Bangalore (BLR)'], ['Class', 'Economy'], ['Fare', '$1,240.00']].map(([l, v], i) =>
          <div key={l} style={{ opacity: easeOut(fade(t, 15.4 + i * 0.2, 15.9 + i * 0.2)) }}><Txt x={24} y={76 + i * 40} w={150} h={30} size={20} color={U.mute}>{l}</Txt><Txt x={180} y={76 + i * 40} w={436} h={30} size={20}>{v}</Txt></div>)}
        <Box x={24} y={284} w={210} h={32} s={{ borderRadius: 6, background: U.okBg, color: U.ok, fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓ Compliant with policy</Box>
      </Box>
      <Box x={864} y={108} w={436} h={540} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 14 }}>
        <Txt x={32} y={24} w={372} h={34} size={23} weight={600}>Booking summary</Txt>
        {fields.map(([l, v], i) => { const f = easeOut(fade(t, 16.0 + i * 0.5, 16.5 + i * 0.5)) * (1 - fade(t, 18.4 + i * 0.1, 19.0 + i * 0.1))
          return <div key={l}>
            <Box x={24} y={72 + i * 66} w={388} h={58} s={{ borderRadius: 8, background: `rgba(200,245,90,${0.55 * f})`, border: `2px solid rgba(120,170,20,${0.6 * f})` }} />
            <Txt x={40} y={72 + i * 66 + 4} w={360} h={24} size={17} color={U.mute}>{l}{f > 0.15 && <span style={{ color: '#3F6B00', fontWeight: 600, marginLeft: 10 }}>✦ from your search</span>}</Txt>
            <Txt x={40} y={72 + i * 66 + 28} w={360} h={26} size={21} weight={600}>{v}</Txt></div> })}
        <Box x={32} y={412} w={372} h={2} s={{ background: U.line }} />
        <Txt x={32} y={428} w={200} h={30} size={22} weight={600}>Total</Txt><Txt x={232} y={428} w={172} h={30} size={22} weight={600} s={{ textAlign: 'right' }}>$1,240.00</Txt>
        <Box x={32} y={468} w={372} h={56} s={{ borderRadius: 10, background: btn === 2 ? U.ok : '#2A5BD7', color: '#fff', fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: clk(t, [19.2]) ? 'scale(.98)' : 'none' }}>{['Book flight', 'Booking…', '✓ Booked'][btn]}</Box>
      </Box>
      {t >= 21.0 && <Box x={490} y={90} w={520} h={430} s={{ background: '#fff', border: `${HL} solid ${U.line}`, borderRadius: 20, boxShadow: '0 40px 80px -20px rgba(10,10,60,.45)', transform: `translateY(${(1 - booked) * 24}px)`, opacity: booked }}>
        <Box x={218} y={30} w={84} h={84} s={{ borderRadius: 42, background: U.ok, color: '#fff', fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</Box>
        <Txt x={20} y={128} w={476} h={40} size={30} weight={600} s={{ textAlign: 'center' }}>Flight booked</Txt>
        <Txt x={20} y={174} w={476} h={28} size={19} color={U.mute} s={{ textAlign: 'center' }}>EK237 · SFO → BLR · Jun 10-17 · $1,240.00</Txt>
        {['Itinerary sent to your inbox', 'Added to your calendar', 'Hotel suggested · The Leela Palace'].map((x, i) => { const p = easeOut(fade(t, 21.6 + i * 0.4, 22.1 + i * 0.4))
          return <Box key={x} x={28} y={226 + i * 64} w={460} h={52} s={{ borderRadius: 10, background: U.bg, opacity: p, transform: `translateX(${(1 - p) * 20}px)`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontSize: 20 }}><span style={{ color: U.ok, fontWeight: 600 }}>✓</span>{x}</Box> })}
      </Box>}
    </Box>

    <Box x={0} y={0} w={W} h={56} s={{ background: a.a }} />
    <Box x={24} y={14} w={28} h={28} s={{ borderRadius: 8, background: '#fff' }} />
    <Box x={1424} y={12} w={32} h={32} s={{ borderRadius: 16, background: a.tint }} />
    <Box x={640} y={9} w={700} h={38} s={{ borderRadius: 19, background: fieldOn ? '#fff' : '#2C2C86', display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontSize: 21, color: fieldOn ? U.ink : '#D6D6F5' }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, border: `${HL} solid ${fieldOn ? a.a : '#D6D6F5'}`, flex: 'none' }} />
      <span style={line1}>{fieldText}{active && t < 6.0 && caret(t) ? '|' : ''}</span></Box>
    <Box x={580} y={60} w={760} h={q ? 232 : 312} s={{ background: '#fff', borderRadius: 14, border: `${HL} solid ${U.line}`, boxShadow: '0 30px 60px -20px rgba(10,10,60,.35)', opacity: pop, visibility: pop > 0 ? 'visible' : 'hidden', overflow: 'hidden' }}>
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

/* ───────────── CDS: intent to output, IXO as a parallel layer (18 s) ───────────── */
export const CDS_LOOP = 18
const COLS = ['Intent', 'Context', 'Plan', 'Govern', 'Specify', 'Compose']
const CW = 206, GAP = 12, X0 = 196
const colX = (i: number) => X0 + i * (CW + GAP)
export function LoopCds({ t }: { t: number }) {
  const L = A.cds, a = L.a, tint = L.tint
  const S0 = 1.2, SD = 1.7
  const pos = clamp((t - S0) / SD, -1, 5.999)
  const step = t < S0 ? -1 : Math.floor(pos)
  const rowY = [154, 266, 378, 490]
  const lanes: [string, (string | null)[], boolean][] = [
    ['LLM', ['Reads the request', 'Reads the context', 'Reasons and plans', null, 'Writes the spec', null], false],
    ['IXO', ['Infer', 'Contextualise', 'Plan the experience', 'Govern', 'Specify', 'Evaluate'], true],
    ['CDS', [null, null, null, null, null, 'Compose from approved parts'], false],
    ['Guardrails', [null, null, null, 'Policies and permissions', null, 'Validate'], false]]
  const out = fin(t, 11.0, 0.6), ev = fin(t, 12.8, 0.6)
    const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.8, s: 1, x: 750, y: 380 }, ...[0, 1, 2, 3, 4, 5].map(i => ({ t: S0 + i * SD + 0.1, s: 1.14, x: i < 3 ? 658 : 842, y: 340 })), { t: S0 + 5 * SD + 1.2, s: 1.14, x: 842, y: 340 }, { t: 11.2, s: 1, x: 750, y: 380 }]
  const caps: [number, string][] = [[0, 'From a plain-language intent'], [S0, 'The LLM reads the request and the context'], [S0 + 2 * SD, 'IXO decides what experience should exist'], [S0 + 3 * SD, 'Policy enforces. The LLM only recommends'], [S0 + 5 * SD, 'CDS composes it from approved parts'], [12.8, 'IXO evaluates the result and feeds it back']]
  const bandP = t < S0 ? 0 : clamp((t - S0) / (6 * SD), 0, 1)
  const accent = <>
    <Float x={1270} y={630} w={420} h={150} s={{ padding: '22px 26px' }}>
      <div style={{ fontFamily: M, fontSize: 16, letterSpacing: '.1em', color: a }}>GENERATED EXPERIENCE</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 64, marginTop: 18 }}>{[1, 0.78, 0.56, 0.42, 0.3].map((h, k) => <div key={k} style={{ flex: 1, height: 64 * h, borderRadius: '5px 5px 2px 2px', background: k === 0 ? a : '#C6B9F4' }} />)}</div>
    </Float>
    <Float x={110} y={790} w={300} h={64} s={{ padding: '0 22px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, fontWeight: 500 }}><span style={{ width: 30, height: 30, borderRadius: 15, background: tint, ...center }}><Ico n="shield" s={18} c={a} /></span>Policy enforced</Float>
  </>
  return <Stage look={L} t={t} cam={cam} cur={[]} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: '#fff' }} />
    <Box x={56} y={34} w={1388} h={60} s={{ background: tint, border: line(`${a}55`), borderRadius: 30, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px' }}>
      <span style={{ fontFamily: M, fontSize: 16, letterSpacing: '.1em', color: a, flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}><Ico n="spark" s={20} c={a} />INTENT</span>
      <span style={{ width: 1.5, height: 24, background: `${a}44`, flex: 'none' }} />
      <span style={{ fontSize: 24, fontWeight: 500, ...one }}>“Help me understand why attrition is rising.”</span>
    </Box>
    {COLS.map((c, i) => <Txt key={c} x={colX(i)} y={112} w={CW} h={26} size={16} mono color={step >= i ? a : U.faint} weight={step === i ? 600 : 400} s={{ textAlign: 'center', letterSpacing: '.12em', textTransform: 'uppercase' }}>{c}</Txt>)}
    <Box x={186} y={rowY[1] - 10} w={1258} h={112} s={{ background: tint, borderRadius: 22 }} />
    <Box x={186} y={rowY[1] - 10} w={1258 * bandP} h={112} s={{ borderRadius: 22, boxShadow: `inset 0 0 0 1.5px ${a}` , opacity: bandP > 0 ? 1 : 0 }} />
    {lanes.map(([n, cells, hot], li) => <div key={n}>
      <Txt x={56} y={rowY[li] + 30} w={124} h={32} size={n === 'Guardrails' ? 19 : 21} weight={hot ? 600 : 500} color={hot ? a : U.ink2}>{n}</Txt>
      {cells.map((c, i) => { if (!c) return <Box key={i} x={colX(i) + CW / 2 - 3} y={rowY[li] + 43} w={6} h={6} s={{ borderRadius: 3, background: U.line }} />
        const act = step === i, past = step > i, k = act ? fin(t, S0 + i * SD, 0.35) : 0
        return <Box key={i} x={colX(i)} y={rowY[li]} w={CW} h={92} s={{ borderRadius: 14, background: act ? a : past ? (hot ? '#fff' : tint) : '#fff', color: act ? '#fff' : U.ink, border: line(act ? a : past ? `${a}66` : U.line), boxShadow: act ? `0 12px 24px -10px ${a}AA` : 'none', ...center, textAlign: 'center', padding: '0 14px', fontSize: 20, lineHeight: '26px', fontWeight: hot || act ? 500 : 400, transform: `translateY(${-3 * k}px)` }}>{c}</Box> })}
    </div>)}
    <Box x={196} y={608} w={606} h={128} s={{ background: '#fff', border: line(`${a}55`), borderRadius: 16, boxShadow: SH.card, opacity: out, transform: `translateY(${(1 - out) * 14}px)` }}>
      <Txt x={24} y={18} w={400} h={22} size={15} color={a} mono>GENERATED EXPERIENCE</Txt>
      <Box x={24} y={52} w={558} h={56} s={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>{[1, 0.78, 0.56, 0.42, 0.3].map((h, k) => <div key={k} style={{ flex: 1, height: 56 * h * fin(t, 11.2 + k * 0.1, 0.6), borderRadius: '5px 5px 2px 2px', background: k === 0 ? a : '#C6B9F4' }} />)}</Box>
    </Box>
    <Box x={824} y={608} w={620} h={128} s={{ background: tint, border: line(`${a}55`), borderRadius: 16, opacity: ev, transform: `translateY(${(1 - ev) * 14}px)` }}>
      <Txt x={24} y={18} w={560} h={22} size={15} color={a} mono>IXO EVALUATION · FEEDBACK LOOP</Txt>
      <Box x={24} y={52} w={570} h={60} s={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 23, fontWeight: 500 }}><span style={{ width: 36, height: 36, borderRadius: 18, background: '#fff', ...center, flex: 'none' }}><Ico n="check" s={20} c={a} w={2} /></span>Checked against the intent, then refined</Box>
    </Box>
  </Stage>
}
