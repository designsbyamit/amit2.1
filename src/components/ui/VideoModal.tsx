import { useEffect, useRef } from 'react'

/** A dialog that plays a film. The film page is loaded in a frame in its embedded form (no site header or footer). */
export default function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; prev?.focus() }
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label={`${title}, film`} className="fixed inset-0 grid place-items-center p-4 md:p-8" style={{ zIndex: 'var(--z-modal, 80)' as unknown as number, background: 'rgb(0 0 0 / 0.78)' }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full" style={{ maxWidth: 'min(1180px, calc((100vh - 8rem) * 1.6))' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-label text-white/80">{title} · film</p>
          <button ref={closeRef} type="button" onClick={onClose} className="btn btn-secondary btn-sm">Close</button>
        </div>
        <div className="rounded-3 overflow-hidden" style={{ border: '1px solid var(--line-1)', background: '#0f1013' }}>
          <iframe src={`${src}?embed=1`} title={`${title} film`} allow="autoplay; fullscreen" allowFullScreen className="block w-full" style={{ aspectRatio: '16 / 10.1', border: 0 }} />
        </div>
      </div>
    </div>
  )
}
