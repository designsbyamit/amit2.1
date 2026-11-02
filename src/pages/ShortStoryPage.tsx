import { Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/ds/Breadcrumb'
import ShortStoryTag from '../components/playback/ShortStoryTag'
import NextUp from '../components/case/NextUp'
import { nextShortStory } from '../data/sequence'
import StoryField from '../components/ds/StoryField'
import { storyBySlug } from '../data/shortStories'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** A short story: one page for one project. Same stacked sections as the other short stories, with a field of colour in place of a cover. */
export default function ShortStoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const s = slug ? storyBySlug(slug) : undefined
  if (!s) return <Navigate to="/craft" replace />

  return (
    <article>
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="mb-8"><Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Short stories', to: '/craft#short-stories' }, { label: 'Short story' }]} /></div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5">
            <p className="text-label text-ink-3">Short story</p>
            <span className="md:hidden"><ShortStoryTag compact /></span>
          </div>
          <h1 className="text-ink font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.1rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textWrap: 'balance' }}>{s.title}</h1>
          <div className="relative hidden md:block h-40"><div className="absolute right-[3%] top-[1.25rem]"><ShortStoryTag /></div></div>
          {s.meta && <p className="text-label text-ink-3 mt-6">{s.meta.join(' · ')}</p>}
          <StoryField slug={s.slug} tone={s.tone} size={150} aspect="1800 / 700" className="mt-10 rounded-3" />
        </div>
      </header>

      {s.sections.map((sec, k) => (
        <section key={sec.label} className={`hairline-top section-y ${k % 2 === 0 ? 'bg-surface-1' : 'bg-surface-0'}`} aria-labelledby={`sec-${k}`}>
          <div className="container-site grid-site gap-y-6 items-start">
            <h2 id={`sec-${k}`} className="col-span-4 md:col-span-3 text-overline text-ink-3">{sec.label}</h2>
            <ul className="col-span-4 md:col-span-8 flex flex-col gap-5 max-w-2xl">
              {sec.items.map(it => (
                <li key={(it.lead ?? '') + it.text} className="flex gap-3 text-body-lg text-ink-2"><span aria-hidden="true" className="text-signal-ink mt-[0.1em]">–</span>
                  <span>{it.lead && <strong className="text-ink font-medium">{it.lead}{it.text ? ': ' : ''}</strong>}{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {s.link && (
        <section className="hairline-top section-y">
          <div className="container-site">
            <a href={s.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{s.link.label}<Arrow /></a>
          </div>
        </section>
      )}

      <NextUp link={nextShortStory(s.slug)} />
    </article>
  )
}
