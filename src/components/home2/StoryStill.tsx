import { Link } from 'react-router-dom'
import Button from '../ds/Button'
import CaseThumb from '../ds/CaseThumb'

/** Reduced motion: the same story, as plain sections in their finished state. */
const S = [
  ['Design is undergoing a profound transformation.', 'Evolving human behaviour. Changing business ambitions. And the technology enabling both. I work at their convergence.'],
  ['This convergence is changing what design can make possible.', 'More meaningful experiences. More intelligent products. Greater business value.'],
  ['From possibility to practice.', 'A selection of experiences shaped across enterprise, AI and digital products.'],
  ['Every experience adds to the perspective.', '16+ years. 61 projects. Multiple industries. An evolving body of work.'],
  ['Because meaningful work takes collective effort.', 'Building teams. Developing talent. Creating the conditions for good design to thrive. 200+ designers hired across organisations.'],
  ['And good design grows beyond the team.', 'Creating spaces for designers to connect, exchange ideas and grow together. 252+ members in Leading Design Hub India.'],
  ['Experience becomes more valuable when it is shared.', 'Workshops. Mentoring. Resources. Ideas translated into practice.'],
  ['The next chapter is still taking shape.', 'Exploring new possibilities in design, business and AI. Always open to meaningful collaborations and conversations.'],
]
export default function StoryStill() {
  return (
    <div className="container-site pt-[calc(var(--header-h)+var(--space-60))] pb-24 flex flex-col gap-24">
      {S.map(([m, s], i) => (
        <section key={i}>
          <h2 className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.06 }}>{m}</h2>
          <p className="text-body-lg text-ink-2 mt-4 max-w-3xl">{s}</p>
          {i === 2 && <div className="grid md:grid-cols-3 gap-6 mt-10">{['sap-search', 'sap-agentic', 'airline-app'].map(id => <Link key={id} to={`/craft/${id}`}><CaseThumb id={id} /></Link>)}</div>}
          {i === 3 && <a href="/career-atlas/" className="text-label text-ink-2 underline mt-4 inline-block">Open the career atlas</a>}
          {i === 6 && <div className="flex flex-wrap gap-6 mt-6"><Link className="underline" to="/resources/dual-fluency">Build Dual Fluency</Link><Link className="underline" to="/resources/leading-design">Leading Design</Link><Link className="underline" to="/leadership/cases/ai-experimentation-to-capability">From AI experiments to a capability</Link></div>}
          {i === 7 && <div className="flex flex-wrap gap-3 mt-6"><Button to="/contact" arrow>Start a conversation</Button><Button to="/craft" variant="secondary">See all works</Button></div>}
        </section>
      ))}
    </div>
  )
}
