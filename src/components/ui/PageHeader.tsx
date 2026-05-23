import { motion } from 'framer-motion'
import GrainOverlay from './GrainOverlay'
import SweepLines from './SweepLines'

interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-20 px-6 md:px-12 overflow-hidden">
      <GrainOverlay opacity={0.04} />
      <SweepLines />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          className="text-overline text-white opacity-40 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.p>
        <motion.h1
          className="text-display-l text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-body text-white opacity-55 mt-6 max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
