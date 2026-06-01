'use client'

import { useMemo, useState } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { useRestaurantDetail } from '@/hooks/use-restaurants'
import { MenuItem } from '@/services/restaurant/restaurant.types'

import { FoodDetailDrawer } from './food-detail-drawer'
import { RestaurantCategoryTabs } from './restaurant-category-tabs'
import { RestaurantHero } from './restaurant-hero'
import { RestaurantInfoCard } from './restaurant-info-card'
import { RestaurantMenuList } from './restaurant-menu-list'
import { RestaurantMenuSearch } from './restaurant-menu-search'
import { RestaurantPopularMenus } from './restaurant-popular-menus'

interface RestaurantDetailContainerProps {
  restaurantId: string
}

export default function RestaurantDetailContainer({
  restaurantId,
}: RestaurantDetailContainerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null)
  const [drawerStep, setDrawerStep] = useState<'info' | 'variant'>('info')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { restaurant, isLoading } = useRestaurantDetail(restaurantId)

  const filteredMenus = useMemo(() => {
    if (!restaurant) return []
    return restaurant.menus.filter((item) => {
      const matchesSearch = searchQuery.trim()
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchesCategory =
        selectedCategory === 'Semua' ? true : item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [restaurant, searchQuery, selectedCategory])

  const groupedMenus = useMemo(() => {
    if (!restaurant) return {}
    const groups: Record<string, MenuItem[]> = {}

    restaurant.categories.forEach((cat) => {
      groups[cat] = []
    })

    filteredMenus.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })

    return Object.fromEntries(Object.entries(groups).filter(([_, items]) => items.length > 0))
  }, [filteredMenus, restaurant])

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 flex size-16 animate-bounce items-center justify-center rounded-full">
          <X className="size-8" />
        </div>
        <h2 className="text-foreground text-lg font-black">Kios Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2 max-w-[240px] text-xs leading-relaxed">
          Kios kantin dengan ID &ldquo;{restaurantId}&rdquo; tidak dapat ditemukan di database kami.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary hover:bg-primary/95 text-primary-foreground mt-6 rounded-xl px-5 py-2.5 text-xs font-black shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    )
  }

  const handleItemAdded = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleFoodClick = (item: MenuItem, step: 'info' | 'variant' = 'info') => {
    setSelectedFood(item)
    setDrawerStep(step)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col pb-24">
      <RestaurantHero
        restaurant={restaurant}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />

      <RestaurantInfoCard restaurant={restaurant} />

      <RestaurantMenuSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <RestaurantCategoryTabs
        categories={restaurant.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {!searchQuery && selectedCategory === 'Semua' && (
        <RestaurantPopularMenus menus={restaurant.menus} onFoodClick={handleFoodClick} />
      )}

      <RestaurantMenuList
        groupedMenus={groupedMenus}
        searchQuery={searchQuery}
        onFoodClick={handleFoodClick}
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-muted/30 bg-card/95 text-foreground fixed right-4 bottom-24 left-4 z-50 mx-auto flex max-w-sm items-center justify-between rounded-xl border px-4 py-3 text-xs font-bold shadow-2xl backdrop-blur-md"
          >
            <span className="flex-1 pr-2 leading-snug">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FoodDetailDrawer
        item={selectedFood}
        isOpen={isDrawerOpen}
        initialStep={drawerStep}
        onClose={() => setIsDrawerOpen(false)}
        onAddedToCart={handleItemAdded}
      />
    </div>
  )
}
