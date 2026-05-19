"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Category {
  id: string
  name: string
  emoji: string
}

export const FOOD_CATEGORIES: Category[] = [
  { id: "all", name: "Semua", emoji: "🍽️" },
  { id: "nasi", name: "Nasi", emoji: "🍚" },
  { id: "mie", name: "Mie & Bakso", emoji: "🍜" },
  { id: "ayam", name: "Ayam & Bebek", emoji: "🍗" },
  { id: "minuman", name: "Minuman", emoji: "🥤" },
  { id: "camilan", name: "Camilan", emoji: "🍟" },
  { id: "seafood", name: "Seafood", emoji: "🐟" },
  { id: "manis", name: "Pencuci Mulut", emoji: "🍰" },
]

interface CategoriesProps {
  selectedCategory: string
  setSelectedCategory: (categoryId: string) => void
}

export function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  return (
    <div className="flex flex-col gap-2 pt-2 pb-1">
      {/* Section title */}
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground tracking-tight">Kategori Makanan</h2>
        <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">Lihat Semua</span>
      </div>

      {/* Horizontal Scroll wrapper */}
      <div className="w-full overflow-x-auto flex gap-3 px-4 py-2 no-scrollbar select-none scroll-smooth">
        {FOOD_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-102"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground/90 border border-muted/30"
              )}
            >
              <span className="text-base">{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Tailwind CSS injection to hide scrollbars elegantly */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
