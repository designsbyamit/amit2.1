import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NAMES } from '../data/ia'
import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import LeadershipChange from '../components/sections/LeadershipChange'
import { ExperiencePictogram, CollectivePictogram, ReflectionsFinePictogram } from '../components/ds/HubPictograms'
import ResourceCover from '../components/ds/ResourceCover'
import Button from '../components/ds/Button'
import type { ReactNode } from 'react'

const heroImg = '/images/about/leadership-hero.webp'
const grid = { backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }

const tiles: { to: string; title: string; text: string; tone: string; art: ReactNode }[] = [
  { to: '/leadership/stories', title: 'Experience', text: 'Moments that shaped how I lead: the conflicts, the first team, the community and the culture work.', tone: 'var(--field-cobalt)', art: <ExperiencePictogram /> },
  { to: '/community', title: 'Collective', text: 'The community initiatives, events and collaborations that extend the practice beyond organisational walls.', tone: 'var(--field-teal)', art: <CollectivePictogram /> },
  { to: '/reflections', title: NAMES.diary, text: 'Essays and observations on where design, AI and the systems we are building go next.', tone: 'var(--field-plum)', art: <ReflectionsFinePictogram /> },
]

/** The pages under Leadership, as tiles: the same pattern as the Grow hub. */
function Tiles() {
  return (
    <section className="section-y hairline-top">
      <div className="container-site">
        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {tiles.map((t, k) => (
            <motion.li key={t.to} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: k * 0.08 }}>
              <Link to={t.to} className="group card !p-0 flex flex-col h-full overflow-hidden hover:bg-surface-1 transition-colors">
                <div className="relative aspect-[16/9] overflow-hidden" style={{ background: t.tone }}>
                  <div className="absolute inset-0 opacity-[0.07]" style={grid} />
                  <span className="absolute left-5 top-4 font-mono text-[0.6875rem] tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>{String(k + 1).padStart(2, '0')} / {String(tiles.length).padStart(2, '0')}</span>
                  <div className="absolute inset-0 px-[16%] py-[9%] transition-transform duration-500 group-hover:scale-[1.04]">{t.art}</div>
                </div>
                <div className="p-7 md:p-8 flex flex-col gap-3 flex-1">
                  <h2 className="text-heading text-ink" style={{ fontWeight: 300 }}>{t.title}</h2>
                  <p className="text-body text-ink-2 max-w-[48ch]">{t.text}</p>
                  <p className="text-label text-ink-3 group-hover:text-ink mt-auto pt-4">Open &rarr;</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}


/** Leading Design: the guide for new and mid-level design managers, listed here and under Resources. */
function LeadingDesignBand() {
  return (
    <section className="section-y hairline-top" aria-labelledby="leading-design-h">
      <div className="container-site grid-site gap-y-8 items-center">
        <div className="col-span-4 sm:col-span-2 md:col-span-3 max-w-[240px]"><ResourceCover title="Leading Design" kind="Guide" motif="phases" tone="plum" /></div>
        <div className="col-span-4 md:col-span-8 md:col-start-5 flex flex-col gap-5">
          <p className="text-overline text-ink-3">Guide for design managers</p>
          <h2 id="leading-design-h" className="text-heading text-ink max-w-[24ch]">Leading Design</h2>
          <p className="text-body text-ink-2 max-w-[62ch]">Principles, frameworks and worksheets for new and mid-level design managers, in five chapters: building the team, growing people, the rituals that shape culture, design quality, and AI maturity.</p>
          <div className="flex flex-wrap gap-3 pt-2"><Button to="/resources/leading-design" arrow>Read the guide</Button></div>
        </div>
      </div>
    </section>
  )
}

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        mark="lead"
        label={NAMES.leadership}
        title="Design is a leadership practice."
        subtitle="The career arc, the philosophy, and what I've learned about making design matter inside large organizations, where influence is earned, not assigned."
        image={heroImg} imagePosition="100% 62%"
        imageAlt="Amit Kumar Tiwari on stage"
      />
      <Journey />
      <LeadershipChange />
      <LeadingDesignBand />
      <Tiles />
    </>
  )
}
