/**
 * Tipos del panel de administración, copiados de los DTO del backend.
 * `UserResponseDto` se usa en `GET /api/usuarios/all`.
 */

/** Una cuenta de usuario tal como la devuelve `GET /api/usuarios/all`. */
export interface AdminUser {
  idUsuario: string
  nombre: string | null
  apellido: string | null
  email: string | null
  urlAvatar: string | null
  phone: string | null
  createAt: string | null
  updateAt: string | null
}

/** `org.springframework.data.domain.Page<UserResponseDto>`. */
export interface AdminUserPage {
  content: AdminUser[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}
