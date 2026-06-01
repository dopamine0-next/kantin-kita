import { fetcher } from '@/lib/fetcher'
import type { UserProfile } from '@/store/useAuthStore'

import { mapUserBackendToProfile } from './auth.mapper'
import type { LoginBackendResponse, LoginPayload, RegisterPayload, UserBackend } from './auth.types'

interface LoginResponse {
  user: UserProfile
  token: string
}

export const AuthService = {
  async login(nim: string, password: string): Promise<LoginResponse> {
    const body: LoginPayload = { nim, password }
    const res = await fetcher<LoginBackendResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return {
      user: mapUserBackendToProfile(res.user),
      token: res.token,
    }
  },

  async register(data: RegisterPayload): Promise<LoginResponse> {
    const res = await fetcher<LoginBackendResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    return {
      user: mapUserBackendToProfile(res.user),
      token: res.token,
    }
  },

  async getMe(token: string): Promise<UserProfile> {
    const res = await fetcher<UserBackend>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return mapUserBackendToProfile(res)
  },
}
