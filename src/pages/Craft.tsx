import PageHeader from '../components/ui/PageHeader'
import WorksBento from '../components/sections/WorksBento'
import WorksCTA from '../components/sections/WorksCTA'
import { Link } from 'react-router-dom'
import { labs } from '../data/ia'
import StoryField from '../components/ds/StoryField'
import { shortStories } from '../data/shortStories'

export default function Craft() {
  return (
    <>
      <PageHeader
        label="Works"
        title="Work that matters at scale."
        subtitle="This work goes beyond the solutions delivered. It reflects how I approach complexity, bring business and user needs together, and help teams make thoughtful decisions when the answers aren’t obvious."
        image="/images/about/works-hero.webp" imagePosition="50% 30%" mono imageAlt="Amit presenting a user flow on a wall screen"
      />

      <WorksBento />

      {/* Short stories: one page each. Hidden while none are published. */}
      {shortStories.length > 0 && <section id="short-stories" className="hairline-top section-y scroll-mt-24" aria-labelledby="ss-h">
        <div className="container-site">
          <div className="grid-site gap-y-4 mb-10 md:mb-12">
            <h2 id="ss-h" className="col-span-4 md:col-span-3 text-overline text-ink-3">Short stories</h2>
            <p className="col-span-4 md:col-span-8 text-body-lg text-ink-2 max-w-2xl">Smaller projects, told on one page each.</p>
          </div>
          <ul className="grid md:grid-cols-3 gap-4">
            {shortStories.map(s => (
              <li key={s.slug}>
                <Link to={`/craft/stories/${s.slug}`} className="group card !p-0 flex flex-col h-full overflow-hidden hover:bg-surface-1 transition-colors">
                  <StoryField slug={s.slug} tone={s.tone} />
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="text-title text-ink">{s.title}</h3>
                    {s.meta && <p className="text-label text-ink-3">{s.meta.join(' · ')}</p>}
                    <p className="text-label text-ink-3 group-hover:text-ink mt-auto pt-2">Read &rarr;</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>}

      {/* In my labs: ideas being explored, one card each */}
      <section id="labs" className="hairline-top section-y scroll-mt-24" aria-labelledby="labs-h">
        <div className="container-site">
          <div className="grid-site gap-y-4 mb-10 md:mb-12">
            <h2 id="labs-h" className="col-span-4 md:col-span-3 text-overline text-ink-3">In my labs</h2>
            <p className="col-span-4 md:col-span-8 text-body-lg text-ink-2 max-w-2xl">Ideas I am exploring, not finished work. Each one is still taking shape.</p>
          </div>
          <ul className="grid md:grid-cols-3 gap-6">
            {labs.map(l => (
              <li key={l.id} className="card !p-0 overflow-hidden flex flex-col">
                <div className="bg-surface-1 aspect-[16/10] grid place-items-center border-b" style={{ borderColor: 'var(--line-1)' }}><LabPictogram id={l.id} /></div>
                <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                  <p className="text-label text-signal-ink">Exploring</p>
                  <h3 className="text-title text-ink">{l.title}</h3>
                  <p className="text-body text-ink-2">{l.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WorksCTA />
    </>
  )
}

/** Minimal fine-line pictograms for the labs cards. Ink and signal tokens, so they read in both themes. */
function LabPictogram({ id }: { id: string }) {
  const ink = { stroke: 'rgb(var(--ink-rgb) / 0.7)', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const dim = { ...ink, stroke: 'rgb(var(--ink-rgb) / 0.3)' }
  const sig = { ...ink, stroke: 'rgb(var(--signal-ink-rgb))' }
  return (
    <svg viewBox="0 0 240 150" className="w-3/5 h-auto" aria-hidden="true">
      {id === 'compositional' && <>
        <rect x="52" y="28" width="136" height="94" rx="8" {...dim} />
        <rect x="64" y="40" width="54" height="34" rx="4" {...ink} />
        <rect x="126" y="40" width="50" height="34" rx="4" {...sig} />
        <rect x="64" y="82" width="112" height="28" rx="4" {...ink} />
        <path d="M16 75h24M200 75h24" {...dim} strokeDasharray="2 6" />
      </>}
      {id === 'maturity' && <>
        <path d="M40 122h40v-24h40v-24h40v-24h40" {...ink} />
        <path d="M40 122h160" {...dim} />
        <circle cx="200" cy="50" r="6" {...sig} />
        <path d="M60 110v-4M100 86v-4M140 62v-4" {...dim} />
      </>}
      {id === 'shape' && <>
        <rect x="30" y="47" width="56" height="56" rx="2" {...ink} />
        <rect x="100" y="47" width="56" height="56" rx="16" {...dim} strokeDasharray="3 5" />
        <circle cx="198" cy="75" r="28" {...sig} />
      </>}
    </svg>
  )
}
