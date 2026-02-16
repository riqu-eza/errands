"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ bookings: number; services: number; reviews: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-gray-500">Loading stats...</div>
      ) : stats ? (
        <div className="grid md:grid-cols-3 text-gray-600 gap-6">
          <StatCard title="Bookings" value={stats.bookings} />
          <StatCard title="Services" value={stats.services} />
          <StatCard title="Reviews" value={stats.reviews} />
        </div>
      ) : (
        <div className="text-red-500">Failed to load stats</div>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
