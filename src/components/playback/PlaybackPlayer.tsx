import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Playback } from '../../data/playbacks'

const B = import.meta.env.BASE_URL
const INTRO_MS = 5000
const SCENE_MS = 9000

interface Scene { key: string; label: string; text: string; ms: number; impact?: boolean }

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
)
const PLAY = 'M8 5v14l11-7z'
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z'
const REPLAY = 'M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z'

/** The one-minute version of a project, played like a short film: the cover, then five beats, ending on the impact.
 *  Plays when it scrolls into view, pauses when it leaves, and can be stepped through like a story (tap, arrows, or the bars). */
export default function PlaybackPlayer({ id, playback, category }: { id: string; playback: Playback; category: string }) {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const [visible, setVisible] = useState(false)
  const [touched, setTouched] = useState(false)

  const scenes: Scene[] = [
    { key: 'intro', label: category, text: playback.headline, ms: INTRO_MS },
    { key: 'about', label: 'What it is', text: playback.beats.about, ms: SCENE_MS },
    { key: 'challenge', label: 'The challenge', text: playback.beats.challenge, ms: SCENE_MS },
    { key: 'users', label: 'Who it is for', text: playback.beats.users, ms: SCENE_MS },
    { key: 'solution', label: 'The solution', text: playback.beats.solution, ms: SCENE_MS },
    { key: 'impact', label: 'The impact', text: playback.beats.impact, ms: SCENE_MS + 2000, impact: true },
  ]
  const last = scenes.length - 1
  const scene = scenes[index]
  const elapsed = useRef(0)
  const indexRef = useRef(0)
  indexRef.current = index

  const setBars = useCallback((i: number, p: number) => {
    bars.current.forEach((el, k) => { if (el) el.style.transform = `scaleX(${k < i ? 1 : k === i ? p : 0})` })
  }, [])

  const go = useCallback((i: number) => {
    const n = Math.max(0, Math.min(last, i))
    elapsed.current = 0
    setIndex(n)
    setFinished(false)
    setBars(n, 0)
  }, [last, setBars])

  // Start when at least half of the player is on screen, pause when it leaves, never autoplay for reduced motion.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (reduce || touched) return
    setPlaying(visible && !finished)
  }, [visible, reduce, touched, finished])

  // The clock. Progress is written straight to the bar so the page does not re-render every frame.
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let prev = performance.now()
    const tick = (now: number) => {
      if (document.hidden) { prev = now; raf = requestAnimationFrame(tick); return }
      elapsed.current += now - prev
      prev = now
      const dur = scenes[indexRef.current].ms
      const p = Math.min(1, elapsed.current / dur)
      setBars(indexRef.current, p)
      if (p >= 1) {
        if (indexRef.current >= last) { setPlaying(false); setFinished(true); return }
        elapsed.current = 0
        setIndex(indexRef.current + 1)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // scenes is rebuilt each render but only its durations are read, and they never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, last, setBars])

  useEffect(() => { setBars(index, elapsed.current / scenes[index].ms || 0) }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    setTouched(true)
    if (finished) { go(0); setPlaying(true); return }
    setPlaying(p => !p)
  }
  const step = (d: number) => { setTouched(true); go(index + d) }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    else if (e.key === ' ' && e.target === e.currentTarget) { e.preventDefault(); toggle() }
  }

  const img = `${B}images/covers/${id}`
  return (
    <div
      ref={root}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`One-minute playback: ${playback.headline}`}
      onKeyDown={onKey}
      className="relative overflow-hidden rounded-3 bg-[#0b0d12] aspect-[4/5] sm:aspect-[16/9] select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
    >
      <motion.img
        key={index}
        src={`${img}-1600.webp`}
        srcSet={`${img}-640.webp 640w, ${img}-1600.webp 1600w`}
        sizes="(min-width: 1280px) 1200px, 100vw"
        alt=""
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        initial={reduce ? false : { scale: 1.03 }}
        animate={reduce ? undefined : { scale: 1.12 }}
        transition={{ duration: scene.ms / 1000 + 1, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black from-10% via-black/80 via-45% to-black/30" />

      {/* Story bars: one per scene, tap to jump */}
      <div className="absolute inset-x-4 sm:inset-x-6 top-4 sm:top-5 z-20 flex gap-1.5" aria-hidden="false">
        {scenes.map((s, i) => (
          <button key={s.key} type="button" onClick={() => step(i - index)} aria-label={`${s.label}`} aria-current={i === index} className="group flex-1 py-2 -my-2">
            <span className="block h-[3px] rounded-full bg-white/25 overflow-hidden">
              <span ref={el => { bars.current[i] = el }} className="block h-full w-full origin-left bg-white" style={{ transform: `scaleX(${i < index ? 1 : 0})` }} />
            </span>
          </button>
        ))}
      </div>

      {/* Tap zones */}
      <button type="button" onClick={() => step(-1)} aria-label="Previous" className="absolute left-0 top-12 bottom-16 w-1/4 z-10 cursor-w-resize" />
      <button type="button" onClick={() => step(1)} aria-label="Next" className="absolute right-0 top-12 bottom-16 w-1/4 z-10 cursor-e-resize" />

      <div className="absolute inset-x-5 sm:inset-x-10 bottom-16 sm:bottom-20 z-10 pointer-events-none" aria-live={playing ? 'off' : 'polite'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.key}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-overline text-white/70 mb-3 sm:mb-4">{scene.label}</p>
            {scene.impact && (
              <p className="text-white leading-none mb-3 sm:mb-5" style={{ fontSize: 'clamp(2.75rem, 9vw, 6.5rem)', fontWeight: 200, letterSpacing: '-0.04em' }}>
                {playback.metric.value}
              </p>
            )}
            {scene.impact && <p className="text-label text-white/70 mb-3 sm:mb-4">{playback.metric.label}</p>}
            <p
              className={`text-white max-w-[34ch] sm:max-w-[40ch] ${scene.key === 'intro' ? 'font-serif' : ''}`}
              style={scene.key === 'intro'
                ? { fontSize: 'clamp(1.5rem, 4.2vw, 3.1rem)', fontWeight: 300, lineHeight: 1.12, letterSpacing: '-0.02em' }
                : scene.impact
                  ? { fontSize: 'clamp(1rem, 2vw, 1.45rem)', fontWeight: 300, lineHeight: 1.4 }
                  : { fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', fontWeight: 300, lineHeight: 1.22, letterSpacing: '-0.015em' }}
            >
              {scene.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-5 z-20 flex items-center justify-between">
        <button type="button" onClick={toggle} className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-white text-label hover:bg-white/25 transition-colors">
          <Icon d={finished ? REPLAY : playing ? PAUSE : PLAY} />
          {finished ? 'Replay' : playing ? 'Pause' : 'Play'}
        </button>
        <p className="text-label text-white/70" aria-hidden="true">{index + 1} / {scenes.length}</p>
      </div>
    </div>
  )
}
