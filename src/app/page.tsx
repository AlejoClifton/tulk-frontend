import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Image src="/tulk.png" alt="Tulk" width={500} height={250} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Soluciones Náuticas de Alta Tecnología
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Estamos trabajando para ofrecerte lo mejor.
            <br />
            Pronto vas a poder explorar nuestros productos.
          </p>

          <div className="flex items-center justify-center w-full bg-white rounded-lg shadow-lg px-8 py-8">
            <p className="text-slate-500 text-sm">Disponible próximamente</p>
          </div>
        </div>
      </main>
    </div>
  );
}
