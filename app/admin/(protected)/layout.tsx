import { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl text-black font-bold mb-8">Admin Panel</h2>

        <nav className="flex text-gray-700 flex-col space-y-4 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/bookings">Bookings</Link>
          <Link href="/admin/services">Services</Link>
          <Link href="/admin/reviews">Reviews</Link>
        </nav>

        <form action="/api/admin/logout" method="POST" className="mt-10">
          <button className="text-red-500 text-sm">
            Logout
          </button>
        </form>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}
