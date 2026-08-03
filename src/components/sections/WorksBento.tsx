import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudies } from '../../data/work'
import GrainOverlay from '../ui/GrainOverlay'

export default function WorksBento() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden" id="work">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div>
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              className="border-t border-white"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                whileHover={{ paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: 'rgba(245,242,237,0.018)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/craft/${cs.id}`}
                  className="group block"
                >
                  {/* Mobile: image on top, text below — Desktop: side by side */}
                  <div className="flex flex-col md:flex-row md:items-stretch">

                    {/* Image — top on mobile (60vw tall), right side on desktop */}
                    {cs.image && (
                      <div
                        className="w-full md:hidden overflow-hidden"
                        style={{ height: '55vw', maxHeight: '320px' }}
                      >
                        <img
                          src={cs.image}
                          alt={cs.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          style={{ filter: 'saturate(0.25) contrast(1.05)', padding: '1rem', background: 'rgba(245,242,237,0.02)' }}
                        />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1 py-8 md:py-10 pr-0 md:pr-20 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-label text-white opacity-20">{cs.number}</span>
                        <span className="text-overline text-white opacity-35">{cs.category}</span>
                      </div>
                      <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                        {cs.title}
                      </h3>
                      <p className="text-body text-white opacity-45 mb-6 max-w-2xl">{cs.tagline}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {cs.role && (
                          <span className="text-label text-white border px-2.5 py-0.5"
                            style={{ borderColor: 'rgba(255,255,255,0.15)', opacity: 0.7 }}>
                            {cs.role}
                          </span>
                        )}
                        {cs.timeline && (
                          <span className="text-label text-white opacity-30">{cs.timeline}</span>
                        )}
                        {cs.domain && (
                          <span className="text-label text-white opacity-25">· {cs.domain}</span>
                        )}
                      </div>
                    </div>

                    {/* Image — desktop only, right side */}
                    {cs.image && (
                      <div className="hidden md:block w-1/2 shrink-0 overflow-hidden" style={{ minHeight: '280px' }}>
                        <img
                          src={cs.image}
                          alt={cs.title}
                          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          style={{ filter: 'grayscale(0.25) contrast(1.05)', minHeight: '280px', padding: '1rem' }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}

          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </section>
  )
}
