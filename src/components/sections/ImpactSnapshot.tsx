import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { metrics } from '../../data/impact'
import GrainOverlay from '../ui/GrainOverlay'

function CountUp({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

function parseMetric(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseInt(match[1]), suffix: match[2] }
}

export default function ImpactSnapshot() {
  return (
    <section className="relative bg-black overflow-hidden" id="impact">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 py-20 md:py-28">
        <motion.p
          className="text-overline text-white opacity-30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Scale & Reach
        </motion.p>

        {/* Grid — equal square blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white" style={{ backgroundColor: 'rgba(245,242,237,0.07)' }}>
          {metrics.map((metric, i) => {
            const { num, suffix } = parseMetric(metric.value)
            return (
              <motion.div
                key={metric.label}
                className="bg-black flex flex-col justify-between p-7 md:p-9 aspect-square"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(245,242,237,0.028)', transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className="text-white"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                    fontWeight: 200,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    opacity: 0.88,
                  }}
                >
                  <CountUp target={num} suffix={suffix} />
                </p>
                <p
                  className="text-white"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                    opacity: 0.32,
                  }}
                >
                  {metric.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
