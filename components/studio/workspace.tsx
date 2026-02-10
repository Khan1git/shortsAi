"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Play,
  Video,
  Pencil,
  Volume2,
  Clock,
  MoreVertical,
  Eye,
  Trash2,
  Download,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type StudioTab = "create" | "edit"

interface GeneratedVideo {
  id: string
  title: string
  prompt: string
  duration: string
  size: string
  status: "rendering" | "completed" | "failed"
  createdAt: string
  thumbnailColor: string
}

const demoVideos: GeneratedVideo[] = [
  {
    id: "vid-001",
    title: "3 Productivity Apps for Remote Workers",
    prompt: "3 productivity apps for remote workers, energetic tone, with stats",
    duration: "30s",
    size: "9:16",
    status: "completed",
    createdAt: "2 min ago",
    thumbnailColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "vid-002",
    title: "Morning Routine for Success",
    prompt: "Morning routine tips for entrepreneurs, motivational style",
    duration: "45s",
    size: "9:16",
    status: "completed",
    createdAt: "15 min ago",
    thumbnailColor: "from-amber-500/20 to-orange-600/10",
  },
  {
    id: "vid-003",
    title: "AI Tools You Need in 2026",
    prompt: "Top 5 AI tools everyone should use in 2026, fast-paced",
    duration: "60s",
    size: "9:16",
    status: "rendering",
    createdAt: "Just now",
    thumbnailColor: "from-emerald-500/20 to-teal-600/10",
  },
  {
    id: "vid-004",
    title: "Quick Healthy Meals Under 10min",
    prompt: "Easy healthy meals under 10 minutes, bright and fun tone",
    duration: "30s",
    size: "1:1",
    status: "completed",
    createdAt: "1 hr ago",
    thumbnailColor: "from-pink-500/20 to-rose-600/10",
  },
  {
    id: "vid-005",
    title: "Invest Like Warren Buffett",
    prompt: "Warren Buffett investing principles for beginners",
    duration: "45s",
    size: "9:16",
    status: "completed",
    createdAt: "3 hr ago",
    thumbnailColor: "from-indigo-500/20 to-violet-600/10",
  },
  {
    id: "vid-006",
    title: "Home Workout No Equipment",
    prompt: "10 minute home workout, no equipment needed, upbeat music",
    duration: "60s",
    size: "9:16",
    status: "failed",
    createdAt: "5 hr ago",
    thumbnailColor: "from-red-500/20 to-red-600/10",
  },
]

const voiceOptions = [
  { value: "alloy", label: "Alloy", desc: "Neutral" },
  { value: "echo", label: "Echo", desc: "Male" },
  { value: "fable", label: "Fable", desc: "British" },
  { value: "onyx", label: "Onyx", desc: "Deep Male" },
  { value: "nova", label: "Nova", desc: "Female" },
  { value: "shimmer", label: "Shimmer", desc: "Warm" },
]

const sizeOptions = [
  { value: "9:16", label: "9:16", desc: "TikTok / Reels / Shorts" },
  { value: "1:1", label: "1:1", desc: "Instagram / Facebook" },
  { value: "16:9", label: "16:9", desc: "YouTube / Landscape" },
  { value: "4:5", label: "4:5", desc: "Instagram Feed" },
]

