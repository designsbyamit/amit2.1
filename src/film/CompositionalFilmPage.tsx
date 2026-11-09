import Player from './Player'
import { KHook, KProblem, KApproach, KWork, KOutcome } from './scenesCompositional'
import type { Chapter } from './engine'

const chapters: Chapter[] = [{ at: 0, label: 'The hook' }, { at: 5, label: 'The problem' }, { at: 14, label: 'The approach' }, { at: 28, label: 'The path' }, { at: 46, label: 'The toolkit' }]

export default function CompositionalFilmPage() {
  return (
    <Player
      audioSrc="/audio/compositional-film-score.mp3"
      duration={54}
      length="54 s"
      title="Beyond compositions"
      subtitle="Intelligent experience optimisation for a compositional design system: the problem, five parts, the path from intent to interface, and the toolkit."
      chapters={chapters}
      backTo="/craft/sap-compositional"
      backLabel="← Read the short story"
      render={t => <><KHook t={t} /><KProblem t={t} /><KApproach t={t} /><KWork t={t} /><KOutcome t={t} /></>}
    />
  )
}
