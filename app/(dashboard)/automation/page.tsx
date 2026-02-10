"use client"

import { useState } from "react"
import { Zap, Info } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AutomationPage() {
  const [enabled, setEnabled] = useState(true)
  const [autoPublish, setAutoPublish] = useState(true)

  return (
    <>
      <DashboardHeader title="Automation" breadcrumbs={[{ label: "Automation" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Automation</h1>
          <p className="text-sm text-muted-foreground">Configure automatic weekly video generation</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Automation Toggle */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Auto-Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate and schedule videos based on your settings
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

          {/* Schedule Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Schedule</CardTitle>
              <CardDescription>Set how often videos are generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
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
              <div className="space-y-2">
                <Label>Videos Per Run</Label>
                <Input type="number" defaultValue={5} min={1} max={20} />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="size-3" />
                  Max 20 videos per batch
                </p>
              </div>
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label>Day of Week</Label>
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
            </CardContent>
          </Card>

          {/* Content Defaults */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Content Defaults</CardTitle>
              <CardDescription>Default settings for auto-generated videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Script Style</Label>
                <Select defaultValue="engaging">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engaging">Engaging & Energetic</SelectItem>
                    <SelectItem value="educational">Educational & Calm</SelectItem>
                    <SelectItem value="humorous">Humorous & Casual</SelectItem>
                    <SelectItem value="professional">Professional & Formal</SelectItem>
                    <SelectItem value="storytelling">Storytelling & Narrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Voice</Label>
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
              <div className="space-y-2">
                <Label>Default Duration</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="45">45 seconds</SelectItem>
                    <SelectItem value="60">60 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Publish</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Publish videos immediately after rendering
                  </p>
                </div>
                <Switch checked={autoPublish} onCheckedChange={setAutoPublish} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button>Save Automation Settings</Button>
        </div>
      </div>
    </>
  )
}
