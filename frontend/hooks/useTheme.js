import { useEffect, useState } from 'react'

function prefersDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem('theme')
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = readStoredTheme()
    if (stored) return stored
    return prefersDark() ? 'dark' : 'light'
  })

  useEffect(() => {
    const isDark = theme === 'dark'
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  function toggle() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  return { isDark: theme === 'dark', theme, setTheme, toggle }
}
