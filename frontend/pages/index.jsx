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
import Footer from '../components/Footer'

export default function HomePage() {
  const [dark, setDark] = useState(false)
  const [filters, setFilters] = useState({ search: '', domain: undefined, level: undefined })
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
    getDomains()
      .then(d => {
        console.log('Domains:', d)
        setDomains(d.domains || [])
      })
      .catch((err) => console.error('Domains Error:', err))
    
    getFeaturedCourses()
      .then(r => {
        console.log('Featured:', r)
        setFeatured(r.courses || [])
      })
      .catch((err) => console.error('Featured Error:', err))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    getCourses(filters)
      .then(r => {
        console.log('API Response:', r)
        setCourses(r.courses || [])
      })
      .catch((err) => {
        console.error('API Error:', err)
        setError('Failed')
      })
      .finally(() => setLoading(false))
  }, [filters.search, filters.domain, filters.level])

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={() => setDark(v => !v)} />
      <SearchFilters filters={filters} onChange={setFilters} domains={domains} />
      <WhySection />
      <DomainGrid domains={domains} onSelect={d => setFilters(f => ({ ...f, domain: d }))} />
      <FeaturedCourseRow courses={featured} onOpen={setModalCourse} />
      <CourseList courses={courses} loading={loading} error={error} onOpen={setModalCourse} />
      <ImpactSection />
      <Footer />
      <CourseDetailModal course={modalCourse} onClose={() => setModalCourse(null)} />
    </div>
  )
}
