import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteConnection } from "@/lib/platform-connections"

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await deleteConnection(session.user.id, "youtube")
  return NextResponse.json({ ok: true })
}
