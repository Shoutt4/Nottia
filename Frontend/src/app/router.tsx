import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/config/routes'
import { LoginPage } from '@/features/auth'
import { HomePage } from '@/features/dashboard'
import { NoteEditorPage } from '@/features/notes'
import { ProfilePage } from '@/features/profile'
import { SidebarLayout } from '@/features/sidebar'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { LandingPage } from '@/pages/landing/LandingPage'

import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

/**
 * Tabla de rutas. Al añadir una página:
 *   1. crea el componente en `src/pages/` o `src/features/<x>/pages/`,
 *   2. añade aquí su ruta (pública, o privada dentro de `SidebarLayout`),
 *   3. añade la constante en `config/routes.ts`.
 *
 * - `PublicOnlyRoute`: si ya hay sesión, redirige a `/dashboard`.
 * - `ProtectedRoute` + `SidebarLayout`: zona privada con el menú lateral.
 * - El editor de notas cuelga de `ProtectedRoute` pero fuera de `SidebarLayout`.
 */
export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: ROUTES.home, element: <LandingPage /> },
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.register, element: <ComingSoonPage title="Crear cuenta" /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          { path: ROUTES.dashboard, element: <HomePage /> },
          { path: ROUTES.profile, element: <ProfilePage /> },
          // El editor vive dentro del shell (menú visible) y ocupa el alto disponible.
          { path: `${ROUTES.notes}/:noteId`, element: <NoteEditorPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ComingSoonPage title="Página no encontrada" message="Esa ruta todavía no existe." />,
  },
])
