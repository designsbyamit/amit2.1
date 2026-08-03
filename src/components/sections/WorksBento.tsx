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
                initial={{ paddingLeft: 0, paddingRight: 0 }}
                whileHover={{ paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: 'rgba(245,242,237,0.018)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/craft/${cs.id}`}
                  className="group flex items-stretch py-10 md:py-12"
                >
                  {/* Text */}
                  <div className="flex-1 pr-8 md:pr-20 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-label text-white opacity-20">{cs.number}</span>
                      <span className="text-overline text-white opacity-35">{cs.category}</span>
                    </div>

                    <h3 className="text-heading text-white mb-3 group-hover:opacity-75 transition-opacity duration-300">
                      {cs.title}
                    </h3>

                    <p className="text-body text-white opacity-45 mb-7 max-w-2xl">{cs.tagline}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-7">
                      {cs.role && (
                        <span
                          className="text-label text-white border px-2.5 py-0.5"
                          style={{ borderColor: 'rgba(255,255,255,0.15)', opacity: 0.7 }}
                        >
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

                  {/* Image */}
                  {cs.image && (
                    <div className="hidden md:block w-1/2 shrink-0 overflow-hidden">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        style={{ filter: 'grayscale(0.25) contrast(1.05)', minHeight: '320px' }}
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </section>
  )
}
