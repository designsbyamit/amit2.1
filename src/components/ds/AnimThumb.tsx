import { lazy, Suspense } from 'react'
import { timelines } from './anim/timelines'

const Player = lazy(() => import('./anim/Player'))
const FlowThumb = lazy(() => import('./FlowThumb'))

/** The animated thumbnail for a project: a live scripted loop of its prototype, built in the page rather than played from a video. */
export default function AnimThumb({ id }: { id: string }) {
  if (id === 'agentic') return <div className="absolute inset-0"><Suspense fallback={null}><FlowThumb /></Suspense></div>
  const tl = timelines[id]
  if (!tl) return null
  return (
    <div className="absolute inset-0" style={{ background: tl.stage }}>
      <Suspense fallback={null}><Player id={id} /></Suspense>
    </div>
  )
}
