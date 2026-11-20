import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

/* One player skin for every film and video on the site: controls float over the picture, hide while it plays,
   and come back on any movement, focus or pause. Standard icons only. */

const fmt = (s: number) => { const v = Math.max(0, Math.floor(s)); return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}` }

const I = {
  play: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z" fill="currentColor" /></svg>,
  pause: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /></svg>,
  vol: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></svg>,
  mute: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" /><path d="m16 9 6 6M22 9l-6 6" /></svg>,
  full: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>,
  exit: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" /></svg>,
  close: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>,
}
export const Icon = I

const CSS = `
.fp{position:relative;overflow:hidden;background:#000;outline:none;-webkit-tap-highlight-color:transparent}
.fp:fullscreen{display:grid;place-items:center;width:100vw;height:100vh}
.fp:fullscreen .fp-stage{width:min(100vw,calc(100vh*16/9))}
.fp-stage{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden}
.fp.fp-idle{cursor:none}
.fp-hit{position:absolute;inset:0;z-index:2;cursor:pointer}
.fp-ui{position:absolute;left:0;right:0;bottom:0;z-index:4;padding:56px clamp(12px,2vw,24px) clamp(8px,1.4vw,16px);background:linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,.28) 55%,rgba(0,0,0,0));transition:opacity .35s cubic-bezier(.2,.8,.2,1),transform .35s cubic-bezier(.2,.8,.2,1);color:#fff;font-family:'Geist Variable','Geist',system-ui,sans-serif}
.fp-idle .fp-ui{opacity:0;transform:translateY(8px);pointer-events:none}
.fp-row{display:flex;align-items:center;gap:clamp(2px,.6vw,8px)}
.fp-btn{all:unset;box-sizing:border-box;display:grid;place-items:center;width:40px;height:40px;border-radius:999px;color:#fff;cursor:pointer;transition:background .2s,transform .15s}
.fp-btn svg{width:22px;height:22px}
.fp-btn:hover{background:rgba(255,255,255,.12)}
.fp-btn:active{transform:scale(.92)}
.fp-btn:focus-visible{box-shadow:0 0 0 2px #7D98FF}
.fp-time{font-family:'Geist Mono Variable','Geist Mono',ui-monospace,monospace;font-size:13px;letter-spacing:.02em;color:rgba(255,255,255,.92);font-variant-numeric:tabular-nums;margin-left:6px;white-space:nowrap}
.fp-time span{color:rgba(255,255,255,.55)}
.fp-chap{flex:1;min-width:0;text-align:right;font-size:13px;color:rgba(255,255,255,.62);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:6px}
.fp-bar{position:relative;height:18px;margin:0 6px 4px;cursor:pointer;touch-action:none}
.fp-track{position:absolute;left:0;right:0;top:50%;height:3px;transform:translateY(-50%);transition:height .18s}
.fp-bar:hover .fp-track,.fp-bar.fp-drag .fp-track{height:5px}
.fp-seg{position:absolute;top:0;bottom:0;border-radius:3px;background:rgba(255,255,255,.24);overflow:hidden}
.fp-seg i{position:absolute;left:0;top:0;bottom:0;background:#fff}
.fp-hover{position:absolute;top:0;bottom:0;background:rgba(255,255,255,.22);border-radius:3px;pointer-events:none}
.fp-knob{position:absolute;top:50%;width:13px;height:13px;margin:-6.5px 0 0 -6.5px;border-radius:50%;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.45);transform:scale(0);transition:transform .18s}
.fp-bar:hover .fp-knob,.fp-bar.fp-drag .fp-knob,.fp-bar:focus-visible .fp-knob{transform:scale(1)}
.fp-bar:focus-visible{outline:none}
.fp-bar:focus-visible .fp-track{box-shadow:0 0 0 2px #7D98FF;border-radius:3px}
.fp-tip{position:absolute;bottom:22px;transform:translateX(-50%);padding:5px 9px;border-radius:7px;background:rgba(20,21,24,.92);color:#fff;font-size:12px;white-space:nowrap;pointer-events:none;box-shadow:0 4px 18px rgba(0,0,0,.35)}
.fp-tip b{font-family:'Geist Mono Variable','Geist Mono',ui-monospace,monospace;font-weight:500;margin-right:6px}
.fp-start{all:unset;position:absolute;inset:0;z-index:5;display:grid;place-items:center;cursor:pointer;background:rgba(10,11,13,.5)}
.fp-start-in{display:flex;flex-direction:column;align-items:center;gap:14px;color:#fff}
.fp-big{display:grid;place-items:center;width:clamp(56px,7vw,88px);height:clamp(56px,7vw,88px);border-radius:50%;background:rgba(255,255,255,.95);color:#0F1013;box-shadow:0 10px 40px rgba(0,0,0,.4);transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.fp-big svg{width:42%;height:42%;margin-left:6%}
.fp-start:hover .fp-big{transform:scale(1.06)}
.fp-start:focus-visible .fp-big{box-shadow:0 0 0 3px #7D98FF,0 10px 40px rgba(0,0,0,.4)}
.fp-cap{font-family:'Geist Mono Variable','Geist Mono',ui-monospace,monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.fp-flash{position:absolute;left:50%;top:50%;z-index:3;width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.45);color:#fff;pointer-events:none;animation:fp-flash .6s ease-out forwards}
.fp-flash svg{width:30px;height:30px}
@keyframes fp-flash{0%{opacity:1;transform:scale(.85)}100%{opacity:0;transform:scale(1.25)}}
.fp-close{all:unset;box-sizing:border-box;display:grid;place-items:center;width:40px;height:40px;border-radius:999px;color:rgba(255,255,255,.9);background:rgba(255,255,255,.08);cursor:pointer;transition:background .2s,transform .15s}
.fp-close svg{width:22px;height:22px}
.fp-close:hover{background:rgba(255,255,255,.18)}
.fp-close:active{transform:scale(.94)}
.fp-close:focus-visible{box-shadow:0 0 0 2px #7D98FF}
@media (max-width:640px){.fp-chap{display:none}.fp-btn{width:36px;height:36px}.fp-btn svg{width:20px;height:20px}.fp-time{font-size:12px}.fp-ui{padding-top:40px}}
@media (prefers-reduced-motion:reduce){.fp-ui,.fp-track,.fp-knob,.fp-big,.fp-btn{transition:none}.fp-flash{display:none}}
`
let injected = false
export function useSkinCss() {
  useEffect(() => {
    if (injected || typeof document === 'undefined') return
    const s = document.createElement('style'); s.dataset.fp = ''; s.textContent = CSS; document.head.appendChild(s); injected = true
  }, [])
}

export type Chap = { at: number; label: string }
type Props = {
  t: number; duration: number; playing: boolean; started: boolean; muted: boolean
  chapters?: Chap[]; startLabel?: string
  onToggle: () => void; onStart: () => void; onSeek: (t: number) => void; onMute: () => void
  children: ReactNode; label: string; rootRef?: RefObject<HTMLDivElement | null>
  /** 'page': Space works anywhere (film pages). 'inview': only once played and while half the player is on screen. */
  keys?: 'page' | 'inview'
}

/** The skin. It owns idle-hiding, scrubbing, fullscreen and keyboard (Space or K, arrows, M, F). */
export default function FilmControls({ t, duration, playing, started, muted, chapters = [], startLabel = 'Sound on', onToggle, onStart, onSeek, onMute, children, label, rootRef, keys = 'page' }: Props) {
  useSkinCss()
  const own = useRef<HTMLDivElement>(null)
  const root = rootRef ?? own
  const bar = useRef<HTMLDivElement>(null)
  const [idle, setIdle] = useState(false)
  const [hoverX, setHoverX] = useState<number | null>(null)
  const [drag, setDrag] = useState(false)
  const [isFull, setIsFull] = useState(false)
  const [flash, setFlash] = useState<{ k: number; play: boolean } | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const inView = useRef(keys === 'page')
  useEffect(() => {
    if (keys === 'page' || !root.current) return
    const io = new IntersectionObserver(([e]) => { inView.current = e.intersectionRatio >= 0.5 }, { threshold: [0, 0.5, 1] })
    io.observe(root.current); return () => io.disconnect()
  }, [keys, root])

  const wake = useCallback(() => {
    setIdle(false); window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setIdle(true), 2400)
  }, [])
  useEffect(() => { if (!playing) { window.clearTimeout(timer.current); setIdle(false) } else wake() }, [playing, wake])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    const f = () => setIsFull(document.fullscreenElement === root.current)
    document.addEventListener('fullscreenchange', f); return () => document.removeEventListener('fullscreenchange', f)
  }, [root])
  const full = useCallback(() => {
    const el = root.current; if (!el) return
    if (document.fullscreenElement) void document.exitFullscreen(); else void el.requestFullscreen?.()
  }, [root])

  const toggle = useCallback(() => {
    if (!started) { onStart(); return }
    setFlash({ k: Date.now(), play: !playing }); onToggle(); wake()
  }, [started, playing, onStart, onToggle, wake])

  /* Space anywhere on the page plays or pauses, unless the person is typing or on another control. */
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      const inside = !!(el && root.current?.contains(el))
      if (!inside && keys === 'inview' && !(started && inView.current)) return
      const onOtherControl = !inside && !!el?.closest?.('button, a, [role="button"]')
      if (e.code === 'Space' || (inside && e.key.toLowerCase() === 'k')) { if (onOtherControl) return; e.preventDefault(); toggle(); return }
      if (!started || onOtherControl) return
      if (e.code === 'ArrowRight') { e.preventDefault(); onSeek(Math.min(duration, t + 5)); wake() }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); onSeek(Math.max(0, t - 5)); wake() }
      else if (e.key.toLowerCase() === 'm') { onMute(); wake() }
      else if (e.key.toLowerCase() === 'f') full()
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [toggle, started, t, duration, onSeek, onMute, full, wake, root, keys])

  const at = (clientX: number) => { const r = bar.current!.getBoundingClientRect(); return Math.min(1, Math.max(0, (clientX - r.left) / r.width)) }
  const down = (e: React.PointerEvent) => {
    e.preventDefault(); (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(true)
    if (!started) onStart()
    onSeek(at(e.clientX) * duration)
  }
  const move = (e: React.PointerEvent) => { setHoverX(at(e.clientX)); if (drag) onSeek(at(e.clientX) * duration); wake() }
  const up = () => setDrag(false)

  const p = duration ? Math.min(1, t / duration) : 0
  const bounds = [...chapters.map(c => c.at / duration).filter(x => x > 0 && x < 1), 1]
  const segs = bounds.map((b, i) => [i === 0 ? 0 : bounds[i - 1], b])
  const chapterAt = (x: number) => [...chapters].reverse().find(c => x * duration >= c.at)?.label
  const now = chapterAt(p)

  return (
    <div ref={root} className={`fp${idle && started ? ' fp-idle' : ''}`} tabIndex={-1} aria-label={label} role="region" onPointerMove={wake} onFocus={wake}>
      <div className="fp-stage">
        {children}
        {started && <div className="fp-hit" onClick={toggle} onDoubleClick={full} aria-hidden="true" />}
        {flash && <span key={flash.k} className="fp-flash" aria-hidden="true">{flash.play ? I.play : I.pause}</span>}
        {!started && (
          <button type="button" className="fp-start" onClick={onStart} aria-label={`Play ${label}`}>
            <span className="fp-start-in"><span className="fp-big">{I.play}</span><span className="fp-cap">{startLabel}</span></span>
          </button>
        )}
        <div className="fp-ui" style={started ? undefined : { opacity: 0, pointerEvents: 'none' }}>
          <div ref={bar} className={`fp-bar${drag ? ' fp-drag' : ''}`} role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(t)} aria-valuetext={`${fmt(t)} of ${fmt(duration)}`}
            onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={() => { if (!drag) setHoverX(null) }}>
            <div className="fp-track">
              {segs.map(([a, b], i) => (
                <div key={i} className="fp-seg" style={{ left: `calc(${a * 100}% + ${i ? 2 : 0}px)`, width: `calc(${(b - a) * 100}% - ${i ? 2 : 0}px)` }}>
                  {hoverX !== null && hoverX > a && <span className="fp-hover" style={{ left: 0, width: `${Math.min(1, (hoverX - a) / (b - a)) * 100}%` }} />}
                  <i style={{ width: `${Math.max(0, Math.min(1, (p - a) / (b - a))) * 100}%` }} />
                </div>
              ))}
            </div>
            <span className="fp-knob" style={{ left: `${p * 100}%` }} />
            {hoverX !== null && <span className="fp-tip" style={{ left: `clamp(48px, ${hoverX * 100}%, calc(100% - 48px))` }}><b>{fmt(hoverX * duration)}</b>{chapterAt(hoverX) ?? ''}</span>}
          </div>
          <div className="fp-row">
            <button type="button" className="fp-btn" onClick={toggle} aria-label={playing ? 'Pause (Space)' : 'Play (Space)'}>{playing ? I.pause : I.play}</button>
            <button type="button" className="fp-btn" onClick={onMute} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>{muted ? I.mute : I.vol}</button>
            <span className="fp-time">{fmt(t)} <span>/ {fmt(duration)}</span></span>
            <span className="fp-chap">{now ?? ''}</span>
            <button type="button" className="fp-btn" onClick={full} aria-label={isFull ? 'Exit full screen' : 'Full screen'} style={now ? undefined : { marginLeft: 'auto' }}>{isFull ? I.exit : I.full}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
