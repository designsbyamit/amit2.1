import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '../../assets/images/logo.svg'
import { caseStudies } from '../../data/work'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Craft', to: '/craft' },
  { label: 'Community', to: '/community' },
  { label: 'Reflections', to: '/reflections' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [craftOpen, setCraftOpen] = useState(false)
  const craftRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openCraft = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCraftOpen(true)
  }

  const closeCraft = () => {
    closeTimer.current = setTimeout(() => setCraftOpen(false), 120)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(12,12,11,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245,242,237,0.08)' : '1px solid transparent',
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src={logoSvg} alt="AKT" className="w-10 h-10" />
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.label === 'Craft' ? (
                <li
                  key={item.to}
                  ref={craftRef}
                  className="relative"
                  onMouseEnter={openCraft}
                  onMouseLeave={closeCraft}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `text-label text-white transition-all duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  <AnimatePresence>
                    {craftOpen && (
                      <motion.div
                        className="absolute top-full left-0 pt-3"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={openCraft}
                        onMouseLeave={closeCraft}
                      >
                        <div
                          className="min-w-[200px] border border-white py-1"
                          style={{
                            background: 'rgba(12,12,11,0.96)',
                            backdropFilter: 'blur(24px)',
                            borderColor: 'rgba(255,255,255,0.1)',
                          }}
                        >
                          {caseStudies.map((cs) => (
                            <Link
                              key={cs.id}
                              to={`/craft/${cs.id}`}
                              className="flex items-center gap-3 px-5 py-2.5 hover:bg-white hover:bg-opacity-[0.04] transition-colors duration-150"
                              onClick={() => setCraftOpen(false)}
                            >
                              <span className="text-label text-white opacity-20 flex-shrink-0 w-4">{cs.number}</span>
                              <span
                                className="text-white truncate"
                                style={{ fontSize: '0.72rem', letterSpacing: '0.02em', opacity: 0.65 }}
                              >
                                {cs.shortTitle}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `text-label text-white transition-all duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: '#0C0C0B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => (
                <li key={item.to}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `text-display-l text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
