"use client";

import { useState, useEffect } from "react";
import { Calendar, User, Mail, Package, Clock, AlertCircle, CheckCircle, MapPin, Flag, Phone } from "lucide-react";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice?: number;
  isActive: boolean;
}

export default function BookPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services?isActive=true");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setFetchingServices(false);
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    const selected = services.find(s => s._id === serviceId);
    if (selected?.basePrice) {
      // Simple price estimation logic - you can make this more sophisticated
      setEstimatedPrice(selected.basePrice);
    } else {
      setEstimatedPrice(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    const data = {
      service: formData.get("serviceId"),
      customerName: formData.get("customerName"),
      phone: formData.get("phone"),
      email: formData.get("email") || undefined,
      pickupLocation: formData.get("pickupLocation")  || undefined,
      dropoffLocation: formData.get("dropoffLocation") || undefined,
      description: formData.get("description"),
      scheduledAt: new Date(`${formData.get("date")}T${formData.get("time")}`).toISOString() || undefined , 
      urgency: formData.get("urgency"),
    };
  console.log("Submitting booking data:", data);  
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  console.log("Booking API response:", res);
      if (res.ok) {
        setSuccess(true);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Thank you for choosing ErrandPro. We&#39;ve received your booking request 
            and will contact you within 15 minutes to confirm the details.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-blue-800 mb-2">📋 What happens next?</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Our team will review your request</li>
              <li>• You&#39;ll receive a confirmation call/SMS</li>
              <li>• We&#39;ll assign a trusted runner</li>
              {/* <li>• Track your errand in real-time</li> */}
            </ul>
          </div>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Home
            </Link>
            {/* <Link 
              href="/track"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
            >
              Track Your Errand
            </Link> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book an Errand
          </h1>
          <p className="text-gray-600 text-lg">
            Tell us what you need done, and we'll handle the rest
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-4">
          {["Details", "Schedule", "Confirm"].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {index + 1}
              </div>
              {index < 2 && <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>}
            </div>
          ))}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Service Selection - Now from Database */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Select Service
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type *
              </label>
              <select
                name="serviceId"
                onChange={handleServiceChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white"
                required
                disabled={fetchingServices}
              >
                <option value="">
                  {fetchingServices ? "Loading services..." : "Choose a service"}
                </option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} {service.basePrice ? `- $${service.basePrice}` : ''}
                  </option>
                ))}
              </select>
              {services.length === 0 && !fetchingServices && (
                <p className="text-sm text-red-500 mt-1">No services available at the moment</p>
              )}
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  name="customerName"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location *
              </label>
              <input
                name="pickupLocation"
                type="text"
                placeholder="Enter pickup address in Nairobi"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dropoff Location (Optional)
              </label>
              <input
                name="dropoffLocation"
                type="text"
                placeholder="Enter destination address if applicable"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Schedule
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
           </div>

          {/* Urgency Level */}
          {/* <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Flag className="w-5 h-5 text-blue-600" />
              Urgency Level
            </h2>
            <div>
              <select
                name="urgency"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              >
                <option value="low">Low - Within 3 days</option>
                <option value="medium">Medium - Within 24 hours</option>
                <option value="high">High - Within 4 hours</option>
                <option value="emergency">Emergency - ASAP</option>
              </select>
            </div>
          </div> */}

          {/* Description */}
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Errand Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Errand *
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Please provide detailed information about what you need done..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                required
              />
            </div>
          </div>

          {/* Price Estimate */}
          {estimatedPrice && (
            <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
              <span className="text-blue-800 font-medium">Estimated Price:</span>
              <span className="text-2xl font-bold text-blue-600">
                KES {estimatedPrice.toLocaleString()}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || fetchingServices || services.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-gray-500">
            <span>🔒 Secure Booking</span>
            <span>⚡ Instant Confirmation</span>
            <span>🛡️ Insured Service</span>
          </div>
        </form>
      </div>
    </div>
  );
}