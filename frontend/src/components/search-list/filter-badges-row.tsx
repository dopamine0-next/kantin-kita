"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { FILTER_BADGES } from "./constants"

interface FilterBadgesRowProps {
  selectedFilters: string[]
  onToggleFilter: (filterId: string) => void
}

export function FilterBadgesRow({
  selectedFilters,
  onToggleFilter,
}: FilterBadgesRowProps) {
  return (
    <div className="w-full overflow-x-auto flex gap-2.5 pt-3 pb-1 no-scrollbar select-none">
      {FILTER_BADGES.map((filter) => {
        const isSelected = selectedFilters.includes(filter.id)
        return (
          <button
            key={filter.id}
            onClick={() => onToggleFilter(filter.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all duration-300 active:scale-95 ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/30 hover:bg-muted text-muted-foreground border-muted/50"
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
