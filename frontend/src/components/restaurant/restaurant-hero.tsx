'use client'

import { ChevronLeft, Heart, Share2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

interface RestaurantHeroProps {
  restaurant: any
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function RestaurantHero({ restaurant, isFavorite, onToggleFavorite }: RestaurantHeroProps) {
  const router = useRouter()

  return (
    <div className="relative h-64 w-full shrink-0 overflow-hidden">
      <img
        src={restaurant.bannerImage || restaurant.image}
        alt={restaurant.name}
        className="size-full object-cover"
      />

      <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="border-primary-foreground/10 bg-secondary/40 text-primary-foreground active:bg-secondary/60 flex size-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors"
          aria-label="Kembali"
        >
          <ChevronLeft className="mr-0.5 size-5" />
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className={cn(
              'border-primary-foreground/10 bg-secondary/40 active:bg-secondary/60 flex size-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors',
              isFavorite ? 'text-destructive' : 'text-primary-foreground'
            )}
            aria-label="Favoritkan"
          >
            <Heart className={cn('size-4.5', isFavorite ? 'fill-destructive' : '')} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="border-primary-foreground/10 bg-secondary/40 text-primary-foreground active:bg-secondary/60 flex size-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors"
            aria-label="Bagikan"
          >
            <Share2 className="size-4.5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
