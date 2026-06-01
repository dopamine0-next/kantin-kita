'use client'
import { useState } from 'react'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Banner } from '@/components/homepage/banner'
import { BottomNav } from '@/components/homepage/bottom-nav'
import { Categories } from '@/components/homepage/categories'
import { Header } from '@/components/homepage/header'
import { PromoItems } from '@/components/homepage/promo-items'
import { PromoMarquee } from '@/components/homepage/promo-marquee'
import { Restaurants } from '@/components/homepage/restaurants'
import { SearchBar } from '@/components/homepage/search-bar'

export default function HomeClient() {
  const router = useRouter()
  // App States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // High-fidelity local toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  return (
    <>
      <PromoMarquee />

      {/* Scrollable Container */}
      <div className="no-scrollbar flex-1 overflow-y-auto pt-2 pb-24">
        {/* Main App Content */}
        <div className="animate-fade-in flex flex-col gap-4">
          {/* Header section (avatar, location) */}
          <Header />

          {/* Group Marquee and Banner to remove gap between them */}
          <div className="flex flex-col">
            {/* Infinite scrolling promo marquee */}

            {/* Promo Banner carousel */}
            <Banner />
          </div>

          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Unified Category & Promo Section */}
          <section className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-4 pb-1">
              <div className="flex flex-col">
                <h2 className="text-foreground text-base font-black tracking-tight">Kategori & Promo</h2>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  Temukan promo terbaikmu
                </p>
              </div>
              <span className="text-primary cursor-pointer text-xs font-bold hover:underline">
                Lihat Semua
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <PromoItems selectedCategory={selectedCategory} />
            </div>
          </section>

          {/* List of nearby stalls */}
          <Restaurants />
        </div>
      </div>

      {/* High-Fidelity Floating Notification Toast */}
      {toastMessage && (
        <div className="animate-in slide-in-from-bottom absolute right-4 bottom-24 left-4 z-50 flex items-center justify-between rounded-xl border border-border bg-popover/95 px-4 py-3 text-xs font-bold text-popover-foreground shadow-2xl backdrop-blur-md duration-300">
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-popover-foreground/60 transition-colors hover:text-popover-foreground ml-3"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Bottom Tab Navigation Bar */}
      <BottomNav />
    </>
  )
}
