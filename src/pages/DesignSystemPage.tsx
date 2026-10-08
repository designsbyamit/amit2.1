import { useEffect } from 'react'
import Button from '../components/ds/Button'
import Chip from '../components/ds/Chip'
import Card from '../components/ds/Card'
import Stat from '../components/ds/Stat'
import SectionHeader from '../components/ds/SectionHeader'

/* ---------- contrast helpers (computed live so the page can't drift from the tokens) ---------- */
const lum = (hex: string) => {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
const grade = (r: number) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large / UI only' : 'Fail — decorative only')

const surfaces = [
  { name: 'surface-0', hex: '#0C0C0B', use: 'Page background' },
  { name: 'surface-1', hex: '#141413', use: 'Alternate sections, cards' },
  { name: 'surface-2', hex: '#1C1C1A', use: 'Raised cards, inputs' },
  { name: 'surface-3', hex: '#262624', use: 'Hover on raised' },
]
const inks = [
  { name: 'ink', cls: 'text-white', hex: '#F5F2ED', use: 'Headings, primary copy, active nav' },
  { name: 'ink-2', cls: 'text-ink-2', hex: '#C2BFBB', use: 'Body copy, secondary text, inactive nav' },
  { name: 'ink-3', cls: 'text-ink-3', hex: '#A6A4A0', use: 'Labels, captions, metadata' },
  { name: 'faint', cls: 'text-faint', hex: '#6E6D6A', use: 'Decorative glyphs only — never words' },
]
const types = [
  { cls: 'text-display-2xl', name: 'display-2xl', spec: '64 → 136px · 200 · -0.05em', sample: 'Futures' },
  { cls: 'text-display-xl', name: 'display-xl', spec: '44 → 96px · 200 · -0.045em', sample: 'Build futures' },
  { cls: 'text-display-l', name: 'display-l', spec: '36 → 72px · 200 · -0.04em', sample: 'Craft, then leadership' },
  { cls: 'text-heading', name: 'heading', spec: '24 → 40px · 300 · -0.03em', sample: 'Design that earns its seat' },
  { cls: 'text-title', name: 'title', spec: '20 → 28px · 300 · -0.02em', sample: 'A title for a card or subsection' },
  { cls: 'text-body-lg text-ink-2', name: 'body-lg', spec: '18 → 21px · 350 · 1.65', sample: 'Lead paragraph. Used once per section to set the tone before the detail.' },
  { cls: 'text-body text-ink-2', name: 'body', spec: '16 → 18px · 400 · 1.7', sample: 'Default reading text. Never below 16px on mobile, never thinner than 400.' },
  { cls: 'text-body-sm text-ink-2', name: 'body-sm', spec: '15px · 400 · 1.6', sample: 'Dense UI copy, table cells, long captions.' },
  { cls: 'text-caption text-ink-3', name: 'caption', spec: '13px · 400 · 1.5', sample: 'Image credits and footnotes.' },
  { cls: 'text-label text-ink-3', name: 'label', spec: '12px · 450 · +0.12em · caps', sample: 'Metadata label' },
  { cls: 'text-overline text-ink-3', name: 'overline', spec: '12px · 500 · +0.18em · caps', sample: 'Section overline' },
]
const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
const breakpoints = [
  { n: 'base', px: '0–639', note: 'Phones. Single column, 24px gutters, 72px section padding.' },
  { n: 'sm', px: '640', note: 'Large phones / small tablets. Two-up for stats and chips.' },
  { n: 'md', px: '768', note: 'Tablet portrait. 48px gutters, 96px section padding, side-by-side layouts begin.' },
  { n: 'lg', px: '1024', note: 'Laptop. 128px section padding. Full navigation.' },
  { n: 'xl', px: '1280', note: 'Desktop. Content stops growing at 1280px.' },
]

function Block({ id, children }: { id: string; children: React.ReactNode }) {
  return <section id={id} className="section-y hairline-top"><div className="container-site">{children}</div></section>
}

export default function DesignSystemPage() {
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'; m.content = 'noindex'
    document.head.appendChild(m)
    return () => { document.head.removeChild(m) }
  }, [])

  return (
    <>
      <section className="section-y pt-32 md:pt-40">
        <div className="container-site">
          <SectionHeader as="h1" label="Design system · v1" title={<>One system, <em>phone to desktop.</em></>}
            intro="Tokens, type, layout and components for this website. It is a system for reading and storytelling, not for application UI: few components, strict contrast, generous space." />
          <div className="flex flex-wrap gap-3">
            {['Principles', 'Colour', 'Type', 'Space & layout', 'Components', 'Mobile', 'Motion', 'Accessibility'].map(t => (
              <a key={t} className="chip" href={`#ds-${t.split(' ')[0].toLowerCase()}`} onClick={e => { e.preventDefault(); document.getElementById(`ds-${t.split(' ')[0].toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }) }}>{t}</a>
            ))}
          </div>
        </div>
      </section>

      <Block id="ds-principles">
        <SectionHeader label="01 · Principles" title="Craft you can read." />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['Legible first', 'Every word passes WCAG AA on every surface. Body copy gets 10:1 or better. Thin display weights are reserved for large type.'],
            ['Quiet, not faint', 'Hierarchy comes from size, weight and three ink tones. Never from opacity. Quiet text is still easy to read.'],
            ['Same on every screen', 'One token set drives mobile and desktop. Sizes use clamp(), spacing follows the same 4px ramp, tap targets are 44px.'],
          ].map(([t, d]) => (
            <Card key={t}><h3 className="text-title text-white mb-3">{t}</h3><p className="text-body-sm text-ink-2">{d}</p></Card>
          ))}
        </div>
      </Block>

      <Block id="ds-colour">
        <SectionHeader label="02 · Colour" title="A warm black and three inks." intro="Text colour is always a token. Opacity is never used to create hierarchy because it changes with whatever is behind it and can't be audited." />
        <h3 className="text-label text-ink-3 mb-4">Surfaces</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {surfaces.map(s => (
            <div key={s.name} style={{ background: s.hex, border: '1px solid var(--line-2)' }} className="p-5 min-h-[7rem] flex flex-col justify-end">
              <p className="text-body-sm text-white">{s.name}</p>
              <p className="text-caption text-ink-3">{s.hex}</p>
              <p className="text-caption text-ink-3 mt-1">{s.use}</p>
            </div>
          ))}
        </div>
        <h3 className="text-label text-ink-3 mb-4">Ink (text) — measured contrast</h3>
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="hairline-bottom">
                <th className="text-label text-ink-3 py-3 pr-4 font-normal">Token</th>
                <th className="text-label text-ink-3 py-3 pr-4 font-normal">Sample</th>
                {surfaces.slice(0, 3).map(s => <th key={s.name} className="text-label text-ink-3 py-3 pr-4 font-normal">on {s.name}</th>)}
                <th className="text-label text-ink-3 py-3 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {inks.map(i => (
                <tr key={i.name} className="hairline-bottom align-top">
                  <td className="text-body-sm text-white py-4 pr-4">{i.name}<br /><span className="text-caption text-ink-3">{i.hex}</span></td>
                  <td className={`text-body py-4 pr-4 ${i.cls}`}>Aa Design</td>
                  {surfaces.slice(0, 3).map(s => {
                    const r = ratio(i.hex, s.hex)
                    return <td key={s.name} className="text-body-sm text-ink-2 py-4 pr-4">{r.toFixed(1)}:1<br /><span className="text-caption text-ink-3">{grade(r)}</span></td>
                  })}
                  <td className="text-body-sm text-ink-2 py-4">{i.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-label text-ink-3 mt-12 mb-4">Lines</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[['line-1', 'Hairline dividers', 'var(--line-1)'], ['line-2', 'Card borders, chips', 'var(--line-2)'], ['line-control', 'Inputs and outline buttons (3:1+)', 'var(--line-control)']].map(([n, u, v]) => (
            <div key={n} className="p-5" style={{ border: `1px solid ${v}` }}>
              <p className="text-body-sm text-white">{n}</p><p className="text-caption text-ink-3">{u}</p>
            </div>
          ))}
        </div>
        <ul className="mt-10 space-y-2 text-body-sm text-ink-2 list-disc pl-5">
          <li><strong className="text-white font-medium">Do</strong> use <code>text-white</code>, <code>text-ink-2</code>, <code>text-ink-3</code>. Do use <code>text-faint</code> only for aria-hidden glyphs.</li>
          <li><strong className="text-white font-medium">Don't</strong> put <code>opacity-*</code> or <code>rgba()</code> on text. Don't animate text to a dimmed opacity.</li>
          <li>For hover, change the colour token (ink-3 → white), not the opacity.</li>
        </ul>
      </Block>

      <Block id="ds-type">
        <SectionHeader label="03 · Type" title="Inter, from hairline to workhorse." intro="One family, variable weight. Weights 200–300 are for type 24px and larger. Anything smaller than that uses 400 or heavier." />
        <div>
          {types.map(t => (
            <div key={t.name} className="py-6 hairline-bottom grid md:grid-cols-[200px_1fr] gap-3 md:gap-8 items-baseline">
              <div><p className="text-body-sm text-white">{t.name}</p><p className="text-caption text-ink-3">{t.spec}</p></div>
              <p className={`${t.cls} text-white`} style={t.cls.includes('text-ink') ? { color: undefined } : undefined}>{t.sample}</p>
            </div>
          ))}
        </div>
        <ul className="mt-8 space-y-2 text-body-sm text-ink-2 list-disc pl-5">
          <li>Line length 45–70 characters. Use <code>text-body-editorial</code> or <code>max-w-[65ch]</code>.</li>
          <li>Sentence case for headings. Uppercase only for label and overline.</li>
          <li>Minimum rendered size anywhere on the site: 12px (labels, overlines). Body: 16px.</li>
        </ul>
      </Block>

      <Block id="ds-space">
        <SectionHeader label="04 · Space & layout" title="A 4px ramp and a 1280px page." />
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-label text-ink-3 mb-4">Spacing scale (px)</h3>
            <div className="space-y-2">
              {space.map(n => (
                <div key={n} className="flex items-center gap-4">
                  <span className="text-caption text-ink-3 w-10">{n}</span>
                  <span style={{ width: n, height: 12, background: 'var(--color-ink-3)' }} />
                </div>
              ))}
            </div>
            <p className="text-body-sm text-ink-2 mt-6">Use Tailwind steps that land on this ramp (1, 2, 3, 4, 6, 8, 12, 16, 24, 32). Prefer 8-based jumps between blocks.</p>
          </div>
          <div>
            <h3 className="text-label text-ink-3 mb-4">Breakpoints</h3>
            <div>
              {breakpoints.map(b => (
                <div key={b.n} className="py-3 hairline-bottom grid grid-cols-[4rem_5rem_1fr] gap-3">
                  <span className="text-body-sm text-white">{b.n}</span><span className="text-body-sm text-ink-3">{b.px}</span><span className="text-body-sm text-ink-2">{b.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="text-label text-ink-3 mt-12 mb-4">Page frame</h3>
        <ul className="space-y-2 text-body-sm text-ink-2 list-disc pl-5">
          <li><code>.container-site</code>: max 1280px, side padding 24px (mobile) / 48px (tablet and up).</li>
          <li><code>.section-y</code>: 72px → 96px → 128px vertical padding. One <code>hairline-top</code> between sections.</li>
          <li>Grid: 1 column on phones, 2 at md, 3–4 at lg. Gap 24px.</li>
          <li>Radius is 0 by default. Chips and cards stay square; only avatars and dots are round.</li>
        </ul>
      </Block>

      <Block id="ds-components">
        <SectionHeader label="05 · Components" title="Few, strong, reusable." intro="Available from components/ds. Pages should compose these before writing new one-off styles." />
        <div className="space-y-12">
          <div>
            <h3 className="text-label text-ink-3 mb-4">Button</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button to="/craft">See the work</Button>
              <Button variant="secondary" to="/contact">Get in touch</Button>
              <Button variant="ghost" to="/about">About me →</Button>
              <Button small variant="secondary" href="mailto:uxbyamit@gmail.com">Small</Button>
            </div>
            <p className="text-caption text-ink-3 mt-3">Primary once per view. Minimum 44px tall on touch devices. Label is uppercase, 12px.</p>
          </div>
          <div>
            <h3 className="text-label text-ink-3 mb-4">Chip</h3>
            <div className="flex flex-wrap gap-3"><Chip>Enterprise AI</Chip><Chip>Design leadership</Chip><Chip pressed onClick={() => {}}>Selected</Chip></div>
          </div>
          <div>
            <h3 className="text-label text-ink-3 mb-4">Card</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card><p className="text-overline text-ink-3 mb-3">Case study</p><h4 className="text-title text-white mb-3">Static card</h4><p className="text-body-sm text-ink-2">Surface-1, hairline border. Border and surface step up on hover.</p></Card>
              <Card to="/craft"><p className="text-overline text-ink-3 mb-3">Link card</p><h4 className="text-title text-white mb-3">Whole card is the link</h4><p className="text-body-sm text-ink-2">Use for case studies and articles.</p></Card>
            </div>
          </div>
          <div>
            <h3 className="text-label text-ink-3 mb-4">Stat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8"><Stat value="16+" label="Years in design" /><Stat value="54+" label="Platforms designed" /><Stat value="250+" label="Designers in the community" /><Stat value="90%" label="CSAT" /></div>
          </div>
          <div>
            <h3 className="text-label text-ink-3 mb-4">Form field</h3>
            <label className="block max-w-md"><span className="text-label text-ink-3 block mb-2">Email</span><input className="field" type="email" placeholder="you@company.com" /></label>
            <p className="text-caption text-ink-3 mt-3">Inputs are 16px so iOS does not zoom on focus. Border is line-control for a 3:1 outline.</p>
          </div>
        </div>
      </Block>

      <Block id="ds-mobile">
        <SectionHeader label="06 · Mobile" title="Designed phone-first." />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            ['Touch', 'All tappable things are 44×44px or larger (use .btn or .tap-target). 8px minimum between targets.'],
            ['Text', 'Body 16px, nothing under 12px. Input text 16px. Line height 1.6–1.7 for reading.'],
            ['Layout', 'Single column below 768px. Side padding 24px. No horizontal scroll, ever (tables scroll inside their own container).'],
            ['Images', 'Serve two sizes with srcset. Hero uses a 1200px version on phones. Lazy-load everything below the fold.'],
            ['Motion', 'Parallax and magnetic effects are desktop only. Reveal animations stay under 700ms.'],
            ['Navigation', 'Full-screen menu under 768px, inline links from md. Active state is ink; inactive is ink-2.'],
          ].map(([t, d]) => <Card key={t}><h3 className="text-title text-white mb-2">{t}</h3><p className="text-body-sm text-ink-2">{d}</p></Card>)}
        </div>
      </Block>

      <Block id="ds-motion">
        <SectionHeader label="07 · Motion" title="Slow in, quick out." />
        <ul className="space-y-2 text-body-sm text-ink-2 list-disc pl-5">
          <li>Easing: <code>cubic-bezier(0.16, 1, 0.3, 1)</code> (<code>--ease-out</code>).</li>
          <li>Durations: 200ms (hover) · 400ms (state) · 700ms (reveal). Page transitions 450ms.</li>
          <li>Reveals animate position, not text opacity. Resting text is always at its token colour.</li>
          <li>Honour <code>prefers-reduced-motion</code>: transitions collapse to 0.01ms (already global).</li>
        </ul>
      </Block>

      <Block id="ds-accessibility">
        <SectionHeader label="08 · Accessibility" title="The checklist every page passes." />
        <ul className="space-y-2 text-body-sm text-ink-2 list-disc pl-5">
          <li>One <code>h1</code> per page; headings never skip a level.</li>
          <li>Visible focus ring on every interactive element (2px ink, 3px offset).</li>
          <li>Text contrast ≥ 4.5:1 (body ≥ 7:1). Controls and borders that carry meaning ≥ 3:1.</li>
          <li>Meaningful images have specific alt text; decorative marks are <code>aria-hidden</code>.</li>
          <li>Dialogs trap focus, close on Esc and return focus.</li>
          <li>Verified with an automated contrast walk across all routes at 1440px before release.</li>
        </ul>
      </Block>
    </>
  )
}
