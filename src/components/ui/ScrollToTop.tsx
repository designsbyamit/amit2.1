import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top on a new page, or to the section named in the link (#id) once that page has rendered. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    let tries = 0
    const id = decodeURIComponent(hash.slice(1))
    const t = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el) { window.clearInterval(t); el.scrollIntoView({ behavior: 'auto', block: 'start' }) }
      else if (++tries > 30) window.clearInterval(t)
    }, 100)
    return () => window.clearInterval(t)
  }, [pathname, hash])
  return null
}
