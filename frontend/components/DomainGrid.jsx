const DEFAULT_DOMAINS = [
  'Technology & Computer Science',
  'Commerce & Business',
  'Arts & Humanities',
  'Design & Creative Fields',
  'Science',
  'Skill-Based & Vocational'
]

export default function DomainGrid({ domains, onSelect }) {
  const list = domains && domains.length ? domains : DEFAULT_DOMAINS
  return (
    <section id="domains" className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Explore by <span className="text-[#c8a96a]">Domain</span>
        </h2>
        <div className="w-20 h-1 bg-[#c8a96a] mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(d => (
          <button
            key={d}
            className="card-premium accent-bar p-6 text-left group"
            onClick={() => onSelect(d)}
          >
            <h3 className="text-lg font-semibold group-hover:text-[#c8a96a] transition-colors">
              {d}
            </h3>
          </button>
        ))}
      </div>
    </section>
  )
}
