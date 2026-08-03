import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { caseStudies } from '../data/work'
import GrainOverlay from '../components/ui/GrainOverlay'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'

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

function ProjectRow({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.div
      ref={ref}
      className="border-t border-white overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ paddingLeft: '1rem', paddingRight: '1rem' }}
        whileHover={{ paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: 'rgba(245,242,237,0.018)' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          to={cs.id === 'sap-search' ? '/craft/sap-search' : `/craft/${cs.id}`}
          className="group flex items-stretch"
          style={{ minHeight: '420px' }}
          data-cursor="project"
          data-cursor-label="View case"
        >
          {/* Text */}
          <div className="flex-shrink-0 w-2/5 flex flex-col justify-center py-14 pr-10">
            <div className="flex items-baseline gap-4 mb-4">
              <span style={{ fontSize: '0.58rem', opacity: 0.18, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F5F2ED' }}>{cs.number}</span>
              <span className="text-overline text-white opacity-25">{cs.category}</span>
            </div>
            <h3
              className="text-white mb-4 group-hover:opacity-75 transition-opacity duration-500"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}
            >
              {cs.title}
            </h3>
            <p className="text-white max-w-sm" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 1rem)', fontWeight: 300, lineHeight: 1.68, opacity: 0.3 }}>
              {cs.tagline}
            </p>
          </div>

          {/* Image — 60% width, full height of the row */}
          {cs.image && (
            <div className="hidden md:block relative overflow-hidden flex-shrink-0 w-3/5 flex items-center justify-center" style={{ background: 'rgba(245,242,237,0.02)' }}>
              <motion.img
                src={cs.image}
                alt={cs.title}
                className="w-full h-full object-contain"
                style={{ padding: '2rem', filter: 'saturate(0.25) contrast(1.08)', y: imgY }}
                whileHover={{ filter: 'saturate(0.5) contrast(1.1)', scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </Link>
      </motion.div>
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
      <section className="relative bg-black">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_2.2fr] gap-14 md:gap-24 items-start">
            <FadeUp>
              <div className="flex items-center gap-5 md:pt-1">
                <p className="text-overline text-white opacity-25">About</p>
                <div className="flex-1 border-t border-white opacity-[0.06]" />
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                fontWeight: 300,
                lineHeight: 1.78,
                letterSpacing: '-0.005em',
                color: 'rgba(245,242,237,0.7)',
                maxWidth: '60ch',
              }}>
                16+ years across enterprise design have taught me that great experiences emerge where design, business, and technology intersect. Today, my work is guided by three interconnected areas of exploration:{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>Dual Fluency</strong>,{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>AI-Native Design</strong>, and{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>Agentic Experiences</strong>{' '}
                — together shaping how I think about products, people, and the future of experiences.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. Case Studies */}
      <section className="relative bg-black">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 pb-32 md:pb-48">
          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-14 mb-0">
            <FadeUp><p className="text-overline text-white opacity-25">Craft</p></FadeUp>
            <FadeUp delay={0.1}>
              <Link to="/craft" className="text-label text-white opacity-20 hover:opacity-55 transition-opacity duration-300">
                View all →
              </Link>
            </FadeUp>
          </div>
          {caseStudies.filter(cs => cs.id === 'airline-app').map((cs, i) => (
            <ProjectRow key={cs.id} cs={cs} index={i} />
          ))}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        </div>
      </section>

      {/* 5. Events / Talks / Articles */}
      <section className="relative bg-black">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 pb-32 md:pb-48">
          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-14 mb-0">
            <FadeUp><p className="text-overline text-white opacity-25">Talks & Writing</p></FadeUp>
          </div>

          {/* DesignUp Workshop */}
          <motion.div
            className="border-t border-white"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Link to="/community"
              className="group flex items-start justify-between py-12 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500"
              data-cursor="article" data-cursor-label="Community">
              <div>
                <p className="text-label text-white opacity-18 mb-4">Workshop · 2023 · Sold out</p>
                <h3 className="text-white group-hover:opacity-72 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}>
                  DesignUp — Dual Fluency Workshop
                </h3>
              </div>
              <p className="hidden md:block text-label text-white opacity-15 group-hover:opacity-45 transition-opacity shrink-0 mt-2">
                Community →
              </p>
            </Link>
          </motion.div>

          {/* Vedic Essay */}
          <motion.div
            className="border-t border-white"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <Link to="/reflections"
              className="group flex items-start justify-between py-12 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500"
              data-cursor="article" data-cursor-label="Read">
              <div>
                <p className="text-label text-white opacity-18 mb-4">Essay Series · Ancient Wisdom · 5 parts</p>
                <h3 className="text-white group-hover:opacity-72 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}>
                  How Vedic Secrets Can Disrupt<br />Your Design Game
                </h3>
              </div>
              <p className="hidden md:block text-label text-white opacity-15 group-hover:opacity-45 transition-opacity shrink-0 mt-2">
                Reflections →
              </p>
            </Link>
          </motion.div>

          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        </div>
      </section>
    </>
  )
}
