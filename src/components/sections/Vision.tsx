import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import SweepLines from '../ui/SweepLines'
import GrainOverlay from '../ui/GrainOverlay'

export default function Vision() {
  return (
    <section className="relative bg-black py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel>Vision</SectionLabel>

        <motion.blockquote
          className="text-display-l text-white mt-8 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          "The next frontier of enterprise design is not making software easier to use. It's making software that understands what you're trying to accomplish — and gets out of the way."
        </motion.blockquote>

        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-overline text-white opacity-40 mb-4">On AI in Design</p>
            <p className="text-body text-white opacity-55">
              AI will not replace designers. It will raise the minimum bar of what ships — and demand that designers move upstream, closer to strategy, intent, and ethics.
            </p>
          </div>
          <div>
            <p className="text-overline text-white opacity-40 mb-4">On Enterprise UX</p>
            <p className="text-body text-white opacity-55">
              Enterprise users deserve the same quality of experience as consumers. The complexity of the domain is not an excuse. It's the invitation.
            </p>
          </div>
          <div>
            <p className="text-overline text-white opacity-40 mb-4">On Design Culture</p>
            <p className="text-body text-white opacity-55">
              The best design work happens in organizations that understand design — not just use it. Building that culture is the most important design project.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
