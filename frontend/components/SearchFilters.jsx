const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

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
        
        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto space-y-4">
          <input
            type="text"
            value={filters.search}
            onChange={e => onChange({ ...filters, search: e.target.value })}
            placeholder="Search courses, skills, or topics..."
            className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none transition-colors"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.domain || ''}
              onChange={e => onChange({ ...filters, domain: e.target.value || undefined })}
              className="px-5 py-4 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none transition-colors"
            >
              <option value="">All Domains</option>
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={filters.level || ''}
              onChange={e => onChange({ ...filters, level: e.target.value || undefined })}
              className="px-5 py-4 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none transition-colors"
            >
              <option value="">All Levels</option>
              {LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <label className="flex items-center gap-3 px-5 py-4 rounded-xl bg-background border-2 border-border cursor-pointer hover:border-[hsl(38,92%,50%)] transition-colors">
              <input
                type="checkbox"
                checked={filters.certificateAvailable || false}
                onChange={e => onChange({ ...filters, certificateAvailable: e.target.checked })}
                className="w-5 h-5 accent-[hsl(38,92%,50%)]"
              />
              <span className="text-sm font-medium">Certificate</span>
            </label>
          </div>
          <button className="btn-primary w-full text-lg py-4">Search Courses →</button>
        </div>
      </div>
    </section>
  )
}
