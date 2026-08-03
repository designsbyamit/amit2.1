import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import GrainOverlay from '../ui/GrainOverlay'
import MeshBackground from '../ui/MeshBackground'
import heroImg from '../../assets/images/amit-stage.jpg'

function Line({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const reduced = useReducedMotion()
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em', ...style }}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: reduced ? 0 : '105%', skewY: reduced ? 0 : 1.5 }}
        animate={{ y: 0, skewY: 0 }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100])
  const photoScale = useTransform(scrollYProgress, [0, 0.9], [1.0, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 0.55], reduced ? [0, 0] : [0, 48])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const meshOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 45, damping: 20 })
  const sy = useSpring(my, { stiffness: 45, damping: 20 })
  const imgDriftX = useTransform(sx, [-1, 1], reduced ? [0, 0] : [-16, 16])
  const imgDriftY = useTransform(sy, [-1, 1], reduced ? [0, 0] : [-10, 10])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])

  return (
    <section ref={containerRef} className="relative h-[100dvh] overflow-hidden bg-black">
      <GrainOverlay opacity={0.07} />

      {/* ── PORTRAIT — z:1, atmospheric base ── */}
      <motion.div className="absolute inset-0" style={{ y: photoY, scale: photoScale, zIndex: 1 }}>
        <motion.div className="absolute inset-0" style={{ x: imgDriftX, y: imgDriftY }}>
          <img src={heroImg} alt="" className="hero-img w-full h-full object-cover"
            style={{ filter: 'saturate(0.08) contrast(1.1) brightness(0.45)', willChange: 'transform' }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.96) 12%, rgba(12,12,11,0.7) 28%, rgba(12,12,11,0.15) 55%, transparent 80%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0C0C0B 0%, rgba(12,12,11,0.8) 25%, rgba(12,12,11,0.1) 50%, transparent 70%)' }} />
      </motion.div>

      {/* ── MESH — z:2, above portrait, below text. Shader owns the gradient fade ── */}
      <motion.div className="absolute inset-0" style={{ opacity: meshOpacity, zIndex: 2, pointerEvents: 'none' }}>
        <MeshBackground />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-20 h-full flex flex-col"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Top identity strip */}
        <motion.div
          className="flex items-center justify-between px-7 md:px-14 pt-28 md:pt-[7.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1.0, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-5">
            <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.28)' }}>
              Amit Kumar Tiwari
            </span>
            <span style={{ width: 1, height: 12, background: 'rgba(245,242,237,0.12)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.16)' }}>
              Design Director · Enterprise AI
            </span>
          </div>
          <Link
            to="/leadership"
            style={{ fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.1)', transition: 'color 0.4s' }}
            className="hidden md:block"
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.38)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.1)')}
          >
            Dual Fluency · AI-Native · Agentic
          </Link>
        </motion.div>

        {/* Headline */}
        <div className="flex-1 flex items-end px-7 md:px-14 pb-16 md:pb-20">
          <div className="w-full">
            <h1 style={{ lineHeight: 0.90, letterSpacing: '-0.045em', marginBottom: '3.2rem' }}>
              <Line delay={0.2} style={{ marginBottom: '0.03em' }}>
                <span style={{ display: 'block', fontSize: 'clamp(2.4rem, 7vw, 6.8rem)', fontWeight: 200, color: 'rgba(245,242,237,0.92)' }}>
                  Design that
                </span>
              </Line>
              <Line delay={0.34} style={{ marginBottom: '0.03em' }}>
                <span style={{ display: 'block', fontSize: 'clamp(2.4rem, 7vw, 6.8rem)', fontWeight: 200, color: 'rgba(245,242,237,0.88)' }}>
                  can't speak
                </span>
              </Line>
              <Line delay={0.48} style={{ marginBottom: '0.04em' }}>
                <span style={{ display: 'block', fontSize: 'clamp(2.4rem, 7vw, 6.8rem)', fontWeight: 200, fontStyle: 'italic', color: 'rgba(245,242,237,0.92)' }}>
                  business
                </span>
              </Line>
              <Line delay={0.62}>
                <span style={{ display: 'block', fontSize: 'clamp(2.4rem, 7vw, 6.8rem)', fontWeight: 200, color: 'rgba(245,242,237,0.2)' }}>
                  is decoration.
                </span>
              </Line>
            </h1>

            {/* Bottom row */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-7">
                <Link
                  to="/craft"
                  style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.88)', border: '1px solid rgba(245,242,237,0.2)', padding: '13px 28px', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,242,237,0.6)'; e.currentTarget.style.background = 'rgba(245,242,237,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,242,237,0.2)'; e.currentTarget.style.background = 'transparent' }}
                >
                  See the work
                </Link>
                <Link
                  to="/contact"
                  style={{ fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.28)', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.28)')}
                >
                  Get in touch →
                </Link>
              </div>
              <p
                className="hidden lg:block text-right"
                style={{ fontSize: '0.68rem', fontWeight: 300, lineHeight: 1.65, color: 'rgba(245,242,237,0.2)', maxWidth: '210px', letterSpacing: '0.01em' }}
              >
                300M+ users reached.<br />
                $5M in documented savings.<br />
                90% CSAT where avg is 60%.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.7 }}
      >
        <motion.div
          style={{ width: 1, background: 'rgba(245,242,237,0.15)' }}
          animate={{ height: ['10px', '34px', '10px'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </motion.div>
    </section>
  )
}
