import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import Home from './pages/Home'
import Craft from './pages/Craft'
import LeadershipPage from './pages/LeadershipPage'
import ReflectionsPage from './pages/ReflectionsPage'
import Philosophy from './pages/Philosophy'
import ContactPage from './pages/ContactPage'

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
        <Route path="/leadership" element={<PageTransition><LeadershipPage /></PageTransition>} />
        <Route path="/reflections" element={<PageTransition><ReflectionsPage /></PageTransition>} />
        <Route path="/philosophy" element={<PageTransition><Philosophy /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="bg-black text-white min-h-screen">
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
