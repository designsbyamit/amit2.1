import PageHeader from '../components/ui/PageHeader'
import Contact from '../components/sections/Contact'
// Temporary: swap for the new About portrait when supplied
const aboutImg = '/images/about/amit-hero-bw.webp'
import SectionHeader from '../components/ds/SectionHeader'
import Button from '../components/ds/Button'
import Testimonials from '../components/sections/Testimonials'
import { colleagueTestimonials, clientTestimonials, quoteExcerpts } from '../data/testimonials'
import DriveGrid from '../components/sections/DriveGrid'
import { timeline } from '../data/career'


const steady = [
  { t: 'Morning runs', image: '/images/about/running.svg', alt: 'Line illustration of a morning runner' },
  { t: 'Old melodies and Indian classical music', image: '/images/about/playing.svg', alt: 'Line illustration of a musician playing an instrument' },
  { t: 'The science behind spirituality', image: '/images/about/science-behind-spirituality.svg', alt: 'Line illustration for the science behind spirituality' },
]


export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="Hi, I’m Amit."
        subtitle="A design leader in Bengaluru who started out writing code, took on leadership roles as early as college, and has spent 16+ years turning complicated ideas into products people can use."
        image={aboutImg} imagePosition="50% 28%" mono
        imageAlt="Amit Kumar Tiwari speaking at a design event"
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
          <SectionHeader label="What keeps me steady" title="Three habits outside work." intro="Quiet, unhurried habits. I think they show up in how I design and lead." />
          <ul className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {steady.map(h => (
              <li key={h.t} className="flex flex-col gap-4">
                <figure className="relative rounded-2 overflow-hidden bg-black" style={{ aspectRatio: '1 / 1' }}>
                  <img src={h.image} alt={h.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </figure>
                <h3 className="text-title text-ink">{h.t}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The work */}
      <section className="section-y hairline-top">
        <div className="container-site relative">
          <SectionHeader label="What I drive" title="Impact across AI, design and community." intro="Three ideas run through all of it: Dual Fluency, AI-native design and agentic experiences." />
        </div>
        <div className="container-site relative">
          <DriveGrid />
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

      <Testimonials rotate label="In their words" title="Colleagues, clients and mentees." items={[quoteExcerpts.mayura, clientTestimonials[0], colleagueTestimonials[0], clientTestimonials[1], clientTestimonials[2], quoteExcerpts.stepan, quoteExcerpts.mahesh]} />

      <Contact />
    </>
  )
}
