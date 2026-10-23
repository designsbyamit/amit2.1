import { motion } from 'framer-motion'
import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import ResourceCover from '../components/ds/ResourceCover'
import { completeHandbook, docHref, firstMonth, hiringDocs, hiringParts, hiringProof } from '../data/hiring'
import type { HiringDoc } from '../data/hiring'

const ease = [0.16, 1, 0.3, 1] as const
const REQUEST_TEAM = { topic: 'speaking', subject: 'Hiring playbook for my team', message: 'I would like to talk about setting up a hiring and onboarding experience for my design team.\n\nTeam size:\nWhere we are today:\n' } as const

function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section-y hairline-top scroll-mt-24" aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <div className="grid-site gap-y-6 mb-12 md:mb-16">
          <div className="col-span-4 md:col-span-6">
            <p className="text-overline text-ink-3 mb-4">{label}</p>
            <h2 id={`${id}-h`} className="text-heading text-ink">{title}</h2>
          </div>
          {intro && <p className="col-span-4 md:col-span-5 md:col-start-8 self-end text-body text-ink-2">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

function DownloadCard({ d }: { d: HiringDoc }) {
  return (
    <li className="card flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="text-label text-signal-ink">{d.kind}</span><span className="font-mono text-xs text-ink-3">PDF · {d.pages} pages</span></div>
      <h4 className="text-title text-ink">{d.title}</h4>
      <p className="text-body-sm text-ink-2">{d.summary}</p>
      <a href={docHref(d.slug)} download className="btn btn-secondary btn-sm mt-auto self-start" aria-label={`Download ${d.title}, PDF, ${d.pages} pages`}>
        Download
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </li>
  )
}

export default function HiringPlaybookPage() {
  const { open } = useContact()
  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Practice', to: '/resources' }, { label: 'How I hire' }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Playbook · Hiring design teams</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>How I hire</motion.h1>
              <motion.p className="text-body-lg text-ink-2 mt-6 max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
                A hiring system for design teams, built from the first job description to a new designer&rsquo;s first ninety days.
              </motion.p>
              <p className="text-body text-ink-2 mt-4 max-w-2xl">I set up hiring and onboarding from scratch in one organisation, working side by side with HR. This is the system that came out of it, in three parts, with the worksheets to run it in yours.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={completeHandbook.href} download className="btn btn-primary">Download the complete handbook <span className="hidden sm:inline font-mono text-xs opacity-70">PDF · {completeHandbook.pages} pages</span></a>
                <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Talk about your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-10 max-w-[240px]">
              <ResourceCover title="How I hire" kind="Playbook" motif="checklist" tone="teal" />
            </div>
          </div>
          <dl className="grid sm:grid-cols-3 gap-x-8 gap-y-6 mt-14 pt-8 hairline-top">
            {hiringProof.map(p => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-serif text-ink" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', lineHeight: 1 }}>{p.value}</dd>
                <dd className="text-body-sm text-ink-3 mt-2">{p.label}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-10">
            {[...hiringParts.map(p => [p.id, `${p.n} ${p.title}`]), ['first-month', 'Your first month'], ['worksheets', 'All worksheets']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      {hiringParts.map(part => {
        const docs = hiringDocs.filter(d => d.part === Number(part.n))
        return (
          <Section key={part.id} id={part.id} label={`Part ${part.n}`} title={part.title} intro={part.lead}>
            <ol className="grid md:grid-cols-2 gap-4">
              {part.steps.map((s, i) => (
                <li key={s.title} className={`card flex flex-col gap-4 ${part.steps.length % 2 === 1 && i === part.steps.length - 1 ? 'md:col-span-2' : ''}`}>
                  <span className="text-label text-signal-ink">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-title text-ink">{s.title}</h3>
                  <p className="text-body-sm text-ink-2">{s.what}</p>
                  <ul className="flex flex-col gap-2">{s.how.map(h => <li key={h} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{h}</li>)}</ul>
                  <p className="text-body-sm text-ink-2 mt-auto pt-4 hairline-top"><span className="text-label text-ink-3 block mb-1">Watch for</span>{s.watch}</p>
                </li>
              ))}
              <li className="card flex flex-col gap-3 md:col-span-2" style={{ background: 'var(--field-teal)' }}>
                <span className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>What you will have</span>
                <p className="text-[1.25rem] font-light" style={{ color: '#ECEDEF' }}>{part.outcome}</p>
              </li>
            </ol>
            <h3 className="text-label text-ink-3 mt-14 mb-5">Worksheets for this part</h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{docs.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
          </Section>
        )
      })}

      <Section id="first-month" label="If you are new to hiring" title="Your first month as a hiring manager." intro="You do not need to be an expert to run this. Four weeks, one real role, and a way to learn from the first candidate.">
        <ol className="grid md:grid-cols-4 gap-4">
          {firstMonth.map(w => (
            <li key={w.week} className="card flex flex-col gap-3">
              <span className="text-label text-signal-ink">{w.week}</span>
              <h3 className="text-title text-ink">{w.title}</h3>
              <p className="text-body-sm text-ink-2">{w.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="worksheets" label="Everything in one place" title="The worksheets, handbooks and playbooks." intro="Print them, fill them in with your HR partner, and adapt them to your organisation. They are meant to be written on.">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{hiringDocs.map(d => <DownloadCard key={d.slug} d={d} />)}</ul>
        <div className="flex flex-wrap gap-3 mt-10">
          <a href={completeHandbook.href} download className="btn btn-primary">Download all as one handbook</a>
          <Button variant="secondary" onClick={() => open(REQUEST_TEAM)}>Bring this to your team</Button>
        </div>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to="/resources" variant="tertiary">Back to Practice</Button>
          <Button to="/leadership" variant="tertiary" arrow>How I lead</Button>
        </div>
      </section>
    </>
  )
}
