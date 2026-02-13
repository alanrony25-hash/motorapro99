export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400">
          Motorapro
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Performance, potência e confiança para seu motor.
        </p>

        <a
          href="#"
          className="mt-8 px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
        >
          Fale no WhatsApp
        </a>
      </section>

    </main>
  );
}
