import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Button, Card, Chip, Tag, TagList, Status, MediaFrame, Breadcrumb, Tabs, Accordion,
  TextField, TextArea, Callout, Quote, Stat, SectionHeader, ThemeToggle, useTheme,
} from '../components/ds'
import { caseStudies } from '../data/work'
import CaseRow from '../components/ds/CaseRow'

/* ── Contrast helpers: computed from the same hex values as tokens.css ── */
const lum = (hex: string) => {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
}
const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
const grade = (r: number) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'UI / large only' : 'Decorative only')

type Swatch = { token: string; dark: string; light: string; role: string; text?: boolean }
const surfaces: Swatch[] = [
  { token: 'bg', dark: '#0F1013', light: '#F5F6F7', role: 'Page ground' },
  { token: 'surface-1', dark: '#181A1F', light: '#FFFFFF', role: 'Cards, header, menus' },
  { token: 'surface-2', dark: '#22252B', light: '#EEF0F2', role: 'Raised: inputs, callouts, hover' },
  { token: 'surface-3', dark: '#2C3038', light: '#E4E7EB', role: 'Hover on raised' },
]
const inks: Swatch[] = [
  { token: 'ink', dark: '#ECEDEF', light: '#0F1013', role: 'Headings, primary text', text: true },
  { token: 'ink-2', dark: '#C4C7CD', light: '#3A3E46', role: 'Body and secondary text', text: true },
  { token: 'ink-3', dark: '#A3A7B0', light: '#4D525C', role: 'Labels, metadata, captions', text: true },
  { token: 'faint', dark: '#5D626C', light: '#9AA0A9', role: 'Decorative marks only, never words' },
]
const actions: Swatch[] = [
  { token: 'signal', dark: '#C8F55A', light: '#C8F55A', role: 'Primary button fill, live status. Text on it uses on-signal.' },
  { token: 'signal-ink', dark: '#C8F55A', light: '#3F6B00', role: 'Signal as text (numbers, status labels)', text: true },
  { token: 'link', dark: '#7D98FF', light: '#3654E0', role: 'Inline links and focus ring only', text: true },
  { token: 'danger', dark: '#FF8A7A', light: '#B42818', role: 'Form errors', text: true },
]
const fields = [
  { token: 'field-cobalt', hex: '#1B2350' },
  { token: 'field-teal', hex: '#0F3B3A' },
  { token: 'field-plum', hex: '#33203F' },
  { token: 'field-graphite', hex: '#22252B' },
]

const types = [
  { cls: 'text-display-2xl', name: 'display-2xl', spec: '52 → 128px · 200 · −0.045em', sample: 'Futures' },
  { cls: 'text-display-xl', name: 'display-xl', spec: '40 → 92px · 200 · −0.04em', sample: 'Build futures' },
  { cls: 'text-display-l', name: 'display-l', spec: '34 → 68px · 200 · −0.035em', sample: 'Craft, then leadership' },
  { cls: 'text-heading', name: 'heading', spec: '24 → 40px · 300 · −0.03em', sample: 'Design that earns its seat' },
  { cls: 'text-title', name: 'title', spec: '20 → 26px · 300 · −0.02em', sample: 'A title for a card or subsection' },
  { cls: 'text-body-lg text-ink-2', name: 'body-lg', spec: '18 → 20px · 300 · 1.6', sample: 'Lead paragraph. Once per section, to set the tone before the detail.' },
  { cls: 'text-body text-ink-2', name: 'body', spec: '16 → 17px · 400 · 1.7', sample: 'Default reading text. Never below 16px, never thinner than 400.' },
  { cls: 'text-body-editorial text-ink-2', name: 'body-editorial', spec: '17 → 19px · 350 · 1.75 · 68ch', sample: 'Long-form stories and essays. Line length capped at 68 characters.' },
  { cls: 'text-body-sm text-ink-2', name: 'body-sm', spec: '15px · 400 · 1.6', sample: 'Dense copy, table cells, card descriptions.' },
  { cls: 'text-caption text-ink-3', name: 'caption', spec: '13px · 400 · 1.5', sample: 'Image credits and footnotes.' },
  { cls: 'text-overline text-ink-3', name: 'overline', spec: 'Geist Mono · 12px · +0.08em · caps', sample: 'Section overline' },
  { cls: 'text-label text-ink-3', name: 'label', spec: 'Geist Mono · 12px · +0.06em · caps', sample: 'Metadata label' },
]
const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
const breakpoints = [
  { n: 'base', px: '0–767', note: '4 columns, 24px margin, 72px section padding. Single-column reading.' },
  { n: 'md', px: '768', note: '12 columns, 48px margin, 24px column gap, 96px section padding.' },
  { n: 'lg', px: '1024', note: 'Full navigation and Craft menu. 128px section padding.' },
  { n: 'xl', px: '1376+', note: 'Content stops at 1280px. At 1440 the outer margin is 80px on every page.' },
]

