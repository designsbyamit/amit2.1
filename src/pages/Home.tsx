import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { caseStudies } from '../data/work'
import GrainOverlay from '../components/ui/GrainOverlay'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'

// Staggered paragraph reveal
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Immersive project row
function ProjectRow({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.div
      ref={ref}
      className="group border-t border-white"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Link
        to={cs.id === 'sap-search' ? '/craft/sap-search' : `/craft/${cs.id}`}
        className="flex items-stretch py-10 md:py-14 gap-0 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0"
      >
        {/* Text */}
        <div className="flex-1 pr-6 md:pr-16 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-label text-white opacity-15">{cs.number}</span>
            <span className="text-overline text-white opacity-30">{cs.category}</span>
          </div>

          <h3
            className="text-white mb-4 group-hover:opacity-80 transition-opacity duration-400"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2 }}
          >
            {cs.title}
          </h3>

          <p className="text-body text-white mb-6 max-w-xl" style={{ opacity: 0.38 }}>{cs.tagline}</p>

          {/* Stats inline */}
          {cs.stats && (
            <div className="flex flex-wrap gap-6">
              {cs.stats.map(stat => (
                <div key={stat.label}>
                  <p className="text-white" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', fontWeight: 200, letterSpacing: '-0.03em', opacity: 0.85 }}>{stat.value}</p>
                  <p className="text-label text-white opacity-25 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image — parallax + hover effects */}
        {cs.image && (
          <div className="hidden md:block relative overflow-hidden flex-shrink-0" style={{ width: '38%' }}>
            <motion.div className="absolute inset-0" style={{ y: imgY }}>
              <motion.img
                src={cs.image}
                alt={cs.title}
                className="w-full h-full object-cover"
                style={{
                  filter: 'grayscale(0.35) contrast(1.05)',
                  transformOrigin: 'center center',
                }}
                whileHover={{ scale: 1.04, filter: 'grayscale(0.1) contrast(1.08)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            />
          </div>
        )}
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const quoteX = useTransform(aboutScroll, [0, 1], ['0%', '-2%'])

  return (
    <>
      <Hero />
      <ImpactSnapshot />

      {/* ── ABOUT — editorial split, text dominant ── */}
      <section ref={aboutRef} className="relative bg-black overflow-hidden" id="about">
        <GrainOverlay opacity={0.03} />

        {/* Large background letter */}
        <motion.div
          className="absolute left-0 top-0 select-none pointer-events-none hidden lg:block"
          style={{ x: quoteX }}
        >
          <p style={{
            fontSize: 'clamp(24rem, 42vw, 52rem)',
            fontWeight: 200,
            letterSpacing: '-0.08em',
            lineHeight: 0.85,
            color: 'rgba(245,242,237,0.015)',
          }}>A</p>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-28 md:py-40">
          <div className="grid md:grid-cols-[1fr_2.2fr] gap-16 md:gap-28 items-start">

            {/* Left label + vertical rule */}
            <div className="md:pt-3">
              <FadeUp>
                <p className="text-overline text-white opacity-30 mb-6">About</p>
                <div className="hidden md:block w-px h-24 bg-white opacity-10 ml-px" />
              </FadeUp>
            </div>

            {/* Right — editorial paragraphs */}
            <div>
              <FadeUp delay={0.05}>
                <p className="text-white mb-8" style={{
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                  fontWeight: 300,
                  lineHeight: 1.72,
                  letterSpacing: '-0.01em',
                  maxWidth: '62ch',
                  opacity: 0.8,
                }}>
                  For 16 years I've operated at the intersection of design, business strategy, and emerging technology. My practice is built on three interlocking ideas: <strong style={{ fontWeight: 400 }}>Dual Fluency</strong> — the capacity to operate equally in the language of design and the language of business; <strong style={{ fontWeight: 400 }}>AI-Native Design</strong> — rethinking what interaction means when software can reason and act; and <strong style={{ fontWeight: 400 }}>Agentic Process</strong> — designing the human-AI relationship in autonomous systems where oversight is the product.
                </p>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p className="text-body text-white mb-8" style={{ opacity: 0.42, maxWidth: '58ch' }}>
                  These aren't three separate interests. They are one position — that the next generation of enterprise design leaders must be fluent in what AI can do, clear on what it shouldn't do without human oversight, and able to translate all of it into business value. That workshop at DesignUp sold out. That thinking is in production at SAP. And it is what I bring to every room.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-body text-white" style={{ opacity: 0.38, maxWidth: '58ch' }}>
                  In 2022 I founded SAP Design Hub India — now 250+ designers strong, one of the largest internal design communities in the SAP ecosystem — because the best design culture is one you build, not one you inherit.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED SIGNALS — work list, prototype-first ── */}
      <section className="relative bg-black" id="signals">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pt-0 pb-28 md:pb-40">

          {/* Section header — editorial asymmetric */}
          <div className="flex items-end justify-between mb-0 border-t border-white border-opacity-[0.08] pt-16">
            <motion.p
              className="text-overline text-white opacity-30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected signals
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/craft" className="text-label text-white opacity-25 hover:opacity-60 transition-opacity duration-300 flex items-center gap-2">
                All work
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>→</motion.span>
              </Link>
            </motion.div>
          </div>

          {/* ── SIGNAL 1: SAP Search — featured product story ── */}
          <motion.div
            className="border-t border-white mt-0 mb-0"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to="/craft/sap-search"
              className="group block py-14 md:py-20 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0"
            >
              <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-end">
                <div>
                  <p className="text-label text-white opacity-20 mb-6">Product Story · SAP · 300M+ users</p>
                  <h3 className="text-white mb-5 group-hover:opacity-80 transition-opacity duration-400"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                    The Future of Enterprise Search
                  </h3>
                  <p className="text-body text-white mb-8" style={{ opacity: 0.38, maxWidth: '50ch' }}>
                    Reimagining search as an intelligent orchestration layer across the SAP ecosystem — intent over keywords, trust by design, cross-product continuity.
                  </p>
                  <span className="text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 flex items-center gap-2">
                    Experience the story
                    <motion.span className="inline-block" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>→</motion.span>
                  </span>
                </div>
                {/* Large number accent */}
                <div className="hidden md:flex justify-end items-end">
                  <p className="text-white select-none group-hover:opacity-60 transition-opacity duration-500"
                    style={{ fontSize: 'clamp(6rem, 14vw, 13rem)', fontWeight: 200, letterSpacing: '-0.07em', lineHeight: 1, opacity: 0.04 }}>
                    05
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── SIGNAL 2: Workshop — full-bleed moment ── */}
          <motion.div
            className="border-t border-white py-14 md:py-16"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <Link
              to="/community"
              className="group flex items-start justify-between gap-8 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0 py-4"
            >
              <div className="flex-1">
                <p className="text-label text-white opacity-20 mb-4">Workshop · 2023 · Sold out</p>
                <h3 className="text-white mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.25rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  DesignUp — Dual Fluency Workshop
                </h3>
                <p className="text-body text-white max-w-2xl" style={{ opacity: 0.35 }}>
                  Full-day workshop on Dual Fluency — the designer's ability to operate equally in design language and business language.
                </p>
              </div>
              <p className="hidden md:block text-label text-white opacity-20 group-hover:opacity-55 transition-opacity shrink-0 mt-1">
                Explore community →
              </p>
            </Link>
          </motion.div>

          {/* ── SIGNAL 3: Essay — oversized quote moment ── */}
          <motion.div
            className="border-t border-white py-14 md:py-16"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            <Link
              to="/reflections"
              className="group flex items-start justify-between gap-8 hover:bg-white hover:bg-opacity-[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0 py-4"
            >
              <div className="flex-1">
                <p className="text-label text-white opacity-20 mb-4">Essay Series · Ancient Wisdom · 5 parts</p>
                <h3 className="text-white mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.25rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  How Vedic Secrets Can Disrupt Your Design Game
                </h3>
                <p className="text-body text-white max-w-2xl" style={{ opacity: 0.35 }}>
                  What ancient Indian philosophy — Nyaya Darshan, the Vedas, Vedic epistemology — has to teach modern designers about process, knowledge, and intention.
                </p>
              </div>
              <p className="hidden md:block text-label text-white opacity-20 group-hover:opacity-55 transition-opacity shrink-0 mt-1">
                Read reflections →
              </p>
            </Link>
          </motion.div>

          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        </div>
      </section>

      {/* ── WORK — full project list ── */}
      <section className="relative bg-black" id="work">
        <GrainOverlay opacity={0.025} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pb-32 md:pb-48">
          <div className="flex items-end justify-between border-t border-white border-opacity-[0.07] pt-16 mb-0">
            <FadeUp>
              <p className="text-overline text-white opacity-30">Craft</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link to="/craft" className="text-label text-white opacity-25 hover:opacity-60 transition-opacity">
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
