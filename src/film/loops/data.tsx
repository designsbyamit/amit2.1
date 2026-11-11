import { Box, Txt, Ico, Stage, Float, W, H, one, center, ty, fin, clk, caret, type Cam, type Cur, type Look } from './kit'

/* ───────────── Data and AI: find a data product you can trust (16 s) ───────────── */
export const DATA_LOOP = 16
const L: Look = { mesh: 'data-ai', a: '#8B7CFF', tint: '#241B45', dark: '#120D22', ui: '#120D22', fg: '#F1ECFF' }
const K = { bg: '#120D22', side: '#0F0A1E', sf: '#1B1434', sf2: '#241B45', ln: '#33295A', ink: '#F1ECFF', i2: '#B8B0D6', i3: '#8B83AA', pk: '#FF5C9D', vio: '#8B7CFF', mint: '#6DF0B0', mintS: '#123A2C', amb: '#FFC15C', ambS: '#3B2D12' }
const ln = (c = K.ln) => `1.5px solid ${c}`
const GR = `linear-gradient(90deg, ${K.pk}, ${K.vio})`
const P: [string, string, boolean, boolean, string, number][] = [
  ['Customer 360', 'Customer · CRM Platform', true, true, 'Updated today', 0.86],
  ['Customer churn signals', 'Customer · Analytics CoE', true, true, 'Updated today', 0.8],
  ['Revenue by region', 'Finance · Finance Data', false, true, 'Updated daily', 0.74],
  ['Supplier master', 'Supply chain · Procurement', false, false, 'In review since Monday', 0.42],
  ['Marketing attribution', 'Marketing · Growth Data', false, false, 'In review since Tuesday', 0.38],
  ['Product usage events', 'Product · Platform Data', false, true, 'Updated hourly', 0.7]]

