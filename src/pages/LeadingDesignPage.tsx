import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import ResourceCover from '../components/ds/ResourceCover'
import { bookParts, chapterPath, chapters } from '../data/leadingDesign'

const ease = [0.16, 1, 0.3, 1] as const
const REQUEST_TEAM = { topic: 'speaking', subject: 'Leading Design for my managers', message: 'I would like to talk about bringing Leading Design to the design managers in my organisation.\n\nTeam or programme size:\nWhere we are today:\n' } as const

export default function LeadingDesignPage() {
  const { open } = useContact()
  const first = chapters[0]
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Leading Design' }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Guide · Managing design teams</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>Leading Design</motion.h1>
              <motion.p className="text-body-lg text-ink-2 mt-6 max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
                Stories, points and worksheets for new and mid-level design managers, in five chapters. Frameworks where they help.
              </motion.p>
              <p className="text-body text-ink-2 mt-4 max-w-2xl">Each chapter takes one part of managing a design team and gives you the story behind it, the points to carry into your own team, and worksheets to write on. Where a chapter has a framework, it is there too.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button to={chapterPath(first.slug)} arrow>Start with chapter 1</Button>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Bring this to your managers</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-10 max-w-[240px]">
              <ResourceCover title="Leading Design" kind="Guide" motif="phases" tone="plum" />
            </div>
          </div>
        </div>
      </section>

      <section id="inside" className="section-y hairline-top scroll-mt-24" aria-labelledby="inside-h">
        <div className="container-site">
          <div className="grid-site gap-y-6 mb-12 md:mb-16">
            <div className="col-span-4 md:col-span-6">
              <p className="text-overline text-ink-3 mb-4">How each chapter works</p>
              <h2 id="inside-h" className="text-heading text-ink">What every chapter gives you.</h2>
            </div>
            <p className="col-span-4 md:col-span-5 md:col-start-8 self-end text-body text-ink-2">Worksheets are in every chapter. A framework appears only where it earns its place. Each chapter stands on its own.</p>
          </div>
          <ol className="grid md:grid-cols-3 gap-4">
            {bookParts.map((p, i) => (
              <li key={p.title} className="card flex flex-col gap-3">
                <span className="text-label text-signal-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-title text-ink">{p.title}</h3>
                <p className="text-body-sm text-ink-2">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="chapters" className="section-y hairline-top scroll-mt-24" aria-labelledby="chapters-h">
        <div className="container-site">
          <div className="grid-site gap-y-6 mb-12 md:mb-16">
            <div className="col-span-4 md:col-span-6">
              <p className="text-overline text-ink-3 mb-4">The chapters</p>
              <h2 id="chapters-h" className="text-heading text-ink">From building the team to leading it through AI.</h2>
            </div>
          </div>
          <ol className="flex flex-col">
            {chapters.map((c, i) => {
              const body = (
                <>
                  <span className="font-mono text-sm text-ink-3 md:col-span-1">{c.n}</span>
                  <div className="md:col-span-7 flex flex-col gap-3">
                    <h3 className="text-title text-ink">{c.title}</h3>
                    <p className="text-body text-ink-2 max-w-[62ch]">{c.summary}</p>
                    <ul className="flex flex-wrap gap-2" aria-label="Topics">{c.topics.map(t => <li key={t} className="chip">{t}</li>)}</ul>
                  </div>
                  <p className="text-label md:col-span-3 md:text-right md:self-center text-ink-3 group-hover:text-ink">{c.ready ? 'Read the chapter →' : 'Coming soon'}</p>
                </>
              )
              return (
                <motion.li key={c.slug} className="hairline-top" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  {c.ready
                    ? <Link to={chapterPath(c.slug)} className="group grid md:grid-cols-11 gap-x-6 gap-y-3 py-8 md:py-10 hover:bg-surface-1 transition-colors -mx-4 px-4">{body}</Link>
                    : <div className="group grid md:grid-cols-11 gap-x-6 gap-y-3 py-8 md:py-10 -mx-4 px-4 opacity-70">{body}</div>}
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to="/resources" variant="tertiary">Back to Resources</Button>
          <Button to="/leadership" variant="tertiary" arrow>Journey</Button>
        </div>
      </section>
    </>
  )
}
