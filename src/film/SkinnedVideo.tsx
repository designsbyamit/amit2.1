import { useEffect, useRef, useState } from 'react'
import FilmControls, { type Chap } from './FilmControls'

/** A plain video file in the site's player skin. */
export default function SkinnedVideo({ src, poster, label, chapters }: { src: string; poster?: string; label: string; chapters?: Chap[] }) {
  const v = useRef<HTMLVideoElement>(null)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const el = v.current; if (!el) return
    let raf = 0
    const tick = () => { setT(el.currentTime); raf = requestAnimationFrame(tick) }
    const on = () => { setPlaying(true); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick) }
    const off = () => { setPlaying(false); cancelAnimationFrame(raf); setT(el.currentTime) }
    const meta = () => setDur(el.duration || 0)
    el.addEventListener('play', on); el.addEventListener('pause', off); el.addEventListener('ended', off)
    el.addEventListener('loadedmetadata', meta); el.addEventListener('durationchange', meta); el.addEventListener('seeked', () => setT(el.currentTime))
    return () => { cancelAnimationFrame(raf); el.removeEventListener('play', on); el.removeEventListener('pause', off); el.removeEventListener('ended', off); el.removeEventListener('loadedmetadata', meta); el.removeEventListener('durationchange', meta) }
  }, [])
  useEffect(() => { if (v.current) v.current.muted = muted }, [muted])

  const start = () => { setStarted(true); void v.current?.play() }
  return (
    <FilmControls label={label} t={t} duration={dur} playing={playing} started={started} muted={muted} chapters={chapters} startLabel="Play" keys="inview"
      onStart={start} onToggle={() => { const el = v.current; if (!el) return; if (el.paused) void el.play(); else el.pause() }}
      onSeek={x => { const el = v.current; if (el) { el.currentTime = Math.max(0, Math.min(dur || 0, x)); setT(el.currentTime) } }}
      onMute={() => setMuted(m => !m)}>
      <video ref={v} preload="metadata" playsInline poster={poster} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </FilmControls>
  )
}
