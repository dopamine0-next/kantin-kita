'use client'

import { useState } from 'react'

import { ChevronLeft, LogIn, Lock, User } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/useAuthStore'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await AuthService.login(identifier, password)
      login(response.user)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat masuk.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background flex min-h-screen flex-col px-6 pt-12 pb-8">
      {/* Back Button */}
      <Link href="/">
        <button className="bg-muted/50 flex size-10 items-center justify-center rounded-full transition-colors active:scale-95">
          <ChevronLeft className="text-foreground size-6" />
        </button>
      </Link>

      <div className="mt-10 flex flex-col gap-2">
        <h1 className="text-foreground text-3xl font-black tracking-tight">Selamat Datang!</h1>
        <p className="text-muted-foreground text-sm font-medium">
          Masuk ke akun KantinKita untuk mulai memesan makanan favoritmu.
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-foreground pl-1 text-xs font-black tracking-wider uppercase">
            NIM atau Nama Pengguna
          </label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Masukkan NIM Anda"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="bg-muted/30 border-muted/50 h-13 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between pl-1">
            <label className="text-foreground text-xs font-black tracking-wider uppercase">
              Kata Sandi
            </label>
            <Link href="#" className="text-primary text-xs font-bold hover:underline">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/30 border-muted/50 h-13 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 text-destructive rounded-xl p-3 text-center text-xs font-bold"
          >
            {error}
          </motion.p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary shadow-primary/25 hover:bg-primary/95 mt-4 h-13 w-full rounded-2xl text-sm font-black tracking-wide shadow-lg"
        >
          {isLoading ? (
            <div className="border-background size-5 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <>
              <LogIn className="mr-2 size-5" />
              <span>Masuk Sekarang</span>
            </>
          )}
        </Button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-muted-foreground text-xs font-medium">
          Belum punya akun?{' '}
          <Link href="/register" className="text-primary font-black hover:underline">
            Daftar Di Sini
          </Link>
        </p>
      </div>
    </div>
  )
}
