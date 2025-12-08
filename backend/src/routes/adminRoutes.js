import { Router } from 'express'
import { upsertCourse } from '../repositories/coursesRepo.js'
import { readCoursesFromSheet } from '../sheetsSync.js'
import { computeDocId } from '../utils/computeDocId.js'

const router = Router()

function requireAdmin(req, res, next) {
  const secret = req.headers['x-admin-secret']
  if (!process.env.ADMIN_SYNC_SECRET || secret !== process.env.ADMIN_SYNC_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

router.post('/sync-courses-from-sheet', requireAdmin, async (req, res) => {
  try {
    const courses = await readCoursesFromSheet()
    for (const course of courses) {
      const id = computeDocId(course.courseURL)
      await upsertCourse(course, id)
    }
    res.json({ synced: courses.length })
  } catch (e) {
    res.status(500).json({ error: 'Sync failed' })
  }
})

export default router
