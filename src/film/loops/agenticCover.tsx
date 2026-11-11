import { useEffect, useRef, useState } from 'react'
import FlowThumb from '../../components/ds/FlowThumb'
import { Backdrop, Float, Ico, STAGE, WIN, W, H } from './kit'

/** Still cover for the Procurement case: its own preview, frozen on one moment and framed on the case mesh. Used only to cut the cover image. */
export default function AgenticCover() {
  const wrap = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(0.4)
  useEffect(() => { const el = wrap.current; if (!el) return; const ro = new ResizeObserver(() => setK(el.clientWidth / STAGE.w)); ro.observe(el); setK(el.clientWidth / STAGE.w); return () => ro.disconnect() }, [])
  return <div ref={wrap} className="absolute inset-0 overflow-hidden">
    <div style={{ position: 'absolute', left: 0, top: 0, width: STAGE.w, height: STAGE.h, transformOrigin: '0 0', transform: `scale(${k})`, fontFamily: "'Geist Variable','Geist',system-ui,sans-serif" }}>
      <Backdrop look={{ mesh: 'sap-agentic', a: '#3FB6EA', tint: '#E3F4FB', dark: '#052F4E' }} />
      <div style={{ position: 'absolute', left: WIN.x - 10, top: WIN.y - 10, width: W + 20, height: H + 20, borderRadius: 28, background: 'rgba(255,255,255,.10)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18)' }} />
      <div style={{ position: 'absolute', left: WIN.x, top: WIN.y, width: W, height: H, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,.10), 0 24px 48px -16px rgba(0,0,0,.35), 0 70px 120px -40px rgba(0,0,0,.45)' }}>
        <FlowThumb at={3 * 2.8 + 1.6} bare zoom={1.18} />
      </div>
      <Float x={1230} y={650} w={420} h={110} s={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 48, height: 48, borderRadius: 24, background: '#E3F4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico n="user" s={24} c="#0B5A86" /></span>
        <span style={{ lineHeight: '28px' }}><span style={{ display: 'block', fontSize: 22, fontWeight: 500 }}>A person at every gate</span><span style={{ fontSize: 17, color: '#647081' }}>The agent does the legwork</span></span>
      </Float>
    </div>
  </div>
}
