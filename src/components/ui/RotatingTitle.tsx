import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const titles = [
  'Experience Strategist',
  'Design Leader',
  'Career Growth Coach',
  'Product Designer',
  'Conversational AI Designer',
]

export default function RotatingTitle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % titles.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: '1.1em', verticalAlign: 'bottom' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
