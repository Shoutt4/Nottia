import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/config/routes'
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResendVerificationPage,
  VerifyEmailPage,
} from '@/features/auth'
import { HomePage } from '@/features/dashboard'
import { NotebookDesignerPage, NotebooksPage } from '@/features/notebooks'
import { NotebookNotesPage, NoteEditorPage } from '@/features/notes'
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
 * - `/verify-email` va sin guardas: el enlace del correo debe abrirse con o sin sesión.
 */
export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: ROUTES.home, element: <LandingPage /> },
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.register, element: <RegisterPage /> },
      { path: ROUTES.resendVerification, element: <ResendVerificationPage /> },
      { path: ROUTES.forgotPassword, element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          { path: ROUTES.dashboard, element: <HomePage /> },
          { path: ROUTES.notebooks, element: <NotebooksPage /> },
          { path: ROUTES.notebookNew, element: <NotebookDesignerPage /> },
          { path: `${ROUTES.notebooks}/:notebookId/notas`, element: <NotebookNotesPage /> },
          { path: `${ROUTES.notebooks}/:notebookId/editar`, element: <NotebookDesignerPage /> },
          { path: ROUTES.profile, element: <ProfilePage /> },
          // El editor vive dentro del shell (menú visible) y ocupa el alto disponible.
          { path: `${ROUTES.notes}/:noteId`, element: <NoteEditorPage /> },
        ],
      },
    ],
  },
  {
    // El enlace llega desde el correo: debe funcionar con o sin sesión,
    // así que no va dentro de `PublicOnlyRoute` ni de `ProtectedRoute`.
    path: ROUTES.verifyEmail,
    element: <VerifyEmailPage />,
  },
  {
    path: '*',
    element: <ComingSoonPage title="Página no encontrada" message="Esa ruta todavía no existe." />,
  },
])
