import { useState, useEffect, useRef, useId } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../../data/work'
import Logo from './Logo'
import ThemeToggle from '../ds/ThemeToggle'

const navItems = [
  { label: 'Craft', to: '/craft' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Mentoring', to: '/mentoring' },
  { label: 'Community', to: '/community' },
  { label: 'Reflections', to: '/reflections' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
]

const featured = caseStudies.slice(0, 3)
const more = caseStudies.slice(3)
const toneBg: Record<string, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)' }

function navCls({ isActive }: { isActive: boolean }) {
  return `relative py-2 text-[0.9375rem] transition-colors duration-150 ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [craftOpen, setCraftOpen] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  // Close menus on navigation
  useEffect(() => { setCraftOpen(false); setMenuOpen(false) }, [location.pathname])

  // Esc closes the Craft panel and returns focus to its trigger
  useEffect(() => {
    if (!craftOpen && !menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (craftOpen) { setCraftOpen(false); triggerRef.current?.focus() }
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [craftOpen, menuOpen])

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  // Hover intent: short delay to open, longer grace period to close, so moving
  // the pointer from the trigger into the panel never drops it.
  const hoverOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => setCraftOpen(true), 90)
  }
  const hoverClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    closeTimer.current = setTimeout(() => setCraftOpen(false), 280)
  }

  const craftActive = location.pathname.startsWith('/craft')

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="fixed top-0 left-0 right-0" style={{ zIndex: 'var(--z-nav)' as unknown as number, background: 'var(--header-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line-1)' }}
        onMouseLeave={hoverClose}>
        <nav aria-label="Main" className="container-site flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
          <Link to="/" className="flex items-center gap-3 text-ink" aria-label="Amit Kumar Tiwari, home">
            <Logo size={32} />
            <span className="hidden sm:inline text-[0.9375rem] font-normal tracking-[-0.01em]">Amit Kumar Tiwari</span>
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden lg:flex items-center gap-7">
              {navItems.map(item => item.label === 'Craft' ? (
                <li key={item.to} onMouseEnter={hoverOpen}>
                  <button ref={triggerRef} type="button" aria-expanded={craftOpen} aria-controls={panelId}
                    onClick={() => setCraftOpen(o => !o)}
                    className={`flex items-center gap-1.5 py-2 text-[0.9375rem] transition-colors ${craftOpen || craftActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}>
                    Craft
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-200 ${craftOpen ? 'rotate-180' : ''}`}><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </button>
                </li>
              ) : (
                <li key={item.to} onMouseEnter={hoverClose}>
                  <NavLink to={item.to} className={navCls}>
                    {({ isActive }) => <>{item.label}{isActive && <span aria-hidden="true" className="absolute left-0 right-0 -bottom-[3px] h-[2px] bg-signal" />}</>}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            <button type="button" className="lg:hidden btn btn-secondary btn-sm btn-icon" onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {menuOpen ? <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" /> : <path d="M2.5 5h13M2.5 9h13M2.5 13h13" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Craft mega menu: full-width panel with full case-study titles */}
        <AnimatePresence>
          {craftOpen && (
            <motion.div id={panelId} key="craft" className="hidden lg:block absolute left-0 right-0 top-full"
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
              <div style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--line-1)', boxShadow: 'var(--shadow-2)' }}>
                <div className="container-site grid-site py-8">
                  <p className="col-span-12 text-overline text-ink-3 mb-5">Selected work</p>
                  {featured.map(cs => (
                    <Link key={cs.id} to={`/craft/${cs.id}`} className="col-span-3 group flex flex-col gap-3 rounded-3 p-3 -m-3 hover:bg-surface-2 transition-colors">
                      <div className="rounded-2 overflow-hidden p-3 aspect-[16/10]" style={{ background: toneBg[cs.tone ?? 'cobalt'] }}>
                        {cs.image && <img src={cs.image} alt="" className="w-full h-full object-cover object-left-top rounded-[3px]" loading="lazy" />}
                      </div>
                      <span className="text-label text-signal-ink">{cs.number} / {cs.category.split(' · ')[0]}</span>
                      <span className="text-[1.0625rem] leading-snug font-light tracking-[-0.01em] text-ink group-hover:underline underline-offset-4 decoration-1">{cs.title}</span>
                    </Link>
                  ))}
                  <div className="col-span-3 flex flex-col gap-1 pl-6" style={{ borderLeft: '1px solid var(--line-1)' }}>
                    <span className="text-label text-ink-3 mb-2">More work</span>
                    {more.map(cs => (
                      <Link key={cs.id} to={`/craft/${cs.id}`} className="py-2 text-[0.9375rem] leading-snug text-ink-2 hover:text-ink hover:underline underline-offset-4">{cs.title}</Link>
                    ))}
                    <Link to="/craft" className="btn btn-ghost mt-auto self-start">All work
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-x-0 bottom-0 lg:hidden overflow-y-auto" style={{ top: 'var(--header-h)', zIndex: 'var(--z-overlay)' as unknown as number, background: 'var(--bg)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <nav aria-label="Mobile" className="container-site py-8">
              <ul className="flex flex-col">
                {navItems.map(item => (
                  <li key={item.to} className="hairline-bottom">
                    <NavLink to={item.to} className={({ isActive }) => `flex items-center justify-between py-4 text-heading ${isActive ? 'text-ink' : 'text-ink-2'}`}>
                      {item.label}
                    </NavLink>
                    {item.label === 'Craft' && (
                      <ul className="pb-4 flex flex-col">
                        {caseStudies.map(cs => (
                          <li key={cs.id}><Link to={`/craft/${cs.id}`} className="flex gap-3 py-2.5 text-body-sm text-ink-2"><span className="text-label text-ink-3 pt-0.5">{cs.number}</span>{cs.title}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
