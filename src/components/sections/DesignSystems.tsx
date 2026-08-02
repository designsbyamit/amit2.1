import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const systems = [
  {
    name: 'GreenUX Design System',
    org: 'HPE',
    description: 'Built from ground up for Greenlake cloud suite. Tokens, components, and contribution model for a distributed global team.',
    scale: 'Enterprise · Global team',
  },
  {
    name: 'SAP AI Design Standards',
    org: 'SAP',
    description: 'Conversational design standards, agentic UX patterns, and interaction guidelines now used across SAP\'s AI product portfolio.',
    scale: 'Enterprise · Portfolio-wide',
  },
  {
    name: 'Saudia Design Language',
    org: 'Accenture',
    description: 'Unified design system for a national airline — covering web, app, kiosk, and in-flight surfaces. Delivered in 100 days.',
    scale: 'Consumer · Multi-surface',
  },
]

export default function DesignSystems() {
  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12" id="systems">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <SectionLabel>Design Systems</SectionLabel>
          <motion.h2
            className="text-display-l text-white mt-4 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Systems that scale. Craft that holds.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-10">
          {systems.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-black p-8 md:p-10 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1">
                <p className="text-label text-white opacity-30 mb-3">{s.org}</p>
                <h3 className="text-heading text-white mb-4">{s.name}</h3>
                <p className="text-body text-white opacity-55">{s.description}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white border-opacity-10">
                <p className="text-label text-white opacity-30">{s.scale}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
