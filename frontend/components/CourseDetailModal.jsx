export default function CourseDetailModal({ course, onClose }) {
  if (!course) return null
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="glass-card w-full max-w-2xl rounded-2xl p-8 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[#c8a96a] font-medium">{course.platformName}</span>
              <span className="text-xs px-2 py-1 rounded bg-[#c8a96a]/20 text-[#c8a96a]">{course.level}</span>
            </div>
          </div>
          <button 
            aria-label="Close"
            className="text-[#7a869a] hover:text-[#f7f5ef] transition-colors ml-4 rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[hsl(38,92%,50%)]"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#c8a96a] to-[#203a5c] mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-[#7a869a] mb-1">Domain</p>
            <p className="font-medium">{course.domain}</p>
          </div>
          {course.subdomain && (
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-[#7a869a] mb-1">Subdomain</p>
              <p className="font-medium">{course.subdomain}</p>
            </div>
          )}
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-[#7a869a] mb-1">Level</p>
            <p className="font-medium">{course.level}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-[#7a869a] mb-1">Duration</p>
            <p className="font-medium">{course.duration}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-[#7a869a] mb-1">Certificate</p>
            <p className="font-medium">{course.certificateAvailable ? '✓ Available' : '✗ Not Available'}</p>
          </div>
        </div>
        
        <a
          href={course.courseURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center block flex items-center justify-center gap-2"
        >
          <span>Start Learning Now</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h5m0 0v5m0-5L10 17" />
          </svg>
        </a>
      </div>
    </div>
  )
}
