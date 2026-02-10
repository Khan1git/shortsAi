"use client"

import { Upload, ImageIcon, Music, Video, MoreHorizontal, Download, Trash2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const images = [
  { id: 1, name: "hook-scene-ai-tools.png", size: "342 KB", date: "Feb 10" },
  { id: 2, name: "productivity-stats.png", size: "287 KB", date: "Feb 10" },
  { id: 3, name: "morning-routine-bg.png", size: "512 KB", date: "Feb 9" },
  { id: 4, name: "python-code-snippet.png", size: "198 KB", date: "Feb 9" },
  { id: 5, name: "travel-destination.png", size: "634 KB", date: "Feb 8" },
  { id: 6, name: "workout-scene.png", size: "445 KB", date: "Feb 8" },
  { id: 7, name: "stock-chart.png", size: "223 KB", date: "Feb 7" },
  { id: 8, name: "minimalist-room.png", size: "378 KB", date: "Feb 7" },
  { id: 9, name: "recipe-pasta.png", size: "501 KB", date: "Feb 6" },
]

const audioFiles = [
  { id: 1, name: "voiceover-ai-tools.mp3", size: "1.2 MB", duration: "0:28", date: "Feb 10" },
  { id: 2, name: "voiceover-morning.mp3", size: "1.5 MB", duration: "0:32", date: "Feb 9" },
  { id: 3, name: "voiceover-python.mp3", size: "2.1 MB", duration: "0:45", date: "Feb 9" },
  { id: 4, name: "bg-music-upbeat.mp3", size: "3.4 MB", duration: "1:00", date: "Feb 8" },
  { id: 5, name: "bg-music-calm.mp3", size: "2.8 MB", duration: "1:00", date: "Feb 7" },
]

const videoFiles = [
  { id: 1, name: "ai-tools-final.mp4", size: "12.4 MB", duration: "0:28", date: "Feb 10" },
  { id: 2, name: "sleep-matters-final.mp4", size: "14.1 MB", duration: "0:30", date: "Feb 9" },
  { id: 3, name: "travel-hacks-final.mp4", size: "16.8 MB", duration: "0:33", date: "Feb 8" },
  { id: 4, name: "language-tips-final.mp4", size: "18.2 MB", duration: "0:40", date: "Feb 7" },
]

function MediaItem({ name, size, extra }: { name: string; size: string; extra?: string }) {
  return (
    <div className="group relative flex flex-col items-center">
      <div className="aspect-square w-full rounded-lg bg-muted border border-border flex items-center justify-center relative overflow-hidden">
        <span className="text-[10px] text-muted-foreground text-center px-2 break-all">{name}</span>
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="size-6">
                <MoreHorizontal className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Download className="mr-2 size-4" />Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 size-4" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-1.5 w-full text-center">
        <p className="text-xs font-medium text-foreground truncate">{name}</p>
        <p className="text-[10px] text-muted-foreground">{size}{extra ? ` - ${extra}` : ""}</p>
      </div>
    </div>
  )
}

export default function MediaLibraryPage() {
  return (
    <>
      <DashboardHeader title="Media Library" breadcrumbs={[{ label: "Media Library" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Media Library</h1>
            <p className="text-sm text-muted-foreground">Manage generated and uploaded assets</p>
          </div>
          <Button>
            <Upload className="mr-2 size-4" />
            Upload
          </Button>
        </div>

        <Tabs defaultValue="images">
          <TabsList>
            <TabsTrigger value="images" className="gap-1.5">
              <ImageIcon className="size-3.5" />
              Images
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-1.5">
              <Music className="size-3.5" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-1.5">
              <Video className="size-3.5" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {images.map((img) => (
                    <MediaItem key={img.id} name={img.name} size={img.size} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {audioFiles.map((file) => (
                    <MediaItem key={file.id} name={file.name} size={file.size} extra={file.duration} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {videoFiles.map((file) => (
                    <MediaItem key={file.id} name={file.name} size={file.size} extra={file.duration} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
