const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
import LogoSphere from './LogoSphere'

export default function SearchFilters({ filters, onChange, domains }) {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(38,92%,95%)] to-[hsl(195,86%,95%)] dark:from-[hsl(38,92%,10%)] dark:to-[hsl(195,86%,10%)] opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1709626011485-6fe000ea2dbc?w=1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1
      }}></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Clarity in a world of <br/>
            <span className="text-[hsl(38,92%,50%)]">endless courses</span>
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            Curated, verified, and guided learning paths for everyone—especially those from rural and low-income backgrounds.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto space-y-5">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <LogoSphere size={24} />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={e => onChange({ ...filters, search: e.target.value })}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }) } }}
              placeholder="Search courses, skills, or topics..."
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none transition-colors"
              aria-label="Search courses"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {domains.slice(0, 8).map(d => (
              <button
                key={d}
                className={`chip ${filters.domain === d ? 'chip-active' : ''}`}
                onClick={() => onChange({ ...filters, domain: filters.domain === d ? undefined : d })}
                type="button"
                aria-pressed={filters.domain === d}
              >{d}</button>
            ))}
          </div>
          <button className="btn-primary w-full text-lg py-4" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>Search Courses →</button>
        </div>
      </div>
    </section>
  )
}
