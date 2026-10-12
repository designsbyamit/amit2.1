import { useState } from 'react'
import Button from '../components/ds/Button'
import Breadcrumb from '../components/ds/Breadcrumb'
import SectionHeader from '../components/ds/SectionHeader'
import { caseStudies } from '../data/work'
import { engaze as E } from '../data/engaze'

const cs = caseStudies.find(c => c.id === 'engaze')!

function Section({ id, children, tone = 'base' }: { id?: string; children: React.ReactNode; tone?: 'base' | 'raised' }) {
  return (
    <section id={id} className={`section-y hairline-top ${tone === 'raised' ? 'bg-surface-1' : 'bg-surface-0'}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

function Fig({ src, alt, note }: { src: string; alt: string; note?: string }) {
  return (
    <figure>
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-xl border" style={{ borderColor: 'var(--line-2)' }} />
      {note && <figcaption className="text-caption text-ink-3 mt-3">{note}</figcaption>}
    </figure>
  )
}

export default function EngazeStoryPage() {
  const [active, setActive] = useState(E.roles[0].id)
  const role = E.roles.find(r => r.id === active)!

  return (
    <div className="bg-surface-0 min-h-screen">
      <header className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-site">
          <Breadcrumb items={[{ label: 'Craft', to: '/craft' }, { label: 'Engaze HCM' }]} />
          <p className="text-overline text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{E.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-[62ch]">{cs.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button to="/craft/engaze/film" arrow>Watch the employee-experience teaser · 58 s</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-8"><span className="tag">{E.kicker}</span>{(cs.tags ?? []).map(t => <span key={t} className="tag">{t}</span>)}</div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-4xl">
            {[['Role', cs.role], ['Timeline', cs.timeline], ['Domain', cs.domain], ['EX module CSAT', '90%']].map(([k, v]) => (
              <div key={k}><dt className="text-overline text-ink-3">{k}</dt><dd className="text-title text-white mt-2">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-14"><Fig src={E.hero} alt="Engaze: one companion for every role" /></div>
        </div>
      </header>

      <Section id="brief">
        <SectionHeader label="01 · The brief" title="Build an HCM suite that works for everyone who uses it." intro={E.brief} />
        <div className="card max-w-3xl"><p className="text-overline text-ink-3">What is real, what is vision</p><p className="text-body text-ink-2 mt-3">{E.honesty}</p></div>
      </Section>

      <Section id="problem" tone="raised">
        <SectionHeader label="02 · The problem" title="Suites are sold as modules and experienced as chores." intro="Three patterns repeat across the category." />
        <div className="grid md:grid-cols-3 gap-4">
          {E.problem.map(([t, d]) => <div key={t} className="card"><p className="text-title text-white">{t}</p><p className="text-body text-ink-2 mt-3">{d}</p></div>)}
        </div>
        <p className="text-body-lg text-ink mt-14 max-w-[62ch]">{E.principle}</p>
      </Section>

      <Section id="roles">
        <SectionHeader label="03 · Six roles, one companion" title="Every role gets a home that starts from its day." intro="Pick a role to see what it needs, the moments the product is built around, and how the AI behaves." />
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Roles">
          {E.roles.map(r => <button key={r.id} type="button" role="tab" aria-selected={r.id === active} aria-pressed={r.id === active} className="chip" onClick={() => setActive(r.id)}>{r.label}</button>)}
        </div>
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-10 items-start">
          <div>
            <p className="text-overline text-ink-3">{role.who}</p>
            <p className="text-title text-white mt-3">{role.need}</p>
            <p className="text-overline text-ink-3 mt-8">Key moments</p>
            <ul className="mt-3 space-y-2">{role.moments.map(m => <li key={m} className="text-body text-ink-2">{m}</li>)}</ul>
            <p className="text-overline text-ink-3 mt-8">How the AI behaves</p>
            <ul className="mt-3 space-y-2">{role.ai.map(m => <li key={m} className="text-body text-ink-2">{m}</li>)}</ul>
          </div>
          <Fig src={role.image} alt={role.alt} note={role.id === 'employee' ? 'Employee experience: shipped module, redrawn with illustrative data.' : 'Design vision. Illustrative data.'} />
        </div>
      </Section>

      <Section id="scope" tone="raised">
        <SectionHeader label="04 · Scope" title="The whole lifecycle, in one product." intro="Six stages from attracting talent to understanding the workforce. Employee experience is one module, and the one that was built, shipped and measured." />
        <Fig src={E.scope.image} alt={E.scope.alt} />
      </Section>

      <Section id="platform">
        <SectionHeader label="05 · The platform" title="Connected, explainable, shared." intro="Experience is only as consistent as what sits underneath it." />
        <Fig src={E.architecture.image} alt={E.architecture.alt} />
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {E.architecture.points.map(([t, d]) => <div key={t} className="card"><p className="text-title text-white">{t}</p><p className="text-body-sm text-ink-2 mt-3">{d}</p></div>)}
        </div>
      </Section>

      <Section id="positioning" tone="raised">
        <SectionHeader label="06 · Positioning" title="How the stance differs from typical suites." intro={E.positioning.intro} />
        <div className="overflow-x-auto"><table className="w-full text-left min-w-[640px]">
          <thead><tr className="text-overline text-ink-3"><th className="py-3 pr-6 font-normal">Dimension</th><th className="py-3 pr-6 font-normal">Typical suite</th><th className="py-3 font-normal">Engaze</th></tr></thead>
          <tbody>{E.positioning.rows.map(([a, b, c]) => <tr key={a} className="hairline-top"><td className="py-4 pr-6 text-body text-white">{a}</td><td className="py-4 pr-6 text-body text-ink-3">{b}</td><td className="py-4 text-body text-ink">{c}</td></tr>)}</tbody>
        </table></div>
      </Section>

      <Section id="employee-experience">
        <SectionHeader label="07 · Deep dive" title={E.ex.title} intro={E.ex.intro} action={<Button to="/craft/engaze/film" arrow>{E.ex.teaserLabel}</Button>} />
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {E.ex.stats.map(([v, k]) => <div key={k} className="card"><dd className="text-display-l text-white">{v}</dd><dt className="text-body-sm text-ink-3 mt-2">{k}</dt></div>)}
        </dl>
        <div className="space-y-20">
          {E.ex.steps.map((s, i) => (
            <div key={s.label} className="grid lg:grid-cols-[1fr_1.6fr] gap-10 items-center">
              <div className={i % 2 ? 'lg:order-2' : ''}><p className="text-overline text-ink-3">{s.label}</p><h3 className="text-title text-white mt-3">{s.heading}</h3><p className="text-body text-ink-2 mt-4">{s.body}</p></div>
              <img src={s.image} alt={s.heading} loading="lazy" className="w-full rounded-xl border" style={{ borderColor: 'var(--line-2)' }} />
            </div>
          ))}
        </div>
        <p className="text-overline text-ink-3 mt-20 mb-6">Conversational interface</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {E.ex.screens.map((src, i) => <img key={src} src={src} alt={`Engaze conversational screen ${i + 1}`} loading="lazy" className="w-full rounded-xl border" style={{ borderColor: 'var(--line-2)' }} />)}
        </div>
      </Section>

      <Section id="language" tone="raised">
        <SectionHeader label="08 · Design language" title="Dark by default. Human in tone. Explainable in every pixel." />
        <Fig src={E.language.image} alt={E.language.alt} />
      </Section>

      <Section id="outcome">
        <SectionHeader label="09 · Outcome" title="Measured where it shipped. Designed where it did not." />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card"><p className="text-overline text-ink-3">Measured · employee experience</p>
            <ul className="mt-5 space-y-5">{E.outcomes.measured.map(([t, d]) => <li key={t}><p className="text-title text-white">{t}</p><p className="text-body-sm text-ink-2 mt-1">{d}</p></li>)}</ul></div>
          <div className="card"><p className="text-overline text-ink-3">Design vision · wider suite</p>
            <ul className="mt-5 space-y-3">{E.outcomes.vision.map(t => <li key={t} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">—</span>{t}</li>)}</ul></div>
        </div>
        {cs.testimonial && (
          <blockquote className="mt-16 max-w-3xl"><p className="text-title text-white">“{cs.testimonial.quote}”</p>
            <footer className="text-body-sm text-ink-3 mt-4">{cs.testimonial.name}, {cs.testimonial.title}</footer></blockquote>
        )}
      </Section>
    </div>
  )
}
