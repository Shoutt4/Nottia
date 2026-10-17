import { useEffect, useState } from 'react'

import { isAuthenticated } from '@/config'

/**
 * `true` mientras exista un token válido (no caducado).
 *
 * Reacciona a:
 * - `nottia:unauthorized` → lo emite `config/http.ts` ante un 401;
 * - `storage` → cambio de token en otra pestaña.
 *
 * Es la comprobación que usan `ProtectedRoute` y `PublicOnlyRoute`.
 */
export function useIsAuthenticated(): boolean {
  const [authenticated, setAuthenticated] = useState(isAuthenticated)

  useEffect(() => {
    const sync = () => setAuthenticated(isAuthenticated())
    window.addEventListener('nottia:unauthorized', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('nottia:unauthorized', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return authenticated
}
