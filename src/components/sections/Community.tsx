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
      style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}
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
                  color: 'rgb(var(--ink-rgb) / 0.06)',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </p>
            </div>
          )}
          {/* Overlay tint */}
          <div className="absolute inset-0" style={{ background: 'rgb(var(--bg-rgb) / 0.25)' }} />
          {/* Type badge */}
          <div className="absolute top-8 left-8" style={{ direction: 'ltr' }}>
            <span className="tag" >
              {initiative.type}
            </span>
          </div>
        </div>

        {/* Text panel */}
        <div className="flex flex-col justify-between p-10 md:p-14" style={{ direction: 'ltr' }}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-label text-ink-3">{String(index + 1).padStart(2, '0')}</span>
              {initiative.year && <span className="text-overline text-ink-3">{initiative.year}</span>}
            </div>

            <h3
              className="text-white mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              {initiative.name}
            </h3>
            <p className="text-overline text-ink-3 mb-8">{initiative.role}</p>

            <p className="text-body text-ink-3 mb-8 max-w-md">{initiative.description}</p>
          </div>

          {/* Expandable body */}
          <div>
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-3 text-label text-ink-3 hover:text-white transition-colors duration-200 group"
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
                  <p className="text-body text-ink-3 mt-6 max-w-md leading-relaxed">
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
    <section className="relative bg-black section-y overflow-hidden" id="community">
      <GrainOverlay opacity={0.03} />

      <div className="container-site">
        {initiatives.map((initiative, i) => (
          <InitiativeStory key={initiative.id} initiative={initiative} index={i} />
        ))}
        <div className="border-t border-white" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }} />
      </div>
    </section>
  )
}
