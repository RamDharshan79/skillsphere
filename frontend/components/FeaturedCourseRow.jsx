// BEGIN CUSTOMIZABLE SECTION (styles)
export default function FeaturedCourseRow({ courses, onOpen }) {
  return (
    <section className="px-6 py-6 border-t">
      <h2 className="text-lg font-medium mb-3">Top Free Courses of the Week</h2>
      <div className="flex gap-3 overflow-x-auto">
        {courses.map(c => (
          <div key={c.id} className="min-w-[260px] p-4 border rounded">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-500">{c.platformName}</div>
            <button
              className="mt-3 px-3 py-2 border rounded"
              onClick={() => onOpen(c)}
            >Details</button>
          </div>
        ))}
      </div>
    </section>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
