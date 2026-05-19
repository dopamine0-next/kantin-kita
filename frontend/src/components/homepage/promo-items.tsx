"use client"

import * as React from "react"
import { Star, Clock, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface FoodItem {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  prepTime: string
  badgeText?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  image: string
}

export const MOCK_PROMO_FOODS: FoodItem[] = [
  {
    id: "promo-1",
    name: "Nasi Goreng Gila Kebon Sirih",
    category: "nasi",
    price: 16000,
    originalPrice: 20000,
    rating: 4.8,
    prepTime: "10-15 mnt",
    badgeText: "Diskon 20%",
    badgeVariant: "destructive",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "promo-2",
    name: "Mie Ayam Pangsit Jamur",
    category: "mie",
    price: 15000,
    originalPrice: 20000,
    rating: 4.9,
    prepTime: "8-12 mnt",
    badgeText: "Best Seller",
    badgeVariant: "default", // primary theme
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "promo-3",
    name: "Ayam Geprek Mozzarella Melted",
    category: "ayam",
    price: 18000,
    originalPrice: 22000,
    rating: 4.7,
    prepTime: "12-18 mnt",
    badgeText: "Terlaris",
    badgeVariant: "secondary",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "promo-4",
    name: "Es Kopi Susu Aren Double Shot",
    category: "minuman",
    price: 10000,
    originalPrice: 13000,
    rating: 4.9,
    prepTime: "3-5 mnt",
    badgeText: "Beli 2 Gratis 1",
    badgeVariant: "default",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
  },
]

interface PromoItemsProps {
  selectedCategory: string
  onAddToCart?: (item: FoodItem) => void
}

export function PromoItems({ selectedCategory, onAddToCart }: PromoItemsProps) {
  // Filter foods by selected category (except if 'all')
  const filteredFoods = React.useMemo(() => {
    if (selectedCategory === "all") return MOCK_PROMO_FOODS
    return MOCK_PROMO_FOODS.filter((food) => food.category === selectedCategory)
  }, [selectedCategory])

  if (filteredFoods.length === 0) return null

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="flex flex-col gap-2 pt-2 pb-1">
      {/* Title */}
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground tracking-tight">Promo Spesial Hari Ini</h2>
        <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">Lihat Semua</span>
      </div>

      {/* Horizontal Cards Scroller */}
      <div className="w-full overflow-x-auto flex gap-4 px-4 py-2 no-scrollbar scroll-smooth select-none">
        {filteredFoods.map((food) => (
          <Card
            key={food.id}
            className="w-48 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-muted/30 bg-card/60 backdrop-blur-md hover:shadow-md hover:border-muted-foreground/10 transition-all duration-300 group"
          >
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
                  className="absolute top-2 left-2 text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-lg border-none"
                >
                  {food.badgeText}
                </Badge>
              )}

              {/* Rating floating top-right */}
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/55 backdrop-blur-md text-amber-400 px-1.5 py-0.5 rounded-lg text-[10px] font-bold">
                <Star className="size-3 fill-amber-400 stroke-none" />
                <span>{food.rating}</span>
              </div>
            </div>

            {/* Card details */}
            <CardContent className="p-3 flex flex-col gap-1.5">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-foreground line-clamp-1 leading-snug tracking-tight group-hover:text-primary transition-colors">
                  {food.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 font-medium">
                  <Clock className="size-3 text-muted-foreground" />
                  <span>{food.prepTime}</span>
                </div>
              </div>

              {/* Pricing & Add to Cart Action */}
              <div className="flex items-center justify-between mt-0.5">
                <div className="flex flex-col">
                  {food.originalPrice && (
                    <span className="text-[10px] text-muted-foreground/60 line-through leading-none font-medium">
                      {formatRupiah(food.originalPrice)}
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-primary leading-none tracking-tight">
                    {formatRupiah(food.price)}
                  </span>
                </div>

                <Button
                  onClick={() => onAddToCart?.(food)}
                  size="icon"
                  className="size-8 rounded-xl bg-primary text-primary-foreground border-none hover:bg-primary/95 shadow-md active:scale-90 transition-all duration-300"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
