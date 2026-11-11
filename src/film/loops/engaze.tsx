import { Box, Txt, Ico, Stage, Float, W, H, one, center, ty, fade, fin, clk, caret, type Cam, type Cur, type Look } from './kit'

/* ───────────── Engaze: a sick day, handled in one conversation (16 s) ───────────── */
export const ENGAZE_LOOP = 16
const L: Look = { mesh: 'engaze', a: '#6C4BF4', tint: '#EDE9FE', dark: '#2A1B78', ui: '#F4F1FC' }
const K = { bg: '#F4F1FC', ink: '#17122B', mu: '#736E8E', faint: '#A19CB8', ln: '#E6E1F3', v: '#6C4BF4', vS: '#EFEBFE', ok: '#15803D', okS: '#E6F5EC', okL: '#BFE5CE' }
const ln = (c = K.ln) => `1.5px solid ${c}`
const Orb = ({ x, y, r }: { x: number; y: number; r: number }) =>
  <Box x={x - r} y={y - r} w={r * 2} h={r * 2} s={{ borderRadius: r, background: 'radial-gradient(circle at 35% 30%, #fff 0%, #A9BCFF 38%, #B26BFF 74%, #FF8FB8 100%)', boxShadow: `0 ${r / 3}px ${r}px -${r / 3}px rgba(108,75,244,.45)` }} />
const Check = ({ x, y, on }: { x: number; y: number; on: number }) =>
  <Box x={x} y={y} w={20} h={20} s={{ opacity: on }}><Ico n="check" s={20} c="#22A06B" w={2.2} /></Box>

