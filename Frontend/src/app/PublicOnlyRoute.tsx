import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { useIsAuthenticated } from './useIsAuthenticated'

/**
 * Envuelve las rutas públicas (landing, login, registro): si ya hay sesión,
 * redirige a `/dashboard` para que no se vuelva a lo público.
 */
export function PublicOnlyRoute() {
  const authenticated = useIsAuthenticated()

  if (authenticated) return <Navigate to={ROUTES.dashboard} replace />

  return <Outlet />
}
