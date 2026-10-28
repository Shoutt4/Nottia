import { useQuery } from '@tanstack/react-query'

import { verifyEmail } from '../api/authApi'

/**
 * Verifica el token del correo una sola vez. TanStack Query deduplica la
 * petición (StrictMode monta el efecto dos veces y el token es de un solo uso).
 */
export function useVerifyEmail(token: string | null) {
  return useQuery({
    queryKey: ['auth', 'verify-email', token ?? ''],
    queryFn: () => verifyEmail(token ?? ''),
    enabled: Boolean(token),
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
