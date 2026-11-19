/**
 * Tipos de `/api/evento`, copiados de los DTO del backend:
 * `EventoRequestDTO` y `EventoResponseDTO`.
 */

/** `EventoResponseDTO` — respuesta de `GET /api/evento/all` y `POST /api/evento/save`. */
export interface EventoResponseDTO {
  idEvento: string
  titulo: string | null
  descripcion: string | null
  /** `LocalDate` serializado como `yyyy-MM-dd`; la columna permite `null`. */
  fecha: string | null
  idUsuario: string | null
  createAt: string | null
  updateAt: string | null
}

/** `EventoRequestDTO` — cuerpo de `POST /api/evento/save`. */
export interface EventoRequestDTO {
  titulo: string
  descripcion: string
  /** `yyyy-MM-dd`; el backend lo convierte a `LocalDate`. */
  fecha: string
}

/** Un evento tal como lo consume el calendario. */
export interface CalendarEvent {
  id: string
  title: string
  description: string
  /** Fecha local en formato `yyyy-MM-dd`. */
  date: string
  /** Índice de color estable (0-3) para la nota del calendario. */
  tone: number
  createdAt: string
}
