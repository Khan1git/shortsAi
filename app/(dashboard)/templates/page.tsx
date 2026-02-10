import { Copy, Pencil, LayoutTemplate } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const templates = [
  {
    id: 1,
    name: "Listicle - Top 5",
    category: "Education",
    description: "Countdown-style listicle with hook, 5 items, and CTA",
    scenes: 7,
    duration: "30s",
    popular: true,
  },
  {
    id: 2,
    name: "Motivational Quote",
    category: "Inspiration",
    description: "Cinematic background with animated text overlay",
    scenes: 3,
    duration: "15s",
    popular: false,
  },
  {
    id: 3,
    name: "Product Review",
    category: "Marketing",
    description: "Quick product showcase with pros, cons, and verdict",
    scenes: 5,
    duration: "45s",
    popular: true,
  },
  {
    id: 4,
    name: "Tutorial Steps",
    category: "Education",
    description: "Step-by-step walkthrough with numbered scenes",
    scenes: 6,
    duration: "60s",
    popular: false,
  },
  {
    id: 5,
    name: "News Flash",
    category: "News",
    description: "Breaking news style with ticker and bold headlines",
    scenes: 4,
    duration: "20s",
    popular: false,
  },
  {
    id: 6,
    name: "Before & After",
    category: "Lifestyle",
    description: "Split-screen comparison with transformation reveal",
    scenes: 4,
    duration: "25s",
    popular: true,
  },
  {
    id: 7,
    name: "Story Time",
    category: "Entertainment",
    description: "Narrative-driven personal story with emotional arc",
    scenes: 8,
    duration: "60s",
    popular: false,
  },
  {
    id: 8,
    name: "Quick Tips",
    category: "Education",
    description: "Rapid-fire tips with icon overlays and bold text",
    scenes: 5,
    duration: "30s",
    popular: true,
  },
]

export default function TemplatesPage() {
  return (
    <>
      <DashboardHeader title="Templates" breadcrumbs={[{ label: "Templates" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Templates</h1>
          <p className="text-sm text-muted-foreground">Reusable video and script styles for quick creation</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <div className="aspect-video bg-muted flex items-center justify-center relative rounded-t-lg border-b border-border">
                <LayoutTemplate className="size-8 text-muted-foreground opacity-30" />
                {template.popular && (
                  <Badge className="absolute top-2 right-2 text-xs">Popular</Badge>
                )}
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground text-sm">{template.name}</h3>
                  <Badge variant="outline" className="text-xs shrink-0">{template.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{template.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-muted-foreground">{template.scenes} scenes</span>
                  <span className="text-xs text-muted-foreground font-mono">{template.duration}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Copy className="mr-1.5 size-3" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Pencil className="mr-1.5 size-3" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
