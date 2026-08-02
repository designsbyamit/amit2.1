# Amit Kumar Tiwari — Portfolio Website Design Spec

**Date:** 2026-05-23  
**Project:** `amit2.0`  
**Status:** Approved for implementation

---

## 1. Overview

A premium, editorial, cinematic portfolio website for Amit Kumar Tiwari — Senior Design Leader, AI-native UX strategist, mentor, and community curator with 16+ years of experience.

**Target audience:** Design leaders, designers, conference organizers, innovation-led businesses, AI/design enthusiasts, mentees.

**Emotional goal:** Leave visitors feeling — *"This person doesn't just design interfaces. They shape people, systems, culture, and the future direction of design."*

---

## 2. Design Decisions (Confirmed)

| Decision | Choice |
|---|---|
| Color palette | Black `#0C0C0B` + off-warm-white `#F5F2ED`, pure monochrome |
| Accent | None — pure monochrome, typography and layout carry hierarchy |
| Typography | Inter (variable), all weights. Dramatic scale + tight negative kerning |
| Hero treatment | Photo bleeds from right, atmospheric B&W, grain texture + sweep lines, headline bottom-left |
| Tech stack | Vite + React + Framer Motion + Tailwind CSS |
| Deployment | GitHub Pages (static build) |

---

## 3. Design System

### Colors
```
--color-black:      #0C0C0B   /* primary background (dark mode) */
--color-white:      #F5F2ED   /* primary background (light mode) */
--color-black-90:   rgba(12,12,11,0.9)
--color-black-60:   rgba(12,12,11,0.6)
--color-black-30:   rgba(12,12,11,0.3)
--color-white-90:   rgba(245,242,237,0.9)
--color-white-60:   rgba(245,242,237,0.6)
--color-white-30:   rgba(245,242,237,0.3)
--color-white-12:   rgba(245,242,237,0.12)
--color-white-06:   rgba(245,242,237,0.06)
```

### Typography (Inter variable)
```
Display XL:  font-size: clamp(56px, 8vw, 120px)  weight: 700   tracking: -0.045em  lh: 0.88
Display L:   font-size: clamp(40px, 5vw, 72px)    weight: 700   tracking: -0.04em   lh: 0.90
Heading:     font-size: clamp(28px, 3vw, 44px)    weight: 600   tracking: -0.03em   lh: 1.0
Subheading:  font-size: clamp(18px, 2vw, 24px)    weight: 500   tracking: -0.02em   lh: 1.2
Overline:    font-size: 10px                       weight: 500   tracking: 0.18em    lh: 1.0   uppercase
Body:        font-size: 16px                       weight: 400   tracking: 0.01em    lh: 1.75
Caption:     font-size: 12px                       weight: 400   tracking: 0.06em    lh: 1.6
Label:       font-size: 11px                       weight: 600   tracking: 0.12em    lh: 1.0   uppercase
```

### Texture & Motion
- **Grain layer:** SVG fractalNoise overlay, `opacity: 0.04–0.08`, `mix-blend-mode: overlay`, applied to dark sections
- **Sweep lines:** 3 horizontal lines, animated `translateX` at 8–12s duration, `rgba(245,242,237,0.06–0.12)`, staggered delays
- **Transitions:** Framer Motion `easeOut`, duration `0.6–0.8s` for section entrances
- **Parallax:** Framer Motion `useScroll` + `useTransform` for hero photo drift (+/- 80px)
- **Scroll reveals:** `whileInView` with `opacity: 0→1`, `y: 40→0`, `staggerChildren: 0.1`

### Spacing
```
--space-xs:   8px
--space-sm:   16px
--space-md:   32px
--space-lg:   64px
--space-xl:   120px
--space-2xl:  200px
```

---

## 4. Site Architecture

```
/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css            # Tailwind + CSS custom properties
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── GrainOverlay.tsx
│   │   │   ├── SweepLines.tsx
│   │   │   ├── RevealText.tsx
│   │   │   └── SectionLabel.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ImpactSnapshot.tsx
│   │       ├── Journey.tsx
│   │       ├── StrategicWork.tsx
│   │       ├── AINativeDesign.tsx
│   │       ├── DesignSystems.tsx
│   │       ├── Leadership.tsx
│   │       ├── Community.tsx
│   │       ├── Reflections.tsx
│   │       ├── Vision.tsx
│   │       ├── Resources.tsx
│   │       └── Contact.tsx
│   ├── data/
│   │   ├── impact.ts
│   │   ├── journey.ts
│   │   ├── work.ts
│   │   ├── community.ts
│   │   └── reflections.ts
│   ├── hooks/
│   │   └── useScrollProgress.ts
│   └── assets/
│       └── images/
│           └── amit-stage.jpg
├── public/
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 5. Section Specs

### 5.1 Nav
- Fixed, transparent on scroll-top → blurs to `rgba(12,12,11,0.85)` + `backdrop-filter: blur(20px)` on scroll
- Left: `AKT` logotype, Inter 700, small caps
- Right: `Work · Writing · Mentorship · Connect` — Inter 500, 11px, 0.1em tracking
- Mobile: hamburger → full-screen overlay menu

### 5.2 Hero
**Layout:** Full viewport (`100dvh`). Black background.

**Layers (back to front):**
1. Black base `#0C0C0B`
2. Photo zone: right 55% of viewport. `IMG_6087.JPG` — **rotate 90° CCW** before use, convert to B&W via CSS `filter: grayscale(1) contrast(1.1)`, `object-fit: cover`. Left edge fades to black via `linear-gradient(90deg, #0C0C0B 0%, transparent 35%)`. Bottom fades via `linear-gradient(to top, #0C0C0B 0%, transparent 40%)`
3. Radial depth: `radial-gradient(ellipse at 60% 40%, rgba(40,35,28,0.3), transparent 60%)`
4. Sweep lines component (3 animated lines)
5. Grain overlay component
6. Content (z-index: 10)

