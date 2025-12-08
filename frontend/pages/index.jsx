import { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchFilters'
import WhySection from '../components/WhySection'
import DomainGrid from '../components/DomainGrid'
import FeaturedCourseRow from '../components/FeaturedCourseRow'
import CourseList from '../components/CourseList'
import ImpactSection from '../components/ImpactSection'
import CourseDetailModal from '../components/CourseDetailModal'
import { getCourses, getDomains, getFeaturedCourses } from '../lib/api'

export default function HomePage() {
  const [dark, setDark] = useState(false)
  const [filters, setFilters] = useState({ search: '', domain: undefined, level: undefined, certificateAvailable: false })
  const [domains, setDomains] = useState([])
  const [featured, setFeatured] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [modalCourse, setModalCourse] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    getDomains().then(d => setDomains(d.domains || [])).catch(() => {})
    getFeaturedCourses().then(r => setFeatured(r.courses || [])).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    getCourses(filters)
      .then(r => setCourses(r.courses || []))
      .catch(() => setError('Failed'))
      .finally(() => setLoading(false))
  }, [filters.search, filters.domain, filters.level, filters.certificateAvailable])

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={() => setDark(v => !v)} />
      <SearchFilters filters={filters} onChange={setFilters} domains={domains} />
      <WhySection />
      <DomainGrid domains={domains} onSelect={d => setFilters(f => ({ ...f, domain: d }))} />
      <FeaturedCourseRow courses={featured} onOpen={setModalCourse} />
      <CourseList courses={courses} loading={loading} error={error} onOpen={setModalCourse} />
      <ImpactSection />
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(195,86%,51%)] flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold">Skillsphere Clarity</span>
          </div>
          <p className="opacity-60">© {new Date().getFullYear()} Skillsphere. All rights reserved.</p>
        </div>
      </footer>
      <CourseDetailModal course={modalCourse} onClose={() => setModalCourse(null)} />
    </div>
  )
}
