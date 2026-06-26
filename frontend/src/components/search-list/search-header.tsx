'use client'

import { ChevronLeft, Search, X } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearchSubmit: () => void
  onClear: () => void
}

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onClear,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href="/search">
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
          placeholder="Refine search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchSubmit()
            }
          }}
          className="bg-muted/40 border-muted/70 placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-primary/20 h-10.5 rounded-2xl pr-8 pl-9 text-sm font-medium"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="text-muted-foreground/60 hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
