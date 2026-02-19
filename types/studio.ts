export type StudioTab = "image" | "video"

export type GeneratedVideoStatus = "rendering" | "completed" | "failed"

export interface GeneratedVideo {
  id: string
  title: string
  prompt: string
  duration: string
  size: string
  status: GeneratedVideoStatus
  createdAt: string
  thumbnailColor: string
}
