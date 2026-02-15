/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/app/lib/mongodb"
import { Booking } from "@/app/models/Booking"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    const bookings = await Booking.find()
      .populate("service")
      .populate("review")
      .sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const booking = await Booking.create(body)

    return NextResponse.json(booking, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 400 }
    )
  }
}
