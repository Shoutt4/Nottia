import { http } from '@/config'

import type { LoginCredentials } from '../types'

interface LoginResponse {
  token: string
}

/**
 * `POST /api/auth/login` con `{ email, password }`.
 * Devuelve el JWT del backend (`{ token }`).
 */
export async function login(
  credentials: Pick<LoginCredentials, 'email' | 'password'>,
): Promise<string> {
  const { data } = await http.post<LoginResponse>('/api/auth/login', {
    email: credentials.email.trim(),
    password: credentials.password,
  })

  return data.token
}
