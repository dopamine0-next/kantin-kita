"use client"

import * as React from "react"
import { useAuthStore, MOCK_USERS, UserProfile } from "@/store/useAuthStore"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, MapPin, User, LogIn } from "lucide-react"
import { motion } from "motion/react"

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
      <DrawerContent className="max-w-md mx-auto bg-background/95 backdrop-blur-xl border-t border-muted/40 rounded-t-[32px] overflow-hidden outline-none">
        <div className="p-5 pb-8">
          <DrawerHeader className="px-0 pt-0 text-left">
            <div className="flex items-center gap-2 text-primary mb-1">
              <LogIn className="size-5" />
              <span className="text-[10px] font-black tracking-wider uppercase">Pilih Akun Demo</span>
            </div>
            <DrawerTitle className="text-base font-black text-foreground tracking-tight">
              Masuk ke KantinKita
            </DrawerTitle>
            <DrawerDescription className="text-xs text-muted-foreground/80 font-medium">
              Pilih salah satu profil user simulasi di bawah untuk menguji fitur pesanan, saldo, dan lokasi.
            </DrawerDescription>
          </DrawerHeader>

          {/* List of Mock Profiles */}
          <div className="flex flex-col gap-3.5 mt-4">
            {MOCK_USERS.map((profile, idx) => {
              // Extract initials
              const initials = profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)

              return (
                <motion.button
                  key={profile.name}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  onClick={() => handleSelectUser(profile)}
                  className="w-full p-4 rounded-2xl border border-muted/30 bg-card/45 hover:bg-card/70 hover:border-primary/20 flex items-center justify-between transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    {/* User Avatar */}
                    <Avatar className="size-11 border border-muted-foreground/10 group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Details */}
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-xs font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                        {profile.name}
                      </h4>
                      
                      <div className="flex items-center gap-2.5 text-[9px] font-bold text-muted-foreground/80 mt-1">
                        {/* Saldo info */}
                        <span className="flex items-center gap-0.8 bg-primary/5 text-primary px-1.5 py-0.5 rounded-md">
                          <Wallet className="size-3 stroke-[2.5]" />
                          <span>Rp {profile.saldo.toLocaleString("id-ID")}</span>
                        </span>
                        
                        {/* Location/Block info */}
                        <span className="flex items-center gap-0.8 bg-muted px-1.5 py-0.5 rounded-md">
                          <MapPin className="size-3" />
                          <span>{profile.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connect Indicator Icon */}
                  <div className="size-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
              className="w-full h-11 border-muted/30 rounded-xl font-bold text-xs"
            >
              Kembali
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
