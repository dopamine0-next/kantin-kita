import { cn } from '@/lib/utils'

interface RestaurantCategoryTabsProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function RestaurantCategoryTabs({
  categories,
  selectedCategory,
  setSelectedCategory,
}: RestaurantCategoryTabsProps) {
  return (
    <div className="bg-background/95 border-muted/20 no-scrollbar sticky top-0 z-20 mt-4.5 flex gap-1.5 overflow-x-auto border-b px-4 py-2.5 backdrop-blur-md">
      <button
        onClick={() => setSelectedCategory('Semua')}
        className={cn(
          'shrink-0 rounded-xl border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300',
          selectedCategory === 'Semua'
            ? 'bg-primary border-primary shadow-primary/10 text-white shadow-sm'
            : 'bg-card border-muted/20 text-muted-foreground hover:text-foreground'
        )}
      >
        Semua Menu
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={cn(
            'shrink-0 rounded-xl border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300',
            selectedCategory === category
              ? 'bg-primary border-primary shadow-primary/10 text-white shadow-sm'
              : 'bg-card border-muted/20 text-muted-foreground hover:text-foreground'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
