"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const router = useRouter()

  const [valor, setValor] = useState("")
  const [rides, setRides] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchRides()
  }, [])

  async function fetchRides() {
    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setRides(data)

      const soma = data.reduce(
        (acc, ride) => acc + Number(ride.valor),
        0
      )
      setTotal(soma)
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
    fetchRides()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          Dashboard - Motora Pro
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded-xl hover:scale-105 transition"
        >
          Sair
        </button>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500 max-w-md">

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

      <div className="mt-10">
        <h2 className="text-2xl mb-4 text-cyan-400">
          Total: R$ {total.toFixed(2)}
        </h2>

        <div className="space-y-3">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700"
            >
              R$ {Number(ride.valor).toFixed(2)}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
