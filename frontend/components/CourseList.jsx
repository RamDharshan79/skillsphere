import CourseCard from './CourseCard'

export default function CourseList({ courses, loading, error, onOpen }) {
  if (loading) return (
    <div className="px-6 py-16 text-center">
      <div className="inline-block w-8 h-8 border-4 border-[#c8a96a] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[#7a869a]">Loading courses...</p>
    </div>
  )
  
  if (error) return (
    <div className="px-6 py-16 text-center">
      <p className="text-red-400">Failed to load courses. Please try again.</p>
    </div>
  )
  
  if (!courses.length) return (
    <div className="px-6 py-16 text-center">
      <p className="text-[#7a869a]">No courses found. Try adjusting your filters.</p>
    </div>
  )
  
  return (
    <section id="courses" className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          All <span className="text-[#c8a96a]">Courses</span>
        </h2>
        <p className="text-[#7a869a]">{courses.length} courses available</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
