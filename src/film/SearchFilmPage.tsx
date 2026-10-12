import Player from './Player'
import { SHook, SSetup, SProblem, SProcess } from './scenesSearchA'
import { SAnatomy, SInteraction } from './scenesSearchB'
import { SPrototype, SOutcome } from './scenesSearchC'
import { SDURATION } from './scoreSearch'
import type { Chapter } from './engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: 9, label: 'The setup' }, { at: 25, label: 'The problem' }, { at: 51, label: 'Research' },
  { at: 74, label: 'Craft · anatomy' }, { at: 95, label: 'Interaction' }, { at: 117, label: 'The prototype' }, { at: 152, label: 'The outcome' },
]

export default function SearchFilmPage() {
  return (
    <Player
      audioSrc="/audio/search-film-score.mp3"
      duration={SDURATION}
      length="2 min 46 s"
      title="AI-Powered Search"
      subtitle="NorthStar has 43 apps and 43 search boxes. Maria needs a flight to Bangalore. A film about the research, the craft, the interaction behaviour, and one trip booked through search."
      chapters={chapters}
      backTo="/craft/sap-search"
      backLabel="← Read the case study"
      render={t => <><SHook t={t} /><SSetup t={t} /><SProblem t={t} /><SProcess t={t} /><SAnatomy t={t} /><SInteraction t={t} /><SPrototype t={t} /><SOutcome t={t} /></>}
    />
  )
}
