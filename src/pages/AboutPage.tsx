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
  { t: 'Morning runs', image: '/images/about/running.svg', alt: 'Line illustration of a morning runner', text: 'A little movement, a little solitude and some much-needed space to clear my head. Often, the best ideas arrive when I’m not chasing them.' },
  { t: 'Indian classical music', image: '/images/about/playing.svg', alt: 'Line illustration of a musician playing an instrument', text: 'Drawn to the depth, discipline and improvisation of Indian classical music. There’s something fascinating about how structure and spontaneity can coexist so beautifully.' },
  { t: 'The science behind spirituality', image: '/images/about/science-behind-spirituality.svg', alt: 'Line illustration for the science behind spirituality', text: 'An ongoing curiosity about consciousness, human behaviour, philosophy and the questions that sit somewhere between science and spirituality.' },
]

type Chapter = { when: string; role: string; org: string; intro: string[]; highlights?: string[] }
const chapters: Chapter[] = [
  { when: 'August 2024 - Present', role: 'Design Leader | User Experience Manager', org: 'SAP Labs',
    intro: ['Working at the intersection of enterprise design, product strategy and emerging AI experiences.', 'My current focus includes contributing to SAP’s Suite-first direction, helping harmonise experiences across products, exploring AI-native and agentic interactions, and advancing design excellence.'],
    highlights: ['Contributing to Core Design initiatives that bring greater consistency and coherence across SAP product experiences.', 'Leading SAP Design Hub India, a community of 250+ designers, and helping shape its learning, engagement and thought-leadership initiatives.', 'Working with customers and product teams on emerging areas such as agentic procurement and AI-powered search experiences.', 'Curating Impulse India, bringing designers and industry voices together to explore ideas shaping the future of design.'] },
  { when: 'December 2018 - July 2024', role: 'User Experience Manager', org: 'Accenture Song',
    intro: ['A formative chapter in design leadership, where I moved from leading design delivery to building capabilities, developing people and influencing experience strategy.', 'I worked across B2B and B2C engagements, leading UX teams and collaborating with clients on complex product and service experiences.'],
    highlights: ['Led UX teams across different engagements, with direct reporting structures ranging from 6 to 30 designers.', 'Worked across experience strategy, research, interaction design and delivery.', 'Helped establish and grow Generative AI and Conversational AI design capabilities.', 'Contributed to building design talent and scaling design teams across the organisation.'] },
  { when: 'December 2015 - December 2018', role: 'Staff Product Designer', org: 'Hewlett Packard Enterprise',
    intro: ['An opportunity to work deeply in enterprise cloud products and understand the complexities of designing for sophisticated business users.'],
    highlights: ['Led UX initiatives for the GreenLake cloud platform.', 'Contributed to the Grommet design system.', 'Helped establish DesignOps practices, design hiring initiatives and communities of practice.', 'Worked across teams to make complex cloud experiences more approachable and usable.'] },
  { when: 'July 2014 - December 2015', role: 'Creative UX Lead | Founding UX Lead', org: 'Photon Interactive',
    intro: ['A chapter focused on building UX capabilities and delivering digital experiences for e-commerce and other client engagements.', 'Worked across research, analytics, interaction design and experience delivery while helping establish a stronger design culture.'] },
  { when: 'January 2011 - July 2014', role: 'Senior UX Designer', org: 'Infosys Limited',
    intro: ['Where much of my professional foundation took shape.', 'Worked across 20+ client engagements, gaining experience in user research, interaction design, information architecture and end-to-end UX delivery.', 'This chapter taught me the importance of understanding the problem before getting attached to a solution.'] },
]

/** Colleagues, clients and a mentee, mixed. Each person appears once: the short excerpts stand in for Mayura, Stepan and Mahesh. */
const inTheirWords = [quoteExcerpts.mayura, clientTestimonials[0], colleagueTestimonials[0], colleagueTestimonials[1], clientTestimonials[1], quoteExcerpts.mahesh, colleagueTestimonials[2], clientTestimonials[2], quoteExcerpts.stepan]

