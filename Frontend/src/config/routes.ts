/** Rutas de la app. Única fuente de verdad: úsalo en `router.tsx` y en los enlaces. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/perfil',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
