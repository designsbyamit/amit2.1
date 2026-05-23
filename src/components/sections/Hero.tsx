import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import GrainOverlay from '../ui/GrainOverlay'
import SweepLines from '../ui/SweepLines'
import RevealText from '../ui/RevealText'
import heroImg from '../../assets/images/amit-stage.jpg'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80])

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-black"
      id="hero"
    >
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      {/* Photo zone — right 55% */}
      <motion.div
        className="absolute right-0 top-0 w-[55%] h-full"
        style={{ y: photoY }}
      >
        <img
          src={heroImg}
          alt="Amit Kumar Tiwari on stage"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center top',
            filter: 'grayscale(1) contrast(1.1)',
            transform: 'scale(1.08)',
          }}
        />
        {/* Left gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #0C0C0B 0%, #0C0C0B 5%, rgba(12,12,11,0.7) 25%, transparent 55%)',
          }}
        />
        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.6) 20%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Content — left */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="max-w-[52%]">
          <p className="text-overline text-white opacity-40 mb-8">Design Leader · AI-Native · Enterprise</p>

          <h1 className="text-display-xl text-white mb-6 leading-none">
            <RevealText text="Amit" delay={0.1} />
            <br />
            <RevealText text="Kumar" delay={0.25} />
            <br />
            <RevealText text="Tiwari" delay={0.4} />
          </h1>

          <motion.p
            className="text-body text-white opacity-60 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Shaping AI-native enterprise experiences. 16 years. 4 companies. One throughline: design that changes how people work.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <a
              href="#work"
              className="text-label text-white border border-white border-opacity-30 px-6 py-3 hover:border-opacity-80 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="text-label text-white opacity-50 hover:opacity-100 transition-opacity"
            >
              Get in touch →
            </a>
          </motion.div>
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
