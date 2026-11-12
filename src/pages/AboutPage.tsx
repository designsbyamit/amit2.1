import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
// Temporary: swap for the new About portrait when supplied
const aboutImg = '/images/about/amit-hero-bw.webp'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
import { useContact } from '../components/contact/ContactProvider'
import type { ContactOptions } from '../lib/contact'
import Testimonials from '../components/sections/Testimonials'
import { colleagueTestimonials, clientTestimonials, quoteExcerpts } from '../data/testimonials'
import DriveGrid from '../components/sections/DriveGrid'


const steady = [
  { t: 'Morning runs', image: '/images/about/running.svg', alt: 'Line illustration of a morning runner', text: 'My favourite way to clear the head and occasionally outrun a few thoughts.' },
  { t: 'Indian classical music', image: '/images/about/playing.svg', alt: 'Line illustration of a musician playing an instrument', text: 'A fascination with rhythm, improvisation and the beauty of structure.' },
  { t: 'Science meets spirituality', image: '/images/about/science-behind-spirituality.svg', alt: 'Line illustration for the science behind spirituality', text: 'Curious about consciousness, philosophy and the questions that don’t always have straightforward answers.' },
]

/** How I work: four habits, each shown by something that already happened in the work. */
const habits = [
  { t: 'Stay close to the work.', d: 'On AI Search I built the prototype myself, with UI5 Web Components and six journeys, so the team could test a direction instead of debating a picture.', to: '/craft/sap-search', link: 'AI Search' },
  { t: 'Design what can ship.', d: 'Collections is a Fiori application. Every decision was made inside its fixed patterns, and the ideas that were hard to build were reshaped until they could be. Phases 1 and 2 are live.', to: '/craft/sap-collections', link: 'Collections' },
  { t: 'Write principles, not more screens.', d: 'On Engaze we stopped adding dialog flows and wrote five principles that taught the assistant how to behave. The module shipped at 90% CSAT.', to: '/craft/engaze', link: 'Engaze' },
  { t: 'Make the decision visible.', d: 'In agentic work the hard question is where a person decides. On order confirmations I designed the human-in-the-loop model with the agent: three gates where only a person can accept or reject, and every difference shown with its reasoning.', to: '/craft/sap-agentic', link: 'Agentic order confirmations' },
]

/** The career, oldest first: each stop with what it was about and the few things that mattered there. */
type Stop = { when: string; phase: string; role: string; org: string; intro: string; points: string[]; now?: boolean }
const stops: Stop[] = [
  { when: '2011 - 2014', phase: 'Early practice', role: 'Senior UX Designer', org: 'Infosys', intro: 'Building my foundations in UX across 20+ client engagements.', points: ['Ran the UX cycle end to end: interfaces, research and artefacts.', 'Learned interaction design on real client constraints.'] },
  { when: '2014 - 2015', phase: 'Founding lead', role: 'Creative UX Lead | Founding UX Lead', org: 'Photon Interactive', intro: 'The founding UX lead, creating digital experiences for e-commerce and other industries.', points: ['Built the UX capability from the start.', 'Brought research and analytics into the work.', 'Started a design culture in the team.'] },
  { when: '2015 - 2018', phase: 'Enterprise scale', role: 'Staff Product Designer', org: 'Hewlett Packard Enterprise', intro: 'Designing enterprise cloud experiences and strengthening design practices.', points: ['Led UX initiatives for the GreenLake cloud platform.', 'Contributed to the Grommet design system.', 'Set up DesignOps, design hiring and local communities of practice.'] },
  { when: '2018 - 2024', phase: 'Strategic leadership', role: 'User Experience Manager', org: 'Accenture Song', intro: 'Scaling UX capabilities, leading multidisciplinary teams and shaping complex B2B and B2C experiences.', points: ['Led the UX practice across B2B and B2C.', 'Led teams of 6 to 30 designers.', 'Founding member of the studio’s Generative AI and Conversational AI design capabilities.', 'Worked across experience strategy and product delivery.'] },
  { when: '2024 - Present', phase: 'AI-native era', role: 'Design Leader | User Experience Manager', org: 'SAP Labs', intro: 'Shaping connected enterprise experiences, exploring AI and agentic interactions, and contributing to SAP’s Suite-first direction.', points: ['AI-powered search and agentic experiences.', 'Driving design initiatives across enterprise products.', 'Leading SAP Design Hub India, a community of 250+ designers.', 'Curating Impulse India.'], now: true },
]

