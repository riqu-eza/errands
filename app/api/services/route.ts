/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb"
import { Service } from "@/app/models/Service"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    const services = await Service.find().sort({ createdAt: -1 })

    return NextResponse.json(services)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const service = await Service.create(body)

    return NextResponse.json(service, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
