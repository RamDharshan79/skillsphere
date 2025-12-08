import { Router } from 'express'
import { getCourses, getFeatured, getDomains } from '../repositories/coursesRepo.js'
import { normalizeString, parseBoolean } from '../utils/parseQuery.js'

const router = Router()

router.get('/courses', async (req, res) => {
  try {
    const search = normalizeString(req.query.search)
    const domain = normalizeString(req.query.domain)
    const level = normalizeString(req.query.level)
    const certificateAvailable = parseBoolean(req.query.certificateAvailable)

    const items = await getCourses({ search, domain, level, certificateAvailable })
    res.json({ courses: items })
  } catch (e) {
    res.status(500).json({ error: 'Failed to load courses' })
  }
})

router.get('/courses/featured', async (req, res) => {
  try {
    const items = await getFeatured()
    res.json({ courses: items })
  } catch (e) {
    res.status(500).json({ error: 'Failed to load featured courses' })
  }
})

router.get('/domains', async (req, res) => {
  try {
    const data = await getDomains()
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: 'Failed to load domains' })
  }
})

export default router
