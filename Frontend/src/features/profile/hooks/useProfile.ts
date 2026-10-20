import { useQuery } from '@tanstack/react-query'

import { getMyProfile } from '../api/profileApi'

export const profileKeys = {
  me: ['profile', 'me'] as const,
}

/**
 * Perfil del usuario autenticado. La caché de TanStack Query lo comparte entre
 * el sidebar, el dashboard y la página de cuenta (una sola petición).
 */
export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me,
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  })
}
