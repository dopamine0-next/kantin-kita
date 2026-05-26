'use client'
import { useMemo, useState } from 'react'

import {
  BadgePercent,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Plus,
  Search,
  Share2,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { MOCK_RESTAURANTS_DETAILS, MenuItem } from '@/lib/mockData'
import { cn } from '@/lib/utils'

import { FoodDetailDrawer } from './food-detail-drawer'

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Get restaurant details from mock database
  const restaurant = MOCK_RESTAURANTS_DETAILS[restaurantId]

  // Filter menu items by search query
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

  // Group filtered menu items by their categories
  const groupedMenus = useMemo(() => {
    if (!restaurant) return {}
    const groups: Record<string, MenuItem[]> = {}

    // Initialize groups with restaurant's default categories to keep correct sorting
    restaurant.categories.forEach((cat) => {
      groups[cat] = []
    })

    filteredMenus.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })

    // Filter out categories that have no items matched
    return Object.fromEntries(Object.entries(groups).filter(([_, items]) => items.length > 0))
  }, [filteredMenus, restaurant])

  if (!restaurant) {
    return (
      <div className="bg-background border-muted/50 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center border-x p-6 text-center">
        <div className="mb-4 flex size-16 animate-bounce items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
          <X className="size-8" />
        </div>
        <h2 className="text-foreground text-lg font-black">Kios Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2 max-w-[240px] text-xs leading-relaxed">
          Kios kantin dengan ID &ldquo;{restaurantId}&rdquo; tidak dapat ditemukan di database kami.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary hover:bg-primary/95 mt-6 rounded-xl px-5 py-2.5 text-xs font-black text-white shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    )
  }

  // Handle successful item added to cart
  const handleItemAdded = (message: string) => {
    setToastMessage(message)
    // Auto-hide toast
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleFoodClick = (item: MenuItem) => {
    setSelectedFood(item)
    setIsDrawerOpen(true)
  }

  return (
    <div className="bg-background border-muted/50 relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x pb-24">
      {/* 1. Hero Image / Banner */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="size-full object-cover"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 h-1/2 bg-gradient-to-b from-black/60 via-black/15 to-transparent" />
        <div className="from-background absolute inset-0 bottom-0 h-1/3 bg-gradient-to-t via-transparent to-transparent" />

        {/* Floating Top Header Buttons */}
        <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-colors active:bg-black/60"
            aria-label="Kembali"
          >
            <ChevronLeft className="mr-0.5 size-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={cn(
                'flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors active:bg-black/60',
                isFavorite ? 'text-rose-500' : 'text-white'
              )}
              aria-label="Favoritkan"
            >
              <Heart className={cn('size-4.5', isFavorite ? 'fill-rose-500' : '')} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-colors active:bg-black/60"
              aria-label="Bagikan"
            >
              <Share2 className="size-4.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Stacked Card (Glassmorphic Dribbble Style) */}
      <div className="bg-card/90 border-muted/30 relative z-10 mx-4 -mt-14 flex flex-col gap-3.5 rounded-[24px] border p-4.5 shadow-2xl backdrop-blur-xl">
        {/* Name and Status */}
          <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-foreground text-lg leading-tight font-black tracking-tight">
                {restaurant.name}
              </h1>
            <p className="text-muted-foreground/80 text-[10px] font-medium">{restaurant.cuisine}</p>
            </div>

            <Badge
              className={cn(
              'py-0.8 shrink-0 rounded-lg border-none px-2 text-[9px] font-bold',
                restaurant.isOpen
                ? 'bg-slate-700 text-white'
                : 'bg-rose-500/10 text-rose-600'
              )}
            >
              {restaurant.isOpen ? 'Buka' : 'Tutup'}
            </Badge>
          </div>

          {/* Stats Row */}
        <div className="border-muted/20 text-muted-foreground/85 flex items-center justify-between border-y py-2.5 text-[10px] font-bold">
            {/* Rating */}
          <div className="gap-0.8 flex items-center text-amber-500">
            <Star className="size-4 fill-amber-500 stroke-none" />
            <span className="text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground/50 font-medium">
              ({restaurant.reviewsCount} Ulasan)
              </span>
            </div>

          <div className="bg-muted-foreground/30 size-1 rounded-full" />

            {/* Time */}
          <div className="flex items-center gap-1 font-semibold">
            <Clock className="text-muted-foreground size-3.5" />
              <span>{restaurant.walkTime} mnt</span>
            </div>

          <div className="bg-muted-foreground/30 size-1 rounded-full" />

            {/* Distance */}
          <div className="flex items-center gap-1 font-semibold">
            <MapPin className="text-muted-foreground size-3.5" />
              <span>{restaurant.distance}</span>
            </div>
          </div>

          {/* Promos Row */}
          {restaurant.promos.length > 0 && (
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pt-0.5">
              {restaurant.promos.map((promo, idx) => (
                <Badge
                  key={idx}
                className="py-0.8 gap-0.8 flex shrink-0 items-center rounded-lg border-none bg-slate-700 px-2 text-[9px] font-extrabold whitespace-nowrap text-white hover:bg-slate-800"
                >
                <BadgePercent className="size-3.5" />
                  <span>{promo}</span>
                </Badge>
              ))}
            </div>
          )}
        </div>

      {/* 3. Search Menu Box */}
      <div className="mt-5 px-4">
        <div className="bg-muted/40 border-muted/20 relative flex items-center rounded-xl border px-3 py-2">
          <Search className="text-muted-foreground/60 mr-2 size-4 shrink-0" />
          <input
            type="text"
            placeholder="Cari makanan atau minuman lezat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground/45 w-full border-none bg-transparent text-xs focus:ring-0 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="bg-muted/60 text-muted-foreground hover:bg-muted flex size-5 items-center justify-center rounded-full"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Categories Tab (Sticky-ready subheader) */}
      <div className="bg-background/95 border-muted/20 no-scrollbar sticky top-0 z-20 mt-4.5 flex gap-1.5 overflow-x-auto border-b px-4 py-2.5 backdrop-blur-md">
        <button
          onClick={() => setSelectedCategory('Semua')}
          className={cn(
            'shrink-0 rounded-xl border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300',
            selectedCategory === 'Semua'
              ? 'bg-primary border-primary shadow-primary/10 text-white shadow-sm'
              : 'bg-card border-muted/20 text-muted-foreground hover:text-foreground'
          )}
        >
          Semua Menu
        </button>

        {restaurant.categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'shrink-0 rounded-xl border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300',
              selectedCategory === category
                ? 'bg-primary border-primary shadow-primary/10 text-white shadow-sm'
                : 'bg-card border-muted/20 text-muted-foreground hover:text-foreground'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 5. Menu Terlaris (2x2 Grid) */}
      {!searchQuery && selectedCategory === 'Semua' && restaurant.menus.filter((m) => m.isPopular).length > 0 && (
        <div className="mt-6 px-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-foreground flex items-center gap-1.5 text-sm font-black tracking-tight">
              <Sparkles className="size-4 fill-amber-500 text-amber-500" />
              Menu Terlaris
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {restaurant.menus
              .filter((m) => m.isPopular)
              .slice(0, 4)
              .map((item) => (
                <motion.div
                  key={`popular-${item.id}`}
                  onClick={() => handleFoodClick(item)}
                  className="border-muted/20 bg-card/30 hover:border-primary/20 flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md active:scale-[0.98]"
                >
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
                      <Star className="size-3 fill-amber-400 stroke-none text-amber-400" />
                      {item.rating || 'Baru'}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-2.5">
                    <h3 className="text-foreground line-clamp-2 text-xs font-bold leading-snug tracking-tight">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-primary text-[11px] font-black">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                      <div className="bg-slate-700 hover:bg-slate-800 flex size-6 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-all active:scale-90">
                        <Plus className="size-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* 6. Food Menu Lists grouped by categories */}
      <div className="mt-5 flex flex-col gap-6 px-4">
        {Object.keys(groupedMenus).length > 0 ? (
          Object.entries(groupedMenus).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              {/* Category Header Title */}
              <h2 className="text-foreground flex items-center gap-1.5 pl-1 text-xs font-black tracking-wider uppercase">
                <span className="bg-primary size-1.5 rounded-full" />
                {category}
                <span className="text-muted-foreground/60 text-[10px] font-medium">
                  ({items.length})
                </span>
              </h2>

              {/* Items in Category */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`food-card-${item.id}`}
                    onClick={() => handleFoodClick(item)}
                    className="border-muted/20 bg-card/30 hover:border-primary/15 hover:bg-card/50 group flex cursor-pointer gap-3 rounded-2xl border p-3 transition-all duration-300 active:scale-[0.99]"
                  >
                    {/* Image Column */}
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Details Column */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-bold tracking-tight transition-colors">
                            {item.name}
                          </h3>
                          {item.isPopular && (
                            <Badge className="flex shrink-0 items-center gap-0.5 rounded-sm border-none bg-amber-500/10 px-1 text-[8px] font-black text-amber-600 hover:bg-amber-500/12">
                              <Sparkles className="size-2 fill-amber-500 stroke-none" />
                              <span>POPULER</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground/75 mt-0.5 line-clamp-2 text-[10px] leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-foreground flex items-center gap-2 text-[11px] font-black">
                          <span>Rp {item.price.toLocaleString('id-ID')}</span>
                          {item.rating && (
                            <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-500">
                              <Star className="size-3 fill-amber-500 stroke-none" />
                              <span>{item.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="bg-slate-700 hover:bg-slate-800 flex size-7 shrink-0 items-center justify-center rounded-lg text-white transition-all">
                          <Plus className="size-4 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          /* Empty Search results in menus */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted/40 mb-3 flex size-12 items-center justify-center rounded-full">
              <Search className="text-muted-foreground/60 size-6" />
            </div>
            <h3 className="text-foreground text-xs font-black">Menu Tidak Ditemukan</h3>
            <p className="text-muted-foreground mt-1 max-w-[200px] text-[10px] leading-relaxed">
              Tidak ada menu makanan/minuman yang cocok dengan pencarian &ldquo;{searchQuery}
              &rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* 6. High-Fidelity Floating Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-4 bottom-24 left-4 z-50 mx-auto flex max-w-sm items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md"
          >
            <span className="flex-1 pr-2 leading-snug">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Slide-up Food Configuration Drawer */}
      <FoodDetailDrawer
        item={selectedFood}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddedToCart={handleItemAdded}
      />
    </div>
  )
}
