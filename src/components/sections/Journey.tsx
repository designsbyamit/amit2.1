import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'
import { phases } from '../../data/journey'

/** One stop on the journey. */
function Stop({ i, active }: { i: number; active: boolean }) {
  const p = phases[i]
  const last = i === phases.length - 1
  return (
    <li className="relative w-[78vw] sm:w-[340px] lg:w-[380px] shrink-0 snap-start pr-6 lg:pr-10">
      {/* node on the line */}
      <div className="relative h-10 flex items-center" aria-hidden="true">
        <span className={`block w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${active ? 'bg-signal border-signal' : 'bg-bg border-[var(--line-control)]'}`} />
        {last && <span className="ml-3 text-label text-signal-ink">Now</span>}
      </div>
      <p className="text-label text-ink-3 mt-5">{p.years}</p>
      <h3 className="text-heading text-ink mt-3">{p.title}</h3>
      <p className="text-body-sm text-ink-2 mt-2">{p.company}</p>
      <p className="text-body-sm text-ink-3 mt-4 max-w-[34ch]">{p.narrative}</p>
    </li>
  )
}

/** Horizontal journey. On large screens it is scroll-driven: the section pins and the
 *  track moves sideways as you scroll down. On phones, and with reduced motion, it is a
 *  swipeable row. */
export default function Journey() {
  const reduced = useReducedMotion()
  const [wide, setWide] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setWide(mq.matches)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const pinned = wide && !reduced

  useEffect(() => {
    if (!pinned || !trackRef.current) return
    const measure = () => {
      const el = trackRef.current!
      setDistance(Math.max(0, el.scrollWidth - el.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const fill = useTransform(scrollYProgress, [0.05, 0.95], ['8%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', v => {
    if (!pinned) return
    setActive(Math.min(phases.length - 1, Math.floor(Math.max(0, v - 0.05) / 0.9 * phases.length)))
  })

  // Non-pinned: mark stops as active when scrolled into view in the row
  const onRowScroll = (e: React.UIEvent<HTMLOListElement>) => {
    if (pinned) return
    const el = e.currentTarget
    const ratio = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)
    setActive(Math.round(ratio * (phases.length - 1)))
  }

  const header = (
    <div className="container-site flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
      <div>
        <p className="text-overline text-ink-3">Design leadership practice</p>
        <h2 className="text-display-l text-ink mt-4 max-w-3xl">Sixteen years of craft, leadership and reinvention.</h2>
      </div>
      <p className="text-label text-ink-3 md:pb-2">{pinned ? 'Scroll to travel' : 'Swipe to travel'} · {phases.length} stops</p>
    </div>
  )

  if (!pinned) {
    return (
      <section ref={sectionRef} className="section-y hairline-top overflow-hidden" id="journey" aria-label="Design leadership practice">
        {header}
        <div className="container-site">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-[var(--line-2)]" aria-hidden="true" />
            <ol className="relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4" onScroll={onRowScroll} tabIndex={0} aria-label="Career stops, scroll sideways">
              {phases.map((_, i) => <Stop key={i} i={i} active={i <= active} />)}
            </ol>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative hairline-top" id="journey" style={{ height: `${100 + phases.length * 45}vh` }} aria-label="Design leadership practice">
      <div className="sticky overflow-hidden flex flex-col justify-center" style={{ top: 'var(--header-h)', height: 'calc(100vh - var(--header-h))' }}>
        {header}
        <div className="container-site">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-[var(--line-2)]" aria-hidden="true" />
            <motion.div className="absolute left-0 top-5 h-px bg-signal" style={{ width: fill }} aria-hidden="true" />
            <motion.ol ref={trackRef} className="relative flex" style={{ x }}>
              {phases.map((_, i) => <Stop key={i} i={i} active={i <= active} />)}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  )
}
