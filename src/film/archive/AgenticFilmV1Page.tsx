import Player from '../Player'
import { Hook, Setup, Problem, Process, Architecture, Peak, Denouement } from './scenesAgenticV1'
import type { Chapter } from '../engine'

const chapters: Chapter[] = [
  { at: 0, label: 'The hook' }, { at: 10, label: 'The setup' }, { at: 28, label: 'The problem' }, { at: 55, label: 'Process & craft' },
  { at: 75, label: 'Architecture' }, { at: 95, label: 'The peak' }, { at: 108, label: 'The outcome' },
]

export default function AgenticFilmV1Page() {
  return (
    <Player
      audioSrc="/audio/archive-agentic-film-v1.mp3"
      title="Agentic Order Confirmation · v1 (archived)"
      subtitle="A two-minute film. NorthStar Chemicals & Pharma sends one RFQ to 14 suppliers. What happens when the answers come back?"
      chapters={chapters}
      backTo="/craft/sap-agentic"
      backLabel="← Read the case study"
      render={t => <><Hook t={t} /><Setup t={t} /><Problem t={t} /><Process t={t} /><Architecture t={t} /><Peak t={t} /><Denouement t={t} /></>}
    />
  )
}
