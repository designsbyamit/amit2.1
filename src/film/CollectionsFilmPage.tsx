import Player from './Player'
import { CHook, CProblem, CApproach, CWork, COutcome } from './scenesCollections'
import type { Chapter } from './engine'

const chapters: Chapter[] = [{ at: 0, label: 'The hook' }, { at: 5, label: 'The problem' }, { at: 14, label: 'The approach' }, { at: 26, label: 'The product' }, { at: 46, label: 'The outcome' }]

export default function CollectionsFilmPage() {
  return (
    <Player
      audioSrc="/audio/collections-film-score.mp3"
      duration={56}
      length="56 s"
      title="Agentic collections"
      subtitle="Overdue invoices, managed by agents and led by humans: the problem, the approach, the product and the result."
      chapters={chapters}
      backTo="/craft/sap-collections"
      backLabel="← Read the short story"
      render={t => <><CHook t={t} /><CProblem t={t} /><CApproach t={t} /><CWork t={t} /><COutcome t={t} /></>}
    />
  )
}
