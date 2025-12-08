// BEGIN CUSTOMIZABLE SECTION (styles)
export default function CourseCard({ course, onOpen }) {
  return (
    <div className="p-4 border rounded">
      <div className="font-semibold">{course.title}</div>
      <div className="text-sm text-gray-500">{course.provider}</div>
      <div className="text-sm mt-1">{course.domain}{course.subdomain ? ` • ${course.subdomain}` : ''}</div>
      <div className="text-sm">{course.level} • {course.duration}</div>
      <div className="text-sm">Certificate: {course.certificateAvailable ? 'Yes' : 'No'}</div>
      {course.isTopThisWeek ? (
        <div className="text-xs mt-1 inline-block px-2 py-1 border rounded">Top free of the week</div>
      ) : null}
      <div className="mt-3 flex gap-2">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 border rounded"
        >Go to Course</a>
        <button className="px-3 py-2 border rounded" onClick={() => onOpen(course)}>Details</button>
      </div>
    </div>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
