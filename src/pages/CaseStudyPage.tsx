import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudies } from '../data/work'
import GrainOverlay from '../components/ui/GrainOverlay'
import SweepLines from '../components/ui/SweepLines'
import RevealText from '../components/ui/RevealText'

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const currentIndex = caseStudies.findIndex(c => c.id === id)
  const prevCS = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const nextCS = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null

  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-white opacity-40 mb-6">Case study not found.</p>
          <Link to="/craft" className="text-label text-white opacity-60 hover:opacity-100 transition-opacity">
            ← Back to Craft
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black">
        <SweepLines />
        <GrainOverlay opacity={0.05} />

        {cs.image ? (
          <div className="absolute right-0 top-0 w-[45%] h-full">
            <img
              src={cs.image}
              alt={cs.title}
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center top',
                filter: 'grayscale(1) contrast(1.05) brightness(0.62)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, #0C0C0B 0%, #0C0C0B 5%, rgba(12,12,11,0.88) 32%, rgba(12,12,11,0.2) 68%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #0C0C0B 0%, rgba(12,12,11,0.5) 25%, transparent 55%)',
              }}
            />
          </div>
        ) : (
          <div
            className="absolute right-6 md:right-12 bottom-0 select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(14rem, 28vw, 26rem)',
              fontWeight: 200,
              color: 'rgba(245,242,237,0.028)',
              letterSpacing: '-0.06em',
            }}
          >
            {cs.number}
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12 pb-20 pt-40">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              to="/craft"
              className="text-label text-white opacity-35 hover:opacity-100 transition-opacity inline-flex items-center gap-2 mb-12"
            >
              ← Craft
            </Link>
          </motion.div>

          <motion.p
            className="text-overline text-white opacity-40 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {cs.category}
          </motion.p>

          <div className={cs.image ? 'max-w-[55%]' : ''}>
            <h1 className="text-display-l text-white">
              <RevealText text={cs.title} delay={0.15} />
            </h1>

            <motion.p
              className="text-body text-white opacity-55 mt-6 max-w-2xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {cs.tagline}
            </motion.p>

            {cs.stats && (
              <motion.div
                className="flex flex-wrap gap-10 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                {cs.stats.map(stat => (
                  <div key={stat.label}>
                    <p
                      className="text-white"
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                        fontWeight: 300,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-label text-white opacity-35 mt-2">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Tags */}
      {cs.tags && (
        <section className="relative bg-black px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="flex flex-wrap gap-2 py-8 border-b border-white border-opacity-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {cs.tags.map(tag => (
                <span
                  key={tag}
                  className="text-label text-white border border-white px-3 py-1"
                  style={{ opacity: 0.3, borderColor: 'rgba(255,255,255,0.12)' }}
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Challenge / Approach / Outcome */}
      <section className="relative bg-black py-24 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-10">
            {[
              { label: 'Challenge', body: cs.challenge },
              { label: 'Approach', body: cs.approach },
              { label: 'Outcome', body: cs.outcome },
            ].map((block, i) => (
              <motion.div
                key={block.label}
                className="bg-black p-10 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(245,242,237,0.025)', transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-overline text-white opacity-40 mb-5">{block.label}</p>
                <p className="text-body text-white opacity-65">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rich sections */}
      {cs.sections && cs.sections.map((section, i) => (
        <motion.section
          key={i}
          className="relative bg-black py-20 md:py-24 px-6 md:px-12 border-t border-white border-opacity-[0.06]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GrainOverlay opacity={0.02} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
              <div>
                {section.label && (
                  <p className="text-overline text-white opacity-30 mb-3">{section.label}</p>
                )}
                {section.heading && (
                  <h2 className="text-heading text-white">{section.heading}</h2>
                )}
              </div>
              <div>
                <p className="text-body text-white opacity-60 mb-10">{section.body}</p>
                {section.items && (
                  <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-10">
                    {section.items.map((item, j) => (
                      <motion.div
                        key={j}
                        className="bg-black p-8"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ backgroundColor: 'rgba(245,242,237,0.025)', transition: { duration: 0.2 } }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: j * 0.07 }}
                      >
                        <p className="text-label text-white opacity-20 mb-3">
                          {String(j + 1).padStart(2, '0')}
                        </p>
                        <p className="text-body text-white mb-2" style={{ fontWeight: 400 }}>
                          {item.title}
                        </p>
                        <p className="text-body text-white opacity-55">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Section image */}
                {section.image && (
                  <motion.div
                    className="mt-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src={section.image}
                      alt=""
                      className="w-full object-cover"
                      style={{ filter: 'grayscale(0.2) contrast(1.02)' }}
                    />
                  </motion.div>
                )}

                {/* Section image grid */}
                {section.images && section.images.length > 0 && (
                  <div className={`mt-10 grid gap-px bg-white bg-opacity-10 ${section.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    {section.images.map((img, j) => (
                      <motion.div
                        key={j}
                        className="overflow-hidden bg-black"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: j * 0.05 }}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full object-cover"
                          style={{ filter: 'grayscale(0.2) contrast(1.02)' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Images gallery */}
      {cs.images && cs.images.length > 0 && (
        <section className="relative bg-black py-20 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
          <GrainOverlay opacity={0.02} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.p
              className="text-overline text-white opacity-30 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Visual Evidence
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white bg-opacity-10">
              {cs.images.map((img, i) => (
                <motion.div
                  key={i}
                  className={`overflow-hidden bg-black ${i === 0 ? 'md:col-span-2' : ''}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full object-cover"
                    style={{ filter: 'grayscale(0.25) contrast(1.02)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prototype embed */}
      {cs.prototypeUrl && (
        <section className="relative bg-black py-20 md:py-24 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
          <GrainOverlay opacity={0.02} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-10">
              <div>
                <motion.p
                  className="text-overline text-white opacity-30 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Prototype
                </motion.p>
                <motion.h2
                  className="text-heading text-white"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  The argument in motion.
                </motion.h2>
              </div>
              <motion.p
                className="text-body text-white opacity-45 self-end"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 0.45, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                At this level of maturity, the prototype is the argument. Interact with it directly.
              </motion.p>
            </div>
            <motion.div
              className="relative w-full overflow-hidden"
              style={{ paddingBottom: '62.5%', background: 'rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <iframe
                src={cs.prototypeUrl}
                className="absolute inset-0 w-full h-full border-0"
                title={`${cs.title} prototype`}
                allowFullScreen
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Key highlights */}
      {cs.highlights && (
        <section className="relative bg-black py-20 md:py-24 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
              <div>
                <p className="text-overline text-white opacity-30 mb-3">Reflections</p>
                <h2 className="text-heading text-white">Key Learnings</h2>
              </div>
              <ul className="space-y-6">
                {cs.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <span className="text-label text-white opacity-20 flex-shrink-0 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-white opacity-60">{h}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-white border-opacity-[0.06]">
          <GrainOverlay opacity={0.04} />
          <div
            className="absolute top-8 left-6 md:left-12 select-none pointer-events-none text-white"
            style={{
              fontSize: 'clamp(8rem, 15vw, 14rem)',
              fontWeight: 200,
              color: 'rgba(245,242,237,0.04)',
              lineHeight: 0.8,
            }}
          >
            "
          </div>
          <div className="relative z-10 mx-auto max-w-7xl">
            <blockquote className="max-w-4xl">
              <motion.p
                className="text-white opacity-75"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.75, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                "{cs.testimonial.quote}"
              </motion.p>
              <motion.footer
                className="mt-10 flex items-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {cs.testimonial.avatar && (
                  <img
                    src={cs.testimonial.avatar}
                    alt={cs.testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    style={{ filter: 'grayscale(1)' }}
                  />
                )}
                <div>
                  <p className="text-body text-white">{cs.testimonial.name}</p>
                  <p className="text-label text-white opacity-35 mt-1">{cs.testimonial.title}</p>
                </div>
              </motion.footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* Next / Prev navigation */}
      {(prevCS || nextCS) && (
        <section className="relative bg-black pb-24 px-6 md:px-12">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="border-t border-white border-opacity-10 pt-16">
              <motion.p
                className="text-overline text-white opacity-30 mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                More work
              </motion.p>
              <div className={`grid gap-px bg-white bg-opacity-10 ${prevCS && nextCS ? 'md:grid-cols-2' : ''}`}>
                {prevCS && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/craft/${prevCS.id}`}
                      className="group bg-black p-8 md:p-10 block hover:bg-white hover:bg-opacity-[0.025] transition-colors"
                    >
                      <p className="text-label text-white opacity-30 mb-3">← Previous</p>
                      <p className="text-overline text-white opacity-40 mb-2">{prevCS.category}</p>
                      <h3 className="text-heading text-white group-hover:opacity-75 transition-opacity">{prevCS.title}</h3>
                    </Link>
                  </motion.div>
                )}
                {nextCS && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/craft/${nextCS.id}`}
                      className={`group bg-black p-8 md:p-10 block hover:bg-white hover:bg-opacity-[0.025] transition-colors ${!prevCS ? 'md:col-start-2' : ''}`}
                    >
                      <p className="text-label text-white opacity-30 mb-3">Next →</p>
                      <p className="text-overline text-white opacity-40 mb-2">{nextCS.category}</p>
                      <h3 className="text-heading text-white group-hover:opacity-75 transition-opacity">{nextCS.title}</h3>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
