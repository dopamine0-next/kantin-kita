"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { SearchHeader } from "./search-header"
import { FilterBadgesRow } from "./filter-badges-row"
import { StallCard } from "./stall-card"
import { STALLS_DATABASE } from "./constants"

interface SearchListContainerProps {
  initialQuery: string
}

export default function SearchListContainer({ initialQuery }: SearchListContainerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState(initialQuery)
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])

  // Keep internal state updated when URL query changes (via Server Component initialQuery prop)
  React.useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search-list?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/search-list")
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    router.push("/search-list")
  }

  // Filter Stalls based on search query AND active filters
  const filteredStalls = React.useMemo(() => {
    return STALLS_DATABASE.filter((stall) => {
      // 1. Text Search Filter (matches stall name or cuisine menu tags)
      const matchesSearch = searchQuery.trim()
        ? stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stall.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      if (!matchesSearch) return false

      // 2. Interactive Badges Filters
      if (selectedFilters.includes("under-30") && stall.cheapestItemPrice >= 30000) {
        return false
      }
      if (selectedFilters.includes("instant") && !stall.isInstant) {
        return false
      }
      if (selectedFilters.includes("rating-high") && stall.rating < 4.8) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedFilters])

  return (
    <div className="relative max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col pb-6">
      
      {/* Header Search Field */}
      <div className="px-4 pt-6 pb-3 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-muted/30">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onClear={handleClear}
        />

        {/* Quick Filter Badges Row */}
        <FilterBadgesRow
          selectedFilters={selectedFilters}
          onToggleFilter={toggleFilter}
        />
      </div>

      {/* Canteen Stalls / Restaurant List Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        
        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
          <span>Menampilkan {filteredStalls.length} kios kantin</span>
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              className="text-primary hover:underline font-bold"
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
                    distance: stall.block || "Blok A" 
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
              <div className="size-16 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                <Sparkles className="size-8 text-muted-foreground/60 animate-spin-slow" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Kios Kantin Tidak Ditemukan</h3>
              <p className="text-xs text-muted-foreground max-w-[220px] mt-1.5 leading-relaxed">
                Tidak ada kios yang cocok dengan filter atau kata kunci &ldquo;{searchQuery}&rdquo; Anda. Silakan reset filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
