"use client"

import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"

import { useRouter } from "next/navigation"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const PLACEHOLDERS = [
  "Cari Soto Mbok Sri... 🍜",
  "Ayam Geprek pedas gila? 🍗",
  "Es Kopi Susu Aren dingin... 🥤",
  "Mau Nasi Goreng Gila? 🍚",
  "Camilan sore roti bakar... 🍞",
  "Cari mie ayam pangsit... 🍜"
]

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const router = useRouter()
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0)
  const [isFocused, setIsFocused] = React.useState(false)

  // Rotate placeholders every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Show animated placeholder only when input is not focused and search query is empty
  const showAnimatedPlaceholder = !isFocused && !searchQuery

  return (
    <div className="px-4 py-2 flex items-center gap-3">
      {/* Search Input wrapper */}
      <div 
        onClick={() => router.push("/search")}
        className="relative flex-1 group cursor-pointer"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80 group-focus-within:text-primary transition-colors duration-300 z-10" />
        
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          readOnly
          className="pl-10 pr-4 h-11 bg-muted/40 border-muted/70 rounded-2xl placeholder:text-transparent cursor-pointer focus-visible:bg-background transition-all duration-300 focus-visible:ring-primary/20 text-sm font-medium shadow-inner relative z-0"
        />

        {/* Animated Slide-up + Blur Placeholder Overlay */}
        <div className="absolute left-10 right-4 top-0 bottom-0 pointer-events-none flex items-center overflow-hidden z-10 select-none">
          <AnimatePresence mode="wait">
            {showAnimatedPlaceholder && (
              <motion.span
                key={placeholderIndex}
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-muted-foreground/60 text-sm font-medium whitespace-nowrap block"
              >
                {PLACEHOLDERS[placeholderIndex]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors z-20"
          >
            Bersihkan
          </button>
        )}
      </div>

      {/* Filter Button */}
      <Button
        variant="outline"
        size="icon"
        className="size-11 rounded-2xl bg-primary text-primary-foreground border-none shadow-md hover:bg-primary/95 active:scale-95 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      >
        <SlidersHorizontal className="size-4.5" />
      </Button>
    </div>
  )
}
