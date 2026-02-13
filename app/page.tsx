export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center text-center px-6">

      {/* Efeito Neon Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-yellow-500/10 blur-3xl animate-pulse"></div>

      {/* Conteúdo */}
      <div className="relative z-10">

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest">
          <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(255,200,0,0.8)]">
            MOTORA
          </span>{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.8)]">
            PRO
          </span>
        </h1>

        <h2 className="mt-6 text-2xl md:text-3xl text-cyan-400 tracking-widest drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
          XENON-GHOST OS
        </h2>

        <p className="mt-8 max-w-2xl text-gray-400 text-lg md:text-xl">
          Ecossistema tático para motoristas de elite.
        </p>

        <div className="mt-12">
          <a
            href="#"
            className="px-12 py-5 bg-yellow-500 text-black font-bold rounded-2xl hover:scale-110 transition duration-300 shadow-[0_0_40px_rgba(255,200,0,0.7)]"
          >
            ACESSAR PLATAFORMA
          </a>
        </div>

      </div>

    </main>
  );
}
