/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic"

import Link from "next/link";
import { connectDB } from "../lib/mongodb";
import { Service } from "../models/Service";
import { Review } from "../models/Review";
import { Hero } from "@/components/marketing/Hero";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  FileText,
  Package,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/marketing/ServiceCard";

// Service icons mapping
const serviceIcons: Record<string, any> = {
  grocery: ShoppingBag,
  document: FileText,
  package: Package,
  default: Calendar,
};

async function getData() {
  await connectDB();

  const services = await Service.find().limit(6); // Increased to 6 for better grid
  const reviews = await Review.find().limit(4); // Increased to 4 for better layout

  return { services, reviews };
}

export default async function HomePage() {
  const { services, reviews } = await getData();

  // Stats data (you can fetch these from DB later)
  const stats = [
    { label: "Errands Completed", value: "10K+" },
    { label: "Happy Clients", value: "5K+" },
    { label: "Avg Response Time", value: "< 30min" },
    { label: "Coverage Area", value: "Nairobi" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        {/* <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Services Section */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              {/* <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                What We Handle
              </h2> */}
              <p className="text-gray-600 text-lg">
                From A to Z, we&#39;ve got your errands covered
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

          {/* Mobile view all link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-medium"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Reviews Section with Stars */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Trusted by Nairobi
            </h2>
            <p className="text-gray-600 text-lg">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review: any) => (
              <div
                key={review._id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < (review.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  &#34;
                  {review.comment ||
                    "Amazing service! They handled everything perfectly and saved me so much time."}
                  &#34;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.userName?.[0] || "J"}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {review.userName || "John Doe"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.location || "Nairobi"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Save Time?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of Nairobi residents who&#39;ve reclaimed their time with
            us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button
                className="bg-emerald-300 text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-lg"
              >
                Book Your First Errand
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                
                className="border-white text-white flex hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer note */}
        
      </div>
    </div>
  );
}
