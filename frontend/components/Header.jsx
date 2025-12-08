import { useState, useEffect } from 'react'

export default function Header({ onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'header-scroll' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(195,86%,51%)] flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl font-bold">
            Skillsphere <span className="text-[hsl(38,92%,50%)]">Clarity</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm hover:text-[hsl(38,92%,50%)] transition-colors"
            >
              Menu ▾
            </button>
            {menuOpen && (
              <div className="absolute top-full mt-2 right-0 glass-card rounded-xl p-2 min-w-[150px]">
                <a href="#why" className="block px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Why</a>
                <a href="#domains" className="block px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Domains</a>
                <a href="#courses" className="block px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Courses</a>
                <a href="#impact" className="block px-4 py-2 text-sm hover:bg-[hsl(38,92%,50%)]/10 rounded">Impact</a>
              </div>
            )}
          </div>
          <button 
            onClick={onToggleTheme} 
            className="text-sm hover:text-[hsl(38,92%,50%)] transition-colors"
          >
            🌓
          </button>
          <button className="btn-outline text-sm px-4 py-2">Log In</button>
          <button className="btn-primary text-sm">Get Guidance</button>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
