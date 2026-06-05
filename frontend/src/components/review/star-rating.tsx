'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  size?: number
  disabled?: boolean
}

export function StarRating({ value, onChange, size = 6, disabled = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          className={`transition-colors ${
            disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
        >
          <Star
            className={`${star <= value ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'} transition-all`}
            style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
          />
        </button>
      ))}
    </div>
  )
}
