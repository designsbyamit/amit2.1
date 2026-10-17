import Illustration from '../components/illustrations/Illustration'
import Breadcrumb from '../components/ds/Breadcrumb'
import SectionHeader from '../components/ds/SectionHeader'
import Distinct from '../components/case/Distinct'
import { caseStudies } from '../data/work'
import { saudia as S } from '../data/saudia'

const cs = caseStudies.find(c => c.id === 'airline-app')!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

function Fig({ src, alt, note, className = '' }: { src: string; alt: string; note?: string; className?: string }) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-xl border" style={{ borderColor: 'var(--line-2)' }} />
      {note && <figcaption className="text-caption text-ink-3 mt-3 max-w-[70ch]">{note}</figcaption>}
    </figure>
  )
}

const Stat = ({ v, k }: { v: string; k: string }) => (
  <div className="card"><dd className="text-display-l text-white">{v}</dd><dt className="text-body-sm text-ink-3 mt-2">{k}</dt></div>
)

export default function SaudiaStoryPage() {
  return (
    <div className="bg-surface-0 min-h-screen">
      <header className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-site relative">
          <Breadcrumb items={[{ label: 'Craft', to: '/craft' }, { label: 'Saudia Airlines' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{S.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-[62ch]">A service ecosystem, not an app. I led the mobile experience: engagement up 92%, add-on sales up 50×, check-in from 9 steps to 2.</p>
          <div className="flex flex-wrap gap-2 mt-8"><span className="tag">{S.kicker}</span>{(cs.tags ?? []).map(t => <span key={t} className="tag">{t}</span>)}</div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {S.headline.map(([v, k]) => <Stat key={k} v={v} k={k} />)}
          </dl>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 hairline-top max-w-4xl">
            {[['Role', cs.role], ['Timeline', 'Jan 2023, almost a year'], ['Team', '8–9 on mobile, 11+ designers in the programme'], ['Domain', cs.domain]].map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
          {cs.distinct && <div className="mt-12"><Distinct title={cs.distinct.title} body={cs.distinct.body} /></div>}
          <div className="mt-14"><Fig src={S.hero} alt={S.heroAlt} /></div>
        </div>
      </header>

      <Section id="scale">
        <SectionHeader label={`01 · ${S.scale.label}`} title={S.scale.title} intro={S.scale.intro} />
        <dl className="grid md:grid-cols-3 gap-4">
          {S.scale.stats.map(([v, k]) => <Stat key={k} v={v} k={k} />)}
        </dl>
        <p className="text-caption text-ink-3 mt-4">{S.scale.note}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {S.scale.directions.map(([t, d]) => <div key={t} className="card"><p className="text-title text-white">{t}</p><p className="text-body-sm text-ink-2 mt-3">{d}</p></div>)}
        </div>
        <Fig className="mt-12" src={S.scale.streams.image} alt={S.scale.streams.alt} note={S.scale.streams.note} />
      </Section>

      <Section id="problem" tone="raised">
        <SectionHeader label={S.problem.label} title={S.problem.title} intro={S.problem.intro} />
        <div className="grid md:grid-cols-3 gap-4">
          {S.problem.failures.map(([t, d]) => <div key={t} className="card"><p className="text-title text-white">{t}</p><p className="text-body-sm text-ink-2 mt-3">{d}</p></div>)}
        </div>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 mt-12 items-start">
          <Fig src={S.problem.audit.image} alt={S.problem.audit.alt} note={S.problem.audit.note} />
          <Fig src={S.problem.before.image} alt={S.problem.before.alt} note={S.problem.before.note} />
        </div>
      </Section>

      <Section id="reframe">
        <SectionHeader label={S.reframe.label} title={S.reframe.title} />
        <div className="max-w-[62ch] space-y-5">{S.reframe.body.map(p => <p key={p} className="text-body-lg text-ink-2">{p}</p>)}</div>
        <Fig className="mt-12" src={S.reframe.process.image} alt={S.reframe.process.alt} note={S.reframe.process.note} />
      </Section>

      <Section id="people" tone="raised">
        <SectionHeader label={S.people.label} title={S.people.title} intro={S.people.intro} />
        <Fig src={S.people.personas.image} alt={S.people.personas.alt} note={S.people.personas.note} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {S.people.maps.map(m => (
            <a key={m.image} href={m.image} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open journey map at full size: ${m.note}`}>
              <img src={m.image} alt={m.alt} loading="lazy" className="w-full rounded-xl border" style={{ borderColor: 'var(--line-2)' }} />
              <span className="text-caption text-ink-3 mt-3 block">Journey map · {m.note}</span>
            </a>
          ))}
        </div>
        <Fig className="mt-12" src={S.people.workshop.image} alt={S.people.workshop.alt} note={S.people.workshop.note} />
      </Section>

      <Section id="lead">
        <SectionHeader label={S.lead.label} title={S.lead.title} />
        <div className="max-w-[62ch] space-y-5">{S.lead.body.map(p => <p key={p} className="text-body-lg text-ink-2">{p}</p>)}</div>
        <div className="grid lg:grid-cols-2 gap-8 mt-12 items-start">
          <Fig src={S.lead.pods.image} alt={S.lead.pods.alt} note={S.lead.pods.note} />
          <Fig src={S.lead.sprint.image} alt={S.lead.sprint.alt} note={S.lead.sprint.note} />
        </div>
        <Fig className="mt-12 max-w-4xl" src={S.lead.programme.image} alt={S.lead.programme.alt} note={S.lead.programme.note} />
      </Section>

      <Section id="experience" tone="raised">
        <SectionHeader label={S.experience.label} title={S.experience.title} intro={S.experience.intro} />
        {[S.experience.booking, S.experience.manage].map(j => (
          <div key={j.image} className="mb-16">
            <Fig src={j.image} alt={j.alt} note={j.note} />
            <ul className="flex flex-wrap gap-2 mt-5">{j.points.map(p => <li key={p} className="tag">{p}</li>)}</ul>
          </div>
        ))}
        <p className="text-body-lg text-white max-w-[62ch]">{S.experience.ancillaries}</p>
        <Fig className="mt-12 max-w-2xl" src={S.experience.lifestyle.image} alt={S.experience.lifestyle.alt} note={S.experience.lifestyle.note} />
      </Section>

      <Section id="impact">
        <SectionHeader label={S.impact.label} title={S.impact.title} intro={S.impact.intro} />
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {S.impact.tiles.map(([v, k]) => <Stat key={k} v={v} k={k} />)}
        </dl>
        <p className="text-body-lg text-white mt-12 max-w-[62ch]">{S.impact.leadership}</p>
        {cs.testimonial && (
          <blockquote className="mt-12 max-w-3xl"><p className="text-title text-white">“{cs.testimonial.quote}”</p>
            <footer className="text-body-sm text-ink-3 mt-4">{cs.testimonial.name}, {cs.testimonial.title}</footer></blockquote>
        )}
        <div className="mt-20">
          <p className="text-overline text-ink-3">{S.impact.today.title}</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">{S.impact.today.stats.map(([v, k]) => <Stat key={k} v={v} k={k} />)}</dl>
          <p className="text-caption text-ink-3 mt-4">{S.impact.today.note}</p>
        </div>
        <div className="mt-16 hairline-top pt-6">
          <p className="text-overline text-ink-3">Sources</p>
          <ul className="mt-3 space-y-1">{S.sources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" className="text-body-sm text-ink-2 underline">{t}</a></li>)}</ul>
        </div>
        <div className="mt-16 flex flex-wrap gap-3 items-end justify-between">
          <a href="/craft" className="btn btn-secondary">All case studies</a>
          <Illustration name="craft" className="hidden md:block w-[220px] h-auto" />
        </div>
      </Section>
    </div>
  )
}
