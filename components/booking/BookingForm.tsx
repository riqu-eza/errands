"use client"

import { useState } from "react"
import { Textarea } from "../ui/Textarea"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

export const BookingForm = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = Object.fromEntries(formData.entries())

    await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    })

    setLoading(false)
    alert("Booking submitted successfully!")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto"
    >
      <Input label="Full Name" name="customerName" required />
      <Input label="Phone" name="phone" required />
      <Input label="Pickup Location" name="pickupLocation" required />
      <Input label="Preferred Date" type="datetime-local" name="scheduledAt" required />
      <Textarea label="Errand Description" name="description" required />
      <Button type="submit">
        {loading ? "Submitting..." : "Book Now"}
      </Button>
    </form>
  )
}
