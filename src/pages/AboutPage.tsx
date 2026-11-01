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

type Chapter = { when: string; role: string; org: string; intro: string; highlights?: string[] }
const chapters: Chapter[] = [
  { when: 'August 2024 - Present', role: 'Design Leader | User Experience Manager', org: 'SAP Labs', intro: 'Shaping connected enterprise experiences, exploring AI and agentic interactions, and contributing to SAP’s Suite-first direction.', highlights: ['Leading SAP Design Hub India, a community of 250+ designers.', 'Driving design initiatives across enterprise products.', 'Exploring AI-powered search and agentic experiences.', 'Curating Impulse India.'] },
  { when: 'December 2018 - July 2024', role: 'User Experience Manager', org: 'Accenture Song', intro: 'Scaling UX capabilities, leading multidisciplinary teams and shaping complex B2B and B2C experiences.', highlights: ['Led teams of 6-30 designers.', 'Built Generative AI and Conversational AI design capabilities.', 'Worked across experience strategy and product delivery.'] },
  { when: 'December 2015 - December 2018', role: 'Staff Product Designer', org: 'Hewlett Packard Enterprise', intro: 'Designing enterprise cloud experiences and strengthening design practices.', highlights: ['UX initiatives for GreenLake.', 'Contributions to Grommet Design System.', 'DesignOps and design community initiatives.'] },
  { when: 'July 2014 - December 2015', role: 'Creative UX Lead | Founding UX Lead', org: 'Photon Interactive', intro: 'Building UX capabilities and creating digital experiences for e-commerce and other industries.' },
  { when: 'January 2011 - July 2014', role: 'Senior UX Designer', org: 'Infosys Limited', intro: 'Building my foundations in UX across 20+ client engagements, research and interaction design.' },
]

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
        title="I make complex things feel simple. And imagine what they could become."
        subtitle="I’m Amit, a design leader, product thinker and technology enthusiast. For 16+ years, I’ve been exploring the sweet spot between people, business and technology."
        image={aboutImg} imagePosition="50% 28%" mono
        imageAlt="Amit Kumar Tiwari speaking at a design event"
      >
        <p className="text-body text-ink-2 max-w-2xl mb-8">Currently shaping enterprise experiences, exploring AI-native products and building teams that make a difference.</p>
        <div className="flex flex-wrap gap-3">
          <Button to="/craft" arrow>Explore my work</Button>
          <a className="btn btn-secondary" href="#person">A little more about me</a>
        </div>
      </PageHeader>

      <section className="section-y hairline-top scroll-mt-24" id="person">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-4"><p className="text-overline text-ink-3">The person behind the pixels</p></div>
          <div className="col-span-4 md:col-span-7 md:col-start-6 flex flex-col gap-6">
            <h2 className="text-heading text-ink">From writing code to shaping how people experience technology.</h2>
            <p className="text-body-editorial text-ink-2">Trained in computer science, drawn to design, and eventually fascinated by the bigger picture.</p>
            <p className="text-body-editorial text-ink-2">I’ve moved from designing interfaces to shaping products, building teams and influencing how organisations think about design.</p>
            <p className="text-body-editorial text-ink-2">I enjoy connecting dots that don’t always seem connected: design and business, creativity and technology, people and systems.</p>
            <p className="text-body-editorial text-ink">Still curious. Still questioning. Still figuring things out.</p>
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
                <p className="text-body-sm text-ink-2 max-w-[40ch]">{h.text}</p>
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
          <SectionHeader label="Places, people and experiences" title="16 years. Five organisations. Many lessons." />
          <ol>
            {chapters.map(c => (
              <li key={c.when} className="hairline-top py-8 grid md:grid-cols-[14rem_1fr] gap-3 md:gap-8">
                <p className="text-label text-ink-3 pt-1">{c.when}</p>
                <div>
                  <h3 className="text-title text-ink">{c.role}</h3>
                  <p className="text-body-sm text-ink-3 mt-1">{c.org}</p>
                  <p className="text-body-sm text-ink-2 mt-4 max-w-2xl">{c.intro}</p>
                  {c.highlights && <ul className="mt-4 flex flex-col gap-2 max-w-2xl list-disc pl-5 marker:text-ink-3">{c.highlights.map(h => <li key={h} className="text-body-sm text-ink-2">{h}</li>)}</ul>}
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3 mt-10">
            <a className="btn btn-secondary" href="/downloads/Amit-Kumar-Tiwari-CV.pdf" download>Download my CV</a>
            <Button to="/leadership#journey" variant="secondary" arrow>Explore my leadership journey</Button>
          </div>
        </div>
      </section>

      <Testimonials rotate label="A little perspective from others" title="The work matters. The people matter more." intro={['Grateful for the people I’ve worked with, learned from, challenged and grown alongside.']} items={inTheirWords} />

      <AboutContact />
    </>
  )
}
