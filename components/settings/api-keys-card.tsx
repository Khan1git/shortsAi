"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { APIKeyInput } from "./api-key-input"

export function APIKeysCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">API Keys</CardTitle>
        <CardDescription>Manage your service API keys for video generation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <APIKeyInput label="OpenAI API Key" placeholder="sk-..." hasValue />
        <APIKeyInput label="Image Generation API Key" placeholder="Enter your image generation key" hasValue />
        <APIKeyInput label="Voice Synthesis API Key" placeholder="Enter your voice synthesis key" />
        <APIKeyInput label="Video Rendering API Key" placeholder="Enter your rendering key" hasValue />
        <div className="flex justify-end">
          <Button>Save API Keys</Button>
        </div>
      </CardContent>
    </Card>
  )
}
