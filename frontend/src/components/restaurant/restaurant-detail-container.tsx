'use client'

import { useMemo, useRef, useState } from 'react'

import { ShoppingBag, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useRestaurantDetail } from '@/hooks/use-restaurants'
import { MenuItem } from '@/services/restaurant/restaurant.types'
import { useCartStore } from '@/store/useCartStore'

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
  const [showRestoConflict, setShowRestoConflict] = useState(false)
  const pendingFoodRef = useRef<{ item: MenuItem; step: 'info' | 'variant' } | null>(null)

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

    return Object.fromEntries(Object.entries(groups).filter(([, items]) => items.length > 0))
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
        <h2 className="text-foreground text-lg font-semibold">Kios Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2 max-w-[240px] text-xs leading-relaxed">
          Kios kantin dengan ID &ldquo;{restaurantId}&rdquo; tidak dapat ditemukan di database kami.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary hover:bg-primary/95 text-primary-foreground mt-6 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    )
  }

  const handleItemAdded = (message: string) => {
    toast.success(message)
  }

  const handleFoodClick = (item: MenuItem, step: 'info' | 'variant' = 'info') => {
    const cartItems = useCartStore.getState().items
    const cartRestoId = cartItems[0]?.restaurantId

    if (cartItems.length > 0 && cartRestoId && cartRestoId !== restaurant.id) {
      pendingFoodRef.current = { item, step }
      setShowRestoConflict(true)
      return
    }

    setSelectedFood(item)
    setDrawerStep(step)
    setIsDrawerOpen(true)
  }

  const handleConfirmSwitchResto = () => {
    useCartStore.getState().clearCart()
    setShowRestoConflict(false)
    const pending = pendingFoodRef.current
    if (pending) {
      setSelectedFood(pending.item)
      setDrawerStep(pending.step)
      setIsDrawerOpen(true)
    }
    pendingFoodRef.current = null
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
        <RestaurantPopularMenus
          menus={restaurant.menus}
          isOpen={restaurant.isOpen}
          onFoodClick={handleFoodClick}
        />
      )}

      <RestaurantMenuList
        groupedMenus={groupedMenus}
        searchQuery={searchQuery}
        isOpen={restaurant.isOpen}
        onFoodClick={handleFoodClick}
      />

      <FoodDetailDrawer
        item={selectedFood}
        isOpen={isDrawerOpen}
        isRestaurantOpen={restaurant.isOpen}
        initialStep={drawerStep}
        onClose={() => setIsDrawerOpen(false)}
        onAddedToCart={handleItemAdded}
      />

      <AlertDialog open={showRestoConflict} onOpenChange={setShowRestoConflict}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ShoppingBag className="size-8" />
            </AlertDialogMedia>
            <AlertDialogTitle>Pindah Restoran?</AlertDialogTitle>
            <AlertDialogDescription>
              Keranjangmu berisi pesanan dari restoran lain. Ingin menghapus dan pindah ke{' '}
              <strong>{restaurant.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSwitchResto}>
              Ya, Hapus & Pindah
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
