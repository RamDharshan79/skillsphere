// Vercel Serverless Function
import { mockCourses } from './mockData'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const featured = mockCourses.filter(c => c.isFeatured)
  res.status(200).json({ courses: featured })
}
