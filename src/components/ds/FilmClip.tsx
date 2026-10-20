import { useEffect, useRef, useState } from 'react'
import { Solution, FILM } from '../../film/scenesAgentic'

/** The "solution" flow from the 2-minute film (about 1:03 to 1:11), played live as a thumbnail, framed a little tighter than the film. */
const [S] = FILM.solution
const LEN = 8.7 // seconds of the diagram before the film moves on to the screens
const ZOOM = 1.14

export default function FilmClip() {
  const box = useRef<HTMLDivElement>(null)
  const [t, setT] = useState(S + 6.6)
  const [dim, setDim] = useState({ w: 1920, h: 1080 })

  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(() => setDim({ w: el.clientWidth || 1920, h: el.clientHeight || 1080 }))
    ro.observe(el); setDim({ w: el.clientWidth || 1920, h: el.clientHeight || 1080 })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => ro.disconnect()
    let raf = 0, visible = false, t0 = 0
    const frame = (now: number) => {
      if (!t0) t0 = now
      setT(S + (((now - t0) / 1000) % (LEN + 0.8)))
      raf = requestAnimationFrame(frame)
    }
    const sync = () => {
      cancelAnimationFrame(raf); raf = 0
      if (visible && !document.hidden) { t0 = 0; raf = requestAnimationFrame(frame) }
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() }, { threshold: 0.2 })
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  const k = Math.max(dim.w / 1920, dim.h / 1080) * ZOOM
  const p = Math.min(1, (t - S) / LEN)
  const cx = 860 + p * 190, cy = 500                       // a slow drift left to right, following the flow
  const fade = t - S > LEN - 0.2 ? Math.max(0, 1 - (t - S - (LEN - 0.2)) / 0.5) : Math.min(1, (t - S) / 0.3 + 0.35)
  return (
    <div ref={box} className="absolute inset-0 overflow-hidden" style={{ background: 'radial-gradient(130% 100% at 18% 0%, #1D2656 0%, #0C1129 58%, #080B1A 100%)' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${dim.w / 2 - cx * k}px, ${dim.h / 2 - cy * k}px) scale(${k})`, opacity: fade, color: '#ECEDEF', fontFamily: "'Geist Variable','Geist',system-ui,sans-serif" }}>
        <Solution t={t} />
      </div>
    </div>
  )
}
