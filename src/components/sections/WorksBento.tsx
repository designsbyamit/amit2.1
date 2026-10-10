import { caseStudies } from '../../data/work'
import CaseRow from '../ds/CaseRow'

export default function WorksBento() {
  return (
    <section className="relative pb-16 md:pb-24" id="work">
      <div className="container-site">
        <ul>{caseStudies.map((cs, i) => <CaseRow key={cs.id} cs={cs} index={i} headingLevel="h2" />)}</ul>
        <div className="hairline-top" />
      </div>
    </section>
  )
}
