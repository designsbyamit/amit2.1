import { useEffect, useMemo, useRef } from 'react'
import * as scenes from './scenes'
import * as more from './scenes2'
import { resolve, timelines, type Beat } from './timelines'

const draw = (b: Beat): string => {
  const s = (b.s ?? {}) as Record<string, unknown>
  switch (b.k) {
    case 'fly': return scenes.agenticFly()
    case 'split': return scenes.agenticSplit()
    case 'search': return scenes.search(s)
    case 'engaze': return more.engaze(s)
    case 'agRead': return more.agRead(s)
    case 'agTable': return more.agTable(s)
    case 'dnm': return more.dnm(s)
    case 'travel': return scenes.travel(s)
    case 'data': return scenes.data(s)
    case 'options': return scenes.options(s)
    default: return scenes.agentic(s)
  }
}
const EASE = 'cubic-bezier(.45,0,.2,1)'
const W = 1280, H = 800

/** A live, looping animation of one prototype: a scripted UI drawn at 1280 x 800, a camera that pans, zooms and turns in 3D
 *  to follow where the eye goes, and a cursor. Plays only while on screen; shows a still frame for reduced motion. */
export default function Player({ id }: { id: string }) {
  const tl = timelines[id]
  const sp = tl.speed ?? 1
  const beats = useMemo(() => resolve(tl.beats).map(b => ({ ...b, at: b.at * sp, ms: b.ms != null ? b.ms * sp : undefined })), [tl, sp])
  const root = useRef<HTMLDivElement>(null)
  const cam = useRef<HTMLDivElement>(null)
  const plane = useRef<HTMLDivElement>(null)
  const layers = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const cursor = useRef<HTMLDivElement>(null)
  const ripple = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current, camEl = cam.current, planeEl = plane.current, cursorEl = cursor.current, rip = ripple.current
    if (!el || !camEl || !planeEl || !cursorEl || !rip) return
    let size = { w: el.clientWidth || W, h: el.clientHeight || H }
    let timers: number[] = []
    let top = 0
    let lastHtml = ''
    let last: Beat | null = null

    const place = (b: Beat, ms: number) => {
      const [cx0, cy0, z] = b.cam!
      const k = Math.max(size.w / W, size.h / H)
      const vw = size.w / (k * z), vh = size.h / (k * z)
      const cx = Math.min(Math.max(cx0, vw / 2), W - vw / 2), cy = Math.min(Math.max(cy0, vh / 2), H - vh / 2)
      camEl.style.transition = ms ? `transform ${ms}ms ${EASE}` : 'none'
      camEl.style.transform = `translate(${size.w / 2 - cx * z * k}px, ${size.h / 2 - cy * z * k}px) scale(${z * k})`
      const [rx, ry] = b.tilt ?? [0, 0]
      const k2 = 1 + 0.012 * Math.max(Math.abs(rx), Math.abs(ry))
      planeEl.style.transition = ms ? `transform ${ms}ms ${EASE}` : 'none'
      planeEl.style.transform = `perspective(1800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${k2})`
    }
    const show = (b: Beat, first: boolean) => {
      const html = draw(b)
      if (html !== lastHtml) {
        const next = layers[1 - top].current!, prev = layers[top].current!
        next.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="wf">${html}</svg>`
        const f = first || b.snap ? 'none' : 'opacity 140ms linear'
        next.style.transition = f
        prev.style.transition = f
        next.style.opacity = '1'; prev.style.opacity = '0'
        top = 1 - top; lastHtml = html
      }
      place(b, first ? 0 : b.ms ?? 700)
      const c = b.cur
      if (c) {
        cursorEl.style.transition = !last?.cur || first ? 'opacity .25s' : `transform ${Math.min(b.ms ?? 700, 800)}ms ${EASE}, opacity .25s`
        cursorEl.style.transform = `translate(${c[0]}px, ${c[1]}px)`
        cursorEl.style.opacity = '1'
      } else cursorEl.style.opacity = '0'
      if (b.click && c) {
        rip.style.transform = `translate(${c[0]}px, ${c[1]}px)`
        rip.classList.remove('go'); void rip.offsetWidth; rip.classList.add('go')
      }
      last = b
    }
    const loop = () => {
      timers.forEach(clearTimeout)
      timers = beats.map((b, i) => window.setTimeout(() => show(b, i === 0), b.at))
      timers.push(window.setTimeout(loop, tl.duration * sp))
    }
    const stop = () => { timers.forEach(clearTimeout); timers = [] }

    const ro = new ResizeObserver(() => { size = { w: el.clientWidth || W, h: el.clientHeight || H }; if (last) place(last, 0) })
    ro.observe(el)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show(beats[beats.length - 2], true)
      return () => ro.disconnect()
    }
    let visible = false
    const sync = () => { if (visible && !document.hidden) { if (!timers.length) loop() } else stop() }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() }, { threshold: 0.2 })
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    show(beats[0], true)
    return () => { stop(); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [beats, tl])

  return (
    <div ref={root} className="anim-stage absolute inset-0 overflow-hidden" style={{ background: tl.stage }}>
      <div ref={cam} className="anim-cam" style={{ width: W, height: H }}>
        <div ref={plane} className="anim-plane" style={{ width: W, height: H }}>
          {tl.drift && <div className="anim-drift" aria-hidden>{tl.drift.map((c, i) => <i key={i} style={{ background: `radial-gradient(circle, ${c}, transparent 68%)` }} />)}</div>}
          <div ref={layers[0]} className="anim-layer" style={{ opacity: 1 }} />
          <div ref={layers[1]} className="anim-layer" style={{ opacity: 0 }} />
          <div ref={ripple} className="anim-ripple" />
          <div ref={cursor} className="anim-cursor" style={{ opacity: 0 }}>
            <span className="anim-dot" />
          </div>
        </div>
      </div>
    </div>
  )
}
