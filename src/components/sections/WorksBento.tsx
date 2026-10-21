import { caseStudies } from '../../data/work'
import { playbackById } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

/** Every project as a large story card, stacked. Each opens its one-minute playback. */
export default function WorksBento() {
  return (
    <section className="relative pb-16 md:pb-24" id="work">
      <div className="container-site">
        <ul>
          {caseStudies.map(cs => {
            const pb = playbackById(cs.id)
            if (!pb) return null
            return <li key={cs.id} className="hairline-top list-none"><ProjectCard cs={cs} pb={pb} variant="row" headingLevel="h2" /></li>
          })}
        </ul>
        <div className="hairline-top" />
      </div>
    </section>
  )
}
