import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, Card, Chip, Tag, TagList, Status, Breadcrumb, Callout, Stat, SectionHeader, ThemeToggle, useTheme, Tabs, Accordion, TextField, TextArea, Quote, MediaFrame } from '../components/ds'
import CaseRow from '../components/ds/CaseRow'
import StoryCover from '../components/ds/StoryCover'
import ResourceCover from '../components/ds/ResourceCover'
import TypedWord from '../components/ds/TypedWord'
import ShortStoryTag from '../components/playback/ShortStoryTag'
import ProcessFlow from '../components/playback/ProcessFlow'
import Distinct from '../components/case/Distinct'
import Brands from '../components/sections/Brands'
import { caseStudies } from '../data/work'
import { playbacks } from '../data/playbacks'
import Logo from '../components/layout/Logo'
import Mark, { type MarkName } from '../components/marks/Marks'
import Illustration, { type IllustrationName } from '../components/illustrations/Illustration'
import { SCENES } from '../components/illustrations/scenes'
import CaseThumb from '../components/ds/CaseThumb'
import { MentoringPictogram, ResourcesPictogram, CommunityPictogram, ReflectionsPictogram, PracticePictogram, PortfolioPictogram } from './grow/GrowPictograms'
import { shortStories } from '../data/shortStories'
import { markForStory } from '../components/marks/Marks'

/* The full reference for the design system behind this site. Everything on the page is rendered with the real
   tokens, components and marks, so it can never drift from the site. Noindex, linked from /design-system. */

const sections = [
  ['principles', 'Principles'], ['foundations', 'Foundations'], ['icons', 'Icons'], ['illustration', 'Illustration'],
  ['pictograms', 'Pictograms'], ['imagery', 'Imagery'], ['components', 'Components'], ['patterns', 'Patterns'], ['interaction', 'Interaction'],
  ['motion', 'Motion'], ['voice', 'Voice'], ['governance', 'Governance'],
] as const

function Block({ id, n, title, intro, children }: { id: string; n: string; title: ReactNode; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="section-y hairline-top scroll-mt-24">
      <div className="container-site">
        <SectionHeader label={`${n} · ${sections.find(s => s[0] === id)?.[1]}`} title={title} intro={intro} />
        {children}
      </div>
    </section>
  )
}

