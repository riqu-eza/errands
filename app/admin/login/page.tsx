"use client"

import { useState } from "react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      window.location.href = "/admin"
    } else {
      alert("Access denied")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-xl rounded-2xl space-y-4 w-96"
      >
        <h1 className="text-xl font-bold text-center">Admin Access</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          className="border w-full p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full p-3 rounded"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  )
}
