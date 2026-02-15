import { connectDB } from "@/app/lib/mongodb"
import { Booking } from "@/app/models/Booking"
import { Review } from "@/app/models/Review"
import { Service } from "@/app/models/Service"

async function getCounts() {
  await connectDB()

  const [bookings, services, reviews] = await Promise.all([
    Booking.countDocuments(),
    Service.countDocuments(),
    Review.countDocuments(),
  ])

  return { bookings, services, reviews }
}
export default async function AdminDashboard() {
  const stats = await getCounts()

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 text-gray-600 gap-6">
        <StatCard title="Bookings" value={stats.bookings} />
        <StatCard title="Services" value={stats.services} />
        <StatCard title="Reviews" value={stats.reviews} />
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}
