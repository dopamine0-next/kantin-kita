'use client'

import { type FieldErrors, type UseFormRegister } from 'react-hook-form'

import { GraduationCap, IdCard, Lock, User } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface FormValues {
  name: string
  nim: string
  semester: number
  password: string
  confirmPassword: string
}

interface Props {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

export function RegisterFormFields({ register, errors }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
          Nama Lengkap
        </label>
        <div className="relative">
          <User className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            {...register('name')}
            type="text"
            placeholder="Contoh: Budi Santoso"
            className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-12 rounded-2xl pl-11 text-sm font-medium"
          />
        </div>
        {errors.name && (
          <p className="text-destructive pl-1 text-[11px] font-medium">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
            NIM
          </label>
          <div className="relative">
            <IdCard className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              {...register('nim')}
              type="text"
              placeholder="123456"
              className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-12 rounded-2xl pl-11 text-sm font-medium"
            />
          </div>
          {errors.nim && (
            <p className="text-destructive pl-1 text-[11px] font-medium">{errors.nim.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
            Semester
          </label>
          <div className="relative">
            <GraduationCap className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              {...register('semester', { valueAsNumber: true })}
              type="number"
              min="1"
              placeholder="1"
              className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-12 rounded-2xl pl-11 text-sm font-medium"
            />
          </div>
          {errors.semester && (
            <p className="text-destructive pl-1 text-[11px] font-medium">
              {errors.semester.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
          Kata Sandi
        </label>
        <div className="relative">
          <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-12 rounded-2xl pl-11 text-sm font-medium"
          />
        </div>
        {errors.password && (
          <p className="text-destructive pl-1 text-[11px] font-medium">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-foreground pl-1 text-[10px] font-black tracking-wider uppercase">
          Konfirmasi Sandi
        </label>
        <div className="relative">
          <Lock className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••"
            className="bg-muted/30 border-muted/50 focus:ring-primary/20 h-12 rounded-2xl pl-11 text-sm font-medium"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-destructive pl-1 text-[11px] font-medium">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  )
}
