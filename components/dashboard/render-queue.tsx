import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const queue = [
  { title: "Quick Python Tips #42", progress: 72, stage: "Rendering frames" },
  {
    title: "Budget Meal Ideas",
    progress: 34,
    stage: "Generating voiceover",
  },
  {
    title: "Crypto Market Update",
    progress: 12,
    stage: "Creating images",
  },
]

export function RenderQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Render Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {queue.map((item) => (
          <div key={item.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground leading-none">
                {item.title}
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {item.progress}%
              </span>
            </div>
            <Progress value={item.progress} className="h-1.5" />
            <p className="text-xs text-muted-foreground">{item.stage}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
