import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const project_id = process.env.FIREBASE_PROJECT_ID
const client_email = process.env.FIREBASE_CLIENT_EMAIL
const private_key = `-----BEGIN RSA PRIVATE KEY-----
${process.env.AP_PRIVATE_KEY}
-----END RSA PRIVATE KEY-----`

const db = getFirestore(initializeApp({
  credential: cert({
    project_id,
    client_email,
    private_key,
  }),
}))

export const handlePayload = async (payload, sender) => {
  await db.collection('inbox').add({
    sender: sender.id,
    received: new Date(),
    payload,
  })
}
