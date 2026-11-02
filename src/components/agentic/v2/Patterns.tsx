import './v2.css'

export interface Pin { n: number; x: number; y: number }
export type WireKind = 'worklist' | 'extraction' | 'reference' | 'discrepancy' | 'timeline'
export interface Note { n: number; where: string; text: string }

const shot = (id: string) => `${import.meta.env.BASE_URL}images/case-studies/sap-agentic/${id}.webp`

/** One shimmer block, placed in percent of the frame. */
function B({ x, y, w, h, hot }: { x: number; y: number; w: number; h: number; hot?: boolean }) {
  return <span className={`wf-bar${hot ? ' wf-hot' : ''}`} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
}
function C({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <span className="wf-card" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
}
const rows = (n: number, y0: number, step: number) => Array.from({ length: n }, (_, i) => y0 + i * step)

function WireBody({ kind }: { kind: WireKind }) {
  switch (kind) {
    case 'worklist':
      return <>
        <B x={3} y={6} w={14} h={4} /><B x={3} y={14} w={44} h={3} /><B x={72} y={14} w={10} h={3} />
        <C x={2} y={24} w={96} h={72} />
        {[3, 14, 24, 35, 42, 52, 64, 78, 89].map((x, i) => <B key={x} x={x} y={28} w={7} h={2.5} hot={i === 6 || i === 7} />)}
        {rows(8, 38, 7.4).map(y => <span key={y}>
          <B x={3} y={y} w={7} h={2.5} /><B x={14} y={y} w={7} h={2.5} /><B x={24} y={y} w={12} h={2.5} /><B x={42} y={y} w={6} h={2.5} /><B x={52} y={y} w={10} h={2.5} />
          <B x={64} y={y} w={11} h={2.5} hot /><B x={78} y={y} w={5} h={2.5} hot /><B x={89} y={y} w={6} h={2.5} />
        </span>)}
      </>
    case 'extraction':
      return <>
        <B x={3} y={6} w={26} h={4} /><B x={32} y={6.5} w={10} h={3} hot />
        <C x={2} y={22} w={60} h={74} />
        <B x={5} y={27} w={12} h={3} />
        {[0, 1, 2].flatMap(r => [0, 1].map(c => <span key={`${r}${c}`}><B x={5 + c * 28} y={36 + r * 13} w={9} h={2} /><B x={5 + c * 28} y={41 + r * 13} w={20} h={3} hot={r === 0 && c === 1} /></span>))}
        <B x={5} y={78} w={52} h={3} /><B x={5} y={85} w={52} h={3} />
        <C x={66} y={22} w={32} h={74} />
        {rows(9, 28, 6.5).map(y => <B key={y} x={69} y={y} w={26} h={2} />)}
      </>
    case 'reference':
      return <>
        <B x={3} y={6} w={26} h={4} />
        <B x={3} y={14} w={9} h={3} /><B x={15} y={14} w={9} h={3} hot /><B x={27} y={14} w={9} h={3} />
        <C x={2} y={24} w={60} h={72} />
        <B x={5} y={29} w={12} h={3} />
        {[0, 1, 2].flatMap(r => [0, 1].map(c => <span key={`${r}${c}`}><B x={5 + c * 28} y={38 + r * 13} w={9} h={2} /><B x={5 + c * 28} y={43 + r * 13} w={20} h={3} hot={r === 1 && c === 0} /></span>))}
        <C x={66} y={24} w={32} h={72} />
        {rows(9, 30, 6.5).map((y, i) => <B key={y} x={69} y={y} w={26} h={2} hot={i === 4} />)}
      </>
    case 'discrepancy':
      return <>
        <B x={3} y={6} w={26} h={4} />
        <C x={2} y={14} w={96} h={18} /><B x={5} y={18} w={14} h={3} /><B x={5} y={24} w={44} h={3} hot />
        <C x={2} y={36} w={96} h={60} />
        {[4, 14, 26, 40, 54, 66, 86].map(x => <B key={x} x={x} y={40} w={7} h={2} />)}
        {rows(5, 48, 9).map(y => <span key={y}>
          <B x={4} y={y} w={7} h={2.4} /><B x={14} y={y} w={8} h={2.4} /><B x={26} y={y} w={8} h={2.4} /><B x={40} y={y} w={7} h={2.4} />
          <B x={54} y={y} w={6} h={2.4} hot /><B x={66} y={y} w={16} h={2.4} hot /><B x={86} y={y} w={9} h={3} />
        </span>)}
      </>
    case 'timeline':
      return <>
        <B x={3} y={6} w={26} h={4} /><B x={3} y={14} w={9} h={3} /><B x={15} y={14} w={9} h={3} /><B x={27} y={14} w={9} h={3} hot />
        <span className="wf-bar" style={{ left: '5%', top: '26%', width: '0.4%', height: '68%' }} />
        {rows(6, 28, 11.5).map((y, i) => <span key={y}>
          <span className={`wf-bar${i === 3 ? ' wf-hot' : ''}`} style={{ left: '4%', top: `${y}%`, width: '2%', height: '3.2%', borderRadius: 'var(--radius-pill)' }} />
          <B x={9} y={y} w={22} h={2.2} /><B x={9} y={y + 4.4} w={i === 4 ? 40 : 30} h={2.2} hot={i === 4} /><B x={46} y={y} w={8} h={2.2} />
        </span>)}
      </>
  }
}

const Pins = ({ pins }: { pins: Pin[] }) => <>{pins.map(p => <span key={p.n} className="pin" style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }} aria-hidden="true">{p.n}</span>)}</>

/** A shimmer wireframe (the anatomy) beside one real screen (the example), with matching numbered pins. */
export default function PatternFigure({ kind, img, alt, pins, wirePins }: { kind: WireKind; img: string; alt: string; pins: Pin[]; wirePins: Pin[] }) {
  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      <figure className="m-0 lg:col-span-4">
        <div className="wf" role="img" aria-label={`Wireframe of the ${kind} pattern`}><WireBody kind={kind} /><Pins pins={wirePins} /></div>
        <figcaption className="text-label text-ink-3 mt-3">The pattern</figcaption>
      </figure>
      <figure className="m-0 lg:col-span-8">
        <div className="relative rounded-3 overflow-hidden border border-[color:var(--line-1)] bg-surface-1">
          <img src={shot(img)} alt={alt} width={2880} height={1798} className="w-full h-auto block" loading="lazy" decoding="async" />
          <Pins pins={pins} />
        </div>
        <figcaption className="text-label text-ink-3 mt-3">In the product</figcaption>
      </figure>
    </div>
  )
}

export function PatternNotes({ notes }: { notes: Note[] }) {
  return (
    <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 mt-8">
      {notes.map(n => (
        <li key={n.n} className="hairline-top pt-4 grid grid-cols-[2rem_1fr] gap-x-3">
          <span className="pin pin-static">{n.n}</span>
          <div><p className="text-label text-ink-3">{n.where}</p><p className="text-body-sm text-ink-2 mt-1">{n.text}</p></div>
        </li>
      ))}
    </ol>
  )
}
