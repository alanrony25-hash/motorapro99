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
  const [allRides, setAllRides] = useState<any[]>([])
  const [totalToday, setTotalToday] = useState(0)
  const [totalMonth, setTotalMonth] = useState(0)
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
      setAllRides(ridesData)

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

      const totalTodayCalc = todayRides.reduce(
        (acc, ride) => acc + Number(ride.valor),
        0
      )

      setTotalToday(totalTodayCalc)

      // 🔥 TOTAL DO MÊS
      const monthRides = ridesData.filter((ride) => {
        const rideDate = new Date(ride.created_at)
        return (
          rideDate.getMonth() === today.getMonth() &&
          rideDate.getFullYear() === today.getFullYear()
        )
      })

      const totalMonthCalc = monthRides.reduce(
        (acc, ride) => acc + Number(ride.valor),
        0
      )

      setTotalMonth(totalMonthCalc)
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

  let acumulado = 0
  const chartData = rides.map((ride, index) => {
    acumulado += Number(ride.valor)
    return {
      name: `#${index + 1}`,
      total: acumulado,
    }
  })

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 tracking-wider">
        MOTORA PRO ⚡
      </h1>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* GANHOS HOJE */}
        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-yellow-500 shadow-[0_0_25px_rgba(250,204,21,0.4)]">
          <h2 className="text-sm text-gray-400 mb-2">Ganhos Hoje</h2>
          <p className="text-3xl font-bold text-yellow-400">
            R$ {totalToday.toFixed(2)}
          </p>
        </div>

        {/* META */}
        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.4)]">
          <h2 className="text-sm text-gray-400 mb-2">Meta Diária</h2>

          {dailyGoal ? (
            <>
              <p className="text-lg text-green-400 mb-2">
                R$ {dailyGoal.toFixed(2)}
              </p>

              <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                <div
                  className="bg-green-400 h-3 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(34,197,94,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {remaining > 0 ? (
                <p className="text-sm text-gray-400">
                  Faltam R$ {remaining.toFixed(2)}
                </p>
              ) : (
                <p className="text-green-400 font-bold">
                  🎯 Meta batida!
                </p>
              )}
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder="Definir meta"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-full p-2 mb-2 rounded bg-black border border-gray-700"
              />
              <button
                onClick={saveGoal}
                className="w-full py-2 bg-green-600 rounded-xl"
              >
                Salvar
              </button>
            </>
          )}
        </div>

        {/* TOTAL DO MÊS */}
        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          <h2 className="text-sm text-gray-400 mb-2">Total do Mês</h2>
          <p className="text-3xl font-bold text-cyan-400">
            R$ {totalMonth.toFixed(2)}
          </p>
        </div>
      </div>

      {/* NOVA CORRIDA */}
      <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.3)] max-w-md mb-10">
        <h2 className="text-xl mb-4 text-cyan-400">Nova Corrida</h2>

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
        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
          <h2 className="text-lg mb-4 text-yellow-400">
            Evolução do Dia
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#222" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
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
