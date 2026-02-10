import { DashboardHeader } from "@/components/dashboard-header"
import { VideoDetail } from "@/components/studio/video-detail"

interface VideoPageProps {
  params: Promise<{ id: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  return (
    <>
      <DashboardHeader
        title="Video Details"
        breadcrumbs={[
          { label: "AI Studio", href: "/studio" },
          { label: "Video Details" },
        ]}
      />
      <div className="flex-1 p-4 lg:p-6">
        <VideoDetail videoId={id} />
      </div>
    </>
  )
}
