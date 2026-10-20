import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'
import SweepLines from '../ui/SweepLines'
import Button from '../ds/Button'
import ContactForm from '../contact/ContactForm'
import { useContact } from '../contact/ContactProvider'
import type { ContactOptions } from '../../lib/contact'

const EMAIL = 'uxbyamit@gmail.com'
const paths: readonly ({ id: string; label: string; body: string; cta: string } & ({ to: string } | { open: ContactOptions }))[] = [
  {
    id: 'work',
    label: 'Work together',
    body: 'Design leadership, AI-native product strategy, or enterprise UX challenges you want a second mind on.',
    cta: 'Write about work',
    open: { topic: 'work', message: 'Organisation and role:\n\nWhat we are trying to achieve:\n' },
  },
  {
    id: 'mentor',
    label: 'Get mentored',
    body: 'One-to-one mentoring and portfolio reviews for designers, booked directly.',
    cta: 'See mentoring',
    to: '/mentoring',
  },
  {
    id: 'speak',
    label: 'Invite me to speak',
    body: 'Talks, workshops and panels on design leadership, AI-native design and building design communities.',
    cta: 'Write about an event',
    open: { topic: 'speaking', message: 'Event or organisation:\n\nDate and location:\n\nAudience and format:\n' },
  },
]

export default function Contact({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel === 'h1' ? motion.h1 : motion.h2
  const [copied, setCopied] = useState(false)
  const { open } = useContact()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable: the address is shown on the button */ }
  }

  return (
    <section className="relative bg-black section-y px-6 md:px-12 overflow-hidden" id="contact">
      <SweepLines />
      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <SectionLabel>Contact</SectionLabel>
          <Heading
            className="text-display-l text-white mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's think together.
          </Heading>
          <p className="text-body-lg text-ink-2 mt-6">Tell me what you're after and I'll point you to the quickest way in.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {paths.map((p, i) => (
            <motion.div
              key={p.id}
              className="card flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-title text-white mb-3">{p.label}</h3>
              <p className="text-body-sm text-ink-2 mb-8 flex-1">{p.body}</p>
              {'to' in p ? <Button variant="secondary" to={p.to}>{p.cta}</Button> : <Button variant="secondary" onClick={() => open(p.open)}>{p.cta}</Button>}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-14 hairline-top pt-12" id="write">
          <div>
            <p className="text-overline text-ink-3">Or write here</p>
            <h3 className="text-heading text-white mt-4">Send a message.</h3>
            <p className="text-body text-ink-2 mt-3 max-w-sm">It reaches me directly, and I reply to the address you give.</p>
          </div>
          <ContactForm />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 hairline-top pt-8">
          <button
            onClick={copyEmail}
            className="btn btn-secondary justify-between gap-6 w-full md:w-auto normal-case tracking-normal"
            aria-label="Copy email address"
          >
            <span>{EMAIL}</span>
            <span className="text-xs text-ink-3">{copied ? '✓ Copied' : 'Copy'}</span>
          </button>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-white transition-colors tap-target">LinkedIn</a>
            <a href="https://medium.com/@amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-white transition-colors tap-target">Medium</a>
            <a href="https://adplist.org/mentors/amit-kumar-tiwari" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-white transition-colors tap-target">ADPList</a>
            <a href="https://topmate.io/amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-white transition-colors tap-target">Topmate</a>
          </div>
          <p className="text-label text-ink-3 md:ml-auto">Bengaluru, India · Available for global conversations</p>
        </div>
      </div>
    </section>
  )
}
