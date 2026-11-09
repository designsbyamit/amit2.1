import { easeOut, seg } from './engine'
import { C, In, Words, Scene, mono } from './ui'
import { Over, Pill, Panel } from './kit'

export function KHook({ t }: { t: number }) {
  return <Scene t={t} s={0} e={5}>
    <Over style={{ left: 140, top: 150 }}>Compositional design system</Over>
    <Words t={t} a={0.5} text="Beyond" size={190} weight={600} style={{ left: 140, top: 300, width: 1600 }} />
    <Words t={t} a={1.3} text="compositions." size={190} weight={600} color={C.lime} style={{ left: 140, top: 530, width: 1600 }} />
    <In t={t} a={3.2} style={{ left: 140, top: 830 }}><div style={{ fontSize: 40, color: C.mute, width: 1300, lineHeight: 1.3 }}>Intelligent experience optimisation, as a working hypothesis.</div></In>
  </Scene>
}

export function KProblem({ t }: { t: number }) {
  const bad = easeOut(seg(t, 9.2, 10.2))
  return <Scene t={t} s={5} e={14}>
    <Over style={{ left: 140, top: 110 }}>The problem</Over>
    <Words t={t} a={5.3} text="From prompt to arbitrary UI." size={90} weight={600} style={{ left: 140, top: 170, width: 1600 }} />
    <In t={t} a={7} y={20} style={{ left: 140, top: 480 }}><Panel style={{ width: 520, height: 200, padding: 34, fontSize: 36, color: C.ink, lineHeight: 1.3 }}>“Give me a card and a table.”</Panel></In>
    <In t={t} a={8} style={{ left: 690, top: 540 }}><div style={{ fontSize: 80, color: C.dim }}>→</div></In>
    <In t={t} a={8.6} style={{ left: 820, top: 480 }}><Panel style={{ width: 420, height: 200, padding: 34, fontSize: 36, color: C.mute, display: 'grid', placeItems: 'center' }}>? ? ?</Panel></In>
    <In t={t} a={9} style={{ left: 1270, top: 540 }}><div style={{ fontSize: 80, color: C.dim }}>→</div></In>
    <In t={t} a={9.4} style={{ left: 1400, top: 480 }}><Panel style={{ width: 380, height: 200, padding: 26, transform: `rotate(${(1 - bad) * 0 + 2}deg)` }}><div style={{ display: 'flex', gap: 10 }}>{[C.red, C.amber, C.cobalt].map(c => <div key={c} style={{ width: 70, height: 70, borderRadius: 12, background: c }} />)}</div><div style={{ marginTop: 18, height: 14, width: '80%', background: C.line, borderRadius: 7 }} /></Panel></In>
    <In t={t} a={11} y={16} style={{ left: 140, top: 800, width: 1640 }}><div style={{ fontSize: 44, color: C.mute, lineHeight: 1.3 }}>Nothing to inspect on the way. Nothing to trust.</div></In>
  </Scene>
}

export function KApproach({ t }: { t: number }) {
  const parts: [string, string][] = [['LLM', 'Understands and plans'], ['CDS', 'The design language'], ['Composition', 'Which experience to assemble'], ['EOM', 'Diagnoses the situation'], ['Guardrails', 'What may be shown']]
  return <Scene t={t} s={14} e={28}>
    <Over style={{ left: 140, top: 100 }}>The approach</Over>
    <Words t={t} a={14.3} text="Five things, kept apart." size={92} weight={600} style={{ left: 140, top: 160, width: 1640 }} />
    {parts.map(([n, d], i) => <In key={n} t={t} a={16 + i * 1.1} y={26} style={{ left: 140 + (i % 3) * 560, top: 400 + Math.floor(i / 3) * 270, width: 520 }}>
      <Panel style={{ height: 230, padding: 32 }}>
        <div style={{ fontFamily: mono, fontSize: 22, color: C.lime }}>{String(i + 1).padStart(2, '0')}</div>
        <div style={{ fontSize: 54, fontWeight: 600, color: C.ink, marginTop: 12 }}>{n}</div>
        <div style={{ fontSize: 30, color: C.mute, marginTop: 10 }}>{d}</div></Panel></In>)}
    <In t={t} a={22.6} y={16} style={{ left: 1260, top: 700, width: 520 }}><div style={{ fontSize: 34, color: C.mute, lineHeight: 1.35 }}>Most confusion comes from collapsing these into one AI layer.</div></In>
  </Scene>
}

