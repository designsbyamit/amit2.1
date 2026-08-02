# Dual Fluency Website Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone Dual Fluency™ knowledge hub — 5 pages, dark editorial design matching amit2.0, interactive worksheets, KPI reference, case studies.

**Architecture:** Vite + React + TS + Tailwind + Framer Motion. Static site, HashRouter, deploy to Vercel. All content in TypeScript data files. No backend.

**Tech Stack:** Same versions as amit2.0 — React 19, Framer Motion 12, React Router 7, Tailwind 3, Vite 8, TypeScript 6.

## Global Constraints
- Background: `#0C0C0B`, Foreground: `#F5F2ED`, Accent: `#7C3AED`
- Font: Inter (Google Fonts)
- No "DesignUp" anywhere in copy or code
- All animations: `viewport={{ once: true }}`, easing `[0.16, 1, 0.3, 1]`
- Worksheets: browser-only, no persistence, print-friendly

---

### Task 1: Project Scaffold

**Files:**
- Create: `Projects/dual-fluency/` (entire repo)

- [ ] Run scaffold:
```bash
cd /Users/I752155/Library/CloudStorage/OneDrive-SAPSE/Work/HolyExperiments/HHE/Projects
npm create vite@latest dual-fluency -- --template react-ts
cd dual-fluency
npm install
npm install framer-motion react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
git init && git add -A && git commit -m "chore: scaffold"
```

- [ ] Replace `tailwind.config.js`:
```js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0C0C0B',
        white: '#F5F2ED',
        purple: '#7C3AED',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
```

- [ ] Replace `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-black: #0C0C0B;
  --color-white: #F5F2ED;
  --color-purple: #7C3AED;
  --color-purple-20: rgba(124,58,237,0.2);
}

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { background-color: #0C0C0B; color: #F5F2ED; font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; }
}

@layer utilities {
  .text-display { font-size: clamp(2.75rem, 5.5vw, 5rem); font-weight: 200; letter-spacing: -0.04em; line-height: 1.15; }
  .text-heading { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 300; letter-spacing: -0.03em; line-height: 1.1; }
  .text-overline { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
  .text-body { font-size: clamp(1rem, 1.5vw, 1.125rem); font-weight: 300; line-height: 1.65; letter-spacing: 0.01em; }
  .text-label { font-size: 0.75rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; }
}

@media print {
  nav, footer, .no-print { display: none !important; }
  body { background: white; color: black; }
  textarea { border: 1px solid #ccc; }
}
```

- [ ] Commit: `git add -A && git commit -m "chore: design system tokens and base styles"`

---

### Task 2: Data Files

**Files:**
- Create: `src/data/kpis.ts`
- Create: `src/data/cases.ts`
- Create: `src/data/framework.ts`

- [ ] Create `src/data/framework.ts`:
```ts
export const businessVocab = ['Revenue','Conversion Rate','CAC','LTV','Churn','MRR','ARR','ROI','Market Share','Time to Market','Scalability','Risk Mitigation']
export const designVocab = ['Friction','Cognitive Load','Trust Signals','User Flows','Information Architecture','Accessibility','Emotional Response','Usability','Delight','Pain Points']

export const translationRows = [
  { businessSays: 'We need more conversions', designHears: 'Make everything a call-to-action button' },
  { designSays: 'This creates friction / we need research', businessHears: "This person doesn't understand priorities" },
]

export const translationFixed = [
  { businessGoal: 'Increase revenue', designGoal: 'Reduce barriers in the purchase journey' },
  { businessGoal: 'Lower acquisition costs', designGoal: 'Improve onboarding experience to reduce drop-off' },
  { businessGoal: 'Expand market share', designGoal: 'Make the product accessible to broader user groups' },
  { businessGoal: 'Poor user experience', designGoal: 'High abandonment rates costing X revenue' },
  { businessGoal: 'Reduced dev costs and faster time-to-market', designGoal: 'Design system consistency' },
]

export const flowSteps = [
  { label: 'Translation Gap', sub: ['Design says', 'Business hears'] },
  { label: 'Two Languages', sub: ['Design', 'Business'] },
  { label: 'Decipher Problem', sub: ['Decode Business Goal', 'Map User Impact'] },
  { label: 'Metric Mapping', sub: ['Design', 'Business'] },
  { label: 'Solution', sub: ['Design Intervention', 'Change in User behaviors'] },
]

export const nineBoxCells = [
  { id: 'businessGoal', label: 'Business Goal', col: 1, row: 2, accent: true },
  { id: 'problemStatement', label: 'Problem Statement', col: 2, row: 2, bold: true },
  { id: 'valuePurpose', label: 'Value / Purpose', col: 3, row: 2, highlight: true },
  { id: 'solutions', label: 'Solution / Possibilities', col: 4, row: 2, bold: true },
  { id: 'designGoal', label: 'Design Goal', col: 5, row: 2, accent: true },
  { id: 'businessKpi1', label: 'Business KPI', col: 2, row: 1, accent: true },
  { id: 'businessKpi2', label: 'Business KPI', col: 4, row: 1, accent: true },
  { id: 'designKpi', label: 'Design KPI', col: 2, row: 3, accent: true },
  { id: 'successMetrics', label: 'Success Metrics', col: 4, row: 3, accent: true },
]

export const nineBoxExample = {
  businessGoal: 'To accelerate revenue growth by expanding its predictable, recurring revenue base by 25%',
  problemStatement: 'Increase annual recurring revenue by 25%',
  valuePurpose: '—',
  solutions: '- Redesign pricing page (clarity + social proof)\n- Simplify renewal process',
  designGoal: '- Redesign pricing page\n- Simplify renewal process',
  businessKpi1: '- Annual Recurring Revenue (ARR)\n- Monthly Recurring Revenue (MRR)\n- Customer Retention Rate / Churn Rate',
  businessKpi2: '- Pricing page conversion rate: +15%\n- Renewal rate: +10%',
  designKpi: '- Accuracy of Sent Data\n- Error Recovery Speed',
  successMetrics: '- SUS Score\n- Top Task Success Rate',
}

export const quotes = [
  { text: "Business metrics tell you what's happening; design metrics help you understand why it's happening.", sub: 'Fluency in both transforms you from someone who makes things pretty into someone who makes things profitable.' },
  { text: "Building dual fluency isn't about selling out, it's about buying in.", sub: 'When you can trace the line from conversion rates to user delight and back again, you stop defending design and start directing strategy.' },
  { text: 'If you talk to someone in a language they understand that goes to their head. If you talk to them in their language it goes to their heart.', sub: '— Nelson Mandela' },
]
```

