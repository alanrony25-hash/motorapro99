"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Register() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert("Erro ao cadastrar: " + error.message)
    } else {
      alert("Cadastro feito com sucesso! Faça login.")
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-3xl border border-yellow-500 w-full max-w-md">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Criar Conta - Motora Pro
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
          onClick={handleRegister}
          className="w-full py-3 bg-cyan-500 text-black font-bold rounded-2xl hover:scale-105 transition"
        >
          Criar Conta
        </button>

      </div>
    </div>
  )
}
