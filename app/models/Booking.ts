import { Schema, model, models } from "mongoose"

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Urgency {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
}

export interface IBooking {
  _id: string
  service: string // ObjectId
  customerName: string
  phone: string
  email?: string
  pickupLocation: string
  dropoffLocation?: string
  description: string
  scheduledAt: Date
  urgency: Urgency
  status: BookingStatus
  review?: string // ObjectId
  createdAt: Date
  updatedAt: Date
}


const BookingSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
      index: true,
    },
    urgency: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH"],
      default: "NORMAL",
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
      index: true,
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
)

export const Booking =
  models.Booking || model("Booking", BookingSchema)
