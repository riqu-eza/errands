self.addEventListener("push", function (event) {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/jderrandslogo.jpeg", // swap with your icon
      badge: "/badge.png",
      data: data.data,
      requireInteraction: true, // stays on screen until dismissed
      actions: [
        { action: "view", title: "View Booking" },
        { action: "dismiss", title: "Dismiss" },
      ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.action === "view" || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/admin/bookings"));
  }
});