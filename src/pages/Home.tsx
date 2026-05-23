import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import GrainOverlay from '../components/ui/GrainOverlay'

const pages = [
  {
    to: '/craft',
    label: 'Craft',
    description: 'Case studies in agentic AI, conversational design, enterprise search, and large-scale service design.',
    stat: '4 projects',
    tags: ['Agentic AI', 'Conversational UX', 'Design Systems'],
  },
  {
    to: '/leadership',
    label: 'Leadership',
    description: 'How design becomes a leadership practice — philosophy, career arc, and design operations at enterprise scale.',
    stat: '16 years',
    tags: ['Dual Fluency', 'Studio Operations', 'Mentorship'],
  },
  {
    to: '/reflections',
    label: 'Reflections',
    description: 'Writing, talks, workshops, and community — the ideas worth sharing and the events worth attending.',
    stat: '10+ talks',
    tags: ['Articles', 'Workshops', 'Community'],
  },
  {
    to: '/philosophy',
    label: 'Philosophy',
    description: 'First principles for designing intelligence — what AI-native design demands, and what it makes possible.',
    stat: '4 principles',
    tags: ['AI-Native', 'Vision', 'Intent Design'],
  },
]

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactSnapshot />

      {/* Navigation cards */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            className="text-overline text-white opacity-40 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore
          </motion.p>

          <div className="space-y-0">
            {pages.map((page, i) => (
              <motion.div
                key={page.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={page.to}
                  className="group flex items-start justify-between py-10 md:py-12 border-t border-white border-opacity-10 hover:border-opacity-20 transition-colors"
                >
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-baseline gap-6 mb-4">
                      <h2 className="text-display-l text-white group-hover:opacity-80 transition-opacity">
                        {page.label}
                      </h2>
                      <span className="text-label text-white opacity-25 hidden md:block">{page.stat}</span>
                    </div>
                    <p className="text-body text-white opacity-50 max-w-lg">{page.description}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {page.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-label text-white opacity-30 border border-white border-opacity-15 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-8 mt-2 text-white opacity-25 group-hover:opacity-80 group-hover:translate-x-2 transition-all duration-300 text-2xl font-thin flex-shrink-0">
                    →
                  </div>
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-white border-opacity-10" />
          </div>
        </div>
      </section>
    </>
  )
}
