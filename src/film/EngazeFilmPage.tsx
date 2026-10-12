import Player from './Player'
import { EHook, EProblem, EPrinciples, EPrototype, EOutcome } from './scenesEngaze'
import { EDURATION } from './scoreEngaze'
import type { Chapter } from './engine'

const chapters: Chapter[] = [{ at: 0, label: 'The hook' }, { at: 5, label: 'The problem' }, { at: 14, label: 'Principles' }, { at: 24, label: 'The prototype' }, { at: 47, label: 'The outcome' }]

export default function EngazeFilmPage() {
  return (
    <Player
      audioSrc="/audio/engaze-teaser-score.mp3"
      duration={EDURATION}
      length="58 seconds"
      title="Engaze · Employee experience"
      subtitle="A teaser for the employee-experience module of an AI-native HCM suite: the problem, the principles, one sick leave applied in a sentence, and the result."
      chapters={chapters}
      backTo="/craft/engaze"
      backLabel="← Read the case study"
      render={t => <><EHook t={t} /><EProblem t={t} /><EPrinciples t={t} /><EPrototype t={t} /><EOutcome t={t} /></>}
    />
  )
}
