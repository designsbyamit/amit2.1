import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import heroImg from '../../assets/images/amit-stage.webp'
import heroImgSm from '../../assets/images/amit-stage-1200.webp'
import Button from '../ds/Button'
import { Status } from '../ds/Tag'

const ease = [0.16, 1, 0.3, 1] as const

function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span className="block" initial={{ y: reduced ? 0 : '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  )
}

const proof = [
  { value: '300M+', label: 'Users reached' },
  { value: '$5M', label: 'Documented savings' },
  { value: '90%', label: 'CSAT where average is 60%' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: 'min(100dvh, 980px)', paddingTop: 'var(--header-h)' }}>
      {/* Portrait: right side on desktop, top band on mobile */}
      <motion.div className="absolute right-0 top-0 h-[46vh] w-full md:h-full md:w-[46%]" style={{ y: photoY }} aria-hidden="true">
        <div className="hero-portrait is-amit">
          <img src={heroImg} srcSet={`${heroImgSm} 1200w, ${heroImg} 2400w`} sizes="(min-width: 768px) 46vw, 100vw" fetchPriority="high" decoding="async" alt="" />
        </div>
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgb(var(--bg-rgb) / 0) 42%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, var(--bg) 0%, rgb(var(--bg-rgb) / 0) 35%)' }} />
      </motion.div>

      <div className="relative container-site grid-site pt-[38vh] md:pt-24 lg:pt-28 pb-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col gap-7 md:gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
            <Status>Now · Designing agentic enterprise experiences at SAP</Status>
          </motion.div>
          <h1 className="text-display-xl text-ink">
            <Line delay={0.15}>Most designers build features.</Line>
            <Line delay={0.3}>A few build <span className="accent-signal">futures.</span></Line>
          </h1>
          <motion.p className="text-body-lg text-ink-2 max-w-[34rem]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease }}>
            Sixteen years designing enterprise products, leading design teams and coaching the designers who come next.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }}>
            <Button to="/craft" arrow>See the work</Button>
            <Button to="/contact" variant="secondary">Get in touch</Button>
          </motion.div>
        </div>
      </div>

      <motion.div className="relative container-site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
        <dl className="grid-site hairline-top py-6 md:py-8 gap-y-6">
          {proof.map(p => (
            <div key={p.value} className="col-span-4 md:col-span-3 flex flex-col gap-1.5">
              <dt className="sr-only">{p.label}</dt>
              <dd className="text-[2rem] md:text-[2.25rem] font-extralight tracking-[-0.03em] leading-none text-ink">{p.value}</dd>
              <dd className="text-label text-ink-3">{p.label}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
