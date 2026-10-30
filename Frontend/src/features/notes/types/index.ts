/**
 * Tipos de la API de notas, copiados de los DTO del backend:
 * `NotasResponse`, `SaveNotaRequestDTO` y `NotasRequestDTO`.
 */

/** `NotasResponse` — respuesta de `GET /api/notas/{id}` y `PUT /api/notas/update/{id}`. */
export interface NotaResponse {
  idNota: string
  idCuaderno: string
  idUsuario: string
  /** La entidad permite `null`; el formulario siempre envía texto. */
  titulo: string | null
  contenido: string | null
  bloqueado: boolean
  fijado: boolean
  /**
   * La entidad `Nota` declara `java.security.Timestamp` y no los rellena al
   * guardar, así que hoy el backend los devuelve en `null`.
   */
  createAt: string | null
  updateAt: string | null
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

/** `Map.of("Succes", true, "data", …)` de `POST /api/notas/save`. */
export interface SaveNotaResponse {
  Succes: boolean
  data: NotaResponse
}

/** Una nota tal como la usa la interfaz. */
export interface Note {
  id: string
  idCuaderno: string | null
  /** Nombre visible del cuaderno (la API solo envía el id; si falta, se usa "Notas"). */
  notebook: string
  /** Vacío = nota sin título. */
  title: string
  content: string
  /** Fecha de creación (la que usa el orden de las notas de un cuaderno). */
  createdAt: string
  /** ISO 8601; alimenta el "hace X". */
  updatedAt: string
  /** `bloqueado` en la API. */
  locked: boolean
  /** `fijado` en la API. */
  pinned: boolean
}

/** Página de notas (`/api/notas/all` y `/api/notas/by/cuaderno/{id}`). */
export interface NotePage {
  notes: Note[]
  page: number
  size: number
  total: number
  totalPages: number
}

/** Cuerpo de `POST /api/notas/save` (`SaveNotaRequestDTO`). */
export interface CreateNotePayload {
  idCuaderno: string | null
  idUsuario: string
  titulo: string
  contenido: string
  bloqueado: boolean
  fijado: boolean
}

/** Cuerpo de `PUT /api/notas/update/{id}` (`NotasRequestDTO`). */
export interface UpdateNotePayload {
  idCuaderno: string | null
  titulo: string
  contenido: string
  bloqueado: boolean
  fijado: boolean
}
