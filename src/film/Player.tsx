import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useClock, type Chapter } from './engine'
import { Track } from './track'
import { C, mono } from './ui'
import FilmControls from './FilmControls'

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
  const startedRef = useRef(false)
  startedRef.current = started
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

  /* In the case-study dialog the film runs in a frame: the dialog forwards Space, and Escape asks it to close. */
  useEffect(() => {
    if (!embed) return
    const m = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== 'film:toggle') return
      if (!startedRef.current) { setStarted(true); play() } else (clockRef.current?.isPlaying() ? pause : play)()
    }
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') window.parent.postMessage({ type: 'film:close' }, window.location.origin) }
    window.addEventListener('message', m); window.addEventListener('keydown', k)
    return () => { window.removeEventListener('message', m); window.removeEventListener('keydown', k) }
  }, [embed, play, pause])

  const chapter = [...chapters].reverse().find(c => t >= c.at) ?? chapters[0]
  const start = () => { setStarted(true); play() }

  return (
    <main id="main" className={embed ? '' : 'min-h-screen'} style={embed ? undefined : { paddingTop: 'var(--header-h)' }}>
      <div className={embed ? '' : 'container-site pt-8 pb-16'}>
        <div style={embed ? undefined : { maxWidth: 'min(100%, max(36rem, calc((100svh - var(--header-h) - 16rem) * 16 / 9)))', marginInline: 'auto' }}>
        <div className={`flex items-end justify-between gap-6 mb-6 flex-wrap${embed ? ' hidden' : ''}`}>
          <div>
            <p className="text-overline text-ink-3 mb-2">Film · {length}</p>
            <h1 className="text-display-l text-ink">{title}</h1>
            <p className="text-body text-ink-2 mt-2 max-w-2xl">{subtitle}</p>
          </div>
          <Link to={backTo} className="link text-body-sm">{backLabel}</Link>
        </div>

        <div className={embed ? '' : 'rounded-3 overflow-hidden'} style={{ border: embed ? 0 : `1px solid ${C.line}` }}>
          <FilmControls label={`${title} film`} t={t} duration={duration} playing={playing} started={started} muted={muted} chapters={chapters}
            onStart={start} onToggle={() => (playing ? pause() : play())} onSeek={x => seek(Math.max(0, Math.min(duration, x)))} onMute={() => setMuted(m => !m)}>
            <div ref={wrap} className="absolute inset-0" style={{ overflow: 'hidden', fontFamily: "'Geist Variable','Geist',system-ui,sans-serif", color: C.ink, background: C.bg }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `scale(${scale})`, background: C.bg }}>
                {render(t)}
              </div>
            </div>
          </FilmControls>
        </div>
        <ol className={`${embed ? "hidden" : "grid"} grid-cols-2 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] gap-2 mt-4`} style={{ ['--n' as string]: chapters.length }}>
          {chapters.map(c => (
            <li key={c.at}><button onClick={() => { if (!started) setStarted(true); seek(c.at); if (!playing) play() }} className="w-full text-left rounded-2 px-3 py-2 text-caption" style={{ background: chapter.at === c.at ? 'rgb(var(--ink-rgb) / 0.08)' : 'transparent', border: '1px solid var(--line-1)', color: 'var(--ink-2)' }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--ink-3)' }}>{fmtT(c.at)}</span><br />{c.label}
            </button></li>
          ))}
        </ol>
        </div>
      </div>
    </main>
  )
}
