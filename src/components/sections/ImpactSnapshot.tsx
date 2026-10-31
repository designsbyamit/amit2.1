import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { metrics } from '../../data/impact'
import Button from '../ds/Button'

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

/** Scale & Reach: square tiles on a hairline grid. Seven figures: four across, then three, the last tile twice as wide. */
export default function ImpactSnapshot() {
  const last = metrics.length - 1
  return (
    <section className="section-y hairline-top" id="impact" aria-labelledby="impact-h">
      <div className="container-site">
        <h2 id="impact-h" className="text-display-l text-ink mb-10 md:mb-14">Scale &amp; Reach</h2>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-3 border" style={{ background: 'var(--line-1)', borderColor: 'var(--line-1)' }}>
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`group min-h-[11rem] md:min-h-0 md:aspect-[5/4] transition-colors hover:bg-surface-1 ${i === last ? 'col-span-2 md:col-span-2 md:aspect-auto' : ''}`}
              style={{ background: 'var(--bg)' }}
            >
              <motion.div
                className="h-full flex flex-col justify-between gap-6 p-6 md:p-8"
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <dd className="font-serif text-ink" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
                  <Value value={m.value} count={m.count} />
                </dd>
                <dt className="text-body-sm text-ink-2 max-w-[22ch]">{m.label}</dt>
              </motion.div>
            </div>
          ))}
        </dl>
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-3 border p-6 md:p-8" style={{ borderColor: 'var(--line-1)', background: 'rgb(var(--surface-1-rgb))' }}>
          <div className="max-w-2xl">
            <p className="text-overline text-ink-3 mb-3">Career atlas</p>
            <p className="font-serif text-ink" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)', lineHeight: 1.2 }}>The numbers are the headline. The story is in the projects behind them.</p>
            <p className="text-body-sm text-ink-2 mt-3">An interactive atlas of 60 recorded projects: how my roles, industries, team scale and capabilities changed from 2011 to 2024, with every finding tagged as fact, calculation, inference or hypothesis.</p>
          </div>
          <Button href="/career-atlas/" variant="primary" arrow className="shrink-0 self-start md:self-center">Explore the career atlas</Button>
        </div>
      </div>
    </section>
  )
}
