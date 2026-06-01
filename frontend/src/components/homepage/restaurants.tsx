'use client'
import Link from 'next/link'

import { StallCard } from '@/components/search-list/stall-card'
import { useRestaurants } from '@/hooks/use-restaurants'
import { useAuthStore } from '@/store/useAuthStore'

export function Restaurants() {
  const user = useAuthStore((state) => state.user)
  const activeLocation = user ? user.location : 'Blok A'
  const { restaurants, isLoading } = useRestaurants()

  const filtered = restaurants.filter((stall) => stall.block === activeLocation)

  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          Kios Terdekat di {activeLocation}
        </h2>
        <Link
          href="/search-list"
          className="text-primary text-xs font-black uppercase tracking-wider hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      {/* Vertical List of Canteen Stalls */}
      <div className="flex flex-col gap-3.5">
        {isLoading ? (
          <div className="text-muted-foreground p-4 text-center text-sm">
            Loading restaurants...
          </div>
        ) : (
          filtered.map((stall, idx) => (
            <StallCard
              key={stall.id}
              stall={{
                ...stall,
                distance: stall.block || 'Blok A',
              }}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  )
}
