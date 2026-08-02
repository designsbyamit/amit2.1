import { motion } from 'framer-motion'

interface HighlightProps {
  children: React.ReactNode
  delay?: number
}

export default function Highlight({ children, delay = 0 }: HighlightProps) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
        style={{ transformOrigin: 'left center', opacity: 0.3 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  )
}