/** Hidden for now, kept for later: the How I work section. */
const SHOW_HOW = false

/** Colleagues, clients and a mentee, mixed. Each person appears once: the short excerpts stand in for Mayura, Stepan and Mahesh. */
const inTheirWords = [quoteExcerpts.mayura, clientTestimonials[0], colleagueTestimonials[0], colleagueTestimonials[1], clientTestimonials[1], quoteExcerpts.mahesh, colleagueTestimonials[2], clientTestimonials[2], quoteExcerpts.stepan]

type Path = { label: string; body: string; cta: string } & ({ to: string } | { open: ContactOptions })
const paths: Path[] = [
  { label: 'Leadership opportunities', body: 'Building a product organisation or looking for design leadership?', cta: 'Let’s talk', open: { topic: 'work', message: 'Role and organisation:\n\nScope of the design team:\n\nWhat success looks like in the first year:\n' } },
  { label: 'Collaborations', body: 'Have an interesting challenge around product design, enterprise UX or AI?', cta: 'Explore a collaboration', open: { topic: 'collaboration', message: 'Organisation and role:\n\nWhat we are trying to achieve:\n' } },
  { label: 'Mentorship', body: 'Working through your next career move or figuring out what’s next for your design journey?', cta: 'Let’s connect', to: '/mentoring' },
  { label: 'Speaking & workshops', body: 'Let’s exchange ideas on design leadership, AI, product thinking and the future of design.', cta: 'Invite me', open: { topic: 'speaking', message: 'Event or organisation:\n\nDate and location:\n\nAudience and format:\n' } },
  { label: 'Just saying hello', body: 'A good question, an interesting perspective or even a healthy disagreement. Always welcome.', cta: 'Say hello', open: { topic: 'other' } },
]

