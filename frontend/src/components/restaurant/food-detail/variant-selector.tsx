'use client'

import { cn } from '@/lib/utils'

interface VariantSelectorProps {
  variants: string[]
  selectedVariant: string
  onSelect: (variant: string) => void
}

export function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null

  return (
    <div className="mt-6">
      <h4 className="text-foreground mb-3 text-xs font-semibold">Pilih Ukuran / Porsi</h4>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant
          return (
            <button
              key={variant}
              onClick={() => onSelect(variant)}
              className={cn(
                'rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 active:scale-95',
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-primary/10 shadow-md'
                  : 'bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground'
              )}
            >
              {variant}
            </button>
          )
        })}
      </div>
    </div>
  )
}
