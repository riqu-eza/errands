/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb";
import { PushSubscription } from "@/app/models/PushSubscription";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const subscription = await req.json();

    // Save or update subscription (upsert so no duplicates)
    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}