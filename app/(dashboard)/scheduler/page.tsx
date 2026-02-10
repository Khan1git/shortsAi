"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SchedulerCalendar } from "@/components/scheduler/calendar"

export default function SchedulerPage() {
  return (
    <>
      <DashboardHeader title="Scheduler" breadcrumbs={[{ label: "Scheduler" }]} />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Scheduler</h1>
          <p className="text-sm text-muted-foreground">Visual calendar for video publishing</p>
        </div>
        <SchedulerCalendar />
      </div>
    </>
  )
}
