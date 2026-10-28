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
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    // Revisa la expiración aunque la pestaña siga abierta: así el usuario va al
    // login al volver, en vez de recibir un 401 al pulsar "Nueva nota".
    const timer = window.setInterval(sync, 60_000)

    return () => {
      window.removeEventListener('nottia:unauthorized', sync)
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
      window.clearInterval(timer)
    }
  }, [])

  return authenticated
}
