export type FieldTone = 'cobalt' | 'teal' | 'plum' | 'graphite'

/** Coloured frame for screenshots and covers. Identical in both modes. */
export default function MediaFrame({ src, alt, tone = 'cobalt', className = '', ratio = '16 / 10', position, loading = 'lazy' }: {
  src: string; alt: string; tone?: FieldTone; className?: string; ratio?: string; position?: string; loading?: 'lazy' | 'eager'
}) {
  return (
    <div className={`media-field ${tone === 'graphite' ? '' : `media-${tone}`} ${className}`.trim()} style={{ aspectRatio: ratio }}>
      <img src={src} alt={alt} loading={loading} decoding="async" style={position ? { objectPosition: position } : undefined} />
    </div>
  )
}
