/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Service } from "@/app/models/Service"
import { NextResponse, NextRequest } from "next/server"

type Context = {
  params: Promise<{ id: string }>
}

export async function PATCH(
  request: NextRequest,
  context: Context
) {
  const { id } = await context.params

  try {
    await connectDB()
    const body = await request.json()

    const updated = await Service.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" } // ✅ replaces deprecated `new`
    )

    if (!updated) {
      return NextResponse.json(
        { error: "Service not found" },
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

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  const { id } = await context.params

  try {
    await connectDB()

    const deleted = await Service.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Service deleted" })
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 })
  }
}
