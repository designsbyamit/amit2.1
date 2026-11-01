import { useContact } from '../components/contact/ContactProvider'
import Testimonials from '../components/sections/Testimonials'
import Button from '../components/ds/Button'
import Card from '../components/ds/Card'
import SectionHeader from '../components/ds/SectionHeader'
import { menteeTestimonials } from '../data/testimonials'
import ResourceCover from '../components/ds/ResourceCover'

const ADPLIST = 'https://adplist.org/mentors/amit-kumar-tiwari'
const TOPMATE = 'https://topmate.io/amitkrt'

// From the ADPList "Impact at a glance" dashboard: 5,175 minutes (86 hours), 106 bookings, 4 countries.
const stats = [
  { value: '86', unit: 'hrs', label: 'Total mentoring time' },
  { value: '106', unit: '', label: 'Sessions so far' },
  { value: '4', unit: '', label: 'Countries' },
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


export default function MentoringPage() {
  const { open } = useContact()
  return (
    <>
      <section className="relative" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-14 md:pt-20 pb-14 md:pb-20">
          <p className="text-overline text-ink-3 mb-8">Mentoring &amp; coaching</p>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-6 hairline-top pt-8">
            {stats.map(st => (
              <div key={st.label} className="flex flex-col gap-2">
                <dd className="text-display-l text-ink font-extralight tracking-[-0.04em] leading-none">{st.value}{st.unit && <span className="text-title text-ink-3 ml-2">{st.unit}</span>}</dd>
                <dt className="text-label text-ink-3">{st.label}</dt>
              </div>
            ))}
          </dl>
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
                  <div className="mt-auto pt-2"><Button small variant="secondary" onClick={() => open({ topic: 'mentoring', subject: `Template request - ${tpl.title}`, message: `Could you send me the “${tpl.title}” template?` })}>Request the template</Button></div>
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
