'use client'
import { MouseEvent, useState } from 'react'

import { ChevronLeft, Clock, Search, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SearchClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [history, setHistory] = useState<string[]>(['Soto Ayam', 'Es Kopi Susu', 'Ayam Geprek'])

  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())
      return [trimmed, ...filtered].slice(0, 5)
    })

    router.push(`/search-list?q=${encodeURIComponent(trimmed)}`)
  }

  const deleteHistoryItem = (e: MouseEvent, indexToDelete: number) => {
    e.stopPropagation()
    setHistory((prev) => prev.filter((_, i) => i !== indexToDelete))
  }

  const clearAllHistory = () => {
    setHistory([])
  }

  return (
    <div className="flex flex-1 flex-col pb-6">
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

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {history.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground text-xs font-semibold">Pencarian Terakhir</h3>
              <Button
                onClick={clearAllHistory}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive flex h-auto items-center gap-1 p-0 text-xs font-semibold hover:bg-transparent"
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
      </div>
    </div>
  )
}
