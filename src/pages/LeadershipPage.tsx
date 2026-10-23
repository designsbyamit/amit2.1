import Button from '../components/ds/Button'
import { NAMES } from '../data/ia'
import Stat from '../components/ds/Stat'
import { motion } from 'framer-motion'
const heroImg = '/images/about/leadership-hero.webp'
import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import LeadershipChange from '../components/sections/LeadershipChange'
import Testimonials from '../components/sections/Testimonials'
import { colleagueTestimonials } from '../data/testimonials'

function LeadingPeople() {
  const facts = [
    { value: '6–30', label: 'Direct reports across teams, about 10 on average' },
    { value: '15–40', label: 'People on the larger projects I have led' },
    { value: '200+', label: 'Designers hired across teams and organisations' },
  ]
  return (
    <section className="section-y hairline-top">
      <div className="container-site grid-site gap-y-8 items-start">
        <p className="col-span-4 md:col-span-4 text-overline text-ink-3">Leading people</p>
        <div className="col-span-4 md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {facts.map(f => <Stat key={f.label} value={f.value} label={f.label} />)}
          </div>
          <p className="text-body text-ink-2 max-w-xl">
            I set up hiring and onboarding experiences for teams, and built their capabilities in both skills and technology. The work I show here is what those teams made together, and every project is live in market today.
          </p>
        </div>
      </div>
    </section>
  )
}

function CommunityCallout() {
  return (
    <section className="section-y hairline-top">
      <div className="container-site grid-site gap-y-8 items-start">
        <p className="col-span-4 md:col-span-4 text-overline text-ink-3">Community</p>
        <motion.div className="col-span-4 md:col-span-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Stat value="250+" label="Designers in SAP Design Hub India" />
          <p className="text-body text-ink-2 max-w-xl mt-6 mb-8">
            Led by Amit since February 2025. Monthly events, peer critique, and a growing culture of design excellence inside the enterprise. A community that revealed what organisations suppress, and what happens when you give designers a room of their own.
          </p>
          <Button to="/community" variant="tertiary" arrow>Explore the community</Button>
        </motion.div>
      </div>
    </section>
  )
}

function ReflectionsPointer() {
  return (
    <section className="section-y hairline-top">
      <div className="container-site grid-site gap-y-6 items-start">
        <p className="col-span-4 md:col-span-4 text-overline text-ink-3">Writing</p>
        <div className="col-span-4 md:col-span-8">
          <p className="text-body-lg text-ink-2 max-w-xl mb-6">My essays on leadership, AI and the future of design live in {NAMES.diary}.</p>
          <Button to="/reflections" variant="tertiary" arrow>Read {NAMES.diary}</Button>
        </div>
      </div>
    </section>
  )
}

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        label={NAMES.leadership}
        title="Design is a leadership practice."
        subtitle="The career arc, the philosophy, and what I've learned about making design matter inside large organizations, where influence is earned, not assigned."
        image={heroImg} imagePosition="100% 62%"
        imageAlt="Amit Kumar Tiwari on stage"
      />
      <LeadingPeople />
      <Journey />
      <LeadershipChange />
      <CommunityCallout />
      <Testimonials label="Colleagues" title="How the people I work with describe it." items={colleagueTestimonials.slice(0, 5)} />
      <ReflectionsPointer />
    </>
  )
}
