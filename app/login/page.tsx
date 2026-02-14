"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Erro no login: " + error.message)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-3xl border border-cyan-500 w-full max-w-md">

        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Login - Motora Pro
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-xl bg-black border border-gray-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded-xl bg-black border border-gray-700"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-2xl hover:scale-105 transition"
        >
          Entrar
        </button>

      </div>
    </div>
  )
}
