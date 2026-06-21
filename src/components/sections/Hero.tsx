import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import GrainOverlay from '../ui/GrainOverlay'
import SweepLines from '../ui/SweepLines'
import RevealText from '../ui/RevealText'
import RotatingTitle from '../ui/RotatingTitle'
import heroImg from '../../assets/images/amit-stage.jpg'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60])

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-black"
    >
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      {/* Full-bleed photo background */}
      <motion.div className="absolute inset-0" style={{ y: photoY }}>
        <img
          src={heroImg}
          alt="Amit Kumar Tiwari on stage"
          className="hero-img w-full h-full object-cover"
          style={{ filter: 'grayscale(1) contrast(1.05)' }}
        />
        {/* Bottom fade — text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.92) 28%, rgba(12,12,11,0.5) 58%, transparent 100%)',
          }}
        />
        {/* Right-side fade — keeps body copy readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(12,12,11,0.72) 0%, transparent 55%)',
          }}
        />
        {/* Subtle global veil */}
        <div className="absolute inset-0" style={{ background: 'rgba(12,12,11,0.32)' }} />
      </motion.div>

      {/* Content — bottom row, ClearPath style */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between gap-8">

          {/* Left: overline + headline + CTAs */}
          <div className="flex-1">
            <p className="text-overline text-white opacity-40 mb-8">
              <RotatingTitle />
            </p>
            <h1 className="text-display-xl text-white mb-10">
              <RevealText text="Designing for Humans," delay={0.1} />
              <br />
              <RevealText text="Systems and Everything Between." delay={0.3} />
            </h1>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Link
                to="/craft"
                className="text-label text-white border border-white border-opacity-30 px-6 py-3 hover:border-opacity-80 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
              >
                See the work
              </Link>
              <Link
                to="/contact"
                className="text-label text-white opacity-50 hover:opacity-100 transition-opacity"
              >
                Get in touch →
              </Link>
            </motion.div>
          </div>

          {/* Right: body copy — floats beside the headline */}
          <motion.p
            className="hidden md:block text-body text-white opacity-50 max-w-[260px] mb-1 shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            "If your design isn't making business decisions, then it's just decorating your future."
          </motion.p>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-label text-white" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-12 bg-white opacity-40" />
      </motion.div>
    </section>
  )
}
