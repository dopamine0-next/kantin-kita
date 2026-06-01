'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'

interface CategoriesProps {
  selectedCategory: string
  setSelectedCategory: (categoryId: string) => void
}

export function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  const { categories, isLoading } = useCategories()

  return (
    <div className="flex flex-col">
      {/* Horizontal Scroll wrapper */}
      <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto scroll-smooth px-4 py-1 select-none">
        {isLoading ? (
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          categories.map((category) => {
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
          })
        )}
      </div>
    </div>
  )
}
