import { CheckCircle2, XCircle, ExternalLink } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const platforms = [
  {
    name: "TikTok",
    handle: "@clipforge_ai",
    connected: true,
    followers: "24.5K",
    totalViews: "1.2M",
    videosPosted: 312,
    color: "bg-foreground text-background",
  },
  {
    name: "Instagram Reels",
    handle: "@clipforge.studio",
    connected: true,
    followers: "18.2K",
    totalViews: "890K",
    videosPosted: 284,
    color: "bg-pink-500 text-pink-50",
  },
  {
    name: "YouTube Shorts",
    handle: "ClipForge AI",
    connected: true,
    followers: "9.8K",
    totalViews: "456K",
    videosPosted: 156,
    color: "bg-red-500 text-red-50",
  },
  {
    name: "Facebook",
    handle: null,
    connected: false,
    followers: "-",
    totalViews: "-",
    videosPosted: 0,
    color: "bg-blue-600 text-blue-50",
  },
]

export default function PlatformsPage() {
  return (
    <>
      <DashboardHeader title="Platforms" breadcrumbs={[{ label: "Platforms" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Platforms</h1>
          <p className="text-sm text-muted-foreground">Manage your connected social media accounts</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {platforms.map((platform) => (
            <Card key={platform.name}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`${platform.color} px-2.5 py-1`}>{platform.name.charAt(0)}</Badge>
                    <div>
                      <CardTitle className="text-base text-foreground">{platform.name}</CardTitle>
                      {platform.handle && (
                        <CardDescription className="text-xs">{platform.handle}</CardDescription>
                      )}
                    </div>
                  </div>
                  {platform.connected ? (
                    <Badge variant="outline" className="gap-1 text-success border-success/30">
                      <CheckCircle2 className="size-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 text-muted-foreground">
                      <XCircle className="size-3" />
                      Not Connected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {platform.connected ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{platform.followers}</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{platform.totalViews}</p>
                        <p className="text-xs text-muted-foreground">Total Views</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{platform.videosPosted}</p>
                        <p className="text-xs text-muted-foreground">Videos</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <ExternalLink className="mr-1.5 size-3" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
                        Disconnect
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button className="w-full">
                    Connect {platform.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
