import Player from './Player'
import { EHook, EProblem, EPrinciples, ELayers, EPrototype, EOutcome } from './scenesEngaze'
import { EDURATION } from './scoreEngaze'
import type { Chapter } from './engine'

const chapters: Chapter[] = [{ at: 0, label: 'The hook' }, { at: 5, label: 'The problem' }, { at: 14, label: 'Principles' }, { at: 24, label: 'Three layers' }, { at: 32, label: 'The prototype' }, { at: 55, label: 'The outcome' }]

export default function EngazeFilmPage() {
  return (
    <Player
      audioSrc="/audio/engaze-teaser-score.mp3"
      duration={EDURATION}
      length="1 min 6 s"
      title="Engaze · Employee experience"
      subtitle="A teaser for the employee-experience module of an AI-native HCM suite: the problem, the principles, the three design layers, one sick leave applied in a sentence, and the result."
      chapters={chapters}
      backTo="/craft/engaze"
      backLabel="← Read the case study"
      render={t => <><EHook t={t} /><EProblem t={t} /><EPrinciples t={t} /><ELayers t={t} /><EPrototype t={t - 8} /><EOutcome t={t - 8} /></>}
    />
  )
}
