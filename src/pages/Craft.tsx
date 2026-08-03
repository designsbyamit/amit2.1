import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import WorksBento from '../components/sections/WorksBento'
import GrainOverlay from '../components/ui/GrainOverlay'

const microStories = [
  {
    label: 'Conversational AI · Engaze',
    heading: 'Why we stopped designing flows and started designing principles',
    body: 'In conversational AI, dialog flows only cover the happy path. The generative layer handles everything else. We recognised early that writing more flows was the wrong answer — instead, we defined five principles (trust, guidance, discoverability, cognitive simplicity, continuity) that taught the system how to behave in any situation. Those five principles outlasted every screen we designed.',
  },
  {
    label: 'Service Design · Saudia',
    heading: 'The booking app was not the product. The passenger journey was.',
    body: 'When a business wants to grow digital revenue 50-fold, every stakeholder sees a booking flow problem. Reframing it as a service ecosystem problem changed what we built. The pod structure that delivered the work was itself a design decision: when designers own journeys instead of features, they design for coherence rather than correctness.',
  },
  {
    label: 'Enterprise UX · dNetWorX',
    heading: 'Introducing progressive disclosure into a system that resisted simplification',
    body: 'Enterprise engineers had spent years learning to navigate complexity — removing it felt like a regression. Progressive disclosure was the solution: show less by default without removing anything. Expert users still had full control on demand. First-time users saw only what they needed. Nobody lost anything. Adoption followed.',
  },
  {
    label: 'Agentic AI · SAP',
    heading: 'In autonomous systems, what the agent doesn\'t show matters as much as what it does',
    body: 'The instinct in agentic AI design is to surface everything — every step, every inference, every confidence score. But information overload defeats the purpose of automation. The principle we settled on: show the outcome, surface the reasoning only when it matters, and always preserve the human\'s ability to intervene. Trust is designed, not assumed.',
  },
]

export default function Craft() {
  return (
    <>
      <PageHeader
        label="Craft"
        title="Work that matters at scale."
        subtitle="Case studies across AI experiences, conversational design, enterprise UX, and large-scale design systems."
      />

      <WorksBento />

      {/* Philosophy */}
      <section className="relative bg-black py-20 md:py-24 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <motion.p
            className="text-overline text-white opacity-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Philosophy
          </motion.p>
          <div>
            <motion.p
              className="text-white opacity-70 mb-5"
              style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 300, lineHeight: 1.7, letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              The work here is not a portfolio of deliverables. It is a record of how complex problems were approached, what tradeoffs were made, and why.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45 mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Each project is less about the screens that shipped and more about the systems they are part of — the business constraints that shaped decisions, the principles that held when the pressure mounted, and the moments where design changed how an organisation thought about a problem.
            </motion.p>
            <motion.p
              className="text-body text-white opacity-45"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              At this level of maturity, the prototype is the argument. The decision is the artefact.
            </motion.p>
          </div>
        </div>
      </section>

      <WorksBento />

      {/* Design Decisions — Micro-Stories */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="border-t border-white pt-16 mb-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <motion.p
              className="text-overline text-white opacity-40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Design Decisions
            </motion.p>
          </div>

          <div>
            {microStories.map((story, i) => (
              <motion.div
                key={i}
                className="border-t border-white mt-12"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="py-10 md:py-12 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-20">
                  <div className="pt-1">
                    <p className="text-label text-white opacity-25">{story.label}</p>
                  </div>
                  <div>
                    <h3 className="text-heading text-white mb-4">{story.heading}</h3>
                    <p className="text-body text-white opacity-45 max-w-2xl">{story.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          </div>
        </div>
      </section>
    </>
  )
}
