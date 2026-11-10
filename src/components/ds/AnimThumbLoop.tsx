import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LoopSignIn, LoopCollections, LoopCds, SIGNIN_LOOP, COLLECTIONS_LOOP, CDS_LOOP } from '../../film/scenesLoops'
import { SPrototype } from '../../film/scenesSearchC'
import { Mesh } from '../../film/scenesLoops'
import { C } from '../../film/ui'

/** Looping previews made from the same scenes as the films, drawn on a 1920 x 1080 stage and scaled to the cover. */
const LOOPS: Record<string, { duration: number; from?: number; speed?: number; render: (t: number) => ReactNode }> = {
  signin: { duration: SIGNIN_LOOP, render: t => <LoopSignIn t={t} /> },
  collections: { duration: COLLECTIONS_LOOP, render: t => <LoopCollections t={t} /> },
  cds: { duration: CDS_LOOP, render: t => <LoopCds t={t} /> },
  search: { duration: 28, from: 117, speed: 1.2, render: t => <><Mesh id="sap-search" /><SPrototype t={t} /></> },
}
export const hasLoop = (id: string) => id in LOOPS

export default function AnimThumbLoop({ id }: { id: string }) {
  const L = LOOPS[id]
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const [t, setT] = useState(0)
  useEffect(() => {
    const el = wrap.current; if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1920)); ro.observe(el); setScale(el.clientWidth / 1920)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (!L) return
    let raf = 0; const t0 = performance.now(); const sp = L.speed ?? 1
    const tick = () => { if (!document.hidden) setT(((performance.now() - t0) / 1000 * sp) % L.duration + (L.from ?? 0)); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [L])
  if (!L) return null
  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden" style={{ background: C.bg, fontFamily: "'Geist Variable','Geist',system-ui,sans-serif" }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `scale(${scale})` }}>{L.render(t)}</div>
    </div>
  )
}
