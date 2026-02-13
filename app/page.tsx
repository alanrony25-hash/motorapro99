export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest">
        <span className="text-yellow-400">MOTORA</span>{" "}
        <span className="text-cyan-400">PRO</span>
      </h1>

      <h2 className="mt-6 text-2xl md:text-3xl text-cyan-400 tracking-wide">
        XENON-GHOST OS
      </h2>

      <p className="mt-8 max-w-2xl text-gray-400 text-lg md:text-xl">
        Ecossistema tático para motoristas de elite.
      </p>

      <div className="mt-12">
        <a
          href="#"
          className="px-10 py-4 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 hover:bg-yellow-400 transition duration-300 shadow-lg shadow-yellow-500/30"
        >
          Acessar Plataforma
        </a>
      </div>

    </main>
  );
}
