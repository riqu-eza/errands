/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic"


import { connectDB } from "@/app/lib/mongodb";
import { Review } from "@/app/models/Review";
import { Reviews } from "@/components/marketing/Testimonials";
import { Star,  } from "lucide-react";
import "@/app/models/Booking"
import "@/app/models/Service"

async function getReviews() {
  await connectDB();
  
  // Populate the booking field and then populate service inside booking
  const reviews = await Review.find()
    .populate({
      path: 'booking',
      model: 'Booking',
      select: 'customerName service scheduledAt phone pickupLocation',
      populate: {
        path: 'service',
        model: 'Service',
        select: 'name'
      }
    })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean(); // Use lean() for better performance
  
  // Convert MongoDB documents to plain objects
  return JSON.parse(JSON.stringify(reviews));
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc: number, review: any) => acc + (review.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  const ratingCounts = {
    5: reviews.filter((r: any) => (r.rating || 5) === 5).length,
    4: reviews.filter((r: any) => r.rating === 4).length,
    3: reviews.filter((r: any) => r.rating === 3).length,
    2: reviews.filter((r: any) => r.rating === 2).length,
    1: reviews.filter((r: any) => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Reviews
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our clients say about our errand services in Nairobi
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="text-6xl font-bold text-blue-600 mb-2">{avgRating}</div>
              <div className="flex justify-center md:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(parseFloat(avgRating))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{
                        width: `${(ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
       

        {/* Reviews Grid */}
     <Reviews reviews={reviews} showService showDate />

      
      </div>
    </div>
  );
}