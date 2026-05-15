import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white py-14 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Pesan Makanan Kampus
          </h1>

          <p className="mt-4 text-gray-300">Order makanan favorit mahasiswa.</p>

          <Link href="/restaurants">
            <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold">
              Order Sekarang
            </button>
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
          className="w-full h-[300px] object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}
