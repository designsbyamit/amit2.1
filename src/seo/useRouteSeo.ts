import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, abs, metaFor, routes } from './site'

const home = routes[0]

function setMeta(selector: string, attr: 'content' | 'href', value: string, make?: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el && make) { el = make(); document.head.appendChild(el) }
  el?.setAttribute(attr, value)
}
const prop = (name: string, value: string) => setMeta(`meta[property="${name}"]`, 'content', value, () => { const m = document.createElement('meta'); m.setAttribute('property', name); return m })
const named = (name: string, value: string) => setMeta(`meta[name="${name}"]`, 'content', value, () => { const m = document.createElement('meta'); m.setAttribute('name', name); return m })

/** Keeps the tab title, link previews and robots hint in step with the page while visitors move around the app.
 *  Search engines and link scrapers read the pre-built HTML for each route instead (see tools/seo/build.ts). */
export default function useRouteSeo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    if (!m) return // dynamic pages set their own title
    const url = abs(pathname === '/' ? '/' : pathname.replace(/\/+$/, ''))
    const image = abs(m.image ?? home.image ?? SITE.ogDefault)
    document.title = m.title
    named('description', m.description)
    setMeta('link[rel="canonical"]', 'href', url, () => { const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l })
    prop('og:title', m.title); prop('og:description', m.description); prop('og:url', url); prop('og:image', image); prop('og:type', m.type === 'article' ? 'article' : 'website')
    named('twitter:title', m.title); named('twitter:description', m.description); named('twitter:image', image)
    named('robots', m.noindex ? 'noindex, nofollow' : 'index, follow')
  }, [pathname])
}
