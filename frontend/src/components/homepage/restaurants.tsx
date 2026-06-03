'use client'
import { Store } from 'lucide-react'
import Link from 'next/link'

import { StallCard } from '@/components/search-list/stall-card'
import { useRestaurants } from '@/hooks/use-restaurants'
import { useAuthStore } from '@/store/useAuthStore'

export function Restaurants() {
  const user = useAuthStore((state) => state.user)
  const activeLocationId = user ? String(user.locationId) : 'l1'
  const activeLocationName = user ? user.location : 'Kantin Pusat'
  const { restaurants, isLoading } = useRestaurants()

  const filtered = restaurants.filter((stall) => String(stall.locationId) === activeLocationId)

  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          Kios Terdekat di {activeLocationName}
        </h2>
        <Link
          href="/search-list"
          className="text-primary text-xs font-black tracking-wider uppercase hover:underline"
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
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted/40 mb-4 flex size-16 items-center justify-center rounded-full">
              <Store className="text-muted-foreground/60 size-8" />
            </div>
            <h3 className="text-foreground text-sm font-bold">Belum Ada Kios Tersedia</h3>
            <p className="text-muted-foreground mt-1.5 max-w-60 text-xs leading-relaxed">
              Belum ada kios yang tersedia di {activeLocationName}. Coba lokasi lain atau kembali
              lagi nanti.
            </p>
          </div>
        ) : (
          filtered.map((stall, idx) => (
            <StallCard
              key={stall.id}
              stall={{
                ...stall,
                distance: stall.distance,
              }}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  )
}
