import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'
import SweepLines from '../ui/SweepLines'

const principles = [
  {
    number: '01',
    title: 'Intent over instruction',
    body: 'AI systems respond to what users mean, not just what they type. Designing for intent requires understanding the full context of a task — the goals, constraints, and decision states behind each request.',
  },
  {
    number: '02',
    title: 'Graceful uncertainty',
    body: 'AI does not always know. Design must communicate confidence levels, surface when the system is guessing, and provide dignified paths for correction without breaking the user\'s trust.',
  },
  {
    number: '03',
    title: 'Human-AI collaboration',
    body: 'The best AI interfaces don\'t try to replace human judgment — they amplify it. Design the handoff between autonomous action and human review as a first-class interaction pattern.',
  },
  {
    number: '04',
    title: 'Explainability by design',
    body: 'Enterprise users need to understand why. Every AI-driven recommendation, automation, or exception surfaces deserves a rationale that users can inspect, challenge, and override.',
  },
]

export default function AINativeDesign() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden" id="ai">
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <div>
            <SectionLabel>AI-Native Design</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Designing intelligence, not just interfaces.
            </motion.h2>
          </div>
          <motion.p
            className="text-body text-white opacity-60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            AI-native design is not about adding AI to existing flows. It requires rethinking what interaction means when software can reason, anticipate, and act on behalf of users.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-10">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              className="bg-black p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-label text-white opacity-20 mb-4">{p.number}</p>
              <h3 className="text-heading text-white mb-4">{p.title}</h3>
              <p className="text-body text-white opacity-55">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