- [ ] Create `src/data/kpis.ts`:
```ts
export interface Kpi { name: string; target?: string; context?: string; meaning: string; lever?: string; whatItMeasures?: string; whyItMatters?: string }

export const designKpis: Kpi[] = [
  { name: 'Top Task Success Rate', target: '> 80% for critical tasks', context: 'Core user journeys (checkout, booking, payments)', meaning: '% of users completing the main intended task successfully', lever: 'Simplify flows, reduce decision points, improve affordances, validate via usability testing' },
  { name: 'Search Results Relevance Rate', target: '> 80% for top 100 queries', context: 'Search UX', meaning: '% of queries returning relevant top results', lever: 'Improve indexing, query intent understanding, semantic tagging, personalise results' },
  { name: 'Time to First Success', target: '< 15 seconds', context: 'First-time user experience', meaning: 'Time for a new user to achieve a small win/value', lever: 'Provide guided tours, progressive onboarding, clear first actions, contextual help' },
  { name: 'Customer Follow-up Rate', target: '< 4%', context: 'Support feedback loop', meaning: '% of customers who reopen cases or need clarification', lever: 'Improve clarity in replies, provide visual guides, auto-summarise responses' },
  { name: 'System Usability Scale (SUS)', target: '> 75', context: 'General product usability benchmark', meaning: 'Industry-standard usability perception score (0–100)', lever: 'Fix low-scoring features, prioritise friction points, test improvements iteratively' },
]

export const businessKpis: Kpi[] = [
  { name: 'Adoption Rate', whatItMeasures: '% of users who start using a launched feature / complete onboarding steps', whyItMatters: 'Speed and breadth with which users accept a new capability' },
  { name: 'Average Order Value (AOV)', whatItMeasures: 'Average spend per user session or per transaction', whyItMatters: 'Shows value captured each purchase; drives revenue per session' },
  { name: 'Net Retention Rate', whatItMeasures: 'Revenue from existing users including expansion vs contraction; retention + expansion', whyItMatters: 'Indicates if existing user base grows value over time' },
  { name: 'Lifetime Engagement (LE)', whatItMeasures: 'Cumulative interactions per user over lifecycle / repeat action rate', whyItMatters: 'Depth of ongoing value a user gets from a product' },
  { name: 'Product/Market Fit (PMF)', whatItMeasures: '% users who would be "very disappointed" without the product, retention cohorts', whyItMatters: 'Measure of core value fit and adoption enthusiasm' },
  { name: 'CAC Payback Period', whatItMeasures: 'Time for a user cohort to generate revenue equalling acquisition cost; time-to-first-purchase metric', whyItMatters: 'How long it takes to recoup acquisition spend from user behavior' },
  { name: 'Support Ticket Volume', whatItMeasures: 'Number of tickets per user cohort; issues per transaction', whyItMatters: 'Signals UX friction and product quality gaps' },
  { name: 'Help Center Self-Service Rate', whatItMeasures: '% of user issues solved via help docs/FAQ vs live support', whyItMatters: 'Documentation effectiveness; lowers cost to serve' },
  { name: 'Time to First Value (TTFV)', whatItMeasures: 'Average time/new-user sessions to reach core-value milestone', whyItMatters: 'Onboarding efficiency and activation predictor for retention and revenue' },
  { name: 'Innovation Pipeline Throughput', whatItMeasures: 'Number of user-validated concepts moving to production; time from idea to user test', whyItMatters: 'Future-readiness metric showing how often user insights become shipped value' },
]

export const aiKpis: Kpi[] = [
  { name: 'Human Override Rate', target: '< 10%', whatItMeasures: 'Frequency of users correcting AI outputs', whyItMatters: 'Indicates AI reliability and human workload' },
  { name: 'Human-AI Transition Success Rate', target: '> 85%', whatItMeasures: 'Seamlessness of handoff between AI and human agents', whyItMatters: 'Common in support and co-pilot systems' },
  { name: 'User Trust / Satisfaction Score', target: '> 80%', whatItMeasures: 'User confidence and comfort with AI decisions', whyItMatters: 'Essential for ethical, consumer-facing AI' },
  { name: 'Explainability / Transparency Score', target: '> 70%', whatItMeasures: '% of users understanding AI decisions', whyItMatters: 'Essential for regulated domains (finance, health, HR)' },
  { name: 'Error Recovery Rate', target: '< 5 sec to fix', whatItMeasures: 'How fast a user can correct or recover from an AI mistake', whyItMatters: 'Critical in conversational and creative AI UX' },
]
```

