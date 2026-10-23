import Mark, { type MarkName } from '../marks/Marks'
import type { FieldTone } from './MediaFrame'

const bg: Record<FieldTone, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' }

/** The small cover used in menu panels for pages that have no case-study image: a flat field, the faint grid and one pictogram. Same in both modes. */
export default function MenuCover({ mark, tone, size = 68 }: { mark: MarkName; tone: FieldTone; size?: number }) {
  return (
    <div className="relative grid place-items-center overflow-hidden text-white" style={{ background: bg[tone], aspectRatio: '1800 / 1000', borderRadius: 10, ['--mk-accent' as string]: '#C8F55A', ['--mk-bg' as string]: 'transparent' }} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative"><Mark name={mark} size={size} /></div>
    </div>
  )
}
