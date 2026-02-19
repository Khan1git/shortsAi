"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getIntegrations, disconnectYoutube, getYoutubeConnectUrl } from "@/lib/api/integrations"
import type { Integration, PlatformRow } from "@/types/integrations"

const PLATFORM_ROWS: PlatformRow[] = [
  { id: "youtube", name: "YouTube", connected: false, handle: null, thumbnail: null },
  { id: "tiktok", name: "TikTok", connected: false, handle: null, thumbnail: null },
  { id: "instagram", name: "Instagram", connected: false, handle: null, thumbnail: null },
  { id: "facebook", name: "Facebook", connected: false, handle: null, thumbnail: null },
]

export function PlatformConnectionsCard() {
  const searchParams = useSearchParams()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [disconnecting, setDisconnecting] = useState<string | null>(null)
  const youtubeStatus = searchParams.get("youtube")
  const youtubeMessage = searchParams.get("message")

  useEffect(() => {
    let cancelled = false
    getIntegrations()
      .then((data) => {
        if (!cancelled) setIntegrations(data)
      })
      .catch(() => {
        if (!cancelled) setIntegrations([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const youtube = integrations.find((c) => c.platform === "youtube")
  const rows: PlatformRow[] = PLATFORM_ROWS.map((row) =>
    row.id === "youtube"
      ? {
          ...row,
          connected: !!youtube,
          handle: youtube?.channelTitle ?? null,
          thumbnail: youtube?.channelThumbnail ?? null,
        }
      : row
  )

  async function handleYoutubeAction() {
    if (youtube) {
      setDisconnecting("youtube")
      try {
        await disconnectYoutube()
        setIntegrations((prev) => prev.filter((c) => c.platform !== "youtube"))
      } finally {
        setDisconnecting(null)
      }
    } else {
      window.location.href = getYoutubeConnectUrl()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Platform Connections</CardTitle>
        <CardDescription>Connect your social media accounts via OAuth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {youtubeStatus === "connected" && (
          <div className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
            YouTube connected successfully.
          </div>
        )}
        {youtubeStatus === "error" && youtubeMessage && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {decodeURIComponent(youtubeMessage)}
          </div>
        )}
        {rows.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3">
              {platform.connected ? (
                <CheckCircle2 className="size-5 text-success shrink-0" />
              ) : (
                <XCircle className="size-5 text-muted-foreground shrink-0" />
              )}
              {platform.thumbnail && (
                <img
                  src={platform.thumbnail}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{platform.name}</p>
                {platform.handle && (
                  <p className="text-xs text-muted-foreground">{platform.handle}</p>
                )}
              </div>
            </div>
            {platform.id === "youtube" ? (
              <Button
                variant={platform.connected ? "outline" : "default"}
                size="sm"
                disabled={disconnecting === "youtube"}
                onClick={handleYoutubeAction}
              >
                {disconnecting === "youtube" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : platform.connected ? (
                  "Disconnect"
                ) : (
                  "Connect"
                )}
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Coming soon
              </Button>
            )}
          </div>
        ))}
        {loading && (
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Loading connections…
          </p>
        )}
      </CardContent>
    </Card>
  )
}
