"use client"

import { supabase } from "../../lib/supabaseClient"

export default function Subscription() {

  const choosePlan = async (plan: string) => {
    const user = (await supabase.auth.getUser()).data.user

    if (!user) {
      alert("Login required")
      return
    }

    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        subscription: plan
      })

    alert("Subscribed to " + plan)

    window.location.href = "/dashboard"
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Select Subscription Plan 💳</h1>

      {/* MONTHLY */}
      <div style={card}>
        <h3>Monthly Plan</h3>
        <p>₹100/month</p>
        <button onClick={() => choosePlan("Monthly")}>
          Choose Monthly
        </button>
      </div>

      {/* YEARLY */}
      <div style={card}>
        <h3>Yearly Plan</h3>
        <p>₹1000/year</p>
        <button onClick={() => choosePlan("Yearly")}>
          Choose Yearly
        </button>
      </div>

    </div>
  )
}

const card = {
  border: "1px solid #ddd",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px"
}