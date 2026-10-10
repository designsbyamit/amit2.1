import Testimonials from '../components/sections/Testimonials'
import Button from '../components/ds/Button'
import Card from '../components/ds/Card'
import SectionHeader from '../components/ds/SectionHeader'
import { menteeTestimonials, quoteExcerpts } from '../data/testimonials'
import ResourceCover from '../components/ds/ResourceCover'

const ADPLIST = 'https://adplist.org/mentors/amit-kumar-tiwari'
const TOPMATE = 'https://topmate.io/amitkrt'

// Add the real figures from ADPList / Topmate here. Shown as placeholders until then.
const stats = [
  { value: '000', unit: 'hrs', label: 'Total mentoring time' },
  { value: '000', unit: '', label: 'Sessions this year' },
  { value: '000', unit: '', label: 'Designers mentored' },
  { value: '0.0', unit: '/ 5', label: 'Average rating on ADPList' },
]

const sessions = [
  {
    name: '60-minute mentorship session',
    length: 'One-to-one · 60 minutes',
    body: 'General mentorship on your career, your craft and what to do next. Bring a question, a decision or a piece of work.',
  },
  {
    name: '45-minute portfolio review',
    length: 'One-to-one · 45 minutes',
    body: 'A close read of your portfolio with constructive feedback on visual appeal, how the content is organised, and how well it speaks to the audience you want.',
  },
]


const templates: { id: string; title: string; motif: 'checklist' | 'loop' | 'phases' | 'spark'; tone: 'cobalt' | 'teal' | 'plum' | 'graphite'; use: string; prompts: string[] }[] = [
  {
    id: 'session-prep', title: 'Session prep sheet', motif: 'checklist', tone: 'cobalt',
    use: 'Fill it in before we meet, so the hour goes to decisions.',
    prompts: ['The one question I want answered by the end of the session', 'What I have already tried, and what happened', 'The work I am sharing (links) and what I want feedback on', 'What “useful” looks like for me after this call'],
  },
  {
    id: 'portfolio-review', title: 'Portfolio review checklist', motif: 'phases', tone: 'teal',
    use: 'Run your portfolio through it before a review or an application.',
    prompts: ['Who is this portfolio for, and what should they believe after five minutes?', 'Does each case study open with the problem, your role and the outcome?', 'Can someone skim it from headings and images alone?', 'Where do you show decisions and trade-offs, not only final screens?'],
  },
  {
    id: 'growth-map', title: 'One-year growth map', motif: 'loop', tone: 'plum',
    use: 'Set the direction first; we work backwards from it together.',
    prompts: ['Where I want to be in twelve months (role, skills, kind of work)', 'The gap between that and today, in three bullets', 'The next three moves, smallest first', 'Who can help, and what I will ask them'],
  },
  {
    id: 'portfolio-viz', title: 'Portfolio data visualisation', motif: 'spark', tone: 'graphite',
    use: 'Enter your projects once and see your portfolio as a picture: range, depth and gaps. An interactive version is in the works.',
    prompts: ['Project name, year and your role', 'Type of work and the outcome you can evidence', 'Skills each project shows', 'What the picture says about the story you are telling'],
  },
]

const requestTemplate = (title: string) => `mailto:uxbyamit@gmail.com?subject=${encodeURIComponent(`Template request - ${title}`)}&body=${encodeURIComponent(`Hello Amit,\n\nCould you send me the "${title}" template?\n\nName:\nRole:\n\nThank you.`)}`

const principles = [
  ['I read your work first', 'Before the call, I go through what you send. The time together goes to feedback and decisions, not to catching up.'],
  ['Clear, actionable feedback', 'You leave with specific next steps in order of importance, not a list of everything that could be better.'],
  ['Goals before tactics', 'We start with where you want to be in a year, then work backwards to what to change in your work and how you present it.'],
  ['A growth mindset', 'Early-career designers need clarity more than they need answers. The aim is to help you learn how to learn.'],
]

