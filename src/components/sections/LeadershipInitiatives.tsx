import { motion } from 'framer-motion'
import { initiatives } from '../../data/community'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

export default function LeadershipInitiatives() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
          <div>
            <SectionLabel>Initiatives</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              What I drive beyond the brief.
            </motion.h2>
          </div>
          <motion.p
            className="text-body text-white opacity-55 self-end"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.55, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Leadership extends beyond the project. These are the communities, events, and platforms I've built or contributed to — places where design culture gets made.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.07]">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.name}
              className="bg-black p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: 'rgba(245,242,237,0.03)', transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-heading text-white">{item.name}</h3>
                <span className="text-label text-white opacity-25 shrink-0 mt-1">{item.year}</span>
              </div>
              <p
                className="text-label text-white mb-4 border border-white px-2.5 py-0.5 inline-block"
                style={{ borderColor: 'rgba(255,255,255,0.15)', opacity: 0.6 }}
              >
                {item.role}
              </p>
              <p className="text-body text-white opacity-50">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
