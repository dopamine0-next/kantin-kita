'use client'
import { useEffect, useState } from 'react'

import { Banner } from '@/components/homepage/banner'
import { BottomNav } from '@/components/homepage/bottom-nav'
import { Categories } from '@/components/homepage/categories'
import { Header } from '@/components/homepage/header'
import { PromoItems } from '@/components/homepage/promo-items'
import { PromoMarquee } from '@/components/homepage/promo-marquee'
import { Restaurants } from '@/components/homepage/restaurants'
import { SearchBar } from '@/components/homepage/search-bar'
import { locationService } from '@/services/location/location.service'
import { useAuthStore } from '@/store/useAuthStore'

export default function HomeClient() {
  const { user, updateLocation } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (user?.locationId || !navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const nearest = await locationService.getNearestLocation(
            position.coords.latitude,
            position.coords.longitude
          )
          updateLocation(nearest.name, nearest.id)
        } catch {
          // silent — user can manually pick location later
        }
      },
      () => {
        // permission denied or error — silent
      },
      { timeout: 5000 }
    )
  }, [user?.locationId, updateLocation])

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
            <div className="px-4 pb-1">
              <h2 className="text-foreground text-base font-black tracking-tight">
                Kategori & Promo
              </h2>
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Temukan promo terbaikmu
              </p>
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
