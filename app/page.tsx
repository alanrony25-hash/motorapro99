export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Fundo cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,200,0,0.15),transparent_40%)] animate-pulse"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest">
          <span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(255,200,0,0.9)]">
            MOTORA
          </span>{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(0,255,255,0.9)]">
            PRO
          </span>
        </h1>

        <h2 className="mt-6 text-2xl md:text-3xl text-cyan-400 tracking-widest drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
          XENON-GHOST OS
        </h2>

        <p className="mt-8 max-w-2xl text-gray-400 text-lg md:text-xl">
          Ecossistema tático para motoristas de elite.
        </p>

        <div className="mt-12">
          <a
            href="#"
            className="px-12 py-5 bg-yellow-500 text-black font-bold rounded-2xl hover:scale-110 transition duration-300 shadow-[0_0_40px_rgba(255,200,0,0.8)]"
          >
            ACESSAR PLATAFORMA
          </a>
        </div>

      </div>

      {/* Seção visual estilo app */}
      <section className="relative z-10 mt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-gray-900/60 backdrop-blur-lg p-8 rounded-3xl border border-cyan-500/30 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              IA Neural Briefing
            </h3>
            <p className="text-gray-400">
              Análise inteligente de rotas e oportunidades lucrativas.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg p-8 rounded-3xl border border-yellow-500/30 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              Zonas Lucrativas
            </h3>
            <p className="text-gray-400">
              Mapeamento estratégico para maximizar ganhos.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg p-8 rounded-3xl border border-cyan-500/30 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Gerenciador Tático
            </h3>
            <p className="text-gray-400">
              Controle total da sua performance operacional.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
