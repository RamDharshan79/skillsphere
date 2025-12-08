// BEGIN CUSTOMIZABLE SECTION (styles)
// Configure Firebase Web SDK here. DO NOT hardcode secrets.
// Put keys in frontend/.env.local as NEXT_PUBLIC_FIREBASE_*
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const required = ['apiKey','authDomain','projectId','appId']
const isConfigured = required.every(k => firebaseConfig[k] && String(firebaseConfig[k]).length > 0)

let appInstance = null
if (isConfigured) {
  appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export const app = appInstance
export const firestore = appInstance ? getFirestore(appInstance) : null
// END CUSTOMIZABLE SECTION
