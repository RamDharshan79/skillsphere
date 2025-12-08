import { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchFilters'
import DomainGrid from '../components/DomainGrid'
import FeaturedCourseRow from '../components/FeaturedCourseRow'
import CourseList from '../components/CourseList'
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
    <div>
      <Header onToggleTheme={() => setDark(v => !v)} />
      <SearchFilters filters={filters} onChange={setFilters} domains={domains} />
      <DomainGrid domains={domains} onSelect={d => setFilters(f => ({ ...f, domain: d }))} />
      <FeaturedCourseRow courses={featured} onOpen={setModalCourse} />
      <CourseList courses={courses} loading={loading} error={error} onOpen={setModalCourse} />
      <CourseDetailModal course={modalCourse} onClose={() => setModalCourse(null)} />
    </div>
  )
}
