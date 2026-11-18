import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import CaseThumb from '../ds/CaseThumb'
import SignalBackdrop from '../illustrations/signal/SignalBackdrop'
import { createLight, type LightRenderer } from '../illustrations/signal/glField'
import { useThemeValue } from '../ds/theme'
import { Field, computeLayout, frameRect, blank, opened, FORCE_CSS, FORCE_INK, type SceneState, type Layout } from '../illustrations/signal/signalScene'
import NavCards from './NavCards'
import { COPY, WORKS, CHAPTERS, MEASURES, SHARE } from './copy'
import { atlasRoles } from '../../data/atlasSummary'
import { ROLE_CSS, industryRows } from '../illustrations/signal/signalLater'
const IND_ROWS = industryRows()

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Scroll length of one timeline unit, in viewport heights. */
const VH = 40
/** Units spent on the convergence before 01 hands over to 02. */
const A = 2
/** Where 04 begins. */
const B = A + 13.6
/** 08 ends with a short rest, so the doors can be used before the stage lets go. */
const TOTAL = B + 25.8
const EASE = 'expo.out'
/** Words arrive stretched and out of focus and resolve, as if pulled into place; they leave the same way. */
const IN_FROM = { opacity: 0, yPercent: 35, scaleX: 1.4, filter: 'blur(14px)', transformOrigin: '0% 70%' }
const IN_TO = { opacity: 1, yPercent: 0, scaleX: 1, filter: 'blur(0px)' }
const OUT_TO = { opacity: 0, yPercent: -30, scaleX: 0.86, filter: 'blur(10px)' }

function useViewport() {
  const [v, setV] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let t = 0
    const on = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => setV(p => (Math.abs(p.w - window.innerWidth) > 40 || Math.abs(p.h - window.innerHeight) > 140 ? { w: window.innerWidth, h: window.innerHeight } : p)), 250)
    }
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('resize', on); window.clearTimeout(t) }
  }, [])
  return v
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/**
 * Home v3, the Signal direction: the whole story, keyframes 01 to 08.
 * A lime point of light. Three forces stream in, each on its own course, and lock into a flower around it.
 * The point grows, the rings unspool into paths, and the paths land as three outcomes.
 * The outcomes then become the light that traces three pieces of work, and the work takes centre stage.
 */
