import { motion } from 'framer-motion'
import { phases } from '../../data/journey'
import SectionLabel from '../ui/SectionLabel'

export default function Journey() {
  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12" id="journey">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between mb-20">
          <SectionLabel>Journey</SectionLabel>
          <motion.h2
            className="text-heading text-white max-w-sm text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            16 years of craft, leadership, and reinvention.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-10 hidden md:block" />

          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.years}
                className="md:pl-12 py-10 md:py-12 border-b border-white border-opacity-10 grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-0 w-2 h-2 rounded-full bg-white opacity-30 -translate-x-[3px] mt-1 group-hover:opacity-80 transition-opacity" />

                <div>
                  <p className="text-label text-white opacity-30 mb-1">{phase.years}</p>
                  <p className="text-overline text-white opacity-60">{phase.title}</p>
                  <p className="text-label text-white opacity-40 mt-1">{phase.company}</p>
                </div>
                <p className="text-body text-white opacity-60 leading-relaxed">
                  {phase.narrative}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
