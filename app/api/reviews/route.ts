/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Review } from "@/app/models/Review"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    const reviews = await Review.find()
      .populate("booking")
      .sort({ createdAt: -1 })

    return NextResponse.json(reviews)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const review = await Review.create(body)

    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
