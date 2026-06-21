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
              className="text-white opacity-70 mb-5"
              style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 300, lineHeight: 1.7, letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              With over 16 years in experience design, Amit has shaped design for 50+ global brands across startups and large enterprises. His work spans enterprise platforms, multi-modal and omni-channel systems, AI-native experiences, and emerging design capabilities.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45 mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              As a design leader at SAP, he contributes to the &ldquo;Suite-first&rdquo; mission by harmonising experiences across products.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              Beyond product design, he has led high-performing design teams and actively contributed to the design community through workshops, conferences, and industry summits. His current explorations focus on AI-human collaboration, and the evolving maturity of enterprise experience in the age of intelligent systems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Recent Milestones */}
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
              Recent Milestones
            </motion.p>
          </div>

          <div>
            {/* Event */}
            <motion.div
              className="border-t border-white mt-12"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/community"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Event · 2023</p>
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
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/reflections"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Article · Leadership</p>
                  <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                    The Designer Who Speaks Two Languages
                  </h3>
                  <p className="text-body text-white opacity-45 max-w-2xl">
                    Dual Fluency is not about code or Figma shortcuts. It&rsquo;s about understanding what a CFO worries about, what a product manager is accountable for, and why an engineer pushes back.
                  </p>
                </div>
                <p className="hidden md:block text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 shrink-0">
                  Read reflections →
                </p>
              </Link>
            </motion.div>

            {/* Case study */}
            <motion.div
              className="border-t border-white"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/craft"
                className="group flex items-center justify-between py-10 md:py-12 hover:bg-white hover:bg-opacity-[0.02] transition-colors duration-300 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex-1 pr-8 md:pr-20">
                  <p className="text-label text-white opacity-25 mb-4">Case Study · 01</p>
                  <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                    Engaze: Gen AI-Powered Workplace Bestie
                  </h3>
                  <p className="text-body text-white opacity-45 max-w-2xl">
                    Simplifying employee interactions — check leave balances, get approvals, understand benefits — just ask. 90% CSAT.
                  </p>
                </div>
                <p className="hidden md:block text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300 shrink-0">
                  View case studies →
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
