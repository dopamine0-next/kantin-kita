"use client"

import * as React from "react"
import { Header } from "@/components/homepage/header"
import { PromoMarquee } from "@/components/homepage/promo-marquee"
import { Banner } from "@/components/homepage/banner"
import { SearchBar } from "@/components/homepage/search-bar"
import { Categories } from "@/components/homepage/categories"
import { PromoItems, FoodItem } from "@/components/homepage/promo-items"
import { Restaurants } from "@/components/homepage/restaurants"
import { BottomNav } from "@/components/homepage/bottom-nav"
import { useCartStore } from "@/store/useCartStore"
import { useRouter } from "next/navigation"
import { Sparkles, ShoppingBag, X } from "lucide-react"

export default function Home() {
  const router = useRouter()
  // App States
  const [activeMode, setActiveMode] = React.useState<"dine-in" | "pickup">("dine-in")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [activeTab, setActiveTab] = React.useState("home")
  
  // Zustand States
  const items = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addToCart)
  
  // High-fidelity local toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const handleAddToCart = (item: FoodItem) => {
    addToCart({
      foodId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1
    })
    router.push("/checkout")
  }

  const handleCartClick = () => {
    router.push("/checkout")
  }


  return (
    <div className="relative max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 pt-2">
        
        {/* Main App Content based on selected active bottom tab */}
        {activeTab === "home" ? (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Header section (avatar, mode switch) */}
            <Header activeMode={activeMode} setActiveMode={setActiveMode} />

            {/* Infinite scrolling promo marquee */}
            <PromoMarquee />

            {/* Promo Banner carousel */}
            <Banner />

            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Horizontal food categories */}
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* Promo food items cards */}
            <PromoItems selectedCategory={selectedCategory} onAddToCart={handleAddToCart} />

            {/* List of nearby stalls */}
            <Restaurants />
          </div>
        ) : (
          // Secondary Tabs Placeholder (Beautiful aesthetic card content)
          <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center animate-pulse">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Sparkles className="size-8" />
            </div>
            <h2 className="text-lg font-bold text-foreground capitalize">Halaman {activeTab}</h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">
              Fitur ini sedang dalam pengembangan untuk integrasi Dribbble UI. Stay tuned!
            </p>
          </div>
        )}

      </div>

      {/* High-Fidelity Floating Notification Toast */}
      {toastMessage && (
        <div className="absolute bottom-24 left-4 right-4 bg-zinc-900/95 border border-zinc-800 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between z-50 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-3 text-white/60 hover:text-white transition-colors">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Bottom Tab Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={items.length}
        onCartClick={handleCartClick}
      />
    </div>
  )
}
