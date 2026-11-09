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
  const embed = new URLSearchParams(window.location.search).get('embed') === '1'
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
  /* A phone pauses the page when it is hidden or locked: stop the clock too, so the picture does not run ahead of the score. */
  useEffect(() => {
    const v = () => { if (document.hidden) clockRef.current?.pause() }
    document.addEventListener('visibilitychange', v); return () => document.removeEventListener('visibilitychange', v)
  }, [])
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
    <main id="main" className={embed ? '' : 'min-h-screen'} style={embed ? undefined : { paddingTop: 'var(--header-h)' }}>
      <div className={embed ? '' : 'container-site pt-8 pb-16'}>
        <div className={`flex items-end justify-between gap-6 mb-6 flex-wrap${embed ? ' hidden' : ''}`}>
          <div>
            <p className="text-overline text-ink-3 mb-2">Film · {length}</p>
            <h1 className="text-display-l text-ink">{title}</h1>
            <p className="text-body text-ink-2 mt-2 max-w-2xl">{subtitle}</p>
          </div>
          <Link to={backTo} className="link text-body-sm">{backLabel}</Link>
        </div>

        <div className={`relative overflow-hidden${embed ? '' : ' rounded-3'}`} style={{ background: C.bg, border: embed ? 0 : `1px solid ${C.line}` }}>
          <div ref={wrap} className="relative w-full" style={{ aspectRatio: '16 / 9', overflow: 'hidden', fontFamily: "'Geist Variable','Geist',system-ui,sans-serif", color: C.ink }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `scale(${scale})`, background: C.bg }}>
              {render(t)}
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

          <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 px-4 py-3" style={{ background: C.panel, boxShadow: `inset 0 1px 0 ${C.line}` }}>
            <button onClick={() => (playing ? pause() : started ? play() : start())} aria-label={playing ? 'Pause' : 'Play'} className="btn-reset grid place-items-center rounded-full" style={{ width: 40, height: 40, background: C.lime, color: C.bg }}>
              {playing ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.mute, minWidth: 84 }}>{fmtT(t)} / {fmtT(duration)}</span>
            <div className="relative order-last md:order-none basis-full md:basis-0 flex-1" style={{ height: 28 }}>
              <input type="range" min={0} max={duration} step={0.1} value={t} onChange={e => seek(parseFloat(e.target.value))} aria-label="Seek" className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded" style={{ height: 2, background: C.line }}>
                <div className="h-full rounded" style={{ width: `${(t / duration) * 100}%`, background: C.lime }} />
              </div>
            </div>
            <button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} className="btn-reset grid place-items-center ml-auto md:ml-0" style={{ color: C.ink, width: 32, height: 32 }}>
              {muted
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" /><path d="M15.5 9a4 4 0 010 6M18 6.5a8 8 0 010 11" /></svg>}
            </button>
            <button onClick={full} aria-label="Fullscreen" className="btn-reset grid place-items-center" style={{ color: C.ink, width: 32, height: 32 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            </button>
          </div>
        </div>
        <ol className={`${embed ? "hidden" : "grid"} grid-cols-2 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] gap-2 mt-4`} style={{ ['--n' as string]: chapters.length }}>
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
