/** Rutas de la app. Única fuente de verdad: úsalo en `router.tsx` y en los enlaces. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  resendVerification: '/reenviar-verificacion',
  forgotPassword: '/recuperar-contrasena',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  notebooks: '/cuadernos',
  notebookNew: '/cuadernos/nuevo',
  activities: '/actividades',
  activitiesShare: '/actividades/compartir',
  profile: '/perfil',
  notes: '/notas',
  admin: '/admin',
  adminUsers: '/admin/usuarios',
  adminProfile: '/admin/perfil',
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