function Spec({ name, note, children }: { name: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-[14rem_1fr] gap-4 md:gap-10 py-8 hairline-top">
      <div><p className="text-title text-ink">{name}</p>{note && <p className="text-body-sm text-ink-3 mt-2 max-w-[28ch]">{note}</p>}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Rules({ items }: { items: [string, string][] }) {
  return (
    <ol className="grid md:grid-cols-2 gap-x-10 gap-y-8">
      {items.map(([h, b], i) => (
        <li key={h} className="flex gap-4">
          <span className="font-mono text-label text-signal-ink pt-1">{String(i + 1).padStart(2, '0')}</span>
          <div><p className="text-title text-ink">{h}</p><p className="text-body-sm text-ink-2 mt-2 max-w-[48ch]">{b}</p></div>
        </li>
      ))}
    </ol>
  )
}

function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <div className="card card-flat !p-5"><p className="text-label text-signal-ink mb-3">Do</p><ul className="flex flex-col gap-2 text-body-sm text-ink-2">{dos.map(d => <li key={d}>{d}</li>)}</ul></div>
      <div className="card card-flat !p-5"><p className="text-label text-danger mb-3">Don’t</p><ul className="flex flex-col gap-2 text-body-sm text-ink-2">{donts.map(d => <li key={d}>{d}</li>)}</ul></div>
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table min-w-[560px]">
        <thead><tr>{head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={j === 0 ? 'font-mono text-ink' : ''}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

/* ── data ── */
const colour: { token: string; dark: string; light: string; role: string }[] = [
  { token: 'bg', dark: '#0F1013', light: '#F5F6F7', role: 'Page ground' },
  { token: 'surface-1', dark: '#181A1F', light: '#FFFFFF', role: 'Cards, header, menus' },
  { token: 'surface-2', dark: '#22252B', light: '#EEF0F2', role: 'Raised: inputs, hover, callouts' },
  { token: 'surface-3', dark: '#2C3038', light: '#E4E7EB', role: 'Hover on raised' },
  { token: 'ink', dark: '#ECEDEF', light: '#0F1013', role: 'Headings and primary text' },
  { token: 'ink-2', dark: '#C4C7CD', light: '#3A3E46', role: 'Body and secondary text' },
  { token: 'ink-3', dark: '#A3A7B0', light: '#4D525C', role: 'Labels, metadata, captions' },
  { token: 'faint', dark: '#5D626C', light: '#9AA0A9', role: 'Decorative only, never words' },
  { token: 'signal', dark: '#C8F55A', light: '#C8F55A', role: 'Primary fill, live status, the accent node' },
  { token: 'signal-ink', dark: '#C8F55A', light: '#3F6B00', role: 'Signal used as text' },
  { token: 'link', dark: '#7D98FF', light: '#3654E0', role: 'Inline links and the focus ring. Nothing else is blue' },
  { token: 'danger', dark: '#FF8A7A', light: '#B42818', role: 'Form errors' },
]
const fields = [['field-cobalt', '#1B2350'], ['field-teal', '#0F3B3A'], ['field-plum', '#33203F'], ['field-graphite', '#22252B']]
const types: { cls: string; name: string; spec: string; sample: string }[] = [
  { cls: 'text-giant', name: 'giant', spec: 'Hero-only scale, one per page at most', sample: 'Hello' },
  { cls: 'text-display-2xl', name: 'display-2xl', spec: '52 to 128px · 200 · -0.045em', sample: 'Futures' },
  { cls: 'text-display-xl', name: 'display-xl', spec: '40 to 92px · 200 · -0.04em', sample: 'Build futures' },
  { cls: 'text-display-l', name: 'display-l', spec: '34 to 68px · 200 · -0.035em', sample: 'Craft, then leadership' },
  { cls: 'text-heading', name: 'heading', spec: '24 to 40px · 300 · -0.03em', sample: 'Design that earns its seat' },
  { cls: 'text-title', name: 'title', spec: '20 to 26px · 300 · -0.02em', sample: 'A title for a card or subsection' },
  { cls: 'text-body-lg text-ink-2', name: 'body-lg', spec: '18 to 20px · 300 · 1.6', sample: 'A lead paragraph, once per section, to set the tone before the detail.' },
  { cls: 'text-body text-ink-2', name: 'body', spec: '16 to 17px · 400 · 1.7', sample: 'Default reading text. Never below 16px, never thinner than 400.' },
  { cls: 'text-body-editorial text-ink-2', name: 'body-editorial', spec: '17 to 19px · 350 · 1.75 · 68ch', sample: 'Long-form stories and essays. Line length is capped at 68 characters.' },
  { cls: 'text-body-sm text-ink-2', name: 'body-sm', spec: '15px · 400 · 1.6', sample: 'Dense copy, table cells, card descriptions.' },
  { cls: 'text-caption text-ink-3', name: 'caption', spec: '13px · 400 · 1.5', sample: 'Image credits and footnotes.' },
  { cls: 'text-overline text-ink-3', name: 'overline', spec: 'Geist Mono · 12px · +0.08em · caps', sample: 'Section overline' },
  { cls: 'text-label text-ink-3', name: 'label', spec: 'Geist Mono · 12px · +0.06em · caps', sample: 'Metadata label' },
]
const serif = 'Case study and story headlines use the serif face (Bodoni) at 1.8 to 3.1rem, tight leading, balanced wrapping.'
const spaceScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]

const iconSet: { name: string; box: number; render: ReactNode; use: string }[] = [
  { name: 'arrow', box: 16, use: 'Buttons and "Read" or "View" actions', render: <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /> },
  { name: 'external', box: 16, use: 'Links that leave the site', render: <path d="M5 11L11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" /> },
  { name: 'chevron', box: 12, use: 'Menu triggers in the header', render: <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" /> },
  { name: 'menu', box: 18, use: 'Opens the mobile menu', render: <path d="M2.5 5h13M2.5 9h13M2.5 13h13" strokeLinecap="round" /> },
  { name: 'close', box: 18, use: 'Closes the mobile menu', render: <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" /> },
  { name: 'sun', box: 24, use: 'Theme toggle, shown in dark mode', render: <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" strokeLinecap="round" /></> },
  { name: 'moon', box: 24, use: 'Theme toggle, shown in light mode', render: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" strokeLinejoin="round" /> },
]

const markGroups: { group: string; note: string; names: { n: MarkName; says: string }[] }[] = [
  { group: 'Leadership', note: 'One per page, beside the label and, where there is no portrait, large at the right of the header.', names: [
    { n: 'lead', says: 'A line of people at different distances, one node out in front.' },
    { n: 'community', says: 'Three overlapping circles, one shared centre.' },
    { n: 'notes', says: 'Thoughts getting shorter, the last still being written.' },
  ] },
  { group: 'Case studies', note: 'One small mark beside the number and category on each one-minute page.', names: [
    { n: 'agentic', says: 'A document, an agent, a person who decides.' },
    { n: 'search', says: 'Scattered results resolving to one, found at the centre of a lens.' },
    { n: 'engaze', says: 'A conversation first: two voices, one live.' },
    { n: 'airline', says: 'One journey across the whole service, stops along the way.' },
    { n: 'data', says: 'Steps in understanding, the last one lit.' },
    { n: 'network', says: 'The old route kept while the new one takes over, with no gap.' },
  ] },
  { group: 'Short stories', note: 'Centred on the story’s colour field, on the card and on the page.', names: [
    { n: 'file18', says: 'A page for the newsroom, one line picked out.' },
    { n: 'greenux', says: 'A leaf with a single token at its tip.' },
    { n: 'gxd', says: 'One form becoming another.' },
    { n: 'convai', says: 'A voice, drawn as a few bars inside a bubble.' },
    { n: 'persona', says: 'A person, and the character around them.' },
    { n: 'portal', says: 'A doorway, and someone about to go through.' },
  ] },
]

const files: [string, string][] = [
  ['src/styles/tokens.css', 'Every colour, type, space, radius, motion and layer token, for both modes'],
  ['tailwind.config.ts', 'Maps the tokens to class names (text-ink-2, bg-surface-1, rounded-3)'],
  ['src/index.css', '.btn, .card, .field, .chip, hairlines, focus ring, keyframes, mark animation'],
  ['src/components/ds/', 'Button, Card, Chip, Tag, Tabs, Accordion, Fields, Callout, Quote, Stat, CaseThumb, StoryCard'],
  ['src/components/marks/Marks.tsx', 'The 15 pictograms and the Mark component'],
  ['src/components/illustrations/', 'Spot illustration kit and scenes'],
  ['src/components/layout/Nav.tsx', 'Header, hover-intent menus, mobile menu'],
  ['src/components/ui/PageHeader.tsx', 'Top of every page, with the optional pictogram'],
  ['src/data/ia.ts', 'Page names, Works order, Grow and Leadership menu items'],
  ['src/seo/site.ts', 'Every route’s title, description and indexing rule'],
  ['src/hooks/useLenis.ts', 'Eased page scrolling, off for reduced motion'],
  ['src/components/contact/', 'The contact dialog and form'],
  ['src/components/agentic/ and case/', 'The diagram kit for case studies'],
  ['src/data/', 'All content: work, playbacks, short stories, leadership, resources, brands, testimonials'],
]

/* ── small demo pieces ── */
function Icon({ box, children, size = 28 }: { box: number; children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox={`0 0 ${box} ${box}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{children}</svg>
}

function Replay({ label = 'Replay', children }: { label?: string; children: (k: number) => ReactNode }) {
  const [k, setK] = useState(0)
  return (
    <div className="flex flex-col gap-4">
      <div>{children(k)}</div>
      <div><Button small variant="secondary" onClick={() => setK(v => v + 1)}>{label}</Button></div>
    </div>
  )
}

function Curve() {
  // cubic-bezier(0.16, 1, 0.3, 1) drawn on a 100 x 100 box, y up
  return (
    <svg viewBox="-6 -6 112 112" className="w-40 h-40 text-ink-2" fill="none" aria-label="Ease-out curve, cubic-bezier 0.16, 1, 0.3, 1" role="img">
      <path d="M0 100 H100 V0" stroke="currentColor" strokeOpacity=".25" />
      <path d="M0 100 L16 0 M100 0 L30 0" stroke="currentColor" strokeOpacity=".35" strokeDasharray="2 3" />
      <path d="M0 100 C16 0 30 0 100 0" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="0" r="2.6" fill="currentColor" /><circle cx="30" cy="0" r="2.6" fill="currentColor" />
    </svg>
  )
}

function DurationBars() {
  const [go, setGo] = useState(false)
  const rows: [string, string, string][] = [['fast', '160ms', 'var(--dur-fast)'], ['base', '280ms', 'var(--dur-base)'], ['slow', '600ms', 'var(--dur-slow)']]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {rows.map(([n, ms, v]) => (
          <div key={n} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-4">
            <span className="font-mono text-label text-ink-3">{n}</span>
            <div className="h-6 rounded-pill relative" style={{ background: 'var(--surface-2)' }}>
              <span className="absolute top-1 h-4 w-4 rounded-full" style={{ background: 'var(--signal)', left: go ? 'calc(100% - 1.25rem)' : '0.25rem', transition: `left ${v} var(--ease-out)` }} />
            </div>
            <span className="font-mono text-label text-ink-3">{ms}</span>
          </div>
        ))}
      </div>
      <div><Button small variant="secondary" onClick={() => setGo(g => !g)}>{go ? 'Back' : 'Play'}</Button></div>
    </div>
  )
}

function Lift() {
  return (
    <a href="#motion" onClick={e => e.preventDefault()} className="group block max-w-xs">
      <div className="rounded-3 overflow-hidden border transition-transform duration-500 group-hover:-translate-y-0.5" style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}>
        <div className="h-24" style={{ background: 'linear-gradient(135deg, #25223B 0%, #3D3669 55%, #8F80E9 100%)' }} />
        <p className="p-4 text-body-sm text-ink-2 group-hover:text-ink transition-colors">Hover me: lifts 2px over 500ms</p>
      </div>
    </a>
  )
}

export default function DesignSystemReferencePage() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const [chip, setChip] = useState('All')
  const [tab, setTab] = useState('overview')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'; m.content = 'noindex'
    document.head.appendChild(m)
    return () => { document.head.removeChild(m) }
  }, [])

  const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-12 md:pt-20 pb-16">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Design system', to: '/design-system' }, { label: 'Full reference' }]} /></div>
          <SectionHeader as="h1" label="Signal · Design system, full reference" title={<>One system, <span className="accent-signal">kept small.</span></>}
            intro="How this site is designed and why: the principles, tokens, icons, illustration, pictograms, imagery, components, interaction and motion. Everything below is rendered with the real code, in the mode you are viewing."
            action={<div className="flex items-center gap-3"><span className="text-label text-ink-3">Now: {theme}</span><ThemeToggle /></div>} />
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="chip">{label}</a>)}
          </nav>
          <p className="text-body-sm text-ink-3 mt-8 max-w-[62ch]">Looking for the short version with contrast tables and accessibility checks? That is <Link to="/design-system" className="link">the original design system page</Link>. This page adds everything it does not cover.</p>
        </div>
      </section>

      {/* 01 */}
      <Block id="principles" n="01" title="What we believe, in eight rules." intro="The site should feel calm, precise and expensive without ever being loud. These rules decide the close calls.">
        <Rules items={[
          ['Real interface beats illustration', 'Case studies are shown with finished screens, not decoration. Where a picture is needed and no screen exists, use a pictogram, not a stock image.'],
          ['One idea per mark', 'Every pictogram says one thing. If it needs a caption to be understood, it is the wrong mark.'],
          ['Restraint is the premium', 'One accent colour, one typeface family, one mark per header or card. White space and type do the work.'],
          ['Content first, then chrome', 'Headlines carry the impact. Frames and fields stay quiet so the story reads first.'],
          ['Both modes are first class', 'Every token has a dark and a light value. Nothing is designed in one mode and patched in the other.'],
          ['Clickable looks clickable', 'You can tell what can be pressed without hovering. Cards that link look different from cards that do not.'],
          ['Never half-finished', 'No draft labels and no placeholder copy on the live site. Unfinished work says "Coming soon" and is not linked.'],
          ['Honest and respectful', 'No client names on the portfolio, outcomes attributed to the team, numbers that can be checked.'],
        ]} />
      </Block>

      {/* 02 */}
      <Block id="foundations" n="02" title="Colour, type, space and shape." intro="Components never use raw values. They use the named tokens below, which change with the mode.">
        <Spec name="Colour" note="Swatches follow the current mode. Values for both are listed.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colour.map(c => (
              <div key={c.token} className="card !p-4 flex gap-4 items-center">
                <span className="w-12 h-12 rounded-2 border flex-none" style={{ background: `var(--${c.token.startsWith('surface') || c.token === 'bg' ? c.token : c.token === 'ink' ? 'color-ink' : c.token === 'ink-2' ? 'color-ink-2' : c.token === 'ink-3' ? 'color-ink-3' : c.token === 'faint' ? 'color-faint' : c.token})`, borderColor: 'var(--line-2)' }} />
                <div className="min-w-0"><p className="font-mono text-label text-ink">{c.token}</p><p className="text-caption text-ink-3 mt-1">{c.dark} / {c.light}</p><p className="text-caption text-ink-2 mt-1">{c.role}</p></div>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-ink-3 mt-6 max-w-[62ch]">Signal (lime) is a fill and a light touch, never body text on the light ground. Text colour comes from the ink ramp, never from opacity.</p>
        </Spec>
        <Spec name="Image fields" note="The same in both modes, so covers and story headers look identical either way.">
          <div className="flex flex-wrap gap-4">
            {fields.map(([n, h]) => <div key={n} className="w-36"><div className="h-16 rounded-3" style={{ background: h }} /><p className="font-mono text-label text-ink mt-2">{n}</p><p className="text-caption text-ink-3">{h}</p></div>)}
          </div>
          <p className="text-body-sm text-ink-3 mt-5 max-w-[62ch]">Short stories use a 135-degree gradient from a deep tone through a mid tone to a pale tone of one hue. Each story keeps its own hue.</p>
          <div className="flex flex-wrap gap-4 mt-4">{shortStories.map(s => <div key={s.slug} className="w-36 h-16 rounded-3" style={{ background: s.field }} title={s.title} />)}</div>
        </Spec>
        <Spec name="Typefaces" note="Four faces, each with one job. Loaded from the Fontsource variable fonts.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['Bodoni Moda', 'Headings', 'Every h1 to h6 is set in Bodoni by one global rule. It is the voice of the site.', 'var(--font-serif)', 'Design leadership'],
              ['Geist', 'Body and interface', 'Text, buttons, navigation, forms. 200 and 300 only at 20px and up.', 'var(--font-sans)', 'Readable and calm'],
              ['Geist Mono', 'Labels and data', 'Overlines, metadata, numbers in tables, keyboard keys. Uppercase with tracking.', 'var(--font-mono)', 'LABEL 02 / DATA'],
              ['Caveat', 'Handwritten note', 'One place only: the "the short story" note on short story pages.', "'Caveat Variable', cursive", 'the short story'],
            ].map(([n, r, d, f, sample]) => (
              <div key={n} className="card !p-5 flex flex-col gap-3"><p className="text-ink" style={{ fontFamily: f, fontSize: '1.6rem', lineHeight: 1.1 }}>{sample}</p><div><p className="font-mono text-label text-ink">{n} · {r}</p><p className="text-caption text-ink-2 mt-2">{d}</p></div></div>
            ))}
          </div>
          <p className="text-body-sm text-ink-3 mt-5 max-w-[66ch]">Instrument Sans and Bricolage Grotesque are installed but belong to the interactive prototypes at /labs, which carry their own interface kit. They are not used in the site itself.</p>
        </Spec>
        <Spec name="Type scale" note="Weight 200 and 300 only at 20px and up. Sizes are fluid between the two values.">
          <div className="flex flex-col">
            {types.map(t => (
              <div key={t.name} className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-8 py-5 hairline-top items-baseline">
                <div><p className="font-mono text-label text-ink">{t.name}</p><p className="text-caption text-ink-3">{t.spec}</p></div>
                <p className={`${t.cls} min-w-0`}>{t.sample}</p>
              </div>
            ))}
            <div className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-8 py-5 hairline-top items-baseline">
              <div><p className="font-mono text-label text-ink">serif headline</p><p className="text-caption text-ink-3">Bodoni · 400</p></div>
              <div><p className="font-serif text-ink" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.1rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textWrap: 'balance' }}>Human-led agentic AI cuts order confirmation TAT from weeks to hours</p><p className="text-body-sm text-ink-3 mt-3 max-w-[62ch]">{serif}</p></div>
            </div>
          </div>
        </Spec>
        <Spec name="Space and layout" note="4px base, 8px rhythm. One 12-column grid, one margin.">
          <div className="flex flex-wrap items-end gap-4">
            {spaceScale.map(s => <div key={s} className="text-center"><div className="mx-auto rounded-1" style={{ width: Math.min(s, 64), height: Math.min(s, 64), background: 'var(--signal)', opacity: 0.85 }} /><p className="font-mono text-caption text-ink-3 mt-2">{s}</p></div>)}
          </div>
          <div className="mt-8"><Table head={['Breakpoint', 'From', 'Layout']} rows={[
            ['base', '0', '4 columns, 24px margin, 72px section padding. Single-column reading.'],
            ['md', '768px', '12 columns, 48px margin, 24px gap, 96px section padding.'],
            ['lg', '1024px', 'Full header navigation and hover menus. 128px section padding.'],
            ['xl', '1376px+', 'Content stops at 1280px. At 1440px the outer margin is 80px.'],
          ]} /></div>
          <p className="text-body-sm text-ink-3 mt-5 max-w-[62ch]">Reading text is capped at 68 characters. The header, headlines and content share one left edge. Section padding comes from <code className="font-mono">section-y</code>, never from ad hoc margins.</p>
        </Spec>
        <Spec name="Shape and lines" note="Hairlines and small radii. No heavy shadows on content.">
          <div className="flex flex-wrap items-end gap-6">
            {[['radius-1', '4px', 'tags'], ['radius-2', '6px', 'buttons, inputs'], ['radius-3', '10px', 'cards, menus'], ['pill', '999px', 'chips']].map(([n, v, u]) => (
              <div key={n}><div className="w-24 h-16 border" style={{ borderColor: 'var(--line-control)', borderRadius: v, background: 'var(--surface-1)' }} /><p className="font-mono text-label text-ink mt-2">{n} · {v}</p><p className="text-caption text-ink-3">{u}</p></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 mt-8">
            {[['line-1', 'Dividers, hairlines'], ['line-2', 'Card borders'], ['line-control', 'Control borders (3:1)']].map(([n, u]) => (
              <div key={n} className="w-44"><div className="h-0" style={{ borderTop: `2px solid var(--${n})` }} /><p className="font-mono text-label text-ink mt-3">{n}</p><p className="text-caption text-ink-3">{u}</p></div>
            ))}
          </div>
        </Spec>
        <Spec name="Layout utilities" note="The class names every page is built from. Defined in index.css.">
          <Table head={['Class', 'What it does']} rows={[
            ['container-site', 'Centres content at 1280px with the page margin. The header uses it too'],
            ['grid-site', 'The 12-column grid (4 on phones) with the column gap'],
            ['section-y', 'Vertical padding between sections: 72, 96 or 128px by breakpoint'],
            ['hairline-top / hairline-bottom / divider', 'One-pixel rules in line-1. The only way sections are separated'],
            ['tap-target', 'Enforces the 44px minimum on small controls'],
            ['skip-link', 'First focusable element: "Skip to content", visible on focus'],
            ['hide-scrollbar', 'Hides the scrollbar on scroll rows without disabling scrolling'],
            ['accent-signal / mark-signal / text-signal', 'Signal as a text highlight, a marker underline, or a coloured word. Dark mode only for text; light mode uses signal-ink'],
            ['on-field', 'Text and line colour for anything placed on a colour field'],
            ['media-field, media-cobalt / teal / plum', 'The coloured ground behind screenshots and covers'],
            ['menu-panel', 'The surface of header menus: surface-2, hairline border, 10px radius'],
            ['prose-site', 'Long-form text: cobalt underlined links, 68ch measure, quiet lists'],
          ]} />
        </Spec>
        <Spec name="Logo" note="The monogram uses the current text colour, so it follows the mode.">
          <div className="flex items-center gap-8"><span className="text-ink"><Logo size={48} /></span><span className="text-ink-3"><Logo size={28} /></span><p className="text-body-sm text-ink-3 max-w-[40ch]">Used in the header at 36px beside the name and role. Never recoloured, never on a busy image.</p></div>
        </Spec>
      </Block>

      {/* 03 */}
      <Block id="icons" n="03" title="Icons: a few, drawn the same way." intro="Interface icons are inline SVG, drawn with a 1.5px line, round caps and joins, in the current text colour. There are only as many as the interface needs.">
        <Spec name="The set in use" note="Each is drawn on its own box and shown here at 28px.">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {iconSet.map(i => (
              <div key={i.name} className="card !p-4 flex flex-col gap-3 items-start">
                <span className="text-ink"><Icon box={i.box}>{i.render}</Icon></span>
                <div><p className="font-mono text-label text-ink">{i.name}</p><p className="text-caption text-ink-3 mt-1">{i.box}px box</p><p className="text-caption text-ink-2 mt-1">{i.use}</p></div>
              </div>
            ))}
          </div>
        </Spec>
        <Spec name="Rules">
          <Table head={['Rule', 'Value']} rows={[
            ['Stroke', '1.5px, round caps and joins, no fills'],
            ['Colour', 'currentColor, so it follows text and state. Never a third colour'],
            ['Size', '16px beside text, 18px for controls, 12px for small disclosure chevrons'],
            ['Meaning', 'Always paired with a word, or given an accessible name on the control. Icons alone never carry meaning'],
            ['Hit area', 'The control is 44px on touch, however small the icon'],
          ]} />
          <DoDont dos={['Reuse an existing icon before drawing a new one', 'Pair the arrow with the verb: "View project", "Read"']} donts={['Mix filled and line icons', 'Use an icon as decoration between sections', 'Use emoji in the interface']} />
        </Spec>
      </Block>

      {/* 04 */}
      <Block id="illustration" n="04" title="Illustration: a small library, used rarely." intro="Spot illustrations are flat, drawn with one ink line and one signal accent on the page ground. They follow the mode automatically. The hero and menus no longer use them; they stay available for empty states and the occasional editorial moment.">
        <Spec name="Library" note="14 scenes, 4:3, drawn from one shared kit: figure, desk, screen, sheet, bubble, node, arrow.">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(Object.keys(SCENES) as IllustrationName[]).map(n => (
              <div key={n} className="card !p-3"><Illustration name={n} className="w-full h-auto" /><p className="font-mono text-label text-ink-3 mt-2">{n}</p></div>
            ))}
          </div>
        </Spec>
        <Spec name="Rules">
          <Table head={['Rule', 'Value']} rows={[
            ['Line', '3px ink, round joins. Ground lines 1.5px'],
            ['Colour', 'Ink, the signal accent, the page ground for fills, and a 30% signal tint. Nothing else'],
            ['People', 'Simple figures without faces. One accent on clothing at most'],
            ['Placement', 'At most one per page, with room around it, never behind text'],
            ['Alt text', 'Decorative by default. Add a label only when the picture adds information'],
          ]} />
          <DoDont dos={['Use for an empty state or a quiet editorial break', 'Keep the scene to one moment']} donts={['Stack illustrations down a page', 'Use illustration where a real screen would do', 'Add gradients, shadows or translucent layers']} />
        </Spec>
      </Block>

      {/* 05 */}
      <Block id="pictograms" n="05" title="Pictograms: abstract, meaningful, few." intro="Fifteen marks, one for each leadership page, each case study and each short story. They share a grid, a line weight and a single accent node, so they read as one hand. They give a page a point of recognition without becoming illustration.">
        <Spec name="Anatomy" note="What every mark is made of.">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="rounded-3 p-8 relative" style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)' }}>
              <svg width="192" height="192" viewBox="0 0 64 64" className="absolute left-8 top-8 text-ink-3" aria-hidden="true">
                <path d="M0 16H64M0 32H64M0 48H64M16 0V64M32 0V64M48 0V64" stroke="currentColor" strokeOpacity=".18" strokeWidth=".3" /><rect x=".15" y=".15" width="63.7" height="63.7" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth=".3" />
              </svg>
              <Mark key={theme} name="agentic" size={192} className="relative text-ink" />
            </div>
            <ul className="flex flex-col gap-4 text-body-sm text-ink-2 max-w-[52ch]">
              <li><span className="font-mono text-label text-ink">64 grid.</span> Every mark is drawn on a 64 by 64 box with a 6px safe margin.</li>
              <li><span className="font-mono text-label text-ink">1.5px line.</span> The line weight stays 1.5px on screen at any size; the component scales the stroke to keep it.</li>
              <li><span className="font-mono text-label text-ink">Round caps.</span> Ends and corners are soft; no sharp miters.</li>
              <li><span className="font-mono text-label text-ink">One accent node.</span> A single lime dot marks the point of the idea: the lead, the shared centre, the answer.</li>
              <li><span className="font-mono text-label text-ink">Quiet guides.</span> Dashed lines at 60% show a path not taken or a boundary. Never more than one.</li>
              <li><span className="font-mono text-label text-ink">Decorative accent.</span> The lime node adds focus but never carries meaning alone, since it is light on the light ground. The line and the page text say it.</li>
              <li><span className="font-mono text-label text-ink">Two colours.</span> The current text colour and the signal accent. On a colour field: white and signal.</li>
            </ul>
          </div>
        </Spec>
        {markGroups.map(g => (
          <Spec key={g.group} name={g.group} note={g.note}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {g.names.map(m => (
                <div key={m.n} className="card !p-4 flex flex-col gap-4 items-start">
                  <span className="text-ink"><Mark key={theme + m.n} name={m.n} size={72} /></span>
                  <div><p className="font-mono text-label text-ink">{m.n}</p><p className="text-caption text-ink-2 mt-1">{m.says}</p></div>
                </div>
              ))}
            </div>
          </Spec>
        ))}
        <Spec name="In place" note="Where they appear, and nowhere else.">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div>
              <p className="text-label text-ink-3 mb-3">Short story card</p>
              <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}>
                <div className="grid place-items-center text-white" style={{ background: shortStories[1].field, aspectRatio: '16 / 8', ['--mk-accent' as string]: '#C8F55A', ['--mk-bg' as string]: 'transparent' }}><Mark name={markForStory('greenux')!} size={84} /></div>
                <p className="p-4 font-serif text-ink" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>A living design system with sustainability as a pillar</p>
              </div>
            </div>
            <div>
              <p className="text-label text-ink-3 mb-3">Case study page label</p>
              <div className="card"><div className="flex items-center gap-4"><Mark name="search" size={36} className="text-ink-2" /><p className="text-label text-ink-3"><span className="text-signal-ink">02</span> / AI search · AI</p></div><p className="font-serif text-ink mt-4" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>Designing AI-Search experience scaling across 15000+ products</p></div>
            </div>
            <div>
              <p className="text-label text-ink-3 mb-3">Page header, large</p>
              <div className="card flex items-center justify-between gap-4"><div><p className="text-overline text-ink-3">Community</p><p className="text-heading text-ink mt-2 max-w-[12ch]">Building the culture</p></div><Mark name="community" size={96} className="text-ink-3" /></div>
            </div>
          </div>
          <DoDont dos={['One mark per header or card', 'Keep it at 28 to 36px beside a label, 84 to 176px when it is the feature', 'Let it sit alone with space around it']} donts={['Repeat a mark within a page', 'Tint the accent any other colour', 'Animate it beyond the draw-in', 'Use a mark where the case study has its own screen']} />
        </Spec>
        <Spec name="Older family" note="The Grow hub uses its own animated line pictograms on a colour field, from the resource covers.">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[['Mentoring', MentoringPictogram], ['Resources', ResourcesPictogram], ['Community', CommunityPictogram], ['Reflections', ReflectionsPictogram], ['Practice', PracticePictogram], ['Portfolio', PortfolioPictogram]].map(([n, C]) => {
              const P = C as () => ReactNode
              return <div key={n as string}><div className="rounded-3 p-3" style={{ background: 'var(--field-cobalt)', aspectRatio: '16 / 9' }}><P /></div><p className="font-mono text-label text-ink-3 mt-2">{n as string}</p></div>
            })}
          </div>
        </Spec>
      </Block>

      {/* 06 */}
      <Block id="imagery" n="06" title="Imagery: real screens, framed quietly." intro="Case studies show finished interface. The frame, the field and the preview behaviour are standard so every project feels equally considered.">
        <Spec name="Cover and preview" note="Hover or focus the cover. Touch and reduced motion keep the still.">
          <a href="#imagery" onClick={e => e.preventDefault()} className="block max-w-xl group" aria-label="Cover preview demo">
            <div className="overflow-hidden rounded-3 border bg-surface-1" style={{ borderColor: 'var(--line-2)' }}>
              <div className="flex items-center gap-1.5 px-4 h-8 border-b" style={{ borderColor: 'var(--line-1)' }} aria-hidden="true">{[0, 1, 2].map(i => <span key={i} className="block w-2 h-2 rounded-full" style={{ background: 'var(--line-control)' }} />)}</div>
              <CaseThumb id="sap-search" ratio="1800 / 1000" flush />
            </div>
          </a>
          <ul className="mt-6 flex flex-col gap-2 text-body-sm text-ink-2 max-w-[62ch]">
            <li>The finished still is always shown first and is what everyone sees at rest.</li>
            <li>An animated preview fades in over the still after hover or keyboard focus, and is removed 600ms after the pointer leaves.</li>
            <li>The preview shows the real interface with short interface text. It is never a looping decoration.</li>
            <li>The frame is a window with three quiet dots. No device mockups, shadows or translucent images.</li>
          </ul>
        </Spec>
        <Spec name="Rules">
          <Table head={['Rule', 'Value']} rows={[
            ['Ratio', 'Covers 1800 by 1000. Short story fields 1800 by 700 on the page, 16 by 8 on cards'],
            ['Format', 'WebP at 640 and 1600 wide with srcset, lazy loaded, with width and height set'],
            ['Screens', 'Shown as designed. Not edited, redrawn or recoloured'],
            ['Clients', 'Not named anywhere on the portfolio, including in images'],
            ['Alt text', 'Cover images are decorative; the headline beside them carries the meaning'],
          ]} />
        </Spec>
      </Block>

      {/* 07 */}
      <Block id="components" n="07" title="Components." intro="The small set every page is built from. All live in src/components/ds and are used as they are.">
        <Spec name="Buttons" note="One primary per view.">
          <div className="flex flex-wrap items-center gap-3"><Button arrow>See the work</Button><Button variant="secondary">Get in touch</Button><Button variant="tertiary" arrow>About me</Button><Button small variant="secondary">Small</Button><Button disabled>Disabled</Button></div>
        </Spec>
        <Spec name="Chips, tags, status" note="Chips filter and toggle. Tags and status do not click.">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">{['All', 'AI', 'Leadership', 'Research'].map(f => <Chip key={f} pressed={chip === f} onClick={() => setChip(f)}>{f}</Chip>)}</div>
            <TagList items={['framework', 'business fluency', 'workshop']} label="Topics" />
            <div className="flex gap-6"><Status>Now</Status><Status live={false}>Archived</Status><Tag>Coming soon</Tag></div>
          </div>
        </Spec>
        <Spec name="Cards" note="Static cards do not react. Link cards lift border and surface.">
          <div className="grid md:grid-cols-2 gap-4"><Card><p className="text-label text-ink-3 mb-3">Static</p><p className="text-title text-ink">Holds content only</p></Card><Card to="/leadership"><p className="text-label text-ink-3 mb-3">Link card</p><p className="text-title text-ink">The whole card is one link</p></Card></div>
        </Spec>
        <Spec name="Metrics and callouts" note="Numbers always have a plain-language label.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8"><Stat value="30M+" label="Guests served a year" /><Stat value="50x" label="Add-on sales" /><Stat value="90%" label="Employee satisfaction" /><Stat value="$5M" label="Documented savings" /></div>
          <Callout title="Note">Outcomes are the team’s. Roles describe what I led.</Callout>
        </Spec>
        <Spec name="Tabs and accordion" note="Tabs use the arrow keys, Home and End. Accordion is native details, so it works without JavaScript.">
          <div className="grid md:grid-cols-2 gap-8">
            <Tabs label="Example tabs" value={tab} onChange={setTab} tabs={[{ id: 'overview', label: 'Overview' }, { id: 'process', label: 'Process' }, { id: 'outcome', label: 'Outcome' }]}><p className="text-body-sm text-ink-2">Panel: {tab}</p></Tabs>
            <Accordion items={[{ title: 'What is Dual Fluency?', body: 'Speaking design and business with equal confidence.', open: true }, { title: 'Who is it for?', body: 'Designers moving into leadership.' }]} />
          </div>
        </Spec>
        <Spec name="Form fields" note="Visible label, hint, error. 16px text so iOS does not zoom.">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <TextField label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} hint="Only used to reply to you." placeholder="you@company.com" />
            <TextField label="Company" error="Enter your company name." defaultValue="" />
            <div className="md:col-span-2"><TextArea label="What would you like to talk about?" /></div>
          </div>
        </Spec>
        <Spec name="Breadcrumb, link, key, table" note="Small parts used across pages.">
          <div className="flex flex-col gap-6">
            <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Short stories', to: '/craft#short-stories' }, { label: 'Short story' }]} />
            <p className="text-body text-ink-2 max-w-xl">Inline links are cobalt and underlined: <a href="#components" className="link">read the playbook</a>. Press <kbd className="kbd">Esc</kbd> to close a menu.</p>
            <Table head={['Token', 'Value']} rows={[['radius-2', '6px'], ['touch-min', '44px']]} />
          </div>
        </Spec>
        <Spec name="Quote" note="Always attributed, never decorative.">
          <Quote by="Colleague" role="Design Director">He made the case for design in terms the business could act on.</Quote>
        </Spec>
        <Spec name="Media frame and case row" note="Screenshots sit on a field colour. The case row is the list item for projects.">
          <div className="grid md:grid-cols-3 gap-4 mb-8">{caseStudies.slice(0, 3).map(cs => cs.image && <MediaFrame key={cs.id} src={cs.image} alt="" tone={cs.tone} />)}</div>
          <ul><CaseRow cs={caseStudies[0]} /></ul>
        </Spec>
        <Spec name="Header and menu" note="Patterns made of the parts above.">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[62ch]">
            <li><span className="text-ink">Header:</span> 72px, logo and name with a rotating role, five items, theme toggle. Works, Leadership and For Designers open menus.</li>
            <li><span className="text-ink">Works menu:</span> three featured covers with previews, then a column listing the rest and an "All work" button.</li>
            <li><span className="text-ink">Page header:</span> label, display title, intro, and one optional pictogram.</li>
            <li><span className="text-ink">Footer:</span> contact, links and a link to the design system.</li>
          </ul>
        </Spec>
      </Block>

      {/* patterns */}
      <Block id="patterns" n="08" title="Patterns and page sections." intro="Reusable compositions built from the components above. Each is used in more than one place, and each is shown here as it appears on the site.">
        <Spec name="Short story note" note="A handwritten marker, only on short story pages.">
          <ShortStoryTag />
          <p className="text-body-sm text-ink-3 mt-4 max-w-[56ch]">Set in Caveat in signal colour with a hand-drawn underline. It says "this is the short version" and links the story to its detailed case study.</p>
        </Spec>
        <Spec name="Headline word" note="Types, holds, deletes, moves on. Home hero only.">
          <p className="text-display-l text-ink"><TypedWord words={['Design', 'Strategy', 'Craft']} className="typed-word" /></p>
          <p className="text-body-sm text-ink-3 mt-4 max-w-[56ch]">A name and a rotating role sit beside the logo in the header. With reduced motion the words swap on a slow timer instead of typing.</p>
        </Spec>
        <Spec name="Brand strip" note="Quiet and slow. Pauses on hover or focus.">
          <div className="overflow-hidden [&>section]:!py-4 [&>section]:!pt-0"><Brands /></div>
          <p className="text-body-sm text-ink-3 mt-4 max-w-[56ch]">One row of brand names, about seven seconds per brand. Still and scrollable with reduced motion. The same row is used for testimonials as tall quote cards.</p>
        </Spec>
        <Spec name="Covers" note="Abstract motifs on a field colour, identical in both modes. They carry no words of their own.">
          <p className="text-label text-ink-3 mb-3">Leadership story covers</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {(['seat', 'team', 'influence', 'hub', 'culture'] as const).map((m, i) => <div key={m}><div className="rounded-3 overflow-hidden"><StoryCover motif={m} tone={(['cobalt', 'teal', 'plum', 'graphite', 'cobalt'] as const)[i]} number={String(i + 1).padStart(2, '0')} /></div><p className="font-mono text-label text-ink-3 mt-2">{m}</p></div>)}
          </div>
          <p className="text-label text-ink-3 mb-3">Resource covers (3:4 sheets)</p>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {(['loop', 'phases', 'conversation', 'books', 'checklist', 'spark', 'network'] as const).map((m, i) => <div key={m}><ResourceCover title={({ loop: 'Loop', phases: 'Phases', conversation: 'Dialogue', books: 'Reading', checklist: 'Checklist', spark: 'Spark', network: 'Network' } as Record<string, string>)[m]} kind="Template" motif={m} tone={(['cobalt', 'teal', 'plum', 'graphite'] as const)[i % 4]} index={i + 1} /><p className="font-mono text-label text-ink-3 mt-2">{m}</p></div>)}
          </div>
        </Spec>
        <Spec name="Process flow" note="Who does each stage: the agent, people, or both.">
          {playbacks.find(p => p.flow)?.flow && <ProcessFlow stages={playbacks.find(p => p.flow)!.flow!} />}
        </Spec>
        <Spec name="Distinct card" note="One short card on a detailed case study: what is unusual about it.">
          <div className="max-w-md"><Distinct title="The agent proposes, people decide" body="Every outcome is routed to a person who can approve, escalate or ask for clarification." /></div>
        </Spec>
        <Spec name="Diagram kit" note="How case studies explain systems. Built in the page, never exported images, so they follow the mode and stay sharp.">
          <Table head={['Component', 'Explains']} rows={[
            ['FlowDiagram', 'End-to-end system flow, animated on scroll'],
            ['FlowPlayer', 'One order from start to finish over the real screens'],
            ['Swimlane', 'Who acts at each step: agent work filled, human gates outlined'],
            ['AutonomyLadder', 'Three rising steps. Today is filled, next is dashed'],
            ['AsIsFlow', 'The before flow: hand-offs on a time bar that grows from hours to weeks'],
            ['RiskVisual', 'Deviation, severity, order risk and priority'],
            ['WorklistCompare', 'Three worklists compared by what is distinctive'],
            ['ContractWorksheet', 'The agent-human contract, in the site’s own type and colour'],
            ['SearchAnatomy', 'Search component anatomy inside a real shell bar'],
            ['CapabilityLoop', 'A learning loop with people growth underneath'],
            ['OutcomesLedger', 'One row per kind of result. The team owns every row'],
            ['PracticeCard', 'A method others can adapt: problem, steps, signals, failure modes'],
          ]} />
          <p className="text-body-sm text-ink-3 mt-5 max-w-[62ch]">Conventions: filled means the agent, outlined means people, dashed means next or optional, signal marks the one thing to look at. Screens inside diagrams are shown whole, never zoomed or cropped.</p>
        </Spec>
        <Spec name="Page sections" note="The building blocks of Home and Works.">
          <Table head={['Section', 'Used on', 'What it is']} rows={[
            ['Hero', 'Home', 'Name, rotating role, typed word, one line, two actions'],
            ['Selected work', 'Home', 'Selected projects as single framed cards, stacked, no sideways scroll'],
            ['Impact snapshot', 'Home, About', 'Big numbers on a quiet grid, two rows of four'],
            ['Latest', 'Home', 'A leadership practice, a workshop and a piece of writing, each framed'],
            ['Testimonial', 'Home, About', 'One voice with a way to the rest'],
            ['Works list', 'Works', 'The case studies as large story rows, then short story cards, then research'],
            ['Works call to action', 'Works', 'Three ways to start, each opening the contact form with the right questions'],
            ['Journey', 'Leadership', 'A horizontal timeline, pinned and scroll-driven on large screens'],
            ['Stories hub', 'Leadership', 'Story cards: cover, number, title, the lesson as a teaser'],
            ['Community', 'Community', 'Initiatives shown in full, no hidden text'],
          ]} />
        </Spec>
      </Block>

      {/* 08 */}
      <Block id="interaction" n="09" title="Interaction guidelines." intro="Predictable, forgiving and fast. The same gesture does the same thing everywhere.">
        <Spec name="States" note="Every control has all five.">
          <Table head={['State', 'Treatment']} rows={[
            ['Rest', 'Clear affordance without hovering: buttons are filled or bordered, links are underlined'],
            ['Hover', 'Border or surface lifts one step. Underlines appear on card titles. 160ms'],
            ['Focus', 'A 2px cobalt ring, offset 3px (1px inside form fields), for keyboard focus. Never removed'],
            ['Press', 'Buttons move down 1px'],
            ['Disabled', '45% opacity, not-allowed cursor, no hover. Say why nearby when it matters'],
          ]} />
        </Spec>
        <Spec name="Menus" note="Hover intent, so menus never flicker.">
          <Table head={['Behaviour', 'Value']} rows={[
            ['Open on hover', 'After 90ms, so a pass across the header does not open anything'],
            ['Close on leave', 'After 280ms, so the pointer can cross the gap to the panel'],
            ['Click or Enter', 'Toggles the menu. This is the touch and keyboard path'],
            ['Escape', 'Closes the menu and returns focus to its trigger'],
            ['Mobile', 'A full-screen list under the header. Works, Leadership and For Designers open as plain lists, with nothing hidden behind hover'],
            ['Unfinished', 'Items marked "Coming soon" are text, not links'],
          ]} />
        </Spec>
        <Spec name="Previews and cursor">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[66ch]">
            <li>Covers preview on hover and keyboard focus only. Nothing animates at rest and nothing autoplays.</li>
            <li>The system pointer is used everywhere. A custom cursor dot was built and retired; the data-cursor attributes on cards remain but nothing reads them.</li>
            <li>Keyboard users see the same focus ring everywhere, and cards that link are a single focusable link.</li>
          </ul>
        </Spec>
        <Spec name="Navigation and scroll">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[66ch]">
            <li>Pages deeper than one level show a breadcrumb. Case studies link to their detailed version with one clear action.</li>
            <li>Scrolling is eased with Lenis (about 1.15 seconds, soft landing). It never blocks native scrolling, and it is off when reduced motion is on. Dialogs and lightboxes opt out so they scroll normally.</li>
            <li>Sections reveal once as they enter, then stay. The one scroll-driven moment is the pinned Journey on large screens.</li>
            <li>A new page opens at the top. A link with a #section opens that section once the page has rendered, with 6rem left under the header.</li>
            <li>A 1px signal line at the very top of the window shows reading position on every page. Long pages also get dot navigation for their sections.</li>
          </ul>
        </Spec>
        <Spec name="Overlays" note="Two, both fully keyboard operable.">
          <Table head={['Overlay', 'Behaviour']} rows={[
            ['Contact dialog', 'Opens from any email link to Amit and from calls to action, so no enquiry leaves by email client. Role dialog, modal, focus kept inside, Escape closes. It saves the enquiry and notifies Amit; if the server is unreachable it offers the direct address'],
            ['Image lightbox', 'Click, Enter or Space opens a screenshot at full size. Escape or a click outside closes it. Used for screens on detailed case studies'],
            ['Skip link', 'The first tab stop on every page jumps past the header'],
          ]} />
        </Spec>
        <Spec name="Forms and touch">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[66ch]">
            <li>Every field has a visible label. Hints sit below, errors replace the hint and are linked with aria-describedby.</li>
            <li>Input text is 16px or larger, which stops iOS from zooming.</li>
            <li>Touch targets are at least 44px. Inline links in running text keep their underline.</li>
          </ul>
        </Spec>
      </Block>

      {/* 09 */}
      <Block id="motion" n="10" title="Motion supports, never performs." intro="Motion explains change and adds polish at the moment of arrival. It is short, uses one easing curve and always has a still fallback.">
        <Spec name="Easing" note="One curve for everything: a fast start with a long, soft landing.">
          <div className="flex flex-wrap items-center gap-8"><Curve /><div><p className="font-mono text-label text-ink">--ease-out</p><p className="font-mono text-body-sm text-ink-2">cubic-bezier(0.16, 1, 0.3, 1)</p><p className="text-body-sm text-ink-3 mt-3 max-w-[36ch]">Linear and bouncy easings are not used.</p></div></div>
        </Spec>
        <Spec name="Durations" note="Three speeds, chosen by size of change.">
          <DurationBars />
          <div className="mt-6"><Table head={['Token', 'Time', 'Used for']} rows={[
            ['dur-fast', '160ms', 'Hover, press, colour changes'],
            ['dur-base', '280ms', 'Menus, theme change, cards'],
            ['dur-slow', '600ms', 'Section reveals, headline words, preview removal'],
          ]} /></div>
        </Spec>
        <Spec name="Headline reveal" note="Words rise 30px and fade in, staggered 80ms. Once per page.">
          <Replay>{k => (
            <motion.h3 key={k} className="text-heading text-ink max-w-[24ch]" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}>
              {'Design is a leadership practice.'.split(' ').map((w, i) => (
                <motion.span key={i} className="inline-block mr-[0.25em]" variants={{ hidden: { y: reduce ? 0 : 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: E } } }}>{w}</motion.span>
              ))}
            </motion.h3>
          )}</Replay>
        </Spec>
        <Spec name="Pictogram draw-in" note="Lines draw over 1.4s, guides fade in, the accent node settles last.">
          <Replay>{k => <div className="flex flex-wrap gap-8 text-ink">{(['lead', 'search', 'portal'] as MarkName[]).map(n => <Mark key={`${k}-${n}`} name={n} size={88} />)}</div>}</Replay>
          <ol className="mt-5 flex flex-col gap-1 text-body-sm text-ink-2 max-w-[56ch]">
            <li><span className="font-mono text-label text-ink">0.15s</span> lines begin to draw</li><li><span className="font-mono text-label text-ink">0.5s</span> dashed guides fade in</li><li><span className="font-mono text-label text-ink">1.0s</span> accent node scales from 40% to 100%</li>
          </ol>
        </Spec>
        <Spec name="Page and card" note="Pages arrive, they do not slide.">
          <div className="grid md:grid-cols-2 gap-8">
            <Replay label="Replay page transition">{k => (
              <motion.div key={k} className="card" initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: E }}><p className="text-label text-ink-3 mb-2">Page enter</p><p className="text-body-sm text-ink-2">Fades in and rises 20px over 450ms. On leave it fades and rises 10px.</p></motion.div>
            )}</Replay>
            <Lift />
          </div>
        </Spec>
        <Spec name="Where motion lives">
          <Table head={['Moment', 'Motion', 'Time']} rows={[
            ['Route change', 'Fade and 20px rise', '450ms'],
            ['Headline', 'Word-by-word rise, once when scrolled into view', '600ms, 80ms stagger'],
            ['Section', 'Fade and small rise as it enters, once', 'Under 600ms'],
            ['Menu panel', 'Fades in and drops 6px under the header', '180ms'],
            ['Menu chevron', 'Rotates 180 degrees when open', '200ms'],
            ['Card hover', 'Lifts 2px, title underlines', '500ms'],
            ['Cover preview', 'Cross-fades over the still, removed after leaving', '500ms in, 600ms out'],
            ['Pictogram', 'Draw-in once on load', '1.4s'],
            ['Typed headline word', 'Types, holds, deletes and moves on, with a blinking caret', 'Home only'],
            ['Page scroll', 'Eased with Lenis, off for reduced motion', '1.15s'],
            ['Progress line', '1px signal line grows with scroll position', 'Continuous'],
            ['Brand strip', 'Slow marquee, pauses on hover or focus', '7s per brand'],
            ['Journey', 'Pinned and scroll-driven horizontal timeline, large screens only', 'Scroll'],
            ['Prototype previews', 'Scripted loops of the real interface built in the page, not video', 'Hover only'],
            ['Grow pictograms', 'Small looping line animations on the Grow cards', '3 to 6s loops'],
          ]} />
        </Spec>
        <Spec name="Rules">
          <DoDont dos={['Animate transform and opacity only', 'Play entrance motion once, never on every scroll', 'Provide a still version of everything that moves', 'Respect prefers-reduced-motion: no draw-in, no word rise, previews stay still']} donts={['Autoplay video or looping decoration', 'Animate layout properties or block scrolling', 'Add motion just to fill a page', 'Run more than one moving element in view at once']} />
        </Spec>
      </Block>

      {/* 10 */}
      <Block id="voice" n="11" title="Words follow rules too." intro="Short, specific and plain. The writing is part of the design.">
        <Rules items={[
          ['Plain hyphens only', 'No em-dashes or en-dashes anywhere on the site. Use a colon, a comma or a plain hyphen. Ranges use a hyphen.'],
          ['Sentence case', 'Buttons, headings and labels use sentence case. Mono labels are the only capitals, set by style, not typed.'],
          ['Lead with impact', 'Case study headlines read like news: the outcome first, then one short line of how.'],
          ['Numbers have owners', 'Every figure is real, sourced and attributed to the team where it is theirs. Say "documented" or "reported by the client" when that is the truth.'],
          ['No client names', 'Describe the client (a leading airline) instead of naming them. The portal and short stories follow the same rule.'],
          ['Never unfinished', 'No "draft", "TBD" or lorem. "Coming soon" is the only way to show work that is not ready, and it is not linked.'],
          ['Link text says where', 'Use "View project" or "Read the story", never "click here". Every link makes sense on its own.'],
          ['Short story format', 'Headline, one line of context, and a few sections with short bullet points. One page each, with a path to the detailed case study.'],
        ]} />
      </Block>

      {/* 11 */}
      <Block id="governance" n="12" title="Where everything lives." intro="The system is code. If it is not in these files, it is not in the system.">
        <Table head={['Path', 'What it holds']} rows={files.map(([p, w]) => [p, w])} />
        <Spec name="Page templates" note="Every route and the template it uses.">
          <Table head={['Route', 'Template']} rows={[
            ['/', 'Home: hero, brands, selected work, impact, latest, testimonial, contact'],
            ['/craft', 'Works: case study rows, short story cards, research, call to action'],
            ['/craft/:id', 'One-minute case page: label with pictogram, headline, cover, five beats, path to the detailed study'],
            ['/craft/:id/details', 'Detailed case study with dot navigation, lightbox screens and links back to the short story. Not altered by the system pass'],
            ['/craft/stories/:slug', 'Short story: note, serif headline, colour field with pictogram, sections of short points'],
            ['/craft/*/film', 'Animated films for three projects, built in the page'],
            ['/labs/*', 'Interactive prototypes with their own interface kit and Instrument Sans'],
            ['/leadership, /leadership/stories, /leadership/cases/:slug', 'How I lead, story hub and story or case pages'],
            ['/community, /reflections', 'Header with pictogram, then the list of initiatives or notes'],
            ['/resources and /resources/*', 'Practice hub with resource covers, and frameworks and playbooks'],
            ['/learn, /learn/practice, /learn/portfolio, /learn/curious, /mentoring', 'Grow: four cards, practice toolkits, portfolio guide, mentoring'],
            ['/about, /contact, /philosophy', 'About, contact and philosophy pages'],
            ['/design-system, /design-system/reference', 'This documentation'],
            ['/admin', 'Private portal for enquiries. Not indexed'],
            ['*', 'Not found'],
          ]} />
        </Spec>
        <Spec name="Before anything ships">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[66ch]">
            <li>Looked at in dark and light, at phone width and desktop width.</li>
            <li>Keyboard only: reachable, visible focus, Escape closes menus.</li>
            <li>Reduced motion on: nothing moves, nothing disappears.</li>
            <li>No raw colour values, no em-dashes, no client names, no placeholder text.</li>
            <li>Text passes WCAG 2.2 AA on every surface in both modes. See the contrast tables on the <Link to="/design-system" className="link">original page</Link>.</li>
            <li>New route: title, description and indexing rule added in src/seo/site.ts.</li>
          </ul>
        </Spec>
        <Spec name="Adding to the system" note="Small on purpose.">
          <ul className="flex flex-col gap-2 text-body-sm text-ink-2 max-w-[66ch]">
            <li><span className="text-ink">A new pictogram:</span> draw it on the 64 grid, one idea, one accent node, then add its name to Marks.tsx and this page.</li>
            <li><span className="text-ink">A new colour:</span> almost always no. Try an existing token first.</li>
            <li><span className="text-ink">A new component:</span> only when it will be used in three places. Otherwise compose from what exists.</li>
          </ul>
        </Spec>
        <div className="mt-8"><Button to="/design-system" variant="secondary" arrow>Original design system page</Button></div>
      </Block>
    </>
  )
}
