import * as admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

function getAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.app()
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  if (!privateKey || !clientEmail || !projectId) {
    const missing = [
      !privateKey && "FIREBASE_ADMIN_PRIVATE_KEY",
      !clientEmail && "FIREBASE_ADMIN_CLIENT_EMAIL",
      !projectId && "FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    ].filter(Boolean)
    throw new Error(`Missing Firebase Admin env: ${missing.join(", ")}`)
  }
  if (typeof privateKey === "string" && privateKey.includes("\\n") && !privateKey.includes("\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n")
  }
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getAdminFirestore() {
  return getFirestore(getAdminApp())
}

export async function verifyIdToken(token: string) {
  const app = getAdminApp()
  const auth = getAuth(app)
  return auth.verifyIdToken(token)
}
