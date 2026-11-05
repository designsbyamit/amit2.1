import { menuWorks, pillars, previousWorkIds } from '../../data/ia'
import { playbackById } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

function Group({ title, ids, first }: { title: string; ids: string[]; first?: boolean }) {
  const items = ids.map(id => menuWorks.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c)
  return (
    <div className={first ? '' : 'mt-16 md:mt-24'}>
      <h2 className="text-overline text-ink-3 mb-6">{title}</h2>
      <ul>
        {items.map(cs => {
          const pb = playbackById(cs.id)
          if (!pb) return null
          return <li key={cs.id} className="hairline-top list-none"><ProjectCard cs={cs} pb={pb} variant="row" headingLevel="h3" /></li>
        })}
      </ul>
      <div className="hairline-top" />
    </div>
  )
}

/** Case studies grouped by capability pillar, then the earlier works. Each opens its short story. */
export default function WorksBento() {
  return (
    <section className="relative pb-16 md:pb-24" id="work">
      <div className="container-site">
        {pillars.map((p, i) => <Group key={p.name} title={p.name} ids={p.ids} first={i === 0} />)}
        <Group title="Previous works" ids={previousWorkIds} />
      </div>
    </section>
  )
}
