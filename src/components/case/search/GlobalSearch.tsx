// One search, in the shell bar of every application: playable. Pick where you start, ask a question, see results from
// several applications, take an action and land in that application with the context carried across. Fictional data.
import { useEffect, useRef, useState } from 'react'
import { Scaled } from './SearchDiagrams'
import { Shell, Field } from '../../../film/searchUi'
import { APPS, SCENARIOS, STEPS, type AppKey, type GRow } from './globalSearchData'

const P = { ink: '#141B24', ink2: '#3A4553', mute: '#647081', line: '#E2E7EE', bg: '#F5F7FA', blue: '#0064D9', blueS: '#E8F1FC', violet: '#6B3FD4', violetS: '#F1EAFF', ok: '#16794C', okS: '#E6F4EC', note: '#0B5FB3' }
const F = "'72','Geist Variable','Geist',system-ui,sans-serif"
const W = 1000, H = 600

type Stage = 'home' | 'results' | 'handoff' | 'app'

export const AppTag = ({ k }: { k: AppKey }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px 3px 8px', borderRadius: 999, background: APPS[k].tint, color: APPS[k].hue, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
    <span style={{ width: 7, height: 7, borderRadius: 4, background: APPS[k].hue }} />{APPS[k].name}
  </span>
)

/** A pointer note that says what to look at. */
const Note = ({ x, y, w = 250, children, tail }: { x: number; y: number; w?: number; children: string; tail?: 'up-right' | 'up-left' | 'none' }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, padding: '9px 12px', borderRadius: 8, background: P.note, color: '#fff', fontSize: 12.5, lineHeight: '17px', fontWeight: 500, boxShadow: '0 6px 18px rgba(20,27,36,.22)', zIndex: 20 }}>
    {tail === 'up-right' && <span style={{ position: 'absolute', right: 26, top: -6, width: 12, height: 12, background: P.note, transform: 'rotate(45deg)' }} />}
    {tail === 'up-left' && <span style={{ position: 'absolute', left: 26, top: -6, width: 12, height: 12, background: P.note, transform: 'rotate(45deg)' }} />}
    <span style={{ position: 'relative' }}>{children}</span>
  </div>
)

