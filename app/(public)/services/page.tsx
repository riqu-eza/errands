/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // required for useState and useEffect

import { useEffect, useState } from "react";
import { ServiceCard } from "@/components/marketing/ServiceCard";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        // API returns array directly
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl text-gray-700 font-bold mb-4">
          Our Services
        </h1>
        <p className="text-xl text-blue-600 max-w-2xl mx-auto">
          Comprehensive errand solutions tailored to your needs
        </p>
      </section>

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading...</div>
      ) : services.length > 0 ? (
        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">No services found</div>
      )}
    </div>
  );
}
