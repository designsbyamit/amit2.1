import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'
import { playbacks } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

/** Latest Works: the selected projects, one clean frame each, stacked. No sideways scrolling. */
export default function FeaturedWork() {
  const items = playbacks
    .filter(p => p.featured)
    .map(p => ({ pb: p, cs: caseStudies.find(c => c.id === p.id)! }))
    .filter(x => x.cs)

  return (
    <section className="section-y hairline-top" id="selected-work" aria-labelledby="latest-works-h">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6 mb-4 md:mb-6">
          <h2 id="latest-works-h" className="text-display-l text-ink">Latest Works</h2>
          <Link to="/craft" className="btn btn-ghost">See all work</Link>
        </div>
        <ul className="divide-y" style={{ borderColor: 'var(--line-1)' }}>
          {items.map(({ pb, cs }) => (
            <li key={cs.id} className="list-none" style={{ borderColor: 'var(--line-1)' }}>
              <ProjectCard cs={cs} pb={pb} variant="row" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
