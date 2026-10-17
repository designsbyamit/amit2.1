import { useEffect } from 'react'
import Player from './Player'
import { Frame, Hook, Setup, People, Problem, Concept, Solution, Impact, Next, IMAGES, at } from './scenesAgentic'
import type { Chapter } from './engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: at(4), label: 'The setup' }, { at: at(12), label: 'The people' }, { at: at(18), label: 'The problem' },
  { at: at(26), label: 'The concept' }, { at: at(38), label: 'The solution' }, { at: at(52), label: 'The impact' }, { at: at(58), label: 'What’s next' },
]

export default function AgenticFilmPage() {
  useEffect(() => { IMAGES.forEach(src => { const im = new Image(); im.src = src }) }, [])
  return (
    <Player
      audioSrc="/audio/agentic-film-lead-score.mp3"
      title="Agentic Order Confirmation"
      subtitle="A two-minute story for anyone new to procurement: a pharma company, three people, one problem, and how it was solved."
      chapters={chapters}
      backTo="/craft/sap-agentic"
      backLabel="← Read the case study"
      duration={126}
      render={t => <><Hook t={t} /><Setup t={t} /><People t={t} /><Problem t={t} /><Concept t={t} /><Solution t={t} /><Impact t={t} /><Next t={t} /><Frame t={t} /></>}
    />
  )
}
