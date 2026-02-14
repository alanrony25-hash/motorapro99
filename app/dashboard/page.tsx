"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [rides, setRides] = useState<any[]>([])
  const [totalToday, setTotalToday] = useState(0)
  const [totalMonth, setTotalMonth] = useState(0)
  const [rideCount, setRideCount] = useState(0)

  const fetchRides = async () => {
    const { data } = await supabase
      .from("rides")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      setRides(data)

      const today = new Date()
      const month = today.getMonth()

      let todayTotal = 0
      let monthTotal = 0

      data.forEach((ride: any) => {
        const rideDate = new Date(ride.created_at)

        if (
          rideDate.getDate() === today.getDate() &&
          rideDate.getMonth() === today.getMonth()
        ) {
          todayTotal += ride.amount
        }

        if (rideDate.getMonth() === month) {
          monthTotal += ride.amount
        }
      })

      setTotalToday(todayTotal)
      setTotalMonth(monthTotal)
      setRideCount(data.length)
    }
  }

  useEffect(() => {
    fetchRides()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Painel Operacional 🚗</h1>

      <h2>Ganhos Hoje: R$ {totalToday.toFixed(2)}</h2>
      <h3>Total do Mês: R$ {totalMonth.toFixed(2)}</h3>
      <h3>Corridas: {rideCount}</h3>

      <button onClick={logout}>Sair</button>

      <hr />

      <h3>Histórico</h3>
      {rides.map((ride) => (
        <div key={ride.id}>
          R$ {ride.amount} -{" "}
          {new Date(ride.created_at).toLocaleDateString()}
        </div>
      ))}
    </div>
  )
}
