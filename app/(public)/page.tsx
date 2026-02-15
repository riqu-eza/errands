"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { ArrowRight, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reviews } from "@/components/marketing/Testimonials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function HomePage() {
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, reviewsRes] = await Promise.all([
          fetch("/api/services?limit=6"),
          fetch("/api/reviews?limit=4"),
        ]);

        if (!servicesRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const servicesData = await servicesRes.json();
        const reviewsData = await reviewsRes.json();

        console.log("Fetched services:", servicesData);
        console.log("Fetched reviews:", reviewsData);

        // Normalize services data to match IService
        const normalizedServices = (servicesData.data ?? servicesData ?? []).map((s: any) => ({
          _id: s._id,
          name: s.name,
          description: s.description,
          basePrice: s.basePrice ?? null, // explicitly null if missing
          isActive: s.isActive ?? true, // default to true
        }));

        console.log("Normalized services:", normalizedServices);

        setServices(normalizedServices);
        setReviews(reviewsData.data ?? reviewsData ?? []);
      } catch (error) {
        console.error("Failed to load home data", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
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
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Services</h2>
              <p className="text-gray-600 text-lg">
                From A to Z, we&#39;ve got your errands covered
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No services available at the moment.
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">Trusted by Nairobi</h2>
            <p className="text-gray-600 text-lg">
              Real reviews from real customers
            </p>
          </div>

          {reviews.length > 0 ? (
           <Reviews reviews={reviews} showService showDate />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No reviews yet. Be the first to leave one!
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Time?</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="bg-emerald-300 text-blue-600 px-8 py-6 hover:bg-emerald-400">
                Book Your First Errand
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="border-white text-white px-8 py-6 hover:bg-white/10">
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