import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { metrics } from '../../data/impact'
import GrainOverlay from '../ui/GrainOverlay'

function CountUp({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!inView) return
    const duration = 1200
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
    <section className="relative bg-black py-24 md:py-32 overflow-hidden" id="impact">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          className="text-overline text-white opacity-40 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          At Scale
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white bg-opacity-10">
          {metrics.map((metric, i) => {
            const { num, suffix } = parseMetric(metric.value)
            return (
              <motion.div
                key={metric.label}
                className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(245,242,237,0.03)', transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-display-l text-white mb-3">
                  <CountUp target={num} suffix={suffix} />
                </div>
                <p className="text-label text-white opacity-40">{metric.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
