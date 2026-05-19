"use client"

import * as React from "react"
import { StallCard } from "@/components/search-list/stall-card"

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
}

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "rest-1",
    name: "Soto & Bakso Mbok Sri",
    cuisine: "Soto, Bakso, Masakan Indonesia",
    rating: 4.8,
    reviewsCount: "500+",
    walkTime: "2 mnt",
    distance: "50m",
    isOpen: true,
    promoText: "Diskon 20%",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rest-2",
    name: "Ayam Geprek Gahar",
    cuisine: "Ayam Geprek, Fried Chicken, Pedas",
    rating: 4.7,
    reviewsCount: "380+",
    walkTime: "3 mnt",
    distance: "70m",
    isOpen: true,
    promoText: "Gratis Ongkir",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rest-3",
    name: "Kopi & Roti Bakar Kanto",
    cuisine: "Kopi Susu, Toast, Roti Bakar",
    rating: 4.9,
    reviewsCount: "1.2k+",
    walkTime: "1 mnt",
    distance: "15m",
    isOpen: true,
    promoText: "Combo Hemat",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rest-4",
    name: "Dapur Seafood Selera Rasa",
    cuisine: "Seafood, Ikan Bakar, Udang Geprek",
    rating: 4.6,
    reviewsCount: "120+",
    walkTime: "5 mnt",
    distance: "120m",
    isOpen: false,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80",
  },
]

export function Restaurants() {
  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground tracking-tight">Kios Kantin Terdekat</h2>
        <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">Lihat Semua</span>
      </div>

      {/* Vertical List of Canteen Stalls */}
      <div className="flex flex-col gap-3.5">
        {MOCK_RESTAURANTS.map((stall, idx) => (
          <StallCard key={stall.id} stall={stall} index={idx} />
        ))}
      </div>
    </div>
  )
}

