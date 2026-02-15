import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const { password } = await req.json()

  console.log("🔐 Login attempt")

  if (password !== process.env.ADMIN_PASSWORD) {
    console.log("❌ Wrong password")
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  console.log("✅ Password correct")

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  )

  console.log("🎟 Token created:", token.substring(0, 20) + "...")

  const response = NextResponse.json({ success: true })

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })

  console.log("🍪 Cookie set")

  return response
}
