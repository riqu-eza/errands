"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Reviews } from "@/components/marketing/Testimonials";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews?limit=20");
        const json = await res.json();

        if (json.success) {
          setReviews(json.data);
        } else {
          console.error("Failed to load reviews");
        }
      } catch (err) {
        console.error("Error loading reviews", err);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading reviews...
      </div>
    );
  }

  // ⭐ Calculations
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 5), 0) /
          reviews.length
        ).toFixed(1)
      : "5.0";

  const ratingCounts: Record<number, number> = {
    5: reviews.filter((r) => (r.rating || 5) === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Reviews
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our clients say about our errand services in Nairobi
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Average */}
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {avgRating}
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(Number(avgRating))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                Based on {reviews.length} reviews
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-8 text-sm">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-purple-500"
                      style={{
                        width: `${
                          reviews.length
                            ? (ratingCounts[rating] / reviews.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600">
                    {ratingCounts[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <Reviews reviews={reviews} showService showDate />
      </div>
    </div>
  );
}
