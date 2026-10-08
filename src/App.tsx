import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import ScrollProgressLine from './components/ui/ScrollProgressLine'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'

// Route-level code splitting: only the page being visited is downloaded.
const Craft = lazy(() => import('./pages/Craft'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const ReflectionsPage = lazy(() => import('./pages/ReflectionsPage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const DualFluencyPage = lazy(() => import('./pages/DualFluencyPage'))
const AINativeFrameworksPage = lazy(() => import('./pages/AINativeFrameworksPage'))
const SAPSearchStoryPage = lazy(() => import('./pages/SAPSearchStoryPage'))
const ConversationExperiencePage = lazy(() => import('./pages/ConversationExperiencePage'))

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
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/craft" element={<PageTransition><Craft /></PageTransition>} />
        <Route path="/craft/sap-search" element={<PageTransition><SAPSearchStoryPage /></PageTransition>} />
        <Route path="/craft/:id" element={<PageTransition><CaseStudyPage /></PageTransition>} />
        <Route path="/leadership" element={<PageTransition><LeadershipPage /></PageTransition>} />
        <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
        <Route path="/reflections" element={<PageTransition><ReflectionsPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
        <Route path="/resources/dual-fluency" element={<PageTransition><DualFluencyPage /></PageTransition>} />
        <Route path="/resources/ai-native-patterns" element={<PageTransition><AINativeFrameworksPage /></PageTransition>} />
        <Route path="/resources/conversation-experience" element={<PageTransition><ConversationExperiencePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/philosophy" element={<Navigate to="/about" replace />} />
      </Routes>
    </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  useLenis()
  return (
    <HashRouter>
      <div className="bg-black text-white min-h-screen">
        <ScrollProgressLine />
        <ScrollToTop />
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
