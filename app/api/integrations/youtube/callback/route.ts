import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { setConnection } from "@/lib/platform-connections"
import { exchangeCodeForTokens, fetchYouTubeChannel } from "@/lib/youtube-oauth"

const baseUrl = () => process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
const settingsUrl = () => `${baseUrl()}/settings?youtube=connected`
const settingsErrorUrl = (e: string) => `${baseUrl()}/settings?youtube=error&message=${encodeURIComponent(e)}`

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", baseUrl()))
  }
  const { searchParams } = request.nextUrl
  const code = searchParams.get("code")
  const stateParam = searchParams.get("state")
  const error = searchParams.get("error")
  if (error) {
    return NextResponse.redirect(settingsErrorUrl(error === "access_denied" ? "Access denied" : error))
  }
  if (!code || !stateParam) {
    return NextResponse.redirect(settingsErrorUrl("Missing code or state"))
  }
  let state: { userId?: string }
  try {
    state = JSON.parse(Buffer.from(stateParam, "base64url").toString())
  } catch {
    return NextResponse.redirect(settingsErrorUrl("Invalid state"))
  }
  if (state.userId !== session.user.id) {
    return NextResponse.redirect(settingsErrorUrl("Invalid state"))
  }
  try {
    const { accessToken, refreshToken, expiresAt } = await exchangeCodeForTokens(code)
    let channelTitle: string | null = null
    let channelThumbnail: string | null = null
    let platformUserId = ""
    try {
      const channel = await fetchYouTubeChannel(accessToken)
      platformUserId = channel.id
      channelTitle = channel.title
      channelThumbnail = channel.thumbnail
    } catch {
      platformUserId = "unknown"
    }
    await setConnection({
      userId: session.user.id,
      platform: "youtube",
      platformUserId,
      accessToken,
      refreshToken,
      tokenExpiresAt: expiresAt,
      channelTitle,
      channelThumbnail,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Token exchange failed"
    return NextResponse.redirect(settingsErrorUrl(msg))
  }
  return NextResponse.redirect(settingsUrl())
}
