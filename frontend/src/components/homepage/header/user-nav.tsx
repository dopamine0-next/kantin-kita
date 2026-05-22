'use client'

import { useEffect, useState } from 'react'

import { Bell, LogIn, Moon, Sun, Wallet } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'

interface UserNavProps {
  onOpenLogin: () => void
  onOpenProfile: () => void
}

export function UserNav({ onOpenLogin, onOpenProfile }: UserNavProps) {
  const { user } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
  }

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between">
      {user ? (
        <div onClick={onOpenProfile} className="group flex cursor-pointer items-center gap-3">
          <Avatar className="border-primary/25 size-11 border-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-black">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-muted-foreground/80 text-[10px] font-medium">
              Selamat datang,
            </span>
            <span className="text-foreground group-hover:text-primary flex items-center gap-1 text-sm font-black tracking-tight transition-colors">
              {user.name} <span className="animate-bounce">👋</span>
            </span>
            <span className="text-primary gap-0.8 mt-0.5 flex items-center text-[10px] font-extrabold">
              <Wallet className="size-3.2" />
              <span>Rp {user.saldo.toLocaleString('id-ID')}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Avatar className="border-muted bg-muted flex size-11 items-center justify-center border">
            <AvatarFallback className="bg-muted text-muted-foreground/70 text-xs font-semibold">
              ?
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-muted-foreground/80 text-[10px] font-medium">Silakan masuk,</span>
            <button
              onClick={onOpenLogin}
              className="text-primary flex items-center gap-0.5 text-left text-xs font-black hover:underline"
            >
              <span>Masuk Akun</span>
              <LogIn className="size-3 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="border-muted/80 bg-background/50 hover:bg-muted size-10 shrink-0 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300"
          aria-label="Toggle Night Mode"
        >
          {theme === 'dark' ? (
            <Sun className="size-5 fill-amber-400/20 text-amber-500" />
          ) : (
            <Moon className="size-5 fill-indigo-50/20 text-indigo-600" />
          )}
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="border-muted/80 bg-background/50 hover:bg-muted size-10 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300"
          >
            <Bell className="size-5" />
          </Button>
          <span className="absolute top-1 right-1 flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex size-2.5 rounded-full bg-rose-500"></span>
          </span>
        </div>
      </div>
    </div>
  )
}