export function KWork({ t }: { t: number }) {
  const steps = ['Human intent', 'Context', 'CDS and composition', 'Specification', 'Guardrails check', 'Render', 'Outcome and learning']
  const cur = Math.min(6, Math.floor(Math.max(0, t - 29.6) / 1.9))
  const active = t >= 29.6
  return <Scene t={t} s={28} e={46}>
    <Over style={{ left: 140, top: 70 }}>The path · illustrative</Over>
    <In t={t} a={28.3} y={20} style={{ left: 140, top: 130, width: 1640 }}><Panel style={{ padding: '30px 40px', fontSize: 40, color: C.ink }}><span style={{ color: C.dim, fontFamily: mono, fontSize: 24, marginRight: 24 }}>INTENT</span>“Help me understand why attrition is rising.”</Panel></In>
    <div style={{ position: 'absolute', left: 140, top: 330, width: 560 }}>
      {steps.map((s, i) => <In key={s} t={t} a={29 + i * 0.15} x={-20} y={0} style={{ position: 'relative' as const, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, height: 76, padding: '0 26px', borderRadius: 18, border: `1px solid ${active && i === cur ? C.lime : C.line}`, background: active && i === cur ? C.panel2 : C.panel, fontSize: 30, color: active && i <= cur ? C.ink : C.mute }}>
          <span style={{ fontFamily: mono, fontSize: 20, color: active && i <= cur ? C.lime : C.dim }}>{String(i + 1).padStart(2, '0')}</span>{s}</div></In>)}
    </div>
    <In t={t} a={30} x={30} y={0} style={{ left: 780, top: 330, width: 1000 }}>
      <Panel style={{ height: 650, padding: 40, position: 'relative' }}>
        {cur <= 2 && <div style={{ fontSize: 34, color: C.mute, lineHeight: 1.4 }}>{cur === 0 ? 'The person asks for an outcome, not a layout.' : cur === 1 ? 'Role, permissions, history and device are read into a plan.' : 'A composition is chosen only from what the design language allows.'}</div>}
        {cur >= 3 && cur <= 4 && <div style={{ fontFamily: mono, fontSize: 28, color: C.ink, lineHeight: 1.7 }}>{'{'}<br />&nbsp;&nbsp;layout: “insight + trend”,<br />&nbsp;&nbsp;parts: [ “summary”, “line chart”, “drivers” ],<br />&nbsp;&nbsp;human: “approves any action”<br />{'}'}{cur === 4 && <div style={{ marginTop: 26, color: C.lime, fontSize: 30 }}>✓ Patterns, accessibility, policy, permissions</div>}</div>}
        {cur >= 5 && <div>
          <div style={{ fontSize: 36, color: C.ink, fontWeight: 600 }}>Attrition, by driver</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, height: 260, marginTop: 30 }}>{[0.9, 0.7, 0.5, 0.35, 0.25].map((h, k) => <div key={k} style={{ flex: 1, height: 260 * h * easeOut(seg(t, 40 + k * 0.2, 41.2 + k * 0.2)), borderRadius: '10px 10px 3px 3px', background: k === 0 ? C.lime : C.line }} />)}</div>
          <div style={{ fontSize: 28, color: C.mute, marginTop: 26 }}>{cur === 6 ? 'Judged on the outcome, and the learning goes back in.' : 'Mapped to real components, connected to live state.'}</div></div>}
      </Panel></In>
  </Scene>
}

export function KOutcome({ t }: { t: number }) {
  const d = ['Discover', 'Frame', 'Ground', 'Diagnose', 'Enable', 'Govern', 'Orchestrate', 'Prove']
  return <Scene t={t} s={46} e={56}>
    <Over style={{ left: 140, top: 130 }}>The toolkit</Over>
    <Words t={t} a={46.4} text="Eight deliverables make it practical." size={92} weight={600} style={{ left: 140, top: 190, width: 1500 }} />
    <div style={{ position: 'absolute', left: 140, top: 520, width: 1640, display: 'flex', flexWrap: 'wrap', gap: 18 }}>
      {d.map((x, i) => { const p = easeOut(seg(t, 48 + i * 0.3, 48.6 + i * 0.3)); return <span key={x} style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)`, padding: '18px 34px', borderRadius: 40, background: C.panel2, border: `1px solid ${C.line}`, fontSize: 36, color: C.ink }}><span style={{ fontFamily: mono, fontSize: 22, color: C.lime, marginRight: 14 }}>{i + 1}</span>{x}</span> })}
    </div>
    <In t={t} a={51.2} style={{ left: 140, top: 800 }}><Pill color={C.amber}>Working hypothesis, not a finished method</Pill></In>
  </Scene>
}
