'use client'
import { useEffect, useMemo, useState } from 'react'

import { Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { useRestaurants } from '@/hooks/use-restaurants'
import { useSearch } from '@/hooks/use-search'
import { useAuthStore } from '@/store/useAuthStore'

import { FilterBadgesRow } from './filter-badges-row'
import { MenuCard } from './menu-card'
import { SearchHeader } from './search-header'
import { StallCard } from './stall-card'

interface SearchListContainerProps {
  initialQuery: string
}

export default function SearchListContainer({ initialQuery }: SearchListContainerProps) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const { restaurants } = useRestaurants()
  const { results: menuResults, isLoading: isMenuLoading } = useSearch(initialQuery)

  // Keep internal state updated when URL query changes (via Server Component initialQuery prop)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    )
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search-list?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/search-list')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    router.push('/search-list')
  }

  // Filter Stalls based on search query AND active filters AND location
  const filteredStalls = useMemo(() => {
    return restaurants.filter((stall) => {
      // 0. Location Filter
      if (user?.locationId && stall.locationId !== user.locationId) {
        return false
      }

      // 1. Text Search Filter (matches stall name or cuisine menu tags)
      const matchesSearch = searchQuery.trim()
        ? stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stall.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      if (!matchesSearch) return false

      // 2. Interactive Badges Filters
      if (
        selectedFilters.includes('under-30') &&
        stall.cheapestPrice &&
        stall.cheapestPrice >= 30000
      ) {
        return false
      }
      if (selectedFilters.includes('rating-high') && stall.rating < 4.8) {
        return false
      }

      return true
    })
  }, [restaurants, searchQuery, selectedFilters, user])

  return (
    <div className="flex flex-1 flex-col pb-6">
      {/* Header Search Field */}
      <div className="bg-background/95 border-muted/30 sticky top-0 z-30 border-b px-4 pt-6 pb-3 backdrop-blur-md">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onClear={handleClear}
        />

        {/* Quick Filter Badges Row */}
        <FilterBadgesRow selectedFilters={selectedFilters} onToggleFilter={toggleFilter} />
      </div>

      {/* Results */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-4">
        {/* Menu Items Results */}
        {menuResults.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xs font-semibold">Menu</h3>
            <div className="flex flex-col gap-2">
              {menuResults.map((menu, idx) => (
                <MenuCard key={menu.id} menu={menu} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Canteen Stalls / Restaurant List Results */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-xs font-semibold">Kios Kantin</h3>
            {selectedFilters.length > 0 && (
              <button
                onClick={() => setSelectedFilters([])}
                className="text-primary text-xs font-semibold hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredStalls.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredStalls.map((stall, idx) => (
                  <StallCard key={stall.id} stall={stall} index={idx} />
                ))}
              </div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="bg-muted/40 mb-4 flex size-16 items-center justify-center rounded-full">
                  <Sparkles className="text-muted-foreground/60 animate-spin-slow size-8" />
                </div>
                <h3 className="text-foreground text-sm font-semibold">
                  Kios Kantin Tidak Ditemukan
                </h3>
                <p className="text-muted-foreground mt-1.5 max-w-[220px] text-xs leading-relaxed">
                  Tidak ada kios yang cocok dengan filter atau kata kunci &ldquo;{searchQuery}
                  &rdquo; Anda. Silakan reset filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
