import Link from 'next/link'

import { restaurants } from '@/data/restaurants'

export default function BestDeals() {
  return (
    <div className="mt-6 px-4">
      <h2 className="mb-3 font-bold">Best Deals</h2>

      {/* PORTRAIT GRID */}
      <div className="grid grid-cols-2 gap-3">
        {restaurants.map((r) => (
          <Link
            key={r.slug}
            href={`/restaurant/${r.slug}`}
            className="overflow-hidden rounded-xl border bg-white"
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              className="h-28 w-full object-cover"
            />

            <div className="p-2">
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-gray-500">Klik lihat menu</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
