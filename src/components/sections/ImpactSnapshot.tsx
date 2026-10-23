import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { metrics } from '../../data/impact'

function CountUp({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

function Value({ value, count }: { value: string; count?: boolean }) {
  const m = value.match(/^(\d+)(.*)$/)
  return count && m ? <CountUp target={parseInt(m[1])} suffix={m[2]} /> : <>{value}</>
}

/** Scale & Reach: big numbers on a quiet grid. Two rows of four. */
export default function ImpactSnapshot() {
  return (
    <section className="section-y hairline-top" id="impact" aria-labelledby="impact-h">
      <div className="container-site">
        <h2 id="impact-h" className="text-display-l text-ink mb-12 md:mb-16">Scale &amp; Reach</h2>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}>
              <dd className="font-serif text-ink" style={{ fontSize: /^[A-Za-z]/.test(m.value) ? 'clamp(1.9rem, 3.8vw, 3.6rem)' : 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
                <Value value={m.value} count={m.count} />
              </dd>
              <dt className="text-body-sm text-ink-3 mt-4 max-w-[22ch]">{m.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
