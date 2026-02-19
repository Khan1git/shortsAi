"use client"

import { useState } from "react"
import {
  Zap,
  Info,
  Clock,
  Mic,
  Send,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

const platforms = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.66a8.2 8.2 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.09Z" />
      </svg>
    ),
    color: "bg-foreground text-background",
  },
  {
    id: "instagram",
    name: "Instagram Reels",
    icon: Instagram,
    color: "bg-gradient-to-br from-pink-500 to-orange-400 text-white",
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    icon: Youtube,
    color: "bg-red-600 text-white",
  },
  {
    id: "facebook",
    name: "Facebook Reels",
    icon: Facebook,
    color: "bg-blue-600 text-white",
  },
]

export default function AutomationPage() {
  const [enabled, setEnabled] = useState(true)
  const [autoPublish, setAutoPublish] = useState(true)
  const [activePlatforms, setActivePlatforms] = useState<string[]>([
    "tiktok",
    "instagram",
    "youtube",
  ])
  const [prompt, setPrompt] = useState(
    "Create engaging short-form video content about trending topics in tech and productivity. Keep the tone conversational and energetic. Include a strong hook in the first 3 seconds."
  )
  const [duration, setDuration] = useState([30])

  function togglePlatform(id: string) {
    setActivePlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <DashboardHeader
        title="Automation"
        breadcrumbs={[{ label: "Automation" }]}
      />

      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl space-y-5 p-4 lg:p-6">
          {/* Master Toggle */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Auto-Generation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate and schedule videos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={enabled ? "default" : "secondary"}>
                    {enabled ? "Active" : "Paused"}
                  </Badge>
                  <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <Send className="size-4 text-primary" />
                Content Prompt
              </CardTitle>
              <CardDescription>
                Write a prompt to guide the AI when generating automated videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what kind of videos you want to auto-generate..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {prompt.length} / 500 characters
                </p>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Use template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platforms */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">
                Publishing Platforms
              </CardTitle>
              <CardDescription>
                Select which platforms to auto-post generated videos to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {platforms.map((platform) => {
                  const isActive = activePlatforms.includes(platform.id)
                  const Icon = platform.icon
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        isActive
                          ? "border-primary bg-accent"
                          : "border-border bg-card opacity-60 hover:opacity-80"
                      }`}
                    >
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${platform.color}`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {platform.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isActive ? "Auto-posting enabled" : "Disabled"}
                        </p>
                      </div>
                      <Switch
                        checked={isActive}
                        onCheckedChange={() => togglePlatform(platform.id)}
                      />
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Defaults side by side */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Schedule */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <Clock className="size-4 text-primary" />
                  Schedule
                </CardTitle>
                <CardDescription>
                  When and how often to generate videos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Frequency
                  </Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="every-3-days">Every 3 Days</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Day
                    </Label>
                    <Select defaultValue="monday">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Videos per Run
                  </Label>
                  <Input type="number" defaultValue={5} min={1} max={20} />
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Info className="size-3" />
                    Max 20 per batch
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Voice & Defaults */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <Mic className="size-4 text-primary" />
                  Defaults
                </CardTitle>
                <CardDescription>
                  Voice, duration, and publishing defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Voice
                  </Label>
                  <Select defaultValue="nova">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                      <SelectItem value="echo">Echo (Male)</SelectItem>
                      <SelectItem value="fable">Fable (British)</SelectItem>
                      <SelectItem value="onyx">Onyx (Deep)</SelectItem>
                      <SelectItem value="nova">Nova (Female)</SelectItem>
                      <SelectItem value="shimmer">Shimmer (Warm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Duration
                    </Label>
                    <span className="text-sm font-medium text-foreground font-mono">
                      {duration[0]}s
                    </span>
                  </div>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={15}
                    max={90}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15s</span>
                    <span>90s</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Auto-Publish</Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Publish immediately after rendering
                    </p>
                  </div>
                  <Switch
                    checked={autoPublish}
                    onCheckedChange={setAutoPublish}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save */}
          <div className="flex items-center justify-between border-t border-border pt-5 pb-6">
            <p className="text-sm text-muted-foreground">
              {activePlatforms.length} platform{activePlatforms.length !== 1 && "s"} selected
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline">Discard</Button>
              <Button>Save Settings</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
