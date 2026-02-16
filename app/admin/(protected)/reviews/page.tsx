/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { 
  Star, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Search, 
  RefreshCw,
  User,
  Calendar,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  AlertCircle,
  Clock
} from "lucide-react"

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterApproved, setFilterApproved] = useState<string>("ALL")
  const [filterRating, setFilterRating] = useState<number>(0)
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/reviews")
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Fetch failed:", err)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  async function approveReview(id: string, value: boolean) {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: value }),
    })

    const updated = await res.json()
    setReviews(prev => prev.map(r => (r._id === id ? updated : r)))
  }

  async function deleteReview(id: string) {
    await fetch(`/api/reviews/${id}`, { method: "DELETE" })
    setReviews(prev => prev.filter(r => r._id !== id))
    setShowDeleteConfirm(null)
  }

  const getStats = () => {
    const total = reviews.length
    const approved = reviews.filter(r => r.isApproved).length
    const pending = reviews.filter(r => !r.isApproved).length
    const averageRating = reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0
    
    return { total, approved, pending, averageRating }
  }

  const stats = getStats()

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userPhone?.includes(searchTerm)
    
    const matchesApproved = filterApproved === "ALL" || 
      (filterApproved === "APPROVED" && review.isApproved) ||
      (filterApproved === "PENDING" && !review.isApproved)
    
    const matchesRating = filterRating === 0 || review.rating === filterRating
    
    return matchesSearch && matchesApproved && matchesRating
  })

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reviews Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and moderate customer reviews</p>
            </div>
            <button
              onClick={fetchReviews}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Rating</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone or review content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterApproved}
                onChange={(e) => setFilterApproved(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="ALL">All Reviews</option>
                <option value="APPROVED">Approved Only</option>
                <option value="PENDING">Pending Only</option>
              </select>
              
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No reviews found</p>
            <p className="text-sm text-gray-500">
              {searchTerm || filterApproved !== "ALL" || filterRating !== 0
                ? "Try adjusting your filters"
                : "Reviews will appear here once customers start leaving feedback"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {review.userName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.userName || 'Anonymous'}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <User className="w-3 h-3" />
                          <span>{review.userPhone || 'No phone'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-gray-900">{review.rating}</span>
                        <span className="text-sm text-gray-400">/5</span>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    &#34;{review.comment}&#34;
                  </p>

                  {/* Booking Reference if exists */}
                  {review.booking && (
                    <div className="mt-3 text-xs text-gray-400">
                      Booking ID: {review.booking._id?.slice(-8) || 'N/A'}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {review.createdAt 
                          ? new Date(review.createdAt).toLocaleDateString()
                          : 'Unknown date'
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Approval Status Badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        review.isApproved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.isApproved ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Pending
                          </>
                        )}
                      </span>

                      {/* Actions */}
                      {showDeleteConfirm === review._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteReview(review._id)}
                            className="p-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="p-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => approveReview(review._id, !review.isApproved)}
                            className={`p-2 rounded-lg transition-colors ${
                              review.isApproved 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                            title={review.isApproved ? 'Unapprove' : 'Approve'}
                          >
                            {review.isApproved ? (
                              <ThumbsUp className="w-4 h-4" />
                            ) : (
                              <ThumbsDown className="w-4 h-4" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => setShowDeleteConfirm(review._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredReviews.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Showing <span className="font-medium text-gray-900">{filteredReviews.length}</span> of{" "}
                <span className="font-medium text-gray-900">{reviews.length}</span> reviews
              </span>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Approved: <span className="font-medium text-green-600">{stats.approved}</span>
                </span>
                <span className="text-gray-600">
                  Pending: <span className="font-medium text-yellow-600">{stats.pending}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Review Details</h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Customer Information</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {selectedReview.userName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{selectedReview.userName || 'Anonymous'}</div>
                      <div className="text-sm text-gray-500">{selectedReview.userPhone || 'No phone'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <span className="text-xs text-gray-400">Rating</span>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(selectedReview.rating)}
                        <span className="text-sm font-medium text-gray-900 ml-1">
                          ({selectedReview.rating}/5)
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-400">Status</span>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedReview.isApproved 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {selectedReview.isApproved ? 'Approved' : 'Pending Approval'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Review</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    &#34;{selectedReview.comment}&#34;
                  </p>
                </div>
              </div>

              {/* Booking Info if available */}
              {selectedReview.booking && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Related Booking</h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600">
                      Booking ID: {selectedReview.booking._id}
                    </p>
                    {/* Add more booking details as needed */}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Timeline</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">
                      {selectedReview.createdAt 
                        ? new Date(selectedReview.createdAt).toLocaleString()
                        : 'Unknown'
                      }
                    </span>
                  </div>
                  {selectedReview.updatedAt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="text-gray-900">
                        {new Date(selectedReview.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    approveReview(selectedReview._id, !selectedReview.isApproved)
                    setSelectedReview(null)
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  {selectedReview.isApproved ? 'Unapprove Review' : 'Approve Review'}
                </button>
                <button
                  onClick={() => {
                    deleteReview(selectedReview._id)
                    setSelectedReview(null)
                  }}
                  className="px-6 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}