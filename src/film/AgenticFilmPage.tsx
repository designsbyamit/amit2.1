import { useEffect } from 'react'
import Player from './Player'
import { Frame, Hook, Problem, Question, Concept, Architecture, Flow, Autonomy, Close, SHOTS, shotUrl, at } from './scenesAgentic'
import type { Chapter } from './engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: at(4), label: 'The problem' }, { at: at(10), label: 'The question' }, { at: at(12), label: 'Four decisions' },
  { at: at(28), label: 'One structure' }, { at: at(34), label: 'One order' }, { at: at(52), label: 'Autonomy' }, { at: at(58), label: 'The close' },
]

export default function AgenticFilmPage() {
  useEffect(() => { SHOTS.forEach(id => { const im = new Image(); im.src = shotUrl(id) }) }, [])
  return (
    <Player
      audioSrc="/audio/agentic-film-lead-score.mp3"
      title="Agentic Order Confirmation"
      subtitle="One order that took weeks, the question that changed, the four decisions that followed, and the same order through the new flow."
      chapters={chapters}
      backTo="/craft/sap-agentic"
      backLabel="← Read the case study"
      duration={126}
      render={t => <><Hook t={t} /><Problem t={t} /><Question t={t} /><Concept t={t} /><Architecture t={t} /><Flow t={t} /><Autonomy t={t} /><Close t={t} /><Frame t={t} /></>}
    />
  )
}
