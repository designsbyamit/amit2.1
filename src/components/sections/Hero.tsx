import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import GrainOverlay from '../ui/GrainOverlay'
import heroImg from '../../assets/images/amit-stage.jpg'

// Line-by-line masked reveal
function MaskLine({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <span className={`line-mask ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: reduced ? 0 : '105%', opacity: reduced ? 0 : 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80])
  const photoScale = useTransform(scrollYProgress, [0, 0.6], [1.0, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Mouse parallax — very subtle
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smoothX = useSpring(mx, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(my, { stiffness: 60, damping: 20 })
  const imageX = useTransform(smoothX, [-1, 1], reduced ? [0, 0] : [-12, 12])
  const imageY = useTransform(smoothY, [-1, 1], reduced ? [0, 0] : [-8, 8])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth) * 2 - 1
      const cy = (e.clientY / window.innerHeight) * 2 - 1
      mx.set(cx)
      my.set(cy)
      setMousePos({ x: cx, y: cy })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mx, my])

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-black"
    >
      <GrainOverlay opacity={0.055} />

      {/* ── Photo background ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: photoY, x: imageX, scale: photoScale }}
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <img
            src={heroImg}
            alt="Amit Kumar Tiwari on stage"
            className="hero-img w-full h-full object-cover"
            style={{ filter: 'grayscale(1) contrast(1.08) brightness(0.88)' }}
          />
        </motion.div>

        {/* Gradient layers */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.95) 22%, rgba(12,12,11,0.55) 52%, rgba(12,12,11,0.1) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #0C0C0B 0%, rgba(12,12,11,0.6) 40%, transparent 70%)',
        }} />
      </motion.div>

      {/* Ambient light spot — reacts subtly to mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,242,237,0.025) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
          x: useTransform(smoothX, [-1, 1], [-20, 20]),
          y: useTransform(smoothY, [-1, 1], [-15, 15]),
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 pb-14 md:pb-20 max-w-7xl mx-auto w-full"
        style={{ y: contentY, opacity }}
      >
        <div className="flex items-end justify-between gap-8">

          {/* Left block */}
          <div className="flex-1 max-w-3xl">

            {/* Identity overline */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-overline text-white opacity-35 tracking-widest">
                Design Director · Enterprise AI
              </p>
              <Link
                to="/leadership"
                className="text-overline text-white opacity-15 hover:opacity-45 transition-opacity duration-500 mt-1.5 block"
              >
                Dual Fluency · AI-Native · Agentic Systems
              </Link>
            </motion.div>

            {/* Headline — masked line reveals */}
            <h1 className="mb-10" style={{ lineHeight: 1.0 }}>
              <span className="block text-display-xl text-white">
                <MaskLine delay={0.25}>Design that can't speak business</MaskLine>
              </span>
              <span className="block text-display-xl text-white" style={{ opacity: 0.55 }}>
                <MaskLine delay={0.45}>is just decoration.</MaskLine>
              </span>
            </h1>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/craft"
                className="group relative text-label text-white border border-white border-opacity-25 px-7 py-3.5 overflow-hidden transition-all duration-500 hover:border-opacity-70"
              >
                <span className="relative z-10">See the work</span>
                <motion.div
                  className="absolute inset-0 bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ mixBlendMode: 'overlay', opacity: 0.08 }}
                />
              </Link>
              <Link
                to="/contact"
                className="group text-label text-white opacity-40 hover:opacity-90 transition-opacity duration-300 flex items-center gap-2"
              >
                Get in touch
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >→</motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Right — proof numbers, desktop only */}
          <motion.div
            className="hidden lg:flex flex-col gap-5 mb-1 shrink-0 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {[
              ['300M+', 'users across shipped products'],
              ['$5M', 'documented savings'],
              ['90%', 'CSAT · industry avg <60%'],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-white" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1, opacity: 0.85 }}>{val}</p>
                <p className="text-label text-white opacity-20 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          className="w-px bg-white opacity-20"
          animate={{ height: ['12px', '32px', '12px'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
