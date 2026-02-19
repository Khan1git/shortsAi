import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { listConnectionsPublic } from "@/lib/platform-connections"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const connections = await listConnectionsPublic(session.user.id)
  return NextResponse.json({ connections })
}
