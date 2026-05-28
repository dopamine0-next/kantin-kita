'use client'

import { Clock, Star } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { usePromos } from '@/hooks/use-promos'
import { formatRupiah } from '@/lib/utils'

interface PromoItemsProps {
  selectedCategory: string
}

export function PromoItems({ selectedCategory }: PromoItemsProps) {
  const { promos, isLoading } = usePromos()

  // Filter foods by selected category (except if 'all')
  const filteredFoods =
    selectedCategory === 'all'
      ? promos
      : promos.filter((food) => food.category === selectedCategory)

  if (isLoading) {
    return <div className="p-4">Loading promo...</div>
  }

  if (filteredFoods.length === 0) return null

  return (
    <div className="flex flex-col gap-2 pt-2 pb-1">
      {/* Title */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-foreground text-base font-bold tracking-tight">
          Promo Spesial Hari Ini
        </h2>
        <span className="text-primary cursor-pointer text-xs font-semibold hover:underline">
          Lihat Semua
        </span>
      </div>

      {/* Horizontal Cards Scroller */}
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-2 select-none">
        {filteredFoods.map((food) => (
          <Link
            key={food.id}
            href={`/restaurant/${food.restaurantId}`}
            className="shrink-0 outline-none"
          >
            <Card className="border-muted/30 bg-card/60 hover:border-muted-foreground/10 group w-48 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
              {/* Card Media Wrapper */}
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Promo Badge floating top-left */}
                {food.badgeText && (
                  <Badge className="absolute top-2 left-2 rounded-lg border-none bg-slate-700 px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-white shadow-sm hover:bg-slate-800">
                    {food.badgeText}
                  </Badge>
                )}

                {/* Rating floating top-right */}
                <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-lg bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur-md">
                  <Star className="size-3 fill-amber-400 stroke-none" />
                  <span>{food.rating}</span>
                </div>
              </div>

              {/* Card details */}
              <CardContent className="flex flex-col gap-1.5 p-3">
                <div className="flex flex-col">
                  <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-bold tracking-tight transition-colors">
                    {food.name}
                  </h3>
                  <div className="text-muted-foreground/80 flex items-center gap-1 text-[10px] font-medium">
                    <Clock className="text-muted-foreground size-3" />
                    <span>{food.prepTime}</span>
                  </div>
                </div>

                {/* Pricing Action */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    {food.originalPrice && (
                      <span className="text-muted-foreground/60 text-[10px] leading-none font-medium line-through">
                        {formatRupiah(food.originalPrice)}
                      </span>
                    )}
                    <span className="text-primary text-sm leading-none font-extrabold tracking-tight">
                      {formatRupiah(food.price)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
