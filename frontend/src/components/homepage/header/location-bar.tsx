'use client'

import { useEffect, useState } from 'react'

import { Check, MapPin, Navigation } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const CAMPUS_LOCATIONS = [
  { id: 'pusat', name: 'Unpam Pusat', lat: -6.3465, lng: 106.7416 },
  { id: 'viktor', name: 'Unpam Viktor', lat: -6.3424, lng: 106.702 },
  { id: 'serang', name: 'Unpam Serang', lat: -6.12, lng: 106.15 },
]

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295
  const c = Math.cos
  const a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2
  return 12742 * Math.asin(Math.sqrt(a))
}

export function LocationBar() {
  const [selectedCampus, setSelectedCampus] = useState(CAMPUS_LOCATIONS[0])
  const [isLocating, setIsLocating] = useState(false)

  const autoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser ini.')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        let closestCampus = CAMPUS_LOCATIONS[0]
        let minDistance = Infinity

        CAMPUS_LOCATIONS.forEach((campus) => {
          const dist = getDistance(latitude, longitude, campus.lat, campus.lng)
          if (dist < minDistance) {
            minDistance = dist
            closestCampus = campus
          }
        })

        setSelectedCampus(closestCampus)
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

  return (
    <div className="bg-card/45 border-muted/20 flex flex-col gap-3 rounded-[20px] border p-3.5 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between text-xs">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-muted-foreground hover:text-primary flex cursor-pointer items-center gap-1.5 font-semibold transition-colors">
              <MapPin className="text-primary size-3.5 shrink-0" />
              <span className="text-foreground font-bold">Kantin Kita - {selectedCampus.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={autoDetectLocation} className="text-primary font-semibold">
              <Navigation className={`mr-2 size-4 ${isLocating ? 'animate-pulse' : ''}`} />
              {isLocating ? 'Mencari Lokasi...' : 'Deteksi Otomatis'}
            </DropdownMenuItem>
            <div className="bg-border/50 my-1 h-px" />
            {CAMPUS_LOCATIONS.map((campus) => (
              <DropdownMenuItem
                key={campus.id}
                onClick={() => setSelectedCampus(campus)}
                className="flex items-center justify-between"
              >
                <span>{campus.name}</span>
                {selectedCampus.id === campus.id && <Check className="text-primary size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={autoDetectLocation}
          className="text-primary flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase transition-opacity hover:opacity-80"
        >
          <Navigation className={`size-3 ${isLocating ? 'animate-spin' : ''}`} />
          Pilih Lokasi
        </button>
      </div>
    </div>
  )
}
