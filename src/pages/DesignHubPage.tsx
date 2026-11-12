import Breadcrumb from '../components/ds/Breadcrumb'
import { Section, Head, Numbered, Defs } from '../components/case/Chapter'

const B = import.meta.env.BASE_URL

const numbers: [string, string][] = [
  ['14', 'Events this year'],
  ['500+', 'Attendance across them'],
  ['8+', 'Partners'],
  ['252+', 'Members'],
]

const pillars = [
  { t: 'Community', d: 'A place for designers across India to meet, share work and learn from each other.' },
  { t: 'Experience', d: 'Events and programmes designed with the same care as a product.' },
  { t: 'Academia', d: 'Bridges between design schools and the practice of design in industry.' },
  { t: 'Operations', d: 'The unseen work that makes everything else repeatable.' },
  { t: 'Impulse India', d: 'The annual design event, curated by the community.' },
]

export default function DesignHubPage() {
  return (
    <div className="bg-surface-0 min-h-screen">
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Collective', to: '/community' }, { label: 'Design Hub India' }]} />
          <p className="text-label text-ink-3 mt-10">Community · Leadership</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">Leading Design Hub India</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">A community of designers across India, run by volunteers who own their spaces and drive their own initiatives.</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-5xl">
            {numbers.map(([v, k]) => <div key={k}><dd className="text-display-l text-white">{v}</dd><dt className="text-label text-ink-3 mt-2">{k}</dt></div>)}
          </dl>
        </div>
      </header>

      <Section id="model" raised>
        <Head n={1} title="Volunteer driven, by design." intro="Nobody is assigned to the community. Volunteers choose a space, own it and run its initiatives, and the group of volunteers has grown from about 10 to more than 30." />
        <Defs rows={[
          ['Ownership', 'Each volunteer owns a space and the initiatives in it.'],
          ['Growth', 'From about 10 volunteers to 30+.'],
          ['Together', 'Everything the community does is done together.'],
        ]} />
      </Section>

      <Section id="pillars">
        <Head n={2} title="Five pillars." />
        <Numbered items={pillars} />
      </Section>

      <Section id="film" raised>
        <Head n={3} title="Impulse India 2025." intro="The film from the annual event." />
        <div className="rounded-3 overflow-hidden border max-w-5xl" style={{ borderColor: 'var(--line-2)' }}>
          <video controls preload="none" playsInline poster={`${B}images/design-hub/film-poster.webp`} className="w-full block bg-black" aria-label="Impulse India 2025 film">
            <source src={`${B}video/impulse-25-india.mp4`} type="video/mp4" />
          </video>
        </div>
      </Section>
    </div>
  )
}
