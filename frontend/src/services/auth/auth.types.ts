export interface LoginBackendResponse {
  token: string
  user: UserBackend
}

export interface UserBackend {
  id: string
  name: string
  nim: string
  semester: number | null
  role: string
  locationName: string | null
  locationId: number | null
}

export interface RegisterPayload {
  name: string
  nim: string
  password: string
  semester: number
  locationId?: number
}

export interface LoginPayload {
  nim: string
  password: string
}
