"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        <Button variant="ghost" size="icon" className="size-10 rounded-full hover:bg-muted shrink-0">
          <ChevronLeft className="size-6 text-foreground" />
        </Button>
      </Link>

      <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80 group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          placeholder="Refine search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit()
            }
          }}
          className="pl-9 pr-8 h-10.5 bg-muted/40 border-muted/70 rounded-2xl placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-primary/20 text-sm font-medium"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
