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
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div
      ref={ref}
      className="group border-t border-white"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={cs.id === 'sap-search' ? '/craft/sap-search' : `/craft/${cs.id}`}
        className="flex items-stretch py-10 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-500"
        data-cursor="project"
        data-cursor-label="View case"
      >
        <div className="flex-1 pr-6 md:pr-16 flex flex-col justify-center">
          <div className="flex items-baseline gap-4 mb-4">
            <span style={{ fontSize: '0.58rem', opacity: 0.18, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F5F2ED' }}>{cs.number}</span>
            <span className="text-overline text-white opacity-25">{cs.category}</span>
          </div>
          <h3
            className="text-white mb-4 group-hover:opacity-72 transition-opacity duration-500"
            style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.032em', lineHeight: 1.18 }}
          >
            {cs.title}
          </h3>
          <p className="text-white mb-6 max-w-xl" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 1rem)', fontWeight: 300, lineHeight: 1.68, opacity: 0.3 }}>
            {cs.tagline}
          </p>
          {cs.stats && (
            <div className="flex flex-wrap gap-8">
              {cs.stats.map(s => (
                <div key={s.label}>
                  <p className="text-white" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)', fontWeight: 200, letterSpacing: '-0.03em', opacity: 0.82, lineHeight: 1 }}>{s.value}</p>
                  <p className="text-label text-white opacity-20 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {cs.image && (
          <div className="hidden md:block relative overflow-hidden flex-shrink-0" style={{ width: '36%' }}>
            <motion.img
              src={cs.image}
              alt={cs.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imgY, filter: 'saturate(0.2) contrast(1.08)', scale: 1.1 }}
              whileHover={{ filter: 'saturate(0.5) contrast(1.1)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to left, transparent 55%, rgba(12,12,11,0.35) 100%)' }}
            />
          </div>
        )}
      </Link>
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
                For 16 years I've operated at the intersection of design, business strategy, and emerging technology. My practice is built on three interlocking ideas:{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>Dual Fluency</strong>{' '}
                — the capacity to operate equally in the language of design and the language of business;{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>AI-Native Design</strong>{' '}
                — rethinking what interaction means when software can reason and act; and{' '}
                <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.9)' }}>Agentic Process</strong>{' '}
                — designing the human-AI relationship in autonomous systems where oversight is the product.
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
          {caseStudies.slice(0, 4).map((cs, i) => (
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
