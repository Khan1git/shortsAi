import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getYouTubeAuthUrl } from "@/lib/youtube-oauth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"))
  }
  const nonce = Math.random().toString(36).slice(2)
  const state = Buffer.from(JSON.stringify({ userId: session.user.id, nonce })).toString("base64url")
  const url = getYouTubeAuthUrl(state)
  return NextResponse.redirect(url)
}
