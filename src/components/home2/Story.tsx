import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'
import { playbackById } from '../../data/playbacks'
import { atlasYears, atlasRoles } from '../../data/atlasSummary'
import ResourceCover from '../ds/ResourceCover'
import StoryCover from '../ds/StoryCover'
import Button from '../ds/Button'
import { gsap, ScrollTrigger } from './scene'
import { computeLayout, INDUSTRIES, N_ATLAS, N_TEAM, N_HUB, type Layout } from './layout'

/* ───────────────────────── copy, exactly as written ───────────────────────── */

const BEATS = {
  hero: { main: 'Design is undergoing a profound transformation.', sub: ['Evolving human behaviour.', 'Changing business ambitions.', 'And the technology enabling both.', 'I work at their convergence.'] },
  outcomes: { main: 'This convergence is changing what design can make possible.', sub: ['More meaningful experiences.', 'More intelligent products.', 'Greater business value.'] },
  works: { main: 'From possibility to practice.', sub: ['A selection of experiences shaped across enterprise, AI and digital products.'] },
  atlas: { main: 'Every experience adds to the perspective.', sub: ['16+ years.', '61 projects.', 'Multiple industries.', 'An evolving body of work.'] },
  teams: { main: 'Because meaningful work takes collective effort.', sub: ['Building teams.', 'Developing talent.', 'Creating the conditions for good design to thrive.'] },
  hub: { main: 'And good design grows beyond the team.', sub: ['Creating spaces for designers to connect, exchange ideas and grow together.'] },
  share: { main: 'Experience becomes more valuable when it is shared.', sub: ['Workshops.', 'Mentoring.', 'Resources.', 'Ideas translated into practice.'] },
  next: { main: 'The next chapter is still taking shape.', sub: ['Exploring new possibilities in design, business and AI.', 'Always open to meaningful collaborations and conversations.'] },
} as const
type BeatKey = keyof typeof BEATS

const WORKS = ['sap-search', 'sap-agentic', 'airline-app'].map(id => {
  const cs = caseStudies.find(c => c.id === id)!
  return { id, title: cs.shortTitle, line: playbackById(id)?.headline ?? cs.title, kind: id === 'sap-search' ? 'Enterprise' : id === 'sap-agentic' ? 'AI' : 'Digital' }
})

const SHARE = [
  { kind: 'Workshop', title: 'Build Dual Fluency', to: '/resources/dual-fluency', visual: <ResourceCover bleed title="Dual Fluency" kind="Playbook" motif="loop" tone="cobalt" index={3} /> },
  { kind: 'Resource', title: 'Leading Design', to: '/resources/leading-design', visual: <ResourceCover bleed title="Leading Design" kind="Guide" motif="phases" tone="plum" index={1} /> },
  { kind: 'Initiative', title: 'From AI experiments to a capability', to: '/leadership/cases/ai-experimentation-to-capability', visual: <StoryCover motif="culture" tone="teal" className="!rounded-none w-full h-full" ratio="16 / 10" /> },
]

const CHAPTERS: { label: string; name: string }[] = [
  { label: 'hero', name: 'Convergence' }, { label: 'outcomes', name: 'Outcomes' }, { label: 'works', name: 'Selected works' }, { label: 'atlas', name: 'Career atlas' },
  { label: 'teams', name: 'Building teams' }, { label: 'hub', name: 'Community' }, { label: 'share', name: 'Sharing' }, { label: 'next', name: 'Collaborate' },
]

const ROLE = ['--viz-des', '--viz-res', '--viz-lead', '--viz-mgr']
const roleFill = (r: number) => (r < 0 ? 'rgb(var(--ink-rgb) / 0.4)' : `rgb(var(${ROLE[r]}))`)
const HUE = ['--viz-des', '--viz-lead', '--viz-res']
const VH_PER_UNIT = 42

/* ───────────────────────── small pieces ───────────────────────── */

const Words = ({ text, cls = '' }: { text: string; cls?: string }) => (
  <>{text.split(' ').map((w, i, a) => (
    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]"><span className={`w inline-block ${cls}`}>{w}{i < a.length - 1 ? ' ' : ''}</span></span>
  ))}</>
)

