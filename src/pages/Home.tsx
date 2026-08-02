import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import GrainOverlay from '../components/ui/GrainOverlay'

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactSnapshot />

      {/* About */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <div>
            <motion.p
              className="text-overline text-white opacity-40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About
            </motion.p>
          </div>
          <div>
            <motion.p
              className="text-white opacity-70 mb-6"
              style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 300, lineHeight: 1.7, letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              For 16 years I've operated at the intersection of design, business strategy, and emerging technology. My practice is built on three interlocking ideas: <strong style={{ fontWeight: 400, opacity: 1 }}>Dual Fluency</strong> — the capacity to operate equally in the language of design and the language of business; <strong style={{ fontWeight: 400 }}>AI-Native Design</strong> — rethinking what interaction means when software can reason and act; and <strong style={{ fontWeight: 400 }}>Agentic Process</strong> — designing the human-AI relationship in autonomous systems where oversight is the product.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45 mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              These aren't three separate interests. They are one position — that the next generation of enterprise design leaders must be fluent in what AI can do, clear on what it shouldn't do without human oversight, and able to translate all of it into business value. That workshop at DesignUp sold out. That thinking is in production at SAP. And it is what I bring to every room.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              In 2022 I founded SAP Design Hub India — now 250+ designers strong, one of the largest internal design communities in the SAP ecosystem — because the best design culture is one you build, not one you inherit.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Selected signals */}
      <section className="relative bg-black pb-24 md:pb-32 px-6 md:px-12">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="border-t border-white border-opacity-10 pt-16 mb-0">
            <motion.p
              className="text-overline text-white opacity-40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected signals
            </motion.p>
          </div>

          <div>
            {/* Product story */}
            <motion.div
              className="border-t border-white mt-12"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/craft/sap-search"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Product Story · SAP · 300M+ users</p>
                  <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                    The Future of Enterprise Search
                  </h3>
                  <p className="text-body text-white opacity-45 max-w-2xl">
                    Reimagining search as an intelligent orchestration layer across the SAP ecosystem — intent over keywords, trust by design, cross-product continuity.
                  </p>
                </div>
                <p className="hidden md:block text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 shrink-0">
                  Experience the story →
                </p>
              </Link>
            </motion.div>

            {/* Event */}
            <motion.div
              className="border-t border-white"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/community"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Workshop · 2023</p>
                  <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                    DesignUp — Dual Fluency Workshop
                  </h3>
                  <p className="text-body text-white opacity-45 max-w-2xl">
                    Full-day workshop on Dual Fluency — the designer&rsquo;s ability to operate equally in design language and business language. Sold out.
                  </p>
                </div>
                <p className="hidden md:block text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 shrink-0">
                  Explore community →
                </p>
              </Link>
            </motion.div>

            {/* Article */}
            <motion.div
              className="border-t border-white"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/reflections"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Essay Series · Ancient Wisdom</p>
                  <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                    How Vedic Secrets Can Disrupt Your Design Game
                  </h3>
                  <p className="text-body text-white opacity-45 max-w-2xl">
                    What ancient Indian philosophy — Nyaya Darshan, the Vedas, Vedic epistemology — has to teach modern designers about process, knowledge, and intention.
                  </p>
                </div>
                <p className="hidden md:block text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 shrink-0">
                  Read reflections →
                </p>
              </Link>
            </motion.div>

            <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          </div>
        </div>
      </section>
    </>
  )
}
