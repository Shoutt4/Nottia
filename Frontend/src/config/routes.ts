/** Rutas de la app. Única fuente de verdad: úsalo en `router.tsx` y en los enlaces. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  resendVerification: '/reenviar-verificacion',
  forgotPassword: '/recuperar-contrasena',
  dashboard: '/dashboard',
  notebooks: '/cuadernos',
  notebookNew: '/cuadernos/nuevo',
  profile: '/perfil',
  notes: '/notas',
} as const

/** Ruta para reenviar la verificación, con el correo precargado si viene del login. */
export const resendVerificationPath = (email: string) =>
  `${ROUTES.resendVerification}?email=${encodeURIComponent(email)}`

/** Ruta del editor de una nota concreta. */
export const notePath = (id: string) => `${ROUTES.notes}/${id}`

/** Ruta del diseñador de portada de un cuaderno. */
export const notebookEditPath = (id: string) => `${ROUTES.notebooks}/${id}/editar`

/** Ruta de las notas de un cuaderno. */
export const notebookNotesPath = (id: string) => `${ROUTES.notebooks}/${id}/notas`

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
