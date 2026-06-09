'use client'

import { Plus, Sparkles, Star } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'

import { MenuItem } from '@/services/restaurant/restaurant.types'

interface RestaurantPopularMenusProps {
  menus: MenuItem[]
  onFoodClick: (item: MenuItem, step?: 'info' | 'variant') => void
}

export function RestaurantPopularMenus({ menus, onFoodClick }: RestaurantPopularMenusProps) {
  const popularMenus = menus.filter((m) => m.isPopular).slice(0, 4)

  if (popularMenus.length === 0) return null

  return (
    <div className="mt-6 px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-foreground flex items-center gap-1.5 text-sm font-semibold">
          <Sparkles className="size-4 fill-amber-500 text-amber-500" />
          Menu Terlaris
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {popularMenus.map((item) => (
          <motion.div
            key={`popular-${item.id}`}
            onClick={() => onFoodClick(item)}
            className="border-muted/20 bg-card/30 hover:border-primary/20 flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md active:scale-[0.98]"
          >
            <div className="bg-muted relative aspect-square w-full shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="text-primary-foreground absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold backdrop-blur-md">
                <Star className="size-3 fill-amber-500 stroke-none text-amber-500" />
                {item.rating && item.ratingCount != null && item.ratingCount >= 10 && (
                  <div className="text-primary-foreground absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold backdrop-blur-md">
                    <Star className="size-3 fill-amber-500 stroke-none text-amber-500" />
                    {item.rating}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-2.5">
              <h3 className="text-foreground line-clamp-2 text-xs leading-snug font-semibold">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-primary text-xs font-semibold">
                  Rp {item.price.toLocaleString('id-ID')}
                </span>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    onFoodClick(item, 'variant')
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-6 shrink-0 items-center justify-center rounded-lg shadow-sm transition-all active:scale-90"
                >
                  <Plus className="size-3 stroke-[3]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
