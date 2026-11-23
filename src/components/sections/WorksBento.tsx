import { menuWorks, pillars, previousWorkIds } from '../../data/ia'
import { playbackById } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

function Group({ title, ids, first, note, locked }: { title: string; ids: string[]; first?: boolean; note?: string; locked?: boolean }) {
  const items = ids.map(id => menuWorks.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c)
  return (
    <div className={first ? '' : 'mt-16 md:mt-24'}>
      <h2 className="text-overline text-ink-3">{title}</h2>
      {note && <p className="text-body text-ink-2 mt-3 max-w-2xl">{note}</p>}
      <div className="mb-6" />
      <ul>
        {items.map(cs => {
          const pb = playbackById(cs.id)
          if (!pb) return null
          return <li key={cs.id} className="hairline-top list-none"><ProjectCard cs={cs} pb={pb} variant="row" headingLevel="h3" locked={locked} /></li>
        })}
      </ul>
      <div className="hairline-top" />
    </div>
  )
}

/** The selected work in display order, then the case studies shared by access code. */
export default function WorksBento() {
  return (
    <section className="relative pb-16 md:pb-24" id="work">
      <div className="container-site">
        {pillars.map((p, i) => <Group key={p.name} title={p.name} ids={p.ids} first={i === 0} />)}
        <Group title="Under NDA" note="Shared by access code. Open one to enter your code, or ask for it." ids={previousWorkIds} locked />
      </div>
    </section>
  )
}
