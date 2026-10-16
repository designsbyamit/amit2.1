import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cases, caseBySlug } from '../data/cases'
import Breadcrumb from '../components/ds/Breadcrumb'
import RevealText from '../components/ui/RevealText'
import OutcomesLedger from '../components/leadership/OutcomesLedger'
import PracticeCard from '../components/leadership/PracticeCard'
import CapabilityLoop from '../components/leadership/CapabilityLoop'

export default function LeadershipCasePage() {
  const { slug } = useParams()
  const c = caseBySlug(slug)
  if (!c) return <Navigate to="/leadership" replace />
  const idx = cases.indexOf(c)
  const next = cases[idx + 1]

  return (
    <article>
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-10">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Leadership', to: '/leadership' }, { label: `Case ${c.number}` }]} /></div>
          <p className="text-label text-ink-3 mb-5"><span className="text-signal-ink">Leadership case {c.number}</span></p>
          <h1 className="text-display-l text-ink max-w-[20ch]"><RevealText text={c.title} delay={0.1} /></h1>
          <motion.p className="text-body-lg text-ink-2 max-w-[56ch] mt-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>{c.subtitle}</motion.p>
        </div>
        <div className="container-site">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-3 overflow-hidden" style={{ background: 'rgb(var(--ink-rgb) / 0.08)' }}>
            {c.strip.map(s => (
              <div key={s.label} className="p-5 bg-surface-1">
                <dt className="text-label text-ink-3 mb-1">{s.label}</dt>
                <dd className="text-body text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-site py-16 md:py-24">
        <div className="grid-site gap-y-16">
          <div className="col-span-4 md:col-span-8 md:col-start-3 flex flex-col gap-16">
            <section aria-labelledby="claim-h">
              <h2 id="claim-h" className="text-overline text-ink-3 mb-4">The idea</h2>
              <p className="text-heading text-ink" style={{ fontWeight: 300 }}>{c.claim}</p>
            </section>

            <CapabilityLoop />

            <section aria-labelledby="beats-h">
              <h2 id="beats-h" className="sr-only">The case in five beats</h2>
              <ol className="hairline-top">
                {c.beats.map(b => (
                  <li key={b.label} className="grid gap-3 md:grid-cols-[9.5rem_1fr] py-6 border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                    <p className="text-label text-signal-ink">{b.label}</p>
                    <p className="text-body-editorial text-ink-2">{b.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="strands-h">
              <h2 id="strands-h" className="text-overline text-ink-3 mb-6">People, craft and business in one piece of work</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {([['People', c.strands.people], ['Craft', c.strands.craft], ['Business', c.strands.business]] as const).map(([k, v]) => (
                  <div key={k} className="card !p-6"><p className="text-label text-signal-ink mb-2">{k}</p><p className="text-body text-ink-2">{v}</p></div>
                ))}
              </div>
            </section>

            <OutcomesLedger rows={c.outcomes} />


            <PracticeCard practice={c.practice} />

            <section aria-labelledby="next-h">
              <h2 id="next-h" className="text-overline text-ink-3 mb-5">{c.next.title}</h2>
              <ol className="flex flex-col gap-3">
                {c.next.steps.map((s, i) => (
                  <li key={i} className="flex gap-4"><span className="text-label text-signal-ink pt-1 flex-none">{String(i + 1).padStart(2, '0')}</span><p className="text-body text-ink-2">{s}</p></li>
                ))}
              </ol>
            </section>

            <details className="group hairline-top pt-8">
              <summary className="cursor-pointer text-label text-ink-2 hover:text-ink list-none flex items-center justify-between">
                <span>Read the full account</span><span aria-hidden="true" className="group-open:rotate-45 transition-transform text-ink-3">+</span>
              </summary>
              <div className="flex flex-col gap-6 mt-8">
                {c.account.map((p, i) => <p key={i} className="text-body-editorial text-ink-2">{p}</p>)}
                <figure className="rounded-3 p-8 mt-4" style={{ background: 'var(--field-graphite)' }}>
                  <blockquote className="text-heading" style={{ color: '#fff', fontWeight: 300 }}>{c.lesson}</blockquote>
                </figure>
              </div>
            </details>

            <nav aria-label="More leadership" className="flex flex-wrap gap-6 hairline-top pt-8">
              {next && <Link to={`/leadership/cases/${next.slug}`} className="text-label text-ink hover:text-signal-ink">Next case &rarr;</Link>}
              <Link to="/leadership" className="text-label text-ink-2 hover:text-ink">All leadership &rarr;</Link>
              <Link to="/resources" className="text-label text-ink-2 hover:text-ink">Practices &rarr;</Link>
            </nav>
          </div>
        </div>
      </div>
    </article>
  )
}
