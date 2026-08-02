import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import ScrollProgressLine from './components/ui/ScrollProgressLine'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import Craft from './pages/Craft'
import LeadershipPage from './pages/LeadershipPage'
import ReflectionsPage from './pages/ReflectionsPage'
import CommunityPage from './pages/CommunityPage'
import AboutPage from './pages/AboutPage'
import CaseStudyPage from './pages/CaseStudyPage'
import ResourcesPage from './pages/ResourcesPage'
import ContactPage from './pages/ContactPage'
import DualFluencyPage from './pages/DualFluencyPage'
import AINativeFrameworksPage from './pages/AINativeFrameworksPage'
import SAPSearchStoryPage from './pages/SAPSearchStoryPage'
import ConversationExperiencePage from './pages/ConversationExperiencePage'

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
        <Route path="/craft/sap-search" element={<PageTransition><SAPSearchStoryPage /></PageTransition>} />
        <Route path="/resources/conversation-experience" element={<PageTransition><ConversationExperiencePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/philosophy" element={<Navigate to="/about" replace />} />
      </Routes>
    </AnimatePresence>
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
