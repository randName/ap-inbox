import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const projectId = process.env.FIREBASE_PROJECT_ID
const db = getFirestore(initializeApp({
  projectId,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${projectId}.firebaseapp.com`,
}))

export const handlePayload = async (payload, sender) => {
  await signInAnonymously(getAuth())
  await addDoc(collection(db, 'inbox'), {
    sender: sender.id,
    received: new Date(),
    payload,
  })
}
