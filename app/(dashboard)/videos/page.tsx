"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Play,
  Download,
  Trash2,
  Pencil,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const videos = [
  { id: "v-001", title: "5 AI Tools You Need in 2026", platform: "TikTok", status: "posted", date: "Feb 10, 2026", duration: "0:28", views: "12.4K" },
  { id: "v-002", title: "Morning Routine for Productivity", platform: "Instagram", status: "scheduled", date: "Feb 11, 2026", duration: "0:32", views: "-" },
  { id: "v-003", title: "Quick Python Tips #42", platform: "YouTube", status: "rendering", date: "Feb 10, 2026", duration: "0:45", views: "-" },
  { id: "v-004", title: "Why Sleep Matters More Than Diet", platform: "Facebook", status: "posted", date: "Feb 9, 2026", duration: "0:30", views: "8.2K" },
  { id: "v-005", title: "The Future of Remote Work", platform: "TikTok", status: "draft", date: "Feb 10, 2026", duration: "0:25", views: "-" },
  { id: "v-006", title: "3-Minute Abs Workout", platform: "Instagram", status: "failed", date: "Feb 9, 2026", duration: "0:58", views: "-" },
  { id: "v-007", title: "Budget Travel Hacks 2026", platform: "TikTok", status: "posted", date: "Feb 8, 2026", duration: "0:33", views: "45.1K" },
  { id: "v-008", title: "How to Learn Any Language Fast", platform: "YouTube", status: "posted", date: "Feb 7, 2026", duration: "0:40", views: "22.3K" },
  { id: "v-009", title: "Minimalist Living Tips", platform: "Instagram", status: "scheduled", date: "Feb 12, 2026", duration: "0:27", views: "-" },
  { id: "v-010", title: "Stock Market for Beginners", platform: "Facebook", status: "draft", date: "Feb 10, 2026", duration: "0:50", views: "-" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  posted: "default",
  scheduled: "secondary",
  rendering: "outline",
  draft: "outline",
  failed: "destructive",
}

export default function VideosPage() {
  const [view, setView] = useState<"table" | "grid">("table")

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <DashboardHeader title="Videos" breadcrumbs={[{ label: "Videos" }]} />

      <div className="flex flex-col gap-4 overflow-hidden p-4 lg:p-6">
        {/* Title */}
        <div className="flex shrink-0 flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Videos</h1>
          <p className="text-sm text-muted-foreground">Manage all your generated videos</p>
        </div>

        {/* Filters Bar */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search videos..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 size-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="rendering">Rendering</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-platforms">
              <SelectTrigger className="w-[140px] hidden sm:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-platforms">All Platforms</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button variant={view === "table" ? "secondary" : "ghost"} size="icon" onClick={() => setView("table")}>
              <List className="size-4" />
              <span className="sr-only">Table view</span>
            </Button>
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")}>
              <Grid3X3 className="size-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </div>
        </div>

        {/* Table View */}
        {view === "table" && (
          <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <CardContent className="flex-1 overflow-auto p-0">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium text-foreground">{video.title}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{video.platform}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[video.status]} className="capitalize">{video.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">{video.duration}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{video.date}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{video.views}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Play className="mr-2 size-4" />Preview</DropdownMenuItem>
                            <DropdownMenuItem><Pencil className="mr-2 size-4" />Edit</DropdownMenuItem>
                            <DropdownMenuItem><Download className="mr-2 size-4" />Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 size-4" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="aspect-[9/16] max-h-48 bg-muted flex items-center justify-center relative">
                    <Play className="size-8 text-muted-foreground opacity-40" />
                    <Badge variant={statusVariant[video.status]} className="absolute top-2 right-2 capitalize text-xs">
                      {video.status}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-foreground truncate">{video.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{video.platform}</span>
                      <span className="text-xs text-muted-foreground font-mono">{video.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{video.date}</span>
                      <span className="text-xs text-muted-foreground">{video.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
