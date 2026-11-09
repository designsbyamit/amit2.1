import PageHeader from '../components/ui/PageHeader'
import WorksBento from '../components/sections/WorksBento'
import WorksCTA from '../components/sections/WorksCTA'
import { Link } from 'react-router-dom'
import { research } from '../data/ia'
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

      {/* Research: on the way */}
      <section id="research" className="hairline-top section-y scroll-mt-24" aria-labelledby="rs-h">
        <div className="container-site">
          <div className="grid-site gap-y-4 mb-10 md:mb-12">
            <h2 id="rs-h" className="col-span-4 md:col-span-3 text-overline text-ink-3">Research</h2>
            <p className="col-span-4 md:col-span-8 text-body-lg text-ink-2 max-w-2xl">In progress: {research.join(', ')}. Coming soon.</p>
          </div>
        </div>
      </section>

      <WorksCTA />
    </>
  )
}
