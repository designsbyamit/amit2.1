import { Box, Txt, Ico, Stage, Float, W, H, one, center, fade, fin, clk, type Cam, type Cur, type Look } from './kit'

/* ───────────── Network manager: a pending circuit, activated, then its bandwidth (16 s) ───────────── */
export const DNM_LOOP = 16
const L: Look = { mesh: 'dnetworx', a: '#D52B1E', tint: '#FCE8E6', dark: '#3A0507', ui: '#fff' }
const K = { ink: '#111', ink2: '#3B3B3B', mu: '#6E6E6E', faint: '#9A9A9A', ln: '#E4E4E4', red: '#D52B1E', amb: '#E39A12', ambS: '#FFF3DC', ok: '#1F8A44', okS: '#E5F4EA', or: '#F07A0F', bl: '#1B79C8' }
const ln = (c = K.ln) => `1.5px solid ${c}`
const wave = (seed: number, amp: number) => Array.from({ length: 64 }, (_, i) => { const x = i / 63; const v = Math.abs(Math.sin(x * 11 + seed) * 0.55 + Math.sin(x * 23 + seed * 2.1) * 0.3 + Math.sin(x * 5 + seed) * 0.35); return [x, amp * v] })
const path = (pts: number[][], gx: number, gy: number, gw: number, gh: number) => pts.map(([x, v], i) => `${i ? 'L' : 'M'}${(gx + x * gw).toFixed(1)} ${(gy + gh - v * gh).toFixed(1)}`).join(' ')

