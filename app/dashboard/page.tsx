"use client"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Painel Operacional 🚗
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500">
          <h2 className="text-cyan-400 text-xl mb-2">Ganhos Hoje</h2>
          <p className="text-3xl font-bold">R$ 0,00</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-yellow-500">
          <h2 className="text-yellow-400 text-xl mb-2">Corridas</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500">
          <h2 className="text-cyan-400 text-xl mb-2">Performance</h2>
          <p className="text-3xl font-bold">100%</p>
        </div>

      </div>

    </main>
  )
}
