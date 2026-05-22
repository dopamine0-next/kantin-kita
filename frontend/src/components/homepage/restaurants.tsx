'use client'
import { useState } from 'react'

import { StallCard } from '@/components/search-list/stall-card'
import { useAuthStore } from '@/store/useAuthStore'

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  reviewsCount: string
  walkTime: string
  distance: string
  isOpen: boolean
  promoText?: string
  image: string
  block?: 'Blok A' | 'Blok B'
}

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'stall-1',
    name: 'Soto & Bakso Mbok Sri',
    cuisine: 'Soto, Bakso, Masakan Indonesia',
    rating: 4.8,
    reviewsCount: '500+',
    walkTime: '2 mnt',
    distance: '50m',
    isOpen: true,
    promoText: 'Diskon 20%',
    image:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80',
    block: 'Blok A',
  },
  {
    id: 'stall-2',
    name: 'Ayam Geprek Gahar',
    cuisine: 'Ayam Geprek, Fried Chicken, Pedas',
    rating: 4.7,
    reviewsCount: '380+',
    walkTime: '3 mnt',
    distance: '70m',
    isOpen: true,
    promoText: 'Diskon 30%',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    block: 'Blok B',
  },
  {
    id: 'stall-3',
    name: 'Kopi & Roti Bakar Kanto',
    cuisine: 'Kopi Susu, Toast, Roti Bakar',
    rating: 4.9,
    reviewsCount: '1.2k+',
    walkTime: '1 mnt',
    distance: '15m',
    isOpen: true,
    promoText: 'Combo Hemat',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80',
    block: 'Blok A',
  },
  {
    id: 'stall-4',
    name: 'Dapur Seafood Selera Rasa',
    cuisine: 'Seafood, Ikan Bakar, Udang Geprek',
    rating: 4.6,
    reviewsCount: '120+',
    walkTime: '5 mnt',
    distance: '120m',
    isOpen: false,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80',
    block: 'Blok B',
  },
]

export function Restaurants() {
  const user = useAuthStore((state) => state.user)
  const activeLocation = user ? user.location : 'Blok A'
  const [showAll, setShowAll] = useState(false)

  const filtered = showAll
    ? MOCK_RESTAURANTS
    : MOCK_RESTAURANTS.filter((stall) => stall.block === activeLocation)

  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          {showAll ? 'Semua Kios Kantin (Blok A & B)' : `Kios Terdekat di ${activeLocation}`}
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary cursor-pointer text-xs text-[10px] font-black tracking-wider uppercase hover:underline"
        >
          {showAll ? `Filter ${activeLocation}` : 'Lihat Semua'}
        </button>
      </div>

      {/* Vertical List of Canteen Stalls */}
      <div className="flex flex-col gap-3.5">
        {filtered.map((stall, idx) => (
          <StallCard
            key={stall.id}
            stall={{
              ...stall,
              distance: stall.block || 'Blok A',
            }}
            index={idx}
          />
        ))}
      </div>
    </div>
  )
}
