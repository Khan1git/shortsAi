import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { verifyIdToken } from "@/lib/firebase-admin"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "firebase",
      name: "Firebase",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token as string | undefined
        if (!token) return null
        try {
          const decoded = await verifyIdToken(token)
          return {
            id: decoded.uid,
            email: decoded.email ?? undefined,
            name: (decoded as { name?: string }).name ?? decoded.email ?? undefined,
            image: (decoded as { picture?: string }).picture ?? undefined,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.uid as string
      return session
    },
    authorized({ auth: session, request }) {
      const isLoggedIn = !!session?.user
      const { pathname } = request.nextUrl
      const isAuthRoute = pathname === "/login" || pathname === "/signup"
      if (isAuthRoute) return isLoggedIn ? Response.redirect(new URL("/", request.url)) : true
      const isDashboard = pathname === "/" || pathname.startsWith("/studio") || pathname.startsWith("/videos") || pathname.startsWith("/templates") || pathname.startsWith("/media") || pathname.startsWith("/scheduler") || pathname.startsWith("/automation") || pathname.startsWith("/analytics") || pathname.startsWith("/platforms") || pathname.startsWith("/settings")
      if (isDashboard && !isLoggedIn) return Response.redirect(new URL("/login", request.url))
      return true
    },
  },
  pages: { signIn: "/login" },
})
