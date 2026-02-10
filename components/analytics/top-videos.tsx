import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topVideos = [
  { title: "Budget Travel Hacks 2026", views: "45.1K", engagement: "8.2%", platform: "TikTok" },
  { title: "How to Learn Any Language Fast", views: "22.3K", engagement: "6.7%", platform: "YouTube" },
  { title: "5 AI Tools You Need in 2026", views: "12.4K", engagement: "7.1%", platform: "TikTok" },
  { title: "Why Sleep Matters More Than Diet", views: "8.2K", engagement: "5.9%", platform: "Facebook" },
  { title: "3-Minute Abs Workout", views: "6.8K", engagement: "9.4%", platform: "Instagram" },
]

export function TopVideos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          Top Performing Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topVideos.map((video, i) => (
          <div key={video.title} className="flex items-center gap-3">
            <span className="text-sm font-bold text-muted-foreground w-5 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{video.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{video.views} views</span>
                <span className="text-xs text-muted-foreground">{video.engagement} engagement</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">{video.platform}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
