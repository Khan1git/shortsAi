"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Key,
  Share2,
  SlidersHorizontal,
  HardDrive,
  Users,
  Server,
  AlertTriangle,
  Trash2,
  Plus,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { APIKeysCard, PlatformConnectionsCard } from "@/components/settings"

const teamMembers = [
  { name: "John Doe", email: "john@clipforge.ai", role: "Owner", initials: "JD" },
  { name: "Sarah Kim", email: "sarah@clipforge.ai", role: "Admin", initials: "SK" },
  { name: "Alex Chen", email: "alex@clipforge.ai", role: "Editor", initials: "AC" },
  { name: "Maya Patel", email: "maya@clipforge.ai", role: "Viewer", initials: "MP" },
]

const roleColors: Record<string, string> = {
  Owner: "default",
  Admin: "secondary",
  Editor: "outline",
  Viewer: "outline",
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const youtubeStatus = searchParams.get("youtube")
  const [activeTab, setActiveTab] = useState(youtubeStatus ? "platforms" : "api-keys")

  return (
    <>
      <DashboardHeader title="Settings" breadcrumbs={[{ label: "Settings" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Central configuration hub</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="api-keys" className="gap-1.5 text-xs">
              <Key className="size-3.5 hidden sm:block" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="platforms" className="gap-1.5 text-xs">
              <Share2 className="size-3.5 hidden sm:block" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="defaults" className="gap-1.5 text-xs">
              <SlidersHorizontal className="size-3.5 hidden sm:block" />
              Defaults
            </TabsTrigger>
            <TabsTrigger value="storage" className="gap-1.5 text-xs">
              <HardDrive className="size-3.5 hidden sm:block" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-1.5 text-xs">
              <Users className="size-3.5 hidden sm:block" />
              Team
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-1.5 text-xs">
              <Server className="size-3.5 hidden sm:block" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="mt-6">
            <APIKeysCard />
          </TabsContent>

          <TabsContent value="platforms" className="mt-6">
            <PlatformConnectionsCard />
          </TabsContent>

          <TabsContent value="defaults" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Default Settings</CardTitle>
                <CardDescription>Configure defaults for new video creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Default Voice</Label>
                    <Select defaultValue="nova">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                        <SelectItem value="echo">Echo (Male)</SelectItem>
                        <SelectItem value="nova">Nova (Female)</SelectItem>
                        <SelectItem value="shimmer">Shimmer (Warm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Duration</Label>
                    <Select defaultValue="30">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="45">45 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Caption Style</Label>
                    <Select defaultValue="minimal">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="karaoke">Karaoke</SelectItem>
                        <SelectItem value="subtitle">Subtitle Bar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Publish</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Automatically publish after rendering</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-3">
                  <Label>Default Platforms</Label>
                  {["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook"].map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Checkbox id={`default-${p}`} defaultChecked />
                      <Label htmlFor={`default-${p}`} className="text-sm font-normal cursor-pointer">{p}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button>Save Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Storage</CardTitle>
                <CardDescription>Manage file storage and cleanup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Storage Provider</Label>
                    <Select defaultValue="s3">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                        <SelectItem value="cloudflare">Cloudflare R2</SelectItem>
                        <SelectItem value="vercel">Vercel Blob</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bucket Name</Label>
                    <Input defaultValue="clipforge-media-prod" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Storage Used</Label>
                    <span className="text-sm text-muted-foreground font-mono">14.2 GB / 50 GB</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  <p className="text-xs text-muted-foreground">28% of storage used</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Cleanup Old Assets</p>
                    <p className="text-xs text-muted-foreground">Remove assets older than 90 days</p>
                  </div>
                  <Button variant="outline">Run Cleanup</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Team Members</CardTitle>
                    <CardDescription>Manage who has access to your workspace</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-1.5 size-4" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant={roleColors[member.role] as "default" | "secondary" | "outline"}>
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">System Configuration</CardTitle>
                <CardDescription>Advanced rendering and performance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Render Quality</Label>
                    <Select defaultValue="1080p">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">720p (Fast)</SelectItem>
                        <SelectItem value="1080p">1080p (Recommended)</SelectItem>
                        <SelectItem value="4k">4K (Slow)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Concurrency</Label>
                    <Input type="number" defaultValue={3} min={1} max={10} />
                    <p className="text-xs text-muted-foreground">Simultaneous render jobs</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Logs</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Enable verbose logging for troubleshooting</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Reset All Settings</p>
                    <p className="text-xs text-muted-foreground">Restore all settings to default values</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
                    Reset
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Delete All Videos</p>
                    <p className="text-xs text-muted-foreground">Permanently delete all generated videos</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-1.5 size-3" />
                    Delete All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
