import { motion } from 'framer-motion'
import GrainOverlay from './GrainOverlay'
import SweepLines from './SweepLines'
import RevealText from './RevealText'

interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
  image?: string
  imageAlt?: string
}

export default function PageHeader({ label, title, subtitle, image, imageAlt }: PageHeaderProps) {
  if (image) {
    return (
      <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden bg-black px-6 md:px-12">
        <SweepLines />
        <GrainOverlay opacity={0.05} />

        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img
            src={image}
            alt={imageAlt || ''}
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center top',
              filter: 'grayscale(1) contrast(1.08) brightness(0.6)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #0C0C0B 0%, #0C0C0B 5%, rgba(12,12,11,0.82) 30%, rgba(12,12,11,0.2) 65%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.5) 25%, transparent 55%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full pb-20 pt-40">
          <motion.p
            className="text-overline text-white opacity-40 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.p>
          <div className="max-w-[56%]">
            <h1 className="text-display-l text-white">
              <RevealText text={title} delay={0.1} />
            </h1>
            {subtitle && (
              <motion.p
                className="text-body text-white opacity-55 mt-6 max-w-xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-40 pb-24 px-6 md:px-12 overflow-hidden">
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
        <h1 className="text-display-l text-white">
          <RevealText text={title} delay={0.1} />
        </h1>
        {subtitle && (
          <motion.p
            className="text-body text-white opacity-55 mt-6 max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
