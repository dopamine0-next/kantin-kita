"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Search, Clock, X, Trash2, Star, Plus, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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
    id: "search-1",
    name: "Nasi Goreng Gila Kebon Sirih",
    stall: "Dapur Selera Kita",
    category: "nasi",
    price: 16000,
    rating: 4.8,
    prepTime: "10-15 mnt",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-2",
    name: "Mie Ayam Pangsit Jamur",
    stall: "Soto & Mie Ayam Pak Dadi",
    category: "mie",
    price: 15000,
    rating: 4.9,
    prepTime: "8-12 mnt",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-3",
    name: "Ayam Geprek Mozzarella Melted",
    stall: "Ayam Geprek Gahar",
    category: "ayam",
    price: 18000,
    rating: 4.7,
    prepTime: "12-18 mnt",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-4",
    name: "Es Kopi Susu Aren Double Shot",
    stall: "Kopi & Roti Bakar Kanto",
    category: "minuman",
    price: 10000,
    rating: 4.9,
    prepTime: "3-5 mnt",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-5",
    name: "Soto Ayam Lamongan Asli",
    stall: "Soto & Bakso Mbok Sri",
    category: "nasi",
    price: 15000,
    rating: 4.8,
    prepTime: "8-10 mnt",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-6",
    name: "Bakso Sapi Urat Solo",
    stall: "Soto & Bakso Mbok Sri",
    category: "mie",
    price: 18000,
    rating: 4.7,
    prepTime: "5-8 mnt",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-7",
    name: "Roti Bakar Coklat Keju Crispy",
    stall: "Kopi & Roti Bakar Kanto",
    category: "camilan",
    price: 12000,
    rating: 4.9,
    prepTime: "10 mnt",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "search-8",
    name: "Es Teh Manis Jumbo Segar",
    stall: "Kopi & Roti Bakar Kanto",
    category: "minuman",
    price: 4000,
    rating: 4.9,
    prepTime: "2 mnt",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
  }
]

const POPULAR_SEARCHES = ["Geprek", "Soto Lamongan", "Kopi Aren", "Nasi Goreng", "Roti Bakar", "Bakso"]

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [history, setHistory] = React.useState<string[]>([
    "Soto Ayam",
    "Es Kopi Susu",
    "Ayam Geprek"
  ])
  const [cartCount, setCartCount] = React.useState(0)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  // Filter search results
  const filteredResults = React.useMemo(() => {
    if (!searchQuery.trim()) return []
    return SEARCH_DATABASE.filter((food) =>
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

  const deleteHistoryItem = (e: React.MouseEvent, indexToDelete: number) => {
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

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="relative max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col pb-6">
      
      {/* Search Header */}
      <div className="px-4 pt-6 pb-3 flex items-center gap-2 border-b border-muted/30 sticky top-0 bg-background/90 backdrop-blur-md z-30">
        <Link href="/">
          <Button variant="ghost" size="icon" className="size-10 rounded-full hover:bg-muted shrink-0">
            <ChevronLeft className="size-6 text-foreground" />
          </Button>
        </Link>
        
        {/* Input area */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80 group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Cari makanan atau kios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit(searchQuery)
            }}
            className="pl-9 pr-8 h-10.5 bg-muted/40 border-muted/70 rounded-2xl placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-primary/20 text-sm font-medium"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
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
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Pencarian Terakhir</h3>
                    <Button
                      onClick={clearAllHistory}
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-rose-500 hover:text-rose-600 hover:bg-transparent font-bold flex items-center gap-1"
                    >
                      <Trash2 className="size-3" />
                      Hapus Semua
                    </Button>
                  </div>

                  <div className="flex flex-col rounded-2xl border border-muted/30 bg-muted/10 overflow-hidden divide-y divide-muted/30">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSearchSubmit(item)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-semibold group-hover:text-foreground transition-colors">
                          <Clock className="size-4 text-muted-foreground/60" />
                          <span>{item}</span>
                        </div>
                        <Button
                          onClick={(e) => deleteHistoryItem(e, index)}
                          variant="ghost"
                          size="icon"
                          className="size-6 rounded-full hover:bg-muted/80 text-muted-foreground/50 hover:text-foreground shrink-0"
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
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Pencarian Populer</h3>
                <div className="flex flex-wrap gap-2.5">
                  {POPULAR_SEARCHES.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSubmit(tag)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-muted/40 hover:bg-primary/10 hover:text-primary border border-muted/40 transition-all duration-300 active:scale-95 text-muted-foreground"
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
                <span className="text-xs text-muted-foreground font-semibold">
                  Menampilkan {filteredResults.length} hasil untuk &ldquo;{searchQuery}&rdquo;
                </span>
              </div>

              {filteredResults.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredResults.map((food) => (
                    <Card
                      key={food.id}
                      className="rounded-2xl border border-muted/30 hover:border-primary/20 bg-card/60 backdrop-blur-md overflow-hidden transition-all duration-300 group shadow-sm flex"
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
                      <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-xs font-bold text-foreground line-clamp-1 leading-snug tracking-tight group-hover:text-primary transition-colors">
                            {food.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-medium line-clamp-1 leading-none">
                            {food.stall}
                          </span>
                        </div>

                        {/* Rating, prep and pricing row */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/80">
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="size-3 fill-amber-500 stroke-none" />
                                <span className="text-foreground">{food.rating}</span>
                              </span>
                              <span>•</span>
                              <span>{food.prepTime}</span>
                            </div>
                            <span className="text-xs font-extrabold text-primary leading-none tracking-tight mt-1">
                              {formatRupiah(food.price)}
                            </span>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(food.name)}
                            size="icon"
                            className="size-8 rounded-xl bg-primary text-primary-foreground border-none hover:bg-primary/95 shadow-md active:scale-90 transition-all duration-300 shrink-0"
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
                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                  <div className="size-16 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                    <Sparkles className="size-8 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Menu Tidak Ditemukan</h3>
                  <p className="text-xs text-muted-foreground max-w-[200px] mt-1.5 leading-relaxed">
                    Coba ketik kata kunci lain seperti &ldquo;Soto&rdquo;, &ldquo;Geprek&rdquo;, atau &ldquo;Kopi&rdquo;.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating toast notification */}
      {toastMessage && (
        <div className="absolute bottom-6 left-4 right-4 bg-zinc-900/95 border border-zinc-800 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between z-50 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-3 text-white/60 hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Floating cart indicator in corner if items exist */}
      {cartCount > 0 && (
        <div className="absolute bottom-6 right-6 z-40">
          <div className="relative animate-bounce">
            <Button
              className="size-12 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90"
              onClick={() => {
                setToastMessage(`🛒 Anda memiliki ${cartCount} item di keranjang belanja!`);
                setTimeout(() => setToastMessage(null), 4000);
              }}
            >
              <Plus className="size-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[10px] size-5 rounded-full flex items-center justify-center border-2 border-background shadow-md">
              {cartCount}
            </span>
          </div>
        </div>
      )}

    </div>
  )
}