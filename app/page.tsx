"use client"

import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const handleDonate = async () => {

    // ✅ Get logged in user (clean way)
    const { data: { user } } = await supabase.auth.getUser()

    // ❌ If not logged in
    if (!user) {
      alert("Please login first")
      window.location.href = "/login"
      return
    }

    // ✅ Insert donation into database
    const { error } = await supabase
      .from("donations")
      .insert([
        {
          amount: 100,
          user_email: user.email
        }
      ])

    // ✅ Handle response
    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Donation successful!")
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Golf Charity Platform</h1>

      <button
  onClick={() => window.location.href = "/dashboard"}
  style={{
    padding: "12px 20px",
    backgroundColor: "purple",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }}
>
  Go to Dashboard
</button>
    </div>
  )
}