import PageHeader from '../components/ui/PageHeader'
import Contact from '../components/sections/Contact'
import GrainOverlay from '../components/ui/GrainOverlay'
import SectionLabel from '../components/ui/SectionLabel'
import Testimonials from '../components/sections/Testimonials'
import { colleagueTestimonials, menteeTestimonials } from '../data/testimonials'
import { motion } from 'framer-motion'

const timeline = [
  { year: 'Aug 2024–Now', role: 'Design Leader (User Experience Manager)', org: 'SAP Labs', detail: 'Harmonising enterprise product experience across SAP products. Evangelising the value and power of design while unifying experiences coherently across products.' },
  { year: 'Dec 2018–Jul 2024', role: 'User Experience Manager', org: 'Accenture Song', detail: 'Design leader and UX consultant across strategy, research and interaction design. Founding member of the Generative AI and Conversational AI design capabilities at the studio.' },
  { year: 'Dec 2015–Dec 2018', role: 'Staff Product Designer', org: 'Hewlett Packard Enterprise', detail: 'Drove design for a suite of cloud offerings: user-friendly interfaces for cloud platforms, coordination across internal and external teams, and guidance for new designers.' },
  { year: 'Jul 2014–Dec 2015', role: 'Creative UX Lead (Founding UX Lead)', org: 'Photon Interactive', detail: 'Designed for e-commerce clients, including research and analytics, while fostering design culture.' },
  { year: 'Jan 2011–Jul 2014', role: 'Senior UX Designer', org: 'Infosys Limited', detail: '20+ client engagements delivering simple UIs and research artefacts, across the full UX cycle.' },
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
      <section className="relative bg-black section-y px-6 md:px-12 border-t border-white border-opacity-[0.06]">
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
                <p className="text-label text-ink-3 pt-1">{item.label}</p>
                <p className="text-body text-ink-3">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative bg-black section-y px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <motion.p
              className="text-overline text-ink-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
                <p className="text-label text-ink-3 pt-1">{item.year}</p>
                <div>
                  <p className="text-body text-white mb-1" style={{ fontWeight: 400 }}>{item.role} · {item.org}</p>
                  <p className="text-body text-ink-3">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The person */}
      <section className="section-y hairline-top">
        <div className="container-site grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <p className="text-overline text-ink-3">Beyond the work</p>
          <div className="space-y-8 max-w-2xl">
            <p className="text-body-lg text-ink-2">
              I started in computer science and development, which is why I'm comfortable with the technical side of design. I then spent my career turning complicated business ideas into simple, usable products, and learning how to lead the people who build them.
            </p>
            <p className="text-body text-ink-2">
              Outside work I'm a morning runner. I listen to old melodies and Indian classical music, I meditate, and I read about the science behind spirituality. Those habits are quiet and unhurried, and I think they show up in how I design and lead.
            </p>
            <p className="text-body text-ink-3">Based in Bengaluru, India.</p>
          </div>
        </div>
      </section>

      <Testimonials label="In their words" title="Colleagues and mentees." items={[colleagueTestimonials[0], menteeTestimonials[0], menteeTestimonials[2], colleagueTestimonials[1]]} />

      <Contact />
    </>
  )
}
