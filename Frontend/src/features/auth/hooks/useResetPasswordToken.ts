import { useQuery } from '@tanstack/react-query'

import { validateResetToken } from '../api/authApi'

/**
 * Comprueba el token del enlace de recuperación antes de mostrar el formulario.
 * La consulta es idempotente, así que StrictMode puede repetirla sin problema.
 */
export function useResetPasswordToken(token: string | null) {
  return useQuery({
    queryKey: ['auth', 'reset-password-token', token ?? ''],
    queryFn: () => validateResetToken(token ?? ''),
    enabled: Boolean(token),
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}
