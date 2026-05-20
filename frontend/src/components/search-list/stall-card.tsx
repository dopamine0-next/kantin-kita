"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Star, Clock, MapPin, BadgePercent } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

export interface StallCardProps {
  stall: {
    id: string
    name: string
    cuisine: string
    rating: number
    reviewsCount: string
    walkTime: number | string
    distance: string
    isOpen: boolean
    image: string
    promoText?: string
    promos?: string[]
  }
  index?: number
  onClick?: () => void
}

export function StallCard({ stall, index = 0, onClick }: StallCardProps) {
  const router = useRouter()

  // Determine if a promo exists
  const displayPromo = stall.promoText || (stall.promos && stall.promos.length > 0 ? stall.promos[0] : null)
  
  // Format walk time
  const formattedWalkTime = typeof stall.walkTime === "number" ? `${stall.walkTime} mnt` : stall.walkTime

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/restaurant/${stall.id}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={handleClick}
      className="flex items-start gap-3.5 p-3 rounded-2xl border border-muted/30 bg-card/40 backdrop-blur-md hover:border-primary/20 hover:shadow-md hover:shadow-primary/[0.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
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
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-sm font-bold text-foreground line-clamp-1 leading-snug tracking-tight group-hover:text-primary transition-colors">
              {stall.name}
            </h3>
            {stall.isOpen && displayPromo && !stall.promos && (
              <Badge className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-600 border-none font-bold text-[9px] px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shrink-0">
                <BadgePercent className="size-3" />
                <span>{displayPromo}</span>
              </Badge>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground/80 line-clamp-1 leading-snug font-medium">
            {stall.cuisine}
          </p>
        </div>

        {/* Badges and Walk stats */}
        <div className="flex items-center gap-3.5 text-[10px] font-bold text-muted-foreground/80 mt-1">
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
              {formattedWalkTime}
            </span>
            <span className="size-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-0.5">
              <MapPin className="size-3 text-muted-foreground" />
              {stall.distance}
            </span>
          </div>
        </div>

        {/* PROMO BADGES LIST INSIDE THE STALL CARD */}
        {stall.promos && stall.promos.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-muted/20 mt-1.5">
            {stall.promos.map((promo, pIdx) => (
              <Badge
                key={pIdx}
                className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-600 border-none font-bold text-[9px] px-2 py-0.5 rounded-lg flex items-center gap-0.8"
              >
                <BadgePercent className="size-3" />
                <span>{promo}</span>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

