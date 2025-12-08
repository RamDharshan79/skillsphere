import admin from 'firebase-admin'

const projectId = process.env.FIREBASE_PROJECT_ID || 'skillsphere-47611'
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined

if (!admin.apps.length) {
  if (clientEmail && privateKey) {
    // Use service account credentials from environment
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    })
  } else {
    // Use default credentials (for local development with gcloud auth)
    admin.initializeApp({
      projectId
    })
  }
}

export const db = admin.firestore()