import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import CaseThumb from '../ds/CaseThumb'
import SignalBackdrop from '../illustrations/signal/SignalBackdrop'
import { useThemeValue } from '../ds/theme'
import { createLight } from '../illustrations/signal/glField'
import { Field, computeLayout, finalHero, type SceneState } from '../illustrations/signal/signalScene'
import { COPY, WORKS, SHARE } from './copy'
import NavCards from './NavCards'
import { atlasRoles } from '../../data/atlasSummary'
import { ROLE_CSS } from '../illustrations/signal/signalLater'

/** One still frame of the light, drawn once. */
function Light({ state, pill }: { state: SceneState; pill?: RefObject<HTMLAnchorElement | null> }) {
  const cv = useRef<HTMLCanvasElement>(null)
  const theme = useThemeValue()
  useEffect(() => {
    const c = cv.current
    if (!c) return
    const w = c.clientWidth, h = c.clientHeight
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70
    const light = createLight(c)
    light.setLight(theme === 'light')
    light.resize(w, h, Math.min(window.devicePixelRatio || 1, 2))
    const f = new Field()
    const L = computeLayout(w, h, headerH)
    if (pill?.current) {
      const cr = c.getBoundingClientRect(), r = pill.current.getBoundingClientRect()
      const G = f.geom(L)
      G.pill = { x: r.left - cr.left, y: r.top - cr.top, w: r.width, h: r.height, bright: 1 }
      G.P8.y = G.pill.y + G.pill.h / 2
      G.pillR = parseFloat(getComputedStyle(pill.current).borderTopLeftRadius) || 6
    }
    light.draw(f.buf, f.compose(state, L, 4))
    return () => light.dispose()
  }, [state, pill, theme])
  return <canvas ref={cv} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

const HERO = finalHero()
const OUTCOMES: SceneState = { ...finalHero(), echo: 0, move: 1, ptR: 1.8, o0: 1, o1: 1, o2: 1 }
const WORKED: SceneState = { ...OUTCOMES, ptR: 1, toFrame: 1, reveal: 1, workIdx: 2 }
const ATLAS: SceneState = { ...WORKED, at: 1, drop: 1, tl: 1, ind: 1, role: 1, pm4: 1 }
const TEAM: SceneState = { ...ATLAS, team: 1, pm5: 1 }
const HUB: SceneState = { ...TEAM, comm: 1 }
const NEXT: SceneState = { ...HUB, share: 1, back: 1, line8: 1 }
const col = 'absolute inset-x-5 bottom-[7%] md:inset-x-auto md:left-[7.5%] md:top-[19%] md:bottom-auto md:w-[33%]'
const hStyle = { fontSize: 'var(--fs-d-l)', lineHeight: 1.05 }
const bigStyle = { fontSize: 'var(--fs-d-2xl)', lineHeight: 0.9, letterSpacing: '-0.03em' }

/** The same story for visitors who prefer reduced motion: each keyframe in its finished, resting state. */
export default function SignalStill() {
  const h = COPY.hero, o = COPY.outcomes, w = COPY.works, C = COPY
  const pill = useRef<HTMLAnchorElement>(null)
  return (
    <div className="sg-stage" aria-label="Amit Kumar Tiwari, design leader">
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={HERO} />
        <div className="absolute inset-x-5 bottom-[7%] md:inset-x-auto md:left-[7.5%] md:top-[27%] md:bottom-auto md:w-[42%]">
          <p className="text-overline text-on-field-accent mb-4 md:mb-6">Amit Kumar Tiwari, Design Leader</p>
          <h1 className="font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-signal)', lineHeight: 1.02, letterSpacing: '-0.015em' }}>{h.main}</h1>
          <p className="mt-5 md:mt-8 text-body-lg text-on-field-muted max-w-xl">{h.sub.slice(0, 3).join(' ')} <span className="block mt-4 md:mt-6 font-serif text-title text-on-field-strong">{h.sub[3]}</span></p>
        </div>
      </section>
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={OUTCOMES} />
        <h2 className="absolute inset-x-5 bottom-[8%] md:inset-x-auto md:left-[7.5%] md:top-[19%] md:bottom-auto md:w-[40%] font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.05 }}>{o.main}</h2>
        <ul className="absolute inset-x-5 bottom-[30%] md:inset-x-auto md:left-[30%] md:right-[8%] md:bottom-[14%] grid grid-cols-3 gap-4 text-center font-serif text-body-sm md:text-title text-on-field">
          {o.sub.map(s => <li key={s}>{s}</li>)}
        </ul>
      </section>
      <section className="relative overflow-hidden py-[12vh] px-5 md:px-[7.5%]">
        <SignalBackdrop />
        <div className="relative max-w-3xl">
          <h2 className="font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.04 }}>{w.main}</h2>
          <p className="mt-4 md:mt-6 text-body-lg text-on-field-muted">{w.sub}</p>
        </div>
        <ul className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {WORKS.map((wk, i) => (
            <li key={wk.id}>
              <Link to={`/craft/${wk.id}`} className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ outlineColor: 'var(--on-field-accent)' }}>
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgb(var(--signal-rgb) / 0.32)' }}><CaseThumb id={wk.id} flush /></div>
                <p className="mt-4 text-overline text-on-field-muted">0{i + 1} / 03 &nbsp; {wk.title}</p>
                <p className="mt-2 font-serif text-title text-on-field-strong group-hover:text-on-field-accent">{wk.line}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={ATLAS} />
        <div className={col}>
          <h2 className="font-serif font-light text-on-field-strong" style={hStyle}>{C.atlas.main}</h2>
          <p className="mt-5 md:mt-8 text-body-lg text-on-field-muted"><span className="font-serif text-on-field-strong" style={bigStyle}>16+</span> years. <span className="font-serif text-on-field-strong" style={bigStyle}>61</span> projects. Multiple industries. An evolving body of work.</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Roles over time">
            {atlasRoles.map((r, i) => <li key={r} className="flex items-center gap-2 text-label text-on-field-muted"><span className="inline-block w-2 h-2 rounded-full" style={{ background: ROLE_CSS[i] }} aria-hidden="true" />{r}</li>)}
          </ul>
        </div>
      </section>
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={TEAM} />
        <div className={col}>
          <h2 className="font-serif font-light text-on-field-strong" style={hStyle}>{C.teams.main}</h2>
          <p className="mt-5 md:mt-10 text-on-field-strong"><span className="font-serif font-light" style={bigStyle}>200+</span> <span className="block mt-2 md:mt-3 text-body-lg text-on-field-muted">designers hired across organisations</span></p>
          <p className="mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.teams.sub}</p>
        </div>
      </section>
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={HUB} />
        <div className={col}>
          <h2 className="font-serif font-light text-on-field-strong" style={hStyle}>{C.hub.main}</h2>
          <p className="mt-5 md:mt-10 text-on-field-strong"><span className="font-serif font-light" style={bigStyle}>252+</span> <span className="block mt-2 md:mt-3 text-body-lg text-on-field-muted">members in Leading Design Hub India</span></p>
          <p className="mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.hub.sub}</p>
        </div>
      </section>
      <section className="relative overflow-hidden py-[12vh] px-5 md:px-[7.5%]">
        <SignalBackdrop />
        <div className="relative max-w-3xl">
          <h2 className="font-serif font-light text-on-field-strong" style={hStyle}>{C.share.main}</h2>
          <p className="mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.share.sub}</p>
        </div>
        <ul className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-8">
          {SHARE.map(c => (
            <li key={c.to}>
              <Link to={c.to} className="sg-panel group flex h-full min-h-40 flex-col justify-between rounded-2xl border p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ background: c.field, borderColor: 'var(--field-line)', outlineColor: 'var(--on-field-accent)' }}>
                <span className="text-overline text-on-field-muted">{c.kind}</span>
                <span className="mt-8 font-serif text-title text-on-field-strong group-hover:text-on-field-accent">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="relative h-screen overflow-hidden">
        <SignalBackdrop />
        <Light state={NEXT} pill={pill} />
        <div className="absolute inset-x-5 top-[11%] md:inset-x-auto md:left-[7.5%] md:top-[14%] md:w-[60%]">
          <h2 className="font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-signal)', lineHeight: 1.02, letterSpacing: '-0.015em' }}>{C.next.main}</h2>
          <p className="mt-5 md:mt-8 text-body-lg text-on-field-muted max-w-xl">{C.next.sub}</p>
        </div>
        <div className="absolute left-[22%] bottom-[37%] md:left-[30%] md:bottom-auto md:top-[50%]">
          <Link ref={pill} to="/contact" className="btn btn-primary">Start a conversation</Link>
        </div>
        <NavCards className="absolute inset-x-5 bottom-[4%] md:inset-x-auto md:left-[7.5%] md:right-[7.5%] md:bottom-[7%]" />
      </section>
    </div>
  )
}