function Beat({ k, children }: { k: BeatKey; children?: ReactNode }) {
  const b = BEATS[k]
  return (
    <div className="st-beat absolute inset-x-0 bottom-0" data-k={k}>
      <p className="st-main font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.06, textWrap: 'balance' }}><Words text={b.main} /></p>
      <p className="mt-3 md:mt-4 text-body-lg text-ink-2 max-w-3xl">
        {b.sub.map((s, i) => <span key={i} className={`st-sub inline ${k === 'hero' && i === 3 ? 'text-ink' : ''}`}>{s}{i < b.sub.length - 1 ? ' ' : ''}</span>)}
      </p>
      {children}
    </div>
  )
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/* ───────────────────────── the scene ───────────────────────── */

function useViewport() {
  const [v, setV] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let t = 0
    const on = () => { window.clearTimeout(t); t = window.setTimeout(() => setV(p => (Math.abs(p.w - window.innerWidth) > 40 || Math.abs(p.h - window.innerHeight) > 120 ? { w: window.innerWidth, h: window.innerHeight } : p)), 250) }
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('resize', on); window.clearTimeout(t) }
  }, [])
  return v
}

export default function Story() {
  const root = useRef<HTMLElement>(null)
  const { w, h } = useViewport()
  const header = typeof document !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72 : 72
  const L: Layout = computeLayout(w, h, header)
  const [active, setActive] = useState(0)
  const nav = useRef<(label: string) => void>(() => {})

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => build(el, L, setActive, nav), el)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w, h])

  const { C } = L
  return (
    <section ref={root} className="relative" style={{ height: `${63 * VH_PER_UNIT + 100}vh` }} aria-label="Amit Kumar Tiwari, design leader">
      <div className="st-stage sticky top-0 h-screen overflow-hidden">
        <div className="h2-ambient absolute inset-0" aria-hidden="true" />

        {/* ── drawing layer ── */}
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${L.W} ${L.H}`} aria-hidden="true">
          {/* 02 outcome paths, one per force, each ending in its outcome */}
          {L.outcomePaths.map((d, i) => (
            <path key={i} className="st-path" d={d} fill="none" stroke={`rgb(var(${HUE[i]}))`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          ))}
          {/* the outcome marks: experiences ripple, products connect, value rises */}
          {L.ends.map((e, i) => (
            <g key={i} className="st-glyph" data-i={i}>
              {i === 0 && [0.2, 0.38, 0.56].map((r, k) => <circle key={k} cx={e.x} cy={e.y} r={L.g * r} fill="none" stroke={`rgb(var(${HUE[0]}) / ${1 - k * 0.3})`} strokeWidth="1.5" />)}
              {i === 1 && (() => {
                const n = [-90, 30, 150].map(a => ({ x: e.x + Math.cos((a * Math.PI) / 180) * L.g * 0.42, y: e.y + Math.sin((a * Math.PI) / 180) * L.g * 0.42 }))
                return <>
                  {n.map((p, k) => <line key={k} x1={p.x} y1={p.y} x2={n[(k + 1) % 3].x} y2={n[(k + 1) % 3].y} stroke={`rgb(var(${HUE[1]}) / 0.7)`} strokeWidth="1.5" />)}
                  {n.map((p, k) => <line key={`c${k}`} x1={p.x} y1={p.y} x2={e.x} y2={e.y} stroke={`rgb(var(${HUE[1]}) / 0.4)`} strokeWidth="1" />)}
                  {n.map((p, k) => <circle key={`n${k}`} cx={p.x} cy={p.y} r={L.g * 0.08} fill={`rgb(var(${HUE[1]}))`} />)}
                  <circle cx={e.x} cy={e.y} r={L.g * 0.11} fill="none" stroke={`rgb(var(${HUE[1]}))`} strokeWidth="1.5" />
                </>
              })()}
              {i === 2 && [0.36, 0.62, 0.95].map((hh, k) => <rect key={k} x={e.x - L.g * 0.42 + k * L.g * 0.3} y={e.y + L.g * 0.5 - L.g * hh} width={L.g * 0.22} height={L.g * hh} rx="2" fill={`rgb(var(${HUE[2]}) / ${0.45 + k * 0.25})`} />)}
            </g>
          ))}

          {/* 06 ties across the community */}
          <g className="st-links">
            {L.links.map(([a, b], i) => (
              <line key={i} className="st-link" x1={L.hub[a].x} y1={L.hub[a].y} x2={L.hub[b].x} y2={L.hub[b].y} stroke="rgb(var(--viz-lead) / 0.35)" strokeWidth="0.8" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            ))}
          </g>

          {/* 04–07 the points: projects, then designers, then a community */}
          <g className="st-dots">
            {Array.from({ length: N_HUB }, (_, j) => <circle key={j} className="st-d" cx="0" cy="0" r={L.dotR} fill="rgb(var(--ink-rgb) / 0.8)" />)}
          </g>
          <line className="st-axis" x1={L.axis.x1} y1={L.base + 4} x2={L.axis.x2} y2={L.base + 4} stroke="rgb(var(--ink-rgb) / 0.3)" strokeWidth="1" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          <g className="font-mono" fontSize={L.mobile ? 7.5 : 10.5} fill="rgb(var(--ink-rgb) / 0.55)" textAnchor="middle">
            {INDUSTRIES.map(([name, n], k) => (
              <text key={name} className="st-ind" x={L.industryC[k].x} y={L.industryLabelY(k)} opacity="0">{L.mobile && name.length > 12 ? name.split(' ')[0] : name} · {n}</text>
            ))}
          </g>
          <g className="font-mono" fontSize={L.mobile ? 8 : 10.5} fill="rgb(var(--ink-rgb) / 0.7)">
            {atlasRoles.map((r, k) => (
              <g key={r} className="st-legend" opacity="0" transform={`translate(${L.axis.x1 + (L.mobile ? (k % 2) * (L.axis.x2 - L.axis.x1) / 2 : k * 170)} ${L.top + 8 + (L.mobile ? Math.floor(k / 2) * 16 : 0)})`}>
                <circle cx="4" cy="-3.5" r="4" fill={roleFill(k)} /><text x="14" y="0">{r}</text>
              </g>
            ))}
          </g>
          <g className="st-years font-mono" fontSize={L.mobile ? 8 : 11} fill="rgb(var(--ink-rgb) / 0.45)" textAnchor="middle">
            {L.yearX.map((x, k) => (
              <text key={k} className="st-year" x={x} y={L.base + 18} opacity="0">
                {k < atlasYears.length ? (L.mobile ? `’${String(atlasYears[k]).slice(2)}` : atlasYears[k]) : (L.mobile ? 'n.d.' : 'Undated')}
              </text>
            ))}
          </g>

          {/* 01 three forces, three circles, that meet in a flower around the point */}
          <g className="st-flower">
            {L.echoes.map((_, i) => (
              <g key={`e${i}`} className="st-echo"><circle r={L.fr} fill="none" stroke="rgb(var(--ink-rgb) / 0.22)" strokeWidth="1" /></g>
            ))}
            {L.forces.map((_, i) => (
              <g key={i} className="st-force">
                <g className="st-wob"><circle className="st-petal" r={L.fr} fill={`rgb(var(${HUE[i]}))`} fillOpacity="0" stroke={`rgb(var(${HUE[i]}))`} strokeWidth="1.5" /></g>
              </g>
            ))}
          </g>

          {/* 08 the open line */}
          <line className="st-open" x1={C.x} y1={C.y} x2={L.W + 40} y2={C.y} stroke="rgb(var(--signal-rgb))" strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />

          {/* the point everything returns to */}
          <circle className="st-halo" cx={C.x} cy={C.y} r={L.fr * 0.5} fill="rgb(var(--signal-rgb) / 0.1)" opacity="0" />
          <circle className="st-core" cx={C.x} cy={C.y} r={L.mobile ? 5 : 7} fill="rgb(var(--signal-rgb))" />
        </svg>

        {/* ── 03 the work, in frames ── */}
        {WORKS.map((x, i) => (
          <Link key={x.id} to={`/craft/${x.id}`} aria-label={`Open ${x.title}`} className="st-frame group absolute left-0 top-0 overflow-hidden rounded-3 bg-surface-1 shadow-4"
            style={{ width: L.bigW, height: L.bigH }} tabIndex={-1}>
            <img src={`${import.meta.env.BASE_URL}images/covers/${x.id}-1600.webp`} alt="" decoding="async" className="st-img absolute inset-0 w-full h-full object-cover" />
            <span className="st-outline absolute inset-0 rounded-3 border-2 border-signal" aria-hidden="true" />
            <span className="sr-only">{i + 1}</span>
          </Link>
        ))}

        {/* ── 07 what gets shared ── */}
        {SHARE.map(s => (
          <Link key={s.title} to={s.to} className={`st-card group absolute left-0 top-0 flex ${L.mobile ? 'flex-row' : 'flex-col'} overflow-hidden rounded-3 border bg-surface-1 shadow-3`}
            style={{ width: L.cardW, height: L.cardH, borderColor: 'var(--line-2)' }} tabIndex={-1}>
            <div className={`relative overflow-hidden ${L.mobile ? 'w-2/5 h-full' : 'h-3/5 w-full'}`}><div className="absolute inset-0">{s.visual}</div></div>
            <div className="flex-1 flex flex-col justify-center gap-1 p-4 md:p-5">
              <span className="text-label text-ink-3">{s.kind}</span>
              <span className="font-serif text-ink group-hover:text-signal-ink leading-tight" style={{ fontSize: 'var(--fs-title)' }}>{s.title}</span>
            </div>
          </Link>
        ))}

        {/* ── words ── */}
        <div className="absolute inset-x-0 bottom-0 pb-8 md:pb-12" style={{ height: L.H - L.bottom }}>
          <div className="container-site h-full"><div className="relative h-full">
            <Beat k="hero" />
            <Beat k="outcomes" />
            <Beat k="works" />
            {WORKS.map((x, i) => (
              <div key={x.id} className="st-beat st-case absolute inset-x-0 bottom-0" data-k={`case${i}`}>
                <p className="text-label text-ink-3"><span className="text-signal-ink">{String(i + 1).padStart(2, '0')}</span> / 03 · {x.kind} · {x.title}</p>
                <p className="font-serif text-ink font-light mt-3" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.12, textWrap: 'balance' }}><Words text={x.line} /></p>
                <Link to={`/craft/${x.id}`} className="st-cta mt-4 inline-flex items-center gap-2 text-label text-ink-2 hover:text-signal-ink">Open the case <Arrow /></Link>
              </div>
            ))}
            <Beat k="atlas"><Link to="/career-atlas/" className="st-cta mt-4 inline-flex items-center gap-2 text-label text-ink-2 hover:text-signal-ink" reloadDocument>Open the career atlas <Arrow /></Link></Beat>
            <Beat k="teams"><p className="st-metric mt-4 flex items-baseline gap-3 text-body text-ink-3"><span className="st-n-team font-serif text-signal-ink" style={{ fontSize: 'var(--fs-heading)' }}>200+</span>designers hired across organisations</p></Beat>
            <Beat k="hub"><p className="st-metric mt-4 flex flex-wrap items-baseline gap-x-3 text-body text-ink-3"><span className="st-n-hub font-serif text-signal-ink" style={{ fontSize: 'var(--fs-heading)' }}>252+</span>members in Leading Design Hub India<Link to="/community/design-hub" className="text-label text-ink-2 hover:text-signal-ink underline underline-offset-4">Read the story</Link></p></Beat>
            <Beat k="share" />
            <Beat k="next">
              <div className="st-cta mt-5 flex flex-wrap gap-3">
                <Button to="/contact" arrow>Start a conversation</Button>
                <Button to="/craft" variant="secondary">See all works</Button>
              </div>
            </Beat>
          </div></div>
        </div>

        {/* ── chapter rail ── */}
        <nav aria-label="Chapters" className="hidden lg:flex fixed left-3 xl:left-5 top-1/2 -translate-y-1/2 z-30">
          <ol className="flex flex-col gap-4">
            {CHAPTERS.map((c, i) => (
              <li key={c.label}>
                <button type="button" onClick={() => nav.current(c.label)} aria-current={i === active ? 'step' : undefined} aria-label={`Go to ${c.name}`} className="group relative flex items-center justify-center w-2.5 h-2.5">
                  <span className={`block w-1.5 h-1.5 rounded-full transition-transform ${i === active ? 'bg-signal scale-150' : 'bg-ink-3 group-hover:bg-ink'}`} aria-hidden="true" />
                  <span className="absolute left-5 whitespace-nowrap rounded-full bg-surface-2 px-2.5 py-1 text-label text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none shadow-2">{c.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}

/* ───────────────────────── choreography ───────────────────────── */

function build(el: HTMLElement, L: Layout, setActive: (i: number) => void, nav: { current: (label: string) => void }) {
  const q = gsap.utils.selector(el)
  const { C } = L
  const beat = (k: string) => q(`.st-beat[data-k="${k}"]`)[0] as HTMLElement
  const subs = (k: string) => beat(k).querySelectorAll('.st-sub')
  const dots = q('.st-d') as unknown as SVGCircleElement[]
  const forces = q('.st-force'), frames = q('.st-frame'), cards = q('.st-card')

  /* resting state */
  gsap.set(q('.st-beat'), { autoAlpha: 0 })
  gsap.set(q('.st-beat .w'), { yPercent: 110 })
  gsap.set(q('.st-sub, .st-cta, .st-metric'), { opacity: 0, y: 10 })
  gsap.set(forces, { x: C.x, y: C.y, scale: 0, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(q('.st-echo'), { x: C.x, y: C.y, scale: 0, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(q('.st-glyph'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
  frames.forEach(f => gsap.set(f, { xPercent: -50, yPercent: -50, x: C.x, y: C.y, scale: 0.02, autoAlpha: 0 }))
  gsap.set(q('.st-img'), { clipPath: 'inset(50% 50% 50% 50%)' })
  cards.forEach(c => gsap.set(c, { xPercent: -50, yPercent: -50, x: C.x, y: C.y, scale: 0.02, autoAlpha: 0 }))
  // the first 61 start inside the frames; every later point is born from one of them, where it sits on the atlas
  dots.forEach((d, j) => { const p = j < N_ATLAS ? L.atlasStart[j] : L.atlas[j % N_ATLAS].p; gsap.set(d, { x: p.x, y: p.y, scale: 0, transformOrigin: '50% 50%' }) })
  gsap.set(q('.st-core'), { transformOrigin: '50% 50%' })
  gsap.set(q('.st-halo'), { transformOrigin: '50% 50%' })

  /* each force keeps its own slow drift, independent of the scroll */
  q('.st-wob').forEach((g, i) => gsap.to(g, { x: [9, -11, 7][i], y: [-7, 8, 10][i], rotate: [0, 8, -6][i], duration: [4.2, 5.1, 4.7][i], repeat: -1, yoyo: true, ease: 'sine.inOut' }))

  /* the first screen arrives on its own */
  gsap.set(beat('hero'), { autoAlpha: 1 })
  gsap.from(q('.st-core'), { scale: 0, duration: 1, ease: 'back.out(3)', delay: 0.2 })
  gsap.to(beat('hero').querySelectorAll('.st-main .w'), { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06, delay: 0.45 })

  const st = { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.8 }
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, scrollTrigger: st })

  const inBeat = (k: string, at: number) => tl.set(beat(k), { autoAlpha: 1 }, at).to(beat(k).querySelectorAll('.w'), { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, at)
  const sub = (k: string, i: number, at: number) => tl.to(subs(k)[i], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at)
  const extra = (k: string, at: number) => tl.to(beat(k).querySelectorAll('.st-cta, .st-metric'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at)
  const outBeat = (k: string, at: number) => tl.to(beat(k), { autoAlpha: 0, y: -24, duration: 0.5, ease: 'power2.in' }, at).set(beat(k), { y: 0 }, at + 0.55)

  /* 01 · a point, three forces, one convergence */
  tl.addLabel('hero', 0)
  forces.forEach((f, i) => {
    const t = 0.4 + i * 1.4
    tl.to(f, { opacity: 1, scale: 1, x: L.forces[i].x, y: L.forces[i].y, duration: 1.2, ease: 'expo.out' }, t)
    sub('hero', i, t + 0.3)
  })
  // they lock into a flower; the drift settles; three echoes bloom between the petals
  tl.to(forces, { x: (i: number) => L.petals[i].x, y: (i: number) => L.petals[i].y, duration: 1.6 }, 5)
    .to(q('.st-wob'), { x: 0, y: 0, rotate: 0, duration: 1.2 }, 5)
    .to(q('.st-petal'), { attr: { 'fill-opacity': 0.1 }, duration: 0.8 }, 6)
    .to(q('.st-echo'), { opacity: 1, scale: 1, x: (i: number) => L.echoes[i].x, y: (i: number) => L.echoes[i].y, duration: 1.1, ease: 'expo.out', stagger: 0.12 }, 6.3)
    .to(q('.st-flower'), { rotate: 30, svgOrigin: `${C.x} ${C.y}`, duration: 7, ease: 'none' }, 6)
  sub('hero', 3, 6.3)
  tl.addLabel('heroRest', 7.2)
  outBeat('hero', 8)

  /* 02 · the forces extend into paths, and each path becomes an outcome */
  tl.addLabel('outcomes', 8.6)
  inBeat('outcomes', 8.6)
  // the point of convergence grows
  tl.to(q('.st-core'), { scale: 2.4, duration: 1, ease: 'expo.out' }, 8.8)
    .to(q('.st-halo'), { opacity: 1, scale: 3.2, duration: 1.2, ease: 'expo.out' }, 8.8)
    .to(q('.st-echo'), { opacity: 0.35, duration: 0.8 }, 9)
  q('.st-path').forEach((p, i) => {
    const t = 9.6 + i * 1.1
    tl.to(p, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, t)
      .to(q('.st-glyph')[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, t + 0.9)
      .to(subs('outcomes')[i], { opacity: 1, y: 0, color: 'rgb(var(--ink-rgb))', duration: 0.5 }, t + 0.9)
    if (i > 0) tl.to(subs('outcomes')[i - 1], { color: 'rgb(var(--ink-rgb) / 0.6)', duration: 0.5 }, t + 0.9)
  })
  tl.to(subs('outcomes'), { color: 'rgb(var(--ink-rgb) / 0.75)', duration: 0.5 }, 12.6)
  tl.addLabel('outcomesRest', 13)
  outBeat('outcomes', 14)

  /* 03 · the paths turn into interfaces; then the work takes the stage, one at a time */
  tl.addLabel('works', 14.6)
  inBeat('works', 14.6)
  sub('works', 0, 15.2)
  frames.forEach((f, i) => {
    tl.set(f, { x: L.ends[i].x, y: L.ends[i].y }, 14.6)
      .to(f, { autoAlpha: 1, scale: L.rowScale, x: L.row[i].x, y: L.row[i].y, duration: 1.2, ease: 'expo.inOut' }, 14.8 + i * 0.15)
      .to(q('.st-img')[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, 15.6 + i * 0.15)
      .to(f.querySelector('.st-outline'), { opacity: 0, duration: 0.6 }, 16.1 + i * 0.15)
  })
  tl.to(q('.st-path'), { opacity: 0, duration: 0.6 }, 14.8)
    .to(q('.st-glyph'), { scale: 0.4, opacity: 0, duration: 0.5, ease: 'power2.in' }, 14.6)
    .to(forces, { x: C.x, y: C.y, scale: 0.2, opacity: 0, duration: 0.8, ease: 'power3.in' }, 14.6)
    .to(q('.st-echo'), { x: C.x, y: C.y, scale: 0.2, opacity: 0, duration: 0.8, ease: 'power3.in' }, 14.6)
    .to(q('.st-halo'), { opacity: 0, scale: 1, duration: 0.6 }, 14.8)
    .to(q('.st-core'), { scale: 0, duration: 0.5 }, 15.2)
  tl.addLabel('worksRest', 16.8)
  outBeat('works', 17.4)
  WORKS.forEach((_, i) => {
    const t = 18 + i * 3
    tl.to(frames[i], { scale: 1, x: C.x, y: C.y, duration: 1, zIndex: 5 }, t)
    frames.forEach((g, k) => { if (k !== i) tl.to(g, { scale: L.rowScale * 0.8, x: L.row[k].x + (k < i ? -1 : 1) * L.fw * (L.mobile ? 0.9 : 1.6), y: C.y, opacity: 0.25, duration: 1, zIndex: 1 }, t) })
    inBeat(`case${i}`, t + 0.4)
    extra(`case${i}`, t + 0.9)
    tl.addLabel(`case${i}`, t + 1.6)
    outBeat(`case${i}`, t + 2.4)
  })
  tl.to(frames, { scale: L.rowScale, x: (i: number) => L.row[i].x, y: C.y, opacity: 1, duration: 1 }, 27)

  /* 04 · the interfaces dissolve into points; each measure of the career gets its own arrangement of the same points */
  tl.addLabel('atlas', 28.2)
  tl.to(dots.slice(0, N_ATLAS), { scale: 1, duration: 0.4, stagger: 0.004, ease: 'back.out(2)' }, 28)
    .to(frames, { autoAlpha: 0, scale: L.rowScale * 0.94, duration: 0.6, ease: 'power2.in' }, 28.3)
  inBeat('atlas', 28.6)
  // 16+ years: a timeline draws itself
  tl.to(q('.st-axis'), { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, 29)
    .to(q('.st-year'), { opacity: 1, duration: 0.3, stagger: 0.05 }, 29.3)
  sub('atlas', 0, 29.4)
  // 61 projects: the points drop into their years
  tl.to(dots.slice(0, N_ATLAS), { x: (j: number) => L.atlas[j].p.x, y: (j: number) => L.atlas[j].p.y, duration: 1.4, stagger: 0.01, ease: 'expo.inOut' }, 30.1)
  sub('atlas', 1, 30.7)
  // multiple industries: the same points regroup, one cluster per industry
  tl.to(q('.st-axis, .st-year'), { opacity: 0, duration: 0.4 }, 31.9)
    .to(dots.slice(0, N_ATLAS), { x: (j: number) => L.industryPos[j].x, y: (j: number) => L.industryPos[j].y, duration: 1.4, stagger: 0.008, ease: 'expo.inOut' }, 32)
    .to(q('.st-ind'), { opacity: 1, duration: 0.4, stagger: 0.03 }, 32.9)
  sub('atlas', 2, 32.9)
  // an evolving body of work: back to the timeline, now coloured by the role I held
  tl.to(q('.st-ind'), { opacity: 0, duration: 0.3 }, 34.4)
    .to(q('.st-axis, .st-year'), { opacity: 1, duration: 0.4 }, 34.6)
    .to(dots.slice(0, N_ATLAS), { x: (j: number) => L.atlas[j].p.x, y: (j: number) => L.atlas[j].p.y, attr: { fill: (j: number) => roleFill(L.atlas[j].role) }, duration: 1.4, stagger: 0.008, ease: 'expo.inOut' }, 34.5)
    .to(q('.st-legend'), { opacity: 1, duration: 0.4, stagger: 0.08 }, 35.4)
  sub('atlas', 3, 35.4)
  extra('atlas', 35.9)
  tl.addLabel('atlasRest', 36.6)
  outBeat('atlas', 37.4)

  /* 05 · the points multiply and organise: teams */
  tl.addLabel('teams', 38)
  tl.to(q('.st-year, .st-axis, .st-legend'), { opacity: 0, duration: 0.4 }, 37.8)
    .to(q('.st-core'), { scale: 1, duration: 0.6, ease: 'back.out(3)' }, 38.4)
    .to(dots.slice(0, N_TEAM), { x: (j: number) => L.team[j].x, y: (j: number) => L.team[j].y, scale: 0.62, attr: { fill: 'rgb(var(--ink-rgb) / 0.8)' }, duration: 1.6, stagger: 0.006, ease: 'expo.inOut' }, 38.2)
  inBeat('teams', 38.2)
  BEATS.teams.sub.forEach((_, i) => sub('teams', i, 39 + i * 0.6))
  extra('teams', 40.4)
  count(tl, q('.st-n-team')[0] as HTMLElement, 61, 200, 38.4, 2)
  tl.addLabel('teamsRest', 41.4)
  outBeat('teams', 42.4)

  /* 06 · the constellation grows past its edges and ties form across groups: a community */
  tl.addLabel('hub', 43)
  inBeat('hub', 43)
  sub('hub', 0, 43.7)
  tl.to(dots, { x: (j: number) => L.hub[j].x, y: (j: number) => L.hub[j].y, scale: 0.62, attr: { fill: 'rgb(var(--viz-lead))' }, duration: 1.8, stagger: 0.003, ease: 'expo.inOut' }, 43.2)
    .to(q('.st-link'), { strokeDashoffset: 0, duration: 1, stagger: 0.006, ease: 'power2.out' }, 44.6)
  extra('hub', 45)
  count(tl, q('.st-n-hub')[0] as HTMLElement, 200, 252, 43.4, 1.8)
  tl.addLabel('hubRest', 46.4)
  outBeat('hub', 47.4)

  /* 07 · the network branches into three streams, and each becomes something people can use */
  tl.addLabel('share', 48)
  inBeat('share', 48)
  tl.to(q('.st-link'), { opacity: 0, duration: 0.6 }, 48)
    .to(q('.st-core'), { scale: 0, duration: 0.5 }, 48.2)
    .to(dots, { x: (j: number) => L.cards[j % 3].x, y: (j: number) => L.cards[j % 3].y, duration: 1.4, stagger: 0.004, ease: 'power3.in' }, 48.4)
    .to(dots, { scale: 0, duration: 0.3 }, 50.1)
  cards.forEach((c, i) => {
    tl.set(c, { x: L.cards[i].x, y: L.cards[i].y }, 48.4)
      .to(c, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, 50 + i * 0.2)
  })
  BEATS.share.sub.forEach((_, i) => sub('share', i, 50.2 + i * 0.4))
  tl.addLabel('shareRest', 52)
  outBeat('share', 53)

  /* 08 · everything returns to the point, and a new line sets out from it */
  tl.addLabel('next', 53.6)
  tl.to(cards, { scale: 0.02, opacity: 0, duration: 0.7, ease: 'power3.in' }, 53.4)
    .to(cards, { x: C.x, y: C.y, duration: 0.7, ease: 'power3.in' }, 53.9)
    .to(q('.st-core'), { scale: 1, duration: 0.6, ease: 'back.out(3)' }, 54.5)
    .to(q('.st-halo'), { opacity: 1, scale: 1, duration: 0.6 }, 54.6)
    .to(q('.st-open'), { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 55)
  inBeat('next', 54.8)
  sub('next', 0, 55.6)
  sub('next', 1, 56.2)
  extra('next', 56.8)
  tl.addLabel('nextRest', 57.8)
  tl.to({}, { duration: 5 }, 57.8)

  /* chapter rail and snapping */
  const restOf = (label: string) => tl.labels[`${label}Rest`] ?? tl.labels[label]
  const starts = CHAPTERS.map(c => tl.labels[c.label])
  const trig = tl.scrollTrigger!
  ScrollTrigger.create({
    trigger: el, start: 'top top', end: 'bottom bottom',
    onUpdate: s => { const t = s.progress * tl.duration(); let a = 0; starts.forEach((v, i) => { if (t >= v - 0.6) a = i }); setActive(a) },
  })
  nav.current = (label: string) => {
    const t = restOf(label)
    const y = trig.start + (t / tl.duration()) * (trig.end - trig.start)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  ScrollTrigger.refresh()
}

function count(tl: gsap.core.Timeline, el: HTMLElement, from: number, to: number, at: number, dur: number) {
  const o = { v: from }
  tl.fromTo(o, { v: from }, { v: to, duration: dur, ease: 'power1.out', onUpdate: () => { el.textContent = `${Math.round(o.v)}+` } }, at)
}

