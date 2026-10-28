/** Rutas de la app. Única fuente de verdad: úsalo en `router.tsx` y en los enlaces. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  dashboard: '/dashboard',
  notebooks: '/cuadernos',
  profile: '/perfil',
  notes: '/notas',
} as const

/** Ruta del editor de una nota concreta. */
export const notePath = (id: string) => `${ROUTES.notes}/${id}`

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
