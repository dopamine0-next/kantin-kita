"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MOCK_RESTAURANTS_DETAILS, MenuItem } from "@/lib/mockData"
import { FoodDetailDrawer } from "./food-detail-drawer"
import {
  ChevronLeft,
  Share2,
  Search,
  Star,
  Clock,
  MapPin,
  BadgePercent,
  Sparkles,
  Heart,
  X,
  Plus,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RestaurantDetailContainerProps {
  restaurantId: string
}

export default function RestaurantDetailContainer({
  restaurantId,
}: RestaurantDetailContainerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Semua")
  const [selectedFood, setSelectedFood] = React.useState<MenuItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  // Get restaurant details from mock database
  const restaurant = MOCK_RESTAURANTS_DETAILS[restaurantId]

  if (!restaurant) {
    return (
      <div className="max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col items-center justify-center p-6 text-center">
        <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 animate-bounce">
          <X className="size-8" />
        </div>
        <h2 className="text-lg font-black text-foreground">Kios Tidak Ditemukan</h2>
        <p className="text-xs text-muted-foreground mt-2 max-w-[240px] leading-relaxed">
          Kios kantin dengan ID &ldquo;{restaurantId}&rdquo; tidak dapat ditemukan di database kami.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 text-xs font-black bg-primary text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-primary/95"
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

  // Filter menu items by search query
  const filteredMenus = React.useMemo(() => {
    return restaurant.menus.filter((item) => {
      const matchesSearch = searchQuery.trim()
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchesCategory =
        selectedCategory === "Semua" ? true : item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [restaurant.menus, searchQuery, selectedCategory])

  // Group filtered menu items by their categories
  const groupedMenus = React.useMemo(() => {
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
    return Object.fromEntries(
      Object.entries(groups).filter(([_, items]) => items.length > 0)
    )
  }, [filteredMenus, restaurant.categories])

  const handleFoodClick = (item: MenuItem) => {
    setSelectedFood(item)
    setIsDrawerOpen(true)
  }

  return (
    <div className="relative max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col pb-24">
      {/* 1. Hero Image / Banner */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="size-full object-cover"
        />
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-transparent h-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-1/3 bottom-0" />

        {/* Floating Top Header Buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:bg-black/60 transition-colors"
            aria-label="Kembali"
          >
            <ChevronLeft className="size-5 mr-0.5" />
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={cn(
                "size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center active:bg-black/60 transition-colors",
                isFavorite ? "text-rose-500" : "text-white"
              )}
              aria-label="Favoritkan"
            >
              <Heart className={cn("size-4.5", isFavorite ? "fill-rose-500" : "")} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:bg-black/60 transition-colors"
              aria-label="Bagikan"
            >
              <Share2 className="size-4.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Stacked Card (Glassmorphic Dribbble Style) */}
      <div className="-mt-14 mx-4 relative bg-card/90 backdrop-blur-xl border border-muted/30 shadow-2xl p-4.5 rounded-[24px] flex flex-col gap-3.5 z-10">
        
        {/* Name and Status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-black text-foreground tracking-tight leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-[10px] text-muted-foreground/80 font-medium">
              {restaurant.cuisine}
            </p>
          </div>
          
          <Badge className={cn(
            "border-none font-bold text-[9px] px-2 py-0.8 rounded-lg shrink-0",
            restaurant.isOpen
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-rose-500/10 text-rose-600"
          )}>
            {restaurant.isOpen ? "Buka" : "Tutup"}
          </Badge>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between border-y border-muted/20 py-2.5 text-[10px] font-bold text-muted-foreground/85">
          {/* Rating */}
          <div className="flex items-center gap-0.8 text-amber-500">
            <Star className="size-4 fill-amber-500 stroke-none" />
            <span className="text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground/50 font-medium">({restaurant.reviewsCount} Ulasan)</span>
          </div>

          <div className="size-1 rounded-full bg-muted-foreground/30" />

          {/* Time */}
          <div className="flex items-center gap-1 font-semibold">
            <Clock className="size-3.5 text-muted-foreground" />
            <span>{restaurant.walkTime} mnt</span>
          </div>

          <div className="size-1 rounded-full bg-muted-foreground/30" />

          {/* Distance */}
          <div className="flex items-center gap-1 font-semibold">
            <MapPin className="size-3.5 text-muted-foreground" />
            <span>{restaurant.distance}</span>
          </div>
        </div>

        {/* Promos Row */}
        {restaurant.promos.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
            {restaurant.promos.map((promo, idx) => (
              <Badge
                key={idx}
                className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/12 border-none font-extrabold text-[9px] px-2 py-0.8 rounded-lg flex items-center gap-0.8 shrink-0 whitespace-nowrap"
              >
                <BadgePercent className="size-3.5" />
                <span>{promo}</span>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 3. Search Menu Box */}
      <div className="px-4 mt-5">
        <div className="relative flex items-center bg-muted/40 border border-muted/20 rounded-xl px-3 py-2">
          <Search className="size-4 text-muted-foreground/60 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Cari makanan atau minuman lezat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="size-5 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:bg-muted"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Categories Tab (Sticky-ready subheader) */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-md z-20 border-b border-muted/20 mt-4.5 px-4 flex gap-1.5 overflow-x-auto no-scrollbar py-2.5">
        <button
          onClick={() => setSelectedCategory("Semua")}
          className={cn(
            "text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-300 whitespace-nowrap border shrink-0",
            selectedCategory === "Semua"
              ? "bg-primary border-primary text-white shadow-sm shadow-primary/10"
              : "bg-card border-muted/20 text-muted-foreground hover:text-foreground"
          )}
        >
          Semua Menu
        </button>

        {restaurant.categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-300 whitespace-nowrap border shrink-0",
              selectedCategory === category
                ? "bg-primary border-primary text-white shadow-sm shadow-primary/10"
                : "bg-card border-muted/20 text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 5. Food Menu Lists grouped by categories */}
      <div className="px-4 mt-5 flex flex-col gap-6">
        {Object.keys(groupedMenus).length > 0 ? (
          Object.entries(groupedMenus).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              {/* Category Header Title */}
              <h2 className="text-xs font-black text-foreground uppercase tracking-wider pl-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {category}
                <span className="text-[10px] text-muted-foreground/60 font-medium">({items.length})</span>
              </h2>

              {/* Items in Category */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`food-card-${item.id}`}
                    onClick={() => handleFoodClick(item)}
                    className="flex gap-3.5 p-3 rounded-2xl border border-muted/20 bg-card/30 hover:border-primary/15 hover:bg-card/50 transition-all duration-300 group cursor-pointer active:scale-[0.99]"
                  >
                    {/* Details Column */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs font-black text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                            {item.name}
                          </h3>
                          {item.isPopular && (
                            <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/12 border-none font-black text-[8px] px-1 rounded-sm flex items-center gap-0.5 shrink-0">
                              <Sparkles className="size-2 fill-amber-500 stroke-none" />
                              <span>POPULER</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground/75 leading-relaxed font-medium line-clamp-2 mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2.5 font-black text-[11px] text-foreground">
                        <span>Rp {item.price.toLocaleString("id-ID")}</span>
                        {item.rating && (
                          <div className="flex items-center gap-0.5 text-amber-500 text-[9px] font-bold">
                            <Star className="size-3 fill-amber-500 stroke-none" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative size-20 rounded-xl overflow-hidden shrink-0 shadow-inner bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Interactive Add Indicator button */}
                      <div className="absolute bottom-1 right-1 size-6.5 rounded-lg bg-primary hover:bg-primary/95 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                        <Plus className="size-3.5 stroke-[3]" />
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
            <div className="size-12 rounded-full bg-muted/40 flex items-center justify-center mb-3">
              <Search className="size-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-xs font-black text-foreground">Menu Tidak Ditemukan</h3>
            <p className="text-[10px] text-muted-foreground max-w-[200px] mt-1 leading-relaxed">
              Tidak ada menu makanan/minuman yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
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
            className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto bg-zinc-900/95 border border-zinc-800 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between z-50 backdrop-blur-md"
          >
            <span className="flex-1 leading-snug pr-2">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white transition-colors"
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
