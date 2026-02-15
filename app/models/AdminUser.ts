import { Schema, model, models } from "mongoose"

export interface IAdminUser {
  _id: string
  name: string
  email: string
  password: string
  role: "SUPER_ADMIN" | "STAFF"
  createdAt: Date
  updatedAt: Date
}

const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "STAFF"],
      default: "STAFF",
    },
  },
  { timestamps: true }
)

export const AdminUser =
  models.AdminUser || model("AdminUser", AdminUserSchema)
