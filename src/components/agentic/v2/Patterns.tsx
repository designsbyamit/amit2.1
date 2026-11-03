import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import './v2.css'

export interface Frame { img: string; label: string }

const shot = (id: string) => `${import.meta.env.BASE_URL}images/case-studies/sap-agentic/${id}.webp`
const HOLD = 3200

/** The real screens of one pattern, looping in a small frame. Dots let people pick a frame; reduced motion shows the first. */
export default function PatternLoop({ frames, name }: { frames: Frame[]; name: string }) {
  const [i, setI] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10%' })
  const reduce = useReducedMotion()
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (reduce || held || !inView || frames.length < 2) return
    const t = window.setInterval(() => setI(v => (v + 1) % frames.length), HOLD)
    return () => window.clearInterval(t)
  }, [reduce, held, inView, frames.length])

  return (
    <figure ref={ref} className="m-0">
      <div className="loop-frame" role="img" aria-label={`${name}: ${frames[i].label}`}>
        {frames.map((f, k) => (
          <img key={f.img} src={shot(f.img)} alt="" width={2880} height={1798} className="loop-img" data-on={k === i} loading="lazy" decoding="async" />
        ))}
      </div>
      <figcaption className="loop-cap">
        <span className="text-label text-ink-3">{frames[i].label}</span>
        {frames.length > 1 && (
          <span className="loop-dots">
            {frames.map((f, k) => (
              <button key={f.img + k} type="button" className="loop-dot" data-on={k === i} aria-label={f.label} onClick={() => { setHeld(true); setI(k) }} />
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
