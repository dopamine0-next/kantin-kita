import Link from 'next/link'

import { restaurants } from '@/data/restaurants'
import Navbar from './navbar'

export default function Restaurants() {
  return (
    <section className=" mt-8 max-w-md px-4">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Restaurant</h2>
        
          
        <Link href="/restaurants" className="text-sm font-medium text-yellow-500">
          Lihat Semua
        </Link>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4">
        
        {restaurants.map((resto) => (
          <Link
            key={resto.slug}
            href={`/restaurants/${resto.slug}`}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
              <img src={resto.banner} alt={resto.name} className="h-full w-full object-cover" />
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="text-base font-semibold">{resto.name}</h3>

              <p className="mt-1 text-sm text-slate-500">Pickup & Dine-in</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
