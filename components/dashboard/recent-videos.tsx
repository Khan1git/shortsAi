import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const videos = [
  {
    id: "v-001",
    title: "5 AI Tools You Need in 2026",
    platform: "TikTok",
    status: "posted",
    date: "Feb 10, 2026",
    views: "12.4K",
  },
  {
    id: "v-002",
    title: "Morning Routine for Productivity",
    platform: "Instagram",
    status: "scheduled",
    date: "Feb 11, 2026",
    views: "-",
  },
  {
    id: "v-003",
    title: "Quick Python Tips #42",
    platform: "YouTube",
    status: "rendering",
    date: "Feb 10, 2026",
    views: "-",
  },
  {
    id: "v-004",
    title: "Why Sleep Matters More Than Diet",
    platform: "Facebook",
    status: "posted",
    date: "Feb 9, 2026",
    views: "8.2K",
  },
  {
    id: "v-005",
    title: "The Future of Remote Work",
    platform: "TikTok",
    status: "draft",
    date: "Feb 10, 2026",
    views: "-",
  },
  {
    id: "v-006",
    title: "3-Minute Abs Workout",
    platform: "Instagram",
    status: "failed",
    date: "Feb 9, 2026",
    views: "-",
  },
]

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  posted: "default",
  scheduled: "secondary",
  rendering: "outline",
  draft: "outline",
  failed: "destructive",
}

export function RecentVideos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recent Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium text-foreground">
                  {video.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {video.platform}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariant[video.status]}
                    className="capitalize"
                  >
                    {video.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {video.date}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {video.views}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
