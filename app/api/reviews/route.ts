/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Review } from "@/app/models/Review"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 10;

    const reviews = await Review.find()
      .populate({
        path: "booking",
        select: "service customerName scheduledAt",
        populate: {
          path: "service",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("GET /api/reviews error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
      },
      { status: 500 }
    );
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
