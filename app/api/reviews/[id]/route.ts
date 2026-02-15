/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Review } from "@/app/models/Review"
import { NextResponse } from "next/server"

type Context = {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, context: Context) {
  const { id } = await context.params

  try {
    await connectDB()
    const body = await req.json()

    const updated = await Review.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" } // ✅ replaces deprecated `new`
    )

    if (!updated) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Update failed" },
      { status: 400 }
    )
  }
}

export async function DELETE(req: Request, context: Context) {
  const { id } = await context.params

  try {
    await connectDB()

    const deleted = await Review.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Review deleted" })
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 })
  }
}
