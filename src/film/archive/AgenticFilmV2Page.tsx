import { useEffect } from 'react'
import Player from '../Player'
import { Frame, Hook, Problem, Concept, Architecture, Flow, Autonomy, Close, SHOTS, shotUrl, at } from './scenesAgenticV2'
import type { Chapter } from '../engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: at(4), label: 'The problem' }, { at: at(12), label: 'The concept' }, { at: at(28), label: 'Architecture' },
  { at: at(34), label: 'The whole flow' }, { at: at(52), label: 'Autonomy' }, { at: at(58), label: 'The close' },
]

export default function AgenticFilmV2Page() {
  useEffect(() => { SHOTS.forEach(id => { const im = new Image(); im.src = shotUrl(id) }) }, [])
  return (
    <Player
      audioSrc="/audio/agentic-film-lead-score.mp3"
      title="Agentic Order Confirmation · v2 concepts (archived)"
      subtitle="Concept-led cut: the pattern, the agent, the contract, the risk model and the whole flow."
      chapters={chapters}
      backTo="/craft/sap-agentic"
      backLabel="← Read the case study"
      duration={126}
      render={t => <><Hook t={t} /><Problem t={t} /><Concept t={t} /><Architecture t={t} /><Flow t={t} /><Autonomy t={t} /><Close t={t} /><Frame t={t} /></>}
    />
  )
}
