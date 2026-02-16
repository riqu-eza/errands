import { Star } from "lucide-react"

interface Review {
  _id: string
  rating: number
  comment: string
  isApproved: boolean
  booking?: {
    customerName: string
    service?: {
      name: string
    }
    phone?: string
    scheduledAt?: string
  }
  createdAt?: string
}

interface Props {
  reviews: Review[]
  showService?: boolean
  showDate?: boolean
  variant?: "grid" | "list" | "compact"
}

export const Reviews = ({ reviews, showService = false, showDate = false, variant = "grid" }: Props) => {
  // Only show approved reviews
  const approvedReviews = reviews.filter(review => review.isApproved)

  if (approvedReviews.length === 0) {
    return (
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
        </div>
      </section>
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 stroke-yellow-400' 
                : 'stroke-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // Grid Layout (Default)
  if (variant === "grid") {
    return (
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
         

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((review) => (
              <div 
                key={review._id} 
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
              >
                {/* Rating */}
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-4">
                  &#34;{review.comment}&#34;
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {review.booking?.customerName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {review.booking?.customerName || 'Anonymous'}
                    </p>
                    {showService && review.booking?.service && (
                      <p className="text-xs text-gray-500">
                        {review.booking.service.name}
                      </p>
                    )}
                    {showDate && review.createdAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // List Layout
  if (variant === "list") {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {approvedReviews.map((review) => (
            <div 
              key={review._id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.booking?.customerName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.booking?.customerName || 'Anonymous'}
                    </h3>
                    {showService && review.booking?.service && (
                      <p className="text-sm text-gray-500">
                        {review.booking.service.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 pl-15 ml-15">
                &#34;{review.comment}&#34;
              </p>

              {showDate && review.createdAt && (
                <p className="text-xs text-gray-400 mt-3 text-right">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Compact Layout (for sidebars or small sections)
  return (
    <div className="space-y-4">
      {approvedReviews.slice(0, 3).map((review) => (
        <div key={review._id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
          <div className="flex items-center gap-2 mb-2">
            {renderStars(review.rating)}
            <span className="text-xs text-gray-400">
              {review.booking?.customerName || 'Anonymous'}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            &#34;{review.comment}&#34;
          </p>
        </div>
      ))}
    </div>
  )
}

// Hero section variant with large featured reviews
export const FeaturedReviews = ({ reviews }: Props) => {
  const approvedReviews = reviews.filter(review => review.isApproved)
  const featuredReviews = approvedReviews.slice(0, 2)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {featuredReviews.map((review, index) => (
        <div 
          key={review._id} 
          className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 ${
            index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
          }`}
        >
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${
                  i < review.rating 
                    ? 'fill-yellow-400 stroke-yellow-400' 
                    : 'stroke-gray-300'
                }`} 
              />
            ))}
          </div>
          <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
            &#34;{review.comment}&#34;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {review.booking?.customerName?.charAt(0) || 'C'}
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {review.booking?.customerName || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                {review.booking?.service?.name || 'Happy Customer'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}