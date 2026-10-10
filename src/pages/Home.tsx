import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudies } from '../data/work'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import CaseRow from '../components/ds/CaseRow'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'

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

      {/* 2. Scale — grid blocks */}
      <ImpactSnapshot />

      {/* 3. About — single paragraph */}
      <section className="relative">
        
        <div className="relative z-10 container-site py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_2.2fr] gap-14 md:gap-24 items-start">
            <FadeUp>
              <div className="flex items-center gap-5 md:pt-1">
                <p className="text-overline text-ink-3">About</p>
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
                16+ years across enterprise design have taught me that great experiences emerge where design, business, and technology intersect. Today, my work is guided by three interconnected areas of exploration:{' '}
                <strong style={{ fontWeight: 400, color: 'rgb(var(--ink-rgb) / 0.9)' }}>Dual Fluency</strong>,{' '}
                <strong style={{ fontWeight: 400, color: 'rgb(var(--ink-rgb) / 0.9)' }}>AI-Native Design</strong>, and{' '}
                <strong style={{ fontWeight: 400, color: 'rgb(var(--ink-rgb) / 0.9)' }}>Agentic Experiences</strong>{' '}
                — together shaping how I think about products, people, and the future of experiences.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. Case Studies */}
      <section className="relative">
        <div className="container-site pb-24 md:pb-36">
          <SectionHeader label="Craft" title="Selected work" action={<Button to="/craft" variant="secondary" arrow>All work</Button>} />
          <ul>
            {caseStudies.slice(0, 3).map((cs, i) => <CaseRow key={cs.id} cs={cs} index={i} />)}
          </ul>
          <div className="hairline-top" />
        </div>
      </section>

      {/* 5. Events / Talks / Articles */}
      <section className="relative">
        
        <div className="relative z-10 container-site pb-32 md:pb-48">
          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-14 mb-0">
            <FadeUp><p className="text-overline text-ink-3">Talks & Writing</p></FadeUp>
          </div>

          {/* DesignUp Workshop */}
          <motion.div
            className="border-t border-white"
            style={{ borderColor: 'rgb(var(--ink-rgb) / 0.07)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Link to="/community"
              className="group flex items-start justify-between py-12 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-surface-1 transition-colors duration-500"
              data-cursor="article" data-cursor-label="Community">
              <div>
                <p className="text-label text-ink-3 mb-4">Workshop · DesignUp</p>
                <h3 className="text-white group-hover:opacity-72 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}>
                  DesignUp — Dual Fluency Workshop
                </h3>
              </div>
              <p className="hidden md:block text-label text-ink-3 group-hover:text-ink-2 transition-colors shrink-0 mt-2">
                Community →
              </p>
            </Link>
          </motion.div>

          {/* Vedic Essay */}
          <motion.div
            className="border-t border-white"
            style={{ borderColor: 'rgb(var(--ink-rgb) / 0.07)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <Link to="/reflections"
              className="group flex items-start justify-between py-12 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-surface-1 transition-colors duration-500"
              data-cursor="article" data-cursor-label="Read">
              <div>
                <p className="text-label text-ink-3 mb-4">Essay Series · Ancient Wisdom · 5 parts</p>
                <h3 className="text-white group-hover:opacity-72 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}>
                  How Vedic Secrets Can Disrupt<br />Your Design Game
                </h3>
              </div>
              <p className="hidden md:block text-label text-ink-3 group-hover:text-ink-2 transition-colors shrink-0 mt-2">
                Reflections →
              </p>
            </Link>
          </motion.div>

          <div className="border-t border-white" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.07)' }} />
        </div>
      </section>
    </>
  )
}
