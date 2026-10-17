import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import Latest from '../components/sections/Latest'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Latest: one work, one leadership story, one talk */}
      <Latest />

      {/* 3. Scale — grid blocks */}
      <ImpactSnapshot />

      {/* 3. Point of view — single paragraph */}
      <section className="relative">
        
        <div className="relative z-10 container-site py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_2.2fr] gap-14 md:gap-24 items-start">
            <FadeUp>
              <div className="flex items-center gap-5 md:pt-1">
                <p className="text-overline text-ink-3">Point of view</p>
                <div className="flex-1 border-t border-white opacity-[0.06]" />
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                fontWeight: 300,
                lineHeight: 1.78,
                letterSpacing: '-0.005em',
                color: 'var(--color-ink-2)',
                maxWidth: '60ch',
              }}>
                The paradox of the current shift, that’s shaking up the industry today, is that the more capable our systems become, the more important human judgement becomes. Not because humans will always outperform machines, but because capability alone cannot determine purpose, establish values, or decide which trade-offs society should accept.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    </>
  )
}
