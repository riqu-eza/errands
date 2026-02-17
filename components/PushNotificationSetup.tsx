/* eslint-disable react-hooks/immutability */
// app/admin/components/PushNotificationSetup.tsx
"use client";

import { useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
}

export default function PushNotificationSetup() {
  useEffect(() => {
    setupPushNotifications();
  }, []);

  async function setupPushNotifications() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Check existing permission
      if (Notification.permission === "denied") return;

      // Request permission if not yet granted
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      // Check if already subscribed
      const existing = await registration.pushManager.getSubscription();
      if (existing) return; // already set up ✅

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

      // Send to backend
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      console.log("✅ Push notifications enabled");
    } catch (err) {
      console.error("Push setup failed:", err);
    }
  }

  return null; // invisible component, runs silently in background
}