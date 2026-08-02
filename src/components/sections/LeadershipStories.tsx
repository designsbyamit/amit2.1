import { motion } from 'framer-motion'
import { stories } from '../../data/leadership'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

export default function LeadershipStories() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16">
          <SectionLabel>Leadership Stories</SectionLabel>
          <motion.h2
            className="text-display-l text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Real lessons, honestly told.
          </motion.h2>
        </div>

        <div>
          {stories.map((story, i) => {
            const hasContent = story.narrative.length > 0

            return (
              <motion.article
                key={story.id}
                className="border-t border-white"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start gap-0 py-14 md:py-16">
                  <div className={`flex-1 ${story.image ? 'pr-10 md:pr-20' : ''}`}>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-label text-white opacity-20">{String(i + 1).padStart(2, '0')}</span>
                      {story.year && <span className="text-overline text-white opacity-35">{story.year}</span>}
                      {story.context && <span className="text-label text-white opacity-25">· {story.context}</span>}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-white mb-8"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em' }}
                    >
                      {story.title}
                    </h3>

                    {hasContent ? (
                      <>
                        {/* Narrative */}
                        <div className="space-y-5 max-w-2xl mb-10">
                          {story.narrative.map((para, j) => (
                            <p key={j} className="text-body text-white opacity-55 leading-relaxed">{para}</p>
                          ))}
                        </div>

                        {/* Lesson */}
                        {story.lesson && (
                          <div className="border-l-2 border-white pl-5 py-1" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                            <p className="text-white opacity-70" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.6 }}>
                              "{story.lesson}"
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Cue questions — shown until the story is written */
                      <div className="max-w-2xl space-y-6">
                        <p className="text-overline text-white opacity-25 mb-2">Reflective cues</p>
                        {story.cues.map((cue, j) => (
                          <motion.div
                            key={j}
                            className="flex gap-5"
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: j * 0.1 }}
                          >
                            <span
                              className="text-white flex-shrink-0 mt-1"
                              style={{ fontSize: '0.65rem', opacity: 0.2, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', paddingTop: '2px' }}
                            >
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <p
                              className="text-white"
                              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em', opacity: 0.5, fontStyle: 'italic' }}
                            >
                              {cue}
                            </p>
                          </motion.div>
                        ))}
                        <p className="text-label text-white opacity-20 mt-8">Story being written —</p>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  {story.image && (
                    <div className="hidden md:block w-[38%] shrink-0 overflow-hidden mt-12 self-start">
                      <motion.img
                        src={story.image}
                        alt=""
                        className="w-full object-cover"
                        style={{ aspectRatio: '4/3', filter: 'grayscale(0.4) contrast(1.05) brightness(0.75)' }}
                        initial={{ opacity: 0, scale: 1.03 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </section>
  )
}
