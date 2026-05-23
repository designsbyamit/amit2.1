import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

const pillars = [
  {
    title: 'Dual Fluency',
    description: 'The capacity to operate with equal confidence in design language and business language. The rarest skill in design leadership — and the most valuable.',
  },
  {
    title: 'Studio Operations',
    description: 'Leading multi-disciplinary design teams at enterprise scale. Pod models, design ops, quality culture, and cross-functional alignment.',
  },
  {
    title: 'Strategic Influence',
    description: 'Shaping product direction, organizational design, and design investment decisions at the executive level — not just delivering artifacts.',
  },
  {
    title: 'Mentorship',
    description: '25+ designers mentored across career stages. Creating the conditions for others to do the best work of their lives.',
  },
]

export default function Leadership() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <SectionLabel>Leadership Philosophy</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Design is a leadership practice.
            </motion.h2>
          </div>
          <motion.p
            className="text-body text-white opacity-60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Design leadership isn't about managing designers. It's about expanding design's influence, building trust across functions, and creating the conditions where great work can consistently happen.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-black p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-heading text-white mb-4">{p.title}</h3>
              <p className="text-body text-white opacity-55">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
