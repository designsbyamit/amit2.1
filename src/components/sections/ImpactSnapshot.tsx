import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
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
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-3%'])

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" id="impact">
      {/* Subtle background number watermark */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{ x: bgX }}
      >
        <p className="text-white" style={{
          fontSize: 'clamp(18rem, 32vw, 36rem)',
          fontWeight: 200,
          letterSpacing: '-0.07em',
          lineHeight: 1,
          opacity: 0.018,
        }}>16</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-28 md:py-40">
        {/* Section label */}
        <motion.p
          className="text-overline text-white opacity-30 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Scale & Reach
        </motion.p>

        {/* Asymmetric grid — 3 large + 4 smaller */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {metrics.map((metric, i) => {
            const { num, suffix } = parseMetric(metric.value)
            const isLarge = i < 3
            return (
              <motion.div
                key={metric.label}
                className={`relative border-t border-white border-opacity-[0.08] py-10 pr-8 ${i % 2 === 0 ? 'md:pr-12' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className={`text-white mb-3 font-light leading-none tracking-tight ${isLarge ? 'text-giant' : 'text-display-l'}`}
                  style={{ opacity: isLarge ? 0.9 : 0.75 }}
                  whileInView={{ opacity: isLarge ? 0.9 : 0.75 }}
                >
                  <CountUp target={num} suffix={suffix} />
                </motion.div>
                <p className="text-label text-white opacity-30 max-w-[160px]" style={{ lineHeight: 1.4 }}>
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