const sections = [
  ['principles', 'Principles'], ['colour', 'Colour'], ['type', 'Type'], ['layout', 'Layout'],
  ['clickable', 'Clickable or not'], ['components', 'Components'], ['patterns', 'Patterns'],
  ['accessibility', 'Accessibility'], ['content', 'Content'], ['motion', 'Motion'],
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

function Spec({ name, children, note }: { name: string; children: ReactNode; note?: ReactNode }) {
  return (
    <div className="grid md:grid-cols-[14rem_1fr] gap-4 md:gap-10 py-8 hairline-top">
      <div>
        <p className="text-title text-ink">{name}</p>
        {note && <p className="text-body-sm text-ink-3 mt-2">{note}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
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

function SwatchTable({ rows }: { rows: Swatch[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table min-w-[640px]">
        <thead><tr><th>Token</th><th>Dark</th><th>Light</th><th>Role</th><th>Contrast on bg (dark / light)</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.token}>
              <td className="font-mono text-ink">{r.token}</td>
              <td><span className="inline-flex items-center gap-2"><span className="w-6 h-6 rounded-1 border border-[var(--line-2)]" style={{ background: r.dark }} />{r.dark}</span></td>
              <td><span className="inline-flex items-center gap-2"><span className="w-6 h-6 rounded-1 border border-[var(--line-2)]" style={{ background: r.light }} />{r.light}</span></td>
              <td>{r.role}</td>
              <td className="font-mono">{r.text || r.token === 'faint' ? `${ratio(r.dark, '#0F1013').toFixed(1)} · ${grade(ratio(r.dark, '#0F1013'))} / ${ratio(r.light, '#F5F6F7').toFixed(1)} · ${grade(ratio(r.light, '#F5F6F7'))}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DesignSystemPage() {
  const { theme } = useTheme()
  const [tab, setTab] = useState('overview')
  const [filter, setFilter] = useState('All')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'; m.content = 'noindex'
    document.head.appendChild(m)
    return () => { document.head.removeChild(m) }
  }, [])

  return (
    <>
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-12 md:pt-20 pb-16">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Design system' }]} /></div>
          <SectionHeader as="h1" label="Signal · Design system v2" title={<>Premium, minimal, <span className="accent-signal">clear.</span></>}
            intro="The tokens, type, layout, components and rules behind this website, in dark and light. Every page is built from what is on this page, so the experience stays consistent and meets WCAG 2.2 AA."
            action={<div className="flex items-center gap-3"><span className="text-label text-ink-3">Now: {theme}</span><ThemeToggle /></div>} />
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="chip">{label}</a>)}
          </nav>
        </div>
      </section>

      {/* 01 Principles */}
      <Block id="principles" n="01" title="Four rules everything follows.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ['Quiet surface, one signal', 'Graphite or paper carries the page. Lime appears only where something can be done or is live, so the eye always knows where to go.'],
            ['Thin type, readable text', 'Display and titles are Geist ExtraLight and Light for a premium feel. Anything people read for long is Regular, 16px or larger.'],
            ['Clickable looks clickable', 'Buttons have a fill or border, links are underlined, tags are plain mono text. Nobody should need to hover to find out.'],
            ['One grid, one margin', 'Header, content and footer share a 12-column grid and the same outer margin on every page and breakpoint.'],
          ].map(([t, b], i) => (
            <Card key={t}><p className="text-label text-signal-ink mb-4">0{i + 1}</p><p className="text-title text-ink mb-3">{t}</p><p className="text-body-sm text-ink-2">{b}</p></Card>
          ))}
        </div>
      </Block>

      {/* 02 Colour */}
      <Block id="colour" n="02" title="Two modes, one set of names." intro="Components never use raw colours. They use the semantic tokens below, which change value with the mode. Visitors get their system setting first; the sun and moon button switches and remembers the choice.">
        <h3 className="text-title text-ink mb-4">Surfaces</h3>
        <SwatchTable rows={surfaces} />
        <h3 className="text-title text-ink mt-12 mb-4">Ink</h3>
        <SwatchTable rows={inks} />
        <h3 className="text-title text-ink mt-12 mb-4">Action and feedback</h3>
        <SwatchTable rows={actions} />
        <h3 className="text-title text-ink mt-12 mb-4">Image fields</h3>
        <p className="text-body-sm text-ink-2 mb-6 max-w-2xl">Screenshots, covers and story visuals sit on a deep colour field. Fields are identical in both modes so the work looks the same whichever mode is on. Text on a field uses #ECEDEF (10.5:1 or better).</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fields.map(f => (
            <div key={f.token}><div className="h-24 rounded-2 p-3 flex items-end" style={{ background: f.hex }}><span className="font-mono text-xs text-[#ECEDEF]">{f.hex}</span></div><p className="text-label text-ink-3 mt-2">{f.token}</p></div>
          ))}
        </div>
        <DoDont dos={['Use signal for the one primary action in a view', 'Use cobalt only for inline links and focus', 'Give every case study one field colour and keep it everywhere it appears']}
          donts={['Put signal-coloured text on the light ground (use signal-ink)', 'Introduce a new colour for a single section', 'Desaturate case-study screenshots']} />
      </Block>

      {/* 03 Type */}
      <Block id="type" n="03" title="Geist, light at size." intro="Geist for everything, Geist Mono for labels and data. Weights 200 and 300 are for 20px and larger. Running text is 400 (350 only for long-form at 17px and up).">
        <div>
          {types.map(t => (
            <div key={t.name} className="grid md:grid-cols-[14rem_1fr] gap-2 md:gap-10 py-6 hairline-top items-baseline">
              <div><p className="font-mono text-sm text-ink">{t.name}</p><p className="text-caption text-ink-3 mt-1">{t.spec}</p></div>
              <p className={`${t.cls} ${t.cls.includes('ink') ? '' : 'text-ink'} min-w-0`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* 04 Layout */}
      <Block id="layout" n="04" title="One grid, one margin." intro="All content sits inside .container-site (max 1280px) on a 12-column grid (.grid-site). The header uses the same container, so the logo, headlines and page content line up on one left edge.">
        <div className="grid-site mb-10" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`h-20 rounded-1 bg-signal/15 border border-signal-ink/30 ${i >= 4 ? 'hidden md:block' : ''}`} />)}
        </div>
        <div className="overflow-x-auto"><table className="table min-w-[560px]"><thead><tr><th>Breakpoint</th><th>Width</th><th>Behaviour</th></tr></thead>
          <tbody>{breakpoints.map(b => <tr key={b.n}><td className="font-mono text-ink">{b.n}</td><td className="font-mono">{b.px}</td><td>{b.note}</td></tr>)}</tbody></table></div>
        <h3 className="text-title text-ink mt-12 mb-6">Spacing scale (4px base)</h3>
        <div className="flex flex-wrap items-end gap-5">
          {space.map(s => <div key={s} className="flex flex-col items-center gap-2"><div className="bg-ink-3/40 rounded-1" style={{ width: s, height: s }} /><span className="font-mono text-xs text-ink-3">{s}</span></div>)}
        </div>
        <h3 className="text-title text-ink mt-12 mb-4">Radius</h3>
        <div className="flex flex-wrap gap-6">
          {[['radius-1 · 4px', 'Tags, keys', 4], ['radius-2 · 6px', 'Buttons, inputs, media', 6], ['radius-3 · 10px', 'Cards, menus', 10], ['pill', 'Filter chips', 999]].map(([n, u, r]) => (
            <div key={n as string} className="flex items-center gap-3"><div className="w-14 h-14 border border-[var(--line-control)]" style={{ borderRadius: r as number }} /><div><p className="font-mono text-sm text-ink">{n}</p><p className="text-caption text-ink-3">{u}</p></div></div>
          ))}
        </div>
      </Block>

      {/* 05 Clickable or not */}
      <Block id="clickable" n="05" title="Clickable looks clickable." intro="The one rule that fixes most confusion: you can tell what can be pressed without hovering.">
        <div className="overflow-x-auto">
          <table className="table min-w-[720px]">
            <thead><tr><th>Element</th><th>Looks like</th><th>Clickable</th><th>Use for</th></tr></thead>
            <tbody>
              <tr><td><Button small>Primary</Button></td><td>Lime fill, 6px radius, sentence case</td><td>Yes</td><td>The main action of a view. One per view.</td></tr>
              <tr><td><Button small variant="secondary">Secondary</Button></td><td>Outline</td><td>Yes</td><td>Alternatives next to a primary.</td></tr>
              <tr><td><Button small variant="tertiary" arrow>Tertiary</Button></td><td>Underlined text with arrow</td><td>Yes</td><td>“Read more”, “All work”.</td></tr>
              <tr><td><a href="#clickable" className="link">Inline link</a></td><td>Cobalt, underlined</td><td>Yes</td><td>Links inside sentences.</td></tr>
              <tr><td><button type="button" className="chip" aria-pressed="false">Filter</button></td><td>Pill with border; filled when on</td><td>Yes</td><td>Filters, view switches, tabs on small screens.</td></tr>
              <tr><td><Tag>framework</Tag></td><td>Mono text with a slash, no box</td><td>No</td><td>Category or topic. Max three per item.</td></tr>
              <tr><td><Status>Live</Status></td><td>Dot + mono caps</td><td>No</td><td>Current state: live, now, sold out.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      {/* 06 Components */}
      <Block id="components" n="06" title="Components." intro="Each one lives in src/components/ds and is used as-is on every page. States shown are real.">
        <Spec name="Button" note="primary · secondary · tertiary · small · icon · disabled. Min 44px target on touch.">
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/craft" arrow>See the work</Button>
            <Button variant="secondary" to="/contact">Get in touch</Button>
            <Button variant="tertiary" to="/about" arrow>About me</Button>
            <Button small variant="secondary" href="mailto:uxbyamit@gmail.com">Small</Button>
            <Button href="https://adplist.org" variant="secondary" arrow>External</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Spec>
        <Spec name="Link" note="Cobalt and underlined inside text. Never colour alone.">
          <p className="text-body text-ink-2 max-w-xl">Read the <a href="#components" className="link">Dual Fluency playbook</a> before the session, or <Link to="/contact" className="link">get in touch</Link>.</p>
        </Spec>
        <Spec name="Tag and status" note="Not interactive. Three tags at most.">
          <div className="flex flex-col gap-4"><TagList items={['framework', 'business fluency', 'workshop']} label="Topics" /><div className="flex gap-6"><Status>Now</Status><Status live={false}>Archived</Status></div></div>
        </Spec>
        <Spec name="Filter chips" note="Toggle buttons with aria-pressed.">
          <div className="flex flex-wrap gap-2">{['All', 'AI', 'Leadership', 'Research'].map(f => <Chip key={f} pressed={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}</div>
        </Spec>
        <Spec name="Tabs" note="Arrow keys move between tabs; Home and End jump.">
          <Tabs label="Example tabs" value={tab} onChange={setTab} tabs={[{ id: 'overview', label: 'Overview' }, { id: 'process', label: 'Process' }, { id: 'outcome', label: 'Outcome' }]}>
            <p className="text-body text-ink-2">Panel: {tab}</p>
          </Tabs>
        </Spec>
        <Spec name="Breadcrumb" note="On every page deeper than one level.">
          <Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Dual Fluency' }]} />
        </Spec>
        <Spec name="Card" note="Static cards have no hover. Link cards lift their border and surface.">
          <div className="grid md:grid-cols-2 gap-4">
            <Card><p className="text-label text-ink-3 mb-3">Static</p><p className="text-title text-ink">A card that only holds content</p></Card>
            <Card to="/leadership"><p className="text-label text-ink-3 mb-3">Link card</p><p className="text-title text-ink">The whole card is one link</p></Card>
          </div>
        </Spec>
        <Spec name="Media frame" note="Screenshot on a field colour: cobalt, teal, plum or graphite.">
          <div className="grid md:grid-cols-3 gap-4">
            {caseStudies.slice(0, 3).map(cs => cs.image && <MediaFrame key={cs.id} src={cs.image} alt="" tone={cs.tone} />)}
          </div>
        </Spec>
        <Spec name="Case row" note="The case-study list item used on Home and Craft.">
          <ul><CaseRow cs={caseStudies[0]} /></ul>
        </Spec>
        <Spec name="Form fields" note="Visible label, hint, error linked with aria-describedby. 16px text stops zoom on iOS.">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <TextField label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} hint="Only used to send the playbook." placeholder="you@company.com" />
            <TextField label="Company" error="Enter your company name." defaultValue="" />
            <div className="md:col-span-2"><TextArea label="What would you like to talk about?" /></div>
            <label className="flex items-center gap-3 text-body-sm text-ink-2"><input type="checkbox" /> Send me new resources</label>
          </div>
        </Spec>
        <Spec name="Accordion" note="Native details and summary. Works without JavaScript.">
          <Accordion items={[{ title: 'What is Dual Fluency?', body: 'Speaking design and business with equal confidence.', open: true }, { title: 'Who is it for?', body: 'Designers moving into leadership.' }]} />
        </Spec>
        <Spec name="Callout" note="Context and notes. Not for errors.">
          <Callout title="Note">Screens are shown as designed in the SAP UI kit and are not modified.</Callout>
        </Spec>
        <Spec name="Quote">
          <Quote by="Mentee" role="Product designer">The session changed how I present design decisions to my leadership.</Quote>
        </Spec>
        <Spec name="Stat">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8"><Stat value="300M+" label="Users reached" /><Stat value="$5M" label="Documented savings" /><Stat value="16+" label="Years in design" /></div>
        </Spec>
        <Spec name="Keyboard key and table">
          <p className="text-body-sm text-ink-2 mb-6">Press <kbd className="kbd">↓</kbd> then <kbd className="kbd">Enter</kbd>.</p>
          <table className="table max-w-xl"><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody><tr><td>radius-2</td><td>6px</td></tr><tr><td>touch-min</td><td>44px</td></tr></tbody></table>
        </Spec>
        <Spec name="Theme toggle" note="In the header on every page. Label says which mode it switches to.">
          <ThemeToggle />
        </Spec>
      </Block>

      {/* 07 Patterns */}
      <Block id="patterns" n="07" title="Patterns." intro="How the components combine on pages.">
        <Accordion items={[
          { title: 'Page header', body: 'Breadcrumb (deeper pages), mono overline, display-l title, body-lg intro. Optional portrait on the right with the cobalt cast.', open: true },
          { title: 'Craft menu', body: 'Opens on click, or on hover with a short delay and a 280ms grace period so moving into it never drops it. Full-width panel with the three lead case studies and their full titles, then the rest. Esc closes and returns focus.' },
          { title: 'Section', body: 'section-y padding, hairline on top, SectionHeader, then content on the grid. One primary action per section at most.' },
          { title: 'Hub and detail', body: 'Collections (leadership stories, resources) show cards on a hub page; each card opens its own detail page with a breadcrumb back.' },
          { title: 'Story and resource visuals', body: 'Large cards with a field-colour visual. Resources use a sheet cover (3:4) with a simple diagram of the framework.' },
        ]} />
      </Block>

      {/* 08 Accessibility */}
      <Block id="accessibility" n="08" title="WCAG 2.2 AA, both modes." intro="These are requirements, not suggestions. Each is checked before a page ships.">
        <div className="overflow-x-auto"><table className="table min-w-[640px]"><thead><tr><th>Requirement</th><th>How Signal meets it</th></tr></thead><tbody>
          {[
            ['1.4.3 Contrast (text)', 'All text tokens are 4.5:1 or more on every surface in both modes (most are 7:1).'],
            ['1.4.11 Non-text contrast', 'Control borders use line-control (3:1+). Focus ring is cobalt, 2px, 3px offset.'],
            ['1.4.1 Use of colour', 'Links are underlined; selected chips are filled; status has a dot and a word.'],
            ['2.4.7 / 2.4.11 Focus visible', 'One focus style for every interactive element; the sticky header never covers focused content (scroll-padding).'],
            ['2.5.8 Target size', 'Buttons, chips, nav and icon buttons are at least 44×44px on touch.'],
            ['2.1.1 Keyboard', 'Menus, tabs, accordions and dialogs work with keyboard; Esc closes overlays.'],
            ['2.4.1 Bypass blocks', '“Skip to content” link is the first focusable element.'],
            ['1.4.10 Reflow / 1.4.4 Resize', 'Works at 320px wide and 200% zoom without horizontal scrolling.'],
            ['2.3.3 Motion', 'prefers-reduced-motion turns off animation and parallax.'],
            ['1.1.1 Text alternatives', 'Meaningful images have alt text; decorative images use alt="".'],
            ['1.3.1 Structure', 'One h1 per page, headings in order, lists marked up as lists, tables with headers.'],
            ['3.3.1 / 3.3.2 Forms', 'Visible labels, hints and errors linked by aria-describedby; errors announced.'],
          ].map(([a, b]) => <tr key={a}><td className="text-ink whitespace-nowrap">{a}</td><td>{b}</td></tr>)}
        </tbody></table></div>
      </Block>

      {/* 09 Content */}
      <Block id="content" n="09" title="Words follow rules too.">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['Sentence case', 'Buttons, titles and navigation are sentence case. Caps only in mono labels.'],
            ['Names are consistent', 'Frameworks and guides are “playbooks”. Case studies use their full title everywhere, menus included.'],
            ['Few tags', 'Three tags at most. No hashtag rows and no tag that repeats the title.'],
            ['No dates on stories', 'Stories and resources carry no year labels or “sold out” style markers.'],
            ['Action labels say what happens', '“Read the case study”, “Request the playbook”, not “Click here”.'],
            ['Facts only', 'Numbers and claims come from the case study or Amit’s own record.'],
          ].map(([t, b]) => <Card key={t}><p className="text-title text-ink mb-2">{t}</p><p className="text-body-sm text-ink-2">{b}</p></Card>)}
        </div>
      </Block>

      {/* 10 Motion */}
      <Block id="motion" n="10" title="Motion supports, never performs.">
        <div className="grid md:grid-cols-3 gap-4">
          {[['fast · 160ms', 'Hover, press, colour changes'], ['base · 280ms', 'Menus, theme change, cards'], ['slow · 600ms', 'Section reveals, headline lines']].map(([t, b]) => <Card key={t}><p className="font-mono text-sm text-signal-ink mb-2">{t}</p><p className="text-body-sm text-ink-2">{b}</p></Card>)}
        </div>
        <p className="text-body-sm text-ink-3 mt-6">Easing: cubic-bezier(0.16, 1, 0.3, 1). Everything is disabled under prefers-reduced-motion.</p>
      </Block>
    </>
  )
}
