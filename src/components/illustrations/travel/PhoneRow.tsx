// A row of the rebuilt app screens, one per journey, at phone size, scaled to the column.
import { Scaled } from '../../case/search/SearchDiagrams'
import { SCREENS, type ScreenId } from './Screens'

const W = 375, H = 812, GAP = 48

export default function PhoneRow({ items, arrows = true }: { items: [string, string][]; arrows?: boolean }) {
  const width = items.length * W + (items.length - 1) * GAP
  return (
    <Scaled w={width} h={H + 64} minW={720}>
      <div style={{ width, height: H + 64, display: 'flex', gap: GAP, position: 'relative' }}>
        {items.map(([id, label], i) => {
          const S = SCREENS[id as ScreenId]
          return (
            <div key={id} style={{ width: W, position: 'relative' }}>
              <div style={{ width: W, height: H, borderRadius: 44, overflow: 'hidden', boxShadow: '0 30px 60px -30px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.08)' }}><S /></div>
              <div style={{ marginTop: 22, font: '500 22px/1.2 var(--font-mono, ui-monospace)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgb(var(--ink-3-rgb))', textAlign: 'center' }}>{label}</div>
              {arrows && i < items.length - 1 && <svg width={GAP} height="24" viewBox="0 0 48 24" style={{ position: 'absolute', right: -GAP, top: H / 2 - 12 }} aria-hidden="true"><path d="M8 12h30M30 5l8 7-8 7" fill="none" stroke="rgb(var(--ink-3-rgb))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          )
        })}
      </div>
    </Scaled>
  )
}
