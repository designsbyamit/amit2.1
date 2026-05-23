import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../../data/work'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

export default function StrategicWork() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden" id="work">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-20">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Strategic Design
            </motion.h2>
          </div>
        </div>

        <div className="space-y-0">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              className="border-t border-white border-opacity-10 cursor-pointer group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(active === cs.id ? null : cs.id)}
            >
              <div className="py-8 md:py-10 grid md:grid-cols-[80px_1fr_auto] items-center gap-6">
                <span className="text-label text-white opacity-20">{cs.number}</span>

                <div>
                  <p className="text-overline text-white opacity-40 mb-2">{cs.category}</p>
                  <h3 className="text-heading text-white group-hover:opacity-80 transition-opacity">{cs.title}</h3>
                  <p className="text-body text-white opacity-50 mt-1">{cs.tagline}</p>
                </div>

                <div className="text-white opacity-30 group-hover:opacity-80 transition-all duration-300">
                  <motion.span
                    animate={{ rotate: active === cs.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="block text-2xl font-thin"
                  >
                    +
                  </motion.span>
                </div>
              </div>

              <AnimatePresence>
                {active === cs.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 grid md:grid-cols-3 gap-8 md:gap-12 ml-0 md:ml-[calc(80px+1.5rem)]">
                      <div>
                        <p className="text-overline text-white opacity-40 mb-3">Challenge</p>
                        <p className="text-body text-white opacity-60">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-overline text-white opacity-40 mb-3">Approach</p>
                        <p className="text-body text-white opacity-60">{cs.approach}</p>
                      </div>
                      <div>
                        <p className="text-overline text-white opacity-40 mb-3">Outcome</p>
                        <p className="text-body text-white opacity-60">{cs.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-white border-opacity-10" />
        </div>
      </div>
    </section>
  )
}
