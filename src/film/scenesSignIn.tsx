import { easeOut, seg } from './engine'
import { C, In, Words, Scene, mono } from './ui'
import { Over, Pill, Panel, Cursor } from './kit'

export function IHook({ t }: { t: number }) {
  return <Scene t={t} s={0} e={5}>
    <Over style={{ left: 140, top: 150 }}>Sign in · cloud products</Over>
    <Words t={t} a={0.5} text="1,500+ apps." size={190} weight={600} style={{ left: 140, top: 300, width: 1600 }} />
    <Words t={t} a={1.6} text="One way in." size={190} weight={600} color={C.lime} style={{ left: 140, top: 530, width: 1600 }} />
    <In t={t} a={3.2} style={{ left: 140, top: 830 }}><div style={{ fontSize: 40, color: C.mute, width: 1300, lineHeight: 1.3 }}>The moment of entry, made consistent.</div></In>
  </Scene>
}

export function IProblem({ t }: { t: number }) {
  const cards: [string, string][] = [['Modal in some, full page in others', 'a'], ['A company ID before anything else', 'b'], ['System, client and language up front', 'c'], ['No password toggle, no recovery link', 'd']]
  return <Scene t={t} s={5} e={14}>
    <Over style={{ left: 140, top: 110 }}>The problem</Over>
    <Words t={t} a={5.3} text="Every product greeted you differently." size={84} weight={600} style={{ left: 140, top: 170, width: 1600 }} />
    {cards.map(([l, k], i) => <In key={k} t={t} a={6.8 + i * 0.6} y={26} style={{ left: 140 + i * 420, top: 420, width: 390 }}>
      <Panel style={{ height: 470, padding: 26, position: 'relative' }}>
        <div style={{ height: 40, width: i % 2 ? 150 : 220, borderRadius: 8, background: C.line }} />
        {Array.from({ length: i === 2 ? 4 : i === 1 ? 3 : 2 }).map((_, n) => <div key={n} style={{ marginTop: 24, height: 54, borderRadius: i === 0 ? 4 : 14, border: `1px solid ${C.line}`, background: C.panel2, width: i === 3 ? `${70 + n * 12}%` : '100%' }} />)}
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 100, height: 56, borderRadius: i === 1 ? 28 : 8, background: C.line, width: i === 3 ? 150 : undefined, marginLeft: i === 3 ? 'auto' : 26 }} />
        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 24, fontSize: 26, color: C.red, lineHeight: 1.25 }}>{l}</div></Panel></In>)}
    <In t={t} a={10.6} y={16} style={{ left: 140, top: 950 }}><div style={{ fontSize: 38, color: C.mute }}>Basic hygiene was missing, at the most important moment.</div></In>
  </Scene>
}

export function IApproach({ t }: { t: number }) {
  const flows: [string, string][] = [['Direct', 'Everything at once'], ['Progressive', 'Identify, then authenticate'], ['Context first', 'Tenant, then credentials']]
  return <Scene t={t} s={14} e={24}>
    <Over style={{ left: 140, top: 100 }}>The approach</Over>
    <Words t={t} a={14.3} text="Three flows. One anatomy." size={92} weight={600} style={{ left: 140, top: 160, width: 1640 }} />
    {flows.map(([n, d], i) => <In key={n} t={t} a={15.8 + i * 0.9} y={26} style={{ left: 140 + i * 560, top: 400, width: 520 }}>
      <Panel style={{ height: 330, padding: 34 }}>
        <div style={{ fontFamily: mono, fontSize: 22, color: C.lime }}>FLOW {i + 1}</div>
        <div style={{ fontSize: 56, fontWeight: 600, color: C.ink, marginTop: 14 }}>{n}</div>
        <div style={{ fontSize: 32, color: C.mute, marginTop: 12, lineHeight: 1.3 }}>{d}</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 34 }}>{Array.from({ length: i + 1 }).map((_, k) => <div key={k} style={{ height: 14, flex: 1, borderRadius: 7, background: k === i ? C.lime : C.line }} />)}</div></Panel></In>)}
    <In t={t} a={19.6} y={16} style={{ left: 140, top: 810, width: 1640 }}><div style={{ fontSize: 40, color: C.mute, lineHeight: 1.3 }}>Every product picks a flow, not a design. A centred card by default, a media panel when the brand needs one.</div></In>
  </Scene>
}

