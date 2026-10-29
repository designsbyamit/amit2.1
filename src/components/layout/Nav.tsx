import { useState, useEffect, useRef, useId } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { menuWorks, growItems, leadershipItems, type MenuItem } from '../../data/ia'
import MenuCover from '../ds/MenuCover'
import CaseThumb from '../ds/CaseThumb'
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
const soonTag = <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-3 align-middle">Coming soon</span>

const chevron = (open: boolean) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={{ transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'none' }}><path d="M4 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const goChevron = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>

/** The phone menu: sections that open and close, each page shown as a tappable card with its cover and an arrow. */
function MobileNav({ pathname }: { pathname: string }) {
  const [openKey, setOpenKey] = useState<MenuKey | null>(() => (pathname.startsWith('/leadership') || pathname.startsWith('/community') || pathname.startsWith('/reflections') ? 'Leadership' : pathname.startsWith('/learn') || pathname.startsWith('/mentoring') ? 'Grow' : 'Works'))
  const isHere = (to: string) => to !== '' && (pathname === to || (to !== '/' && pathname.startsWith(to + '/')))

  const row = (key: string, cover: React.ReactNode, title: string, sub: string | undefined, to: string, soon?: boolean) => {
    const here = isHere(to)
    const inner = (
      <>
        <div className="w-[5.5rem] shrink-0 overflow-hidden rounded-2" style={{ opacity: soon ? 0.55 : 1 }}>{cover}</div>
        <div className="min-w-0 flex-1">
          {sub && <p className="text-label text-signal-ink">{sub}</p>}
          <p style={{ lineHeight: 1.3 }} className={`text-body ${soon ? 'text-ink-3' : 'text-ink'}`}>{title}</p>
          {soon && <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-3">Coming soon</p>}
        </div>
        {!soon && <span className="text-ink-3 shrink-0">{goChevron}</span>}
      </>
    )
    const cls = 'flex items-center gap-3 rounded-3 border p-2.5 transition-colors'
    const style = { borderColor: here ? 'var(--signal-ink)' : 'var(--line-1)', background: 'var(--surface-1)' }
    return <li key={key}>{soon ? <div className={cls} style={style}>{inner}</div> : <Link to={to} className={`${cls} active:bg-surface-2`} style={style} aria-current={here ? 'page' : undefined}>{inner}</Link>}</li>
  }
  const allBtn = (label: string, to: string) => <li key="all"><Link to={to} className="btn btn-secondary w-full justify-center">{label}{arrowSvg}</Link></li>

  const content: Record<MenuKey, React.ReactNode> = {
    Works: <>{menuWorks.map(cs => row(cs.id, <CaseThumb id={cs.id} compact />, cs.shortTitle, cs.number, `/craft/${cs.id}`))}{allBtn('All work', '/craft')}</>,
    Leadership: <>{leadershipItems.map(x => row(x.label, <MenuCover mark={x.mark!} tone={x.tone!} size={30} />, x.label, x.kind, x.to))}{allBtn('All leadership', '/leadership')}</>,
    Grow: <>{growItems.map(x => row(x.label, x.mark ? <MenuCover mark={x.mark} tone={x.tone!} size={30} /> : <MenuCover mark="notes" tone="graphite" size={30} />, x.label, x.soon ? undefined : x.kind, x.to, x.soon))}{allBtn('All Grow', '/learn')}</>,
  }

  return (
    <nav aria-label="Mobile" className="container-site pt-2 pb-10">
      <ul className="flex flex-col">
        {navItems.map(item => {
          const key = item.menu
          const here = isHere(item.to)
          const rowCls = `flex w-full items-center justify-between py-4 text-heading text-left ${here || openKey === key ? 'text-ink' : 'text-ink-2'}`
          return (
            <li key={item.to} className="hairline-bottom">
              {key ? (
                <>
                  <button type="button" className={rowCls} aria-expanded={openKey === key} onClick={() => setOpenKey(openKey === key ? null : key)}>
                    <span>{item.label}</span><span className="text-ink-3">{chevron(openKey === key)}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openKey === key && (
                      <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                        <ul className="flex flex-col gap-2.5 pb-5">{content[key]}</ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink to={item.to} className={rowCls}><span>{item.label}</span><span className="text-ink-3">{goChevron}</span></NavLink>
              )}
            </li>
          )
        })}
      </ul>
      <div className="flex items-center justify-between text-body-sm text-ink-2 pt-5">
        <span>Appearance</span>
        <ThemeToggle />
      </div>
    </nav>
  )
}

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

  const titleCls = 'text-[1.0625rem] leading-snug font-light tracking-[-0.01em] text-ink group-hover:underline underline-offset-4 decoration-1'
  const linkCls = 'py-1.5 text-[0.9375rem] leading-snug text-ink-2 hover:text-ink hover:underline underline-offset-4'
  const featured = menuWorks.slice(0, 3)
  const moreBig = menuWorks.slice(3)

  // Works: the same panel as before. Three featured covers with previews, then the "More work" column.
  const worksPanel = (
    <div className="container-site grid-site py-8">
      <p className="col-span-12 text-overline text-ink-3 mb-5">Selected work</p>
      {featured.map(cs => (
        <Link key={cs.id} to={`/craft/${cs.id}`} className="col-span-3 group flex flex-col gap-3 rounded-3 p-3 -m-3 hover:bg-surface-2 transition-colors">
          <CaseThumb id={cs.id} compact />
          <span className="text-label text-signal-ink">{cs.number} / {cs.category.split(' · ')[0]}</span>
          <span className={titleCls}>{cs.title}</span>
        </Link>
      ))}
      <div className="col-span-3 flex flex-col gap-0.5 pl-6" style={{ borderLeft: '1px solid var(--line-1)' }}>
        <span className="text-label text-ink-3 mb-2">More work</span>
        {moreBig.map(cs => <Link key={cs.id} to={`/craft/${cs.id}`} className={linkCls}>{cs.title}</Link>)}
        <Link to="/craft" className="btn btn-ghost mt-3 self-start">All work{arrowSvg}</Link>
      </div>
    </div>
  )

  // Leadership and Grow: the same rule as Works. The first three pages get a cover, any others are listed on the right,
  // and the last link goes to the section's own page.
  const coverPanel = (heading: string, items: MenuItem[], all: { label: string; to: string }) => {
    const shown = items.slice(0, 3)
    const rest = items.slice(3)
    return (
      <div className="container-site grid-site py-8">
        <p className="col-span-12 text-overline text-ink-3 mb-5">{heading}</p>
        {shown.map((it, i) => (
          <Link key={it.label} to={it.to} className="col-span-3 group flex flex-col gap-3 rounded-3 p-3 -m-3 hover:bg-surface-2 transition-colors">
            <MenuCover mark={it.mark!} tone={it.tone!} />
            <span className="text-label text-signal-ink">{String(i + 1).padStart(2, '0')} / {it.kind}</span>
            <span className={titleCls}>{it.label}</span>
          </Link>
        ))}
        <div className="col-span-3 flex flex-col gap-0.5 pl-6" style={{ borderLeft: '1px solid var(--line-1)' }}>
          {rest.length > 0 && <span className="text-label text-ink-3 mb-2">More</span>}
          {rest.map(it => it.soon
            ? <span key={it.label} className="py-1.5 text-[0.9375rem] leading-snug text-ink-3">{it.label}{soonTag}{it.note && <span className="block text-body-sm mt-0.5">{it.note}</span>}</span>
            : <Link key={it.label} to={it.to} className={linkCls}>{it.label}</Link>)}
          <Link to={all.to} className={`btn btn-ghost self-start ${rest.length > 0 ? 'mt-3' : ''}`}>{all.label}{arrowSvg}</Link>
        </div>
      </div>
    )
  }
  const panels: Record<MenuKey, React.ReactNode> = { Works: worksPanel, Leadership: coverPanel('Leadership', leadershipItems, { label: 'All leadership', to: '/leadership' }), Grow: coverPanel('Grow', growItems, { label: 'All Grow', to: '/learn' }) }

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
            <MobileNav pathname={location.pathname} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
