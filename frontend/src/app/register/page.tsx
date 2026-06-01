'use client'

import { useState } from 'react'

import { ChevronLeft, UserPlus, Lock, User, IdCard, GraduationCap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/useAuthStore'

export default function RegisterPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    semester: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Konformasi kata sandi tidak cocok.')
      setIsLoading(false)
      return
    }

    try {
      const response = await AuthService.register(formData)
      login(response.user)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftarkan akun.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-background flex min-h-screen flex-col px-6 pt-12 pb-8">
      {/* Back Button */}
      <Link href="/login">
        <button className="bg-muted/50 flex size-10 items-center justify-center rounded-full transition-colors active:scale-95">
          <ChevronLeft className="text-foreground size-6" />
        </button>
      </Link>

      <div className="mt-8 flex flex-col gap-2">
        <h1 className="text-foreground text-3xl font-black tracking-tight">Buat Akun Baru</h1>
        <p className="text-muted-foreground text-sm font-medium">
          Bergabung dengan KantinKita untuk kemudahan pesan makan di kampus.
        </p>
      </div>

      <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
            Nama Lengkap
          </label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              name="name"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={formData.name}
              onChange={handleChange}
              className="bg-muted/30 border-muted/50 h-12 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
              NIM
            </label>
            <div className="relative">
              <IdCard className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                name="nim"
                type="text"
                placeholder="123456"
                value={formData.nim}
                onChange={handleChange}
                className="bg-muted/30 border-muted/50 h-12 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
              Semester
            </label>
            <div className="relative">
              <GraduationCap className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                name="semester"
                type="number"
                min="1"
                placeholder="1"
                value={formData.semester}
                onChange={handleChange}
                className="bg-muted/30 border-muted/50 h-12 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
            Kata Sandi
          </label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-muted/30 border-muted/50 h-12 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
            Konfirmasi Sandi
          </label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-muted/30 border-muted/50 h-12 rounded-2xl pl-11 text-sm font-medium focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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
              <UserPlus className="mr-2 size-5" />
              <span>Daftar Akun</span>
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-xs font-medium">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary font-black hover:underline">
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}
