# Design system (website, web + mobile)

Living reference: `/#/design-system` on the site. Source of truth for tokens: `src/styles/tokens.css`.
Tailwind mirrors the colours in `tailwind.config.ts` (`ink`, `ink-2`, `ink-3`, `faint`, `surface-0..3`).

## Colour
| Token | Hex | Use | Contrast on surface-0 |
|---|---|---|---|
| ink (`text-white`) | #F5F2ED | headings, primary copy, active nav | 17.5:1 |
| ink-2 | #C2BFBB | body, secondary copy, inactive nav | 10.7:1 |
| ink-3 | #A6A4A0 | labels, captions, metadata | 7.9:1 |
| faint | #6E6D6A | decorative glyphs only, aria-hidden | 3.8:1 |
| surface-0..3 | #0C0C0B #141413 #1C1C1A #262624 | page, sections, raised, hover | |
| line-1 / line-2 / line-control | 10% / 20% / 45% ink | dividers / card borders / input + outline-button borders | |

Rules: never use `opacity-*` or `rgba()` for text. Hierarchy is size + weight + three ink tones. Hover changes the colour token.

## Type (Inter)
display-2xl, display-xl, display-l, heading, title, body-lg, body, body-sm, caption, label, overline.
Weights 200-300 only at 24px and above. Body 16px minimum, labels and overlines 12px minimum.

## Space and layout
4px ramp. `.container-site` (max 1280px, 24px gutter, 48px from md), `.section-y` (72 / 96 / 128px).
Breakpoints: 640, 768, 1024, 1280. Radius 0 by default.

## Components (`src/components/ds`)
Button (primary, secondary, ghost, small), Chip, Card, Stat, SectionHeader. CSS: `.btn`, `.chip`, `.card`, `.field`, `.tap-target`.

## Mobile
44px tap targets, 16px inputs, single column below 768px, two image sizes via srcset, desktop-only parallax.

## Adoption status
- Applied everywhere: colour tokens (all text, hover, animation targets), minimum text sizes, readable weights, focus ring.
- Applied: footer (container, tap targets), design-system page.
- Not yet migrated to components: hero buttons, contact form, case-study cards. Next step: replace one-off inline styles with Button, Card and SectionHeader page by page.
