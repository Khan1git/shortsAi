/**
 * Public shape of a platform connection (returned by API, used in UI).
 * Server-side full type is in lib/platform-connections.ts
 */
export type Integration = {
  platform: string
  platformUserId: string
  channelTitle: string | null
  channelThumbnail: string | null
  connectedAt: string
}

export type PlatformRow = {
  id: string
  name: string
  connected: boolean
  handle: string | null
  thumbnail: string | null
}
