import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ContactForm from './ContactForm'
import { DIRECT_EMAIL, fromMailto, type ContactOptions } from '../../lib/contact'

const Ctx = createContext<{ open: (o?: ContactOptions) => void }>({ open: () => {} })
export const useContact = () => useContext(Ctx)

/** Hosts the contact dialog, and turns every mailto: link to Amit into the form so no enquiry leaves the site by email client. */
export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<ContactOptions | null>(null)
  const [key, setKey] = useState(0)
  const returnTo = useRef<HTMLElement | null>(null)
  const panel = useRef<HTMLDivElement>(null)

  const open = useCallback((o: ContactOptions = {}) => { returnTo.current = document.activeElement as HTMLElement | null; setKey(k => k + 1); setOpts(o) }, [])
  const close = useCallback(() => { setOpts(null); returnTo.current?.focus?.() }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null
      if (!a || a.hasAttribute('data-direct')) return
      const href = a.getAttribute('href') || ''
      if (!href.toLowerCase().startsWith(`mailto:${DIRECT_EMAIL}`)) return
      e.preventDefault(); open(fromMailto(href))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  useEffect(() => {
    if (!opts) return
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab' || !panel.current) return
      const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([tabindex="-1"]),select,textarea')).filter(x => x.offsetParent !== null)
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [opts, close])

  const value = useMemo(() => ({ open }), [open])
  return (
    <Ctx.Provider value={value}>
      {children}
      {opts && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="presentation">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
          <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="contact-title" data-lenis-prevent
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3 sm:rounded-3 border bg-[var(--bg)] p-6 sm:p-10" style={{ borderColor: 'var(--line-1)' }}>
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <p className="text-overline text-ink-3">Contact</p>
                <h2 id="contact-title" className="text-heading text-white mt-2">Tell me what you have in mind.</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="tap-target text-ink-3 hover:text-white transition-colors -mt-2 -mr-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <ContactForm key={key} options={opts} onDone={close} autoFocus />
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
