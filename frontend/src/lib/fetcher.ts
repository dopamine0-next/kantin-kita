import { useAuthStore } from '@/store/useAuthStore'

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message || `Request failed (${response.status})`)
  }

  return response.json()
}
