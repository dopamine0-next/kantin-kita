'use client'
import { MouseEvent, useMemo, useState } from 'react'

import {
  ArrowRight,
  ChevronLeft,
  Clock,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatRupiah } from '@/lib/utils'

// Food database for search results
interface SearchFoodItem {
  id: string
  name: string
  stall: string
  category: string
  price: number
  rating: number
  prepTime: string
  image: string
}

const SEARCH_DATABASE: SearchFoodItem[] = [
  {
    id: 'search-1',
    name: 'Nasi Goreng Gila Kebon Sirih',
    stall: 'Dapur Selera Kita',
    category: 'nasi',
    price: 16000,
    rating: 4.8,
    prepTime: '10-15 mnt',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-2',
    name: 'Mie Ayam Pangsit Jamur',
    stall: 'Soto & Mie Ayam Pak Dadi',
    category: 'mie',
    price: 15000,
    rating: 4.9,
    prepTime: '8-12 mnt',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-3',
    name: 'Ayam Geprek Mozzarella Melted',
    stall: 'Ayam Geprek Gahar',
    category: 'ayam',
    price: 18000,
    rating: 4.7,
    prepTime: '12-18 mnt',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-4',
    name: 'Es Kopi Susu Aren Double Shot',
    stall: 'Kopi & Roti Bakar Kanto',
    category: 'minuman',
    price: 10000,
    rating: 4.9,
    prepTime: '3-5 mnt',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-5',
    name: 'Soto Ayam Lamongan Asli',
    stall: 'Soto & Bakso Mbok Sri',
    category: 'nasi',
    price: 15000,
    rating: 4.8,
    prepTime: '8-10 mnt',
    image:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-6',
    name: 'Bakso Sapi Urat Solo',
    stall: 'Soto & Bakso Mbok Sri',
    category: 'mie',
    price: 18000,
    rating: 4.7,
    prepTime: '5-8 mnt',
    image:
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-7',
    name: 'Roti Bakar Coklat Keju Crispy',
    stall: 'Kopi & Roti Bakar Kanto',
    category: 'camilan',
    price: 12000,
    rating: 4.9,
    prepTime: '10 mnt',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'search-8',
    name: 'Es Teh Manis Jumbo Segar',
    stall: 'Kopi & Roti Bakar Kanto',
    category: 'minuman',
    price: 4000,
    rating: 4.9,
    prepTime: '2 mnt',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80',
  },
]

const POPULAR_SEARCHES = [
  'Geprek',
  'Soto Lamongan',
  'Kopi Aren',
  'Nasi Goreng',
  'Roti Bakar',
  'Bakso',
]

export default function SearchClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [history, setHistory] = useState<string[]>(['Soto Ayam', 'Es Kopi Susu', 'Ayam Geprek'])
  const [cartCount, setCartCount] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filter search results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return SEARCH_DATABASE.filter(
      (food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.stall.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

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

  const handleAddToCart = (foodName: string) => {
    setCartCount((prev) => prev + 1)
    setToastMessage(`✓ ${foodName} berhasil ditambahkan ke keranjang!`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="bg-background border-muted/50 relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x pb-6">
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
                      className="flex h-auto items-center gap-1 p-0 text-xs font-bold text-rose-500 hover:bg-transparent hover:text-rose-600"
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
                  {POPULAR_SEARCHES.map((tag, index) => (
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
                  Menampilkan {filteredResults.length} hasil untuk &ldquo;{searchQuery}&rdquo;
                </span>
              </div>

              {filteredResults.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredResults.map((food) => (
                    <Card
                      key={food.id}
                      className="border-muted/30 hover:border-primary/20 bg-card/60 group flex overflow-hidden rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300"
                    >
                      {/* Left side Image */}
                      <div className="relative size-24 shrink-0 overflow-hidden">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Right side Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-bold tracking-tight transition-colors">
                            {food.name}
                          </h4>
                          <span className="text-muted-foreground line-clamp-1 text-[10px] leading-none font-medium">
                            {food.stall}
                          </span>
                        </div>

                        {/* Rating, prep and pricing row */}
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-muted-foreground/80 flex items-center gap-2 text-[10px] font-semibold">
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="size-3 fill-amber-500 stroke-none" />
                                <span className="text-foreground">{food.rating}</span>
                              </span>
                              <span>•</span>
                              <span>{food.prepTime}</span>
                            </div>
                            <span className="text-primary mt-1 text-xs leading-none font-extrabold tracking-tight">
                              {formatRupiah(food.price)}
                            </span>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(food.name)}
                            size="icon"
                            className="bg-primary text-primary-foreground hover:bg-primary/95 size-8 shrink-0 rounded-xl border-none shadow-md transition-all duration-300 active:scale-90"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                // Empty search results state
                <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-muted/40 mb-4 flex size-16 items-center justify-center rounded-full">
                    <Sparkles className="text-muted-foreground/60 size-8" />
                  </div>
                  <h3 className="text-foreground text-sm font-bold">Menu Tidak Ditemukan</h3>
                  <p className="text-muted-foreground mt-1.5 max-w-[200px] text-xs leading-relaxed">
                    Coba ketik kata kunci lain seperti &ldquo;Soto&rdquo;, &ldquo;Geprek&rdquo;,
                    atau &ldquo;Kopi&rdquo;.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating toast notification */}
      {toastMessage && (
        <div className="animate-in slide-in-from-bottom absolute right-4 bottom-6 left-4 z-50 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md duration-300">
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-white/60 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Floating cart indicator in corner if items exist */}
      {cartCount > 0 && (
        <div className="absolute right-6 bottom-6 z-40">
          <div className="relative animate-bounce">
            <Button
              className="bg-primary hover:bg-primary/90 size-12 rounded-full text-white shadow-xl"
              onClick={() => {
                setToastMessage(`🛒 Anda memiliki ${cartCount} item di keranjang belanja!`)
                setTimeout(() => setToastMessage(null), 4000)
              }}
            >
              <Plus className="size-5" />
            </Button>
            <span className="border-background absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 bg-rose-500 text-[10px] font-extrabold text-white shadow-md">
              {cartCount}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