export default function GlobalSearch() {
  const [sid, setSid] = useState(0)
  const sc = SCENARIOS[sid]
  const [inApp, setInApp] = useState<AppKey>(sc.start)
  const [stage, setStage] = useState<Stage>('home')
  const [typed, setTyped] = useState('')
  const [filter, setFilter] = useState<AppKey | 'all'>('all')
  const [target, setTarget] = useState<GRow>(sc.rows[0])
  const [prog, setProg] = useState(0)
  const [tick, setTick] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearInterval(timer.current), [])

  const reset = (i: number) => {
    window.clearInterval(timer.current)
    setSid(i); setInApp(SCENARIOS[i].start); setStage('home'); setTyped(''); setFilter('all'); setTarget(SCENARIOS[i].rows[0]); setProg(0)
  }
  const ask = () => {
    if (stage !== 'home' || typed) return
    let n = 0
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      n += 1; setTyped(sc.query.slice(0, n)); setTick(n)
      if (n >= sc.query.length) { window.clearInterval(timer.current); window.setTimeout(() => setStage('results'), 420) }
    }, 38)
  }
  const act = (r: GRow) => {
    setTarget(r); setProg(0); setStage('handoff')
    let p = 0
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      p += 0.08; setProg(Math.min(1, p))
      if (p >= 1) { window.clearInterval(timer.current); window.setTimeout(() => setStage('app'), 160) }
    }, 90)
  }

  const counts = sc.rows.reduce<Partial<Record<AppKey, number>>>((a, r) => ({ ...a, [r.app]: (a[r.app] ?? 0) + 1 }), {})
  const appsInResults = Object.keys(counts) as AppKey[]
  const shown = sc.rows.filter(r => filter === 'all' || r.app === filter)
  const shellName = stage === 'app' || stage === 'handoff' && prog > 0.9 ? APPS[target.app].name : APPS[inApp].name
  const isPrimary = target === sc.rows[0]
  const fields: [string, string][] = isPrimary ? sc.fields : [['From your search', sc.query], ['Item', target.title], ['Details', target.meta]]
  const step = stage === 'home' ? 1 : stage === 'results' ? 2 : 3

  const shellField = stage === 'home'
    ? <Field t={tick / 6} state={typed ? 'typing' : 'default'} text={typed} />
    : stage === 'results' ? <Field t={0} state="typed" text={sc.query} />
    : <Field t={0} state="default" />

  return (
    <div>
      <ol className="grid md:grid-cols-3 gap-3 list-none p-0 m-0 mb-6">
        {STEPS.map(s => (
          <li key={s.n} className="rounded-lg p-4" style={{ background: step === s.n ? 'var(--surface-2)' : 'transparent', border: '1px solid var(--line-1)', transition: 'background .2s' }}>
            <p className="text-label text-ink-3">{String(s.n).padStart(2, '0')}</p>
            <p className="text-title text-ink mt-2">{s.t}</p>
            <p className="text-body-sm text-ink-2 mt-2">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-2 mb-4" role="tablist" aria-label="Try a question">
        {SCENARIOS.map((s, i) => <button key={s.id} type="button" role="tab" aria-selected={i === sid} className="chip" onClick={() => reset(i)}>{s.label}</button>)}
        <button type="button" className="btn btn-secondary btn-sm ml-auto" onClick={() => reset(sid)}>Start over</button>
      </div>

      <div className="rounded-xl p-3 md:p-6" style={{ background: 'var(--field-paper)' }}>
        <Scaled w={W} h={H} minW={720}>
          <div style={{ position: 'relative', width: W, height: H, background: P.bg, borderRadius: 10, overflow: 'hidden', fontFamily: F, color: P.ink }} aria-live="polite">
            {/* page */}
            {stage === 'home' && (
              <div style={{ position: 'absolute', inset: 0, top: 52 }}>
                <div style={{ position: 'absolute', left: 48, top: 26, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: P.mute, marginRight: 4 }}>You are in</span>
                  {(Object.keys(APPS) as AppKey[]).filter(k => k !== 'policies').map(k => (
                    <button key={k} type="button" onClick={() => setInApp(k)} aria-pressed={inApp === k} style={{ border: `1px solid ${inApp === k ? APPS[k].hue : P.line}`, background: inApp === k ? APPS[k].tint : '#fff', color: inApp === k ? APPS[k].hue : P.ink2, borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 600, fontFamily: F, cursor: 'pointer' }}>{APPS[k].name}</button>
                  ))}
                </div>
                <div style={{ position: 'absolute', left: 48, top: 82, fontSize: 30, fontWeight: 700 }}>{APPS[inApp].name}</div>
                <div style={{ position: 'absolute', left: 48, top: 126, fontSize: 15, color: P.mute }}>Welcome back, Maria. {APPS[inApp].blurb}.</div>
                {APPS[inApp].cards.map(([t, s], i) => (
                  <div key={t} style={{ position: 'absolute', left: 48 + i * 300, top: 176, width: 280, height: 112, borderRadius: 12, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.16)', padding: '20px 22px', boxSizing: 'border-box' }}>
                    <div style={{ fontSize: 14, color: P.mute }}>{t}</div><div style={{ fontSize: 22, fontWeight: 300, marginTop: 12 }}>{s}</div>
                  </div>
                ))}
                {!typed && (
                  <button type="button" onClick={ask} style={{ position: 'absolute', left: 48, top: 330, display: 'inline-flex', alignItems: 'center', gap: 10, background: P.blue, color: '#fff', border: 0, borderRadius: 8, padding: '12px 20px', fontSize: 15, fontWeight: 600, fontFamily: F, cursor: 'pointer' }}>
                    Ask from {APPS[inApp].name}: “{sc.query}”
                  </button>
                )}
                <Note x={W - 48 - 400 - 24} y={6} w={380} tail="up-right">The search field sits in the shell bar of every application, in the same place. Try it from any of them.</Note>
              </div>
            )}

            {stage === 'results' && (
              <div style={{ position: 'absolute', inset: 0, top: 52, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 48, top: 20, right: 48 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span style={{ fontSize: 24, fontWeight: 700 }}>Results for “{sc.query}”</span>
                    <span style={{ fontSize: 13.5, color: P.mute }}>{sc.rows.length} results from {appsInResults.length} applications</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }} role="tablist" aria-label="Filter by application">
                    {(['all', ...appsInResults] as (AppKey | 'all')[]).map(k => (
                      <button key={k} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} style={{ border: `1px solid ${filter === k ? P.blue : P.line}`, background: filter === k ? P.blueS : '#fff', color: filter === k ? P.blue : P.ink2, borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 600, fontFamily: F, cursor: 'pointer' }}>
                        {k === 'all' ? 'All applications' : APPS[k].name} ({k === 'all' ? sc.rows.length : counts[k]})
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, borderRadius: 10, background: P.violetS, border: '1px solid #D8C6FA', padding: '12px 16px', fontSize: 14, lineHeight: '20px', color: P.violet }}>
                    <b style={{ marginRight: 8 }}>✦ AI overview</b>{sc.summary}
                  </div>
                  <div style={{ marginTop: 12, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.16)' }}>
                    {shown.map((r, i) => (
                      <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px 18px', borderTop: i ? `1px solid ${P.line}` : 0 }}>
                        <div style={{ width: 118, flex: 'none' }}><AppTag k={r.app} /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: P.blue }}>{r.title}</div>
                          <div style={{ fontSize: 13, color: P.mute, marginTop: 3 }}>{r.meta}</div>
                        </div>
                        <button type="button" onClick={() => act(r)} style={{ border: r.primary ? 0 : `1px solid ${P.blue}`, background: r.primary ? P.blue : '#fff', color: r.primary ? '#fff' : P.blue, borderRadius: 8, padding: '8px 18px', fontSize: 14, fontWeight: 600, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap' }}>{r.action} in {APPS[r.app].name}</button>
                      </div>
                    ))}
                  </div>
                </div>
                <Note x={W - 48 - 340} y={H - 52 - 50} w={340} tail="none">Choose an action. It opens the application the result belongs to.</Note>
              </div>
            )}

            {(stage === 'handoff' || stage === 'app') && (
              <div style={{ position: 'absolute', inset: 0, top: 52 }}>
                {stage === 'app' && (
                  <>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 56, background: APPS[target.app].hue, color: '#fff', fontSize: 21, fontWeight: 700, padding: '15px 48px', boxSizing: 'border-box' }}>{isPrimary ? sc.appTitle : APPS[target.app].name}</div>
                    <div style={{ position: 'absolute', left: 48, top: 72, fontSize: 13, color: P.mute }}>Search results → {APPS[target.app].name}</div>
                    <div style={{ position: 'absolute', left: 48, top: 104, width: 560, borderRadius: 12, background: '#fff', boxShadow: '0 1px 4px rgba(34,53,72,.16)', padding: '22px 28px', boxSizing: 'border-box' }}>
                      {fields.map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', padding: '9px 8px', margin: '0 -8px', borderRadius: 6, background: P.okS, marginBottom: 8, alignItems: 'baseline' }}>
                          <span style={{ width: 130, fontSize: 13, color: P.mute }}>{k}</span>
                          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{v}</span>
                          <span style={{ fontSize: 12, color: P.ok, fontWeight: 700 }}>✦ from your search</span>
                        </div>
                      ))}
                      <button type="button" style={{ marginTop: 10, border: 0, background: P.blue, color: '#fff', borderRadius: 8, padding: '11px 26px', fontSize: 15, fontWeight: 600, fontFamily: F }}>{isPrimary ? sc.cta : 'Continue'}</button>
                      <button type="button" onClick={() => setStage('results')} style={{ marginTop: 10, marginLeft: 10, border: `1px solid ${P.line}`, background: '#fff', color: P.blue, borderRadius: 8, padding: '11px 22px', fontSize: 15, fontWeight: 600, fontFamily: F, cursor: 'pointer' }}>Back to results</button>
                    </div>
                    <Note x={W - 48 - 330} y={96} w={330} tail="none">{`You are now in ${APPS[target.app].name}. The question and your choice came with you, and the search is still in the shell bar.`}</Note>
                  </>
                )}
                {stage === 'handoff' && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,27,36,.45)', display: 'grid', placeItems: 'center' }}>
                    <div style={{ width: 420, borderRadius: 14, background: '#fff', padding: '28px 34px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,.4)' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 32, background: APPS[target.app].hue, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 30, fontWeight: 700, margin: '0 auto' }}>{APPS[target.app].name[0]}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 14 }}>Opening {APPS[target.app].name}</div>
                      <div style={{ fontSize: 13.5, color: P.mute, marginTop: 6 }}>Carrying over from your search</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 12 }}>
                        {(isPrimary ? sc.carry : [sc.query, target.title]).map(c => <span key={c} style={{ background: P.okS, color: P.ok, fontSize: 12, fontWeight: 600, borderRadius: 999, padding: '3px 10px' }}>{c}</span>)}
                      </div>
                      <div style={{ height: 4, background: P.line, borderRadius: 2, marginTop: 20 }}><div style={{ width: `${prog * 100}%`, height: '100%', background: APPS[target.app].hue, borderRadius: 2 }} /></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* the shell bar is drawn last: it never moves, whichever application is open */}
            <Shell w={W} name={shellName} field={shellField} />
          </div>
        </Scaled>
      </div>
      <p className="text-caption text-ink-3 mt-3">Sample data and made-up applications. Start from different applications, ask the same question, and the field is always in the same place.</p>
    </div>
  )
}
