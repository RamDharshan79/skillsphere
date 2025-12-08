import express, { Router } from 'express'
import { upsertCourse } from '../repositories/coursesRepo.js'
import { readCoursesFromSheet } from '../sheetsSync.js'
import { computeDocId } from '../utils/computeDocId.js'
import { db } from '../firebaseAdmin.js'
import { parse } from 'csv-parse/sync'

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

// Upload CSV and import into Firestore 'courses' collection
// Expected headers: title,provider,domain,subdomain,level,duration,certificateAvailable,url,isTopThisWeek,updatedAt
router.post('/upload-courses-csv', requireAdmin, express.text({ type: [ 'text/csv', 'text/plain' ] }), async (req, res) => {
  try {
    const csv = req.body || ''
    const rows = parse(csv, { columns: true, skip_empty_lines: true, bom: true, trim: true })
    let count = 0
    for (const r of rows) {
      const course = {
        title: r.title || '',
        platformName: (r.provider || r.platformName || '').trim(),
        domain: r.domain || '',
        subdomain: r.subdomain || '',
        level: r.level || '',
        duration: r.duration || '',
        certificateAvailable: String(r.certificateAvailable).toLowerCase() === 'true',
        courseURL: (r.url || r.courseURL || '').trim(),
        isTopThisWeek: String(r.isTopThisWeek).toLowerCase() === 'true',
        updatedAt: r.updatedAt ? new Date(r.updatedAt) : new Date()
      }
      if (!course.courseURL) continue
      const id = computeDocId(course.courseURL)
      await db.collection('courses').doc(id).set(course, { merge: true })
      count++
    }
    res.json({ imported: count })
  } catch (e) {
    res.status(500).json({ error: 'CSV import failed' })
  }
})

export default router
