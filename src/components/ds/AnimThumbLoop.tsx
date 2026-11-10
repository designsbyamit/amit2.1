import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LoopSignIn, LoopCollections, LoopSearch, LoopCds, SIGNIN_LOOP, COLLECTIONS_LOOP, SEARCH_LOOP, CDS_LOOP, STAGE } from '../../film/scenesLoops'

/** Looping previews drawn on the cover's own 1800 x 1000 stage and scaled to fit it exactly. */
const LOOPS: Record<string, { duration: number; render: (t: number) => ReactNode }> = {
  signin: { duration: SIGNIN_LOOP, render: t => <LoopSignIn t={t} /> },
  collections: { duration: COLLECTIONS_LOOP, render: t => <LoopCollections t={t} /> },
  search: { duration: SEARCH_LOOP, render: t => <LoopSearch t={t} /> },
  cds: { duration: CDS_LOOP, render: t => <LoopCds t={t} /> },
}

export default function AnimThumbLoop({ id }: { id: string }) {
  const L = LOOPS[id]
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  const [t, setT] = useState(0)
  useEffect(() => {
    const el = wrap.current; if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / STAGE.w)); ro.observe(el); setScale(el.clientWidth / STAGE.w)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (!L) return
    let raf = 0; const t0 = performance.now()
    const tick = () => {
      const o = (window as unknown as { __loopT?: number }).__loopT
      if (typeof o === 'number') setT(o)
      else if (!document.hidden) setT(((performance.now() - t0) / 1000) % L.duration)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [L])
  if (!L) return null
  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      <div style={{ position: 'absolute', left: 0, top: 0, width: STAGE.w, height: STAGE.h, transformOrigin: '0 0', transform: `scale(${scale})` }}>{L.render(t)}</div>
    </div>
  )
}
