// BEGIN CUSTOMIZABLE SECTION (styles)
export default function CourseDetailModal({ course, onClose }) {
  if (!course) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <button className="px-2 py-1 border rounded" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-1 text-sm">
          <div>Provider: {course.provider}</div>
          <div>Domain: {course.domain}</div>
          {course.subdomain ? <div>Subdomain: {course.subdomain}</div> : null}
          <div>Level: {course.level}</div>
          <div>Duration: {course.duration}</div>
          <div>Certificate: {course.certificateAvailable ? 'Yes' : 'No'}</div>
        </div>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-3 py-2 border rounded"
        >Start Learning (Redirect)</a>
      </div>
    </div>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
