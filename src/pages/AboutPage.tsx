import PageHeader from '../components/ui/PageHeader'
import Contact from '../components/sections/Contact'
import GrainOverlay from '../components/ui/GrainOverlay'
import SectionLabel from '../components/ui/SectionLabel'
import { motion } from 'framer-motion'

const timeline = [
  { year: 'Aug 2024–Now', role: 'User Experience Manager', org: 'SAP', detail: 'Driving suite-first design and AI-native experiences across SAP products. Leading design community initiatives and capability building across the India hub.' },
  { year: 'Dec 2018–Aug 2024', role: 'User Experience Manager', org: 'Accenture', detail: 'Helped enterprises translate complex ideas into simple interactions through rigorous iterations of research, design, and test — across airlines, HR, telecom, and enterprise platforms.' },
  { year: 'Dec 2015–Dec 2018', role: 'User Experience Designer', org: 'Hewlett Packard Enterprise', detail: 'Designed enterprise software experiences at scale, sharpening craft in complex systems and information architecture.' },
  { year: 'Jul 2014–Nov 2015', role: 'Creative Lead (User Experience)', org: 'Photon', detail: 'Led UX for digital transformation engagements, establishing design direction across client projects.' },
  { year: '2011–2014', role: 'UX Designer', org: 'Infosys', detail: 'Built foundational fluency in enterprise design — user research, interaction design, and cross-functional collaboration.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="16+ years. One throughline."
        subtitle="Dual Fluency. AI-Native Design. Agentic Process. Three interlocking ideas — one position on where enterprise design is going and what it takes to lead it."
      />

      {/* Impact areas */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16">
            <SectionLabel>What I drive</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Impact across AI, design &amp; community.
            </motion.h2>
          </div>
          <div className="space-y-0">
            {[
              { label: '01', text: 'Driving suite-first design by crafting harmonised experiences across SAP products into scalable, connected ecosystems.' },
              { label: '02', text: 'Shaping AI-native and multi-modal experiences through experimentation, systems thinking, and value-centred innovation.' },
              { label: '03', text: 'Championing design excellence through strategic execution, customer co-creation, critiques, and high-quality delivery standards.' },
              { label: '04', text: 'Building and nurturing resilient design talent through mentoring, AI-led upskilling, and future-ready capability development.' },
              { label: '05', text: 'Leading and growing design communities through partnerships, initiatives, and events that expand the impact of design beyond designers.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="py-8 border-b border-white border-opacity-10 grid md:grid-cols-[80px_1fr] gap-6 items-start"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-label text-white opacity-20 pt-1">{item.label}</p>
                <p className="text-body text-white opacity-65">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <motion.p
              className="text-overline text-white opacity-40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Journey
            </motion.p>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="py-8 border-b border-white border-opacity-10 grid md:grid-cols-[160px_1fr] gap-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-label text-white opacity-30 pt-1">{item.year}</p>
                <div>
                  <p className="text-body text-white mb-1" style={{ fontWeight: 400 }}>{item.role} · {item.org}</p>
                  <p className="text-body text-white opacity-50">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
