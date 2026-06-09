import { BadgePercent, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn, formatReviewCount } from '@/lib/utils'
import type { RestaurantDetail } from '@/services/restaurant/restaurant.types'

interface RestaurantInfoCardProps {
  restaurant: RestaurantDetail
}

export function RestaurantInfoCard({ restaurant }: RestaurantInfoCardProps) {
  return (
    <div className="bg-card/90 border-muted/30 relative z-10 mx-4 -mt-14 flex flex-col gap-3.5 rounded-3xl border p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-foreground text-lg leading-tight font-semibold">{restaurant.name}</h1>
          <p className="text-muted-foreground/80 text-xs font-medium">{restaurant.cuisine}</p>
        </div>

        <Badge
          className={cn(
            'py-0.8 shrink-0 rounded-lg border-none px-2 text-xs font-semibold',
            restaurant.isOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-destructive/10 text-destructive'
          )}
        >
          {restaurant.isOpen ? 'Buka' : 'Tutup'}
        </Badge>
      </div>

      <div className="border-muted/20 text-muted-foreground/85 border-y py-2.5 text-xs font-semibold">
        <div className="gap-0.8 flex items-center text-amber-500">
          <Star className="size-4 fill-amber-500 stroke-none" />
          <span className="text-foreground">{restaurant.rating}</span>
          <span className="text-muted-foreground/50 font-medium">
            ({formatReviewCount(restaurant.reviewsCount)} Ulasan)
          </span>
        </div>
      </div>

      {restaurant.promos && restaurant.promos.length > 0 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pt-0.5">
          {restaurant.promos.map((promo, idx) => (
            <Badge
              key={idx}
              className="py-0.8 gap-0.8 bg-primary text-primary-foreground hover:bg-primary/90 flex shrink-0 items-center rounded-lg border-none px-2 text-xs font-semibold whitespace-nowrap"
            >
              <BadgePercent className="size-3.5" />
              <span>{promo}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
