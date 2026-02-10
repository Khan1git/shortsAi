import { DashboardHeader } from "@/components/dashboard-header"
import { StudioWorkspace } from "@/components/studio/workspace"

export default function StudioPage() {
  return (
    <>
      <DashboardHeader
        title="AI Studio"
        breadcrumbs={[{ label: "AI Studio" }]}
      />
      <div className="flex-1 p-4 lg:p-6">
        <StudioWorkspace />
      </div>
    </>
  )
}
