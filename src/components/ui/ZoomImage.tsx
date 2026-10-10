import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Image that opens full-size in an accessible lightbox (click / Enter / Space; Esc or click outside to close).
 * Detailed artefacts — journey maps, research boards, flows — are unreadable at column width, so they need this.
 */
export default function ZoomImage({ src, alt, className = '', style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const trigger = triggerRef.current
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prev
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="block w-full cursor-zoom-in"
        data-cursor="project"
        data-cursor-label="Enlarge"
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" className={className} style={style} />
      </button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              data-lenis-prevent
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-auto cursor-zoom-out"
              style={{ background: 'rgb(var(--bg-rgb) / 0.94)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close enlarged image"
                className="fixed top-5 right-5 md:top-8 md:right-10 btn btn-secondary btn-sm"
              >
                Close ✕
              </button>
              <img src={src} alt={alt} className="max-w-full max-h-full object-contain" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
