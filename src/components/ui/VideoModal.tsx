import { useEffect, useRef } from 'react'
import { useSkinCss, Icon } from '../../film/FilmControls'

/** A dialog that plays a film. The film page is loaded in a frame in its embedded form (no site header or footer).
    Space plays or pauses from anywhere in the dialog; Escape, the close icon or a click outside closes it. */
export default function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useSkinCss()
  const closeRef = useRef<HTMLButtonElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const send = () => frameRef.current?.contentWindow?.postMessage({ type: 'film:toggle' }, window.location.origin)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.code === 'Space') { e.preventDefault(); send() }
    }
    const onMsg = (e: MessageEvent) => { if (e.origin === window.location.origin && e.data?.type === 'film:close') onClose() }
    window.addEventListener('keydown', onKey); window.addEventListener('message', onMsg)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('message', onMsg); document.body.style.overflow = prevOverflow; prev?.focus() }
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label={`${title}, film`} className="fixed inset-0 grid place-items-center p-4 md:p-8 overflow-y-auto" style={{ zIndex: 'var(--z-modal, 80)' as unknown as number, background: 'rgb(var(--black-rgb) / 0.86)' }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full" style={{ maxWidth: 'min(1180px, calc((100vh - 8rem) * 1.78))' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-label text-white/80">{title} · film</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close film (Esc)" title="Close" className="fp-close">
            {Icon.close}
          </button>
        </div>
        <div className="film-wrap rounded-3 overflow-hidden" style={{ border: '1px solid var(--line-1)', background: 'rgb(var(--black-rgb))' }}>
          <iframe ref={frameRef} src={`${src}${src.includes('?') ? '&' : '?'}embed=1`} title={`${title} film`} allow="autoplay; fullscreen" allowFullScreen className="film-frame block w-full" style={{ border: 0 }} />
        </div>
      </div>
    </div>
  )
}
