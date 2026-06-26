'use client'
import { useEffect, useState } from 'react'

import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const PLACEHOLDERS = [
  'Cari Soto Mbok Sri... 🍜',
  'Ayam Geprek pedas gila? 🍗',
  'Es Kopi Susu Aren dingin... 🥤',
  'Mau Nasi Goreng Gila? 🍚',
  'Camilan sore roti bakar... 🍞',
  'Cari mie ayam pangsit... 🍜',
]

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const router = useRouter()
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isFocused] = useState(false)

  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Show animated placeholder only when input is not focused and search query is empty
  const showAnimatedPlaceholder = !isFocused && !searchQuery

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      {/* Search Input wrapper */}
      <div onClick={() => router.push('/search')} className="group relative flex-1 cursor-pointer">
        <Search className="text-muted-foreground/80 group-focus-within:text-primary absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 transition-colors duration-300" />

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          readOnly
          className="bg-muted/40 border-muted/70 focus-visible:bg-background focus-visible:ring-primary/20 relative z-0 h-11 cursor-pointer rounded-2xl pr-4 pl-10 text-sm font-medium shadow-inner transition-all duration-300 placeholder:text-transparent"
        />

        {/* Animated Slide-up + Blur Placeholder Overlay */}
        <div className="pointer-events-none absolute top-0 right-4 bottom-0 left-10 z-10 flex items-center overflow-hidden select-none">
          <AnimatePresence mode="wait">
            {showAnimatedPlaceholder && (
              <motion.span
                key={placeholderIndex}
                initial={{ y: 15, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -15, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-muted-foreground/60 block text-sm font-medium whitespace-nowrap"
              >
                {PLACEHOLDERS[placeholderIndex]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 z-20 -translate-y-1/2 text-xs font-semibold transition-colors"
          >
            Bersihkan
          </button>
        )}
      </div>
    </div>
  )
}
