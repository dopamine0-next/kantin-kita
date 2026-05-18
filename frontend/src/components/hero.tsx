import Link from 'next/link'

export default function Hero() {
  return (
    <div className="w-full pt-16">
      <div className="flex w-full items-center justify-between bg-gray-700 px-4 py-8">
        {/* LEFT TEXT */}
        <div className="ml-20 flex-1">
          <h1 className="text-6xl font-bold text-white">Kantin Unpam</h1>

          <p className="text-m mt-2 font-black text-white">PICKUP & DINE IN.</p>

          <p className="mt-8 max-w-160 text-base text-white">
            Order makanan favorit lo dari kelas atau pesen saat masih di kost-an, tinggal pick-up
            atau langsung makan ditempat biar praktis!
          </p>

          <Link
            href="/restaurants"
            className="mt-5 inline-block rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black"
          >
            Order Sekarang
          </Link>
        </div>

        {/* RIGHT IMAGES GRID */}
        <div className="mt-10 mr-20 mb-10 flex gap-2">
          {/* BIG IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            className="h-72 w-56 object-cover"
          />

          {/* SMALL STACK */}
          <div className="flex flex-col gap-2">
            <img
              src="https://images.unsplash.com/photo-1550317138-10000687a72b"
              className="h-35 w-35 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
              className="h-35 w-35 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
