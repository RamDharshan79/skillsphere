export default function FeaturedCourseRow({ courses, onOpen }) {
  if (!courses.length) return null
  
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="text-[#c8a96a]">Featured</span> Courses
        </h2>
        <p className="text-[#7a869a]">Top picks curated by our mentors</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {courses.map(c => (
          <div key={c.id} className="card-premium min-w-[300px] p-6 flex-shrink-0">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#c8a96a] to-[#203a5c] mb-4"></div>
            <div className="flex gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded bg-[#c8a96a]/20 text-[#c8a96a]">{c.level}</span>
              <span className="text-xs px-2 py-1 rounded bg-white/5 text-[#7a869a]">{c.domain}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-[#7a869a] mb-4">{c.platformName}</p>
            <button
              className="btn-outline w-full text-sm"
              onClick={() => onOpen(c)}
            >View Details</button>
          </div>
        ))}
      </div>
    </section>
  )
}
