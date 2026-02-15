import { StatusBadge } from "./StatusBadge"

interface Booking {
  _id: string
  customerName: string
  phone: string
  status: string
}

interface Props {
  bookings: Booking[]
}

export const BookingTable = ({ bookings }: Props) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="p-3">Customer</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b._id} className="border-b">
            <td className="p-3">{b.customerName}</td>
            <td className="p-3">{b.phone}</td>
            <td className="p-3">
              <StatusBadge status={b.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
