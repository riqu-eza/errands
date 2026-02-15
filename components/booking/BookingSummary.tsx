interface Props {
  booking: {
    customerName: string
    status: string
    scheduledAt: string
  }
}

export const BookingSummary = ({ booking }: Props) => {
  return (
    <div className="border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">
        Booking Summary
      </h3>
      <p>Name: {booking.customerName}</p>
      <p>Status: {booking.status}</p>
      <p>Date: {new Date(booking.scheduledAt).toLocaleString()}</p>
    </div>
  )
}
