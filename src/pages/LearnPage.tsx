import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { CommunityPictogram, MentoringPictogram, PortfolioPictogram, PracticePictogram, ReflectionsPictogram, ResourcesPictogram } from './grow/GrowPictograms'

const grid = { backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }

const items: { to: string; title: string; text: string; tone: string; art: ReactNode }[] = [
  { to: '/mentoring', title: 'Mentoring', text: 'How I coach designers, and templates you can use with your own mentor or team.', tone: 'var(--field-cobalt)', art: <MentoringPictogram /> },
  { to: '/resources', title: 'Practices and resources', text: 'Frameworks, toolkits and a reading list you can use with your own team.', tone: 'var(--field-teal)', art: <ResourcesPictogram /> },
  { to: '/community', title: 'Community', text: 'SAP Design Hub India and the events I help run.', tone: 'var(--field-plum)', art: <CommunityPictogram /> },
  { to: '/reflections', title: 'Reflections', text: 'Essays on leadership, craft and AI.', tone: 'var(--field-graphite)', art: <ReflectionsPictogram /> },
  { to: '/learn/practice', title: 'Practice Toolkits', text: 'Practise designing with AI, from a conversational interface to multi-agent orchestration, with exercises and reflection prompts.', tone: 'var(--field-cobalt)', art: <PracticePictogram /> },
  { to: '/learn/portfolio', title: 'Portfolio Best Practices', text: 'Give your portfolio a character, then shape each project with a clear anatomy and a story.', tone: 'var(--field-teal)', art: <PortfolioPictogram /> },
]

export default function LearnPage() {
  return (
    <>
      <PageHeader label="Grow" title="For designers who are growing." subtitle="Mentoring, practices, community, writing, and places to practise and present your work."
        image="/images/about/grow-hero.webp" imagePosition="50% 35%" mono imageAlt="Amit speaking to a room of designers during a session" />
      <section className="section-y hairline-top">
        <div className="container-site">
          <div className="flex items-end gap-5 mb-10 md:mb-14">
            <span className="font-serif leading-[0.85] text-[72px] md:text-[96px]" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }} aria-hidden>{String(items.length).padStart(2, '0')}</span>
            <p className="text-overline text-ink-3 pb-2">{items.length} places to grow. Use one, or all of them.</p>
          </div>
          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {items.map((i, k) => (
              <motion.li key={i.to} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: (k % 2) * 0.08 }}>
                <Link to={i.to} className="group card !p-0 flex flex-col h-full overflow-hidden hover:bg-surface-1 transition-colors">
                  <div className="relative aspect-[16/9] overflow-hidden" style={{ background: i.tone }}>
                    <div className="absolute inset-0 opacity-[0.07]" style={grid} />
                    <span className="absolute left-5 top-4 font-mono text-[0.6875rem] tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>{String(k + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                    <div className="absolute inset-0 px-[18%] py-[9%] transition-transform duration-500 group-hover:scale-[1.04]">{i.art}</div>
                  </div>
                  <div className="p-7 md:p-9 flex flex-col gap-3 flex-1">
                    <h2 className="text-heading text-ink" style={{ fontWeight: 300 }}>{i.title}</h2>
                    <p className="text-body text-ink-2 max-w-[48ch]">{i.text}</p>
                    <p className="text-label text-ink-3 group-hover:text-ink mt-auto pt-4">Open &rarr;</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
