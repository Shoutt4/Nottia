import { Navigate, Outlet } from 'react-router-dom'

import { getCurrentUser } from '@/config'
import { ROUTES } from '@/config/routes'

import { useIsAuthenticated } from './useIsAuthenticated'

/**
 * Envuelve las rutas públicas (landing, login, registro): si ya hay sesión,
 * redirige al inicio que corresponde al rol para que no se vuelva a lo público.
 */
export function PublicOnlyRoute() {
  const authenticated = useIsAuthenticated()

  if (authenticated) {
    const target = getCurrentUser().role === 'ADMIN' ? ROUTES.adminUsers : ROUTES.dashboard
    return <Navigate to={target} replace />
  }

  return <Outlet />
}