export default function Signal() {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const frames = useRef<(HTMLAnchorElement | null)[]>([])
  const tilts = useRef<(HTMLDivElement | null)[]>([])
  const shades = useRef<(HTMLDivElement | null)[]>([])
  const caps2 = useRef<(HTMLParagraphElement | null)[]>([])
  const workCaps = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLOListElement>(null)
  const labels = useRef<(HTMLParagraphElement | null)[]>([])
  const cards = useRef<(HTMLAnchorElement | null)[]>([])
  const indLabels = useRef<(HTMLDivElement | null)[]>([])
  const count = useRef<HTMLSpanElement>(null)
  const numBox = useRef<HTMLDivElement>(null)
  const measures = useRef<(HTMLDivElement | null)[]>([])
  const legend = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLAnchorElement>(null)
  const S = useRef<SceneState>(blank())
  const introDone = useRef(false)
  const vp = useViewport()
  const theme = useThemeValue()
  const lightR = useRef<LightRenderer | null>(null)
  useEffect(() => { lightR.current?.setLight(theme === 'light') }, [theme])

  useLayoutEffect(() => {
    const el = root.current, cv = canvas.current
    if (!el || !cv || !vp.w || !vp.h) return
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70
    const L: Layout = computeLayout(vp.w, vp.h, headerH)

    /* place the pieces that follow the geometry */
    caps2.current.forEach((c, i) => {
      if (!c) return
      Object.assign(c.style, { left: `${L.E[i].x}px`, top: `${L.E[i].y + L.oR * (i === 2 ? 0.95 : 1.12) + (L.mobile ? 10 : 22)}px`, width: `${L.oR * (L.mobile ? 2.9 : 3.4)}px` })
    })
    frames.current.forEach(f => { if (f) Object.assign(f.style, { width: `${L.hero.w}px`, height: `${L.hero.h}px` }) })
    if (workCaps.current) Object.assign(workCaps.current.style, { left: `${L.hero.x}px`, top: `${L.hero.y + L.hero.h + (L.mobile ? 16 : 28)}px`, width: `${L.hero.w}px` })

    /* light */
    const light = createLight(cv)
    light.setLight(document.documentElement.getAttribute('data-theme') === 'light')
    lightR.current = light
    light.resize(vp.w, vp.h, Math.min(window.devicePixelRatio || 1, 2))
    const field = new Field()
    const G = field.geom(L)
    // one corner radius for the frames, their reveal mask, the cards and the light that traces them
    const rad = (tilts.current[0] && parseFloat(getComputedStyle(tilts.current[0]).borderTopLeftRadius)) || 10
    G.radius = rad
    cards.current.forEach((c, i) => { if (c) Object.assign(c.style, { left: `${G.cards[i].x}px`, top: `${G.cards[i].y}px`, width: `${G.cards[i].w}px`, height: `${G.cards[i].h}px` }) })
    {
      const m = measures.current, gapY = L.mobile ? 14 : 22
      const stackTop = Math.min(...G.year.map(p => p.y))
      if (m[1]) Object.assign(m[1].style, { transform: `translate3d(${G.T0.x}px, ${stackTop - gapY}px, 0) translateY(-100%)` })
      if (m[3]) Object.assign(m[3].style, { transform: `translate3d(${G.T0.x}px, ${stackTop - gapY}px, 0) translateY(-100%)` })
      const fieldTop = G.rows[0].y - (L.mobile ? 12 : 16)
      const fieldLeft = L.mobile ? G.rows[0].lx : G.T0.x
      if (m[2]) Object.assign(m[2].style, { transform: `translate3d(${fieldLeft}px, ${fieldTop - gapY}px, 0) translateY(-100%)` })
      if (legend.current) Object.assign(legend.current.style, { transform: `translate3d(${G.T0.x}px, ${G.T0.y + gapY}px, 0)`, width: `${G.T1.x - G.T0.x}px` })
      if (numBox.current) Object.assign(numBox.current.style, { left: `${G.Ct.x}px`, top: `${G.Ct.y}px` })
    }
    indLabels.current.forEach((lb, i) => {
      const rw = G.rows[i]
      if (!lb || !rw) return
      Object.assign(lb.style, { left: `${rw.lx}px`, top: `${rw.y}px`, transform: L.mobile ? 'translateY(-50%)' : 'translate(-100%, -50%)' })
    })
    if (introDone.current) S.current = opened()
    const st = S.current

    let px = 0, py = 0, tx = 0, ty = 0
    const onMove = (e: PointerEvent) => { if (e.pointerType === 'touch') return; tx = (e.clientX / vp.w) * 2 - 1; ty = (e.clientY / vp.h) * 2 - 1 }
    window.addEventListener('pointermove', onMove, { passive: true })

    const frameEls = [...frames.current]
    const hover = [0, 0, 0].map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }))
    const enter: ((e: PointerEvent) => void)[] = []
    const leave: (() => void)[] = []
    frames.current.forEach((f, i) => {
      if (!f) return
      enter[i] = (e: PointerEvent) => { const r = f.getBoundingClientRect(); hover[i].tx = ((e.clientX - r.left) / r.width - 0.5) * 2; hover[i].ty = ((e.clientY - r.top) / r.height - 0.5) * 2 }
      leave[i] = () => { hover[i].tx = 0; hover[i].ty = 0 }
      f.addEventListener('pointermove', enter[i]); f.addEventListener('pointerleave', leave[i])
    })

    let visible = true, raf = 0
    const lastClip = ['', '', '']
    const lastTab = [-2, -2, -2]
    let lastCard = ''
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      const t = now / 1000
      px += (tx - px) * 0.05; py += (ty - py) * 0.05
      const n = field.compose(st, L, t, px, py)
      light.draw(field.buf, n)
      const la = st.lab * (1 - Math.min(1, st.lock * 1.6))
      labels.current.forEach((lb, i) => {
        if (!lb) return
        lb.style.opacity = la.toFixed(3)
        if (la < 0.01) return
        const c = field.centers[i], dr = L.dirs[i], off = L.R * (L.mobile ? 1.18 : 1.3)
        const hw = lb.offsetWidth / 2 + 16, hh = lb.offsetHeight / 2
        const lx = Math.min(L.W - hw, Math.max(hw, c.x + dr.x * off)), ly = Math.max(L.top + hh + 16, c.y + dr.y * off)
        lb.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0) translate(-50%, -50%)`
      })

      const p = (1 - Math.min(1, Math.max(0, st.reveal))) * 50
      const clip = p > 0.01 ? `inset(${p.toFixed(2)}% ${p.toFixed(2)}% ${p.toFixed(2)}% ${p.toFixed(2)}% round ${rad}px)` : `inset(0% round ${rad}px)`
      const active = Math.round(st.workIdx)
      frames.current.forEach((f, i) => {
        if (!f) return
        const r = frameRect(L, i, st.workIdx)
        const on = st.reveal > 0.002 && r.x < L.W && r.x + r.w > 0 && r.bright > 0.01
        const fo = on ? 1 - Math.min(1, st.at * 1.4) : 0
        f.style.opacity = fo.toFixed(3)
        f.style.pointerEvents = fo > 0.5 ? 'auto' : 'none'
        f.style.transform = `translate3d(${r.x.toFixed(1)}px, ${r.y.toFixed(1)}px, 0) scale(${(r.w / L.hero.w).toFixed(4)})`
        if (lastClip[i] !== clip) { f.style.clipPath = clip; lastClip[i] = clip }
        const sh = shades.current[i]; if (sh) sh.style.opacity = String((1 - r.bright) * 0.92)
        const h = hover[i]; h.x += (h.tx - h.x) * 0.08; h.y += (h.ty - h.y) * 0.08
        const tl = tilts.current[i]; if (tl) tl.style.transform = `perspective(1400px) rotateX(${(-h.y * 3).toFixed(2)}deg) rotateY(${(h.x * 4).toFixed(2)}deg)`
        const tab = i === active && st.reveal > 0.6 && st.at < 0.3 ? 0 : -1
        if (lastTab[i] !== tab) { f.tabIndex = tab; f.setAttribute('aria-hidden', tab === 0 ? 'false' : 'true'); lastTab[i] = tab }
      })

      const cp = (1 - Math.min(1, Math.max(0, st.card))) * 50
      const cclip = `inset(${cp.toFixed(2)}% ${cp.toFixed(2)}% ${cp.toFixed(2)}% ${cp.toFixed(2)}% round ${rad}px)`
      if (cclip !== lastCard) {
        lastCard = cclip
        const on = st.card > 0.002, live = st.card > 0.6
        cards.current.forEach(c => {
          if (!c) return
          c.style.opacity = on ? '1' : '0'
          c.style.clipPath = cclip
          c.style.pointerEvents = live ? 'auto' : 'none'
          c.tabIndex = live ? 0 : -1
        })
      }
      if (count.current) {
        const tm = Math.min(1, Math.max(0, st.team)), cm = Math.min(1, Math.max(0, st.comm))
        const v = cm > 0 ? Math.round(200 + 52 * cm) : Math.round(61 + 139 * tm)
        count.current.textContent = v >= 252 ? '252+' : v === 200 ? '200+' : String(v)
      }
      const m0 = measures.current[0]
      if (m0 && st.tl > 0) { const pt = field.pt; m0.style.transform = `translate3d(${(pt.x - 18).toFixed(1)}px, ${(pt.y - (L.mobile ? 16 : 24)).toFixed(1)}px, 0) translate(-100%, -100%)` }
    }
    raf = requestAnimationFrame(tick)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '10% 0px' })
    io.observe(el)

    let ctx: gsap.Context | undefined
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => build(el, st, L), el)
    })

    function build(scope: HTMLElement, s: SceneState, Lo: Layout) {
      const q = gsap.utils.selector(scope)
      const h1 = SplitText.create(q('.sg-h1'), { type: 'words' })
      const h2 = SplitText.create(q('.sg-h2'), { type: 'words' })
      const h3 = SplitText.create(q('.sg-h3'), { type: 'words' })
      const wA = h1.words.slice(0, 4), wB = h1.words.slice(4)
      const subs = q('.sg-s1')
      const conv = SplitText.create(q('.sg-conv'), { type: 'words' })
      gsap.set(conv.words, IN_FROM)
      const workEls = q('.sg-work')
      const later = ['.sg-h4', '.sg-h5', '.sg-h6', '.sg-h7', '.sg-h8'].map(c => SplitText.create(q(c), { type: 'words' }))
      const [h4, h5, h6, h7, h8] = later
      gsap.set(later.map(x => x.words), IN_FROM)
      gsap.set([q('.sg-ind'), q('.sg-sub5'), q('.sg-c5'), q('.sg-sub6'), q('.sg-c6'), q('.sg-sub7'), q('.sg-sub8'), q('.sg-l5'), q('.sg-l6')], { autoAlpha: 0, y: 16 })
      gsap.set([q('.sg-m'), q('.sg-legend'), q('.sg-num'), q('.sg-cta'), q('.sg-doors-over')], { autoAlpha: 0 })
      gsap.set(q('.sg-door'), { autoAlpha: 0, y: 60, rotationX: -38, transformPerspective: 900, transformOrigin: '50% 100%' })
      // the line in 08 wraps the real button: measure it where it rests
      if (pill.current) {
        const sr = scope.firstElementChild!.getBoundingClientRect(), r = pill.current.getBoundingClientRect()
        const G = field.geom(Lo)
        G.pill = { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height, bright: 1 }
        G.P8.y = G.pill.y + G.pill.h / 2
      G.pillR = parseFloat(getComputedStyle(pill.current).borderTopLeftRadius) || 6
      }

      /* resting states for the later beats */
      gsap.set([h2.words, h3.words], IN_FROM)
      gsap.set([q('.sg-c2'), q('.sg-sub3')], { autoAlpha: 0, y: 18 })
      gsap.set(workEls, { autoAlpha: 0, y: 18 })

      /* 01 plays on arrival: the point, then three forces, each on its own course, then the lock */
      if (!introDone.current) {
        gsap.set([wA, wB], IN_FROM)
        gsap.set(subs.slice(0, 3), { opacity: 0.22 })
        gsap.set(q('.sg-over, .sg-hint'), { autoAlpha: 0, y: 10 })
        const intro = gsap.timeline({ delay: 0.3, onComplete: () => { introDone.current = true } })
        intro
          .to(s, { dust: 1, duration: 2.4, ease: 'power1.out' }, 0)
          .to(q('.sg-over'), { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE }, 0.1)
          .to(s, { a0: 1, duration: 1.7, ease: 'power2.out' }, 0.2)
          .to(s, { a1: 1, duration: 1.7, ease: 'power2.out' }, 0.45)
          .to(s, { a2: 1, duration: 1.7, ease: 'power2.out' }, 0.7)
          .to(wA, { ...IN_TO, duration: 1.1, ease: EASE, stagger: 0.08 }, 0.3)
          .to(wB, { ...IN_TO, duration: 1.2, ease: EASE, stagger: 0.09 }, 1.0)
          .to(s, { lab: 1, duration: 0.8, ease: 'power1.out' }, 1.6)
          .to(subs[0], { opacity: 1, duration: 0.6 }, 1.75)
          .to(subs[1], { opacity: 1, duration: 0.6 }, 2.0)
          .to(subs[2], { opacity: 1, duration: 0.6 }, 2.25)
          .to(q('.sg-hint'), { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE }, 2.6)
        introRef = intro
      }

      /* scroll: 01 hands over to 02, 02 to 03, then each work takes centre stage in turn */
      const ni = { immediateRender: false }
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: scope, start: 'top top', end: 'bottom bottom', scrub: 0.7,
          onUpdate: self => {
            if (self.progress > 0.002 && introRef && introRef.progress() < 1) introRef.progress(1)
            const tt = self.progress * TOTAL
            const ch = [A + 2.4, A + 6.6, B + 0.6, B + 10, B + 13.6, B + 17.2, B + 20.8].filter(v => tt >= v).length
            rail.current?.querySelectorAll('li').forEach((li, i) => li.toggleAttribute('data-on', i === ch))
          },
        },
      })
      tl.to({}, { duration: TOTAL }, 0)

      // 01: the convergence. The forces leave their own courses, turn into circles and lock into a flower;
      // at the lock the point is born and the line that names it rises with it.
      tl.fromTo(q('.sg-hint'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ...ni }, 0.05)
      tl.fromTo(s, { lock: 0 }, { lock: 1, duration: 1.5, ease: 'power2.inOut', ...ni }, 0.25)
      tl.fromTo(subs.slice(0, 3), { opacity: 1 }, { opacity: 0.5, duration: 0.6, ...ni }, 0.4)
      tl.fromTo(s, { pt: 0 }, { pt: 1, duration: 0.3, ease: 'power2.out', ...ni }, 1.5)
      tl.fromTo(s, { ptR: 2.8 }, { ptR: 1, duration: 0.9, ease: EASE, ...ni }, 1.5)
      tl.fromTo(conv.words, IN_FROM, { ...IN_TO, duration: 0.7, ease: EASE, stagger: 0.07, ...ni }, 1.5)
      tl.fromTo(s, { echo: 0 }, { echo: 1, duration: 0.9, ease: 'power1.inOut', ...ni }, 1.65)
      // 01 -> 02: the hush, the line lifts away, the flower rises and the point grows
      tl.fromTo(h1.words, IN_TO, { ...OUT_TO, duration: 0.55, ease: 'power2.in', stagger: 0.035, ...ni }, A + 1.2)
      tl.fromTo([q('.sg-over'), q('.sg-sub1')], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.5, ease: 'power2.in', ...ni }, A + 1.25)
      tl.fromTo(s, { echo: 1 }, { echo: 0, duration: 0.8, ...ni }, A + 1.3)
      tl.fromTo(s, { move: 0 }, { move: 1, duration: 1.4, ease: 'power2.inOut', ...ni }, A + 1.4)
      tl.fromTo(s, { ptR: 1 }, { ptR: 1.8, duration: 1.0, ease: 'power3.out', ...ni }, A + 2.2)
      tl.fromTo(h2.words, IN_FROM, { ...IN_TO, duration: 0.8, ease: EASE, stagger: 0.06, ...ni }, A + 2.35)
      // the forces travel as paths and land, each brightening its line as it lands
      ;(['o0', 'o1', 'o2'] as const).forEach((k, i) => {
        tl.fromTo(s, { [k]: 0 }, { [k]: 1, duration: 1.5, ease: 'power1.inOut', ...ni }, A + 2.7 + i * 0.35)
        tl.fromTo(q('.sg-c2')[i], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, ...ni }, A + 3.75 + i * 0.35)
      })
      // 02 -> 03: the outcomes leave as light and trace the work, which opens from the centre
      tl.fromTo(h2.words, IN_TO, { ...OUT_TO, duration: 0.55, ease: 'power2.in', stagger: 0.03, ...ni }, A + 5.8)
      tl.fromTo(q('.sg-c2'), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.5, stagger: 0.08, ease: 'power2.in', ...ni }, A + 5.85)
      tl.fromTo(s, { toFrame: 0 }, { toFrame: 1, duration: 1.5, ease: 'power1.inOut', ...ni }, A + 5.9)
      tl.fromTo(s, { ptR: 1.8 }, { ptR: 1, duration: 1.2, ease: 'power2.inOut', ...ni }, A + 5.9)
      tl.fromTo(s, { dust: 1 }, { dust: 0.55, duration: 1.2, ...ni }, A + 6)
      tl.fromTo(h3.words, IN_FROM, { ...IN_TO, duration: 0.8, ease: EASE, stagger: 0.07, ...ni }, A + 6.6)
      tl.fromTo(s, { reveal: 0 }, { reveal: 1, duration: 0.9, ease: 'power3.out', ...ni }, A + 7.0)
      tl.fromTo(q('.sg-sub3'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, ...ni }, A + 7.0)
      tl.fromTo(workEls[0], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, ...ni }, A + 7.4)
      // each work in turn
      ;[1, 2].forEach((w, k) => {
        const at = A + 9 + k * 2.4
        tl.fromTo(workEls[w - 1], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.4, ease: 'power2.in', ...ni }, at - 0.05)
        tl.fromTo(s, { workIdx: w - 1 }, { workIdx: w, duration: 1.0, ease: 'power3.inOut', ...ni }, at)
        tl.fromTo(workEls[w], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, ...ni }, at + 0.6)
      })
      // 03 -> 04: the last piece of work dissolves into the 61 projects; the point leaves to draw the career line
      const inS = (el: gsap.TweenTarget, at: number) => tl.fromTo(el, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, ...ni }, at)
      const outS = (el: gsap.TweenTarget, at: number) => tl.fromTo(el, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.45, ease: 'power2.in', ...ni }, at)
      const inW = (sp: SplitText, at: number) => tl.fromTo(sp.words, IN_FROM, { ...IN_TO, duration: 0.8, ease: EASE, stagger: 0.06, ...ni }, at)
      const outW = (sp: SplitText, at: number) => tl.fromTo(sp.words, IN_TO, { ...OUT_TO, duration: 0.5, ease: 'power2.in', stagger: 0.03, ...ni }, at)
      const ms = q('.sg-m')
      const inB = (el: gsap.TweenTarget, at: number) => tl.fromTo(el, { autoAlpha: 0, scaleX: 1.3, filter: 'blur(12px)', transformOrigin: '0% 50%' }, { autoAlpha: 1, scaleX: 1, filter: 'blur(0px)', duration: 0.6, ease: EASE, ...ni }, at)
      const outB = (el: gsap.TweenTarget, at: number) => tl.fromTo(el, { autoAlpha: 1, scaleX: 1, filter: 'blur(0px)' }, { autoAlpha: 0, scaleX: 0.9, filter: 'blur(10px)', duration: 0.45, ease: 'power2.in', ...ni }, at)
      outS(workEls[2], B)
      outW(h3, B)
      outS(q('.sg-sub3'), B + 0.05)
      tl.fromTo(s, { at: 0 }, { at: 1, duration: 1.4, ease: 'power1.inOut', ...ni }, B + 0.1)
      tl.fromTo(s, { pm4: 0 }, { pm4: 1, duration: 1.2, ease: 'power2.inOut', ...ni }, B + 0.5)
      inW(h4, B + 1.0)
      tl.fromTo(s, { tl: 0 }, { tl: 1, duration: 1.4, ease: 'power2.inOut', ...ni }, B + 1.6)
      inB(ms[0], B + 1.9)
      outB(ms[0], B + 3.3)
      tl.fromTo(s, { drop: 0 }, { drop: 1, duration: 1.3, ease: 'power1.inOut', ...ni }, B + 3.4)
      inB(ms[1], B + 3.8)
      outB(ms[1], B + 5.2)
      tl.fromTo(s, { ind: 0 }, { ind: 1, duration: 1.4, ease: 'power2.inOut', ...ni }, B + 5.3)
      inB(ms[2], B + 5.7)
      inS(q('.sg-ind'), B + 6.3)
      outS(q('.sg-ind'), B + 7.5)
      outB(ms[2], B + 7.6)
      tl.fromTo(s, { role: 0 }, { role: 1, duration: 1.4, ease: 'power2.inOut', ...ni }, B + 7.7)
      inB(ms[3], B + 8.1)
      inB(q('.sg-legend'), B + 8.5)
      // 04 -> 05: the projects multiply into a team, grown ring by ring around the point
      outW(h4, B + 10)
      outB([ms[3], q('.sg-legend')], B + 10)
      tl.fromTo(s, { pm5: 0 }, { pm5: 1, duration: 1.2, ease: 'power2.inOut', ...ni }, B + 10.1)
      tl.fromTo(s, { team: 0 }, { team: 1, duration: 2.0, ease: 'power1.inOut', ...ni }, B + 10.3)
      inW(h5, B + 10.8)
      inS(q('.sg-c5'), B + 11.1)
      inB(q('.sg-num'), B + 10.9)
      inS(q('.sg-l5'), B + 11.4)
      inS(q('.sg-sub5'), B + 11.8)
      // 05 -> 06: the team grows beyond its edge into a community
      outW(h5, B + 13.6)
      outS([q('.sg-c5'), q('.sg-sub5'), q('.sg-l5')], B + 13.6)
      tl.fromTo(s, { comm: 0 }, { comm: 1, duration: 2.0, ease: 'power1.inOut', ...ni }, B + 13.8)
      inW(h6, B + 14.2)
      inS(q('.sg-c6'), B + 14.6)
      inS(q('.sg-l6'), B + 14.9)
      inS(q('.sg-sub6'), B + 15.3)
      // 06 -> 07: the network branches into three streams, each becomes something to take away
      outW(h6, B + 17.2)
      outS([q('.sg-c6'), q('.sg-sub6'), q('.sg-l6')], B + 17.2)
      outB(q('.sg-num'), B + 17.3)
      tl.fromTo(s, { share: 0 }, { share: 1, duration: 1.8, ease: 'power1.inOut', ...ni }, B + 17.4)
      inW(h7, B + 17.9)
      tl.fromTo(s, { card: 0 }, { card: 1, duration: 0.9, ease: 'power3.out', ...ni }, B + 18.7)
      inS(q('.sg-sub7'), B + 18.6)
      // 07 -> 08: everything returns to the point, which sets out on a new line
      outW(h7, B + 20.8)
      outS(q('.sg-sub7'), B + 20.8)
      tl.fromTo(s, { card: 1 }, { card: 0, duration: 0.7, ease: 'power2.in', ...ni }, B + 20.9)
      tl.fromTo(s, { back: 0 }, { back: 1, duration: 1.6, ease: 'power2.inOut', ...ni }, B + 21.0)
      inW(h8, B + 22.1)
      inS(q('.sg-sub8'), B + 22.6)
      tl.fromTo(s, { line8: 0 }, { line8: 1, duration: 2.0, ease: 'none', ...ni }, B + 22.6)
      tl.fromTo(q('.sg-cta'), { autoAlpha: 0, scale: 0.92, filter: 'blur(10px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: EASE, ...ni }, B + 23.5)
      // the line runs on past the button, and the site opens up beneath it: five doors rise and settle, one after another
      tl.fromTo(q('.sg-doors-over'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE, ...ni }, B + 23.8)
      tl.fromTo(q('.sg-door'), { autoAlpha: 0, y: 60, rotationX: -38 }, { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.9, ease: 'power3.out', stagger: 0.14, ...ni }, B + 23.9)
      void Lo
    }
    let introRef: gsap.core.Timeline | null = null

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      frameEls.forEach((f, i) => { if (f && enter[i]) { f.removeEventListener('pointermove', enter[i]); f.removeEventListener('pointerleave', leave[i]) } })
      ctx?.revert()
      light.dispose()
    }
  }, [vp.w, vp.h])

  const h = COPY.hero, o = COPY.outcomes, w = COPY.works, C = COPY
  const col = 'absolute inset-x-5 bottom-[7%] md:inset-x-auto md:left-[7.5%] md:top-[19%] md:bottom-auto md:w-[33%] pointer-events-none'
  const hStyle = { fontSize: 'var(--fs-d-l)', lineHeight: 1.05 }
  return (
    <section ref={root} className="relative" style={{ height: `${TOTAL * VH + 100}vh` }} aria-label="Amit Kumar Tiwari, design leader">
      <div className="sg-stage sticky top-0 h-screen overflow-hidden">
        <SignalBackdrop />
        <canvas key={`${vp.w}x${vp.h}`} ref={canvas} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        {['Human behaviour', 'Business', 'Technology'].map((l, i) => (
          <p key={l} ref={el => { labels.current[i] = el }} className="absolute left-0 top-0 text-label whitespace-nowrap pointer-events-none" style={{ color: (theme === 'light' ? FORCE_INK : FORCE_CSS)[i], opacity: 0 }} aria-hidden="true">{l}</p>
        ))}

        {/* the work: three frames, positioned by the scene every frame */}
        {WORKS.map((wk, i) => (
          <Link key={wk.id} to={`/craft/${wk.id}`} ref={el => { frames.current[i] = el }} tabIndex={-1} aria-hidden="true"
            className="absolute left-0 top-0 block origin-top-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ opacity: 0, pointerEvents: 'none', clipPath: 'inset(50%)', willChange: 'transform', outlineColor: 'var(--on-field-accent)' }}
            aria-label={`${wk.title}: ${wk.line}`}>
            <div ref={el => { tilts.current[i] = el }} className="relative w-full h-full rounded-2xl overflow-hidden border"
              style={{ borderColor: 'rgb(var(--signal-rgb) / 0.32)', boxShadow: 'var(--shadow-4)' }}>
              <CaseThumb id={wk.id} live flush ratio="1800 / 1000" className="w-full h-full" />
              <div ref={el => { shades.current[i] = el }} className="absolute inset-0 pointer-events-none" style={{ background: 'rgb(var(--black-rgb))', opacity: 0 }} />
            </div>
          </Link>
        ))}

        {/* 01 */}
        <div className="absolute inset-x-5 bottom-[7%] md:inset-x-auto md:left-[7.5%] md:top-[27%] md:bottom-auto md:w-[42%] pointer-events-none">
          <p className="sg-over text-overline text-on-field-accent mb-4 md:mb-6">Amit Kumar Tiwari, Design Leader</p>
          <h1 className="sg-h1 font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-signal)', lineHeight: 1.02, letterSpacing: '-0.015em' }}>{h.main}</h1>
          <p className="sg-sub1 mt-5 md:mt-8 text-body-lg text-on-field-muted max-w-xl">
            {h.sub.slice(0, 3).map((s, i) => <span key={i} className="sg-s1">{s} </span>)}<span className="sg-conv block mt-4 md:mt-6 font-serif text-title text-on-field-strong">{h.sub[3]}</span>
          </p>
        </div>
        <p className="sg-hint hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-overline text-on-field-muted pointer-events-none">Scroll</p>

        {/* 02 */}
        <h2 className="sg-h2 absolute inset-x-5 bottom-[8%] md:inset-x-auto md:left-[7.5%] md:top-[19%] md:bottom-auto md:w-[40%] font-serif font-light text-on-field-strong pointer-events-none"
          style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.05 }}>{o.main}</h2>
        {o.sub.map((s, i) => (
          <p key={i} ref={el => { caps2.current[i] = el }} className="sg-c2 absolute -translate-x-1/2 text-center font-serif text-body-sm md:text-title text-on-field pointer-events-none" style={{ lineHeight: 1.2 }}>{s}</p>
        ))}

        {/* 03 */}
        <div className="absolute inset-x-5 bottom-[6%] md:inset-x-auto md:left-[7.5%] md:top-[22%] md:bottom-auto md:w-[27%] pointer-events-none">
          <h2 className="sg-h3 font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.04 }}>{w.main}</h2>
          <p className="sg-sub3 mt-4 md:mt-6 text-body-lg text-on-field-muted">{w.sub}</p>
        </div>
        <div ref={workCaps} className="absolute">
          {WORKS.map((wk, i) => (
            <div key={wk.id} className="sg-work absolute inset-x-0 top-0 flex items-end justify-between gap-6">
              <div>
                <p className="text-overline text-on-field-muted">0{i + 1} / 03 &nbsp; {wk.title}</p>
                <p className="mt-2 font-serif text-body-lg md:text-title text-on-field-strong" style={{ lineHeight: 1.15 }}>{wk.line}</p>
              </div>
              <Link to={`/craft/${wk.id}`} className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-body-sm text-on-field-strong hover:text-on-field-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ borderColor: 'var(--field-line)', outlineColor: 'var(--on-field-accent)' }}>View case <Arrow /></Link>
            </div>
          ))}
        </div>

        {/* 04: each measure sits on the thing it measures */}
        {IND_ROWS.map((d, i) => (
          <div key={d.name} ref={el => { indLabels.current[i] = el }} className="absolute left-0 top-0 pointer-events-none" aria-hidden="true">
            <p className="sg-ind flex items-baseline gap-2 whitespace-nowrap text-label text-on-field-muted">
              <span>{d.name}</span><span className="text-on-field-strong">{d.count}</span>
            </p>
          </div>
        ))}
        <div className={col}>
          <h2 className="sg-h4 font-serif font-light text-on-field-strong" style={hStyle}>{C.atlas.main}</h2>
        </div>
        {MEASURES.map((m, i) => (
          <div key={i} ref={el => { measures.current[i] = el }} className="absolute left-0 top-0 pointer-events-none"><p className="sg-m whitespace-nowrap text-on-field-strong">
            {'big' in m
              ? <><span className="font-serif font-light" style={hStyle}>{m.big}</span> <span className="text-body-lg text-on-field-muted">{m.small}</span></>
              : <span className="font-serif font-light text-title md:text-heading">{m.line}</span>}
          </p></div>
        ))}
        <div ref={legend} className="absolute left-0 top-0 pointer-events-none"><ul className="sg-legend flex flex-wrap gap-x-5 gap-y-2" aria-label="Roles over time">
          {atlasRoles.map((r, i) => (
            <li key={r} className="flex items-center gap-2 text-label text-on-field-muted"><span className="inline-block w-2 h-2 rounded-full" style={{ background: ROLE_CSS[i] }} aria-hidden="true" />{r}</li>
          ))}
        </ul></div>

        {/* 05 and 06: the number lives inside the ring the point opens into */}
        <div ref={numBox} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"><div className="sg-num relative flex flex-col items-center text-center">
          <span ref={count} className="font-serif font-light tabular-nums text-on-field-strong" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1 }}>200+</span>
          <span className="sg-l5 hidden md:block mt-2 text-label text-on-field-muted">designers hired<br />across organisations</span>
          <span className="sg-l6 hidden md:block absolute top-full -mt-8 text-label text-on-field-muted">members in Leading<br />Design Hub India</span>
        </div></div>
        <div className={col}>
          <h2 className="sg-h5 font-serif font-light text-on-field-strong" style={hStyle}>{C.teams.main}</h2>
          <p className="sg-c5 md:hidden mt-3 text-body-lg text-on-field-muted">200+ designers hired across organisations</p>
          <p className="sg-sub5 mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.teams.sub}</p>
        </div>
        <div className={col}>
          <h2 className="sg-h6 font-serif font-light text-on-field-strong" style={hStyle}>{C.hub.main}</h2>
          <p className="sg-c6 md:hidden mt-3 text-body-lg text-on-field-muted">252+ members in Leading Design Hub India</p>
          <p className="sg-sub6 mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.hub.sub}</p>
        </div>

        {/* 07 */}
        <div className={col}>
          <h2 className="sg-h7 font-serif font-light text-on-field-strong" style={hStyle}>{C.share.main}</h2>
          <p className="sg-sub7 mt-4 md:mt-6 text-body-lg text-on-field-muted">{C.share.sub}</p>
        </div>
        {SHARE.map((c, i) => (
          <Link key={c.to} to={c.to} ref={el => { cards.current[i] = el }} tabIndex={-1}
            className="sg-panel group absolute flex flex-col justify-between rounded-2xl border p-4 md:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ opacity: 0, pointerEvents: 'none', clipPath: 'inset(50%)', background: c.field, borderColor: 'var(--field-line)', boxShadow: 'var(--shadow-4)', outlineColor: 'var(--on-field-accent)' }}>
            <span className="text-overline text-on-field-muted">{c.kind}</span>
            <span className="flex items-end justify-between gap-3">
              <span className="font-serif text-title text-on-field-strong group-hover:text-on-field-accent" style={{ lineHeight: 1.15 }}>{c.title}</span>
              <span className="text-on-field-strong group-hover:text-on-field-accent"><Arrow /></span>
            </span>
          </Link>
        ))}

        {/* 08: the point's line reaches the call to action and wraps it */}
        <div className="absolute inset-x-5 top-[11%] md:inset-x-auto md:left-[7.5%] md:top-[14%] md:w-[60%] pointer-events-none">
          <h2 className="sg-h8 font-serif font-light text-on-field-strong" style={{ fontSize: 'var(--fs-signal)', lineHeight: 1.02, letterSpacing: '-0.015em' }}>{C.next.main}</h2>
          <p className="sg-sub8 mt-5 md:mt-8 text-body-lg text-on-field-muted max-w-xl">{C.next.sub}</p>
        </div>
        <div className="sg-cta absolute left-[22%] bottom-[37%] md:left-[30%] md:bottom-auto md:top-[50%]">
          <Link ref={pill} to="/contact" className="btn btn-primary">Start a conversation</Link>
        </div>
        {/* 08, then: five lit doors into the rest of the site */}
        <NavCards className="absolute inset-x-5 bottom-[4%] md:inset-x-auto md:left-[7.5%] md:right-[7.5%] md:bottom-[7%]" />

        {/* chapters */}
        <ol ref={rail} className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3 items-end pointer-events-none" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <li key={c} data-on={i === 0 ? '' : undefined} className="sg-rail group flex items-center gap-3 text-label text-on-field-muted">
              <span className="sg-rail-name">{c}</span><span className="sg-rail-mark block h-px" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