export function LoopEngaze({ t }: { t: number }) {
  const MX = 268, MW = 900, CXc = MX + MW / 2
  const Q1 = 'I’m down with a fever. Can I take today off?', Q2 = 'Set an out-of-office for today'
  const welcome = 1 - fade(t, 1.7, 2.0)
  const conv = fade(t, 1.9, 2.2)
  const scroll = 250 * fin(t, 9.2, 0.8)
  const applied = t >= 8.4, applying = t >= 7.6 && t < 8.4
  const typed2 = ty(Q2, t, 9.6, 22), sent2 = t >= 11.0
  const oooOn = t >= 14.2
  const sick = applied ? 4 : 5
  const clicks = [1.4, 7.6, 11.0, 13.8]
  const cam: Cam[] = [{ t: 0, s: 1, x: 750, y: 380 }, { t: 0.6, s: 1, x: 750, y: 380 }, { t: 1.4, s: 1.2, x: 875, y: 460 }, { t: 2.1, s: 1.2, x: 875, y: 300 }, { t: 9.0, s: 1.2, x: 875, y: 320 }, { t: 9.8, s: 1.2, x: 875, y: 440 }, { t: 14.6, s: 1.2, x: 875, y: 440 }, { t: 15.6, s: 1, x: 750, y: 380 }]
  const cur: Cur[] = [[0, 1000, 600], [0.3, 1000, 600], [1.2, 520, 572], [1.6, 520, 572], [5.0, 1000, 470], [7.2, 450, 498], [7.8, 450, 498], [9.4, 700, 700], [10.6, 1112, 702], [11.2, 1112, 702], [13.0, 900, 640], [13.6, 452, 646], [14.2, 452, 646]]
  const caps: [number, string][] = [[0, 'Ask in your own words'], [2.0, 'Engaze checks the balance, the policy and who to tell'], [5.0, 'A proposal to review, not an action taken'], [7.6, 'Applied, with an undo'], [9.6, 'One more thing, in the same conversation']]
  const yo = 120 - scroll
  const accent = <>
    <Float x={1250} y={730} w={430} h={150} s={{ padding: '22px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ width: 40, height: 40, borderRadius: 20, background: K.okS, ...center }}><Ico n="check" s={22} c={K.ok} w={2.2} /></span><span style={{ fontSize: 22, fontWeight: 500 }}>Sick leave applied for today</span></div>
      <div style={{ fontSize: 18, color: K.mu, marginTop: 14, lineHeight: '26px' }}>Within policy. Your manager and team know you’re out.</div>
    </Float>
  </>
  return <Stage look={L} t={t} cam={cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    <Box x={0} y={0} w={W} h={H} s={{ background: K.bg, color: K.ink }} />
    {/* sidebar */}
    <Box x={22} y={24} w={30} h={30}><Ico n="layers" s={30} c={K.v} w={2} /></Box>
    <Txt x={62} y={22} w={180} h={34} size={24} weight={600}>engaze</Txt>
    <Box x={18} y={78} w={228} h={46} s={{ background: '#fff', border: ln(), borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', fontSize: 17, fontWeight: 500 }}><Ico n="plus" s={18} c={K.ink} />New conversation</Box>
    <Txt x={28} y={146} w={200} h={22} size={14} color={K.faint} weight={500}>Today</Txt>
    <Box x={18} y={172} w={228} h={42} s={{ background: K.vS, borderRadius: 10, padding: '0 14px', fontSize: 16, lineHeight: '42px', color: K.v, fontWeight: 500, ...one }}>{t >= 2.0 ? 'Sick leave today' : 'New conversation'}</Box>
    <Txt x={28} y={238} w={200} h={22} size={14} color={K.faint} weight={500}>Earlier</Txt>
    {['Cab reimbursement, Pune', 'My Gen AI training plan', 'Update my address'].map((q, i) => <Txt key={q} x={32} y={268 + i * 40} w={210} h={26} size={16} color={K.mu}>{q}</Txt>)}
    <Box x={18} y={680} w={228} h={58} s={{ background: '#fff', border: ln(), borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px' }}>
      <span style={{ width: 34, height: 34, borderRadius: 17, background: '#F0735A', color: '#fff', fontSize: 15, fontWeight: 600, ...center }}>E</span>
      <span style={{ lineHeight: '20px' }}><span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>Esha Sharma</span><span style={{ fontSize: 13, color: K.mu }}>Senior Dev Lead</span></span></Box>

    {/* right column */}
    <Box x={1190} y={130} w={292} h={196} s={{ background: '#fff', border: ln(), borderRadius: 18 }}>
      <Txt x={20} y={18} w={250} h={26} size={18} weight={600}>Your time off</Txt>
      {([['Sick leave', sick, 12], ['Casual leave', 4, 10], ['Earned leave', 11, 18]] as [string, number, number][]).map(([q, n, of], i) => <div key={q}>
        <Txt x={20} y={58 + i * 44} w={140} h={22} size={15} color={K.mu}>{q}</Txt>
        <Txt x={140} y={58 + i * 44} w={132} h={22} size={15} weight={600} s={{ textAlign: 'right' }}>{n} of {of} left</Txt>
        <Box x={20} y={84 + i * 44} w={252} h={5} s={{ borderRadius: 3, background: '#ECE8FB' }}><Box x={0} y={0} w={252 * n / of} h={5} s={{ borderRadius: 3, background: K.v, transition: 'none' }} /></Box></div>)}
    </Box>
    <Box x={1190} y={340} w={292} h={190} s={{ background: '#fff', border: ln(), borderRadius: 18 }}>
      <Txt x={20} y={18} w={250} h={26} size={18} weight={600}>What Engaze can see</Txt>
      {['Leave balances and history', 'Payslips and tax declarations', 'Company policies', 'Your calendar, today only'].map((q, i) => <Box key={q} x={20} y={58 + i * 31} w={256} h={24} s={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: K.mu }}><span style={{ width: 7, height: 7, borderRadius: 4, background: K.v, flex: 'none' }} />{q}</Box>)}
    </Box>
    <Box x={1190} y={544} w={292} h={150} s={{ background: '#fff', border: ln(), borderRadius: 18 }}>
      <Txt x={20} y={18} w={250} h={26} size={18} weight={600}>What Engaze remembers</Txt>
      {['You prefer short answers', 'You work from the Pune office'].map((q, i) => <Txt key={q} x={20} y={60 + i * 34} w={252} h={24} size={15} color={K.mu}>{q}</Txt>)}
    </Box>

    {/* main */}
    <Box x={MX} y={12} w={MW} h={H - 24} s={{ background: '#fff', borderRadius: 26, border: ln(), overflow: 'hidden' }}>
      <Box x={-MX} y={-12} w={W} h={H}>
        {/* welcome */}
        <Box x={0} y={0} w={W} h={H} s={{ opacity: welcome, visibility: welcome > 0 ? 'visible' : 'hidden' }}>
          <Orb x={CXc} y={118} r={40} />
          <Txt x={MX} y={186} w={MW} h={52} size={40} weight={600} s={{ textAlign: 'center' }}>Good morning, Esha.</Txt>
          <Box x={MX + 140} y={246} w={MW - 280} h={56} s={{ fontSize: 18, lineHeight: '28px', color: K.mu, textAlign: 'center' }}>Two things are worth a look today. Or ask me anything about your leave, pay or policies.</Box>
          {([['You could save about ₹24,000 in tax', 'The new regime fits your declarations better.', 'Compare for me', K.vS], ['One earned leave day lapses on 31 December', 'Ten more carry forward into next year.', 'Show the rule', '#FFF1DB']] as string[][]).map(([h, b, c, bg], i) =>
            <Box key={h} x={MX + 60 + i * 398} y={324} w={382} h={166} s={{ background: '#FBFAFE', border: ln(), borderRadius: 18, padding: '18px 20px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, ...center }}><Ico n={i ? 'clock' : 'spark'} s={18} c={i ? '#B7791F' : K.v} /></div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 16, ...one }}>{h}</div>
              <div style={{ fontSize: 15, color: K.mu, marginTop: 6, lineHeight: '22px', ...one }}>{b}</div>
              <div style={{ fontSize: 15, color: K.v, fontWeight: 500, marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>{c}<Ico n="arrowR" s={16} c={K.v} /></div>
            </Box>)}
          {[Q1, 'Old or new tax regime: which is better for me?', 'Claim my Pune flight', 'Can I carry forward unused leave?'].map((q, i) => { const hot = i === 0 && t >= 1.2
            return <Box key={q} x={MX + 60 + (i % 2) * 398} y={540 + Math.floor(i / 2) * 56} w={382} h={46} s={{ background: hot ? K.vS : '#fff', border: ln(hot ? K.v : K.ln), borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', fontSize: 15.5, transform: clk(t, [1.4]) && i === 0 ? 'scale(.98)' : 'none' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: K.v, flex: 'none' }} /><span style={one}>{q}</span></Box> })}
        </Box>

        {/* conversation */}
        <Box x={0} y={0} w={W} h={H} s={{ opacity: conv, visibility: conv > 0 ? 'visible' : 'hidden' }}>
          <Box x={0} y={yo - 120} w={W} h={1400}>
            <Box x={MX + MW - 60 - 470} y={56} w={470} h={48} s={{ background: K.ink, color: '#fff', borderRadius: 24, fontSize: 16.5, fontWeight: 500, ...center, opacity: fin(t, 2.0, 0.35) }}>{Q1}</Box>
            <Orb x={MX + 76} y={142} r={18} />
            {['Checked your leave balance', 'Read the leave policy, section 3.2', 'Found who to tell: Manoj and the Platform team'].map((q, i) => { const o = fin(t, 2.5 + i * 0.6, 0.3)
              return <div key={q}><Check x={MX + 108} y={130 + i * 28} on={o} /><Txt x={MX + 136} y={128 + i * 28} w={600} h={24} size={15.5} color={K.mu} s={{ opacity: o }}>{q}</Txt></div> })}
            <Box x={MX + 108} y={230} w={720} h={56} s={{ fontSize: 18, lineHeight: '28px', opacity: fin(t, 4.4, 0.4) }}>Sorry you’re unwell, Esha. Rest up. I’ve got sick leave ready for today. Have a look before I apply it.</Box>
            {!applied && <Box x={MX + 108} y={302} w={720} h={262} s={{ background: '#fff', border: ln(), borderRadius: 18, boxShadow: '0 1px 2px rgba(23,18,43,.04), 0 12px 28px -16px rgba(23,18,43,.22)', opacity: fin(t, 4.8, 0.45), transform: `translateY(${(1 - fin(t, 4.8, 0.45)) * 12}px)` }}>
              <Box x={18} y={18} w={96} h={28} s={{ borderRadius: 14, background: K.vS, color: K.v, fontSize: 14, fontWeight: 600, ...center }}>Sick leave</Box>
              <Box x={540} y={18} w={160} h={28} s={{ borderRadius: 14, border: ln(), color: K.v, fontSize: 14, fontWeight: 500, ...center }}>Leave policy §3.2</Box>
              {[['When', 'Today, 18 Oct'], ['Length', '1 day'], ['Balance after', '4 of 12 days']].map(([l, v], i) => <div key={l}><Txt x={18 + i * 180} y={64} w={170} h={20} size={14} color={K.faint}>{l}</Txt><Txt x={18 + i * 180} y={86} w={170} h={26} size={18} weight={600}>{v}</Txt></div>)}
              <Box x={18} y={128} w={680} h={26} s={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: K.mu }}>I’ll tell <span style={{ width: 22, height: 22, borderRadius: 11, background: '#3B82F6', color: '#fff', fontSize: 11, fontWeight: 600, ...center }}>M</span><b style={{ color: K.ink, fontWeight: 600 }}>Manoj Kumar</b>, your manager, and the <b style={{ color: K.ink, fontWeight: 600 }}>Platform team</b></Box>
              <Box x={18} y={164} w={682} h={34} s={{ borderRadius: 10, background: K.okS, color: K.ok, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}><Ico n="shield" s={16} c={K.ok} />Within policy. One day doesn’t need a medical certificate.</Box>
              <Box x={18} y={210} w={150} h={40} s={{ borderRadius: 10, background: applying ? '#5A3AE0' : K.v, color: '#fff', fontSize: 16, fontWeight: 500, ...center, transform: clk(t, [7.6]) ? 'scale(.97)' : 'none' }}>{applying ? 'Applying…' : 'Apply leave'}</Box>
              <Box x={178} y={210} w={150} h={40} s={{ borderRadius: 10, border: ln(), fontSize: 16, fontWeight: 500, ...center }}>Change dates</Box>
            </Box>}
            {applied && <Box x={MX + 108} y={302} w={720} h={84} s={{ background: '#F3FBF6', border: ln(K.okL), borderRadius: 18, opacity: fin(t, 8.4, 0.4), display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px' }}>
              <span style={{ width: 40, height: 40, borderRadius: 20, background: '#1B8F57', ...center, flex: 'none' }}><Ico n="check" s={22} c="#fff" w={2.4} /></span>
              <span style={{ flex: 1, lineHeight: '24px' }}><span style={{ display: 'block', fontSize: 17, fontWeight: 600 }}>Sick leave applied for today</span><span style={{ fontSize: 15, color: K.mu }}>Approved within policy. Manoj and the Platform team know you’re out.</span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: K.v, fontSize: 15, fontWeight: 500, flex: 'none' }}><Ico n="undo" s={16} c={K.v} />Undo · {Math.max(0, 30 - Math.floor((t - 8.4) * 1)) }s</span>
            </Box>}

            {sent2 && <Box x={MX + MW - 60 - 300} y={440} w={300} h={48} s={{ background: K.ink, color: '#fff', borderRadius: 24, fontSize: 16.5, fontWeight: 500, ...center, opacity: fin(t, 11.0, 0.3) }}>{Q2}</Box>}
            {sent2 && <><Orb x={MX + 76} y={524} r={18} />
              {['Looked at your calendar for today', 'Matched the tone of your last out-of-office'].map((q, i) => { const o = fin(t, 11.4 + i * 0.5, 0.3)
                return <div key={q}><Check x={MX + 108} y={512 + i * 28} on={o} /><Txt x={MX + 136} y={510 + i * 28} w={600} h={24} size={15.5} color={K.mu} s={{ opacity: o }}>{q}</Txt></div> })}
              <Box x={MX + 108} y={584} w={720} h={196} s={{ background: '#fff', border: ln(), borderRadius: 18, boxShadow: '0 1px 2px rgba(23,18,43,.04), 0 12px 28px -16px rgba(23,18,43,.22)', opacity: fin(t, 12.4, 0.45), transform: `translateY(${(1 - fin(t, 12.4, 0.45)) * 12}px)` }}>
                <Box x={18} y={18} w={120} h={28} s={{ borderRadius: 14, background: '#EFEDF5', color: K.mu, fontSize: 14, fontWeight: 600, ...center }}>Out-of-office</Box>
                <Txt x={400} y={20} w={300} h={24} size={14.5} color={K.faint} s={{ textAlign: 'right' }}>Today until tomorrow, 9 am</Txt>
                <Box x={18} y={58} w={682} h={74} s={{ background: '#FBFAFE', border: ln(), borderRadius: 10, padding: '10px 14px', fontSize: 15.5, lineHeight: '25px', color: K.ink }}>I’m out sick today and back tomorrow. For anything urgent on the platform release, please reach Manoj.</Box>
                {!oooOn ? <><Box x={18} y={144} w={140} h={38} s={{ borderRadius: 10, background: K.v, color: '#fff', fontSize: 15.5, fontWeight: 500, ...center, transform: clk(t, [13.8]) ? 'scale(.97)' : 'none' }}>Turn it on</Box><Box x={168} y={144} w={100} h={38} s={{ borderRadius: 10, border: ln(), fontSize: 15.5, fontWeight: 500, ...center }}>Discard</Box></>
                  : <Box x={18} y={144} w={682} h={38} s={{ borderRadius: 10, background: K.okS, color: K.ok, fontSize: 15.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', opacity: fin(t, 14.2, 0.3) }}><Ico n="check" s={18} c={K.ok} w={2.2} />Out-of-office is on until tomorrow, 9 am.</Box>}
              </Box></>}
          </Box>
        </Box>

        {/* composer */}
        <Box x={MX + 60} y={660} w={MW - 120} h={56} s={{ background: '#fff', border: ln(t >= 9.5 && t < 11.0 ? K.v : K.ln), borderRadius: 28, display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px 0 12px', boxShadow: '0 8px 24px -16px rgba(23,18,43,.25)' }}>
          <span style={{ width: 30, height: 30, borderRadius: 15, background: 'radial-gradient(circle at 35% 30%, #fff 0%, #A9BCFF 38%, #B26BFF 74%, #FF8FB8 100%)', flex: 'none' }} />
          <span style={{ flex: 1, fontSize: 17, color: typed2 && !sent2 ? K.ink : K.faint, ...one }}>{typed2 && !sent2 ? <>{typed2}{caret(t) && <span style={{ display: 'inline-block', width: 1.5, height: 20, background: K.v, verticalAlign: 'middle', marginLeft: 1 }} />}</> : 'Ask about leave, pay, tax, claims or policies'}</span>
          <span style={{ width: 40, height: 40, borderRadius: 20, background: typed2 && !sent2 ? K.v : '#DDDAE8', ...center, flex: 'none', transform: clk(t, [11.0]) ? 'scale(.92)' : 'none' }}><Ico n="arrowUp" s={20} c="#fff" w={2} /></span>
        </Box>
        <Txt x={MX} y={722} w={MW} h={20} size={13} color={K.faint} s={{ textAlign: 'center' }}>Only you can see this conversation. Engaze confirms before it acts for you.</Txt>
      </Box>
    </Box>
  </Stage>
}
