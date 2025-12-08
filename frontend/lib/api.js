const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

export async function getCourses(params = {}) {
  const q = new URLSearchParams()
  if (params.search) q.set('search', params.search)
  if (params.domain) q.set('domain', params.domain)
  if (params.level) q.set('level', params.level)
  if (typeof params.certificateAvailable === 'boolean') q.set('certificateAvailable', String(params.certificateAvailable))
  const res = await fetch(`${BASE_URL}/api/courses?${q.toString()}`)
  if (!res.ok) throw new Error('Failed to load courses')
  return res.json()
}

export async function getFeaturedCourses() {
  const res = await fetch(`${BASE_URL}/api/courses/featured`)
  if (!res.ok) throw new Error('Failed to load featured courses')
  return res.json()
}

export async function getDomains() {
  const res = await fetch(`${BASE_URL}/api/domains`)
  if (!res.ok) throw new Error('Failed to load domains')
  return res.json()
}
