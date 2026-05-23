import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const resources = [
  {
    type: 'Framework',
    title: 'Dual Fluency Model',
    description: 'A framework for designers who want to operate at the intersection of design, business, and technology. Maps the competencies, language, and mindset shifts required.',
    cta: 'Download PDF',
    href: 'https://medium.com/@amitkrt',
  },
  {
    type: 'Methodology',
    title: 'Agentic UX Pattern Library',
    description: 'A working vocabulary for designing AI agents — decision topologies, exception surfaces, human-override patterns, and trust calibration across automation levels.',
    cta: 'Explore on Medium',
    href: 'https://medium.com/@amitkrt',
  },
  {
    type: 'Reading List',
    title: 'Design Leadership Reading List',
    description: '12 books that shaped how I think about design, leadership, and systems. Annotated with what specifically landed.',
    cta: 'View the list',
    href: 'https://medium.com/@amitkrt',
  },
]

export default function Resources() {
  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12" id="resources">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <SectionLabel>Resources</SectionLabel>
          <motion.h2
            className="text-display-l text-white mt-4 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Tools for the designers coming next.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-10">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              className="bg-black p-8 md:p-10 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-overline text-white opacity-30 mb-4">{r.type}</p>
              <h3 className="text-heading text-white mb-4">{r.title}</h3>
              <p className="text-body text-white opacity-55 flex-1">{r.description}</p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 text-label text-white opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                {r.cta} <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
