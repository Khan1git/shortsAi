import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsCharts } from "@/components/analytics/charts"
import { TopVideos } from "@/components/analytics/top-videos"
import { BestTimes } from "@/components/analytics/best-times"

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analytics" breadcrumbs={[{ label: "Analytics" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance tracking across all platforms</p>
        </div>
        <AnalyticsCharts />
        <div className="grid gap-6 lg:grid-cols-2">
          <TopVideos />
          <BestTimes />
        </div>
      </div>
    </>
  )
}
