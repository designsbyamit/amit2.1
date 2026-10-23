import { allWorks } from '../../data/ia'
import { playbackById } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

/** The six case studies as large story cards, stacked. Each opens its short story. */
export default function WorksBento() {
  return (
    <section className="relative pb-16 md:pb-24" id="work">
      <div className="container-site">
        <h2 className="text-overline text-ink-3 mb-6">Case studies</h2>
        <ul>
          {allWorks.map(cs => {
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
