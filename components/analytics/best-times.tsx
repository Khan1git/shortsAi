import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HOURS = ["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const heatmapData: Record<string, Record<string, number>> = {
  Mon: { "6a": 2, "8a": 5, "10a": 7, "12p": 8, "2p": 6, "4p": 4, "6p": 9, "8p": 10, "10p": 6 },
  Tue: { "6a": 1, "8a": 4, "10a": 6, "12p": 7, "2p": 8, "4p": 5, "6p": 7, "8p": 9, "10p": 5 },
  Wed: { "6a": 3, "8a": 6, "10a": 8, "12p": 9, "2p": 7, "4p": 6, "6p": 10, "8p": 8, "10p": 4 },
  Thu: { "6a": 2, "8a": 5, "10a": 7, "12p": 6, "2p": 5, "4p": 4, "6p": 8, "8p": 9, "10p": 7 },
  Fri: { "6a": 1, "8a": 3, "10a": 5, "12p": 6, "2p": 4, "4p": 3, "6p": 7, "8p": 10, "10p": 8 },
  Sat: { "6a": 4, "8a": 7, "10a": 9, "12p": 10, "2p": 8, "4p": 6, "6p": 5, "8p": 7, "10p": 6 },
  Sun: { "6a": 3, "8a": 6, "10a": 8, "12p": 9, "2p": 7, "4p": 5, "6p": 4, "8p": 6, "10p": 5 },
}

function getOpacity(value: number): string {
  if (value <= 2) return "bg-primary/10"
  if (value <= 4) return "bg-primary/20"
  if (value <= 6) return "bg-primary/40"
  if (value <= 8) return "bg-primary/60"
  return "bg-primary/90"
}

export function BestTimes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          Best Posting Times
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Header row */}
          <div className="grid grid-cols-10 gap-1">
            <div />
            {HOURS.map((hour) => (
              <div key={hour} className="text-[10px] text-muted-foreground text-center">
                {hour}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {DAYS.map((day) => (
            <div key={day} className="grid grid-cols-10 gap-1">
              <div className="text-xs text-muted-foreground flex items-center">{day}</div>
              {HOURS.map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className={`aspect-square rounded-sm ${getOpacity(heatmapData[day][hour])}`}
                  title={`${day} ${hour}: ${heatmapData[day][hour]}/10 engagement score`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          <span className="text-[10px] text-muted-foreground">Low</span>
          <div className="flex gap-0.5">
            {["bg-primary/10", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/90"].map((cls) => (
              <div key={cls} className={`size-3 rounded-sm ${cls}`} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">High</span>
        </div>
      </CardContent>
    </Card>
  )
}
