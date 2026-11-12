import Player from './Player'
import { SHook, SComplex, SPeople, SOrg, SDecision, SProduct, SAnywhere, SResult, SEARCH_FILM_DURATION } from './scenesSearchFilm'
import type { Chapter } from './engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: 6.4, label: 'The complexity' }, { at: 17, label: 'The people' }, { at: 27, label: 'The work' },
  { at: 37, label: 'The decision' }, { at: 51, label: 'The product' }, { at: 90, label: 'Start anywhere' }, { at: 97, label: 'Where it stands' },
]

export default function SearchFilmPage() {
  return (
    <Player
      audioSrc="/audio/search-film-monsoon-cut.mp3"
      duration={SEARCH_FILM_DURATION}
      length="1 min 46 s"
      title="AI-Powered Search"
      subtitle="One global search, in the shell bar of every application. It returns results from all of them, and an action opens the application where the work continues."
      chapters={chapters}
      backTo="/craft/sap-search"
      backLabel="← Read the short story"
      render={t => <><SHook t={t} /><SComplex t={t} /><SPeople t={t} /><SOrg t={t} /><SDecision t={t} /><SProduct t={t} /><SAnywhere t={t} /><SResult t={t} /></>}
    />
  )
}
