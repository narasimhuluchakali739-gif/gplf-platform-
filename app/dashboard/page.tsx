"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Dashboard() {

  const [score, setScore] = useState("")
  const [scores, setScores] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  // LOAD DATA
  const loadData = async () => {
    const user = (await supabase.auth.getUser()).data.user

    if (!user) return

    // scores
    const { data: scoreData } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setScores(scoreData || [])

    // profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    setProfile(profileData)
  }

  useEffect(() => {
    loadData()
  }, [])

  // ADD SCORE
  const addScore = async () => {
    const user = (await supabase.auth.getUser()).data.user

    if (!user) {
      alert("Login required")
      return
    }

    // insert score
    await supabase.from("scores").insert({
      user_id: user.id,
      score: parseInt(score)
    })

    // get updated scores
    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    // keep only 5
    if (data && data.length > 5) {
      const extra = data.slice(5)

      for (let item of extra) {
        await supabase.from("scores").delete().eq("id", item.id)
      }
    }

    setScore("")
    loadData()
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>⛳ Golf Charity Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* HERO */}
      <div style={{
        marginTop: "20px",
        padding: "40px",
        borderRadius: "12px",
        color: "white",
        textAlign: "center",
        backgroundImage: "url('https://images.unsplash.com/photo-1592919505780-303950717480')",
        backgroundSize: "cover"
      }}>
        <h1>Play • Win • Give Back</h1>
        <p>Turn your golf game into real impact</p>
      </div>

      {/* USER DETAILS */}
      <div style={card}>
        <h3>Your Details</h3>

        <p><b>Subscription:</b> {profile?.subscription || "Not Selected"}</p>
        <p><b>Charity:</b> {profile?.charity || "Not Selected"}</p>
      </div>

      {/* STEP 1 */}
      <div style={card}>
        <h3>STEP 01 - Subscription</h3>
        <button
          style={btnPurple}
          onClick={() => window.location.href = "/subscription"}
        >
          Subscribe →
        </button>
      </div>

      {/* STEP 2 */}
      <div style={card}>
        <h3>STEP 02 - Enter Score</h3>

        <input
          type="number"
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={input}
        />

        <button style={btnGreen} onClick={addScore}>
          Add Score
        </button>
      </div>

      {/* SHOW SCORES */}
      <div style={card}>
        <h3>Your Recent Scores</h3>

        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s, i) => (
            <p key={i}>🏌️ Score: {s.score}</p>
          ))
        )}
      </div>

      {/* STEP 3 */}
      <div style={card}>
        <h3>STEP 03 - Charity</h3>
        <button
          style={btnBlue}
          onClick={() => window.location.href = "/charity"}
        >
          Choose Charity →
        </button>
      </div>

      {/* STEP 4 */}
      <div style={card}>
        <h3>STEP 04 - Monthly Draw</h3>
        <p>Automatic entry every month</p>
      </div>

    </div>
  )
}

/* STYLES */

const card = {
  border: "1px solid #ddd",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px"
}

const input = {
  padding: "10px",
  marginRight: "10px"
}

const btnPurple = {
  background: "purple",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px"
}

const btnGreen = {
  background: "green",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px"
}

const btnBlue = {
  background: "blue",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px"
}