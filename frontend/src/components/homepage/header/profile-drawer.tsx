'use client'

import { ChevronRight, LogOut, RefreshCw, Wallet } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'

interface ProfileDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onOpenLogin: () => void
}

export function ProfileDrawer({ isOpen, onOpenChange, onOpenLogin }: ProfileDrawerProps) {
  const { user, logout, updateLocation } = useAuthStore()

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
  }

  const handleLocationSwitch = (loc: 'Blok A' | 'Blok B') => {
    updateLocation(loc)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-3xl border-t backdrop-blur-xl outline-none">
        <div className="flex flex-col gap-5 p-5 pb-8">
          <DrawerHeader className="px-0 pt-0 text-left">
            <DrawerTitle className="text-foreground text-base font-black tracking-tight">
              Profil Saya
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground/80 text-xs font-medium">
              Atur lokasi kantin atau ganti akun demo Anda.
            </DrawerDescription>
          </DrawerHeader>

          {/* Profile Card details */}
          <div className="bg-muted/40 border-muted/20 flex items-center gap-3.5 rounded-2xl border p-4">
            <Avatar className="border-primary/20 size-12.5 border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-foreground text-sm leading-tight font-black">{user.name}</h3>
              <div className="text-primary mt-1 flex items-center gap-1 text-xs font-black">
                <Wallet className="size-3.5 stroke-[2.5]" />
                <span>Saldo: Rp {user.saldo.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Location Selector */}
          <div className="flex flex-col gap-2">
            <h4 className="text-foreground pl-1 text-xs font-black tracking-wider uppercase">
              Pilih Blok Resto
            </h4>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={() => handleLocationSwitch('Blok A')}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border p-4 text-center transition-all duration-300',
                  user.location === 'Blok A'
                    ? 'bg-primary/5 border-primary text-primary'
                    : 'bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                )}
              >
                <span className="text-sm font-black">Blok A</span>
                <span className="text-xs leading-none font-medium opacity-80">
                  Gedung Utama Barat
                </span>
                {user.location === 'Blok A' && (
                  <div className="bg-primary absolute top-1.5 right-1.5 size-2 rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleLocationSwitch('Blok B')}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border p-4 text-center transition-all duration-300',
                  user.location === 'Blok B'
                    ? 'bg-primary/5 border-primary text-primary'
                    : 'bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                )}
              >
                <span className="text-sm font-black">Blok B</span>
                <span className="text-xs leading-none font-medium opacity-80">
                  Gedung Utama Timur
                </span>
                {user.location === 'Blok B' && (
                  <div className="bg-primary absolute top-1.5 right-1.5 size-2 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Account Controls */}
          <div className="mt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenChange(false)
                onOpenLogin()
              }}
              className="bg-card hover:bg-muted/35 border-muted/30 flex h-11 w-full items-center justify-between rounded-xl border px-4 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <RefreshCw className="text-muted-foreground size-4" />
                <span>Ganti Akun Demo</span>
              </span>
              <ChevronRight className="text-muted-foreground/60 size-4" />
            </button>

            <button
              onClick={() => {
                logout()
                onOpenChange(false)
              }}
              className="border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 flex h-11 w-full items-center justify-center gap-2 rounded-xl border text-xs font-black transition-colors"
            >
              <LogOut className="size-4" />
              <span>Keluar Akun (Log Out)</span>
            </button>
          </div>

          <DrawerFooter className="px-0 pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-primary text-primary-foreground h-11 w-full rounded-xl text-xs font-extrabold"
            >
              Selesai
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
