import { connectDB } from "@/app/lib/mongodb"
import { AdminUser } from "@/app/models/AdminUser"
import bcrypt from "bcryptjs"

async function createAdmin() {
  await connectDB()

  const hashed = await bcrypt.hash("admin123", 10)

  await AdminUser.create({
    name: "Super Admin",
    email: "admin@errands.com",
    password: hashed,
    role: "SUPER_ADMIN",
  })

  console.log("Admin created")
  process.exit()
}

createAdmin()
