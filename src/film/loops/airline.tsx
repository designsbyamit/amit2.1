import type { ReactNode } from 'react'
import { Box, Txt, Ico, PhoneStage, Float, PH, one, center, fin, clk, type Cam, type Cur, type Look } from './kit'

/* ───────────── Airline: from “Where to?” to a boarding pass (16 s), on the phone ───────────── */
export const AIRLINE_LOOP = 16
const L: Look = { mesh: 'airline-app', a: '#1DB86A', tint: '#E5F8EE', dark: '#063B2A' }
const K = { bg: '#0E1012', card: '#1B1E22', card2: '#23272C', ln: '#2C3137', ink: '#F2F4F5', mu: '#9AA2AB', faint: '#6C747D', g: '#22C373', gD: '#0F6E3F', gS: '#173B2A' }
const ln = (c = K.ln) => `1.5px solid ${c}`
const PX = 22, PW = PH.w - 44

const QR = Array.from({ length: 81 }, (_, i) => { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x) > 0.5 })

export function LoopAirline({ t }: { t: number }) {
  const v = t < 2.8 ? 1 : t < 7.2 ? 2 : t < 11.2 ? 3 : 4
  const tr = (a: number) => fin(t, a, 0.4)
  const to = t >= 4.0, dates = t >= 4.9, pax = t >= 5.6
  const sel = t >= 9.4
  const clicks = [1.8, 3.6, 6.6, 9.4, 10.6]
  const cam: Cam[] = [{ t: 0, s: 1, x: 900, y: 430 }, { t: 0.8, s: 1, x: 900, y: 430 }, { t: 1.6, s: 1.3, x: 900, y: 300 }, { t: 2.9, s: 1.3, x: 900, y: 300 }, { t: 3.4, s: 1.3, x: 900, y: 330 }, { t: 6.0, s: 1.3, x: 900, y: 440 }, { t: 7.4, s: 1.3, x: 900, y: 340 }, { t: 9.8, s: 1.3, x: 900, y: 440 }, { t: 10.6, s: 1.3, x: 900, y: 560 }, { t: 11.4, s: 1.12, x: 900, y: 420 }, { t: 15.2, s: 1.12, x: 900, y: 420 }, { t: 15.8, s: 1, x: 900, y: 430 }]
  const cur: Cur[] = [[0, 290, 520], [0.6, 290, 520], [1.6, 200, 206], [2.0, 200, 206], [3.2, 300, 300], [3.8, 300, 300], [4.4, 300, 420], [6.2, 195, 640], [6.8, 195, 640], [8.4, 260, 250], [9.6, 260, 250], [10.4, 195, 776], [10.8, 195, 776]]
  const caps: [number, string][] = [[0, 'Home knows what’s happening now'], [1.8, 'Book a flight in a few taps'], [7.2, 'Clear choices, the best one first'], [11.2, 'The boarding pass, ready on confirmation']]
  const Status = <Box x={0} y={0} w={PH.w} h={54} s={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 34px', fontSize: 16, fontWeight: 600 }}><span>9:41</span><span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ width: 18, height: 10, borderRadius: 2, border: `1.5px solid ${K.ink}` }} /></span></Box>
  const screen = (n: number, a: number, children: ReactNode) => { const on = v === n, o = on ? tr(a) : 0
    return <Box x={0} y={0} w={PH.w} h={PH.h} s={{ opacity: o, visibility: on ? 'visible' : 'hidden', transform: `translateX(${(1 - o) * 24}px)`, background: K.bg }}>{children}</Box> }
  const accent = <>
    <Float x={1130} y={180} w={400} h={176} s={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-.02em' }}>RUH</span><Ico n="plane" s={30} c={L.a} /><span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-.02em' }}>DXB</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 17, color: '#647081' }}><span>Riyadh</span><span>Dubai</span></div>
      <div style={{ display: 'flex', gap: 28, marginTop: 18, fontSize: 15, color: '#647081' }}><span>Seat <b style={{ color: '#141B24', fontWeight: 600 }}>14A</b></span><span>Gate <b style={{ color: '#141B24', fontWeight: 600 }}>12A</b></span><span>Departs <b style={{ color: '#141B24', fontWeight: 600 }}>07:40</b></span></div>
    </Float>
    <Float x={290} y={600} w={360} h={84} s={{ padding: '0 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 44, height: 44, borderRadius: 22, background: L.tint, ...center }}><Ico n="check" s={24} c="#16794C" w={2.2} /></span>
      <span style={{ fontSize: 21, fontWeight: 500 }}>Trip to Dubai confirmed</span>
    </Float>
  </>
  return <PhoneStage look={L} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent} dark>
    <Box x={0} y={0} w={PH.w} h={PH.h} s={{ background: K.bg }} />
    {screen(1, -1, <>
      {Status}
      <Txt x={PX} y={70} w={200} h={22} size={15} color={K.mu}>Good morning</Txt>
      <Txt x={PX} y={92} w={240} h={40} size={32} weight={600}>Hi, Ahmad.</Txt>
      <Txt x={PX} y={134} w={260} h={22} size={14} color={K.mu}>You have 47,500 Reward Miles</Txt>
      <Box x={PH.w - PX - 92} y={78} w={92} h={34} s={{ borderRadius: 10, background: K.g, color: '#062417', fontSize: 14, fontWeight: 600, ...center }}>Check-in</Box>
      <Box x={PX} y={178} w={PW} h={52} s={{ borderRadius: 14, background: K.card, border: ln(t >= 1.6 && t < 2.8 ? K.g : K.ln), display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: 16, color: K.mu, transform: clk(t, [1.8]) ? 'scale(.98)' : 'none' }}>Where to?<Ico n="search" s={20} c={K.g} /></Box>
      <Txt x={PX} y={252} w={200} h={24} size={16} weight={600}>Happening now</Txt>
      <Box x={PX} y={286} w={PW} h={176} s={{ borderRadius: 18, background: K.card, border: ln() }}>
        <Box x={16} y={16} w={74} h={26} s={{ borderRadius: 13, background: K.gS, color: K.g, fontSize: 13, fontWeight: 600, ...center }}>On time</Box>
        <Txt x={180} y={18} w={130} h={22} size={14} color={K.g} weight={500} s={{ textAlign: 'right' }}>Boarding pass</Txt>
        <Txt x={16} y={56} w={300} h={32} size={24} weight={600}>RUH <span style={{ color: K.faint, fontWeight: 400 }}>→</span> DXB</Txt>
        <Txt x={16} y={90} w={300} h={20} size={14} color={K.mu}>Gate closes in 1h 05m</Txt>
        {[['Terminal', '4'], ['Gate', '12A'], ['Departure', '22:45']].map(([l, val], i) => <div key={l}><Txt x={16 + i * 112} y={124} w={100} h={18} size={12.5} color={K.faint}>{l}</Txt><Txt x={16 + i * 112} y={142} w={100} h={22} size={17} weight={600}>{val}</Txt></div>)}
      </Box>
      <Txt x={PX} y={484} w={200} h={24} size={16} weight={600}>Special offers</Txt>
      <Box x={PX} y={518} w={PW} h={120} s={{ borderRadius: 18, background: `linear-gradient(135deg, ${K.g}, ${K.gD})`, padding: 16, color: '#04170E' }}>
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, background: 'rgba(255,255,255,.35)', fontSize: 12, fontWeight: 600 }}>New</span>
        <div style={{ fontSize: 19, fontWeight: 600, marginTop: 26 }}>Weekend fares to Dubai</div>
        <div style={{ fontSize: 14, marginTop: 2 }}>from SAR 299</div>
      </Box>
      <Box x={0} y={PH.h - 92} w={PH.w} h={92} s={{ background: K.card, borderTop: ln(), display: 'flex', justifyContent: 'space-around', paddingTop: 16 }}>
        {(['pin', 'plane', 'cal', 'user'] as const).map((n, i) => <Ico key={n} n={n} s={24} c={i === 0 ? K.g : K.faint} />)}
      </Box>
    </>)}
    {screen(2, 2.8, <>
      {Status}
      <Box x={PX} y={66} w={24} h={24}><Ico n="chevL" s={24} c={K.ink} /></Box>
      <Txt x={PX} y={104} w={300} h={40} size={30} weight={600}>Book a flight</Txt>
      {['Round trip', 'One way', 'Multi city'].map((q, i) => <Txt key={q} x={PX + i * 108} y={160} w={100} h={24} size={15} weight={i === 0 ? 600 : 400} color={i === 0 ? K.ink : K.mu}>{q}</Txt>)}
      <Box x={PX} y={188} w={86} h={2} s={{ background: K.g }} />
      <Box x={PX} y={190} w={PW} h={1.5} s={{ background: K.ln }} />
      {[['From', 'RUH', 'Riyadh', true], ['To', to ? 'DXB' : '···', to ? 'Dubai' : 'Choose a city', to]].map(([l, c, n, on], i) => <Box key={l as string} x={PX + i * (PW / 2 + 6)} y={214} w={PW / 2 - 6} h={112} s={{ borderRadius: 16, background: K.card, border: ln(i === 1 && t >= 3.6 && t < 4.4 ? K.g : K.ln), textAlign: 'center', paddingTop: 14, transform: i === 1 && clk(t, [3.6]) ? 'scale(.98)' : 'none' }}>
        <div style={{ fontSize: 13, color: K.mu }}>{l}</div><div style={{ fontSize: 30, fontWeight: 600, marginTop: 4, color: on ? K.ink : K.faint, opacity: i === 1 ? (to ? fin(t, 4.0, 0.3) : 1) : 1 }}>{c}</div><div style={{ fontSize: 13, color: K.mu, marginTop: 2 }}>{n}</div></Box>)}
      <Box x={PH.w / 2 - 17} y={253} w={34} h={34} s={{ borderRadius: 17, background: K.gS, border: ln(K.bg), ...center }}><Ico n="swap" s={18} c={K.g} /></Box>
      <Box x={PX} y={342} w={PW} h={66} s={{ borderRadius: 16, background: K.card, border: ln(), padding: '10px 16px', opacity: dates ? fin(t, 4.9, 0.4) : 0.35 }}>
        <div style={{ fontSize: 13, color: K.g }}>Travel dates</div><div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{dates ? 'Thu, 24 Aug – Fri, 5 Sep' : 'Choose dates'}</div>
        {dates && <span style={{ position: 'absolute', right: 14, top: 20, width: 24, height: 24, borderRadius: 12, background: K.g, ...center }}><Ico n="check" s={15} c="#062417" w={2.6} /></span>}</Box>
      <Box x={PX} y={420} w={PW} h={66} s={{ borderRadius: 16, background: K.card, border: ln(), padding: '10px 16px', opacity: pax ? fin(t, 5.6, 0.4) : 0.35 }}>
        <div style={{ fontSize: 13, color: K.g }}>Passengers and class</div><div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>1 Adult · Economy</div>
        {pax && <span style={{ position: 'absolute', right: 14, top: 20, width: 24, height: 24, borderRadius: 12, background: K.g, ...center }}><Ico n="check" s={15} c="#062417" w={2.6} /></span>}</Box>
      <Box x={PX} y={616} w={PW} h={54} s={{ borderRadius: 14, background: pax ? K.g : K.card2, color: pax ? '#062417' : K.faint, fontSize: 17, fontWeight: 600, ...center, transform: clk(t, [6.6]) ? 'scale(.98)' : 'none' }}>Search flights</Box>
    </>)}
    {screen(3, 7.2, <>
      {Status}
      <Box x={PX} y={66} w={24} h={24}><Ico n="chevL" s={24} c={K.ink} /></Box>
      <Txt x={PX} y={104} w={320} h={36} size={26} weight={600}>RUH → DXB</Txt>
      <Txt x={PX} y={142} w={320} h={22} size={14} color={K.mu}>Thu, 24 Aug · 1 Adult · Economy</Txt>
      {[['07:40', '10:05', '2h 25m · Direct', 'SAR 645', 'Best'], ['11:15', '13:45', '2h 30m · Direct', 'SAR 590', 'Cheapest'], ['16:20', '20:55', '4h 35m · 1 stop', 'SAR 610', '']].map(([d, a, m, p, tag], i) => { const hot = i === 0 && sel, o = fin(t, 7.5 + i * 0.25, 0.4)
        return <Box key={d} x={PX} y={184 + i * 128} w={PW} h={114} s={{ borderRadius: 16, background: hot ? K.gS : K.card, border: ln(hot ? K.g : K.ln), padding: '14px 16px', opacity: o, transform: `translateY(${(1 - o) * 10}px) scale(${clk(t, [9.4]) && i === 0 ? 0.985 : 1})` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 22, fontWeight: 600 }}>{d} <span style={{ color: K.faint, fontWeight: 400 }}>→</span> {a}</span>{tag && <span style={{ padding: '3px 10px', borderRadius: 10, background: i === 0 ? K.g : K.card2, color: i === 0 ? '#062417' : K.mu, fontSize: 12, fontWeight: 600 }}>{tag}</span>}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, fontSize: 14, color: K.mu }}><span>{m}</span><span style={{ color: K.ink, fontSize: 18, fontWeight: 600 }}>{p}</span></div>
        </Box> })}
      <Box x={PX} y={756} w={PW} h={54} s={{ borderRadius: 14, background: sel ? K.g : K.card2, color: sel ? '#062417' : K.faint, fontSize: 17, fontWeight: 600, ...center, transform: clk(t, [10.6]) ? 'scale(.98)' : 'none' }}>{sel ? 'Continue · SAR 645' : 'Choose a flight'}</Box>
    </>)}
    {screen(4, 11.2, <>
      {Status}
      <Box x={PX} y={78} w={PW} h={34} s={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 600 }}><span style={{ width: 30, height: 30, borderRadius: 15, background: K.g, ...center, transform: `scale(${0.7 + 0.3 * fin(t, 11.4, 0.4)})` }}><Ico n="check" s={18} c="#062417" w={2.6} /></span>Trip to Dubai confirmed</Box>
      <Box x={PX} y={136} w={PW} h={560} s={{ borderRadius: 24, background: `linear-gradient(160deg, ${K.g} 0%, #17A35E 60%, ${K.gD} 100%)`, color: '#04170E', opacity: fin(t, 11.6, 0.5), transform: `translateY(${(1 - fin(t, 11.6, 0.5)) * 20}px)` }}>
        <Box x={24} y={26} w={PW - 48} h={44} s={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 34, fontWeight: 600 }}>RUH</span><span style={{ flex: 1, margin: '0 12px', borderTop: '1.5px dashed rgba(4,23,14,.45)', position: 'relative' }} /><Ico n="plane" s={26} c="#04170E" /><span style={{ flex: 1, margin: '0 12px', borderTop: '1.5px dashed rgba(4,23,14,.45)' }} /><span style={{ fontSize: 34, fontWeight: 600 }}>DXB</span></Box>
        <Box x={24} y={70} w={PW - 48} h={20} s={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span>Riyadh</span><span>Dubai</span></Box>
        {[['Seat', '14A'], ['Gate', '12A'], ['Departs', '07:40']].map(([l, val], i) => <div key={l}><Txt x={24 + i * 106} y={116} w={100} h={18} size={13} color="rgba(4,23,14,.7)">{l}</Txt><Txt x={24 + i * 106} y={136} w={100} h={30} size={24} weight={600} color="#04170E">{val}</Txt></div>)}
        <Box x={(PW - 220) / 2} y={200} w={220} h={220} s={{ borderRadius: 18, background: '#fff', padding: 22, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 3 }}>
          {QR.map((on, i) => { const r = Math.floor(i / 9), c = i % 9, eye = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3)
            return <span key={i} style={{ borderRadius: 2, background: eye || on ? '#0B0D10' : 'transparent', opacity: fin(t, 12.0 + (r + c) * 0.03, 0.2) }} /> })}
        </Box>
        <Txt x={24} y={446} w={PW - 48} h={22} size={14} color="rgba(4,23,14,.75)" s={{ textAlign: 'center' }}>Ahmad · Economy · Booking QX7R2K</Txt>
        <Box x={24} y={490} w={PW - 48} h={46} s={{ borderRadius: 12, background: 'rgba(4,23,14,.88)', color: K.g, fontSize: 15, fontWeight: 600, ...center, gap: 8 }}><Ico n="plus" s={16} c={K.g} />Add to Wallet</Box>
      </Box>
    </>)}
    <Box x={0} y={0} w={PH.w} h={PH.h} s={{ pointerEvents: 'none', ...one }} />
  </PhoneStage>
}
