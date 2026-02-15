"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { ArrowRight, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/marketing/ServiceCard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function HomePage() {
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  async function loadData() {
    try {
      const [servicesRes, reviewsRes] = await Promise.all([
        fetch("/api/services?limit=6"),
        fetch("/api/reviews?limit=4"),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();

      console.log("Fetched services:", servicesData);
      console.log("Fetched reviews:", reviewsData);

      // Normalize services data to match IService
      const normalizedServices = (servicesData.data ?? []).map((s: any) => ({
        _id: s._id,
        name: s.name,
        description: s.description,
        basePrice: s.basePrice ?? null, // default if missing
        isActive: s.isActive ?? true,   // default to true
      }));

      setServices(normalizedServices);
      setReviews(reviewsData.data ?? []);
    } catch (error) {
      console.error("Failed to load home data", error);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <Hero />

        {/* Services Section */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <p className="text-gray-600 text-lg">
              From A to Z, we&#39;ve got your errands covered
            </p>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map((service) => (
    <ServiceCard key={service._id} service={service} />
  ))}
</div>

        </section>

        {/* Reviews Section */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">
              Trusted by Nairobi
            </h2>
            <p className="text-gray-600 text-lg">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-8 rounded-2xl shadow-sm border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (review.rating ?? 5)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 italic">
                  “{review.comment}”
                </p>

                <div className="font-semibold">
                  {review.userName ?? "Anonymous"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Save Time?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="bg-emerald-300 text-blue-600 px-8 py-6">
                Book Your First Errand
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="border-white text-white px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
