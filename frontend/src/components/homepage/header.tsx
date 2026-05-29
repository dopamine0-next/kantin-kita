'use client'

import { LocationBar } from './header/location-bar'
import { UserNav } from './header/user-nav'

export function Header() {
  return (
    <div className="flex flex-col gap-4.5 px-4 pt-6 pb-2">
      <UserNav />
      <LocationBar />
    </div>
  )
}
