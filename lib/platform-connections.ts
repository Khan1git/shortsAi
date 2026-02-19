import { getAdminFirestore } from "@/lib/firebase-admin"
import type { Timestamp } from "firebase-admin/firestore"

const COLLECTION = "platformConnections"

export type PlatformConnection = {
  userId: string
  platform: string
  platformUserId: string
  accessToken: string
  refreshToken: string
  tokenExpiresAt: number | null
  channelTitle: string | null
  channelThumbnail: string | null
  connectedAt: Date
}

export type PlatformConnectionPublic = {
  platform: string
  platformUserId: string
  channelTitle: string | null
  channelThumbnail: string | null
  connectedAt: string
}

function docId(userId: string, platform: string) {
  return `${userId}_${platform}`
}

function toPublic(conn: PlatformConnection): PlatformConnectionPublic {
  return {
    platform: conn.platform,
    platformUserId: conn.platformUserId,
    channelTitle: conn.channelTitle,
    channelThumbnail: conn.channelThumbnail,
    connectedAt: conn.connectedAt.toISOString(),
  }
}

export async function getConnection(
  userId: string,
  platform: string
): Promise<PlatformConnection | null> {
  const db = getAdminFirestore()
  const snap = await db.collection(COLLECTION).doc(docId(userId, platform)).get()
  if (!snap.exists) return null
  const d = snap.data()!
  const connectedAt = d.connectedAt as Timestamp
  return {
    userId: d.userId as string,
    platform: d.platform as string,
    platformUserId: d.platformUserId as string,
    accessToken: d.accessToken as string,
    refreshToken: d.refreshToken as string,
    tokenExpiresAt: (d.tokenExpiresAt as number) ?? null,
    channelTitle: (d.channelTitle as string) ?? null,
    channelThumbnail: (d.channelThumbnail as string) ?? null,
    connectedAt: connectedAt?.toDate?.() ?? new Date(d.connectedAt),
  }
}

export async function setConnection(conn: Omit<PlatformConnection, "connectedAt"> & { connectedAt?: Date }) {
  const db = getAdminFirestore()
  const id = docId(conn.userId, conn.platform)
  await db.collection(COLLECTION).doc(id).set({
    userId: conn.userId,
    platform: conn.platform,
    platformUserId: conn.platformUserId,
    accessToken: conn.accessToken,
    refreshToken: conn.refreshToken,
    tokenExpiresAt: conn.tokenExpiresAt ?? null,
    channelTitle: conn.channelTitle ?? null,
    channelThumbnail: conn.channelThumbnail ?? null,
    connectedAt: conn.connectedAt ?? new Date(),
  })
}

export async function deleteConnection(userId: string, platform: string): Promise<void> {
  const db = getAdminFirestore()
  await db.collection(COLLECTION).doc(docId(userId, platform)).delete()
}

export async function listConnectionsPublic(userId: string): Promise<PlatformConnectionPublic[]> {
  const db = getAdminFirestore()
  const snap = await db.collection(COLLECTION).where("userId", "==", userId).get()
  const out: PlatformConnectionPublic[] = []
  snap.docs.forEach((doc) => {
    const d = doc.data()
    const connectedAt = d.connectedAt as Timestamp
    out.push(toPublic({
      userId: d.userId as string,
      platform: d.platform as string,
      platformUserId: d.platformUserId as string,
      accessToken: "",
      refreshToken: "",
      tokenExpiresAt: (d.tokenExpiresAt as number) ?? null,
      channelTitle: (d.channelTitle as string) ?? null,
      channelThumbnail: (d.channelThumbnail as string) ?? null,
      connectedAt: connectedAt?.toDate?.() ?? new Date(),
    }))
  })
  return out
}
