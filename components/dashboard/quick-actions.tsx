import Link from "next/link"
import { Plus, Wand2, CalendarDays, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <Link href="/studio">
          <Plus className="mr-2 size-4" />
          Create Video
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/studio">
          <Wand2 className="mr-2 size-4" />
          AI Generate
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/scheduler">
          <CalendarDays className="mr-2 size-4" />
          View Schedule
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/analytics">
          <BarChart3 className="mr-2 size-4" />
          Analytics
        </Link>
      </Button>
    </div>
  )
}
