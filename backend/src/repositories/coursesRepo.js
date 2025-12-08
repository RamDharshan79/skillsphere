import { db } from '../firebaseAdmin.js'

function toCourse(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    title: data.title || '',
    domain: data.domain || '',
    subdomain: data.subdomain || '',
    level: data.level || '',
    duration: data.duration || '',
    certificateAvailable: !!data.certificateAvailable,
    platformName: data.platformName || '',
    courseURL: data.courseURL || '',
    isFeatured: !!data.isFeatured
  }
}

export async function getCourses({ search, domain, level, certificateAvailable }) {
  let ref = db.collection('courses')

  // Apply at most one equality filter in Firestore to avoid composite index requirements
  if (domain) {
    ref = ref.where('domain', '==', domain)
  } else if (level) {
    ref = ref.where('level', '==', level)
  } else if (typeof certificateAvailable === 'boolean') {
    ref = ref.where('certificateAvailable', '==', certificateAvailable)
  }

  const snap = await ref.get()
  let items = snap.docs.map(toCourse)

  if (domain) items = items.filter(c => c.domain === domain)
  if (level) items = items.filter(c => c.level === level)
  if (typeof certificateAvailable === 'boolean') items = items.filter(c => c.certificateAvailable === certificateAvailable)

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(c =>
      (c.title || '').toLowerCase().includes(q) ||
      (c.domain || '').toLowerCase().includes(q) ||
      (c.subdomain || '').toLowerCase().includes(q)
    )
  }

  return items
}

export async function getFeatured() {
  const snap = await db.collection('courses').where('isFeatured', '==', true).get()
  return snap.docs.map(toCourse)
}

export async function getDomains() {
  const snap = await db.collection('courses').get()
  const domains = new Set()
  const subdomains = new Set()
  snap.forEach(doc => {
    const d = doc.get('domain')
    const s = doc.get('subdomain')
    if (d) domains.add(d)
    if (s) subdomains.add(s)
  })
  return { domains: Array.from(domains), subdomains: Array.from(subdomains) }
}

export async function upsertCourse(course, docId) {
  const id = docId || course.id
  const ref = id ? db.collection('courses').doc(id) : db.collection('courses').doc()
  const payload = { ...course }
  delete payload.id
  await ref.set(payload, { merge: true })
  return { id: ref.id }
}
