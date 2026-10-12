import { useCallback, useEffect, useRef, useState } from 'react'

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
export const easeOutBack = (x: number) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
/** 0..1 progress of t between a and b */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x
/** deterministic pseudo-random 0..1 */
export const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

export interface Chapter { at: number; label: string }

/**
 * Master clock. Time advances only while playing. An optional `onSeek(t, playing)` hook
 * lets the audio score re-schedule itself.
 */
export function useClock(duration: number, hooks: { onPlay: (t: number) => void; onPause: () => void; onSeek: (t: number) => void }) {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const base = useRef({ t: 0, at: 0 })
  const raf = useRef(0)
  const playingRef = useRef(false)
  const h = useRef(hooks); h.current = hooks

  const tick = useCallback(() => {
    const nt = base.current.t + (performance.now() - base.current.at) / 1000
    if (nt >= duration) { playingRef.current = false; setPlaying(false); setT(duration); h.current.onPause(); return }
    setT(nt)
    raf.current = requestAnimationFrame(tick)
  }, [duration])

  const play = useCallback(() => {
    if (playingRef.current) return
    const start = base.current.t >= duration - 0.05 ? 0 : base.current.t
    base.current = { t: start, at: performance.now() }
    playingRef.current = true; setPlaying(true)
    h.current.onPlay(start)
    raf.current = requestAnimationFrame(tick)
  }, [duration, tick])

  const pause = useCallback(() => {
    if (!playingRef.current) return
    cancelAnimationFrame(raf.current)
    base.current = { t: base.current.t + (performance.now() - base.current.at) / 1000, at: performance.now() }
    playingRef.current = false; setPlaying(false)
    h.current.onPause()
  }, [])

  const seek = useCallback((nt: number) => {
    const v = clamp(nt, 0, duration)
    base.current = { t: v, at: performance.now() }
    setT(v)
    h.current.onSeek(v)
  }, [duration])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  return { t, playing, play, pause, seek, isPlaying: () => playingRef.current }
}
