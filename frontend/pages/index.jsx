import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchFilters'
import DomainGrid from '../components/DomainGrid'
import FeaturedCourseRow from '../components/FeaturedCourseRow'
import CourseList from '../components/CourseList'
import CourseDetailModal from '../components/CourseDetailModal'
import { useCourses } from '../hooks/useCourses'

export default function HomePage() {
  const [dark, setDark] = useState(false)
  const [filters, setFilters] = useState({ search: '', domain: undefined, level: undefined, certificateAvailable: false })
  const [domains, setDomains] = useState([])
  const { courses, loading, error } = useCourses()
  const [featured, setFeatured] = useState([])
  const [modalCourse, setModalCourse] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    // Populate domains list based on existing data
    const domainSet = new Set()
    courses.forEach(c => { if (c.domain) domainSet.add(c.domain) })
    setDomains(Array.from(domainSet))
    setFeatured(courses.filter(c => c.isTopThisWeek).slice(0, 10))
  }, [courses])

  const filtered = useMemo(() => {
    let items = [...courses]
    const q = (filters.search || '').toLowerCase()
    if (q) {
      items = items.filter(c => (
        (c.title || '').toLowerCase().includes(q) ||
        (c.provider || '').toLowerCase().includes(q)
      ))
    }
    if (filters.domain) items = items.filter(c => c.domain === filters.domain)
    if (filters.level) items = items.filter(c => c.level === filters.level)
    if (filters.certificateAvailable) items = items.filter(c => !!c.certificateAvailable)
    return items
  }, [courses, filters])

  return (
    <div>
      <Header onToggleTheme={() => setDark(v => !v)} />
      <SearchFilters filters={filters} onChange={setFilters} domains={domains} />
      <DomainGrid domains={domains} onSelect={d => setFilters(f => ({ ...f, domain: d }))} />
      <FeaturedCourseRow courses={featured} onOpen={setModalCourse} />
      <CourseList courses={filtered} loading={loading} error={error} onOpen={setModalCourse} />
      <CourseDetailModal course={modalCourse} onClose={() => setModalCourse(null)} />
    </div>
  )
}
