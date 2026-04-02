"use client"

import { supabase } from "../../lib/supabaseClient"

export default function Charity() {

  const selectCharity = async (name: string) => {
    const user = (await supabase.auth.getUser()).data.user

    if (!user) {
      alert("Login required")
      return
    }

    // update profile with charity
    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        charity: name
      })

    alert("Charity selected: " + name)

    // go back to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

      <h1>Select Your Charity ❤️</h1>

      {/* CARD 1 */}
      <div style={card}>
        <h3>Save the Children</h3>
        <p>Helping children around the world</p>
        <button onClick={() => selectCharity("Save the Children")}>
          Select
        </button>
      </div>

      {/* CARD 2 */}
      <div style={card}>
        <h3>Red Cross</h3>
        <p>Emergency support & disaster relief</p>
        <button onClick={() => selectCharity("Red Cross")}>
          Select
        </button>
      </div>

      {/* CARD 3 */}
      <div style={card}>
        <h3>UNICEF</h3>
        <p>Support children health & education</p>
        <button onClick={() => selectCharity("UNICEF")}>
          Select
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