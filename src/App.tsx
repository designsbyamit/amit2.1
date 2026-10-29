import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import LogoLoader from './components/ui/LogoLoader'
import useRouteSeo from './seo/useRouteSeo'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import NdaGate from './components/case/NdaGate'
import { gatedCases } from './data/nda'
import { caseStudies } from './data/work'
import Footer from './components/layout/Footer'
import { BackToShort, NextCase } from './components/case/StoryLinks'
import ScrollToTop from './components/ui/ScrollToTop'
import ScrollProgressLine from './components/ui/ScrollProgressLine'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import ContactProvider from './components/contact/ContactProvider'

// Route-level code splitting: only the page being visited is downloaded.
const Craft = lazy(() => import('./pages/Craft'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const LeadershipStoriesPage = lazy(() => import('./pages/LeadershipStoriesPage'))
const LeadershipStoryPage = lazy(() => import('./pages/LeadershipStoryPage'))
const LeadershipCasePage = lazy(() => import('./pages/LeadershipCasePage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const HiringPlaybookPage = lazy(() => import('./pages/HiringPlaybookPage'))
const HiringExperiencePage = lazy(() => import('./pages/HiringExperiencePage'))
const PracticePage = lazy(() => import('./pages/grow/PracticePage'))
const ChallengePage = lazy(() => import('./pages/grow/ChallengePage'))
const PortfolioGuidePage = lazy(() => import('./pages/grow/PortfolioPage'))
const ReflectionsPage = lazy(() => import('./pages/ReflectionsPage'))
const ShortStoryPage = lazy(() => import('./pages/ShortStoryPage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const PlaybackPage = lazy(() => import('./pages/PlaybackPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const DualFluencyPage = lazy(() => import('./pages/DualFluencyPage'))
const AINativeFrameworksPage = lazy(() => import('./pages/AINativeFrameworksPage'))
const SAPSearchStoryPage = lazy(() => import('./pages/SAPSearchStoryPage'))
const SAPAgenticStoryPage = lazy(() => import('./pages/SAPAgenticStoryPage'))
const AgenticFilmPage = lazy(() => import('./film/AgenticFilmPage'))
const AgenticFilmV1Page = lazy(() => import('./film/archive/AgenticFilmV1Page'))
const AgenticFilmV2Page = lazy(() => import('./film/archive/AgenticFilmV2Page'))
const AgenticFilmV3Page = lazy(() => import('./film/archive/AgenticFilmV3Page'))
const AirlineStoryPage = lazy(() => import('./pages/AirlineStoryPage'))
const ScmPrototype = lazy(() => import('./labs/scm/ScmPrototype'))
const EngazePrototype = lazy(() => import('./labs/engaze/EngazePrototype'))
const SearchPrototype = lazy(() => import('./labs/search/SearchPrototype'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const EngazeStoryPage = lazy(() => import('./pages/EngazeStoryPage'))
const EngazeFilmPage = lazy(() => import('./film/EngazeFilmPage'))
const SearchFilmPage = lazy(() => import('./film/SearchFilmPage'))
const MentoringPage = lazy(() => import('./pages/MentoringPage'))
const DesignSystemPage = lazy(() => import('./pages/DesignSystemPage'))
const DesignSystemReferencePage = lazy(() => import('./pages/DesignSystemReferencePage'))
const ConversationExperiencePage = lazy(() => import('./pages/ConversationExperiencePage'))


/** Warm every page chunk once the browser is idle, so the first click on any nav item is instant. */
function usePrefetchRoutes() {
  useEffect(() => {
    const load = () => { import('./pages/Craft'); import('./pages/LeadershipPage'); import('./pages/LeadershipStoriesPage'); import('./pages/LeadershipStoryPage'); import('./pages/ReflectionsPage'); import('./pages/CommunityPage'); import('./pages/AboutPage'); import('./pages/CaseStudyPage'); import('./pages/PlaybackPage'); import('./pages/ResourcesPage'); import('./pages/ContactPage'); import('./pages/DualFluencyPage'); import('./pages/AINativeFrameworksPage'); import('./pages/SAPSearchStoryPage'); import('./pages/SAPAgenticStoryPage'); import('./pages/MentoringPage'); import('./pages/DesignSystemPage'); import('./pages/ConversationExperiencePage') }
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    const id = w.requestIdleCallback ? w.requestIdleCallback(load) : window.setTimeout(load, 1200)
    return () => { if (!w.requestIdleCallback) clearTimeout(id) }
  }, [])
}

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

/** Old links looked like /#/craft. Send them to the clean URL. */
function LegacyHashRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const h = window.location.hash
    if (h.startsWith('#/')) navigate(h.slice(1), { replace: true })
  }, [navigate])
  return null
}

/** The detailed case study for a project. Each of the larger projects has its own page; the rest use the standard one. */
function CaseDetail() {
  const { id } = useParams<{ id: string }>()
  const Page = ({ 'airline-app': AirlineStoryPage, engaze: EngazeStoryPage, 'sap-search': SAPSearchStoryPage, 'sap-agentic': SAPAgenticStoryPage } as Record<string, React.ComponentType>)[id ?? ''] ?? CaseStudyPage
  const own = Page === CaseStudyPage
  const body = (
    <div className="relative">
      <BackToShort id={id ?? ''} />
      <Suspense fallback={<LogoLoader />}><Page /></Suspense>
      {!own && <NextCase id={id ?? ''} />}
    </div>
  )
  // Case studies under NDA ask for an access code first.
  const cs = caseStudies.find(c => c.id === id)
  if (id && gatedCases.includes(id) && cs) return <NdaGate id={id} title={cs.title}>{body}</NdaGate>
  return body
}

/** The page frame. A film opened in the case-study modal (?embed=1) has no site header, footer or progress line. */
function Shell() {
  const embed = new URLSearchParams(useLocation().search).get('embed') === '1'
  return (
    <div className="bg-bg text-ink min-h-screen">
      {!embed && <ScrollProgressLine />}
      <ScrollToTop />
      <LegacyHashRedirect />
      {!embed && <Nav />}
      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatedRoutes />
      </main>
      {!embed && <Footer />}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  useRouteSeo()
  return (
    <Suspense fallback={<LogoLoader />}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/craft" element={<PageTransition><Craft /></PageTransition>} />
        <Route path="/craft/engaze/film" element={<PageTransition><EngazeFilmPage /></PageTransition>} />
        <Route path="/craft/sap-search/film" element={<PageTransition><SearchFilmPage /></PageTransition>} />
        <Route path="/craft/sap-agentic/film" element={<PageTransition><AgenticFilmPage /></PageTransition>} />
        <Route path="/craft/sap-agentic/film-v1" element={<PageTransition><AgenticFilmV1Page /></PageTransition>} />
        <Route path="/craft/sap-agentic/film-v2" element={<PageTransition><AgenticFilmV2Page /></PageTransition>} />
        <Route path="/craft/sap-agentic/film-v3" element={<PageTransition><AgenticFilmV3Page /></PageTransition>} />
        <Route path="/labs/order-confirmation" element={<ScmPrototype />} />
        <Route path="/labs/engaze" element={<EngazePrototype />} />
        <Route path="/labs/ai-search" element={<SearchPrototype />} />
        <Route path="/craft/stories/:slug" element={<PageTransition><ShortStoryPage /></PageTransition>} />
        <Route path="/craft/:id/details" element={<PageTransition><CaseDetail /></PageTransition>} />
        <Route path="/craft/:id" element={<PageTransition><PlaybackPage /></PageTransition>} />
        <Route path="/leadership" element={<PageTransition><LeadershipPage /></PageTransition>} />
        <Route path="/leadership/cases/:slug" element={<PageTransition><LeadershipCasePage /></PageTransition>} />
        <Route path="/learn" element={<PageTransition><LearnPage /></PageTransition>} />
        <Route path="/learn/practice" element={<PageTransition><PracticePage /></PageTransition>} />
        <Route path="/learn/practice/:topic/:id" element={<PageTransition><ChallengePage /></PageTransition>} />
        <Route path="/learn/portfolio" element={<PageTransition><PortfolioGuidePage /></PageTransition>} />
        {/* Curious Minds is hidden for now: its page is src/pages/grow/CuriousPage.tsx. Re-add the route and the Grow card to bring it back. */}
        <Route path="/learn/curious" element={<Navigate to="/learn" replace />} />
        <Route path="/leadership/stories" element={<PageTransition><LeadershipStoriesPage /></PageTransition>} />
        <Route path="/leadership/stories/:slug" element={<PageTransition><LeadershipStoryPage /></PageTransition>} />
        <Route path="/mentoring" element={<PageTransition><MentoringPage /></PageTransition>} />
        <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
        <Route path="/reflections" element={<PageTransition><ReflectionsPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
        <Route path="/resources/hiring" element={<PageTransition><HiringPlaybookPage /></PageTransition>} />
        <Route path="/resources/hiring-experience" element={<PageTransition><HiringExperiencePage /></PageTransition>} />
        <Route path="/resources/dual-fluency" element={<PageTransition><DualFluencyPage /></PageTransition>} />
        <Route path="/resources/ai-native-patterns" element={<PageTransition><AINativeFrameworksPage /></PageTransition>} />
        <Route path="/resources/conversation-experience" element={<PageTransition><ConversationExperiencePage /></PageTransition>} />
        <Route path="/design-system" element={<PageTransition><DesignSystemPage /></PageTransition>} />
        <Route path="/design-system/reference" element={<PageTransition><DesignSystemReferencePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        <Route path="/philosophy" element={<Navigate to="/about" replace />} />
      </Routes>
    </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  useLenis()
  usePrefetchRoutes()
  return (
    <BrowserRouter>
      <ContactProvider>
      <Shell />
      </ContactProvider>
    </BrowserRouter>
  )
}
