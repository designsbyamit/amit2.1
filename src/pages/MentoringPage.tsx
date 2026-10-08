import PageHeader from '../components/ui/PageHeader'
import Testimonials from '../components/sections/Testimonials'
import Button from '../components/ds/Button'
import Card from '../components/ds/Card'
import SectionHeader from '../components/ds/SectionHeader'
import Chip from '../components/ds/Chip'
import { menteeTestimonials } from '../data/testimonials'

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
                <h3 className="text-title text-white mb-3">{s.name}</h3>
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
                <h3 className="text-title text-white mb-2">{t}</h3>
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

      <Testimonials label="Mentee voices" title="What mentees say." items={menteeTestimonials} />

      <section className="section-y hairline-top">
        <div className="container-site">
          <SectionHeader label="Next step" title="Pick a time that suits you." />
          <div className="flex flex-wrap gap-4">
            <Button href={ADPLIST}>Book on ADPList</Button>
            <Button variant="secondary" to="/contact">Other ways to reach me</Button>
          </div>
        </div>
      </section>
    </>
  )
}
