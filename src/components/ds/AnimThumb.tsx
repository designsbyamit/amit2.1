import { lazy, Suspense } from 'react'
import { timelines } from './anim/timelines'

const Player = lazy(() => import('./anim/Player'))
const FlowThumb = lazy(() => import('./FlowThumb'))
const AnimThumbLoop = lazy(() => import('./AnimThumbLoop'))
const AgenticCover = lazy(() => import('../../film/loops/agenticCover'))
const LOOP_IDS = ['signin', 'collections', 'cds', 'search', 'engaze', 'travel', 'data', 'options']

/** The animated thumbnail for a project: a live scripted loop of its prototype, built in the page rather than played from a video. */
export default function AnimThumb({ id }: { id: string }) {
  if (LOOP_IDS.includes(id)) return <div className="absolute inset-0"><Suspense fallback={null}><AnimThumbLoop id={id} /></Suspense></div>
  if (id === 'agentic' && (window as unknown as { __cover?: boolean }).__cover) return <div className="absolute inset-0"><Suspense fallback={null}><AgenticCover /></Suspense></div>
  if (id === 'agentic') return <div className="absolute inset-0"><Suspense fallback={null}><FlowThumb /></Suspense></div>
  const tl = timelines[id]
  if (!tl) return null
  return (
    <div className="absolute inset-0" style={{ background: tl.stage }}>
      <Suspense fallback={null}><Player id={id} /></Suspense>
    </div>
  )
}
