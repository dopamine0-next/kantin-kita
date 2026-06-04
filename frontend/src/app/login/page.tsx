'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, Lock, LogIn, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/useAuthStore'

const loginSchema = z.object({
  nim: z.string().regex(/^\d{12,15}$/, 'NIM harus 12-15 digit angka'),
  password: z.string().min(6, 'Minimal 6 karakter'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      const response = await AuthService.login(data.nim, data.password)
      login(response.user, response.token)
      router.push('/')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan saat masuk.')
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
        <h1 className="text-foreground text-3xl font-semibold">Selamat Datang!</h1>
        <p className="text-muted-foreground text-sm font-medium">
          Masuk ke akun KantinKita untuk mulai memesan makanan favoritmu.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-foreground pl-1 text-xs font-semibold">NIM</label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              {...register('nim')}
              type="text"
              placeholder="Masukkan NIM Anda"
              className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-13 rounded-2xl pl-11 text-sm font-medium"
            />
          </div>
          {errors.nim && (
            <p className="text-destructive pl-1 text-[11px] font-medium">{errors.nim.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between pl-1">
            <label className="text-foreground text-xs font-semibold">Kata Sandi</label>
            <Link href="#" className="text-primary text-xs font-semibold hover:underline">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-13 rounded-2xl pl-11 text-sm font-medium"
            />
          </div>
          {errors.password && (
            <p className="text-destructive pl-1 text-[11px] font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary shadow-primary/25 hover:bg-primary/95 mt-4 h-13 w-full rounded-2xl text-sm font-semibold shadow-lg"
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
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Daftar Di Sini
          </Link>
        </p>
      </div>
    </div>
  )
}
