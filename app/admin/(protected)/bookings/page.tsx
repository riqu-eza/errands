/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Package, 
  Clock,
  Flag,
  MoreVertical,
  Search,
  Filter,
  Download,
  Trash2,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock3,
  Truck,
  RefreshCw
} from "lucide-react"

const statusColors = {
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock3 },
  CONFIRMED: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle },
  IN_PROGRESS: { bg: "bg-purple-100", text: "text-purple-700", icon: Truck },
  COMPLETED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  CANCELLED: { bg: "bg-red-100", text: "text-red-700", icon: XCircle }
}

const urgencyColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  emergency: "bg-red-100 text-red-700"
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/bookings")
      const data = await res.json()
      if (Array.isArray(data)) {
        setBookings(data)
      } else {
        setBookings([])
      }
    } catch (err) {
      console.error("Fetch failed:", err)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    setBookings(prev =>
      prev.map(b => (b._id === id ? { ...b, status } : b))
    )
  }

  async function deleteBooking(id: string) {
    await fetch(`/api/bookings/${id}`, { method: "DELETE" })
    setBookings(prev => prev.filter(b => b._id !== id))
    setShowDeleteConfirm(null)
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm) ||
      booking.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickupLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStats = () => {
    const total = bookings.length
    const pending = bookings.filter(b => b.status === "PENDING").length
    const inProgress = bookings.filter(b => b.status === "IN_PROGRESS").length
    const completed = bookings.filter(b => b.status === "COMPLETED").length
    
    return { total, pending, inProgress, completed }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track all customer bookings</p>
            </div>
            <button
              onClick={fetchBookings}
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
                <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                placeholder="Search by name, phone, service or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className="text-gray-500">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">No bookings found</p>
              <p className="text-sm text-gray-500">
                {searchTerm || statusFilter !== "ALL" 
                  ? "Try adjusting your filters" 
                  : "Bookings will appear here once customers start booking"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => {
                    const StatusIcon = statusColors[booking.status as keyof typeof statusColors]?.icon || Clock
                    
                    return (
                      <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                              {booking.customerName?.charAt(0) || '?'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{booking.customerName}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Phone className="w-3 h-3" />
                                <span>{booking.phone}</span>
                              </div>
                              {booking.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate max-w-[150px]">{booking.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {booking.service?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-[200px]">
                            {booking.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(booking.scheduledAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{new Date(booking.scheduledAt).toLocaleTimeString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate max-w-[150px]">{booking.pickupLocation}</span>
                          </div>
                          {booking.dropoffLocation && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="truncate max-w-[150px]">→ {booking.dropoffLocation}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            urgencyColors[booking.urgency as keyof typeof urgencyColors]
                          }`}>
                            {booking.urgency || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <select
                              value={booking.status}
                              onChange={(e) => updateStatus(booking._id, e.target.value)}
                              className={`appearance-none pl-8 pr-8 py-1.5 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-offset-2 ${
                                statusColors[booking.status as keyof typeof statusColors]?.bg || 'bg-gray-100'
                              } ${statusColors[booking.status as keyof typeof statusColors]?.text || 'text-gray-700'}`}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="CONFIRMED">Confirmed</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                            <StatusIcon className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              statusColors[booking.status as keyof typeof statusColors]?.text || 'text-gray-500'
                            }`} />
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {showDeleteConfirm === booking._id ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => deleteBooking(booking._id)}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(booking._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {filteredBookings.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Showing <span className="font-medium text-gray-900">{filteredBookings.length}</span> of{" "}
                  <span className="font-medium text-gray-900">{bookings.length}</span> bookings
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    Page 1 of 1
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
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
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedBooking.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedBooking.phone}</span>
                  </div>
                  {selectedBooking.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{selectedBooking.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Service Details</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{selectedBooking.service?.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-6">{selectedBooking.description}</p>
                </div>
              </div>

              {/* Location Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Location</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-400">Pickup</span>
                      <p className="text-gray-900">{selectedBooking.pickupLocation}</p>
                    </div>
                  </div>
                  {selectedBooking.dropoffLocation && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-xs text-gray-400">Dropoff</span>
                        <p className="text-gray-900">{selectedBooking.dropoffLocation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Schedule</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {new Date(selectedBooking.scheduledAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {new Date(selectedBooking.scheduledAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Status</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-gray-400" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        urgencyColors[selectedBooking.urgency as keyof typeof urgencyColors]
                      }`}>
                        {selectedBooking.urgency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[selectedBooking.status as keyof typeof statusColors]?.bg
                      } ${statusColors[selectedBooking.status as keyof typeof statusColors]?.text}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Created At */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Created</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}