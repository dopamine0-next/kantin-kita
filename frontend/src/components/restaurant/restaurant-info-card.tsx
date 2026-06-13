import { Star } from 'lucide-react'

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
          <p className="text-muted-foreground/80 text-xs font-medium">
            {restaurant.restaurantCategory.name}
          </p>
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
        {restaurant.reviewsCount >= 10 ? (
          <div className="gap-0.8 flex items-center text-amber-500">
            <Star className="size-4 fill-amber-500 stroke-none" />
            <span className="text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground/50 font-medium">
              ({formatReviewCount(restaurant.reviewsCount)} Ulasan)
            </span>
          </div>
        ) : (
          <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold">
            Baru
          </span>
        )}
      </div>
    </div>
  )
}
