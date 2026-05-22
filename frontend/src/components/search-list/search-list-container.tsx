'use client'
import { useEffect, useMemo, useState } from 'react'

import { Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { STALLS_DATABASE } from './constants'
import { FilterBadgesRow } from './filter-badges-row'
import { SearchHeader } from './search-header'
import { StallCard } from './stall-card'

interface SearchListContainerProps {
  initialQuery: string
}

export default function SearchListContainer({ initialQuery }: SearchListContainerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  // Keep internal state updated when URL query changes (via Server Component initialQuery prop)
  useEffect(() => {
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

  // Filter Stalls based on search query AND active filters
  const filteredStalls = useMemo(() => {
    return STALLS_DATABASE.filter((stall) => {
      // 1. Text Search Filter (matches stall name or cuisine menu tags)
      const matchesSearch = searchQuery.trim()
        ? stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stall.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      if (!matchesSearch) return false

      // 2. Interactive Badges Filters
      if (selectedFilters.includes('under-30') && stall.cheapestItemPrice >= 30000) {
        return false
      }
      if (selectedFilters.includes('instant') && !stall.isInstant) {
        return false
      }
      if (selectedFilters.includes('rating-high') && stall.rating < 4.8) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedFilters])

  return (
    <div className="bg-background border-muted/50 relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x pb-6">
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

      {/* Canteen Stalls / Restaurant List Results */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        {/* Results Info */}
        <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
          <span>Menampilkan {filteredStalls.length} kios kantin</span>
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              className="text-primary font-bold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredStalls.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredStalls.map((stall, idx) => (
                <StallCard
                  key={stall.id}
                  stall={{
                    ...stall,
                    distance: stall.block || 'Blok A',
                  }}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            // Empty filter result state
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="bg-muted/40 mb-4 flex size-16 items-center justify-center rounded-full">
                <Sparkles className="text-muted-foreground/60 animate-spin-slow size-8" />
              </div>
              <h3 className="text-foreground text-sm font-bold">Kios Kantin Tidak Ditemukan</h3>
              <p className="text-muted-foreground mt-1.5 max-w-[220px] text-xs leading-relaxed">
                Tidak ada kios yang cocok dengan filter atau kata kunci &ldquo;{searchQuery}&rdquo;
                Anda. Silakan reset filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
