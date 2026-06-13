'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
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
    return (
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 py-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-48 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (filteredFoods.length === 0)
    return (
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 py-2">
        <div className="bg-muted/20 flex h-48 w-full flex-col items-center justify-center gap-2 rounded-2xl">
          <span className="text-muted-foreground/40 text-2xl">🍽️</span>
          <span className="text-muted-foreground/60 text-sm font-semibold">Belum Ada Promo</span>
          <span className="text-muted-foreground/50 max-w-60 text-center text-xs font-medium">
            {selectedCategory === 'all'
              ? 'Belum ada promo tersedia saat ini'
              : 'Belum ada promo untuk kategori ini. Cek kategori lain yuk!'}
          </span>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col">
      {/* Horizontal Cards Scroller */}
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-2 select-none">
        {filteredFoods.map((food) => (
          <Link
            key={food.id}
            href={`/restaurant/${food.restaurantId}`}
            className="shrink-0 outline-none"
          >
            <Card className="border-muted/30 bg-card/60 hover:border-muted-foreground/10 group w-48 gap-0 overflow-hidden rounded-2xl border p-0 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
              {/* Card Media Wrapper */}
              <div className="relative h-28 w-full overflow-hidden">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  sizes="192px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating floating top-right */}
                {food.rating && food.ratingCount != null && food.ratingCount >= 10 && (
                  <div className="bg-secondary/80 absolute top-2 right-2 flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-xs font-semibold text-amber-500 backdrop-blur-md">
                    <Star className="size-3 fill-amber-500 stroke-none" />
                    <span>{food.rating}</span>
                  </div>
                )}
              </div>

              {/* Card details */}
              <CardContent className="flex flex-col gap-1.5 p-3">
                <div className="flex flex-col">
                  <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-semibold transition-colors">
                    {food.name}
                  </h3>
                </div>

                {/* Pricing Action */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    {food.originalPrice && (
                      <span className="text-muted-foreground/60 text-xs leading-none font-medium line-through">
                        {formatRupiah(food.originalPrice)}
                      </span>
                    )}
                    <span className="text-primary text-sm leading-none font-semibold">
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
