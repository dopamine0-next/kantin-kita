'use client'

import { Plus, Search, Sparkles, Star } from 'lucide-react'
import { motion } from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { MenuItem } from '@/services/restaurant/restaurant.types'

interface RestaurantMenuListProps {
  groupedMenus: Record<string, MenuItem[]>
  searchQuery: string
  onFoodClick: (item: MenuItem, step?: 'info' | 'variant') => void
}

export function RestaurantMenuList({
  groupedMenus,
  searchQuery,
  onFoodClick,
}: RestaurantMenuListProps) {
  if (Object.keys(groupedMenus).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted/40 mb-3 flex size-12 items-center justify-center rounded-full">
          <Search className="text-muted-foreground/60 size-6" />
        </div>
        <h3 className="text-foreground text-xs font-black">Menu Tidak Ditemukan</h3>
        <p className="text-muted-foreground mt-1 max-w-[200px] text-xs leading-relaxed">
          Tidak ada menu makanan/minuman yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-5 flex flex-col gap-6 px-4">
      {Object.entries(groupedMenus).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-3">
          <h2 className="text-foreground flex items-center gap-1.5 pl-1 text-xs font-black tracking-wider uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            {category}
            <span className="text-muted-foreground/60 text-xs font-medium">({items.length})</span>
          </h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`food-card-${item.id}`}
                onClick={() => onFoodClick(item)}
                className="border-muted/20 bg-card/30 hover:border-primary/15 hover:bg-card/50 group flex cursor-pointer gap-3 rounded-2xl border p-3 transition-all duration-300 active:scale-[0.99]"
              >
                <div className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-bold tracking-tight transition-colors">
                        {item.name}
                      </h3>
                      {item.isPopular && (
                        <Badge className="flex shrink-0 items-center gap-0.5 rounded-sm border-none bg-amber-500/10 px-1 text-xs font-black text-amber-600 hover:bg-amber-500/12">
                          <Sparkles className="size-2 fill-amber-500 stroke-none" />
                          <span>POPULER</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground/75 mt-0.5 line-clamp-2 text-xs leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-foreground flex items-center gap-2 text-xs font-black">
                      <span>Rp {item.price.toLocaleString('id-ID')}</span>
                      {item.rating && (
                        <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                          <Star className="size-3 fill-amber-500 stroke-none" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        onFoodClick(item, 'variant')
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-7 shrink-0 items-center justify-center rounded-lg transition-all"
                    >
                      <Plus className="size-4 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
