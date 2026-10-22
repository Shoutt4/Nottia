/** Una nota tal como la devuelve el backend. */
export interface Note {
  id: string
  idCuaderno: string | null
  /** Nombre visible del cuaderno (la API solo envía el id; si falta, se usa "Notas"). */
  notebook: string
  /** Vacío = nota sin título. */
  title: string
  content: string
  /** ISO 8601; alimenta el "hace X". */
  updatedAt: string
  /** `bloqueado` en la API. */
  locked: boolean
  /** `fijado` en la API. */
  pinned: boolean
}

/** Página de `GET /api/notas/all`. */
export interface NotePage {
  notes: Note[]
  page: number
  size: number
  total: number
  totalPages: number
}

/** Cuerpo de `POST /api/notas/save`. */
export interface CreateNotePayload {
  idCuaderno: string | null
  idUsuario: string
  titulo: string
  contenido: string
  bloqueado: boolean
  fijado: boolean
}

/** Cuerpo de `PUT /api/notas/update/{id}`. */
export interface UpdateNotePayload {
  idCuaderno: string | null
  titulo: string
  contenido: string
  bloqueado: boolean
  fijado: boolean
}
