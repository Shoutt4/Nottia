/**
 * Tipos de la API de cuadernos, copiados de los DTO del backend.
 * El endpoint real es `/api/cuaderno/...` (singular, con la errata `idCuader`).
 */

/** Diseño de la tapa tal como lo devuelve el backend (`desing`). */
export interface NotebookDesignApi {
  idDesing?: string | null
  template?: string | null
  color?: string | null
  accent?: string | null
  image?: string | null
}

/** Diseño de la tapa para crear un cuaderno. */
export interface NotebookDesignPayload {
  template: string
  color: string
  accent: string
  image: string | null
}

/** Respuesta de `POST /api/cuaderno/create` y `PUT /api/cuaderno/update/{id}`. */
export interface NotebookResponse {
  idCuader: string
  idUsuario: string
  nombre: string
  color: string
  orden: number
  desing?: NotebookDesignApi | null
  createAt: string | null
  updateAt: string | null
}

/**
 * Cuerpo de crear/actualizar un cuaderno.
 * `desing` se envía al crear; al editar se omite para no reemplazar el diseño
 * que el backend ya tiene asociado.
 */
export interface NotebookPayload {
  idUsuario: string
  nombre: string
  color: string
  orden: number
  desing?: NotebookDesignPayload
}

/** Cuaderno tal como lo usa la interfaz. */
export interface Notebook {
  id: string
  idUsuario: string
  nombre: string
  color: string
  orden: number
  design?: NotebookDesignApi | null
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
