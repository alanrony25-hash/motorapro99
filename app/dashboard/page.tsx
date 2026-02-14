"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function Dashboard() {
  const [valor, setValor] = useState("")
  const [rides, setRides] = useState<any[]>([])
  const [totalToday, setTotalToday] = useState(0)
  const [dailyGoal, setDailyGoal] = useState<number | null>(null)
  const [goalInput, setGoalInput] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    const { data: ridesData } = await supabase
      .from("rides")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: true })

    if (ridesData) {
      const today = new Date()

      const todayRides = ridesData.filter((ride) => {
        const rideDate = new Date(ride.created_at)
        return (
          rideDate.getDate() === today.getDate() &&
          rideDate.getMonth() === today.getMonth() &&
          rideDate.getFullYear() === today.getFullYear()
        )
      })

      setRides(todayRides)

      const total = todayRides.reduce(
        (acc, ride) => acc + Number(ride.valor),
        0
      )

      setTotalToday(total)
    }

    const { data: goalData } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userData.user.id)
      .single()

    if (goalData) {
      setDailyGoal(Number(goalData.daily_goal))
    }
  }

  async function addRide() {
    if (!valor) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from("rides").insert([
      {
        user_id: userData.user.id,
        valor: Number(valor),
      },
    ])

    setValor("")
    fetchData()
  }

  async function saveGoal() {
    if (!goalInput) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from("goals").upsert({
      user_id: userData.user.id,
      daily_goal: Number(goalInput),
    })

    setGoalInput("")
    fetchData()
  }

  const progress =
    dailyGoal && dailyGoal > 0
      ? Math.min((totalToday / dailyGoal) * 100, 100)
      : 0

  const remaining =
    dailyGoal && dailyGoal > totalToday
      ? dailyGoal - totalToday
      : 0

  // 🔥 GRÁFICO ACUMULADO
  let acumulado = 0
  const chartData = rides.map((ride, index) => {
    acumulado += Number(ride.valor)
    return {
      name: `#${index + 1}`,
      total: acumulado,
    }
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Dashboard - Motora Pro
      </h1>

      {/* META */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-green-500 mb-8 max-w-md">
        <h2 className="text-xl mb-4">Meta Diária</h2>

        {dailyGoal ? (
          <>
            <p>Meta: R$ {dailyGoal.toFixed(2)}</p>
            <p className="text-green-400 mb-2">
              Ganhos Hoje: R$ {totalToday.toFixed(2)}
            </p>

            <div className="w-full bg-gray-700 rounded-full h-4 mb-3">
              <div
                className="bg-green-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {remaining > 0 ? (
              <p>Faltam R$ {remaining.toFixed(2)}</p>
            ) : (
              <p className="text-green-400 font-bold">
                🎉 Meta batida!
              </p>
            )}
          </>
        ) : (
          <>
            <input
              type="number"
              placeholder="Definir meta diária"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="w-full p-3 mb-3 rounded-xl bg-black border border-gray-700"
            />
            <button
              onClick={saveGoal}
              className="w-full py-2 bg-green-600 rounded-xl"
            >
              Salvar Meta
            </button>
          </>
        )}
      </div>

      {/* NOVA CORRIDA */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500 max-w-md mb-10">
        <h2 className="text-xl mb-4">Nova Corrida</h2>

        <input
          type="number"
          placeholder="Valor da corrida"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-black border border-gray-700"
        />

        <button
          onClick={addRide}
          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-2xl hover:scale-105 transition"
        >
          Adicionar
        </button>
      </div>

      {/* GRÁFICO */}
      {rides.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-2xl border border-yellow-500 mb-10">
          <h2 className="text-xl mb-4">Evolução do Dia</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#facc15"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
