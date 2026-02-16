/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Phone, Star, Package, Calendar, MapPin, Clock, ChevronRight, LogIn, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Booking {
  _id: string;
  service: {
    _id: string;
    name: string;
    basePrice?: number;
  };
  customerName: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  description: string;
  scheduledAt: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  status: 'PENDING' | 'CONFIRMED' | 'IN-PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

interface ReviewForm {
  bookingId: string;
  rating: number;
  comment: string;
}

export default function ProfilePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    bookingId: "",
    rating: 5,
    comment: ""
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Load phone from localStorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      handleLogin(savedPhone);
    }
  }, []);

  const handleLogin = async (phone?: string) => {
    const phoneToUse = phone || phoneNumber;
    
    if (!phoneToUse || phoneToUse.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch bookings for this phone number
      const res = await fetch(`/api/bookings?phone=${encodeURIComponent(phoneToUse)}`);
      
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        setIsLoggedIn(true);
        localStorage.setItem("userPhone", phoneToUse);
      } else {
        setError("No bookings found for this number");
      }
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber("");
    setBookings([]);
    localStorage.removeItem("userPhone");
  };

  const openReviewModal = (booking: Booking) => {
    setSelectedBooking(booking._id);
    setReviewForm({
      bookingId: booking._id,
      rating: 5,
      comment: ""
    });
  };

  const submitReview = async () => {
    if (!reviewForm.comment.trim()) {
      setError("Please write a review comment");
      return;
    }

    setSubmittingReview(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking: reviewForm.bookingId,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          userName: bookings.find(b => b._id === reviewForm.bookingId)?.customerName,
          userPhone: phoneNumber
        }),
      });

      if (res.ok) {
        setReviewSuccess(true);
        setTimeout(() => {
          setSelectedBooking(null);
          setReviewSuccess(false);
          setReviewForm({ bookingId: "", rating: 5, comment: "" });
          // Refresh bookings to update status
          handleLogin();
        }, 2000);
      } else {
        setError("Failed to submit review");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-purple-100 text-purple-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch(urgency) {
      case 'emergency': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Enter your phone number to view your bookings and profile
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Phone Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We&#39;ll use this to fetch your booking history
              </p>
            </div>

            {/* Login Button */}
            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Checking...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  View My Bookings
                </>
              )}
            </button>

            {/* Demo Note */}
            <p className="text-xs text-center text-gray-400 mt-6">
              Use the same number you provided when booking
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Profile Screen with Bookings
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {bookings[0]?.customerName?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {bookings[0]?.customerName || 'Your Profile'}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{phoneNumber}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
            <div className="text-xs text-gray-500">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'COMPLETED').length}
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'IN-PROGRESS' || b.status === 'CONFIRMED').length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Your Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No bookings found</p>
              <p className="text-sm text-gray-400">Book your first errand to get started</p>
              <Link 
                href="/book"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {booking.service?.name || 'Service'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{booking.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.scheduledAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(booking.scheduledAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{booking.pickupLocation}</span>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getUrgencyBadge(booking.urgency)}`}>
                        {booking.urgency}
                      </span>
                    </div>
                  </div>

                  {/* Review Button for Completed Bookings */}
                  {booking.status === 'COMPLETED' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => openReviewModal(booking)}
                        className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700"
                      >
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        Leave a Review
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            
            {reviewSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Thank You!</p>
                <p className="text-sm text-gray-500">Your review has been submitted</p>
              </div>
            ) : (
              <>
                {/* Rating Stars */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= reviewForm.rating 
                              ? 'fill-yellow-400 stroke-yellow-400' 
                              : 'stroke-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Comment */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={submitReview}
                    disabled={submittingReview}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}