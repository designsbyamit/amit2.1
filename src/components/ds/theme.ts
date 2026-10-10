import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
const KEY = 'theme'

function current(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** Reads and sets the site theme. A saved choice wins; otherwise the system setting is followed live. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => (typeof document === 'undefined' ? 'dark' : current()))

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem(KEY) } catch { /* storage blocked */ }
      if (saved) return
      const t: Theme = mq.matches ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', t)
      setThemeState(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem(KEY, t) } catch { /* storage blocked */ }
    setThemeState(t)
  }, [])

  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
