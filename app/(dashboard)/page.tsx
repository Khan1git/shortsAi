import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentVideos } from "@/components/dashboard/recent-videos"
import { RenderQueue } from "@/components/dashboard/render-queue"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your video automation pipeline
          </p>
        </div>
        <DashboardStats />
        <QuickActions />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentVideos />
          </div>
          <RenderQueue />
        </div>
      </div>
    </>
  )
}
