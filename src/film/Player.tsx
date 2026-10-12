import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useClock, type Chapter } from './engine'
import { Track } from './track'
import { C, mono } from './ui'

const fmtT = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function Player({ title, chapters, render, backTo, backLabel, subtitle, audioSrc, duration = 120, length = '2 minutes' }: { audioSrc: string; duration?: number; length?: string; title: string; chapters: Chapter[]; render: (t: number) => ReactNode; backTo: string; backLabel: string; subtitle: string }) {
  const score = useMemo(() => new Track(audioSrc), [audioSrc])
  const clockRef = useRef<ReturnType<typeof useClock> | null>(null)
  const clock = useClock(duration, {
    onPlay: t => score.play(t),
    onPause: () => score.stop(),
    onSeek: t => score.seek(t, clockRef.current?.isPlaying() ?? false),
  })
  clockRef.current = clock
  const { t, playing, play, pause, seek } = clock
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const el = wrap.current; if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1920))
    ro.observe(el); setScale(el.clientWidth / 1920)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('t')
    if (q) { setStarted(true); seek(parseFloat(q)) }
  }, [seek])

  useEffect(() => () => score.stop(), [score])
  useEffect(() => { if (playing) score.drift(t) }, [t, playing, score])
  useEffect(() => { score.setMuted(muted) }, [muted, score])

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement)) { e.preventDefault(); (clockRef.current?.isPlaying() ? pause : play)() }
      if (e.code === 'ArrowRight') seek(t + 5)
      if (e.code === 'ArrowLeft') seek(t - 5)
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [t, play, pause, seek])

  const chapter = [...chapters].reverse().find(c => t >= c.at) ?? chapters[0]
  const start = () => { setStarted(true); play() }
  const full = () => { const el = wrap.current?.parentElement; if (!el) return; if (document.fullscreenElement) void document.exitFullscreen(); else void el.requestFullscreen() }

  return (
    <main id="main" className="min-h-screen" style={{ paddingTop: 'var(--header-h)' }}>
      <div className="container-site pt-8 pb-16">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <div>
            <p className="text-overline text-ink-3 mb-2">Film · {length}</p>
            <h1 className="text-display-l text-ink">{title}</h1>
            <p className="text-body text-ink-2 mt-2 max-w-2xl">{subtitle}</p>
          </div>
          <Link to={backTo} className="link text-body-sm">{backLabel}</Link>
        </div>

        <div className="relative rounded-3 overflow-hidden" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          <div ref={wrap} className="relative w-full" style={{ aspectRatio: '16 / 9', overflow: 'hidden', fontFamily: "'Geist Variable','Geist',system-ui,sans-serif", color: C.ink }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `scale(${scale})`, background: C.bg }}>
              {render(t)}
              <div style={{ position: 'absolute', right: 40, bottom: 24, fontFamily: mono, fontSize: 18, letterSpacing: '0.14em', color: C.mute, padding: '6px 14px', borderRadius: 20, background: 'rgba(15,16,19,0.78)' }}>{chapter.label.toUpperCase()}</div>
            </div>
            {!started && (
              <button onClick={start} aria-label="Play the film with sound" className="absolute inset-0 grid place-items-center cursor-pointer" style={{ background: 'rgba(15,16,19,0.78)' }}>
                <span className="flex flex-col items-center gap-5">
                  <span className="grid place-items-center rounded-full" style={{ width: 110, height: 110, background: C.lime }}><svg width="40" height="40" viewBox="0 0 24 24" fill={C.bg}><path d="M8 5v14l11-7z" /></svg></span>
                  <span style={{ color: C.ink, fontSize: 22, fontWeight: 300 }}>Play the film · sound on</span>
                </span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 px-4 py-3" style={{ background: C.panel, borderTop: `1px solid ${C.line}` }}>
            <button onClick={() => (playing ? pause() : started ? play() : start())} aria-label={playing ? 'Pause' : 'Play'} className="btn-reset grid place-items-center rounded-full" style={{ width: 40, height: 40, background: C.lime, color: C.bg }}>
              {playing ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.mute, minWidth: 84 }}>{fmtT(t)} / {fmtT(duration)}</span>
            <div className="relative order-last md:order-none basis-full md:basis-0 flex-1" style={{ height: 28 }}>
              <input type="range" min={0} max={duration} step={0.1} value={t} onChange={e => seek(parseFloat(e.target.value))} aria-label="Seek" className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded" style={{ background: C.line }}>
                <div className="h-full rounded" style={{ width: `${(t / duration) * 100}%`, background: C.lime }} />
                {chapters.map(c => <span key={c.at} title={c.label} className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3" style={{ left: `${(c.at / duration) * 100}%`, background: C.mute }} />)}
              </div>
            </div>
            <span className="hidden md:block" style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', color: C.mute, minWidth: 190 }}>{chapter.label.toUpperCase()}</span>
            <button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} className="btn-reset" style={{ color: C.ink, fontSize: 13, fontFamily: mono }}>{muted ? 'SOUND OFF' : 'SOUND ON'}</button>
            <button onClick={full} aria-label="Fullscreen" className="btn-reset" style={{ color: C.ink, fontSize: 13, fontFamily: mono }}>FULL</button>
          </div>
        </div>
        <ol className="grid grid-cols-2 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] gap-2 mt-4" style={{ ['--n' as string]: chapters.length }}>
          {chapters.map(c => (
            <li key={c.at}><button onClick={() => { if (!started) setStarted(true); seek(c.at); if (!playing) play() }} className="w-full text-left rounded-2 px-3 py-2 text-caption" style={{ background: chapter.at === c.at ? 'rgb(var(--ink-rgb) / 0.08)' : 'transparent', border: '1px solid var(--line-1)', color: 'var(--ink-2)' }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--ink-3)' }}>{fmtT(c.at)}</span><br />{c.label}
            </button></li>
          ))}
        </ol>
      </div>
    </main>
  )
}
