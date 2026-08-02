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
      initial={{ opacity: 0, y: 36 }}
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={cs.id === 'sap-search' ? '/craft/sap-search' : `/craft/${cs.id}`}
        className="flex items-stretch py-10 md:py-14 -mx-6 md:-mx-0 px-6 md:px-0 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-500"
        data-cursor="project"
        data-cursor-label="View case"
      >
        <div className="flex-1 pr-6 md:pr-16 flex flex-col justify-center">
          <div className="flex items-baseline gap-4 mb-4">
            <span style={{ fontSize: '0.6rem', opacity: 0.2, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5F2ED' }}>{cs.number}</span>
            <span className="text-overline text-white opacity-25">{cs.category}</span>
          </div>
          <h3
            className="text-white mb-4 group-hover:opacity-75 transition-opacity duration-500"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', fontWeight: 200, letterSpacing: '-0.035em', lineHeight: 1.15 }}
          >
            {cs.title}
          </h3>
          <p className="text-white mb-6 max-w-xl" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 300, lineHeight: 1.65, opacity: 0.32 }}>
            {cs.tagline}
          </p>
          {cs.stats && (
            <div className="flex flex-wrap gap-8">
              {cs.stats.map(s => (
                <div key={s.label}>
                  <p className="text-white" style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)', fontWeight: 200, letterSpacing: '-0.035em', opacity: 0.85, lineHeight: 1 }}>{s.value}</p>
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
              style={{ y: imgY, filter: 'grayscale(0.4) contrast(1.06)', scale: 1.1 }}
              whileHover={{ filter: 'grayscale(0.1) contrast(1.1)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to left, transparent 60%, rgba(12,12,11,0.4) 100%)' }} />
          </div>
        )}
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const bgLetterY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Hero />
      <ImpactSnapshot />

      {/* ── ABOUT — full editorial composition ── */}
      <section ref={aboutRef} className="relative bg-black overflow-hidden">
        <GrainOverlay opacity={0.035} />

        {/* Enormous background letterform */}
        <motion.div
          className="absolute -left-12 top-0 select-none pointer-events-none"
          style={{ y: bgLetterY }}
          aria-hidden
        >
          <p style={{
            fontSize: 'clamp(30rem, 55vw, 70rem)',
            fontWeight: 200,
            letterSpacing: '-0.1em',
            lineHeight: 0.8,
            color: 'rgba(245,242,237,0.018)',
          }}>D</p>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 py-32 md:py-52">
          {/* Label + rule */}
          <FadeUp className="mb-20 md:mb-28">
            <div className="flex items-center gap-6">
              <p className="text-overline text-white opacity-25">About</p>
              <div className="flex-1 border-t border-white opacity-[0.06]" />
            </div>
          </FadeUp>

          {/* Split: huge pull concept left, paragraphs right */}
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-28 items-start">
            {/* Left — oversized concept words */}
            <div className="md:sticky md:top-32">
              <FadeUp delay={0.05}>
                <p style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'rgba(245,242,237,0.85)',
                }}>
                  Dual<br />
                  Fluency
                </p>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="mt-3" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'rgba(245,242,237,0.35)',
                }}>
                  AI-Native
                </p>
              </FadeUp>
              <FadeUp delay={0.19}>
                <p className="mt-3" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'rgba(245,242,237,0.18)',
                }}>
                  Agentic
                </p>
              </FadeUp>
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-8 md:pt-2">
              <FadeUp delay={0.08}>
                <p style={{
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.78,
                  letterSpacing: '-0.005em',
                  color: 'rgba(245,242,237,0.72)',
                  maxWidth: '58ch',
                }}>
                  For 16 years I've operated at the intersection of design, business strategy, and emerging technology. My practice is built on three interlocking ideas: <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.92)' }}>Dual Fluency</strong> — the capacity to operate equally in the language of design and the language of business; <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.92)' }}>AI-Native Design</strong> — rethinking what interaction means when software can reason and act; and <strong style={{ fontWeight: 400, color: 'rgba(245,242,237,0.92)' }}>Agentic Process</strong> — designing the human-AI relationship in autonomous systems where oversight is the product.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  letterSpacing: '-0.005em',
                  color: 'rgba(245,242,237,0.38)',
                  maxWidth: '55ch',
                }}>
                  These aren't three separate interests. They are one position — that the next generation of enterprise design leaders must be fluent in what AI can do, clear on what it shouldn't do without human oversight, and able to translate all of it into business value. That workshop at DesignUp sold out. That thinking is in production at SAP.
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'rgba(245,242,237,0.32)',
                  maxWidth: '55ch',
                }}>
                  In 2022 I founded SAP Design Hub India — now 250+ designers strong — because the best design culture is one you build, not one you inherit.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED SIGNALS — editorial list ── */}
      <section className="relative bg-black">
        <GrainOverlay opacity={0.025} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 pt-0 pb-24 md:pb-40">

          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-16 mb-0">
            <FadeUp><p className="text-overline text-white opacity-25">Selected signals</p></FadeUp>
            <FadeUp delay={0.1}>
              <Link to="/craft" className="text-label text-white opacity-20 hover:opacity-55 transition-opacity">
                All work →
              </Link>
            </FadeUp>
          </div>

          {/* SAP Search — oversized featured moment */}
          <motion.div
            className="border-t border-white"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/craft/sap-search"
              className="group block py-16 md:py-24 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0"
              data-cursor="project" data-cursor-label="Experience">
              <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center">
                <div>
                  <p className="text-label text-white opacity-18 mb-8">Product Story · SAP · 300M+ users</p>
                  <h3 className="text-white group-hover:opacity-80 transition-opacity duration-500"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                    The Future of<br />Enterprise Search
                  </h3>
                  <p className="text-white mt-6 max-w-lg" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 300, lineHeight: 1.65, opacity: 0.3 }}>
                    Reimagining search as an intelligent orchestration layer across the SAP ecosystem.
                  </p>
                </div>
                {/* Number accent */}
                <div className="hidden md:flex justify-end items-center">
                  <p style={{ fontSize: 'clamp(8rem, 16vw, 15rem)', fontWeight: 200, letterSpacing: '-0.07em', lineHeight: 1, color: 'rgba(245,242,237,0.05)', userSelect: 'none' }}>
                    05
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Workshop */}
          <motion.div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.07 }}>
            <Link to="/community"
              className="group flex items-start justify-between py-12 md:py-16 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0">
              <div>
                <p className="text-label text-white opacity-18 mb-5">Workshop · 2023 · Sold out</p>
                <h3 className="text-white group-hover:opacity-75 transition-opacity"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.035em', lineHeight: 1.15 }}>
                  DesignUp — Dual Fluency Workshop
                </h3>
              </div>
              <p className="hidden md:block text-label text-white opacity-18 group-hover:opacity-50 transition-opacity shrink-0 mt-2">
                Community →
              </p>
            </Link>
          </motion.div>

          {/* Essay */}
          <motion.div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}>
            <Link to="/reflections"
              className="group flex items-start justify-between py-12 md:py-16 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0">
              <div>
                <p className="text-label text-white opacity-18 mb-5">Essay Series · Ancient Wisdom · 5 parts</p>
                <h3 className="text-white group-hover:opacity-75 transition-opacity"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.035em', lineHeight: 1.15 }}>
                  How Vedic Secrets Can Disrupt<br />Your Design Game
                </h3>
              </div>
              <p className="hidden md:block text-label text-white opacity-18 group-hover:opacity-50 transition-opacity shrink-0 mt-2">
                Reflections →
              </p>
            </Link>
          </motion.div>

          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        </div>
      </section>

      {/* ── CRAFT — immersive project list ── */}
      <section className="relative bg-black">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 pb-36 md:pb-56">
          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-16 mb-0">
            <FadeUp><p className="text-overline text-white opacity-25">Craft</p></FadeUp>
            <FadeUp delay={0.1}>
              <Link to="/craft" className="text-label text-white opacity-20 hover:opacity-55 transition-opacity">
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
    </>
  )
}
