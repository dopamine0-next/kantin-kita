'use client'

import { LogIn, MapPin, User, Wallet } from 'lucide-react'
import { motion } from 'motion/react'

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
import { MOCK_USERS, UserProfile, useAuthStore } from '@/store/useAuthStore'

interface LoginDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginDrawer({ isOpen, onClose }: LoginDrawerProps) {
  const login = useAuthStore((state) => state.login)

  const handleSelectUser = (profile: UserProfile) => {
    login(profile)
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-[32px] border-t backdrop-blur-xl outline-none">
        <div className="p-5 pb-8">
          <DrawerHeader className="px-0 pt-0 text-left">
            <div className="text-primary mb-1 flex items-center gap-2">
              <LogIn className="size-5" />
              <span className="text-[10px] font-black tracking-wider uppercase">
                Pilih Akun Demo
              </span>
            </div>
            <DrawerTitle className="text-foreground text-base font-black tracking-tight">
              Masuk ke KantinKita
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground/80 text-xs font-medium">
              Pilih salah satu profil user simulasi di bawah untuk menguji fitur pesanan, saldo, dan
              lokasi.
            </DrawerDescription>
          </DrawerHeader>

          {/* List of Mock Profiles */}
          <div className="mt-4 flex flex-col gap-3.5">
            {MOCK_USERS.map((profile, idx) => {
              // Extract initials
              const initials = profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)

              return (
                <motion.button
                  key={profile.name}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  onClick={() => handleSelectUser(profile)}
                  className="border-muted/30 bg-card/45 hover:bg-card/70 hover:border-primary/20 group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    {/* User Avatar */}
                    <Avatar className="border-muted-foreground/10 size-11 border transition-transform duration-300 group-hover:scale-105">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Details */}
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-foreground group-hover:text-primary text-xs leading-tight font-black transition-colors">
                        {profile.name}
                      </h4>

                      <div className="text-muted-foreground/80 mt-1 flex items-center gap-2.5 text-[9px] font-bold">
                        {/* Saldo info */}
                        <span className="gap-0.8 bg-primary/5 text-primary flex items-center rounded-md px-1.5 py-0.5">
                          <Wallet className="size-3 stroke-[2.5]" />
                          <span>Rp {profile.saldo.toLocaleString('id-ID')}</span>
                        </span>

                        {/* Location/Block info */}
                        <span className="gap-0.8 bg-muted flex items-center rounded-md px-1.5 py-0.5">
                          <MapPin className="size-3" />
                          <span>{profile.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connect Indicator Icon */}
                  <div className="bg-muted/60 text-muted-foreground group-hover:bg-primary flex size-8 items-center justify-center rounded-full transition-all duration-300 group-hover:text-white">
                    <User className="size-4" />
                  </div>
                </motion.button>
              )
            })}
          </div>

          <DrawerFooter className="px-0 pt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-muted/30 h-11 w-full rounded-xl text-xs font-bold"
            >
              Kembali
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
