import PageHeader from '../components/ui/PageHeader'
import Testimonials from '../components/sections/Testimonials'
import Button from '../components/ds/Button'
import Card from '../components/ds/Card'
import SectionHeader from '../components/ds/SectionHeader'
import Chip from '../components/ds/Chip'
import { menteeTestimonials } from '../data/testimonials'
import ResourceCover from '../components/ds/ResourceCover'

const ADPLIST = 'https://adplist.org/mentors/amit-kumar-tiwari'
const TOPMATE = 'https://topmate.io/amitkrt'

const sessions = [
  {
    name: 'Mentorship session',
    length: '60 minutes',
    body: 'General mentorship on your career, your craft and what to do next. Bring a question, a decision or a piece of work.',
  },
  {
    name: 'Portfolio review & revamp',
    length: '45 minutes',
    body: 'A close read of your portfolio with constructive feedback on visual appeal, how the content is organised, and how well it speaks to the audience you want.',
  },
]

const topics = ['Early-career growth', 'Portfolio and case studies', 'UX and product design', 'Interaction design', 'Research and usability testing', 'Presentation skills', 'Career direction', 'Moving into design leadership']

const templates: { id: string; title: string; motif: 'checklist' | 'loop' | 'phases'; tone: 'cobalt' | 'teal' | 'plum'; use: string; prompts: string[] }[] = [
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
      <PageHeader
        label="Mentoring & coaching"
        title="Guidance for designers who want to grow."
        subtitle="One-to-one sessions for early-career designers, portfolio reviews, and conversations for designers moving towards leadership."
      />

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Sessions" title="Two ways to work together." intro="Both are booked through ADPList. Longer coaching engagements are available through Topmate." />
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {sessions.map(s => (
              <Card key={s.name}>
                <p className="text-overline text-ink-3 mb-3">{s.length}</p>
                <h3 className="text-title text-ink mb-3">{s.name}</h3>
                <p className="text-body-sm text-ink-2">{s.body}</p>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href={ADPLIST}>Book on ADPList</Button>
            <Button variant="secondary" href={TOPMATE}>Book on Topmate</Button>
          </div>
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
          <SectionHeader label="What we can cover" title="Bring the thing on your mind." />
          <div className="flex flex-wrap gap-3">{topics.map(t => <Chip key={t}>{t}</Chip>)}</div>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Templates" title="Come prepared, leave with a plan." intro="Three templates I use with mentees. Preview the prompts here and ask for the editable version by email." />
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((tpl, i) => (
              <article key={tpl.id} className="card !p-0 overflow-hidden flex flex-col" aria-labelledby={`tpl-${tpl.id}`}>
                <div className="p-6 pb-0"><div className="max-w-[200px]"><ResourceCover title={tpl.title} kind="Template" motif={tpl.motif} tone={tpl.tone} index={i + 1} /></div></div>
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