export function LoopDnm({ t }: { t: number }) {
  const v = t < 4.4 ? 1 : 2
  const d2 = fin(t, 4.4, 0.45)
  const activating = t >= 7.0 && t < 9.0, active = t >= 9.0
  const prog = fade(t, 7.05, 8.95)
  const toast = fin(t, 9.1, 0.35) * (1 - fade(t, 11.6, 12.0))
  const tab = t >= 11.2 ? 1 : 0
  const draw = fade(t, 11.6, 13.6)
  const clicks = [3.6, 7.0, 11.2]
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 1.0, s: 1, x: 750, y: 380 }, { t: 1.8, s: 1.25, x: 600, y: 304 }, { t: 4.2, s: 1.25, x: 600, y: 304 }, { t: 5.0, s: 1.08, x: 694, y: 352 }, { t: 14.8, s: 1.08, x: 694, y: 352 }, { t: 15.6, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1100, 640], [0.5, 1100, 640], [1.6, 760, 420], [3.0, 422, 485], [3.8, 422, 485], [5.6, 1000, 420], [6.6, 1250, 186], [7.2, 1250, 186], [9.6, 1100, 420], [10.8, 520, 246], [11.4, 520, 246]]
  const caps: [number, string][] = [[0, 'Every circuit’s status, at a glance'], [3.6, 'Open the one that’s overdue'], [7.0, 'Activate it in one step'], [11.2, 'Then watch its bandwidth']]
  const circuits: [string, boolean][] = [['C0008580', true], ['C0001320', false], ['C0008621', true], ['C0002974', false], ['C0001244', false], ['C0001093', true], ['C0003871', true]]
  const Donut = ({ x, y, r, sw }: { x: number; y: number; r: number; sw: number }) => { const C = 2 * Math.PI * r; let acc = 0
    return <svg width={r * 2 + sw} height={r * 2 + sw} style={{ position: 'absolute', left: x - r - sw / 2, top: y - r - sw / 2 }}>
      {([[7, K.ok], [3, K.amb], [4, '#2B2B2B']] as [number, string][]).map(([n, c], i) => { const Lg = C * n / 14 - 3; const off = -acc * C / 14; acc += n
        return <circle key={i} cx={r + sw / 2} cy={r + sw / 2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeDasharray={`${Math.max(0, Lg)} ${C}`} strokeDashoffset={off} transform={`rotate(-90 ${r + sw / 2} ${r + sw / 2})`} /> })}
    </svg> }
  const accent = <>
    <Float x={1240} y={760} w={440} h={110} s={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 48, height: 48, borderRadius: 24, background: K.okS, ...center }}><Ico n="bolt" s={24} c={K.ok} /></span>
      <span style={{ lineHeight: '28px' }}><span style={{ display: 'block', fontSize: 22, fontWeight: 600 }}>Circuit C0008580 is active</span><span style={{ fontSize: 17, color: K.mu }}>Activated in one step</span></span>
    </Float>
  </>
  return <Stage look={L} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: '#fff', color: K.ink }} />
    <Box x={0} y={0} w={W} h={70} s={{ background: '#000' }} />
    <Txt x={40} y={18} w={200} h={34} size={26} weight={700} color="#fff">dNetWorX</Txt>
    {['Billing', 'Service', 'Orders', 'Repairs', 'Product Tools', 'Secure Messaging'].map((q, i) => <Txt key={q} x={430 + [0, 86, 174, 256, 344, 490][i]} y={22} w={160} h={26} size={17} weight={500} color="#fff">{q}</Txt>)}
    {[0, 1, 2].map(i => <Box key={i} x={1376 + i * 36} y={24} w={22} h={22} s={{ borderRadius: 11, border: '1.5px solid #fff' }} />)}
    <Box x={0} y={70} w={W} h={58} s={{ borderBottom: ln() }} />
    <Txt x={40} y={86} w={300} h={28} size={19} weight={600}>Dynamic Network Manager</Txt>
    {['Dashboard', 'Network Products', 'DNM Orders', 'Reports', 'Help & Support'].map((q, i) => { const on = (v === 1 && i === 0) || (v === 2 && i === 1), x = 420 + [0, 130, 300, 424, 520][i]
      return <div key={q}><Txt x={x} y={88} w={170} h={26} size={16} weight={on ? 600 : 400} color={on ? K.ink : K.mu}>{q}</Txt>{on && <Box x={x} y={124} w={q.length * 8.6} h={3} s={{ background: K.red }} />}</div> })}

    {/* dashboard */}
    <Box x={0} y={0} w={W} h={H} s={{ opacity: v === 1 ? 1 : 0, visibility: v === 1 ? 'visible' : 'hidden' }}>
      <Txt x={40} y={158} w={500} h={46} size={36} weight={700}>Service Activation</Txt>
      <Box x={1110} y={162} w={190} h={42} s={{ border: ln('#999'), borderRadius: 6, padding: '0 14px', fontSize: 16, lineHeight: '40px', color: K.mu, display: 'flex', alignItems: 'center', gap: 10 }}><Ico n="search" s={18} c={K.mu} />Type here</Box>
      <Box x={1316} y={162} w={144} h={42} s={{ border: '1.5px solid #111', borderRadius: 21, fontSize: 16, fontWeight: 600, ...center }}>View all</Box>
      <Box x={40} y={226} w={1420} h={366} s={{ border: ln(), borderRadius: 4 }} />
      <Txt x={66} y={250} w={240} h={32} size={23} weight={700}>Circuit status</Txt>
      <Donut x={190} y={398} r={70} sw={18} />
      <Txt x={130} y={374} w={120} h={42} size={38} weight={700} s={{ textAlign: 'center' }}>14</Txt>
      <Txt x={130} y={416} w={120} h={22} size={15} color={K.mu} s={{ textAlign: 'center' }}>Total</Txt>
      {([['7', 'Completed', K.ok], ['3', 'Pending', K.amb], ['4', 'Cancelled', '#2B2B2B']] as string[][]).map(([n, l, c], i) => <Box key={l} x={66 + i * 96} y={506} w={92} h={50} s={{ borderLeft: `4px solid ${c}`, paddingLeft: 10 }}><div style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px' }}>{n}</div><div style={{ fontSize: 14, color: K.mu }}>{l}</div></Box>)}
      {[['C0008580', 0], ['C0002380', 1], ['C0001320', 2]].map(([id, i]) => { const x = 360 + (i as number) * 366, hot = i === 0 && t >= 3.0
        return <div key={id as string}>
          <Box x={x} y={226} w={1.5} h={366} s={{ background: K.ln }} />
          <Txt x={x + 30} y={250} w={200} h={30} size={22} weight={600}>{id}</Txt>
          <Txt x={x + 196} y={254} w={150} h={22} size={14} color={K.mu} s={{ textAlign: 'right' }}>Activation overdue</Txt>
          <Box x={x + 30} y={292} w={230} h={26} s={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: K.amb }} />Pending activation</Box>
          <Box x={x + 270} y={290} w={76} h={28} s={{ borderRadius: 4, background: '#FCE8E6', color: K.red, fontSize: 14, fontWeight: 600, ...center }}>{5 - (i as number)} days</Box>
          <Txt x={x + 30} y={344} w={300} h={20} size={14} color={K.mu}>VPN</Txt>
          <Txt x={x + 30} y={366} w={300} h={24} size={16} weight={500}>SPRINKLEDODLES215</Txt>
          <Txt x={x + 30} y={412} w={300} h={20} size={14} color={K.mu}>VPN address</Txt>
          <Txt x={x + 30} y={434} w={300} h={24} size={16}>12 Harbour Way, Riverton</Txt>
          <Box x={x + 30} y={510} w={110} h={40} s={{ borderRadius: 20, background: hot ? '#333' : '#000', color: '#fff', fontSize: 15, fontWeight: 600, ...center, transform: clk(t, [3.6]) && i === 0 ? 'scale(.96)' : 'none' }}>Activate</Box>
        </div> })}
      <Txt x={40} y={630} w={500} h={40} size={30} weight={700}>Bandwidth utilization</Txt>
      <Box x={1316} y={630} w={144} h={42} s={{ border: '1.5px solid #111', borderRadius: 21, fontSize: 16, fontWeight: 600, ...center }}>Export</Box>
    </Box>

    {/* circuit */}
    <Box x={0} y={0} w={W} h={H} s={{ opacity: v === 2 ? d2 : 0, visibility: v === 2 ? 'visible' : 'hidden' }}>
      <Box x={70} y={160} w={30} h={30}><Ico n="chevL" s={28} c={K.ink} w={2} /></Box>
      <Txt x={108} y={154} w={200} h={42} size={34} weight={700}>Circuits</Txt>
      <Box x={70} y={214} w={230} h={44} s={{ border: ln('#999'), borderRadius: 4, padding: '0 14px', fontSize: 16, color: K.mu, display: 'flex', alignItems: 'center', gap: 10 }}><Ico n="search" s={18} c={K.mu} />Type here</Box>
      {circuits.map(([id, pend], i) => { const y = 272 + i * 62, sel = i === 0, st = sel && active ? 'Active' : pend ? 'Pending' : 'Active'
        return <div key={id}>
          {sel && <Box x={70} y={y} w={230} h={62} s={{ background: '#F4F4F4', borderLeft: `4px solid ${K.red}` }} />}
          <Box x={70} y={y + 61} w={230} h={1.5} s={{ background: K.ln }} />
          <Txt x={90} y={y + 18} w={120} h={26} size={17} weight={600}>{id}</Txt>
          <Box x={196} y={y + 18} w={96} h={26} s={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7, fontSize: 15, color: st === 'Active' ? K.ok : K.or }}><span style={{ width: 7, height: 7, borderRadius: 4, background: st === 'Active' ? K.ok : K.or }} />{st}</Box>
        </div> })}
      <Box x={320} y={150} w={1.5} h={610} s={{ background: K.ln }} />
      <Txt x={350} y={158} w={340} h={36} size={28} weight={700}>Circuit C0008580</Txt>
      <Box x={680} y={164} w={240} h={26} s={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: active ? K.ok : K.or, fontWeight: 500 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: active ? K.ok : K.or }} />{active ? 'Active' : 'Activation pending'}</Box>
      <Txt x={930} y={164} w={170} h={26} size={16} color={K.ink2} s={{ textAlign: 'right' }}>View details in DNM</Txt>
      <Box x={1140} y={152} w={230} h={50} s={{ borderRadius: 25, background: active ? K.okS : '#000', color: active ? K.ok : '#fff', border: active ? ln('#B9E0C6') : 'none', fontSize: 16, fontWeight: 600, ...center, gap: 8, overflow: 'hidden', transform: clk(t, [7.0]) ? 'scale(.97)' : 'none' }}>
        {active ? <><Ico n="check" s={18} c={K.ok} w={2.4} />Activated</> : activating ? 'Activating…' : 'Start activation'}
        {activating && <span style={{ position: 'absolute', left: 0, bottom: 0, height: 3, width: `${prog * 100}%`, background: K.red }} />}</Box>
      {['Overview', 'Bandwidth utilization', 'Orders', 'Reports'].map((q, i) => { const x = 350 + [0, 120, 330, 420][i], on = i === tab
        return <div key={q}><Txt x={x} y={226} w={210} h={26} size={16} weight={on ? 600 : 400} color={on ? K.ink : K.mu}>{q}</Txt>{on && <Box x={x} y={258} w={q.length * 8.4} h={3} s={{ background: K.red }} />}</div> })}
      <Box x={350} y={262} w={1060} h={1.5} s={{ background: K.ln }} />
      {tab === 0 && <>
        {([['Activation status', active ? 'Active since today' : 'Pending  ·  overdue by 5 days', 0, 0], ['Circuit type', 'Public IP / Internet', 0, 1], ['Service ID', '53327416', 0, 2], ['PVC', '5820282', 1, 0], ['VPN', 'TruGreenLtd', 1, 1], ['VRF name', 'V457192 : TrueGreen Ltd', 1, 2], ['VPN address', '2950 Ravens Rd, Marysville', 2, 0], ['Port speed', '9 Kbps', 2, 1], ['Bandwidth', '10 Kbps', 2, 2]] as [string, string, number, number][]).map(([l, val, c, r]) =>
          <div key={l}><Txt x={350 + c * 360} y={292 + r * 80} w={330} h={22} size={15} weight={600}>{l}</Txt><Txt x={350 + c * 360} y={316 + r * 80} w={330} h={26} size={17} color={l === 'Activation status' ? (active ? K.ok : K.ink) : K.ink}>{val}</Txt></div>)}
        <Box x={350} y={540} w={1060} h={124} s={{ borderRadius: 6, background: '#FAFAFA', border: ln(), padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Activation steps</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>{['Validate order', 'Provision port', 'Configure VPN', 'Run line test'].map((s2, i) => { const done = active || prog > (i + 1) / 4, cur2 = activating && !done && prog > i / 4
            return <div key={s2} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: done ? K.ink : K.mu }}>
              <span style={{ width: 26, height: 26, borderRadius: 13, border: ln(done ? K.ok : cur2 ? K.red : K.ln), background: done ? K.ok : '#fff', ...center, flex: 'none' }}>{done && <Ico n="check" s={14} c="#fff" w={2.6} />}</span>{s2}</div> })}</div>
        </Box>
      </>}
      {tab === 1 && <>
        <Txt x={350} y={300} w={400} h={30} size={21} weight={700}>Bandwidth utilization</Txt>
        <Box x={350} y={334} w={110} h={32} s={{ display: 'flex', border: '1.5px solid #000', fontSize: 14, fontWeight: 600 }}><span style={{ flex: 1, background: '#000', color: '#fff', ...center }}>Kbps</span><span style={{ flex: 1, ...center }}>Mbps</span></Box>
        <Box x={1010} y={334} w={180} h={32} s={{ borderBottom: ln('#999'), fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>November 2026<Ico n="chevD" s={16} c={K.ink} /></Box>
        <Box x={1220} y={334} w={180} h={32} s={{ borderBottom: ln('#999'), fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Monthly<Ico n="chevD" s={16} c={K.ink} /></Box>
        <svg width={1060} height={230} style={{ position: 'absolute', left: 350, top: 390 }}>
          {[0, 1, 2, 3, 4].map(i => <line key={i} x1={0} x2={1060} y1={10 + i * 50} y2={10 + i * 50} stroke="#EEE" strokeWidth={1.5} />)}
          <clipPath id="dnmclip"><rect x={0} y={0} width={1060 * draw} height={230} /></clipPath>
          <g clipPath="url(#dnmclip)">
            <path d={path(wave(1.2, 1), 0, 10, 1060, 200)} fill="none" stroke={K.or} strokeWidth={2.5} strokeLinejoin="round" />
            <path d={path(wave(4.1, 0.45), 0, 10, 1060, 200)} fill="none" stroke={K.bl} strokeWidth={2.5} strokeLinejoin="round" />
          </g>
        </svg>
        <Box x={350} y={636} w={1060} h={24} s={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, color: K.ink2 }}><span style={{ fontWeight: 600 }}>Capacity: 64 Kbps</span><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 3, background: K.or }} />Ingress speed</span><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 3, background: K.bl }} />Egress speed</span></Box>
      </>}
    </Box>
    <Box x={560} y={600} w={440} h={52} s={{ borderRadius: 26, background: '#111', color: '#fff', fontSize: 17, fontWeight: 500, ...center, gap: 10, opacity: toast, visibility: toast > 0 ? 'visible' : 'hidden', transform: `translateY(${(1 - toast) * 10}px)`, boxShadow: '0 20px 40px -16px rgba(0,0,0,.5)', ...one }}><Ico n="check" s={18} c="#4ADE80" w={2.4} />Circuit C0008580 is active</Box>
  </Stage>
}
