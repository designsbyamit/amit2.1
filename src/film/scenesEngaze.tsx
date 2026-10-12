import type { ReactNode, CSSProperties } from 'react'
import { easeOut, easeOutBack, seg } from './engine'
import { In, Words, Scene, mono, countTo } from './ui'

export const V = { bg: '#0D0C15', p1: '#151424', p2: '#1D1C31', p3: '#26253F', line: '#34325A', ink: '#F1F0FF', mute: '#A9A7CF', dim: '#6F6D99', violet: '#7F7DEA', deep: '#6446DD', mag: '#BA5AF2', green: '#5BE3A0', amber: '#FFC857', red: '#FF7A7A' }
const grad = 'linear-gradient(135deg,#6446DD,#BA5AF2)'
const Over = ({ children, color = V.violet, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style }}>{children}</div>
const Bg = () => <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(1100px 700px at 85% -10%, rgba(100,70,221,.35), transparent 60%), radial-gradient(900px 600px at -5% 105%, rgba(186,90,242,.18), transparent 60%), ${V.bg}` }} />

function Bubble({ t, a, me, children, w, y }: { t: number; a: number; me?: boolean; children: ReactNode; w?: number; y: number }) {
  const p = easeOutBack(seg(t, a, a + 0.5))
  if (p <= 0.01) return null
  return <div style={{ position: 'absolute', top: y, [me ? 'right' : 'left']: 40, width: w, maxWidth: 640, padding: '20px 26px', borderRadius: 28, fontSize: 30, lineHeight: 1.35, color: V.ink, background: me ? grad : V.p3, border: me ? 'none' : `1px solid ${V.line}`, opacity: Math.min(1, p), transform: `scale(${0.9 + 0.1 * p})`, transformOrigin: me ? 'right bottom' : 'left bottom' }}>{children}</div>
}

export function EHook({ t }: { t: number }) {
  return <Scene t={t} s={0} e={5}>
    <Bg />
    <Over style={{ position: 'absolute', left: 140, top: 250 }}>Engaze · AI-native HCM</Over>
    <Words t={t} a={0.5} text="Ask. Don't navigate." size={150} weight={600} style={{ left: 140, top: 340 }} />
    <In t={t} a={2.6} style={{ left: 140, top: 640 }}><div style={{ fontSize: 40, color: V.mute, width: 1300, lineHeight: 1.3 }}>A teaser: the employee-experience module of a larger HCM suite.</div></In>
  </Scene>
}

export function EProblem({ t }: { t: number }) {
  const rows: [string, string, number][] = [['Leave balance', '7 clicks · 3 screens', 6.4], ['Where is that policy?', '12 PDFs', 8.0], ['Is my approval stuck?', 'raise a ticket', 9.6]]
  return <Scene t={t} s={5} e={14}>
    <Bg />
    <Over style={{ position: 'absolute', left: 140, top: 130 }}>The problem</Over>
    <Words t={t} a={5.3} text="Enterprise HR is built for auditors." size={88} weight={600} style={{ left: 140, top: 190, width: 1500 }} />
    {rows.map(([a, b, at], i) => <In key={a} t={t} a={at} x={-40} y={0} style={{ left: 140, top: 520 + i * 130, width: 1640 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 36px', height: 104, borderRadius: 22, background: V.p2, border: `1px solid ${V.line}`, fontSize: 40, color: V.ink }}><span>{a}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: mono, fontSize: 28, color: V.red }}>{b}</span></div></In>)}
    <In t={t} a={11.6} style={{ left: 140, top: 930 }}><div style={{ fontSize: 40, color: V.mute }}>Typical enterprise HR bots score <span style={{ color: V.amber }}>below 60% CSAT</span>.</div></In>
  </Scene>
}

export function EPrinciples({ t }: { t: number }) {
  const ps: [string, string][] = [['Trust', 'sources on every answer'], ['Guidance', 'never a dead end'], ['Discoverability', 'capabilities in context'], ['Cognitive simplicity', 'one decision per screen'], ['Continuity', 'one thread, every device']]
  return <Scene t={t} s={14} e={24}>
    <Bg />
    <Over style={{ position: 'absolute', left: 140, top: 110 }}>The approach</Over>
    <Words t={t} a={14.3} text="Five principles, not flows." size={92} weight={600} style={{ left: 140, top: 170, width: 1600 }} />
    {ps.map(([a, b], i) => { const at = 15.6 + i * 0.9; return <In key={a} t={t} a={at} y={30} style={{ left: 140, top: 400 + i * 118, width: 1640 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 44, color: V.ink }}>
        <span style={{ width: 64, height: 64, borderRadius: 32, background: grad, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 700 }}>{i + 1}</span>
        <b style={{ fontWeight: 600, width: 540 }}>{a}</b><span style={{ color: V.mute, fontSize: 36 }}>{b}</span></div></In> })}
  </Scene>
}

export function EPrototype({ t }: { t: number }) {
  const typed = (s: string, a: number, cps: number) => s.slice(0, Math.max(0, Math.floor((t - a) * cps)))
  const msg = 'I need a sick leave for today.'
  const cardP = easeOut(seg(t, 34.6, 35.4))
  const bal = (n: number, a: number, b: number) => Math.round(countTo(t, a, b, n + 1, n))
  const taxP = easeOut(seg(t, 38.5, 40.5))
  const act = t > 36.5
  return <Scene t={t} s={24} e={47}>
    <Bg />
    <Over style={{ position: 'absolute', left: 140, top: 70 }}>The prototype · employee experience</Over>
    <In t={t} a={24.4} y={30} style={{ left: 140, top: 130, width: 1060, height: 840 }}>
      <div style={{ position: 'relative', width: 1060, height: 840, borderRadius: 32, background: V.p1, border: `1px solid ${V.line}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 36, top: 28, display: 'flex', gap: 14, alignItems: 'center', fontSize: 28, color: V.ink, fontWeight: 600 }}><span style={{ width: 44, height: 44, borderRadius: 14, background: grad, display: 'grid', placeItems: 'center' }}>✦</span>engaze</div>
        <div style={{ position: 'absolute', left: 0, top: 110, width: 1060 }}>
          {t > 26.0 && t < 27.9 && <div style={{ position: 'absolute', top: 18, right: 40 }} />}
          <Bubble t={t} a={27.9} me y={20} w={560}>{msg}</Bubble>
          <Bubble t={t} a={29.6} y={150} w={620}>Sorry to hear that. I can apply it and tell Manoj and your team. Shall I?</Bubble>
          <Bubble t={t} a={32.4} me y={330} w={260}>Yes, please.</Bubble>
          {cardP > 0.01 && <div style={{ position: 'absolute', top: 460, left: 40, width: 780, padding: '22px 28px', borderRadius: 26, background: 'rgba(91,227,160,.09)', border: '1px solid rgba(91,227,160,.45)', opacity: cardP, transform: `translateY(${(1 - cardP) * 20}px)` }}>
            <div style={{ fontSize: 32, color: '#8CF0C0', fontWeight: 600 }}>✓ Sick leave submitted</div>
            <div style={{ fontSize: 26, color: V.mute, marginTop: 8, lineHeight: 1.4 }}>Auto-approved within policy. Team notified. 5 days left.</div></div>}
          {t > 36.2 && <In t={t} a={36.2} y={14} style={{ left: 40, top: 640 }}><div style={{ display: 'flex', gap: 12 }}>{['Why this answer?', 'Undo'].map(c => <span key={c} style={{ padding: '10px 22px', borderRadius: 22, background: V.p3, border: `1px solid ${V.line}`, fontSize: 24, color: '#CFCDFF' }}>{c}</span>)}</div></In>}
        </div>
        <div style={{ position: 'absolute', left: 36, right: 36, bottom: 30, height: 70, borderRadius: 36, background: V.p3, display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 28, color: t > 26 && t < 28 ? V.ink : V.dim }}>{t > 26 && t < 28 ? typed(msg, 26, 16) : 'Ask about pay, leave, benefits, growth…'}</div>
      </div>
    </In>
    <In t={t} a={36.4} x={50} y={0} style={{ left: 1260, top: 130, width: 520 }}>
      <div style={{ padding: '28px 32px', borderRadius: 28, background: V.p1, border: `1px solid ${V.line}` }}>
        <Over color={V.mute} style={{ fontSize: 18 }}>Time off</Over>
        {[['Sick leave', act ? bal(4, 36.6, 37.8) : 5, 12], ['Casual leave', 4, 10], ['Earned leave', 11, 18]].map(([n, v, tot]) => <div key={n as string} style={{ marginTop: 22 }}><div style={{ display: 'flex', fontSize: 28, color: V.ink }}><span>{n}</span><span style={{ flex: 1 }} /><span style={{ color: V.mute }}>{v} of {tot} left</span></div><div style={{ height: 10, borderRadius: 5, background: V.p3, marginTop: 10 }}><div style={{ height: 10, borderRadius: 5, width: `${(Number(v) / Number(tot)) * 100}%`, background: grad }} /></div></div>)}
      </div>
    </In>
    <In t={t} a={38.4} x={50} y={0} style={{ left: 1260, top: 520, width: 520 }}>
      <div style={{ padding: '28px 32px', borderRadius: 28, background: V.p1, border: `1px solid ${V.line}` }}>
        <Over color={V.mute} style={{ fontSize: 18 }}>Old vs new tax regime</Over>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', height: 190, marginTop: 20 }}>
          {[['Old', 1.42, '#7F7DEA'], ['New', 1.18, '#BA5AF2']].map(([n, v, c]) => <div key={n as string} style={{ flex: 1, textAlign: 'center' }}><div style={{ height: 130 * taxP * (Number(v) / 1.42), borderRadius: '14px 14px 4px 4px', background: `linear-gradient(180deg,${c},#6446DD)` }} /><div style={{ fontSize: 26, color: V.ink, marginTop: 10, fontWeight: 600 }}>₹{v}L</div></div>)}
        </div>
        <div style={{ fontSize: 24, color: V.mute, marginTop: 14, lineHeight: 1.4, opacity: seg(t, 40, 41) }}>New regime saves <b style={{ color: V.ink }}>₹24,000</b> this year.</div>
      </div>
    </In>
    <In t={t} a={42} y={20} style={{ left: 140, top: 990 }}><div style={{ fontSize: 28, color: V.dim, fontFamily: mono }}>Redrawn with illustrative data</div></In>
  </Scene>
}

