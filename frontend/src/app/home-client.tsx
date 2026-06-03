'use client'
import { useState } from 'react'

import { Banner } from '@/components/homepage/banner'
import { BottomNav } from '@/components/homepage/bottom-nav'
import { Categories } from '@/components/homepage/categories'
import { Header } from '@/components/homepage/header'
import { PromoItems } from '@/components/homepage/promo-items'
import { PromoMarquee } from '@/components/homepage/promo-marquee'
import { Restaurants } from '@/components/homepage/restaurants'
import { SearchBar } from '@/components/homepage/search-bar'

export default function HomeClient() {
  // App States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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
                <h2 className="text-foreground text-base font-black tracking-tight">
                  Kategori & Promo
                </h2>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
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

      {/* Bottom Tab Navigation Bar */}
      <BottomNav />
    </>
  )
}
