import PageHeader from '../components/ui/PageHeader'
import Contact from '../components/sections/Contact'
import heroImg from '../assets/images/amit-stage.webp'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
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

const steady = [
  { t: 'Morning runs', d: 'I’m a morning runner.', icon: 'M4 18c3-1 5-4 6-8l3 2 3-5M14 5a1.5 1.5 0 1 0 0-.01' },
  { t: 'Old melodies and Indian classical music', d: 'Old melodies and Indian classical music are what I listen to.', icon: 'M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z' },
  { t: 'Meditation', d: 'I meditate.', icon: 'M12 4a2 2 0 1 0 0 .01M5 19c2-3 4-4 7-4s5 1 7 4M8 12l4 2 4-2' },
  { t: 'The science behind spirituality', d: 'I read about the science behind spirituality.', icon: 'M4 6h7v13H4zM13 6h7v13h-7M11 8h2' },
]

const drives = [
  'Driving suite-first design by crafting harmonised experiences across SAP products into scalable, connected ecosystems.',
  'Shaping AI-native and multi-modal experiences through experimentation, systems thinking, and value-centred innovation.',
  'Championing design excellence through strategic execution, customer co-creation, critiques, and high-quality delivery standards.',
  'Building and nurturing resilient design talent through mentoring, AI-led upskilling, and future-ready capability development.',
  'Leading and growing design communities through partnerships, initiatives, and events that expand the impact of design beyond designers.',
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="Hi, I’m Amit."
        subtitle="A design leader in Bengaluru who started out writing code, took on leadership roles as early as college, and has spent 16+ years turning complicated ideas into products people can use."
        image={heroImg}
        imageAlt="Amit Kumar Tiwari speaking on stage"
      />

      {/* The person first */}
      <section className="section-y hairline-top">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-4"><p className="text-overline text-ink-3">The person</p></div>
          <div className="col-span-4 md:col-span-7 md:col-start-6 flex flex-col gap-6">
            <p className="text-heading text-ink">I started in computer science and development, which is why I’m comfortable with the technical side of design.</p>
            <p className="text-body-editorial text-ink-2">I then spent my career turning complicated business ideas into simple, usable products, and learning how to lead the people who build them. Sixteen years in, I still believe great experiences emerge where design, business and technology intersect.</p>
            
          </div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="What keeps me steady" title="Four habits outside work." intro="Quiet, unhurried habits. I think they show up in how I design and lead." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steady.map(s => (
              <li key={s.t} className="card flex flex-col gap-4">
                <span className="w-11 h-11 rounded-2 grid place-items-center" style={{ background: 'var(--field-cobalt)' }} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8F55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </span>
                <h3 className="text-title text-ink">{s.t}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The work */}
      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="What I drive" title="Impact across AI, design and community." intro="Three ideas run through all of it: Dual Fluency, AI-native design and agentic experiences." />
          <ol>
            {drives.map((d, i) => (
              <motion.li key={i} className="hairline-top py-6 grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <span className="text-label text-signal-ink pt-1">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-body text-ink-2">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Career" title="Where I’ve worked." action={<Button to="/leadership#journey" variant="secondary" arrow>The leadership journey</Button>} />
          <ol>
            {timeline.map(item => (
              <li key={item.year} className="hairline-top py-7 grid md:grid-cols-[12rem_1fr] gap-3 md:gap-8">
                <p className="text-label text-ink-3 pt-1">{item.year}</p>
                <div>
                  <p className="text-title text-ink">{item.role} · {item.org}</p>
                  <p className="text-body-sm text-ink-2 mt-2 max-w-2xl">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials label="In their words" title="Colleagues and mentees." items={[colleagueTestimonials[0], menteeTestimonials[0], menteeTestimonials[2], colleagueTestimonials[1]]} />

      <Contact />
    </>
  )
}
