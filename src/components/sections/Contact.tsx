import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'
import SweepLines from '../ui/SweepLines'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText('amitkrt@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative bg-black py-32 md:py-48 px-6 md:px-12 overflow-hidden" id="contact">
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's think together.
            </motion.h2>
          </div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-body text-white opacity-60">
              Open to conversations about AI-native design, enterprise UX strategy, design leadership, and community building. If your work involves any of these — reach out.
            </p>

            <div className="space-y-4">
              <button
                onClick={copyEmail}
                className="w-full md:w-auto text-label text-white border border-white border-opacity-30 px-8 py-4 hover:border-opacity-80 hover:bg-white hover:bg-opacity-5 transition-all duration-300 flex items-center gap-3"
              >
                <span>amitkrt@gmail.com</span>
                <span className="opacity-50 text-xs">{copied ? '✓ Copied' : 'Copy'}</span>
              </button>

              <div className="flex items-center gap-6 pt-2">
                <a
                  href="https://linkedin.com/in/amitkrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-white opacity-40 hover:opacity-100 transition-opacity"
                >
                  LinkedIn
                </a>
                <a
                  href="https://medium.com/@amitkrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-white opacity-40 hover:opacity-100 transition-opacity"
                >
                  Medium
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white border-opacity-10">
              <p className="text-label text-white opacity-30">Based in Bangalore, India</p>
              <p className="text-label text-white opacity-20 mt-1">Available for global conversations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
