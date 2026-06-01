'use client'

import { BadgePercent, Clock, MapPin, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { RestaurantItem } from '@/services/restaurant/restaurant.types'

export interface StallCardProps {
  stall: RestaurantItem
  index?: number
  onClick?: () => void
}

export function StallCard({ stall, index = 0, onClick }: StallCardProps) {
  const router = useRouter()

  // Determine if a promo exists
  const displayPromo =
    stall.promoText || (stall.promos && stall.promos.length > 0 ? stall.promos[0] : null)

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
      className="border-muted/30 bg-card/40 hover:border-primary/20 hover:shadow-primary/[0.02] group flex cursor-pointer items-start gap-3.5 rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 hover:shadow-md active:scale-[0.99]"
    >
      {/* Stall Image */}
      <div className="relative size-16.5 shrink-0 overflow-hidden rounded-xl shadow-inner">
        <img
          src={stall.image}
          alt={stall.name}
          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {!stall.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="text-primary-foreground text-xs font-extrabold tracking-widest uppercase">
              Tutup
            </span>
          </div>
        )}
      </div>

      {/* Stall Details */}
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-sm leading-snug font-bold tracking-tight transition-colors">
              {stall.name}
            </h3>
            {stall.isOpen && displayPromo && !stall.promos && (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 flex shrink-0 items-center gap-0.5 rounded-lg border-none px-1.5 py-0.5 text-xs font-bold shadow-sm">
                <BadgePercent className="size-3" />
                <span>{displayPromo}</span>
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground/80 line-clamp-1 text-xs leading-snug font-medium">
            {stall.cuisine}
          </p>
        </div>

        {/* Badges and Walk stats */}
        <div className="text-muted-foreground/80 mt-1 flex items-center gap-3.5 text-xs font-bold">
          {/* Rating */}
          <div className="flex shrink-0 items-center gap-0.5 text-amber-500">
            <Star className="size-3.5 fill-amber-500 stroke-none" />
            <span className="text-foreground">{stall.rating}</span>
            <span className="text-muted-foreground/50 font-medium">({stall.reviewsCount})</span>
          </div>

          {/* Distance/Walk time */}
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex items-center gap-0.5">
              <Clock className="text-muted-foreground size-3" />
              {stall.walkTime}
            </span>
            <span className="bg-muted-foreground/30 size-1 rounded-full" />
            <span className="flex items-center gap-0.5">
              <MapPin className="text-muted-foreground size-3" />
              {stall.distance}
            </span>
          </div>
        </div>

        {/* PROMO BADGES LIST INSIDE THE STALL CARD */}
        {stall.promos && stall.promos.length > 0 && (
          <div className="border-muted/20 mt-1.5 flex flex-wrap gap-1.5 border-t pt-1.5">
            {stall.promos.map((promo, pIdx) => (
              <Badge
                key={pIdx}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1 rounded-lg border-none px-2 py-0.5 text-xs font-bold shadow-sm"
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
