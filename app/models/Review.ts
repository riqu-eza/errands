import { Schema, model, models } from "mongoose"


export interface IReview {
  _id: string
  booking: string // ObjectId
  rating: number
  comment: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true, // One review per booking
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
)

export const Review =
  models.Review || model("Review", ReviewSchema)
