// BEGIN CUSTOMIZABLE SECTION (styles)
// Fetch courses from Firestore client-side
// TODO: import data from Google Sheets and push into Firestore
import { useEffect, useState } from 'react'
import { firestore } from '../lib/firebaseConfig'
import { collection, onSnapshot, query } from 'firebase/firestore'

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!firestore) {
      setError('Firebase is not configured. Add keys to frontend/.env.local.')
      setLoading(false)
      return
    }
    const q = query(collection(firestore, 'courses'))
    const unsub = onSnapshot(q, {
      next: snap => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setCourses(list)
        setLoading(false)
      },
      error: () => {
        setError('Failed to load courses')
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  return { courses, loading, error }
}
// END CUSTOMIZABLE SECTION
