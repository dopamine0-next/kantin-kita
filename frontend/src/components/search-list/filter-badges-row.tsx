'use client'

import { Check } from 'lucide-react'

export const FILTER_BADGES = [
  { id: 'under-30k', label: 'Harga < 30rb' },
  { id: 'instant', label: 'Instant (<10 mnt)' },
  { id: 'rating-high', label: 'Rating 4.8+' },
]

interface FilterBadgesRowProps {
  selectedFilters: string[]
  onToggleFilter: (filterId: string) => void
}

export function FilterBadgesRow({ selectedFilters, onToggleFilter }: FilterBadgesRowProps) {
  return (
    <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto pt-3 pb-1 select-none">
      {FILTER_BADGES.map((filter) => {
        const isSelected = selectedFilters.includes(filter.id)
        return (
          <button
            key={filter.id}
            onClick={() => onToggleFilter(filter.id)}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
              isSelected
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted/30 hover:bg-muted text-muted-foreground border-muted/50'
            }`}
          >
            {isSelected && <Check className="size-3 stroke-2" />}
            <span>{filter.label}</span>
          </button>
        )
      })}
    </div>
  )
}
