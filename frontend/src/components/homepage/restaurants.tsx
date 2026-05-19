"use client"

import * as React from "react"
import { Star, Clock, MapPin, BadgePercent } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
        {MOCK_RESTAURANTS.map((stall) => (
          <div
            key={stall.id}
            className="flex items-center gap-3.5 p-3 rounded-2xl border border-muted/30 bg-card/40 backdrop-blur-md hover:border-primary/20 hover:shadow-md hover:shadow-primary/[0.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
          >
            {/* Stall Image */}
            <div className="relative size-16.5 rounded-xl overflow-hidden shrink-0 shadow-inner">
              <img
                src={stall.image}
                alt={stall.name}
                className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {!stall.isOpen && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">Tutup</span>
                </div>
              )}
            </div>

            {/* Stall Details */}
            <div className="flex-1 flex flex-col justify-between h-full gap-1 min-w-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-foreground line-clamp-1 leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {stall.name}
                  </h3>
                  {stall.isOpen && stall.promoText && (
                    <Badge className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-600 border-none font-bold text-[9px] px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shrink-0">
                      <BadgePercent className="size-3" />
                      <span>{stall.promoText}</span>
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground/80 line-clamp-1 leading-snug font-medium">
                  {stall.cuisine}
                </p>
              </div>

              {/* Badges and Walk stats */}
              <div className="flex items-center gap-3.5 text-[10px] font-bold text-muted-foreground/80">
                {/* Rating */}
                <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                  <Star className="size-3.5 fill-amber-500 stroke-none" />
                  <span className="text-foreground">{stall.rating}</span>
                  <span className="text-muted-foreground/50 font-medium">({stall.reviewsCount})</span>
                </div>

                {/* Distance/Walk time */}
                <div className="flex items-center gap-2 font-semibold">
                  <span className="flex items-center gap-0.5">
                    <Clock className="size-3 text-muted-foreground" />
                    {stall.walkTime}
                  </span>
                  <span className="size-1 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-0.5">
                    <MapPin className="size-3 text-muted-foreground" />
                    {stall.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