export function LoopData({ t }: { t: number }) {
  const q = ty('customer', t, 1.9, 9)
  const typed = q.length > 0
  const filt = t >= 3.2, cert = t >= 4.6
  const panel = fin(t, 6.2, 0.5), panelOn = t >= 6.2
  const checks = ['Owner verified', 'Quality checks passing', 'Lineage documented', 'Access policy applied']
  const lin = fin(t, 9.4, 1.0)
  const granted = t >= 12.2
  const clicks = [1.6, 4.6, 5.9, 11.8]
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.7, s: 1, x: 750, y: 380 }, { t: 1.4, s: 1.22, x: 640, y: 300 }, { t: 5.4, s: 1.22, x: 640, y: 330 }, { t: 6.4, s: 1.2, x: 1060, y: 317 }, { t: 14.8, s: 1.2, x: 1060, y: 317 }, { t: 15.6, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 900, 600], [0.4, 900, 600], [1.4, 760, 160], [1.8, 760, 160], [3.6, 120, 470], [4.0, 120, 470], [4.4, 66, 470], [4.8, 66, 470], [5.6, 480, 330], [6.1, 480, 330], [8.0, 1300, 680], [11.5, 1180, 690], [12.0, 1180, 690]]
  const caps: [number, string][] = [[0, 'One marketplace for every data product'], [1.6, 'Search in plain words'], [4.4, 'Show only what is certified'], [6.2, 'Trust is shown, not claimed'], [9.4, 'Lineage, then access in one step']]
  const vis = (i: number) => (!filt || P[i][2]) && (!cert || P[i][3])
  const accent = <>
    <Float x={1290} y={24} w={420} h={238} s={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 24, fontWeight: 600 }}>Customer 360</span><span style={{ padding: '4px 12px', borderRadius: 14, background: '#E3F7EE', color: '#11744A', fontSize: 15, fontWeight: 500 }}>Certified</span></div>
      {checks.map(c => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 18, color: '#3A4553' }}><Ico n="check" s={20} c="#11744A" w={2.2} />{c}</div>)}
    </Float>
  </>
  return <Stage look={L} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: K.bg, color: K.ink }} />
    <Box x={1080} y={-280} w={760} h={760} s={{ borderRadius: 380, background: `radial-gradient(circle, ${K.vio}33, transparent 68%)` }} />
    <Box x={0} y={0} w={268} h={H} s={{ background: K.side, borderRight: ln() }} />
    <Box x={26} y={30} w={30} h={30} s={{ borderRadius: 9, background: GR }} />
    <Txt x={68} y={30} w={190} h={30} size={19} weight={600} color={K.ink}>Data marketplace</Txt>
    {['All products', 'Customer', 'Finance', 'Supply chain', 'Marketing', 'Product'].map((q2, i) => { const on = i === 0
      return <Box key={q2} x={16} y={96 + i * 46} w={236} h={40} s={{ borderRadius: 10, background: on ? K.sf2 : 'transparent', padding: '0 16px', fontSize: 17, lineHeight: '40px', fontWeight: on ? 500 : 400, color: on ? K.ink : K.i3 }}>{q2}</Box> })}
    <Txt x={30} y={402} w={200} h={20} size={13} mono color={K.i3}>TRUST</Txt>
    <Box x={28} y={434} w={238} h={36} s={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, color: K.i2 }}>
      <span style={{ width: 44, height: 26, borderRadius: 13, background: cert ? K.pk : K.ln, position: 'relative', flex: 'none', transform: clk(t, [4.6]) ? 'scale(.95)' : 'none' }}><span style={{ position: 'absolute', top: 3, left: cert ? 21 : 3, width: 20, height: 20, borderRadius: 10, background: '#fff' }} /></span>Certified only</Box>

    <Txt x={318} y={56} w={760} h={54} size={42} weight={600}>Find data you can trust</Txt>
    <Box x={318} y={128} w={720} h={58} s={{ borderRadius: 16, background: K.sf, border: ln(typed || (t >= 1.6 && t < 6) ? K.pk : K.ln), boxShadow: t >= 1.6 && t < 6 ? `0 0 0 5px ${K.pk}22` : 'none', display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', fontSize: 19, color: typed ? K.ink : K.i3 }}>
      <Ico n="search" s={22} c={typed ? K.pk : K.i3} /><span style={one}>{typed ? q : 'Search data products, domains, owners'}</span>{t >= 1.6 && t < 3.2 && caret(t) && <span style={{ width: 1.5, height: 22, background: K.pk, marginLeft: -12 }} />}</Box>
    <Box x={318} y={210} w={600} h={30} s={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 16, color: K.i2, fontWeight: 500 }}>
      {filt ? (cert ? 2 : 3) : 6} data products
      {cert && <span style={{ padding: '3px 12px', borderRadius: 14, border: ln(K.pk), color: K.pk, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, opacity: fin(t, 4.6, 0.3) }}>Certified<Ico n="close" s={12} c={K.pk} w={2.2} /></span>}</Box>
    {P.map(([n, m, , ce, up, qv], i) => { const x = 318 + (i % 3) * 360, y = 256 + Math.floor(i / 3) * 236, on = vis(i), hov = i === 0 && t >= 5.6 && t < 6.6
      return <Box key={n} x={x} y={y} w={340} h={216} s={{ borderRadius: 20, background: K.sf, border: ln(hov ? K.pk : K.ln), opacity: on ? 1 : 0.22, transform: `translateY(${hov ? -3 : 0}px) scale(${clk(t, [5.9]) && i === 0 ? 0.985 : 1})`, boxShadow: hov ? `0 18px 36px -18px ${K.pk}88` : 'none' }}>
        <Box x={20} y={20} w={42} h={42} s={{ borderRadius: 12, background: K.sf2, ...center }}><Ico n={i < 2 ? 'user' : i === 2 ? 'bars' : i === 3 ? 'layers' : i === 4 ? 'spark' : 'bolt'} s={20} c={K.i2} /></Box>
        <Box x={206} y={24} w={116} h={30} s={{ borderRadius: 15, background: ce ? K.mintS : K.ambS, color: ce ? K.mint : K.amb, fontSize: 14, fontWeight: 500, ...center, gap: 6 }}>{ce ? <><Ico n="check" s={14} c={K.mint} w={2.4} />Certified</> : 'In review'}</Box>
        <Txt x={20} y={96} w={300} h={30} size={21} weight={600}>{n}</Txt>
        <Txt x={20} y={126} w={300} h={22} size={15} color={K.i3}>{m}</Txt>
        <Box x={20} y={164} w={300} h={4} s={{ borderRadius: 2, background: K.ln }}><Box x={0} y={0} w={300 * qv} h={4} s={{ borderRadius: 2, background: GR }} /></Box>
        <Txt x={20} y={180} w={300} h={22} size={14} color={K.i3}>{up}</Txt>
      </Box> })}

    <Box x={0} y={0} w={W} h={H} s={{ background: 'rgba(7,4,15,.6)', opacity: panel, visibility: panelOn ? 'visible' : 'hidden' }} />
    <Box x={868} y={16} w={616} h={H - 32} s={{ borderRadius: 24, background: '#17102E', border: ln(), boxShadow: '0 40px 80px -30px rgba(0,0,0,.8)', opacity: panel, visibility: panelOn ? 'visible' : 'hidden', transform: `translateX(${(1 - panel) * 60}px)` }}>
      <Box x={28} y={28} w={128} h={30} s={{ borderRadius: 15, background: K.mintS, color: K.mint, fontSize: 14, fontWeight: 500, ...center, gap: 6 }}><Ico n="check" s={14} c={K.mint} w={2.4} />Certified</Box>
      <Box x={560} y={30} w={26} h={26}><Ico n="close" s={24} c={K.i3} /></Box>
      <Txt x={28} y={78} w={560} h={46} size={36} weight={600}>Customer 360</Txt>
      <Txt x={28} y={126} w={560} h={24} size={17} color={K.i3}>Customer · owned by CRM Platform</Txt>
      <Txt x={28} y={182} w={300} h={20} size={13} mono color={K.i3}>TRUST CHECKS</Txt>
      {checks.map((c, i) => { const ok = fin(t, 7.0 + i * 0.5, 0.35)
        return <Box key={c} x={28} y={214 + i * 52} w={560} h={42} s={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 19 }}>
          <span style={{ width: 28, height: 28, borderRadius: 14, background: ok > 0.5 ? K.mint : 'transparent', border: ln(ok > 0.5 ? K.mint : K.ln), ...center, flex: 'none' }}>{ok > 0.5 && <Ico n="check" s={16} c="#0B2A1E" w={2.6} />}</span>
          <span style={{ color: ok > 0.5 ? K.ink : K.i3 }}>{c}</span></Box> })}
      <Txt x={28} y={446} w={300} h={20} size={13} mono color={K.i3}>LINEAGE</Txt>
      {['CRM', 'Customer 360', 'Dashboards'].map((n, i) => <Box key={n} x={28 + i * 196} y={480} w={164} h={50} s={{ borderRadius: 12, background: i === 1 ? K.sf2 : K.sf, border: ln(i === 1 ? K.vio : K.ln), fontSize: 17, fontWeight: 500, ...center, opacity: fin(t, 9.4 + i * 0.35, 0.3) }}>{n}</Box>)}
      {[0, 1].map(i => <Box key={i} x={192 + i * 196} y={504} w={32 * Math.min(1, Math.max(0, lin * 2 - i))} h={1.5} s={{ background: K.vio }} />)}
      <Box x={28} y={572} w={560} h={1.5} s={{ background: K.ln }} />
      <Box x={28} y={598} w={granted ? 560 : 220} h={56} s={{ borderRadius: 14, background: granted ? K.mintS : GR, color: granted ? K.mint : '#fff', fontSize: 18, fontWeight: 500, ...center, gap: 10, transform: clk(t, [11.8]) ? 'scale(.98)' : 'none' }}>{granted ? <><Ico n="check" s={18} c={K.mint} w={2.4} />Access granted · read only</> : 'Request access'}</Box>
      {!granted && <Txt x={268} y={612} w={320} h={28} size={15} color={K.i3}>Approved by the data owner</Txt>}
    </Box>
  </Stage>
}
