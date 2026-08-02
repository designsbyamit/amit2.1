import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorDot() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const dotX = useSpring(mx, { stiffness: 700, damping: 32 })
  const dotY = useSpring(my, { stiffness: 700, damping: 32 })
  const ringX = useSpring(mx, { stiffness: 160, damping: 26 })
  const ringY = useSpring(my, { stiffness: 160, damping: 26 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true)
      }
    }

    const leave = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter, true)
    document.addEventListener('mouseleave', leave, true)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter, true)
      document.removeEventListener('mouseleave', leave, true)
    }
  }, [visible, mx, my])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !hovering ? 0.85 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-7 h-7"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? (hovering ? 0.6 : 0.28) : 0,
          scale: hovering ? 1.65 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full rounded-full border border-white" />
      </motion.div>
    </>
  )
}
