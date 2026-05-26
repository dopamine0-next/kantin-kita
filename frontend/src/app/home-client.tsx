'use client'
import { useState } from 'react'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Banner } from '@/components/homepage/banner'
import { BottomNav } from '@/components/homepage/bottom-nav'
import { Categories } from '@/components/homepage/categories'
import { Header } from '@/components/homepage/header'
import { FoodItem, PromoItems } from '@/components/homepage/promo-items'
import { PromoMarquee } from '@/components/homepage/promo-marquee'
import { Restaurants } from '@/components/homepage/restaurants'
import { SearchBar } from '@/components/homepage/search-bar'

export default function HomeClient() {
  const router = useRouter()
  // App States
  const [activeMode, setActiveMode] = useState<'dine-in' | 'pickup'>('dine-in')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // High-fidelity local toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  return (
    <div className="bg-background border-muted/50 relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x">
      {/* Scrollable Container */}
      <div className="no-scrollbar flex-1 overflow-y-auto pt-2 pb-24">
        {/* Main App Content */}
        <div className="animate-fade-in flex flex-col gap-4">
          {/* Header section (avatar, mode switch) */}
          <Header activeMode={activeMode} setActiveMode={setActiveMode} />

          {/* Group Marquee and Banner to remove gap between them */}
          <div className="flex flex-col">
            {/* Infinite scrolling promo marquee */}
            <PromoMarquee />

            {/* Promo Banner carousel */}
            <Banner />
          </div>

          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Horizontal food categories */}
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Promo food items cards */}
          <PromoItems selectedCategory={selectedCategory} />

          {/* List of nearby stalls */}
          <Restaurants />
        </div>
      </div>

      {/* High-Fidelity Floating Notification Toast */}
      {toastMessage && (
        <div className="animate-in slide-in-from-bottom absolute right-4 bottom-24 left-4 z-50 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md duration-300">
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-white/60 transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Bottom Tab Navigation Bar */}
      <BottomNav />
    </div>
  )
}
