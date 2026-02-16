/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb";
import { Booking } from "@/app/models/Booking";
import { Review } from "@/app/models/Review";
import { Service } from "@/app/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const [bookings, services, reviews] = await Promise.all([
      Booking.countDocuments(),
      Service.countDocuments(),
      Review.countDocuments(),
    ]);

    return NextResponse.json({ bookings, services, reviews });
  } catch (error: any) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 });
  }
}
