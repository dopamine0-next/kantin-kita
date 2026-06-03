'use client'
import { MouseEvent, useState } from 'react'

import { ChevronLeft, Clock, Plus, Search, Sparkles, Star, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePopularSearches, useSearch } from '@/hooks/use-search'
import { formatRupiah } from '@/lib/utils'
import { SearchResult } from '@/services/search/search.types'
import { useCartStore } from '@/store/useCartStore'

export default function SearchClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [history, setHistory] = useState<string[]>(['Soto Ayam', 'Es Kopi Susu', 'Ayam Geprek'])

  const { addToCart, items } = useCartStore()
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0)

  const { results: filteredResults, isLoading: isSearchLoading } = useSearch(searchQuery)
  const { popularSearches } = usePopularSearches()

  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    // Add to history and keep unique
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())
      return [trimmed, ...filtered].slice(0, 5) // max 5 items
    })

    // Redirect to search-list page
    router.push(`/search-list?q=${encodeURIComponent(trimmed)}`)
  }

  const deleteHistoryItem = (e: MouseEvent, indexToDelete: number) => {
    e.stopPropagation()
    setHistory((prev) => prev.filter((_, i) => i !== indexToDelete))
  }

  const clearAllHistory = () => {
    setHistory([])
  }

  const handleAddToCart = (food: SearchResult) => {
    addToCart({
      foodId: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      qty: 1,
    })
    toast.success(`${food.name} berhasil ditambahkan ke keranjang!`)
  }

  return (
    <div className="flex flex-1 flex-col pb-6">
      {/* Search Header */}
      <div className="border-muted/30 bg-background/90 sticky top-0 z-30 flex items-center gap-2 border-b px-4 pt-6 pb-3 backdrop-blur-md">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted size-10 shrink-0 rounded-full"
          >
            <ChevronLeft className="text-foreground size-6" />
          </Button>
        </Link>

        {/* Input area */}
        <div className="group relative flex-1">
          <Search className="text-muted-foreground/80 group-focus-within:text-primary absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-colors" />
          <Input
            type="text"
            placeholder="Cari makanan atau kios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit(searchQuery)
            }}
            className="bg-muted/40 border-muted/70 placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-primary/20 h-10.5 rounded-2xl pr-8 pl-9 text-sm font-medium"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-muted-foreground/60 hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Search View Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {!searchQuery ? (
            // Search History & Trends Page
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Search History */}
              {history.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
                      Pencarian Terakhir
                    </h3>
                    <Button
                      onClick={clearAllHistory}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive flex h-auto items-center gap-1 p-0 text-xs font-bold hover:bg-transparent"
                    >
                      <Trash2 className="size-3" />
                      Hapus Semua
                    </Button>
                  </div>

                  <div className="border-muted/30 bg-muted/10 divide-muted/30 flex flex-col divide-y overflow-hidden rounded-2xl border">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSearchSubmit(item)}
                        className="hover:bg-muted/40 group flex cursor-pointer items-center justify-between px-4 py-3 transition-colors"
                      >
                        <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2.5 text-xs font-semibold transition-colors">
                          <Clock className="text-muted-foreground/60 size-4" />
                          <span>{item}</span>
                        </div>
                        <Button
                          onClick={(e) => deleteHistoryItem(e, index)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted/80 text-muted-foreground/50 hover:text-foreground size-6 shrink-0 rounded-full"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular / Trending Searches */}
              <div className="flex flex-col gap-3">
                <h3 className="text-foreground text-xs font-bold tracking-wider uppercase">
                  Pencarian Populer
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {popularSearches.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSubmit(tag)}
                      className="bg-muted/40 hover:bg-primary/10 hover:text-primary border-muted/40 text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-300 active:scale-95"
                    >
                      🔥 {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // Search Results List
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-semibold">
                  {isSearchLoading
                    ? 'Mencari...'
                    : `Menampilkan ${filteredResults.length} hasil untuk "${searchQuery}"`}
                </span>
              </div>

              {!isSearchLoading && filteredResults.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredResults.map((food, idx) => (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="border-muted/30 hover:border-primary/20 bg-card/60 group flex flex-row items-center overflow-hidden rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300"
                    >
                      {/* Left side Image */}
                      <div className="bg-muted relative size-24 shrink-0 overflow-hidden">
                        <Image
                          src={food.image}
                          alt={food.name}
                          fill
                          sizes="96px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Right side Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between px-3 py-2">
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-bold tracking-tight transition-colors">
                            {food.name}
                          </h4>
                          <span className="text-muted-foreground line-clamp-1 text-xs leading-none font-medium">
                            {food.stall}
                          </span>
                        </div>

                        {/* Rating, prep and pricing row */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-xs font-semibold">
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="size-3 fill-amber-500 stroke-none" />
                                <span className="text-foreground">{food.rating}</span>
                              </span>
                              <span>•</span>
                              <span>{food.prepTime}</span>
                            </div>
                            <span className="text-primary text-xs leading-none font-extrabold tracking-tight">
                              {formatRupiah(food.price)}
                            </span>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(food)}
                            size="icon"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 size-7 shrink-0 rounded-lg border-none shadow-none transition-all duration-300"
                          >
                            <Plus className="size-4 stroke-2" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Empty search results state
                <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-muted/40 mb-4 flex size-16 items-center justify-center rounded-full">
                    <Sparkles className="text-muted-foreground/60 size-8" />
                  </div>
                  <h3 className="text-foreground text-sm font-bold">Menu Tidak Ditemukan</h3>
                  <p className="text-muted-foreground mt-1.5 max-w-50 text-xs leading-relaxed">
                    Coba ketik kata kunci lain seperti &ldquo;Soto&rdquo;, &ldquo;Geprek&rdquo;,
                    atau &ldquo;Kopi&rdquo;.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating cart indicator in corner if items exist */}
      {cartCount > 0 && (
        <div className="absolute right-6 bottom-6 z-40">
          <div className="relative animate-bounce">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground size-12 rounded-full shadow-xl"
              onClick={() => {
                toast(`🛒 Anda memiliki ${cartCount} item di keranjang belanja!`)
              }}
            >
              <Plus className="size-5" />
            </Button>
            <span className="border-background bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 text-xs font-extrabold shadow-md">
              {cartCount}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
