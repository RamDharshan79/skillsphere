import 'dotenv/config'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import '../src/firebaseAdmin.js'
import { upsertCourse } from '../src/repositories/coursesRepo.js'
import { computeDocId } from '../src/utils/computeDocId.js'

// Usage: node scripts/uploadCsv.js path/to/your/courses.csv

const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Please provide CSV file path: node scripts/uploadCsv.js <path-to-csv>')
  process.exit(1)
}

const content = fs.readFileSync(csvPath, 'utf-8')

// Parse CSV - your file has columns: TITLE,DOMAIN,SUBDOMAIN,LEVEL,DURATION,URL
const records = parse(content, {
  columns: ['TITLE', 'DOMAIN', 'SUBDOMAIN', 'LEVEL', 'DURATION', 'URL'],
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true, // Handle rows with missing columns
  from_line: 2 // Skip the header row
})

console.log(`Found ${records.length} courses in CSV`)

// Normalize level values
function normalizeLevel(level) {
  const l = String(level || '').toLowerCase().trim()
  if (l.includes('beginner') || l.includes('begin')) return 'Beginner'
  if (l.includes('intermediate') || l.includes('inter')) return 'Intermediate'
  if (l.includes('advance') || l.includes('advanced')) return 'Advanced'
  return 'Beginner'
}

// Extract platform name from URL
function extractPlatform(url) {
  if (!url) return 'Unknown'
  if (url.includes('coursera')) return 'Coursera'
  if (url.includes('swayam')) return 'SWAYAM'
  if (url.includes('udemy')) return 'Udemy'
  if (url.includes('edx')) return 'edX'
  return 'Online Platform'
}

// Map your CSV columns to the expected format
function mapCourse(row) {
  const url = (row.URL || '').trim()
  const title = (row.TITLE || row.SUBDOMAIN || '').trim()
  const domain = (row.DOMAIN || '').trim()
  
  return {
    title: title,
    domain: domain || 'General',
    subdomain: (row.SUBDOMAIN || '').trim(),
    level: normalizeLevel(row.LEVEL),
    duration: (row.DURATION || '').trim(),
    certificateAvailable: true, // Assume all courses offer certificates
    platformName: extractPlatform(url),
    courseURL: url,
    isFeatured: false
  }
}

async function upload() {
  let success = 0
  let failed = 0

  for (const row of records) {
    try {
      const course = mapCourse(row)
      
      if (!course.courseURL) {
        console.warn(`Skipping row without URL: ${course.title}`)
        failed++
        continue
      }

      const docId = computeDocId(course.courseURL)
      await upsertCourse(course, docId)
      success++
      
      if (success % 10 === 0) {
        console.log(`Uploaded ${success}/${records.length}...`)
      }
    } catch (err) {
      console.error(`Failed to upload: ${row.title || 'unknown'}`, err.message)
      failed++
    }
  }

  console.log(`\nComplete! Success: ${success}, Failed: ${failed}`)
  process.exit(0)
}

upload()
