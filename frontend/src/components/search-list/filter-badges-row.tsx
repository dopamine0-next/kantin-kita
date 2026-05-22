'use client'

import { Check } from 'lucide-react'

import { FILTER_BADGES } from './constants'

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
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
              isSelected
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted/30 hover:bg-muted text-muted-foreground border-muted/50'
            }`}
          >
            {isSelected && <Check className="size-3 stroke-[3]" />}
            <span>{filter.label}</span>
          </button>
        )
      })}
    </div>
  )
}
