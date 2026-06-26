import { LocationBar } from '@/components/homepage/header/location-bar'
import { UserNav } from '@/components/homepage/header/user-nav'

export function Header() {
  return (
    <header className="flex flex-col gap-3 px-4 pt-4 pb-1">
      <UserNav />
      <LocationBar />
    </header>
  )
}