export default function MentoringPage() {
  return (
    <>
      <section className="relative" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-14 md:pt-20 pb-14 md:pb-20">
          <p className="text-overline text-ink-3 mb-8">Mentoring &amp; coaching</p>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 hairline-top pt-8">
            {stats.map(st => (
              <div key={st.label} className="flex flex-col gap-2">
                <dd className="text-display-l text-ink font-extralight tracking-[-0.04em] leading-none">{st.value}{st.unit && <span className="text-title text-ink-3 ml-2">{st.unit}</span>}</dd>
                <dt className="text-label text-ink-3">{st.label}</dt>
              </div>
            ))}
          </dl>
          <figure className="mt-14 md:mt-20 max-w-3xl">
            <blockquote className="text-heading text-ink" style={{ fontWeight: 300, lineHeight: 1.35 }}>“{quoteExcerpts.mahesh.quote}”</blockquote>
            <figcaption className="mt-5 text-caption text-ink-3">{quoteExcerpts.mahesh.name} · {quoteExcerpts.mahesh.role} · <a className="link" href={ADPLIST} target="_blank" rel="noopener noreferrer">ADPList</a></figcaption>
          </figure>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Sessions" title="Two ways to have a conversation." intro="Pick the hour that fits where you are." />
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {sessions.map(s => (
              <Card key={s.name}>
                <div className="flex flex-col gap-4 h-full">
                  <p className="text-overline text-ink-3">{s.length}</p>
                  <h3 className="text-title text-ink">{s.name}</h3>
                  <p className="text-body-sm text-ink-2 flex-1">{s.body}</p>
                  <div className="pt-2"><Button href={ADPLIST} arrow>Book on ADPList</Button></div>
                </div>
              </Card>
            ))}
          </div>
          <Card>
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div className="flex flex-col gap-3">
                <p className="text-overline text-ink-3">Longer engagements · Topmate</p>
                <h3 className="text-title text-ink">Coaching over weeks, not one hour.</h3>
                <p className="text-body-sm text-ink-2 max-w-2xl">For designers moving towards leadership, or rebuilding a portfolio and a career story over several sessions, with goals set at the start and a plan we revisit together.</p>
              </div>
              <div><Button variant="secondary" href={TOPMATE} arrow>Book on Topmate</Button></div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="How I mentor" title="Prepared, specific, honest." />
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {principles.map(([t, d]) => (
              <div key={t}>
                <h3 className="text-title text-ink mb-2">{t}</h3>
                <p className="text-body text-ink-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Templates" title="Come prepared, leave with a plan." intro="Four templates I use with mentees. Preview the prompts here and ask for the editable version by email." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tpl, i) => (
              <article key={tpl.id} className="card !p-0 overflow-hidden flex flex-col" aria-labelledby={`tpl-${tpl.id}`}>
                <div className="p-6 pb-0"><div className="max-w-[180px]"><ResourceCover title={tpl.title} kind="Template" motif={tpl.motif} tone={tpl.tone} index={i + 1} /></div></div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 id={`tpl-${tpl.id}`} className="text-title text-ink">{tpl.title}</h3>
                  <p className="text-body-sm text-ink-2">{tpl.use}</p>
                  <details className="group">
                    <summary className="cursor-pointer list-none text-body-sm text-ink underline underline-offset-4 decoration-[var(--line-control)] hover:decoration-current">Preview the prompts</summary>
                    <ol className="mt-4 flex flex-col gap-2.5">
                      {tpl.prompts.map((p, j) => <li key={j} className="flex gap-3 text-body-sm text-ink-2"><span className="text-label text-signal-ink pt-0.5">{String(j + 1).padStart(2, '0')}</span>{p}</li>)}
                    </ol>
                  </details>
                  <div className="mt-auto pt-2"><Button small variant="secondary" href={requestTemplate(tpl.title)}>Request the template</Button></div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-body-sm text-ink-3 mt-8">Starting a project instead? Use the <a className="link" href="https://forms.gle/FHJ1qEvRRsXzmkvu8" target="_blank" rel="noopener noreferrer">Kick-Off Questionnaire</a>.</p>
        </div>
      </section>

      <Testimonials label="Mentee voices" title="What mentees say." items={menteeTestimonials} />

    </>
  )
}
