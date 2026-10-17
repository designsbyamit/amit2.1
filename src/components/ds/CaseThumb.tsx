import { thumbs, type ThumbLayer } from '../../data/thumbs'

/** One consistent thumbnail recipe for every case study:
 *  a light tonal field, no frame, a hero crop of the real interface and a smaller detail layer.
 *  Crops are done with CSS so the source files stay crisp and untouched. */
function Layer({ l, className, style }: { l: ThumbLayer; className: string; style?: React.CSSProperties }) {
  const [x, y, w, h] = l.crop
  return (
    <div
      className={`absolute overflow-hidden ${className}`}
      style={{
        aspectRatio: `${w * l.size[0]} / ${h * l.size[1]}`,
        backgroundColor: l.bg ?? '#fff',
        backgroundImage: `url(${l.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${100 / w}% auto`,
        backgroundPosition: `${w >= 1 ? 0 : (x / (1 - w)) * 100}% ${h >= 1 ? 0 : (y / (1 - h)) * 100}%`,
        ...style,
      }}
    />
  )
}

export default function CaseThumb({ id, className = '', ratio = '16 / 10', compact = false }: { id: string; className?: string; ratio?: string; compact?: boolean }) {
  const t = thumbs[id]
  if (!t) return null
  return (
    <div className={`thumb group/thumb relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, borderRadius: compact ? 10 : 20, background: `radial-gradient(120% 90% at 18% 8%, ${t.from}, ${t.to})` }} aria-hidden="true">
      <Layer l={t.hero} className="thumb-hero" style={{ left: '6%', top: '11%', width: '76%', borderRadius: compact ? 6 : 12, boxShadow: '0 30px 60px -18px rgb(20 28 48 / 0.32), 0 6px 16px -6px rgb(20 28 48 / 0.18)' }} />
      <Layer l={t.detail} className="thumb-detail" style={{ right: '5%', bottom: '-3%', width: '30%', borderRadius: compact ? 6 : 12, boxShadow: '0 26px 50px -14px rgb(20 28 48 / 0.4), 0 6px 14px -6px rgb(20 28 48 / 0.2)' }} />
    </div>
  )
}
