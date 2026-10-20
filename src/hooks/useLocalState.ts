import { useCallback, useEffect, useState } from 'react'

/** State kept in this browser only. Reads and writes are guarded, so the page still works when storage is blocked. */
export function useLocalState<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw != null ? (JSON.parse(raw) as T) : initial } catch { return initial }
  })
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw != null) setVal(JSON.parse(raw) as T) } catch { /* ignore */ }
  }, [key])
  const set = useCallback((v: T | ((p: T) => T)) => {
    setVal(prev => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
      try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [key])
  return [val, set]
}

/** Copy text; returns true when it worked. */
export async function copyText(s: string) {
  try { await navigator.clipboard.writeText(s); return true } catch { return false }
}
