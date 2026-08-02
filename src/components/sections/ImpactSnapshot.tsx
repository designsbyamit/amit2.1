import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { metrics } from '../../data/impact'

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
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section ref={ref} className="relative bg-black overflow-hidden" id="impact">
      {/* Enormous background number */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ y: bgShift }}
        aria-hidden
      >
        <p style={{
          fontSize: 'clamp(24rem, 50vw, 60rem)',
          fontWeight: 200,
          letterSpacing: '-0.08em',
          lineHeight: 0.8,
          color: 'rgba(245,242,237,0.022)',
          userSelect: 'none',
        }}>16</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 py-32 md:py-52">
        <motion.p
          className="text-overline text-white opacity-25 mb-24 md:mb-32"
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.25 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Scale & Reach
        </motion.p>

        {/* Metrics — full bleed, no grid lines, just typography */}
        <div className="space-y-0">
          {metrics.map((metric, i) => {
            const { num, suffix } = parseMetric(metric.value)
            const isHero = i < 2

            return (
              <motion.div
                key={metric.label}
                className="flex items-baseline justify-between border-t border-white py-8 md:py-12 group"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Label */}
                <p
                  className="text-white group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                    fontWeight: 300,
                    opacity: 0.35,
                    letterSpacing: '0.02em',
                    maxWidth: '40ch',
                  }}
                >
                  {metric.label}
                </p>

                {/* Number */}
                <p
                  className="text-white text-right flex-shrink-0 ml-8 group-hover:opacity-90 transition-opacity duration-300"
                  style={{
                    fontSize: isHero
                      ? 'clamp(3.5rem, 7vw, 7rem)'
                      : 'clamp(2.5rem, 5vw, 5rem)',
                    fontWeight: 200,
                    letterSpacing: '-0.045em',
                    lineHeight: 1,
                    opacity: isHero ? 0.92 : 0.65,
                  }}
                >
                  <CountUp target={num} suffix={suffix} />
                </p>
              </motion.div>
            )
          })}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  )
}
