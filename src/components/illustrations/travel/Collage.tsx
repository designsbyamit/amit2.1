// The first-screen still for the Travel booking story: a staggered masonry of the app's screens, light and dark,
// on a flat ground, in the style of Amit's UI collage (Figma CaseStudy, node 2007:3332).
import { Scaled } from '../../case/search/SearchDiagrams'
import { SCREENS, type ScreenId } from './Screens'

const GAP = 40, W = 375, H = 812

function Masonry({ cols, offsets, height }: { cols: ScreenId[][]; offsets: number[]; height: number }) {
  const width = cols.length * W + (cols.length - 1) * GAP + GAP * 2
  return (
    <Scaled w={width} h={height}>
      <div style={{ width, height, background: '#050806', overflow: 'hidden', position: 'relative', borderRadius: 8 }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ position: 'absolute', left: GAP + ci * (W + GAP), top: offsets[ci], display: 'flex', flexDirection: 'column', gap: GAP }}>
            {col.map(id => { const S = SCREENS[id]; return <div key={id} style={{ width: W, height: H }}><S /></div> })}
          </div>
        ))}
      </div>
    </Scaled>
  )
}

export default function Collage() {
  return (
    <>
      <div className="hidden md:block">
        <Masonry height={1400} offsets={[260, -120, 140, -360, 60, -200]} cols={[
          ['faceid', 'splash'],
          ['home', 'missing'],
          ['book', 'results'],
          ['where', 'seat', 'review'],
          ['pass', 'addons'],
          ['fares', 'confirmed', 'passenger'],
        ]} />
      </div>
      <div className="md:hidden">
        <Masonry height={1500} offsets={[120, -260, 40]} cols={[['home', 'seat'], ['book', 'pass', 'results'], ['confirmed', 'missing']]} />
      </div>
    </>
  )
}
