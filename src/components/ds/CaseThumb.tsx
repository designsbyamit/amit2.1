import { useEffect, useRef, useState } from 'react'
import AnimThumb from './AnimThumb'
import { thumbs } from '../../data/thumbs'

const B = import.meta.env.BASE_URL

/** The cover for a project: a finished still image, always shown first.
 *  While the link around it is hovered or keyboard-focused, a short animated preview of the prototype fades in over it;
 *  when interaction ends the preview fades out and is removed, so the cover is restored and nothing runs at rest.
 *  Reduced-motion visitors and touch devices keep the still cover. */
export default function CaseThumb({ id, className = '', ratio = '1800 / 1000', compact = false, flush = false }: { id: string; className?: string; ratio?: string; compact?: boolean; /** No corner radius of its own: the parent card clips it. */ flush?: boolean }) {
  const t = thumbs[id]
  const root = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => {
    const host = root.current?.closest('a')
    if (!host || !t) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = () => { if (reduce.matches) return; window.clearTimeout(timer.current); setMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true))) }
    const stop = () => { setShown(false); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setMounted(false), 600) }
    const enter = (e: PointerEvent) => { if (e.pointerType !== 'touch') start() }
    const leave = (e: PointerEvent) => { if (e.pointerType !== 'touch') stop() }
    const focus = () => { if (host.matches(':focus-visible')) start() }
    host.addEventListener('pointerenter', enter); host.addEventListener('pointerleave', leave)
    host.addEventListener('focus', focus); host.addEventListener('blur', stop)
    return () => { host.removeEventListener('pointerenter', enter); host.removeEventListener('pointerleave', leave); host.removeEventListener('focus', focus); host.removeEventListener('blur', stop); window.clearTimeout(timer.current) }
  }, [t])

  if (!t) return null
  const src = `${B}images/covers/${id}`
  return (
    <div ref={root} className={`thumb relative overflow-hidden bg-[#0b0d12] ${className}`} style={{ aspectRatio: ratio, borderRadius: flush ? 0 : compact ? 10 : 20 }} aria-hidden="true">
      <img src={`${src}-1600.webp`} srcSet={`${src}-640.webp 640w, ${src}-1600.webp 1600w`} sizes={compact ? '320px' : '(min-width: 768px) 58vw, 100vw'}
        alt="" width={1800} height={1000} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      {mounted && (
        <div className="absolute inset-0 transition-opacity duration-500 ease-out" style={{ opacity: shown ? 1 : 0 }}>
          <AnimThumb id={t.loop} />
          {!compact && <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-[#C8F55A]" />Preview</span>}
        </div>
      )}
    </div>
  )
}
