import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initiatives } from '../../data/community'
import GrainOverlay from '../ui/GrainOverlay'

function InitiativeStory({ initiative, index }: { initiative: typeof initiatives[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.article
      className="border-t border-white"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`grid md:grid-cols-2 gap-0 ${isEven ? '' : 'md:[direction:rtl]'}`}>

        {/* Image panel — full height, no aspect ratio constraint */}
        <div
          className="relative overflow-hidden bg-white bg-opacity-[0.04]"
          style={{ direction: 'ltr', minHeight: '600px' }}
        >
          {initiative.image ? (
            <img
              src={initiative.image}
              alt={initiative.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'grayscale(0.15) contrast(1.05) brightness(0.82)',
                objectPosition: initiative.imageFocus ?? 'center center',
              }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <p
                className="text-white select-none"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.06em',
                  lineHeight: 0.85,
                  color: 'rgba(245,242,237,0.06)',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="text-overline text-white opacity-20 mt-4">Image coming soon</p>
            </div>
          )}
          {/* Overlay tint */}
          <div className="absolute inset-0" style={{ background: 'rgba(12,12,11,0.25)' }} />
          {/* Type badge */}
          <div className="absolute top-8 left-8" style={{ direction: 'ltr' }}>
            <span className="text-label text-white border border-white border-opacity-20 px-3 py-1.5" style={{ opacity: 0.7 }}>
              {initiative.type}
            </span>
          </div>
        </div>

        {/* Text panel */}
        <div className="flex flex-col justify-between p-10 md:p-14" style={{ direction: 'ltr' }}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-label text-white opacity-20">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-overline text-white opacity-35">{initiative.year}</span>
            </div>

            <h3
              className="text-white mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              {initiative.name}
            </h3>
            <p className="text-overline text-white opacity-35 mb-8">{initiative.role}</p>

            <p className="text-body text-white opacity-55 mb-8 max-w-md">{initiative.description}</p>
          </div>

          {/* Expandable body */}
          <div>
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-3 text-label text-white opacity-40 hover:opacity-80 transition-opacity duration-200 group"
            >
              <span>{open ? 'Close story ↑' : 'Read the story →'}</span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="text-body text-white opacity-60 mt-6 max-w-md leading-relaxed">
                    {initiative.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Community() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden" id="community">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 mb-16">
        <motion.p
          className="text-overline text-white opacity-40 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Community & Talks
        </motion.p>
        <motion.h2
          className="text-display-l text-white max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Building the design culture we want to work in.
        </motion.h2>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {initiatives.map((initiative, i) => (
          <InitiativeStory key={initiative.id} initiative={initiative} index={i} />
        ))}
        <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      </div>
    </section>
  )
}