type Path = { label: string; body: string[]; cta: string } & ({ to: string } | { open: ContactOptions })
const paths: Path[] = [
  { label: 'Hiring for design leadership', body: ['Looking for someone to help shape a design organisation, lead product experiences or build a stronger design culture?', 'I’m open to conversations about senior design leadership opportunities, particularly within product-led organisations.'], cta: 'Discuss an opportunity', open: { topic: 'work', message: 'Role and organisation:\n\nScope of the design team:\n\nWhat success looks like in the first year:\n' } },
  { label: 'Let’s work together', body: ['Have an interesting challenge involving enterprise UX, AI-native experiences, product strategy or design excellence?', 'Sometimes a different perspective is all it takes to unlock a better direction.'], cta: 'Explore a collaboration', open: { topic: 'collaboration', message: 'Organisation and role:\n\nWhat we are trying to achieve:\n' } },
  { label: 'Looking for mentorship?', body: ['Trying to navigate your next career move, strengthen your product thinking or grow into a more influential designer?', 'Let’s work through the questions, challenges and opportunities that matter to your growth.'], cta: 'Explore mentoring', to: '/mentoring' },
  { label: 'Invite me to speak', body: ['Interested in a conversation or workshop around design leadership, AI-native experiences, product thinking, business fluency or building design communities?', 'I’d love to contribute.'], cta: 'Discuss a speaking engagement', open: { topic: 'speaking', message: 'Event or organisation:\n\nDate and location:\n\nAudience and format:\n' } },
  { label: 'Or simply say hello.', body: ['Have something interesting on your mind? A question, an idea, a disagreement or a perspective worth exchanging?', 'I’m always up for a good conversation.'], cta: 'Send me a message', open: { topic: 'other' } },
]

