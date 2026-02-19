"use client"

import { useState } from "react"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export interface APIKeyInputProps {
  label: string
  placeholder: string
  hasValue?: boolean
}

export function APIKeyInput({ label, placeholder, hasValue = false }: APIKeyInputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            defaultValue={hasValue ? "sk-xxxxxxxxxxxxxxxxxxxxxxxx" : ""}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            <span className="sr-only">Toggle visibility</span>
          </Button>
        </div>
        {hasValue && (
          <Badge variant="outline" className="gap-1 text-success border-success/30 shrink-0 self-center">
            <CheckCircle2 className="size-3" />
            Set
          </Badge>
        )}
      </div>
    </div>
  )
}
