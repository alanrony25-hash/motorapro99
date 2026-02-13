export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400">
          Motorapro
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Especialistas em performance, revisão e manutenção automotiva.
        </p>

        <a
          href="#"
          className="mt-8 px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
        >
          Solicitar Orçamento
        </a>
      </section>

      {/* SOBRE */}
      <section className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">
          Sobre a Motorapro
        </h2>

        <p className="max-w-3xl mx-auto text-gray-400 text-lg">
          A Motorapro oferece serviços automotivos com qualidade, rapidez e
          confiança. Trabalhamos com equipamentos modernos e profissionais
          especializados para garantir o melhor desempenho do seu veículo.
        </p>
      </section>

      {/* SERVIÇOS */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-12">
          Nossos Serviços
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-4">Revisão Completa</h3>
            <p className="text-gray-400">
              Diagnóstico completo e revisão detalhada do seu veículo.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-4">Troca de Óleo</h3>
            <p className="text-gray-400">
              Produtos de alta qualidade para maior durabilidade do motor.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-4">Diagnóstico Eletrônico</h3>
            <p className="text-gray-400">
              Tecnologia avançada para identificar qualquer problema.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t border-gray-800">
        <p className="text-gray-500">
          © 2026 Motorapro - Todos os direitos reservados
        </p>
      </footer>

    </main>
  );
}
