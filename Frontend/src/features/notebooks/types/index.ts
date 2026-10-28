/**
 * Tipos de la API de cuadernos, copiados de los DTO del backend.
 * El endpoint real es `/api/cuaderno/...` (singular, con la errata `idCuader`).
 */

/** Respuesta de `POST /api/cuaderno/create` y `PUT /api/cuaderno/update/{id}`. */
export interface NotebookResponse {
  idCuader: string
  idUsuario: string
  nombre: string
  color: string
  orden: number
  createAt: string | null
  updateAt: string | null
}

/** Cuerpo de crear/actualizar un cuaderno. */
export interface NotebookPayload {
  idUsuario: string
  nombre: string
  color: string
  orden: number
}

/** Cuaderno tal como lo usa la interfaz. */
export interface Notebook {
  id: string
  idUsuario: string
  nombre: string
  color: string
  orden: number
  createdAt: string | null
  updatedAt: string | null
}

/** `org.springframework.data.domain.Page<T>` tal como lo serializa Spring. */
export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

/** Página de `GET /api/cuaderno/all`. */
export interface NotebookPage {
  notebooks: Notebook[]
  page: number
  size: number
  total: number
  totalPages: number
}
