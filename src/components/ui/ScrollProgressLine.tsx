import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressLine() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-px origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'rgba(245,242,237,0.25)',
      }}
    />
  )
}
