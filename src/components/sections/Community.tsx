import { motion } from 'framer-motion'
import { initiatives } from '../../data/community'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

export default function Community() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden" id="community">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20">
          <SectionLabel>Community & Talks</SectionLabel>
          <motion.h2
            className="text-display-l text-white mt-4 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Building the design culture we want to work in.
          </motion.h2>
        </div>

        <div className="space-y-0">
          {initiatives.map((initiative, i) => (
            <motion.div
              key={initiative.name}
              className="py-8 md:py-10 border-b border-white border-opacity-10 grid md:grid-cols-[1fr_2fr_120px] gap-6 md:gap-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <h3 className="text-body text-white font-medium">{initiative.name}</h3>
                <p className="text-label text-white opacity-40 mt-1">{initiative.role}</p>
              </div>
              <p className="text-body text-white opacity-55">{initiative.description}</p>
              <p className="text-label text-white opacity-30 md:text-right">{initiative.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
