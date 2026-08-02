import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'

type CursorMode = 'default' | 'project' | 'article' | 'leadership' | 'community' | 'link'

interface CursorState {
  mode: CursorMode
  label: string
}

export default function CursorDot() {
  const [visible, setVisible] = useState(false)
  const [cursor, setCursor] = useState<CursorState>({ mode: 'default', label: '' })
  const location = useLocation()

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, { stiffness: 800, damping: 35 })
  const dotY = useSpring(my, { stiffness: 800, damping: 35 })
  const ringX = useSpring(mx, { stiffness: 120, damping: 22 })
  const ringY = useSpring(my, { stiffness: 120, damping: 22 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)

      // Determine cursor mode from hovered element
      const el = e.target as Element
      const project = el.closest('[data-cursor="project"]')
      const article = el.closest('[data-cursor="article"]')
      const leadership = el.closest('[data-cursor="leadership"]')
      const community = el.closest('[data-cursor="community"]')
      const link = el.closest('a, button, [role="button"]')

      if (project) {
        const label = (project as HTMLElement).dataset.cursorLabel ?? 'View'
        setCursor({ mode: 'project', label })
      } else if (article) {
        const label = (article as HTMLElement).dataset.cursorLabel ?? 'Read'
        setCursor({ mode: 'article', label })
      } else if (leadership) {
        setCursor({ mode: 'leadership', label: 'Explore' })
      } else if (community) {
        setCursor({ mode: 'community', label: 'Join' })
      } else if (link) {
        setCursor({ mode: 'link', label: '' })
      } else {
        setCursor({ mode: 'default', label: '' })
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [visible, mx, my])

  // Reset on route change
  useEffect(() => {
    setCursor({ mode: 'default', label: '' })
  }, [location.pathname])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  const isExpanded = cursor.mode !== 'default'
  const hasLabel = cursor.label.length > 0

  return (
    <>
      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          background: 'rgba(245,242,237,0.9)',
        }}
        animate={{
          opacity: visible && !isExpanded ? 0.85 : 0,
          scale: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Expanding ring / label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hasLabel ? 'auto' : isExpanded ? 56 : 28,
          height: hasLabel ? 'auto' : isExpanded ? 56 : 28,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {hasLabel ? (
          <motion.div
            className="border border-white rounded-full px-4 py-2 whitespace-nowrap"
            style={{ background: 'rgba(12,12,11,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.75)' }}>
              {cursor.label}
            </span>
          </motion.div>
        ) : (
          <motion.div
            className="rounded-full border border-white w-full h-full"
            style={{ borderColor: 'rgba(245,242,237,0.3)' }}
            animate={{
              scale: isExpanded ? 1 : 1,
              borderColor: isExpanded ? 'rgba(245,242,237,0.5)' : 'rgba(245,242,237,0.25)',
            }}
            transition={{ duration: 0.25 }}
          />
        )}
      </motion.div>
    </>
  )
}
