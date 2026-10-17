import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { useIsAuthenticated } from './useIsAuthenticated'

/**
 * Envuelve las rutas privadas: si no hay sesión válida, redirige a `/login`.
 * Coloca dentro las páginas que requieren estar autenticado.
 */
export function ProtectedRoute() {
  const authenticated = useIsAuthenticated()

  if (!authenticated) return <Navigate to={ROUTES.login} replace />

  return <Outlet />
}
