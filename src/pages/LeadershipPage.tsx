import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImg from '../assets/images/amit-stage.jpg'
import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import LeadershipStories from '../components/sections/LeadershipStories'
import LeadershipArticles from '../components/sections/LeadershipArticles'

function CommunityCallout() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
      <div className="mx-auto max-w-7xl grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
        <motion.p
          className="text-overline text-white opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Community
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6">
            <p className="text-white mb-1" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1 }}>250+</p>
            <p className="text-overline text-white opacity-40">Designers in SAP Design Hub India</p>
          </div>
          <p className="text-body text-white opacity-50 max-w-xl mb-8">
            Founded in 2022. Monthly events, peer critique, and a growing culture of design excellence inside the enterprise. A community that revealed what organisations suppress — and what happens when you give designers a room of their own.
          </p>
          <Link
            to="/community"
            className="text-label text-white opacity-40 hover:opacity-90 transition-opacity duration-300"
          >
            Explore the community →
          </Link>
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
        image={heroImg}
        imageAlt="Amit Kumar Tiwari on stage"
      />
      <Journey />
      <LeadershipStories />
      <CommunityCallout />
      <LeadershipArticles />
    </>
  )
}