function AboutContact() {
  const { open } = useContact()
  return (
    <section className="section-y hairline-top" id="contact">
      <div className="container-site">
        <SectionHeader label="Start a conversation" title="Good conversations can lead to interesting things." intro="Whether you’re exploring a leadership opportunity, working through a challenging product problem, looking for a fresh perspective or simply interested in exchanging ideas, I’d be happy to hear from you. Here are a few ways we could connect." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <motion.div key={p.label} className="card flex flex-col" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}>
              <h3 className="text-title text-ink mb-4">{p.label}</h3>
              <div className="flex flex-col gap-3 mb-8 flex-1">{p.body.map(t => <p key={t} className="text-body-sm text-ink-2">{t}</p>)}</div>
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
        title="Designing at the intersection of people, technology and possibility."
        subtitle={<>I’m Amit Kumar Tiwari, a design leader, product thinker and lifelong learner. Over 16+ years, I’ve worked across design, technology and business, turning complex challenges into meaningful product experiences and helping people and teams do their best work.</>}
        image={aboutImg} imagePosition="50% 28%" mono
        imageAlt="Amit Kumar Tiwari speaking at a design event"
      >
        <p className="text-body text-ink-2 max-w-2xl mb-8">Today, my interests lie in shaping AI-native experiences, building design excellence at scale and exploring what the future of design looks like.</p>
        <div className="flex flex-wrap gap-3">
          <Button to="/craft" arrow>Explore my work</Button>
          <a className="btn btn-secondary" href="#person">Get to know me</a>
        </div>
      </PageHeader>

      <section className="section-y hairline-top scroll-mt-24" id="person">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-4"><p className="text-overline text-ink-3">The person behind the pixels</p></div>
          <div className="col-span-4 md:col-span-7 md:col-start-6 flex flex-col gap-6">
            <h2 className="text-heading text-ink">I’ve always been curious about how things work, and even more curious about how they could work better.</h2>
            <p className="text-body-editorial text-ink-2">My journey began with computer science and a natural inclination towards building things. I started out closer to code and technology, but gradually found myself drawn to a different question: how do we make complex things feel simple, intuitive and meaningful to the people using them?</p>
            <p className="text-body-editorial text-ink-2">That question led me to user experience design. What began as an interest in interfaces grew into a deeper fascination with human behaviour, problem-solving, product thinking and the role design plays in shaping businesses.</p>
            <p className="text-body-editorial text-ink-2">Over the years, I’ve moved between designing products, shaping experiences, building teams and leading design organisations. I’ve worked across B2B and B2C environments, from enterprise platforms and cloud products to emerging AI-powered experiences.</p>
            <p className="text-body-editorial text-ink-2">Each chapter has taught me something different. Designing taught me to observe. Working with technology taught me to think in systems. Leading people taught me to listen, build trust and create the conditions for others to thrive.</p>
            <p className="text-body-editorial text-ink-2">Today, I find myself particularly interested in the space where design, business and technology meet. Not because any one of them has all the answers, but because the most interesting problems rarely belong to just one discipline.</p>
            <p className="text-body-editorial text-ink-2">I’m still learning, still experimenting and still asking questions. I think that’s what keeps the work interesting.</p>
          </div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Beyond the work" title="A few things that keep me grounded." intro="Not everything needs to be productive. Some of the things that shape how I think happen when I’m not trying to solve anything at all." />
          <ul className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steady.map(h => (
              <li key={h.t} className="flex flex-col gap-4">
                <figure className="relative rounded-2 overflow-hidden bg-black w-40" style={{ aspectRatio: '1 / 1' }}>
                  <img src={h.image} alt={h.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </figure>
                <h3 className="text-title text-ink">{h.t}</h3>
                <p className="text-body-sm text-ink-2 max-w-[44ch]">{h.text}</p>
              </li>
            ))}
          </ul>
          <p className="text-body text-ink-2 mt-12 max-w-2xl">I enjoy exploring ideas that challenge what I think I know. It’s a habit I try to carry into my work, too.</p>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site relative">
          <SectionHeader label="What I care about" title="Different challenges. One common thread: making things better." intro="My work spans several interconnected areas. Each comes with its own set of challenges, but all of them revolve around creating better experiences, enabling people and making design matter at a larger scale." />
        </div>
        <div className="container-site relative">
          <DriveGrid />
        </div>
      </section>

      <section className="section-y hairline-top" id="journey">
        <div className="container-site">
          <SectionHeader label="The journey so far" title="Different chapters. A lot of learning. Still evolving." intro="My career has taken me through different industries, organisations and design disciplines. Each chapter has shaped how I approach problems, work with people and think about the role of design." />
          <ol>
            {chapters.map(c => (
              <li key={c.when} className="hairline-top py-8 grid md:grid-cols-[14rem_1fr] gap-3 md:gap-8">
                <p className="text-label text-ink-3 pt-1">{c.when}</p>
                <div>
                  <h3 className="text-title text-ink">{c.role}</h3>
                  <p className="text-body-sm text-ink-3 mt-1">{c.org}</p>
                  <div className="flex flex-col gap-3 mt-4 max-w-2xl">{c.intro.map(t => <p key={t} className="text-body-sm text-ink-2">{t}</p>)}</div>
                  {c.highlights && <>
                    <p className="text-label text-ink-3 mt-6">A few highlights</p>
                    <ul className="mt-3 flex flex-col gap-2 max-w-2xl list-disc pl-5 marker:text-ink-3">{c.highlights.map(h => <li key={h} className="text-body-sm text-ink-2">{h}</li>)}</ul>
                  </>}
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

      <Testimonials rotate label="In their words" title="The most meaningful part of the journey is the people along the way." intro={['Projects come and go, organisations change and roles evolve. But the relationships we build and the impact we have on people tend to stay.', 'I’m grateful to the colleagues, collaborators, customers and designers I’ve had the opportunity to learn from and work alongside.', 'Here’s a little of what some of them have shared.']} items={inTheirWords} />

      <AboutContact />
    </>
  )
}
