import { Video, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Videos Generated",
    value: "1,284",
    change: "+12% from last month",
    icon: Video,
    iconClass: "text-primary",
  },
  {
    title: "Scheduled",
    value: "42",
    change: "Next batch in 3h",
    icon: Clock,
    iconClass: "text-warning",
  },
  {
    title: "Published",
    value: "1,198",
    change: "+8% from last month",
    icon: CheckCircle2,
    iconClass: "text-success",
  },
  {
    title: "Failed",
    value: "3",
    change: "2 retrying",
    icon: AlertTriangle,
    iconClass: "text-destructive",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`size-4 ${stat.iconClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
