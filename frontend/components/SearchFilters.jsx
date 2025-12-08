// BEGIN CUSTOMIZABLE SECTION (styles)
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export default function SearchFilters({ filters, onChange, domains }) {
  return (
    <section className="px-6 py-4 space-y-3 border-b">
      <input
        type="text"
        value={filters.search}
        onChange={e => onChange({ ...filters, search: e.target.value })}
        placeholder="Search courses or skills…"
        className="w-full px-3 py-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select
          value={filters.domain || ''}
          onChange={e => onChange({ ...filters, domain: e.target.value || undefined })}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Domains</option>
          {domains.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={filters.level || ''}
          onChange={e => onChange({ ...filters, level: e.target.value || undefined })}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Levels</option>
          {LEVELS.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.certificateAvailable || false}
            onChange={e => onChange({ ...filters, certificateAvailable: e.target.checked })}
          />
          Certificate available
        </label>
      </div>
    </section>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
