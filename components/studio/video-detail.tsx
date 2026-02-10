"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  Download,
  Copy,
  Share2,
  CalendarDays,
  Clock,
  Send,
  CheckCircle2,
  Volume2,
  Type,
  Palette,
  RotateCcw,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const videoData: Record<
  string,
  {
    title: string
    prompt: string
    duration: string
    size: string
    voice: string
    script: string
    createdAt: string
    color: string
  }
> = {
  "vid-001": {
    title: "3 Productivity Apps for Remote Workers",
    prompt:
      "3 productivity apps for remote workers, energetic tone, with stats",
    duration: "30s",
    size: "9:16",
    voice: "Alloy (Neutral)",
    script: `[Scene 1 - 0:00-0:03]
Hook: "You're wasting 3 hours a day without knowing it..."

[Scene 2 - 0:03-0:08]
"Studies show the average person spends 3.1 hours daily on their phone doing nothing productive."

[Scene 3 - 0:08-0:15]
"Here are 3 apps that turn that dead time into real progress..."

[Scene 4 - 0:15-0:25]
App breakdowns with visual demos

[Scene 5 - 0:25-0:30]
CTA: "Follow for more productivity hacks"`,
    createdAt: "Feb 10, 2026 at 2:15 PM",
    color: "from-blue-500/20 to-blue-600/10",
  },
  "vid-002": {
    title: "Morning Routine for Success",
    prompt: "Morning routine tips for entrepreneurs, motivational style",
    duration: "45s",
    size: "9:16",
    voice: "Nova (Female)",
    script: `[Scene 1 - 0:00-0:04]
Hook: "The first hour of your day decides everything..."

[Scene 2 - 0:04-0:12]
"Successful entrepreneurs share one thing: a killer morning routine."

[Scene 3 - 0:12-0:25]
Step by step morning routine breakdown

[Scene 4 - 0:25-0:40]
Real-world examples from top CEOs

[Scene 5 - 0:40-0:45]
CTA: "Start tomorrow. Your future self will thank you."`,
    createdAt: "Feb 10, 2026 at 1:45 PM",
    color: "from-amber-500/20 to-orange-600/10",
  },
}

const defaultVideo = {
  title: "Generated Video",
  prompt: "AI-generated short video content",
  duration: "30s",
  size: "9:16",
  voice: "Alloy (Neutral)",
  script: "[Scene 1]\nYour video content here...",
  createdAt: "Just now",
  color: "from-gray-500/20 to-gray-600/10",
}

const platforms = [
  { id: "tiktok", name: "TikTok", icon: "T", color: "bg-foreground text-background" },
  { id: "instagram", name: "Instagram Reels", icon: "I", color: "bg-gradient-to-br from-pink-500 to-orange-500 text-white" },
  { id: "youtube", name: "YouTube Shorts", icon: "Y", color: "bg-red-600 text-white" },
  { id: "facebook", name: "Facebook Reels", icon: "F", color: "bg-blue-600 text-white" },
]

export function VideoDetail({ videoId }: { videoId: string }) {
  const video = videoData[videoId] || defaultVideo
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "tiktok",
    "instagram",
  ])
  const [publishMode, setPublishMode] = useState<"schedule" | "now">("schedule")
  const [caption, setCaption] = useState(video.title)
  const [hashtags, setHashtags] = useState(
    "#productivity #remotework #apps #tech"
  )

  function togglePlatform(platformId: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/studio"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Studio
      </Link>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* ── Left: Video Preview ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="mx-auto max-w-[280px]">
                <div
                  className={cn(
                    "relative aspect-[9/16] rounded-xl bg-gradient-to-br overflow-hidden border border-border",
                    video.color
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-foreground/80 p-4 hover:bg-foreground/90 transition-colors"
                      aria-label="Play video preview"
                    >
                      <Play className="size-6 text-background fill-background" />
                    </button>
                    <span className="text-xs text-muted-foreground font-medium">
                      Click to preview
                    </span>
                  </div>
                  {/* Video info overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                    <p className="text-sm font-medium text-background">
                      {video.title}
                    </p>
                    <div className="flex gap-2 mt-1.5">
                      <Badge
                        variant="secondary"
                        className="bg-background/20 text-background border-0 text-[10px]"
                      >
                        {video.duration}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/20 text-background border-0 text-[10px]"
                      >
                        {video.size}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="mr-1.5 size-3.5" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Copy className="mr-1.5 size-3.5" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 className="mr-1.5 size-3.5" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">
                Video Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow icon={Clock} label="Duration" value={video.duration} />
              <DetailRow icon={Palette} label="Aspect Ratio" value={video.size} />
              <DetailRow icon={Volume2} label="Voice" value={video.voice} />
              <DetailRow icon={Type} label="Created" value={video.createdAt} />
              <Separator />
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Prompt</Label>
                <p className="text-sm text-foreground">{video.prompt}</p>
              </div>
            </CardContent>
          </Card>

          {/* Script */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">Script</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap bg-muted/50 rounded-lg p-3 leading-relaxed">
                {video.script}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* ── Right: Publishing Options ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <Share2 className="size-4" />
                Publish To
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id)
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3.5 transition-all text-left",
                        isSelected
                          ? "border-primary bg-accent ring-1 ring-primary/20"
                          : "border-border bg-background hover:border-muted-foreground/30"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg text-xs font-bold shrink-0",
                          platform.color
                        )}
                      >
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {platform.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {isSelected ? "Selected" : "Click to select"}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="size-5 text-primary shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Caption & Hashtags */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <Type className="size-4" />
                Caption & Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Caption</Label>
                <Textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="min-h-[80px] resize-none"
                  placeholder="Write your video caption..."
                />
                <p className="text-[11px] text-muted-foreground text-right">
                  {caption.length}/150
                </p>
              </div>
              <div className="space-y-2">
                <Label>Hashtags</Label>
                <Input
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#tag1 #tag2 #tag3"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-caption" defaultChecked />
                  <Label
                    htmlFor="auto-caption"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Auto-generate captions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="first-comment" />
                  <Label
                    htmlFor="first-comment"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Post hashtags as first comment
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <CalendarDays className="size-4" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="publish-now"
                    checked={publishMode === "now"}
                    onCheckedChange={(checked) =>
                      setPublishMode(checked ? "now" : "schedule")
                    }
                  />
                  <Label htmlFor="publish-now" className="text-sm cursor-pointer">
                    Publish immediately
                  </Label>
                </div>
              </div>

              {publishMode === "schedule" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" defaultValue="2026-02-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" defaultValue="14:00" />
                  </div>
                </div>
              )}

              {publishMode === "schedule" && (
                <div className="rounded-lg bg-accent/50 p-3">
                  <p className="text-xs text-accent-foreground">
                    Best posting time for your audience: <strong>2:00 PM - 4:00 PM EST</strong>
                    {" "}based on your analytics data.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">
                Advanced Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="education">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">
                    Allow comments
                  </Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Allow duet/stitch</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">
                    Notify followers
                  </Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button size="lg" className="flex-1">
              <Send className="mr-2 size-4" />
              {publishMode === "now"
                ? `Publish to ${selectedPlatforms.length} Platform${selectedPlatforms.length !== 1 ? "s" : ""}`
                : `Schedule for ${selectedPlatforms.length} Platform${selectedPlatforms.length !== 1 ? "s" : ""}`}
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              <RotateCcw className="mr-2 size-4" />
              Regenerate
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10 text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete video</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
