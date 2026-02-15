/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Booking } from "@/app/models/Booking"
import { NextResponse } from "next/server"

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, context: Context) {
  const { id } = await context.params

  try {
    await connectDB()

    const booking = await Booking.findById(id)
      .populate("service")
      .populate("review")

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }
}

export async function PATCH(req: Request, context: Context) {
  const { id } = await context.params

  try {
    await connectDB()
    const body = await req.json()

    const updated = await Booking.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" } // ✅ fixes mongoose warning
    )

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
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

    const deleted = await Booking.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Booking deleted" })
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 })
  }
}
