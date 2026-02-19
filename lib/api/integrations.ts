import type { Integration } from "@/types/integrations"

export async function getIntegrations(): Promise<Integration[]> {
  const res = await fetch("/api/integrations")
  if (!res.ok) throw new Error("Failed to fetch integrations")
  const data = await res.json()
  return data.connections ?? []
}

export async function disconnectYoutube(): Promise<void> {
  const res = await fetch("/api/integrations/youtube/disconnect", { method: "POST" })
  if (!res.ok) throw new Error("Failed to disconnect YouTube")
}

export function getYoutubeConnectUrl(): string {
  return "/api/integrations/youtube/connect"
}