function AboutContact() {
  const { open } = useContact()
  return (
    <section className="section-y hairline-top" id="contact">
      <div className="container-site">
        <SectionHeader label="Start a conversation" title="Have something interesting in mind? Let’s talk." intro="I’m always interested in good ideas, thoughtful conversations and challenges worth solving." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <motion.div key={p.label} className="card flex flex-col" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}>
              <h3 className="text-title text-ink mb-4">{p.label}</h3>
              <p className="text-body-sm text-ink-2 mb-8 flex-1">{p.body}</p>
              <div>{'to' in p ? <Button variant="secondary" to={p.to}>{p.cta}</Button> : <Button variant="secondary" onClick={() => open(p.open)}>{p.cta}</Button>}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 hairline-top pt-8 mt-14">
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://linkedin.com/in/amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-ink transition-colors tap-target">LinkedIn</a>
            <a href="https://medium.com/@amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-ink transition-colors tap-target">Medium</a>
            <a href="https://adplist.org/mentors/amit-kumar-tiwari" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-ink transition-colors tap-target">ADPList</a>
            <a href="https://topmate.io/amitkrt" target="_blank" rel="noopener noreferrer" className="text-label text-ink-3 hover:text-ink transition-colors tap-target">Topmate</a>
          </div>
          <p className="text-label text-ink-3 md:ml-auto">Bengaluru, India · Open to global conversations</p>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="A little about me"
        title="I lead designers, and I stay close to the craft."
        subtitle="I’m Amit, a design leader in enterprise products, now focused on AI-native and agentic experiences. I lead teams, and I still sketch the flow, write the spec and build the prototype, because the best decisions get made close to the work."
        image={aboutImg} imagePosition="50% 28%" mono
        imageAlt="Amit Kumar Tiwari speaking at a design event"
      >
        <p className="text-body text-ink-2 max-w-2xl">Today I lead Core Design work at SAP and SAP Design Hub India, a community of 250+ designers.</p>
      </PageHeader>

      {SHOW_HOW && <section className="section-y hairline-top scroll-mt-24" id="how">
        <div className="container-site">
          <SectionHeader label="How I work" title="Four habits, each one visible in the work." />
          <ol className="grid md:grid-cols-2 gap-6 list-none p-0 m-0">
            {habits.map((h, i) => (
              <li key={h.t} className="card flex flex-col">
                <p className="text-label text-ink-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-title text-ink mt-3">{h.t}</h3>
                <p className="text-body text-ink-2 mt-3 flex-1">{h.d}</p>
                <div className="mt-6"><Button variant="secondary" to={h.to} arrow>{h.link}</Button></div>
              </li>
            ))}
          </ol>
        </div>
      </section>}

      <section className="section-y hairline-top" id="person">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-4"><p className="text-overline text-ink-3">The path here</p></div>
          <div className="col-span-4 md:col-span-7 md:col-start-6 flex flex-col gap-6">
            <h2 className="text-heading text-ink" style={{ textWrap: 'balance' }}>Trained as an engineer, grown as a designer, shaped by the business around the work.</h2>
            <p className="text-body-editorial text-ink-2">I trained in computer science and learned UX at Infosys, across 20+ client engagements. Since then I have designed enterprise cloud experiences at HPE, built Generative AI and Conversational AI design capability at Accenture Song, and now shape AI-native enterprise experiences at SAP.</p>
            <p className="text-body-editorial text-ink-2">Along the way the job moved from designing interfaces to shaping products, building teams and changing how organisations think about design. The habit stayed the same: see the real problem, the real constraint and the real user before trusting an idea.</p>
            <p className="text-body-editorial text-ink">What I care about most is the gap between a good idea and a working solution. That is where most of the craft lives.</p>
          </div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Outside the design bubble" title="Things that keep me grounded." />
          <ul className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steady.map(h => (
              <li key={h.t} className="flex flex-col gap-4">
                <figure className="relative rounded-2 overflow-hidden bg-black w-40" style={{ aspectRatio: '1 / 1' }}>
                  <img src={h.image} alt={h.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </figure>
                <h3 className="text-title text-ink">{h.t}</h3>
                <p className="text-body-sm text-ink-2 max-w-measure-m">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site relative">
          <SectionHeader label="My areas of interest" title="Different problems. One curiosity: what can we make better?" />
        </div>
        <div className="container-site relative">
          <DriveGrid />
          <p className="text-body text-ink-2 mt-10 max-w-2xl">Currently exploring these ideas through my work at SAP, Core Design, SAP Design Hub India and Impulse India.</p>
        </div>
      </section>

      <section className="section-y hairline-top" id="journey">
        <div className="container-site">
          <SectionHeader label="The journey" title="Five organisations. One thread: making design matter." />
          <ol>
            {stops.map((c, i) => (
              <motion.li key={c.when} className="grid md:grid-cols-[14rem_1fr] gap-x-6 gap-y-3"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.6, delay: i === 0 ? 0 : 0.05 }}>
                <div className="md:pr-6">
                  <p className="text-label text-ink-3">{c.when}</p>
                  <p className="text-overline text-signal-ink mt-2">{c.now ? `${c.phase} · Now` : c.phase}</p>
                </div>
                <div className="relative border-l pl-8 md:pl-10 pb-12" style={{ borderColor: i === stops.length - 1 ? 'transparent' : 'var(--line-2)' }}>
                  <span aria-hidden="true" className={`absolute -left-2 top-0.5 w-4 h-4 rounded-full border-2 ${c.now ? 'bg-signal border-signal' : 'bg-bg border-[var(--line-control)]'}`} />
                  <h3 className="text-title text-ink">{c.role}</h3>
                  <p className="text-body-sm text-ink-3 mt-1">{c.org}</p>
                  <p className="text-body text-ink-2 mt-4 max-w-2xl">{c.intro}</p>
                  <ul className="mt-4 flex flex-col gap-2 list-disc pl-5 marker:text-ink-3 max-w-2xl">{c.points.map(h => <li key={h} className="text-body-sm text-ink-2">{h}</li>)}</ul>
                </div>
              </motion.li>
            ))}
          </ol>
          <div className="mt-12">
            <a className="btn btn-ghost !px-0" href="/downloads/Amit-Kumar-Tiwari-CV.pdf" download>Download my CV</a>
          </div>
        </div>
      </section>

      <Testimonials rotate label="A little perspective from others" title="The work matters. The people matter more." intro={['Grateful for the people I’ve worked with, learned from, challenged and grown alongside.']} items={inTheirWords} />

      <AboutContact />
    </>
  )
}
