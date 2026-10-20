import { http } from '@/config'

import type { ProfileResponse, UserProfile } from '../types'

/**
 * `GET /api/usuarios/me` — perfil del usuario dueño del token.
 * El `Bearer` lo añade el interceptor de `config/http.ts`.
 */
export async function getMyProfile(): Promise<UserProfile> {
  const { data } = await http.get<ProfileResponse>('/api/usuarios/me')
  return data.data
}
