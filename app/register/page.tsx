"use client"

import { useEffect, useState, CSSProperties } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [scores, setScores] = useState<any[]>([])
  const [scoreInput, setScoreInput] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const user = await supabase.auth.getUser()

    // profile
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.data.user?.id)
      .single()

    setProfile(data)

    // scores
    const { data: scoreData } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.data.user?.id)

    setScores(scoreData || [])
  }

  // SUBSCRIBE
  const handleSubscribe = async () => {
    const user = await supabase.auth.getUser()

    await supabase
      .from("profiles")
      .update({ subscription: "monthly" })
      .eq("id", user.data.user?.id)

    alert("Subscribed Successfully")
    fetchData()
  }

  // ADD SCORE (LIMIT 5)
  const handleAddScore = async () => {
    const user = await supabase.auth.getUser()

    const { data: oldScores } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.data.user?.id)
      .order("created_at", { ascending: true })

    if (oldScores && oldScores.length >= 5) {
      await supabase
        .from("scores")
        .delete()
        .eq("id", oldScores[0].id)
    }

    await supabase.from("scores").insert([
      {
        user_id: user.data.user?.id,
        score: Number(scoreInput)
      }
    ])

    setScoreInput("")
    fetchData()
  }

  // SELECT CHARITY
  const handleCharity = async (name: string) => {
    const user = await supabase.auth.getUser()

    await supabase
      .from("profiles")
      .update({ charity: name })
      .eq("id", user.data.user?.id)

    alert("Charity Selected")
    fetchData()
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dashboard</h1>

      {/* PROFILE INFO */}
      <h3>Subscription: {profile?.subscription}</h3>
      <h3>Charity: {profile?.charity}</h3>

      {/* SUBSCRIBE */}
      <div style={card}>
        <img
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
          style={img}
        />
        <h2>Subscribe</h2>
        <p>Choose monthly plan and support charity</p>
        <button style={btnPurple} onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </div>

      {/* SCORE */}
      <div style={card}>
        <img
          src="https://images.unsplash.com/photo-1592919505780-303950717480"
          style={img}
        />
        <h2>Enter Scores</h2>
        <input
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
          placeholder="Enter score"
        />
        <button style={btnGreen} onClick={handleAddScore}>
          Add Score
        </button>

        <h4>Your Scores:</h4>
        {scores.map((s) => (
          <p key={s.id}>{s.score}</p>
        ))}
      </div>

      {/* CHARITIES */}
      <div style={card}>
        <img
          src="https://images.unsplash.com/photo-1593113630400-ea4288922497"
          style={img}
        />
        <h2>Save the Children</h2>
        <button style={btnBlue} onClick={() => handleCharity("Save the Children")}>
          Select
        </button>
      </div>

      <div style={card}>
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309"
          style={img}
        />
        <h2>Red Cross</h2>
        <button style={btnBlue} onClick={() => handleCharity("Red Cross")}>
          Select
        </button>
      </div>

      {/* CTA */}
      <div style={cta}>
        <h2>Ready to Make Impact?</h2>
        <p>Support charities and win prizes</p>
      </div>
    </div>
  )
}

// STYLES
const card = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "15px",
  marginTop: "20px"
}

const img: CSSProperties = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
}

const btnPurple = {
  background: "purple",
  color: "white",
  padding: "10px",
  marginTop: "10px"
}

const btnGreen = {
  background: "green",
  color: "white",
  padding: "10px",
  marginTop: "10px"
}

const btnBlue = {
  background: "blue",
  color: "white",
  padding: "10px",
  marginTop: "10px"
}

const cta: CSSProperties = {
  marginTop: "30px",
  padding: "20px",
  background: "linear-gradient(to right, purple, blue)",
  color: "white",
  borderRadius: "12px",
  textAlign: "center"
}