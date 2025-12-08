// BEGIN CUSTOMIZABLE SECTION (styles)
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
    <section className="px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(d => (
          <button
            key={d}
            className="p-4 border rounded text-left hover:bg-gray-50"
            onClick={() => onSelect(d)}
          >
            {d}
          </button>
        ))}
      </div>
    </section>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
