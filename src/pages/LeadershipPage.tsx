import Button from '../components/ds/Button'
import Stat from '../components/ds/Stat'
import { motion } from 'framer-motion'
const heroImg = '/images/Community/Impulse.webp'
import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import LeadershipStories from '../components/sections/LeadershipStories'
import LeadershipArticles from '../components/sections/LeadershipArticles'
import Testimonials from '../components/sections/Testimonials'
import { colleagueTestimonials } from '../data/testimonials'

function CommunityCallout() {
  return (
    <section className="section-y hairline-top">
      <div className="container-site grid-site gap-y-8 items-start">
        <p className="col-span-4 md:col-span-4 text-overline text-ink-3">Community</p>
        <motion.div className="col-span-4 md:col-span-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Stat value="250+" label="Designers in SAP Design Hub India" />
          <p className="text-body text-ink-2 max-w-xl mt-6 mb-8">
            Led by Amit since February 2025. Monthly events, peer critique, and a growing culture of design excellence inside the enterprise. A community that revealed what organisations suppress — and what happens when you give designers a room of their own.
          </p>
          <Button to="/community" variant="tertiary" arrow>Explore the community</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        label="Leadership"
        title="Design is a leadership practice."
        subtitle="The career arc, the philosophy, and what I've learned about making design matter inside large organizations — where influence is earned, not assigned."
        image={heroImg} imagePosition="50% 8%"
        imageAlt="Amit Kumar Tiwari on stage"
      />
      <Journey />
      <LeadershipStories />
      <CommunityCallout />
      <Testimonials label="Colleagues" title="How the people I work with describe it." items={colleagueTestimonials} />
      <LeadershipArticles />
    </>
  )
}
