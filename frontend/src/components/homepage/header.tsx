'use client'

import { LocationBar } from './header/location-bar'
import { UserNav } from './header/user-nav'

interface HeaderProps {
  activeMode: 'dine-in' | 'pickup'
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
}

export function Header({ activeMode, setActiveMode }: HeaderProps) {
  return (
    <div className="flex flex-col gap-4.5 px-4 pt-6 pb-2">
      <UserNav />
      <LocationBar activeMode={activeMode} setActiveMode={setActiveMode} />
    </div>
  )
}