**Content:**
- Top-left: Nav
- Bottom-left content block:
  - Overline: `Senior Design Leader · AI-Native UX · Systems Thinking`
  - Display XL headline: `I shape`  `systems,`  `people &`  `futures.` — staggered word reveal on load
  - Below headline: 16px body, max-width 380px, opacity 60%
  - CTA row: `View Strategic Work` (ghost border button) + `Book Mentorship →` (text link)
- Bottom-right: Vertical `Scroll` label, writing-mode vertical, opacity 20%

**Animations:**
- On load: headline words stagger up from y:30, opacity 0→1, 0.6s easeOut, 0.1s per word
- Photo: parallax drift on scroll (-80px y over full hero height)
- Sweep lines: perpetual animation

### 5.3 Impact Snapshot
**Layout:** Dark section, 5-column metric grid on desktop, 2-col on mobile.

**Metrics:**
| Metric | Value | Label |
|---|---|---|
| Years | 16+ | Years of Experience |
| Projects | 40+ | Major Projects |
| Industries | 17 | Industries Covered |
| Mentored | 25+ | Designers Mentored |
| Team | 30+ | Designers Led |
| Community | 250+ | SAP Design Hub Members |
| Events | 10+ | Talks & Workshops |

**Each card:**
- Large number: Display L, Inter 700, tight kerning
- Label: Overline style, opacity 40%
- Thin top border, rest whitespace
- Count-up animation on scroll into view (Framer Motion `useInView` + JS counter)

**Section treatment:** Dark background, grain overlay, section label top-left

### 5.4 Journey / Timeline
**Layout:** Alternating narrative — horizontal scroll on desktop, vertical on mobile.

**Phases:**
1. **2009–2011** — Foundations. Infosys UX Academy. First design training.
2. **2011–2015** — Early Practice. End-to-end UX delivery, evangelizing design, e-commerce.
3. **2015–2019** — Enterprise Scale. HPE. Greenlake cloud suite. DesignOps. Global CoPs.
4. **2019–2022** — Strategic Leadership. Accenture Design Studio. UX practice leadership. Cross-industry B2B/B2C.
5. **2022–present** — AI-Native Era. SAP. Design leadership at scale. AI-native experiences. Community building. SAP Design Hub India (250+).

**Treatment:**
- Each phase: year range as Display L in opacity 10% (giant background text), role/company as Heading, 2–3 lines of narrative
- Thin connecting line between phases
- On scroll: each phase reveals with opacity + x translate (left/right alternating)

### 5.5 Strategic Work
**Layout:** Full-width editorial case study cards — NOT a grid. Each takes most of the viewport.

**4 Flagship Projects:**

**1. Agentic AI for Order Confirmation**
- Tagline: Orchestrating intelligent automation at enterprise scale
- Focus: Agentic workflows, operational UX, AI-human collaboration, enterprise efficiency
- Format: Problem space → Strategic thinking → Outcome — no UI screenshots, all narrative

**2. Genie — Holistic Conversational HCM**
- Tagline: Reimagining the employee experience through conversational AI
- Focus: Conversational AI, multimodal interactions, enterprise AI adoption, HCM transformation
- Format: Business challenge → Design strategy → Organizational impact

**3. AI-Powered Search Experience**
- Tagline: Making enterprise knowledge discoverable through contextual AI
- Focus: Contextual search, AI-assisted discovery, scalable information architecture
- Format: Complexity → Systems thinking → Adoption outcomes

**4. Saudia Airlines Experience**
- Tagline: Orchestrating end-to-end experience for a national carrier at scale
- Focus: Service ecosystems, 16-designer team structure (pods), 100-day launch, systems orchestration
- Format: Scale challenge → Leadership model → Delivery outcomes

**Each case study card:**
- Section number (01–04) as giant background numeral, opacity 4%
- Overline: category tags
- Heading: project name
- 3 columns: Challenge / Approach / Outcome
- No UI screenshots — instead: abstract visual texture, system diagrams, or typographic compositions
- "Read more" expands inline (no page navigation)

### 5.6 AI-Native Design & Experimentation
**Layout:** Dark section with card grid. Slightly different texture — more depth.

**Content cards (6):**
1. AI-native workflow exploration
2. Multimodal design thinking
3. Conversational UX frameworks
4. Human-AI collaboration models
5. Prompt-driven design systems
6. Speculative future interactions

