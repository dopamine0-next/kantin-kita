'use client'

import { useState } from 'react'

import { Check, Loader2, MapPin, Navigation } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocations } from '@/hooks/use-locations'
import { LocationItem } from '@/services/location/location.types'
import { useAuthStore } from '@/store/useAuthStore'

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295
  const c = Math.cos
  const a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2
  return 12742 * Math.asin(Math.sqrt(a))
}

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
      alert('Geolocation tidak didukung oleh browser ini.')
      return
    }

    if (locations.length === 0) return

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        let closestCampus = locations[0]
        let minDistance = Infinity

        locations.forEach((campus) => {
          const dist = getDistance(latitude, longitude, campus.lat, campus.lng)
          if (dist < minDistance) {
            minDistance = dist
            closestCampus = campus
          }
        })

        handleSelect(closestCampus)
        setIsLocating(false)
        alert(`Lokasi Anda terdeteksi lebih dekat ke: ${closestCampus.name}`)
      },
      (error) => {
        console.error('Error getting location:', error)
        alert('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.')
        setIsLocating(false)
      }
    )
  }

  if (isLoading || !selectedCampus) {
    return (
      <div className="bg-muted/30 flex h-14 items-center justify-center rounded-xl p-3 backdrop-blur-md">
        <Loader2 className="text-primary size-5 animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-muted/30 flex flex-col gap-3 rounded-xl p-3 shadow-none backdrop-blur-md">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-muted-foreground hover:text-primary flex cursor-pointer items-center gap-2 transition-colors">
              <MapPin className="text-primary size-3.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs leading-none font-medium tracking-wider uppercase">
                  Lokasi Kampus
                </span>
                <span className="text-foreground text-xs font-bold">{selectedCampus.name}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={autoDetectLocation} className="text-primary font-semibold">
              <Navigation className={`mr-2 size-4 ${isLocating ? 'animate-pulse' : ''}`} />
              {isLocating ? 'Mencari Lokasi...' : 'Deteksi Otomatis'}
            </DropdownMenuItem>
            <div className="bg-border/50 my-1 h-px" />
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

        <Button
          variant="ghost"
          size="sm"
          onClick={autoDetectLocation}
          className="text-primary h-auto p-0 text-xs font-bold hover:bg-transparent"
        >
          <Navigation className={`mr-1 size-3 ${isLocating ? 'animate-spin' : ''}`} />
          Ganti
        </Button>
      </div>
    </div>
  )
}
