'use client'

import { cn } from '@/lib/utils'

export interface Category {
  id: string
  name: string
  emoji: string
}

export const FOOD_CATEGORIES: Category[] = [
  { id: 'all', name: 'Semua', emoji: '🍽️' },
  { id: 'nasi', name: 'Nasi', emoji: '🍚' },
  { id: 'mie', name: 'Mie & Bakso', emoji: '🍜' },
  { id: 'ayam', name: 'Ayam & Bebek', emoji: '🍗' },
  { id: 'minuman', name: 'Minuman', emoji: '🥤' },
  { id: 'camilan', name: 'Camilan', emoji: '🍟' },
  { id: 'seafood', name: 'Seafood', emoji: '🐟' },
  { id: 'manis', name: 'Pencuci Mulut', emoji: '🍰' },
]

interface CategoriesProps {
  selectedCategory: string
  setSelectedCategory: (categoryId: string) => void
}

export function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  return (
    <div className="flex flex-col gap-2 pt-2 pb-1">
      {/* Section title */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-foreground text-base font-bold tracking-tight">Kategori Makanan</h2>
        <span className="text-primary cursor-pointer text-xs font-semibold hover:underline">
          Lihat Semua
        </span>
      </div>

      {/* Horizontal Scroll wrapper */}
      <div className="no-scrollbar flex w-full gap-3 overflow-x-auto scroll-smooth px-4 py-2 select-none">
        {FOOD_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-primary/20 scale-102 shadow-md'
                  : 'bg-muted/40 hover:bg-muted text-muted-foreground/90 border-muted/30 border'
              )}
            >
              <span className="text-base">{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
