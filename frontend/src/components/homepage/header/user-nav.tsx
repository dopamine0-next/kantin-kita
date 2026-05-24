'use client'

import { useEffect, useState } from 'react'

import { Bell, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between">
      <div className="group flex items-center gap-3">
        <Avatar className="border-primary/25 bg-primary/10 flex size-11 items-center justify-center border-2 shadow-sm">
          <AvatarFallback className="bg-transparent">
            <User className="text-primary size-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-muted-foreground/80 text-[10px] font-medium">
            Hallo,
          </span>
          <span className="text-foreground flex items-center gap-1 text-sm font-black tracking-tight">
            Pengguna <span className="animate-bounce">👋</span>
          </span>
        </div>
      </div>

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
