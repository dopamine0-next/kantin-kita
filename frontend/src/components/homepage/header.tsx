'use client'

import { useState } from 'react'

import { LoginDrawer } from '@/components/auth/login-drawer'
import { useAuthStore } from '@/store/useAuthStore'

import { LocationBar } from './header/location-bar'
import { ProfileDrawer } from './header/profile-drawer'
import { UserNav } from './header/user-nav'

interface HeaderProps {
  activeMode: 'dine-in' | 'pickup'
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
}

export function Header({ activeMode, setActiveMode }: HeaderProps) {
  const { user } = useAuthStore()

  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4.5 px-4 pt-6 pb-2">
      <UserNav
        onOpenLogin={() => setIsLoginDrawerOpen(true)}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
      />

      <LocationBar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onOpenLocation={() => (user ? setIsProfileDrawerOpen(true) : setIsLoginDrawerOpen(true))}
      />

      <LoginDrawer isOpen={isLoginDrawerOpen} onClose={() => setIsLoginDrawerOpen(false)} />

      {user && (
        <ProfileDrawer
          isOpen={isProfileDrawerOpen}
          onOpenChange={setIsProfileDrawerOpen}
          onOpenLogin={() => setIsLoginDrawerOpen(true)}
        />
      )}
    </div>
  )
}
