import { useEffect, useRef, useState } from 'react'
import { thumbs, type ThumbLayer } from '../../data/thumbs'

/** One consistent thumbnail recipe for every case study:
 *  a light tonal field, no frame, a hero crop of the real interface and a smaller detail layer.
 *  Crops are done with CSS so the source files stay crisp and untouched. */
function Layer({ l, className, style }: { l: ThumbLayer; className: string; style?: React.CSSProperties }) {
  const [x, y, w, h] = l.crop
  return (
    <div
      className={`absolute overflow-hidden ${className}`}
      style={{
        aspectRatio: `${w * l.size[0]} / ${h * l.size[1]}`,
        backgroundColor: l.bg ?? '#fff',
        backgroundImage: `url(${l.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${100 / w}% auto`,
        backgroundPosition: `${w >= 1 ? 0 : (x / (1 - w)) * 100}% ${h >= 1 ? 0 : (y / (1 - h)) * 100}%`,
        ...style,
      }}
    />
  )
}

/** A muted, looping clip of the prototype. Plays only while on screen, and stays a still frame for reduced motion. */
function LoopClip({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still, setStill] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setStill(rm)
    if (rm) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  const base = `${import.meta.env.BASE_URL}loops/${name}`
  if (still) return <img src={`${base}.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
  return (
    <video ref={ref} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline preload="metadata" poster={`${base}.jpg`} aria-hidden="true">
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  )
}

export default function CaseThumb({ id, className = '', ratio = '16 / 10', compact = false, flush = false }: { id: string; className?: string; ratio?: string; compact?: boolean; /** No corner radius of its own: the parent card clips it. */ flush?: boolean }) {
  const t = thumbs[id]
  if (!t) return null
  if (t.loop) {
    return (
      <div className={`thumb relative overflow-hidden bg-black/5 ${className}`} style={{ aspectRatio: ratio, borderRadius: flush ? 0 : compact ? 10 : 20 }} aria-hidden="true">
        <LoopClip name={t.loop} />
      </div>
    )
  }
  if (t.image) {
    return (
      <div className={`thumb relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, borderRadius: flush ? 0 : compact ? 10 : 20 }} aria-hidden="true">
        <img src={t.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    )
  }
  return (
    <div className={`thumb group/thumb relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, borderRadius: flush ? 0 : compact ? 10 : 20, background: `radial-gradient(120% 90% at 18% 8%, ${t.from}, ${t.to})` }} aria-hidden="true">
      <Layer l={t.hero} className="thumb-hero" style={{ left: '6%', top: '11%', width: '76%', borderRadius: compact ? 6 : 12, boxShadow: '0 30px 60px -18px rgb(20 28 48 / 0.32), 0 6px 16px -6px rgb(20 28 48 / 0.18)' }} />
      <Layer l={t.detail} className="thumb-detail" style={{ right: '5%', bottom: '-3%', width: '30%', borderRadius: compact ? 6 : 12, boxShadow: '0 26px 50px -14px rgb(20 28 48 / 0.4), 0 6px 14px -6px rgb(20 28 48 / 0.2)' }} />
    </div>
  )
}
