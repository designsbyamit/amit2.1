import { useState, useEffect, useRef, useId } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { bigFive, research, growItems, leadershipItems } from '../../data/ia'
import { shortStories } from '../../data/shortStories'
import Logo from './Logo'
import NameRoles from './RoleRotator'
import ThemeToggle from '../ds/ThemeToggle'

type MenuKey = 'Works' | 'Leadership' | 'Grow'
// Works, Leadership and Grow open a menu; the rest are plain links.
const navItems: { label: string; to: string; menu?: MenuKey; quiet?: boolean }[] = [
  { label: 'Works', to: '/craft', menu: 'Works' },
  { label: 'Leadership', to: '/leadership', menu: 'Leadership' },
  { label: 'Practice', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Grow (For Designers)', to: '/learn', menu: 'Grow', quiet: true },
]

const arrowSvg = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
const itemCls = 'py-2 text-[0.9375rem] leading-snug text-ink-2 hover:text-ink hover:underline underline-offset-4'
const soonTag = <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-3 align-middle">Coming soon</span>

function navCls({ isActive }: { isActive: boolean }) {
  return `relative py-2 text-[0.9375rem] transition-colors duration-150 ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState<MenuKey | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()
  const triggers = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({})
  const location = useLocation()

  // Close menus on navigation
  useEffect(() => { setOpen(null); setMenuOpen(false) }, [location.pathname])

  // Esc closes the open menu and returns focus to its trigger
  useEffect(() => {
    if (!open && !menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (open) { triggers.current[open]?.focus(); setOpen(null) }
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, menuOpen])

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  // Hover intent: short delay to open, longer grace period to close, so moving
  // the pointer from the trigger into the panel never drops it.
  const hoverOpen = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => setOpen(k), 90)
  }
  const hoverClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 280)
  }

  const path = location.pathname
  const activeFor = (k: MenuKey) =>
    k === 'Works' ? path.startsWith('/craft')
    : k === 'Leadership' ? ['/leadership', '/community', '/reflections'].some(x => path.startsWith(x))
    : ['/learn', '/mentoring'].some(x => path.startsWith(x))

  const worksPanel = (
    <div className="container-site grid-site py-8 gap-y-8">
      <div className="col-span-12 md:col-span-4">
        <p className="text-overline text-ink-3 mb-4">Big five</p>
        <ul className="flex flex-col">{bigFive.map(cs => <li key={cs.id}><Link to={`/craft/${cs.id}`} className={itemCls + ' block'}>{cs.shortTitle}</Link></li>)}</ul>
      </div>
      <div className="col-span-12 md:col-span-4 md:pl-6" style={{ borderLeft: '1px solid var(--line-1)' }}>
        <p className="text-overline text-ink-3 mb-4">Short stories</p>
        <ul className="flex flex-col">{shortStories.map(x => <li key={x.slug}><Link to={`/craft/stories/${x.slug}`} className={itemCls + ' block'}>{x.title}</Link></li>)}</ul>
      </div>
      <div className="col-span-12 md:col-span-4 md:pl-6" style={{ borderLeft: '1px solid var(--line-1)' }}>
        <p className="text-overline text-ink-3 mb-4">Research {soonTag}</p>
        <ul className="flex flex-col">{research.map(x => <li key={x} className="py-2 text-[0.9375rem] leading-snug text-ink-3">{x}</li>)}</ul>
        <Link to="/craft" className="btn btn-ghost mt-4 inline-flex">All works{arrowSvg}</Link>
      </div>
    </div>
  )
  const listPanel = (items: { label: string; to: string; soon?: boolean; note?: string }[]) => (
    <div className="container-site py-8">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
        {items.map(it => (
          <li key={it.label}>
            {it.soon ? (
              <p className="py-2 text-[0.9375rem] leading-snug text-ink-3">{it.label}{soonTag}{it.note && <span className="block text-body-sm text-ink-3 mt-1">{it.note}</span>}</p>
            ) : (
              <Link to={it.to} className={itemCls + ' block'}>{it.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
  const panels: Record<MenuKey, React.ReactNode> = { Works: worksPanel, Leadership: listPanel(leadershipItems), Grow: listPanel(growItems) }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="fixed top-0 left-0 right-0" style={{ zIndex: 'var(--z-nav)' as unknown as number, background: 'var(--header-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line-1)' }}
        onMouseLeave={hoverClose}>
        <nav aria-label="Main" className="container-site flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
          <Link to="/" className="flex items-center gap-3 text-ink" aria-label="Amit Kumar Tiwari, home">
            <Logo size={32} />
            <NameRoles />
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden lg:flex items-center gap-7">
              {navItems.map(item => item.menu ? (
                <li key={item.to} onMouseEnter={() => hoverOpen(item.menu!)} className={item.quiet ? 'pl-7 ml-1 border-l' : undefined} style={item.quiet ? { borderColor: 'rgb(var(--ink-rgb) / 0.14)' } : undefined}>
                  <button ref={el => { triggers.current[item.menu!] = el }} type="button" aria-expanded={open === item.menu} aria-controls={`${panelId}-${item.menu}`}
                    onClick={() => setOpen(o => (o === item.menu ? null : item.menu!))}
                    className={`flex items-center gap-1.5 py-2 transition-colors ${item.quiet ? 'text-[0.875rem]' : 'text-[0.9375rem]'} ${open === item.menu || activeFor(item.menu!) ? 'text-ink' : item.quiet ? 'text-ink-3 hover:text-ink' : 'text-ink-2 hover:text-ink'}`}>
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-200 ${open === item.menu ? 'rotate-180' : ''}`}><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <div className="hidden lg:block"><ThemeToggle /></div>
            <button type="button" className="lg:hidden btn btn-secondary btn-sm btn-icon" onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {menuOpen ? <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" /> : <path d="M2.5 5h13M2.5 9h13M2.5 13h13" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menus: a full-width panel under the bar */}
        <AnimatePresence>
          {open && (
            <motion.div id={`${panelId}-${open}`} key={open} className="hidden lg:block absolute left-0 right-0 top-full"
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }} onMouseLeave={hoverClose}>
              <div style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--line-1)', boxShadow: 'var(--shadow-2)' }}>
                {panels[open]}
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
            <nav aria-label="Mobile" className="container-site pt-4 pb-8">
              <div className="flex items-center justify-between text-body-sm text-ink-2 pb-2 hairline-bottom">
                <span>Appearance</span>
                <ThemeToggle />
              </div>
              <ul className="flex flex-col">
                {navItems.map(item => (
                  <li key={item.to} className="hairline-bottom">
                    <NavLink to={item.to} end={item.menu === 'Leadership'} className={({ isActive }) => `flex items-center justify-between py-4 text-heading ${isActive ? 'text-ink' : 'text-ink-2'}`}>
                      {item.label}
                    </NavLink>
                    {item.menu === 'Works' && (
                      <div className="pb-4 flex flex-col gap-4">
                        <div><p className="text-overline text-ink-3 mb-1">Big five</p><ul>{bigFive.map(cs => <li key={cs.id}><Link to={`/craft/${cs.id}`} className="flex gap-3 py-2 text-body-sm text-ink-2">{cs.shortTitle}</Link></li>)}</ul></div>
                        <div><p className="text-overline text-ink-3 mb-1">Short stories</p><ul>{shortStories.map(x => <li key={x.slug}><Link to={`/craft/stories/${x.slug}`} className="flex gap-3 py-2 text-body-sm text-ink-2">{x.title}</Link></li>)}</ul></div>
                        <div><p className="text-overline text-ink-3 mb-1">Research {soonTag}</p><ul>{research.map(x => <li key={x} className="py-2 text-body-sm text-ink-3">{x}</li>)}</ul></div>
                      </div>
                    )}
                    {item.menu === 'Leadership' && (
                      <ul className="pb-4">{leadershipItems.map(x => <li key={x.to}><Link to={x.to} className="flex py-2 text-body-sm text-ink-2">{x.label}</Link></li>)}</ul>
                    )}
                    {item.menu === 'Grow' && (
                      <ul className="pb-4">{growItems.map(x => <li key={x.label}>{x.soon ? <p className="py-2 text-body-sm text-ink-3">{x.label}{soonTag}</p> : <Link to={x.to} className="flex py-2 text-body-sm text-ink-2">{x.label}</Link>}</li>)}</ul>
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
