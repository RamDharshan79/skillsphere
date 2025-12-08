import { google } from 'googleapis'

function getJwtClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  return new google.auth.JWT(email, undefined, key, [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ])
}

export async function readCoursesFromSheet() {
  const auth = getJwtClient()
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.SHEET_ID
  const range = process.env.SHEET_RANGE || 'Courses!A2:I'

  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range })
  const rows = resp.data.values || []

  const header = ['title','domain','subdomain','level','duration','certificateAvailable','platformName','courseURL','isFeatured']
  const courses = []
  for (const row of rows) {
    const obj = {}
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = row[i] ?? ''
    }
    obj.certificateAvailable = String(obj.certificateAvailable).toLowerCase() === 'true'
    obj.isFeatured = String(obj.isFeatured).toLowerCase() === 'true'
    courses.push(obj)
  }
  return courses
}
