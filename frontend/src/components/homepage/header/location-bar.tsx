'use client'

import { MapPin } from 'lucide-react'

import { useAuthStore } from '@/store/useAuthStore'

import { ModeToggle } from './mode-toggle'

interface LocationBarProps {
  activeMode: 'dine-in' | 'pickup'
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
  onOpenLocation: () => void
}

export function LocationBar({ activeMode, setActiveMode, onOpenLocation }: LocationBarProps) {
  const { user } = useAuthStore()

  return (
    <div className="bg-card/45 border-muted/20 flex flex-col gap-3 rounded-[20px] border p-3.5 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground flex items-center gap-1.5 font-semibold">
          <MapPin className="text-primary size-3.5 shrink-0" />
          <span className="text-foreground font-bold">
            {user ? `Kantin Kita - ${user.location}` : 'Kantin Kita - Blok A'}
          </span>
        </div>
        <button
          onClick={onOpenLocation}
          className="text-primary text-[10px] font-extrabold tracking-wider uppercase hover:underline"
        >
          Ubah Lokasi
        </button>
      </div>

      <ModeToggle activeMode={activeMode} setActiveMode={setActiveMode} />
    </div>
  )
}
