'use client'

import { useState } from 'react'

import { Check, MapPin, Navigation } from 'lucide-react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocations } from '@/hooks/use-locations'
import { cn } from '@/lib/utils'
import { locationService } from '@/services/location/location.service'
import { LocationItem } from '@/services/location/location.types'
import { useAuthStore } from '@/store/useAuthStore'

export function LocationBar() {
  const { user, updateLocation } = useAuthStore()
  const { locations, isLoading } = useLocations()
  const [isLocating, setIsLocating] = useState(false)

  const selectedCampus =
    locations.find((c) => c.id === user?.locationId) ||
    locations.find((c) => c.name === user?.location) ||
    locations[0]

  const handleSelect = (campus: LocationItem) => {
    updateLocation(campus.name, campus.id)
  }

  const autoDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation tidak didukung oleh browser ini.')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const nearest = await locationService.getNearestLocation(
            position.coords.latitude,
            position.coords.longitude,
          )
          handleSelect(nearest)
          toast.success(`Lokasi Anda terdeteksi lebih dekat ke: ${nearest.name}`)
        } catch {
          toast.error('Gagal mendeteksi lokasi kampus terdekat.')
        } finally {
          setIsLocating(false)
        }
      },
      () => {
        toast.error('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.')
        setIsLocating(false)
      },
    )
  }

  if (isLoading || !selectedCampus) {
    return <Skeleton className="h-14 w-full rounded-2xl" />
  }

  return (
    <div className="bg-card border-border/50 flex flex-col gap-4 rounded-2xl border p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-muted-foreground hover:text-primary flex cursor-pointer items-center gap-3 transition-colors">
              <MapPin className="text-primary size-4 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs leading-none font-semibold tracking-wider uppercase">
                  Lokasi Kampus
                </span>
                <span className="text-foreground text-sm font-semibold">{selectedCampus.name}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={autoDetectLocation} className="text-primary font-semibold">
              <Navigation className={cn('mr-2 size-3.5', isLocating && 'animate-pulse')} />
              {isLocating ? 'Mencari Lokasi...' : 'Deteksi Otomatis'}
            </DropdownMenuItem>
            <Separator className="my-1" />
            {locations.map((campus) => (
              <DropdownMenuItem
                key={campus.id}
                onClick={() => handleSelect(campus)}
                className="flex items-center justify-between"
              >
                <span>{campus.name}</span>
                {selectedCampus.id === campus.id && <Check className="text-primary size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
