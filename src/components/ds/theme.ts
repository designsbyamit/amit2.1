import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'
const KEY = 'theme'

function current(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** Reads and sets the site theme. Dark by default; light only when the visitor has chosen it. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => (typeof document === 'undefined' ? 'dark' : current()))

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem(KEY, t) } catch { /* storage blocked */ }
    setThemeState(t)
  }, [])

  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
