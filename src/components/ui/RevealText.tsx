import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export default function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduced ? 0 : 0.08,
      },
    },
  }

  const word: Variants = {
    hidden: { y: reduced ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <motion.span
      className={`inline ${className ?? ''}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
