// BEGIN CUSTOMIZABLE SECTION (styles)
import CourseCard from './CourseCard'

export default function CourseList({ courses, loading, error, onOpen }) {
  if (loading) return <div className="px-6 py-4">Loading courses…</div>
  if (error) return <div className="px-6 py-4">Failed to load courses.</div>
  if (!courses.length) return <div className="px-6 py-4">No courses found.</div>
  return (
    <section className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(c => (
        <CourseCard key={c.id} course={c} onOpen={onOpen} />
      ))}
    </section>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