function StatusBadge({ status }: { status: GeneratedVideo["status"] }) {
  if (status === "rendering") {
    return (
      <Badge variant="secondary" className="gap-1 bg-warning/15 text-warning border-0 text-[11px]">
        <Loader2 className="size-3 animate-spin" />
        Rendering
      </Badge>
    )
  }
  if (status === "failed") {
    return (
      <Badge variant="secondary" className="bg-destructive/15 text-destructive border-0 text-[11px]">
        Failed
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="bg-success/15 text-success border-0 text-[11px]">
      Completed
    </Badge>
  )
}

export function StudioWorkspace() {
  const [activeTab, setActiveTab] = useState<StudioTab>("create")
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState([30])
  const [isGenerating, setIsGenerating] = useState(false)

  function handleGenerate() {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="flex h-[calc(100vh-7.5rem)] gap-0 overflow-hidden rounded-xl border border-border bg-card">
      {/* ── Left Sidebar ── */}
      <div className="w-80 shrink-0 border-r border-border flex flex-col bg-card">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "create"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Video className="size-4" />
            Create Video
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "edit"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Pencil className="size-4" />
            Edit Video
          </button>
        </div>

        {/* Sidebar content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            {activeTab === "create" ? (
              <>
                {/* Prompt */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Prompt
                  </Label>
                  <Textarea
                    placeholder="Describe your video idea... e.g. '3 productivity apps for remote workers, energetic tone, with stats'"
                    className="min-h-[120px] resize-none text-sm"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Video Size */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Video Size
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map((size) => (
                      <SizeButton key={size.value} size={size} />
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Duration
                    </Label>
                    <span className="text-sm font-medium text-foreground">
                      {duration[0]}s
                    </span>
                  </div>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={15}
                    max={90}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>15s</span>
                    <span>90s</span>
                  </div>
                </div>

                <Separator />

                {/* Voice Selection */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Volume2 className="size-3.5" />
                    Voice
                  </Label>
                  <Select defaultValue="alloy">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceOptions.map((voice) => (
                        <SelectItem key={voice.value} value={voice.value}>
                          <span className="font-medium">{voice.label}</span>
                          <span className="ml-1.5 text-muted-foreground">
                            ({voice.desc})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Voice Speed */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Voice Speed
                  </Label>
                  <Select defaultValue="1.0">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.75">0.75x - Slow</SelectItem>
                      <SelectItem value="1.0">1.0x - Normal</SelectItem>
                      <SelectItem value="1.25">1.25x - Fast</SelectItem>
                      <SelectItem value="1.5">1.5x - Very Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              /* Edit Tab Content */
              <div className="space-y-4">
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <Pencil className="mx-auto size-8 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a video from the gallery to edit its script, images, voice, or
                    timing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Generate button - pinned to bottom */}
        <div className="border-t border-border p-4">
          <Button
            className="w-full"
            size="lg"
            disabled={activeTab === "create" && !prompt.trim()}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Right Content: Video Gallery ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Gallery header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              Generated Videos
            </h2>
            <Badge variant="secondary" className="text-xs">
              {demoVideos.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rendering">Rendering</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Video Grid */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {demoVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

/* ── Size Button ── */
function SizeButton({
  size,
}: {
  size: { value: string; label: string; desc: string }
}) {
  const [selected, setSelected] = useState(size.value === "9:16")
  return (
    <button
      type="button"
      onClick={() => setSelected(!selected)}
      className={cn(
        "rounded-lg border p-2.5 text-left transition-all",
        selected
          ? "border-primary bg-accent text-accent-foreground ring-1 ring-primary/20"
          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted/50"
      )}
    >
      <span className="block text-sm font-semibold">{size.label}</span>
      <span className="block text-[11px] mt-0.5 opacity-70">{size.desc}</span>
    </button>
  )
}

/* ── Video Card ── */
function VideoCard({ video }: { video: GeneratedVideo }) {
  const isClickable = video.status === "completed"

  const cardContent = (
    <div
      className={cn(
        "group rounded-xl border border-border bg-background overflow-hidden transition-all",
        isClickable && "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 cursor-pointer"
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative aspect-video bg-gradient-to-br",
          video.thumbnailColor
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {video.status === "rendering" ? (
            <Loader2 className="size-8 text-muted-foreground animate-spin" />
          ) : video.status === "failed" ? (
            <div className="text-center">
              <span className="text-xs text-destructive font-medium">
                Render Failed
              </span>
            </div>
          ) : (
            <div className="rounded-full bg-foreground/80 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="size-4 text-background fill-background" />
            </div>
          )}
        </div>
        {/* Duration tag */}
        <div className="absolute bottom-2 right-2">
          <Badge
            variant="secondary"
            className="bg-foreground/70 text-background border-0 text-[10px] px-1.5 py-0.5"
          >
            {video.duration}
          </Badge>
        </div>
        {/* Size tag */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="secondary"
            className="bg-foreground/70 text-background border-0 text-[10px] px-1.5 py-0.5"
          >
            {video.size}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-foreground truncate">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {video.prompt}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="size-3.5" />
                <span className="sr-only">Video options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 size-3.5" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 size-3.5" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 size-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <StatusBadge status={video.status} />
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            {video.createdAt}
          </span>
        </div>
      </div>
    </div>
  )

  if (isClickable) {
    return <Link href={`/studio/${video.id}`}>{cardContent}</Link>
  }

  return cardContent
}
