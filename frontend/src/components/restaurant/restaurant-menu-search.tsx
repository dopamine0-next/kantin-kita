import { Search, X } from 'lucide-react'

interface RestaurantMenuSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function RestaurantMenuSearch({
  searchQuery,
  setSearchQuery,
}: RestaurantMenuSearchProps) {
  return (
    <div className="mt-5 px-4">
      <div className="bg-muted/40 border-muted/20 relative flex items-center rounded-xl border px-3 py-2">
        <Search className="text-muted-foreground/60 mr-2 size-4 shrink-0" />
        <input
          type="text"
          placeholder="Cari makanan atau minuman lezat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-foreground placeholder:text-muted-foreground/45 w-full border-none bg-transparent text-xs focus:ring-0 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="bg-muted/60 text-muted-foreground hover:bg-muted flex size-5 items-center justify-center rounded-full"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
    </div>
  )
}
