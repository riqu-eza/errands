export interface IService {
  _id: string
  name: string
  description: string
  basePrice?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}


import { Schema, model, models } from "mongoose"

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const Service =
  models.Service || model("Service", ServiceSchema)
