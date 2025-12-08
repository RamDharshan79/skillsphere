// Vercel Serverless Function
import { mockCourses } from './mockData'

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { search, domain, level, certificateAvailable } = req.query

  let items = [...mockCourses]

  // Apply filters
  if (domain) items = items.filter(c => c.domain === domain)
  if (level) items = items.filter(c => c.level === level)
  if (certificateAvailable === 'true') items = items.filter(c => c.certificateAvailable === true)

  // Apply search
  if (search) {
    const q = search.toLowerCase()
    items = items.filter(c =>
      (c.title || '').toLowerCase().includes(q) ||
      (c.domain || '').toLowerCase().includes(q) ||
      (c.subdomain || '').toLowerCase().includes(q)
    )
  }

  res.status(200).json({ courses: items })
}
