import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  console.log("➡️ Middleware hit:", pathname)

  if (pathname.startsWith("/admin/login")) {
    console.log("✅ Login route allowed")
    return NextResponse.next()
  }

  const token = req.cookies.get("admin_token")?.value

  console.log("🍪 Token exists:", !!token)

  if (!token) {
    console.log("❌ No token found")
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  try {
    await jwtVerify(token, secret)
    console.log("✅ Token verified successfully")
    return NextResponse.next()
  } catch (err) {
    console.log("❌ Token verification failed:", err)
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
