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
import heroImg from '../../assets/images/amit-stage.jpg'

// Masked single line reveal — no word stagger, the whole line is one gesture
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
    <span style={{ display: 'block', overflow: 'hidden', ...style }}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: reduced ? 0 : '104%', skewY: reduced ? 0 : 1.5 }}
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

  // Photo moves 20% slower than scroll — subtle cinematic depth
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -140])
  const photoScale = useTransform(scrollYProgress, [0, 0.9], [1.0, 1.12])
  // Content fades and lifts as you scroll out
  const contentY = useTransform(scrollYProgress, [0, 0.55], reduced ? [0, 0] : [0, 52])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0])

  // Mouse parallax — photo reacts subtly
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 45, damping: 20 })
  const sy = useSpring(my, { stiffness: 45, damping: 20 })
  const imgDriftX = useTransform(sx, [-1, 1], reduced ? [0, 0] : [-20, 20])
  const imgDriftY = useTransform(sy, [-1, 1], reduced ? [0, 0] : [-12, 12])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-black"
    >
      <GrainOverlay opacity={0.07} />

      {/* ── PHOTO — recedes behind aggressive vignette ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: photoY, scale: photoScale }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ x: imgDriftX, y: imgDriftY }}
        >
          <img
            src={heroImg}
            alt=""
            className="hero-img w-full h-full object-cover"
            style={{
              filter: 'grayscale(1) contrast(1.18) brightness(0.68)',
              willChange: 'transform',
            }}
          />
        </motion.div>

        {/* Bottom sweep — type sits clean over black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.98) 16%, rgba(12,12,11,0.78) 36%, rgba(12,12,11,0.25) 58%, transparent 80%)',
          }}
        />
        {/* Left sweep — keeps left column readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(12,12,11,0.85) 0%, rgba(12,12,11,0.55) 30%, rgba(12,12,11,0.1) 55%, transparent 75%)',
          }}
        />
        {/* Global tint */}
        <div className="absolute inset-0" style={{ background: 'rgba(12,12,11,0.18)' }} />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-20 h-full flex flex-col"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Top strip — name + role, typeset precisely */}
        <motion.div
          className="flex items-center justify-between px-7 md:px-14 pt-28 md:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 1.0, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-5">
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.28)',
              }}
            >
              Amit Kumar Tiwari
            </span>
            <span style={{ width: 1, height: 14, background: 'rgba(245,242,237,0.12)', display: 'block' }} />
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.18)',
              }}
            >
              Design Director
            </span>
          </div>

          {/* Right — concept fingerprint */}
          <Link
            to="/leadership"
            style={{
              fontSize: '0.58rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,237,0.12)',
              transition: 'color 0.4s',
            }}
            className="hidden md:block hover:text-white"
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.12)')}
          >
            Dual Fluency · AI-Native · Agentic
          </Link>
        </motion.div>

        {/* ── HEADLINE — the main event ── */}
        <div className="flex-1 flex items-end px-7 md:px-14 pb-16 md:pb-20">
          <div className="w-full">
            {/*
              Typographic decision:
              - Lines 1-3 = full weight statement, 200 weight, near-white
              - Line 4 = ghost/dim — creates visual depth and a "fading thought" effect
              - Each line has a slightly different opacity to create hierarchy within the headline
              - "business" italicised — a single typographic accent signals craft
            */}
            <h1 style={{ lineHeight: 0.90, letterSpacing: '-0.045em', marginBottom: '3.5rem' }}>
              {/* Line 1 */}
              <Line delay={0.18} style={{ marginBottom: '0.04em' }}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.2rem, 9.5vw, 9.2rem)',
                  fontWeight: 200,
                  color: 'rgba(245,242,237,0.92)',
                }}>
                  Design that
                </span>
              </Line>

              {/* Line 2 */}
              <Line delay={0.32} style={{ marginBottom: '0.04em' }}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.2rem, 9.5vw, 9.2rem)',
                  fontWeight: 200,
                  color: 'rgba(245,242,237,0.88)',
                }}>
                  can't speak
                </span>
              </Line>

              {/* Line 3 — italic accent */}
              <Line delay={0.46} style={{ marginBottom: '0.06em' }}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.2rem, 9.5vw, 9.2rem)',
                  fontWeight: 200,
                  fontStyle: 'italic',
                  color: 'rgba(245,242,237,0.92)',
                }}>
                  business
                </span>
              </Line>

              {/* Line 4 — ghost */}
              <Line delay={0.60}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.2rem, 9.5vw, 9.2rem)',
                  fontWeight: 200,
                  color: 'rgba(245,242,237,0.22)',
                }}>
                  is decoration.
                </span>
              </Line>
            </h1>

            {/* Bottom strip — CTA + editorial note */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* CTAs */}
              <div className="flex items-center gap-7">
                <Link
                  to="/craft"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,237,0.88)',
                    border: '1px solid rgba(245,242,237,0.22)',
                    padding: '13px 28px',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,242,237,0.65)'
                    e.currentTarget.style.background = 'rgba(245,242,237,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,242,237,0.22)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  See the work
                </Link>
                <Link
                  to="/contact"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,237,0.3)',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.3)')}
                >
                  Get in touch →
                </Link>
              </div>

              {/* Right — proof fragment */}
              <p
                className="hidden lg:block text-right"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(245,242,237,0.22)',
                  maxWidth: '220px',
                  letterSpacing: '0.01em',
                }}
              >
                300M+ users reached.<br />
                $5M in documented savings.<br />
                90% CSAT where the avg is 60%.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — minimal, centered, breathing */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <motion.div
          style={{ width: 1, background: 'rgba(245,242,237,0.18)' }}
          animate={{ height: ['10px', '32px', '10px'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </motion.div>
    </section>
  )
}