export function IWork({ t }: { t: number }) {
  const phase = t < 30 ? 0 : t < 35.5 ? 1 : t < 39.5 ? 2 : 3
  const typedU = 'demo.user@example.com'.slice(0, Math.max(0, Math.floor((t - 26.6) * 14)))
  const typedP = Math.max(0, Math.floor((t - 28.4) * 12))
  const field = (label: string, v: string, err?: boolean) => <div style={{ marginTop: 26 }}><div style={{ fontSize: 24, color: C.mute, marginBottom: 10 }}>{label}</div><div style={{ height: 70, borderRadius: 12, border: `1px solid ${err ? C.red : C.line}`, background: C.panel2, display: 'flex', alignItems: 'center', padding: '0 22px', fontSize: 30, color: C.ink }}>{v}</div></div>
  const bx = t < 31 ? 1000 : 1000
  return <Scene t={t} s={24} e={42}>
    <Over style={{ left: 140, top: 56 }}>The card · illustrative</Over>
    <In t={t} a={24.4} y={30} style={{ left: 140, top: 120, width: 1640, height: 860 }}>
      <Panel style={{ width: 1640, height: 860, background: C.bg, position: 'relative', overflow: 'hidden' }}>
        {phase < 3 && <div style={{ position: 'absolute', left: 520, top: 50, width: 600, padding: '40px 46px', borderRadius: 24, background: C.panel, border: `1px solid ${C.line}` }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: C.lime }} />
          <div style={{ fontSize: 44, fontWeight: 600, color: C.ink, marginTop: 22 }}>Sign in</div>
          {phase === 1 && <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 12, border: `1px solid ${C.red}`, color: C.red, fontSize: 26 }}>We couldn’t authenticate you. Check your details and try again.</div>}
          {phase === 2 && <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 12, background: C.panel2, color: C.ink, fontSize: 26 }}>Need sign in assistance?<br /><span style={{ color: C.mute }}>Forgot password · Forgot username · Locked out · Other</span></div>}
          {field('Email', phase === 0 ? typedU : 'demo.user@example.com')}
          {field('Password', '•'.repeat(phase === 0 ? Math.min(typedP, 11) : 11))}
          <div style={{ marginTop: 22, fontSize: 26, color: C.mute, display: 'flex', justifyContent: 'space-between' }}><span>Show password</span><span style={{ color: C.lime }}>Need sign in assistance?</span></div>
          <div style={{ marginTop: 26, height: 70, borderRadius: 14, background: C.lime, color: C.bg, fontSize: 30, fontWeight: 600, display: 'grid', placeItems: 'center' }}>Sign In</div>
        </div>}
        {phase === 3 && <div style={{ position: 'absolute', left: 520, top: 190, width: 600, padding: '50px 46px', borderRadius: 24, background: C.panel, border: `1px solid ${C.line}`, textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 600, color: C.ink }}>Signed Out</div>
          <div style={{ fontSize: 28, color: C.mute, marginTop: 14 }}>You have been signed out safely.</div>
          <div style={{ marginTop: 30, height: 70, borderRadius: 14, border: `1px solid ${C.line}`, color: C.ink, fontSize: 30, display: 'grid', placeItems: 'center' }}>Sign In Again</div></div>}
        <div style={{ position: 'absolute', left: 60, top: 70, width: 400 }}>
          {[['Fields keep what you typed', 1], ['Field errors inline, account errors in a banner', 1], ['Help lives in the same card', 2], ['“Sign Out”, never “Logout”', 3]].map(([l, p], i) => <div key={String(l)} style={{ opacity: easeOut(seg(t, 25.5 + i * 4.5, 26.1 + i * 4.5)), fontSize: 28, color: phase >= Number(p) || i === 0 ? C.ink : C.dim, marginBottom: 28, lineHeight: 1.3 }}>{l}</div>)}
        </div>
      </Panel>
    </In>
    <Cursor x={bx} y={760} show={t > 29 && t < 33} />
  </Scene>
}

export function IOutcome({ t }: { t: number }) {
  return <Scene t={t} s={42} e={52}>
    <Over style={{ left: 140, top: 130 }}>The result</Over>
    <Words t={t} a={42.4} text="A standard, ready for implementation." size={96} weight={600} style={{ left: 140, top: 190, width: 1500 }} />
    {[['5', 'interactive prototypes, one per scenario'], ['3', 'flows, one card anatomy'], ['1,500+', 'apps it is written for']].map(([n, l], i) => <In key={l} t={t} a={44.2 + i * 0.7} y={24} style={{ left: 140 + i * 580, top: 560, width: 540 }}>
      <div style={{ fontSize: 180, fontWeight: 600, letterSpacing: '-0.05em', color: i === 2 ? C.lime : C.ink, lineHeight: 1 }}>{n}</div><div style={{ fontSize: 34, color: C.mute, marginTop: 12, lineHeight: 1.3 }}>{l}</div></In>)}
    <In t={t} a={48} style={{ left: 140, top: 940 }}><Pill>Adoption is not reported yet</Pill></In>
  </Scene>
}
