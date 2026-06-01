'use client'
import { useState } from 'react'

import { StallCard } from '@/components/search-list/stall-card'
import { useRestaurants } from '@/hooks/use-restaurants'
import { useAuthStore } from '@/store/useAuthStore'

export function Restaurants() {
  const user = useAuthStore((state) => state.user)
  const activeLocation = user ? user.location : 'Blok A'
  const [showAll, setShowAll] = useState(false)
  const { restaurants, isLoading } = useRestaurants()

  const filtered = showAll
    ? restaurants
    : restaurants.filter((stall) => stall.block === activeLocation)

  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          {showAll ? 'Semua Kios Kantin (Blok A & B)' : `Kios Terdekat di ${activeLocation}`}
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary cursor-pointer text-xs text-xs font-black tracking-wider uppercase hover:underline"
        >
          {showAll ? `Filter ${activeLocation}` : 'Lihat Semua'}
        </button>
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
