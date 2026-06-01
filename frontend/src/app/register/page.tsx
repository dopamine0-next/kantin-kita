'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

import { RegisterFormFields } from '@/components/auth/register-form-fields'
import { Button } from '@/components/ui/button'
import { AuthService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/useAuthStore'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Minimal 3 karakter'),
    nim: z.string().regex(/^\d{12,15}$/, 'NIM harus 12-15 digit angka'),
    semester: z.coerce.number().min(1, 'Minimal semester 1').max(14, 'Maksimal semester 14'),
    password: z.string().min(6, 'Minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      const response = await AuthService.register({
        name: data.name,
        nim: data.nim,
        password: data.password,
        semester: data.semester,
        locationId: 1,
      })
      login(response.user, response.token)
      router.push('/')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Gagal mendaftarkan akun.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background flex min-h-screen flex-col px-6 pt-12 pb-8">
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
        <RegisterFormFields register={register} errors={errors} />

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
