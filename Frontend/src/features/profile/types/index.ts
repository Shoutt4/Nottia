/** Datos completos del usuario (`GET /api/usuarios/me`). */
export interface UserProfile {
  idUsuario: string
  nombre: string
  apellido: string
  email: string
  urlAvatar: string | null
  phone: string | null
  createAt: string | null
  updateAt: string | null
}

/** Envoltorio que devuelve el backend. */
export interface ProfileResponse {
  data: UserProfile
  succes: boolean
}
