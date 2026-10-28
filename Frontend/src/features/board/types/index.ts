/**
 * Tipos de la API del tablero (`/api/tablero/...`), copiados del backend.
 * Un usuario tiene un tablero propio: título y portada.
 */

/** `TableroResponse` de `GET /api/tablero/byme` y del `data` del update. */
export interface BoardResponse {
  idTablero: string
  idUsuario: string
  titulo: string | null
  tipoPortada: string | null
  portadaValor: string | null
  createAt: string | null
  updateAt: string | null
}

/** Cuerpo de `PUT /api/tablero/update`. */
export interface UpdateBoardPayload {
  idUsuario: string
  titulo: string
  tipoPortada: string | null
  portadaValor: string | null
}

/** Respuesta de `PUT /api/tablero/update`. */
export interface UpdateBoardResponse {
  succes: boolean
  data: BoardResponse
}