export function EOutcome({ t }: { t: number }) {
  const bar = (v: number, a: number) => easeOut(seg(t, a, a + 1.4)) * v
  const roles = ['Employee', 'New joiner', 'Manager', 'Recruiter', 'HR partner', 'Leader']
  return <Scene t={t} s={47} e={58}>
    <Bg />
    <Over style={{ position: 'absolute', left: 140, top: 110 }}>The outcome</Over>
    <In t={t} a={47.6} style={{ left: 140, top: 190 }}><div style={{ fontSize: 260, fontWeight: 600, letterSpacing: '-0.05em', color: V.ink, lineHeight: 1 }}>{Math.round(countTo(t, 47.8, 49.4, 0, 90))}<span style={{ color: V.violet }}>%</span></div></In>
    <In t={t} a={48.2} style={{ left: 140, top: 480 }}><div style={{ fontSize: 44, color: V.mute, width: 760, lineHeight: 1.3 }}>CSAT, against a category that typically scores below 60%.</div></In>
    <In t={t} a={48.4} style={{ left: 1040, top: 220, width: 740 }}>
      {[['Engaze', 90, grad], ['Typical enterprise HR bot', 60, V.dim]].map(([n, v, c], i) => <div key={n as string} style={{ marginBottom: 40 }}><div style={{ fontSize: 30, color: V.ink, marginBottom: 12 }}>{n}</div><div style={{ height: 52, width: `${bar(Number(v), 48.6 + i * 0.4) * 0.82}%`, borderRadius: 14, background: c as string }} /></div>)}
    </In>
    <In t={t} a={51} y={20} style={{ left: 140, top: 700, width: 1640 }}>
      <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', color: V.ink }}>One module. <span style={{ color: V.violet }}>Six roles</span> in the full suite.</div></In>
    <div style={{ position: 'absolute', left: 140, top: 830, display: 'flex', gap: 14 }}>
      {roles.map((r, i) => { const p = easeOut(seg(t, 52 + i * 0.3, 52.6 + i * 0.3)); return <span key={r} style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)`, padding: '14px 26px', borderRadius: 30, background: i === 0 ? grad : V.p3, border: i === 0 ? 'none' : `1px solid ${V.line}`, fontSize: 28, color: V.ink }}>{r}</span> })}
    </div>
    <In t={t} a={54.6} style={{ left: 140, top: 960 }}><div style={{ fontSize: 30, color: V.dim }}>Read the full case study →</div></In>
  </Scene>
}