**Treatment:**
- Cards: dark bordered, hover lifts with subtle shadow
- Each: icon/visual (abstract SVG), title, 2-line description, tag
- Section intro: philosophical statement about AI + design

### 5.7 Design Systems & Scale
**Layout:** Light section (off-warm-white background) — creates visual rhythm break.

**Content:**
- GreenUX Design System (HPE)
- SAP Design governance
- Suite-first thinking framework
- Accessibility systems
- Ecosystem maps

**Treatment:** Architecture/diagram style visuals — SVG system maps, not screenshots. Abstract and conceptual.

### 5.8 Leadership & Mentorship
**Layout:** Dark, editorial. Two-part: philosophy + testimonials.

**Philosophy block:** Large pull quote from Amit's own words on mentorship. Then 3–4 philosophy cards:
- "Depth over scale"
- "Future-ready talent"
- "AI-era guidance"
- "Full-spectrum growth"

**Mentorship CTA:** Link to `topmate.io/amitkrt`

**Services list:** Portfolio reviews · Career coaching · Leadership mentoring · AI-era guidance · Mock interviews · Strategic thinking

### 5.9 Community & Ecosystem
**Layout:** Dark, immersive. Event/initiative showcase.

**Initiatives:**
- SAP Design Hub India (250+ members)
- UX2DAY (founding initiative)
- Impulse Festival
- DesignUp Workshop — Dual Fluency
- UX India talk
- Design Thinking Summit (mentor)

**Dual Fluency concept:** Featured prominently — signature thought leadership theme. Designers must speak both design language and business language.

**Treatment:** Large typographic event names, dates, brief descriptions. Editorial layout, not a card grid.

### 5.10 Reflections (Thought Leadership)
**Layout:** Light section. Editorial long-form feel.

**Categories:**
- AI & Humanity
- Designer Struggles
- Ancient Wisdom & Modern Creativity
- Systems Thinking
- Leadership Observations
- Future of Design

**Links to Medium:** `medium.com/@amitkrt`

**Treatment:**
- 3 featured reflection excerpts with read-more links to Medium
- Short provocative statements as large pull quotes between cards
- Category filters

### 5.11 Vision / What's Next
**Layout:** Dark, atmospheric. Full-width statement section.

**Key statements:**
- Designers evolving beyond rigid professional labels
- Creativity becoming more interdisciplinary
- Human qualities (empathy, intuition) becoming more valuable in AI era
- Design as a broader human capability

**Closing manifesto line:** `Designers are not defined by titles. They are defined by the qualities, sensitivity, and perspectives they bring into the world.`

### 5.12 Resources & Links
**Layout:** Simple, clean grid of resource cards.

| Resource | URL |
|---|---|
| LinkedIn | linkedin.com/in/amitkrt |
| Medium | medium.com/@amitkrt |
| Topmate / Mentorship | topmate.io/amitkrt |
| Resume | PDF download |

### 5.13 Contact / Collaboration
**Layout:** Dark, minimal closing section.

**Areas:** Mentorship · Speaking · Workshops · Consulting · Collaborations

**CTA tone:** Mentor-like and approachable. Not a form — a direct email + Topmate link.

---

## 6. Technical Architecture

### Stack
```
vite ^5           # build tool
react ^18         # UI framework
typescript ^5     # type safety
framer-motion ^11 # animations
tailwindcss ^3    # utility styling
```

### Tailwind Config
Extend with design system tokens:
```ts
theme: {
  extend: {
    colors: {
      black: '#0C0C0B',
      white: '#F5F2ED',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    letterSpacing: {
      tightest: '-0.05em',
      tighter: '-0.04em',
      tight: '-0.03em',
    }
  }
}
```

### Vite Config (GitHub Pages)
```ts
base: '/amit2.0/'   # repo name as base path
build.outDir: 'dist'
```

### GitHub Pages Deploy
- `gh-pages` npm package
- `package.json` deploy script: `vite build && gh-pages -d dist`

### Performance
- Images: WebP conversion, `loading="lazy"`, `srcset` for responsive
- Fonts: `display=swap`, preconnect to Google Fonts
- Animations: `will-change: transform` only on animated elements, reduced motion media query respected

### Accessibility
- All interactive elements keyboard navigable
- `prefers-reduced-motion`: disables parallax and sweep lines, keeps opacity transitions
- Color contrast: all text meets WCAG AA against respective backgrounds
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, proper heading hierarchy

---

## 7. Content Placeholders

Content to fill before launch:
- [ ] Career timeline exact dates (from LinkedIn)
- [ ] 3 Medium article excerpts for Reflections section
- [ ] LinkedIn testimonials (text) for Leadership section
- [ ] Resume PDF
- [ ] Final positioning headline (confirm: "I shape systems, people & futures.")
- [ ] Short bio (3–5 lines) for hero

---

## 8. Out of Scope (v1)

- Blog/CMS integration (Medium embed is sufficient)
- Dark/light mode toggle (dark is primary; light sections built in)
- Contact form with backend
- Analytics
