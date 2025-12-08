// Vercel Serverless Function
import { mockCourses } from './mockData'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const domains = new Set()
  const subdomains = new Set()
  
  mockCourses.forEach(c => {
    if (c.domain) domains.add(c.domain)
    if (c.subdomain) subdomains.add(c.subdomain)
  })

  res.status(200).json({ 
    domains: Array.from(domains), 
    subdomains: Array.from(subdomains) 
  })
}
