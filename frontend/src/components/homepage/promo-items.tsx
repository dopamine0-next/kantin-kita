import { Clock, Star } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatRupiah } from '@/lib/utils'

export interface FoodItem {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  prepTime: string
  badgeText?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  image: string
}

export const MOCK_PROMO_FOODS: FoodItem[] = [
  {
    id: 'promo-1',
    name: 'Nasi Goreng Gila Kebon Sirih',
    category: 'nasi',
    price: 16000,
    originalPrice: 20000,
    rating: 4.8,
    prepTime: '10-15 mnt',
    badgeText: 'Diskon 20%',
    badgeVariant: 'destructive',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-2',
    name: 'Mie Ayam Pangsit Jamur',
    category: 'mie',
    price: 15000,
    originalPrice: 20000,
    rating: 4.9,
    prepTime: '8-12 mnt',
    badgeText: 'Best Seller',
    badgeVariant: 'default', // primary theme
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-3',
    name: 'Ayam Geprek Mozzarella Melted',
    category: 'ayam',
    price: 18000,
    originalPrice: 22000,
    rating: 4.7,
    prepTime: '12-18 mnt',
    badgeText: 'Terlaris',
    badgeVariant: 'secondary',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-4',
    name: 'Es Kopi Susu Aren Double Shot',
    category: 'minuman',
    price: 10000,
    originalPrice: 13000,
    rating: 4.9,
    prepTime: '3-5 mnt',
    badgeText: 'Beli 2 Gratis 1',
    badgeVariant: 'default',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
  },
]

interface PromoItemsProps {
  selectedCategory: string
}

export function PromoItems({ selectedCategory }: PromoItemsProps) {
  // Filter foods by selected category (except if 'all')
  const filteredFoods =
    selectedCategory === 'all'
      ? MOCK_PROMO_FOODS
      : MOCK_PROMO_FOODS.filter((food) => food.category === selectedCategory)

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
          <Link key={food.id} href={`/restaurant/${food.id}`} className="shrink-0 outline-none">
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
                  <Badge
                    variant={food.badgeVariant}
                    className="absolute top-2 left-2 rounded-lg border-none px-2 py-0.5 text-[9px] font-extrabold tracking-wider"
                  >
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
                <div className="mt-0.5 flex items-center justify-between">
                  <div className="flex flex-col">
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
