import { Navigate, Outlet } from 'react-router-dom'

import { getCurrentUser, isAuthenticated } from '@/config'
import { ROUTES } from '@/config/routes'

/**
 * Protege el panel de administración. La autorización real la sigue validando
 * el backend; esto solo evita que un usuario normal vea rutas que no puede usar.
 */
export function AdminRoute() {
  if (!isAuthenticated()) return <Navigate to={ROUTES.login} replace />
  if (getCurrentUser().role !== 'ADMIN') return <Navigate to={ROUTES.dashboard} replace />

  return <Outlet />
}
