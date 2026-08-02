import PageHeader from '../components/ui/PageHeader'
import Community from '../components/sections/Community'
import GrainOverlay from '../components/ui/GrainOverlay'
import SectionLabel from '../components/ui/SectionLabel'
import { motion } from 'framer-motion'

const events = [
  {
    name: 'UX India',
    type: 'Conference',
    year: '2019–2024',
    description: 'Speaker and panelist across multiple editions. Topics spanning AI-native UX, enterprise design leadership, and the future of designer roles.',
  },
  {
    name: 'DesignUp',
    type: 'Conference',
    year: '2022–2023',
    description: 'Invited speaker at one of India\'s leading design conferences. Spoke on conversational AI design patterns and designing for ambiguity.',
  },
  {
    name: 'SAP Design Hub Workshops',
    type: 'Workshop Series',
    year: '2020–2025',
    description: 'Led and facilitated design thinking workshops, AI literacy sessions, and capability-building sprints for designers across the SAP ecosystem.',
  },
  {
    name: 'UX2DAY',
    type: 'Initiative',
    year: '2021–present',
    description: 'Co-founded to democratize design education. Free workshops, mentoring, and resources for emerging designers across India.',
  },
]

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        label="Community"
        title="Building the design culture we want to work in."
        subtitle="Design doesn't happen in isolation. The community initiatives, events, and collaborations that extend the practice beyond organizational walls."
      />
      <Community />

      {/* Events & Workshops */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20">
            <SectionLabel>Events & Workshops</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Taking ideas outside the building.
            </motion.h2>
          </div>

          <div className="space-y-0">
            {events.map((ev, i) => (
              <motion.div
                key={ev.name}
                className="py-8 md:py-10 border-b border-white border-opacity-10 grid md:grid-cols-[1fr_2fr_120px] gap-6 md:gap-12"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <h3 className="text-body text-white font-medium">{ev.name}</h3>
                  <p className="text-label text-white opacity-40 mt-1">{ev.type}</p>
                </div>
                <p className="text-body text-white opacity-55">{ev.description}</p>
                <p className="text-label text-white opacity-30 md:text-right">{ev.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