- [ ] Create `src/data/cases.ts`:
```ts
export interface Case {
  id: string
  company: string
  headline: string
  context: string
  businessImpact: string
  designGoals: string
}

export const cases: Case[] = [
  {
    id: 'meta',
    company: 'Meta',
    headline: "Study finds 64% of Meta teen safety tools are ineffective",
    context: 'Platform safety features failing to protect adolescent users despite being publicly marketed as effective.',
    businessImpact: 'Regulatory scrutiny, advertiser pressure, user trust erosion, potential revenue decline from younger demographic exit.',
    designGoals: 'Redesign safety controls to be discoverable and effective; reduce friction in reporting; build trust signals into the product experience.',
  },
  {
    id: 'tesla',
    company: 'Tesla',
    headline: "Tesla stock drops 3% as Europe sales fall 36.6%",
    context: 'Significant European market share loss over eight consecutive months.',
    businessImpact: 'Revenue decline, investor confidence drop, competitive pressure from local EV brands.',
    designGoals: 'Localise the purchase and ownership experience; reduce configurator complexity; improve service touchpoints for European markets.',
  },
  {
    id: 'accents',
    company: 'AI Voice Product',
    headline: "The End of Accents — I sound Korean because I am Korean. Can AI make me sound American?",
    context: 'AI voice tools erasing cultural identity as a side effect of accent normalisation features.',
    businessImpact: 'User backlash, ethical scrutiny, brand risk, potential regulatory interest in AI bias.',
    designGoals: 'Design for cultural preservation as a feature; offer opt-in not opt-out; build transparent AI controls.',
  },
  {
    id: 'rangde',
    company: 'RangDe',
    headline: "RangDe aims to increase the share of loans to women above 70% and drive the borrower repayment rate from 97% to over 98%",
    context: 'Social lending platform targeting underserved women borrowers in India.',
    businessImpact: 'Portfolio growth, mission alignment, investor confidence, repayment rate improvements.',
    designGoals: 'Simplify loan application for low-literacy users; design trust signals for first-time borrowers; reduce drop-off in the verification flow.',
  },
  {
    id: 'subways',
    company: 'Transit Authority',
    headline: "How to keep subways and trains cool in an ever hotter world",
    context: 'Public transport systems facing rising temperatures with limited infrastructure to respond.',
    businessImpact: 'Ridership decline, operational cost increase, public safety liability, regulatory pressure.',
    designGoals: 'Design better real-time temperature and crowding communication; improve passenger wayfinding to cooler carriages; reduce anxiety through better information.',
  },
  {
    id: 'apollo',
    company: 'Apollo Hospitals',
    headline: "Apollo Hospitals: Battling to reduce patient average wait times from 18 minutes to less than 10",
    context: 'High-volume hospital network with significant patient experience issues at intake and waiting.',
    businessImpact: 'Patient satisfaction scores, NPS, repeat visits, competitive differentiation, regulatory compliance.',
    designGoals: 'Redesign check-in and queue communication flows; provide real-time wait transparency; reduce perceived wait through better environmental design cues.',
  },
]
```

- [ ] Commit: `git add -A && git commit -m "feat: data files — kpis, cases, framework"`

---

### Task 3: Shared Layout Components

**Files:**
- Create: `src/components/layout/Nav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/GrainOverlay.tsx`
- Create: `src/components/ui/ScrollProgressLine.tsx`
- Create: `src/App.tsx`

- [ ] Create `src/components/ui/GrainOverlay.tsx`:
```tsx
export default function GrainOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        mixBlendMode: 'overlay',
        opacity,
      }}
    />
  )
}
```

- [ ] Create `src/components/ui/ScrollProgressLine.tsx`:
```tsx
import { motion, useScroll } from 'framer-motion'
export default function ScrollProgressLine() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-px origin-left"
      style={{ scaleX: scrollYProgress, background: 'rgba(245,242,237,0.25)' }}
    />
  )
}
```

