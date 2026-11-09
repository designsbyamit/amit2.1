import Player from './Player'
import { IHook, IProblem, IApproach, IWork, IOutcome } from './scenesSignIn'
import type { Chapter } from './engine'

const chapters: Chapter[] = [{ at: 0, label: 'The hook' }, { at: 5, label: 'The problem' }, { at: 14, label: 'The approach' }, { at: 24, label: 'The card' }, { at: 42, label: 'The result' }]

export default function SignInFilmPage() {
  return (
    <Player
      audioSrc="/audio/signin-film-score.mp3"
      duration={50}
      length="50 s"
      title="Unified sign-in"
      subtitle="One sign-in standard for 1,500+ apps: the problem, three flows, one card, and the result."
      chapters={chapters}
      backTo="/craft/sap-signin"
      backLabel="← Read the short story"
      render={t => <><IHook t={t} /><IProblem t={t} /><IApproach t={t} /><IWork t={t} /><IOutcome t={t} /></>}
    />
  )
}
