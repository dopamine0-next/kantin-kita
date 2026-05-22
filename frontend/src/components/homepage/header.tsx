"use client"

import * as React from "react"
import { Bell, MapPin, Wallet, LogOut, RefreshCw, ChevronRight, LogIn, Sun, Moon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/useAuthStore"
import { LoginDrawer } from "@/components/auth/login-drawer"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeMode: "dine-in" | "pickup"
  setActiveMode: (mode: "dine-in" | "pickup") => void
}

export function Header({ activeMode, setActiveMode }: HeaderProps) {
  const { user, logout, updateLocation } = useAuthStore()
  
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = React.useState(false)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark") || 
      localStorage.getItem("theme") === "dark"
    setIsDark(isDarkTheme)
    if (isDarkTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
  }

  const handleLocationSwitch = (loc: "Blok A" | "Blok B") => {
    updateLocation(loc)
  }

  return (
    <div className="flex flex-col gap-4.5 px-4 pt-6 pb-2">
      {/* Top Profile & Welcome Row */}
      <div className="flex items-center justify-between">
        {user ? (
          /* Logged In User Profile click to open profile menu drawer */
          <div 
            onClick={() => setIsProfileDrawerOpen(true)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Avatar className="size-11 border-2 border-primary/25 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground/80 font-medium">Selamat datang,</span>
              <span className="text-sm font-black text-foreground tracking-tight flex items-center gap-1 group-hover:text-primary transition-colors">
                {user.name} <span className="animate-bounce">👋</span>
              </span>
              <span className="text-[10px] font-extrabold text-primary flex items-center gap-0.8 mt-0.5">
                <Wallet className="size-3.2" />
                <span>Rp {user.saldo.toLocaleString("id-ID")}</span>
              </span>
            </div>
          </div>
        ) : (
          /* Guest/Logged Out Profile */
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-muted bg-muted flex items-center justify-center">
              <AvatarFallback className="bg-muted text-muted-foreground/70 font-semibold text-xs">
                ?
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground/80 font-medium">Silakan masuk,</span>
              <button 
                onClick={() => setIsLoginDrawerOpen(true)}
                className="text-xs font-black text-primary hover:underline flex items-center gap-0.5 text-left"
              >
                <span>Masuk Akun</span>
                <LogIn className="size-3 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle (Night Mode) */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="size-10 rounded-full border-muted/80 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-muted transition-all duration-300 shrink-0"
            aria-label="Toggle Night Mode"
          >
            {isDark ? (
              <Sun className="size-5 text-amber-500 fill-amber-400/20" />
            ) : (
              <Moon className="size-5 text-indigo-600 fill-indigo-50/20" />
            )}
          </Button>

          {/* Notification Bell */}
          <div className="relative">
            <Button variant="outline" size="icon" className="size-10 rounded-full border-muted/80 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-muted transition-all duration-300">
            <Bell className="size-5" />
          </Button>
          <span className="absolute top-1 right-1 flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-rose-500"></span>
          </span>
        </div>
      </div>

      {/* Location Bar & Dine In / Pickup Switcher */}
      <div className="flex flex-col gap-3 bg-card/45 p-3.5 rounded-[20px] border border-muted/20 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span className="text-foreground font-bold">
              {user ? `Kantin Kita - ${user.location}` : "Kantin Kita - Blok A"}
            </span>
          </div>
          <button 
            onClick={() => user ? setIsProfileDrawerOpen(true) : setIsLoginDrawerOpen(true)}
            className="text-primary hover:underline font-extrabold text-[10px] uppercase tracking-wider"
          >
            Ubah Lokasi
          </button>
        </div>

        {/* High-fidelity Sliding Toggle */}
        <div className="relative flex p-1 bg-muted/50 rounded-xl border border-muted/15">
          {/* Active Highlight Slider */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-card rounded-lg shadow-md transition-all duration-300 ease-out border border-muted/10 ${
              activeMode === "pickup" ? "left-[calc(50%+2px)]" : "left-1"
            }`}
          />
          
          <button
            onClick={() => setActiveMode("dine-in")}
            className={`relative z-10 flex-1 py-2 text-[10px] font-black text-center transition-colors duration-300 rounded-lg ${
              activeMode === "dine-in" ? "text-primary" : "text-muted-foreground/80 hover:text-foreground"
            }`}
          >
            🍽️ Makan di Sini (Dine-In)
          </button>
          
          <button
            onClick={() => setActiveMode("pickup")}
            className={`relative z-10 flex-1 py-2 text-[10px] font-black text-center transition-colors duration-300 rounded-lg ${
              activeMode === "pickup" ? "text-primary" : "text-muted-foreground/80 hover:text-foreground"
            }`}
          >
            🛍️ Bawa Pulang (Takeaway)
          </button>
        </div>
      </div>

      {/* 1. Global Login Drawer */}
      <LoginDrawer 
        isOpen={isLoginDrawerOpen} 
        onClose={() => setIsLoginDrawerOpen(false)} 
      />

      {/* 2. Logged-In User Profile and Location Drawer */}
      {user && (
        <Drawer open={isProfileDrawerOpen} onOpenChange={setIsProfileDrawerOpen}>
          <DrawerContent className="max-w-md mx-auto bg-background/95 backdrop-blur-xl border-t border-muted/40 rounded-t-[32px] overflow-hidden outline-none">
            <div className="p-5 pb-8 flex flex-col gap-5">
              <DrawerHeader className="px-0 pt-0 text-left">
                <DrawerTitle className="text-base font-black text-foreground tracking-tight">
                  Profil Saya
                </DrawerTitle>
                <DrawerDescription className="text-xs text-muted-foreground/80 font-medium">
                  Atur lokasi kantin atau ganti akun demo Anda.
                </DrawerDescription>
              </DrawerHeader>

              {/* Profile Card details */}
              <div className="p-4 bg-muted/40 rounded-2xl border border-muted/20 flex items-center gap-3.5">
                <Avatar className="size-12.5 border border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-black text-foreground leading-tight">{user.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-primary font-black mt-1">
                    <Wallet className="size-3.5 stroke-[2.5]" />
                    <span>Saldo: Rp {user.saldo.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              {/* 3. Location Selector (Strictly Blok A & Blok B) */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black text-foreground uppercase tracking-wider pl-1">
                  Pilih Blok Resto
                </h4>
                
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Blok A */}
                  <button
                    onClick={() => handleLocationSwitch("Blok A")}
                    className={cn(
                      "p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden",
                      user.location === "Blok A"
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                    )}
                  >
                    <span className="text-sm font-black">Blok A</span>
                    <span className="text-[8px] font-medium leading-none opacity-80">Gedung Utama Barat</span>
                    {user.location === "Blok A" && (
                      <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
                    )}
                  </button>

                  {/* Blok B */}
                  <button
                    onClick={() => handleLocationSwitch("Blok B")}
                    className={cn(
                      "p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden",
                      user.location === "Blok B"
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                    )}
                  >
                    <span className="text-sm font-black">Blok B</span>
                    <span className="text-[8px] font-medium leading-none opacity-80">Gedung Utama Timur</span>
                    {user.location === "Blok B" && (
                      <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Controls */}
              <div className="flex flex-col gap-2.5 mt-2">
                {/* Switch accounts */}
                <button
                  onClick={() => {
                    setIsProfileDrawerOpen(false)
                    setIsLoginDrawerOpen(true)
                  }}
                  className="w-full h-11 bg-card hover:bg-muted/35 border border-muted/30 text-xs font-bold rounded-xl flex items-center justify-between px-4 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="size-4 text-muted-foreground" />
                    <span>Ganti Akun Demo</span>
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground/60" />
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout()
                    setIsProfileDrawerOpen(false)
                  }}
                  className="w-full h-11 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-black rounded-xl flex items-center gap-2 justify-center transition-colors"
                >
                  <LogOut className="size-4" />
                  <span>Keluar Akun (Log Out)</span>
                </button>
              </div>

              <DrawerFooter className="px-0 pt-4">
                <Button
                  onClick={() => setIsProfileDrawerOpen(false)}
                  className="w-full h-11 bg-primary text-white font-extrabold text-xs rounded-xl"
                >
                  Selesai
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