- [ ] Create `src/components/layout/Nav.tsx`:
```tsx
import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Framework', to: '/framework' },
  { label: 'Worksheets', to: '/worksheets' },
  { label: 'KPI Reference', to: '/kpi' },
  { label: 'Case Studies', to: '/cases' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print"
      style={{
        background: scrolled ? 'rgba(12,12,11,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,242,237,0.08)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="text-white opacity-80 hover:opacity-100 transition-opacity font-medium tracking-tight">
          Dual Fluency™
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-label text-white transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-black border-t border-white border-opacity-10 px-6 py-4 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-label text-white ${isActive ? 'opacity-100' : 'opacity-50'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] Create `src/components/layout/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white border-opacity-10 px-6 md:px-12 py-8 no-print">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <p className="text-label text-white opacity-20">Talk Business. Talk Design.</p>
        <a
          href="https://amit.design"
          target="_blank"
          rel="noopener noreferrer"
          className="text-label text-white opacity-30 hover:opacity-70 transition-opacity"
        >
          amit.design →
        </a>
      </div>
    </footer>
  )
}
```

- [ ] Create `src/App.tsx`:
```tsx
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollProgressLine from './components/ui/ScrollProgressLine'
import Home from './pages/Home'
import Framework from './pages/Framework'
import Worksheets from './pages/Worksheets'
import KpiReference from './pages/KpiReference'
import Cases from './pages/Cases'

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/framework" element={<PageTransition><Framework /></PageTransition>} />
        <Route path="/worksheets" element={<PageTransition><Worksheets /></PageTransition>} />
        <Route path="/kpi" element={<PageTransition><KpiReference /></PageTransition>} />
        <Route path="/cases" element={<PageTransition><Cases /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="bg-black text-white min-h-screen">
        <ScrollProgressLine />
        <Nav />
        <main><AnimatedRoutes /></main>
        <Footer />
      </div>
    </HashRouter>
  )
}
```

- [ ] Update `src/main.tsx` to import `./index.css`
- [ ] `npm run dev` — verify blank dark page loads with nav
- [ ] Commit: `git add -A && git commit -m "feat: layout shell — nav, footer, routing"`

---

### Task 4: Home Page

**Files:** Create `src/pages/Home.tsx`

- [ ] Create `src/pages/Home.tsx`:
```tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import { translationFixed, quotes } from '../data/framework'

const ease = [0.16, 1, 0.3, 1] as const
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease },
})

