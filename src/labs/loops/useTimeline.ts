import { useEffect, useState } from 'react'

/** Runs a scripted timeline: each step sets the scene state at a time (ms), then loops after `total` ms.
 *  `window.__restart()` restarts it from zero (used when recording the loop). */
export function useTimeline<T>(initial: T, steps: [number, (s: T) => T][], total: number): T {
  const [state, setState] = useState<T>(initial)
  const [run, setRun] = useState(0)
  useEffect(() => { (window as unknown as { __restart?: () => void }).__restart = () => setRun(r => r + 1) }, [])
  useEffect(() => {
    setState(initial)
    const ids = steps.map(([t, f]) => window.setTimeout(() => setState(f), t))
    ids.push(window.setTimeout(() => setRun(r => r + 1), total))
    return () => ids.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])
  return state
}
