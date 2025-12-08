import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import LogoSphere from './LogoSphere'

export default function Header({ onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    if (menuOpen) {
      document.addEventListener('mousedown', onDocClick)
      document.addEventListener('keydown', onKey)
    }
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function goTo(id) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'header-scroll' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
          <LogoSphere size={40} />
          <h1 className="text-xl font-bold">Skillsphere</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              className="text-sm hover:text-[hsl(38,92%,50%)] transition-colors"
            >
              Menu ▾
            </button>
            {menuOpen && (
              <div role="menu" className="absolute top-full mt-2 right-0 glass-card rounded-xl p-2 min-w-[160px]">
                <button onClick={() => goTo('why')} className="block w-full text-left px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Why</button>
                <button onClick={() => goTo('domains')} className="block w-full text-left px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Domains</button>
                <button onClick={() => goTo('courses')} className="block w-full text-left px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Courses</button>
                <button onClick={() => goTo('impact')} className="block w-full text-left px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Impact</button>
              </div>
            )}
          </div>
          <button 
            onClick={onToggleTheme} 
            className="text-sm hover:text-[hsl(38,92%,50%)] transition-colors"
          >
            🌓
          </button>
          <a href="/login" className="btn-outline text-sm px-4 py-2">Log In</a>
          <Link href="/guidance" className="btn-primary text-sm">Get Guidance</Link>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute top-0 right-0 h-full w-3/4 max-w-sm glass-card p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <nav className="flex flex-col gap-2">
              <button onClick={() => goTo('why')} className="text-left px-4 py-3 rounded hover:bg-[hsl(38,92%,50%)]/10">Why</button>
              <button onClick={() => goTo('domains')} className="text-left px-4 py-3 rounded hover:bg-[hsl(38,92%,50%)]/10">Domains</button>
              <button onClick={() => goTo('courses')} className="text-left px-4 py-3 rounded hover:bg-[hsl(38,92%,50%)]/10">Courses</button>
              <button onClick={() => goTo('impact')} className="text-left px-4 py-3 rounded hover:bg-[hsl(38,92%,50%)]/10">Impact</button>
              <Link href="/login" className="px-4 py-3 rounded hover:bg-[hsl(38,92%,50%)]/10">Log In</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
