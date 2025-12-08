export default function CourseCard({ course, onOpen }) {
  return (
    <div className="card-premium p-6 flex flex-col">
      <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#c8a96a] to-[#203a5c] mb-4"></div>
      
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="text-xs px-2 py-1 rounded bg-[#c8a96a]/20 text-[#c8a96a]">{course.level}</span>
        <span className="text-xs px-2 py-1 rounded bg-white/5 text-[#7a869a]">{course.domain}</span>
        {course.certificateAvailable && (
          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Certificate</span>
        )}
      </div>
      
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
      <p className="text-sm text-[#7a869a] mb-2">{course.platformName}</p>
      {course.subdomain && (
        <p className="text-xs text-[#7a869a] mb-2">{course.subdomain}</p>
      )}
      <p className="text-sm text-[#7a869a] mb-4">{course.duration}</p>
      
      <div className="mt-auto flex gap-2">
        <a
          href={course.courseURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 text-center text-sm"
        >Start Learning</a>
        <button 
          className="btn-outline text-sm px-4"
          onClick={() => onOpen(course)}
        >Info</button>
      </div>
    </div>
  )
}
