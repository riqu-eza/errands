/* eslint-disable @typescript-eslint/no-explicit-any */
import webpush from "web-push";
import { connectDB } from "./mongodb";
import { PushSubscription } from "../models/PushSubscription";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendBookingNotification(booking: any) {
  await connectDB();

  const subscriptions = await PushSubscription.find();

  if (subscriptions.length === 0) return;

  const payload = JSON.stringify({
    title: "🔔 New Booking Received!",
    body: `${booking.customerName} booked for ${new Date(booking.scheduledAt).toLocaleString()}`,
    data: {
      url: "/admin/bookings",
      bookingId: booking._id,
    },
  });

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
        },
        payload
      ).catch(async (err) => {
        // Remove expired/invalid subscriptions (410 = Gone)
        if (err.statusCode === 410) {
          await PushSubscription.deleteOne({ endpoint: sub.endpoint });
        }
        throw err;
      })
    )
  );

  console.log(`Push sent: ${results.filter(r => r.status === "fulfilled").length} success`);
}