const sections = [
  { label: 'Framework', to: '/framework', desc: 'The Translation Gap, Two Languages model, and 9-Box Framework.' },
  { label: 'Worksheets', to: '/worksheets', desc: 'Three interactive tools for KPI mapping, translation, and strategy.' },
  { label: 'KPI Reference', to: '/kpi', desc: 'Searchable tables of Business, Design, and AI Design KPIs.' },
  { label: 'Case Studies', to: '/cases', desc: 'Six real-world design challenges with business impact mapping.' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-16">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <motion.p className="text-overline text-white opacity-40 mb-6" {...reveal()}>
            Dual Fluency™
          </motion.p>
          <motion.h1 className="text-display text-white mb-6" {...reveal(0.08)}>
            Talk Business.<br />Talk Design.
          </motion.h1>
          <motion.p
            className="text-body text-white opacity-60 max-w-xl mb-12"
            {...reveal(0.16)}
          >
            Design and business strategy often disconnect in daily operations — causing teams to lose sight of the value behind design decisions. Dual Fluency bridges that gap.
          </motion.p>
          <motion.div {...reveal(0.22)}>
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 text-label text-white opacity-70 hover:opacity-100 border border-white border-opacity-20 hover:border-opacity-50 px-5 py-3 transition-all duration-300"
            >
              Explore the Framework →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline text-white opacity-40 mb-12" {...reveal()}>
            The Problem
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              className="border border-white border-opacity-10 p-8"
              {...reveal(0.05)}
            >
              <p className="text-overline mb-4" style={{ color: 'var(--color-purple)' }}>Without Translation</p>
              <div className="space-y-4">
                <div>
                  <p className="text-label text-white opacity-40 mb-1">Business says</p>
                  <p className="text-white opacity-80">"We need more conversions"</p>
                </div>
                <div>
                  <p className="text-label text-white opacity-40 mb-1">Design hears</p>
                  <p className="text-white opacity-80">"Make everything a call-to-action button"</p>
                </div>
                <div className="border-t border-white border-opacity-10 pt-4">
                  <p className="text-label text-white opacity-40 mb-1">Design says</p>
                  <p className="text-white opacity-80">"This creates friction / we need research"</p>
                </div>
                <div>
                  <p className="text-label text-white opacity-40 mb-1">Business hears</p>
                  <p className="text-white opacity-80">"This person doesn't understand priorities"</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="border p-8"
              style={{ borderColor: 'var(--color-purple)', borderOpacity: 0.3 }}
              {...reveal(0.1)}
            >
              <p className="text-overline mb-4" style={{ color: 'var(--color-purple)' }}>With Translation</p>
              <div className="space-y-3">
                {translationFixed.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4 text-sm">
                    <p className="text-white opacity-60">{row.businessGoal}</p>
                    <p className="text-white opacity-80">{row.designGoal}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.p
            className="text-heading text-white opacity-80"
            style={{ fontWeight: 200, lineHeight: 1.4 }}
            {...reveal()}
          >
            "{quotes[0].text}"
          </motion.p>
          <motion.p className="text-body text-white opacity-40 mt-6" {...reveal(0.1)}>
            {quotes[0].sub}
          </motion.p>
        </div>
      </section>

      {/* What's Inside */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline text-white opacity-40 mb-12" {...reveal()}>
            What's Inside
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white bg-opacity-10">
            {sections.map((s, i) => (
              <motion.div key={s.to} {...reveal(i * 0.06)}>
                <Link
                  to={s.to}
                  className="block bg-black p-8 h-full hover:bg-white hover:bg-opacity-5 transition-colors duration-300 group"
                >
                  <p className="text-overline mb-4 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>{s.label}</p>
                  <p className="text-body text-white opacity-50 group-hover:opacity-70 transition-opacity">{s.desc}</p>
                  <p className="text-label text-white opacity-0 group-hover:opacity-40 transition-opacity mt-6">Explore →</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] Verify home page renders correctly in browser
- [ ] Commit: `git add -A && git commit -m "feat: home page"`

---

### Task 5: Framework Page

**Files:** Create `src/pages/Framework.tsx`

- [ ] Create `src/pages/Framework.tsx`:
```tsx
import { motion } from 'framer-motion'
import GrainOverlay from '../components/ui/GrainOverlay'
import { businessVocab, designVocab, flowSteps, nineBoxCells, nineBoxExample, quotes } from '../data/framework'

const ease = [0.16, 1, 0.3, 1] as const
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease },
})

export default function Framework() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-16 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline mb-4" style={{ color: 'var(--color-purple)', opacity: 0.8 }} {...reveal()}>Framework</motion.p>
          <motion.h1 className="text-display text-white mb-6" style={{ fontWeight: 200 }} {...reveal(0.06)}>
            The Dual Fluency<br />Framework
          </motion.h1>
          <motion.p className="text-body text-white opacity-60 max-w-2xl" {...reveal(0.12)}>
            Designers create greater impact when they can connect user outcomes with business outcomes. This framework maps the path from translation gap to strategic fluency.
          </motion.p>
        </div>
      </section>

      {/* Two Languages */}
      <section className="relative py-24 px-6 md:px-12 border-t border-white border-opacity-10">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline text-white opacity-40 mb-12" {...reveal()}>Two Languages</motion.p>
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...reveal(0.05)}>
              <p className="text-label mb-6 text-white opacity-40">Business Language</p>
              <div className="flex flex-wrap gap-2">
                {businessVocab.map((v) => (
                  <span key={v} className="px-3 py-1 text-sm text-white opacity-70 border border-white border-opacity-15">{v}</span>
                ))}
              </div>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <p className="text-label mb-6" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Design Language</p>
              <div className="flex flex-wrap gap-2">
                {designVocab.map((v) => (
                  <span key={v} className="px-3 py-1 text-sm border" style={{ borderColor: 'var(--color-purple)', color: 'var(--color-purple)', opacity: 0.8 }}>{v}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="relative py-24 px-6 md:px-12 border-t border-white border-opacity-10">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl overflow-x-auto">
          <motion.p className="text-overline text-white opacity-40 mb-12" {...reveal()}>The Translation Path</motion.p>
          <div className="flex items-start gap-0 min-w-max">
            {flowSteps.map((step, i) => (
              <motion.div key={step.label} className="flex items-start" {...reveal(i * 0.07)}>
                <div className="flex flex-col items-center">
                  <p className="text-label mb-4 text-center max-w-[120px]" style={{ color: 'var(--color-purple)' }}>{step.label}</p>
                  <div className="border border-white border-opacity-15 p-4 min-w-[140px]">
                    {step.sub.map((s) => (
                      <p key={s} className="text-sm text-white opacity-60 py-1 border-b border-white border-opacity-10 last:border-0">{s}</p>
                    ))}
                  </div>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center mt-8 mx-2 text-white opacity-20">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9-Box Framework */}
      <section className="relative py-24 px-6 md:px-12 border-t border-white border-opacity-10">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline text-white opacity-40 mb-4" {...reveal()}>9-Box Framework</motion.p>
          <motion.p className="text-body text-white opacity-50 mb-12 max-w-2xl" {...reveal(0.06)}>
            Defining KPIs at the problem statement level makes it easier to establish clear success metrics.
          </motion.p>

          {/* Grid */}
          <motion.div className="grid gap-px bg-white bg-opacity-10 mb-4" style={{ gridTemplateColumns: 'repeat(5,1fr)', gridTemplateRows: 'repeat(3,auto)' }} {...reveal(0.1)}>
            {/* Row 1: top KPI cells */}
            {[0,1,2,3,4].map((col) => {
              const cell = nineBoxCells.find(c => c.col === col+1 && c.row === 1)
              return (
                <div key={`r1c${col}`} className={`bg-black p-4 min-h-[80px] flex items-center justify-center ${cell ? '' : ''}`}>
                  {cell && <p className="text-label text-center" style={{ color: 'var(--color-purple)' }}>{cell.label}</p>}
                </div>
              )
            })}
            {/* Row 2: main cells */}
            {[0,1,2,3,4].map((col) => {
              const cell = nineBoxCells.find(c => c.col === col+1 && c.row === 2)
              return (
                <div key={`r2c${col}`} className="bg-black p-4 min-h-[100px] flex items-center justify-center border border-white border-opacity-5">
                  {cell && (
                    <p className={`text-label text-center ${cell.highlight ? 'text-white' : cell.bold ? 'text-white font-medium opacity-80' : ''}`}
                       style={cell.accent ? { color: 'var(--color-purple)' } : {}}>
                      {cell.label}
                    </p>
                  )}
                </div>
              )
            })}
            {/* Row 3: bottom KPI cells */}
            {[0,1,2,3,4].map((col) => {
              const cell = nineBoxCells.find(c => c.col === col+1 && c.row === 3)
              return (
                <div key={`r3c${col}`} className="bg-black p-4 min-h-[80px] flex items-center justify-center">
                  {cell && <p className="text-label text-center" style={{ color: 'var(--color-purple)' }}>{cell.label}</p>}
                </div>
              )
            })}
          </motion.div>

          {/* Worked example */}
          <motion.div className="border border-white border-opacity-10 p-8 mt-12" {...reveal(0.15)}>
            <p className="text-overline mb-6" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Worked Example — Increase ARR by 25%</p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              {Object.entries(nineBoxExample).map(([key, val]) => (
                <div key={key}>
                  <p className="text-label text-white opacity-30 mb-2">{key.replace(/([A-Z])/g,' $1').trim()}</p>
                  <p className="text-white opacity-70 whitespace-pre-line">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quotes */}
      {quotes.slice(1).map((q, i) => (
        <section key={i} className="relative py-24 px-6 md:px-12 border-t border-white border-opacity-10">
          <GrainOverlay opacity={0.02} />
          <div className="relative z-10 mx-auto max-w-5xl">
            <motion.p className="text-heading text-white opacity-80" style={{ fontWeight: 200, lineHeight: 1.4 }} {...reveal()}>
              "{q.text}"
            </motion.p>
            <motion.p className="text-body text-white opacity-40 mt-6" {...reveal(0.1)}>{q.sub}</motion.p>
          </div>
        </section>
      ))}
    </>
  )
}
```

- [ ] Verify framework page in browser — all sections visible, 9-box grid renders
- [ ] Commit: `git add -A && git commit -m "feat: framework page"`

---

### Task 6: Worksheets Page

**Files:** Create `src/pages/Worksheets.tsx`

- [ ] Create `src/pages/Worksheets.tsx`:
```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import GrainOverlay from '../components/ui/GrainOverlay'

type Tab = 'ws1' | 'ws2' | 'ws3'
const tabs: { id: Tab; label: string }[] = [
  { id: 'ws1', label: 'Worksheet 1 — Translate Design ↔ Business' },
  { id: 'ws2', label: 'Worksheet 2 — KPI Mapping Canvas' },
  { id: 'ws3', label: 'Worksheet 3 — Strategy, Roadmap & OKRs' },
]

const funnelRows = ['Awareness', 'Acquisition', 'Decision', 'Engagement', 'Advocacy']

function Worksheet1() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  return (
    <div>
      <p className="text-overline mb-2" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Instructions</p>
      <p className="text-body text-white opacity-60 mb-8">Describe the problem from both perspectives. Use this to find shared language between design and business goals.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-label text-white opacity-40 block mb-3">Business Problem</label>
          <textarea value={left} onChange={e => setLeft(e.target.value)} rows={8}
            className="w-full bg-transparent border border-white border-opacity-20 text-white opacity-80 p-4 text-body resize-none focus:outline-none focus:border-opacity-50"
            placeholder="What does the business need to achieve?" />
        </div>
        <div>
          <label className="text-label block mb-3" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Design Translation</label>
          <textarea value={right} onChange={e => setRight(e.target.value)} rows={8}
            className="w-full bg-transparent border p-4 text-body resize-none focus:outline-none"
            style={{ borderColor: 'var(--color-purple)', borderOpacity: 0.3, color: 'var(--color-white)' }}
            placeholder="How does this translate to a design goal?" />
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => window.print()} className="text-label text-white opacity-50 hover:opacity-100 border border-white border-opacity-20 px-4 py-2 transition-opacity">Print / Save PDF</button>
        <button onClick={() => { setLeft(''); setRight('') }} className="text-label text-white opacity-30 hover:opacity-60 transition-opacity">Clear</button>
      </div>
    </div>
  )
}

function Worksheet2() {
  const [cells, setCells] = useState<Record<string, string>>({})
  const cols = ['Business KPIs', 'User KPIs', 'Design Metrics', 'Why It Matters']
  const update = (key: string, val: string) => setCells(c => ({ ...c, [key]: val }))
  return (
    <div>
      <p className="text-overline mb-2" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Instructions</p>
      <p className="text-body text-white opacity-60 mb-8">Identify relevant KPIs across each stage of the customer experience funnel. Map business, user, and design metrics side by side.</p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr>
              <th className="text-label text-white opacity-40 text-left p-3 border border-white border-opacity-10 w-32">Funnel Stage</th>
              {cols.map(col => (
                <th key={col} className="text-label text-left p-3 border border-white border-opacity-10" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funnelRows.map(row => (
              <tr key={row}>
                <td className="text-label text-white opacity-50 p-3 border border-white border-opacity-10">{row}</td>
                {cols.map(col => (
                  <td key={col} className="border border-white border-opacity-10 p-1">
                    <textarea
                      value={cells[`${row}-${col}`] || ''}
                      onChange={e => update(`${row}-${col}`, e.target.value)}
                      rows={2}
                      className="w-full bg-transparent text-white opacity-70 text-sm p-2 resize-none focus:outline-none"
                      placeholder="—"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => window.print()} className="text-label text-white opacity-50 hover:opacity-100 border border-white border-opacity-20 px-4 py-2 transition-opacity">Print / Save PDF</button>
    </div>
  )
}

function Worksheet3() {
  const [statement, setStatement] = useState({ doing: '', achieve: '', outcome: '' })
  const [roadmap, setRoadmap] = useState<Record<string, string>>({})
  const roadmapCols = ['As-Is State', 'Roadmap / Design Intervention', 'Allies', 'To-Be State']
  const update = (key: string, val: string) => setRoadmap(r => ({ ...r, [key]: val }))
  return (
    <div>
      <p className="text-overline mb-2" style={{ color: 'var(--color-purple)', opacity: 0.8 }}>Instructions</p>
      <p className="text-body text-white opacity-60 mb-8">Map your design strategy backward from business outcomes. Define your statement, then build a roadmap that connects design interventions to measurable change.</p>

      {/* Strategy Statement */}
      <div className="border border-white border-opacity-10 p-6 mb-8">
        <p className="text-label text-white opacity-40 mb-4">Design Strategy Statement</p>
        <div className="flex flex-wrap items-center gap-3 text-body text-white opacity-70">
          <span>By</span>
          <input value={statement.doing} onChange={e => setStatement(s => ({...s, doing: e.target.value}))}
            className="bg-transparent border-b border-white border-opacity-30 px-2 py-1 focus:outline-none min-w-[160px]"
            placeholder="doing X" />
          <span>we will</span>
          <input value={statement.achieve} onChange={e => setStatement(s => ({...s, achieve: e.target.value}))}
            className="bg-transparent border-b border-white border-opacity-30 px-2 py-1 focus:outline-none min-w-[160px]"
            placeholder="achieve Y" />
          <span>leading to</span>
          <input value={statement.outcome} onChange={e => setStatement(s => ({...s, outcome: e.target.value}))}
            className="bg-transparent border-b border-white border-opacity-30 px-2 py-1 focus:outline-none min-w-[160px]"
            placeholder="outcome Z" />
        </div>
      </div>

      {/* Roadmap Table */}
      <p className="text-label text-white opacity-40 mb-4">Roadmap</p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              {roadmapCols.map(col => (
                <th key={col} className="text-label text-left p-3 border border-white border-opacity-10" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0,1,2,3].map(i => (
              <tr key={i}>
                {roadmapCols.map(col => (
                  <td key={col} className="border border-white border-opacity-10 p-1">
                    <textarea
                      value={roadmap[`${i}-${col}`] || ''}
                      onChange={e => update(`${i}-${col}`, e.target.value)}
                      rows={2}
                      className="w-full bg-transparent text-white opacity-70 text-sm p-2 resize-none focus:outline-none"
                      placeholder="—"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => window.print()} className="text-label text-white opacity-50 hover:opacity-100 border border-white border-opacity-20 px-4 py-2 transition-opacity">Print / Save PDF</button>
    </div>
  )
}

export default function Worksheets() {
  const [active, setActive] = useState<Tab>('ws1')
  return (
    <>
      <section className="relative pt-32 pb-8 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline mb-4" style={{ color: 'var(--color-purple)', opacity: 0.8 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.5 }}>
            Worksheets
          </motion.p>
          <motion.h1 className="text-display text-white mb-8" style={{ fontWeight: 200 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
            Practice Tools
          </motion.h1>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 border-b border-white border-opacity-10 mb-12">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`text-label px-5 py-3 text-left md:text-center transition-all border-b-2 -mb-px ${active === tab.id ? 'border-purple-500 text-white opacity-100' : 'border-transparent text-white opacity-40 hover:opacity-70'}`}
                style={active === tab.id ? { borderBottomColor: 'var(--color-purple)' } : {}}>
                {tab.label}
              </button>
            ))}
          </div>

          {active === 'ws1' && <Worksheet1 />}
          {active === 'ws2' && <Worksheet2 />}
          {active === 'ws3' && <Worksheet3 />}
        </div>
      </section>
    </>
  )
}
```

- [ ] Verify all 3 worksheets render, inputs work, print button fires
- [ ] Commit: `git add -A && git commit -m "feat: worksheets page — 3 interactive tools"`

---

### Task 7: KPI Reference Page

**Files:** Create `src/pages/KpiReference.tsx`

- [ ] Create `src/pages/KpiReference.tsx`:
```tsx
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import GrainOverlay from '../components/ui/GrainOverlay'
import { designKpis, businessKpis, aiKpis } from '../data/kpis'

type Tab = 'business' | 'design' | 'ai'

export default function KpiReference() {
  const [tab, setTab] = useState<Tab>('business')
  const [query, setQuery] = useState('')

  const rows = tab === 'business' ? businessKpis : tab === 'design' ? designKpis : aiKpis
  const filtered = useMemo(() =>
    query.trim()
      ? rows.filter(r => JSON.stringify(r).toLowerCase().includes(query.toLowerCase()))
      : rows,
    [rows, query]
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: 'business', label: 'Business KPIs' },
    { id: 'design', label: 'Design KPIs' },
    { id: 'ai', label: 'AI Design KPIs' },
  ]

  return (
    <>
      <section className="relative pt-32 pb-8 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline mb-4" style={{ color: 'var(--color-purple)', opacity: 0.8 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.5 }}>
            Reference
          </motion.p>
          <motion.h1 className="text-display text-white mb-8" style={{ fontWeight: 200 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
            KPI Reference
          </motion.h1>

          {/* Tabs + Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex gap-0 border-b border-white border-opacity-10">
              {tabs.map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setQuery('') }}
                  className={`text-label px-5 py-3 transition-all border-b-2 -mb-px ${tab === t.id ? 'text-white opacity-100' : 'text-white opacity-40 hover:opacity-70 border-transparent'}`}
                  style={tab === t.id ? { borderBottomColor: 'var(--color-purple)' } : {}}>
                  {t.label}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search KPIs…"
              className="bg-transparent border border-white border-opacity-20 text-white opacity-70 px-4 py-2 text-body focus:outline-none focus:border-opacity-50 w-full md:w-64"
            />
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <p className="text-body text-white opacity-30 py-12">No KPIs match — try a different term.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white border-opacity-10">
                    <th className="text-label text-left p-4 w-48" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>KPI</th>
                    {tab === 'design' && <>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Target</th>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Meaning</th>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Lever to Improve</th>
                    </>}
                    {tab === 'business' && <>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>What It Measures</th>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Why It Matters</th>
                    </>}
                    {tab === 'ai' && <>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Typical Target</th>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>What It Measures</th>
                      <th className="text-label text-left p-4" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Why It Matters</th>
                    </>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((kpi, i) => (
                    <motion.tr key={kpi.name}
                      className="border-b border-white border-opacity-5 hover:bg-white hover:bg-opacity-[0.02] transition-colors"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                      <td className="p-4 text-white font-medium opacity-80">{kpi.name}</td>
                      {tab === 'design' && <>
                        <td className="p-4 text-white opacity-50 text-sm">{kpi.target}</td>
                        <td className="p-4 text-white opacity-60 text-sm">{kpi.meaning}</td>
                        <td className="p-4 text-white opacity-50 text-sm">{kpi.lever}</td>
                      </>}
                      {tab === 'business' && <>
                        <td className="p-4 text-white opacity-60 text-sm">{kpi.whatItMeasures}</td>
                        <td className="p-4 text-white opacity-50 text-sm">{kpi.whyItMatters}</td>
                      </>}
                      {tab === 'ai' && <>
                        <td className="p-4 text-white opacity-50 text-sm">{kpi.target}</td>
                        <td className="p-4 text-white opacity-60 text-sm">{kpi.whatItMeasures}</td>
                        <td className="p-4 text-white opacity-50 text-sm">{kpi.whyItMatters}</td>
                      </>}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] Verify search filters rows live, empty state shows, all 3 tabs work
- [ ] Commit: `git add -A && git commit -m "feat: KPI reference page"`

---

### Task 8: Case Studies Page

**Files:** Create `src/pages/Cases.tsx`

- [ ] Create `src/pages/Cases.tsx`:
```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import { cases } from '../data/cases'

export default function Cases() {
  const [open, setOpen] = useState<string | null>(null)
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <>
      <section className="relative pt-32 pb-8 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p className="text-overline mb-4" style={{ color: 'var(--color-purple)', opacity: 0.8 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.5 }}>
            Case Studies
          </motion.p>
          <motion.h1 className="text-display text-white mb-4" style={{ fontWeight: 200 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            Design Challenges
          </motion.h1>
          <motion.p className="text-body text-white opacity-50 mb-16 max-w-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Connect everyday user problems to business impact — map design goals to business objectives.
          </motion.p>

          <div className="space-y-px">
            {cases.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease }}>

                {/* Card Header */}
                <button
                  onClick={() => setOpen(open === c.id ? null : c.id)}
                  className="w-full text-left border border-white border-opacity-10 p-6 md:p-8 hover:bg-white hover:bg-opacity-[0.03] transition-colors flex items-start justify-between gap-6 group"
                >
                  <div>
                    <p className="text-overline mb-2" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>{c.company}</p>
                    <p className="text-heading text-white opacity-80" style={{ fontWeight: 300, fontSize: 'clamp(1rem,2vw,1.4rem)' }}>{c.headline}</p>
                  </div>
                  <span className="text-white opacity-30 group-hover:opacity-60 transition-opacity text-xl flex-shrink-0 mt-1">
                    {open === c.id ? '−' : '+'}
                  </span>
                </button>

                {/* Expanded */}
                <AnimatePresence>
                  {open === c.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <div className="border border-t-0 border-white border-opacity-10 p-6 md:p-8 bg-white bg-opacity-[0.02]">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                          <div>
                            <p className="text-label mb-3 text-white opacity-40">Context</p>
                            <p className="text-body text-white opacity-70">{c.context}</p>
                          </div>
                          <div>
                            <p className="text-label mb-3" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Business Impact</p>
                            <p className="text-body text-white opacity-70">{c.businessImpact}</p>
                          </div>
                          <div>
                            <p className="text-label mb-3" style={{ color: 'var(--color-purple)', opacity: 0.7 }}>Design Goals</p>
                            <p className="text-body text-white opacity-70">{c.designGoals}</p>
                          </div>
                        </div>
                        <Link to="/worksheets"
                          className="inline-flex items-center gap-2 text-label text-white opacity-40 hover:opacity-80 border border-white border-opacity-15 hover:border-opacity-40 px-4 py-2 transition-all">
                          Try it yourself with Worksheet 1 →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] Verify accordion open/close, all 6 cases display, link to worksheets works
- [ ] Commit: `git add -A && git commit -m "feat: case studies page"`

---

### Task 9: Polish & Verify

- [ ] Run `npm run build` — zero TypeScript errors
- [ ] Check all 5 routes render correctly: `/`, `/framework`, `/worksheets`, `/kpi`, `/cases`
- [ ] Verify mobile nav (hamburger menu) works at 375px viewport
- [ ] Verify print stylesheet: open `/worksheets`, Cmd+P — nav should be hidden, form visible
- [ ] Verify scroll progress line animates on all pages
- [ ] Fix any console errors
- [ ] Commit: `git add -A && git commit -m "chore: build verified, polish complete"`
